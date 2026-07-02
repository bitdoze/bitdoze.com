# Bitdoze.com Astro Theme Review and Improvement Plan

Date: 2026-07-02
Last updated: 2026-07-02
Scope: full review of the Astro v7 theme (layouts, components, pages, SEO, performance, i18n, tooling). `bun run check` currently passes with 0 errors and 0 hints.

---

## Status Legend

- [x] DONE
- [~] PARTIAL
- [ ] TODO

---

## 1. Bugs and correctness fixes (P0)

### 1.1 [x] Nested `<main>` elements (invalid HTML, hurts accessibility)
Changed inner `<main>` tags to `<div>` in all affected files:
`src/pages/index.astro`, `src/pages/blog.astro`, `src/pages/advertise.astro`,
`src/pages/blog/page/[page].astro`, `src/pages/es/index.astro`, `src/pages/es/blog.astro`,
`src/pages/es/advertise.astro`, `src/pages/es/blog/page/[page].astro`,
`src/components/services/ServicesHub.astro`, `ServiceDetail.astro`.

### 1.2 [x] Twitter card meta tags use `property=` instead of `name=`
Switched to `name="twitter:*"`, added `twitter:site` / `twitter:creator` (`@bitdoze`).

### 1.3 [x] SVG Open Graph images will not render on social platforms
Build-time OG image generation with satori + resvg (1200x630 PNGs for every post + default).
- `src/utils/og-image.ts` - generation utility using Go fonts bundled in `src/assets/fonts/`
- `src/pages/og/[...slug].png.ts` - per-post OG image endpoint
- `src/pages/og-default.png.ts` - default OG image
- PostLayout now passes `/og/{slug}.png` to SEO instead of the SVG
- Added `og:image:width`, `og:image:height`, `og:image:alt` to SEO.astro

### 1.4 [x] Root `_redirects` file is never deployed and conflicts with `astro.config.mjs`
Deleted root `_redirects`. Kept `redirects` block in `astro.config.mjs` as the single source of truth.

### 1.5 [x] `dateModified` is never populated
- Added `lastmod: z.date().optional()` to posts schema in `src/content.config.ts`
- PostLayout passes `modifiedDate={lastmod}` to Layout/SEO
- Sitemaps emit `<lastmod>` from `lastmod || date`

### 1.6 [x] Missing `initial-scale` in viewport meta
Changed to `width=device-width, initial-scale=1`.

### 1.7 [x] Inconsistent `X-Markdown-Tokens` semantics
Aligned `src/pages/md/[...slug].ts` to use `Math.ceil(markdown.length / 4)` matching the middleware.

---

## 2. SEO improvements (P1)

### 2.1 [x] Sitemap gaps
- Added `<lastmod>` from `lastmod || date`
- Added category, tag, and author archive pages to both EN/ES sitemaps
- Added sitemap index at `/sitemap.xml` (`src/pages/sitemap.xml.ts`)

### 2.2 [x] RSS feed quality
- Removed invalid `<tags>` customData
- Tags and categories mapped into `<category>` entries
- Added `content:encoded` with full post body (both EN + ES feeds)

### 2.3 [~] Structured data
- [x] Added `Person` node with `sameAs` social links (looked up from authors collection)
- [x] `keywords` omitted when no tags instead of empty string
- [ ] `HowTo` / `FAQPage` support driven by frontmatter (not implemented)

### 2.4 [ ] Explicit `trailingSlash`
Tried `trailingSlash: "always"` but it broke `.png.ts` endpoint routes during build. Removed for now. Could revisit with custom logic.

### 2.5 [x] llms.txt locale mix
Split into "Articles" (EN) and "Articulos (Spanish)" sections.

---

## 3. Performance (P1)

### 3.1 [x] Responsive images everywhere
Added `widths` to PostCard (`[320, 480, 640]`), RelatedPosts (`[320, 400]`), YouTubeVideos (`[320, 480]`).

### 3.2 [x] Hero image decoding
Removed `decoding="sync"` from post hero. Kept `loading="eager"` + `fetchpriority="high"`.

### 3.3 [x] Third-party ad script in `<head>`
Moved to end of `<body>`, switched to `https://`, added `is:inline`.

### 3.4 [x] Search: switched to Pagefind
- Installed `pagefind` as devDependency
- Added `data-pagefind-body` to PostLayout article element
- Build script runs `pagefind --site dist` after Astro build
- Replaced search pages (EN + ES) with Pagefind UI
- Removed Fuse.js dependency, `src/scripts/search.js`, `search.json.ts` endpoints
- Search bar re-initialization fixed for View Transitions compatibility

### 3.5 [x] TOC scroll handler
Replaced scroll-based heading highlighting with `IntersectionObserver` in `PostHeadings.astro`.

### 3.6 [x] Cache headers
Added `public/_headers` with immutable cache for `/_astro/*`, `/og/*`, and PNG assets.

---

## 4. i18n architecture (P1)

