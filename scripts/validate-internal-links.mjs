/**
 * Validate internal links in dist/ after `astro build`.
 *
 * Every root-relative <a href="/…"> in every built HTML page must resolve to
 * something Cloudflare can serve: a real file, a directory with index.html,
 * or a source pattern in public/_redirects (edge 301s). Anything else is a
 * broken link a crawler will hit. Also fails on links to directories that
 * lack the trailing slash (they 301 and lose a round-trip).
 *
 * Wired into `bun run build` right after validate-affiliate-links.mjs --dist.
 */
import { existsSync, statSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dist = path.join(root, "dist");

// Redirect sources are literal paths (no splats in this file today).
const redirects = new Set();
for (const line of (await readFile(path.join(root, "public/_redirects"), "utf8")).split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  redirects.add(trimmed.split(/\s+/)[0]);
}

const SKIP = /^\/pagefind\//;
const HREF_RE = /<a\b[^>]*?\bhref\s*=\s*["'](\/[^"']*)["']/gi;

const isFile = (p) => existsSync(p) && statSync(p).isFile();
const isDirWithIndex = (p) =>
  existsSync(p) && statSync(p).isDirectory() && isFile(path.join(p, "index.html"));

const problems = [];
// The same href appears on hundreds of pages — resolve each target once.
const resolved = new Map();
function checkTarget(target) {
  if (resolved.has(target)) return resolved.get(target);
  let result = null;
  const fsPath = path.join(dist, target);
  if (isFile(fsPath)) {
    result = null;
  } else if (isDirWithIndex(fsPath)) {
    result = target.endsWith("/") ? null : "directory link missing trailing slash";
  } else if (!redirects.has(target)) {
    result = "no file, no index, no redirect";
  }
  resolved.set(target, result);
  return result;
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    const page =
      "/" +
      path
        .relative(dist, file)
        .replace(/index\.html$/, "")
        .replace(/\.html$/, "");
    for (const match of html.matchAll(HREF_RE)) {
      let target = match[1].replace(/&amp;/g, "&");
      target = target.split("#")[0].split("?")[0];
      if (!target || target === "/" || SKIP.test(target)) continue;
      const problem = checkTarget(target);
      if (problem) problems.push(`${page} -> ${match[1]} (${problem})`);
    }
  }
}

await walk(dist);

if (problems.length) {
  console.error(`validate-internal-links: ${problems.length} broken internal link(s):`);
  for (const line of problems.slice(0, 50)) console.error(`  ${line}`);
  if (problems.length > 50) console.error(`  … and ${problems.length - 50} more`);
  process.exit(1);
}
console.log("Validated internal links in dist/.");
