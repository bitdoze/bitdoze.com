import jsxA11y from "eslint-plugin-jsx-a11y-x";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "public/pagefind/**",
      "functions/**",
      ".impeccable/**",
    ],
  },
  ...astro.configs.recommended,
  {
    // Parse the TS frontmatter of .astro files so TS syntax (interfaces,
    // generics, `as` casts) does not produce "Unexpected token" errors.
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ["**/*.astro"],
    ...jsxA11y.configs.recommended,
    rules: {
      ...jsxA11y.configs.recommended.rules,
      // Astro uses `for` on labels; nested controls or for/id both fine
      "jsx-a11y-x/label-has-associated-control": [
        "error",
        {
          assert: "either",
          controlComponents: ["input", "textarea", "select"],
        },
      ],
    },
  },
];
