# Bitdoze improvements: full-site review

Date: 2026-11-12. Reviewer: Droid (Opus 5.5).
Repo: `/home/dragos/projects/bitdoze.com` at `6721e85`, plus 34 uncommitted modified files.

## What this covers and how it was checked

Five reviews ran in parallel: SEO and indexation, performance and delivery, design/UX/accessibility, content and monetization, and code/build/CI/security. I then spot-checked the highest-stakes claims myself against the source, `dist/` and the live site. Every P0 below was reproduced.

- `dist/` was built 2026-11-12 09:44 from the working tree (2,167 HTML files), so it includes the uncommitted changes. Production does not have them yet.
- Lab performance: local Lighthouse 13.6 (simulated mobile, 4x CPU slowdown, slow 4G, Plausible blocked), plus Playwright with CDP throttling against both live and local.
- Accessibility: axe-core on 14 pages in light and dark mode, desktop and mobile, plus manual keyboard checks.
- Content: scripts over all 804 MDX files and the git history.
- Traffic and revenue priorities come from `amazon-affiliate-opus-plan2027.md` §2 (Plausible Sep 21 to Oct 22, GSC 90 days). No traffic number in this file is invented; each one cites that doc.
- Not measured: real-user Core Web Vitals (the PageSpeed Insights API returned HTTP 429 to anonymous requests, so use the GSC Core Web Vitals report), backlinks, build time, and the Cloudflare plan tier.

`design-improve.md` (also written today) is the deep design ledger. This file does not repeat it. §13 lists where the measurements here correct it.

**Severity:**
- **P0:** live breakage, a regression about to ship, or a compliance risk.
- **P1:** a clear gain in traffic, revenue, speed or trust.
- **P2:** polish.

**Effort:**
- **S:** under 2 hours.
- **M:** half a day to 2 days.
- **L:** more than that.

---

## Implementation status (updated 2026-11-12, end of session)

Everything code-feasible is implemented and verified: `bun run check` 0/0/0, `eslint` clean, `prettier` clean, `bun run build:ci` green (2,132 pages; validators: 182 affiliate products, 2,123 rendered links, 10 news digests, 758 canonicals; 33 redirects + 9 expired-digest rules; Pagefind 813 pages). What remains needs a decision or editorial work, listed at the bottom.

### Done

- **§2 all P0s** — ES slug collisions + build guard; covers back to `eager`/`fetchpriority="high"`; empty YouTube block hidden + fallback seeded; affiliate disclosure normalized above first `/go/` link (48 posts) + permanent validator; services CTA rewritten EN+ES; CI green on Bun; Pagefind dark-mode contrast fixed. §2.8 regressions fixed (PostCard headingLevel + compact meta, Notice titles as `<p>` + warning-code contrast, ReadingProgress opt-in, scrollable news chips).
- **§3 performance** — Pages Function deleted (agent-discovery headers → static `_headers`); extension-wide cache rules removed; Shiki redundant-token stripping fixed via `<pre>` default fg + comment colour `#9ca3af`; fonts page-scoped; YT thumbnails self-hosted via `getImage` (eager on lessons); TOC reflow loop removed; homepage card preloads de-prioritized; OG image single 1200px JPEG; avatars via Astro assets; Amazon icons sprited; speculation-rules prefetch; favicon 37KB→5.4KB.
- **§4 SEO** — broken ES slugs + redirect-stub links fixed; 11 EN→ES body links removed; `terms`/`privacy`/taxonomy hreflang; explicit translation key; `/self-hosted/` in sitemap; tag chips only ≥3 posts; expired-digest auto-301s; **§4.1 date restore done** (`restore-post-dates.mjs`: 78 EN + 26 ES restored from git, 141 import-era skipped); stale "2025" titles, truncated `meta_title`s and the untranslated ES title fixed; canonical-typo build guard added (caught + fixed a real `tu-post-slug` placeholder).
- **§4.5 `/md/` endpoint** — news `/md/news/<date>.md` links fixed; raw MDX leak stripped; stale `public/md/home.md` replaced by a generated route; feed polish (`<language>`, `lastBuildDate`, `atom:link`).
- **§5 design (all but §5.4)** — mobile hero compressed (terminal hidden <lg, description/proof <sm, mobile search field); topic-led nav (Self-Hosting/AI/Linux/Hardware/News/Courses + More) + 44px mobile search icon; "Start here" row on both homepages; featured lead card + category start-here picks on archives; `testedOn`/`timeToComplete`/`quickAnswer` schema + meta line + 9 seeded guides; digest "From the guides" strip; DidThisWork Yes/No Plausible widget + FollowBox (RSS/News RSS/YouTube); `/how-i-test/` page linked from AmazonProduct + footer; "Picks Tested"→"Picks Compared" retitle (portainer-alternatives kept — genuinely re-tested); tables wrapped in keyboard-scrollable `.table-scroll` with mask only on overflow; ````title="file"```` code filenames; dark-mode product frames; 404 search pre-filled from dead URL; print CSS; terminal comment contrast.
- **§6.2** — RSS links in footer; feed polish above.
- **§7.3** — `uptime-kuma-tool` (+ES twin) merged into `install-uptime-kuma` with 301s and internal links repointed.
- **§7.6** — schema now *fails* on >3 tags; 73 files trimmed; `restructure-taxonomy.mjs --tags-only` applied (35 files, tags 432→411, categories untouched).
- **§7.7** — news pruned to newest 10; `scripts/expired-news.json` manifest preserves 301s for pruned dates; AGENTS.md documents the workflow.
- **§8.3** — `rel="sponsored nofollow"` hast plugin covers markdown `/go/` + `go.bitdoze.com` links (verified in dist).
- **§8.5** — `gmktec-n150` consolidated to `beelink-mini-s13` with `/go/` redirect.
- **§9 quick fixes** — task-list checkboxes get `aria-label` via hast plugin; code-comment contrast; notice/heading fixes.
- **§10** — news MDX validator (`validate-news.mjs`: rejects import/export/script/`{}`/`javascript:` — already caught a real violation); contact honeypot fixed (`_honey` + `_next` thank-you); dep bumps (`sharp`, `undici`, `astro` 7.4.x, `@astrojs/mdx`); canonical-typo guard; `byDateDesc` dedup; `sync-redirects.mjs` entry-check fix; gitignore sandbox dirs; planning docs moved to `docs/`; unused `ServicesPromo.astro` removed; **EN/ES page-pair dedup** — search/contact/resources/advertise/index collapsed into shared `*View.astro` components (URLs and copy verified identical in dist).
- **§15 partial** — 63 orphan images deleted (9.5MB) after full-reference scan; doc drift partly fixed.
- **§5.9** — About bio rewritten (AI filler + "bussiness" typo removed).

### Still to do — needs your decision first

- **Newsletter provider** — FollowBox is built without email capture; pick EmailOctopus/MailerLite/listmonk, then add the subscribe input + Plausible event.
- **Amazon price/rating compliance (§8.2)** — 170 hardcoded ratings + 109 prices + 248 hotlinked images risk the Associates agreement. Drop stars/prices or fetch via build-time API.
- **AI-citation policy (§4.5)** — `ai-input=no` robots vs the `llms.txt` + `/md/` investment; pick a stance.
- **§5.4 cover system** — allow photo covers for `gadgets`/buying guides: AGENTS.md rule change + `svg-to-webp.mjs` update + re-cover top ~20 pages.
- **Geo-routing `/go/` (§6.4)** — 65% of clickers are non-US; affiliate catalog normalization.
- **`ads.txt` (§8.7)** — 1,205 lines authorizing resellers with no ad script live; delete or decide intentionally.
- **`docs/to-do-emdash.md`** — verify the surviving copy is the right version.

### Still to do — editorial / content (code won't do it safely)

- **§7.4 house style** — ~5,000 em dashes, ~160 AI-vocab files, ~800 emoji across EN+ES; review estimates ~33 traffic-batched passes. News digests *require* `—` in `**Title** —` format — exclude `src/content/news/`.
- **§7.5 Spanish** — 2 missing posts, 11 stale translations, unaccented-word cleanup (worst: `guia-configuracion-openfang`), rerun `build-translation-index.mjs`.
- **§7.2 thin posts** — expand 12 flagged posts.
- **§7.3 remaining merges** — fish-shell, tinyfish, cloudpanel-varnish, tb5-docks pairs (needs GSC validation first).
- **§6.3 topic hubs** — `/self-hosted/`-style route maps for Dokploy, Astro, Carrd, Fish shell, homelab hardware.
- **§8.4 revenue retrofits** — AI cluster (103 posts, 7 linked), `portainer-alternatives`/`opencode-vs-pi-agent`, contextual services CTAs by topic.
- **§8.6** — digest-specific "From the guides" links (generic strip shipped); courses `relatedPosts` backlink check; truncated EmDash playlist URL.
- **§4.4/§4.5 leftovers** — Person entity `sameAs`/`jobTitle`; org logo 512px PNG; per-category OG images; IndexNow; news `/md/` `<link>` decision tied to AI policy.
- **§10 leftovers** — CSP Report-Only → enforcement path (needs report endpoint + 2 weeks data); `access-control-allow-origin: *` on HTML; HSTS preload check; `fix-redirect-html.mjs` hardcoded `lang="en"` on ES stubs; CI cache decision.
- **§9 leftovers** — axe re-audit (desktop/mobile × light/dark × 400% zoom); lesson Prev/Next contrast; nav `aria-label`s; TOC thumbnail `alt=""`; lightbox aria-label i18n; mobile table column reduction (content decisions).
- **§15 leftovers** — source-image compression; README/DESIGN.md drift sweep.
- **Verification** — GSC data for merge candidates; Plausible `guide_feedback` review after ~1 month; real-user CWV from GSC.

---

## 1. Top 20, in order

