'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyOito.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Posiciones dispersas (caos), en % del escenario. El layout base (CSS) ya
 * es la composición ensamblada (panel); estos offsets se usan solo para el
 * `gsap.set` inicial que desplaza cada pieza desde su slot en el panel hacia
 * su punto de caos. Scatter amplio: cubre ~90% del stage, incluida la zona
 * de los argumentos (las piezas pasan por encima del texto en el caos). */
const SCATTER = [
  { left: '4%', top: '5%', rot: -12 },
  { left: '60%', top: '3%', rot: 10 },
  { left: '84%', top: '34%', rot: -8 },
  { left: '6%', top: '80%', rot: 9 },
  { left: '54%', top: '88%', rot: -6 },
];

export default function WhyOito() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        const arg1 = container.current?.querySelector<HTMLElement>('[data-arg1]') ?? null;
        const arg2 = container.current?.querySelector<HTMLElement>('[data-arg2]') ?? null;
        const belt = container.current?.querySelector<HTMLElement>('[data-belt]') ?? null;
        const pieces = gsap.utils.toArray<HTMLElement>('[data-piece]');
        const stage = container.current?.querySelector<HTMLElement>(`.${styles.stage}`) ?? null;

        gsap.set(arg2, { autoAlpha: 0, y: 30 });
        gsap.set(belt, { autoAlpha: 0 });

        /* Las piezas arrancan en su posición de caos; el layout base (panel
         * ensamblado) define su slot final, así que el desplazamiento inicial
         * se mide contra el rect real de cada pieza ANTES de crear el
         * ScrollTrigger (que insertará el spacer del pin y alteraría el layout).
         * El offset inicial de arg1 se aplica vía `transform` (y), que no altera
         * el flujo del documento, así que no afecta esta medición de piezas. */
        if (stage) {
          const stageRect = stage.getBoundingClientRect();

          /* arg1 arranca desplazado hacia abajo (~25% de la altura del stage)
           * para que su ascenso hasta y:0 (su slot final en el layout, ya
           * despejado del header) sea el que construya la posición final. */
          if (arg1) {
            gsap.set(arg1, { y: stageRect.height * 0.25 });
          }

          pieces.forEach((piece, i) => {
            const scatter = SCATTER[i];
            if (!scatter) return;
            const rect = piece.getBoundingClientRect();
            const targetX = (parseFloat(scatter.left) / 100) * stageRect.width;
            const targetY = (parseFloat(scatter.top) / 100) * stageRect.height;
            gsap.set(piece, {
              x: targetX - (rect.left - stageRect.left),
              y: targetY - (rect.top - stageRect.top),
              rotation: scatter.rot,
            });
          });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
          },
        });

        /* 1) El argumento 1 ya está visible (desplazado abajo); entra el caos */
        tl.to(belt, { autoAlpha: 1, duration: 0.3 })
          /* 2) Arg1 asciende a su slot final (y: 0) mientras las piezas viajan
           * y se ensamblan, en paralelo. Se mantiene plenamente legible: solo
           * una atenuación levísima, sin fade fuerte. */
          .to(arg1, { y: 0, autoAlpha: 0.9, duration: 1 }, '+=0.1')
          .to(
            pieces,
            {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              stagger: 0.08,
              onStart: () => container.current?.setAttribute('data-ordered', ''),
              onReverseComplete: () => container.current?.removeAttribute('data-ordered'),
            },
            '<',
          )
          /* 3) Aterriza la conclusión, al final */
          .to(arg2, { autoAlpha: 1, y: 0, duration: 0.6 }, '+=0.2');
      });

      mm.add('(prefers-reduced-motion: reduce), (max-width: 860px)', () => {
        container.current?.setAttribute('data-static', '');
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className={`section-light ${styles.section} ${styles.narrative}`}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.stage}>
        <div className={styles.arg} data-arg1>
          <p className={`badge ${styles.eyebrow}`}>Por qué oito</p>
          <h2 className={styles.argTitle}>
            El tiempo no se recupera, <span className={styles.accent}>los ingresos sí</span>
          </h2>
          <p className={styles.argBody}>
            La mayoría de los negocios están atrapados en procesos fragmentados y tareas
            manuales. Eso cuesta tiempo, y el tiempo es lo único que no vuelve.
          </p>
        </div>

        <div className={styles.belt} data-belt aria-hidden="true">
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

        <div className={styles.arg} data-arg2>
          <h2 className={styles.argTitle}>
            Tú enfócate en crecer.{' '}
            <span className={styles.accent}>De lo técnico nos encargamos nosotros</span>
          </h2>
          <p className={styles.argBody}>
            En <span className="wordmark">oito</span> construimos y automatizamos el motor
            invisible de tu negocio: el software que necesitas y los procesos que te quitan
            horas.
          </p>
        </div>
      </div>
    </section>
  );
}
