# Translation Handover — resume instructions

**Status as of last session:** 184 of 376 EN posts translated, **192 pending**.
Index of record: `translations/index.json` (regenerate: `node scripts/build-translation-index.mjs`).
Per-article log: `translations/LOG.md` (append a row per completed translation).

## Goal

Translate every remaining `status: "pending"` article in `translations/index.json` into
`src/content/posts/es/<es-slug>.mdx`, newest pending first. User reviews the result; do
NOT commit/push during translation runs unless the user explicitly asks.

## Pipeline that works (keep doing this)

1. List next pending: `node -e "const d=require('./translations/index.json');d.articles.filter(p=>p.status==='pending').slice(0,12).forEach(p=>console.log(p.enSlug))"`
2. Launch **3 background `subagent_general` agents in parallel**, one article each, with the
   prompt template below. As each finishes, launch the next pending article.
3. After each subagent report: append a row to `translations/LOG.md`.
4. Every ~10 completed articles: `node scripts/build-translation-index.mjs`, then run the build chain (below). Fix failures, re-run.
5. Repeat until 0 pending.

## Subagent prompt template (paste verbatim, filling SOURCE/DEST/SLUG/known-ES)

```
Translate an English MDX blog post to Spanish for the bitdoze.com Astro blog.

SOURCE: /home/dragos/projects/bitdoze.com/src/content/posts/<en-slug>.mdx
DEST: /home/dragos/projects/bitdoze.com/src/content/posts/es/<es-slug>.mdx

RULES:
1. Frontmatter: copy all fields. Translate `title`, `meta_title`, `description`, `imageAlt`
   if present. Add `translationKey: "<en-slug>"` after `lastmod` (or `date` if none).
   `image` path `"../../assets/..."` → `"@assets/..."`.
   `canonical` → `"https://www.bitdoze.com/es/<es-slug>/"`. Keep `date`/`lastmod`/`categories`/
   `authors` identical; tags identical unless 4+ (then keep 3 most specific kebab-case).
2. Translate ALL prose/headings/tables/notices/accordions/captions/lists to natural Spanish
   WITH accents (á é í ó ú ñ ¿ ¡).
3. DO NOT translate: code blocks (byte-for-byte incl. comments), commands, file paths,
   URLs, product names.
4. All `"../../assets/..."` → `"@assets/..."`. `@components/...` imports stay (convert
   `../../components/` too — the ES file sits one level deeper).
5. Internal links: check each post link in translations/index.json (`articles[]`, field
   `esSlug` — `/es/<esSlug>/` when non-null, else keep EN URL). If index lags but the ES
   file exists on disk, use the ES URL anyway. External + `/go/` unchanged.
6. `#anchors` → translated heading slugs (github-slugger: lowercase, spaces→hyphens,
   strip punctuation, accents preserved).
7. Escape backslashes in JSX strings (`\\`). Translate `text`/`title`/`label`/`name` props.
8. Preserve structure exactly; ~same line count.

VERIFY: `wc -l` ±10%; `grep '../../assets'` = 0; translationKey + ES canonical present;
scan for untranslated prose.

Write via `cat > file <<'MDXEOF'` then `cat >>` — NEVER use bare `EOF` as the delimiter
(articles contain literal EOF heredocs that will truncate the file). Do NOT edit
translations/*. Report: path, line count, ES links, issues.
```

## Build chain (after every ~10 translations)

```bash
cd /home/dragos/projects/bitdoze.com
node scripts/sync-redirects.mjs && \
node scripts/validate-affiliate-links.mjs && \
NODE_OPTIONS="${NODE_OPTIONS:-} --import ./scripts/node-bootstrap.mjs" ./node_modules/.bin/astro build && \
node scripts/fix-redirect-html.mjs && \
node scripts/validate-affiliate-links.mjs --dist && \
./node_modules/.bin/pagefind --site dist
```

(`astro`/`pagefind` are not on PATH — use `./node_modules/.bin/`.)
Expected: ~1.4k+ pages, "Validated 79 affiliate products and NNN rendered links", Pagefind
indexes `es` + `en`. Shiki "language doesn't exist" warnings are normal.

## Gotchas learned (tell subagents / watch for)

- **`../../assets` breaks in ES files** — always `@assets/`. Same for `../../components` → `@components/`.
- **Backslashes in JSX strings** must be escaped (`"\\"`), else MDX compile error.
- **Heredoc delimiter**: several MDX files contain literal `EOF` lines (systemd/curl heredoc
  examples). Using `EOF` as the write delimiter truncates the file AND can execute trailing
  lines as shell commands — always use `MDXEOF` or similar.
- **Index lag**: `index.json` is rebuilt periodically; subagents should also check whether
  an ES file exists on disk when `esSlug` is null.
- Tags >3 must be trimmed to the 3 most specific (schema normalizes but taxonomy requires ≤3).
- `YouTubeEmbed`/`Notice`/etc. need no import (injected via mdxComponents) — mirror the EN file.
- Internal links to still-pending articles stay EN; once that article is later translated,
  ideally revisit — but the ES/EN hreflang pairing covers it, so not blocking.
- Literal UI labels (dashboard buttons, settings names) stay English in «» quotes.

## Next pending articles (as of handover)

Oldest-first slice of the pending queue (index.json order is newest-first — just take
the next `status: "pending"` entries; the list included below was where we stopped):

- best-woocommerce-barcode-and-qr-code-plugins
- breakdance-builder-review
- breakdance-kinsta-static-site
- choose-domain-name
- cloudpanel-varnish-cache
- (…then everything else in index.json with `"status": "pending"` — 192 remaining)
