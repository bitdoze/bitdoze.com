# ES Translation Log

Tracks EN→ES article translation progress. Regenerate the link/title lookup with:
`node scripts/build-translation-index.mjs` → `translations/index.json` (date-sorted, newest first)

## Workflow per article

1. Pick the next `pending` entry from `index.json` (newest-first unless told otherwise).
2. Read the EN source (`enFile`), plus `index.json` for every internal link target.
3. Write `src/content/posts/es/<es-slug>.mdx`:
   - `translationKey: "<enSlug>"` (required — this is what pairs the hreflang)
   - `canonical: "https://www.bitdoze.com/es/<es-slug>/"`
   - `date`: keep EN date; `lastmod`: translation date
   - `categories`: same as EN; `tags`: same topics, Spanish lowercase-kebab is fine
   - `image`: reuse the EN image path but rewrite relative paths to the `@assets/` alias — ES files live one level deeper (`posts/es/`), so EN-style `../../assets/...` breaks the build; use `@assets/images/...` for frontmatter AND inline `![]()` images
   - Translate title/meta_title/description; keep widget imports and components unchanged (`<Button>`, `<Notice>`, `<Accordion>`, `<Tabs>/<Tab>`, `<ListCheck>`, `<YouTubeEmbed>`, `<AmazonProduct>`) — translate only their visible text props
   - Internal links: `/es/<es-slug>/` when `index.json` shows a translation exists, otherwise keep the EN `/<en-slug>/` URL (established convention)
   - Affiliate `/go/<slug>/` links and `go.bitdoze.com` URLs stay unchanged
   - Proper Spanish orthography (accents, ¿?, ¡!) per recent posts
   - Do NOT translate: code blocks, commands, file paths, config values, brand/product names
4. `bun run build:ci` (or at least `astro build` on the touched file set) before marking done.
5. Log it below: date, EN slug → ES slug, notes. Then regenerate `index.json`.

## Done in this run

| Date | EN slug | ES slug | Notes |
|---|---|---|---|
| 2026-10-18 | best-thunderbolt-5-docks-guide | mejores-docks-thunderbolt-5 | 868 lines; image paths needed `@assets/` alias (ES files are one dir deeper than EN — `../../assets` breaks the build); product headings kept verbatim so all `#anchor` links stay valid |

## Known pre-existing issues (not blocking)

- ES posts are inconsistent on accents (older ones ASCII-only) — new translations use proper Spanish.
- Some ES posts lack `canonical` — fine (falls back to `es/<file-slug>`), but new files should set it.
