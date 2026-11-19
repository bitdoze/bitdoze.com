import { siteConfig } from "@config/site";
import { getCategoryMeta } from "@config/categories";
import { tf } from "@i18n/ui";
import { getEntryHref } from "@utils/content";
import { getLocaleBasePath, SUPPORTED_LOCALES, type SupportedLocale } from "@utils/i18n";
import { getAllAuthors, getPostsByLocale, type Post } from "@utils/postsCache";
import {
  absoluteUrl,
  buildArchivePath,
  getUniqueTaxonomyValues,
  toTaxonomySlug,
} from "@utils/slugs";
import { localePathExists } from "@utils/translationMap";

export type TaxonomyField = "tags" | "categories" | "authors";

const PARAM_NAME = { tags: "tag", categories: "category", authors: "author" } as const;

export function formatAuthorName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function taxonomyValues(posts: Post[], field: TaxonomyField): string[] {
  return getUniqueTaxonomyValues(
    posts.flatMap((post) => (Array.isArray(post.data[field]) ? post.data[field] : []))
  ).filter((value) => value && value.trim() !== "");
}

export function postsForTaxonomy(posts: Post[], field: TaxonomyField, value: string): Post[] {
  const slug = toTaxonomySlug(value);
  return posts
    .filter((post) => post.data[field]?.some((entry) => toTaxonomySlug(entry) === slug))
    .sort((a, b) => new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime());
}

export function taxonomyCounts(posts: Post[], field: TaxonomyField) {
  return taxonomyValues(posts, field)
    .map((name) => {
      const slug = toTaxonomySlug(name);
      return {
        name,
        slug,
        count: posts.filter((post) =>
          post.data[field]?.some((entry) => toTaxonomySlug(entry) === slug)
        ).length,
      };
    })
    .sort((a, b) => b.count - a.count);
}

/** getStaticPaths factory for taxonomy index routes: /[tag]/, /[category]/, /[author]/ */
export async function getTaxonomyIndexPaths(field: TaxonomyField, locale: SupportedLocale) {
  const posts = await getPostsByLocale(locale);
  const authorEntries = field === "authors" ? await getAllAuthors() : [];

  return taxonomyValues(posts, field).map((value) => {
    const valuePosts = postsForTaxonomy(posts, field, value);
    return {
      params: { [PARAM_NAME[field]]: toTaxonomySlug(value) },
      props: {
        name: value,
        posts: valuePosts,
        count: valuePosts.length,
        authorDetails:
          field === "authors"
            ? (authorEntries.find(
                (entry) => entry.data.title.toLowerCase() === value.toLowerCase()
              ) ?? null)
            : null,
      },
    };
  });
}

/** getStaticPaths factory for paginated taxonomy routes: /[x]/page/[page] (pages 2+) */
export async function getTaxonomyPagePaths(field: TaxonomyField, locale: SupportedLocale) {
  const posts = await getPostsByLocale(locale);
  const param = PARAM_NAME[field];

  return taxonomyValues(posts, field).flatMap((value) => {
    const valuePosts = postsForTaxonomy(posts, field, value);
    const totalPages = Math.ceil(valuePosts.length / siteConfig.postsPerPage);

    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((page) => page > 1)
      .map((page) => ({
        params: { [param]: toTaxonomySlug(value), page: String(page) },
        props: { name: value, posts: valuePosts, page, count: valuePosts.length },
      }));
  });
}

/**
 * hreflang set for a taxonomy index page (/tags/<t>/, /authors/<a>/) —
 * one entry per locale whose archive page actually gets built, plus
 * x-default → EN. Empty when only one locale has the archive.
 */
export async function taxonomyIndexHreflangs(
  locale: SupportedLocale,
  field: TaxonomyField,
  slug: string,
  site: string | URL | undefined
) {
  const entries: { lang: string; href: string }[] = [];
  for (const l of SUPPORTED_LOCALES) {
    const path = buildArchivePath(field, slug, l);
    if (await localePathExists(path, l)) {
      entries.push({ lang: l, href: absoluteUrl(path, site) });
    }
  }
  if (entries.length < 2) {
    return [];
  }
  entries.push({ lang: "x-default", href: absoluteUrl(buildArchivePath(field, slug, "en"), site) });
  return entries;
}

/** Localized title/schema/hreflang data shared by the EN and ES category index routes */
export async function categoryIndexSeo(
  locale: SupportedLocale,
  categorySlug: string,
  count: number,
  paginatedPosts: Post[],
  site: string | URL | undefined
) {
  const meta = getCategoryMeta(categorySlug, locale);

  const enPath = `/categories/${categorySlug}/`;
  const selfPath = buildArchivePath("categories", categorySlug, locale);
  const selfHref = absoluteUrl(selfPath, site);

  // Pair the locale hubs only where the counterpart page actually gets built
  const entries: { lang: string; href: string }[] = [];
  for (const l of SUPPORTED_LOCALES) {
    const path = buildArchivePath("categories", categorySlug, l);
    if (await localePathExists(path, l)) {
      entries.push({ lang: l, href: absoluteUrl(path, site) });
    }
  }
  const hreflangs =
    entries.length < 2 ? [] : [...entries, { lang: "x-default", href: absoluteUrl(enPath, site) }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: tf(locale, "categorySchemaName", { name: meta.label }),
    description: meta.intro,
    url: selfHref,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: count,
      itemListElement: paginatedPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(getEntryHref(post), site),
        name: post.data.title,
      })),
    },
  };

  return { meta, hreflangs, jsonLd };
}

/**
 * hreflang set for a paginated /blog/page/N/ page — one entry per locale
 * whose blog archive actually has a page N, plus x-default → EN.
 */
export async function blogPaginationHreflangs(
  locale: SupportedLocale,
  currentPage: number,
  site: string | URL | undefined
): Promise<{ lang: string; href: string }[]> {
  const perPage = siteConfig.postsPerPage;
  const entries: { lang: string; href: string }[] = [];
  for (const l of SUPPORTED_LOCALES) {
    const totalPages = Math.max(1, Math.ceil((await getPostsByLocale(l)).length / perPage));
    if (l === locale || currentPage <= totalPages) {
      entries.push({
        lang: l,
        href: absoluteUrl(`${getLocaleBasePath(l)}blog/page/${currentPage}/`, site),
      });
    }
  }
  entries.push({
    lang: "x-default",
    href: absoluteUrl(`/blog/page/${currentPage}/`, site),
  });
  return entries;
}
