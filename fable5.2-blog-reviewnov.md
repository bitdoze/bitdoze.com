# Bitdoze.com review: design, engagement, usefulness (November 2026)

**Date:** 2026-11-19 · **Commit reviewed:** `9e3de58` (the live homepage matched this build that day) · **Scope:** all page types in EN, plus ES/DE samples, light and dark, desktop and mobile.

Priority scale used here: **P0** = fix this week (risk to traffic, revenue or trust, or visibly wrong on every post) · **P1** = high impact · **P2** = worth doing in the next pass · **P3** = polish.
Size: **S** = one or two files · **M** = several files or a small feature · **L** = editorial batch across many posts.

---

## 1. The short version

The engineering is no longer what holds this site back. Type check, lint, tests and all four validation runs pass. Lighthouse (lab, mobile) scores 92-100 for performance, layout shift is 0 on every content page, the site ships 7.8 KB of external JavaScript plus a few small inline scripts (search loads Pagefind on demand), there is no horizontal overflow in any of 140 page/viewport/theme combinations, and 83 of 140 axe runs come back with zero violations. Every post with an affiliate or referral link (335 of 419) carries its disclosure above the first link. "Updated" dates are honest: of 51 `lastmod` bumps since September 1, 49 came with more than 10 changed lines.

What stands between the site and "perfect" is now product work:

1. **The best features reach almost nobody.** The Quick result box is on 16 of 419 posts, "Tested on" on 10, "takes about N min" on 15. 163 of 178 install/setup/fix guides have none of them.
2. **The page asks before it gives.** On a 1440x900 laptop the cover image pushes the Quick result below the fold, the Dokploy install command sits 15.6 screens down (18 on a phone), and the median guide has 513 words before its first code block.
3. **Trust signals contradict the brand.** Posts show "81 min read" and "108 min read", every one of the 931 post pages ends with a Carrd Black Friday ad, and the Advertise page openly sells dofollow links.
4. **There is no way to come back.** No email capture, no comments, and the "Did this guide work?" widget ends at "Thanks".
5. **The design system leaks at the edges.** Buttons, accordion titles, tab labels and product cards inside articles render in the reading serif; four cover styles share one grid; the homepage has four different left edges.

### Scores

