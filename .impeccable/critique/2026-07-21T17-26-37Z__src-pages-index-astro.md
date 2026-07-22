---
target: src/pages/index.astro (homepage)
total_score: 28
p0_count: 0
p1_count: 2
timestamp: 2026-07-21T17-26-37Z
slug: src-pages-index-astro
---
# Critique: src/pages/index.astro (homepage)

Method: single-context (no sub-agent tool exposed in this harness); Assessment A (design review) completed before any detector output entered context.

## Design Health Score: 28/40 — Good

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Reading progress, nav states, search exist; n/a-heavy on a static homepage |
| 2 | Match System / Real World | 3 | Practitioner language lands; "Enhance your content creation with our AI-powered tools" is generic filler |
| 3 | User Control and Freedom | 3 | No traps; theme toggle; nothing to undo on a read-only surface |
| 4 | Consistency and Standards | 2 | Four card idioms on one page (Tools mini-cards, YouTube bordered cards, PostCards, Explore icon cards); indigo icons vs blue brand |
| 5 | Error Prevention | 3 | YouTube fetch failure degrades to a plain-language message |
| 6 | Recognition Rather Than Recall | 3 | Labeled nav and visible categories; social row is icon-only (aria-labeled) |
| 7 | Flexibility and Efficiency | 3 | Search, tags, series, RSS give multiple paths to content |
| 8 | Aesthetic and Minimalist Design | 2 | Five competing sections; external promos (AI Tools, YouTube) outrank the site's own articles |
| 9 | Error Recovery | 3 | Plain-language YouTube error; 404 page exists |
| 10 | Help and Documentation | 3 | Site-wide search; resources page |

## Anti-Patterns Verdict

**LLM assessment:** The homepage reads as the standard AI/SaaS landing scaffold: centered hero with gradient text, gradient CTA with gift icon, social icon row, then endless identical card grids (4 tool cards, 6 video cards, 6 post cards, 3 icon cards — four different card idioms on one page). The gradient-text h1 is on the absolute-ban list. Indigo leaks outside the sanctioned CTA gradient into the Tools icons, breaking the One Voice Rule from DESIGN.md. Section order inverts the belief ladder in PRODUCT.md: external AI tools and YouTube videos come before the site's own articles, so the "this guide solved my problem" moment never happens on the homepage.

**Deterministic scan (CLI, rendered HTML):** 56 raw findings — side-tab ×2, gray-on-color ×9, ai-color-palette ×2, layout-transition ×4, design-system-color ×31, design-system-radius ×5, design-system-font-size ×2, numbered-section-markers ×1. High false-positive rate: the side-tab hits are Tailwind class *definitions* in the compiled stylesheet, not applied elements; 31 design-system-color hits are mostly Tailwind v4 emitting oklch() for documented hex tokens plus genuinely undocumented social-hover hues (sky, red). Notably, the CLI scan MISSED the gradient text (v4 `bg-linear-to-r` syntax not covered) — the runtime detector caught it.

