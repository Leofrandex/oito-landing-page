import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './AutomationPillars.module.css';

const PILLARS = [
  {
    icon: Zap,
    title: 'Productividad',
    desc: 'Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio.',
    delay: 120,
  },
  {
    icon: Workflow,
    title: 'Integración',
    desc: 'Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella.',
    delay: 240,
  },
  {
    icon: BotMessageSquare,
    title: 'IA Agéntica',
    desc: 'Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma.',
    delay: 360,
  },
];

export default function AutomationPillars() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} style={{ transitionDelay: '0ms' }}>
            Cómo lo logramos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '80ms' }}>
            Nos basamos en 3 pilares
          </h2>
        </header>

        <ul className={styles.grid} role="list">
          {PILLARS.map(({ icon: Icon, title, desc, delay }) => (
            <li
              key={title}
              className={`glass ${styles.card}`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <div className={styles.iconWrap} aria-hidden="true">
                <Icon size={28} strokeWidth={1.6} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