| Lens | Score | Weakest area |
|---|---|---|
| Design health (Nielsen's 10 heuristics, appendix A) | **28 / 40** (Good) | Consistency 2/4, Efficiency of use 2/4 |
| Technical audit (a11y, performance, responsive, theming, integrity) | **16 / 20** (Good) | No dimension below 3 |
| Lighthouse mobile, lab | Perf 92-100 · A11y 96-100 · Best practices 100 · SEO 92 | Listicles (TBT 330 ms), `robots.txt` directive |
| axe-core, 35 pages x 4 combinations | 83 of 140 runs clean | Three serious rule types on public pages, all small fixes |

### The twelve changes that matter most

| # | Pri | Change | Evidence | Size | Section |
|---|---|---|---|---|---|
| 1 | P0 | Stop selling "dofollow backlinks" on `/advertise/` | Listed as a feature of all three paid packages; violates Google's link spam policy | S | 3.1 |
| 2 | P0 | Scope the Carrd Black Friday promo to relevant posts and keep it out of the search index | Renders on 419 EN + 419 ES + 93 DE posts; a search for "carrd" returns all 419 EN posts | S | 3.2 |
| 3 | P0 | Fix the reading-time estimate | 120 posts show more than 30 min, 16 more than 60, max 122; code is weighted 3.3x | S | 3.3 |
| 4 | P0 | Make CI green and add an internal link check to the build | `format:check` fails on 28 files; 3 posts link to a page that does not exist | S | 3.4, 3.5 |
| 5 | P1 | Roll out Quick result + Tested on + time-to-complete to every guide | 15 of 178 guides have a Quick result, 8 have Tested on | L | 5.1 |
| 6 | P1 | Put the answer above the cover image on guides | Quick result starts at y=921 on a 900 px tall screen | S-M | 4.2 |
| 7 | P1 | One typography rule for widgets inside articles | Notice titles, accordion titles, tab labels, buttons and Amazon cards compute to `ui-serif` | S | 4.1 |
| 8 | P1 | Show the best related posts to everyone and rank by tag rarity | Top 3 matches live only in the desktop rail; mobile gets ranks 4-6 | S-M | 5.5 |
| 9 | P1 | Add email capture and close the feedback loop | No subscribe path anywhere; a "No" vote collects no reason | M | 6.1, 6.2 |
| 10 | P1 | Decide the 2027 title policy before January 1 | 164 EN titles contain "2026" (158 ES, 48 DE) | M | 5.4 |
| 11 | P1 | Make search fast and clean | No shortcut, no autofocus, filter panel and yellow highlights leak through, 0.15-0.17 layout shift | S-M | 5.6 |
| 12 | P2 | Homepage: real popularity, quieter video block, guides on the first mobile screen | 3 of 15 "Popular" slots repeat "Latest"; first guide card at y=1133 on a 844 px phone | M | 4.4 |

---

## Implementation status (2026-11-19, same day)

Most of the review is now implemented in the working tree. **Nothing is committed.** The final tree passes `format:check`, `astro check`, ESLint, the node tests and `bun run build:ci` including two new validators. (One `quickAnswer` string was corrected after the last build; it was checked as valid YAML only.)

| Area | Done | Measured after |
|---|---|---|
| 3.1 Advertise | All dofollow, backlink and DR claims removed in EN/ES/DE; placements described as labelled and `rel="sponsored"`; FAQ added; traffic stats updated to the figures you supplied (55K+ visitors, 70K+ page views a month) | 0 matches for dofollow/backlink/DR |
| 3.2 Promo | Renders only on `carrd`-tagged or `web-development` posts, ends Dec 2 (build check plus a client-side guard for cached pages), button goes through `/go/carrd/`; everything after the article body is excluded from search | 67 EN posts instead of 419; searching "carrd" returns 22 posts instead of 419 |
| 3.3 Reading time | 220 wpm for prose plus 10 s per code block | Median 15 min, max 46 (was 20 and 122); Hetzner review 29, Astro i18n 22 |
| 3.4, 3.5 CI and links | Prettier clean; Immich link fixed in three languages; `validate-internal-links.mjs` in the build | Validator reports no broken internal links |
| 4.1, 4.6 Type and notices | Widgets and tables inside articles use the sans stack (tables 15px); notice body text uses the reading ink | Computed fonts verified on notices, accordions, tabs, buttons, product cards |
| 4.2 Answer first | Quick result sits above the cover image | |
| 4.4 Homepage | One left edge, compact start-here rows on phones, three-line card titles, "Recently updated" row, Popular Topics without repeats, three videos with accessible links, AI-tools line removed, hero copy matches the archive | Hero and section headings both start at x=240; axe clean |
| 4.5, 5.5, 5.7 End of article | Order is next step, feedback, promo (when relevant), tags, related, follow, author, services. New Next-step card (frontmatter `next`, then series, then Self-Hosted Journey with "Stage N of 12"). Related posts: best three for everyone, ranked by tag rarity, optional `related` field | Dokploy guide now shows Coolify install, Dokploy compose and the PaaS comparison |
| 4.7, 4.10 Small fixes | TOC button hides while scrolling down, TOC active state fixed, accordion code size, Key Features icon, related meta wrap, SVG diagrams fit the column, empty "text" chip removed, lightbox image created on demand, tabs remember the choice | Axe clean on the sampled posts |
| 4.8, 5.6 Search | Overrides now win, input autofocus, `/` and Ctrl/Cmd+K, category chips as empty state | Layout shift 0.07-0.08 on desktop with a prefilled query (was 0.15-0.17), 0 on mobile |
| 4.9 Other pages | Header starts with "Guides" (Home and Advertise left the bar), blog archive has category chips and a search field, Resources copy rewritten and logos self-hosted, About cards rewritten, Services buttons blue, footer headings fixed | Resources: 0 external image hosts (was 17) |
| 6.2, 6.7 Feedback and events | A "No" vote asks for one of four reasons and links to the contact form with the guide prefilled; new events `guide_feedback_reason`, `copy_code`, `toc_click`, `subscribe_submit`, plus `el` on `affiliate_click` | Click-through tested in a browser, no script errors |
| 6.1 Email | Form built into the follow box, switched off until `newsletter.action` is set in `src/config/config.json` | |
| 5.4, 5.9, 5.11 Validators | Build fails when a title year is older than the `lastmod` year; warnings for long titles and descriptions per locale and for long digests | |
| 8 Performance | Amazon images requested at 500px, charset first in `<head>`, RSS self links fixed | |
| 4.11 Docs | DESIGN.md, AGENTS.md and PRODUCT.md updated to match | |
| 5.1 Quick results | Added to six guides, written from each guide's own commands: Coolify, Dockge, CrowdSec, YABS benchmark, SSH hardening, Ollama. Please check them against your lab | |

**Not done, because each needs you:**

- **Tested on / takes about.** Not generated; AGENTS.md says they are hand-filled. The remaining guides also still need a Quick result.
- **2026 titles.** No title was edited. The policy is in AGENTS.md and the validator enforces it.
- **Newsletter provider, comments, Amazon stars and prices, the `Content-Signal` line in `robots.txt`.** Decisions from section 7.4 and 6.3.
- **Photos** for How I Test and About, and the cover re-covers (4.3).
- **Content rewrites:** the fast-path guide skeleton (5.2), code-block filenames and pinned versions (5.3), the 16 untouched posts (5.8), digest length and AI note (5.9), ES/DE length fixes (5.11).
- **Mobile table-of-contents bar (4.7)** was replaced by the simpler hide-on-scroll button.
- **Smaller items left as they were:** `content-visibility` on product cards and the CSS-only reading-progress bar (8.2), full-text and per-category RSS (6.6), `imageAlt` on the 301 posts without it (5.10), affiliate link density in the gift guide (7.3), "(EN)" markers in the German menu (4.9), and `de` in the Astro i18n config (4.11).

---

## 2. How this was checked

- **Code:** read the layouts, header/footer, post template, home, widgets, global CSS, SEO component, i18n and content schema.
- **Content:** a script parsed the frontmatter and body of all 931 posts (word counts, code blocks, links, widgets, dates, tags, disclosure position, reading time as shipped). A second script walked git history for every `lastmod` change since September 1.
- **Built output:** inspected `dist/` (HTML weight, head tags, JSON-LD, feeds, sitemaps, headers) and compared the live homepage with the local build.
- **Rendering:** 35 representative pages loaded in headless Chromium at 1440x900 and 390x844, light and dark (140 runs): 444 screenshots, axe-core on each run, plus measurements for overflow, tap targets, text sizes, images, headings, LCP element and layout shift.
- **Lighthouse 12.8** on 5 URLs (mobile) and 2 (desktop) against a local static server with gzip.
- **Project checks:** `astro check`, ESLint, Prettier, node tests, the four validators.
- **Design:** judged from the screenshots first, then compared with the deterministic detector and axe output. Method note: the visual assessment was completed before any detector or axe result was opened.

**Limits.** No access to Plausible or Search Console, so nothing here is based on real traffic or rankings. Field Core Web Vitals were not available (the PageSpeed API quota was exhausted), so performance numbers are lab numbers. No guide was executed on a server. News digest facts were not verified. Whether a given guide was really tested cannot be judged from the repo; only the visible proof can.

---

## 3. Fix this week (P0)

### 3.1 The Advertise page sells links that pass ranking credit

`src/components/views/AdvertiseView.astro` lists "A dofollow backlink on a DR 24-32 domain" as a feature of all three packages (Premium Banner $300/month, Sidebar $200/month, Sponsored Article $250), and "Quality Backlinks: Get valuable dofollow backlinks" as a benefit (lines 49, 72, 87, 101, repeated for ES and DE). The page is indexable.

Google's spam policies treat selling links for ranking purposes as link spam unless the link carries `rel="sponsored"` or `rel="nofollow"`. A public page that prices followed links is the easiest possible evidence for a manual action, and a manual action on outbound links damages trust in the whole domain. For a site that lives on organic traffic this is the largest single risk in the repo. None of the earlier reviews in this repo mention it.

Two more problems on the same page:

- The stats are internally inconsistent: "27K+ Unique Visitors, 30K+ Page Views, 41K+ Page Sessions". Sessions cannot exceed page views.
- "Featured on top of every page" and "Bypass any adblocker" describe exactly the ad-cluttered site that PRODUCT.md rules out.

**Do:**
1. Remove every "dofollow" and "DR" claim. State that all paid placements are labelled "Sponsored" and use `rel="sponsored"`.
2. Sell reach and fit (audience, topics, the public analytics dashboard), not link equity.
3. Fix the three traffic numbers from Plausible and add the month they refer to.
4. For sponsored articles, state that Bitdoze keeps editorial control and that the post is labelled.

### 3.2 A Black Friday ad on all 931 posts

`src/layouts/PostLayout.astro:355` renders `<CarrdBFPromo>` unconditionally, directly after the last paragraph and before tags, related posts and feedback. Verified in the build: 419 of 419 EN posts, 419 ES, 93 DE.

- A Carrd deal under a Dokploy install guide is the "billboard" that PRODUCT.md principles 3 and 5 forbid, in the most valuable slot of the page.
- The promo sits inside `<article data-pagefind-body>`, so its text is indexed with every post. Measured with the Pagefind API: "carrd" returns **419** EN results, "black friday" 422, "BF2026" 20. The related-post titles, follow box and author line are indexed the same way ("rss" returns 420, "netbird" returns 41 results for 15 posts that mention it).
- There is no expiry. On December 1 it becomes a stale ad on every page.
- Its button goes to `go.bitdoze.com/carrd`, not a first-party `/go/` page, so it is missing from the `affiliate_click` report.

**Do:**
1. Render the promo only where it fits (tag `carrd`, or category `web-development`), and give the component an end date.
2. Add `data-pagefind-ignore` to the promo, the tag row, `RelatedPosts`, `DidThisWork`, `FollowBox` and the author block (or move `data-pagefind-body` to the header plus the prose wrapper).
3. Route the button through `/go/carrd/`.

### 3.3 Reading time is wrong, and it scares people off

`src/utils/readingTime.ts:40` divides code words by 0.3, so every word of code counts 3.3 times, and MDX imports and component props are counted as words too.

| Post | Shown | Prose only at 200 wpm |
|---|---|---|
| `hetzner-cloud-review` | 81 min read | 26 min |
| `astro-i18n-localization` | 108 min read | 11 min |
| `carrd-popup-modal` | 83 min read | 20 min |
| `termix-self-host` | 71 min read | 23 min |

Across 419 EN posts the shown median is 20 minutes; 120 posts show more than 30, 40 more than 45, 16 more than 60. The same number appears on cards, related posts and the news digest ("14 min read"). A searcher who is "mid-task and short on patience" reads "81 min" as "leave". Nobody reads a compose file word by word; they copy it.

**Do:**
```ts
// Prose at reading speed, code at a flat glance per block, MDX plumbing ignored
const prose = text
  .replace(/^import\s.+$/gm, "")
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/<[^>]+>/g, " ");
const words = prose.split(/\s+/).filter(Boolean).length;
const blocks = (text.match(/```/g)?.length ?? 0) / 2;
const minutes = Math.max(1, Math.round(words / 220 + (blocks * 10) / 60));
```
The function has four call sites (`PostLayout`, `NewsLayout`, `PostCard`, `RelatedPosts`), so one change fixes headers, cards and the digest. Then prefer `timeToComplete` wherever it exists (only 11 of 178 guides have it today, see 5.1), and say "min to follow" on guides instead of "min read".

### 3.4 CI fails at the format step

`bun run format:check` exits 1 on 28 files (among them `PostLayout.astro`, `HomeView.astro`, `ui.ts`, `StartHere.astro`, `DidThisWork.astro`, `FollowBox.astro`, `affiliate-links.json`). `.github/workflows/ci.yml` runs that step before tests and build, so the job stops there and never reaches the build. Everything else is green: `astro check` 0 errors in 171 files, ESLint clean, 9 of 9 node tests, 223 affiliate products and 3,228 rendered links validated, 895 canonicals validated.

**Do:** run `bun run format` once and commit. Add a pre-commit hook so it stays green.

### 3.5 One broken internal link in three languages

`/immich-docker-compose-self-hosted-google-photos/` does not exist. It is linked from `src/content/posts/migrate-synology-to-ugreen-nas.mdx:151` and from the ES and DE translations. The existing Immich guide is `/immich-self-hosted-jpeg-xl/`.

**Do:** fix the three links, then add a build step that fails on any internal `href` without a matching file in `dist/`. The build already validates affiliate links and canonicals this way; internal links are the missing check.

---

## 4. Design

### What already works (keep it)

- The terminal motif is a real identity: the hero terminal, the route-map terminal on `/self-hosted/`, mono labels, dark code blocks with a language bar and a Copy button, the green Quick result box. A reader can tell this site from a generic blog template.
- One blue, native fonts, calm surfaces. The detector found no gradient text, no glass effects and no purple palette. The AI-blog look from the July critique is gone.
- The dark theme is a designed twin and holds up on every page type.
- The post header is the best-designed element on the site: "Updated September 11, 2026 · Published June 11, 2024 · takes about 30 min" plus "Tested on: Ubuntu 24.04 · Debian 12".
- `/self-hosted/` is the strongest page: 12 stages, 91 guides, one path. It is what the homepage should aspire to.
- The 404 page prefills search from the dead URL.

### 4.1 Widgets inside articles use the wrong typeface (P1, S)

`.prose { font-family: var(--font-serif) }` (`src/styles/global.css:385`) is inherited by every `not-prose` widget, because `not-prose` only switches off the typography plugin's element styles. Computed fonts on real pages:

| Element | Computed font | Should be |
|---|---|---|
| Notice title | `ui-serif` 18px 600 | sans |
| Notice body | `ui-sans-serif` 14px | sans (ok) |
| Accordion title | `ui-serif` 18px 600 | sans |
| Tab label | `ui-serif` 16px 600 | sans |
| Button ("Hetzner €20 Free") | `ui-serif` 16px | sans |
| Amazon card: description, "Check Price on Amazon", "Key Features", pros/cons items | `ui-serif` | sans |
| Amazon card: product name, "What we like" | `ui-sans-serif` | sans (ok) |
| Table cells | `ui-serif` 16px | sans, smaller |

One product card mixes both faces, and buttons in a serif look like a styling accident. DESIGN.md says UI chrome stays on the sans stack.

**Do:**
```css
/* Widgets inside articles use the UI face. Nested .prose regions (accordion and
   tab bodies) still match the .prose rule directly and stay serif. */