| # | Sev | Change | Why | Effort | Where |
|---|---|---|---|---|---|
| 1 | P0 | Remove `slug:` from 3 Spanish posts and add a build guard | Two English guides return 404 live; Spanish posts leak into the English sitemap | S | §2.1 |
| 2 | P0 | Revert the post cover to `eager` + `fetchpriority="high"` before deploying | The uncommitted change lazy-loads the LCP image on all 802 posts | S | §2.2 |
| 3 | P0 | Hide the empty YouTube block and seed its fallback | The live homepage shows "No videos found." | S | §2.3 |
| 4 | P0 | Put the affiliate disclosure above the first affiliate link | 48 posts break the rule, including the #1 traffic page | M | §2.4 |
| 5 | P0 | Rewrite the services CTA copy | `/services/` tells visitors its contact links are placeholders | S | §2.5 |
| 6 | P0 | Make CI pass (Prettier, bun, action versions) | 94 of the last 100 CI runs failed; the weekly link check has never passed | S | §2.6 |
| 7 | P0 | Fix dark-mode search | Result text is 1.53:1 on dark | S | §2.7 |
| 8 | P1 | Stop running a Pages Function on every HTML request | Quota and outage risk at scale | S-M | §3.1 |
| 9 | P1 | Restore the original `date` from git, refreshes go in `lastmod` | 117 posts show the wrong publish date in schema, RSS and meta | M | §4.1 |
| 10 | P1 | Check Amazon policy exposure: hardcoded stars, prices and hotlinked images | 170 ratings, 109 boxes with prices, 248 hotlinked images | M | §8.2 |
| 11 | P1 | Add email capture (no popups) and surface RSS | There is no way to bring a reader back today | M | §6.1 |
| 12 | P1 | Fix the Shiki default-colour stripping bug | 3,150 redundant spans on one post; TBT 650-1,000 ms on code posts | S | §3.2 |
| 13 | P1 | Fix the duplicate `Cache-Control` on hashed assets | Fonts and images send two conflicting lifetimes | S | §3.6 |
| 14 | P1 | Fix stale years and truncated titles; plan the Jan 1 cliff | 22 files show 2024/2025; 153 English titles say 2026 | S-M | §4.2 |
| 15 | P1 | Add `rel="sponsored"` to every affiliate and referral link (one rehype plugin) | 2,219 `go.bitdoze.com` links and 1,202 inline `/go/` links lack it | S | §8.3 |
| 16 | P1 | Monetize the AI cluster and `portainer-alternatives` | 103 AI posts, 7 with any affiliate link; Portainer page at 0.3% | M | §8.4 |
| 17 | P1 | Topic-led navigation, "Start here" row, topic hubs | The menu hides categories and `/self-hosted/` under "Pages" | M | §5.2, §6.3 |
| 18 | P1 | Use `quickAnswer` and add a "Tested on" line on top install guides | The field shipped and has 0 uses | M | §5.5 |
| 19 | P1 | Merge cannibalising pairs | Uptime Kuma, fish shell, TinyFish, CloudPanel Varnish | M | §7.3 |
| 20 | P1 | Accessibility quick fixes: code comment contrast, labels, headings | 456 contrast nodes; code comments are 3.04:1 | S | §9 |

---

## 2. Fix now: live breakage and regressions

### 2.1 Two English guides are 404 live (P0, S)

**Cause.** Three Spanish files set a `slug:` without the `es/` prefix:
- `src/content/posts/es/ssh-proxyjump-jumphost.mdx:12`
- `src/content/posts/es/groq-api-mistral-streamlit.mdx:13`
- `src/content/posts/es/excluir-directorios-archivos-copiar-remoto.mdx:8`

The glob loader uses `slug` as the entry ID. Two of them collide with the English files, and the Spanish entry wins. The slugs came in with `1e9b423` on 2026-10-29.

**Verified live:**
- `/ssh-proxyjump-jumphost/` returns 404.
- `/groq-api-mistral-streamlit/` returns 404.
- `/es/ssh-proxyjump-jumphost/` returns 200.
- Both English posts have about 4 inbound internal links each.

**Knock-on effects.** `isPostIdInLocale` (`src/utils/i18n.ts:22-25`) decides the locale from the entry ID, while `getPostLocale` decides it from the canonical. So:
- All 3 Spanish posts are listed in `sitemap-en.xml` and are missing from `sitemap-es.xml`.
- They appear on 21 English archive pages.
- 5 Spanish tag pages are never built, so their links 404.
- Spanish pagination counts drift, and the language switcher links to `/es/blog/page/41/` and similar pages that don't exist.

**Fix:**
1. Delete the `slug:` line in the 3 Spanish files. `canonical:` already sets the URL.
2. Make `isPostIdInLocale` and `getPostLocale` share one source of truth (the file path).
3. Fail the build when entries go missing or the locale disagrees, in `src/pages/[...slug].astro` `getStaticPaths`:

```ts
const files = Object.keys(import.meta.glob("/src/content/posts/**/*.{md,mdx}"));
if (files.length !== allPostsIncludingDrafts.length) throw new Error("posts lost entries (slug collision?)");
for (const p of posts) {
  if ((getPostLocale(p) === "es") !== p.id.startsWith("es/")) throw new Error(`locale mismatch: ${p.id}`);
}
```

The 12 English files whose `slug:` equals the filename are harmless. Removing them prevents a repeat.

### 2.2 The post cover is now lazy-loaded, and it is the LCP image (P0, S, not deployed yet)

**Change.** The uncommitted diff to `src/layouts/PostLayout.astro:266-267` swaps `loading="eager" fetchpriority="high"` for `lazy`/`auto`. The cover is the LCP element on every post measured. Lighthouse's `lcp-discovery` audit fails on all of them.

**A/B on `/astro-i18n-localization/`:** reverting improves LCP by about 220 ms in the simulation and 130 to 480 ms under DevTools throttling, and run-to-run variance drops.

**Fix.** Put `eager` and `high` back. If the goal was to get prose above the fold, cap the cover height instead (`max-h-[320px]` on desktop) and keep it eager. `design-improve.md` §E.1 recommended lazy, and its own §Q.5 warned against it; §Q.5 was right.

### 2.3 The live homepage shows "No videos found." (P0, S)

**Cause.** The YouTube RSS fetch fails at build, and `src/utils/server/youtube-fallback.json` is `[]`. The empty state ships in `dist/index.html` and `dist/es/index.html`, and it is live in production today.

**Fix:**
- In `YouTubeVideos.astro:63-72`, render nothing when `videos.length === 0`.
- Fill the fallback JSON with the last 6 videos. `src/data/youtube-meta.json` already has 443 entries.
- Optionally, fail loudly in CI when both the fetch and the fallback are empty.

### 2.4 Affiliate disclosure is missing or comes after the first link (P0, M)

AGENTS.md requires the disclosure Notice above the first affiliate link.

**Counts:**
- 28 posts (14 EN, 14 ES) have `/go/` links and no in-article disclosure. All of them came from inline GMKtec M5 Ultra links. Examples: `setup-nfs-linux`, `why-need-home-server`, `rustfs-self-host`, `outline-install`, `searxng-self-host-privacy-search`.
- 20 more posts put a `/go/` link above the disclosure. These include:
  - `docker-containers-home-server`: first `/go/` link at line 66, disclosure at line 71. Verified. This is the biggest affiliate page (3,423 visitors and 127 clickers per plan §2.1).
  - `best-mini-pc-proxmox`: link in the first sentence (line 20), disclosure at line 22.
  - `best-mini-pc-local-llm` and `best-2-5-10gbe-switch-homelab`.
- The design review's grep produced a 30-of-62 candidate list in `/tmp/design-audit/disclosure.txt`. Use it as a cross-check.

**Fix:**
- Move or add the Notice in those posts.
- Add a check to `scripts/validate-affiliate-links.mjs`: for every built post that contains `/go/` or `go.bitdoze.com`, the disclosure element must come before the first such link. Without the check, this will regress with every new article.

### 2.5 The services page says it isn't ready (P0, S)

- `src/config/services.ts:99` renders on `/services/`: "The contact links are placeholders for now, but the service structure is ready."
- The Spanish line at `:100` also lacks accents ("Necesitas", "esta lista", "alli").
- It is the only in-site path to client work, and PRODUCT.md lists client work as proof.

**Fix.** Rewrite both lines with a real next step: the contact page, or a booking link if you have one.

### 2.6 CI is red and cannot pass as configured (P0, S)

- **History:** 94 of the last 100 CI runs failed. Link Check failed 6 of 6. The last green run was around 2026-07-19.
- **First blocker:** `format:check`, with 13 files at HEAD (21 in the working tree).
- **Second blocker:** `build:ci` calls `bun run build`, but neither workflow installs bun. The Link Check build step exits with code 127.
- **Working tree status:**
  - `astro check` has 4 errors:
    - `AmazonProduct.astro:344-345`: `details.open` on `Element`.
    - `YouTubeVideos.astro:90,92`: `video.duration` is not on `RawVideo`.
  - `lint` has 2 errors: a label-association false positive at `index.astro:111` and `es/index.astro:111`.
  - At HEAD, `check` and `lint` pass.

**Fix:**
1. Add `oven-sh/setup-bun@v2` to both workflows, or make `build:ci` call `npm run build`.
2. Run `prettier --write` on the flagged files. Add `translations/` and `.devin/` to `.prettierignore`.
3. Use `querySelector<HTMLDetailsElement>`.
4. Add `duration?: string` to `RawVideo`, or delete the badge (see §2.8).
5. Nest the homepage search `<input>` inside its `<label>`.
6. Bump `actions/checkout` and `actions/setup-node` to v5.

Once CI is green, the weekly lychee job becomes the broken-link alarm that would have caught §2.1.

### 2.7 Dark-mode search is unreadable (P0, S)

- Result titles, labels and messages render `#393939` on `#111827`, which is 1.53:1 (43 nodes).
- `src/pages/search.astro:33-49` sets the Pagefind variables on `:root` and `.dark`. `pagefind-ui.css` re-declares them on `.pagefind-ui`, so its values win.
- Also, the highlight shows in default yellow and the results don't use Source Sans.

**Fix.** Change the selectors to `.pagefind-ui` and `.dark .pagefind-ui`. Set the highlight to the blue-100 tint and set `--pagefind-ui-font` explicitly.

