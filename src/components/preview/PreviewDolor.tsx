'use client';

import { useRef } from 'react';
import { Mail, FileText, MessageSquare, ReceiptText } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PreviewDolor.module.css';

type Variant = 'modulos' | 'pipeline' | 'torre';

type Scatter = { x: number; y: number; rot: number };

/* Bloque 1 — Dolor. arg1 y arg2 son el copy real de WhyOito; la banda del medio
 * muestra piezas sueltas, torcidas y rojizas que se ENSAMBLAN pieza a pieza en una
 * composición ordenada mint, y luego se desarman. Loop con GSAP (transform/opacity
 * + color por atributo data-ordered, patrón de WhyOito). */
export default function PreviewDolor({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = container.current;
      if (!root) return;
      const band = root.querySelector<HTMLElement>('[data-band]');
      if (!band) return;

      const setOrdered = (on: boolean) =>
        on ? band.setAttribute('data-ordered', '') : band.removeAttribute('data-ordered');

      if (variant === 'modulos' || variant === 'torre') {
        const scatter: Record<Variant, Scatter[]> =
          variant === 'modulos'
            ? {
                modulos: [
                  { x: -70, y: -80, rot: -13 },
                  { x: 120, y: -50, rot: 12 },
                  { x: -130, y: 40, rot: -9 },
                  { x: 95, y: 85, rot: 15 },
                  { x: -20, y: 110, rot: -7 },
                ],
                pipeline: [],
                torre: [],
              }
            : {
                torre: [
                  { x: -40, y: -180, rot: -16 },
                  { x: 60, y: -165, rot: 14 },
                  { x: -80, y: -150, rot: 20 },
                  { x: 30, y: -140, rot: -12 },
                  { x: 90, y: -130, rot: 10 },
                  { x: -30, y: -120, rot: -18 },
                  { x: 10, y: -110, rot: 8 },
                  { x: -60, y: -100, rot: -9 },
                ],
                modulos: [],
                pipeline: [],
              };
        const S = scatter[variant];
        const pieces = gsap.utils.toArray<HTMLElement>('[data-piece]');
        const from: Scatter[] = pieces.map((_, i) => S[i] ?? { x: 0, y: -120, rot: 10 });

        gsap.set(pieces, {
          x: (i: number) => from[i].x,
          y: (i: number) => from[i].y,
          rotation: (i: number) => from[i].rot,
          opacity: 0.72,
        });

        const staggerBuild = variant === 'torre' ? { each: 0.11, from: 'end' as const } : 0.12;
        const tl = gsap.timeline({ repeat: -1 });
        tl.call(() => setOrdered(true))
          .to(pieces, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'back.out(1.2)',
            stagger: staggerBuild,
          })
          .to({}, { duration: 1.1 })
          .call(() => setOrdered(false))
          .to(pieces, {
            x: (i: number) => from[i].x,
            y: (i: number) => from[i].y,
            rotation: (i: number) => from[i].rot,
            opacity: 0.72,
            duration: 0.6,
            ease: 'power2.inOut',
            stagger: { each: 0.06, from: 'end' },
          })
          .to({}, { duration: 0.4 });
      }

      if (variant === 'pipeline') {
        const S: Scatter[] = [
          { x: -30, y: -90, rot: -14 },
          { x: 50, y: 80, rot: 12 },
          { x: -60, y: 70, rot: -10 },
          { x: 40, y: -80, rot: 15 },
        ];
        const pieces = gsap.utils.toArray<HTMLElement>('[data-piece]');
        gsap.set(pieces, {
          x: (i: number) => S[i].x,
          y: (i: number) => S[i].y,
          rotation: (i: number) => S[i].rot,
          opacity: 0.72,
        });

        const tl = gsap.timeline({ repeat: -1 });
        tl.call(() => setOrdered(true))
          .to(pieces, {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.2)',
            stagger: 0.16,
          })
          .to({}, { duration: 1.1 })
          .call(() => setOrdered(false))
          .to(pieces, {
            x: (i: number) => S[i].x,
            y: (i: number) => S[i].y,
            rotation: (i: number) => S[i].rot,
            opacity: 0.72,
            duration: 0.6,
            ease: 'power2.inOut',
            stagger: { each: 0.06, from: 'end' },
          })
          .to({}, { duration: 0.4 });
      }
    },
    { scope: container, dependencies: [variant] },
  );

  return (
    <section className={`section-light ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.stage} ref={container}>
        <div className={styles.arg}>
          <h2 className={styles.argTitle}>
            El tiempo no se recupera, <span className={styles.accent}>los ingresos sí</span>
          </h2>
          <p className={styles.argBody}>
            La mayoría de los negocios están atrapados en procesos fragmentados y tareas manuales.
            Eso cuesta tiempo, y el tiempo es lo único que no vuelve.
          </p>
        </div>

        <div className={styles.visual}>
          {variant === 'modulos' && <ModulosVisual />}
          {variant === 'pipeline' && <PipelineVisual />}
          {variant === 'torre' && <TorreVisual />}
        </div>

        <div className={styles.arg}>
          <h2 className={styles.argTitle}>
            Tú enfócate en crecer.{' '}
            <span className={styles.accent}>De lo técnico nos encargamos nosotros</span>
          </h2>
          <p className={styles.argBody}>
            En <span className="wordmark">oito</span> construimos y automatizamos el motor invisible
            de tu negocio: el software que necesitas y los procesos que te quitan horas.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Piezas = fragmentos de UI que se ensamblan en un mini panel/dashboard. */
function ModulosVisual() {
  return (
    <div className={styles.band} data-band aria-hidden="true">
      <div className={styles.panel}>
        {/* barra de título */}
        <div className={`${styles.piece} ${styles.mTitle}`} data-piece>
          <span className={styles.dot} />
          <span className={styles.lineWide} />
        </div>
        {/* mini gráfica de barras */}
        <div className={`${styles.piece} ${styles.mChart}`} data-piece>
          <span className={styles.bar} style={{ height: '38%' }} />
          <span className={styles.bar} style={{ height: '64%' }} />
          <span className={styles.bar} style={{ height: '48%' }} />
          <span className={styles.bar} style={{ height: '82%' }} />
        </div>
        {/* tarjeta pequeña */}
        <div className={`${styles.piece} ${styles.mCard}`} data-piece>
          <span className={styles.lineSm} />
          <span className={styles.lineXs} />
          <span className={styles.lineXs} />
        </div>
        {/* chip */}
        <div className={`${styles.piece} ${styles.mChip}`} data-piece>
          <span className={styles.dot} />
          <span className={styles.lineSm} />
        </div>
        {/* fila de lista */}
        <div className={`${styles.piece} ${styles.mList}`} data-piece>
          {[0, 1, 2].map((r) => (
            <span key={r} className={styles.listRow}>
              <span className={styles.dotSm} />
              <span className={styles.lineFill} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const PIPELINE = [
  { icon: Mail, label: 'Correo' },
  { icon: FileText, label: 'Documento' },
  { icon: MessageSquare, label: 'Chat' },
  { icon: ReceiptText, label: 'Factura' },
];

/* Piezas = mini bloques con icono que encajan en un riel formando una cadena. */
function PipelineVisual() {
  return (
    <div className={styles.band} data-band aria-hidden="true">
      <div className={styles.chain}>
        <span className={styles.rail} />
        {PIPELINE.map(({ icon: Icon, label }, i) => (
          <div key={label} className={styles.chainItem}>
            {i > 0 && <span className={styles.connector} />}
            <div className={styles.chainBlock} data-piece>
              <Icon size={20} strokeWidth={1.7} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Piezas = ladrillos de anchos variados que caen y construyen una estructura. */
const TORRE_ROWS = [
  [58, 34],
  [30, 66],
  [26, 44, 22],
  // el brick de arriba se reparte en la última fila para sumar 7 piezas
];
const TORRE_TOP = [72];

function TorreVisual() {
  let idx = 0;
  return (
    <div className={styles.band} data-band aria-hidden="true">
      <div className={styles.tower}>
        <div className={styles.brickRow}>
          {TORRE_TOP.map((w) => (
            <span
              key={`t-${idx++}`}
              className={styles.brick}
              style={{ width: `${w}px` }}
              data-piece
            />
          ))}
        </div>
        {TORRE_ROWS.map((row, r) => (
          <div key={r} className={styles.brickRow}>
            {row.map((w) => (
              <span
                key={`b-${idx++}`}
                className={styles.brick}
                style={{ width: `${w}px` }}
                data-piece
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
