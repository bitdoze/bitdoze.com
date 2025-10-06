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
