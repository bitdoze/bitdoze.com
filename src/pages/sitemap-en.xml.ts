import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getServices } from '@config/services';
import { siteConfig } from '@config/site';
import { getEntryHref } from '@utils/content';
import { isPostIdInLocale } from '@utils/i18n';
import { toTaxonomySlug, getUniqueTaxonomyValues } from '@utils/slugs';

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

function urlEntry(loc: string, lastmod?: string): string {
  const lm = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
  return `  <url><loc>${escapeXml(loc)}</loc>${lm}</url>`;
}

export async function GET(context: APIContext) {
  const site = context.site || siteConfig.url;
  const posts = await getCollection('posts', ({ id, data }) => !data.draft && isPostIdInLocale(id, 'en'));
  const staticPages = [
    '/', '/blog/', '/categories/', '/tags/', '/authors/',
    '/about/', '/resources/', '/contact/', '/series/',
    '/services/', '/advertise/', '/privacy/', '/terms/',
  ];
  const services = getServices('en').map((service) => `/services/${service.slug.en}/`);

  // Collect archive pages
  const allCategories = getUniqueTaxonomyValues(posts.flatMap((p) => p.data.categories || []));
  const allTags = getUniqueTaxonomyValues(posts.flatMap((p) => p.data.tags || []));
  const allAuthors = getUniqueTaxonomyValues(posts.flatMap((p) => p.data.authors || []));

  const categoryPages = allCategories.map((cat) => `/categories/${toTaxonomySlug(cat)}/`);
  const tagPages = allTags.map((tag) => `/tags/${toTaxonomySlug(tag)}/`);
  const authorPages = allAuthors.map((author) => `/authors/${toTaxonomySlug(author)}/`);

  const postEntries = posts.map((post) => {
    const href = new URL(getEntryHref(post), site).toString();
    const lastmod = post.data.lastmod || post.data.date;
    return urlEntry(href, lastmod ? lastmod.toISOString().split('T')[0] : undefined);
  });

  const allUrls = [
    ...staticPages,
    ...services,
    ...categoryPages,
    ...tagPages,
    ...authorPages,
  ].map((path) => urlEntry(new URL(path, site).toString()));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...allUrls, ...postEntries].join('\n')}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
