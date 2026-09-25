# Bitdoze.com — Full Site Review and Recommendations

Date: 2026-09-25
Scope: SEO, performance, Astro practices, code quality, architecture, tooling, security, design, UX, accessibility.
Method: four parallel deep reviews against the working tree (28 uncommitted files included) and the current `dist/` build (1,133 HTML pages, 306 MB, built Sep 25). Key claims were re-verified by hand. Prior reviews (`fable-plan.md`, `grok-4.5-changes.md`) were read first; their "done" items were verified rather than re-flagged. Regressions and corrections are called out.

Headline: the reading core of the site is genuinely good (typography, code blocks, TOC, dark-mode bootstrap, widgets, script scoping). The real problems are concentrated in five places:

1. **Every quality gate is broken** — `astro check`, `eslint`, and `prettier --check` all fail, and CI was deleted.
2. **The view-transition layer is broken and expensive** — custom animations silently never applied, and the machinery costs 13.3 MB of HTML sitewide.
3. **SEO regressions and hygiene issues** — refreshed posts rewrite `datePublished`, pagination is `nofollow`, 58/66 ES posts have no hreflang pairing, and 595 pages ship an SVG `og:image` that social platforms won't render.
4. **The header overflows every page between 768 px and ~1180 px**, and a Tailwind gray remap makes some dark-mode text nearly invisible (down to 1.36:1 contrast).
5. **Images are served at original resolution** with 30 MB of pointless PNG fallbacks; the Cloudflare middleware runs on every request including static assets.

---

## Corrections to prior assumptions

- **`meta_title` works.** `SEO.astro:56` implements it, `Layout.astro:283` forwards it, 188 posts use it. The old note saying layouts ignore it is stale.
- **`canonical:` frontmatter is not an SEO canonical** — it is repurposed as the slug source (`src/utils/content.ts:26-31`). 362 posts set it.
- **Per-post OG images were removed** (commit `b1e782c`), regressing fable-plan.md item 1.3. Only `og-default.png` remains, and it is currently unused (see SEO H5).
- **CI and the weekly link-check were deleted** (commit `3273320`). `.github/` no longer exists, regressing fable-plan.md item 7.1.

---

# 1. SEO

## High

### S1. Refreshed posts rewrite `datePublished` instead of using `lastmod`
225 of 428 git-tracked posts have a `date` different from their first commit; 210 of those have no `lastmod`. Examples: `add-new-drive-lvm.mdx` (2024-03-21 → `date: 2026-07-28`), `nextdns-review.mdx` (→ `2026-09-25`). So `article:published_time`, JSON-LD `datePublished`, sitemap `lastmod`, and RSS `pubDate` all claim the refresh date as the original publication date — the freshness-gaming pattern Google's guidance warns against, and it pollutes RSS ordering (`src/pages/rss.xml.ts:12`).
**Fix:** restore original `date` from git history for refreshed posts; put refresh dates in `lastmod` (schema, sitemap, and the "Updated" badge in `PostLayout.astro:235-248` already support it).

### S2. 58 of 66 ES posts have no hreflang pairing with their EN twin
Pairing in `PostLayout.astro:58-78` uses `getPostTranslationKey()` (`src/utils/i18n.ts:36-43`), which falls back to the slug — and zero posts set `translationKey:` (the schema field already exists, `content.config.ts:56`). Result: 451 pages emit only self hreflang + self x-default, e.g. `/es/alternativas-portainer/` is not linked to `/portainer-alternatives/`. The header language switcher on those pages also falls back to `/es/` home.
**Fix:** add a shared `translationKey` to both files of each of the 58 pairs; hreflang, x-default, and the language switcher then work automatically.

### S3. Pagination and tag pages are `noindex, nofollow` — the nofollow severs crawl paths
`SEO.astro:64-74` forces `noindex, nofollow` on any URL containing `/page/` or `/tags/`. Crawl-graph analysis: 5 posts have zero inbound links from any crawlable page (`/fix-rpmdb-error-bdb0087-db_runrecovery/`, `/google-opal-ai-app-builder/`, `/openship-self-hosted-paas/`, `/upload-directory-oci-bucket-python/`, `/vercel-eve-ai-agent/`), 38 more have 1–2. Sitemaps keep them findable, but in-body PageRank flow to older posts is effectively zero.
**Fix:** use `noindex, follow` for `/page/` and `/tags/` (`SEO.astro:286-291`).

### S4. 13 unique broken internal links in post bodies (29 occurrences), confirmed live 404s
Worst offenders: `/astro-vs-nextjs-vs-tanstack-start-which-wins/` (old slug, post moved to `-2026` via `canonical:` frontmatter with no 301 — 9 links), `/category/ai/` (should be `/categories/ai/` — 6 links), `/es/ollama-docker-instalacion/` (2), `/es/construir-agente-ia-mastra/` (2), `/ai-coding-tools/` (real slug is the typo `/ai-coading-tools/` — 2), plus 8 single occurrences. Exact source file:line list is in the appendix of the working notes.
**Fix:** fix the targets at source; add a 301 `/astro-vs-nextjs-vs-tanstack-start-which-wins/ → …-which-wins-2026/` in `astro.config.mjs`; extend the (currently deleted) lychee link-check to cover internal links against the built site.

