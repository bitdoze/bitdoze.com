The error `Cannot apply unknown utility class: text-primary` suggests that Tailwind CSS v4 is not recognizing the `text-primary` utility class in your project. Based on your `global.css` file, this issue arises because of how you've defined your custom utilities and how Tailwind v4 handles custom utilities and dark mode variants. Let’s analyze the problem and provide a solution.

### Root Cause
In Tailwind CSS v4, custom utilities defined within `@layer utilities` using traditional CSS syntax (e.g., `.text-primary { color: var(--color-primary-text); }`) are not automatically processed by Tailwind’s engine to support variants like `dark:`. This is a change from v3 behavior, where utilities defined in `@layer utilities` were automatically picked up as true utility classes with variant support. In v4, to create custom utilities that work with variants (e.g., `dark:text-primary`), you must use the `@utility` directive instead of plain CSS within `@layer utilities`. Additionally, your dark mode setup needs adjustment to ensure proper variant application.

### Issues in Your Code
1. **Custom Utilities in `@layer utilities`**:
   - You’ve defined `.text-primary` and other utilities inside `@layer utilities` using standard CSS syntax. In Tailwind v4, this approach creates static CSS classes, but they won’t automatically support variants like `dark:` unless explicitly defined with `@utility`.
   - The error indicates that Tailwind doesn’t recognize `text-primary` as a utility class it can process, likely because it’s expecting a utility defined with `@utility` or a built-in utility tied to a theme variable.

2. **Dark Mode Theme Definition**:
   - You’re using `@theme dark { ... }` to define dark mode variables. However, Tailwind v4 doesn’t natively use a separate `@theme dark` block for dark mode. Instead, dark mode is typically implemented using the `dark` variant, which applies styles conditionally based on a selector (e.g., `.dark`) or the `prefers-color-scheme` media query. Your current approach doesn’t align with how Tailwind expects dark mode to be configured.

3. **Missing Variant Support**:
   - Even if `text-primary` worked as a utility, your setup doesn’t explicitly tie it to the `dark` variant. Without using `@utility` or configuring dark mode correctly, Tailwind won’t apply the dark mode styles when the `dark` class is present.

### Solution
To fix this, you need to:
1. Use the `@utility` directive to define custom utilities that support variants like `dark:`.
2. Adjust your dark mode implementation to use the standard Tailwind v4 approach with the `dark` variant.
3. Ensure your theme variables are defined in a way that Tailwind can use them for both light and dark modes.

