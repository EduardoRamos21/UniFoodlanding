"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, FULL_MOTION } from "@/lib/gsap";

/**
 * Revelados de scroll compartidos por las secciones (que pueden seguir siendo
 * componentes de servidor): `data-reveal` anima el bloque y `data-reveal-group`
 * escalona sus hijos directos.
 */
export function ScrollReveals({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Solo opacity, no autoAlpha: visibility:hidden sacaría el contenido aún no
      // revelado del orden de tabulación.
      mm.add(FULL_MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 1.05,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            opacity: 0,
            y: 32,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        gsap.from("[data-footer-letter]", {
          yPercent: 60,
          opacity: 0,
          duration: 1.15,
          stagger: 0.04,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-footer-mark]", start: "top 95%", once: true },
        });
      });

      // Las fuentes pueden mover posiciones tras el primer cálculo.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: scopeRef },
  );

  return <div ref={scopeRef}>{children}</div>;
}
