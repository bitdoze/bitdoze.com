import type { APIContext } from "astro";
import { getServices } from "@config/services";
import { siteConfig } from "@config/site";
import { getEntryHref } from "@utils/content";

import { toTaxonomySlug, getUniqueTaxonomyValues } from "@utils/slugs";
import { getPostsByLocale } from "@utils/postsCache";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function urlEntry(loc: string, lastmod?: string): string {
  const lm = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
  return `  <url><loc>${escapeXml(loc)}</loc>${lm}</url>`;
}

export async function GET(context: APIContext) {
  const site = context.site || siteConfig.url;
  const posts = await getPostsByLocale("en");
  const staticPages = [
    "/",
    "/blog/",
    "/categories/",
    "/authors/",
    "/about/",
    "/resources/",
    "/contact/",
    "/series/",
    "/services/",
    "/advertise/",
    "/privacy/",
    "/terms/",
    "/news/",
  ];
  const services = getServices("en").map((service) => `/services/${service.slug.en}/`);

  // Collect archive pages. Tag pages are excluded: they are noindex
  // (siteConfig.noindex.tags) and noindexed URLs must not sit in the sitemap.
  const allCategories = getUniqueTaxonomyValues(posts.flatMap((p) => p.data.categories || []));
  const allAuthors = getUniqueTaxonomyValues(posts.flatMap((p) => p.data.authors || []));

  const categoryPages = allCategories.map((cat) => `/categories/${toTaxonomySlug(cat)}/`);
  const authorPages = allAuthors.map((author) => `/authors/${toTaxonomySlug(author)}/`);

  const postEntries = posts.map((post) => {
    const href = new URL(getEntryHref(post), site).toString();
    const lastmod = post.data.lastmod || post.data.date;
    return urlEntry(href, lastmod ? lastmod.toISOString().split("T")[0] : undefined);
  });

  const allUrls = [...staticPages, ...services, ...categoryPages, ...authorPages].map((path) =>
    urlEntry(new URL(path, site).toString())
  );
  // Daily news digests stay out of the index (noindex + not listed); only the /news/ hub is indexed
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...allUrls, ...postEntries].join("\n")}</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
