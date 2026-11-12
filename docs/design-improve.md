# Bitdoze Design Review — Deep Audit v2
**Date:** 2026-11-12 (deep forensic pass)  
**Scope:** `/` (homepage) and blog post pages (`[slug]`) + News digest + Courses + search — fonts, UI, layout, color/contrast, a11y, perf, bilingual  
**Against:** `PRODUCT.md`, `DESIGN.md` (Terminal Blue, Workshop Manual), full code audit + 4-angle workflow + build artifact forensics  
**Build verified:** `bun run build:ci` — 183 affiliate products / 2123 links validated, Pagefind 812 pages / 105k words, 2 locales, `dist/index.html 118KB`, `Layout CSS 132KB`, `fonts 188KB (5× woff2)`, `dist 485MB (assets)`

This is v2 — the deep pass. v1 was the executive review. v2 adds measured contrast, build forensics, component-by-component ledgers, and code-level fix diffs.

---

## A. Executive — What Changed in the Deep Pass

| Prior claim | Deep verification |
|---|---|
| “Flat-by-default, lift-on-intent” | **Measured drift.** 6 components carry `shadow-2xl` / `hover:scale-105` / `backdrop-blur` at rest — terminal, course overview indigo gradient, NewsDigestCard, homepage cards. Grep found 38 `hover:scale-105` instances, 4 `shadow-2xl`, 3 `backdrop-blur` beyond header/TOC. |
| “Mint/mono preloaded 4 faces” | **Confirmed 5 preload links emitted + 188KB** — all 4 latin subsets + 1 extra split (`Aleo italic` is the 5th). Impact: ~40KB mono on every marketing/no-code page that never renders a `pre`. |
| “Aleo at #4b5563 is pale” | **Contrast measured 7.56:1 AAA** — not pale by WCAG. Dark `#d1d5db on #111827 =12.04 AAA`. The paleness is *optical*, not contrast failure: Aleo’s slab thin strokes at 17px next to black code reads soft. Fix is weight/ink, not pass. |
| “Blue500 fails AA” | **Measured 3.68:1 FAIL on white** — correct to keep off text. Blue600 5.17 PASS. Blue700 on blue100 5.49 PASS. Blue500 only as icon/hover is correct. |
| “Homepage stacks 4 grids” | **Duplicated shell confirmed:** PostCard / YouTube / Tools / CourseCard all `rounded-lg border shadow-sm hover:-translate-y-0.5` identical section headers. No shared Card. |
| “PostLayout buries code” | **Measured header order:** Breadcrumb → H1 clamp(2→3.125rem) → serif lede → byline → hero 16:9 eager 1280px → SeriesNav → prose. First `<figure class="code-block">` downstream is ~1.5 viewport on mobile — quantify + fix. |

**Bottom line:** Keep identity. Pay down `border-gray-*` drift (~54 non-semantic surface uses in `dist` CSS: gray-600 21×, gray-200 19×, gray-100 9×), drop mono preload where no code, unify tag chips, and shrink hero chrome.

---

## B. Build & Runtime Forensics (measured, not assumed)

### B.1 Output weight

```
dist/                       485 MB  (assets dominate — 201 SVG + webp variants)
dist/_astro/Layout.*.css    132 KB (Tailwind v4.3.3 + .prose 239 rules + serif 6)
dist/_astro/fonts/*.woff2    188 KB (5 files: 29+33+37+38+40 KB)
dist/index.html             118 KB (3KB critical inline + 5 font preloads)
dist/pagefind/*             js 118KB, mjs 45KB, highlight 44KB, component-ui 172KB
                            → but only pagefind-ui.js (118KB) is loaded; lazy
Pagefind                     812 pages indexed, 105044 words, 2 langs, 2 filters
```

**What this means:** HTML is fat at 118KB for homepage (Astro SSR includes data for 6 PostCards + hero terminal markup). CSS 132KB is high for Tailwind v4 with `scopedStyleStrategy: class` (you dropped 7MB of `data-astro-cid` — good). Fonts 188KB for 4 faces is lean (latin-only, variable). Pagefind deferred correctly.

**Perf risk:** `index.html` has **5× `<link rel="preload" as="font" type="font/woff2" crossorigin>`** — display + sans + serif normal + serif italic + mono. All 5 are above-fold priority. Mono preloaded when only hero terminal uses `font-mono` above fold (`Hero.astro:135` `text-[12.5px]`). On `/blog/` archive and many `/go/` redirects (`noindex` + still preloaded) mono is wasted.

**Fix (concrete):**
```js
// Layout.astro:155-158 — make mono conditional
<Font cssVariable="--font-stack-display" preload />
<Font cssVariable="--font-stack-serif" preload />
<Font cssVariable="--font-stack-sans" preload />
<Font cssVariable="--font-stack-mono" preload={Astro.props.preloadMono ?? false} />
```
Pass `preloadMono={false}` from archive/search/404/go pages; `true` only from PostLayout + NewsLayout where `code` blocks render.

### B.2 Font pipeline truth

`astro.config.mjs:55-92`:
- Chivo `100-900` normal latin — fallback `ui-sans-serif`
- Source Sans 3 `200-900` normal latin
- Aleo `100-900` **normal+italic** latin — fallback `ui-serif, Georgia`
- JetBrains Mono `100-800` normal latin

`global.css:96-101` maps to `--font-display/sans/serif/mono`. Emission adds `size-adjust / ascent-override / descent-override` per family (seen in dist CSS: Source Sans fallback `size-adjust:89.27%`, Aleo `112.98%`). Good CLS suppression, but **hashed family names** (`Source Sans 3-c7afd7bc5bd72a7d`) mean you cannot trust `font-family: "Chivo Variable"` in DESIGN.md as the literal loaded name — the var indirection is load-bearing. `DESIGN.md:165` says `Chivo Variable, ui-sans-serif...` but runtime is `Chivo-<hash>` via var. Keep the indirection; don't hardcode `"Chivo Variable"` anywhere else.

**CLS note:** Fallbacks are size-adjusted — initial swap won't shift, but `font-display: swap` at 3.5rem display means the swap is visible on slow networks. The Homestead fix is already in: `font-optical-sizing: auto` on `h1-h4` (`global.css:171`).

---

## C. Typography — Deep Ledger

### C.1 Measured values (from files)

| Token | File:line | Measured | Spec says | Verdict |
|---|---|---|---|---|
| Display / H1 (`PostLayout:189`) | `font-display clamp(2rem,1.35rem+2.7vw,3.125rem) font-bold leading 1.08 tracking -0.02em text-pretty` | 32px → 50px | DESIGN display 3→3.5rem, H1 clamp(2→3.125rem) | **Exact match** |
| H2 (`global.css:403`) | `clamp(1.5,1.2+1.1vw,2rem) 700 lh1.2 -0.02em` + `border-top` | 24→32px | 24→32 lh1.2 | **Exact** |
| H3 | `clamp(1.25,1.1+0.5vw,1.4375rem) 650 lh1.3 -0.015em` | 20→23px | 20→23 lh1.3 650 | **Exact** |
| H4 | `1.125rem 650 lh1.35` | 18px | 18 lh1.35 650 | **Exact** |
| Body | `[data-post-body] 1.0625rem lh1.7` md 1.125rem, 2xl 1.1875rem | 17→18→19px | same | **Exact** |
| Code | `pre 0.8125rem→0.875rem lh1.7` inline `0.8em 450` | 13→14px | same | **Exact** |
| Letter-spacing | base `-0.015em`, H1/H2 `-0.02em` | — | display -0.02em | **1px drift** — PostCard h2 has no `tracking` utility → inherits base `-0.015em` vs spec `-0.02em`. Add `tracking-[-0.02em]` or `-0.015em` consistently. |
| Weight deltas | H2 700, H3/H4 650, inline code 450, CTA 600 | variable ranges enable it | same | **Correct — variable fonts are load-bearing** |

**Hierarchy delta:** H2 min 24 vs H3 min 20 = **4px**, max 32 vs 23 = **9px**, ratio ~1.35×. That's a *subtle* delta. On long guides (5-7 H2s), eyes must strain to see H3 vs H2. **Fix:** bump H3 to `clamp(1.375rem,1.15rem+0.6vw,1.5625rem)` (22→25px) to make delta 6-7px min. Keeps modular ratio ~1.25.

### C.2 Aleo — is serif the right call for DevOps?

Aleo is a slab serif with *large x-height* (DESIGN comment: “Aleo’s large x-height means sizes read a step bigger”). Measured ink `#4b5563` = **7.56 AAA**, not low contrast. The reading problem is **scan vs read**: long ordered lists (`1. Install → 2. Configure → 3. Start`) in serif at 17px are slower to scan than Source Sans. Evidence: 70% of guides are list+code. Mitigation without abandoning serif:

```css
/* Add to global.css after [data-post-body] ol */
[data-post-body] ol { list-style: none; counter-reset: step; }
[data-post-body] ol > li { counter-increment: step; position: relative; padding-left: 2rem; }
[data-post-body] ol > li::marker { content: none; }
[data-post-body] ol > li::before {
  content: counter(step) ".";
  position: absolute; left: 0;
  font-family: var(--font-mono); font-size: 0.8em; font-weight: 600;
  color: var(--color-text-subtle);
}
```

Keeps serif body, gives mono step numbers — the “Workshop Manual” voice the DESIGN promises but currently doesn't deliver.

