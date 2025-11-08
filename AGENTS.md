# Agents Guide for Smoothie Blender Guide

Date: 06 October 2025

## Commands

- **dev**: `npm run dev` - Start development server on localhost:4321
- **build**: `npm run build` - Build for production
- **preview**: `npm run preview` - Preview production build
- **no tests**: No test scripts configured in package.json

## Architecture

- **Astro v5** blog site with MDX, RSS, sitemap generation
- **Content Collections**: posts/, authors/, pages/, about/ in src/content/
- **Config**: site.ts, menu.json, social.json in src/config/
- **Layouts**: Layout.astro (main), PostLayout.astro (blog posts)
- **Styling**: Tailwind CSS v4 with @tailwindcss/typography
- **Search**: Client-side with Fuse.js
- **Assets**: Images in src/assets/, public/ for static files

## Code Style

- **TypeScript**: Strict mode via astro/tsconfigs/strict
- **Path aliases**: @components/_, @layouts/_, @config/_, @utils/_, @styles/_, @assets/_
- **Content schema**: Zod validation in src/content/config.ts
- **Naming**: kebab-case for files, camelCase for variables, PascalCase for components
- **Imports**: Use path aliases, group by external/internal
- **Types**: Define schema with Zod for content collections
- **Frontmatter**: Required title, optional meta_title, description, image, authors[], categories[], tags[]

## Content Guidelines for Bitdoze Articles

- **Focus**: Informative, practical content about devops and programming.
- **Structure**: Use clear headings, bullet points, step-by-step instructions where applicable, tables.
- **SEO**: Include relevant keywords naturally in titles and content
- **Helpful tone**: Write as an expert guide helping readers make informed decisions
- **Product reviews**: Include pros/cons, specifications, comparison tables
- **Tags**: Don't use more then 3 tags per article.
- **Widgets**: Include in article the widgets created under widget section, don't use to much to not make the article not readable.
- **Image**: Create an svg image for the mdx article and store it in the assets/images. Make it simple and look nice without to much elements and a short text that is bigger and visible on any device with maximum 5 words. Use a nice background with a lighter colour that looks nice 16:9 format.
- **Amazon Products**: You add the amazon products with the needed details for the box: `<AmazonProduct productName="Blender Name" productDescription="Description" productFeatures={["Feature 1", "Feature 2"]} productLink="https://amazon.com/dp/ASIN" productImage="https://example.com/image.jpg" productRating={4.5} importantConsiderations={["Note 1", "Note 2"]} pros={["Pro 1", "Pro 2"]} cons={["Con 1", "Con 2"]} />` the image is the one from amazon and the link should be with "https://amazon.com/dp/ASIN"


## Available Widgets (import from @components/widgets/)

- **Accordion**: `<Accordion label="FAQ Title" group="faq" expanded="true">content</Accordion>`
- **Button**: `<Button text="Click Here" link="/url" variant="solid" color="blue" size="md" icon="arrow-right" />`
- **Notice**: `<Notice type="info|success|warning|error" title="Important">content</Notice>`
- **ListCheck**: `<ListCheck><ul><li>Checkmark item 1</li><li>Item 2</li></ul></ListCheck>`
- **YouTubeEmbed**: `<YouTubeEmbed url="https://youtube.com/embed/..." label="Video Title" />`
- **Tabs/Tab**: `<Tabs><Tab name="Tab 1">content</Tab><Tab name="Tab 2">content</Tab></Tabs>`
- **AmazonProduct**: `<AmazonProduct productName="Blender Name" productDescription="Description" productFeatures={["Feature 1", "Feature 2"]} productLink="https://amazon.com/dp/ASIN" productImage="https://example.com/image.jpg" productRating={4.5} importantConsiderations={["Note 1", "Note 2"]} pros={["Pro 1", "Pro 2"]} cons={["Con 1", "Con 2"]} />`

# Tailwind CSS v4

## Core Changes

- **CSS-first configuration**: Configuration is now done in CSS instead of JavaScript
  - Use `@theme` directive in CSS instead of `tailwind.config.js`
  - Example:

    ```css
    @import 'tailwindcss';

    @theme {
    	--font-display: 'Satoshi', 'sans-serif';
    	--breakpoint-3xl: 1920px;
    	--color-avocado-500: oklch(0.84 0.18 117.33);
    	--ease-fluid: cubic-bezier(0.3, 0, 0, 1);
    }
    ```

- Legacy `tailwind.config.js` files can still be imported using the `@config` directive:
  ```css
  @import 'tailwindcss';
  @config "../../tailwind.config.js";
  ```
- **CSS import syntax**: Use `@import "tailwindcss"` instead of `@tailwind` directives
  - Old: `@tailwind base; @tailwind components; @tailwind utilities;`
  - New: `@import "tailwindcss";`

- **Package changes**:
  - PostCSS plugin is now `@tailwindcss/postcss` (not `tailwindcss`)
  - CLI is now `@tailwindcss/cli`
  - Vite plugin is `@tailwindcss/vite`
  - No need for `postcss-import` or `autoprefixer` anymore

- **Native CSS cascade layers**: Uses real CSS `@layer` instead of Tailwind's custom implementation

## Theme Configuration

