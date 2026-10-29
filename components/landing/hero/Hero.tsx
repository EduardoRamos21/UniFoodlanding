"use client";

import { Fragment, useRef, useState } from "react";
import { gsap, useGSAP, FULL_MOTION, REDUCED_MOTION } from "@/lib/gsap";
import { ctas } from "@/lib/site-config";
import { demoFolio } from "@/lib/demo-data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { MenuScreen } from "@/components/mockups/AppScreens";
import { StatusTracker } from "@/components/mockups/StatusTracker";
import { createHalftone, type Point } from "./halftone";

const DESKTOP = "(min-width: 1024px)";

const headlineWords: { text: string; highlight?: boolean }[] = [
  { text: "Tu" },
  { text: "pausa" },
  { text: "en" },
  { text: "la" },
  { text: "universidad," },
  { text: "mejor" },
  { text: "organizada.", highlight: true },
];

function relative(rect: DOMRect, host: DOMRect) {
  return {
    left: rect.left - host.left,
    right: rect.right - host.left,
    top: rect.top - host.top,
    bottom: rect.bottom - host.top,
  };
}

export function Hero() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(2);

  useGSAP(
    () => {
      const host = hostRef.current;
      const canvas = canvasRef.current;
      const headline = headlineRef.current;
      const stage = stageRef.current;
      const panel = panelRef.current;
      if (!host || !canvas || !headline || !stage || !panel) return;

      const halftone = createHalftone(canvas, host, {
        observe: [headline, panel, stage],
        getPolygon: (el): Point[] => {
          const h = el.getBoundingClientRect();
          if (window.matchMedia(DESKTOP).matches) {
            const hl = relative(headline.getBoundingClientRect(), h);
            const pn = relative(panel.getBoundingClientRect(), h);
            const W = h.width;
            const H = h.height;
            return [
              { x: hl.right, y: 0 },
              { x: W, y: 0 },
              { x: W, y: pn.top },
              { x: pn.left, y: pn.top },
              { x: pn.left, y: H },
              { x: 0, y: H },
              { x: 0, y: hl.bottom },
              { x: hl.right, y: hl.bottom },
            ];
          }
          const s = relative(stage.getBoundingClientRect(), h);
          return [
            { x: s.left, y: s.top },
            { x: s.right, y: s.top },
            { x: s.right, y: s.bottom },
            { x: s.left, y: s.bottom },
          ];
        },
      });

      const mm = gsap.matchMedia();

      mm.add(REDUCED_MOTION, () => {
        halftone.setProgress(1);
      });

      mm.add(FULL_MOTION, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        gsap.set(items, { autoAlpha: 0 });
        document.documentElement.classList.remove("motion-pending");
        setStatus(0);

        const intro = { p: 0 };
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.set("[data-hero-title]", { autoAlpha: 1 })
          .from("[data-word]", { yPercent: 110, duration: 1.15, stagger: 0.045, ease: "expo.out" }, 0)
          .to("[data-hero-eyebrow]", { autoAlpha: 1, duration: 0.7 }, 0.05)
          .from("[data-hero-eyebrow]", { y: 12, duration: 0.8 }, 0.05)
          .to(
            intro,
            {
              p: 1,
              duration: 1.8,
              ease: "power2.inOut",
              onUpdate: () => halftone.setProgress(intro.p),
            },
            0.05,
          )
          .fromTo(
            "[data-hero-phone]",
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 1.35, ease: "expo.out" },
            0.35,
          )
          .from("[data-menu-row]", { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.06, ease: "expo.out" }, 0.7)
          .fromTo(
            "[data-hero-panel] > *",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.07 },
            0.45,
          )
          .set("[data-hero-panel]", { autoAlpha: 1 }, 0.45)
          .fromTo("[data-hero-status]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.85)
          .call(() => setStatus(1), [], 1.9)
          .call(() => setStatus(2), [], 2.7);

        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        let detachPointer: (() => void) | undefined;
        if (finePointer) tl.eventCallback("onComplete", () => (detachPointer = halftone.enablePointer()));

        return () => {
          detachPointer?.();
          setStatus(2);
        };
      });

      return () => {
        mm.revert();
        halftone.destroy();
      };
    },
    { scope: hostRef },
  );

  return (
    <section id="inicio" aria-labelledby="hero-title" className="scroll-mt-0 pt-24 sm:pt-28">
      <div className="page-container">
        <div
          ref={hostRef}
          className="relative grid grid-cols-1 grid-rows-[auto_auto_auto] lg:grid-cols-12 lg:grid-rows-[auto_1fr_auto]"
        >
          <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />

          <div
            ref={headlineRef}
            className="relative z-[1] col-start-1 row-start-1 pb-6 pt-2 lg:col-end-7 lg:pb-10 lg:pr-10 lg:pt-4"
          >
            <p className="eyebrow" data-hero-item data-hero-eyebrow>
              Pedidos universitarios, mejor organizados
            </p>
            <h1
              id="hero-title"
              data-hero-item
              data-hero-title
              className="display mt-5 text-[clamp(3.1rem,13vw,5.4rem)] lg:text-[clamp(4.2rem,6.4vw,6.6rem)]"
            >
              {headlineWords.map((w, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                    <span
                      data-word
                      className={`inline-block ${w.highlight ? "rounded-[0.18em] bg-ember px-[0.12em]" : ""}`}
                    >
                      {w.text}
                    </span>
                  </span>
                  {i < headlineWords.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>
          </div>

          <div
            ref={stageRef}
            className="halftone-fallback relative z-[1] col-start-1 row-start-2 min-h-[44rem] rounded-card sm:min-h-[48rem] lg:col-start-7 lg:col-end-13 lg:row-start-1 lg:row-end-3 lg:min-h-[calc(clamp(36rem,74svh,46rem)+5rem)]"
          >
            <div className="absolute left-1/2 top-8 w-[17rem] -translate-x-1/2 sm:top-10 sm:w-[18.5rem] lg:top-1/2 lg:h-[clamp(36rem,74svh,46rem)] lg:w-auto lg:-translate-y-1/2">
              <div data-hero-item data-hero-phone className="h-full">
                <PhoneFrame
                  label="Vista de ejemplo de UNIFOOD: menú de una cafetería con precios y disponibilidad"
                  className="h-full w-full lg:w-auto"
                >
                  <MenuScreen />
                </PhoneFrame>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="halftone-fallback hidden rounded-card lg:col-start-1 lg:col-end-8 lg:row-start-2 lg:row-end-4 lg:block"
          />

          <div
            data-hero-item
            data-hero-status
            className="relative z-[2] col-start-1 row-start-2 m-4 w-[calc(100%-2rem)] max-w-[24rem] self-end justify-self-start rounded-[1.75rem] bg-limestone p-5 text-obsidian lg:col-end-7 lg:row-start-2 lg:row-end-4 lg:m-10 lg:w-[21rem]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm">Pedido #{demoFolio}</p>
              <span className="ui-badge bg-sulfur text-obsidian">Demostración</span>
            </div>
            <div className="mt-4 hidden lg:block">
              <StatusTracker current={status} />
            </div>
            <div className="mt-3 lg:hidden">
              <StatusTracker current={status} orientation="horizontal" />
            </div>
          </div>

          <div
            ref={panelRef}
            className="relative z-[2] col-start-1 row-start-3 pt-8 lg:col-start-8 lg:col-end-13 lg:pl-10 lg:pt-10"
          >
            <div data-hero-item data-hero-panel className="max-w-[34rem]">
              <p className="text-[1.0625rem] leading-relaxed text-obsidian/80 lg:text-lg">
                Consulta menús y precios, pide antes de llegar y sigue la preparación de tu pedido. UNIFOOD conecta a
                estudiantes y cafeterías universitarias en un solo lugar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink cta={ctas.heroPrimary} withArrow />
                <ButtonLink cta={ctas.heroSecondary} variant="secondary" />
              </div>
              <p className="dotted-x mt-7 pt-4 text-sm text-obsidian/65">
                Menús claros. Pedidos anticipados. Una mejor forma de organizar la pausa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
