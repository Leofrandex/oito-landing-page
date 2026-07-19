import Hero from '@/components/Hero';
import WhyOito from '@/components/WhyOito';
import AutomationPillars from '@/components/AutomationPillars';
import FeaturedCases from '@/components/FeaturedCases';
import SolutionsGrid from '@/components/SolutionsGrid';
import RoiCalculator from '@/components/RoiCalculator';
import Methodology from '@/components/Methodology';
import SocialProof from '@/components/SocialProof';
import BuiltWith from '@/components/BuiltWith';
import Faq from '@/components/Faq';
import EasyStart from '@/components/EasyStart';
import FinalCTA from '@/components/FinalCTA';

/* Orden de las 11 secciones del spec 2026-07-19 (§3).
 * FeaturedCases, SolutionsGrid y RoiCalculator son la base actual que las
 * fases B-D reemplazan por los patrones nuevos. El puente dev se añade en Fase B. */
export default function Home() {
  return (
    <main>
      <Hero />
      <WhyOito />
      <AutomationPillars />
      <div id="casos" className="anchor-target">
        <FeaturedCases />
      </div>
      <div id="soluciones" className="anchor-target">
        <SolutionsGrid />
      </div>
      <div id="calculadora" className="anchor-target">
        <RoiCalculator />
      </div>
      <Methodology />
      <SocialProof />
      <BuiltWith />
      <div id="faq" className="anchor-target">
        <Faq />
      </div>
      <EasyStart />
      <FinalCTA />
    </main>
  );
}