.prose .not-prose { font-family: var(--font-sans); }
.prose table { font-family: var(--font-sans); font-size: 0.9375rem; }
```
`ListCheck` becomes sans with this rule; add `font-serif` to its container if checklists should read as body text. Sans tables at 15px also fit one more column on a phone (today a three-product comparison shows two).

### 4.2 The cover image takes the first screen on guides (P1, S-M)

Measured positions of the Quick result box:

| Post | Desktop 1440x900 | Mobile 390x844 |
|---|---|---|
| `dokploy-install` | y=921 (below the fold) | y=759 (bottom edge) |
| `tailscale-setup-guide` | y=945 (below the fold) | y=786 (bottom edge) |
| `fix-ssh-too-many-authentication-failures` | y=845 (just visible) | y=689 |

The cover is 378 px tall on desktop and decorative. The reference in PRODUCT.md, DigitalOcean tutorials, has no hero image. The site's best trust feature and its fastest answer are hidden behind a picture.

**Do**, in order of preference:
1. On posts with `quickAnswer`: title, meta, Quick result, then the article. Move the cover below the Quick result or drop it from the page (keep it for cards and `og:image`). The H1 becomes the LCP element, which is faster than any image.
2. Otherwise cap the cover at a 16:6 strip on guides.

### 4.3 Four cover styles in one grid (P2, M)

The blog index shows flat light covers with a miniature UI screenshot (NetBird, Tailscale), photographic desk scenes with a title overlay (gadgets, NAS), an icon-plus-text cover (Carrd) and a dark illustration (OpenOrange). Older posts add a fifth: blue gradients with pixel fonts ("Dokploy Setup", "FIX", "5 Year Tested" with stars). AGENTS.md still mandates flat SVG covers only, so the photographic covers break the documented rule.

**Do:** decide and write it down. Suggested rule: hardware and buying guides get photo covers; guides get the flat system with the product logo and a three-word title that stays legible at 320 px (the miniature screenshots are noise at card size). Re-cover the 20 most-linked legacy posts first.

### 4.4 Homepage (P2, M)

- **Guides are not on the first screen.** Desktop: the "Latest guides" heading sits at y=864 and the first card at y=973 of a 900 px viewport. Mobile: three stacked Start-here cards take about 590 px, pushing the first guide card to y=1133. The comment in `Hero.astro` says guide cards "must peek above the fold"; they do not. On mobile, turn Start-here into three compact rows (icon and title, no description).
- **"Popular Topics" is not popularity.** `PopularTopics.astro:32-46` picks the three most frequent tags (self-hosted 84, docker 79, ai-tools 46) and lists their newest posts. The tags overlap, so 15 slots hold 13 unique posts, and 3 of them repeat "Latest guides" above. The NetBird guide appears three times on the page. Feed it from Plausible's top pages (a JSON file refreshed weekly) or curate it, and exclude posts already shown.
- **The YouTube block is the loudest thing on a calm page.** Thumbnails read "$200 FREE", "CANCEL YOUR $20 PLAN?", "FREE AI CODING" under a heading that says "The same guides, on video". They are not the same guides. The six thumbnail links also have no accessible name (the only serious axe violation on the homepage), open youtube.com in a new tab instead of the on-site lesson or guide, and print dates in `en-US` in all three locales. Show three videos as compact rows, link to the matching guide or `/courses/` lesson when one exists, and give the thumbnail link `aria-hidden="true" tabindex="-1"` as `PostCard` already does.
- **Four left edges.** At 1440 px: header logo and footer at x=112, hero headline at 168, sections at 240, the YouTube heading at 232. Use one container width for hero and sections.
- **Card titles are cut.** All six latest-guide titles are clipped at two lines. Allow three lines for the title and two for the description.
- **"Free AI tools: Title Generator · Thumbnail Ideas · Script Generator"** at the bottom points to creator tools on another domain. They do not serve this audience; remove them from the homepage.

### 4.5 The end of the article is a stack of seven modules (P1, M)

After the last paragraph of `dokploy-install` come: Carrd promo, tags, three related cards, "Did this guide work?", the follow box, the author block with six share icons, and a services line. That is 22 links and buttons, 1,174 px on desktop (1.3 screens) and 2,189 px on mobile (2.6 screens), of which the three image cards take 1,159 px. PRODUCT.md principle 5 asks for one next step.

**Do:** reorder and slim down.
1. **Next step** (new): one curated link, from a `next:` frontmatter field, the series, or the reader's position in the Self-Hosted Journey.
2. **Did this guide work?** directly after the content, while the result is fresh.
3. **Related:** three title rows on mobile instead of image cards.
4. **Author:** one line with credentials and a "How I test" link; one Share button (Web Share API on phones) instead of six icons.
5. **Subscribe/follow:** one line (see 6.1).

The author block also needs repair: the bio is squeezed into a column about 20 characters wide beside the share icons, and it says only "Dragos is the author of Bitdoze — practical DevOps, programming, and self-hosting guides." This is where "DevOps engineer, 10+ years, runs the lab these guides come from" belongs.

### 4.6 Notices set whole paragraphs in colour (P2, S)

`Notice.astro:9-34` renders body text in blue-700, yellow-700, green-700 or red-700 on a tint. Contrast passes, but a blue paragraph reads like one long link, and amber on yellow is the hardest text on the page. DESIGN.md asks for a tint, a border and an icon; it does not ask for coloured prose. Use the reading ink for the body and keep the colour for the icon, the title and the border.

### 4.7 Mobile reading (P2)

- **The table-of-contents button floats over the text.** The 44 px circle sits bottom-right over the ends of lines, code and table cells on every screen. Options: a slim "On this page" bar under the header that shows the current section, or hide the button while scrolling down and show it on scroll up.
- **Code inside accordions is 11.4 px on phones.** `Accordion.astro:106-110` sets `code { font-size: 0.875em }`, which compounds with the 13 px block size (13 x 0.875). That is where the troubleshooting commands live. 439 text nodes rendered at this size across the 35 sampled mobile pages. Scope the rule to `:not(pre) > code`.
- **Pages are long.** `gifts-for-programmers` is 63.5 screens on a phone, `hetzner-cloud-review` 37, `dokploy-install` 31. See 5.2 and 8.2.

### 4.8 Search page (P1, S)

The overrides in `SearchView.astro:77-118` lose to `pagefind-ui.css`, which loads later with equal or higher specificity (`.pagefind-ui--reset mark{all:revert}`, `.pagefind-ui__filter-panel.svelte-…{display:flex}`). Result:

- The "Locale: en (307)" filter panel shows although the code hides it; a "Locale: en" chip sits under results.
- Highlights are browser yellow in light mode. In dark mode they are black text on dark blue at **2.3:1** (14 nodes), the worst contrast failure on the site.
- The footer jumps when results render: layout shift 0.15-0.17, the only page above zero.
- The input is not focused on load, so the header's search icon costs a second tap.

**Do:**
```css
#search .pagefind-ui__filter-panel,
#search .pagefind-ui__result-tags { display: none; }
#search .pagefind-ui mark { background: #dbeafe; color: inherit; border-radius: 0.25rem; padding: 0 0.1em; }
.dark #search .pagefind-ui mark { background: rgb(96 165 250 / 0.35); color: #f9fafb; }
```
Call `input.focus()` where the script already sets the `aria-label` (line 149), and reserve more height for the results container.

### 4.9 Secondary pages

| Page | Finding | Fix | Pri |
|---|---|---|---|
| `/resources/` | Copy uses the voice the brand forbids: "powerful" x4, "supercharge" x2, "seamless" x2, "lightning-fast" x2, "unleash", "cutting-edge", "blazing" across 21 entries. Logos are hotlinked from 17 third-party hosts (11 of them are `favicon.ico` files); 21 of 26 images have no dimensions. | Rewrite each entry as "what I use it for, what the free tier really gives, the catch". Self-host the logos as SVG. | P1 |
| `/about/` | "What I Do" cards read "Content Writing: I write content on my blogs." / "DevOps: DevOps on my business." / "Web Design: Web Design on WordPress and Astro". | Make this the proof page: the lab with a photo, years and roles, numbers (guides, videos), a link to How I test. | P1 |
| `/how-i-test/` | Strong text, no picture. | Add real photos of the rack and desk and a screenshot of the VPS fleet. Nobody can fake those at scale. | P1 |
| `/blog/` | 42 pages of pagination, no category chips, no search field. | Add a chip row (All, Self-hosting, AI, Linux, Web dev, WordPress, Hosting, Tools, Hardware) and a search field. | P2 |
| `/categories/` | A bare list of eight names with counts. | Add each category's description and its three start-here guides (category pages already have that strip). | P3 |
| `/services/` | "View service" buttons are black, the only non-blue primary buttons on the site. | Use the standard blue button. | P3 |
| Header | Nine text items plus search, language and theme. "Home" duplicates the logo, "Advertise" holds a prime slot for a B2B page, and "Blog" (the archive, target of the hero button) is hidden under "More". Web Development (67 posts) has no top-level entry. | Drop Home and Advertise from the bar (footer keeps Advertise), promote "Guides". | P2 |
| DE pages | The German menu links to the English `/services/` and `/news/` without saying so. | Add an "(EN)" marker or hide them. | P3 |

### 4.10 Small visual bugs (P3 unless noted)

- **"Key Features" icon is a clipped blob** on every Amazon card: a 24 px outline path is drawn as a fill in a 20 px viewBox (`AmazonProduct.astro:220-226`).
- **Related-post meta wraps into ragged columns** on desktop ("November 11, / 2026 · 15 min / read"). Use the short date and `whitespace-nowrap`.
- **Inline SVG diagrams are cut off.** Diagrams with `width="800"` sit in a 672 px column, so the last step of the Dokploy install path is hidden behind a scroll with no hint, and axe flags the figure as a scrollable region without keyboard access (P2). Draw diagrams at column width or let them scale.
- **Active sub-items in the table of contents fail contrast** at 4.44:1 (P2). `PostHeadings.astro:386-398` adds `text-blue-600` but never removes `text-gray-500`, so H3 entries stay gray on the blue highlight. Switch to `aria-current="true"` and style it in CSS.
- **Unlabeled code blocks show a "text" chip** (384 of 6,227 EN blocks).
- **The lightbox ships an `<img alt="">` with no `src`** in every post (`PostLayout.astro:596`). Create the image when the dialog opens.
- **10 px category chips and 11 px card meta** are below the 12 px label size in DESIGN.md (32 detector hits for off-scale sizes).

### 4.11 The design docs describe a different site (P2, S)

- DESIGN.md: cards have no border, a mid shadow and scale 1.02 on hover. Shipped: border, small shadow, 2 px lift.
- DESIGN.md: article ending is tags, author box, services promo, related. Shipped: promo, tags, related, feedback, follow, author, services line.
- DESIGN.md "Do": body text at #111827. Shipped reading ink: #374151.
- AGENTS.md: flat SVG covers only. Shipped: photo covers.
- AGENTS.md: digests run 5-8 minutes and each item has a "Why it matters" line. Shipped: 2,400-3,200 words, and the last two digests contain the phrase zero times.
- PRODUCT.md: English and Spanish, 409 + 407 guides. Shipped: three locales, 931 posts. `astro.config.mjs` also lists only `en` and `es`.

Agents follow these files. Update them in the same commit as the change they describe.

---

## 5. Usefulness

### What already works (keep it)

- The refreshed guides are good. `dokploy-install` warns before the `iptables -P INPUT DROP` step, tells the reader to keep a root session open, gives a verify command after each stage, lists the six ways the install script fails, and says "I haven't tested this guide there" about ARM. That is the voice the brand promises.
- 185 posts have a verify-style heading and 182 a troubleshooting section.
- Internal linking is dense: median 13 in-body links per post, and only 12 of 419 posts have no inbound link from another post.
- Freshness is real: 390 of 419 EN posts were published or updated in the last 180 days, and the updates are substantial (49 of the 51 `lastmod` bumps since September 1 changed more than 10 lines).
- All 335 EN posts with an affiliate or referral link carry disclosure wording above the first link.
- Metadata is disciplined in English: 9 titles over 65 characters, hreflang and JSON-LD are correct on every page checked.

### 5.1 Roll out the proof layer (P1, L)

| Field | All EN posts | Guide-type posts (178) |
|---|---|---|
| `quickAnswer` | 16 (3.8%) | 15 |
| `testedOn` | 10 (2.4%) | 8 |
| `timeToComplete` | 15 (3.6%) | 11 |

The hero says "400+ guides tested end to end" and How I Test says every command was run by the author. The visible proof exists on 10 posts. This is the highest-leverage editorial work on the site, because the same three fields fix findings 3.3, 4.2 and 7.1 at once.

Start with the guides that the rest of the site links to most and that still lack a Quick result:

`sever-monitoring` (48 inbound links), `crowdsec-secure-server` (47), `traefik-proxy-docker` (43), `beszel-uptime-kuma` (40), `dockge-install` (40), `ollama-docker-install` (33), `build-astro-blog-free` (31), `clawdbot-setup-guide` (29), `dokploy-backups-cloudflare-r2` (29), `mcp-introduction-beginners` (29), `docker-bypasses-firewall` (28), `dokploy-docker-compose-app` (26), `secure-ssh-server-linux` (25), `benchmark-cloud-servers` (24), `coolify-install-heroku-alternative` (24).

Then order the rest by Plausible page views. Add the app version to `testedOn` ("Dokploy 0.x", "Uptime Kuma 2.x"): the OS alone does not tell a reader whether the guide matches what they are installing. That matters because 92 compose snippets in 46 posts use `:latest` and 39 more have no tag, so the reader's install can differ from the tested one.

Make the status visible on cards with three labels: **Tested** (has `testedOn`), **Compared** (research roundup) and **News**. The site already separates "Tested" from "Compared" in titles; cards should show it too.

### 5.2 Get to the first command sooner (P1, L)

For the 178 guide-type posts, the median is **513 words** before the first code block; a quarter have more than 859, and 49 have more than 800. In `dokploy-install` the actual install command is at y=14,072 on desktop: 15.6 screens down, after prerequisites, a features section, a diagram, two videos (one titled "Older Video"), SSH hardening, swap and CrowdSec.

The hardening content is valuable. The order is the problem for a reader who already has a server.

**Do:** adopt one skeleton for guides.
1. Quick result (one command, one outcome).
2. "What you'll have at the end" and prerequisites, as two short boxes.
3. **Fast path:** the minimum commands, each with its verify line.
4. **Full path:** hardening and production notes, clearly marked optional for a first run.
5. Troubleshooting, then the next step.

Move "Features" and "What is X" below the install or into the comparison post. Keep one video and put older ones in a collapsed block.

### 5.3 Code blocks (P2, L)

- **Filenames.** The ` ```yaml title="docker-compose.yml" ` feature exists and is used **zero** times. There are 374 YAML blocks and about 400 config blocks where the reader must infer which file to edit from the sentence above.
- **Unlabeled blocks.** 384 blocks have no language and show "text". Label command output as `output` so a reader never pastes it.
- **Pinned versions.** See 5.1. Pin the tested tag in the compose file or name the tested version next to it.
- **Tabs do not remember the choice.** On a guide with Linux, Docker and macOS tabs, the reader reselects on every tab group. Store the last choice and apply it to all groups with the same names.

