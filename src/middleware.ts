import { defineMiddleware } from "astro:middleware";

const LINK_HEADERS = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</rss.xml>; rel="alternate"; type="application/rss+xml"; title="Bitdoze RSS Feed"`,
  `</llms.txt>; rel="llms-txt"`,
  `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
].join(", ");

// Note: markdown content negotiation (Accept: text/markdown) and No-Vary-Search
// are handled by functions/_middleware.js on Cloudflare Pages at runtime.
// This middleware only runs during `astro dev` and must not read request.headers
// to avoid the Astro prerender warning.
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const response = await next();

  if (!response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  // Add Link headers for agent discovery on the homepage (dev only)
  if (url.pathname === "/") {
    const existing = response.headers.get("Link");
    response.headers.set(
      "Link",
      existing ? `${existing}, ${LINK_HEADERS}` : LINK_HEADERS
    );
  }

  return response;
});
