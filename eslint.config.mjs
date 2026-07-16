import jsxA11y from "eslint-plugin-jsx-a11y";
import astro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "public/pagefind/**",
      "functions/**",
    ],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // Astro uses `for` on labels; nested controls or for/id both fine
      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          assert: "either",
          controlComponents: ["input", "textarea", "select"],
        },
      ],
    },
  },
];
