import { fade, slide } from "astro:transitions";
import { viewTransitionsConfig } from "@config/site";

type AnimationKey = keyof typeof viewTransitionsConfig.animations;
type ClientRouterFallback = "animate" | "swap" | "none";
type TransitionValue = ReturnType<typeof fade> | "none";

const validFallbacks = new Set<ClientRouterFallback>(["animate", "swap", "none"]);

export const viewTransitionsEnabled = viewTransitionsConfig.enabled;

export function getClientRouterFallback(): ClientRouterFallback {
  const fallback = viewTransitionsConfig.fallback?.toLowerCase() as ClientRouterFallback | "instant" | undefined;
  if (!fallback) {
    return "none";
  }

  if (validFallbacks.has(fallback as ClientRouterFallback)) {
    return fallback as ClientRouterFallback;
  }

  if (fallback === "instant") {
    return "none";
  }

  return "none";
}

export function getTransitionAnimation(
  key: AnimationKey,
): TransitionValue | undefined {
  if (!viewTransitionsEnabled) {
    return undefined;
  }

  const animation = viewTransitionsConfig.animations[key];
  const duration = viewTransitionsConfig.duration;

  switch (animation) {
    case "fade":
      return fade({ duration });
    case "slide":
      return slide({ duration });
    case "none":
      return "none";
    default:
      return undefined;
  }
}

export function getPageTransitionAnimation(): TransitionValue | undefined {
  if (!viewTransitionsEnabled) {
    return undefined;
  }

  return fade({ duration: viewTransitionsConfig.duration });
}
