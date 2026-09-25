import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { siteConfig } from "@config/site";
import { getEntryHref } from "@utils/content";
import { isPostIdInLocale } from "@utils/i18n";
import { getAllPublishedPosts } from "@utils/postsCache";

// Raw MDX bodies render as garbage in feed readers — trimmed latest-30 feed.
const MAX_ITEMS = 30;

export async function GET(context: APIContext) {
  const posts = (await getAllPublishedPosts()).filter((post) => isPostIdInLocale(post.id, "es"));

  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
    const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  });

  return rss({
    title: `${siteConfig.name} (Español)`,
    description: "Artículos en español de Bitdoze",
    // Channel link should point at the Spanish section, not the EN root
    site: new URL("/es/", context.site || siteConfig.url).toString(),
    items: sortedPosts.slice(0, MAX_ITEMS).map((post) => {
      const categories = [...(post.data.categories || []), ...(post.data.tags || [])];
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: getEntryHref(post),
        categories,
      };
    }),
    stylesheet: "/rss/styles.xsl",
  });
}
