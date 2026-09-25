/**
 * Components map for MDX content.
 *
 * Passed to `<Content components={…} />` so posts can use these widgets
 * without importing them in every file. (Value exports from `.astro`
 * components are not supported — keep this a plain module.)
 */
import Accordion from "./widgets/Accordion.astro";
import Button from "./widgets/Button.astro";
import ListCheck from "./widgets/ListCheck.astro";
import Notice from "./widgets/Notice.astro";
import Tab from "./widgets/Tab.astro";
import Tabs from "./widgets/Tabs.astro";
import YouTubeEmbed from "./widgets/YouTubeEmbed.astro";
import AmazonProduct from "./widgets/AmazonProduct.astro";

export const mdxComponents = {
  Accordion,
  Button,
  ListCheck,
  Notice,
  Tab,
  Tabs,
  YouTubeEmbed,
  AmazonProduct,
};
