import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/hero/Hero";
import { BenefitsBand } from "@/components/landing/BenefitsBand";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { ForCafeterias } from "@/components/landing/ForCafeterias";
import { SharedValue } from "@/components/landing/SharedValue";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Contact } from "@/components/landing/Contact";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { ScrollReveals } from "@/components/landing/ScrollReveals";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <ScrollReveals>
        <main id="contenido">
          <Hero />
          <BenefitsBand />
          <ProblemSolution />
          <HowItWorks />
          <ProductShowcase />
          <ForCafeterias />
          <SharedValue />
          <Faq />
          <FinalCta />
          <Contact />
        </main>
        <SiteFooter />
      </ScrollReveals>
    </>
  );
}