### S5. Default `og:image` is an SVG on 595 pages
`Layout.astro:54` defaults `image = "/images/default-og.svg"`, overriding `site.ts:25` (`defaultImage: "/og-default.png"`). Homepage, `/es/`, `/news/`, all category/author hub pages emit an SVG `og:image`. Facebook, LinkedIn, and X do not render SVG share previews.
**Fix:** change the default to `/og-default.png` (exists in dist); consider restoring per-post satori OG PNGs.

### S6. All 198 VideoObject JSON-LD blocks use the build date as `uploadDate`, none have `duration`
`YouTubeEmbed.astro:38-40` falls back to `new Date().toISOString()`; no MDX passes `uploadDate`. Every rebuild shifts the date. Same misstatement in `video-sitemap.xml.ts:78`. Inaccurate structured data is a spam-policy risk.
**Fix:** omit `uploadDate`/`duration` when unknown, or add real per-embed dates.

## Medium

- **S7. 348 noindex URLs in sitemaps.** All `/tags/*` pages are listed in `sitemap-en.xml` (`sitemap-en.xml.ts:39`) while `siteConfig.noindex.tags` noindexes them; the `/tags/` hub itself is noindexed by an over-broad `includes("/tags/")` rule (`SEO.astro:62`). Also, 5 ES retired-category redirects point at a 404: `/es/categories/{dev-tools,tips,node,security,cloudflare}/ → /es/categories/tools/` but ES has no `tools` posts — live-verified 301 → 404. Point them at `/es/categories/` or `/es/blog/`.
- **S8. `/md/*.md` duplicates served 200 with no robots control.** 365 markdown copies, linked sitewide via `<link rel="alternate" type="text/markdown">`, with no `X-Robots-Tag`. Decide the AI-consumption policy (robots.txt says `ai-train=no` while llms.txt + `/md/` + content negotiation exist to *encourage* it); add `X-Robots-Tag: noindex` for `/md/*` in `public/_headers` at minimum. Also 595 pages emit a markdown alternate pointing at a non-existent `.md` (the route only covers posts).
- **S9. Category hubs are thin, untranslated, hreflang-less.** `/categories/ai/` is a bare card grid with a 35-char boilerplate description; ES category pages reuse the English label, producing 7 duplicate cross-locale title pairs; no `CollectionPage` schema; no hreflang between locale pairs. Add intro copy (EN+ES), translate labels via `t()`, add reciprocal hreflang and `CollectionPage`/`ItemList` JSON-LD.
- **S10. Homepage `<title>` is just "Bitdoze".** Highest-authority page, bare brand name (`src/pages/index.astro:57`). Set a keyword-bearing `metaTitle` on both homepages; standardize one title-suffix pattern (currently `- Bitdoze` on 37 pages, `| Bitdoze` on 2, none on 443).
- **S11. Title/description length hygiene.** 128 of 429 posts have effective titles >60 chars (91 >65; 107 of them lack `meta_title`); 144 descriptions >165 chars (worst 302). No duplicates, nothing missing, no drafts. Batch-trim descriptions, add `meta_title` to the long-title posts.
- **S12. `og:image:width/height` hardcoded 1200×630** (`SEO.astro:250-251`) but post covers are 1920×1080. Emit real dimensions.
- **S13. Language switcher links to 404s on 371 pages.** `resolveLanguageSwitchPath` returns empty for non-post pages and `Header.astro:41` blindly prefixes `/es/`; `/es/` home also links `/es/tags/carrd/` (404) via `PopularTopics` using EN tag slugs. Almost all affected pages are noindex, capping damage. Fall back to locale home (or hide) when the target doesn't exist.

## Low

- JSON-LD `@id` collision: Article and WebPage share `#webpage` (`SEO.astro:146,151,171-174`) — use `#article`.
- `dist/404.html` is `index, follow` with a bogus canonical to `/404/` — add `noindex` (`src/pages/404.astro`).
- Heading hierarchy: 174 posts jump h1→h3 via widget titles (`Notice`, `SeriesNav`); 3 posts have two H1s from `#` in the MDX body.
- 341 in-body `/go/*` affiliate links lack `rel="sponsored"` — add it in `AmazonProduct`/`Button` when href starts with `/go/`.
- 211 of 343 EN tags have exactly one post (thin, noindexed, yet in sitemap). Consider a ≥2-post threshold.
- EN RSS is 7.8 MB (363 items, full `content:encoded`); 59 relative URLs inside feed content; ES feed channel link points at `/` instead of `/es/`.
- 52 in-body links omit the trailing slash (a 308 hop each).
- WebSite SearchAction is decorative — `/search` ignores `?q=` (`src/pages/search.astro`); wire it or drop it (`SEO.astro:121-128`).

## SEO — already good (verified)

JSON-LD parses cleanly on all 1,133 pages (Article + BreadcrumbList + Organization + Person + WebSite graph per post). Canonicals match `<loc>` exactly, no chains. All 28 config redirects + `public/_redirects` live-verified as real 301s, no chains; meta-refresh stubs are noindex + canonical. 88 paired pages have fully reciprocal hreflang with correct `lang` attrs. noindex policy honored for `/go/*`, news, search, tags, pagination. Zero missing `alt` among 12,531 images. Sitemap `lastmod` uses `lastmod || date`; video sitemap has 188 entries.

