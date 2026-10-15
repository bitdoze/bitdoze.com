import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { siteConfig } from "@config/site";
import { getEntrySlug } from "@utils/content";
import { getLatestDigests } from "@utils/news";

export async function GET(context: APIContext) {
  const digests = await getLatestDigests();

  return rss({
    title: `${siteConfig.name} - AI & Tech News`,
    description: "Daily AI and tech news digests for developers and DevOps engineers.",
    site: context.site || siteConfig.url,
    items: digests.map((digest) => ({
      title: digest.data.title,
      pubDate: digest.data.date,
      description: digest.data.description,
      link: `/news/${getEntrySlug(digest)}/`,
    })),
    stylesheet: "/rss/styles.xsl",
  });
}
