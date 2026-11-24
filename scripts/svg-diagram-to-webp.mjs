#!/usr/bin/env node
/**
 * scripts/svg-diagram-to-webp.mjs
 *
 * Renders one inline SVG diagram (architecture, request flow, pipeline) to WebP.
 * Companion to scripts/svg-to-webp.mjs, which only handles frontmatter covers.
 * Article diagrams are served as WebP; the SVG stays in the pipeline working
 * folder and never lands in src/.
 *
 * Pipeline: resvg-js (SVG -> PNG, system fonts loaded for text) -> sharp (WebP).
 *
 * Usage:
 *   node scripts/svg-diagram-to-webp.mjs in.svg out.webp [width=1920] [quality=85]
 */

import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";

const [input, output, widthArg, qualityArg] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: node scripts/svg-diagram-to-webp.mjs in.svg out.webp [width=1920] [quality=85]");
  process.exit(2);
}

const width = Number(widthArg) || 1920;
const quality = Number(qualityArg) || 85;

const svg = readFileSync(input, "utf8");
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: width },
  font: { loadSystemFonts: true, defaultFontFamily: "DejaVu Sans" },
  background: "#ffffff",
});
const png = resvg.render().asPng();
await sharp(png).webp({ quality }).toFile(output);

const meta = await sharp(output).metadata();
console.log(`${output} ${meta.width}x${meta.height} ${statSync(output).size} bytes`);
