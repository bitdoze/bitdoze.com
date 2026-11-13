# Bitdoze.com Full-Stack Audit & Recommendations (`g4h-review.md`)

**Date:** November 13, 2026  
**Scope:** End-to-end review of UI & design system, performance & assets, technical SEO & sitemaps/feeds, i18n (EN/ES), articles & editorial structure, monetization/funnels, security/headers, and CI/tooling for `bitdoze.com` (Astro 7 SSG, 409 EN + 407 ES posts, 11 news digests, 12,780 built files / 433.70 MB in `dist/`).

---

## 1. Executive Summary

### What Is Already Strong
`bitdoze.com` has a fast, disciplined technical foundation and reflects major improvements already landed on `main`:
- **Zero-bloat CSS/JS architecture:** Total Astro client JS across the build is only `~7.2 KB` alongside `Layout.Cs922MU-.css` (`133 KB`), supported by strict TypeScript/Astro checking (`bun run check`: 148 files, 0 errors/warnings/hints) and clean linting (`bun run lint`).
- **Native typography & cleaner Shiki rendering:** Webfonts (`188 KB`) were eliminated in favor of system font stacks, `--shiki-light` tokens were trimmed, and code comment contrast was improved to `#9ca3af`.
- **Self-hosted video facades & structured taxonomy/affiliates:** `<YouTubeEmbed>` self-hosts thumbnails via `getImage`, 182 affiliate products (`src/data/affiliate-links.json`) back 2,135 validated `/go/` links with `rel="sponsored"`, zero pages in `dist/` render multiple `<h1>` elements, and the Cloudflare Pages middleware dependency (`functions/_middleware.js`) has been removed.
- **Substantial ES scale:** Despite stale documentation, ES now has **407 published posts** matching nearly all of the **409 EN posts**.

### Where Attention Is Urgently Needed
Despite the strong core, this audit uncovered **CI failure, live placeholder/demo legal pages, broken internal 404 links, caching hazards, and several high-impact SEO/UI regressions**:
1. **Live "Demo" Legal Pages (`P0`):** `src/content/pages/privacy.md` and `src/content/pages/terms.md` explicitly state they are demo templates from March 14, 2023 governed by "California, United States", omit Plausible (`an3.bitdoze.com`), FormSubmit (`formsubmit.co`), and Amazon Associates disclosures, and `src/pages/es/privacy.astro` / `src/pages/es/terms.astro` are unaccented 3-paragraph stubs.
2. **Failing CI Format Check (`P0`):** `bun run format:check` (`prettier --check .`) currently exits `1` on `astro.config.mjs`, `src/components/views/ResourcesView.astro`, and `src/styles/global.css`.
3. **5 Live Internal 404 Links & 47 308 Redirect Links (`P0`):** A full scan of 155,854 internal `<a>` hrefs in `dist/` found 5 broken links (`/es/news/`, 3 Spanish post cross-links, 1 English post cross-link) and 47 internal links omitting trailing slashes (notably every archive `page/2/` "Previous" / page-1 link).
4. **Pagefind Immutable Cache Bug (`P0`):** `public/_headers` serves `/pagefind/*` with `max-age=31536000, immutable`, even though `dist/pagefind/` assets (`pagefind.js`, `pagefind-ui.js`, `pagefind-entry.json`, `wasm.*.pagefind`) are unhashed and change on every rebuild.
5. **Broken Agent Endpoints & Mangled `/md/*.md` Output (`P1`):** `public/.well-known/api-catalog` points to non-existent `/search.json` (and `/search` without trailing slash), `public/.well-known/mcp/server-card.json` points to non-existent `/mcp`, and `src/pages/md/[...slug].ts` strips JSX/braces globally including inside fenced code blocks.
6. **Dark-Mode Contrast Regressions & Placeholder Services Copy (`P1`):** `Button.astro`, `ResourceCard.astro`, and `Tabs.astro` fail WCAG AA (`3.68:1`) in dark mode with `blue-500`, `ServicesHub.astro` links back to itself and relies on placeholder contact copy (`svcContactBody`), and `ContactView.astro` drops `?sent=1` feedback.
7. **Image Weight & Sitemap Gaps (`P1`):** Missing `fallbackFormat="webp"` on `<Picture>` leaves `795.3 KB` PNGs in `dist/_astro/`, 311 non-WebP files (`54.43 MB`) remain in `src/assets/images/`, `video-sitemap.xml.ts` outputs broken `videoseries` player URLs and a missing `/images/youtube-placeholder.jpg`, and `sitemap-en.xml.ts` omits `/how-i-test/`.

---

## 2. Prioritized Remediation Matrix