### 5.4 The 2027 title cliff (P1, M)

164 EN titles contain "2026" (158 ES, 48 DE); two already say 2027. By category: AI 44, self-hosting 43, web development 24, Linux 18, hosting 13, gadgets 9, tools 8, WordPress 5. 44 of them are install or how-to guides, where a year adds nothing and ages the page.

**Policy to adopt now:**
1. **Evergreen guides** (install, setup, fix): remove the year from `title` and `meta_title`. The "Updated" line and `dateModified` carry freshness.
2. **Reviews, pricing and comparisons:** keep the year and change it only when the content was re-checked that year, with `lastmod` bumped in the same commit.
3. **Roundups:** refresh in traffic order through January and February. Do not bulk-rename; a 2027 title on 2026 facts is the fastest way to lose the trust the "Updated" dates have earned.
4. Add a validator: a title year older than the `lastmod` year fails the build.

### 5.5 Related posts (P1, S-M)

`PostLayout.astro:142-148` gives the three best matches to the desktop rail, which exists only at 1280 px and up, and passes the leftovers to the bottom section that everyone sees.

| Post | Desktop rail (best) | Bottom section (everyone) |
|---|---|---|
| `dokploy-install` | Coolify install, Dokploy compose app, NetBird | Tailscale, 125 Docker containers, Cloudflare Workers apps |
| `traefik-proxy-docker` | Traefik basic auth, Traefik redirect, Traefik wildcard cert | NetBird, HolyArrs, Immich |

