import { siteConfig } from "@config/site";
import { getCategoryMeta } from "@config/categories";
import { tf } from "@i18n/ui";
import { getEntryHref } from "@utils/content";
import type { SupportedLocale } from "@utils/i18n";
import { getAllAuthors, getPostsByLocale, type Post } from "@utils/postsCache";
import { absoluteUrl, getUniqueTaxonomyValues, toTaxonomySlug } from "@utils/slugs";
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
  const esPath = `/es/categories/${categorySlug}/`;
  const enHref = absoluteUrl(enPath, site);
  const esHref = absoluteUrl(esPath, site);
  const selfHref = locale === "es" ? esHref : enHref;

  // Pair the locale hubs only when the counterpart page actually gets built
  const hasOther = await localePathExists(
    locale === "es" ? enPath : esPath,
    locale === "es" ? "en" : "es"
  );
  const hreflangs = hasOther
    ? [
        { lang: "en", href: enHref },
        { lang: "es", href: esHref },
        { lang: "x-default", href: enHref },
      ]
    : [];

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