---

# 2. Performance and Astro practices

## High

### P1. `transition:animate` spreads render as `[object Object]` — every custom animation is dead
`{...{ "transition:animate": pageTransition }}` inside a spread is not compiled as a directive, so the object stringifies into HTML **6,655 times across 1,025 pages** (verified in dist). All custom view-transition config (`src/config/site.ts:53-67`) silently does nothing; everything falls back to the default 180 ms fade. Sites: `Layout.astro:356`, `PostCard.astro:55,95`, `PostLayout.astro:192,282`, `index.astro:77,127`, `Hero.astro`, `YouTubeVideos.astro`.
**Fix:** bind the directive directly (`transition:animate={pageTransition}`), never via spread.

### P2. Per-element view-transition `<style>` blocks are 13.3 MB (10.2%) of all HTML
Each `transition:name`/`transition:animate` emits ~2.4 KB of inline CSS. Homepage: 38 blocks = 89.6 KB of 214 KB raw (42%); `/blog/` has ~210 named scopes; the largest post has 11,397 DOM elements. Plus ClientRouter JS (16.4 KB / 5.6 KB gz) on every page, and every inline script needs `astro:page-load` re-init boilerplate.
**Fix (recommended):** since the custom animations never worked anyway, drop ClientRouter and use native cross-document view transitions — one CSS rule (`@view-transition { navigation: auto; }`), zero JS, zero per-element CSS. Keep a `view-transition-name` only on the post-card-image → hero-image morph. This also fixes P3 and deletes the re-init boilerplate from every script. If you keep ClientRouter, fix P1 and cap `transition:name` to the visible image morphs.

### P3. `transition:persist` on Header/Footer serves stale per-locale state
`Layout.astro:350,364`. The header's language-switch href, menu labels, and `aria-current`, and the footer's localized recent-posts list, are computed per page at build time, but persist reuses the old element across navigations and the header script never updates them. Navigate `/git-commands/` → switch to `/es/` and the header still shows English labels and a stale switcher link. Removing ClientRouter (P2) fixes this; otherwise drop `transition:persist` from both.

### P4. Inline article images render at original resolution + 30 MB of PNG fallbacks
238 `<Picture>` components in posts set no `widths`/`sizes`/`formats`. Example (`arcane-docker-install`): a 5092 px source ships a 135 KB webp with **no srcset** and a 984 KB PNG fallback. Sitewide: 3,587 of 5,292 post-body `_astro` images have no srcset; 234 declare width >1600 px; PNG/JPG fallbacks total ~37 MB of dist. Source images reach 1.59 MB.
**Fix:** adopt Astro's responsive images (stable since 5.10, present in 7.3.5):
```js
// astro.config.mjs
image: { layout: "constrained", breakpoints: [480, 768, 1024, 1440], responsiveStyles: true, /* keep service + remotePatterns */ }
```
and set `formats={["webp"]}` + `fallbackFormat="webp"` (or a shared MDX image wrapper) to stop emitting PNG fallbacks. Expect ~−35 MB dist and a real LCP win on image-heavy guides.

### P5. `functions/_middleware.js` runs on every request — no `_routes.json`
On Cloudflare Pages, a bare `functions/_middleware.js` executes for all 4,040 `/_astro/*` assets, fonts, RSS, everything. Worker invocations on traffic that is 100% static. The middleware code itself (q-value-aware Accept negotiation, `Vary: Accept`, `no-store` markdown) is sound.
**Fix:** add `public/_routes.json`:
```json
{ "version": 1, "include": ["/*"],
  "exclude": ["/_astro/*", "/images/*", "/pagefind/*", "/go/*", "/md/*", "/og/*",
              "/*.xml", "/*.txt", "/*.ico", "/*.svg", "/*.png", "/*.webp",
              "/*.woff2", "/favicon.ico", "/.well-known/*"] }
```

## Medium

