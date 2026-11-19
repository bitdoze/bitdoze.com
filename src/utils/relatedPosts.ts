import type { CollectionEntry } from "astro:content";
import { getEntrySlug } from "@utils/content";

/**
 * Score = Σ over shared tags of ln(1 + N / count(tag)) — rare tags are a
 * stronger signal than common ones — +3 for the same series, +0.5 for the
 * same category. Candidates with score 0 are dropped. Posts listed in the
 * frontmatter `related` field pin to the top, in that order.
 */
export function getRelatedPosts(
  currentPost: CollectionEntry<"posts">,
  otherPosts: CollectionEntry<"posts">[],
  limit: number
): CollectionEntry<"posts">[] {
  const bySlug = new Map(otherPosts.map((post) => [getEntrySlug(post), post]));

  const pinned: CollectionEntry<"posts">[] = [];
  for (const slug of currentPost.data.related ?? []) {
    const target = bySlug.get(slug);
    if (!target) {
      throw new Error(
        `${currentPost.id}: related slug "${slug}" not found among same-locale posts`
      );
    }
    pinned.push(target);
  }
  const pinnedSlugs = new Set(pinned.map((post) => getEntrySlug(post)));

  const currentTags = new Set(currentPost.data.tags || []);
  const tagCounts = new Map<string, number>();
  for (const post of [currentPost, ...otherPosts]) {
    for (const tag of new Set(post.data.tags || [])) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const N = otherPosts.length + 1;
  const currentSeries = currentPost.data.series?.[0];
  const currentCategory = currentPost.data.categories?.[0];

  const ranked = otherPosts
    .filter((post) => !pinnedSlugs.has(getEntrySlug(post)))
    .map((post) => {
      let score = 0;
      for (const tag of post.data.tags || []) {
        if (currentTags.has(tag)) {
          score += Math.log(1 + N / (tagCounts.get(tag) ?? 1));
        }
      }
      if (currentSeries && post.data.series?.[0] === currentSeries) score += 3;
      if (currentCategory && post.data.categories?.[0] === currentCategory) score += 0.5;
      return {
        post,
        score,
        timestamp: post.data.date ? new Date(post.data.date).getTime() : 0,
        slug: getEntrySlug(post),
      };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      if (right.timestamp !== left.timestamp) return right.timestamp - left.timestamp;
      return left.slug.localeCompare(right.slug);
    })
    .map(({ post }) => post);

  return [...pinned, ...ranked].slice(0, limit);
}
