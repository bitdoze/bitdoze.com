/**
 * Regenerate public/_redirects from src/config/redirects.mjs.
 *
 * The astro.config `redirects:` map only uses trailing-slash keys (Astro 7
 * rejects "/path" + "/path/" pairs). Cloudflare needs both forms as real 301s,
 * so this script emits <src> and <src/> per entry.
 *
 * Runs automatically inside `bun run build` / `build:ci`; also runnable
 * standalone: node scripts/sync-redirects.mjs
 */
import { writeFile } from "node:fs/promises";
import { redirects } from "../src/config/redirects.mjs";

const header = `# Cloudflare Pages static redirects — GENERATED FILE.
# Source of truth: src/config/redirects.mjs. Regenerate with:
#   node scripts/sync-redirects.mjs
# Do not hand-edit; changes are overwritten at build time.
`;

export function renderRedirects(map) {
  const lines = [];
  for (const [src, dst] of Object.entries(map)) {
    const bare = src.replace(/\/+$/, "") || "/";
    const slashed = `${bare}/`;
    lines.push(`${bare.padEnd(36)} ${dst} 301`);
    if (slashed !== bare) lines.push(`${slashed.padEnd(36)} ${dst} 301`);
  }
  return header + "\n" + lines.join("\n") + "\n";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await writeFile(new URL("../public/_redirects", import.meta.url), renderRedirects(redirects));
  console.log(`Wrote public/_redirects with ${Object.keys(redirects).length} rules`);
}
