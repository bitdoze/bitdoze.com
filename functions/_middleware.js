const LINK_HEADERS = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</rss.xml>; rel="alternate"; type="application/rss+xml"; title="Bitdoze RSS Feed"`,
  `</llms.txt>; rel="llms-txt"`,
  `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
].join(", ");

const STATIC_EXTENSIONS =
  /\.(xml|json|txt|ico|svg|jpg|jpeg|png|webp|gif|css|js|woff2?|ttf|eot|mp4|pdf)$/i;

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // Markdown content negotiation: redirect Accept: text/markdown to pre-built .md files
  if (
    accept.includes("text/markdown") &&
    !url.pathname.endsWith(".md") &&
    !url.pathname.startsWith("/_astro/") &&
    !url.pathname.startsWith("/.") &&
    !STATIC_EXTENSIONS.test(url.pathname)
  ) {
    const mdPath = `/md${url.pathname.replace(/\/$/, "")}.md`;
    return Response.redirect(new URL(mdPath, url.origin).toString(), 302);
  }

  const response = await next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  // Clone response so we can mutate headers
  const newResponse = new Response(response.body, response);

  // Add Link headers for agent discovery on the homepage
  if (url.pathname === "/") {
    const existing = newResponse.headers.get("Link");
    newResponse.headers.set(
      "Link",
      existing ? `${existing}, ${LINK_HEADERS}` : LINK_HEADERS
    );
  }

  // Cache-friendly: ignore UTM params for Vary/caching
  newResponse.headers.set(
    "No-Vary-Search",
    'key-order, params=("utm_source" "utm_medium" "utm_campaign" "utm_content" "utm_term")'
  );

  return newResponse;
}
