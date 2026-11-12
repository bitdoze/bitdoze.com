#!/usr/bin/env node
/**
 * One-off fix: every post with affiliate links must carry a disclosure before
 * the first such link (AGENTS.md rule). Two link families are covered:
 *
 *   - /go/<slug>/            — Amazon/product redirects → warning Notice box
 *   - go.bitdoze.com/...     — hosting/tool referrals → one-line disclosure
 *
 * Posts with a disclosure placed AFTER the first link get it moved up.
 * Placement is always the top of the body, right after the import block —
 * the position the existing notices already use on the newer posts.
 *
 * Run: node scripts/fix-disclosure-order.mjs [--dry-run]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src/content/posts", import.meta.url));
const DRY = process.argv.includes("--dry-run");

const DISC_TITLE = /(affiliate disclosure|divulgaci[oó]n de afiliados|aviso de afiliados?)/i;
const GO_LINK = /["'(]\/go\//;
const GBC_LINK = /go\.bitdoze\.com\//;

const NOTICE_EN = [
  '<Notice type="warning" title="Affiliate Disclosure">',
  "This article contains affiliate links. If you buy through them, I may earn a commission at no extra cost to you.",
  "</Notice>",
];
const NOTICE_ES = [
  '<Notice type="warning" title="Divulgación de afiliados">',
  "Este artículo contiene enlaces de afiliados. Si compras a través de ellos, puedo recibir una comisión sin coste adicional para ti.",
  "</Notice>",
];
const LINE_EN =
  "*Disclosure: this guide contains referral links. If you buy through them, I may earn a commission at no extra cost to you.*";
const LINE_ES =
  "*Divulgación: esta guía contiene enlaces de referido. Si compras a través de ellos, puedo recibir una comisión sin coste adicional para ti.*";

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.mdx?$/.test(name)) yield p;
  }
}

let moved = 0,
  addedNotice = 0,
  addedLine = 0,
  skipped = 0;

for (const file of walk(root)) {
  const isEs = file.includes(
    `${process.platform === "win32" ? "\\" : "/"}es${process.platform === "win32" ? "\\" : "/"}`
  );
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  // Locate frontmatter end, then walk the body tracking code fences.
  let fmEnd = -1;
  if (lines[0]?.trim() === "---") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "---") {
        fmEnd = i;
        break;
      }
    }
  }

  let inCode = false;
  let firstGo = -1,
    firstGbc = -1,
    discStart = -1,
    discEnd = -1;

  for (let i = fmEnd + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    if (firstGo < 0 && GO_LINK.test(line)) firstGo = i;
    if (firstGbc < 0 && GBC_LINK.test(line)) firstGbc = i;
    if (discStart < 0 && /<Notice\b/.test(line) && DISC_TITLE.test(line)) {
      discStart = i;
      for (let j = i; j < lines.length; j++) {
        if (lines[j].includes("</Notice>")) {
          discEnd = j;
          break;
        }
      }
      if (discEnd < 0) discEnd = i;
    }
  }

  const firstAff = [firstGo, firstGbc].filter((n) => n >= 0).sort((a, b) => a - b)[0];
  if (firstAff === undefined) continue; // no affiliate links at all

  // Disclosure already sits above the first affiliate link.
  if (discStart >= 0 && discStart < firstAff) {
    skipped++;
    continue;
  }

  // Insertion point: end of frontmatter → skip blank lines → skip the leading
  // run of `import` statements → land on the first content line.
  let insertAt = fmEnd + 1;
  while (insertAt < lines.length && lines[insertAt].trim() === "") insertAt++;
  while (insertAt < lines.length && /^import\s/.test(lines[insertAt].trim())) insertAt++;
  while (insertAt < lines.length && lines[insertAt].trim() === "") insertAt++;

  let block;
  let action;
  if (discStart >= 0) {
    // Disclosure exists but sits below the first link → move it up.
    block = lines.slice(discStart, discEnd + 1);
    lines.splice(discStart, discEnd - discStart + 1);
    // Recompute insertion point: removing lines may shift it.
    let i2 = fmEnd + 1;
    while (i2 < lines.length && lines[i2].trim() === "") i2++;
    while (i2 < lines.length && /^import\s/.test(lines[i2].trim())) i2++;
    while (i2 < lines.length && lines[i2].trim() === "") i2++;
    insertAt = i2;
    action = "moved";
    moved++;
  } else if (firstGo >= 0) {
    block = isEs ? NOTICE_ES : NOTICE_EN;
    action = "added Notice";
    addedNotice++;
  } else {
    block = [isEs ? LINE_ES : LINE_EN];
    action = "added line";
    addedLine++;
  }

  const out = [...lines.slice(0, insertAt), ...block, "", ...lines.slice(insertAt)];
  if (!DRY) writeFileSync(file, out.join("\n"));
  console.log(`${action.padEnd(13)} ${file.replace(/^.*posts\//, "posts/")}`);
}

console.log(
  `\n${DRY ? "DRY RUN — " : ""}moved: ${moved}, notices added: ${addedNotice}, lines added: ${addedLine}, already ok: ${skipped}`
);