| Priority | Area | Finding | Impact | Primary Target(s) |
|---|---|---|---|---|
| **P0** | Legal / Trust | `privacy.md` & `terms.md` ship "Demo" text; ES stubs unaccented; no Plausible/FormSubmit/Amazon disclosures | Legal/compliance risk & broken trust from `/how-i-test/` | `src/content/pages/privacy.md`, `src/content/pages/terms.md`, `src/pages/es/privacy.astro`, `src/pages/es/terms.astro` |
| **P0** | CI / DX | `bun run format:check` fails on 3 files | CI blocks clean merges | `astro.config.mjs`, `src/components/views/ResourcesView.astro`, `src/styles/global.css` |
| **P0** | Routing / UX | 5 broken internal 404 links in `dist/` | Dead ends on `/` (ES) and 4 articles | `src/components/views/HomeView.astro:245`, 4 `.mdx` posts |
| **P0** | Performance / Search | `/pagefind/*` cached 1 year `immutable` without content hashes | Stale/corrupted search UI & index after deploys | `public/_headers:22-23` |
| **P0** | Services / Revenue | Services CTA copy admits links are placeholders & loops back to `/services/` | Lost consulting leads | `src/i18n/ui.ts:134-135,347-348`, `src/components/services/ServicesHub.astro:195-199` |
| **P1** | UI / Accessibility | Dark-mode `#3b82f6` (`blue-500`) + `text-white` yields `3.68:1` contrast; un-trapped mobile course drawer; Amazon heading skip | WCAG AA failures & keyboard trap issues | `src/components/widgets/Button.astro`, `src/components/widgets/ResourceCard.astro`, `src/components/widgets/Tabs.astro`, `src/pages/courses/[course]/[lesson]/index.astro`, `src/components/widgets/AmazonProduct.astro` |
| **P1** | UI / CSS Bug | `view-transition-name` includes `/` on ES slugs; `SeriesBadge` hardcodes `/series/` | Invalid CSS `<custom-ident>` & locale escape on ES posts | `src/components/blog/PostCard.astro`, `src/layouts/PostLayout.astro`, `src/components/views/SeriesIndexView.astro`, `src/components/blog/SeriesBadge.astro:35` |
| **P1** | SEO / Sitemaps | 47 308 internal links; `/how-i-test/` missing from `sitemap-en.xml`; broken playlist URLs & missing thumbnail in `video-sitemap.xml`; unconditional pagination `hreflang` | Crawl waste & Search Console video indexing errors | `src/utils/pagination.ts:30`, `src/pages/about.astro:56`, `src/pages/sitemap-en.xml.ts`, `src/pages/video-sitemap.xml.ts`, `src/pages/blog/page/[page].astro`, `src/pages/es/blog/page/[page].astro` |
| **P1** | Agent / Markdown | `.well-known` points to dead `/search.json` & `/mcp`; `/md/*.md` corrupts fenced code blocks | Broken AI/agent discovery & unusable LLM markdown output | `public/.well-known/api-catalog`, `public/.well-known/mcp/server-card.json`, `src/pages/md/[...slug].ts` |
| **P1** | Images / CWV | `<Picture>` without `fallbackFormat="webp"` emits up to `795.3 KB` PNGs; `30` markdown PNGs; missing `priority` on first `HomeView` card; missing `/images/youtube-placeholder.jpg` | High LCP/bandwidth cost & 404 fallback image | `src/components/views/HomeView.astro:128`, 6 `.mdx` files using `<Picture>`, `src/utils/youtube.ts`, `src/utils/courses.ts`, `src/components/courses/CourseCard.astro` |
| **P1** | Forms / Security | `ContactView` lacks `?sent=1` banner, uses `class="hidden"` honeypot, lacks `autocomplete`; CSP-Report-Only omits Amazon image CDNs | Users unsure form submitted; noisy CSP reports | `src/components/views/ContactView.astro`, `public/_headers:9` |
| **P2** | i18n / Parity | `27` stale ES translations, `2` truly pending; `build-translation-index.mjs` breaks on translated slugs; `21` unaccented ES titles; English `Pagination` & `Breadcrumb` labels | Degraded ES UX & out-of-date ES guides | `scripts/build-translation-index.mjs:24`, `translations/index.json`, `src/components/common/Pagination.astro`, `src/components/common/Breadcrumb.astro`, 21 ES `.mdx` posts |
| **P2** | SEO / Content | `631/816` missing `imageAlt`; `128` titles > 65 chars; `286` descriptions > 165 chars; `304` `2026` titles; `4` thin posts; `15` `quickAnswer` (`1` on a review) | Truncated SERPs, 2027 freshness cliff, weak `AGENTS.md` schema utilization | Frontmatter across `src/content/posts/` |
| **P2** | News Digest | `11` digests on disk vs max `10` window; `Why it matters:` highlight rule never matches; 1-space vs 2-space indent | Drift from `AGENTS.md` news contract | `src/content/news/2026-11-02.mdx`, `scripts/expired-news.json`, `src/components/news/NewsListItem.astro:76` |
| **P2** | Assets Hygiene | `311` non-WebP images (`54.43 MB`) + `12` unused files in `src/assets/`; `public/dragos.jpeg` unoptimized; `config.json` references missing SVG logo | Repo bloat & dead config reference | `src/assets/images/`, `src/pages/about.astro:34`, `src/config/config.json:8` |
| **P3** | Monetization / Brand | `172` hardcoded ratings & `111` prices; `4` external `https://go.bitdoze.com/asus-dc510` links; `bitbuddies.me` vs `bit-tools.com` split; `/self-hosted/` prints internal slugs; no newsletter capture | Stale product specs, split brand equity, internal leak | `AmazonProduct` usages, `src/components/widgets/Tools.astro`, `src/config/menu.json:127`, `src/pages/self-hosted.astro:337-343`, `src/components/blog/FollowBox.astro` |
| **P3** | Docs / Editorial | Stale `README.md`, `PRODUCT.md`, `DESIGN.md`; `230/254` singleton tags; `5,178` em-dashes; `authors/dragos.md` AI phrasing | Onboarding confusion & tag dilution | `README.md`, `PRODUCT.md`, `DESIGN.md`, `src/content/authors/dragos.md` |

