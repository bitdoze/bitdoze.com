import { getCollection, type CollectionEntry } from "astro:content";
import { isPostIdInLocale, type SupportedLocale } from "@utils/i18n";
import { toTaxonomySlug } from "@utils/slugs";

export type Post = CollectionEntry<"posts">;

/**
 * Single shared non-draft posts fetch for the build.
 * Header translation map, footer recent posts, and other helpers should use this
 * instead of calling getCollection independently (reduces concurrent work).
 */
let postsPromise: Promise<Post[]> | null = null;

export function getAllPublishedPosts(): Promise<Post[]> {
  if (!postsPromise) {
    postsPromise = getCollection("posts", ({ data }) => !data.draft);
  }
  return postsPromise;
}

const byLocale: Partial<Record<SupportedLocale, Promise<Post[]>>> = {};

/**
 * Non-draft posts for one locale, sorted newest-first — the standard pattern
 * used by archive/index pages. Shares the underlying getCollection call.
 */
export function getPostsByLocale(locale: SupportedLocale): Promise<Post[]> {
  if (!byLocale[locale]) {
    byLocale[locale] = getAllPublishedPosts().then((posts) =>
      posts
        .filter((post) => isPostIdInLocale(post.id, locale))
        .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    );
  }
  return byLocale[locale]!;
}

const tagCounts: Partial<Record<SupportedLocale, Promise<Map<string, number>>>> = {};

/** Per-locale tag slug → post count, for tag-chip and archive decisions. */
export function getTagCounts(locale: SupportedLocale): Promise<Map<string, number>> {
  if (!tagCounts[locale]) {
    tagCounts[locale] = getPostsByLocale(locale).then((posts) => {
      const counts = new Map<string, number>();
      for (const post of posts) {
        for (const tag of post.data.tags ?? []) {
          const key = toTaxonomySlug(tag);
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
      }
      return counts;
    });
  }
  return tagCounts[locale]!;
}

/** Newest-first date comparator — the one sort order used across the build. */
export const byDateDesc = (a: Post, b: Post) =>
  new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime();

export type Author = CollectionEntry<"authors">;

let authorsPromise: Promise<Author[]> | null = null;

export function getAllAuthors(): Promise<Author[]> {
  if (!authorsPromise) {
    authorsPromise = getCollection("authors");
  }
  return authorsPromise;
}
