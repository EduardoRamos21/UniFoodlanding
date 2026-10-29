import { PlusIcon } from "@/components/ui/icons";

type FaqItem = { id: string; q: string; a: React.ReactNode };

const faqs: FaqItem[] = [
  {
    id: "faq-que-es",
    q: "¿Qué es UNIFOOD?",
    a: "UNIFOOD es una plataforma para consultar menús de cafeterías universitarias, hacer pedidos anticipados y seguir su estado. También ofrece herramientas para que las cafeterías administren productos y pedidos.",
  },
  {
    id: "faq-precios",
    q: "¿Puedo consultar los precios antes de pedir?",
    a: "Sí. Puedes consultar los precios publicados en el menú de las cafeterías disponibles en la plataforma.",
  },
  {
    id: "faq-estado",
    q: "¿Puedo seguir el estado de mi pedido?",
    a: "El producto contempla estados para que puedas consultar el avance del pedido, desde que se registra hasta que está listo para recoger.",
  },
  {
    id: "faq-pagos",
    q: "¿Puedo pagar desde UNIFOOD?",
    a: "En la versión inicial, UNIFOOD no procesa pagos electrónicos. El método de pago y recogida debe confirmarse con cada cafetería.",
  },
  {
    id: "faq-entregas",
    q: "¿UNIFOOD entrega a mi salón o domicilio?",
    a: "UNIFOOD está pensado para pedidos anticipados y recogida según las indicaciones de la cafetería.",
  },
  {
    id: "faq-integracion",
    q: "¿Cómo puede integrarse una cafetería?",
    a: (
      <>
        El equipo de UNIFOOD puede conversar con la cafetería para conocer su operación y evaluar los siguientes pasos.{" "}
        <a href="#contacto" className="underline decoration-ember decoration-2 underline-offset-4">
          Contacta al equipo
        </a>
        .
      </>
    ),
  },
  {
    id: "faq-disponibilidad",
    q: "¿UNIFOOD está disponible en todas las universidades?",
    a: "La disponibilidad depende de las universidades, campus y cafeterías que se incorporen a la plataforma.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="page-container mt-28 sm:mt-36">
      <div className="grid gap-10 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="display mt-5 text-[clamp(2.6rem,6.5vw,5rem)]">
              Preguntas frecuentes
            </h2>
            <p className="mt-5 max-w-[24rem] text-lg leading-relaxed text-obsidian/75">
              Lo esencial sobre cómo funciona UNIFOOD en su versión inicial.
            </p>
          </div>
        </div>
        <div data-reveal className="rounded-card bg-limestone px-6 py-2 sm:px-10 lg:col-span-7">
          {faqs.map((f, i) => (
            <details
              key={f.id}
              id={f.id}
              data-faq
              className={`group scroll-mt-32 ${i > 0 ? "dotted-x border-obsidian/35" : ""}`}
              open={f.id === "faq-pagos" ? true : undefined}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-[1rem] py-6 text-[1.125rem] leading-snug">
                {f.q}
                <span
                  data-faq-icon
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-pumice transition-[transform,background-color] duration-300 group-hover:bg-sulfur"
                >
                  <PlusIcon />
                </span>
              </summary>
              <div className="max-w-[36rem] pb-6 pr-12 leading-relaxed text-obsidian/75">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