Here’s a corrected version of your `global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Define theme variables for both light and dark modes */
@theme {
  /* Light theme variables (default) */
  --color-primary-bg: oklch(100% 0 0);
  --color-secondary-bg: oklch(98% 0 0);
  --color-tertiary-bg: oklch(95% 0 0);
  --color-primary-text: oklch(21% 0.006 285.885);
  --color-secondary-text: oklch(40% 0.006 285.885);
  --color-muted-text: oklch(50% 0.006 285.885);
  --color-accent: oklch(54% 0.245 262.881);
  --color-accent-light: oklch(77% 0.152 181.912);
  --color-border: oklch(90% 0 0);
  --color-success: oklch(76% 0.177 163.223);
  --color-error: oklch(71% 0.194 13.428);
  --color-warning: oklch(82% 0.189 84.429);
  --color-info: oklch(74% 0.16 232.661);

  /* Dark theme variables (prefixed for dark mode) */
  --color-dark-primary-bg: oklch(20% 0 0);
  --color-dark-secondary-bg: oklch(25% 0 0);
  --color-dark-tertiary-bg: oklch(30% 0 0);
  --color-dark-primary-text: oklch(95% 0.006 285.885);
  --color-dark-secondary-text: oklch(85% 0.006 285.885);
  --color-dark-muted-text: oklch(75% 0.006 285.885);
  --color-dark-accent: oklch(65% 0.245 262.881);
  --color-dark-accent-light: oklch(60% 0.152 181.912);
  --color-dark-border: oklch(40% 0 0);
  --color-dark-success: oklch(65% 0.177 163.223);
  --color-dark-error: oklch(65% 0.194 13.428);
  --color-dark-warning: oklch(75% 0.189 84.429);
  --color-dark-info: oklch(65% 0.16 232.661);
}

/* Define custom utilities with variant support */
@utility bg-primary {
  background-color: var(--color-primary-bg);
}
@utility dark:bg-primary {
  background-color: var(--color-dark-primary-bg);
}

@utility bg-secondary {
  background-color: var(--color-secondary-bg);
}
@utility dark:bg-secondary {
  background-color: var(--color-dark-secondary-bg);
}

@utility bg-tertiary {
  background-color: var(--color-tertiary-bg);
}
@utility dark:bg-tertiary {
  background-color: var(--color-dark-tertiary-bg);
}

@utility bg-accent {
  background-color: var(--color-accent);
}
@utility dark:bg-accent {
  background-color: var(--color-dark-accent);
}

@utility bg-accent-light {
  background-color: var(--color-accent-light);
}
@utility dark:bg-accent-light {
  background-color: var(--color-dark-accent-light);
}

@utility text-primary {
  color: var(--color-primary-text);
}
@utility dark:text-primary {
  color: var(--color-dark-primary-text);
}

@utility text-secondary {
  color: var(--color-secondary-text);
}
@utility dark:text-secondary {
  color: var(--color-dark-secondary-text);
}

@utility text-muted {
  color: var(--color-muted-text);
}
@utility dark:text-muted {
  color: var(--color-dark-muted-text);
}

@utility text-accent {
  color: var(--color-accent);
}
@utility dark:text-accent {
  color: var(--color-dark-accent);
}

@utility border-color {
  border-color: var(--color-border);
}
@utility dark:border-color {
  border-color: var(--color-dark-border);
}

@utility border-accent {
  border-color: var(--color-accent);
}
@utility dark:border-accent {
  border-color: var(--color-dark-accent);
}

@utility text-success {
  color: var(--color-success);
}
@utility dark:text-success {
  color: var(--color-dark-success);
}

@utility text-error {
  color: var(--color-error);
}
@utility dark:text-error {
  color: var(--color-dark-error);
}

@utility text-warning {
  color: var(--color-warning);
}
@utility dark:text-warning {
  color: var(--color-dark-warning);
}

@utility text-info {
  color: var(--color-info);
}
@utility dark:text-info {
  color: var(--color-dark-info);
}

@utility bg-success {
  background-color: var(--color-success);
}
@utility dark:bg-success {
  background-color: var(--color-dark-success);
}

@utility bg-error {
  background-color: var(--color-error);
}
@utility dark:bg-error {
  background-color: var(--color-dark-error);
}

@utility bg-warning {
  background-color: var(--color-warning);
}
@utility dark:bg-warning {
  background-color: var(--color-dark-warning);
}

@utility bg-info {
  background-color: var(--color-info);
}
@utility dark:bg-info {
  background-color: var(--color-dark-info);
}

@utility border-success {
  border-color: var(--color-success);
}
@utility dark:border-success {
  border-color: var(--color-dark-success);
}

@utility border-error {
  border-color: var(--color-error);
}
@utility dark:border-error {
  border-color: var(--color-dark-error);
}

@utility border-warning {
  border-color: var(--color-warning);
}
@utility dark:border-warning {
  border-color: var(--color-dark-warning);
}

@utility border-info {
  border-color: var(--color-info);
}
@utility dark:border-info {
  border-color: var(--color-dark-info);
}
```

### Explanation of Changes
1. **Theme Variables**:
   - Light mode variables remain as `--color-*`.
   - Dark mode variables are prefixed with `--color-dark-*` within the same `@theme` block. This avoids the non-standard `@theme dark` syntax and aligns with Tailwind’s expectation of a single theme definition.
   - Tailwind v4 uses the `dark` variant to switch between light and dark values, so we define both sets of variables and use them conditionally in utilities.

2. **Custom Utilities with `@utility`**:
   - Replaced `@layer utilities` with individual `@utility` directives for each custom utility.
   - Defined each utility twice: once for light mode (e.g., `@utility text-primary`) and once for dark mode (e.g., `@utility dark:text-primary`). The `@utility` directive ensures these are treated as true Tailwind utilities with variant support.

3. **Dark Mode Activation**:
   - By default, Tailwind v4 uses the `prefers-color-scheme: dark` media query for the `dark` variant. This means `dark:text-primary` will apply when the user’s system is in dark mode.
   - If you want to toggle dark mode manually (e.g., with a class like `<html class="dark">`), you can override the `dark` variant in your CSS:
     ```css
     @custom-variant dark (&:where(.dark, .dark *));
     ```
     Then, add the `dark` class to your HTML root element when dark mode is active (e.g., via JavaScript or server-side rendering).

### Usage Example
With this setup, you can now use your utilities like this in your HTML:
```html
<body class="bg-primary text-primary">
  <p class="text-secondary">This is secondary text.</p>
  <div class="dark:bg-secondary dark:text-muted">This changes in dark mode.</div>
</body>
```

- In light mode (or without the `dark` class), `bg-primary` uses `oklch(100% 0 0)` and `text-primary` uses `oklch(21% 0.006 285.885)`.
- In dark mode (with the `dark` class or `prefers-color-scheme: dark`), `dark:bg-primary` uses `oklch(20% 0 0)` and `dark:text-primary` uses `oklch(95% 0.006 285.885)`.

### Verifying the Fix
1. Ensure your build process is running correctly (e.g., `npx @tailwindcss/cli -i global.css -o output.css`).
2. Check the generated `output.css` to confirm that `text-primary` and `dark:text-primary` classes are present with the correct styles.
3. Test your application in both light and dark modes to verify the styles switch as expected.

This approach resolves the error and ensures your custom utilities work seamlessly with Tailwind v4’s dark mode system. Let me know if you need further assistance!