import { LogoMark } from "@/components/ui/Logo";

const sides = [
  {
    audience: "Para estudiantes",
    title: "Decide antes de llegar.",
    text: "Consulta opciones, compara precios y sigue el estado de tu pedido.",
    items: ["Qué hay hoy", "Cuánto cuesta", "En qué va tu pedido"],
    tone: "bg-ember text-obsidian",
    chip: "bg-obsidian/10",
  },
  {
    audience: "Para cafeterías",
    title: "Organiza cada pedido.",
    text: "Gestiona el menú y actualiza el estado de preparación desde un flujo centralizado.",
    items: ["Qué llegó", "Qué se prepara", "Qué está listo"],
    tone: "bg-limestone text-obsidian",
    chip: "bg-pumice",
  },
];

export function SharedValue() {
  return (
    <section aria-labelledby="valor-title" className="page-container mt-28 sm:mt-36">
      <h2 data-reveal id="valor-title" className="display mx-auto max-w-[52rem] text-center text-[clamp(2.6rem,7vw,5.5rem)]">
        Una mejor coordinación empieza con información clara.
      </h2>

      <div className="relative mt-14 grid gap-3 md:grid-cols-2">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-[1] hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-pumice p-3 md:block"
        >
          <LogoMark className="size-16" />
        </div>
        {sides.map((s) => (
          <article
            key={s.audience}
            data-reveal
            className={`flex min-h-[24rem] flex-col justify-between rounded-card p-8 sm:p-12 ${s.tone}`}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.08em]">{s.audience}</p>
              <h3 className="display mt-6 text-[clamp(2.4rem,4.6vw,4rem)]">{s.title}</h3>
              <p className="mt-4 max-w-[26rem] text-lg leading-relaxed opacity-80">{s.text}</p>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2">
              {s.items.map((item) => (
                <li key={item} className={`rounded-pill px-4 py-2 text-sm ${s.chip}`}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
