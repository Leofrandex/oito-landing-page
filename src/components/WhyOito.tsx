'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyOito.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Tareas reales de pyme: el caos que se ordena (spec v3 3.2). */
const TASKS = [
  '23 correos sin responder',
  'Copiar pedido al Excel',
  'Recordar cobro vencido',
  'Pasar datos al CRM',
  'Armar reporte del lunes',
  'Confirmar citas de mañana',
];

/* Posiciones dispersas (caos), en % del escenario. El layout base (CSS) ya
 * es la fila ordenada; estos offsets se usan solo para el `gsap.set` inicial
 * que desplaza cada chip desde su slot en fila hacia su punto de caos. */
const SCATTER = [
  { left: '6%', top: '12%', rot: -7 },
  { left: '38%', top: '4%', rot: 5 },
  { left: '66%', top: '16%', rot: -4 },
  { left: '18%', top: '58%', rot: 8 },
  { left: '48%', top: '66%', rot: -6 },
  { left: '74%', top: '54%', rot: 4 },
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
        const chips = gsap.utils.toArray<HTMLElement>('[data-chip]');
        const stage = container.current?.querySelector<HTMLElement>(`.${styles.stage}`) ?? null;

        gsap.set(arg2, { autoAlpha: 0, y: 30 });
        gsap.set(belt, { autoAlpha: 0 });

        /* Los chips arrancan en su posición de caos; el layout base (fila)
         * define su slot final, así que el desplazamiento inicial se mide
         * contra el rect real de cada chip ANTES de crear el ScrollTrigger
         * (que insertará el spacer del pin y alteraría el layout). */
        if (stage) {
          const stageRect = stage.getBoundingClientRect();
          chips.forEach((chip, i) => {
            const scatter = SCATTER[i];
            if (!scatter) return;
            const rect = chip.getBoundingClientRect();
            const targetX = (parseFloat(scatter.left) / 100) * stageRect.width;
            const targetY = (parseFloat(scatter.top) / 100) * stageRect.height;
            gsap.set(chip, {
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

        /* 1) El argumento 1 ya está visible; entra el caos */
        tl.to(belt, { autoAlpha: 1, duration: 0.3 })
          /* 2) El argumento 1 cede el foco */
          .to(arg1, { autoAlpha: 0.25, y: -24, duration: 0.5 }, '<')
          /* 3) Las tareas se ordenan en fila (transform hacia su slot base) */
          .to(
            chips,
            {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              stagger: 0.08,
              onStart: () => container.current?.setAttribute('data-ordered', ''),
              onReverseComplete: () => container.current?.removeAttribute('data-ordered'),
            },
            '+=0.1',
          )
          /* 4) Aterriza la conclusión */
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
        <p className="badge">Por qué oito</p>

        <div className={styles.arg} data-arg1>
          <h2 className={styles.argTitle}>
            El tiempo no se recupera, <span className={styles.accent}>los ingresos sí</span>
          </h2>
          <p className={styles.argBody}>
            La mayoría de los negocios están atrapados en procesos fragmentados y tareas
            manuales. Eso cuesta tiempo, y el tiempo es lo único que no vuelve.
          </p>
        </div>

        <ul className={styles.belt} data-belt aria-hidden="true">
          {TASKS.map((task) => (
            <li key={task} className={styles.chip} data-chip>
              {task}
            </li>
          ))}
        </ul>

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
