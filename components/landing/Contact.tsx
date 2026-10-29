import { contacts } from "@/lib/site-config";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="page-container mt-28 scroll-mt-28 sm:mt-36">
      <div data-reveal className="rounded-card bg-limestone px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
        <p className="eyebrow">Contacto</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="contacto-title" className="display text-[clamp(2.6rem,7vw,5.5rem)] lg:col-span-7">
            Escríbenos.
          </h2>
          <p className="max-w-[28rem] text-lg leading-relaxed text-obsidian/75 lg:col-span-5">
            Si quieres conocer UNIFOOD o conversar sobre tu cafetería, estos son los canales del equipo.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {contacts.map((item) => {
            const Icon = item.channel === "Correo" ? MailIcon : WhatsAppIcon;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full min-h-44 flex-col justify-between rounded-[2rem] bg-pumice p-7 transition-colors duration-300 hover:bg-ember"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="grid size-12 place-items-center rounded-[0.9rem] bg-limestone text-obsidian">
                      <Icon />
                    </span>
                    <span className="text-sm text-obsidian/70">{item.channel}</span>
                  </span>
                  <span className="mt-8 block text-[1.15rem] leading-tight sm:text-[1.3rem]">
                    {item.value.includes("@") ? (
                      <>
                        {item.value.slice(0, item.value.indexOf("@"))}
                        <wbr />@{item.value.slice(item.value.indexOf("@") + 1)}
                      </>
                    ) : (
                      item.value
                    )}
                  </span>
                  {item.external ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
