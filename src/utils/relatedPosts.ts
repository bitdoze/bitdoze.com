import type { CollectionEntry } from "astro:content";
import { getEntrySlug } from "@utils/content";

function getMatchCount(source: string[] = [], target: string[] = []): number {
  const sourceSet = new Set(source);
  return target.reduce((count, value) => count + Number(sourceSet.has(value)), 0);
}

export function getRelatedPosts(
  currentPost: CollectionEntry<"posts">,
  otherPosts: CollectionEntry<"posts">[],
  limit: number,
): CollectionEntry<"posts">[] {
  const currentTags = currentPost.data.tags || [];
  const currentCategories = currentPost.data.categories || [];

  return [...otherPosts]
    .map((post) => ({
      post,
      tagMatches: getMatchCount(currentTags, post.data.tags || []),
      categoryMatches: getMatchCount(currentCategories, post.data.categories || []),
      timestamp: post.data.date ? new Date(post.data.date).getTime() : 0,
      slug: getEntrySlug(post),
    }))
    .filter(({ tagMatches, categoryMatches }) => tagMatches > 0 || categoryMatches > 0)
    .sort((left, right) => {
      if (right.tagMatches !== left.tagMatches) {
        return right.tagMatches - left.tagMatches;
      }

      if (right.categoryMatches !== left.categoryMatches) {
        return right.categoryMatches - left.categoryMatches;
      }

      if (right.timestamp !== left.timestamp) {
        return right.timestamp - left.timestamp;
      }

      return left.slug.localeCompare(right.slug);
    })
    .map(({ post }) => post)
    .slice(0, limit);
}
