/**
 * Validate post frontmatter metadata before build.
 *
 * Errors (exit 1):
 *   - a 4-digit year in `title` or `meta_title` that is LOWER than the year
 *     in `lastmod ?? date` — a stale "2025" in a title on a page last touched
 *     in 2026. Slugs in scripts/title-year-allowlist.json are exempt.
 *   - `lastmod` earlier than `date` (inverted dates break updated badges and schema).
 * Warnings (never fail; one summary line per locale):
 *   - `meta_title ?? title` over 65 characters (SERP truncation)
 *   - `description` over 160 characters (SERP truncation)
 *
 * Wired into `bun run build` alongside the other validators.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const POSTS_DIR = new URL("../src/content/posts/", import.meta.url).pathname;
const allowlist = new Set(
  JSON.parse(readFileSync(new URL("title-year-allowlist.json", import.meta.url), "utf8"))
);

// Only the few keys this gate needs — no YAML dependency (same approach as
// validate-canonicals.mjs). Frontmatter values here are single-line scalars.
function field(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)\\s*$`, "m"));
  if (!m) return undefined;
  const v = m[1].trim();
  return (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
    ? v.slice(1, -1)
    : v;
}

function parseDate(raw) {
  if (!raw) return null;
  const normalized = raw.replace(/T(\d):/, "T0$1:");
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

const errors = [];
const warnings = { longTitles: {}, longDescriptions: {} };

for (const locale of ["", "es", "de"]) {
  const dir = locale ? join(POSTS_DIR, locale) : POSTS_DIR;
  const name = locale || "en";
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    continue;
  }
  for (const entry of entries) {
    if (!entry.isFile() || !/\.(md|mdx)$/.test(entry.name)) continue;
    const slug = basename(entry.name).replace(/\.(md|mdx)$/, "");
    const raw = readFileSync(join(dir, entry.name), "utf8");
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const fm = m ? m[1] : "";
    const file = `src/content/posts/${locale ? locale + "/" : ""}${entry.name}`;

    const dateStr = field(fm, "date");
    const lastmodStr = field(fm, "lastmod");
    const parsedDate = parseDate(dateStr);
    const parsedLastmod = parseDate(lastmodStr);
    if (
      parsedDate &&
      parsedLastmod &&
      parsedLastmod.toISOString().slice(0, 10) < parsedDate.toISOString().slice(0, 10)
    ) {
      errors.push(`${file}: lastmod (${lastmodStr}) is earlier than date (${dateStr})`);
    }

    const touched = parsedLastmod ?? parsedDate;
    const touchedYear = touched ? touched.getUTCFullYear() : null;
    if (touchedYear && !allowlist.has(slug)) {
      for (const key of ["title", "meta_title"]) {
        const text = field(fm, key);
        if (!text) continue;
        const year = text.match(/\b(19|20)\d{2}\b/);
        if (year && Number(year[0]) < touchedYear) {
          errors.push(
            `${file}: ${key} says ${year[0]} but ${field(fm, "lastmod") ? "lastmod" : "date"} is ${touchedYear}`
          );
        }
      }
    }

    const title = field(fm, "meta_title") ?? field(fm, "title");
    if (title && title.length > 65) {
      (warnings.longTitles[name] ??= []).push(`${slug} (${title.length})`);
    }
    const description = field(fm, "description");
    if (description && description.length > 160) {
      (warnings.longDescriptions[name] ??= []).push(`${slug} (${description.length})`);
    }
  }
}

for (const [locale, items] of Object.entries(warnings.longTitles)) {
  console.warn(
    `warn ${locale}: ${items.length} title(s) >65 chars — ${items.slice(0, 5).join(", ")}${items.length > 5 ? ", …" : ""}`
  );
}
for (const [locale, items] of Object.entries(warnings.longDescriptions)) {
  console.warn(
    `warn ${locale}: ${items.length} description(s) >160 chars — ${items.slice(0, 5).join(", ")}${items.length > 5 ? ", …" : ""}`
  );
}

if (errors.length) {
  console.error(`validate-content-meta: ${errors.length} error(s):`);
  for (const line of errors.slice(0, 50)) console.error(`  ${line}`);
  if (errors.length > 50) console.error(`  … and ${errors.length - 50} more`);
  process.exit(1);
}
console.log("Validated post meta (dates, title years, lengths).");
