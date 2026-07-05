import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import CaseStudy, { type CaseStudyData } from './CaseStudy';
import { RouteDiagram, ChainDiagram, FunnelDiagram, FanoutDiagram } from './CaseDiagrams';
import styles from './FeaturedCases.module.css';

/* Anonymized by sector — no client names, no invented metrics (CLAUDE.md §5/§7).
 * Internal refs: Ponce-Benzo, Hospiwaste, SecureByte, Go To Truckers. */
const CASES: CaseStudyData[] = [
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'App móvil nativa + panel web para una distribuidora farmacéutica: GPS en tiempo real, modo offline y cámara anti-fraude para verificar visitas de mercaderistas en campo.',
    tags: ['App móvil', 'Dashboard', 'Offline-first'],
    diagram: <RouteDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios en automático.',
    tags: ['PWA', 'Reportes PDF', 'Firmas'],
    diagram: <ChainDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Para un integrador de ciberseguridad: un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs y adjuntos), califica con IA y los reparte en el CRM.',
    tags: ['IA', 'CRM', 'Multicanal'],
    diagram: <FunnelDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA con RAG generan correos de venta personalizados y los envían en automático desde el correo de cada vendedor.',
    tags: ['Agentes IA', 'RAG', 'Outbound'],
    diagram: <FanoutDiagram />,
  },
];

export default function FeaturedCases() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Casos destacados
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Lo que <span className={`wordmark ${styles.brand}`}>oito</span> ya ha construido
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '140ms' }}>
            Proyectos reales para empresas reales.
          </p>
        </header>

        <div className={styles.rows}>
          {CASES.map((c, i) => (
            <div
              key={c.title}
              className={styles.row}
              style={{ transitionDelay: `${200 + i * 110}ms` }}
            >
              <CaseStudy {...c} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>

        <div className={styles.ctas} style={{ transitionDelay: '700ms' }}>
          <Link href="/desarrollo-web" className={styles.cta}>
            Ver todo el desarrollo <ArrowRight size={18} strokeWidth={2} />
          </Link>
          <Link href="/automatizacion-ia" className={styles.cta}>
            Ver toda la automatización <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
