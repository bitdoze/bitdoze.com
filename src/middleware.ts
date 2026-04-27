import { defineMiddleware } from "astro:middleware";

const SITE_URL = "https://www.bitdoze.com";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // Markdown content negotiation: if agent sends Accept: text/markdown,
  // redirect to the .md alternate URL.
  // For static sites, the .md endpoint is pre-built by [slug].md.ts
  if (
    accept.includes("text/markdown") &&
    !url.pathname.endsWith(".md") &&
    !url.pathname.includes("/_astro/") &&
    !url.pathname.includes("/.") &&
    !url.pathname.match(/\.(xml|json|txt|ico|svg|jpg|png|webp|css|js|jpeg|gif|woff2?|ttf|eot)$/i)
  ) {
    const mdPath = `/md${url.pathname.replace(/\/$/, "")}.md`;
    return Response.redirect(new URL(mdPath, url.origin).toString(), 302);
  }

  const response = await next();

  // Add Link headers for agent discovery on the homepage
  if (
    response.headers.get("content-type")?.includes("text/html") &&
    url.pathname === "/"
  ) {
    const linkHeaders = [
      `</.well-known/api-catalog>; rel="api-catalog"`,
      `</rss.xml>; rel="alternate"; type="application/rss+xml"; title="Bitdoze RSS Feed"`,
      `</llms.txt>; rel="llms-txt"`,
      `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
    ];

    const existing = response.headers.get("Link");
    if (existing) {
      response.headers.set("Link", `${existing}, ${linkHeaders.join(", ")}`);
    } else {
      response.headers.set("Link", linkHeaders.join(", "));
    }
  }

  // Add No-Vary-Search header for UTM parameter caching
  if (response.headers.get("content-type")?.includes("text/html")) {
    response.headers.set(
      "No-Vary-Search",
      'key-order, params=("utm_source" "utm_medium" "utm_campaign" "utm_content" "utm_term")'
    );
  }

  return response;
});
