import { getCollection } from "astro:content";
import { getEntrySlug } from "@utils/content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: `${getEntrySlug(post)}.md` },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const { body } = post;

  const frontmatter = [
    `---`,
    `title: ${JSON.stringify(post.data.title)}`,
    `description: ${JSON.stringify(post.data.description || "")}`,
    `date: ${post.data.date ? new Date(post.data.date).toISOString().split("T")[0] : ""}`,
    `categories: ${JSON.stringify(post.data.categories || [])}`,
    `tags: ${JSON.stringify(post.data.tags || [])}`,
    `---`,
  ].join("\n");

  const markdown = `${frontmatter}\n\n${body || ""}`;

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown",
      "X-Markdown-Tokens": String(markdown.length),
    },
  });
};
