'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BeforeAfter.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Pinned scroll-scrub transition: "Tu negocio hoy" (chaos) dissolves into
 *  "Tu negocio con oito" (order) as you scroll. Reduced-motion users get a
 *  static stacked layout with no pin. */
export default function BeforeAfter() {
  const container = useRef<HTMLDivElement>(null);
  const before = useRef<HTMLDivElement>(null);
  const after = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        container.current?.setAttribute('data-static', '');
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1,
        },
      });

      tl.to(before.current, { opacity: 0, filter: 'blur(12px)', scale: 0.9, duration: 1 }).fromTo(
        after.current,
        { opacity: 0, filter: 'blur(12px)', scale: 1.08 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1 },
        '-=0.25',
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} className={styles.stage} aria-label="Tu negocio antes y después de oito">
      <div className={styles.inner}>
        <div ref={before} className={styles.before}>
          <span className={styles.label}>Tu negocio hoy</span>
          <p className={styles.desc}>Caos, tareas manuales, cuellos de botella.</p>
          <div className={styles.chaos} aria-hidden="true">
            <span className={styles.chaosLine} />
            <span className={styles.chaosLine} />
            <span className={styles.chaosLine} />
            <span className={styles.chaosLine} />
            <span className={styles.chaosLine} />
          </div>
        </div>

        <div ref={after} className={styles.after}>
          <span className={styles.label}>
            Tu negocio con <span className="wordmark">oito</span>
          </span>
          <p className={styles.desc}>Orden, sistemas a medida, procesos en automático.</p>
          <div className={styles.order} aria-hidden="true">
            <span className={styles.orderRow}>
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
            </span>
            <span className={styles.orderRow}>
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
            </span>
            <span className={styles.orderRow}>
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
              <span className={styles.thread} />
              <span className={styles.node} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
