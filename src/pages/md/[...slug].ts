import { getEntrySlug } from "@utils/content";
import type { APIRoute } from "astro";
import { getAllPublishedPosts } from "@utils/postsCache";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = (await getAllPublishedPosts()).map((post) => ({
    params: { slug: `${getEntrySlug(post)}.md` },
    props: {
      title: post.data.title,
      description: post.data.description,
      date: post.data.date,
      categories: post.data.categories,
      tags: post.data.tags,
      body: post.body,
    },
  }));
  // News digests advertise /md/news/<date>.md — they must resolve too.
  const news = (await getCollection("news", ({ data }) => !data.draft)).map((d) => ({
    params: { slug: `news/${getEntrySlug(d)}.md` },
    props: {
      title: d.data.title,
      description: d.data.description,
      date: d.data.date,
      categories: [],
      tags: [],
      body: d.body,
    },
  }));
  return [...posts, ...news];
}

/**
 * Render the raw MDX body to plain markdown for agent consumers:
 *  - drop import/export statements (build-time code, meaningless to readers)
 *  - YouTubeEmbed/Button become markdown links
 *  - Notice/Accordion wrappers become blockquotes/plain text
 *  - any remaining JSX tags are unwrapped to their text content
 */
function mdxToMarkdown(body: string): string {
  let md = body;
  md = md.replace(/^import\s[^\n]*\n/gm, "").replace(/^export\s[^\n]*\n/gm, "");
  md = md.replace(
    /<YouTubeEmbed\s+[^>]*?url="([^"]+)"[^>]*?label="([^"]*)"[^>]*?\/>/g,
    (_m, url, label) => `\nVideo: [${label}](${url})\n`
  );
  md = md.replace(
    /<YouTubeEmbed\s+[^>]*?label="([^"]*)"[^>]*?url="([^"]+)"[^>]*?\/>/g,
    (_m, label, url) => `\nVideo: [${label}](${url})\n`
  );
  md = md.replace(
    /<YouTubeEmbed\s+[^>]*?url="([^"]+)"[^>]*?\/>/g,
    (_m, url) => `\nVideo: ${url}\n`
  );
  md = md.replace(
    /<Button\s+[^>]*?(?:text|label)="([^"]+)"[^>]*?(?:link|url|href)="([^"]+)"[^>]*?\/>/g,
    (_m, text, link) => `[${text}](${link})`
  );
  md = md.replace(
    /<Button\s+[^>]*?(?:link|url|href)="([^"]+)"[^>]*?(?:text|label)="([^"]+)"[^>]*?\/>/g,
    (_m, link, text) => `[${text}](${link})`
  );
  // AmazonProduct → keep the product name and its /go/ link if present.
  md = md.replace(/<AmazonProduct\s+[\s\S]*?\/>/g, (m) => {
    const name = m.match(/productName="([^"]+)"/)?.[1];
    const link = m.match(/productLink="([^"]+)"/)?.[1];
    return name ? `\nProduct: ${link ? `[${name}](${link})` : name}\n` : "";
  });
  // Notice/Accordion and any other paired JSX: keep inner text, drop the tags.
  md = md.replace(/<\/?(?:Notice|Accordion|ListCheck|Tabs|TabItem)[^>]*>/g, "\n");
  // Strip remaining JSX/HTML tags but keep inner content.
  md = md.replace(/<\/?[A-Za-z][^>]*>/g, "");
  md = md.replace(/\{[^}\n]*\}/g, ""); // leftover {} expressions
  return md.replace(/\n{3,}/g, "\n\n").trim();
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description, date, categories, tags, body } = props;

  const frontmatter = [
    `---`,
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description || "")}`,
    `date: ${date ? new Date(date).toISOString().split("T")[0] : ""}`,
    `categories: ${JSON.stringify(categories || [])}`,
    `tags: ${JSON.stringify(tags || [])}`,
    `---`,
  ].join("\n");

  const markdown = `${frontmatter}\n\n${mdxToMarkdown(body || "")}`;

  const tokenCount = Math.ceil(markdown.length / 4);

  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown",
      "X-Markdown-Tokens": String(tokenCount),
    },
  });
};