### 2.8 Smaller regressions in the uncommitted design work

| Sev | Regression | Fix | Effort |
|---|---|---|---|
| P1 | Archive pages go from H1 straight to card H3 (axe `heading-order` on `/blog/`, categories, search) | `headingLevel` prop on `PostCard`; h2 on archive views | S |
| P1 | The 11px mono card meta ("NOVEMBER 12, 2026 · 19 MIN READ · DRAG...") wraps onto 3 lines in 3-column grids and cuts the author | Short date ("Nov 12, 2026"), drop the author on cards, `whitespace-nowrap` | S |
| P1 | The author bio is `line-clamp-2` and cut mid-sentence; the "More guides from" link was dropped | Show the full bio and restore the link | S |
| P1 | Digest chips at `min-height: 44px` stack into a block about 230px tall on mobile | 32px chips with 8px gaps (meets WCAG 2.5.8), one horizontal-scroll row | S |
| P2 | Spanish homepage tag icon has a broken SVG path (`l7 7 0 010 2.828`, missing `a2 2`) | Copy the path from `src/pages/index.astro` | S |
| P2 | The YouTube duration badge is dead code (`RawVideo` has no `duration`), and it would overlap the play button | Add the field and move the play button, or delete `YouTubeVideos.astro:90-94` | S |
| P2 | The table `th { position: sticky }` never sticks (the table is its own scroll container); the right-edge mask fades tables that don't overflow; the mask clips the table shadow | Rehype wrapper div (see §5.10) | M |
| P2 | Inline code inside a warning Notice is 4.17:1 | `#854d0e` text for code in warning Notices (`Notice.astro`) | S |
| P2 | `ReadingProgress` now renders on every page and binds to the first `<article>` (a card on the homepage) | Render it only from `PostLayout` and `NewsLayout` | S |

---

## 3. Performance

### Measured baseline

Local Lighthouse 13.6, simulated mobile (412x823, 150 ms RTT, 1.47 Mbps, 4x CPU), served from `dist/` with brotli, Plausible blocked.

| Page | HTML (brotli) | LCP element | LCP (ms) | TBT (ms) | CLS | Score |
|---|---|---|---|---|---|---|
| `/` | 16.4 KB | hero `<p>` | 911 | 9 | 0 | 100 |
| `/blog/` | 13.0 KB | first card image | 2,932 | 0 | 0 | 95 |
| `/astro-i18n-localization/` (code-heavy) | 55.6 KB | cover (lazy) | 2,781 | 657 | 0 | 79 |
| `/best-mini-pc-home-server/` | 44.0 KB | cover (lazy) | 3,241 | 234 | 0 | 89 |
| `/best-tech-gadgets-2027/` | 38.2 KB | cover (lazy) | 2,859 | 556 | 0 | 81 |
| `/news/2026-11-12/` | 26.1 KB | `<p>` | 1,056 | 0 | 0 | 100 |
| `/search/` | 10.8 KB | `<p>` | 908 | 0 | 0.041 | 100 |
| `/courses/dokploy/backup-strategy/` | 14.9 KB | YouTube thumb (lazy) | 3,085 | 12 | 0 | 94 |

Notes on the baseline:
- CSS is one render-blocking 131.9 KB file (19.2 KB brotli).
- Content pages load 1.5 KB of site JS (compressed transfer) plus Plausible (6.2 KB).
- Fonts are 174.8 KB across 5 files on most pages.
- Live, under Playwright throttling:

  | Page | LCP | TBT |
  |---|---|---|
  | `/` | 1.6-1.7 s | 420-600 ms |
  | `/astro-i18n-localization/` | 2.3-2.6 s | about 1,800 ms |
  | `/best-mini-pc-home-server/` | 2.2 s | about 1,250 ms |

The JavaScript budget is already excellent. The weak points are the LCP image on posts (§2.2), main-thread work on code-heavy posts (§3.2), and repeat-visit caching (§3.5, §3.6).

### 3.1 A Pages Function runs on every HTML request (P1, S-M)

- `public/_routes.json` includes `/*` and excludes only assets, so `functions/_middleware.js` runs on every page view, bot hit and 404 probe.
- Live HTML returns `cache-control: public, max-age=0, must-revalidate` and `cf-cache-status: EXPIRED`.
- Latency is fine (median TTFB 134-183 ms). The risk is quota: Free-plan Functions allow 100k requests a day, shared with Workers, and the response when the quota runs out depends on fail-open settings.
- The Function's only real job is markdown negotiation for agents. The rest (`Vary`, `Link`, `No-Vary-Search`) can live in `_headers`.

**Fix, pick one:**
- **(a)** Drop Accept negotiation. `SEO.astro:297/306` already emits `rel="alternate" type="text/markdown"`. Then delete the Function.
- **(b)** Move negotiation to a Worker route or Transform Rule that only matches `Accept: text/markdown`.
- **(c)** At minimum, check Functions usage in the dashboard and enable fail-open.

### 3.2 Shiki token colour stripping never runs (P1, S)

- `src/utils/markdown-plugins.mjs:119-134` only resolves the default foreground when the theme is an object. The theme is the default string `github-dark`, so `defaultFg` is always `undefined` and nothing is stripped.
- On `/astro-i18n-localization/` that leaves 3,150 redundant `<span style="color:#E1E4E8">` (verified) inside an 11.7k-node DOM. Style and layout cost 1.38 s of main-thread time, and a mobile TOC tap takes 144 ms.

**Fix.** Read the colour from the `style` attribute on the `<pre>` that Shiki emits:

```js
root(root) {
  const pre = root.children.find((n) => n.tagName === "pre");
  const m = /(?:^|;)\s*color:\s*(#[0-9a-f]{3,8})/i.exec(pre?.properties?.style ?? "");
  visit(root, m?.[1]?.toLowerCase() ?? null);
}
```

- **Measured effect:** raw HTML goes from 606 KB to 498 KB, there are about 27% fewer DOM nodes, and TBT drops 100-150 ms.
- **Follow-up (M):** emit token colours as classes instead of inline styles (606 KB to about 448 KB raw).

### 3.3 Font preloads should follow page type (P1, S)

Five files load on most pages:

| Font | Size |
|---|---|
| JetBrains Mono | 40.4 KB |
| Aleo italic | 38.8 KB |
| Aleo | 36.9 KB |
| Chivo | 33.2 KB |
| Source Sans 3 | 28.7 KB |

What is wrong:
- The serif preload at `Layout.astro:159` pulls both Aleo files on every page.
- `/news/` and `/search/` preload 4 faces and use 2.
- `/blog/` and course pages don't preload mono but download it anyway, because the card meta is `font-mono`.
- The comment at `Layout.astro:156-157` says mono is about 29 KB; it is 40.4 KB.

The A/B result matters here: removing preloads on a heavy post raised TBT by about 300 ms, because the late font swap re-lays-out the big DOM.

**Fix:**
- Keep the post preloads.
- Make the display and serif preloads opt-in props, like `preloadMono` already is. Turn them off on `/news/`, `/search/` and taxonomy pages.
- Drop the Aleo italic preload.
- Either preload mono where cards use it, or move the card meta to `font-sans`.

### 3.4 YouTube thumbnails (P1, S)

- 844 references to `hqdefault.jpg` (33 KB each) are hotlinked from `i3.ytimg.com`. Every page view sends the reader's IP to Google before any click, even though the player itself uses youtube-nocookie.
- On course lessons the lazy thumbnail is the LCP element: 3,085 ms LCP against 907 ms FCP.

**Fix:**
- Render the facade image through Astro `<Image>`. `ytimg` is already in `remotePatterns`, so the build produces self-hosted WebP and nothing goes to a third party.
- If that adds too much build time across 391 pages, hotlink `https://i.ytimg.com/vi_webp/<id>/hqdefault.webp` (19 KB) instead.
- Add an `eager` prop to `YouTubeEmbed.astro` and pass it from the lesson player page.

### 3.5 Repeated inline CSS and JS in every page (P1, M)

These blocks are inlined into every page and cannot be cached across pages:

| Block | Size | Pages |
|---|---|---|
| Component CSS (about 47% used per page) | 12.7 KB | 812 posts |
| Theme bootstrap script | 2.6 KB | every page |
| Critical CSS | 2.5 KB | every page |
| `@font-face` blocks | 3.4 KB | every page |
| TOC script | 3.7 KB | every post |
| Code-copy script | 2.7 KB | every post |

That is about 7-8 KB brotli per post view.

**Fix:**
- Try `build: { inlineStylesheets: "never" }` and measure first view against repeat view.
- Move the TOC and copy logic into bundled `<script>` modules.
- Keep the theme bootstrap inline, since it must run before paint.

### 3.6 Conflicting `Cache-Control` on hashed assets (P1, S)

Live `/_astro/fonts/*.woff2` and `/_astro/*.webp` return:

```
public, max-age=31536000, immutable, public, max-age=86400, stale-while-revalidate=604800
```

Cloudflare merges every matching `_headers` rule, so `/_astro/*` combines with the `/*.webp`, `/*.jpg`, `/*.jpeg`, `/*.png` and `/*.woff2` rules (`public/_headers:19-35`).

**Fix:**
- Delete the extension-wide rules. Keep `/images/*`.
- Add explicit paths for any root-level images.
- Verify with `curl -sI https://www.bitdoze.com/_astro/fonts/<hash>.woff2`.

### 3.7 Other performance items

