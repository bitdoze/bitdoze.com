import type { APIRoute } from "astro";
import { generateOgImage } from "@utils/og-image";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: "Bitdoze",
    subtitle: "DevOps, Programming & Self-Hosting Guides",
  });

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
