import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@config/site';
import { getEntryHref } from '@utils/content';
import { isPostIdInLocale } from '@utils/i18n';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ id, data }) => !data.draft && isPostIdInLocale(id, 'en'));
  
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
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: getEntryHref(post),
      categories: post.data.categories || [],
      // Optional custom data
      customData: post.data.tags ? 
        `<tags>${post.data.tags.join(',')}</tags>` : '',
    })),
    // Optional: customize the RSS output
    stylesheet: '/rss/styles.xsl',
  });
}