| Sev | Item | Fix | Effort |
|---|---|---|---|
| P1 | Author avatar is a 512x512, 30.5 KB image shown at 36px, twice per post (`PostLayout.astro:205-212`, `:329-337`) | Import from `src/assets` and render `<Image width={36} densities={[1,2,3]}>` | S |
| P1 | No Speculation Rules | Add prefetch only (not prerender) in `Layout.astro`, excluding `/go/*` and `/search/*`. Prefetch does not run JS, so Plausible counts are unaffected. This is different from the earlier decision to skip `experimental.clientPrerender` | S |
| P2 | 1,693 unused OG image variants (56 MB). `getImage({ width: 1200, format: "jpeg" })` inherits the global responsive ladder. `dist` holds 12,293 files against the 20,000-file Pages limit, about 25 files per bilingual post, which leaves room for roughly 300 more posts | Pass `layout: "none"` to the OG `getImage` call | S |
| P2 | Image variant sprawl: each `<Image>` call site uses its own `widths` | Standardise card sizes (for example 400 and 800) | M |
| P2 | Three eager, high-priority card images on `/` and `/blog/`; on mobile the homepage cards are below the fold | `eager` and `high` only on `index === 0` on `/blog/`; none on the homepage | S |
| P2 | Non-passive document-level `touchend` listener in `YouTubeEmbed.astro:163-173` on 391 pages | Bind it to the facade button, passive | S |
| P2 | 118 ms of forced reflow from the `getBoundingClientRect` loop in `PostHeadings.astro:446-451` | Use the IntersectionObserver state or one batched rAF read | S |
| P2 | AmazonProduct repeats inline SVG icons (about 48 KB raw on the gadgets post) | `<symbol>` sprite plus `<use>` | S |
| P2 | `favicon.ico` is 37.1 KB | Rebuild it at 16+32px (about 5 KB) | S |
| P2 | `/search/` CLS 0.041 when the Pagefind results mount | `min-height` on the container | S |
| P2 | The Plausible script is served with `max-age=60` | 1 day plus stale-while-revalidate on the `an3` proxy | S |
| P2 | `node_modules/.astro` is 524 MB | Clear it periodically; fix the OG variants first | S |

---

## 4. Search (SEO)

The basics are clean:
- One absolute canonical per page.
- Reciprocal EN/ES/x-default hreflang on 796 of 802 posts.
- Valid JSON-LD on all 1,953 pages.
- One H1 everywhere, and full alt coverage in post bodies.
- `max-image-preview:large` with 1200px OG images.
- Sitemaps contain only 200, indexable URLs.

The issues below are about accuracy and depth.

### 4.1 Publish dates are rewritten on refresh (P1, M)

- 97 of 400 English and 20 of 394 Spanish posts have a `date` that moved after their first commit. 26 EN and 9 ES of those have no `lastmod`.
- Examples:
  - `docker-containers-home-server`: date 2026-10-14, first added 2025-03-07, cover image under `24/07/`.
  - `docker-env-vars`: 2024-01-31 became 2026-10-06.
  - `deploy-uptime-kuma`: 2023-03-16 became 2026-09-29.
- The wrong date flows into:
  - `article:published_time`
  - JSON-LD `datePublished`
  - RSS `pubDate`
  - video sitemap dates
- 102 English posts have `lastmod == date`, so the "Updated" badge never shows on them.
- 98 posts dated before 2025-03-07 come from the repo import, and their older dates are correct.

**Fix.** Script it. Take `date` from the first commit that added the file (`git log --diff-filter=A --format=%aI -- <file> | tail -1`), but only for posts added after the import. Move the current value into `lastmod`. Add an AGENTS.md line: "refresh = edit `lastmod` only".

### 4.2 Titles and descriptions (P1/P2)

| Sev | Issue | Evidence | Fix | Effort |
|---|---|---|---|---|
| P1 | Stale years in titles and descriptions | 22 files, 36 fields. `docker-commands` is live as "60+ Docker Commands Every Developer MUST Know (2025 Guide)". Also `outline-install`, `php-cloud-hosting`, `memos-install`, `secure-ssh-server-linux`, `install-wordpress-docker` and others | Update the year only where the content was re-verified (set `lastmod`); otherwise drop the year | S |
| P1 | The Jan 1 cliff | 153 English titles contain "2026" | Before Jan 1: re-verify and bump the money pages and roundups; drop the year from evergreen how-to titles | M |
| P1 | Truncated `meta_title` values | 8, e.g. `copaw-setup-guide` ends "...AI Assistant You Can"; ES `guia-configuracion-zeroclaw` ends "..., GLM-5, y" | Rewrite as complete phrases of 60 characters or fewer | S |
| P2 | Long Spanish titles | 192 of 401 ES titles exceed 60 characters (22 EN); 48 exceed 70; `/es/mejores-gadgets-2027/` is 90 | Shorten the ES `meta_title`; keep the H1 | M |
| P2 | Long descriptions | 340 over 160 characters (293 ES); 39 over 200 | Trim, ES first | M |
| P2 | Generic archive descriptions | `/blog/` "Explore our latest articles, tutorials, and insights"; `/authors/dragos/` "Browse all posts written by Dragos" | Write intent-led descriptions | S |
| P2 | Brand suffix inconsistent | Missing on `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/resources/` and the 6 services pages; doubled on `/es/advertise/` ("Publicidad en Bitdoze - Bitdoze", `es/advertise.astro:119`) | One suffix rule; pass `title={title}` at `es/advertise.astro:119` | S |
| P2 | `/es/asus-vs-razer-thunderbolt-5-comparativa/` uses the English title | The only duplicate title on the site | Translate it | S |

### 4.3 Internal linking (P1, S-M)

- **14 broken internal targets.** 8 point to the two lost posts (§2.1). There are also wrong Spanish slugs in `es/instalar-dockhand.mdx:122,719-720` and `es/instalar-usulnet.mdx:140,786-787`. For example, `/es/mejor-mini-pc-home-server/` should be `/es/mejor-mini-pc-servidor-casa/`.
- **22 links point at redirect stubs.** `/ai-coading-tools/` is linked from 16 posts (e.g. `perplexity.mdx:338,345,393`). Others point at `/categories/dev-tools/` and `/categories/cms/`. Point them at the final URLs.
- **36 posts get no contextual links from other posts** (19 EN, 17 ES). Examples: `astro-i18n-localization`, `deploy-emdash-docker`, `hqbase-self-hosted-shared-inbox`, `openship-self-hosted-paas`, `youtube-promotions-subscribers`. Another 91 get only 1 or 2. Add 2-3 links from cluster siblings.
- **Pagination page 1 links have no trailing slash** (`Pagination.astro:49-52`), so 54 targets answer with a 308. Append `/`.
- **11 English bodies link to Spanish pages** (e.g. the "Lee en espanol" line in `fish-audio-review.mdx:222`). Remove them; hreflang and the language switcher already cover this.

### 4.4 Structured data and sitemaps (P2, S each)

- **Person entity:** posts use "Dragos", news uses "Dragos Balota" with no url or `sameAs` (`NewsLayout.astro:55`), under the same `@id`. Use one full name everywhere and add `jobTitle` and `knowsAbout`.
- **Language and logo:** add `inLanguage` to Article (`SEO.astro:156`). The Organization logo is `favicon.svg` (`SEO.astro:113`); use a 512x512 PNG.
- **`SearchAction`:** Google retired the sitelinks search box in 2024, and `/search?q=` returns 308. Remove it (`SEO.astro:125-132`).
- **Video sitemap dates:** `video:publication_date` uses `post.data.date` (`video-sitemap.xml.ts:78`), while the on-page JSON-LD uses the real upload date. They disagree on 248 of 410 videos. Use `getYoutubeMeta(id).uploadDate ?? post.data.date`.
- **Missing sitemap entry:** `/self-hosted/` is linked from 982 pages but missing from `sitemap-en.xml`.
- **Default OG image:** 74 non-post indexable pages (categories, news, services, courses hub) use `og-default.png` (168 KB). Per-category OG cards would help social shares and Discover.
- **Hreflang gaps:**
  - `es/astro-vs-nextjs-vs-tanstack-start-cual-gana.mdx:3` uses the old `translationKey`; it should end in `-2026`.
  - `/terms/`, `/privacy/` and `/authors/dragos/` lack reciprocal hreflang.
- **Notice titles render as `<h3>`** (`Notice.astro:61-65`). "Affiliate Disclosure" becomes an H3 before the first H2 on 85 pages. Render the title as a `<p>` with heading styling.

### 4.5 Indexation and crawl budget (P2)

- **Tag pages:** 777 noindex tag pages, about 468 of them listing a single post, linked from every post's tag chips. Fix: render chips only for tags with 3 or more posts, and merge the 261 English tags used once (§7.6).
- **Expired digests:** each digest that leaves the 10-digest window becomes a 404, which wastes any links it earned. Add 301s from expired digests to `/news/`, or keep a static archive page.
- **News markdown:** news pages advertise `/md/news/<date>.md`, which returns 404 (verified). Generate those files or drop the `<link>`.
- **Raw MDX in `/md/`:** `/md/<slug>.md` serves the raw MDX body, including `import` lines and `<AmazonProduct ...>` JSX (`md/[...slug].ts:27`). Strip `import`/`export` lines and render components to text.
- **Pick one AI policy.** `robots.txt` sends `Content-Signal: ai-input=no`, while the site publishes `llms.txt`, `/md/` and `Link: rel=llms-txt`. Agents that respect the signal are told not to use the content for answers, and AI referrals are already a measurable source (Gemini 1.4%, ChatGPT 1.0% of clickers, plan §2.4). If you want citations, set `ai-input=yes`.
- **Bing and IndexNow.** DuckDuckGo (20.9%) and Bing (5.6%) together send 26.5% of affiliate clickers (plan §2.4), and DuckDuckGo results come largely from Bing's index. IndexNow is not implemented. Turn on Cloudflare Crawler Hints, or ping `api.indexnow.org` with changed URLs after each deploy. Plan §6.2 already lists Bing Webmaster Tools; this belongs with it.

### 4.6 Do not add

- **FAQPage:** Google limits FAQ rich results to government and health sites.
- **HowTo:** deprecated.
- **Product or AggregateRating built from the Amazon `productRating` values:** that would break review-snippet policy. A `Review` with your own rating is only safe on genuine first-hand reviews.

---

## 5. Make it pop: design and UX within the system

Everything here stays inside DESIGN.md: Terminal Blue, the four faces, flat-by-default, no glass, glow, gradients or side stripes. The only rule change proposed is §5.4. Screenshots of the current state are in `/tmp/design-audit/shots/` (temporary; they disappear on reboot).