A phone reader of the Traefik guide never sees the three other Traefik guides. The ranking itself (`relatedPosts.ts`) counts shared tags equally, so "self-hosted" (84 posts) weighs the same as "dokploy" (7), and ties fall to the newest post. That is why most of the other Dokploy guides lose to whatever was published this week.

**Do:**
1. Use the top three at the bottom for everyone. The rail keeps the table of contents.
2. Weight shared tags by rarity and add series and manual overrides:
```ts
const idf = (tag: string) => Math.log(totalPosts / (tagCounts.get(tag) ?? 1));
const score = sharedTags.reduce((s, t) => s + idf(t), 0) + (sameSeries ? 3 : 0) + (sameCategory ? 0.5 : 0);
```
3. Add an optional `related: [slug, slug]` frontmatter field for money pages.

### 5.6 Search (P1, S-M)

- **No shortcut.** `/` and Ctrl+K do nothing. For this audience a shortcut is expected. Bind both to the search page (or a dialog).
- **Polluted index.** See 3.2. After excluding the end-of-article modules, "carrd" should return about 22 posts (the number that mention it), not 419.
- **Relevance.** The top five for "docker" are `copy-multiple-files-in-one-layer-using-a-dockerfile`, `install-docker-ubuntu-arm`, `docker-bypasses-firewall`, `docker-run-python`, `podman-vs-docker`. The 125-container pillar and the commands reference are not there. Pagefind supports `data-pagefind-weight` and ranking options; raise the weight of titles and test lower page-length bias.
- **Empty state.** Before a query the page is a bare input. Show the start-here guides and the eight categories.
- Fix the page itself per 4.8.

### 5.7 Clusters without a path (P2, M)

Series exist for 27 posts, but the biggest clusters are not in one: Dokploy (7 posts tagged, 0 in a series), Traefik (4, 0), Fish shell (14, 0), Carrd (18, 0). The 91 posts on `/self-hosted/` do not show their place in the journey; `PostLayout.astro` has no reference to it.

**Do:** show "Stage 5 of 12 · Self-Hosted Journey" with previous and next links on those 91 posts (the data is already in `src/data/self-hosted-journey.ts`), and turn the four clusters into series or small hubs.

### 5.8 Sixteen posts the refresh never reached (P2, M)

