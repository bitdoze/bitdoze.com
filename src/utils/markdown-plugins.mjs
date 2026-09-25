// Build-time Markdown/MDX enhancements wired in astro.config.mjs.

const LANG_LABELS = {
  plaintext: "text",
  txt: "text",
  shellscript: "bash",
  sh: "bash",
  shell: "bash",
  console: "bash",
};

/**
 * Shiki transformer: wraps each highlighted block in
 * <figure class="code-block"><figcaption class="code-block-header">lang</figcaption><pre/></figure>.
 * PostLayout's script mounts the copy button into the header.
 */
export function codeBlockHeader() {
  return {
    name: "bitdoze:code-block-header",
    root(root) {
      const pre = root.children.find((node) => node.type === "element" && node.tagName === "pre");
      if (!pre) return;

      const lang = String(this.options.lang ?? "text").toLowerCase();
      const label = LANG_LABELS[lang] ?? lang;

      root.children = [
        {
          type: "element",
          tagName: "figure",
          properties: { className: ["code-block"], dataLanguage: label },
          children: [
            {
              type: "element",
              tagName: "figcaption",
              properties: { className: ["code-block-header"], dataPagefindIgnore: "" },
              children: [
                {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["code-block-lang"] },
                  children: [{ type: "text", value: label }],
                },
              ],
            },
            pre,
          ],
        },
      ];
    },
  };
}

const FILENAME_LIKE = /\.(png|jpe?g|webp|gif|svg|avif)$/i;

/**
 * Satteri hast plugin: a paragraph holding only an image gets a visible caption from the alt text.
 * The caption is a <span> after the <img> (a <figcaption> can't live inside <p>), aria-hidden so
 * screen readers don't hear the alt twice. Must run before Astro's image marker, which strips alt.
 */
export const imageCaptions = {
  name: "bitdoze:image-captions",
  element: {
    filter: ["img"],
    visit(node, ctx) {
      const alt = typeof node.properties?.alt === "string" ? node.properties.alt.trim() : "";
      if (alt.length < 4 || FILENAME_LIKE.test(alt)) return;

      const parent = ctx.parent(node);
      if (!parent || parent.type !== "element" || parent.tagName !== "p") return;

      const siblings = parent.children ?? [];
      const elementCount = siblings.filter((child) => child.type === "element").length;
      const hasText = siblings.some((child) => child.type === "text" && child.value.trim() !== "");
      if (elementCount !== 1 || hasText) return;

      ctx.setProperty(parent, "className", ["img-figure"]);
      ctx.insertAfter(node, {
        type: "element",
        tagName: "span",
        properties: { className: ["img-caption"], ariaHidden: "true" },
        children: [{ type: "text", value: alt }],
      });
    },
  },
};
