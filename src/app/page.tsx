import HashScrollFix from '@/components/HashScrollFix';
import Hero from '@/components/Hero';
import WhyOito from '@/components/WhyOito';
import AutomationPillars from '@/components/AutomationPillars';
import CasesShowcase from '@/components/CasesShowcase';
import SolutionsGrid from '@/components/SolutionsGrid';
import RoiCalculator from '@/components/RoiCalculator';
import Methodology from '@/components/Methodology';
import SocialProof from '@/components/SocialProof';
import BuiltWith from '@/components/BuiltWith';
import DevBridge from '@/components/DevBridge';
import Faq from '@/components/Faq';
import EasyStart from '@/components/EasyStart';
import FinalCTA from '@/components/FinalCTA';
import { buildJsonLd } from '@/lib/seo';

/* Orden de las 11 secciones del spec 2026-07-19 (§3).
 * SolutionsGrid y RoiCalculator son la base actual que las fases B-D
 * reemplazan por los patrones nuevos. El puente dev se añade en Fase B. */
export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <HashScrollFix />
      <Hero />
      <WhyOito />
      <AutomationPillars />
      <CasesShowcase id="casos" />
      <SolutionsGrid id="soluciones" />
      <RoiCalculator id="calculadora" />
      <Methodology />
      <SocialProof />
      <BuiltWith />
      <DevBridge />
      <Faq id="faq" />
      <EasyStart />
      <FinalCTA />
    </main>
  );
}
