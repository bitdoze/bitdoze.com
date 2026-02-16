import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@config/site';
import { getEntryHref } from '@utils/content';
import { isPostIdInLocale } from '@utils/i18n';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET(context: APIContext) {
  const site = context.site || siteConfig.url;
  const posts = await getCollection('posts', ({ id, data }) => !data.draft && isPostIdInLocale(id, 'en'));
  const staticPages = [
    '/',
    '/blog/',
    '/categories/',
    '/tags/',
    '/authors/',
    '/about/',
    '/resources/',
    '/contact/',
    '/series/',
    '/advertise/',
    '/privacy/',
    '/terms/',
  ];

  const urls = [
    ...staticPages,
    ...posts.map((post) => getEntryHref(post)),
  ].map((path) => new URL(path, site).toString());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((loc) => `  <url><loc>${escapeXml(loc)}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
