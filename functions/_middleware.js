const LINK_HEADERS = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</rss.xml>; rel="alternate"; type="application/rss+xml"; title="Bitdoze RSS Feed"`,
  `</llms.txt>; rel="llms-txt"`,
  `</.well-known/mcp/server-card.json>; rel="mcp-server-card"`,
].join(", ");

const STATIC_EXTENSIONS =
  /\.(xml|json|txt|ico|svg|jpg|jpeg|png|webp|gif|css|js|woff2?|ttf|eot|mp4|pdf)$/i;

/**
 * Prefer markdown only when the client explicitly asks for it and does not
 * prefer HTML higher. Avoids bare "text/markdown" substring edge cases and
 * reduces accidental negotiation.
 */
function prefersMarkdown(acceptHeader) {
  if (!acceptHeader) return false;

  const parts = acceptHeader.split(",").map((p) => p.trim().toLowerCase());
  let mdQ = null;
  let htmlQ = null;

  for (const part of parts) {
    const [type, ...params] = part.split(";").map((s) => s.trim());
    let q = 1;
    for (const param of params) {
      const m = /^q=(0(?:\.\d+)?|1(?:\.0+)?)$/.exec(param);
      if (m) q = parseFloat(m[1]);
    }
    if (type === "text/markdown") mdQ = q;
    if (type === "text/html" || type === "application/xhtml+xml") {
      htmlQ = htmlQ == null ? q : Math.max(htmlQ, q);
    }
  }

  if (mdQ == null) return false;
  // If HTML is also accepted, only serve markdown when MD quality is strictly higher
  // (agents usually send Accept: text/markdown or text/markdown, text/html;q=0.9)
  if (htmlQ != null) return mdQ > htmlQ;
  return mdQ > 0;
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  // Markdown content negotiation: serve pre-built .md for agents
  if (
    prefersMarkdown(accept) &&
    !url.pathname.endsWith(".md") &&
    !url.pathname.startsWith("/_astro/") &&
    !url.pathname.startsWith("/.") &&
    !STATIC_EXTENSIONS.test(url.pathname)
  ) {
    const slug = url.pathname.replace(/\/$/, "") || "/home";
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
            Vary: "Accept",
            // Critical: do not let the edge cache MD as the default page representation
            "Cache-Control": "private, no-store",
            "CDN-Cache-Control": "no-store",
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

  // Ensure HTML variants are keyed separately from markdown negotiation
  const existingVary = newResponse.headers.get("Vary");
  if (!existingVary) {
    newResponse.headers.set("Vary", "Accept");
  } else if (!/\bAccept\b/i.test(existingVary)) {
    newResponse.headers.set("Vary", `${existingVary}, Accept`);
  }

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
