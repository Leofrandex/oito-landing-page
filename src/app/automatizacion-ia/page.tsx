import ServiceHero from '@/components/ServiceHero';
import AutomationPillars from '@/components/AutomationPillars';
import AutomationCases from '@/components/AutomationCases';
import SolutionsGrid from '@/components/SolutionsGrid';
import RoiCalculator from '@/components/RoiCalculator';
import Methodology from '@/components/Methodology';
import BuiltWith from '@/components/BuiltWith';
import FinalCTA from '@/components/FinalCTA';

export const metadata = {
  title: 'Automatización con IA para tu negocio | oito',
  description:
    'Flujos y agentes de IA que automatizan lo repetitivo: prospección, CRM, soporte, reportes. oito lo hace por ti.',
};

export default function AutomatizacionIA() {
  return (
    <main>
      <ServiceHero
        title={<>Automatizamos lo <span className="accent-mint">repetitivo</span> con IA</>}
        subtitle="Flujos y agentes inteligentes que hacen el trabajo manual por ti, para que tu equipo se enfoque en crecer."
        rotating={['tu facturación', 'tu prospección', 'tu CRM', 'tu inventario', 'tus reportes', 'tu soporte']}
      />
      <AutomationPillars />
      <AutomationCases />
      <SolutionsGrid />
      <RoiCalculator />
      <Methodology />
      <BuiltWith />
      <FinalCTA
        title={
          <>
            ¿Listo para <span className="accent-mint">automatizar</span>?
          </>
        }
        lede="Cuéntanos qué proceso te quita horas. Te respondemos por WhatsApp, sin compromiso."
      />
    </main>
  );
}