- **P6. `_headers` grants `immutable` to unhashed files.** `/*.png` and `/*.webp` match `/og-default.png`, `/images/authors/dragos.webp`, `/dragos.jpeg` — a regenerated file stays stale for a year. Scope immutable to `/_astro/*` (and `/pagefind/*`); give public images `max-age=86400, stale-while-revalidate=604800`. The `/og/*` rule is stale (per-post OG images were removed).
- **P7. Homepage preloads the wrong image files.** `index.astro:41-44` preloads untransformed originals (~128 KB across 3 fetches) while the cards render 640 px variants — the preloaded bytes are never used and compete with the font preloads. Preload the exact `getImage({width: 640})` URLs, or drop the preloads.
- **P8. Shiki per-token inline styles bloat code-heavy posts.** Largest post: 612 KB raw, with 7,157 `style="color:#…"` attributes (160 KB) for 75 KB of code; 3,150 spans just repeat the theme's default foreground. Add a Shiki transformer that drops default-foreground styles and merges adjacent same-color spans (fits next to `codeBlockHeader` in `markdown-plugins.mjs`), or switch to a CSS-variables theme. Expect −30–50% on code-heavy pages.
- **P9. Header markup is ~40 KB raw on every page** (3.4 KB gz, 203 DOM elements): full menu rendered twice, 31 inline SVGs including 18 byte-identical arrows. Replace hand-written SVGs with deduped `<Icon name="mdi:…">` (the `<symbol>/<use>` mechanism already works elsewhere).
- **P10. No font fallback metric overrides.** Zero `size-adjust` anywhere → CLS on first swap is unmitigated. Adopt the Astro fonts API (`fonts:` config + `<Font cssVariable preload />` with `fontProviders.fontsource()` and default `optimizedFallbacks`) — it generates metric-matched fallbacks and replaces the hand-rolled imports/preloads while keeping the Three Faces Rule. Optionally drop the Bricolage opsz axis (−46% preload weight, 76.9 KB → 41.3 KB). The homepage hero uses `font-mono` above the fold, so the non-preloaded mono face visibly swaps on the landing page.
- **P11. Build-time improvements.** Adopt `experimental.incrementalBuild` (Astro 7.2) with a `cacheKey` from `lastmod ?? date` — the single biggest build-time lever at 1,133 pages. Route `PostLayout.astro:55,90` and `SeriesNav.astro:16` through `postsCache` (they re-query collections per post; SeriesNav also misses the `!draft` filter). RSS ships raw MDX as `content:encoded` (8 MB of literal `import Button…` and `<Notice>` tags in `dist/rss.xml` — feed readers render garbage): cap to ~30 items and drop `content:encoded`, or render via the container API.
- **P12. Variant explosion.** 723 source images → 3,562 variants (95 MB), up to 11 variants per cover, 369 byte-identical duplicates (3.3 MB). The `image.breakpoints` ladder in P4 consolidates this.
- **P13. PostCard `sizes` overfetches** — `(max-width: 1024px) 480px, 640px` for a ~310 px card slot on desktop (~2× bytes). Use `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"`. Also delete the identical-branches ternary `decoding={priority ? "async" : "async"}` (`PostCard.astro:53`).

## Low

- `scopedStyleStrategy: "class"` — removes ~7.6 MB of `data-astro-cid` attributes sitewide, zero behavior change.
- `experimental.svgOptimizer` for the 165 SVGs in `_astro` (1.2 MB).
- Only 1 post still has an `.svg` cover — convert it and remove `dangerouslyProcessSVG: true`.
- `EventEmitter.defaultMaxListeners = 50` is set twice (`astro.config.mjs:11` and `scripts/node-bootstrap.mjs`) — drop one.
- The affiliate-link annotator loops `new URL()` over every anchor on every page; early-exit with `a[href^="/go/"]`.
- ReadingProgress reads `offsetHeight` and sets `style.width` on every scroll event (`ReadingProgress.astro:29-38`) — layout thrash on 11k-element pages; use rAF + `transform: scaleX()` or CSS `animation-timeline: scroll()`.
- `og:image` passes untransformed originals (35.4 MB of covers in dist, up to 853 KB) — pass `getImage({width: 1200, format: "jpeg"})` output instead.
- 404 shell: header is 64% of the page's raw HTML.
- `getRelatedPosts` is O(n²) — fine at 430 posts, revisit near ~2k.

## Performance — already good (verified)

LCP cover image is textbook (`eager` + `fetchpriority="high"` + srcset/sizes + webp). Script scoping by page type is exemplary (TOC/copy/lightbox/tabs only where used; ~120 KB Pagefind only on 2 search pages; total inline JS ~14.5 KB raw on a typical post). Plausible is first-party proxied and deferred. All long-lived listeners use `AbortController` cleanup. Shared cached collection fetch (`postsCache`, `recentPosts`, `translationMap`). YouTube facade + build-time-thumbnailed thumbs, no third-party iframes, no ad scripts. Tailwind v4 purging works; post-only CSS chunk correctly split. `compressHTML`, `trailingSlash: "always"`, strict i18n routing. Global CSS is 23 KB gz — splitting is not worth it.

---

# 3. Code quality, architecture, tooling, security

## High

### C1. No working quality gates: check, lint, and format all fail; CI is deleted
| Gate | Result | Cause |
|---|---|---|
| `bun run check` | fails immediately | `astro check` doesn't support the installed `typescript@7.0.2` (`@astrojs/check@0.9.10` wants TS ^5‖^6). Zero files are type-checked. |
| `bun run lint` | 69 errors in 56 files | 51 "Unexpected token" + 9 "keyword 'interface' is reserved": `eslint-plugin-astro` has no TS parser for frontmatter (`typescript-eslint` not installed). Plus 9 `astro/no-exports-from-components` in `MarkdownComponents.astro:18-26`. |
| `bun run format:check` | 575 files unformatted | 450 content files + ~110 code files. |
| tests | 6/6 pass | `affiliate-redirect.test.mjs` is the only test. |

