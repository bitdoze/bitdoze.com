import type { APIContext } from "astro";
import { getServices } from "@config/services";
import { siteConfig } from "@config/site";
import { getEntryHref, getEntrySlug } from "@utils/content";

import { toTaxonomySlug, getUniqueTaxonomyValues } from "@utils/slugs";
import { getPostsByLocale } from "@utils/postsCache";
import { courseHref, getCourses, lessonHref } from "@utils/courses";
import { getLatestDigests } from "@utils/news";

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
    "/courses/",
  ];
  const services = getServices("en").map((service) => `/services/${service.slug.en}/`);

  // Course hub + overview + every lesson page (all indexable EN routes)
  const coursePages = getCourses().flatMap((course) => [
    courseHref(course),
    ...course.lessons.map((lesson) => lessonHref(course, lesson)),
  ]);

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

  // Daily news digests are index,follow — a rolling window of the newest few,
  // so only those URLs go in the sitemap
  const newsEntries = (await getLatestDigests()).map((digest) => {
    const href = new URL(`/news/${getEntrySlug(digest)}/`, site).toString();
    return urlEntry(href, digest.data.date?.toISOString().split("T")[0]);
  });

  const allUrls = [...staticPages, ...services, ...coursePages, ...categoryPages, ...authorPages].map((path) =>
    urlEntry(new URL(path, site).toString())
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...allUrls, ...postEntries, ...newsEntries].join("\n")}</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
