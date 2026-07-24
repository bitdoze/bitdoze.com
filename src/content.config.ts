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
      authors: z.array(z.string()).min(1).default(["admin"]),
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
          ]),
        )
        .length(1),
      // Cap at 3 tags; normalize to lowercase kebab-case
      tags: z
        .array(z.string())
        .default(["others"])
        .transform((tags) => {
          const cleaned = tags
            .map((t) =>
              t
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
            )
            .filter(Boolean);
          return [...new Set(cleaned)].slice(0, 3);
        }),
      series: z.tuple([z.string(), z.string()]).optional(),
      locale: z.enum(["en", "es"]).optional(),
      translationKey: z.string().optional(),
      canonical: z.string().optional(),
      draft: z.boolean().optional(),
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
          icon: z.string().optional()
        })
      )
    })
  }),
});

// Export collections
export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  authors: authorsCollection,
  about: aboutCollection,
};
