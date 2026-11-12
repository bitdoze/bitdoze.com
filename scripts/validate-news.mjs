/**
 * Validate src/content/news/*.mdx before build.
 *
 * News digests are researched and written by an external AI agent from live
 * web content. MDX import/export statements and {} expressions execute during
 * the build, so a prompt-injected digest could run code in CI. This gate
 * rejects anything outside the documented digest contract:
 *   - import/export statements
 *   - <script> tags
 *   - { } JSX expressions outside fenced code blocks
 *   - javascript:/data: URLs
 *   - images of any kind
 *
 * Wired into `bun run build` / `build:ci` alongside validate-affiliate-links.
 */
import { readdir, readFile } from "node:fs/promises";

const NEWS_DIR = new URL("../src/content/news/", import.meta.url);

const RULES = [
  { re: /^(import|export)\s/m, msg: "import/export statement" },
  { re: /<script\b/i, msg: "<script> tag" },
  { re: /javascript\s*:/i, msg: "javascript: URL" },
  { re: /data\s*:\s*text\/html/i, msg: "data:text/html URL" },
  { re: /!\[/, msg: "markdown image" },
  { re: /<img\b/i, msg: "<img> tag" },
];

/** Strip fenced code blocks AND inline `code` so `{x}`/`import` in samples is legal. */
function stripCodeFences(body) {
  return body.replace(/^```[\s\S]*?^```/gm, "").replace(/`[^`\n]+`/g, "");
}

let failed = 0;
const files = (await readdir(NEWS_DIR)).filter((f) => /\.mdx?$/.test(f));

for (const file of files) {
  const raw = await readFile(new URL(file, NEWS_DIR), "utf8");
  const body = stripCodeFences(raw);
  for (const { re, msg } of RULES) {
    if (re.test(body)) {
      console.error(`news/${file}: forbidden content — ${msg}`);
      failed++;
    }
  }
  // A stray { or } outside code fences means a JSX expression — MDX would
  // evaluate it at build time.
  const stripped = body.replace(/^---[\s\S]*?---/, ""); // drop frontmatter
  if (/[{}]/.test(stripped)) {
    console.error(`news/${file}: forbidden content — {} JSX expression`);
    failed++;
  }
}

if (failed) {
  console.error(`\nvalidate-news: ${failed} violation(s) in src/content/news/`);
  process.exit(1);
}
console.log(`Validated ${files.length} news digests.`);