---

## 3. Critical Bugs, Legal/Compliance & CI Failures

### 3.1 Live "Demo" Privacy Policy & Terms of Service (`P0`)
- **`src/content/pages/privacy.md`:**
  - Line 7: `Last updated\_: March 14, 2023`
  - Line 11: `"By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy is just a Demo."`
  - Line 26: `- **Country** refers to: California, United States` and Line 32: `- **Website** refers to Bit Doze`
  - Line 134 references `"signing in to Your Account"`, even though there are no user accounts.
  - Omits any disclosure of Plausible analytics (`an3.bitdoze.com`), contact form submission handling (`formsubmit.co`), or Amazon Associates affiliate participation — despite `src/content/pages/how-i-test.md:27` explicitly linking readers to `[affiliate disclosure policy](/privacy/)`.
- **`src/content/pages/terms.md`:**
  - Line 7: `Last updated\_: March 14, 2023`, Line 23: `California, United States`, Line 31: `"This Terms and Conditions agreement is a Demo."`, Line 47: `"You represent that you are over the age of 18\."`
- **`src/pages/es/privacy.astro` & `src/pages/es/terms.astro`:**
  - Both are skeletal 3-paragraph stubs written in unaccented Spanish (`Politica`, `Terminos`, `espanol`, `analiticas`, `Informacion`).
- **Recommendation:** Replace all four pages immediately with accurate, plain-English / proper-accented-Spanish policies covering Plausible self-hosted analytics, FormSubmit processing, Amazon Associates + affiliate `/go/` disclosure, jurisdiction, and removal of all SaaS/account/demo boilerplate.

### 3.2 Failing CI Check (`P0`)
- `bun run format:check` (`prettier --check .`) currently **fails (exit code 1)**:
  - `[warn] Code style issues found in 3 files.`
  - Affected files: `astro.config.mjs`, `src/components/views/ResourcesView.astro`, `src/styles/global.css`.
- **Recommendation:** Run `bun run format` before any feature work so CI returns to green.

### 3.3 Five Broken Internal Links (`404`s Verified in `dist/`) (`P0`)
Scanning all `155,854` internal `<a>` hrefs across `dist/` identified **5 live 404 targets**:
1. `/es/news/` referenced in `src/components/views/HomeView.astro:245` (news digests are English-only per `AGENTS.md`).
2. `/es/mejores-timbre-poe-home-assistant/` in `src/content/posts/es/home-assistant-2026-11-marketplace-truenas.mdx:139` (actual route: `/es/mejor-timbre-poe-home-assistant/`).
3. `/es/contenedores-docker-home-server/` in `src/content/posts/es/instalar-dockhand.mdx:719-720` and `es/instalar-usulnet.mdx:788-789` (actual route: `/es/contenedores-docker-servidor-casa/`).
4. `/es/mejores-paneles-self-hosted/` in `src/content/posts/es/instalar-dockhand.mdx:719-720` and `es/instalar-usulnet.mdx:788-789` (actual route: `/es/mejores-paneles-autoalojados/`).
5. `/herdr-app-gallery/` in `src/content/posts/rex-use-cases.mdx:312` (actual route: `/herdr-app-layouts-mods/`).
- **Recommendation:** Fix all 5 hrefs (point ES news CTA in `HomeView.astro` to `/news/` with an EN indicator or omit on ES until/unless localized) and add an internal link check across `dist/` to `.github/workflows/link-check.yml`.

