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

    // Retired category archives → new taxonomy
    "/categories/cms": "/categories/web-development/",
    "/categories/cms/": "/categories/web-development/",
    "/categories/vps": "/categories/self-hosting/",
    "/categories/vps/": "/categories/self-hosting/",
    "/categories/dev-tools": "/categories/tools/",
    "/categories/dev-tools/": "/categories/tools/",
    "/categories/tips": "/categories/tools/",
    "/categories/tips/": "/categories/tools/",
    "/categories/node": "/categories/tools/",
    "/categories/node/": "/categories/tools/",
    "/categories/python": "/categories/web-development/",
    "/categories/python/": "/categories/web-development/",
    "/categories/astro": "/categories/web-development/",
    "/categories/astro/": "/categories/web-development/",
    "/categories/woocommerce": "/categories/wordpress/",
    "/categories/woocommerce/": "/categories/wordpress/",
    "/categories/security": "/categories/tools/",
    "/categories/security/": "/categories/tools/",
    "/categories/cloudflare": "/categories/tools/",
    "/categories/cloudflare/": "/categories/tools/",
    "/categories/blog": "/categories/web-development/",
    "/categories/blog/": "/categories/web-development/",
    "/categories/personal": "/categories/web-development/",
    "/categories/personal/": "/categories/web-development/",

    "/es/categories/cms": "/es/categories/web-development/",
    "/es/categories/cms/": "/es/categories/web-development/",
    "/es/categories/vps": "/es/categories/self-hosting/",
    "/es/categories/vps/": "/es/categories/self-hosting/",
    "/es/categories/dev-tools": "/es/categories/tools/",
    "/es/categories/dev-tools/": "/es/categories/tools/",
    "/es/categories/tips": "/es/categories/tools/",
    "/es/categories/tips/": "/es/categories/tools/",
    "/es/categories/node": "/es/categories/tools/",
    "/es/categories/node/": "/es/categories/tools/",
    "/es/categories/python": "/es/categories/web-development/",
    "/es/categories/python/": "/es/categories/web-development/",
    "/es/categories/astro": "/es/categories/web-development/",
    "/es/categories/astro/": "/es/categories/web-development/",
    "/es/categories/woocommerce": "/es/categories/wordpress/",
    "/es/categories/woocommerce/": "/es/categories/wordpress/",
    "/es/categories/security": "/es/categories/tools/",
    "/es/categories/security/": "/es/categories/tools/",
    "/es/categories/cloudflare": "/es/categories/tools/",
    "/es/categories/cloudflare/": "/es/categories/tools/",
    "/es/categories/blog": "/es/categories/web-development/",
    "/es/categories/blog/": "/es/categories/web-development/",
    "/es/categories/personal": "/es/categories/web-development/",
    "/es/categories/personal/": "/es/categories/web-development/",
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
