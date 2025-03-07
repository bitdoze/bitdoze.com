[Skip to content](https://docs.astro.build/en/guides/view-transitions/#_top)

# View transitions

Astro supports view transitions with just a few lines of code. View transitions update your page content without the browser’s normal, full-page navigation refresh and provide seamless animations between pages. Where [browser support for the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#browser_compatibility) is lacking, Astro allows you to [control fallback strategies](https://docs.astro.build/en/guides/view-transitions/#fallback-control) for the best possible experience for all visitors.

Astro provides a `<ClientRouter />` routing component that can be added to a single page’s `<head>` to control page transitions as you navigate away to another page. It provides a lightweight client-side router that [intercepts navigation](https://docs.astro.build/en/guides/view-transitions/#client-side-navigation-process) and allows you to customize the transition between pages.

Add this component to a reusable `.astro` component, such as a common head or layout, for [animated page transitions across your entire site (SPA mode)](https://docs.astro.build/en/guides/view-transitions/#full-site-view-transitions-spa-mode).

Astro’s view transitions support is powered by the new [View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/) browser API and also includes:

- A few [built-in animation options](https://docs.astro.build/en/guides/view-transitions/#built-in-animation-directives), such as `fade`, `slide`, and `none`.
- Support for both forwards and backwards navigation animations.
- The ability to fully [customize all aspects of transition animation](https://docs.astro.build/en/guides/view-transitions/#customizing-animations), and build your own animations.
- The option to [prevent client-side navigation for non-page links](https://docs.astro.build/en/guides/view-transitions/#preventing-client-side-navigation).
- [Control over fallback behavior](https://docs.astro.build/en/guides/view-transitions/#fallback-control) for browsers that do not yet support the View Transition APIs.
- Automatic support for [`prefers-reduced-motion`](https://docs.astro.build/en/guides/view-transitions/#prefers-reduced-motion).

## Adding View Transitions to a Page

[Section titled Adding View Transitions to a Page](https://docs.astro.build/en/guides/view-transitions/#adding-view-transitions-to-a-page)

Opt in to using view transitions on individual pages by importing and adding the `<ClientRouter />` routing component to `<head>` on every desired page.

```

---

import { ClientRouter } from 'astro:transitions';

---

<html lang="en">

  <head>

    <title>My Homepage</title>

    <ClientRouter />

  </head>

  <body>

    <h1>Welcome to my website!</h1>

  </body>

</html>
```

## Full site view transitions (SPA mode)

[Section titled Full site view transitions (SPA mode)](https://docs.astro.build/en/guides/view-transitions/#full-site-view-transitions-spa-mode)

Import and add the `<ClientRouter />` component to your common `<head>` or shared layout component. Astro will create default page animations based on the similarities between the old and new page, and will also provide fallback behavior for unsupported browsers.

The example below shows adding Astro’s default page navigation animations site-wide, including the default fallback control option for non-supporting browsers, by importing and adding this component to a `<CommonHead />` Astro component:

```

---

import { ClientRouter } from 'astro:transitions';

---

<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<meta name="generator" content={Astro.generator} />

<!-- Primary Meta Tags -->

<title>{title}</title>

<meta name="title" content={title} />

<meta name="description" content={description} />

<ClientRouter />
```

No other configuration is necessary to enable Astro’s default client-side navigation!

Use [transition directives](https://docs.astro.build/en/guides/view-transitions/#transition-directives) or [override default client-side navigation](https://docs.astro.build/en/guides/view-transitions/#preventing-client-side-navigation) on individual elements for finer control.

## Transition Directives

[Section titled Transition Directives](https://docs.astro.build/en/guides/view-transitions/#transition-directives)

Astro will automatically assign corresponding elements found in both the old page and the new page a shared, unique `view-transition-name`. This pair of matching elements is inferred by both the type of element and its location in the DOM.

Use optional `transition:*` directives on page elements in your `.astro` components for finer control over the page transition behaviour during navigation.

- `transition:name`: Allows you to override Astro’s default element matching for old/new content animation and [specify a transition name](https://docs.astro.build/en/guides/view-transitions/#naming-a-transition) to associate a pair of DOM elements.
- `transition:animate`: Allows you to override Astro’s default animation while replacing the old element with the new one by specifying an animation type. Use Astro’s [built-in animation directives](https://docs.astro.build/en/guides/view-transitions/#built-in-animation-directives) or [create custom transition animations](https://docs.astro.build/en/guides/view-transitions/#customizing-animations).
- `transition:persist`: Allows you to override Astro’s default replacing old elements for new ones and instead [persist components and HTML elements](https://docs.astro.build/en/guides/view-transitions/#maintaining-state) when navigating to another page.

### Naming a transition

[Section titled Naming a transition](https://docs.astro.build/en/guides/view-transitions/#naming-a-transition)

In some cases, you may want or need to identify the corresponding view transition elements yourself. You can specify a name for a pair of elements using the `transition:name` directive.

```

<aside transition:name="hero">
```

```

<aside transition:name="hero">
```

Note that the provided `transition:name` value can only be used once on each page. Set this manually when Astro can’t infer a proper name itself, or for more fine control over matching elements.

### Maintaining State

[Section titled Maintaining State](https://docs.astro.build/en/guides/view-transitions/#maintaining-state)

**Added in:** `astro@2.10.0`

You can persist components and HTML elements (instead of replacing them) across page navigations using the `transition:persist` directive.

For example, the following `<video>` will continue to play as you navigate to another page that contains the same video element. This works for both forwards and backwards navigation.

```

<video controls="" autoplay="" transition:persist>

  <source src="https://ia804502.us.archive.org/33/items/GoldenGa1939_3/GoldenGa1939_3_512kb.mp4" type="video/mp4">

</video>
```

You can also place the directive on an [Astro island](https://docs.astro.build/en/concepts/islands/) (a UI framework component with a [`client:` directive](https://docs.astro.build/en/reference/directives-reference/#client-directives)). If that component exists on the next page, the island from the old page **with its current state** will continue to be displayed, instead of replacing it with the island from the new page.

In the example below, the component’s internal state of the count will not be reset when navigating back and forth across pages that contain the `<Counter />` component with the `transition:persist` attribute.

```

<Counter client:load transition:persist initialCount={5} />
```

You can also [manually identify corresponding elements](https://docs.astro.build/en/guides/view-transitions/#naming-a-transition) if the island/element is in a different component between the two pages.

```

<Video controls="" autoplay="" transition:name="media-player" transition:persist />
```

```

<MyVideo controls="" autoplay="" transition:name="media-player" transition:persist />
```

As a convenient shorthand, `transition:persist` can alternatively take a transition name as a value.

```

<video controls="" autoplay="" transition:persist="media-player">
```

#### `transition:persist-props`

[Section titled transition:persist-props](https://docs.astro.build/en/guides/view-transitions/#transitionpersist-props)

**Added in:** `astro@4.5.0`

This allows you to control whether or not an island’s props should be persisted upon navigation.

By default, when you add `transition:persist` to an island, the state is retained upon navigation, but your component will re-render with new props. This is useful, for example, when a component receives page-specific props such as the current page’s `title`.

You can override this behavior by setting `transition:persist-props` in addition to `transition:persist`. Adding this directive will keep an island’s existing props (not re-render with new values) in addition to maintaining its existing state.

### Built-in Animation Directives

[Section titled Built-in Animation Directives](https://docs.astro.build/en/guides/view-transitions/#built-in-animation-directives)

Astro comes with a few built-in animations to override the default `fade` transition. Add the `transition:animate` directive to individual elements to customize the behavior of specific transitions.

- `fade` (default): An opinionated crossfade animation. The old content fades out and the new content fades in.
- `initial`: Opt out of Astro’s opinionated crossfade animation and use the browser’s default styling.
- `slide`: An animation where the old content slides out to the left and new content slides in from the right. On backwards navigation, the animations are the opposite.
- `none`: Disable the browser’s default animations. Use on a page’s `<html>` element to disable the default fade for every element on the page.

Combine directives for full control over your page animation. Set a page default on the `<html>` element, and override on any individual elements as desired.

The example below produces a slide animation for the body content while disabling the browser’s default fade animation for the rest of the page:

```

---

import CommonHead from '../components/CommonHead.astro';

---

<html transition:name="root" transition:animate="none">

  <head>

    <CommonHead />

  </head>

  <body>

    <header>

      ...

    </header>

    <!-- Override your page default on a single element -->

    <main transition:animate="slide">

      ...

    </main>

  </body>

</html>
```

### Customizing Animations

[Section titled Customizing Animations](https://docs.astro.build/en/guides/view-transitions/#customizing-animations)

You can customize all aspects of a transition with any CSS animation properties.

To customize a built-in animation, first import the animation from `astro:transitions`, and then pass in customization options.

The example below customizes the duration of the built-in `fade` animation:

```

---

import { fade } from 'astro:transitions';

---

<header transition:animate={fade({ duration: '0.4s' })}>
```

You can also define your own animations for use with `transition:animate` by defining both the forwards and backwards behavior, as well as new and old pages, according to the following types:

```

export interface TransitionAnimation {

  name: string; // The name of the keyframe

  delay?: number | string;

  duration?: number | string;

  easing?: string;

  fillMode?: string;

  direction?: string;

}

export interface TransitionAnimationPair {

  old: TransitionAnimation | TransitionAnimation[];

  new: TransitionAnimation | TransitionAnimation[];

}

export interface TransitionDirectionalAnimations {

  forwards: TransitionAnimationPair;

  backwards: TransitionAnimationPair;

}
```

The following example shows all the necessary properties to define a custom `bump` animation inside a `<style is:global>` tag in your root layout file:

```

---

import { ClientRouter } from 'astro:transitions';

---

<html lang="en">

  <head>

    <ClientRouter />

  </head>

  <body>

    <slot />

  </body>

</html>

<style is:global>

  @keyframes bump {

    0% {

      opacity: 0;

      transform: scale(1) translateX(200px);

    }

    50% {

      opacity: 0.5;

      transform: scale(1.1);

    }

    100% {

      opacity: 1;

      transform: scale(1) translateX(0);

    }

  }

</style>
```

The animation’s behavior must be defined in the frontmatter of every component using the animation:

```

---

const anim = {

  old: {

    name: 'bump',

    duration: '0.5s',

    easing: 'ease-in',

    direction: 'reverse',

  },

  new: {

    name: 'bump',

    duration: '0.5s',

    easing: 'ease-in-out',

  },

};

const customTransition = {

  forwards: anim,

  backwards: anim,

};

---

<header transition:animate={customTransition}> ... </header>
```

You have great flexibility when defining custom animations. To achieve your desired result, you may wish to consider unusual combinations such as using different objects for forward and backward, or providing separate keyframe animations for old and new.

## Router control

[Section titled Router control](https://docs.astro.build/en/guides/view-transitions/#router-control)

The `<ClientRouter />` router handles navigation by listening to:

- Clicks on `<a>` elements.
- Backwards and forwards navigation events.

The following options allow you to further control when navigation occurs within the router:

- `data-astro-reload`: an `<a>` tag attribute to [force a full-page navigation](https://docs.astro.build/en/guides/view-transitions/#preventing-client-side-navigation)
- `data-astro-history="auto | push | replace"`: an `<a>` tag attribute to [control the browser’s history](https://docs.astro.build/en/guides/view-transitions/#replace-entries-in-the-browser-history)
- `navigate(href, options)`: a method available to any client script or client component to [trigger navigation](https://docs.astro.build/en/guides/view-transitions/#trigger-navigation)

### Preventing client-side navigation

[Section titled Preventing client-side navigation](https://docs.astro.build/en/guides/view-transitions/#preventing-client-side-navigation)

There are some cases where you cannot navigate via client-side routing since both pages involved must use the `<ClientRouter />` router to prevent a full-page reload. You may also not want client-side routing on every navigation change and would prefer a traditional page navigation on select routes instead.

You can opt out of client-side routing on a per-link basis by adding the `data-astro-reload` attribute to any `<a>` or `<form>` tag. This attribute will override any existing `<ClientRouter />` component and instead trigger a browser refresh during navigation.

The following example shows preventing client-side routing when navigating to an article from the home page only. This still allows you to have animation on shared elements, such as a hero image, when navigating to the same page from an article listing page:

```

<a href="/articles/emperor-penguins" data-astro-reload>
```

```

<a href="/articles/emperor-penguins">
```

Links with the `data-astro-reload` attribute will be ignored by the router and a full-page navigation will occur.

### Trigger navigation

[Section titled Trigger navigation](https://docs.astro.build/en/guides/view-transitions/#trigger-navigation)

You can also trigger client-side navigation via events not normally listened to by the `<ClientRouter />` router using `navigate`. This function from the `astro:transitions/client` module can be used in scripts, and in framework components that are hydrated with a [client directive](https://docs.astro.build/en/reference/directives-reference/#client-directives).

The following example shows an Astro component that navigates a visitor to another page they select from a menu:

```

<script>

  import { navigate } from 'astro:transitions/client';

  // Navigate to the selected option automatically.

  document.querySelector('select').onchange = (event) => {

    let href = event.target.value;

    navigate(href);

  };

</script>

<select>

  <option value="/play">Play</option>

  <option value="/blog">Blog</option>

  <option value="/about">About</option>

  <option value="/contact">Contact</option>

</select>
```

```

---

import Form from "../components/Form.astro";

import { ClientRouter } from "astro:transitions";

---

<html>

  <head>

    <ClientRouter />

  </head>

  <body>

    <Form />

  </body>

</html>
```

The following example implements the same using `navigate()` in a React `<Form />` component:

```

import { navigate } from "astro:transitions/client";

export default function Form() {

  return (

    <select onChange={(e) => navigate(e.target.value)}>

      <option value="/play">Play</option>

      <option value="/blog">Blog</option>

      <option value="/about">About</option>

      <option value="/contact">Contact</option>

    </select>

  );

}
```

The `<Form />` component can then be rendered on an Astro page that uses the `<ClientRouter />` router, with a client directive:

```

---

import Form from "../components/Form.jsx";

import { ClientRouter } from "astro:transitions";

---

<html>

  <head>

    <ClientRouter />

  </head>

  <body>

    <Form client:load />

  </body>

</html>
```

The `navigate` method takes these arguments:

- `href` (required) - The new page to navigate to.
- `options` \- An optional object with the following properties:

  - `history`: `'push'` \| `'replace'` \| `'auto'`
    - `'push'`: the router will use `history.pushState` to create a new entry in the browser history.
    - `'replace'`: the router will use `history.replaceState` to update the URL without adding a new entry into navigation.
    - `'auto'` (default): the router will attempt `history.pushState`, but if the URL is not one that can be transitioned to, the current URL will remain with no changes to the browser history.
  - `formData`: A FormData object for `POST` requests.

For backward and forward navigation through the browser history, you can combine `navigate()` with the built-in `history.back()`, `history.forward()` and `history.go()` functions of the browser. If `navigate()` is called during the server-side render of your component, it has no effect.

### Replace entries in the browser history

[Section titled Replace entries in the browser history](https://docs.astro.build/en/guides/view-transitions/#replace-entries-in-the-browser-history)

Normally, each time you navigate, a new entry is written to the browser’s history. This allows navigation between pages using the browser’s `back` and `forward` buttons.

The `<ClientRouter />` router allows you to overwrite history entries by adding the `data-astro-history` attribute to any individual `<a>` tag.

The `data-astro-history` attribute can be set to the same three values as the [`history` option of the `navigate()` function](https://docs.astro.build/en/guides/view-transitions/#trigger-navigation):

`data-astro-history`: `'push'` \| `'replace'` \| `'auto'`

- `'push'`: the router will use `history.pushState` to create a new entry in the browser history.
- `'replace'`: the router will use `history.replaceState` to update the URL without adding a new entry into navigation.
- `'auto'` (default): the router will attempt `history.pushState`, but if the URL is not one that can be transitioned to, the current URL will remain with no changes to the browser history.

The following example navigates to the `/main` page but does not add a new entry to the browsing history. Instead, it reuses the current entry in the history ( `/confirmation`) and overwrites it.

```

<a href="/main" data-astro-history="replace">
```

This has the effect that if you go back from the `/main` page, the browser will not display the `/confirmation` page, but the page before it.

### Transitions with forms

[Section titled Transitions with forms](https://docs.astro.build/en/guides/view-transitions/#transitions-with-forms)

**Added in:** `astro@4.0.0`

The `<ClientRouter />` router will trigger in-page transitions from `<form>` elements, supporting both `GET` and `POST` requests.

By default, Astro submits your form data as `multipart/form-data` when your `method` is set to `POST`. If you want to match the default behavior of web browsers, use the `enctype` attribute to submit your data encoded as `application/x-www-form-urlencoded`:

```

<form action="/contact" method="POST" enctype="application/x-www-form-urlencoded">

  <!-- -->

</form>
```

You can opt out of router transitions on any individual form using the `data-astro-reload` attribute:

```

<form action="/contact" data-astro-reload>

  <!-- -->

</form>
```

## Fallback control

[Section titled Fallback control](https://docs.astro.build/en/guides/view-transitions/#fallback-control)

The `<ClientRouter />` router works best in browsers that support View Transitions (i.e. Chromium browsers), but also includes default fallback support for other browsers. Even if the browser does not support the View Transitions API, Astro’s client router can still provide in-browser navigation using one of the fallback options.

Depending on browser support, you may need to explicitly set the `name` or `animate` [`transition` directives](https://docs.astro.build/en/guides/view-transitions/#transition-directives) on the elements you wish to animate for a comparable experience across all browsers:

```

---

import Layout from '../layouts/LayoutUsingClientRouter.astro'

---

<title transition:animate="fade">About my site</title>
```

You can override Astro’s default fallback support by adding a `fallback` property on the `<ClientRouter />` component and setting it to `swap` or `none`:

- `animate` (default, recommended) - Astro will simulate view transitions using custom attributes before updating page content.
- `swap` \- Astro will not attempt to animate the page. Instead, the old page will be immediately replaced by the new one.
- `none` \- Astro will not do any animated page transitions at all. Instead, you will get full page navigation in non-supporting browsers.

```

---

import { ClientRouter } from 'astro:transitions';

---

<title>My site</title>

<ClientRouter fallback="swap" />
```

## Client-side navigation process

[Section titled Client-side navigation process](https://docs.astro.build/en/guides/view-transitions/#client-side-navigation-process)

When using the `<ClientRouter />` router, the following steps occur to produce Astro’s client-side navigation:

1. A visitor to your site triggers navigation by any of the following actions:
   - Clicking an `<a>` tag linking internally to another page on your site.
   - Clicking the back button.
   - Clicking the forward button.
2. The router starts fetching the next page.

3. The router adds the `data-astro-transition` attribute to the HTML element with a value of `'forward'` or `'back'` as appropriate.

4. The router calls `document.startViewTransition`. This triggers the browser’s own [view transition process](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#the_view_transition_process). Importantly, the browser screenshots the current state of the page.

5. Inside the `startViewTransition` callback, the router performs a **swap**, which consists of the following sequence of events:
   - The contents of the `<head>` are swapped out, with some elements kept:
     - Stylesheet DOM nodes are left in if they exist on the new page, to prevent FOUC.
     - Scripts are left in if they exist on the new page.
     - Any other head elements with `transition:persist` are left in if there is a corresponding element in the new page.
   - The `<body>` is completely replaced with the new page’s body.

   - Elements marked `transition:persist` are moved over to the new DOM if they exist on the new page.

   - Scroll position is restored if necessary.

   - The `astro:after-swap` event is triggered on the `document`. This is the end of the **swap** process.
6. The router waits for any new stylesheets to load before resolving the transition.

7. The router executes any new scripts added to the page.

8. The `astro:page-load` event fires. This is the end of the navigation process.


## Script behavior with view transitions

[Section titled Script behavior with view transitions](https://docs.astro.build/en/guides/view-transitions/#script-behavior-with-view-transitions)

When you add view transitions to an existing Astro project, some of your scripts may no longer re-run after page navigation like they did with full-page browser refreshes. Use the following information to ensure that your scripts execute as expected.

### Script order

[Section titled Script order](https://docs.astro.build/en/guides/view-transitions/#script-order)

When navigating between pages with the `<ClientRouter />` component, scripts are run in sequential order to match browser behavior.

### Script re-execution

[Section titled Script re-execution](https://docs.astro.build/en/guides/view-transitions/#script-re-execution)

[Bundled module scripts](https://docs.astro.build/en/guides/client-side-scripts/#script-processing), which are the default scripts in Astro, are only ever executed once. After initial execution they will be ignored, even if the script exists on the new page after a transition.

Unlike bundled module scripts, [inline scripts](https://docs.astro.build/en/guides/client-side-scripts/#opting-out-of-processing) have the potential to be re-executed during a user’s visit to a site if they exist on a page that is visited multiple times. Inline scripts might also re-execute when a visitor navigates to a page without the script, and then back to one with the script.

With view transitions, some scripts may no longer re-run after page navigation like they do with full-page browser refreshes. There are several [events during client-side routing that you can listen for](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events), and fire events when they occur. You can wrap an existing script in an event listener to ensure it runs at the proper time in the navigation cycle.

The following example wraps a script for a mobile “hamburger” menu in an event listener for `astro:page-load` which runs at the end of page navigation to make the menu responsive to being clicked after navigating to a new page:

```

<script>

document.addEventListener('astro:page-load', () => {

  document.querySelector('.hamburger').addEventListener('click', () => {

    document.querySelector('.nav-links').classList.toggle('expanded');

  });

});

</script>
```

The following example shows a function that runs in response to the `astro:after-swap` event, which happens immediately after the new page has replaced the old page and before the DOM elements are painted to the screen. This avoids a flash of light theme after page navigation by checking and, if necessary, setting the dark mode theme before the new page is rendered:

```

<script is:inline>

  function applyTheme() {

    localStorage.theme === 'dark'

      ? document.documentElement.classList.add("dark")

      : document.documentElement.classList.remove("dark");

  }

  document.addEventListener('astro:after-swap', applyTheme);

  applyTheme();

</script>
```

#### `data-astro-rerun`

[Section titled data-astro-rerun](https://docs.astro.build/en/guides/view-transitions/#data-astro-rerun)

**Added in:** `astro@4.5.0`

To force inline scripts to re-execute after every transition, add the `data-astro-rerun` property. Adding any attribute to a script also implicitly adds `is:inline`, so this is only available for scripts that are not bundled and processed by Astro.

```

<script is:inline data-astro-rerun>...</script>
```

To ensure that a script runs every time a page is loaded during client-side navigation, it should be executed by a [lifecycle event](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events). For example, event listeners for `DOMContentLoaded` can be replaced by the [`astro:page-load`](https://docs.astro.build/en/guides/view-transitions/#astropage-load) lifecycle event.

If you have code that sets up a global state in an inline script, this state will need to take into account that the script might execute more than once. Check for the global state in your `<script>` tag, and conditionally execute your code where possible. This works because `window` is preserved.

```

<script is:inline>

  if (!window.SomeGlobal) {

    window.SomeGlobal = {} // ....

  }

</script>
```

## Lifecycle events

[Section titled Lifecycle events](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)

The `<ClientRouter />` router fires a number of events on the `document` during navigation. These events provide hooks into the lifecycle of navigation, allowing you to do things like show indicators that a new page is loading, override default behavior, and restore state as navigation is completing.

The navigation process involves a **preparation** phase, when new content is loaded; a **DOM swap** phase, where the old page’s content is replaced by the new page’s content; and a **completion** phase where scripts are executed, loading is reported as completed and clean-up work is carried out.

Astro’s View Transition API lifecycle events in order are:

- [`astro:before-preparation`](https://docs.astro.build/en/guides/view-transitions/#astrobefore-preparation)
- [`astro:after-preparation`](https://docs.astro.build/en/guides/view-transitions/#astroafter-preparation)
- [`astro:before-swap`](https://docs.astro.build/en/guides/view-transitions/#astrobefore-swap)
- [`astro:after-swap`](https://docs.astro.build/en/guides/view-transitions/#astroafter-swap)
- [`astro:page-load`](https://docs.astro.build/en/guides/view-transitions/#astropage-load)

While some actions can be triggered during any event, some tasks can only be performed during a specific event for best results, such as displaying a loading spinner before preparation or overriding animation pairs before swapping content.

### `astro:before-preparation`

[Section titled astro:before-preparation](https://docs.astro.build/en/guides/view-transitions/#astrobefore-preparation)

**Added in:** `astro@3.6.0`

An event that fires at the beginning of the preparation phase, after navigation has started (e.g. after the user has clicked a link), but before content is loaded.

This event is used:

- To do something before loading has started, such as showing a loading spinner.
- To alter loading, such as loading content you’ve defined in a template rather than from the external URL.
- To change the `direction` of the navigation (which is usually either `forward` or `backward`) for custom animation.

Here is an example of using the `astro:before-preparation` event to load a spinner before the content is loaded and stop it immediately after loading. Note that using the loader callback in this way allows asynchronous execution of code.

```

<script is:inline>

  document.addEventListener('astro:before-preparation', event => {

    const originalLoader = event.loader;

    event.loader = async function() {

      const { startSpinner } = await import('./spinner.js');

      const stop = startSpinner();

      await originalLoader();

      stop();

    };

  });

</script>
```

### `astro:after-preparation`

[Section titled astro:after-preparation](https://docs.astro.build/en/guides/view-transitions/#astroafter-preparation)

**Added in:** `astro@3.6.0`

An event that fires at the end of the preparation phase, after the new page’s content has been loaded and parsed into a document. This event occurs before the view transitions phase.

This example uses the `astro:before-preparation` event to start a loading indicator and the `astro:after-preparation` event to stop it:

```

<script is:inline>

  document.addEventListener('astro:before-preparation', () => {

    document.querySelector('#loading').classList.add('show');

  });

  document.addEventListener('astro:after-preparation', () => {

    document.querySelector('#loading').classList.remove('show');

  });

</script>
```

This is a simpler version of loading a spinner than the example shown above: if all of the listener’s code can be executed synchronously, there is no need to hook into the loader’s callback.

### `astro:before-swap`

[Section titled astro:before-swap](https://docs.astro.build/en/guides/view-transitions/#astrobefore-swap)

**Added in:** `astro@3.6.0`

An event that fires before the new document (which is populated during the preparation phase) replaces the current document. This event occurs inside of the view transition, where the user is still seeing a snapshot of the old page.

This event can be used to make changes before the swap occurs. The `newDocument` property on the event represents the incoming document. Here is an example of ensuring the browser’s light or dark mode preference in `localStorage` is carried over to the new page:

```

<script is:inline>

  function setDarkMode(document) {

    let theme = localStorage.darkMode ? 'dark' : 'light';

    document.documentElement.dataset.theme = theme;

  }

  setDarkMode(document);

  document.addEventListener('astro:before-swap', event => {

    // Pass the incoming document to set the theme on it

    setDarkMode(event.newDocument);

  });

</script>
```

The `astro:before-swap` event can also be used to change the _implementation_ of the swap. The default swap implementation diffs head content, moves **persistent** elements from the old document to the `newDocument`, and then replaces the entire `body` with the body of the new document.

At this point of the lifecycle, you could choose to define your own swap implementation, for example to diff the entire contents of the existing document (which some other routers do):

```

<script is:inline>

  document.addEventListener('astro:before-swap', event => {

    event.swap = () => {

      diff(document, event.newDocument);

    };

  });

</script>
```

#### Building a custom swap function

[Section titled Building a custom swap function](https://docs.astro.build/en/guides/view-transitions/#building-a-custom-swap-function)

**Added in:** `astro@4.15.0`

The `swapFunctions` object of the `astro:transitions/client` module provides five utility functions that handle specific swap-related tasks, including handling document attributes, page elements, and script execution. These functions can be used directly to define a custom swap implementation.

The following example demonstrates how to use these functions to recreate Astro’s built-in swap implementation:

```

<script>

import { swapFunctions } from 'astro:transitions/client';

// substitutes window.document with doc

function mySwap(doc: Document) {

  swapFunctions.deselectScripts(doc);

  swapFunctions.swapRootAttributes(doc);

  swapFunctions.swapHeadElements(doc);

  const restoreFocusFunction = swapFunctions.saveFocus();

  swapFunctions.swapBodyElement(doc.body, document.body);

  restoreFocusFunction();

};

...

  event.swap = () => mySwap(event.newDocument);

...

<script>
```

Custom swap implementations can start with this template and add or replace individual steps with custom logic as needed.

### `astro:after-swap`

[Section titled astro:after-swap](https://docs.astro.build/en/guides/view-transitions/#astroafter-swap)

An event that fires immediately after the new page replaces the old page. You can listen to this event on the `document` and trigger actions that will occur before the new page’s DOM elements render and scripts run.

This event, when listened to on the **outgoing page**, is useful to pass along and restore any state on the DOM that needs to transfer over to the new page.

This is the latest point in the lifecycle where it is still safe to, for example, add a dark mode class name ( `<html class="dark-mode">`), though you may wish to do so in an earlier event.

The `astro:after-swap` event occurs immediately after the browser history has been updated and the scroll position has been set.
Therefore, one use of targeting this event is to override the default scroll restore for history navigation. The following example resets the horizontal and vertical scroll position to the top left corner of the page for each navigation.

```

document.addEventListener('astro:after-swap',

  () => window.scrollTo({ left: 0, top: 0, behavior: 'instant' }))
```

### `astro:page-load`

[Section titled astro:page-load](https://docs.astro.build/en/guides/view-transitions/#astropage-load)

An event that fires at the end of page navigation, after the new page is visible to the user and blocking styles and scripts are loaded. You can listen to this event on the `document`.

The `<ClientRouter />` component fires this event both on initial page navigation for a pre-rendered page and on any subsequent navigation, either forwards or backwards.

You can use this event to run code on every page navigation, for example to set up event listeners that would otherwise be lost during navigation.

```

<script>

  document.addEventListener('astro:page-load', () => {

    // This runs on first page load and after every navigation.

    setupStuff(); // e.g. add event listeners

  });

</script>
```

## Accessibility

[Section titled Accessibility](https://docs.astro.build/en/guides/view-transitions/#accessibility)

Enabling client-side routing and animating page transitions both come with accessibility challenges, and Astro aims to make sites opting in to View Transitions as accessible-by-default as possible.

### Route announcement

[Section titled Route announcement](https://docs.astro.build/en/guides/view-transitions/#route-announcement)

**Added in:** `astro@3.2.0`

The `<ClientRouter />` component includes a route announcer for page navigation during client-side routing. No configuration or action is needed to enable this.

Assistive technologies let visitors know that the page has changed by announcing the new page title after navigation. When using server-side routing with traditional full-page browser refreshes, this happens by default after the new page loads. In client-side routing, the `<ClientRouter />` component performs this action.

To add route announcement to client-side routing, the component adds an element to the new page with the `aria-live` attribute set to `assertive`. This tells AT (assistive technology) to announce immediately. The component also checks for the following, in priority order, to determine the announcement text:

- The `<title>`, if it exists.
- The first `<h1>` it finds.
- The `pathname` of the page.

We strongly recommend you always include a `<title>` in each page for accessibility.

### `prefers-reduced-motion`

[Section titled prefers-reduced-motion](https://docs.astro.build/en/guides/view-transitions/#prefers-reduced-motion)

Astro’s `<ClientRouter />` component includes a CSS media query that disables _all_ view transition animations, including fallback animation, whenever the [`prefer-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting is detected. Instead, the browser will simply swap the DOM elements without an animation.

Learn

[Contribute](https://docs.astro.build/en/contribute/) [Community](https://astro.build/chat) [Sponsor](https://opencollective.com/astrodotbuild)