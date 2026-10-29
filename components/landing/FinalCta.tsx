import { ctas } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="page-container mt-28 sm:mt-36">
      <div data-reveal className="relative overflow-hidden rounded-card bg-ember px-8 py-16 text-obsidian sm:px-14 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-[26rem] rounded-full opacity-90 sm:size-[34rem]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-plasma) 0 2.1px, transparent 2.5px)",
            backgroundSize: "9px 9px",
            maskImage: "radial-gradient(closest-side, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 20%, transparent 100%)",
          }}
        />
        <div className="relative max-w-[50rem]">
          <h2 id="cta-title" className="display text-[clamp(2.8rem,8vw,6.5rem)]">
            La próxima pausa puede empezar antes de llegar.
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-obsidian/85">
            Conoce UNIFOOD y descubre una forma más clara de conectar los pedidos con las cafeterías universitarias.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink cta={ctas.final} variant="dark" size="lg" withArrow />
            <ButtonLink cta={ctas.heroSecondary} variant="secondary" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
