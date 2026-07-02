# Bitdoze.com Astro Theme Review and Improvement Plan

Date: 2026-07-02
Scope: full review of the Astro v7 theme (layouts, components, pages, SEO, performance, i18n, tooling). `bun run check` currently passes with 0 errors and 51 hints.

---

## 1. Bugs and correctness fixes (P0)

### 1.1 Nested `<main>` elements (invalid HTML, hurts accessibility)
`src/layouts/Layout.astro` renders `<main id="main-content">`, but many pages render another `<main>` inside it:

- `src/pages/index.astro`, `src/pages/blog.astro`, `src/pages/advertise.astro`
- `src/pages/blog/page/[page].astro`
- `src/pages/es/index.astro`, `src/pages/es/blog.astro`, `src/pages/es/advertise.astro`, `src/pages/es/blog/page/[page].astro`
- `src/layouts/components/services/ServicesHub.astro`, `ServiceDetail.astro`

Fix: change the inner `<main>` tags to `<div>` (or `<section>`). Only the Layout should own `<main>`. This also makes the skip link target (`#main-content`) unambiguous for screen readers.

### 1.2 Twitter card meta tags use `property=` instead of `name=`
In `src/layouts/components/common/SEO.astro` all Twitter tags are `<meta property="twitter:*">`. Twitter/X documents `name="twitter:*"`. Most crawlers tolerate it, but it is not spec-compliant.

Fix: switch to `name="twitter:card"`, etc., and add `twitter:site` / `twitter:creator` (`@bitdoze`).

### 1.3 SVG Open Graph images will not render on social platforms
- Default OG image is `/images/default-og.svg` (`src/config/site.ts`).
- Post covers are SVGs by content convention (AGENTS.md says to create SVG hero images), and `PostLayout` passes `image?.src` straight into `og:image`.

Facebook, X, LinkedIn and most chat apps do not render SVG in link previews, so nearly every share shows no image.

Fix options (pick one):
- Generate raster OG images at build time with `astro-og-canvas` or `satori` (title + brand template), and keep SVGs for on-page display.
- Or export a 1200x630 PNG next to each SVG and use it for `og:image` only.
Also add `og:image:width`, `og:image:height`, and `og:image:alt`.

### 1.4 Root `_redirects` file is never deployed and conflicts with `astro.config.mjs`
`_redirects` sits in the repo root; Cloudflare Pages only reads it from the build output (`dist/`), and Astro only copies files from `public/`. So it is dead configuration today. Worse, its targets disagree with the redirects in `astro.config.mjs`:

- `_redirects`: `/tools/thumbnail-ideas/ -> https://bit-tools.com/tools/ai-thumbnail-ideas`
- `astro.config.mjs`: `-> https://bit-tools.com/tools/youtube-thumbnail-ideas-generator`

Fix: delete the root `_redirects` (or move it into `public/` as the single source of truth and remove the `redirects` block from Astro config). Keep one mechanism, with one set of targets. Native `_redirects` gives real 301s instead of meta-refresh HTML pages, so prefer it on Cloudflare Pages.

### 1.5 `dateModified` is never populated (you refresh articles regularly)
The SEO component supports `modifiedDate` and the Article schema falls back to `datePublished`, but:
- the posts schema (`src/content.config.ts`) has no `lastmod`/`updateDate` field,
- `PostLayout.astro` never passes `modifiedDate`.

Given the automated article refresh workflow (see commit `refresh: install-cloudpanel-host-nodejs`), you are leaving an easy SEO win on the table.

Fix: add `lastmod: z.date().optional()` to the posts schema, have the refresh automation set it, pass it to `Layout`/`SEO` as `modifiedDate`, and emit `<lastmod>` in the sitemaps.

### 1.6 Missing `initial-scale` in viewport meta
`Layout.astro` has `<meta name="viewport" content="width=device-width" />`. Use `width=device-width, initial-scale=1` to avoid odd zoom behavior on some mobile browsers.

