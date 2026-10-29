import { LogoMark } from "@/components/ui/Logo";
import { FoodGlyph } from "@/components/ui/FoodGlyph";
import { CheckIcon, PinIcon, StoreIcon } from "@/components/ui/icons";
import { demoCafeteria, demoFolio, demoProducts, formatMXN } from "@/lib/demo-data";
import { StatusTracker } from "./StatusTracker";

function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-4 pt-9">
      <div className="flex items-center justify-between">
        <LogoMark className="size-6" />
        <span className="ui-badge bg-sulfur text-obsidian">Vista de ejemplo</span>
      </div>
      <p className="mt-3 text-[1.05rem] leading-tight text-obsidian">{title}</p>
      {subtitle ? (
        <p className="mt-1 flex items-center gap-1 text-[0.6875rem] text-obsidian/60">
          <PinIcon className="size-3" />
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function AvailabilityBadge({ available, compact = false }: { available: boolean; compact?: boolean }) {
  const size = compact ? "px-1.5 py-0.5 text-[0.5625rem]" : "";
  return available ? (
    <span className={`ui-badge bg-chalk text-obsidian ${size}`}>
      <CheckIcon className={compact ? "size-2.5" : "size-3"} />
      Disponible
    </span>
  ) : (
    <span className={`ui-badge border border-dotted border-obsidian/40 text-obsidian/60 ${size}`}>Agotado</span>
  );
}

const heroItems = ["molletes", "chilaquiles", "fruta", "cafe"];

export function MenuScreen({ fill = false }: { fill?: boolean }) {
  const items = heroItems
    .map((id) => demoProducts.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="flex h-full min-h-full flex-col">
      <ScreenHeader title={demoCafeteria.name} subtitle={demoCafeteria.campus} />
      <div className="mt-3 flex gap-1.5 px-4">
        <span className="ui-badge bg-ember text-obsidian">Desayunos</span>
        <span className="ui-badge bg-limestone text-obsidian/70">Comidas</span>
        <span className="ui-badge bg-limestone text-obsidian/70">Bebidas</span>
      </div>
      <ul className={`mt-3 flex min-h-0 flex-1 flex-col px-3 ${fill ? "justify-between gap-2 pb-1" : "gap-2 overflow-hidden"}`}>
        {items.map((p) => (
          <li
            key={p.id}
            data-menu-row
            className={`flex items-center gap-2.5 rounded-[1.1rem] bg-limestone p-2 ${fill ? "min-h-16 flex-1" : "shrink-0"} ${p.available ? "" : "opacity-60"}`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-[0.8rem] bg-pumice text-obsidian">
              <FoodGlyph glyph={p.glyph} className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.75rem] leading-tight text-obsidian">{p.name}</span>
              <span className="mt-1 flex items-center justify-between gap-1">
                <span className="text-[0.75rem] leading-none text-obsidian/70">{formatMXN(p.price)}</span>
                <AvailabilityBadge available={p.available} compact />
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="m-3 flex shrink-0 items-center justify-between rounded-pill bg-obsidian py-2.5 pl-4 pr-2.5 text-chalk">
        <span className="text-[0.6875rem] leading-tight">Revisa tu pedido · 2</span>
        <span className="rounded-pill bg-ember px-3 py-1 text-[0.6875rem] text-obsidian">{formatMXN(105)}</span>
      </div>
    </div>
  );
}

export function CampusScreen() {
  const cafeterias = [
    { name: "Cafetería Central", place: "Edificio A, planta baja" },
    { name: "Café Biblioteca", place: "Junto a la biblioteca" },
    { name: "Comedor Norte", place: "Explanada norte" },
  ];
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="¿Dónde quieres pedir?" />
      <div className="mt-3 space-y-1.5 px-3">
        <div className="rounded-[1rem] bg-limestone px-3 py-2">
          <span className="block text-[0.625rem] uppercase tracking-wider text-obsidian/50">Universidad</span>
          <span className="block text-[0.75rem] text-obsidian">Universidad de ejemplo</span>
        </div>
        <div className="rounded-[1rem] bg-limestone px-3 py-2">
          <span className="block text-[0.625rem] uppercase tracking-wider text-obsidian/50">Campus</span>
          <span className="block text-[0.75rem] text-obsidian">{demoCafeteria.campus}</span>
        </div>
      </div>
      <p className="mt-4 px-4 text-[0.6875rem] text-obsidian/60">Cafeterías disponibles</p>
      <ul className="mt-1.5 space-y-1.5 px-3">
        {cafeterias.map((c, i) => (
          <li
            key={c.name}
            className={`flex items-center gap-2.5 rounded-[1rem] p-2 ${i === 0 ? "bg-ember text-obsidian" : "bg-limestone text-obsidian"}`}
          >
            <span className={`grid size-9 place-items-center rounded-[0.7rem] ${i === 0 ? "bg-obsidian text-chalk" : "bg-pumice"}`}>
              <StoreIcon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.75rem] leading-tight">{c.name}</span>
              <span className="block truncate text-[0.625rem] opacity-70">{c.place}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConfirmScreen() {
  const lines = [
    { name: "Molletes", qty: 1, price: 45 },
    { name: "Chilaquiles verdes", qty: 1, price: 60 },
    { name: "Café americano", qty: 2, price: 25 },
  ];
  const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title="Revisa tu pedido" subtitle={demoCafeteria.name} />
      <ul className="mt-3 space-y-1 px-3">
        {lines.map((l) => (
          <li key={l.name} className="flex items-center gap-2 rounded-[0.9rem] bg-limestone px-3 py-2 text-[0.75rem] text-obsidian">
            <span className="grid size-5 place-items-center rounded-full bg-pumice text-[0.625rem]">{l.qty}</span>
            <span className="flex-1 truncate">{l.name}</span>
            <span className="text-obsidian/70">{formatMXN(l.qty * l.price)}</span>
          </li>
        ))}
      </ul>
      <div className="mx-4 mt-3 flex items-baseline justify-between border-t-[1.5px] border-dotted border-obsidian/30 pt-3">
        <span className="text-[0.75rem] text-obsidian/70">Total</span>
        <span className="text-[1.05rem] text-obsidian">{formatMXN(total)}</span>
      </div>
      <div className="mx-3 mt-3 rounded-[1rem] border border-dotted border-obsidian/35 px-3 py-2 text-[0.625rem] leading-snug text-obsidian/70">
        Pago y recogida según las indicaciones de la cafetería.
      </div>
      <div className="mt-auto p-3">
        <div className="rounded-pill bg-ember py-2.5 text-center text-[0.75rem] text-obsidian">Confirmar pedido</div>
      </div>
    </div>
  );
}

export function StatusScreen({ current = 3 }: { current?: number }) {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={`Pedido #${demoFolio}`} subtitle={demoCafeteria.name} />
      <div className="mx-3 mt-3 rounded-[1.1rem] bg-limestone p-3 text-obsidian">
        <StatusTracker current={current} />
      </div>
      <div className="mx-3 mt-2 rounded-[1.1rem] bg-obsidian p-3 text-chalk">
        <p className="text-[0.625rem] uppercase tracking-wider text-chalk/60">Para recoger</p>
        <p className="mt-1 text-[0.75rem] leading-snug">Consulta las indicaciones de la cafetería al llegar.</p>
      </div>
    </div>
  );
}
