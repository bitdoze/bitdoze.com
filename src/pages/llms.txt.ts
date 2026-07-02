import { getCollection } from "astro:content";
import { getEntrySlug } from "@utils/content";
import { isPostIdInLocale } from "@utils/i18n";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const sortFn = (a: (typeof posts)[number], b: (typeof posts)[number]) => {
    const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
    const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  };

  const enPosts = posts.filter((p) => isPostIdInLocale(p.id, "en")).sort(sortFn);
  const esPosts = posts.filter((p) => isPostIdInLocale(p.id, "es")).sort(sortFn);

  const siteUrl = "https://www.bitdoze.com";

  const formatPost = (post: (typeof posts)[number]) => {
    const slug = getEntrySlug(post);
    const desc = post.data.description ? `: ${post.data.description}` : "";
    return `- [${post.data.title}](${siteUrl}/${slug}/)${desc}`;
  };

  const lines = [
    `# Bitdoze`,
    ``,
    `> Practical DevOps, programming, and self-hosting guides for developers and operators.`,
    ``,
    `Bitdoze is a technical blog covering DevOps workflows, container orchestration, CI/CD pipelines, infrastructure as code, programming tutorials, and self-hosting solutions. All content is written by practitioners for practitioners.`,
    ``,
    `## Articles`,
    ``,
    ...enPosts.map(formatPost),
    ``,
    `## Articulos (Spanish)`,
    ``,
    ...esPosts.map(formatPost),
    ``,
    `## Resources`,
    ``,
    `- [RSS Feed](${siteUrl}/rss.xml): Full-content RSS feed for all English posts`,
    `- [RSS Feed (Spanish)](${siteUrl}/es/rss.xml): Full-content RSS feed for Spanish posts`,
    `- [Sitemap](${siteUrl}/sitemap.xml): Sitemap index`,
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
