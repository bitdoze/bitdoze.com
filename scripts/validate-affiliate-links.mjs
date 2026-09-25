import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const links = JSON.parse(await readFile(path.join(root, "src/data/affiliate-links.json"), "utf8"));
const errors = [];
if (!links || typeof links !== "object" || Array.isArray(links)) {
  throw new Error("Affiliate map must be an object keyed by slug.");
}
for (const [slug, entry] of Object.entries(links)) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`${slug}: invalid kebab-case slug`);
  if (typeof entry?.name !== "string" || !entry.name.trim())
    errors.push(`${slug}: missing product name`);
  try {
    const url = new URL(entry?.url);
    if (url.protocol !== "https:" || url.username || url.password) throw new Error();
  } catch {
    errors.push(`${slug}: destination must be an HTTPS URL without credentials`);
  }
}

// Inspect rendered anchors so Markdown, MDX widgets and reference links are
// covered, while tutorial code examples never count as actual links.
let checked = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspect(file);
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']*)["'][^>]*>/gi)) {
      let url;
      try {
        url = new URL(
          match[1].replace(/&amp;/g, "&"),
          "https://www.bitdoze.com/" + path.relative(path.join(root, "dist"), file)
        );
      } catch {
        continue;
      }
      if (
        url.origin !== "https://www.bitdoze.com" ||
        !url.pathname.startsWith("/go/") ||
        url.pathname === "/go/"
      )
        continue;
      checked++;
      const slug = url.pathname.slice(4).replace(/\/$/, "");
      if (!Object.hasOwn(links, slug))
        errors.push(`${path.relative(root, file)}: unknown affiliate link ${url.pathname}`);
    }
  }
}
if (process.argv.includes("--dist")) await inspect(path.join(root, "dist"));
if (errors.length) {
  console.error("Affiliate link validation failed:\n" + errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${Object.keys(links).length} affiliate products${checked ? ` and ${checked} rendered links` : ""}.`
  );
}
