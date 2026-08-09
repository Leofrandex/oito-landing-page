'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessagesSquare, Blocks, TrendingUp, type LucideIcon } from 'lucide-react';
import LiveCounter from './LiveCounter';
import styles from './Methodology.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = { icon: LucideIcon; title: string; description: string };

const STEPS: Step[] = [
  {
    icon: MessagesSquare,
    title: 'Contacto & Auditoría',
    description:
      'Hablamos por WhatsApp, entendemos tu negocio e identificamos dónde podemos ayudarte más.',
  },
  {
    icon: Blocks,
    title: 'Construcción & Implementación',
    description: 'Diseñamos y desarrollamos la solución a medida, integrándola con lo que ya usas.',
  },
  {
    icon: TrendingUp,
    title: 'Monitoreo & Mejora',
    description: 'Medimos, ajustamos y escalamos para que los resultados se mantengan en el tiempo.',
  },
];

/* El diseño actual se conserva; el scroll lo "ejecuta" como un workflow:
 * el hilo se llena, cada nodo se enciende y cae su check (spec v3 3.7). */
export default function Methodology() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        const connV = gsap.utils.toArray<HTMLElement>('[data-conn-v]');
        const connH = gsap.utils.toArray<HTMLElement>('[data-conn-h]');
        const glows = gsap.utils.toArray<HTMLElement>('[data-node-glow]');
        const checks = gsap.utils.toArray<HTMLElement>('[data-check]');
        const items = gsap.utils.toArray<HTMLElement>('[data-step-text]');

        /* Los conectores en L sustituyen a la barra de progreso única: cada
         * tramo baja (scaleY) y gira a la derecha (scaleX) hacia el paso
         * siguiente, así que el avance se dibuja recorriendo la escalera. */
        gsap.set(connV, { scaleY: 0 });
        gsap.set(connH, { scaleX: 0 });
        gsap.set(glows, { autoAlpha: 0 });
        /* 0.92, no 0.4: nada en el mundo real aparece desde casi-nada, y a 0.4
         * el check leía como un globo inflándose. */
        gsap.set(checks, { autoAlpha: 0, scale: 0.92 });
        gsap.set(items, { autoAlpha: 0.35 });
        gsap.set(items[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        STEPS.forEach((_, i) => {
          const at = i;
          tl.to(items[i], { autoAlpha: 1, duration: 0.3 }, at)
            .to(glows[i], { autoAlpha: 1, duration: 0.3 }, at + 0.1)
            .to(checks[i], { autoAlpha: 1, scale: 1, duration: 0.3 }, at + 0.5)
            .to(glows[i], { autoAlpha: 0, duration: 0.3 }, at + 0.7);

          /* El último paso no tiene conector: no hay a dónde seguir. */
          if (connV[i] && connH[i]) {
            tl.to(connV[i], { scaleY: 1, duration: 0.35 }, at + 0.6).to(
              connH[i],
              { scaleX: 1, duration: 0.35 },
              at + 0.85,
            );
          }
        });
      });

      mm.add('(prefers-reduced-motion: reduce), (max-width: 860px)', () => {
        container.current?.setAttribute('data-static', '');
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id="metodologia"
      className={`section-dark anchor-target ${styles.section} ${styles.workflow}`}
    >
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 className={styles.title}>
            Metodología <span className="wordmark">oito</span>
          </h2>
        </header>

        <ol className={styles.steps}>
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className={styles.step} data-step>
              <div className={styles.nodeWrap}>
                <div className={styles.node}>
                  <span className={styles.nodeGlow} data-node-glow aria-hidden="true" />
                  <Icon size={26} strokeWidth={1.6} />
                  <span className={styles.check} data-check aria-hidden="true">
                    ✓
                  </span>
                </div>
                {/* El escalonado ya dice el orden, así que la numeración
                  * "01/02/03" se retiró (auditoría 2026-08-08). El conector
                  * baja y gira hacia el paso siguiente. */}
                {i < STEPS.length - 1 && (
                  <span className={styles.connector} aria-hidden="true">
                    <span className={styles.connV} data-conn-v />
                    <span className={styles.connH} data-conn-h />
                  </span>
                )}
              </div>
              <div className={styles.stepText} data-step-text>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepDesc}>{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <LiveCounter />
      </div>
    </section>
  );
}