### 5.1 The first screen on mobile (P1, S)

At 390x844 the hero fills the whole first screen. No guide is visible, and the terminal sits below the fold. A reader arriving from a share or a brand search sees a slogan, not the content.

**Fix:**
- On mobile, shorten the hero: one line of H1, the search input, and the primary CTA.
- Drop the terminal on small screens.
- Let the first two "Latest guides" cards start above the fold.

### 5.2 Topic-led navigation (P1, S)

Today the menu is Home / News / Resources / Courses / "Pages" / ... (`src/config/menu.json`). Categories, `/self-hosted/` and Services are buried under "Pages", which means nothing to a reader arriving from search.

**Fix:**
- Main items by topic: **Self-Hosting, AI, Linux, Hardware** (the `gadgets` category plus the buying guides), **News, Courses**.
- Move About/Authors/Contact/Privacy to a small "More" menu or the footer.
- Add a 44px search icon to the mobile header (`Header.astro`, `xl:hidden` cluster). Today search is two taps deep on mobile.

### 5.3 A "Start here" row on the homepage (P1, S)

Nothing on the homepage links to `/self-hosted/` (the strongest page on the site) or to Courses, except the menu.

**Fix.** Three path cards below the hero, reusing the PostCard shell: the self-hosted route map, Courses, and Today's digest.

Optional second step: a "Most read this month" row from a small `src/data/popular.json` that you refresh monthly from Plausible. That is real social proof without inventing numbers.

### 5.4 A signature cover system (P1, M, rule change)

The 18 newest covers use at least five visual languages:
- flat blue icons with blurred glow blobs, which the AGENTS.md SVG rules ban;
- a peach gradient;
- dark navy with a glowing shield;
- an editorial print style;
- photo-real products with a bold navy headline (the 26/11 buying guides).

The last one scans best as a thumbnail (judgement).

**Proposal: two templates only.**
- **(a) Guides:** flat paper background, Chivo title, and a mono command strip in a console-coloured bar (for example `$ docker compose up -d`).
- **(b) Buying guides:** product photo plus Chivo headline.

**Rule change needed.** AGENTS.md mandates flat SVG for every cover. Allow template (b) for `gadgets` and buying guides, and update `scripts/svg-to-webp.mjs` and the AGENTS.md SVG section to match.

Re-cover the top 20 traffic pages first.

### 5.5 Post header: get to the first command sooner (P1, M)

- At 1440x900, prose starts exactly at the fold.
- On `/astro-i18n-localization/` the first `<pre>` is 2.79 viewports down on mobile and 2.48 on desktop.

**Fix:**
- Cap the cover height (eager, see §2.2) and merge the byline into one inline meta line.
- **Seed `quickAnswer`** on 15-20 install and fix guides. It has 0 uses today. Candidates: `setup-samba-linux`, `setup-nfs-linux`, `hermes-agent-setup-guide`, `opencode-setup-guide`, `dokploy-install`, the `fix-*` posts.
- **"Tested on" line.** Optional frontmatter `testedOn: ["Ubuntu 24.04", "Docker 27.3"]` and `timeToComplete: "15 min"`, rendered as one mono line next to the Updated badge (`PostLayout.astro:222-256`). It is filled in by hand and never auto-generated. This is the visible proof behind "tested, copy-paste-ready".
- **Reading time.** A reading time like "108 min read" reads like a warning on long reference guides. When `timeToComplete` exists, show that instead.

### 5.6 Archive and category pages (P2, M)

Every card on `/blog/` and the category pages has the same weight. Category pages have only an H1 and a description.

**Fix:**
- A featured lead card on page 1.
- On category pages, a 2-3 line intro plus "Start here" picks (3 hand-picked guides in frontmatter or `categories.ts`).
- Fix the card meta (§2.8).

### 5.7 News surfaces (P1, S)

- Every news card title reads `AI & Tech News Digest — <date>`, so the cards look identical. In `NewsDigestCard.astro`, use the description as the headline and show the date as a mono chip.
- Digest pages are walls of text. With compact chips (§2.8) and one "From the guides" link per digest (§8.6), they turn into a path back into evergreen content.
- The section badge is `#6b7280` on `#f3f4f6`, which is 4.39:1. Use `#4b5563`.

### 5.8 End of article: one clear next step (P1, M)

The order is now correct: tags, related, author, share, services link. Add two things after Related:
- **A follow box:** "New guides every week" with email signup (§6.1), RSS and the News RSS. Flat Notice-info style, never a popup.
- **"Did this guide work? Yes / No":** fires a Plausible custom event with the slug, the same pattern as `/go/`. Within a month you will know which guides fail readers, which is the best refresh signal you can get.

### 5.9 Trust surfaces (P1, S)

- **Author bio and About page.** Both carry the same old text. It has AI filler ("delve into the intricate", "Moreover", "Furthermore", "empower", "foster"), outdated claims ("past four years", "more than ten affiliate sites"), and the typo "bussiness". The Spanish author page shows the English bio. Rewrite it with role, stack, years, the YouTube channel and real client work.
- **A "How I test" page,** linked from every buying guide and from the disclosure Notice. It is the proof behind PRODUCT.md belief-ladder step 2.
- **Back up the titles.** `best-tb5-nvme-enclosures` (the best converter, 31.3% clicker rate per plan §2.1) says "Picks Tested", but the body quotes vendor and reviewer numbers. Add first-party benchmarks or retitle it "Compared". Check the other "Tested" titles the same way: `fish-audio-review`, `freebuff-free-ai-coding-agent`, `lm-studio-bionic`, `portainer-alternatives`.

### 5.10 Tables, code blocks and smaller UI items

| Sev | Item | Fix | Effort |
|---|---|---|---|
| P1 | Tables are not keyboard-scrollable; the sticky header is a no-op; the mask fades tables that don't overflow | Rehype wrapper `<div class="table-scroll" role="region" tabindex="0" aria-label>`; overflow and mask on the wrapper; add a class only when `scrollWidth > clientWidth`; drop `th { top }` | M |
| P1 | Code comments are `#6a737d` on `#24292e`, 3.04:1 (114 axe nodes on one post) | Override the comment token colour to `#9ca3af` (about 5.9:1) in `trimTokenStyles`, or switch to a theme whose comments pass AA | S |
| P2 | Code blocks show only a language label | Support a `title="docker-compose.yml"` meta in the `codeBlockHeader` transformer; DigitalOcean shows file names and readers copy into the right file | S |
| P2 | Six-column quick-picks tables at 356px on mobile (`best-mini-pc-proxmox`) | Use 3-4 columns on buying-guide tables and move the extra specs into the product box | S |
| P2 | Product images are a white rectangle inside dark cards | `dark:bg-white` padded frame with `rounded-md` (`AmazonProduct.astro`) | S |
| P2 | The 404 page has no search, and its buttons wrap ("Go / Home") | Search input pre-filled from the slug words plus 3 popular guides (`src/pages/404.astro`) | S |
| P2 | Print: page 1 is mostly the cover image | In `@media print`, hide the cover, related, author and share blocks, and print link URLs (`global.css:640`) | S |
| P2 | The terminal comments on home and `/self-hosted/` are 3.66:1 (decorative, `aria-hidden`) | `#9ca3af` as polish | S |

---

## 6. Growth and retention

### 6.1 Email capture (P1, M)

`src/` has no newsletter component, no subscribe form and no list. With thousands of visitors a day, every reader who solves their problem leaves with no way back except search. The site already promotes EmailOctopus, MailerLite and Sender through `go.bitdoze.com`.

**Proposal:**
- **List:** one weekly email built from `/news/rss.xml` plus new guides. The tool is your call: a provider you already promote, or self-hosted listmonk on the Hetzner box to match the site's own advice.
- **Placement:**
  - the end-of-article follow box (§5.8);
  - `/news/` and every digest;
  - the footer.
- **No popups or interstitials:** they are a PRODUCT.md anti-reference.
- **Tracking:** a Plausible `newsletter_signup` event.

### 6.2 Make RSS visible (P2, S)

RSS appears only in `<head>` and on `/self-hosted/`. Add RSS and News RSS links to the footer and to `/news/`.

Feed polish:
- add `<language>`, `<lastBuildDate>` and `atom:link rel=self`;
- point the news feed's `<link>` at `/news/` instead of `/`.

### 6.3 Topic hubs (P1, M each)

`/self-hosted/` is the template that works: an intro, an ordered route map, and stage navigation.

Clusters with 6 or more posts that deserve hubs:

| Cluster | Posts |
|---|---|
| Astro | 23 |
| Dokploy | 16 |
| Carrd | 16 |
| Fish shell | 13 |
| Homelab hardware / mini PCs | 10 |
| OpenClaw | 8 |
| TB5 | 7 |
| Fish Audio | 7 |
| Hermes, Herdr, Traefik, EmDash, Mastra, FastHTML | 6 each |

Each hub needs an intro, an ordered reading path, and a link back from every child post. Hubs also fix the zero-inbound-link problem (§4.3) and give the topic navigation (§5.2) real landing pages.

### 6.4 Revenue levers already planned, still unshipped

These live in `amazon-affiliate-opus-plan2027.md` and still outweigh any single article:
- **§6.1 Geo-route `/go/`:** about 65% of clickers are outside the US (plan §2.4), and the Spanish pages send Spanish readers to amazon.com with dollar prices.
- **§6.2 Bing Webmaster Tools:** pair it with the IndexNow item in §4.5.
- **R14:** `/go/` links that land on the wrong listing.

---

## 7. Content library

**Shape:**
- 804 MDX files: 403 EN, 401 ES, 0 drafts.
- English by category: self-hosting 104, ai 103, web-development 65, linux 47, tools 34, hosting 21, wordpress 17, gadgets 12.
- Median English post is 2,467 words; every post has H2s.
- Spanish coverage is 401 of 403.

### 7.1 Dates and freshness

