import { getCollection } from "astro:content";
import { getEntrySlug } from "@utils/content";
import { isPostIdInLocale } from "@utils/i18n";
import type { APIRoute } from "astro";
import { siteConfig } from "@config/site";

const RECENT_LIMIT = 80;

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const sortFn = (a: (typeof posts)[number], b: (typeof posts)[number]) => {
    const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
    const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  };

  const enPosts = posts
    .filter((p) => isPostIdInLocale(p.id, "en"))
    .sort(sortFn)
    .slice(0, RECENT_LIMIT);
  const esPosts = posts
    .filter((p) => isPostIdInLocale(p.id, "es"))
    .sort(sortFn)
    .slice(0, RECENT_LIMIT);

  const siteUrl = siteConfig.url;

  const formatPost = (post: (typeof posts)[number]) => {
    const slug = getEntrySlug(post);
    const desc = post.data.description ? `: ${post.data.description}` : "";
    return `- [${post.data.title}](${siteUrl}/${slug}/)${desc}`;
  };

  const lines = [
    `# Bitdoze`,
    ``,
    `> ${siteConfig.description}`,
    ``,
    `Bitdoze is a technical blog covering DevOps workflows, container orchestration, CI/CD pipelines, infrastructure as code, programming tutorials, and self-hosting solutions. All content is written by practitioners for practitioners.`,
    ``,
    `## Recent articles (English)`,
    ``,
    ...enPosts.map(formatPost),
    ``,
    `## Artículos recientes (Spanish)`,
    ``,
    ...esPosts.map(formatPost),
    ``,
    `## Browse all content`,
    ``,
    `- [Full English catalog (markdown)](${siteUrl}/md/home.md)`,
    `- [Blog index](${siteUrl}/blog/)`,
    `- [Spanish blog](${siteUrl}/es/blog/)`,
    `- [Categories](${siteUrl}/categories/)`,
    `- [Series](${siteUrl}/series/)`,
    ``,
    `## Resources`,
    ``,
    `- [RSS Feed](${siteUrl}/rss.xml): Full-content RSS feed for English posts`,
    `- [RSS Feed (Spanish)](${siteUrl}/es/rss.xml): Full-content RSS feed for Spanish posts`,
    `- [Sitemap](${siteUrl}/sitemap.xml): Sitemap index`,
    `- [API Catalog](${siteUrl}/.well-known/api-catalog): Machine-readable API discovery`,
    `- [Search](${siteUrl}/search/)`,
  ];

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
