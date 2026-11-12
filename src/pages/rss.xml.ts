import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { siteConfig } from "@config/site";
import { getEntryHref } from "@utils/content";
import { isPostIdInLocale } from "@utils/i18n";
import { getAllPublishedPosts } from "@utils/postsCache";

// Raw MDX bodies (with <Component> tags) render as garbage in feed readers and
// inflate the feed by ~8 MB — ship a trimmed latest-30 summary feed instead.
const MAX_ITEMS = 30;

export async function GET(context: APIContext) {
  const posts = (await getAllPublishedPosts()).filter((post) => isPostIdInLocale(post.id, "en"));

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
    const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  });

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site || siteConfig.url,
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
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      "<language>en</language>",
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      `<atom:link href="${context.site || siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />`,
    ].join(""),
    stylesheet: "/rss/styles.xsl",
  });
}
