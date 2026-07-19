'use client';

import { useRef } from 'react';
import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PreviewPilares.module.css';

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

/* Bloque 2 — Pilares (DECIDIDO): los 3 nodos reales en una misma fila (grid de 3
 * columnas, diseño pre-circuito). Sin conectores ni SVG; única vida = glow
 * secuencial sutil 1 -> 2 -> 3 sobre la capa .nodeGlow (solo opacity). */
export default function PreviewPilares() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = container.current;
      if (!root) return;

      const glow = (n: string) => root.querySelector<HTMLElement>(`[data-glow="${n}"]`);
      const glows = [glow('n1'), glow('n2'), glow('n3')];
      gsap.set(glows, { opacity: 0 });

      const tl = gsap.timeline({ repeat: -1 });
      glows.forEach((g) => {
        tl.to(g, { opacity: 1, duration: 0.5, ease: 'power2.out' })
          .to(g, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.35');
      });
      tl.to({}, { duration: 0.4 });
    },
    { scope: container },
  );

  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.inner} ref={container}>
        <header className={styles.head}>
          <p className="badge">Cómo lo logramos</p>
          <h2 className={styles.title}>Nos basamos en 3 pilares</h2>
        </header>

        <ul className={styles.nodes} role="list">
          {PILLARS.map(({ icon: Icon, title, desc, pos }) => (
            <li key={title} className={`glass ${styles.node}`}>
              <span className={styles.nodeGlow} data-glow={pos} aria-hidden="true" />
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