`.npmrc` `legacy-peer-deps=true` hides three peer conflicts (including `eslint-plugin-jsx-a11y@6.10.2` vs `eslint@10`). `.github/workflows/ci.yml` and `link-check.yml` were deleted in commit `3273320`.
**Fix:** pin `typescript@^6`; add `typescript-eslint` and `parserOptions.parser` in `eslint.config.mjs`; replace `eslint-plugin-jsx-a11y` with `eslint-plugin-jsx-a11y-x` (or pin ESLint 9); remove `legacy-peer-deps`; add `src/content/**` to `.prettierignore` (or format once); restore a small `ci.yml` (check + lint + `node --test scripts/*.test.mjs`) and the weekly link-check.

### C2. `scripts/svg-to-webp.mjs` can delete the source SVG after a failed render
Frontmatter is rewritten to `.webp` before rendering (lines 121–148), render errors are only collected (158–168), and the delete loop (176–189) deletes every SVG whose frontmatter no longer references it — including one that just failed to render. Result: a post pointing at a missing `.webp`, and the `image()` schema then fails the build.
**Fix:** render first; rewrite frontmatter only for successful renders; delete only SVGs whose fresh `.webp` exists. Remove the empty `if (existsSync(webp)) {}` block.

### C3. EN/ES page duplication has started to drift
21 mirrored page pairs, 1,396 of 2,096 EN lines (67%) verbatim in the ES copy. Drift beyond translation: ES copies of `tags/index`, `categories/index`, `authors/index`, `blog.astro` lack the view-transition hooks and empty states the EN versions have; `about.astro` fetches collections, the ES copy doesn't. Pagination multiplies the problem: 16 files for blog/tags/categories/authors; `blog/page/[page].astro` uses `paginate()` while taxonomy pages hand-roll slicing with `Astro.props as {...}` casts.
**Fix, two steps:**
1. Move each page body into `src/components/views/<Name>View.astro` with a `locale` prop; move all copy into `src/i18n/ui.ts`. Route files shrink to ~10 lines; URLs unchanged.
2. Collapse routes: `src/pages/[...locale]/tags/[tag]/[...page].astro` style, with `locale` = `undefined` or `"es"` — replaces 4 files per taxonomy with 1. Keep constants inside `getStaticPaths` (hoisting); use `InferGetStaticPropsType` instead of casts. Static segments rank above the `[...slug]` catch-all, so routing still resolves.

## Medium

- **C4. `MarkdownComponents.astro` relies on value exports from a component**, which Astro doesn't support (9 lint errors). It happens to work and ~10 posts depend on it; 269 MDX files import widgets explicitly (redundant). Replace with a plain `src/components/mdx-components.ts` exporting a components map passed to `<Content components={…} />`.
- **C5. No HSTS, no CSP** in `public/_headers` (verified live). Add `Strict-Transport-Security: max-age=31536000; includeSubDomains` and start with `Content-Security-Policy-Report-Only` (`default-src 'self'; script-src 'self' 'unsafe-inline' https://an3.bitdoze.com; img-src 'self' data: https://i.ytimg.com https://i3.ytimg.com https://img.youtube.com; frame-src https://www.youtube-nocookie.com https://www.youtube.com; frame-ancestors 'self'`). The other security headers are in place.
- **C6. Config spread across three sources.** Site URL in `astro.config.mjs:19`, `site.ts:12`, `config.json:4`; most of `config.json` is unread; redirects exist in both `astro.config.mjs` and `public/_redirects` (edit-in-pairs); Plausible URL hardcoded twice; `build` and `build:ci` near-identical; `ServiceLocale` duplicates `SupportedLocale`; schema `locale` field vs path-based `isPostIdInLocale` can disagree. Consolidate on `site.ts` (+ generate `_redirects` from one map), delete `build`, unify the locale type, drop or validate the schema `locale`.
- **C7. Monolith components.** `Header.astro` 922 lines (299-line script, 209-line style, `isActive` logic duplicated desktop/mobile); `PostLayout.astro` 781 lines with hardcoded English copy labels on ES posts. Split into `DesktopNav`/`MobileNav` + shared util; move scripts to `src/scripts/*.ts`; pass labels via `t()` + `data-*`.

## Low