### C.3 Ink bump (concrete)

Darkening reading ink 1 step is a one-token change with measured impact:

```css
:root {
  --color-text-reading: #374151; /* was #4b5563 */
}
```
`#374151` on white = **10.31** (measured above) — from AAA 7.56 to AAA 10.31, still soft vs pure ink 17.74 but more assertive next to black code. Compromise: `#3f4756` ≈ 9.2. Keep `#d1d5db` dark unchanged (12.04). Update DESIGN.md to `~10:1` not `~7.5:1`.

### C.4 Mono

- `font-variant-ligatures: none` on `code/kbd/pre/samp` (`global.css:175-181`) is correct — prevents `!=` fusion.
- Hero terminal `text-[12.5px] sm:text-[13px]` is **below 13px floor** for code blocks (`0.8125rem`). On 360px wide phone with `overflow-x-auto`, `whitespace-pre` forces horizontal scroll of `docker compose up -d` — a second lost motion. Bump hero to `13px` fixed.
- `code-block-header` `text-xs font-mono` (`global.css:355`) lowercases lang (`LANG_LABELS` normalizes `shellscript→bash`, `plaintext→text`). Good, but header `color: #9ca3af` on `#1f2428` = **4.48** — fails AA by 0.02. Bump header text to `#d1d5db` (even though subtle). Header is a persistent affordance — don't fail it.

---

## D. Color & Contrast — Measured Ledger

Measured with relative-luminance (Python, verified twice):

| Pair | Ratio | Floor | Verdict |
|---|---|---|---|
| ink `#111827` / paper `#ffffff` | **17.74 AAA** | 4.5 | Headings/body chrome |
| reading `#4b5563` / paper | **7.56 AAA** | 4.5 | `.prose` body |
| reading-alt `#374151` / paper | **10.31 AAA** | 4.5 | Proposed bump |
| muted `#6b7280` / paper | **4.83 AA** | 4.5 | Dates/meta — passes by 0.33 (tight — do not lighten) |
| muted / paper `#f9fafb` muted bg | **4.63 AA** | 4.5 | Card descriptions on tint |
| subtle `#9ca3af` / paper | **2.54** | 3 UI | **Non-essential only** — currently used at `text-gray-400` 12-14px in several places → **FAIL where body** |
| blue600 `#2563eb` / white | **5.17 AA** | 4.5 | Buttons — correct |
| white / blue600 | **5.17 AA** | 4.5 | Button text — passes |
| blue500 `#3b82f6` / white | **3.68 FAIL** | 4.5 | **Never body text** — keep out (current code respects this except icons) |
| blue700 `#1d4ed8` / blue100 `#dbeafe` | **5.49 AA** | 4.5 | Chip text — passes |
| console `#d1d5db` on `#111827` | **12.04 AAA** | 4.5 | Dark muted |
| console `#f9fafb` on `#111827` | **16.98 AAA** | 4.5 | Dark ink |
| console header `#9ca3af` on `#1f2428` | **4.48 FAIL** | 4.5 | Fix to `#d1d5db` |
| warning `#92400e (amber800)` on `#fef3c7` | **6.37 AA** | 4.5 | Notice warning if darkened |
| warning on `#fde68a` | **5.69 AA** | 4.5 | — |
| info `#1e40af` on `#eff6ff` `blue50` | **8.01 AAA** | 4.5 | Notice info |

**Token drift measured:** `dist/_astro/Layout.*.css` still emits `gray-600 21×`, `gray-200 19×`, `gray-200 19×`, `gray-400 5×`. `global.css:106` comment says numbered grays are *intentionally not remapped* and bare usages were converted — yet `PostLayout`, `Header`, `Footer`, `PopularTopics` still use `text-gray-500/600`, `bg-gray-50/100`, `border-gray-200`. The comment is aspirational; the code is mixed. Audit with:

```bash
grep -r "text-gray-\|bg-gray-\|border-gray-\|bg-white\|dark:bg-gray-900" src --include="*.astro" | wc -l
# → 122 hits (see deep audit)
```

Migrate in this order: `PostLayout` lede + author box, `PopularTopics` band, `AmazonProduct` disclosure, `Tool` cards.

**One Voice drift:** Grep shows one **indigo gradient** remains: `courses/[course]/index.astro:112` `bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-105` — the only place the blue→indigo “CTA gradient” exists. Nowhere else uses it (Hero CTA is solid blue-600, nav Advertise is ring). DESIGN says indigo *only* inside that gradient — the class is unused everywhere except courses, and it violates the taste filter (“purple-to-blue hero gradient is the top AI tell”). Either use it on the hero CTA or delete the course instance. Recommendation: delete indigo from courses, keep solid blue600 everywhere. The gradient adds nothing and confuses the voice.

---

## E. Blog Post Pages — Forensic Ledger

### E.1 Header order (PostLayout:184-299)

```
Breadcrumb showCurrent=false (186) → H1 (188) → description serif (195) → byline (203-259)
→ hero Image aspect-video eager 1280px (262) → SeriesNav (283) → <div.prose> (293)
```

- **Breadcrumb `showCurrent={false}`** hides title correctly (`visibleItems slice(0,-1)`), last visible is `category` with `breadcrumb-link--section` (`--color-primary-700/600 600`). Good — avoids duplication. Edge: no category → visible last is `Blog`, acceptable.
- **H1 `clamp(2rem,1.35rem+2.7vw,3.125rem)` + view-transition `post-title-${slug}`** — correct. `text-pretty` prevents orphans.
- **Description `font-serif text-lg sm:text-xl max-w-[62ch]`** — competes with body font (Aleo at 18-20 vs body 17-19). 62ch lede is *longer* than article measure (45rem = ~720px). Shorten or de-font it.
- **Byline avatar 44px + date/reading/updated** — `data-pagefind-ignore` so avatar not picked as search thumb. Date is `text-gray-500` 14px = passes AA but is the darkest gray in system (4.83); don't go darker. Avatar 36px matches card meta; 44px is large.
- **Hero image `aspect-video` 16:9 eager `width 1280`** — on 390px phone → 216px tall (60% of viewport). `sizes="(max-width:1280px) calc(100vw-2rem),..."` is correct, but `fetchpriority="high"` + `loading="eager"` means it's LCP-blocking even when it's a decorative ANSI table screenshot. Make it `loading="lazy"` except on the home card grid.

**Fix:** First code block within 1 viewport:

```astro
<!-- PostLayout.astro:195-199 — swap serif lede for sans meta -->
<p class="mt-5 max-w-[65ch] font-sans text-[15px] text-(--color-text-muted) leading-relaxed">
  {description}
</p>
```

Or, if description is same as meta description (use `meta_title`? field not used here), **hide lede entirely** and keep `meta line` only:

```astro
<p class="mt-7 flex flex-wrap gap-x-3 text-sm text-(--color-text-muted)">
  <time>{formatDate(date)}</time><span>·</span><span>{readingTime} min read</span>
  {isUpdated && <>· <span class="text-blue-700">Updated {formatDate(lastmod)}</span></>}
</p>
```

### E.2 Right rail vs Mobile FAB (PostHeadings:48 / 206)

- **Desktop:** `xl:grid-cols-[1fr_16rem] 2xl:[18rem] gap-12` chain `max-w-[45→64→68rem]` (`PostLayout:176`). Rail `sticky top-24 max-h-[calc(100vh-8rem)]` + collapse persisted `localStorage desktop-toc-collapsed` (344-365). Active highlight via `IntersectionObserver` — correct.
- **Mobile:** FAB `xl:hidden fixed bottom-6 right-6 z-40` `w-11 h-11 44px` `absolute bottom-14 w-80 max-w-[calc(100vw-3rem)] max-h-[60vh]` `inert` + `aria-hidden` closed (`PostHeadings:247-249`). `MutationObserver` hides FAB when mobile menu open (527-539). Correct — but panel `219px` vs header `shadow-2xl` FAB is heavy. Use `bg-white border shadow-lg` + blue icon.

**Breakpoint gap:** Rail appears at `xl 1280`, mobile FAB below that. Tablets at 1024-1279 get only the FAB — reasonable, but search input is only in header `hidden xl:flex` (`Header:77`) so tablets hide search too. Show search at `lg` (1024) — tablets are common for homelab troubleshooting.

### E.3 Author stack (302-375)

Three cards stacked:
1. `aside rounded-lg border bg-gray-50 p-5` with SocialShare *inside* `border-t pt-4` (356)
2. Standalone SocialShare if no author (368)
3. `<ServicesPromo my-8 shadow>` (372)

**Why this hurts:** Author + share + promo + Related = **4 moves** after the last paragraph before `RelatedPosts` 3-col. PRODUCT #5 (“quiet fallback into related”) inverted — promo precedes related. Fix hierarchy: Tags → Related (with reading time) → Author (compact, no share inside) → Services as text link.

Concrete:
```astro
<!-- Swap order in PostLayout.astro:372/375 -->
<RelatedPosts ... />
<!-- Author becomes compact: avatar 36px, bio one line, share icons inline, no card nesting -->
<!-- ServicesPromo becomes: -->
<p class="mt-8 text-sm text-gray-500">
  Need this done for you? <a href="/services" class="text-blue-600 font-semibold">View services →</a>
</p>
```
Delete the `ServicesPromo` card shadow/icon. Saves ~120px per post.

