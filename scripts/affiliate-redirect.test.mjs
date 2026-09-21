import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const page = await readFile(new URL("../src/pages/go/[product].astro", import.meta.url), "utf8");
const script = page.match(/<script is:inline define:vars=\{\{ slug, url \}\}>([\s\S]*?)<\/script>/)[1];
function run({ search = "", referrer = "", tracker } = {}) {
  const redirects = [], timers = [], events = [];
  const context = {
    slug: "example", url: "https://retailer.example/product?tag=example",
    URL, URLSearchParams,
    document: { referrer },
    window: { location: { origin: "https://www.bitdoze.com", search, replace: (url) => redirects.push(url) } },
    setTimeout: (fn, delay) => timers.push({ fn, delay }),
    plausible: tracker ?? ((name, options) => events.push({ name, options })),
  };
  vm.runInNewContext(script, context);
  return { redirects, timers, events };
}

test("callback redirects once and timeout cannot redirect again", () => {
  const result = run();
  assert.equal(result.events[0].name, "affiliate_click");
  result.events[0].options.callback();
  result.timers[0].fn();
  assert.deepEqual(result.redirects, ["https://retailer.example/product?tag=example"]);
});

test("blocked or slow analytics never removes the 400ms fallback", () => {
  for (const tracker of [() => {}, () => { throw new Error("blocked"); }]) {
    const result = run({ tracker });
    assert.equal(result.timers[0].delay, 400);
    result.timers[0].fn();
    assert.equal(result.redirects.length, 1);
  }
});

test("article attribution strips queries and fragments, including noreferrer links", () => {
  const result = run({ search: "?article=" + encodeURIComponent("/guide/?secret=value#section") });
  assert.equal(result.events[0].options.props.article, "/guide/");
  result.timers[0].fn();
  assert.ok(!result.redirects[0].includes("article="));
});

test("same-origin referrers work and external or missing sources are omitted", () => {
  assert.equal(run({ referrer: "https://www.bitdoze.com/guide/?q=private" }).events[0].options.props.article, "/guide/");
  for (const source of ["https://external.example/guide/", "//external.example/guide/", "/go/example/"]) {
    assert.equal(run({ search: "?article=" + encodeURIComponent(source) }).events[0].options.props.article, undefined);
  }
  assert.equal(run().events[0].options.props.article, undefined);
});

test("redirect page disables automatic pageviews and keeps no-JS fallback", () => {
  assert.match(page, /plausible\.init\(\{ autoCapturePageviews: false \}\)/);
  assert.match(page, /http-equiv="refresh" content=\{`3;url=\$\{url\}`\}/);
  assert.match(page, /<a href=\{url\}/);
});

test("build validation catches invalid maps and rendered links, ignoring code samples", async () => {
  const { mkdtemp, mkdir, writeFile, copyFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { spawnSync } = await import("node:child_process");
  const root = await mkdtemp(join(tmpdir(), "affiliate-validation-"));
  try {
    for (const dir of ["scripts", "src/data", "dist"]) await mkdir(join(root, dir), { recursive: true });
    await copyFile(new URL("./validate-affiliate-links.mjs", import.meta.url), join(root, "scripts/validate-affiliate-links.mjs"));
    const map = join(root, "src/data/affiliate-links.json");
    const html = join(root, "dist/index.html");
    const check = () => spawnSync(process.execPath, [join(root, "scripts/validate-affiliate-links.mjs"), "--dist"], { encoding: "utf8" });
    await writeFile(map, JSON.stringify({ example: { name: "Example", url: "https://retailer.example/" } }));
    await writeFile(html, '<a href="/go/example/?article=%2Fguide%2F">Buy</a><code>&lt;a href="/go/fake/"&gt;</code>');
    assert.equal(check().status, 0);
    await writeFile(html, '<a href="/go/typo/">Buy</a>');
    const badLink = check();
    if (badLink.error) throw badLink.error;
    assert.match(badLink.stderr, /unknown affiliate link \/go\/typo\//);
    await writeFile(map, JSON.stringify({ "Bad Slug": { name: " ", url: "http://retailer.example/" } }));
    const failed = check();
    assert.equal(failed.status, 1);
    assert.match(failed.stderr, /invalid kebab-case slug/);
    assert.match(failed.stderr, /missing product name/);
    assert.match(failed.stderr, /HTTPS URL/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
