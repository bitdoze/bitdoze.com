#!/usr/bin/env node
// Regenerates translations/index.json — the EN↔ES article map used for
// interlinking while translating. Run after adding/renaming any post:
//   node scripts/build-translation-index.mjs
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { parse } from "yaml";

const POSTS_DIR = new URL("../src/content/posts/", import.meta.url).pathname;
const OUT_DIR = new URL("../translations/", import.meta.url).pathname;

function frontmatter(file) {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? parse(m[1]) : {};
}

function scan(dir, locale) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => {
      const fm = frontmatter(join(dir, f));
      const slug = basename(f).replace(/\.(md|mdx)$/, "");
      const key = fm.translationKey || slug;
      return {
        slug,
        title: fm.title || "",
        translationKey: key,
        url: locale === "es" ? `/es/${slug}/` : `/${slug}/`,
        date: fm.date ? String(fm.date).slice(0, 10) : null,
        category: Array.isArray(fm.categories) ? fm.categories[0] : null,
        draft: !!fm.draft,
        file: `src/content/posts/${locale === "es" ? "es/" : ""}${f}`,
      };
    });
}

const en = scan(POSTS_DIR, "en");
const es = scan(join(POSTS_DIR, "es"), "es");
const esByKey = new Map(es.map((p) => [p.translationKey, p]));

const articles = en
  .map((p) => {
    const t = esByKey.get(p.slug);
    return {
      enSlug: p.slug,
      enTitle: p.title,
      enUrl: p.url,
      enFile: p.file,
      date: p.date,
      category: p.category,
      draft: p.draft,
      status: t ? "translated" : "pending",
      esSlug: t?.slug ?? null,
      esTitle: t?.title ?? null,
      esUrl: t?.url ?? null,
      esFile: t?.file ?? null,
    };
  })
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

// Warn on ES orphans / duplicate keys (bad input, not fatal)
const enSlugs = new Set(en.map((p) => p.slug));
const orphans = es.filter((p) => !enSlugs.has(p.translationKey));
if (orphans.length) {
  console.warn("WARNING: ES posts with no EN counterpart:", orphans.map((p) => p.slug).join(", "));
}
const seen = new Set();
const dupes = es.filter((p) => (seen.has(p.translationKey) ? true : (seen.add(p.translationKey), false)));
if (dupes.length) {
  console.warn("WARNING: duplicate translationKey:", dupes.map((p) => p.translationKey).join(", "));
}

mkdirSync(OUT_DIR, { recursive: true });
const out = {
  generated: new Date().toISOString().slice(0, 10),
  totals: { en: en.length, translated: es.length, pending: en.length - es.length },
  articles,
};
writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote translations/index.json — ${en.length} EN posts, ${es.length} translated, ${en.length - es.length} pending`);
