---
name: Bitdoze
description: Practical DevOps, programming, and self-hosting guides — tested, copy-paste-ready.
colors:
  terminal-blue: "#3b82f6"
  terminal-blue-deep: "#2563eb"
  terminal-blue-ink: "#1d4ed8"
  indigo-spark: "#6366f1"
  paper: "#ffffff"
  paper-muted: "#f9fafb"
  paper-subtle: "#f3f4f6"
  ink: "#111827"
  ink-muted: "#6b7280"
  ink-subtle: "#9ca3af"
  hairline: "#e5e7eb"
  link-wash: "#7dbeff38"
  link-wash-strong: "#5092e959"
  console-bg: "#111827"
  console-muted: "#1f2937"
  console-subtle: "#374151"
  console-ink: "#f9fafb"
  console-ink-muted: "#d1d5db"
  console-hairline: "#4b5563"
  notice-success: "#22c55e"
  notice-warning: "#eab308"
  notice-danger: "#ef4444"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "'Bricolage Grotesque Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.375
  body:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.125rem → 1.25rem (md) → 1.3125rem (2xl)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Source Sans 3 Variable', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
  code:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: "0.8125rem → 0.875rem (md) in blocks; 0.8em inline"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "20px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.terminal-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.terminal-blue-deep}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.terminal-blue-deep}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  cta-hero:
    backgroundColor: "{colors.terminal-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  chip-tag:
    backgroundColor: "#dbeafe"
    textColor: "{colors.terminal-blue-ink}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  card-post:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  card-post-dark:
    backgroundColor: "{colors.console-muted}"
    textColor: "{colors.console-ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  notice-info:
    backgroundColor: "#eff6ff"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
---

# Design System: Bitdoze

## 1. Overview

**Creative North Star: "The Workshop Manual"**

Bitdoze is a well-thumbed workshop manual: always open to the right page, every spec tested, grease on the pages. The visual system exists to get a developer from a search result to a working terminal command as fast as possible, and to make the recommendation that follows feel earned. Personality, per PRODUCT.md: practical, direct, trustworthy. The reference point for feel is DigitalOcean's tutorial pages — clean, scannable, code-forward, calm.

The system is light-first with a fully designed dark twin (the "console" palette), not an inverted afterthought. One brand hue — Terminal Blue — carries links, tags, and identity; Indigo Spark appears only beside it on primary calls to action. Code blocks, tables, and step sequences are the hero artifacts; everything decorative yields to them. The site publishes in English and Spanish, so components must tolerate longer translated strings without breaking rhythm.

Explicitly rejected (PRODUCT.md anti-references): the ad-cluttered tutorial farm, the generic AI-blog aesthetic (purple gradients, glassmorphism, glow), the corporate docs portal, and the Medium/Substack clone with no identity of its own.

**Key Characteristics:**

- Light-first with a designed dark twin (console palette), swapped via CSS variables.
- One blue voice; indigo only ever appears next to it, never alone.
- Flat by default, lift on intent — shadows and scale answer state, not decoration.
- The code block is the most respected element on the page.
- Three self-hosted variable faces, latin subsets only: Bricolage Grotesque for headings, Source Sans 3 for reading, JetBrains Mono for code. Speed is still a feature: ~106 KB preloaded, mono only fetched where code appears.

## 2. Colors

The palette is a single confident blue against quiet paper neutrals, with a designed dark console twin and a small semantic set reserved for callouts.

### Primary