- **CSS theme variables**: All design tokens are available as CSS variables
  - Namespace format: `--category-name` (e.g., `--color-blue-500`, `--font-sans`)
  - Access in CSS: `var(--color-blue-500)`
  - Available namespaces:
    - `--color-*` : Color utilities like `bg-red-500` and `text-sky-300`
    - `--font-*` : Font family utilities like `font-sans`
    - `--text-*` : Font size utilities like `text-xl`
    - `--font-weight-*` : Font weight utilities like `font-bold`
    - `--tracking-*` : Letter spacing utilities like `tracking-wide`
    - `--leading-*` : Line height utilities like `leading-tight`
    - `--breakpoint-*` : Responsive breakpoint variants like `sm:*`
    - `--container-*` : Container query variants like `@sm:*` and size utilities like `max-w-md`
    - `--spacing-*` : Spacing and sizing utilities like `px-4` and `max-h-16`
    - `--radius-*` : Border radius utilities like `rounded-sm`
    - `--shadow-*` : Box shadow utilities like `shadow-md`
    - `--inset-shadow-*` : Inset box shadow utilities like `inset-shadow-xs`
    - `--drop-shadow-*` : Drop shadow filter utilities like `drop-shadow-md`
    - `--blur-*` : Blur filter utilities like `blur-md`
    - `--perspective-*` : Perspective utilities like `perspective-near`
    - `--aspect-*` : Aspect ratio utilities like `aspect-video`
    - `--ease-*` : Transition timing function utilities like `ease-out`
    - `--animate-*` : Animation utilities like `animate-spin`

- **Simplified theme configuration**: Many utilities no longer need theme configuration
  - Utilities like `grid-cols-12`, `z-40`, and `opacity-70` work without configuration
  - Data attributes like `data-selected:opacity-100` don't need configuration

- **Dynamic spacing scale**: Derived from a single spacing value
  - Default: `--spacing: 0.25rem`
  - Every multiple of the base value is available (e.g., `mt-21` works automatically)

- **Overriding theme namespaces**:
  - Override entire namespace: `--font-*: initial;`
  - Override entire theme: `--*: initial;`

## New Features

- **Container query support**: Built-in now, no plugin needed
  - `@container` for container context
  - `@sm:`, `@md:`, etc. for container-based breakpoints
  - `@max-md:` for max-width container queries
  - Combine with `@min-md:@max-xl:hidden` for ranges

- **3D transforms**:
  - `transform-3d` enables 3D transforms
  - `rotate-x-*`, `rotate-y-*`, `rotate-z-*` for 3D rotation
  - `scale-z-*` for z-axis scaling
  - `translate-z-*` for z-axis translation
  - `perspective-*` utilities (`perspective-near`, `perspective-distant`, etc.)
  - `perspective-origin-*` utilities
  - `backface-visible` and `backface-hidden`

- **Gradient enhancements**:
  - Linear gradient angles: `bg-linear-45` (renamed from `bg-gradient-*`)
  - Gradient interpolation: `bg-linear-to-r/oklch`, `bg-linear-to-r/srgb`
  - Conic and radial gradients: `bg-conic`, `bg-radial-[at_25%_25%]`

- **Shadow enhancements**:
  - `inset-shadow-*` and `inset-ring-*` utilities
  - Can be composed with regular `shadow-*` and `ring-*`

- **New CSS property utilities**:
  - `field-sizing-content` for auto-resizing textareas
  - `scheme-light`, `scheme-dark` for `color-scheme` property
  - `font-stretch-*` utilities for variable fonts

## New Variants

- **Composable variants**: Chain variants together
  - Example: `group-has-data-potato:opacity-100`

- **New variants**:
  - `starting` variant for `@starting-style` transitions
  - `not-*` variant for `:not()` pseudo-class
  - `inert` variant for `inert` attribute
  - `nth-*` variants (`nth-3:`, `nth-last-5:`, `nth-of-type-4:`, `nth-last-of-type-6:`)
  - `in-*` variant (like `group-*` but without adding `group` class)
  - `open` variant now supports `:popover-open`
  - `**` variant for targeting all descendants

## Custom Extensions

- **Custom utilities**: Use `@utility` directive

  ```css
  @utility tab-4 {
  	tab-size: 4;
  }
  ```

- **Custom variants**: Use `@variant` directive

  ```css
  @variant pointer-coarse (@media (pointer: coarse));
  @variant theme-midnight (&:where([data-theme="midnight"] *));
  ```

- **Plugins**: Use `@plugin` directive
  ```css
  @plugin "@tailwindcss/typography";
  ```

## Breaking Changes

- **Removed deprecated utilities**:
  - `bg-opacity-*` → Use `bg-black/50` instead
  - `text-opacity-*` → Use `text-black/50` instead
  - And others: `border-opacity-*`, `divide-opacity-*`, etc.

- **Renamed utilities**:
  - `shadow-sm` → `shadow-xs` (and `shadow` → `shadow-sm`)
  - `drop-shadow-sm` → `drop-shadow-xs` (and `drop-shadow` → `drop-shadow-sm`)
  - `blur-sm` → `blur-xs` (and `blur` → `blur-sm`)
  - `rounded-sm` → `rounded-xs` (and `rounded` → `rounded-sm`)
  - `outline-none` → `outline-hidden` (for the old behavior)

- **Default style changes**:
  - Default border color is now `currentColor` (was `gray-200`)
  - Default `ring` width is now 1px (was 3px)
  - Placeholder text now uses current color at 50% opacity (was `gray-400`)
  - Hover styles only apply on devices that support hover (`@media (hover: hover)`)

- **Syntax changes**:
  - CSS variables in arbitrary values: `bg-(--brand-color)` instead of `bg-[--brand-color]`
  - Stacked variants now apply left-to-right (not right-to-left)
  - Use CSS variables instead of `theme()` function
