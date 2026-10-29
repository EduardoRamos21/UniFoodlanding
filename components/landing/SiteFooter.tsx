import { contacts, navLinks } from "@/lib/site-config";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-28 overflow-hidden sm:mt-36">
      <div className="page-container">
        <div className="dotted-x grid gap-10 border-obsidian/40 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-[22rem] text-obsidian/75">
              Pedidos anticipados y gestión de cafeterías universitarias.
            </p>
          </div>
          <nav aria-label="Secciones" className="md:col-span-4">
            <ul className="grid gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-obsidian underline-offset-4 hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm leading-relaxed text-obsidian/70 md:col-span-3">
            <p>La disponibilidad y las condiciones de recogida dependen de las cafeterías participantes.</p>
            <ul className="mt-4 grid gap-2">
              {contacts.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-obsidian underline-offset-4 hover:underline"
                  >
                    {item.channel}: {item.value}
                    {item.external ? <span className="sr-only"> (se abre en una pestaña nueva)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p
        data-footer-mark
        aria-hidden="true"
        className="display mt-10 select-none whitespace-nowrap text-center text-[23.5vw] leading-[0.78] text-obsidian lg:text-[min(23.5vw,21.5rem)]"
      >
        {"UNIFOOD".split("").map((ch, i) => (
          <span key={i} data-footer-letter className="inline-block">
            {ch}
          </span>
        ))}
      </p>
      <div className="page-container flex flex-wrap justify-between gap-2 py-6 text-xs text-obsidian/60">
        <p>© {new Date().getFullYear()} UNIFOOD</p>
        <p>Versión inicial en desarrollo</p>
      </div>
    </footer>
  );
}
