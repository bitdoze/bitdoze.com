const LINK_HEADERS = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</rss.xml>; rel="alternate"; type="application/rss+xml"; title="Bitdoze RSS Feed"`,
  `</llms.txt>; rel="llms-txt"`,
  `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
].join(", ");

const STATIC_EXTENSIONS =
  /\.(xml|json|txt|ico|svg|jpg|jpeg|png|webp|gif|css|js|woff2?|ttf|eot|mp4|pdf)$/i;

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // Markdown content negotiation: serve pre-built .md files for Accept: text/markdown
  if (
    accept.includes("text/markdown") &&
    !url.pathname.endsWith(".md") &&
    !url.pathname.startsWith("/_astro/") &&
    !url.pathname.startsWith("/.") &&
    !STATIC_EXTENSIONS.test(url.pathname)
  ) {
    const slug = url.pathname.replace(/\/$/, "") || "/index";
    const mdUrl = new URL(`/md${slug}.md`, url.origin);
    try {
      // Use ASSETS binding to fetch static files directly, bypassing middleware loop
      const mdResponse = env?.ASSETS
        ? await env.ASSETS.fetch(new Request(mdUrl.toString()))
        : await fetch(mdUrl.toString());
      if (mdResponse.ok) {
        const text = await mdResponse.text();
        const tokenCount = Math.ceil(text.length / 4);
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "x-markdown-tokens": String(tokenCount),
            "Vary": "Accept",
          },
        });
      }
    } catch (_) {
      // Fall through to normal HTML response on error
    }
    // Fall through to normal HTML response if no .md file found
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
