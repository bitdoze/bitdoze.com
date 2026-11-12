import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Post collection schema
const postsCollection = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      meta_title: z.string().optional(),
      description: z
        .string()
        .min(1, "Post description is required")
        .transform((s) => s.trim()),
      date: z.date(),
      lastmod: z.date().optional(),
      image: image(),
      imageAlt: z.string().optional(),
      authors: z.array(z.string()).min(1),
      categories: z
        .array(
          z.enum([
            "ai",
            "self-hosting",
            "linux",
            "web-development",
            "wordpress",
            "hosting",
            "tools",
            "gadgets",
          ])
        )
        .length(1),
      // 1–3 tags; normalize to lowercase kebab-case with diacritics stripped,
      // matching toTaxonomySlug() so frontmatter tags always match archive URLs
      tags: z
        .array(z.string())
        .min(1)
        .transform((tags) => {
          const cleaned = tags
            .map((t) =>
              t
                .normalize("NFKD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
            )
            .filter(Boolean);
          const unique = [...new Set(cleaned)];
          // Hard fail (not silent truncation) so the author picks the 3 most
          // specific tags — truncation used to drop the specific one (§7.6).
          if (unique.length > 3) {
            throw new Error(
              `tags: ${unique.length} tags after normalization (${unique.join(", ")}) — keep the 3 most specific`
            );
          }
          return unique;
        }),
      series: z.tuple([z.string(), z.string()]).optional(),
      translationKey: z.string().optional(),
      canonical: z.url().optional(),
      draft: z.boolean().optional(),
      /** Opt-in quick answer — 1-2 line command/result shown as a success Notice above prose (install/config guides only). */
      quickAnswer: z.string().optional(),
      /** Hand-filled proof of testing — environments the guide was verified on (e.g. ["Ubuntu 24.04", "Docker 27.3"]). Never auto-generated. */
      testedOn: z.array(z.string()).max(4).optional(),
      /** Hand-filled real-world time the guide takes (e.g. "15 min") — replaces reading time in the meta line when set. */
      timeToComplete: z.string().optional(),
    }),
});

// Author collection schema
const authorsCollection = defineCollection({
  loader: glob({
    base: "./src/content/authors",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        youtube: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({
    base: "./src/content/pages",
    pattern: "**/*.md{,x}",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// About collection schema
const aboutCollection = defineCollection({
  loader: glob({
    base: "./src/content/about",
    pattern: "**/*.md{,x}",
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    what_i_do: z.object({
      title: z.string(),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string().optional(),
        })
      ),
    }),
  }),
});

// Daily news digest collection — written by an AI agent, no cover images
const newsCollection = defineCollection({
  loader: glob({
    base: "./src/content/news",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .min(1, "Digest description is required")
      .transform((s) => s.trim()),
    date: z.date(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  authors: authorsCollection,
  about: aboutCollection,
  news: newsCollection,
};
