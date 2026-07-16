// @ts-check
import { EventEmitter } from "node:events";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
// Sitemap handled by custom sitemap-en.xml.ts and sitemap-es.xml.ts
import path from "path";

// Large SSG builds attach many concurrent socket "close" listeners (OG images,
// remote YouTube thumbs, sharp/vite). Default of 10 only produces noise.
EventEmitter.defaultMaxListeners = 50;

// https://astro.build/config
export default defineConfig({
  // Set the site URL for production
  site: "https://www.bitdoze.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/tools/": "https://bit-tools.com/tools",
    "/tools/thumbnail-ideas/":
      "https://bit-tools.com/tools/youtube-thumbnail-ideas-generator",
    "/tools/titles-generator/":
      "https://bit-tools.com/tools/ai-title-generator",
    "/tools/youtube-script-generator/":
      "https://bit-tools.com/tools/youtube-script-generator",
  },
  // Base path (set to '/' for most sites)
  base: "/",

  // Enable experimental SVG components

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
    dangerouslyProcessSVG: true,
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
