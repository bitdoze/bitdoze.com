#!/usr/bin/env bun
/**
 * Import a YouTube Studio video export (Analytics → Content → Download CSV)
 * into src/data/youtube-meta.json — real uploadDate + duration for the
 * channel's own videos. Real dates override existing entries; videos absent
 * from the CSV (third-party embeds) are untouched.
 *
 * Usage:  bun scripts/import-youtube-csv.mjs path/to/export.csv
 */
import { readFileSync, writeFileSync } from "node:fs";

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Usage: bun scripts/import-youtube-csv.mjs <youtube-studio-export.csv>");
  process.exit(1);
}
const META_JSON = new URL("../src/data/youtube-meta.json", import.meta.url).pathname;

// Expected columns: Content,Video title,Video publish time,Duration,Views
function* parseCsv(text) {
  let field = "";
  let row = [];
  let inQuotes = false;
  for (let i = 0; i <= text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === "," || ch === "\n" || ch === "\r" || ch === undefined) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (ch !== ",") {
        yield row;
        row = [];
      }
    } else {
      field += ch;
    }
  }
}

function secondsToIsoDuration(total) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = Math.round(total % 60);
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s || (!h && !m) ? `${s}S` : ""}`;
}

const rows = [...parseCsv(readFileSync(csvPath, "utf8").replace(/^﻿/, ""))];
const header = rows[0].map((h) => h.trim());
const idCol = header.indexOf("Content");
const dateCol = header.indexOf("Video publish time");
const durCol = header.indexOf("Duration");
if (idCol === -1 || dateCol === -1) {
  console.error(`Unexpected CSV columns: ${header.join(", ")}`);
  console.error("Expected a YouTube Studio export with Content + Video publish time.");
  process.exit(1);
}

const meta = JSON.parse(readFileSync(META_JSON, "utf8").catch?.(() => "{}") ?? "{}");
let imported = 0;
let skipped = 0;
for (const row of rows.slice(1)) {
  const id = row[idCol]?.trim();
  const date = new Date(row[dateCol]?.trim() || "");
  if (!/^[\w-]{11}$/.test(id || "") || Number.isNaN(date.getTime())) {
    skipped += 1;
    continue; // "Total" row, channel-level rows, etc.
  }
  const seconds = Number(row[durCol]);
  // Format with local date parts, not toISOString() — the CSV date is already
  // the publish date in the channel's timezone; shifting to UTC lops a day off.
  const pad = (n) => String(n).padStart(2, "0");
  meta[id] = {
    uploadDate: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    ...(Number.isFinite(seconds) && seconds > 0
      ? { duration: secondsToIsoDuration(seconds) }
      : {}),
  };
  imported += 1;
}

const sorted = Object.fromEntries(Object.entries(meta).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(META_JSON, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(
  `Imported ${imported} videos (${skipped} rows skipped) → src/data/youtube-meta.json now has ${Object.keys(sorted).length} entries.`
);
