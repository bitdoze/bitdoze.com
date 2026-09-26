// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import icon from "astro-icon";
import { codeBlockHeader, imageCaptions, trimTokenStyles } from "./src/utils/markdown-plugins.mjs";
import { redirects } from "./src/config/redirects.mjs";
import { siteConfig } from "./src/config/site.ts";
// Sitemap handled by custom sitemap-en.xml.ts and sitemap-es.xml.ts
import path from "path";

// EventEmitter.defaultMaxListeners is raised in scripts/node-bootstrap.mjs,
// loaded via NODE_OPTIONS in the build scripts so it propagates to workers.

// https://astro.build/config
export default defineConfig({
  // Site URL — single source is src/config/site.ts (from config.json base_url)
  site: siteConfig.url,
  // Match generated paths (dist/.../index.html) and avoid /foo vs /foo/ redirect collisions.
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Single source: src/config/redirects.mjs (also generates public/_redirects
  // via scripts/sync-redirects.mjs). Only trailing-slash keys — defining both
  // "/path" and "/path/" collides in Astro 7 and becomes a hard error.
  redirects,
  // Base path (set to '/' for most sites)
  base: "/",

  // MDX extends this config, so posts get the same code headers and image captions.
  markdown: {
    processor: satteri({ hastPlugins: [imageCaptions] }),
    shikiConfig: {
      transformers: [trimTokenStyles(), codeBlockHeader()],
    },
  },

  experimental: {
    // Skip re-rendering pages whose cacheKey + dependency graph are unchanged.
    // Post routes return cacheKey from getStaticPaths (lastmod ?? date).
    incrementalBuild: true,
    // Optimize imported SVGs at build time (~165 SVGs ship under _astro).
    svgOptimizer: svgoOptimizer(),
  },

  // Font pipeline: subsets, optimized metric-matched fallbacks (size-adjust —
  // prevents CLS on swap), and preload hints. The CSS vars hold the generated
  // family stacks; @theme in global.css maps them to Tailwind's --font-*.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Chivo",
      cssVariable: "--font-stack-display",
      weights: ["100 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Source Sans 3",
      cssVariable: "--font-stack-sans",
      weights: ["200 900"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Aleo",
      cssVariable: "--font-stack-serif",
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["ui-serif", "Georgia", "serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-stack-mono",
      weights: ["100 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],

  // Class-scoped styles drop the ~7 MB of data-astro-cid attributes sitewide.
  scopedStyleStrategy: "class",

  // Configure Vite plugins and server settings
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [
          // Allow the project root (default)
          ".",
          // Allow the src/assets directory to fix the Vite serving error
          path.resolve("./src/assets"),
        ],
      },
    },
    // Keep native sharp out of Vite's transform pipeline (fixes MissingSharp on /_image in dev)
    optimizeDeps: {
      exclude: ["sharp"],
    },
    ssr: {
      external: ["sharp", "detect-libc", "semver"],
    },
  },

  // Configure image settings for external domains
  image: {
    // Explicit sharp service (default, but makes intent clear + avoids mis-resolution)
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    // Responsive images: every <Image>/<Picture> without its own layout emits a
    // srcset on this shared breakpoint ladder (consolidates variant explosion).
    layout: "constrained",
    breakpoints: [480, 768, 1024, 1440],
    responsiveStyles: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i3.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },

  // Configure Astro integrations
  integrations: [mdx(), icon()],
});
