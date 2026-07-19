'use client';

import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import styles from './PreviewPilares.module.css';

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

/* Bloque 2 — Pilares (DECIDIDO): los 3 nodos reales en una misma fila (grid de 3
 * columnas, diseño pre-circuito). Sin conectores ni SVG; única vida = glow
 * secuencial 1 -> 2 -> 3 en bucle continuo sobre la capa .nodeGlow (solo opacity).
 * CSS puro: keyframe node-glow (portado de AutomationPillars) con delay escalonado
 * por posición de nodo; no depende de ningún atributo [data-revealed]. */
export default function PreviewPilares() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className="badge">Cómo lo logramos</p>
          <h2 className={styles.title}>Nos basamos en 3 pilares</h2>
        </header>

        <ul className={styles.nodes} role="list">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <li key={title} className={`glass ${styles.node}`}>
              <span className={styles.nodeGlow} aria-hidden="true" />
              <div className={styles.iconWrap} aria-hidden="true">
                <Icon size={26} strokeWidth={1.6} />
              </div>
              <h3 className={styles.nodeTitle}>{title}</h3>
              <p className={styles.nodeDesc}>{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