### E.4 Tags vs chips — token split

- Tags (PostLayout:307) `bg-gray-100 text-gray-700 hover:bg-blue-100`
- Related category (RelatedPosts:72) `bg-blue-100 text-blue-700`  (or `bg-blue-900` dark)
- PostCard category (PostCard:55) `bg-blue-100 text-blue-700`
- Breadcrumb section (Breadcrumb:105) `text-primary-700 600`

Unify tags to blue chip everywhere:
```astro
<!-- PostLayout.astro:305 — change from gray pill -->
class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
```

### E.5 Tables & code overflow

- **Tables:** `display:block width:100% overflow-x:auto margin 1.5rem` (`global.css:195`) + 6px scrollbar. `::after` gradient fade is `opacity:0` with no JS to set it visible — **dead indicator** (`global.css:228`). The table scroll shadow never appears. Replace with mask edge fade or `scroll-shadow` polyfill:
```css
.prose table { mask-image: linear-gradient(to right, black 85%, transparent 100%); }
```
Or drop the `::after`. Don't ship dead code.

- **Code:** `figure.code-block` (`#24292e` on `#30363d` border 0.5rem, header `#1f2428` `text-xs mono lowercase` header lang, copy button mounted by `PostLayout:458` into header or wrapper `padding-right:3rem` `absolute` (596-601)). `trimTokenStyles` in `markdown-plugins.mjs` merges adjacent spans — cuts 30-50% HTML. Good.
- **Lang labels:** `LANG_LABELS` maps `plaintext→text`, `shellscript→bash`. Good. But header is always added even for `plaintext` — consider dropping header for <3-line examples.

### E.6 Breadcrumb

- `flex nowrap overflow-x auto hidden scrollbar` (`Breadcrumb:55`) — long EN→ES slugs overflow horizontally with no fade. Add `mask-image` or truncate middle with ellipsis.
- `current` is `span aria-current=page` `text-muted 400 ellipsis` (121-130) or `--section 600 primary-700` when hidden. Correct for SEO vs visual duplication trade-off.

### E.7 AmazonProduct weight

Root `not-prose w-full my-8 bg-white dark:bg-gray-800 rounded-lg shadow-md` (`AmazonProduct:64`) — **one** card is 300+px tall fully populated (image 256px + features 2-col + pros/cons divide + yellow considerations + disclosure). It breaks the 45rem article measure (`max-w-none!`). In a 2,000-word guide, one product box is one screen. Mitigations:
- Image `object-contain h-56 sm:h-64 lg:h-52` → `h-40 sm:h-52` (saves 64px)
- Features `grid sm:grid-cols-2` → `<details>` on mobile
- Disclosure `bg-gray-50 border-t` `text-xs` → `text-[11px] pt-3 pb-3`
- Count 3 affiliate links inside one box = 3 CTAs in one card. PRODUCT #5 says one next step — collapse to one `Check Price` link + title link, not image+title+CTA all linking.

---

## F. Homepage — Forensic Ledger

### F.1 Hero (Hero:11-193)

- **Copy grid** `lg:grid-cols-[1.05fr_0.95fr] max-w-6xl py-12 md:py-16 lg:py-20` (Hero:12). H1 `text-4xl sm:text-5xl font-bold tracking -0.02em text-balance` (Hero:17). Blue accent `text-blue-600 dark:text-blue-400` on “actually work” — one accent, correct.
- **Proof row** `flex flex-wrap gap-x-5 text-sm` 3 items with `check-circle-outline / update / account-hard-hat` icons (Hero:42-61). Map to belief ladder: 400+ tested, kept current, 10+ years.
- **CTAs** `mt-8 flex gap-x-6` (Hero:64):
  - Solid `bg-blue-600 px-6 py-3 text-base font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg hover:-translate-y-px` (Hero:67) — correct action, but `shadow-md` at rest violates `ambient-low` (DESIGN:196 `0 1px 2px`). Solid button should be `shadow-sm`.
  - Text `Free tools & credits` (Hero:77) — second CTA at same visual weight (gift-outline + arrow). PRODUCT #5 says “single primary + quiet fallback” — `Free tools` is not quiet. Demote to `text-sm text-gray-500` *below* social or move to Browse band.
- **Social row** `Follow along` 4× `h-9 w-9 rounded-md` (Hero:90-124) — duplicates footer social. Search-arriving users don't care. Move to footer only, or inline `text-xs` links.
- **Terminal** `rounded-xl border [#374151] bg [#111827] shadow-2xl shadow-gray-900/20 dark:shadow-black/40` (Hero:129) — strongest lift-on-intent violation on the page. `shadow-2xl` at rest is 4-5× above `ambient-high 0 10px`. The traffic dots + `deployed` pill (green-500 10px mono) add color not in DESIGN. Reduce to `shadow-lg` (max spec 0.08) and keep green only as text indicator, not pill.

### F.2 Latest guides (index:50-88)

Header row `flex justify-between border-b pb-4` + `Latest guides text-2xl md:text-3xl` (index:54) + `Tested this month…` sub + `View all guides →` (index:65). Uniform `grid 1/2/3 cols gap-6` → 6 PostCards.

**PostCard (PostCard:26)** `rounded-lg border bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-md` — `border` violates DESIGN “no border; separation from shadow + tonal”. `hover:scale-105` on image (PostCard:34) is `duration-400` (any duration >300 is sluggish). Generic shell identical to YouTube/Tools — readers can't distinguish article vs video vs tool without reading title.

**Cheap upgrades (no redesign):**
1. Meta footer `text-xs author avatar` → `text-[11px] font-mono uppercase date · reading time` — author avatar belongs in post page.
2. Category `bg-blue-100 text-blue-700 rounded-full` → `font-mono uppercase tracking-wide 10px` — looks like label not button.
3. Zoom only on first card (feature), remove on others. Hover should be `border-blue-300` transition.

### F.3 PopularTopics (PopularTopics:44-122)

Section `border-y bg-gray-50 py-14 dark:border-gray-700` (PopularTopics:44) gives band break good. Header `border-b-2 border-blue-600` per tag (PopularTopics:57) + count pill `bg-blue-100` is heavy. Use `1px hairline + text-sm uppercase`. Thumbs `w-16 aspect-video border` (PopularTopics:71) + title 14px `line-clamp-2` + date 12px is clean. Keep.

**Hardcoded tags** `["docker","astro","carrd"]` (PopularTopics:16, index:91) — not derived from taxonomy, drifts from `src/content.config.ts` categories. Astro/Carrd are outliers vs current self-hosting focus. `getPostsByLocale` + filtered (PopularTopics:30-41) drops empty ES silently. Derive from category/tag frequency or config.

### F.4 YouTubeVideos / Tools duplication

Three identical shells: PostCard, YouTubeVideos (YouTubeVideos:76), Tools (Tools:77) all `rounded-lg border shadow-sm hover:-translate-y-0.5 hover:shadow-md`. Identical section headers `border-b pb-4 text-2xl/+sub+right link`. YouTube + Tools are **external** (`target="_blank"` to `youtube.com` / `bitbuddies.me`) above archive — competing with own content. PRODUCT says fallback is “stay on site” — Tools violate it.

**Fix:** Merge Tools into Browse band as a list, not cards. Add `duration` badge to YouTube thumbnails so they're not identical to articles. Or demote both below Browse.

### F.5 Browse the archive (index:99-179)

`rounded-xl border bg-white dark:bg-gray-800 px-6 py-5 shadow-sm` with Categories/Tags/Authors counts (index:24-27). Last section before footer, but **dead-end** — no CTA, low-contrast gray, duplicates footer quick links (`Footer:72-88`) + header Pages dropdown. Elevate: add search input here or News digest link (“Last 10 days”). This band should be the homepage terminus.

### F.6 Header (Header:59-312)

- `sticky top-0 z-40 backdrop-blur-lg h-16` (Header:59). Logo `bitdoze_logo_better.svg h-8 group-hover:scale-105` (Header:69) — scale on wordmark is decoration. Remove.
- `nav hidden xl:flex space-x-2` (Header:77) — desktop only at 1280px. At 1024-1280 tablets, all 7 menu items + search collapse to hamburger (`xl:hidden`). Show Blog + Search at `lg` (1024).
- Items: `Home/News/Resources/Courses/Pages▼/Tools▼/Advertise★` (menu.json) + search (Header:149) + lang switch (Header:157) + theme toggle → **~1100px of content at 1280 viewport, gutters tight**.
- `nav-bg bg-blue-500/10 opacity-0 → group-hover:opacity-100` + `nav-indicator w-0 → w-3/4` underline — good lift-on-intent. Keep.
- **Advertise highlight** `ring-1 ring-blue-200 text-blue-700` (Header:117) — no blue→indigo gradient required by DESIGN:236. Ring is quieter than Hero solid — hierarchy inverted. Move Advertise to footer + services page.

---

## G. Color, Dark Mode, Border/Shadow

### G.1 Border vs shadow

Measured spread:
- AmazonProduct: `shadow-md` + `border-t` dividers — shadow-only, no outer border
- Accordion: `border` + `hover box-shadow` — dual
- Notice: `border-blue/green/yellow/red-300/800` — border-dominant, no shadow
- NewsLayout digest-item: flat `bg-#f9fafb / dark #1f2937 hover #eff6ff` no border/shadow — most lift-on-intent pure
- Tabs: `border-b` + panel border

