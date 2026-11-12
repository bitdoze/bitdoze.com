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
    site: new URL("/news/", context.site || siteConfig.url).toString(),
    items: digests.map((digest) => ({
      title: digest.data.title,
      pubDate: digest.data.date,
      description: digest.data.description,
      link: `/news/${getEntrySlug(digest)}/`,
    })),
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      "<language>en</language>",
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      `<atom:link href="${context.site || siteConfig.url}/news/rss.xml" rel="self" type="application/rss+xml" />`,
    ].join(""),
    stylesheet: "/rss/styles.xsl",
  });
}
