"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";
import { ClockIcon, ListIcon, StoreIcon } from "@/components/ui/icons";

const moments = [
  {
    id: "antes",
    label: "Antes de salir",
    Icon: ListIcon,
    problem: "Llegar sin saber qué hay disponible ni cuánto cuesta.",
    title: "¿Qué hay hoy y cuánto cuesta?",
    text: "Consulta el menú, los precios y la disponibilidad sin depender de encontrar toda la información al llegar.",
    points: ["Menú por categorías", "Precios publicados por la cafetería", "Productos agotados identificados"],
  },
  {
    id: "pedir",
    label: "Al pedir",
    Icon: ClockIcon,
    problem: "Esperar sin saber en qué va tu pedido.",
    title: "Que tu pedido tenga un siguiente paso claro.",
    text: "Confirma los artículos y consulta el estado del pedido mientras la cafetería lo gestiona.",
    points: ["Resumen antes de confirmar", "Folio de pedido", "Estados visibles: pendiente, en preparación, listo"],
  },
  {
    id: "mostrador",
    label: "Del otro lado del mostrador",
    Icon: StoreIcon,
    problem: "Pedidos difíciles de seguir cuando todo depende de la memoria o de notas sueltas.",
    title: "Pedidos más fáciles de organizar.",
    text: "La cafetería puede centralizar los pedidos, actualizar su preparación y mantener su menú al día.",
    points: ["Cola de pedidos", "Cambio de estado durante la preparación", "Menú y disponibilidad al día"],
  },
];

export function ProblemSolution() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from(`[data-tab-panel][data-active="true"] [data-panel-line]`, {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          stagger: 0.05,
          ease: "expo.out",
        });
      });
    },
    { scope: scopeRef, dependencies: [active], revertOnUpdate: true },
  );

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: moments.length - 1,
    };
    const target = keys[e.key];
    if (target === undefined) return;
    e.preventDefault();
    const next = (target + moments.length) % moments.length;
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section aria-labelledby="problema-title" className="page-container mt-28 sm:mt-36">
      <div data-reveal className="mx-auto max-w-[56rem] text-center">
        <h2 id="problema-title" className="display text-[clamp(2.6rem,7vw,5.5rem)]">
          Menos incertidumbre antes de tu próxima pausa.
        </h2>
        <p className="mx-auto mt-6 max-w-[38rem] text-lg leading-relaxed text-obsidian/75">
          Entre clases, pendientes y cambios de horario, cada minuto cuenta. UNIFOOD te ayuda a consultar la oferta de
          las cafeterías y organizar tu pedido antes de llegar.
        </p>
      </div>

      <div ref={scopeRef} data-reveal className="mx-auto mt-14 grid max-w-[66rem] gap-3 lg:grid-cols-[22rem_1fr]">
        <div role="tablist" aria-label="Momentos del día" aria-orientation="vertical" className="flex flex-col gap-3" data-tab-only>
          {moments.map((m, i) => {
            const selected = i === active;
            return (
              <button
                key={m.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                id={`tab-${m.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${m.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`text-left transition-colors duration-300 ${
                  selected
                    ? "rounded-card bg-limestone p-8"
                    : "rounded-pill border-[1.5px] border-dotted border-obsidian/50 px-7 py-4 hover:bg-limestone/60"
                }`}
              >
                {selected ? (
                  <span className="mb-10 grid size-11 place-items-center rounded-[0.85rem] bg-obsidian text-chalk">
                    <m.Icon className="size-5" />
                  </span>
                ) : null}
                <span className={`display block ${selected ? "text-[2.1rem]" : "text-[1.5rem]"}`}>{m.label}</span>
                {selected ? (
                  <span className="mt-2 block text-sm leading-snug text-obsidian/70">{m.problem}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          {moments.map((m, i) => (
            <div
              key={m.id}
              id={`panel-${m.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${m.id}`}
              data-tab-panel
              data-active={i === active}
              className="flex min-h-[26rem] flex-col justify-between rounded-card bg-plasma p-8 text-chalk sm:p-12"
            >
              <div>
                <p data-panel-line className="text-sm text-chalk/85">
                  {m.label} · <span className="text-chalk/90">{m.problem}</span>
                </p>
                <h3 data-panel-line className="display mt-6 max-w-[30rem] text-[clamp(2.2rem,4.5vw,3.6rem)]">
                  {m.title}
                </h3>
                <p data-panel-line className="mt-5 max-w-[30rem] text-lg leading-relaxed text-chalk/90">
                  {m.text}
                </p>
              </div>
              <ul data-panel-line className="mt-10 flex flex-wrap gap-2">
                {m.points.map((p) => (
                  <li key={p} className="rounded-pill border-[1.5px] border-chalk/45 px-4 py-2 text-sm">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
