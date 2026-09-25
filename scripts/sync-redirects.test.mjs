import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderRedirects } from "./sync-redirects.mjs";
import { redirects } from "../src/config/redirects.mjs";

test("public/_redirects matches src/config/redirects.mjs", async () => {
  const committed = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
  assert.equal(
    committed,
    renderRedirects(redirects),
    "public/_redirects is stale — edit src/config/redirects.mjs and run `node scripts/sync-redirects.mjs`"
  );
});

test("redirect keys are trailing-slash only (Astro 7 collision rule)", () => {
  for (const key of Object.keys(redirects)) {
    assert.ok(key.endsWith("/"), `${key} must end with /`);
  }
});

test("internal targets are trailing-slash absolute paths or absolute URLs", () => {
  for (const [src, dst] of Object.entries(redirects)) {
    if (dst.startsWith("http")) continue;
    assert.ok(dst.startsWith("/") && dst.endsWith("/"), `${src} → ${dst} must be /path/`);
  }
});
