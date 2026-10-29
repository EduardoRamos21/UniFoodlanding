"use client";

import { useRef } from "react";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";
import { ctas } from "@/lib/site-config";
import { formatMXN } from "@/lib/demo-data";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ChartIcon, ListIcon, QueueIcon } from "@/components/ui/icons";

const benefits = [
  {
    Icon: ListIcon,
    title: "Tu menú al día",
    text: "Actualiza productos, precios, categorías y disponibilidad.",
  },
  {
    Icon: QueueIcon,
    title: "Pedidos en un solo flujo",
    text: "Consulta los pedidos de tu cafetería y gestiona sus estados durante la preparación.",
  },
  {
    Icon: ChartIcon,
    title: "Una visión más clara",
    text: "Revisa reportes básicos de pedidos e importes registrados en UNIFOOD.",
  },
];

const queue = [
  {
    title: "Pendientes",
    action: "Aceptar",
    orders: [
      { folio: "UF-0433", items: "2 × Café americano", time: "10:46" },
      { folio: "UF-0432", items: "1 × Torta de milanesa", time: "10:44" },
    ],
  },
  {
    title: "En preparación",
    action: "Marcar listo",
    orders: [{ folio: "UF-0430", items: "1 × Chilaquiles verdes", time: "10:39" }],
  },
  {
    title: "Listos para recoger",
    action: "Entregado",
    orders: [{ folio: "UF-0427", items: "1 × Molletes · 1 × Agua", time: "10:31" }],
  },
];

const menuToggles = [
  { name: "Chilaquiles verdes", on: true },
  { name: "Sopa del día", on: false },
  { name: "Agua de jamaica", on: true },
];

const bars = [3, 5, 8, 6, 9, 7, 4];

export function ForCafeterias() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${FULL_MOTION}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax ?? 0);
          gsap.fromTo(
            el,
            { y: speed },
            {
              y: -speed,
              ease: "none",
              scrollTrigger: { trigger: "[data-dashboard]", start: "top bottom", end: "bottom top", scrub: 1 },
            },
          );
        });
        gsap.from("[data-bar]", {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-bars]", start: "top 85%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="cafeterias"
      aria-labelledby="cafeterias-title"
      className="mx-2 mt-28 overflow-hidden rounded-card bg-obsidian text-chalk sm:mx-4 sm:mt-36"
    >
      <div className="page-container py-20 sm:py-28">
        <div data-reveal className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">UNIFOOD para cafeterías</p>
            <h2 id="cafeterias-title" className="display mt-5 text-[clamp(2.6rem,7vw,5.8rem)]">
              Menos desorden en los pedidos. <span className="text-ember">Más claridad en la operación.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-4">
            <p className="text-lg leading-relaxed text-chalk/80">
              Administra tu menú, revisa los pedidos que llegan y actualiza su estado desde un flujo de trabajo más
              organizado.
            </p>
          </div>
        </div>

        <div data-dashboard data-reveal className="relative mt-14">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-chalk/70">Panel de cafetería · Vista de ejemplo</p>
            <span className="ui-badge bg-sulfur px-3 py-1 text-xs text-obsidian">Datos ilustrativos</span>
          </div>
          <div className="grid gap-3 lg:grid-cols-12">
            <div data-parallax="0" className="rounded-[2rem] bg-limestone p-4 text-obsidian sm:p-5 lg:col-span-8">
              <div className="flex items-center justify-between px-2 pb-4 pt-1">
                <p className="display text-[1.75rem]">Cola de pedidos</p>
                <p className="text-sm text-obsidian/65">Hoy</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {queue.map((col) => (
                  <div key={col.title} className="rounded-[1.5rem] bg-pumice p-3">
                    <p className="flex items-center justify-between px-1 pb-3 text-sm">
                      {col.title}
                      <span className="grid size-6 place-items-center rounded-full bg-chalk text-xs">
                        {col.orders.length}
                      </span>
                    </p>
                    <ul className="flex flex-col gap-2">
                      {col.orders.map((o) => (
                        <li key={o.folio} className="rounded-[1.1rem] bg-chalk p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>#{o.folio}</span>
                            <span className="text-xs text-obsidian/60">{o.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-obsidian/70">{o.items}</p>
                          <span className="mt-3 block rounded-pill bg-obsidian py-1.5 text-center text-xs text-chalk">
                            {col.action}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              <div data-parallax="14" className="rounded-[2rem] bg-limestone p-6 text-obsidian">
                <p className="display text-[1.75rem]">Disponibilidad</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {menuToggles.map((t) => (
                    <li key={t.name} className="flex items-center justify-between gap-3 text-sm">
                      <span>{t.name}</span>
                      <span className="flex items-center gap-2 text-xs text-obsidian/65">
                        {t.on ? "Disponible" : "Agotado"}
                        <span
                          aria-hidden="true"
                          className={`flex h-6 w-10 items-center rounded-pill p-0.5 ${t.on ? "justify-end bg-ember" : "justify-start bg-pumice"}`}
                        >
                          <span className="size-5 rounded-full bg-chalk" />
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div data-parallax="26" className="rounded-[2rem] bg-ember p-6 text-obsidian">
                <p className="text-sm">Importe de pedidos registrados</p>
                <p className="display mt-2 text-[3.25rem] leading-none text-chalk">{formatMXN(2340)}</p>
                <div data-bars className="mt-5 flex h-16 items-end gap-1.5" aria-hidden="true">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      data-bar
                      className="flex-1 rounded-t-[0.4rem] bg-obsidian/85"
                      style={{ height: `${h * 10}%` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-obsidian/75">
                  Ejemplo. Refleja pedidos registrados, no cobros procesados por UNIFOOD.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul data-reveal-group className="mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {benefits.map((b, i) => (
            <li key={b.title} className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:dotted-y md:border-chalk/30"}`}>
              <span className="grid size-12 place-items-center rounded-[0.9rem] bg-chalk/10 text-ember">
                <b.Icon />
              </span>
              <h3 className="display mt-6 text-[2rem]">{b.title}</h3>
              <p className="mt-2 leading-relaxed text-chalk/75">{b.text}</p>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] border-[1.5px] border-dotted border-chalk/35 p-6 sm:p-8 md:flex-row md:items-center"
        >
          <p className="max-w-[34rem] text-lg leading-relaxed text-chalk/85">
            ¿Administras una cafetería universitaria? Conversemos sobre cómo podría encajar UNIFOOD en tu operación.
          </p>
          <ButtonLink cta={ctas.cafeteria} withArrow className="w-full md:w-auto" />
        </div>
      </div>
    </section>
  );
}
