"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP, FULL_MOTION } from "@/lib/gsap";
import {
  demoCafeteria,
  demoCategories,
  demoFolio,
  demoProducts,
  formatMXN,
  orderStatusFlow,
  type DemoCategoryId,
} from "@/lib/demo-data";
import { FoodGlyph } from "@/components/ui/FoodGlyph";
import { MinusIcon, PinIcon, PlusIcon } from "@/components/ui/icons";
import { AvailabilityBadge } from "@/components/mockups/AppScreens";
import { StatusTracker } from "@/components/mockups/StatusTracker";

type Phase = "building" | "tracking";

const STEP_MS = 1600;

export function ProductShowcase() {
  const [category, setCategory] = useState<DemoCategoryId>("desayunos");
  const [cart, setCart] = useState<Record<string, number>>({ chilaquiles: 1, cafe: 1 });
  const [phase, setPhase] = useState<Phase>("building");
  const [status, setStatus] = useState(0);
  const gridRef = useRef<HTMLUListElement>(null);

  const products = demoProducts.filter((p) => p.category === category);
  const lines = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
          const product = demoProducts.find((p) => p.id === id);
          return product ? { product, qty } : null;
        })
        .filter((l): l is NonNullable<typeof l> => l !== null),
    [cart],
  );
  const total = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);

  useEffect(() => {
    if (phase !== "tracking" || status >= orderStatusFlow.length - 1) return;
    const id = window.setTimeout(() => setStatus((s) => s + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [phase, status]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(FULL_MOTION, () => {
        gsap.from("[data-product]", { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.045, ease: "expo.out" });
      });
    },
    { scope: gridRef, dependencies: [category], revertOnUpdate: true },
  );

  const changeQty = (id: string, delta: number) => {
    setCart((c) => ({ ...c, [id]: Math.max(0, Math.min(9, (c[id] ?? 0) + delta)) }));
  };

  const reset = () => {
    setPhase("building");
    setStatus(0);
  };

  const currentStatus = orderStatusFlow[status];

  return (
    <section id="estudiantes" aria-labelledby="estudiantes-title" className="page-container mt-28 sm:mt-36">
      <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow">Para estudiantes · Todo más claro, desde el menú</p>
          <h2 id="estudiantes-title" className="display mt-5 text-[clamp(2.6rem,7vw,5.5rem)]">
            Lo que necesitas saber antes de pedir.
          </h2>
        </div>
        <p className="max-w-[30rem] text-lg leading-relaxed text-obsidian/75 lg:col-span-5 lg:justify-self-end">
          Encuentra las opciones disponibles, revisa el precio antes de confirmar y consulta el estado de tu pedido sin
          perder de vista el siguiente paso.
        </p>
      </div>

      <div data-reveal className="mt-12 grid gap-3 rounded-card bg-limestone p-3 sm:p-4 lg:grid-cols-[1fr_23rem]">
        <div className="rounded-[2rem] bg-chalk p-5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="display text-[2rem]">{demoCafeteria.name}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-obsidian/65">
                <PinIcon className="size-4" />
                {demoCafeteria.campus}
              </p>
            </div>
            <span className="ui-badge bg-sulfur px-3 py-1.5 text-xs text-obsidian">Menú ilustrativo</span>
          </div>

          <div role="group" aria-label="Categorías del menú" className="mt-6 flex flex-wrap gap-2">
            {demoCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className={`min-h-11 rounded-pill px-5 text-[0.9375rem] transition-colors ${
                  category === c.id ? "bg-ember text-obsidian" : "bg-limestone text-obsidian hover:bg-pumice"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul ref={gridRef} className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((p) => {
              const qty = cart[p.id] ?? 0;
              return (
                <li
                  key={p.id}
                  data-product
                  className={`flex flex-col rounded-[1.5rem] bg-limestone p-4 ${p.available ? "" : "opacity-70"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="grid size-12 place-items-center rounded-[1rem] bg-pumice text-obsidian">
                      <FoodGlyph glyph={p.glyph} />
                    </span>
                    <AvailabilityBadge available={p.available} />
                  </div>
                  <h3 className="mt-4 text-[1.0625rem] leading-tight">{p.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-obsidian/65">{p.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span className="text-lg">{formatMXN(p.price)}</span>
                    {!p.available ? (
                      <span className="text-sm text-obsidian/60">No disponible</span>
                    ) : qty > 0 ? (
                      <div className="flex items-center gap-1 rounded-pill bg-chalk p-1">
                        <button
                          type="button"
                          onClick={() => changeQty(p.id, -1)}
                          disabled={phase === "tracking"}
                          className="grid size-9 place-items-center rounded-full hover:bg-pumice disabled:opacity-40"
                          aria-label={`Quitar un ${p.name}`}
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-5 text-center text-sm" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(p.id, 1)}
                          disabled={phase === "tracking"}
                          className="grid size-9 place-items-center rounded-full bg-ember hover:bg-ember-press disabled:opacity-40"
                          aria-label={`Agregar otro ${p.name}`}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => changeQty(p.id, 1)}
                        disabled={phase === "tracking"}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-pill bg-ember px-4 text-sm hover:bg-ember-press disabled:opacity-40"
                        aria-label={`Agregar ${p.name}`}
                      >
                        <PlusIcon className="size-3.5" />
                        Agregar
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <aside
          aria-label="Resumen del pedido de demostración"
          className="flex flex-col rounded-[2rem] bg-obsidian p-6 text-chalk sm:p-8"
        >
          {phase === "building" ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="display text-[2rem]">Revisa tu pedido</h3>
                <span className="text-sm text-chalk/70">{itemCount} art.</span>
              </div>
              {lines.length === 0 ? (
                <p className="mt-6 rounded-[1.25rem] border-[1.5px] border-dotted border-chalk/30 p-5 text-sm text-chalk/75">
                  Agrega productos del menú para ver el resumen.
                </p>
              ) : (
                <ul className="mt-6 flex flex-col">
                  {lines.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="dotted-x flex items-center justify-between gap-3 border-chalk/25 py-3 first:border-t-0"
                    >
                      <span className="min-w-0">
                        <span className="block truncate">{product.name}</span>
                        <span className="text-sm text-chalk/65">
                          {qty} × {formatMXN(product.price)}
                        </span>
                      </span>
                      <span>{formatMXN(product.price * qty)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-6">
                <div className="dotted-x flex items-baseline justify-between border-chalk/40 pt-4">
                  <span className="text-chalk/75">Total</span>
                  <span className="display text-[2.4rem] leading-none">{formatMXN(total)}</span>
                </div>
                <p className="mt-3 text-sm leading-snug text-chalk/70">
                  Pago y recogida según las indicaciones de la cafetería.
                </p>
                <button
                  type="button"
                  disabled={lines.length === 0}
                  onClick={() => {
                    setStatus(0);
                    setPhase("tracking");
                  }}
                  className="mt-5 min-h-12 w-full rounded-pill bg-ember px-6 text-obsidian transition-colors hover:bg-ember-press active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-chalk/20 disabled:text-chalk/60"
                >
                  Confirmar pedido de ejemplo
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <h3 className="display text-[2rem]">Pedido #{demoFolio}</h3>
                <span className="ui-badge bg-sulfur text-obsidian">Demostración</span>
              </div>
              <p className="mt-1 text-sm text-chalk/70">
                {demoCafeteria.name} · {itemCount} art. · {formatMXN(total)}
              </p>
              <div className="mt-6 rounded-[1.5rem] bg-chalk/[0.06] p-5">
                <StatusTracker current={status} tone="dark" />
              </div>
              <p className="sr-only" aria-live="polite">
                Estado del pedido de ejemplo: {currentStatus?.label}
              </p>
              <div className="mt-auto pt-6">
                <p className="text-sm leading-snug text-chalk/70">
                  En la app real, la cafetería actualiza cada estado. Aquí avanzan solos como demostración.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 min-h-12 w-full rounded-pill border-[1.5px] border-chalk/70 px-6 transition-colors hover:bg-chalk hover:text-obsidian"
                >
                  Reiniciar demo
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
      <p data-reveal className="mt-4 text-center text-sm text-obsidian/60">
        Demostración local con datos ilustrativos: no se envía ningún pedido ni se conecta con una cafetería.
      </p>
    </section>
  );
}
