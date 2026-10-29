"use client";

import { useEffect } from "react";
import { gsap, REDUCED_MOTION } from "@/lib/gsap";

/** Desplazamiento de anclas con duración fija. La rueda del mouse sigue siendo nativa. */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      const reduced = window.matchMedia(REDUCED_MOTION).matches;
      gsap.to(window, {
        duration: reduced ? 0 : 1.05,
        ease: "power3.inOut",
        scrollTo: { y: target, offsetY: 96, autoKill: true },
        overwrite: "auto",
      });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.killTweensOf(window);
    };
  }, []);

  return null;
}