- **Terminal Blue** (#3b82f6): the brand voice. Links on hover, tags, primary buttons, active nav states. Deep step (#2563eb) for hover; ink step (#1d4ed8) for text on tint backgrounds.

### Secondary

- **Indigo Spark** (#6366f1): appears only as Terminal Blue's partner on the hero CTA and the nav highlight pill (a blue→indigo gradient). Never used alone, never on body elements.

### Tertiary

- **Notice set** — Success (#22c55e), Warning (#eab308), Danger (#ef4444): reserved for callout blocks (Notice widget) and semantic states. Always as soft tint backgrounds with a full 1px border of the same hue, never as page chrome.

### Neutral

- **Paper** (#ffffff): light-mode page background.
- **Paper Muted** (#f9fafb) / **Paper Subtle** (#f3f4f6): light tonal steps for alternating rows, code-adjacent surfaces, table headers.
- **Ink** (#111827): light-mode body text — near-black, maximum contrast.
- **Ink Muted** (#6b7280) / **Ink Subtle** (#9ca3af): metadata, captions, dates. Ink Muted on Paper passes 4.5:1; Ink Subtle is for large or non-essential text only.
- **Hairline** (#e5e7eb): light borders and dividers.
- **Link Wash** (rgba blue at 22% / 35%): the translucent blue underline-wash behind prose links.
- **Console set** — dark twin: bg #111827, muted #1f2937, subtle #374151; ink #f9fafb, muted #d1d5db; hairline #4b5563.

### Named Rules

**The One Voice Rule.** Terminal Blue is the only brand hue on any screen. Indigo Spark exists solely inside the blue→indigo CTA gradient; if it appears anywhere else, it's wrong.

**The Dark Twin Rule.** Every light token has a console counterpart, and dark mode must be designed with the same care as light — no pure black, no inverted-wash grays, contrast re-verified per pair.

## 3. Typography

**Display Font:** Bricolage Grotesque Variable, optical-size build (`@fontsource-variable/bricolage-grotesque/opsz.css`, ~77 KB latin, preloaded). Applied to h1–h4 through `--font-display`; `font-optical-sizing: auto` tightens it at large sizes.
**Body Font:** Source Sans 3 Variable (`@fontsource-variable/source-sans-3`, ~29 KB latin, preloaded) through `--font-sans`, for all body copy and UI.
**Mono Font:** JetBrains Mono Variable (`@fontsource-variable/jetbrains-mono`, ~40 KB latin, not preloaded, only downloaded on pages that render code) through `--font-mono`. Ligatures are off so commands read exactly as typed.

**Character:** headings carry the brand voice through one slightly quirky grotesque; long reading sits on a calm humanist sans built for screens; code gets a face designed for telling 0/O and 1/l/I apart.

### Hierarchy

Article sizes are defined on `[data-post-body]` in `global.css`, not through prose-lg.

- **Display** (700, 3rem → 3.5rem, line-height 1.1, letter-spacing -0.02em): homepage hero headline only.
- **Post title (H1)** (700, `clamp(2rem, …, 3.125rem)` = 32px mobile → 50px, line-height 1.08, letter-spacing -0.02em).
- **Section (H2)** (700, 24px → 32px, line-height 1.2, -0.02em), with a hairline divider above every H2 after the first.
- **Subsection (H3)** (650, 20px → 23px, line-height 1.3). **H4** (650, 18px, line-height 1.35).
- **Title** (700, 1.25rem, line-height 1.375): card titles, clipped to two lines.
- **Body** (400, 18px mobile → 20px from md → 21px from 2xl, line-height 1.7). Source Sans 3 has a smaller x-height than OS system faces, so it runs about 1–2px larger for the same optical size. The measure is ~46 characters on phones and ~78 on desktop.
- **Label** (500, 0.75rem, line-height 1.5): tag chips, dates, metadata.
- **Code** (400, 13px mobile → 14px blocks; 0.8em inline chips at weight 450).

### Named Rules

**The Three Faces Rule.** Exactly three self-hosted variable faces, latin subset only (covers EN + ES): display, body, mono. Preload only the display and body latin files; never preload mono. No fourth webfont, no third-party font CDNs, no static weight files.

**The Wash Link Rule.** Prose links are ink-colored with a translucent blue wash behind the baseline that grows on hover (34% → 54% of the line box). They are never the default browser blue underline.

## 4. Elevation

Flat by default, lift on intent. Surfaces rest nearly flat — at most a small ambient shadow; the noticeable lift (scale 1.02 plus shadow growth) is reserved for hover and focus, so motion always means "this responds to you." In dark mode, shadows deepen slightly (higher opacity) to stay visible against the console palette.

### Shadow Vocabulary

- **Ambient low** (`0 1px 2px rgba(0,0,0,0.05)`): resting state for solid buttons and small controls.
- **Ambient mid** (`0 4px 6px rgba(0,0,0,0.07)`): resting state for post cards.
- **Ambient high** (`0 10px 15px rgba(0,0,0,0.08)`): hero CTA at rest; cards on hover.
- **Dark twins:** same geometry at 0.1 / 0.15 / 0.2 opacity.

### Named Rules

**The Lift-on-Intent Rule.** Shadows and scale appear only as a response to state. If a surface glows, floats, or pulses at rest, it's decoration — remove it.

## 5. Components

### Buttons

- **Shape:** gently curved (6px radius, `rounded-md`).
- **Primary:** Terminal Blue fill, white text, medium weight, padding 8px 16px (md size), ambient-low shadow.
- **Hover / Focus:** deepens to Terminal Blue Deep over 200ms ease-in-out; focus gets a visible ring. Outline variant swaps fill for a 2px Terminal Blue border and hover tint of blue-50.
- **Hero CTA:** the one flamboyant element allowed — blue→indigo gradient, generous padding (16px 32px), 8px radius, semibold, ambient-high shadow; on hover it scales to 1.05 and the gradient deepens. One per page, always the primary action.

### Chips

- **Style:** pill (9999px radius), blue-100 tint background, Terminal Blue Ink text at label size (0.75rem, 500), padding 4px 8px.
- **State:** hover deepens the tint one step; chips are links to tag/category pages, never static ornaments.

### Cards / Containers

- **Corner Style:** 8px radius (`rounded-lg`).
- **Background:** Paper in light mode, Console Muted in dark.
- **Shadow Strategy:** ambient-mid at rest; on hover the card lifts to scale 1.02 over 300ms and the cover image zooms 1.05 — the lift-on-intent rule in practice.
- **Border:** none; separation comes from shadow and tonal steps, not strokes.
- **Internal Padding:** 20px, with title clamped to two lines and description to three.
- **Promotional & affiliate cards** (ServicesPromo, AmazonProduct): the same card language — Paper background, 8px radius, ambient-mid, no border, no glow. CTAs inside them are Terminal Blue solid buttons. Semantic tints (green/red/amber) appear only inside Notice-style callout rows, never as section backgrounds or heading text.

### Notices

- **Style:** tint background of the semantic hue (info blue / success green / warning yellow / danger red), 8px radius, with a full 1px border of the same hue; a leading icon marks severity at a glance.
- **Usage:** callouts inside articles (prerequisites, warnings, tips). They support the prose; they never interrupt it with chrome or icons larger than the text.

### Navigation

- **Style:** sticky top bar (64px), translucent with backdrop blur; links at 0.875rem medium weight, ink-muted, hover to Terminal Blue.
- **Highlight:** the single nav CTA is a blue→indigo gradient pill — the same gesture as the hero CTA.
- **Dropdowns:** floating panels (8px radius, ambient-high shadow, hairline border) with a fade/slide-in over 300ms.

### Article Body (the signature surface)

- **Prose:** `@tailwindcss/typography` at prose-lg with bold headings, wash-style links, images rounded at 8px.
- **Tables:** scroll horizontally with a subtle edge shadow hinting more content; header row on Paper Subtle, zebra striping on Paper Muted.
- **Code:** mono stack in blocks with generous padding; the most visually protected element on the page. Every highlighted block gets a header bar (language label + always-visible Copy button) from the `codeBlockHeader` Shiki transformer in `src/utils/markdown-plugins.mjs`.
- **Images:** an image alone in a paragraph shows its alt text as a centered muted caption (`imageCaptions` plugin) and opens in a native `<dialog>` lightbox on click or Enter.
- **Sections:** each H2 after the first gets a hairline divider above it; H2/H3 show a `#` copy-link in the left gutter on hover (desktop only).
- **Ending:** tags, then the author box with sharing inside it, then services promo, then related posts. No standalone share block.

## 6. Do's and Don'ts

### Do:

- **Do** keep Terminal Blue the only brand hue per screen; Indigo Spark appears solely inside the CTA gradient (The One Voice Rule).
- **Do** design dark mode from the console palette and re-verify every text/background pair at ≥4.5:1 (WCAG AA per PRODUCT.md).
- **Do** hold body text at Ink (#111827) on Paper, and keep Ink Subtle (#9ca3af) for large or non-essential text only.
- **Do** make every shadow or scale transform answer a state change — hover, focus, active (The Lift-on-Intent Rule).
- **Do** treat code blocks, commands, and configs as the hero artifact: legible, copyable, never truncated without a scroll affordance.
- **Do** keep prose links in the wash style — ink text, translucent blue highlight, growing on hover (The Wash Link Rule).

### Don't:

- **Don't** ship the ad-cluttered tutorial-farm feel: no popups, no interstitial affiliate blocks, no content buried under chrome (PRODUCT.md anti-reference, verbatim).
- **Don't** use the generic AI-blog aesthetic: no purple gradients beyond the single blue→indigo CTA gesture, no glassmorphism as decoration, no glow effects.
- **Don't** drift into the corporate docs-portal look: no dry gray-on-gray pages stripped of the blue voice and the practitioner tone.
- **Don't** become a Medium/Substack clone: Bitdoze has its own header, its own cards, its own typography rhythm — a reader should know where they are blindfolded.
- **Don't** add webfonts beyond the three self-hosted faces, or preload the mono face (The Three Faces Rule).
- **Don't** use Indigo Spark alone, on body text, or on large surfaces.
- **Don't** add side stripes, gradient text, or ambient animation beyond the documented lift-on-intent.