- **Dates:** see §4.1.
- **Year cliff:** see §4.2.
- **No `lastmod` and older than 12 months:** 17 English posts, e.g. `cleanup-all-docker-things`, `fix-kernel-panic-unable-mount-root-fs`, `install-docker-ubuntu-arm`, `updating-container-docker-compose`.
- **Outdated commands (P2):**
  - 5 posts use the obsolete compose `version:` key: `dokploy-backups-cloudflare-r2`, `nodejs-update-dependencies`, `streamlit-deploy-vps-cloudflare`, `updating-container-docker-compose`, `zeroclaw-setup-guide`.
  - 2 posts use v1 `docker-compose` commands: `docker-commands`, `updating-container-docker-compose`.
  - Also mentioned: Ubuntu 18.04/20.04 in 3 posts, CentOS in 15, Node 14/16/18 in 25. Fix these when you refresh the posts.
- **Fast-moving tools:** the `hermes-agent-setup-guide` description pins v0.18, with `lastmod` 2026-07-14. Re-check the fast-moving AI tool guides monthly; they carry the largest query volume.

### 7.2 Thin posts (P2, M)

12 English posts are under 500 words:

| Post | Words |
|---|---|
| `fix-rpm-transaction-lock-waiting` | 120 |
| `plausible-tool` | 138 |
| `export-wordpress-post-urls-titles` | 326 |
| `fix-rpmdb-error-bdb0087-db_runrecovery` | 339 |
| `upload-vcard-vcf-files-to-wordpress` | 346 |
| `safely-update-cloudpanel` | 367 |
| `uptime-kuma-tool` | 378 |
| `fix-ssh-too-many-authentication-failures` | 409 |
| `install-wordpress-on-ubuntu-arm` | 420 |
| `send-emails-in-wordpress-zoho-smtp-fluentsmtp` | 439 |
| `how-to-setup-smtp-relay-email-on-zeptomail` | 445 |
| `opnform-open-source` | 448 |

Expand the `fix-*` posts and give them a `quickAnswer`. Merge or retire `plausible-tool` and `uptime-kuma-tool`.

### 7.3 Merge cannibalising pairs (P1, S-M each)

Check in GSC which URL ranks, merge into it, and 301 through `src/config/redirects.mjs`.

| Pages | Action |
|---|---|
| `uptime-kuma-tool` (378 words) and `install-uptime-kuma` | Merge into `install-uptime-kuma`; keep `deploy-uptime-kuma` (Coolify) and `uptime-kuma-vs-gatus` as spokes |
| `fish-shell-vs-zsh` (Nov 1) and `fish-shell-vs-bash-vs-zsh` (Nov 8) | Merge |
| `tinyfish-ai-agents-web-search` and `tinyfish-free-search-coding-agents` (same day, same intent) | Merge, and make `tinyfish-free-firecrawl-alternative` clearly different |
| `cloudpanel-varnish-cache` and `speed-up-wordpress-with-cloudflare-varnish-and-redis` (both under 650 words) | Merge |
| `best-thunderbolt-5-docks-guide` and `best-tb5-dock-macbook-pro` | Make the MacBook page an explicit sub-intent and link it from the guide with an exact-match anchor |

### 7.4 House-style backlog (P2, L)

The style rules (no em dashes, no AI vocabulary, straight quotes, no emojis) cover a large backlog:

| Check | EN | ES |
|---|---|---|
| Em dashes outside code | 2,790 in 220 files | 2,401 in 202 files |
| AI-vocabulary hits | 90 in 50 files | 70 Spanish filler hits in 57 files |
| Emoji | 407 in 23 files, mostly ⭐/✅/❌ table markers | 409 in 24 files |
| Fully clean files | 157 | 185 |

At the Oct 23 pass size (about 157 em dashes per batch), this is roughly 33 passes. Work through it by traffic: the 25 pages in §11 first. The top converter `best-tb5-nvme-enclosures` alone has 42 em dashes, and `ai-coding-tools` has 174 emoji.

**Policy conflict.** The AGENTS.md news item format prescribes `**Title** — [source]`, which puts about 1,419 em dashes into the 19 digests. Either exempt digests explicitly or change the template to `**Title**: [source]`.

### 7.5 Spanish quality (P1, M)

- **Missing:** 2 posts have no Spanish version: `herdr-app-layouts-mods`, `stop-wasting-time-free-ai-tools`.
- **Stale:** 11 English posts were committed after their Spanish twin, so the Spanish side is likely stale. Examples: `arm-vs-x86-vps-server-benchmarks`, `oh-my-fish-install-themes-plugins`, `openclaw-security-guide`. `translations/index.json` is out of date as well; rerun `node scripts/build-translation-index.mjs`.
- **Machine-translation tells:** older AI-agent translations have no accents and contain calques. The worst offenders:

  | File | Unaccented words |
  |---|---|
  | `guia-configuracion-openfang` | 75 |
  | `guia-configuracion-zeroclaw` | 66 |
  | `mejores-modelos-baratos-hermes-agent` | 41 |
  | `opencode-go-plan` | 36 |
  | `guia-configuracion-opencode` | 34 |
  | `tinyfish-busqueda-web-agentes-ia` | 31 |
  | `migracion-wordpress-a-astro` | 29 |

  In total, 23 Spanish files show 3 or more unaccented common words. A native-quality pass on these protects the Spanish brand.

### 7.6 Tags (P2, M)

- 432 distinct English tags; 261 are used once (60%).
- 73 posts list more than 3 tags, and the schema silently keeps the first 3, which often drops the most specific one. Example: `ai-coding-tools` lists 7 tags.
- 28 posts repeat their category as a tag.

Fix: trim each post to its 3 most specific tags, then merge single-use tags with `scripts/restructure-taxonomy.mjs`. Also make the schema fail on more than 3 tags instead of truncating, so the author picks.

### 7.7 News digest housekeeping (P2, S)

- `src/content/news/` holds 19 files against the documented rolling window of 10. `NEWS_DIGEST_LIMIT = 10` caps what readers see, so nothing breaks, but the publishing workflow doesn't prune. Either prune or update AGENTS.md to say the slice enforces the limit.
- There is no 2026-11-03 digest.
- Two format slips: a blank line after a lead line in 2026-11-01 and 2026-11-08, and a single-line Reddit item in 2026-11-08.
- Digests run 2,207-3,164 words with 55-67 links, past the 5-8 minute target. Cut items rather than compressing them.

---

## 8. Monetization and affiliate compliance

### 8.1 Disclosure

See §2.4 for the `/go/` links. Separately, 250 English posts use `go.bitdoze.com` hosting referrals (Hetzner, Hostinger, Vultr, DigitalOcean) and have no affiliate wording beyond the footer. Add a one-line disclosure to those posts.

### 8.2 Amazon content exposure (P1, M)

The `AmazonProduct` boxes carry three kinds of static Amazon data:
- 170 hardcoded `productRating` values render as "Amazon rating" stars.
- 109 of 176 boxes carry `$` prices in their props.
- 248 images are hotlinked from `m.media-amazon.com` across 68 posts.

Static prices, ratings and images not fetched through Amazon's API are a known risk pattern in the Associates Operating Agreement (judgement; check the current text). Your own plan §6.5 already says "never hardcode prices".

**Options:**
- **(a)** Drop the stars and the prices from the boxes. Link "Check price" and keep your own verdict.
- **(b)** Pull price, rating and image through the API at build time with a cached JSON.

Hotlinked images also break silently when Amazon rotates them.

### 8.3 `rel="sponsored"` everywhere (P1, S)

`AmazonProduct` and the `/go/` pages use it, but the links typed into post text do not:
- 2,219 of 2,235 `go.bitdoze.com` links lack `sponsored` or `nofollow` (verified on built pages).
- 1,202 of 1,940 inline `/go/` links lack it.

**Fix.** One rehype plugin in `src/utils/markdown-plugins.mjs` that adds `rel="sponsored nofollow"` when the `href` starts with `/go/` or `https://go.bitdoze.com/`. No MDX edits needed.

### 8.4 Revenue gaps on traffic pages (P1)

**AI cluster.** 103 posts, 7 with any `/go/` link, 3 with a product box.
- `opencode-vs-pi-agent` gets 10.7k impressions on "opencode vs pi" (plan §2.3) and has no next step.
- `openclaw-alternatives` (20 inbound links) and `hermes-agent-setup-guide` (30) have 0 affiliate links.

Add an R7-style hardware box (local-LLM mini PC, the Mac mini for OpenClaw) plus a VPS referral where the guide runs on a server.

**Traffic pages with weak next steps:**
- `portainer-alternatives`: 1,668 visitors at a 0.3% clicker rate (plan §2.1). Add a hardware box, the DAS link and a Dokploy services CTA.
- `setup-samba-linux`: 254 visitors at 1.6%. Add the DAS link (R7).

**Categories with no affiliate links at all:**
- web-development: 0 of 65 posts.
- tools: 0 of 34.
- linux: 2 of 47.

Not every guide needs a product. A contextual services CTA fits many of them (see below).

**Contextual services CTAs (P1, M).** Map the 5 service slugs to the posts that match them:

| Service | Posts |
|---|---|
| Dokploy deployment | 9 Dokploy posts |
| Astro development | 29 Astro posts |
| VPS server setup | 23 VPS posts |
| Self-hosted apps | 87 self-hosted posts |
| AI agent development | the AI agent guides |

A one-line generic services link at the end of every post is the weakest version of this. The services page also needs proof above the fold: an example deliverable, client names if you can share them, and a price anchor.

### 8.5 Tracking and data hygiene (P2, S)

- **`go.bitdoze.com` links bypass `/go/` and Plausible's `affiliate_click` event.** `asus-dc510` (73 links) is an Amazon product routed this way, so geo-routing (plan §6.1) won't cover it. Move the Amazon ones into `affiliate-links.json`, and confirm `go.bitdoze.com` has its own analytics.
- **Slug and product mismatch.** The `gmktec-n150` slug, the #1 clicked product in plan §2.2, is named "Beelink Mini S13 N150" in `affiliate-links.json:34-36`. `beelink-mini-s13` points to the same ASIN (`:334-336`). Click reports are split across two names for one product. Pick one slug and redirect the other.
- **Unused slugs:** 3 of 183 JSON slugs are never used: `cyberpower-pr1500lcdrtxl2u`, `ecoflow-delta-2`, `minisforum-ms-s1-max-64`.

