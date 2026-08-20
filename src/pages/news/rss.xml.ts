import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@config/site';
import { getEntrySlug } from '@utils/content';

export async function GET(context: APIContext) {
  const digests = (await getCollection('news', ({ data }) => !data.draft)).sort(
    (a, b) => {
      const dateA = a.data.date instanceof Date ? a.data.date.getTime() : 0;
      const dateB = b.data.date instanceof Date ? b.data.date.getTime() : 0;
      return dateB - dateA;
    },
  );

  return rss({
    title: `${siteConfig.name} - AI & Tech News`,
    description:
      'Daily AI and tech news digests for developers and DevOps engineers.',
    site: context.site || siteConfig.url,
    items: digests.map((digest) => ({
      title: digest.data.title,
      pubDate: digest.data.date,
      description: digest.data.description,
      link: `/news/${getEntrySlug(digest)}/`,
    })),
    stylesheet: '/rss/styles.xsl',
  });
}
