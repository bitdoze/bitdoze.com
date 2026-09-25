import { getCollection, type CollectionEntry } from "astro:content";
import { isPostIdInLocale, type SupportedLocale } from "@utils/i18n";

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

export type Author = CollectionEntry<"authors">;

let authorsPromise: Promise<Author[]> | null = null;

export function getAllAuthors(): Promise<Author[]> {
  if (!authorsPromise) {
    authorsPromise = getCollection("authors");
  }
  return authorsPromise;
}
