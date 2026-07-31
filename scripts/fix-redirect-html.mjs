#!/usr/bin/env node
/**
 * Astro emits redirect pages without a root <html> element, e.g.:
 *   <!doctype html><title>…</title>…<body>…</body>
 *
 * Pagefind then warns and skips them ("has no <html> element").
 * This post-build pass:
 *  1. Wraps those stubs in a proper <html><head>…</head><body>…</body></html>
 *  2. Marks them data-pagefind-ignore so they never pollute search
 *
 * Usage: node scripts/fix-redirect-html.mjs [distDir]
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = process.argv[2] || "dist";

/** @param {string} dir @param {string[]} acc */
function walkHtml(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkHtml(full, acc);
    else if (name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

function isRedirectStub(html) {
  // Astro static redirect template (no <html>, has refresh meta + "Redirecting")
  if (/<html[\s>]/i.test(html)) return false;
  return (
    /http-equiv=["']refresh["']/i.test(html) ||
    /Redirecting from/i.test(html) ||
    /Redirecting to:/i.test(html)
  );
}

function wrapRedirect(html) {
  // Strip doctype if present; we'll re-add a full document.
  let body = html.replace(/<!doctype html>/i, "").trim();

  // Move leading head-ish tags out of a bare body if needed.
  // Typical Astro output: <title>…</title><meta…><link…><body>…</body>
  let headInner = "";
  let bodyInner = body;

  const bodyMatch = body.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    headInner = body.slice(0, bodyMatch.index).trim();
    bodyInner = bodyMatch[1];
  } else {
    // No body tag — treat entire content as head+inline
    headInner = body;
    bodyInner = "";
  }

  if (!/<title[\s>]/i.test(headInner)) {
    headInner = `<title>Redirecting</title>\n${headInner}`;
  }
  if (!/<meta[^>]+charset=/i.test(headInner)) {
    headInner = `<meta charset="utf-8">\n${headInner}`;
  }

  return `<!doctype html>
<html lang="en" data-pagefind-ignore>
<head>
${headInner}
</head>
<body data-pagefind-ignore>
${bodyInner}
</body>
</html>
`;
}

const files = walkHtml(DIST);
let fixed = 0;

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  if (!isRedirectStub(raw)) continue;
  writeFileSync(file, wrapRedirect(raw));
  fixed++;
  console.log(`fixed redirect html: ${relative(process.cwd(), file)}`);
}

console.log(`fix-redirect-html: ${fixed} page(s) updated`);
