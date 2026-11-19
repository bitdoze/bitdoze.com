import type { CollectionEntry } from "astro:content";
import { getEntrySlug } from "@utils/content";
import type { SupportedLocale } from "@utils/i18n";
import { journeyStages } from "../data/self-hosted-journey";

type Post = CollectionEntry<"posts">;

export interface NextStepJourney {
  /** 1-based index across all stages, epilogue included (matches /self-hosted/). */
  stageNumber: number;
  /** Total stage count across all stages. */
  stageCount: number;
  stageId: string;
}

export interface NextStep {
  post: Post;
  journey?: NextStepJourney;
}

/**
 * The single "keep reading" target under an article. First match wins:
 * frontmatter `next` → next position in the same series → next slug in the
 * Self-Hosted Journey (EN only). `journey` is set whenever the current EN
 * post appears in the journey, regardless of which rule won.
 */
export function getNextStep(
  current: Post,
  localePosts: Post[],
  locale: SupportedLocale
): NextStep | null {
  const slug = getEntrySlug(current);

  let journey: NextStepJourney | undefined;
  if (locale === "en") {
    const stage = journeyStages.find((s) => s.links.some((link) => link.slug === slug));
    if (stage) {
      const stageIndex = journeyStages.indexOf(stage);
      journey = {
        stageNumber: stageIndex + 1,
        stageCount: journeyStages.length,
        stageId: stage.id,
      };
    }
  }

  let next: Post | undefined;

  if (current.data.next) {
    const wanted = current.data.next;
    next = localePosts.find((p) => getEntrySlug(p) === wanted);
    if (!next) {
      throw new Error(`${current.id}: next slug "${wanted}" not found among ${locale} posts`);
    }
  }
  if (!next && current.data.series) {
    const [seriesName, position] = current.data.series;
    const nextPosition = Number(position) + 1;
    next = localePosts.find(
      (p) => p.data.series?.[0] === seriesName && Number(p.data.series[1]) === nextPosition
    );
  }
  if (!next && journey) {
    const ordered = journeyStages.flatMap((s) => s.links.map((link) => link.slug));
    const later = ordered.slice(ordered.indexOf(slug) + 1);
    next = later
      .map((s) => localePosts.find((p) => getEntrySlug(p) === s))
      .find((p): p is Post => Boolean(p));
  }

  return next ? { post: next, journey } : null;
}
