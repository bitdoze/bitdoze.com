/**
 * Regenerate public/_redirects from src/config/redirects.mjs.
 *
 * The astro.config `redirects:` map only uses trailing-slash keys (Astro 7
 * rejects "/path" + "/path/" pairs). Cloudflare needs both forms as real 301s,
 * so this script emits <src> and <src/> per entry.
 *
 * Also emits /news/<date>/ → /news/ 301 for digests that fell out of the
 * rolling window (src/content/news/ beyond NEWS_DIGEST_LIMIT), so links a
 * digest earned before expiring don't dead-end on a 404.
 *
 * Runs automatically inside `bun run build` / `build:ci`; also runnable
 * standalone: node scripts/sync-redirects.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { redirects } from "../src/config/redirects.mjs";

// Mirror of NEWS_DIGEST_LIMIT in src/utils/news.ts — kept as a literal so this
// script has no Astro/content-collection dependency.
const NEWS_DIGEST_LIMIT = 10;

const header = `# Cloudflare Pages static redirects — GENERATED FILE.
# Source of truth: src/config/redirects.mjs. Regenerate with:
#   node scripts/sync-redirects.mjs
# Do not hand-edit; changes are overwritten at build time.
`;

/** Expired digest slugs: files past the rolling window + pruned dates in
 *  scripts/expired-news.json (deleted files leave no on-disk trace). */
export async function expiredNewsRedirects() {
  const newsDir = new URL("../src/content/news/", import.meta.url);
  const names = (await readdir(newsDir))
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.mdx?$/.test(f))
    .map((f) => f.replace(/\.mdx?$/, ""))
    .sort()
    .reverse(); // newest first
  const onDisk = names.slice(NEWS_DIGEST_LIMIT);

  let pruned = [];
  try {
    const manifest = JSON.parse(
      await readFile(new URL("./expired-news.json", import.meta.url), "utf8")
    );
    pruned = Array.isArray(manifest.slugs) ? manifest.slugs : [];
  } catch {
    /* manifest optional */
  }

  return [...new Set([...onDisk, ...pruned])];
}

export async function renderRedirects(map) {
  const lines = [];
  for (const [src, dst] of Object.entries(map)) {
    const bare = src.replace(/\/+$/, "") || "/";
    const slashed = `${bare}/`;
    lines.push(`${bare.padEnd(36)} ${dst} 301`);
    if (slashed !== bare) lines.push(`${slashed.padEnd(36)} ${dst} 301`);
  }
  for (const slug of await expiredNewsRedirects()) {
    lines.push(`/news/${slug.padEnd(32)} /news/ 301`);
    lines.push(`/news/${slug}/`.padEnd(36) + ` /news/ 301`);
  }
  return header + "\n" + lines.join("\n") + "\n";
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = await renderRedirects(redirects);
  await writeFile(new URL("../public/_redirects", import.meta.url), out);
  const expired = await expiredNewsRedirects();
  console.log(
    `Wrote public/_redirects with ${Object.keys(redirects).length} rules` +
      (expired.length ? ` + ${expired.length} expired-digest rules` : "")
  );
}
