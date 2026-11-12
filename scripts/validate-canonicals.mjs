/**
 * Canonical-URL guard (opus-55-improvements §10.1).
 *
 * `canonical:` silently decides a post's published URL (getEntrySlug), so a
 * typo quietly moves a page. Assert that every canonical path either matches
 * the post's own slug or is the TARGET of a redirect in src/config/redirects.mjs
 * (the "URL moved, old URL 301s here" case).
 *
 * Runs in `bun run build` / `build:ci`.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { redirects } from "../src/config/redirects.mjs";

const POSTS_DIR = new URL("../src/content/posts/", import.meta.url);
const redirectTargets = new Set(Object.values(redirects).map((d) => d.replace(/\/+$/, "")));

let failed = 0,
  checked = 0;

async function* walk(dirUrl) {
  for (const entry of await readdir(dirUrl, { withFileTypes: true })) {
    const p = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, dirUrl);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.mdx?$/.test(entry.name)) yield p;
  }
}

for await (const file of walk(POSTS_DIR)) {
  const src = await readFile(file, "utf8");
  const fm = src.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  const m = fm[1].match(/^canonical:\s*["']?([^"'\s]+)["']?\s*$/m);
  if (!m) continue;
  checked++;

  const urlPath = new URL(m[1]).pathname.replace(/\/+$/, "");
  const rel = file.pathname.split("src/content/posts/")[1].replace(/\.mdx?$/, "");
  const isEs = rel.startsWith("es/");
  const slug = isEs ? `es/${rel.slice(3)}` : rel;

  if (urlPath === `/${slug}`) continue; // canonical == own URL, fine
  if (redirectTargets.has(urlPath)) continue; // intentional move with a 301

  console.error(
    `${path.basename(file.pathname)}: canonical ${urlPath} matches neither the file slug /${slug}/ nor a redirect target`
  );
  failed++;
}

if (failed) {
  console.error(`\nvalidate-canonicals: ${failed} suspect canonical(s) of ${checked}`);
  process.exit(1);
}
console.log(`Validated ${checked} canonicals.`);
