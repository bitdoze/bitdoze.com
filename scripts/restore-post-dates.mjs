/**
 * Restore post `date:` from git history (opus-55-improvements §4.1).
 *
 * Many posts have had their `date` bumped on refresh, so `datePublished`
 * claims the article is newer than it is. Rules:
 *  - EN `date` = the file's first-commit day, for files added after the bulk
 *    import. Files first committed in the import window (through 2025-03-08)
 *    keep their frontmatter date — that date is historical and correct.
 *  - ES `date` mirrors the EN twin (matched via `translationKey`) — an ES
 *    file's own first commit is the translation date, not the publish date.
 *  - The replaced (drifted) value is preserved as `lastmod` unless a newer
 *    `lastmod` already exists.
 *
 *   node scripts/restore-post-dates.mjs --dry-run
 *   node scripts/restore-post-dates.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const POSTS_DIR = path.join(ROOT, "src/content/posts");
const ES_DIR = path.join(POSTS_DIR, "es");
const IMPORT_END = new Date("2025-03-08T00:00:00Z");
const DRY = process.argv.includes("--dry-run");

const firstCommitDay = (file) => {
  try {
    const out = execFileSync(
      "git",
      ["log", "--diff-filter=A", "--follow", "--format=%aI", "--", file],
      { cwd: ROOT, encoding: "utf8" }
    ).trim();
    const last = out.split("\n").filter(Boolean).pop();
    return last ? { day: last.slice(0, 10), date: new Date(last) } : null;
  } catch {
    return null;
  }
};

const parseFm = (src) => {
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  return { block: m[0], body: m[1] };
};

const field = (fm, name) => fm.match(new RegExp(`^${name}:\\s*(.+)$`, "m"))?.[1].trim();

/** Rewrite date (and lastmod) inside a frontmatter block. */
function setDates(fmBody, newDate, lastmodIso) {
  let fm = fmBody.replace(/^date:\s*.+$/m, `date: ${newDate}`);
  const lm = fm.match(/^lastmod:\s*(.+)$/m);
  if (lastmodIso) {
    if (!lm) fm = fm.replace(`date: ${newDate}`, `date: ${newDate}\nlastmod: ${lastmodIso}`);
    else if (new Date(lm[1].trim()) < new Date(lastmodIso))
      fm = fm.replace(lm[0], `lastmod: ${lastmodIso}`);
  }
  return fm;
}

// ---- Pass A: English posts ------------------------------------------------
const enFiles = (await readdir(POSTS_DIR)).filter((f) => /\.mdx?$/.test(f));
const enByKey = new Map(); // translationKey -> {file, restoredDay}
let changed = 0,
  skipped = 0;

for (const name of enFiles) {
  const file = path.join(POSTS_DIR, name);
  const src = await readFile(file, "utf8");
  const fm = parseFm(src);
  if (!fm) continue;
  const key =
    field(fm.body, "translationKey") ??
    field(fm.body, "canonical")
      ?.replace(/^https?:\/\/[^/]+/, "")
      .replace(/^\/|\/$/g, "") ??
    name.replace(/\.mdx?$/, "");

  const currentDay = field(fm.body, "date")?.slice(0, 10);
  const first = firstCommitDay(file);
  if (!first) {
    enByKey.set(key, { restoredDay: currentDay });
    continue; // uncommitted — nothing to restore from
  }
  if (first.date < IMPORT_END) {
    skipped++;
    enByKey.set(key, { restoredDay: currentDay });
    continue; // import-era: frontmatter date is historical
  }
  if (!currentDay || first.day === currentDay) {
    enByKey.set(key, { restoredDay: currentDay });
    continue;
  }

  const drifted = new Date(currentDay);
  const lastmodIso = drifted > first.date ? drifted.toISOString() : null;
  console.log(`${name}: ${currentDay} → ${first.day}`);
  if (!DRY) await writeFile(file, src.replace(fm.body, setDates(fm.body, first.day, lastmodIso)));
  enByKey.set(key, { restoredDay: first.day });
  changed++;
}

// ---- Pass B: Spanish twins mirror the restored EN date --------------------
let esChanged = 0;
for (const name of await readdir(ES_DIR)) {
  if (!/\.mdx?$/.test(name)) continue;
  const file = path.join(ES_DIR, name);
  const src = await readFile(file, "utf8");
  const fm = parseFm(src);
  if (!fm) continue;
  const key = field(fm.body, "translationKey");
  const en = key && enByKey.get(key);
  if (!en?.restoredDay) continue; // no EN twin found — leave untouched

  const esDay = field(fm.body, "date")?.slice(0, 10);
  if (!esDay || esDay === en.restoredDay) continue;

  const drifted = new Date(esDay);
  const lastmodIso = drifted > new Date(en.restoredDay) ? drifted.toISOString() : null;
  console.log(`es/${name}: ${esDay} → ${en.restoredDay} (mirrors EN twin)`);
  if (!DRY)
    await writeFile(file, src.replace(fm.body, setDates(fm.body, en.restoredDay, lastmodIso)));
  esChanged++;
}

console.log(
  `\n${changed} EN + ${esChanged} ES post(s) ${DRY ? "would be " : ""}restored; ${skipped} import-era skipped.`
);