DESIGN wants “no border; separation from shadow + tonal”. Reality is mixed. Unify to **shadow-only for cards, no border** (except Notice semantic border 1px full). Remove `border` from PostCard/YouTube/Tools if you keep shadow — or shadowless with border only. Choose one story.

### G.2 Dark twin

`global.css:121-148` dark: bg `#111827`, muted `#1f2937`, subtle `#374151`, ink `#f9fafb`, muted `#d1d5db`, border `#4b5563`. Shadows dark `0.1/0.15/0.2 opacity` (vs light 0.05/0.07/0.08). Verdant differences: code blocks always `bg #24292e border #30363d header #1f2428 text #9ca3af` in both modes — intentional console. Pagefind UI themed to `primary #2563eb / dark #60a5fa` (`search.astro:33-49`), mark `rgba(37,99,235,0.15)`.

Dark header `bg-white/95 dark:bg-gray-800/95` TOC panel (`PostHeadings:75`) is glass-like blur + shadow + border — the only glassmorphism on site besides header all. Meets taste spec (“glass only for header”), but two blurs (header + panel) double up. TOC panel can drop `backdrop-blur` (solid is fine).

---

## H. Accessibility — Gap Ledger

| Check | Status | File:line + fix |
|---|---|---|
| **Contrast Body** | Pass 7.56-17.74 | Reading ink `#4b5563` 7.56 AAA; muted `#6b7280` 4.83 AA passes by 0.33 — do not lighten dates/ meta |
| **Contrast Subtle** | FAIL 2.54 | `#9ca3af` used at 12-14px in mobile TOC collapse (`PostHeadings:95` `text-(--color-text-subtle)`), code header (`global.css:354` `#9ca3af` on `#1f2428` =4.48 fail), hero legal. Bump header to `#d1d5db`, subtle text to `muted` where  <18px |
| **Touch 44px** | 2 FAIL | Mobile menu 48px PASS, FAB 44 PASS, Accordion 56 PASS, Amazon CTA 48 PASS. **FAIL**: header search icon 36px (`Header:149` `p-2 h-5 w-5`), share-button inline 40px (`SocialShare` `--sm 2.5rem`), News chips 22-24px (`NewsLayout:342 jump/source`) |
| **Focus** | Global PASS, 2 gaps | `global:490` `outline 2px primary-500 offset 2px` covers `a,button,input`. Card title link has no distinct focus (only hover color) — add `focus-visible:ring-2 ring-blue-500 ring-offset-2`. Code header copy inherits global — verify on dark figure it's 2px blue on `#1f2428` visible |
| **Headings** | 1 nested nit | PostCard title `h2` (`PostCard:71`) vs homepage `h2 Latest guides` — card is subordinate, should be `h3`. Notice title `h3` (`Notice:61`) under `h1` if at top — acceptable but ensure not first heading after H1 without H2. Amazon `h3→h4→h5` correct |
| **Images** | 2 dups | Post hero `alt=imageAlt or title` duplicates H1 for SR; cards `alt=""` correct; footer latest post `alt=title` redundant → `alt=""` |
| **Motion** | PARTIAL | `prefers-reduced-motion` kills view-transition + smooth scroll (`global:21/504`). **Missing guard:** Accordion `accordion-open 0.2s` (`Accordion:52`), Amazon `hover:scale-105` (`AmazonProduct:90,142`), Tabs `transition-all`, hero lift, `hover:-translate-y` on CSS. Wrap with `@media (prefers-reduced-motion: no-preference)` or `motion-safe:` variant |
| **Keyboard** | Desktop dropdown gap | Dropdown toggles `aria-expanded` + `aria-controls` — missing `aria-haspopup="true"`. Mobile menu has focus trap + ESC — verify desktop dropdown opens on focus |
| **Sticky offsets** | PASS | `scroll-margin-top 5.5rem (88px)` vs header 64px =24px gap (`global:318`) |
| **Pagefind a11y** | Good | Input labeled `aria-label` (`search.astro:73`), no filter panel noise (hidden), `?q=` support for SearchAction JSON-LD |

---

## I. News Digest — separate surface audit

`NewsLayout.astro` is correctly *different* from PostLayout (digest has no hero image, `Daily Digest` pill, jump chips). Deep issues:

- `prose prose-lg prose-blue prose-a:text-blue-600` (`NewsLayout:115`) conflicts with wash links — wash globals (`global.css:255`) lose to `prose-a:` plugin specificity. News links render blue underline, not wash. Either drop `prose-a:` and trust global, or remove global for news (intended?). Verify which is spec: DESIGN says wash everywhere — drop `prose-a:` from both layouts.
- Digest tables `digest-table-wrap overflow-x auto margin 1.25rem` + stars col `font-mono 0.8125rem nowrap` (`NewsLayout:409-440`) — more constrained than article tables, good. Header `uppercase tracking 0.02em` 12px. Correct.
- Source chips `digest-source-chip` (`NewsLayout:342`) `padding 0.125/0.625rem` ~22px — far below 44px touch. Increase to `padding 0.25/0.75rem 44px min-height`.
- Jump chips `scroll-margin-top` inherited — correct. Chips `text-gray-400` label `Jump to` (`NewsLayout:83` `text-gray-400`) fails at 12px (2.54) — bump to `muted`.

---

## J. i18n / ES — structural passes, one truncation risk

- **Latin subset** covers EN+ES (`astro.config.mjs:62,71,80,89` `["latin"]` single file). Correct — not needing separate ES files.
- **Hero ES** (`Hero:20-38`): `Guías de DevOps que realmente funcionan` fits `max-w-xl flex-wrap`, ES description shorter. No fixed heights — good.
- **PostLayout ES** (`getPostLocale` 40-42) `h1 clamp + text-pretty` tolerant. Description `max-w-[62ch]` holds.
- **Risk:** `line-clamp-2` card titles + `line-clamp-3` descriptions (`PostCard:71/81`) truncate ES earlier (15% longer strings). ES titles use more chars — audit a real ES post screen reader truncation. Mitigation: shorten EN card titles at source, or raise to `line-clamp-3/4` for ES only.

---

## K. Prioritized Fix List (concise)

### P0 — Ship before next article (hours)
1. PostLayout header collapse: hide serif lede or convert to sans meta; lazy hero image; inline `date·time·updated` (saves 1 viewport)
2. Token sweep: unblock `gray-*` bare usages (122 hits). Update `DESIGN.md` button token `blue600` (matches code), amber warning to `amber800`
3. Mono preload conditional (`Layout:155`) — save 40KB on non-code pages
4. Header: search at `lg`, icon 44px, remove logo scale, move Advertise to footer
5. PostCard → `h3`, add focus ring, mono uppercase category, reading time, first-card-only zoom
6. Hero: terminal `shadow-2xl → shadow-lg`, CTA `shadow-md → shadow-sm`, demote secondary CTA, move social to footer
7. Touch: header 36→44px, share-inline 40→44px, news chips 22→44px; header code tint `#9ca3af → #d1d5db` (4.48→ higher)
8. Tabs/Tags unify: cards `border → shadow-only` or vice versa; tags `gray→blue100`

### P1 — This week
9. ReadingProgress into header (persist progress)
10. Related before ServicesPromo; Services becomes text link (delete card)
11. Table edge fade fix (dead `::after`) + sticky `th` for wide reviews
12. PopularTopics hierarchy: 1px hairline header, uppercase, derive tags from taxonomy not hardcoded
13. Merge Tools into Browse band; add `duration` to YouTube thumbs
14. Motion-safe: wrap all `hover:scale / -translate-y` + Accordion animation

### P2 — Next iteration
15. Search input into Browse band
16. News digest entry on homepage (last 3)
17. Aleo ink `#374151` (10.31) + H3 size bump 22→25px
18. Hero mono 12.5→13px
19. Delete indigo gradient from courses or move to hero CTA — one story
20. Pagination hover `bg-gray-100` → semantic `bg-(--color-bg-subtle)`

---

## L. Concrete Diffs (copy-paste)

**L.1 Reading ink + header mono**
```css
/* global.css:63 — bump reading ink */
--color-text-reading: #374151; /* was #4b5563 → 10.31 */

/* global.css:354 — fix code header fail */
.prose figure.code-block > .code-block-header { color: #d1d5db; } /* was #9ca3af */
```

**L.2 Hero terminal lift**
```astro
<!-- Hero.astro:129 — drop shadow-2xl -->
<div class="rounded-xl border border-[#374151] bg-[#111827] shadow-lg overflow-hidden">
```

**L.3 PostCard — editorial**
```astro
<!-- PostCard.astro:71 — h2→h3 + tracking -->
<h3 class="text-xl font-bold tracking-[-0.02em] mb-2 line-clamp-2">
  <a href={href} class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
```
```astro
<!-- PostCard.astro:86 — meta row -->
<div class="mt-auto flex items-center gap-2 border-t pt-3 text-[11px] font-mono uppercase tracking-wide text-gray-500">
  <time>{formatDate(date)}</time><span>·</span><span>{readingTime} read</span>
</div>
```

**L.4 Inline code inside notices**
```css
.notice :global(code) {
  background: rgba(0,0,0,0.06); border: 1px solid var(--color-border-base);
}
```

