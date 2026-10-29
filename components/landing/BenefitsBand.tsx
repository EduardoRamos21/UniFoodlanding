const benefits = [
  {
    title: "Consulta antes de ir",
    text: "Revisa opciones, precios y disponibilidad antes de desplazarte a la cafetería.",
  },
  {
    title: "Pide con anticipación",
    text: "Arma tu pedido y confirma sus detalles para que la cafetería pueda gestionarlo.",
  },
  {
    title: "Sigue el estado",
    text: "Consulta si tu pedido está pendiente, en preparación o listo para recoger.",
  },
];

const capabilities = [
  "Menús por cafetería",
  "Precios visibles",
  "Disponible / Agotado",
  "Pedido anticipado",
  "Estado del pedido",
  "Recogida en cafetería",
];

export function BenefitsBand() {
  return (
    <section aria-labelledby="beneficios-title" className="page-container mt-20 sm:mt-28">
      <h2 id="beneficios-title" className="sr-only">
        Beneficios principales
      </h2>
      <ul data-reveal-group className="grid gap-3 md:grid-cols-3">
        {benefits.map((b, i) => (
          <li
            key={b.title}
            className="group relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-card bg-ember p-8 text-obsidian sm:p-10"
          >
            <div>
              <h3 className="text-[1.375rem] leading-tight">{b.title}</h3>
              <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-obsidian/80">{b.text}</p>
            </div>
            <span
              aria-hidden="true"
              className="display mt-8 block text-[5.5rem] leading-[0.8] text-chalk transition-transform duration-500 ease-out-soft group-hover:-translate-y-1"
            >
              0{i + 1}
            </span>
          </li>
        ))}
      </ul>
      <div data-reveal className="mt-3 rounded-card bg-limestone px-6 py-6 sm:px-10">
        <ul className="flex flex-wrap items-center justify-center gap-y-3 text-[0.9375rem] text-obsidian md:justify-between">
          {capabilities.map((c, i) => (
            <li key={c} className={`px-4 md:px-0 ${i > 0 ? "md:dotted-y md:border-obsidian/40 md:pl-6" : ""}`}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
