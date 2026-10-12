#!/usr/bin/env bun
/**
 * Populate src/data/youtube-meta.json with the real YouTube upload date and
 * duration for every video embedded in posts and course lessons. The file is
 * a read-only lookup at build time — VideoObject JSON-LD falls back to the
 * post's publish date for anything missing.
 *
 * Run after adding new videos:  bun scripts/fetch-youtube-meta.mjs
 *
 * NOTE: YouTube aggressively bot-walls datacenter IPs (429 / consent walls).
 * If everything fails, run this from a residential connection and commit the
 * resulting JSON.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = new URL("../src/content", import.meta.url).pathname;
const COURSES_JSON = new URL("../src/data/courses.json", import.meta.url).pathname;
const META_JSON = new URL("../src/data/youtube-meta.json", import.meta.url).pathname;
const YT_URL_REGEX = /https?:\/\/(?:[\w-]+\.)?(?:youtube\.com|youtu\.be)\/[^\s"'<>)\]]+/g;
const VALID_ID = /^[\w-]{11}$/;
const CONCURRENCY = 3;
const REQUEST_DELAY_MS = 400;
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  Cookie: "CONSENT=YES+cb.20210328-17-p0.en+FX+410",
};

function extractVideoId(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^(www\.|m\.|music\.|gaming\.)/, "");
    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return VALID_ID.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v && VALID_ID.test(v)) return v;
      const seg = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(seg[0]) && VALID_ID.test(seg[1])) return seg[1];
      const last = seg[seg.length - 1];
      return VALID_ID.test(last) ? last : null;
    }
  } catch {}
  return null;
}

function* walkMdx(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMdx(path);
    else if (entry.name.endsWith(".mdx")) yield path;
  }
}

function secondsToIsoDuration(total) {
  if (!Number.isFinite(total) || total <= 0) return undefined;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = Math.round(total % 60);
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s || (!h && !m) ? `${s}S` : ""}`;
}

function parseWatchPage(html) {
  const uploadDate =
    html.match(/"uploadDate":"(\d{4}-\d{2}-\d{2})"/)?.[1] ??
    html.match(/itemprop="uploadDate"[^>]*content="([^"]+)"/)?.[1];
  const duration =
    html.match(/itemprop="duration"[^>]*content="(PT[^"]+)"/)?.[1] ??
    secondsToIsoDuration(Number(html.match(/"lengthSeconds":"(\d+)"/)?.[1]));
  return {
    ...(uploadDate ? { uploadDate } : {}),
    ...(duration ? { duration } : {}),
  };
}

async function fetchMeta(id) {
  const res = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, {
    headers: HEADERS,
    redirect: "follow",
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseWatchPage(await res.text());
}

const videoIds = new Set();
for (const file of walkMdx(CONTENT_DIR)) {
  for (const match of readFileSync(file, "utf8").match(YT_URL_REGEX) || []) {
    const id = extractVideoId(match);
    if (id) videoIds.add(id);
  }
}
for (const course of JSON.parse(readFileSync(COURSES_JSON, "utf8")).courses || []) {
  for (const lesson of course.lessons || []) {
    const id = extractVideoId(lesson.video || "");
    if (id) videoIds.add(id);
  }
}

let meta = {};
try {
  meta = JSON.parse(readFileSync(META_JSON, "utf8"));
} catch {}
const todo = [...videoIds].filter((id) => !meta[id]?.uploadDate);
console.log(`${videoIds.size} videos referenced, ${todo.length} missing metadata.`);

const missing = [];
let done = 0;
const queue = [...todo];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const id = queue.shift();
      try {
        const m = await fetchMeta(id);
        if (m.uploadDate) meta[id] = m;
        else missing.push(id);
      } catch (err) {
        missing.push(`${id} (${err.message})`);
      }
      done += 1;
      if (done % 20 === 0) console.log(`  ${done}/${todo.length}`);
      await sleep(REQUEST_DELAY_MS);
    }
  })
);

const sorted = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(META_JSON, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`Wrote ${Object.keys(sorted).length} entries to src/data/youtube-meta.json`);
if (missing.length) {
  console.log(`Unresolved (${missing.length}): ${missing.join(", ")}`);
  console.log("These fall back to the post publish date as uploadDate.");
}
