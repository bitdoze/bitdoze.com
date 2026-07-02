import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(process.cwd(), "src", "assets", "fonts");

const BOLD_FONT = readFileSync(join(FONTS_DIR, "Go-Bold.ttf"));
const REGULAR_FONT = readFileSync(join(FONTS_DIR, "Go-Regular.ttf"));

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

interface OgImageOptions {
  title: string;
  subtitle?: string;
}

export async function generateOgImage({ title, subtitle }: OgImageOptions): Promise<Buffer> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3730a3 100%)",
          padding: "80px",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                fontSize: "32px",
                color: "#93c5fd",
              },
              children: "Bitdoze",
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontSize: title.length > 60 ? "48px" : "64px",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
                maxWidth: "1000px",
              },
              children: title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                fontSize: "28px",
                color: "#cbd5e1",
              },
              children: subtitle || "DevOps, Programming & Self-Hosting Guides",
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        { name: "Go", data: BOLD_FONT, weight: 700, style: "normal" },
        { name: "Go", data: REGULAR_FONT, weight: 400, style: "normal" },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
  });
  const png = resvg.render().asPng();
  return Buffer.from(png);
}
