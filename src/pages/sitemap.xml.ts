import type { APIContext } from 'astro';
import { siteConfig } from '@config/site';

export async function GET(context: APIContext) {
  const site = context.site || siteConfig.url;
  const today = new Date().toISOString().split('T')[0];

  const sitemaps = ['/sitemap-en.xml', '/sitemap-es.xml', '/video-sitemap.xml'];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps
    .map(
      (sm) =>
        `  <sitemap><loc>${new URL(sm, site).toString()}</loc><lastmod>${today}</lastmod></sitemap>`,
    )
    .join('\n')}\n</sitemapindex>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