### 1.7 Inconsistent `X-Markdown-Tokens` semantics
`src/pages/md/[...slug].ts` sets `X-Markdown-Tokens: markdown.length` (characters), while `functions/_middleware.js` computes `length / 4` (approx tokens). Align both (use the `/4` heuristic in the static route too).

---

## 2. SEO improvements (P1)

### 2.1 Sitemap gaps
`sitemap-en.xml.ts` / `sitemap-es.xml.ts` only list static pages, services, and posts:
- No `<lastmod>` (add from `lastmod`/`date`).
- Missing category, tag (if indexable), author, and series archive pages. `siteConfig.noindex.categories` is `false`, so category pages are indexable but absent from the sitemap.
- No sitemap index at `/sitemap.xml` referencing the three existing sitemaps (robots.txt lists them individually, which works, but an index is tidier and expected by some tools).

### 2.2 RSS feed quality
`src/pages/rss.xml.ts`:
- `customData: '<tags>...</tags>'` is not valid RSS (unknown element without a namespace). Map tags into additional `<category>` entries instead.
- llms.txt advertises "Full-content RSS feed" but items only carry the description. Consider adding `content:encoded` (or fix the llms.txt wording).

### 2.3 Structured data
`SEO.astro` is already solid (@graph with Organization/WebSite/Article/Breadcrumbs). Suggested upgrades:
- Add a `Person` node for the author with `sameAs` links (you have author content in `src/content/authors/`), instead of a bare name.
- For tutorial-heavy content, consider optional `HowTo` / `FAQPage` support driven by frontmatter, wired through `PostLayout`.
- `keywords: tags?.join(", ") || ""` emits an empty string when no tags; omit the property instead.

### 2.4 Explicit `trailingSlash`
All internal links use trailing slashes and the site is static on Cloudflare Pages. Set `trailingSlash: "always"` in `astro.config.mjs` so dev, build, and canonical URLs cannot drift.

### 2.5 llms.txt locale mix
`src/pages/llms.txt.ts` lists all posts (EN + ES) in one flat "Articles" section. Split into "Articles" and "Articulos (Spanish)" sections, or filter to EN and mention the ES feed, so agents get cleaner language segmentation.

---

## 3. Performance (P1)

### 3.1 Responsive images everywhere
`PostLayout` hero image sets `widths={[480, 768, 1024, 1280]}` (good), but `PostCard`, `RelatedPosts`, footer thumbnails, and `YouTubeVideos` only set `width/height` + `sizes`, so no meaningful `srcset` is generated and cards ship one large image. Options:
- Add `widths={[320, 480, 640]}` to `PostCard` (and similar) images, or
- Enable Astro responsive images globally: `image: { layout: "constrained" }` in `astro.config.mjs`, which generates `srcset`/`sizes` automatically and lets you delete per-component plumbing.

### 3.2 Hero image decoding
`decoding="sync"` on the post hero blocks the main thread during decode. `loading="eager"` + `fetchpriority="high"` is enough for LCP; drop `decoding="sync"` (use default/`async`).

### 3.3 Third-party ad script in `<head>`
`Layout.astro` loads `//scripts.scriptwrapper.com/...` in the head. Even `async`, it competes for bandwidth pre-LCP and is protocol-relative (use `https://`). Recommendations:
- Move it to the end of `<body>` and add `is:inline` explicitly (astro check flags it today).
- Consider Partytown (`@astrojs/partytown`) for the ad + analytics scripts if CLS/INP metrics matter.

