import Reveal from './ui/Reveal';
import CaseStudy, { type CaseStudyData } from './CaseStudy';
import { FunnelDiagram, FanoutDiagram, ProspectDiagram } from './CaseDiagrams';
import styles from './AutomationCases.module.css';

/* Anonymized by sector — no client names, no invented metrics (CLAUDE.md §5/§7).
 * Internal refs: SecureByte, Go To Truckers, SupraBT. */
const CASES: CaseStudyData[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Para un integrador de ciberseguridad: las cotizaciones llegaban por email, WhatsApp y chat web. Un flujo lee los mensajes y adjuntos (PDF, Excel, imágenes), califica el lead, deduplica en el CRM y reparte los negocios por turnos al equipo.',
    tags: ['IA', 'CRM', 'Multicanal'],
    diagram: <FunnelDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA con RAG sobre su guía de ventas extraen el contexto de cada empresa y generan correos personalizados, enviados en automático desde el correo del vendedor asignado.',
    tags: ['Agentes IA', 'RAG', 'Outbound'],
    diagram: <FanoutDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Prospección outbound B2B con IA',
    description:
      'Para una empresa de ciberseguridad: el flujo busca prospectos, los investiga con agentes de IA, los puntúa con una rúbrica de 0 a 100 (decisión, riesgo del sector, urgencia) y redacta cold emails diferenciados — dejando los leads listos separados de los fríos.',
    tags: ['Prospección', 'Scoring IA', 'Cold email'],
    diagram: <ProspectDiagram />,
  },
];

export default function AutomationCases() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} style={{ transitionDelay: '0ms' }}>
            Casos reales
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Automatizaciones que ya están funcionando
          </h2>
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
      </Reveal>
    </section>
  );
}
