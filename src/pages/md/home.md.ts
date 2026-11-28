import type { APIRoute } from "astro";
import { siteConfig } from "@config/site";
import { getEntryHref } from "@utils/content";
import { getPostsByLocale } from "@utils/postsCache";

// Generated replacement for the stale hand-written public/md/home.md that
// llms.txt links to as the "Full English catalog".
export const GET: APIRoute = async () => {
  const posts = await getPostsByLocale("en");
  const sorted = [...posts].sort(
    (a, b) => new Date(b.data.date || 0).getTime() - new Date(a.data.date || 0).getTime()
  );

  const lines = [
    `---`,
    `title: "Bitdoze"`,
    `description: "Practical DevOps, programming, and self-hosting guides for developers and operators."`,
    `url: "${siteConfig.url}"`,
    `---`,
    ``,
    `# Bitdoze`,
    ``,
    `Practical DevOps, programming, and self-hosting guides for developers and operators.`,
    ``,
    `## All articles (${sorted.length})`,
    ``,
    ...sorted.map((p) => {
      const d = p.data.lastmod ?? p.data.date;
      return `- [${p.data.title}](${siteConfig.url}${getEntryHref(p)})${d ? ` — ${new Date(d).toISOString().slice(0, 10)}` : ""}`;
    }),
    ``,
    `## Topics`,
    ``,
    `- DevOps & infrastructure`,
    `- Self-hosting & homelab`,
    `- AI coding tools & agents`,
    `- Linux & terminal tools`,
    `- Programming guides`,
    ``,
  ];

  return new Response(lines.join("\n"), {
    status: 200,
    headers: { "Content-Type": "text/markdown" },
  });
};