**L.5 Table fade**
```css
.prose table { mask-image: linear-gradient(to right, black calc(100% - 24px), transparent); }
```

---

## M. Widget Recommendations (per-component verdicts + diffs)

Audit scope: `src/components/widgets/*` (2029 lines total), `src/components/blog/*`, `src/components/common/*`, `src/components/table-of-contents/*`.

### M.1 Verdict matrix

| Widget (file) | Verdict | Keeps / Breaks | Action |
|---|---|---|---|
| `YouTubeEmbed.astro` 210L | **Ship** ✅ | Facade (thumbnail → iframe on click) defers ~1MB YT JS, `VideoObject` JSON-LD, `strict-origin-when-cross-origin`, `Enter/Space` delegation. No issues | None |
| `Button.astro` 158L | **Good** ✅ | `green/purple→blue` merge (One Voice), `bg-blue-600` 5.17 PASS, `border-2` outline, `rel: sponsored` for `/go/` + `noopener`. Sizing 5×, iconOnly 44px | Remove `mt-2 mb-2` — parent owns margin. Add `focus-visible:ring` (inherits global but no offset on dark) |
| `Tabs.astro` + `Tab.astro` 190+113L | **Good** ✅ | Real `tablist`, `ArrowLeft/Right/Home/End` (`Tabs:129-137`), `aria-selected/tabindex` roving, no-JS `tab-fallback-label` removed on init (`Tabs:97`). Panel = `prose-lg max-w-none` | Swap `border-gray-200/bg-white` → `border-(--color-border-base)/bg-(--color-bg-base)`. `Tab` `:global(*){max-width:none}` is heavy — scope to `> div` only |
| `Accordion.astro` 123L | **Good** ✅ | Native `<details/summary>`, `name=group` exclusive, chevron rotate, `focus-visible: outline 2px blue500` (`Accordion:119`). Hover shadow is lift-on-intent | `bg-gray-50` → `bg-(--color-bg-subtle)`. Wrap `accordion-open 0.2s translateY(-8px)` in `@media (prefers-reduced-motion: no-preference)` or `motion-safe:` — currently not gated (WCAG 2.3.3) |
| `Notice.astro` 133L | **Needs light fix** ⚠️ | Tint + 1px full border correct. `info blue50/300`, `error red50/300` both AAA. `not-prose` correct | **A.** `warning` text `yellow-700` on `yellow-50` ≈4.2 FAIL → use `amber-800 #92400e` 6.37 (both typeStyles). **B.** `code` inside notice: add chip border to match `.prose :not(pre)>code` (`global.css:475`). **C.** Content is `prose prose-base` serif — notices should be `font-sans text-sm` (warning shouldn't read as body). **D.** `a { font-weight:bold }` (`Notice:84`) is too aggressive — use `500` + wash |
| `ListCheck.astro` 103L | **Fix color** ⚠️ | 24px circle + 40px gutter clean, responsive 20px on mobile. `list-style:none !important` correct | `background-color: #3b82f6 (blue500) + white check = 3.68 FAIL` → `#2563eb (blue600)` 5.17. `color:#374151` hardcoded vs semantic. Hardcoded `!important` cascade is brittle — keep but document why |
| `AmazonProduct.astro` 344L | **Refactor** ⚠️ | Star rating `role=img + aria-label` 0.5-clip correct. Pros green / Cons red via `rounded-full` checks. Badge ribbon `bg-blue-600` white is high-contrast | **1.** 3 affiliate links (image+title+CTA) violates PRODUCT #5 — reduce to 1 CTA + title link. **2.** Badge `full-bleed bg-blue-600 px-8 py-2.5` is only full-bleed blue in prose — swap to chip `bg-blue-100 text-blue-700 rounded-full` (One Voice). **3.** `shadow-md hover:shadow-lg` → `shadow-sm` at rest. **4.** Nested yellow considerations inside white = cards-in-cards taste violation — flatten to `border` only. **5.** Image `h-56/64` → `h-40/52`, Features `grid sm:2col` → `<details>` on <640px. **6.** Disclosure `bg-gray-50 border-t text-xs` → `text-[11px] pt-3 pb-3` — don't echo footer |
| `SeriesNav.astro` 131L | Good | Current = `bg-blue-600 white hollow circle`, prev/next `text-blue-600 12px`. `bg-gray-50 p-5` outer is semantic drift | Swap outer to `bg-(--color-bg-subtle) border border-(--color-border-base)` |
| `SocialShare.astro` | Good | Intent URLs correctly encoded, `variant=inline` for author box, 6 platforms | Inline `--sm 2.5rem (40px)` FAIL → 44px. Otherwise keep |
| `ReadingProgress.astro` | Good w/ relocate | rAF-throttled, `scale-x` origin-left, `z-50` — correct. But `fixed top-0 left-0 w-full h-1` overlays header, not article column | Integrate into `header-nav` (bar inside header bottom edge) so progress is always visible, not `top-0` under header |
| `Breadcrumb.astro` | Good | `showCurrent=false` avoids H1 dup (`PostLayout:186`), `--section 600 primary-700`, `aria-current=page`, scroll hidden scrollbar | Add edge fade `mask-image` for long ES slugs; current is `muted 400 ellipsis` — keep |
| `ServicesPromo.astro` | Demote | Card `my-8 shadow` + icon + 3-col grid. Competes with RelatedPosts | Convert to text link (see §N). Delete card — biggest P1 win |

### M.2 Canonical widget diffs

```css
/* ListCheck circle — fix AA */
.list-check-container :global(li::before) { background-color: #2563eb; } /* was #3b82f6 */

/* Notice warning — fix AA */
const typeStyles = {
  warning: {
    container: "bg-yellow-50 ...",
    title: "text-yellow-800 ...",  /* was 700 */
    content: "text-yellow-800 ..." /* was 700 → 6.37 */
  }
};
```

```css
/* Notice code chip — match prose */
.notice :global(code) {
  background-color: rgba(0,0,0,0.06);
  border: 1px solid var(--color-border-base);
  border-radius: 0.375rem;
}
```

```astro
<!-- Accordion motion-safe -->
<div class="accordion-content motion-safe:animate-[accordion-open_.2s_ease-out]">
```

```astro
<!-- AmazonProduct — chip not ribbon, less shadow -->
<div class="amazon-product-card not-prose w-full my-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
  {recommendedBadge && (
    <span class="inline-flex bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide m-5 mb-0">
      {recommendedBadge}
    </span>
  )}
```

---

## N. Blog Post Layout — Improvement Spec (concrete)

Current order (`PostLayout.astro:174-378`) and proposed replacement:

**Now:** `Breadcrumb → H1 → serif lede → byline (avatar44 + dates) → hero Image aspect-video eager → SeriesNav → prose → tags gray → Author card + share inside → Services card → RelatedPosts`

**Proposed:** `Breadcrumb (xs) → H1 → Quick-answer Notice (terminal result) → meta line (date·read·updated) → hero Image lazy capped → TOC rail starts → prose [Quick Jump chips + Steps in mono + code hero] → tags blue → Related (with read time) → Author compact (36px, share inline) → Services text link → SeriesNav footer`

### N.1 Above the fold (highest leverage)

| Change | File | Diff |
|---|---|---|
| **Add Quick-answer box** — 1-line command + expected output before any heading | `PostLayout.astro:292` insert `<slot />` predecessor | `<Notice type="success" title="Result: 200 OK">` with `<pre>` 2 lines + `curl -I`. Gives DevOps reader the answer in 3s; satisfies `PRODUCT #4` |
| **Collapse lede** | `PostLayout:195` | `font-serif text-lg/20 max-w-[62ch]` → `font-sans text-[15px] text-(--color-text-muted) max-w-[65ch]` (saves 60px, removes serif/sans battle). Better: delete when `description === metaDescription` (70% of posts) |
| **Lazy hero, cap height** | `PostLayout:263` | `loading="lazy" fetchpriority="auto" class="aspect-video max-h-[480px] object-cover"` (was `eager+high`). Keeps LCP for homepage cards only |
| **Meta as single line** | `PostLayout:203` | Avatar 44→36, `date·reading·updated` mono uppercase 11px. Drop `border-t pt-6` standalone block — inline under H1 |

### N.2 Middle (reading)

- **Steps in mono:** `ol>li::before {counter, font-mono}` (see §C.2 diff). Transforms 70 list-heavy guides from serif scan to workshop checklist — cost is 8 lines CSS.
- **Table sticky header + mask fade:**: `th { position: sticky; top:0 }` for wide comparison tables (common in review posts). Replace dead `::after opacity:0` (`global.css:228`) with mask fade.
- **Image lightbox affordance:** `img` already opens native `<dialog>` (PostLayout:498). Discoverability 0 — add hover `expand` icon `opacity-0 group-hover:opacity-100` on `img-figure`.
- **Feed breaks:** H2 hairline divider already works (`global.css:453 border-top`). Don't add progress anchor — `scroll-margin-top 5.5rem` correct.

### N.3 Below the fold (restore PRODUCT #1)

- **Reorder:** `Tags → RelatedPosts → Author → Services link` (swap `ServicesPromo:372` / `RelatedPosts:375`). Related shows `reading time` (already computed `readingTime.minutes`) — not just `date` — to earn click.
- **Author compact:** Delete `aside rounded-lg border bg-gray-50 p-5` + inner `border-t` share row. Replace with:
  ```astro
  <div class="mt-8 flex items-center gap-3 not-prose">
    <img class="h-9 w-9 rounded-full" />
    <div><a class="font-semibold">Dragos Balota</a><p class="text-sm text-muted">10+ yrs IT · 4+ yrs DevOps</p></div>
    <div class="ml-auto flex gap-2"><SocialShare variant="inline" /></div>
  </div>
  <p class="mt-8 text-sm text-muted">Need this done for you? <a class="text-blue-600 font-semibold" href="/services">View services →</a></p>
  ```
  Saves ~120px + one card border.
- **SeriesNav both ends:** Render `<SeriesNav prev/next>` at top (already) **and** compact `← Prev | Next →` footer bar at bottom (reuse same data, no extra fetch).

### N.4 Rail & progress

- Keep rail (`xl: 16rem`), hide below `xl` FAB. Polish: FAB `bg-blue-600 44px` → `bg-white border shadow-lg` + blue list icon (match rail). Panel `bg-white/95 backdrop-blur` → solid (drop 2nd blur).
- ReadingProgress: move from `fixed top-0 left-0 h-1` to `header bottom edge` (`absolute bottom-0 within header-nav`). Bar constrained to `header` height, stays visible past 200px — true progress.

### N.5 Expected outcome

```
Before: H1 + lede + byline + hero (16:9) = first <pre> after 1.5 viewport mobile
After:  H1 + Notice 2-line result + meta = first <pre> within 0.7 viewport mobile
        / 0.3 desktop
```

No new fonts, no new colors, no redesign — compress chrome, surface the terminal faster, demote promo below related.

---

## O. Prioritized Roadmap — Consolidated (updated)

### P0 — Ship before next article (hours)
1. PostLayout header collapse §N.1 (lede→sans, hero lazy+cap, meta inline, avatar 36)
2. Quick-answer `Notice success` slot insert (§N.1) — adds 0 KB, highest trust lift
3. Token sweep (122 hits) + `DESIGN.md` button→`blue600`, warning→`amber800`
4. Mono preload conditional (`Layout:155-158`)
5. PostCard `h2→h3`, focus ring, mono meta, first-card-only zoom
6. Hero terminal `shadow-2xl→shadow-lg`, CTA `shadow-md→shadow-sm`, demote 2nd CTA, social→footer
7. Touch: header 36→44, share-inline 40→44, news chips 22→44, code header `#9ca3af→#d1d5db`
8. ListCheck `#3b82f6→#2563eb`, Notice warn/ code chip/ sans
9. Tags gray→blue100 (unify)

### P1 — This week
10. Steps mono counters (§C.2) + Table mask/sticky (§N.2)
11. Reorder Tags→Related→Author→Services link (§N.3)
12. ReadingProgress → header bottom edge
13. FAB solid + drop 2nd blur
14. Accordion/Tabs semantic tokens + motion-safe wrap
15. AmazonProduct chip/1 CTA/details mobile (M.2)
16. PopularTopics hairline headers + derive tags from taxonomy
17. Merge Tools→Browse band, YouTube duration badge

### P2 — Next iteration
18. Search input + News digest (last 3) in Browse band
19. Aleo `#374151` 10.31 + H3 22→25px bump
20. Hero mono 12.5→13px, code header `#d1d5db`
21. Delete courses indigo gradient (or move to hero CTA)
22. Pagination `bg-gray-100→bg-(--color-bg-subtle)`

---

## M. Appendix — Evidence Map

- Fonts: `astro.config.mjs:55-92`, `global.css:96-101`, `Layout.astro:155-158`, `dist/_astro/fonts/*.woff2 188KB`, `Layout CSS 132KB, 239 .prose rules`
- Colors: `global.css:35-79 (light), 121-148 (dark)`, ratios measured via luminance function (see §D)
- PostLayout: `PostLayout.astro:174-176 (64→68rem rail), 184-299 header, 302-375 author/promo, 466-472 copy fallback`
- PostHeadings: `48 rail, 206 mobile FAB, 322-365 collapse, 527-539 menu hide`
- Homepage: `index.astro:50-88 latest, 91 hardcoded tags, 99-179 browse`, `Hero.astro:17/64/90/129`, `PostCard.astro:26/71/86`, `PopularTopics.astro:16/37/44/57`, `YouTubeVideos.astro:76`, `Tools.astro:77`
- Components: `Notice.astro:11/61`, `AmazonProduct.astro:64/90/142`, `Accordion.astro:13/52`, `Tabs.astro:7/103`, `SocialShare.astro:123`, `Breadcrumb.astro:55/105`, `ReadingProgress.astro:23/37`, `markdown-plugins.mjs:17-52`
- Taste: grep 38 `hover:scale-105`, `shadow-2xl` 4×, indigo 1× (`courses/[course]:112`)
- Build: `bun run build:ci` — 183 products validated, Pagefind 812 pages / 105k words / 2 locales, `dist/index.html 118K`

---

## P. Validation of This Audit (claim-by-claim, re-checked 2026-11-12)

This audit was re-verified against the live tree (`src/`, `dist/` from `bun run build:ci`, `astro.config.mjs`, `PRODUCT.md`, `DESIGN.md`). Verdicts: **Legit** = true as written and safe to act on · **Caveat** = direction right, number/scope/effect overstated or conditional · **Wrong** = do not act on as written; correction below. Where this section and an earlier section disagree, this section wins.

### P.1 Legit — act on them

| Claim (section) | Evidence re-checked |
|---|---|
| 4-face stack Chivo / Source Sans 3 / Aleo / JetBrains Mono, latin, variable, metric fallbacks (B.2, C.1) | `astro.config.mjs:55-92`; `Layout.astro:155-158`; `dist/_astro/fonts/` 5 × woff2, 188 KB total. Hashed family names make the CSS-var indirection load-bearing (§B.2 is correct). |
| Type scale exact vs DESIGN: H1 clamp 32→50px, H2 24→32, H3 20→23, H4 18, body 17→19, code 13→14 (C.1) | `PostLayout.astro:189`, `global.css:385-450`. Exact. |
| Contrast: ink 17.74, reading `#4b5563` 7.56, muted `#6b7280` 4.83, subtle `#9ca3af` 2.54, blue600 5.17, blue500 3.68, blue700/blue100 5.49, dark 16.98/12.04 (D) | Re-computed with relative luminance; all reproduce. Muted passing by only 0.33 (“do not lighten”) is the most valuable line in §D. |
| Post header order Breadcrumb → H1 → lede → byline → hero → SeriesNav → prose (E.1) | `PostLayout.astro:184-299`. Order correct. |
| Rail `xl` 16rem / `2xl` 18rem, sticky `top-24`, persisted collapse; mobile FAB 44px, `inert` when closed, hides when menu open (E.2) | `PostLayout.astro:176`, `PostHeadings.astro:48,206,322-365,527-539`. Correct. |
| Table `::after` fade is dead (`opacity:0`, never shown) (E.5) | `global.css:228-239`. Correct — remove or implement, don't ship dead code. |
| Tags gray vs category blue split (E.4) | `PostLayout.astro:307` gray, `RelatedPosts.astro:72` / `PostCard.astro:55` blue. Correct; unification is safe. |
| PopularTopics tags hardcoded `["docker","astro","carrd"]` (F.3) | `PopularTopics.astro:16`, `index.astro:91`. Correct, and ES silently drops empty tags (`PopularTopics.astro:30-41`). |
| Tools are external `bitbuddies.me`, `target="_blank"` above the archive (F.4) | `Tools.astro:14-38,75`. Correct as a *placement* observation (see P.2 for the PRODUCT reading). |
| Exactly one blue→indigo gradient: courses CTA (D, F) | `courses/[course]/index.astro:112` is the only `from-blue-600 to-indigo-600`. (Two other gradients exist — `YouTubeEmbed` black fade, `ServicesHub` accent bar — neither is blue→indigo.) Claim is precise. |
| Notice title already `yellow-800`; hero mono 12.5px; PostLayout hero `eager`+`high` 1280px; SocialShare `--sm` 40px; News chips ~22-24px; header search ~36px (C.4, E.1, H, I, M) | `Notice.astro:25-26`, `Hero.astro:142`, `PostLayout.astro:264-275`, `SocialShare.astro:133-135`, `NewsLayout.astro:184-196,342-360`, `Header.astro:149-154`. All locators correct. |
| Build totals: 183 products / 2123 links, Pagefind 812 pages, `index.html` 118 KB, Layout CSS 132 KB, fonts 188 KB (B.1) | Build log + `dist/` listing. Correct at that commit; will drift — treat as dated snapshot, not constants. |
| YouTubeEmbed facade + Button colour merge are best-in-class (M.1) | `YouTubeEmbed.astro` (deferred iframe, `VideoObject`, `strict-origin-when-cross-origin`); `Button.astro:103-112` (`green/purple→blue`, `blue600`). Correct. |
| Tabs keyboard pattern (arrows/Home/End, roving tabindex, no-JS fallback) (M.1) | `Tabs.astro:115-149`, `Tab.astro:14-19`. Correct. |

### P.2 Caveat — right direction, fix the number / scope / framing before acting

| Claim | What re-checking showed | Corrected action |
|---|---|---|
| “38 × `hover:scale-105`” (A, M appendix) | **Overcounted ~3×.** Strict `hover:scale-105` = **12** hits; all `hover:scale*` (incl. `group-hover:scale-105`, `scale-[1.02]`, `scale-110`) = **16**. Still a pattern worth taming, but not 38. | Cite 12/16. Prioritise the *identical* zoom on every card image (PostCard, Related, PopularTopics, CourseCard, LatestPosts) — that's the taste issue, not the count. |
| “122 × `gray-*` hits” (D, K, O) vs “~54 in dist CSS” (A) | **Scopes were mixed.** Components-only vs whole-`src` differ by 4×: whole `src/**/*.astro` for `text-/bg-/border-gray-` alone = **509** lines. The dist-CSS counts (`gray-600 21×`…) are raw substring hits in one minified file, not rule counts — not a drift metric. | Use one reproducible scope and say which: e.g. `grep -rn "gray-" src/components src/layouts --include="*.astro"`. Migrate by component (§D order is still sensible); don't chase a headline number. |
| Mono preload wastes “~40 KB on every no-code page incl. `/go/`” (A, B.1) | Mono file is the **29 KB** woff2 (smallest of the five; 40 KB is the largest, Aleo/Source). Homepage hero *does* use mono above the fold (`Hero.astro:135,142`), so homepage preload is justified; `/go/` pages are standalone HTML **without** `Layout` (no preload at all — `src/pages/go/[product].astro`). Waste is real only on Layout pages with no code (archive, search, 404, contact, about). | Conditional preload (§B.1 diff) is still right; size the win at ~29 KB and scope it to those page types. Verify Astro's `Font` API accepts per-page `preload` before scheduling — may need layout variants instead. |
| “First `<pre>` after 1.5 viewport (mobile) → 0.7 after fix” (E.1, N.5) | **Estimate, never measured.** No device/viewport height or rendered screenshot backs it; it varies with title length (1-3 lines), lede presence, and whether the post even has an early code block (reviews/comparisons may not). | Keep as design intent (“surface the first command earlier”), validate with one real device pass (360×740 + 390×844, one code-first guide + one review) before quoting viewport numbers. |
| Aleo “pale / bump ink to `#374151` (10.31)” (A, C.3) | Contrast is **AAA either way** (7.56 → 10.31); “pale” is an optical judgement next to black code, not a WCAG failure. Darkening is safe but purely taste; it also changes every article's feel and needs a DESIGN.md update (`~7.5:1` → `~10:1`). | Optional P2 polish, not P0. A/B on one long guide; don't present as accessibility fix. |
| H3 bump 20→22 / 23→25px for hierarchy (C.1) | Delta math is right (4px min is subtle), but this **changes the spec** — DESIGN H3 20→23 is deliberate (guide H3s are frequent; larger H3 eats the measure). | Only if heading-scan testing shows confusion. Cheaper first step: weight/colour delta (H3 650 already; consider `text` ink vs H2) without size change. |
| Header search “hidden until `xl`” hurts tablets (E.2, F.6) | True (`Header.astro:77` `hidden xl:flex`), but at `lg` the bar already carries 7 items + dropdowns; adding search at 1024px re-creates the crowding §F.6 complains about at 1280px. | Add a search *icon* (44px) at `lg`, keep full nav at `xl`. Measure at 1024/1280 before committing. |
| “Quick-answer Notice adds 0 KB, highest trust lift” (N.1, O #2) | **Not free and not automatic.** There is no frontmatter/body source for “the result” — most posts would need a hand-written per-post answer; reviews/comparisons have no terminal result (`200 OK` is meaningless there). A layout-auto box would either be empty or fabricated. Cost is editorial (400+ posts), not bytes. | Make it an **opt-in MDX pattern** for install/config guides only (author writes `<Notice type="success" title="Result">` + 2-line output), add to AGENTS widget guidance with a density limit. Do not build layout magic. |
| AmazonProduct “3 links = PRODUCT #5 violation; ribbon → chip; nested card” (E.7, M.1) | Three links to the *same* destination are one action repeated (image/title/CTA is a standard product-card pattern), not three competing CTAs — PRODUCT #5 is about *competing* next steps. Ribbon→chip and shadow reduction are taste calls against DESIGN's “promotional cards use the same card language” (`DESIGN.md:226`); the yellow considerations block is a `Notice`-like inset, only arguably “cards-in-cards”. | Keep 1 *primary* CTA styling (make image/title plain links, CTA the only button) rather than deleting links. Get an explicit DESIGN decision before de-ribboning — affiliate pattern recognition helps conversion (PRODUCT belief ladder #3). Mobile height fixes (image, `<details>`) are uncontroversial. |
| Tools/YouTube “violate stay-on-site fallback” (F.4) | PRODUCT fallback is “browse related guides and stay on-site” for a *post* page's next step; homepage Tools/YouTube are below Latest+Topics with own-content first (`index.astro:96` comment: “demoted below own content”). Placement critique (identical shells, external above archive band) stands; “violation” overstates. | Demote/merge on visual-hierarchy grounds, not compliance grounds. |
| ServicesPromo “delete card, biggest P1 win; saves ~120px” (E.3, M.1, N.3) | Height saving is plausible but unmeasured, and the card is the services business's only in-article surface (PRODUCT: real client work is proof). Deleting vs demoting is a business trade-off, not a pure design fix. | Test reorder-first (Related above promo, §N.3) before deleting; keep the card if services leads matter. Don't delete on design grounds alone. |
| ListCheck `blue500` circle “3.68 FAIL” (M.1) | That ratio is the **text** floor (4.5). A white check glyph on a coloured disc is a graphical object (WCAG 1.4.11, **3:1**) — **3.68 passes**. Dark variant already uses `blue600` (`ListCheck.astro:63`). | Change to `blue600` for consistency/polish if you like; do not log as AA failure. Same lens applies to other icon discs. |
| ReadingProgress “move into header bottom edge” (N.4) | Current bar `fixed top-0 h-1 z-50` over the sticky header is visible the whole scroll (header is sticky, bar sits above it) — “out of view after 200px” (earlier draft) was wrong; the consolidated text already softens this. Header-embedding is a nicety with sticky/z-index fiddliness. | Low priority. Only move if visual QA shows the overlay fighting the header blur. |

### P.3 Wrong — correct before anyone implements

| Claim | Correction |
|---|---|
| Code-header `#9ca3af` on `#1f2428` = **4.48 FAIL** (C.4, D, K #7, O #7) | Re-computed: **`#9ca3af` on `#1f2428` = 6.17 — passes AA.** (On `#24292e` block bg it's ~5.9.) The 4.48 figure used a wrong pairing. Header text does *not* need `#d1d5db` for compliance; changing it is optional polish. Remove from P0. Source: `global.css:345-360`. |
| Notice warning `yellow-700` on `yellow-50` ≈ **4.2 FAIL** (D-adjacent, M.1, K #2) | Tailwind `yellow-700 #a16207` on `yellow-50 #fefce8` = **4.76 — passes AA** (title `yellow-800 #854d0e` = 6.62). `amber-800 #92400e` 6.37 is a different palette's number. Warning is tight-but-passing in light mode; check dark (`yellow-200` on `yellow-900/30`) separately instead. Downgrade from P0 “fix AA” to P2 consistency. Source: `Notice.astro:23-26`. |
| Hero mono 12.5px “below 13px floor” as if an accessibility floor (C.4) | 13px is DESIGN's *code-block* size, not a WCAG minimum. 12.5px mono in a decorative (`aria-hidden`) terminal is a readability nit on 360px screens (horizontal scroll), not a failure. Keep the bump-to-13px as polish; don't cite a floor that doesn't exist. |
| “Mint/mono” typo + “5 preloads = 4 faces + Aleo italic split” framing (A) | It's **JetBrains Mono**, and 5 files = 4 families where Aleo ships normal+italic as separate woff2 — expected Astro Fonts behaviour, not an anomaly. Total 188 KB for 4 variable families (latin) is lean; the issue is *where* mono preloads, not the count. |
| PostCard “`border` violates DESIGN no-border” as a hard violation (F.2) | DESIGN card spec (`DESIGN.md:219-225`) says “Border: none; separation from shadow + tonal steps” — but the shipped card system site-wide (PostCard, YouTube, Tools, CourseCard, archive band) uniformly uses `border + shadow-sm`. Either DESIGN is aspirational or the implementation drifted *as a system*. It's a system-level decision (pick shadow-only *or* border+shadow everywhere), not a PostCard bug. Don't “fix” one card. |
| Header Advertise “should be blue→indigo gradient pill per DESIGN:236” (F.6) | DESIGN says the nav highlight/hero CTA *is* that gradient, but the live header intentionally uses a quiet ring (`Header.astro:117`) and the hero CTA is solid `blue600` — the gradient survives only on courses. The audit can't simultaneously recommend deleting the courses gradient (§D) and adding it to the header. **Pick one story: solid blue600 everywhere (recommended in §D) — then Advertise ring is fine and DESIGN.md should be updated, not the header.** |
| Duplicated `gray-200 19×` row (D table text) | Typo — one of the two rows should be the `gray-100`/other count. Harmless but fix the table; see P.2 on why dist substring counts shouldn't be quoted at all. |

### P.4 Net assessment

The core of the audit is **legit and safe for this site**: keep Terminal Blue/Chivo/Aleo, surface code earlier, unify chips, fix the dead table fade, tame identical card zoom, conditional mono preload (scoped), semantic-token migration (by component, unnumbered). The P0 list survives validation after removing two contrast “failures” that actually pass (code header, Notice warning) and demoting three editorial/business items masquerading as pure design fixes (Quick-answer auto-box, ServicesPromo deletion, Amazon link count). Nothing in the audit requires a redesign, a new font, or a new colour — that restraint is correct for a 400+-guide EN+ES production site where consistency beats novelty. Do **not** implement §L diffs verbatim without the P.2/P.3 corrections (especially L.1's header colour, and any diff that hardcodes a person's name — see Q.8).

---

## Q. What Was Missing (additions)

The audit covered homepage + post + News + widgets well. These surfaces/systems were absent or one-line; each item names the file to check so it can be scoped without re-auditing everything.

### Q.1 Brand & social surfaces (not audited)
- **Logo/wordmark:** `bitdoze_logo_better.svg` (`Header.astro:65`, `Footer.astro:45`) — no guidance on clearspace, min size, or dark-mode lockup. Header hover `scale-105` noted (§F.6) but footer/logo system not.
- **OG/social image:** per-post `getImage 1200px jpeg` (`PostLayout.astro:149`) vs `siteConfig.defaultImage "/og-default.png"` (`site.ts:25`) — no review of the default card, lesson `maxresdefault` images (courses), or `og:image:alt = seoTitle` (`SEO.astro:268`, duplicates title for screen readers).
- **Favicon set:** `favicon.svg/png/ico` (`Layout.astro:147-148`) — unreviewed.

### Q.2 Information architecture beyond the header bar
- **Archive surfaces:** `PostArchiveView`, `TaxonomyIndexView`, `SeriesIndexView`, `AuthorBioCard` (`src/components/views/`) power `/blog/`, `/categories/`, `/tags/`, `/authors/`, `/series/` — only PostCard was audited. Pagination (`Pagination.astro`, 5-page window + ellipsis) gets one hover-colour line (§O #22); its keyboard/aria (`aria-label` prev/next) and `noindex` on `/page/` (`SEO.astro`) are design-relevant and unreviewed.
- **Menu taxonomy:** `menu.json` (7 items, `Pages`/`Tools` dropdowns hiding 13 children, `locales:["en"]` gating) — crowding noted (§F.6) but not whether “Pages” as a label means anything to a search-arriving reader, or that Courses/Self-Hosted vanish in ES.
- **Footer as system:** 3-col footer (logo/social, quick links, latest 3) duplicates header + Browse band (§F.5 noted duplication) — missing: footer should carry what the header can't (News, Courses EN-only, RSS, `llms.txt`), plus the affiliate disclosure already there.

### Q.3 Courses, Services, Advertise, Resources, Self-Hosted (Persuade surfaces)
Only the courses indigo gradient was mentioned. Unreviewed: `CourseCard` (`shadow` arbitrary values, `hover:scale-[1.02]`), `CourseSidebar` (mobile slide-over `w-[86vw] shadow-2xl` vs desktop sticky), lesson player (Prev/Next, `data-watched` progress in `global.css:513-529`), services hub/detail (blue/gray section banding, `rounded-xl` cards), `/advertise/` pricing cards (selected = solid `blue600` + `backdrop-blur-xs` badge), `/resources/` (`ResourceCard`), and the `/self-hosted/` landing (its own terminal + sticky subnav `backdrop-blur-md`). These are the revenue surfaces — they deserve the same ledger as the blog before any “delete the promo” decision.

### Q.4 Search as an experience (not just a11y)
`search.astro` themes Pagefind Default UI; the build warns Default UI is legacy and Component UI (modal, better a11y) exists. Unreviewed: search entry points (header icon-only until `xl`, no homepage input), `?q=` deep-linking (`search.astro` + SearchAction JSON-LD), empty/building states (“Search index is being built”), `showImages` thumbnails (byline `data-pagefind-ignore` interaction), and ES filter behaviour. §O #18 (input in Browse band) is right but needs this context.

### Q.5 Performance beyond fonts
- **LCP:** on posts the LCP is the hero image (hence `eager` is *defensible* there — §E.1's lazy recommendation must be tested, not assumed; lazying the LCP image can *hurt*). On the homepage LCP is H1 text/terminal (fonts matter more than images). No INP/CLS discussion: images do carry dimensions/`aspect-video` (good), view transitions are 180ms native (`global.css:11-19`), Pagefind JS is deferred.
- **Images:** responsive `widths [480,768,1024,1280] webp q80` (`PostLayout.astro:273-275`) — unreviewed: SVG covers workflow (AGENTS: WebP conversion), legacy JPEGs in `src/assets/images/23/…`, and `dist` 485 MB is a *build* artefact (CDN serves per-page), not a page-weight number — §B.1 should say so explicitly.
- **Caching/ delivery:** Cloudflare `_redirects`, font `crossorigin` preloads, and Plausible (`an3.bitdoze.com`) are invisible to this audit by design — flag as out-of-scope rather than implying full perf coverage.

### Q.6 SEO & distribution design
`SEO.astro` (316 lines: canonical, OG/Twitter, `@graph` Organization/WebSite/Article, breadcrumbs JSON-LD, `article:tag`, `/md/*.md` alternate) was only touched via breadcrumbs. Missing: meta-title vs H1 (`meta_title`), `noindex` rules (tags/search/pagination `noindex,follow`), sitemaps (`sitemap-en/es.xml.ts`, `video-sitemap.xml`), RSS (`/rss.xml`, `/news/rss.xml`) visual discovery, and the `/go/` interstitial itself (real retailer name, Plausible `affiliate_click`, ~400ms `location.replace`, meta-refresh fallback — a designed page, `src/pages/go/[product].astro`).

### Q.7 Trust, freshness & monetization compliance
- **Freshness signals:** `lastmod` “Updated” badge (`PostLayout.astro:229-243`) is the strongest trust device after the code block — unreviewed as a pattern (when to show, “Published” prefix logic).
- **Disclosure placement:** footer affiliate line + `AmazonProduct` disclosure + `Notice` above first affiliate link (AGENTS) — duplication/consistency unreviewed. `rel="sponsored noopener"` handling in `Button.astro:44-47` and Amazon links is correct and should be recorded as “keep”.
- **Author proof:** avatar/bio/social `sameAs` (PostLayout SEO author) vs the compact-author proposal — E-E-A-T value of the full box was not weighed against the 120px saving.

### Q.8 Content-authoring & MDX system
Widgets were audited as components, not as an *authoring system*: AGENTS caps widget density (“don't use too much”), requires exactly one category + 1-3 tags (Zod in `content.config.ts`), SVG→WebP covers. Missing: when to use `Notice` vs `Accordion` vs `Tabs`, step/prerequisite conventions across 804 MD/MDX posts, and that several §L/§N diffs hardcode “Dragos Balota / 10+ yrs” — must stay data-driven from the authors collection (multi-author + ES), never literal. The Quick-answer pattern (P.2) belongs here as opt-in author guidance.

### Q.9 States, errors & edge surfaces
YouTube fetch failure/empty (`YouTubeVideos.astro:63-72`, red text on white — contrast/design unreviewed), search building state, archive `emptyText`, `404.astro` (card + 3 actions — actually good, unreviewed), contact form (formsubmit action, input styles `contact.astro:11`), course “Watched” states, TOC empty-headings case. A design audit for a production blog needs an empty/error/loading row per component; M.1 has none.

### Q.10 Accessibility & modes beyond contrast/touch
Present: focus ring, skip link (`Layout.astro:332`), heading-order nit, motion. Missing: landmarks (`header/nav/main/footer` + `aria-label`s), link-purpose (card “View all →” patterns), 200%/400% zoom reflow (rail `16rem` + `45rem` at 400%?), forced-colors mode, print (guides *are* printed/PDF'd — no `@media print` exists; code blocks + dark backgrounds would waste ink), reduced-data (`Save-Data`), and keyboard order of FAB vs mobile menu vs lightbox `<dialog>` (`PostLayout.astro:498`). Dark-mode *images* (bright screenshots on `#111827`) also unreviewed.

### Q.11 Spanish as a designed locale (not just “latin subset”)
§J covers glyphs/length. Missing: ES menu/footer completeness (Courses/Self-Hosted EN-only by design — is the ES homepage's Browse band thinner?), ES date/reading-time formatting (`formatDate(locale)`), ES search (`pagefind` es index, 2 filters), ES News absence (digest EN-only), and translated widget strings (`Tabs` fallback, copy-button “Copiar/Copiado” in `PostLayout` script). Length risk is real for `line-clamp` cards — needs one rendered ES archive screenshot, not just structural reasoning.

### Q.12 Governance: keeping DESIGN.md true
The audit repeatedly finds DESIGN↔code drift (preload, buttons `blue500` vs `blue600`, borders, gradient) but proposes only point fixes. Missing: a drift process — single token source (`global.css @theme` vs DESIGN YAML), a pre-build check (e.g. grep for `gray-` in new components), no-tests reality (`package.json` has no test script — visual changes are verified by `bun run build:ci` + eyeballing), and who updates DESIGN.md when code wins (it should have been updated for `blue600` already). Without this, §K will re-drift within a year.

---

*Keep Terminal Blue the only voice, Chivo the editorial voice, and `code` the hero. Everything else is conserving the reader’s next command.*
