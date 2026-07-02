import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getEntrySlug } from "@utils/content";
import { generateOgImage } from "@utils/og-image";

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: getEntrySlug(post) },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const png = await generateOgImage({
    title: post.data.title,
    subtitle: post.data.description || undefined,
  });

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
