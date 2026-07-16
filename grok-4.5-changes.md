# Grok 4.5 review fixes

Date: 2026-07-16  
Branch context: local `main` (uncommitted at time of write)

Full site review of the Bitdoze Astro blog, then systematic fixes for high-impact issues (trust, SEO, performance, i18n, DX).

---

## Summary

| Area | What changed |
|------|----------------|
| Trust / brand | Real contact data, unified positioning copy, affiliate note |
| Config | Single source of truth via `site.ts` |
| Security | HTTP security headers on Cloudflare |
| Performance | Lazy ads on articles only; lighter header; fewer collection scans |
| SEO | Richer `sameAs`, author socials, trimmed `llms.txt`, Pagefind locale |
| i18n | Central UI strings with accents; smarter language switch |
| Content schema | Required description/date; max 3 tags; optional `imageAlt` |
| DX | CI workflow, stricter link check, rewritten README |

`astro check` after changes: **0 errors, 0 warnings**.

---

## Files changed

### New

- `.github/workflows/ci.yml` — PR/main: install, `astro check`, `build:ci`
- `src/utils/translationMap.ts` — cached post translation index for language switch
- `src/utils/recentPosts.ts` — cached locale-sorted posts for footer “latest N”
- `src/utils/server/youtube-fallback.json` — empty fallback when YouTube feed fails
- `grok-4.5-changes.md` — this document

### Modified

- `.github/workflows/link-check.yml` — `fail: true`
- `README.md` — real project docs (stack, commands, authoring)
- `eslint.config.mjs` — Astro-focused config / a11y label rule
- `public/_headers` — security + cache headers
- `src/config/site.ts` — contact helpers, social `sameAs`, description, pagination
- `src/config/config.json` — aligned pagination, meta, contact (no fake phone)
- `src/content.config.ts` — schema tighten + author social fields
- `src/content/authors/dragos.md` — github/linkedin/youtube/website
- `src/content/posts/hermes-kanban-setup-guide.mdx` — `summary` → `description`
- `src/content/posts/es/guia-kanban-hermes.mdx` — same
- `src/i18n/ui.ts` — expanded strings, accents, `translateMenuLabel`
- `src/components/common/Header.astro` — no full collection; i18n; scroll class
- `src/components/common/Footer.astro` — i18n, social helper, affiliate disclosure
- `src/components/common/SEO.astro` — org `sameAs` from social.json
- `src/components/widgets/Hero.astro` — DevOps / self-hosting copy
- `src/layouts/Layout.astro` — idle ad load on article pages only
- `src/layouts/PostLayout.astro` — one collection fetch; code-copy UX; pagefind filter; author SEO
- `src/pages/contact.astro` / `es/contact.astro` — real config, honeypot, a11y labels
- `src/pages/search.astro` / `es/search.astro` — Pagefind locale filters
- `src/pages/llms.txt.ts` — recent posts only + hub links
- `src/utils/server/youtube.ts` — try/catch + fallback JSON
- `tsconfig.json` — `@i18n/*` path alias

---

## Fixes by review item

### 1. Contact page

- Removed placeholder address/phone (`123 Main Street`, `+1 (123) 456-7890`).
- Wired to `siteConfig.contact` (email + location from config).
- Phone only shown if non-placeholder.
- Form: honeypot `_gotcha`, nested labels, `formAction` from config.

### 2. Brand copy

- Hero: practical DevOps & self-hosting messaging.
- Footer tagline matches `SITE_DESCRIPTION`.
- `config.json` metadata description aligned.

### 3. Security headers (`public/_headers`)

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- Existing long-cache rules for `/_astro`, images, OG kept/extended.

### 4. Pagefind locale

- Posts: `data-pagefind-filter={`locale:${locale}`}` (plus existing meta).
- Search UIs pass `filters: { locale: [locale] }`.

### 5. i18n UI dictionary

- Header/Footer use `t()` / `translateMenuLabel()` from `src/i18n/ui.ts`.
- Spanish strings use accents (e.g. Categorías, Política, Español).

### 6. Code copy buttons

- Wrapper class `.code-copy-wrapper`.
- Always visible on touch (`opacity: 0.85`); hover-reveal only when `(hover: hover)`.

### 7. Schema / social

- Organization `sameAs` from all non-empty `social.json` URLs.
- Author frontmatter + SEO: github, linkedin, youtube, website.
- Article author URL points at author archive path.

### 8. Content schema (Zod)

- `description`: required, trimmed.
- `date`: required.
- `tags`: transform to max **3**.
- Optional `imageAlt` for featured image alt text.

### 9. Header performance

- Removed per-request full `getCollection("posts")`.
- Uses `resolveLanguageSwitchPath()` with build-time cached map.
- Posts without translation: switch goes to locale home; `title` explains.

### 9b. Footer “latest 3” performance

- Removed per-page `getCollection` + sort in `Footer.astro`.
- Uses `getRecentPosts(locale, 3)` from `src/utils/recentPosts.ts` with a module-level promise cache (one collection scan shared across every page during the build).

### 10. PostLayout

- Single `getCollection` then in-memory filters for locale / hreflang / related.
- Featured image uses `imageAlt || title`.

### 11. Ads

- Script no longer on every page.
- Articles only; loaded after `load` + `requestIdleCallback` (or timeout).

### 12. Header dark-mode scroll

- Scroll toggles `.is-scrolled`; light/dark backgrounds in CSS (no forced white inline styles).

### 13. Config drift

- Pagination: **10** in config and site.
- Contact, meta description, form action centralized through `site.ts`.

### 14. `llms.txt`

- Lists up to **80** recent EN + **80** ES posts (not full catalog).
- Adds hub links (blog, categories, series, search, RSS).

### 15. YouTube homepage section

- Feed errors no longer throw hard; returns fallback list (empty JSON by default).
- Thumbnails use `hqdefault.jpg` for more reliable remote images.

### 16. CI / DX

- New `ci.yml`: Node 22, `npm ci`, `astro check`, `build:ci`.
- Link check fails the job on broken links.
- README rewritten for real Bitdoze workflows.

### 17. Footer affiliate disclosure

- Short EN/ES note that some links may be affiliate links.

---

## Intentionally not done (follow-ups)

These were in the review but deferred as larger product/architecture work:

1. **Unify EN/ES route trees** — drop mirrored `src/pages/es/**` for dynamic locale routes  
2. **Compress legacy images** (~79MB under `src/assets`) — batch pipeline + size lint  
3. **Rename typo slugs** (`ai-coading-tools`, `add-stickey-header-carrd`) — needs 301 plan  
4. **Split Header** into smaller components (logic already lighter)  
5. **ESLint + TypeScript** in Astro frontmatter (needs typescript-eslint wiring)  
6. **Broader Spanish translation** of top EN posts  
7. **Unit tests** for utils (`relatedPosts`, slugs, translation map)  
8. **Editorial content refresh** of high-traffic older posts  

---

## How to verify

```bash
npm install
npm run check      # types / Astro diagnostics
npm run build:ci   # production build + Pagefind
npm run preview
```

Spot-check:

- `/contact/` — real email/location, no fake phone  
- Homepage hero copy  
- Dark mode + scroll header  
- Article page: ads delayed; code copy visible on mobile  
- `/search/` vs `/es/search/` locale filtering after a fresh build  
- View source: org JSON-LD `sameAs`, security headers via Cloudflare `_headers`  

---

## Commit suggestion (if desired)

```
fix: address full blog review (trust, SEO, perf, i18n, CI)

Contact, brand copy, security headers, lazy ads, translation map,
Pagefind locale filters, schema tighten, llms.txt trim, and CI workflow.
```
