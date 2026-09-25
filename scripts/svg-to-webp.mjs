#!/usr/bin/env node
/**
 * scripts/svg-to-webp.mjs
 *
 * Converts every frontmatter `image:` SVG cover to WebP, rewrites the
 * frontmatter reference, and deletes SVGs that are no longer referenced
 * anywhere in src/.
 *
 * Pipeline: resvg-js (SVG -> PNG, system fonts loaded for text) -> sharp (WebP q85).
 *
 * Usage:
 *   node scripts/svg-to-webp.mjs            # convert + rewrite + delete
 *   node scripts/svg-to-webp.mjs --no-delete # convert + rewrite, keep SVGs
 *   node scripts/svg-to-webp.mjs --dry-run   # report what would happen, write nothing
 *
 * Idempotent: skips posts whose `image:` already points to a non-svg asset.
 */

import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "fs";
import { join, dirname, extname, basename, resolve } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const POSTS_DIR = join(ROOT, "src", "content", "posts");
const SRC_DIR = join(ROOT, "src");

const RENDER_WIDTH = 1920; // 16:9 retina-friendly master
const WEBP_QUALITY = 85;

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");
const KEEP_SVGS = args.has("--no-delete");

// --- collect all post files (md + mdx) recursively ---
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(md|mdx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

// extract the frontmatter block (between first two --- lines) as {raw, startLine, endLine}
function getFrontmatter(text) {
  const lines = text.split("\n");
  if (lines[0] !== "---") return null;
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) return null;
  return { startLine: 0, endLine: end, lines };
}

// matches:  image: "../../assets/x.svg"   |   image: ../../assets/x.svg
const IMAGE_SVG_RE = /^(\s*image:\s+["']?)([^"'\s]+\.svg)(["']?\s*)$/;

// resolve a frontmatter image path (relative OR @assets/@images alias) to absolute
function resolveAsset(p, fromPost) {
  if (p.startsWith("@images/"))
    return join(ROOT, "src", "assets", "images", p.slice("@images/".length));
  if (p.startsWith("@assets/")) return join(ROOT, "src", "assets", p.slice("@assets/".length));
  return resolve(dirname(fromPost), p);
}

function convertSvgToWebp(svgPath) {
  const svg = readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: RENDER_WIDTH },
    font: {
      fontDirs: ["/usr/share/fonts"],
      loadSystemFonts: true,
      defaultFontFamily: "DejaVu Sans",
    },
  });
  const png = resvg.render().asPng();
  const webp = sharp(png).webp({ quality: WEBP_QUALITY });
  return webp;
}