**Runtime detector (browser overlay, computed styles):** 29 anti-patterns flagged in-page: ai-color-palette ×27 ("purple/violet gradient background" family — hero CTA, nav pill, Tools indigo), gradient-text ×2 (CONFIRMED on the h1), low-contrast ×1 (#9ca3af on #ffffff at 2.5:1 — WCAG AA failure), line-length ×1 (~112 chars/line), overused-font/single-font ×2 (intentional — The System Stack Rule), image-hover-transform ×20 (sanctioned by the lift-on-intent rule), layout-transition ×1 (reading-progress width, canonical exception).

## Overall Impression

A competent, fast, dark-mode-complete blog homepage wearing a SaaS-launch costume. The bones (system stack, wash links, dark twin, real content depth) are exactly right for "The Workshop Manual"; the hero chrome and the section order are exactly wrong for it. Single biggest opportunity: make the articles the hero — lead with what solves problems, demote the self-promotion.

## What's Working

1. **The dark twin is real.** Both themes render correctly (verified pixel-level: #ffffff vs #111827 body), and the CSS-variable swap architecture is clean.
2. **Prose link treatment.** The wash-highlight link style in articles is distinctive, on-brand, and non-generic — the kind of detail that defeats the "AI made this" read.
3. **Content infrastructure.** PopularTopics by tag, series support, search, RSS, bilingual routing — the homepage has real material to work with; the problem is arrangement, not assets.

## Priority Issues

- **[P1] Gradient text + indigo gradient family = instant AI read.** Detector: gradient-text ×2 on the h1, ai-color-palette ×27 across hero CTA, nav pill, and Tools icons.
  - **Why it matters:** This is the single strongest "AI made this" tell and violates DESIGN.md's One Voice Rule (indigo may only ride the CTA gradient) and the absolute ban on gradient text.
  - **Fix:** Solid Terminal Blue accent word on the h1; keep at most ONE blue→indigo gradient gesture (the hero CTA) or go fully solid; recolor Tools icons indigo→blue.
  - **Suggested command:** `$impeccable polish src/components/widgets/Hero.astro` then `$impeccable quieter` on the gradient spread.

- **[P1] Section order buries the product.** Order today: Hero → AI Tools (external) → YouTube → Topics → Latest Articles → Explore. The site's core artifact (articles) is 5th.
  - **Why it matters:** PRODUCT.md's belief ladder starts with "this guide solved my problem" and the 10-second line is "DevOps guides that actually work" — a first-time visitor currently meets affiliate-adjacent promos before a single guide.
  - **Fix:** Latest Articles directly under the hero; demote Tools and YouTube to a single compact strip below articles (or to /tools).
  - **Suggested command:** `$impeccable layout src/pages/index.astro`.

- **[P2] Four card idioms on one page.** Tools mini-cards (p-3, icon-left), YouTube cards (border + shadow-md), PostCards (shadow-only, image top), Explore cards (border + shadow + big centered icon).
  - **Why it matters:** Card-language churn reads as assembled-not-designed and breaks rhythm; DESIGN.md documents one card language.
  - **Fix:** Unify on the PostCard language (8px radius, shadow-mid, no border in light mode); make Tools/Explore variants of the same grammar, not separate dialects.
  - **Suggested command:** `$impeccable polish` on the section components after the reorder.

- **[P2] Contrast failure: #9ca3af on white (2.5:1).** Runtime detector: one live instance; PRODUCT.md commits to WCAG AA (4.5:1).
  - **Why it matters:** AA is a stated requirement; gray-400 text on white fails for normal-size text wherever it lands (metadata, subtitles).
  - **Fix:** Reserve #9ca3af for large/decorative use only; body-adjacent metadata goes to #6b7280 (4.8:1).
  - **Suggested command:** `$impeccable audit src/pages/index.astro` (a11y pass).

- **[P3] Hero housekeeping.** `font-heading` and `leading-tighter` classes don't resolve (no such tokens — inert); `tracking-tighter` = -0.05em is below the -0.04em display floor; the hero's `rounded-lg` is invisible on the white background; social buttons scale-110 on hover is reflexive decoration.
  - **Fix:** Drop inert classes, set letter-spacing to -0.02/-0.03em, remove the rounding, calm the social hovers to color-only transitions.
  - **Suggested command:** folded into `$impeccable polish src/components/widgets/Hero.astro`.

## Persona Red Flags

**Marcus (project persona — search-driven DevOps engineer, from PRODUCT.md):** Arrives mid-incident wanting a working config. On the homepage: latest articles are the 5th section; the first thing after the hero is four external links to bitbuddies.me. Red flags: core content buried; external links leak him off-site before value is delivered; "View All" is the only fast path to the blog index and it's a small text link.

**Sam (accessibility-dependent):** Social buttons carry aria-labels and heading order is sane. Red flags: live 2.5:1 contrast instance (#9ca3af on white); gradient text whose contrast varies along its length; focus rings depend on browser defaults in several spots.

**Casey (distracted mobile):** Cards stack cleanly and the hero h1 fits (whitespace-nowrap correctly scoped to sm+). Red flags: the CTA is the only thumb-friendly target in the hero; social row adds four 48px targets competing with it; five sections of vertical scroll before the Explore nav cards.

## Minor Observations

- Tools cards link externally (bitbuddies.me) with no external-link affordance; YouTube cards do open new tabs — inconsistent.
- "AI Tools / Enhance your content creation with our AI-powered tools" — the most generic copy on the page, ironically.
- `transition-transform duration-400` on PostCard images: duration-400 is not a default step (v4 dynamic spacing makes it valid; harmless but nonstandard).
- The YouTube section duplicates the social-icon YouTube link three blocks later — two consecutive sections serve the channel.
- Reading-progress width transition is the canonical layout-property exception; leave it.

## Questions to Consider

- What if "Latest Articles" WAS the hero — headline, then straight into the grid?
- Does the AI Tools strip belong on the homepage at all, or is it /tools content riding the front page?
- If the page is allowed exactly one gradient, which element keeps it?