### 8.6 Cross-linking (P2, S)

- **Digests to guides:** all 19 digests have 0 links to bitdoze guides except one. Add one or two "From the guides" links per digest, matched to the self-hosting items. Keep digests free of affiliate links.
- **Courses to posts:** none of the 13 `relatedPosts` targets in `courses.json` links back to `/courses/`. Add a "Watch the course" line to those posts.
- **Courses playlist URL:** the EmDash playlist URL `list=PLboJy2nLHKxk` looks truncated (unverified).

### 8.7 `ads.txt` (P2, S)

`public/ads.txt` is 52 KB: 1,205 lines, Sovrn and many resellers, `managerdomain=newormedia.com`. It was re-added on 2026-11-02, and there is no ad script in `src/`. If an ad network is not live, delete it, because the file authorises resellers to sell bitdoze.com inventory. If one is coming, weigh it against the PRODUCT.md "ad-cluttered tutorial farm" anti-reference first.

---

## 9. Accessibility

axe-core on 14 pages, light and dark, desktop and mobile:

| Rule (impact) | Nodes | Cause | Fix |
|---|---|---|---|
| color-contrast (serious) | 456 total | Shiki comments 3.04:1 (§5.10); dark search 1.53:1 (§2.7); digest badge 4.39:1; lesson Prev/Next `text-gray-400` 2.6:1 (`courses/[course]/[lesson]/index.astro:104,119,144`); warning Notice code 4.17:1 | See the linked sections; lesson labels use `text-(--color-text-muted)` |
| label (critical) | 42 per run on the guide | GFM task-list checkboxes have no label | Rehype step that wraps the `li` content in a `<label>` |
| scrollable-region-focusable (serious) | 2 | Overflowing tables | Table wrapper (§5.10) |
| label-content-name-mismatch (serious) | 1 per page | The language link shows "ES" but is named "Switch to Español" (`Header.astro:182`) | `aria-label="ES, switch to Español"` |
| heading-order (moderate) | 21 | Card H3 after H1; Notice H3; AmazonProduct H5 | §2.8 and §4.4 |
| aria-allowed-attr (critical) | 1 | Progress bar ARIA on a child div (`CourseSidebar.astro:40-52`) | Put `role="progressbar"` and the values on one element |
| landmark-unique (moderate) | 1 | Two unlabelled `<nav>` elements | `aria-label="Main"` on the header nav |
| image-redundant-alt (minor) | 3 | TOC-rail thumbnails use `alt={title}` | `alt=""` (`PostHeadings.astro:180`) |

**Keyboard and mode checks:**
- **Passed:**
  - skip link;
  - visible focus rings;
  - the TOC button (Esc closes and returns focus);
  - mobile menu;
  - lightbox `<dialog>`;
  - Tabs arrow keys;
  - Accordion;
  - reduced motion;
  - 200% zoom reflow;
  - forced colours.
- **Failed:** 400% zoom gives 14px of horizontal overflow on the code guide.
- **To fix:** the lightbox `aria-label` "Enlarged image" is English-only on Spanish pages.

---

## 10. Code, build, CI and security

### 10.1 Build and code

| Sev | Item | Fix | Effort |
|---|---|---|---|
| P0 | CI | §2.6 | S |
| P1 | Production vulnerabilities: `sharp <0.35.5` (librsvg CVE on a path that processes remote images), `undici` (8 advisories), `vite`, `devalue`, `zod`, `postcss` | Bump `astro` to 7.4.x, `sharp` to 0.35.5 and `@astrojs/mdx`, then `npm audit fix` | S |
| P1 | `satori` pulls in a vulnerable `fflate`, only to render one image (`og-default.png`) | Commit a static PNG and drop the endpoint, or upgrade satori | S |
| P1 | 3 unused dependencies: `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/jetbrains-mono`, `@fontsource-variable/source-sans-3` (fonts come from `fontProviders.fontsource()`) | Remove them. Note that the build now needs network access to the Fontsource API | S |
| P1 | CI never caches `.astro/` or `node_modules/.cache`, so `incrementalBuild` only helps locally | `actions/cache` keyed on the lockfile | S |
| P2 | Package managers: CI uses `npm ci`, locally bun runs with no lockfile, and `npm ls` shows 7 extraneous packages | Pick one. Your stated preference is bun for this repo: commit `bun.lock` and use bun in CI | S |
| P2 | Date sorting is repeated in 12 places; `recentPosts.ts` duplicates `getPostsByLocale` | Export `byDateDesc` from `postsCache.ts`, delete the re-sorts, make `getRecentPosts` a slice | S |
| P2 | 20 EN/ES page pairs are 83% identical (advertise 258 lines, index 187, contact 119, search 97, resources 92) | `src/components/views/{Home,Advertise,Contact,Search,Resources}View.astro` taking `locale`; each page becomes a 5-line wrapper | M |
| P2 | `fix-redirect-html.mjs` hardcodes `lang="en"` on Spanish redirect stubs; `sync-redirects.mjs` uses a fragile `import.meta.url` check | `pathToFileURL(process.argv[1]).href`; pass the locale through | S |
| P2 | Unexplained 4 GB heap requirement | Measure peak RSS once with `/usr/bin/time -v bun run build` | S |
| P2 | `canonical:` silently decides the URL (`getEntrySlug`), so a typo moves a page | Build assertion: canonical path equals the expected slug unless a redirect exists | S |

What is fixed since the Sep 25 review: content fetches now go through `postsCache` (3 direct `getCollection` calls left, down from 84). No draft can leak into RSS, sitemaps, related posts, `llms.txt` or `/md/`.

### 10.2 Cloudflare and headers

| Sev | Item | Fix | Effort |
|---|---|---|---|
| P1 | Function on every request | §3.1 | S-M |
| P1 | Duplicate `Cache-Control` | §3.6 | S |
| P1 | `.well-known/mcp/server-card.json` advertises `https://www.bitdoze.com/mcp`, which is 404 live. `.well-known/api-catalog` anchors on `/search.json`, also 404, is served as `application/octet-stream`, and misuses the RFC 9264 structure. The middleware `Link` header and `llms.txt` advertise both | Delete the server card and its `Link` entries in `functions/_middleware.js` and `src/middleware.ts`. Point `api-catalog` at `/rss.xml`, `/llms.txt` and `/sitemap.xml`, served as `application/linkset+json` | S |
| P1 | The CSP is Report-Only with no `report-to`, so it collects nothing. Enforced as written, it would break 246 Amazon images (`m.media-amazon.com` is missing from `img-src`), other post-body image hosts, and Pagefind (needs `'wasm-unsafe-eval'`) | Add a report endpoint and the missing hosts, collect for 2 weeks, then enforce. Hash the `is:inline` scripts later | M |
| P2 | `access-control-allow-origin: *` on HTML (Pages default) | `! Access-Control-Allow-Origin` under `/*`; re-add it for `/md/*`, `/llms.txt` and the feeds | S |
| P2 | HSTS has no `preload` | Add it only after confirming every subdomain serves HTTPS | S |
| P2 | `public/md/home.md` is hand-written (last updated April), and `llms.txt` calls it the "Full English catalog". `llms.txt:60-61` calls the 30-item summary feeds "Full-content" | Generate `home.md` from `getPostsByLocale("en")` and fix the wording | S |

### 10.3 Security