Sixteen posts published before 2026 have not been touched this year: ten from 2023, one from 2024, five from 2025. Four of them are linked from ten or more other posts: `install-docker-ubuntu-arm` (22), `cleanup-all-docker-things` (13), `updating-container-docker-compose` (13), `agno-squad` (10).

They still carry the old voice. `fix-ssh-too-many-authentication-failures` opens "Let's face it, the world of servers and hosting can be as exciting as it is frustrating" and ends "Happy hosting!", under a Quick result box added later. It explains the error only loosely: it never says that the SSH client offers every key in the agent until the server's `MaxAuthTries` limit is reached, so the reader cannot tell which of the three fixes applies. `fix-rpm-transaction-lock-waiting` is 124 words; `plausible-tool` is 250.

**Do:** rewrite the four well-linked ones first; then merge, expand or redirect the rest. Full list in appendix D.

### 5.9 News digest (P2, S-M)

- **Length against the promise.** The homepage card says "five minutes, no filler" and AGENTS.md says 5-8 minutes. The last ten digests run 2,328-3,206 words (19 list items in each of the last two); the page says "14 min read" (the estimate is inflated, but 2,800 words is still about 13 minutes). Either cut to the top 8-10 items or change the promise.
- **"Why it matters"** is required by the contract and absent from the last two digests. It is the only part a reader cannot get from Hacker News.
- **Disclosure.** `content.config.ts` describes the digests as written by an AI agent. The page shows no such note and the structured data names Dragos Balota as author. Add one line ("Compiled by an AI agent from the linked sources, reviewed by Dragos") if that is the process. Bitdoze operates from the EU, and Article 50 of the AI Act has transparency rules for AI-generated text published to inform the public, with an exception when a human reviews it and takes editorial responsibility. Check with someone qualified how and from when that applies here.
- The jump-chip row is cut off on desktop and mobile with no scroll hint.

### 5.10 Images that work against trust (P1, M)

`gifts-for-programmers` uses desk photos whose alt text reads like an image prompt and is shown as a visible caption: "Clean wooden programmer desk in natural morning daylight featuring a low-profile mechanical keyboard, ergonomic wireless mouse, aluminum precision bit kit, travel router, mug, and charcoal gift box". A reader takes a desk photo in a gift guide to be the author's desk.

**Do:** use real photos where the article says "tested", label illustrations as illustrations, and write captions that add information or leave them off. The caption plugin turns every alt text into a caption, so add a way to opt out (for example an alt text starting with a marker). Also add `imageAlt` to the 301 EN posts that lack it (118 of 419 have it).

### 5.11 Spanish and German (P2, M)

- **SERP lengths.** ES: 125 titles over 65 characters, 311 descriptions over 160. DE: 66 of 93 descriptions over 160. English is clean (9 and 54). Add the length check to the build for all locales.
- **Stale translations:** 16 Spanish posts are older than their English source.
- **German** went from 0 to 93 posts in under a week. Treat it as an experiment with an exit rule: if Search Console shows no impressions for the German pages after six to eight weeks, stop translating and keep only the pages that earn traffic. Have a native speaker read the ten with the most impressions.

---

## 6. Engagement

A reader who solves their problem today has no reason and no means to return. Search brings them once. Everything below is about the second visit.

### 6.1 Email capture (P1, M)

There is no subscribe path. The follow box offers RSS, News RSS and YouTube; the Spanish copy says "sin boletín todavía" (no newsletter yet). Earlier reviews flagged this and it is still waiting on a provider decision.

**Do:**
- One inline field in the follow box and at the end of the news digest. No popups, in line with the brand.
- Promise something specific: "One email a week: what I tested, what broke, what changed." The material already exists in the refresh commits and the digest.
- Any provider works. A self-hosted listmonk would fit the brand and become a guide of its own.
- Double opt-in, and add the processor to the privacy policy.
- Track `subscribe_submit` in Plausible with the page path.

### 6.2 Close the "Did this guide work?" loop (P1, S-M)

`DidThisWork.astro` sends `guide_feedback` with the slug and the vote, then shows "Thanks". A "No" is the most valuable signal the site receives, and it arrives without a reason.

**Do:**
- On **No**, show four chips: "A command failed", "The UI or version changed", "A step is missing", "Something else". Send the choice as a property, plus a link to `/contact/?guide=<slug>` for details.
- On **Yes**, show the next step and the subscribe line.
- Review the "No" votes weekly. How I Test already promises that failed-guide reports go to the top of the queue; this is how to keep that promise.
- After a re-test, the "Tested on" line can carry the date. That turns feedback into visible proof.

### 6.3 A place for questions (P2, M)

There are no comments. For install guides, the question under the article ("this fails on Debian 13 with…") is often what the next searcher needs, and it shows the page is alive.

**Do:** if you will answer within a few days, add Giscus (GitHub Discussions) loaded only after a click on "Questions about this guide", so it costs nothing until used. If you will not moderate, add a single "Report a problem with this guide" link instead. An unanswered comment section is worse than none.

### 6.4 One next step per guide (P1, M)

See 4.5 and 5.7. The conclusion of `dokploy-install` already names the right order in prose (backups, then monitoring, then a second app). Make that a component: one card, one link. This is the cheapest way to raise pages per visit, and it replaces the promo slot with something useful.

### 6.5 Homepage as a reason to return (P2, M)

- Add a "Recently updated" row beside "Latest": 51 real refreshes in ten weeks is a selling point nobody sees.
- Replace "Popular Topics" with real popularity (4.4).
- Link videos to their on-site guide or lesson (4.4). 203 EN posts already embed a video; the course pages remember progress in local storage. That loop is built and the homepage skips it.

### 6.6 RSS (P3, S)

- All four feeds publish a self link with a double slash: `https://www.bitdoze.com//rss.xml` (`src/pages/rss.xml.ts:40`). Build it with `new URL("rss.xml", context.site)`.
- The feeds carry summaries of 30 items. Developers who use a feed reader tend to prefer full text; consider it for the guides feed.
- Offer per-category feeds. A Linux reader does not want hardware roundups.

### 6.7 Measure it (P2, S)

Only two custom events exist: `affiliate_click` and `guide_feedback`. Add `copy_code` (with the block index), `toc_click`, `search` (with a flag for zero results), `subscribe_submit` and a 75% scroll mark on posts. Then watch five numbers weekly: share of guide visits with a copy event, yes/no ratio per guide, pages per visit from posts, affiliate clicks per 1,000 guide views, new subscribers.

---

## 7. Trust, positioning and money

### 7.1 The headline claim outruns the visible proof (P1)

"400+ guides tested end to end" counts every post, including roundups, reviews and gift guides. In the last 90 days the site published 113 EN posts (8.8 per week). Sorted by title, that is 35 guides, 52 roundups, reviews or comparisons and 26 others, plus 175 ES and DE posts, a daily digest and 51 refreshes of existing posts since September. A reader, or a quality rater, who sees that cadence beside "every command is one I ran myself" will want evidence, and today it is on 10 posts.

**Do:** make the claim countable. Count only posts that carry a "Tested on" line, print that number in the hero once the rollout in 5.1 has covered the main guides, and until then say "400+ guides; tested ones list the versions they ran on". An exact, smaller number is more convincing than a round, larger one.

### 7.2 The pitch and the archive have drifted apart (P2)

The hero promises "Docker, VPS, CI/CD, and self-hosted tools". Only one post has CI/CD in its title or tags (`forgejo-woodpecker-ci-cicd`). AI is the second-largest category with 104 posts, 79 of them from 2026, and roundups, reviews and comparisons make up 52 of the last 113 posts. Either write the CI/CD cluster or change the sentence to what the site is: Docker, VPS, self-hosted apps, homelab hardware and AI developer tools.

