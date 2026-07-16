import { getCollection, type CollectionEntry } from "astro:content";

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
