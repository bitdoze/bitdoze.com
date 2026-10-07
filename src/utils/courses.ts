import coursesData from "../data/courses.json";
import { getEntryHref, getEntrySlug } from "@utils/content";
import { toTaxonomySlug } from "@utils/slugs";
import { extractYoutubeVideoId } from "@utils/youtube";

/**
 * Course catalog — data lives in src/data/courses.json.
 * Add a course by appending an object, add a lesson by appending to `lessons`.
 * Validation below throws at build time on bad data (fail loud, like the
 * self-hosted journey slug check).
 */

export interface CourseLesson {
  /** URL segment. Optional — falls back to a slugified title. */
  slug?: string;
  title: string;
  /** Any YouTube watch/share URL — the video ID is extracted from it. */
  video: string;
  description?: string;
  /** e.g. "12:34" — shown in the chapter list when present. */
  duration?: string;
  /** Post slugs of matching written guides — linked from the lesson page. */
  relatedPosts?: string[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  /** Small pill on cards/overview, e.g. "Self-hosting". */
  badge?: string;
  /** e.g. "Beginner friendly". */
  level?: string;
  /** Link to the full YouTube playlist, shown as a fallback link. */
  playlist?: string;
  /** Post slugs of matching written guides — linked from the overview page. */
  relatedPosts?: string[];
  lessons: CourseLesson[];
}

export const lessonSlug = (lesson: CourseLesson): string =>
  lesson.slug || toTaxonomySlug(lesson.title);

export const courseHref = (course: Course): string => `/courses/${course.slug}/`;

export const lessonHref = (course: Course, lesson: CourseLesson): string =>
  `${courseHref(course)}${lessonSlug(lesson)}/`;

export const lessonVideoId = (lesson: CourseLesson): string | null =>
  extractYoutubeVideoId(lesson.video);

/** 16:9 thumbnail (320×180) — better for cards than the 4:3 hqdefault. */
export const lessonThumbnail = (lesson: CourseLesson): string => {
  const id = lessonVideoId(lesson);
  return id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : "/images/youtube-placeholder.jpg";
};

/** Full-res 1280×720 thumbnail for og:image / social cards. */
export const lessonOgImage = (lesson: CourseLesson): string => {
  const id = lessonVideoId(lesson);
  return id
    ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    : "/images/youtube-placeholder.jpg";
};

type CoursePostEntry = {
  slug?: string;
  id?: string;
  data?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
};

export interface RelatedPost {
  href: string;
  title: string;
  description?: string;
}

/**
 * Resolve post slugs from courses.json against the posts collection.
 * Throws on typos — same fail-loud contract as the self-hosted journey map.
 */
export function resolveRelatedPosts(
  posts: CoursePostEntry[],
  slugs: string[] | undefined,
  context: string
): RelatedPost[] {
  if (!slugs?.length) return [];
  const bySlug = new Map<string, CoursePostEntry>(
    posts.map((post) => [getEntrySlug(post), post])
  );
  return slugs.map((slug) => {
    const post = bySlug.get(slug);
    if (!post) {
      throw new Error(`courses: no post found for related slug "${slug}" (${context})`);
    }
    return {
      href: getEntryHref(post),
      title: post.data?.title ?? slug,
      description: post.data?.description,
    };
  });
}

export function getCourses(): Course[] {
  return coursesData.courses as Course[];
}

export function getCourse(slug: string): Course | undefined {
  return getCourses().find((course) => course.slug === slug);
}

export interface LessonNav {
  index: number;
  lesson: CourseLesson;
  prev: CourseLesson | null;
  next: CourseLesson | null;
}

export function getLessonNav(course: Course, lessonSlugValue: string): LessonNav {
  const index = course.lessons.findIndex((lesson) => lessonSlug(lesson) === lessonSlugValue);
  if (index === -1) {
    throw new Error(`courses: no lesson "${lessonSlugValue}" in course "${course.slug}"`);
  }
  return {
    index,
    lesson: course.lessons[index],
    prev: index > 0 ? course.lessons[index - 1] : null,
    next: index < course.lessons.length - 1 ? course.lessons[index + 1] : null,
  };
}

// ---- Build-time validation ------------------------------------------------
const seenCourseSlugs = new Set<string>();
for (const course of getCourses()) {
  if (!course.slug || seenCourseSlugs.has(course.slug)) {
    throw new Error(`courses: duplicate or missing course slug "${course.slug}"`);
  }
  seenCourseSlugs.add(course.slug);

  if (!Array.isArray(course.lessons) || course.lessons.length === 0) {
    throw new Error(`courses: "${course.slug}" has no lessons`);
  }

  const seenLessonSlugs = new Set<string>();
  for (const lesson of course.lessons) {
    const slug = lessonSlug(lesson);
    if (!slug || seenLessonSlugs.has(slug)) {
      throw new Error(`courses: duplicate or missing lesson slug "${slug}" in "${course.slug}"`);
    }
    seenLessonSlugs.add(slug);
    if (!extractYoutubeVideoId(lesson.video)) {
      throw new Error(
        `courses: lesson "${slug}" in "${course.slug}" has an unparseable YouTube URL: ${lesson.video}`
      );
    }
  }
}