// is the basename of svgPath still referenced anywhere under src/?
function isStillReferenced(svgPath) {
  const name = basename(svgPath);
  // shell-safe single-quote wrapping (kebab-case names won't contain quotes,
  // but escape defensively)
  const safe = name.replace(/'/g, `'\''`);
  try {
    // -F fixed string (no regex); matches quoted AND unquoted references.
    // May over-match substrings (e.g. foo.svg inside best-foo.svg) -> keeps SVGs
    // that could be deleted, but NEVER wrongfully deletes a referenced file.
    const out = execSync(
      `grep -rlF --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git -- '${safe}' "${SRC_DIR}" 2>/dev/null || true`
    ).toString();
    return out.trim().length > 0;
  } catch {
    return true; // assume referenced on error -> don't delete
  }
}

async function main() {
  const posts = walk(POSTS_DIR);
  // Candidates are found first; frontmatter is only rewritten for SVGs that
  // rendered successfully, and an SVG is only deleted once its .webp exists.
  const candidates = []; // {svg, webp, post, lineIndex, newLine, ok}
  const missing = [];
  const rewritten = [];
  let skippedNonSvg = 0;

  for (const post of posts) {
    const text = readFileSync(post, "utf8");
    const fm = getFrontmatter(text);
    if (!fm) continue;

    let foundSvg = false;
    for (let i = fm.startLine; i <= fm.endLine; i++) {
      const m = fm.lines[i].match(IMAGE_SVG_RE);
      if (!m) continue;
      foundSvg = true;
      const svgRel = m[2];
      const svgAbs = resolveAsset(svgRel, post);
      if (!existsSync(svgAbs)) {
        missing.push({ post, svgRel });
        continue;
      }
      const webpAbs = svgAbs.replace(/\.svg$/i, ".webp");
      const webpRel = svgRel.replace(/\.svg$/i, ".webp");
      candidates.push({
        svg: svgAbs,
        webp: webpAbs,
        post,
        lineIndex: i,
        newLine: `${m[1]}${webpRel}${m[3]}`,
        ok: false,
      });
    }

    if (!foundSvg) skippedNonSvg++;
  }

  // --- render + write WebP files (BEFORE touching frontmatter) ---
  let rendered = 0;
  const renderErrors = [];
  if (!DRY_RUN) {
    for (const candidate of candidates) {
      try {
        const buf = await convertSvgToWebp(candidate.svg);
        await buf.toFile(candidate.webp);
        candidate.ok = true;
        rendered++;
      } catch (e) {
        renderErrors.push({ svg: candidate.svg, err: String(e) });
      }
    }
  } else {
    candidates.forEach((c) => (c.ok = true));
  }

  // --- rewrite frontmatter, only for posts whose render succeeded ---
  const byPost = new Map();
  for (const candidate of candidates) {
    if (!candidate.ok) continue;
    if (!byPost.has(candidate.post)) byPost.set(candidate.post, []);
    byPost.get(candidate.post).push(candidate);
  }
  for (const [post, changes] of byPost) {
    if (DRY_RUN) {
      rewritten.push(post);
      continue;
    }
    const lines = readFileSync(post, "utf8").split("\n");
    for (const { lineIndex, newLine } of changes) lines[lineIndex] = newLine;
    writeFileSync(post, lines.join("\n"), "utf8");
    rewritten.push(post);
  }

  // --- delete SVGs no longer referenced ---
  // Only when the fresh .webp exists on disk AND the frontmatter rewrite above
  // removed the last reference. Failed renders keep their SVG (and the post
  // still points at it).
  let deleted = 0;
  const keptReferenced = [];
  const renderedSvgs = new Set(candidates.filter((c) => c.ok).map((c) => c.svg));
  if (!DRY_RUN && !KEEP_SVGS) {
    for (const svg of renderedSvgs) {
      if (!existsSync(svg.replace(/\.svg$/i, ".webp"))) continue;
      if (isStillReferenced(svg)) {
        keptReferenced.push(svg);
        continue;
      }
      try {
        rmSync(svg, { force: true });
        deleted++;
      } catch (e) {
        renderErrors.push({ svg, err: "delete failed: " + String(e) });
      }
    }
  }

  // --- summary ---
  console.log("--- svg-to-webp summary ---");
  console.log(`posts scanned         : ${posts.length}`);
  console.log(
    `frontmatter rewritten : ${rewritten.length}${DRY_RUN ? " (dry-run, not written)" : ""}`
  );
  console.log(`svg covers found      : ${candidates.length}`);
  console.log(`webp rendered         : ${rendered}`);
  if (!DRY_RUN && !KEEP_SVGS) {
    console.log(`svg deleted           : ${deleted}`);
    console.log(`svg kept (still ref)  : ${keptReferenced.length}`);
  } else {
    console.log(
      `svg deletion          : ${KEEP_SVGS ? "skipped (--no-delete)" : "skipped (dry-run)"}`
    );
  }
  console.log(`posts without svg img : ${skippedNonSvg}`);
  if (missing.length) {
    console.log(`\nmissing svg files (${missing.length}):`);
    missing.forEach((m) => console.log(`  - ${m.post} -> ${m.svgRel}`));
  }
  if (renderErrors.length) {
    console.log(`\nerrors (${renderErrors.length}):`);
    renderErrors.forEach((e) => console.log(`  - ${e.svg}: ${e.err}`));
  }
  if (keptReferenced.length) {
    console.log(`\nsvg kept because still referenced (${keptReferenced.length}):`);
    keptReferenced.forEach((s) => console.log(`  - ${s}`));
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
