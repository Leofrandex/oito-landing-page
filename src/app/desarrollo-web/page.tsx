import ServiceHero from '@/components/ServiceHero';
import DevServices from '@/components/DevServices';
import DevProcess from '@/components/DevProcess';
import DevCases from '@/components/DevCases';
import DevTech from '@/components/DevTech';
import FinalCTA from '@/components/FinalCTA';

export const metadata = {
  title: 'Desarrollo web, apps y software a medida | oito',
  description:
    'Construimos sitios web, apps móviles y sistemas a medida para pymes de LatAm. De la idea al producto, rápido y bien hecho. oito lo hace por ti.',
};

export default function DesarrolloWebPage() {
  return (
    <main>
      <ServiceHero
        title={<>Construimos el <span className="accent-mint">software</span> que tu empresa necesita</>}
        subtitle="Sitios web, apps móviles y sistemas a medida. De la idea al producto, rápido y bien hecho."
        rotating={['tu página web', 'tu app', 'tu sistema interno', 'tu dashboard']}
      />
      <DevServices />
      <DevProcess />
      <DevCases />
      <DevTech />
      <FinalCTA
        title={<>¿Tienes un <span className="accent-mint">proyecto</span> en mente?</>}
        lede="Cuéntanos qué necesitas construir. Te respondemos por WhatsApp, sin compromiso."
      />
    </main>
  );
}
