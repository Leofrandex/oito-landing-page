'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PreviewDolor.module.css';

type Variant = 'morph' | 'gemelas' | 'cortina';

const HOY = [
  'Correos sin responder por horas',
  'Datos copiados a mano entre apps',
  'Cobros vencidos que se olvidan',
];

const CON_OITO = [
  'Correos respondidos en automático',
  'Datos sincronizados sin tipeo',
  'Cobros que se persiguen solos',
];

/* Bloque 1 — Dolor. arg1 y arg2 son el copy real de WhyOito; el visual del medio
 * cambia por variante. Autoplay en bucle con GSAP (repeat -1). */
export default function PreviewDolor({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = container.current;
      if (!root) return;

      if (variant === 'morph') {
        const before = root.querySelector<HTMLElement>('[data-morph-before]');
        const after = root.querySelector<HTMLElement>('[data-morph-after]');
        const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.6 });
        tl.to(before, { opacity: 0, filter: 'blur(12px)', scale: 0.9, duration: 1.1, delay: 0.6 })
          .fromTo(
            after,
            { opacity: 0, filter: 'blur(12px)', scale: 1.08 },
            { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.1 },
            '-=0.3',
          );
      }

      if (variant === 'gemelas') {
        const left = root.querySelector<HTMLElement>('[data-card-hoy]');
        const right = root.querySelector<HTMLElement>('[data-card-oito]');
        gsap.set([left, right], { opacity: 0, y: 24 });
        const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1.1 });
        tl.to(left, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .to(right, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '+=0.4');
      }

      if (variant === 'cortina') {
        const curtain = root.querySelector<HTMLElement>('[data-curtain]');
        const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.9 });
        tl.fromTo(
          curtain,
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)', duration: 1.3, ease: 'power2.inOut', delay: 0.6 },
        );
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
          {variant === 'morph' && <MorphVisual />}
          {variant === 'gemelas' && <GemelasVisual />}
          {variant === 'cortina' && <CortinaVisual />}
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

function MorphVisual() {
  return (
    <div className={styles.morphBand} aria-hidden="true">
      <div className={styles.morphLayer} data-morph-before>
        <span className={styles.morphLabel}>Tu negocio hoy</span>
        <div className={styles.chaos}>
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
        </div>
      </div>
      <div className={`${styles.morphLayer} ${styles.morphAfter}`} data-morph-after>
        <span className={styles.morphLabel}>
          Tu negocio con <span className="wordmark">oito</span>
        </span>
        <div className={styles.order}>
          {[0, 1, 2].map((r) => (
            <span key={r} className={styles.orderRow}>
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GemelasVisual() {
  return (
    <div className={styles.gemelas} aria-hidden="true">
      <div className={`glass-light ${styles.card} ${styles.cardHoy}`} data-card-hoy>
        <span className={styles.cardLabel}>Tu negocio hoy</span>
        <ul className={styles.cardList}>
          {HOY.map((line) => (
            <li key={line} className={styles.cardLine}>
              <span className={styles.markX}>✕</span>
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className={`glass-light ${styles.card} ${styles.cardOito}`} data-card-oito>
        <span className={styles.cardLabel}>
          Tu negocio con <span className="wordmark">oito</span>
        </span>
        <ul className={styles.cardList}>
          {CON_OITO.map((line) => (
            <li key={line} className={styles.cardLine}>
              <span className={styles.markCheck}>✓</span>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CortinaVisual() {
  return (
    <div className={styles.cortina} aria-hidden="true">
      <div className={styles.cortinaBase}>
        <span className={styles.cortinaBaseLabel}>Tu negocio hoy</span>
        <div className={styles.chaos}>
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
          <span className={styles.chaosLine} />
        </div>
      </div>
      <div className={styles.cortinaCurtain} data-curtain>
        <span className={styles.cortinaLabel}>en automático</span>
        <div className={styles.order}>
          {[0, 1, 2].map((r) => (
            <span key={r} className={styles.orderRow}>
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