### 7.3 Affiliate density (P2)

`gifts-for-programmers` renders 150 affiliate links for 19 products (each card links three times, plus a table, plus inline links) and is 63 screens long on a phone. One link in the summary table and one button per card are enough. On guides, the Hetzner and Hostinger button pair appears in dozens of posts along with an identical sentence about VPS prices (108 posts). A boilerplate sentence repeated 108 times reads as inserted; vary it or move it into a shared component under the prerequisites.

### 7.4 Decisions that are still open from earlier reviews

| Decision | Current state | Recommendation |
|---|---|---|
| Amazon ratings, prices and images | 114 hardcoded ratings in 35 EN posts, 122 quoted review counts, 163 lines with a price next to a `/go/` link, 153 hotlinked product images in 39 posts. The card labels the stars "Rating · Very good", which reads as Bitdoze's verdict. | Drop star ratings and review counts unless they come from Amazon's API. Keep dated prices only in the summary table, or remove them. If stars stay, make them your own score and say what it measures. |
| AI crawlers | `robots.txt` says `ai-input=no` while the site publishes `llms.txt` (73 KB), 423 Markdown mirrors and an API catalog for agents. Lighthouse also reports the `Content-Signal` line as an invalid directive, which is why SEO scores 92 instead of 100. | Pick one. If citations in AI answers are wanted, set `ai-input=yes` and keep `ai-train=no`. If not, remove the agent surfaces. |
| Two redirect systems | 1,022 first-party `/go/` links in 63 posts and 1,212 `go.bitdoze.com` links in 298 posts, reported separately. | Move the 35 `go.bitdoze.com` slugs into `affiliate-links.json` over time for one revenue report per article. |

### 7.5 Privacy wording (P2, S)

The privacy policy says third-party embeds "load only after you click". That holds for YouTube. It does not hold for images: `/resources/` loads logos from 17 external hosts and 39 EN posts load product images from `m.media-amazon.com` on page view, which sends the visitor's IP address to those hosts. Self-host the logos, and name the Amazon image host in the policy.

---

## 8. Accessibility and performance: measured details

### 8.1 Accessibility (axe-core, WCAG 2.2 AA plus best practices)

| Rule | Where | Nodes | Fix |
|---|---|---|---|
| `link-name` (serious) | Homepage YouTube thumbnail links, all three locales | 6 per page | `aria-hidden="true" tabindex="-1"` on the thumbnail link (`YouTubeVideos.astro:79`) |
| `color-contrast` (serious) | Search results in dark mode: 2.3:1 | 14 | 4.8 |
| `color-contrast` | Active H3 entry in the table of contents: 4.44:1 | 1 per post | 4.10 |
| `color-contrast` | Advertise price card: `text-blue-100` on blue-600 at 12 px, 4.23:1 | 2 | Use white |
| `scrollable-region-focusable` (serious) | Inline SVG diagram figures (`dokploy-install`, EN and ES) | 2 per post | `tabindex="0"` and a label, or make the SVG responsive |
| `heading-order` | Footer `h3` directly after the `h1` on `/categories/`, `/tags/`, `/search/`, lesson pages | 1 per page | Footer headings as `h2`, or plain text with a list label |
| `landmark-unique` | Every table wrapper is labelled "Scrollable table" (`markdown-plugins.mjs:224`) | 1+ per post | Label from the nearest heading, or drop the region role and keep `tabindex` |
| `empty-table-header` | Comparison tables with a blank first header cell | 1 per table | Write "Feature" |

Also noted, below the failure line: footer links are 22 px tall and breadcrumb links 20 px (they pass on spacing but are small for thumbs); the theme toggle is 36 px; the internal `/go/` index page has no landmarks (it is `noindex`).

Passing and worth keeping: skip link, visible focus ring (2 px blue outline confirmed on keyboard focus), `inert` on closed menus, native `<dialog>` lightbox, exclusive `<details name>` accordions, reduced-motion handling, keyboard-scrollable tables.

### 8.2 Performance (lab)

| Page (mobile) | Perf | LCP | TBT | CLS | DOM | Transfer |
|---|---|---|---|---|---|---|
| Home | 100 | 1.5 s | 0 ms | 0 | 755 | 160 KB |
| Blog index | 100 | 1.4 s | 80 ms | 0 | 461 | 182 KB |
| `dokploy-install` | 98 | 1.5 s | 170 ms | 0 | 1,940 | 84 KB |
| `gifts-for-programmers` | 92 | 1.8 s | 330 ms | 0 | 3,125 | 154 KB before lazy images |
| News digest | 100 | 1.5 s | 0 ms | 0 | 746 | 54 KB |

- **Listicle images (P2, S).** Product images come from Amazon at full size: 102 of 113 URLs end in `_AC_SL1500_`. On `gifts-for-programmers` that is 1.4 MB on desktop and 1.8 MB on mobile for images shown about 200-320 px wide. Changing the size token to `_AC_SL500_` cuts most of it. This is separate from the policy question in 7.4.
- **Long listicles (P3, S).** Style and layout take 1.3 s of main-thread time on the gift guide. `content-visibility: auto` with `contain-intrinsic-size: auto 900px` on `.amazon-product-card` lets the browser skip the 18 cards that are off screen. The property has been Baseline since September 2025; always pair it with the intrinsic size or the scrollbar will jump.
- **Reading-progress script (P3, S).** It reads `article.offsetHeight` during load, which Lighthouse records as a 186 ms forced reflow on the Dokploy guide under mobile CPU throttling. Scroll-driven animations became Baseline in October 2026, so the bar can be pure CSS, with the existing script as the fallback (the CSS version tracks the whole page, not only the article, which is close enough for a progress hint):
```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    #reading-progress-bar { animation: grow-progress auto linear; animation-timeline: scroll(root); }
    @keyframes grow-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  }
}
```
- **`<meta charset>` position (P3, S).** It sits at byte 3,012 of the document, after the inline theme script (`Layout.astro:94-177`). The HTML spec asks for it within the first 1,024 bytes. Production sends the charset in the HTTP header, so nothing breaks today; move the two meta tags above the script anyway.
- Nothing else needs work: 21 KB of CSS over the wire, 7.8 KB of external JS, no webfonts, speculation-rules prefetch, cross-document view transitions, eager and prioritized LCP images.

---

## 9. Roadmap

### This week (all S)

1. Rewrite `/advertise/`: no dofollow or DR claims, consistent stats (3.1).
2. Scope the Carrd promo, give it an end date, exclude end-of-article modules from Pagefind (3.2).
3. Replace the reading-time formula (3.3).
4. `bun run format`, commit, add a pre-commit hook (3.4).
5. Fix the Immich link in three files; add the internal link check to the build (3.5).
6. One CSS rule for widget fonts; sans tables (4.1).
7. Search page overrides, autofocus, `/` shortcut (4.8, 5.6).
8. Small fixes batch: YouTube link names, TOC active colour, Key Features icon, related meta wrap, accordion code size, RSS self link, charset position (4.10, 6.6, 8).

### Next 2-4 weeks

9. Quick result, Tested on with versions, and time-to-complete on the 15 most-linked guides, then by traffic (5.1).
10. Answer above the cover on guides (4.2).
11. Related posts: best three for everyone, rarity weighting, `next:` field and the Next-step card (5.5, 6.4).
12. End-of-article restructure (4.5).
13. Email capture and the feedback follow-up (6.1, 6.2).
14. 2027 title policy and its validator (5.4).
15. Homepage: popularity from Plausible, compact videos, mobile start-here rows, one container width (4.4).
16. Rewrite `/resources/` copy, self-host logos; rebuild `/about/`; add lab photos to `/how-i-test/` (4.9).

