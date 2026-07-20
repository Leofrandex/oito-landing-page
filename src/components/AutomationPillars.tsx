import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import Reveal from './ui/Reveal';
import BorderGlow from './ui/BorderGlow';
import styles from './AutomationPillars.module.css';

const PILLARS = [
  {
    icon: Zap,
    title: 'Productividad',
    desc: 'Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio.',
  },
  {
    icon: Workflow,
    title: 'Integración',
    desc: 'Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella.',
  },
  {
    icon: BotMessageSquare,
    title: 'IA Agéntica',
    desc: 'Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma.',
  },
];

/* Fila de 3 pilares (fuera del circuito, ver docs/superpowers/plans/2026-07-19-experiencia-fase-e-pulido.md,
 * decision del preview de pulido): los nodos glass en una misma fila, sin cables ni layout
 * triangular. Cada nodo conserva su look glass estatico; la unica vida es el BorderGlow
 * reactivo al cursor (mesh de borde + spotlight), sin glow automatico. */
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

        <ul className={styles.nodes} role="list">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <li key={title} className={styles.nodeItem}>
              <BorderGlow transparent className={styles.glowWrap}>
                <div className={`glass ${styles.node}`}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon size={26} strokeWidth={1.6} />
                  </div>
                  <h3 className={styles.nodeTitle}>{title}</h3>
                  <p className={styles.nodeDesc}>{desc}</p>
                </div>
              </BorderGlow>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
