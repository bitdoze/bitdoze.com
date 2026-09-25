/**
 * Single source of truth for legacy redirects.
 *
 * Consumed by:
 *  - astro.config.mjs `redirects:` (Astro stub pages — keep trailing-slash keys)
 *  - scripts/sync-redirects.mjs → writes public/_redirects (Cloudflare edge
 *    301s for both slash and non-slash forms)
 *
 * Add new redirects HERE ONLY — never edit public/_redirects by hand.
 */
export const redirects = {
  "/tools/": "https://bit-tools.com/tools",
  "/tools/thumbnail-ideas/": "https://bit-tools.com/tools/youtube-thumbnail-ideas-generator",
  "/tools/titles-generator/": "https://bit-tools.com/tools/ai-title-generator",
  "/tools/youtube-script-generator/": "https://bit-tools.com/tools/youtube-script-generator",

  // Slug fixes (old paths were linked from posts/external shares)
  "/ai-coading-tools/": "/ai-coding-tools/",
  "/astro-vs-nextjs-vs-tanstack-start-which-wins/":
    "/astro-vs-nextjs-vs-tanstack-start-which-wins-2026/",

  // Retired category archives → new taxonomy
  "/categories/cms/": "/categories/web-development/",
  "/categories/vps/": "/categories/self-hosting/",
  "/categories/dev-tools/": "/categories/tools/",
  "/categories/tips/": "/categories/tools/",
  "/categories/node/": "/categories/tools/",
  "/categories/python/": "/categories/web-development/",
  "/categories/astro/": "/categories/web-development/",
  "/categories/woocommerce/": "/categories/wordpress/",
  "/categories/security/": "/categories/tools/",
  "/categories/cloudflare/": "/categories/tools/",
  "/categories/blog/": "/categories/web-development/",
  "/categories/personal/": "/categories/web-development/",

  // ES has no `tools` posts, so /es/categories/tools/ is a 404 — retired
  // categories that map to `tools` in EN fall back to the ES categories hub.
  "/es/categories/cms/": "/es/categories/web-development/",
  "/es/categories/vps/": "/es/categories/self-hosting/",
  "/es/categories/dev-tools/": "/es/categories/",
  "/es/categories/tips/": "/es/categories/",
  "/es/categories/node/": "/es/categories/",
  "/es/categories/python/": "/es/categories/web-development/",
  "/es/categories/astro/": "/es/categories/web-development/",
  "/es/categories/woocommerce/": "/es/categories/wordpress/",
  "/es/categories/security/": "/es/categories/",
  "/es/categories/cloudflare/": "/es/categories/",
  "/es/categories/blog/": "/es/categories/web-development/",
  "/es/categories/personal/": "/es/categories/web-development/",
};