### This quarter

17. Guide skeleton with a fast path, applied during refreshes (5.2).
18. Filenames and language labels on code blocks; pinned or stated versions (5.3).
19. Cover system decision and re-covers (4.3).
20. The 16 untouched posts (5.8).
21. Journey position on the 91 journey posts; series for Dokploy, Traefik, Fish, Carrd (5.7).
22. Digest length, "Why it matters", AI note (5.9).
23. ES and DE length checks; German exit rule (5.11).
24. Decisions in 7.4; align PRODUCT.md, DESIGN.md and AGENTS.md with what ships (4.11).

### How to know it worked

- Guide visits with a `copy_code` event go up; the "No" share of `guide_feedback` goes down on refreshed guides.
- Pages per visit from posts rises after the Next-step card and the related-posts fix.
- Affiliate clicks per 1,000 guide views do not fall when the promo and the extra links go.
- Subscribers per week is above zero.
- Search Console: no manual action, and click-through holds through the January title changes.

---

## Appendix

### A. Design health score (Nielsen's 10 heuristics, 0-4 each)

| # | Heuristic | Score | Main reason |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Reading progress, active TOC, copy feedback, nav state. The reading-time figure misinforms; search has no empty or loading state. |
| 2 | Match with the real world | 3 | Practitioner language and mono labels. "81 min read", hype copy on Resources, prompt-style captions. |
| 3 | User control and freedom | 3 | Theme toggle, collapsible TOC, lightbox closes on any click, language switch. The floating TOC button cannot be dismissed. |
| 4 | Consistency and standards | 2 | Serif in widgets, four cover styles, four left edges, several card dialects, black buttons on Services, docs that disagree with the build. |
| 5 | Error prevention | 3 | Guides warn before destructive commands; copy copies exactly. Unlabeled output blocks and missing filenames invite mistakes. |
| 6 | Recognition rather than recall | 3 | TOC, breadcrumbs, start-here strips. No filters on the archive; weak related posts on mobile. |
| 7 | Flexibility and efficiency | 2 | No search shortcut or autofocus, tabs forget the choice, no fast path in long guides. |
| 8 | Aesthetic and minimalist design | 3 | Calm overall. The end-of-article stack, the site-wide promo and the video block add noise. |
| 9 | Error recovery | 3 | Good 404; troubleshooting sections in 182 posts. A "No" vote leads nowhere. |
| 10 | Help and documentation | 3 | How I Test, search, FAQs. No questions channel. |
| | **Total** | **28 / 40** | Good |

The deterministic design scan over `src/` returned 63 findings: 32 font sizes off the documented scale (the 10 and 11 px labels), 23 undocumented colours (mostly code-block and shadow values), 5 gray-on-colour hits (the one checked, on the Services button, is a false positive from its hover and dark variants), 2 radii, and the `src`-less lightbox image. It found none of the patterns from the July critique. It agrees with the visual review that what remains is token drift, not style.

### B. Technical audit (0-4 each)

| Dimension | Score | Key finding |
|---|---|---|
| Accessibility | 3 | AA mostly met; three serious rule types on public pages, all small |
| Performance | 4 | Lab 92-100, CLS 0, 7.8 KB JS; heavy third-party images on listicles |
| Responsive | 3 | No overflow in 140 runs; floating TOC button, 11.4 px code in accordions, clipped diagrams |
| Theming | 3 | Dark twin holds; dark search highlights fail; some hard-coded colours |
| Implementation integrity | 3 | Coherent system with drift at the edges and in the docs |
| **Total** | **16 / 20** | Good |

### C. Three readers, walked through the site

- **Marcus, mid-incident on a phone, from search.** Lands on `dokploy-install`. Sees a title, a picture and "takes about 30 min"; the Quick result is at the bottom edge of the screen. The command he wants in context is 18 screens down. The floating button covers the end of the lines he reads. If he finishes, the first thing after the conclusion is a Carrd discount.
- **Ana, returning reader.** Liked a guide last month. There is nothing to subscribe to except RSS. The homepage shows the same NetBird post three times and six loud video thumbnails. She has no way to see what was re-tested since her last visit.
- **Sam, keyboard and screen reader.** Skip link, focus ring and landmarks work. Six unnamed links on the homepage. Search highlights in dark mode are unreadable. Scrollable diagrams cannot be reached by keyboard. Every table region announces the same name.

### D. Posts published before 2026 and not touched this year

`agno-squad`, `asus-rog-strix-oled-xg32ucwg-review`, `cleanup-all-docker-things`, `compare-folders-content-differences`, `fix-kernel-panic-unable-mount-root-fs`, `fix-rpm-transaction-lock-waiting`, `fix-rpmdb-error-bdb0087-db_runrecovery`, `fix-ssh-too-many-authentication-failures`, `google-adk-start`, `install-docker-ubuntu-arm`, `oha-website-load-testing`, `opnform-open-source`, `plausible-tool`, `screen-studio-review`, `updating-container-docker-compose`, `upload-directory-oci-bucket-python`.

Posts with no inbound link from another post's body: `deploy-emdash-docker`, `emdash-custom-theme`, `exclude-directories-files-copy-remote-machine`, `fix-rpm-transaction-lock-waiting`, `fix-rpmdb-error-bdb0087-db_runrecovery`, `google-opal-ai-app-builder`, `hqbase-self-hosted-shared-inbox`, `memoh-ai-agent-deploy`, `modern-web-guidance-legacy-scan`, `openship-self-hosted-paas`, `smart-tv-custom-home-screen-remove-ads`, `vercel-eve-ai-agent`.

### E. Status of items from the earlier reviews

Verified fixed since `g4h-review.md` (November 13): legal pages rewritten, services placeholder copy, the five broken links it listed, Pagefind cache header, `/how-i-test/` in the sitemap, `view-transition-name` on ES slugs, pagination trailing slashes and labels, contact form confirmation, `.well-known` dead endpoints, news window of 10, ES/EN parity (419 and 419).

Still open from earlier reviews and repeated here because they still matter: email capture, Amazon ratings and prices, the AI-crawler stance, the cover system, `imageAlt` coverage, ES title and description lengths, the 2026 titles, low adoption of the proof fields, hardcoded `go.bitdoze.com` links.

New in this review: the Advertise link sales, the site-wide promo and its effect on search, the reading-time formula in numbers, the serif leak, the cover-before-answer measurement, related posts split by viewport, search index pollution, the TOC contrast bug, 11.4 px code in accordions, the feedback dead end, RSS self links, `lastmod` honesty (confirmed good), disclosure coverage (confirmed complete).

### F. Reproducing the numbers

The analysis scripts, 444 screenshots, axe results and Lighthouse reports from this review are in `/tmp/bitdoze-review/` on the machine that ran it (not in the repo, and gone after a reboot). The measurements are simple to redo:

- Content statistics: parse frontmatter and body of `src/content/posts/**`; "guide-type" means the title matches install, setup, deploy, configure, how to, fix or guide and the post has at least three code blocks.
- Rendered checks: serve `dist/` statically, load pages in Chromium at 1440x900 and 390x844 in both colour schemes, run axe-core with the WCAG 2.2 AA and best-practice tags.
- Search counts: `pagefind.search(term, { filters: { locale: ["en"] } })` in the browser console on `/search/`.
- `lastmod` audit: for each commit since September 1, count changed lines other than `date` and `lastmod` in files where `lastmod` was added, skipping the date-restoration commits.