### 3.4 Search: consider Pagefind at this scale
`/search.json` embeds title/description/450 chars of content for all 318 EN posts (~150KB+ and growing linearly) and Fuse.js runs fully client-side. This works, but [Pagefind](https://pagefind.app/) indexes at build time, loads only index shards on demand, and scales much better for a content site this size. Keep Fuse if you value zero build integration; switch if the payload keeps growing.

### 3.5 TOC scroll handler
`PostHeadings.astro` recalculates `getBoundingClientRect()` for every heading on every scroll event (2 scroll listeners per post page). Replace with a single `IntersectionObserver` for active-heading tracking; cheaper and simpler.

### 3.6 Cache headers
Add `public/_headers` for Cloudflare Pages:
```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```
Hashed assets are safe to cache forever; Pages does not add `immutable` by default.

---

## 4. i18n architecture (P1)

The custom i18n layer works but costs a lot of duplication:

- Nearly every page exists twice: `src/pages/*.astro` and `src/pages/es/*.astro` (blog, index, search, contact, advertise, resources, rss, search.json, sitemaps...). Bug fixes must be applied twice; they have already drifted stylistically.
- UI strings are scattered: `menuLabelMap` in `Header.astro`, another map in `Footer.astro`, per-component ternaries in `PostHeadings`, `SocialShare`, etc.

Recommendations:
1. Extract shared page bodies into components (e.g. `BlogArchive.astro`, `HomePage.astro`) that accept `locale`, and keep the route files as thin wrappers. This alone removes most duplication without changing URLs.
2. Centralize translations in one dictionary module (e.g. `src/i18n/ui.ts` with `t(locale, key)`), replacing the per-component maps.
3. Longer term, evaluate Astro built-in i18n (`i18n: { defaultLocale: "en", locales: ["en", "es"] }`) for `getRelativeLocaleUrl` helpers and hreflang conventions, keeping your existing URL scheme.

---

## 5. Code quality and architecture (P2)

### 5.1 Component location
Components live in `src/layouts/components/` with the alias `@components/*` pointing there. Unconventional and confusing (layouts vs components). Move to `src/components/` and update the single alias in `tsconfig.json`; imports stay untouched.

### 5.2 Header.astro is a 34KB monolith
Split into `DesktopNav.astro`, `MobileMenu.astro`, `LanguageSwitcher.astro`, plus one shared script. Also:
- Replace hardcoded inline styles (`style="color: rgb(107, 114, 128)"`, gradient strings) with Tailwind classes and `dark:` variants; the current approach forces `!important` dark-mode overrides in the `<style>` block.
- The active-link logic (`isActive`) is duplicated between desktop and mobile branches; compute once.

### 5.3 Blog pagination: use Astro's `paginate()`
`src/pages/blog/page/[page].astro` passes the entire sorted posts array as props to every page and slices in the template. Astro's built-in `paginate()` helper does the slicing in `getStaticPaths`, passes only that page's posts, and provides `page.url.prev/next` for free. Same for the ES variant.

### 5.4 Content schema hardening (`src/content.config.ts`)
- `date` is optional but sorting, RSS, and schema.org all depend on it; make it required.
- Add `lastmod` (see 1.5).
- `authors: z.array(z.string())` duplicates the authors collection; consider `z.array(reference("authors"))` for validated linkage.
- The `z` import from `astro:content` is deprecated in Astro 7 (astro check hints); import from `astro/zod` (or use the new schema helpers) to silence 40+ hints.

### 5.5 Dead code and dependencies
- `rolldown` is a direct dependency but is imported nowhere (Astro 7 / Vite 8 bundle their own). Remove it from `package.json`.
- `src/utils/readingTime.ts` is unused ("No reading time calculation needed" per PostLayout). Either delete it, or better: use it. Reading time on cards and post headers is a cheap UX win for a tutorial site.
- `PostLayout.astro` imports `CollectionEntry` type it never uses (astro check hint).
- `PostLayout.astro` `Astro.props` is untyped (`const { post, headings } = Astro.props;`); add a `Props` interface.

### 5.6 Config as data
`src/config/services.ts` is a 32KB TS file of content with embedded translations. Move it to a `services` content collection (JSON/YAML with a Zod schema), consistent with how the rest of the content is modeled.

### 5.7 Critical CSS duplication
`Layout.astro` inlines hand-written copies of Tailwind utilities (`.max-w-5xl`, prose margins, dark body colors). These can silently drift from the real utilities (e.g. if the container class changes). Keep the inline block strictly to theme-preload/FOUC rules and skip-link styles; let Tailwind own layout classes.

### 5.8 Docs hygiene
- `CLAUDE.md` is titled "Agents Guide for Smoothie Blender Guide" (leftover from another project) while duplicating AGENTS.md. Fix the title or make CLAUDE.md a one-line pointer to AGENTS.md so they cannot drift.

---

## 6. Accessibility (P2)

- Fix nested `<main>` (see 1.1) - biggest a11y item.
- Mobile menu: no `Escape` key handling and no focus trap while open; focus can tab behind the overlay. Add both in the Header script.
- Search results (`src/scripts/search.js`) inject titles/descriptions via string `innerHTML` without escaping. Content is first-party so risk is low, but titles containing `<`, `&`, or quotes will break markup. Escape values or build nodes with `textContent`.
- TOC desktop panel: `aria-expanded` state is not set on the collapse/expand buttons.
- Verify contrast of `text-gray-400`/`text-gray-500` small text on white; several metadata rows sit near the 4.5:1 boundary.
- Good already: skip link, `prefers-reduced-motion` global override, `aria-current="page"`, labeled icon buttons.

---

## 7. Tooling, CI, and DX (P2)

There is no `.github/workflows`, no linting, no formatting config:

1. **CI (GitHub Actions)**: on PR/push run `bun install`, `bun run check`, `bun run build:ci`. Catching a broken MDX file before deploy is the main value at 376 posts.
2. **Formatting**: Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (class sorting). The codebase mixes styles heavily (inline styles vs classes).
3. **Linting**: `eslint` + `eslint-plugin-astro` + `eslint-plugin-jsx-a11y` for the a11y class of bugs found above.
4. **Link checking**: a scheduled `lychee` (or similar) job; a 300+ article DevOps blog accumulates dead external links quickly.
5. **Package manager consistency**: scripts and docs say `bun run`, but the repo only has `package-lock.json` (npm). Commit `bun.lock` (or switch docs to npm) so installs are reproducible with one tool.

---

## 8. Feature ideas (P3, optional)

- **Reading time + progress**: `ReadingProgress` exists; surfacing "X min read" (readingTime.ts already written) completes the pattern.
- **Code block copy button + language label**: for a DevOps blog this is a high-value prose upgrade (small rehype plugin or client script targeting `.prose pre`).
- **Breadcrumb JSON-LD is present, but visible breadcrumbs only on posts**: add `Breadcrumb` to archive pages (categories/tags/authors) for consistency.
- **Newsletter/CTA component**: monetized blog with services + advertise pages but no email capture in the theme.
- **OG image generation pipeline** (see 1.3) doubles as a social-share upgrade for all 376 existing posts without touching each SVG.
- **404 page search**: wire the existing Fuse search into `404.astro` with suggestions based on the attempted path.

---

## Suggested execution order

| Phase | Items | Effort |
|-------|-------|--------|
| 1. Correctness | 1.1-1.7 | ~1 day |
| 2. SEO | 2.1-2.5 + lastmod wiring | ~1 day |
| 3. Performance | 3.1-3.6 | ~1 day |
| 4. Tooling/CI | 7.1-7.5 | ~0.5 day |
| 5. i18n refactor | 4.1-4.3 | 2-3 days |
| 6. Code quality | 5.x | incremental, alongside other work |
| 7. Features | 8.x | as desired |

Notes:
- Nothing above requires changing URLs or content frontmatter except the optional `lastmod` field (additive).
- `bun run check` and a full `bun run build:ci` should gate every phase; add them to CI first so later refactors are protected.