### 3.4 Pagefind Immutable Caching Bug (`P0`)
- `public/_headers:22-23` sets `Cache-Control: public, max-age=31536000, immutable` for `/pagefind/*`.
- However, Pagefind outputs **unhashed** filenames in `dist/pagefind/` (`pagefind.js` `45K`, `pagefind-ui.js` `118K`, `pagefind-entry.json` `232B`, `wasm.*.pagefind` `67-71K`). Returning `immutable` for 1 year risks serving stale index manifests against newer chunk hashes or stale UI assets after deploys.
- **Recommendation:** Change `/pagefind/*` in `public/_headers` to short-TTL revalidation (`public, max-age=300, must-revalidate` or `public, max-age=3600, stale-while-revalidate=86400`), keeping `immutable` exclusively for `/_astro/*`.

### 3.5 Broken `.well-known` Agent Endpoints & Corrupted `/md/*.md` Output (`P1`)
- **`public/.well-known/api-catalog:4`** advertises non-existent `/search.json` (and `/search` without trailing slash).
- **`public/.well-known/mcp/server-card.json:13`** advertises non-existent `/mcp`.
- **`src/pages/md/[...slug].ts:70-73`** runs global regexes stripping `</?[A-Za-z][^>]*>` and `{[^}\n]*}` **inside fenced code blocks** as well as prose:
  - Example: `dist/md/astro-i18n-localization.md` lost all `260` `{...}` expressions and `<html` / `<div` tags inside code samples.
  - Line-level check looks for `TabItem` instead of the actual widget name `Tab`.
  - Unwrapping `<ListCheck>` strips `<ul>` / `<li>` without preserving `- ` markdown bullets (observed in `dist/md/deploy-astro-easypanel.md`).