| Sev | Item | Fix | Effort |
|---|---|---|---|
| P1 | News digests are `.mdx` written by an external AI agent from web content. MDX `import`/`export` and `{}` expressions run at build time, so a prompt-injected digest could run code in the build | `scripts/validate-news.mjs` in the build chain: reject `^(import\|export)\s`, `<script`, `{` outside code fences, and `javascript:` URLs in `src/content/news/` | S |
| P1 | The contact form spam trap uses `_gotcha` (Formspree's field name); FormSubmit's honeypot is `_honey`, so there is no honeypot. The action URL `https://formsubmit.co/dragos@bitdoze.com` (`config.json:26`) exposes the email | Use FormSubmit's random-string alias URL, rename the field to `_honey`, add a `_next` thank-you URL (`contact.astro:94`, `es/contact.astro:97`) | S |
| P2 | Plausible loads from `an3.bitdoze.com` without SRI | Acceptable for a first-party subdomain | n/a |

These checks came back clean: JSON-LD is serialised safely everywhere; all 24 `target="_blank"` links have `noopener noreferrer`; there are no inline `on*=` handlers; no secrets appear in the tree or the full git history; no `.env` file is tracked.

---

## 11. Editorial backlog: the 25 posts to touch first

Ranked by the plan's traffic and click data (§2.1-2.3, §2.6).

| # | Post | Action | Why |
|---|---|---|---|
| 1 | `docker-containers-home-server` | Disclosure above the table, restore `date`, move asus-dc510 to `/go/`, replace the ⭐ markers | 3,423 visitors, 127 clickers; #1 source of N150 clicks |
| 2 | `best-mini-pc-home-server` | Title/meta CTR test, remove the 6 hardcoded ratings and 6 hotlinked images | 25,422 impressions at 0.5% CTR |
| 3 | `portainer-alternatives` | Hardware box, DAS link, services CTA | 1,668 visitors at 0.3% |
| 4 | `best-thunderbolt-5-docks-guide` | Fix the date, 7 hotlinked images, link `best-mac-mini-dock` | 160 GSC clicks |
| 5 | `best-tb5-nvme-enclosures` | First-party benchmarks or retitle; 42 em dashes | 31.3% clicker rate |
| 6 | `best-mini-pc-local-llm` | Disclosure order, Spanish port | 19.3% |
| 7 | `best-mini-pc-proxmox` | Disclosure order, 3 AI-vocabulary hits | 25.0% |
| 8 | `black-friday-home-server-deals` | Weekly refresh through Nov 30 | 20.5% |
| 9 | `best-ups-for-home-server` | Spanish port, add images | 20.4% |
| 10 | `opencode-vs-pi-agent` | Add a next step | 10.7k impressions on one query |
| 11 | `hermes-agent-setup-guide` | Version check, `quickAnswer`, hardware box | 30 inbound links, `lastmod` July |
| 12 | `openclaw-alternatives` | Hardware box, fix the date | 20 inbound links |
| 13 | `best-mac-mini-for-openclaw` | Check indexing (plan R11) | 2 impressions after 16 inbound links |
| 14 | `best-nas-homelab-docker-proxmox` | Link `best-nas-for-plex` and `best-hard-drives-for-nas` | 2,245 impressions |
| 15 | `vps-price-increases` | Add `lastmod`, remove ratings | 16.3%, 162 inbound links |
| 16 | `best-2-5-10gbe-switch-homelab` | Disclosure order | 17.3% |
| 17 | `best-tb5-dock-macbook-pro` | Disclosure order, cannibalisation check | 18.8% |
| 18 | `setup-samba-linux` | DAS link, `quickAnswer` | 254 visitors at 1.6% |
| 19 | `best-home-assistant-hardware` | Images, links to the HA spokes | 940 impressions in 9 days |
| 20 | `docker-commands` | Drop "2025" and "MUST", fix the v1 compose commands | Stale title live |
| 21 | Fish shell pair | Merge | Cannibalisation |
| 22 | TinyFish pair | Merge | Cannibalisation |
| 23 | `uptime-kuma-tool` | 301 to `install-uptime-kuma` | 378 words |
| 24 | CloudPanel Varnish pair | Merge | Two thin posts |
| 25 | Spanish set | Translate 2, sync 11, re-accent the worst 7 | Brand quality |

---

## 12. Roadmap

### This week (all S unless marked)

1. §2.1 slug fix and build guard.
2. Keep `eager` on the cover before committing the design work (§2.2), and fix the §2.8 regressions in the same commit.
3. §2.3 YouTube empty state.
4. §2.5 services copy.
5. §2.7 dark search.
6. §2.6 CI green: setup-bun, Prettier, type errors, actions v5.
7. §3.6 cache headers; §3.2 Shiki fix; §8.3 `rel="sponsored"` plugin.
8. §10.2 `.well-known` cleanup; §10.3 contact honeypot and news validator.
9. §2.4 disclosure fixes plus the validator check (M).
10. Dependency bumps and unused packages (§10.1).

### Next 2-4 weeks

- §3.1 Function scope (decide on markdown negotiation).
- §4.1 date restore script.
- §4.2 stale and truncated titles, and the Jan 1 plan for 2026 titles.
- §4.3 broken links, redirect-stub links, pagination slash.
- §5.1-5.3 mobile hero, topic navigation, "Start here" row.
- §5.5 `quickAnswer` on 15-20 guides, plus the `testedOn` and `timeToComplete` fields.
- §5.8 and §6.1 follow box, email list, feedback widget.
- §5.9 author bio, About page, "How I test" page.
- §8.2 decision on Amazon stars, prices and images.
- §8.4 AI cluster boxes and Portainer retrofit.
- §3.3-3.5 font preloads by page type, YouTube thumbnails, inline CSS/JS externalised.
- §9 accessibility quick fixes.
- Plan §6.1 geo-routing and §6.2 Bing, with IndexNow.

### This quarter (Dec to Feb)

- §6.3 topic hubs: Dokploy, Astro, homelab hardware, Fish shell, Carrd first.
- §5.4 cover system; re-cover the top 20 pages.
- §7.3 merges; §7.2 thin posts; §7.6 tags.
- §7.5 Spanish quality pass.
- §7.4 house-style backlog, by traffic.
- §10.2 CSP from report-only to enforced.
- §10.1 EN/ES view consolidation.

### Measure the loop

- **GSC Core Web Vitals report** for real-user LCP and INP (the lab numbers here are not field data).
- **CTR on every retitled page,** 4 weeks after the change.
- **Plausible events:**
  - `affiliate_click` (exists)
  - `newsletter_signup` (new)
  - `guide_feedback` (new; yes/no by slug)
- Re-run Lighthouse on the 8 baseline URLs in §3 after the P0 and P1 performance work.

---

## 13. Corrections to `design-improve.md`

- **§E.1, lazy cover:** wrong. The cover is the LCP image; eager plus high priority measured 130-480 ms faster. §Q.5 was right.
- **Mono font size:** the file is 40.4 KB, not 29 KB (§P.2 and the comment at `Layout.astro:156-157`).
- **Removing preloads on heavy posts:** it hurts. TBT rose about 300 ms in the A/B because the late swap re-lays-out the large DOM. Scope preload cuts to non-post pages.
- **Code-header text `#9ca3af`:** passes (§P.3 is correct). The real code-block contrast failure is comment tokens at 3.04:1.
- **§O status:** 14 items are done (`quickAnswer` is done in code but unused in content). 8 are partly done: 1 header collapse, 3 token sweep (about 18% of the `gray-` uses migrated), 7 touch targets, 10 tables, 14 Tabs motion, 17 YouTube badge, 18 Browse band digests, 20 hero/code header. The regressions in §2.2 and §2.8 came from items 1, 5, 7, 10, 11 and 17.

## 14. Already done well (don't regress)

- **JavaScript is lean.** About 1.5 KB of site JS on content pages plus Plausible, client scripts scoped by page type, Pagefind only on the search pages, and a YouTube facade with no iframe before the click.
- **Layout is stable.** CLS 0 on every content page. bfcache works, and native view transitions are on.
- **Search basics are solid.** Canonicals, hreflang, valid `@graph` JSON-LD with real YouTube upload dates, clean sitemaps, intentional noindex rules, 1200px OG images, `max-image-preview:large`, and 3 generic anchors in thousands of internal links.
- **The `/go/` system is clean.** 0 missing slugs, 0 raw Amazon links in prose, `rel="sponsored"` on boxes, honest destination naming, and validators on source and dist.
- **Content depth.** Median 2,467 words, H2s everywhere, 196 posts with video, 401 of 403 posts translated.
- **Accessibility basics.** Skip link, focus rings, managed `aria-expanded`, keyboard-correct Tabs and dialogs, reduced-motion support, and a print stylesheet.
- **Safety in code.** Safe JSON-LD serialisation, `noopener` on all external links, no secrets, and no inline handlers.
- **Build guards.** Slug collision checks for pages, courses and the self-hosted route map; affiliate validation; redirect sync tests (9 of 9 pass). §2.1 shows one guard is still missing.

---

## 15. Repo hygiene and docs (P2, S each)

- **Sandbox directories.** `.hg/`, `.sl/`, `.eden/` and `.muse/` each hold only a sandbox mountpoint file created today. The `.hg` and `.sl` names can make Mercurial- or Sapling-aware tools treat the repo as an hg repo. Add them to `.git/info/exclude` and delete them once that sandbox session ends.
- **Planning notes.** Move the planning files at the root (`amazon-affiliate-opus-plan2027.md`, `design-improve.md`, this file, `to-do-emdash.md`) into `docs/`. `to-do-emdash.md` exists twice and the copies have diverged.
- **Unused files.** 79 images (10.9 MB) are referenced by nothing; the list is in `/tmp/code-audit/orphans.txt`. `src/components/blog/ServicesPromo.astro` is imported nowhere.
- **Large source images.** The biggest are `netdata1.jpeg` (1.5 MB), `09Dokto-Home.jpeg` (1.5 MB) and five `26/07/zcode-*.png` files (1.1-1.5 MB). Compress source images before committing.
- **Documentation drift:**
  - **AGENTS.md:** it says dev runs on 4321, but that port belongs to another project. It also says digests are pruned to 10, which the workflow doesn't do (§7.7), and it requires `bun run build:ci` before pushing while CI has no bun (§2.6).
  - **DESIGN.md:** "Four self-hosted variable faces" in one place and "The Three Faces Rule... no fourth webfont" in two others. Rewrite it as four faces, with mono preloaded only where code renders. Its nav section still describes a blue-to-indigo gradient pill, which contradicts the indigo deprecation.
  - **README:** it says covers prefer SVG (AGENTS.md requires WebP), lists `/og/[slug].png` routes that don't exist, and doesn't mention news or courses.

---

## Appendix: evidence and how to reproduce

The scratch scripts and raw outputs are in `/tmp`. They are temporary, so copy anything you want to keep.

| Area | Directory | Re-run |
|---|---|---|
| SEO | `/tmp/seo-audit/` | `cd /tmp/seo-audit && python3 crawl.py && python3 a2.py` (and `a3.py` to `a17.py`) |
| Performance | `/tmp/perf-audit/` | Lighthouse JSON in `lh/`, `lh-exp/`; `node html-stats.mjs`, `node shiki-sim.mjs`, `node img-stats.mjs` |
| Design and a11y | `/tmp/design-audit/` | Screenshots in `shots/`, `axe.json`, `disclosure.txt`; `node shot.mjs`, `node axe.mjs` |
| Content | `/tmp/content-audit/` | `node scan.mjs && node analyze1.mjs && node analyze2.mjs`; `node dupes.mjs`, `node news.mjs` |
| Code | `/tmp/code-audit/` | `orphans.txt` (79 unreferenced images, 10.9 MB) |

Checks run against the working tree:

| Check | Result |
|---|---|
| `bun run check` | 4 errors (HEAD: pass) |
| `bun run lint` | 2 errors (HEAD: pass) |
| `bun run format:check` | 21 files (HEAD: 13) |
| `node --test scripts/*.test.mjs` | 9 of 9 pass |
| `npm audit --omit=dev` | 12 vulnerabilities (9 high) |

Live checks (curl, 2026-11-12):

| URL | Result |
|---|---|
| `/ssh-proxyjump-jumphost/` | 404 |
| `/groq-api-mistral-streamlit/` | 404 |
| `/mcp` | 404 |
| `/search.json` | 404 |
| `/md/news/2026-11-12.md` | 404 |
| Homepage | contains "No videos found." |
| `/_astro/fonts/*.woff2` | two `max-age` values in `Cache-Control` |
| HTML pages | `cf-cache-status: EXPIRED`, `max-age=0` |