### 4.1 [ ] Extract shared page bodies into components
Not done. EN/ES page duplication remains (`index`, `blog`, `advertise`, `search`, etc.).

### 4.2 [x] Centralize translations in one dictionary module
Created `src/i18n/ui.ts` with `t(locale, key)` helper and full EN/ES dictionary. Not yet wired into all components (Header, Footer still use local maps).

### 4.3 [x] Astro built-in i18n config
Enabled `i18n: { defaultLocale: "en", locales: ["en", "es"], routing: { prefixDefaultLocale: false } }` in `astro.config.mjs`.

---

## 5. Code quality and architecture (P2)

### 5.1 [x] Component location
Moved all components from `src/layouts/components/` to `src/components/`. Updated `tsconfig.json` alias and all imports (including 121 MDX files). Old directory deleted.

### 5.2 [ ] Header.astro is a 34KB monolith
Not done. Still a single file with inline styles, duplicated active-link logic.

### 5.3 [x] Blog pagination: use Astro's `paginate()`
Refactored both EN and ES `[page].astro` to use `paginate()` with `page.url.prev/next`.

### 5.4 [~] Content schema hardening
- [x] Added `lastmod: z.date().optional()`
- [x] Switched `z` import from `astro:content` to `astro/zod`
- [ ] `date` still optional (not made required to avoid breaking existing posts without dates)
- [ ] `authors` still `z.array(z.string())` not `reference("authors")`

### 5.5 [x] Dead code and dependencies
- Removed `rolldown` and `fuse.js` from package.json
- Wired `readingTime.ts` into PostLayout (shows "X min read" in post header)
- Removed unused `CollectionEntry` import from PostLayout
- Added `Props` interface to PostLayout

### 5.6 [ ] Config as data
Not done. `src/config/services.ts` remains a 32KB TS file.

### 5.7 [x] Critical CSS duplication
Removed hand-written `.max-w-5xl` from inline critical CSS in Layout.astro.

### 5.8 [x] Docs hygiene
Fixed CLAUDE.md title from "Smoothie Blender Guide" to "bitdoze.com".

---

## 6. Accessibility (P2)

- [x] Fixed nested `<main>` (see 1.1)
- [x] Mobile menu: added `Escape` key handling, focus trap, and focus management
- [x] Search results escaping: no longer an issue (Pagefind UI handles rendering, old `search.js` with `innerHTML` deleted)
- [x] TOC desktop panel: `aria-expanded` now set on collapse/expand buttons
- [ ] Contrast of `text-gray-400`/`text-gray-500` small text: not verified
- Good already: skip link, `prefers-reduced-motion` global override, `aria-current="page"`, labeled icon buttons

---

## 7. Tooling, CI, and DX (P2)

### 7.1 [~] CI (GitHub Actions)
- [x] Created CI workflow (`ci.yml`) initially
- [x] Removed it later since Cloudflare Pages already builds on every push (duplicate work)
- [x] Kept weekly link checker (`link-check.yml` with lychee)

### 7.2 [x] Formatting
Added Prettier config (`.prettierrc.json`) with `prettier-plugin-astro` + `prettier-plugin-tailwindcss`. Added `format`/`format:check` scripts.

### 7.3 [x] Linting
Added ESLint config (`eslint.config.mjs`) with `eslint-plugin-astro` + `eslint-plugin-jsx-a11y`. Added `lint` script. Uses eslint v9 + `.npmrc` with `legacy-peer-deps` for CI compatibility.

### 7.4 [x] Link checking
Weekly `lychee` job in `.github/workflows/link-check.yml`.

### 7.5 [ ] Package manager consistency
Docs say `bun run` but repo uses `package-lock.json` (npm). Not resolved.

---

## 8. Feature ideas (P3, optional)

- [x] **Reading time + progress**: Reading time now displayed in post header using existing `readingTime.ts`
- [x] **Code block copy button**: Added client script targeting `.prose pre` with copy-to-clipboard button
- [x] **OG image generation pipeline**: Build-time satori OG images for all posts (see 1.3)
- [ ] **Breadcrumb on archive pages**: Only on posts currently
- [ ] **Newsletter/CTA component**: Not implemented
- [ ] **404 page search**: Not wired (Fuse removed; could use Pagefind)

---

## Remaining TODO Summary

| Priority | Item | Effort |
|----------|------|--------|
| P1 | 4.1 Extract shared EN/ES page bodies into components | 2-3 days |
| P2 | 5.2 Split Header.astro monolith | ~1 day |
| P2 | 5.6 Move services.ts to content collection | ~0.5 day |
| P2 | 5.4 Make `date` required + `authors` as reference | ~0.5 day |
| P2 | 2.4 Revisit `trailingSlash: "always"` | needs investigation |
| P2 | 2.3 `HowTo`/`FAQPage` structured data | ~0.5 day |
| P3 | 7.5 Package manager consistency (bun.lock) | trivial |
| P3 | 6 Contrast verification for gray text | ~1 hour |
| P3 | 8.x Breadcrumbs on archives, newsletter, 404 search | as desired |
