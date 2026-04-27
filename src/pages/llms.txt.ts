import { getCollection } from "astro:content";
import { getEntrySlug } from "@utils/content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
    const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  });

  const siteUrl = "https://www.bitdoze.com";

  const lines = [
    `# Bitdoze`,
    ``,
    `> Practical DevOps, programming, and self-hosting guides for developers and operators.`,
    ``,
    `Bitdoze is a technical blog covering DevOps workflows, container orchestration, CI/CD pipelines, infrastructure as code, programming tutorials, and self-hosting solutions. All content is written by practitioners for practitioners.`,
    ``,
    `## Articles`,
    ``,
    ...sortedPosts.map((post) => {
      const slug = getEntrySlug(post);
      const desc = post.data.description
        ? `: ${post.data.description}`
        : "";
      return `- [${post.data.title}](${siteUrl}/${slug}/)${desc}`;
    }),
    ``,
    `## Resources`,
    ``,
    `- [RSS Feed](${siteUrl}/rss.xml): Full-content RSS feed for all English posts`,
    `- [RSS Feed (Spanish)](${siteUrl}/es/rss.xml): Full-content RSS feed for Spanish posts`,
    `- [Sitemap](${siteUrl}/sitemap-en.xml): English sitemap`,
    `- [API Catalog](${siteUrl}/.well-known/api-catalog): Machine-readable API discovery`,
  ];

  const llmsTxt = lines.join("\n");

  return new Response(llmsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