- **Recommendation:** Remove or implement `/search.json` and `/mcp` before advertising them in `.well-known/`; update `src/pages/md/[...slug].ts` to split/preserve fenced code blocks (` ``` ` / `~~~`), match `<Tab>`, and convert `<ListCheck>` `<li>` elements to Markdown bullets.

### 3.6 Contact Form UX & Honeypot Bugs (`P1`)
- **`src/components/views/ContactView.astro:46-49, 131-136`:**
  - Sets `_next` redirect URL with `?sent=1`, but renders **no** confirmation banner or message when `?sent=1` is present in the URL.
  - Retains stale `data-astro-reload` attribute.
  - Uses `class="hidden"` (`display: none`) on `_honey` (modern spam bots detect `display: none` more easily than off-screen accessible positioning / `tabindex="-1"`).
  - Form inputs omit `autocomplete` attributes (`name`, `email`).
- **Recommendation:** Read `URLSearchParams` on load to display a localized confirmation `Notice` when `?sent=1`, add `autocomplete` attributes, remove stale `data-astro-reload`, and position the honeypot off-screen with `aria-hidden="true"` + `tabindex="-1"`.

---

## 4. UI, Design System & Accessibility

### 4.1 Dark-Mode Contrast Failures (`P1`)
- `DESIGN.md` requires WCAG AA (`4.5:1` contrast in both themes) and explicitly flags `#3b82f6` (`blue-500`) + white text as failing (`3.68:1`), yet three active components still ship `blue-500`:
  - `src/components/widgets/Button.astro:105,114,120`: dark-mode hover states use `dark:hover:bg-blue-500`, `dark:hover:bg-red-500`, and `dark:hover:bg-gray-500` with `text-white`.
  - `src/components/widgets/ResourceCard.astro:81`: uses `dark:bg-blue-500 dark:hover:bg-blue-600` (`3.68:1` failure at rest in dark mode).
  - `src/components/widgets/Tabs.astro:26`: `ACTIVE_CLASSES` uses `dark:text-blue-500` & `dark:border-blue-500` (check dark surface contrast against `#2563eb`/`#3b82f6` vs `blue-400` `#60a5fa`).
- **Recommendation:** Standardize dark-mode filled buttons to `dark:bg-blue-600 dark:hover:bg-blue-700` with `text-white`, and dark-mode accent text/borders on dark backgrounds to `dark:text-blue-400` / `dark:border-blue-400`.

### 4.2 Design System Drift (`DESIGN.md` vs Implementation) (`P1`/`P3`)
- **Off-palette gradient / backdrop remnants:**
  - `src/utils/og-image.ts:30` still renders the deprecated dark purple/indigo gradient (`#0f172a -> #1e3a8a -> #3730a3`) using bundled `Go-Bold.ttf` / `Go-Regular.ttf`, conflicting with `DESIGN.md` / `AGENTS.md` flat Terminal Blue guidelines.
  - `src/components/services/ServicesHub.astro:112` renders `h-1 bg-linear-to-r ${service.accent}` top bars conflicting with `DESIGN.md:267` (avoid gradient accent strips / glassmorphism).
  - `src/components/views/AdvertiseView.astro:367` uses `backdrop-blur-xs` (and `src/components/common/Header.astro` uses `backdrop-blur-lg` on sticky header).
  - `src/components/courses/CourseSidebar.astro:26` still applies `shadow-2xl` on the mobile drawer instead of `DESIGN.md` lift-on-intent tokens.
- **Stale `DESIGN.md` documentation:** `DESIGN.md` lines `236`, `252`, `262`, and `265` still reference "blue→indigo gradient pill" and "three self-hosted faces" even though `src/styles/global.css` already migrated to all-native system fonts.

### 4.3 Accessibility & Component Semantics (`P1`)
- **Un-trapped Course Drawer (`src/pages/courses/[course]/[lesson]/index.astro:239-283`):** Unlike `src/components/common/Header.astro`'s mobile drawer, the mobile lesson drawer lacks a keyboard focus trap and `inert` handling on background content, and directly mutates `document.documentElement.style.overflow = "hidden"`.
- **`AmazonProduct.astro` Heading Skip & Image Attributes (`src/components/widgets/AmazonProduct.astro:127-128,262,296,334`):**
  - When `importantConsiderations` is empty, headings skip from `h3` -> `h4` -> `h5`.
  - External Amazon `<img>` uses `crossorigin="anonymous"` without explicit `width`/`height` or `decoding="async"`, risking CLS and CORS failures on Amazon CDN images.
- **Hero Proof Row Hidden on Mobile (`src/components/widgets/Hero.astro:14-15`):** `hidden sm:flex` conceals credibility/proof signals on mobile viewports (`<640px`).
- **Hardcoded English A11y Labels on ES Routes:**
  - `src/components/common/Breadcrumb.astro` hardcodes `aria-label="Breadcrumb"`.
  - `src/components/common/Pagination.astro` hardcodes `"Pagination"`, `"Previous"`, `"Next"`, `"Go to previous page"`, and `"Go to next page"` across both EN and ES.

### 4.4 Invalid CSS `view-transition-name` & Hardcoded `/series/` Route (`P1`)
- `src/components/blog/PostCard.astro:73,106`, `src/layouts/PostLayout.astro:207,317`, and `src/components/views/SeriesIndexView.astro:145` interpolate `post-title-${slug}` and `post-image-${slug}` directly into `view-transition-name`. On Spanish posts, `slug` contains `/` (e.g., `es/mi-post`), producing an **invalid CSS `<custom-ident>`** and silently breaking view transitions. Sanitize `/` to `-`.
- `src/components/blog/SeriesBadge.astro:35` hardcodes `href="/series/"` and carries `data-astro-reload`, sending Spanish readers back to the English `/series/` hub.

### 4.5 Internal Roadmap Leaks & Placeholder Services Copy (`P0`/`P3`)
- `src/i18n/ui.ts:134-135, 347-348` (`svcContactBody`) reads `"The contact links are placeholders for now..."` / `"Por ahora los enlaces de contacto siguen como placeholder..."`.
- `src/components/services/ServicesHub.astro:195-199` has a secondary CTA linking `/services/` back to `/services/`.
- `src/pages/self-hosted.astro:337-343` prints internal roadmap slugs inside `<code>` tags directly in the UI.

---

## 5. Performance, Core Web Vitals & Assets

### 5.1 `<Picture>` Missing `fallbackFormat="webp"` & Markdown PNG Bloat (`P1`)
- Six MDX posts invoke Astro `<Picture ... formats={["webp"]} />` **without `fallbackFormat="webp"`**, causing Astro to keep huge PNG fallback/srcset files inside `dist/_astro/`:
  - Posts: `holyarrs-docker-guide.mdx`, `serveros-panel-review.mdx`, `hindsight-docker-deploy.mdx`, plus their 3 ES translations.
  - Observed `dist/_astro/` weights: `holyarrs-ui.*.png` up to **`795.3 KB`**, `serveros-dashboard.*.png` up to **`343.6 KB`**, `hindsight-ui.*.png` **`171.4 KB`**.
- Additionally, **30 posts** embed Markdown `.png` links (e.g., `docmost-ui.BVDe_uy5.png` `218 KB`).
- **Recommendation:** Set `fallbackFormat="webp"` (or switch to `<Image format="webp" />`) in those 6 posts, and migrate Markdown `.png` references in `src/content/posts/` to WebP.

### 5.2 Legacy `src/assets/` Bloat, Unused Files & Missing Placeholder (`P1`/`P2`)
- **`src/assets/` (`1,048` files):** `src/assets/images/` still contains **311 non-WebP assets (`54.43 MB`)**:
  - `103` `.png` (`18.66 MB`)
  - `164` `.jpeg` (`24.26 MB`)
  - `42` `.jpg` (`10.72 MB`)
  - `2` `.gif` (`0.79 MB`)
- **12 unused files** sit unreferenced in `src/assets/`: `26/04/*.svg`, `cloudflare-dns.png`, `oha.gif`, `bitdoze_logo.png`, `caos.jpg`, `colors.jpg`, `steps.jpg`.
- **Raw unoptimized `<img>` avatars:** `src/pages/about.astro:34` renders `public/dragos.jpeg` (`56 KB`) as raw `<img>` even though `public/images/authors/dragos.webp` (`30 KB`) already exists; `src/components/views/AuthorBioCard.astro` also renders raw `<img>`.
- **Missing image asset (`404`):** `src/utils/youtube.ts:7,97-102`, `src/utils/courses.ts:60,66`, and `src/components/courses/CourseCard.astro:19` fall back to `/images/youtube-placeholder.jpg`, which does not exist in `public/`.
- **Missing `bitdoze_logo_better.svg`:** `src/config/config.json:8` references `/bitdoze_logo_better.svg`, which does not exist in `public/`.

### 5.3 LCP Priority & Large HTML Payloads (`P1`/`P2`)
- **`src/components/views/HomeView.astro:128`:** `latestPosts.map((post) => <PostCard post={post} />)` renders the first above-the-fold post card without `priority={true}` (`fetchpriority="high"` / `loading="eager"`). Passing `priority={index === 0}` improves homepage LCP.
- **Large code-heavy HTML pages:** `dist/astro-i18n-localization/index.html` is **`621,349` bytes** (`63` `<pre>` blocks, `9,521` `<span>` tokens), and `es/astro-i18n-localizacion/index.html` is **`613.0 KB`**. Trimming redundant nested spans or splitting exhaustive multi-part guides will reduce HTML parse/transfer cost.

---

## 6. Technical SEO, Schema, Sitemaps & Security Headers

### 6.1 47 Non-Trailing-Slash Internal Links Causing 308 Redirects (`P1`)
- **`src/utils/pagination.ts:30`:** `currentPage === 2 ? basePath : ...` returns `basePath` verbatim for "Previous" / page-1 links. Because callers strip the trailing `/` when passing `basePath`, **every** `page/2/` archive pagination link omits its trailing slash and triggers a `308` redirect.
- **4 content/page links** also omit trailing slashes: `src/pages/about.astro:56` (`/contact`), `postfix-external-smtp.mdx:517`, `es/postfix-smtp-externo.mdx:518`, and `pdf-merge-linux-cmd.mdx:512` (`/linux-commands`).

### 6.2 Sitemap & Hreflang Gaps (`P1`)
- **`src/pages/sitemap-en.xml.ts`** omits `/how-i-test/`.
- **`src/pages/video-sitemap.xml.ts:50-51`** strips `?list=...` query strings from YouTube playlist embeds (`carrd-review/`, `es/resena-carrd/`), producing invalid `<video:player_loc>.../embed/videoseries</video:player_loc>` entries alongside two broken relative `<video:thumbnail_loc>/images/youtube-placeholder.jpg</video:thumbnail_loc>` entries.
- **`src/pages/blog/page/[page].astro:48-60` & `src/pages/es/blog/page/[page].astro:47-60`** unconditionally emit `en` / `es` `hreflang` links for every page number without calling `localePathExists`. Both locales currently sit at 41 pages (`409` EN vs `407` ES posts); as soon as EN reaches 411 posts (page 42), page 42 will emit a broken ES `hreflang`.

### 6.3 Article Metadata Health Across 816 Posts (`P2`)
- **`imageAlt` missing on 631 / 816 posts** (accessible image descriptions for covers).
- **Title length drift:** `128` titles / `meta_title` values exceed `65` chars (`1` under `25` chars: `secure-cloudpanel.mdx`).
- **Description length drift:** `286` descriptions exceed `165` chars (`4` under `70` chars).
- **`2026` year-cliff:** `304` post titles contain `2026`, creating a large bulk-refresh / SERP-staleness burden on January 1, 2027.

### 6.4 CSP-Report-Only Header Gap (`P1`)
- `public/_headers:9` (`Content-Security-Policy-Report-Only`) omits Amazon image CDN domains used by `<AmazonProduct>` (`productImage`), which will trigger CSP violation reports on review/listicle pages and block images if `Report-Only` is promoted to enforcement.

---

## 7. i18n (EN/ES Parity & Quality)

`src/content/posts/` contains **409 EN** and **407 ES** published posts (`0` drafts), tracked in `translations/index.json` (`409` entries: `3` pending, `27` stale).

- **`scripts/build-translation-index.mjs:24` bug:** Matches EN/ES pairs by filename instead of the `canonical` mapping. This falsely marks `astro-vs-nextjs-vs-tanstack-start-which-wins` as pending even though `es/astro-vs-nextjs-vs-tanstack-start-cual-gana.mdx` exists. The **2** truly untranslated EN posts are `stop-wasting-time-free-ai-tools` and `herdr-app-layouts-mods`.
- **27 stale translations:** `translations/index.json` flags 27 ES articles whose EN source was updated (`lastmod`) after the Spanish version.
- **Unaccented Spanish (`21` titles + legal stubs):** `21` ES post titles contain unaccented words (`Guia`, `Configuracion`, `Resena`, `Facturacion`, `Como`, `Mas`), matching the unaccented `es/privacy.astro` and `es/terms.astro` stubs.
- **Hardcoded English UI chrome on ES routes:** `Pagination.astro` aria-labels & Previous/Next text, `Breadcrumb.astro` `aria-label="Breadcrumb"`, and `SeriesBadge.astro:35` (`href="/series/"`).
- **Broken ES news link:** `HomeView.astro:245` links to `/es/news/` (`404`).

---

## 8. Articles, Editorial & Content Architecture

### 8.1 Daily News Digest Contract Drift (`P2`)
- **Window violation (`11` vs `10`):** `src/content/news/` holds **11** files (`2026-11-02` through `2026-11-13`), exceeding `AGENTS.md`'s strict rolling window of 10. While `2026-11-02` is already 301-redirected in `public/_redirects` and excluded from `dist/` and `sitemap-en.xml`, the file remains in `src/content/news/` and has not been appended to `scripts/expired-news.json`. (`validate-news.mjs` passes with `11` digests rather than catching the extra file on disk.)
- **Dead `Why it matters:` highlight styling:** `src/components/news/NewsListItem.astro:76` looks for the literal substring `"Why it matters:"`, which is absent (`has literal Why it matters: false`) across all `11` current digests.
- **List continuation indentation:** Current digests indent summary continuation lines by `1` space instead of the `2`-space soft continuation specified in `AGENTS.md`.

### 8.2 Post Quality, Schema Utilization & Taxonomy (`P2`/`P3`)
- **4 thin posts (`<350` words):** `fix-rpm-transaction-lock-waiting.mdx` (`222w`), `plausible-tool.mdx` (`282w`), and their 2 ES counterparts.
- **3 heading hierarchy skips** in post bodies (in addition to `AmazonProduct.astro`'s conditional `h3` -> `h5` skip).
- **Low adoption of `AGENTS.md` DevOps UX frontmatter:**
  - `quickAnswer`: set on only `15 / 816` posts — and **1 is misapplied** on a review (`modern-web-guidance-legacy-scan.mdx`, violating `AGENTS.md`: *"Never on reviews, comparisons, or listicles"*).
  - `testedOn`: set on only `6 / 816` posts.
  - `timeToComplete`: set on only `15 / 816` posts.
- **5,178 em-dashes across 422 posts** (partially inventoried in `docs/to-do-emdash.md`).
- **Tag fragmentation:** `230` EN singleton tags (out of `379` unique EN tags) and `254` ES singleton tags (out of `408` unique ES tags), diluting tag archive pages with single-post routes.
- **Author bio tone (`src/content/authors/dragos.md`):** Still opens with textbook AI phrasing (`"fascinating world of DevOps"`, `"delve into"`).

---

## 9. Monetization & Ecosystem Alignment

- **Hardcoded & inconsistent Amazon product data (`P3`):** Across posts, `AmazonProduct` embeds contain **172 hardcoded ratings** and **111 hardcoded prices** that decay without API/manual sync, **4** embeds use external `https://go.bitdoze.com/asus-dc510` instead of internal `/go/<slug>/` (bypassing Plausible `affiliate_click` tracking on `/go/[product].astro`), and `/go/` lacks geo-routing (planned in `docs/amazon-affiliate-opus-plan2027.md`).
- **Services funnel incomplete (`P0`):** Placeholder `svcContactBody` copy (`src/i18n/ui.ts`) and self-referential `/services/` CTA (`ServicesHub.astro:195-199`) undermine conversion readiness.
- **Split tools branding (`P3`):** `src/components/widgets/Tools.astro` and `src/components/views/HomeView.astro` promote `bitbuddies.me/tools/*` (`title-generator`, `youtube-thumbnail-generator`, `youtube-script-generator`, `social-post-generator`), whereas `src/config/menu.json:127` and redirects (`src/config/redirects.mjs:12-15`) route `/tools/*` to `bit-tools.com/tools*`.
- **No newsletter / email lead capture (`P3`):** `src/components/blog/FollowBox.astro:61` explicitly states in ES `"Sin spam y sin boletín todavía — sígueme donde ya estás."` (EN: `"No spam, no popups — follow where you already are."`), leaving high-intent DevOps traffic uncaptured beyond RSS/social links.
- **Stale repository documentation (`P3`):** `README.md` (lines 13, 21, 42, 50, 56, 62) still describes removed systems (`functions/_middleware.js`, `/og/[slug].png`), and `PRODUCT.md` still reports `335 EN / 64 ES` posts instead of `409 EN / 407 ES`.

---

## 10. Current Verification Snapshot

All automated checks run directly against current `HEAD`:

| Command | Result | Notes |
|---|---|---|
| `bun run check` | **PASS** (exit 0) | `Result (148 files): 0 errors, 0 warnings, 0 hints` |
| `bun run lint` | **PASS** (exit 0) | `eslint .` clean |
| `bun run format:check` | **FAIL** (exit 1) | 3 files unformatted: `astro.config.mjs`, `src/components/views/ResourcesView.astro`, `src/styles/global.css` |
| `node --test scripts/*.test.mjs` | **PASS** (exit 0) | `tests 9, pass 9, fail 0` |
| `node scripts/validate-affiliate-links.mjs` | **PASS** (exit 0) | `Validated 182 affiliate products.` |
| `node scripts/validate-affiliate-links.mjs --dist` | **PASS** (exit 0) | `Validated 182 affiliate products and 2135 rendered links.` |
| `node scripts/validate-news.mjs` | **PASS** (exit 0) | `Validated 11 news digests.` (does not flag 11 vs max-10 disk rule) |
| `node scripts/validate-canonicals.mjs` | **PASS** (exit 0) | `Validated 771 canonicals.` |

---

## 11. Recommended Execution Plan

### Sprint 1 — Unblock CI, Compliance & Broken UX (1–2 days)
1. Run `bun run format` to fix `astro.config.mjs`, `ResourcesView.astro`, and `global.css`.
2. Replace `privacy.md`, `terms.md`, `es/privacy.astro`, and `es/terms.astro` with accurate legal/disclosure pages (Plausible, FormSubmit, Amazon Associates, Bitdoze scope).
3. Fix the 5 broken internal 404 links (`HomeView.astro:245`, `es/home-assistant-2026-11-marketplace-truenas.mdx`, `es/instalar-dockhand.mdx`, `es/instalar-usulnet.mdx`, `rex-use-cases.mdx`).
4. Fix `/pagefind/*` cache headers in `public/_headers:22-23` (remove `immutable`).
5. Wire real contact links / CTA destination in `ServicesHub.astro` & `src/i18n/ui.ts`, and implement `?sent=1` confirmation state + `autocomplete` + accessible honeypot in `ContactView.astro`.

### Sprint 2 — UI Contrast, Accessibility, SEO & Endpoints (2–3 days)
1. Fix dark-mode `#3b82f6` contrast in `Button.astro`, `ResourceCard.astro`, and `Tabs.astro`; align `src/utils/og-image.ts` and `ServicesHub.astro` with `DESIGN.md`; remove `shadow-2xl` from `src/components/courses/CourseSidebar.astro`.
2. Add focus trap + `inert` handling to the mobile lesson drawer in `src/pages/courses/[course]/[lesson]/index.astro`; fix `AmazonProduct.astro` conditional heading levels and `width`/`height`/`decoding="async"`.
3. Sanitize `/` in `view-transition-name` across `PostCard.astro`, `src/layouts/PostLayout.astro`, and `src/components/views/SeriesIndexView.astro`; localize `SeriesBadge.astro`, `Pagination.astro`, and `Breadcrumb.astro`.
4. Fix `src/utils/pagination.ts:30` trailing slashes + 4 post/page links; add `/how-i-test/` to `sitemap-en.xml.ts`; guard `blog/page/[page]` `hreflang` with `localePathExists`; fix `video-sitemap.xml.ts` playlist `videoseries` URLs and provide `/images/youtube-placeholder.jpg` (or omit relative placeholder fallback); extend CSP `img-src` in `public/_headers:9`.
5. Either implement or remove `/search.json` and `/mcp` from `public/.well-known/*`; rewrite `src/pages/md/[...slug].ts` to preserve fenced code blocks, match `<Tab>`, and keep `<ListCheck>` bullets.

### Sprint 3 — Performance, Images & Editorial Polish (3–5 days)
1. Add `fallbackFormat="webp"` to `<Picture>` in the 6 affected posts (killing `795.3 KB` PNG fallbacks), add `priority={index === 0}` in `src/components/views/HomeView.astro:128`, switch `src/pages/about.astro:34` to `dragos.webp`, and remove the dead `/bitdoze_logo_better.svg` reference in `src/config/config.json:8`.
2. Enforce the 10-file news window (`2026-11-02.mdx` -> `expired-news.json` + delete stale file), update `NewsListItem.astro` / digest format so `Why it matters:` matches consistently, and fix `build-translation-index.mjs:24` to match via `canonical` slug.
3. Translate `stop-wasting-time-free-ai-tools` & `herdr-app-layouts-mods`, refresh the 27 stale ES posts, fix the 21 unaccented ES titles, expand the 4 thin posts (`<350w`), clean `authors/dragos.md`, fix `modern-web-guidance-legacy-scan.mdx` `quickAnswer`, and unify `/go/` links (replacing `https://go.bitdoze.com/asus-dc510`).
4. Batch-remediate image optimization (311 non-WebP files + 12 unused assets in `src/assets/`), missing `imageAlt` (631 posts), SERP lengths (`128` titles, `286` descriptions), `2026` title strategy (`304` titles), singleton tag consolidation, and stale `README.md` / `PRODUCT.md` / `DESIGN.md` docs.
