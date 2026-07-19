'use client';

import { useRef } from 'react';
import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PreviewPilares.module.css';

type Variant = 'sinlineas' | 'pcb' | 'anillo';

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

/* Aproximación de los centros de nodo en el espacio del viewBox 1000x520:
 * n1 (arriba-izq), n3 (arriba-der), n2 (centro-abajo). */
const PCB_TRACES = [
  'M215,190 V410 H500', // n1 -> n2 (ángulos rectos)
  'M500,410 H785 V190', // n2 -> n3
  'M785,120 V60 H215 V120', // n3 -> n1
];

const PCB_PADS = [
  [215, 410],
  [500, 410],
  [785, 190],
  [785, 60],
  [215, 60],
];

export default function PreviewPilares({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = container.current;
      if (!root) return;

      const glow = (n: string) => root.querySelector<HTMLElement>(`[data-glow="${n}"]`);
      const glows = { n1: glow('n1'), n2: glow('n2'), n3: glow('n3') };
      gsap.set([glows.n1, glows.n2, glows.n3], { opacity: 0 });

      if (variant === 'sinlineas') {
        // Glow secuencial 1 -> 2 -> 3, solo opacity.
        const tl = gsap.timeline({ repeat: -1 });
        (['n1', 'n2', 'n3'] as const).forEach((n) => {
          tl.to(glows[n], { opacity: 1, duration: 0.5, ease: 'power2.out' })
            .to(glows[n], { opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.35');
        });
      }

      if (variant === 'pcb') {
        const pulses = gsap.utils.toArray<SVGPathElement>('[data-pulse]');
        pulses.forEach((p) => {
          gsap.set(p, { strokeDasharray: '14 86', strokeDashoffset: 100 });
        });
        // Llegada de cada pulso enciende su nodo destino: n1->n2, n2->n3, n3->n1.
        const arrivals: Array<keyof typeof glows> = ['n2', 'n3', 'n1'];
        const tl = gsap.timeline({ repeat: -1 });
        pulses.forEach((p, i) => {
          const dest = glows[arrivals[i]];
          tl.to(p, { strokeDashoffset: 0, duration: 1, ease: 'none' }, i * 1.4)
            .to(dest, { opacity: 1, duration: 0.3 }, i * 1.4 + 0.85)
            .to(dest, { opacity: 0, duration: 0.5 }, i * 1.4 + 1.35)
            .set(p, { strokeDashoffset: 100 }, i * 1.4 + 1.05);
        });
        tl.to({}, { duration: 0.4 });
      }

      if (variant === 'anillo') {
        const orbit = root.querySelector<SVGEllipseElement>('[data-orbit]');
        // pathLength=100 -> un punto corto (4) recorre el anillo continuamente.
        gsap.set(orbit, { attr: { 'stroke-dasharray': '4 96', 'stroke-dashoffset': 0 } });
        const period = 4.5;
        gsap.to(orbit, {
          attr: { 'stroke-dashoffset': -100 },
          duration: period,
          ease: 'none',
          repeat: -1,
        });
        // Nodos encendidos escalonados sincronizados al periodo de la órbita.
        const seq: Array<keyof typeof glows> = ['n3', 'n1', 'n2'];
        const tl = gsap.timeline({ repeat: -1 });
        seq.forEach((n, i) => {
          const at = (period / 3) * i;
          tl.to(glows[n], { opacity: 1, duration: 0.4 }, at)
            .to(glows[n], { opacity: 0, duration: 0.6 }, at + 0.9);
        });
        tl.to({}, { duration: 0.1 }, period);
      }
    },
    { scope: container, dependencies: [variant] },
  );

  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.inner} ref={container}>
        <header className={styles.head}>
          <p className="badge">Cómo lo logramos</p>
          <h2 className={styles.title}>Nos basamos en 3 pilares</h2>
        </header>

        <div className={styles.circuit}>
          {variant !== 'sinlineas' && (
            <svg
              className={styles.wires}
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {variant === 'pcb' && (
                <>
                  {PCB_TRACES.map((d) => (
                    <path key={d} className={styles.wire} d={d} />
                  ))}
                  {PCB_PADS.map(([cx, cy]) => (
                    <circle key={`${cx}-${cy}`} className={styles.pad} cx={cx} cy={cy} r="4.5" />
                  ))}
                  {PCB_TRACES.map((d) => (
                    <path
                      key={`pulse-${d}`}
                      className={styles.pulse}
                      d={d}
                      pathLength={100}
                      data-pulse
                    />
                  ))}
                </>
              )}

              {variant === 'anillo' && (
                <>
                  <ellipse className={styles.ring} cx="500" cy="255" rx="330" ry="165" />
                  <ellipse
                    className={styles.orbit}
                    cx="500"
                    cy="255"
                    rx="330"
                    ry="165"
                    pathLength={100}
                    data-orbit
                  />
                </>
              )}
            </svg>
          )}

          <ul className={styles.nodes} role="list">
            {PILLARS.map(({ icon: Icon, title, desc, pos }) => (
              <li key={title} className={`glass ${styles.node} ${styles[pos]}`}>
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
      </div>
    </section>
  );
}