- Dead code: `getYoutubeThumbnail`/`isThumbnailAvailable`/`thumbnailAvailabilityCache` (does HEAD requests, never called), `getServiceBySlug`, `SeriesWidget.astro` (no usage), several single-module exports; `getPagination` used only to read `postsPerPage` (use `siteConfig.postsPerPage`).
- 84 `getCollection` calls in `src/pages` bypass `postsCache`; add `getPostsByLocale(locale)` (sorted) and use it everywhere.
- Type-safety gaps (currently invisible because of C1): `any` in `about.astro:68`, `series/index.astro:44,129`, `SEO.astro:147,190`; non-null assertions; 11 `Astro.props as` casts; missing `Props` interfaces in `SeriesWidget`/`ThemeToggle`.
- Schema issues: `tags` defaults to `["others"]` (a banned vague tag — use `.min(1)`); `authors` defaults to nonexistent `["admin"]`; `canonical` isn't validated as URL; tag normalizer doesn't strip diacritics while `toTaxonomySlug` does; `pages`/`about` use `z.string()` for `image` instead of `image()`; odd filename `src/content/authors/-index.md`.
- JSON-LD via `set:html` (`SEO.astro:308`, `YouTubeEmbed.astro:113`): add `.replace(/</g, "\\u003c")`.
- `AmazonProduct.astro:30` substring-matches `go.bitdoze.com` — parse URL and compare `hostname`.
- "Self-Hosted" menu entry untranslated; `/self-hosted/` has no ES route; ES services copy missing accents.
- satori + resvg + Go fonts kept only to render one `og-default.png` — consider committing the PNG and dropping the pipeline.
- Agent docs drift: AGENTS.md says "Astro v5" and "Fuse.js" (it's Astro 7 + Pagefind), says description/image optional (schema requires them); CLAUDE.md is an outdated partial duplicate of AGENTS.md and points at the wrong config path; both still tell agents to use raw `amazon.com/dp/ASIN` links, contradicting the `/go/` rule. Make CLAUDE.md a one-line pointer to AGENTS.md; fix the stale lines.
- Repo hygiene: working-note files at root (`fable-plan.md`, `grok-4.5-changes.md`, `migration.md`, `to-do-*.md` with typos) → move to `docs/`; `.impeccable/live/server.json` is tracked and contains a session token — untrack and gitignore; `.agents/skills/humanizer/SKILL.md` tracked despite `.agents/` being gitignored; package-manager split (docs say `bun run`, README says `npm run`, only `package-lock.json` exists).
- Assets: `src/assets` is 85 MB; 27 files >500 KB; ~69 images (9.6 MB) unreferenced — delete after manual check, convert big PNG/JPEG to WebP. No real secrets found in the repo.

## `[slug].astro` vs `[...slug].astro`

Both needed: `[...slug]` renders posts (ES IDs are multi-segment), `[slug]` renders the `pages` collection (privacy/terms). Risk: a future post slugged `privacy`/`terms` would be silently shadowed. Add a build-time overlap check, or move legal pages into the collection per locale and render through one route.

## Code — already good

The `/go/` affiliate system is solid (static pages from JSON, kebab-case + HTTPS validation, post-build link verification, no open redirect/XSS, tests pass, analytics can't block navigation). Careful Accept negotiation in middleware. Content schema enforces one category from a fixed enum, 3-tag cap, required description/date. Build-time caches for posts/translations/recent posts. `markdown-plugins.mjs` transformers well scoped. No secrets in repo; `dist/`/`.astro/` ignored.

---

# 4. Design, UX, accessibility

Measured with Playwright at 390 px and 1440 px (light + dark) on home, a post, category, news, search, ES home, 404, plus header captures at 768–1280 px, axe-core (WCAG 2 A/AA, 2.1 AA), and scripted keyboard probes.

## High

### D1. Desktop nav overflows the page from 768 px to ~1180 px
At 768 px the page is 1171 px wide; at 1024 px, 1179 px; fits only at 1280 px. "Self-Hosted" wraps, the nav grows to 56 px, and search/language/theme controls go off-screen — every page scrolls sideways on tablets and small laptops. Cause: 10 top-level items + 3 controls shown from `md` (`Header.astro:63`). The "Pages" dropdown also lists About twice.
**Fix:** hamburger up to `xl` (`xl:flex`/`xl:hidden`); cut the top level to ~6 (move Contact/Services/Series into "Pages"); remove the duplicate About.

### D2. The Tailwind gray remap in `global.css` breaks dark-mode contrast
`global.css:87-96` maps `gray-50/100/200/400/500` to semantic variables that flip in dark mode, so `dark:text-gray-200` resolves to `#4b5563` and `dark:text-gray-100` to `#374151` on dark backgrounds. Measured failures: PopularTopics titles 2.18:1 (`PopularTopics.astro:97`), 404 "Page Not Found" 1.94:1, 404 "Browse Blog" button 1.36:1, NewsLayout prev/next titles 1.42–1.72:1, plus ServicesHub/ServiceDetail/Tabs hover. Side effect: `dark:text-gray-500` becomes *brighter* than `dark:text-gray-400`, so the footer affiliate note renders louder than the copyright line.
**Fix:** stop remapping numbered grays; use semantic utilities (`text-(--color-text-muted)` etc.), then sweep for `dark:(text|bg|border)-gray-(50|100|200|400|500)`.

### D3. DESIGN.md's own primary button fails AA
White on `#3b82f6` is 3.68:1 (axe-flagged on every post); white on the gradient's indigo end is 4.47:1. Affects `Button.astro:92` (354 content uses) and the AmazonProduct CTA.
**Fix:** fill `#2563eb` (5.17:1) with `#1d4ed8` hover; update the DESIGN.md `button-primary` token so the doc stops prescribing a failing pair. `#3b82f6` stays fine for borders/icons/rings.

### D4. Dark-mode header nav fails contrast; hover/active colors never apply
Every nav item carries an inline `style="color: rgb(107, 114, 128)"` (`Header.astro:72,138,159,184`, hamburger at 201–211), which beats the scoped hover/active rules — measured: color stays `rgb(107,114,128)` on hover and on the `aria-current` item; in dark mode that's 3.66:1 (axe, every page).
**Fix:** delete the inline styles; use `text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400`, active `text-blue-700 dark:text-blue-400`.

## Medium

- **D5. Off-palette colors/gradients/glows violate DESIGN.md.** Button `green`/`purple` variants (102/63 content uses; white on green-500 = 2.28:1) — map them to blue inside the component. Services pages use violet→fuchsia, emerald→teal, orange→amber gradients (`services.ts:150,270,391,511,631`) plus `blur-3xl` glow blobs, `rounded-3xl`, resting `shadow-xl` (`ServicesHub.astro:27-28,116,119`, `ServiceDetail.astro:47-48,62,75,145`) — the "generic AI-blog" look PRODUCT.md rules out, on the pages meant to convert. ResourceCard has a rotated red→pink badge and resting `shadow-lg`. The mobile menu is translucent-gradient + `blur(20px)` with article text bleeding through. `self-hosted.astro:131` has a second blue→indigo CTA on a page that already has the nav pill. AmazonProduct uses emerald/amber instead of the notice set. Author-page hover is pink. Swap to Terminal Blue + neutrals, solid surfaces, `rounded-lg`, shadow on hover only.
- **D6. AGENTS.md's cover-image spec contradicts DESIGN.md.** The SVG guidelines demand indigo/cyan/pink "glassmorphic aurora glow" blobs and gradient text — exactly what DESIGN.md forbids (One Voice Rule, no glassmorphism, no glow, no gradient text). 51 of 101 remaining cover SVGs use `#EC4899`/`#6366F1`. Rewrite the AGENTS.md spec: flat light background, hairline grid, ink title with one solid `#2563eb` accent word, blue badge, single-color icon.
- **D7. Closed mobile TOC stays in the tab order.** `#mobile-toc-panel` hidden only via `opacity-0 pointer-events-none` (`PostHeadings.astro:191`) — 13 invisible links still focusable. Add `inert` + `aria-hidden` while closed, toggled with `aria-expanded`.
- **D8. Mobile TOC button covers body text** (56 px fixed circle at `bottom-6 right-6`, measured occluding text at 390 px; also z-fights the mobile menu). On <xl screens, render the TOC as an inline `<details>` under the byline; if keeping the button, 44 px, hidden while the menu is open, and not rendered when there are no headings.
- **D9. Mobile menu focus/label bugs.** The "focus first item" branch never runs (two listeners race, `Header.astro:521-531`); label stays "Open main menu" when open; background still scrolls. Focus inside on open, swap to a translated "Close menu", lock body scroll.
- **D10. Desktop dropdowns stay open after tabbing away**; Escape only works on the toggle; `aria-haspopup="true"` misdeclares a disclosure as a menu. Close on `focusout`, handle Escape on the whole `.dropdown`, remove `aria-haspopup`.
- **D11. Search UX.** Pagefind input has no label; shows a raw "Locale: en (262)" facet; result thumbnails pick up the author avatar (first img inside `data-pagefind-body`); default yellow `<mark>` and UI font. Add label/`showEmptyFilters: false`, `data-pagefind-meta="image[src]"` on the cover + `data-pagefind-ignore` on the byline, theme via `--pagefind-ui-*` variables.
- **D12. Spanish UI strings incomplete.** English on ES pages: theme toggle, skip link, share/follow labels, logo alt, copy-button labels, language-switch tooltip; AmazonProduct fully English yet used in ES posts; JourneyCard "Read the guide". Missing accents/¿: "Articulos relacionados", "Comparte este articulo", "Ultima actualizacion", "En esta pagina", the whole ServicesPromo ES block, and more (full list in working notes). Move all into `src/i18n/ui.ts` with `t()`; pass `locale` into ThemeToggle and AmazonProduct.
- **D13. Tabs show nothing without JavaScript** — every panel server-rendered `hidden`, tablist only created client-side (`Tab.astro:13`, `Tabs.astro:98-116`). Render the tablist at build time, or hide non-first panels only after JS runs.
- **D14. Heading permalink pollutes accessible names** — the `#` anchor is prepended *inside* h2/h3 (`PostLayout.astro:548-566`), so screen readers announce "Copy link to this section What is Fish Audio". Move it after the text with `aria-hidden="true"`, or out of the heading.

## Low

- Light-mode `gray-400` (`#9ca3af`, 2.53:1) used for real content: footer affiliate note, hero terminal hints, homepage meta, news label. Use gray-500/600.
- Author-box "Written by Dragos" link: 2.54:1 against surrounding bold text, no underline (dark mode) — underline it.
- PostCard/JourneyCard use border + `shadow-sm` + translate; DESIGN.md says no border, ambient-mid, scale 1.02. Desktop TOC uses `rounded-xl` + resting `shadow-lg` + blur. Align code or doc.
- Duplicate links: PostCard links image and title to the same URL with the image alt repeating the title (also RelatedPosts, PopularTopics, footer, TOC sidebar). Use `alt=""` + `aria-hidden` on the duplicate link.
- "Read digest" repeated on every news card; external links give no new-tab cue.
- TOC `scrollIntoView({behavior:'smooth'})` ignores `prefers-reduced-motion` (`PostHeadings.astro:297`).
- AmazonProduct stars: `aria-label` on a plain div without `role="img"` — screen readers read ten "★". One article-level affiliate Notice is enough; the per-box disclosure repetition adds affiliate density.
- The one highlighted nav item ("Advertise", blue→indigo pill) targets advertisers, not readers — consider a quieter link.
- Pagination row overflows at 390 px; hide far page numbers below `sm`.
- 404 page has no search; add Pagefind input or a `/search/` link + popular categories.
- Hero caret blinks forever at rest (ambient animation vs DESIGN.md).
- `Button.astro:78` builds `ml-${…}` at runtime — Tailwind can't generate those classes; use a static map.
- Theme toggle has no `aria-pressed`/state wording.

## Design — already good

No wrong-theme flash (inline bootstrap applies `.dark` before paint). Skip link works, global `:focus-visible` outline on every probed stop, per-locale `<html lang>`. Lightbox is a native `<dialog>` with labelled close + Escape. Tabs have a complete ARIA tablist with roving tabindex and arrow keys; accordions are native `<details name>`. Code blocks: `tabindex="0"`, always-visible Copy, ligatures off. Article measure ~46ch mobile / ~78ch desktop, hairline H2 dividers, `scroll-margin-top` clearing the sticky header, IntersectionObserver TOC with persisted collapse, scrollable tables. Fonts match the Three Faces Rule. Notice widget matches spec. News index and category pages are clean, blue-only, on-brand in both themes. No ad scripts anywhere.

---

# 5. Recommended order of work

**P0 — restore the safety net (hours, everything else depends on it):**
1. C1: pin TS 6, add `typescript-eslint`, fix a11y plugin peer, remove `legacy-peer-deps`, prettierignore content, restore CI + link-check.
2. C2: fix `svg-to-webp.mjs` data-loss bug.

**P1 — cheap, high-visibility fixes:**
3. P5 (`_routes.json`) + P6 (`_headers` scoping) + C5 (HSTS).
4. D1 (nav overflow) + D2 (gray remap) + D3 (button contrast) + D4 (nav inline styles).
5. S5 (og:image default → PNG), S6 (VideoObject dates), S4 (13 broken links + 301), S3 (`nofollow`→`follow`), S7 (sitemap noindex filter + ES redirect targets).
6. S1 (restore original `date`, move refreshes to `lastmod`) — needs a git-history pass over ~210 posts.
7. S2 (add `translationKey` to 58 ES/EN pairs).

**P2 — structural wins:**
8. P2/P1/P3: drop ClientRouter for native `@view-transition` (fixes the broken animations, 13.3 MB of inline CSS, the persist-locale bug, and the script re-init boilerplate in one move).
9. P4/P12/P13: responsive images + drop PNG fallbacks + consolidate breakpoints.
10. C3 step 1: shared view components per locale; then step 2 route collapse.
11. C4: `mdx-components.ts` module.
12. D5/D6: off-palette cleanup + rewrite the AGENTS.md cover spec.
13. D7–D14: keyboard/screen-reader and i18n-string fixes.
14. P11: incremental builds, RSS trim, `postsCache` everywhere.

**P3 — hygiene:** dead code, schema tightening, docs sync (CLAUDE.md pointer, Astro 7, Pagefind, `/go/` links), repo cleanup (untracked token file, `docs/` for notes), unreferenced assets, S8–S13, remaining Low items.

---

## Appendix — broken internal links (S4 detail)

| Broken target | × | Sources |
|---|---|---|
| `/astro-vs-nextjs-vs-tanstack-start-which-wins/` | 9 | `ai-programming-beginners-guide.mdx:187`, `astro-convex-realtime-app.mdx:24`, `astro-i18n-localization.mdx:2778,3037`, `astro-plausible-cloudflare-workers.mdx:32`, `astro-ssg-build-optimization.mdx:616`, `best-headless-cms-for-astro.mdx:24`, `tanstack-start-dokploy-deploy.mdx:229`, `tanstack-start-get-start.mdx:44` |
| `/category/ai/` (→ `/categories/ai/`) | 6 | `es/guia-kanban-hermes.mdx:469`, `es/qwen36-agentes-codificacion-ia.mdx:213`, `hermes-dashboard-guide.mdx:512`, `hermes-kanban-setup-guide.mdx:470`, `mirage-virtual-filesystem-ai-agents.mdx:433`, `qwen36-ai-coding-agents.mdx:257` |
| `/es/ollama-docker-instalacion/` | 2 | `es/guia-configuracion-pi-agent.mdx:541`, `es/opencode-vs-pi-agent.mdx:243` |
| `/es/construir-agente-ia-mastra/` | 2 | `es/resena-kie-ai.mdx:127,426` |
| `/ai-coding-tools/` (real slug: `/ai-coading-tools/`) | 2 | `herdr-agent-multiplexer.mdx:30,526` |
| `/tag/docker/`, `/ai/`, `/best-oh-my-zsh.plugins/`, `/caddy-docker/`, `/best-vps-providers/`, `/best-ai-coding-tools/`, `/linux/`, `/dokploy-docker-compose/` | 1 each | `docker-run-python.mdx:510`, `ai-coading-tools.mdx`, `enable-command-autocomplete-in-zsh.mdx:24`, `hermes-dashboard-guide.mdx:186`, `hetzner-cloud-review.mdx:741`, `hqbase-self-hosted-shared-inbox.mdx:217`, `linux-dd-command-guide.mdx`, `self-hosted-apps-cloudflare-workers.mdx:354` |
