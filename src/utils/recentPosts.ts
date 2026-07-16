import { isPostIdInLocale, type SupportedLocale } from "@utils/i18n";
import { getAllPublishedPosts, type Post } from "@utils/postsCache";

/** Locale → posts newest-first (full list, non-draft). */
let recentPromise: Promise<Record<SupportedLocale, Post[]>> | null = null;

function sortByDateDesc(a: Post, b: Post): number {
  return (
    new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime()
  );
}

async function buildRecentByLocale(): Promise<Record<SupportedLocale, Post[]>> {
  // Shares the same cached getCollection as translationMap / other helpers
  const posts = await getAllPublishedPosts();

  const en = posts.filter((p) => isPostIdInLocale(p.id, "en")).sort(sortByDateDesc);
  const es = posts.filter((p) => isPostIdInLocale(p.id, "es")).sort(sortByDateDesc);

  return { en, es };
}

/**
 * Cached, locale-sorted posts for the build process.
 * One collection scan is shared across every footer (and other callers).
 */
export function getRecentPostsByLocale() {
  if (!recentPromise) {
    recentPromise = buildRecentByLocale();
  }
  return recentPromise;
}

/** Latest N non-draft posts for a locale (default 3 for footer). */
export async function getRecentPosts(
  locale: SupportedLocale,
  limit = 3,
): Promise<Post[]> {
  const byLocale = await getRecentPostsByLocale();
  return byLocale[locale].slice(0, limit);
}
