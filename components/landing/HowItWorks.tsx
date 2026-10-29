"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, FULL_MOTION } from "@/lib/gsap";
import { PhoneFrame } from "@/components/mockups/PhoneFrame";
import { CampusScreen, ConfirmScreen, MenuScreen, StatusScreen } from "@/components/mockups/AppScreens";

function MenuStepScreen() {
  return <MenuScreen fill />;
}

const steps = [
  {
    title: "Elige dónde pedir",
    text: "Selecciona tu universidad, campus y una cafetería disponible.",
    Screen: CampusScreen,
    alt: "Vista de ejemplo: selección de universidad, campus y cafetería",
  },
  {
    title: "Explora el menú",
    text: "Consulta categorías, productos, precios y disponibilidad.",
    Screen: MenuStepScreen,
    alt: "Vista de ejemplo: menú con categorías, precios y productos agotados",
  },
  {
    title: "Confirma tu pedido",
    text: "Revisa los artículos, las cantidades y el total antes de confirmar.",
    Screen: ConfirmScreen,
    alt: "Vista de ejemplo: resumen del pedido con cantidades y total",
  },
  {
    title: "Consulta el estado",
    text: "Sigue las actualizaciones y recoge el pedido según las indicaciones de la cafetería.",
    Screen: StatusScreen,
    alt: "Vista de ejemplo: estado del pedido listo para recoger",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-step]");
        items.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });
      });
      mm.add(`(min-width: 1024px) and ${FULL_MOTION}`, () => {
        gsap.fromTo(
          "[data-step-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 55%", end: "bottom 55%", scrub: 0.85 },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="como-funciona" aria-labelledby="como-title" className="page-container mt-28 sm:mt-36">
      <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Cómo funciona</p>
          <h2 id="como-title" className="display mt-5 text-[clamp(2.6rem,7vw,5.5rem)]">
            De elegir tu comida a recoger tu pedido.
          </h2>
        </div>
        <p className="max-w-[28rem] text-lg leading-relaxed text-obsidian/75 lg:col-span-5 lg:justify-self-end">
          Un flujo pensado para que sepas qué estás pidiendo y qué ocurre después.
        </p>
      </div>

      <div className="mt-14 grid gap-3 lg:grid-cols-12">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 grid h-[calc(100svh-9rem)] max-h-[46rem] min-h-[40rem] place-items-center rounded-card bg-limestone">
            <div className="relative aspect-[9/18.5] h-[calc(100%-3.25rem)] max-h-full w-auto">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-soft ${
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                  aria-hidden={i !== active}
                >
                  <PhoneFrame label={s.alt} fill>
                    <s.Screen />
                  </PhoneFrame>
                </div>
              ))}
            </div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-obsidian/60">
              Vista de ejemplo · Paso {active + 1} de {steps.length}
            </p>
          </div>
        </div>

        <ol data-steps className="relative lg:col-span-7 lg:pl-16">
          <span aria-hidden="true" className="absolute bottom-0 left-6 top-0 hidden w-[1.5px] bg-obsidian/15 lg:block" />
          <span
            aria-hidden="true"
            data-step-progress
            className="absolute bottom-0 left-6 top-0 hidden w-[1.5px] origin-top bg-ember lg:block"
          />
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-step
              data-reveal
              className="relative mb-3 rounded-card bg-limestone p-8 sm:p-10 lg:mb-0 lg:flex lg:min-h-[min(34rem,70svh)] lg:flex-col lg:justify-center lg:bg-transparent lg:px-0"
            >
              <span
                aria-hidden="true"
                className={`absolute -left-[3.2rem] top-1/2 hidden size-6 -translate-y-1/2 rounded-full border-[1.5px] transition-colors duration-300 lg:block ${
                  i <= active ? "border-ember bg-ember" : "border-obsidian/30 bg-pumice"
                }`}
              />
              <span
                className={`display block text-[4.5rem] leading-[0.8] transition-colors duration-300 sm:text-[6rem] ${
                  i === active ? "lg:text-ember" : "lg:text-obsidian/25"
                } text-ember`}
              >
                <span className="sr-only">Paso </span>0{i + 1}
              </span>
              <h3 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)]">{s.title}</h3>
              <p className="mt-3 max-w-[28rem] text-lg leading-relaxed text-obsidian/75">{s.text}</p>
              <div className="mt-8 flex justify-center rounded-[1.75rem] bg-pumice py-6 lg:hidden">
                <PhoneFrame label={s.alt} className="w-[16rem] shrink-0">
                  <s.Screen />
                </PhoneFrame>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div
        data-reveal
        className="mt-6 flex flex-col gap-3 rounded-card border-[1.5px] border-dotted border-obsidian/40 px-8 py-6 sm:flex-row sm:items-center"
      >
        <span className="ui-badge w-fit bg-sulfur px-3 py-1 text-xs text-obsidian">Importante</span>
        <p className="text-[0.9375rem] leading-relaxed text-obsidian/80">
          El método de pago y las indicaciones de recogida dependen de cada cafetería. En su versión inicial, UNIFOOD no
          procesa pagos electrónicos.
        </p>
      </div>
    </section>
  );
}
