import Reveal from './ui/Reveal';
import CaseStudy, { type CaseStudyData } from './CaseStudy';
import { RouteDiagram, ProspectDiagram, ChainDiagram } from './CaseDiagrams';
import styles from './DevCases.module.css';

/* Anonimizado por sector (CLAUDE.md §7). Refs internas: Ponce-Benzo, Hospitalar, Hospiwaste. */
const CASES: CaseStudyData[] = [
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'Sistema dual para una distribuidora farmacéutica: app móvil nativa con GPS continuo en segundo plano, modo offline-first y cámara anti-fraude (solo fotos en vivo), más un panel web supervisor con rutas en tiempo real, mapas de calor y asignación de tareas.',
    tags: ['App móvil', 'Sistema a medida', 'Dashboard'],
    diagram: <RouteDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'Plataforma interna de operaciones',
    description:
      'Plataforma web a medida para un distribuidor de equipos médicos: centraliza servicio técnico (órdenes correctivas, preventivas y predictivas), logística, cobranzas y compras, con importación masiva desde SAP, firmas digitales y un portal para sus clientes.',
    tags: ['Sistema a medida', 'Dashboard', 'Portal de clientes'],
    diagram: <ProspectDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'App de trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: gestiona el ciclo de vida de los contenedores con puntos de control en ruta, pesaje con peso neto facturable, evidencia fotográfica y firmas, generando en automático los reportes PDF que exige la regulación.',
    tags: ['PWA', 'Sistema a medida', 'Dashboard'],
    diagram: <ChainDiagram />,
  },
];

export default function DevCases() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Casos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Proyectos que hemos construido
          </h2>
        </header>

        <div className={styles.rows}>
          {CASES.map((c, i) => (
            <div key={c.title} className={styles.row} style={{ transitionDelay: `${200 + i * 110}ms` }}>
              <CaseStudy {...c} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
