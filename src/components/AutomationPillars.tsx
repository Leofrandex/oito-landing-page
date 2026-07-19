import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './AutomationPillars.module.css';

const PILLARS = [
  {
    icon: Zap,
    title: 'Productividad',
    desc: 'Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio.',
    pos: 'n1' as const,
  },
  {
    icon: Workflow,
    title: 'Integración',
    desc: 'Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella.',
    pos: 'n2' as const,
  },
  {
    icon: BotMessageSquare,
    title: 'IA Agéntica',
    desc: 'Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma.',
    pos: 'n3' as const,
  },
];

/* Circuito conectado (spec 2026-07-19 §3.3): los 3 pilares como nodos glass de un
 * mismo circuito, con pulsos de luz mint viajando por los cables SVG. Layout
 * triangular: Productividad y IA Agéntica arriba, Integración centro-abajo. */
export default function AutomationPillars() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Cómo lo logramos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '80ms' }}>
            Nos basamos en 3 pilares
          </h2>
        </header>

        <div className={styles.circuit}>
          <svg
            className={styles.wires}
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* n1 (arriba-izq) -> n2 (centro-abajo) */}
            <path className={styles.wire} d="M215,190 C300,320 380,380 500,395" />
            {/* n3 (arriba-der) -> n2 */}
            <path className={styles.wire} d="M785,190 C700,320 620,380 500,395" />
            {/* n1 -> n3 (arco superior) */}
            <path className={styles.wire} d="M240,120 C420,40 580,40 760,120" />
            <path className={`${styles.pulse} ${styles.p1}`} d="M215,190 C300,320 380,380 500,395" />
            <path className={`${styles.pulse} ${styles.p2}`} d="M785,190 C700,320 620,380 500,395" />
            <path className={`${styles.pulse} ${styles.p3}`} d="M240,120 C420,40 580,40 760,120" />
          </svg>

          <ul className={styles.nodes} role="list">
            {PILLARS.map(({ icon: Icon, title, desc, pos }) => (
              <li key={title} className={`glass ${styles.node} ${styles[pos]}`}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <h3 className={styles.nodeTitle}>{title}</h3>
                <p className={styles.nodeDesc}>{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
