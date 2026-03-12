import { getCollection } from 'astro:content';
import { formatDate } from '@utils/date';
import { getEntrySlug } from '@utils/content';
import { isPostIdInLocale } from '@utils/i18n';

const SEARCH_CONTENT_LIMIT = 450;

function normalizeSearchContent(input: string) {
  return input
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, SEARCH_CONTENT_LIMIT);
}

export async function GET() {
  const posts = await getCollection('posts', ({ id, data }) => !data.draft && isPostIdInLocale(id, 'es'));

  const searchData = posts.map((post) => {
    const imageData = post.data.image
      ? {
          src: post.data.image.src,
          width: post.data.image.width,
          height: post.data.image.height,
        }
      : null;

    return {
      slug: getEntrySlug(post),
      title: post.data.title,
      description: post.data.description || '',
      date: post.data.date ? formatDate(post.data.date, 'es') : '',
      image: imageData,
      categories: post.data.categories || [],
      tags: post.data.tags || [],
      content: normalizeSearchContent(post.body ?? ''),
    };
  });

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
