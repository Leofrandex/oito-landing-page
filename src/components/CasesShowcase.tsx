'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CasesShowcase.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ShowcaseCase = {
  pillar: 'Automatización' | 'Desarrollo';
  title: string;
  description: string;
  /** Captura real del proyecto (ej. Hospiwaste). Hoy no hay ninguna cargada: el marco
   * siempre muestra el placeholder. Cuando llegue una, se pasa aquí y el marco la usa. */
  image?: string;
};

/* Roster del deck v2 §5 (2026-07-19): 3 Automatización + 1 Desarrollo, arco de ventas
 * (calificación → secuencias → prospección → equipo de ventas en campo). Anonimizados
 * por sector; el sector va como lead-in de la descripción (la UI no tiene campo aparte). */
const CASES: ShowcaseCase[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación y enrutamiento de leads con IA',
    description:
      'Para un integrador de ciberseguridad: un flujo en n8n lee mensajes y adjuntos (PDF, Excel, imágenes), califica el lead con IA, lo deduplica en el CRM, lo reparte por turnos al equipo y responde pidiendo lo que falte.',
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta personalizadas con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA, con RAG sobre la guía de ventas del negocio, extraen el contexto de cada empresa desde el CRM y generan correos de venta personalizados, enviados en automático desde el correo del vendedor asignado.',
  },
  {
    pillar: 'Automatización',
    title: 'Prospección outbound B2B con IA',
    description:
      'Para una empresa de ciberseguridad: el flujo busca prospectos, los investiga con agentes de IA (búsqueda web y razonamiento), los puntúa con una rúbrica de 0 a 100 y redacta cold emails diferenciados, separando los leads listos de los fríos.',
  },
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'Para una distribuidora farmacéutica: app móvil nativa + panel web que gestiona al equipo de ventas en campo, con GPS en tiempo real, modo offline y cámara anti-fraude para verificar cada visita.',
  },
];

/* Marco de captura: browser frame oscuro con placeholder digno hasta que existan
 * capturas reales de los proyectos (Hospiwaste primero). */
function CaseFrame({ image }: { image?: string }) {
  return (
    <div className={styles.frame}>
      <div className={styles.frameBar}>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.frameCanvas}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className={styles.frameImage} />
        ) : (
          <>
            <span className={styles.framePattern} />
            <span className={`wordmark ${styles.frameWordmark}`}>oito</span>
            <span className={styles.frameNote}>Captura del proyecto próximamente</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function CasesShowcase({ id }: { id?: string }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        const panes = gsap.utils.toArray<HTMLElement>('[data-pane]');
        const titles = gsap.utils.toArray<HTMLElement>('[data-case-title]');
        const dots = gsap.utils.toArray<HTMLElement>('[data-dot]');
        const fill = container.current?.querySelector<HTMLElement>('[data-fill]');
        const belt = container.current?.querySelector<HTMLElement>('[data-titles-belt]');
        const steps = CASES.length;

        /* Estados iniciales: caso 0 activo */
        gsap.set(panes.slice(1), { autoAlpha: 0, scale: 1.04 });
        gsap.set(titles, { opacity: 0.25 });
        gsap.set(titles[0], { opacity: 1 });
        gsap.set(dots, { scale: 1 });
        dots[0]?.setAttribute('data-active', '');
        gsap.set(dots[0], { scale: 1.6 });
        if (fill) gsap.set(fill, { scaleY: 1 / steps });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: `+=${steps * 85}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        for (let i = 1; i < steps; i++) {
          const at = i;
          tl.to(panes[i - 1], { autoAlpha: 0, scale: 1.04, duration: 0.4 }, at)
            .fromTo(
              panes[i],
              { autoAlpha: 0, scale: 0.97 },
              { autoAlpha: 1, scale: 1, duration: 0.5 },
              at + 0.1,
            )
            .to(titles[i - 1], { opacity: 0.25, duration: 0.4 }, at)
            .to(titles[i], { opacity: 1, duration: 0.4 }, at + 0.15)
            .to(
              dots[i - 1],
              {
                scale: 1,
                duration: 0.3,
                onStart: () => dots[i - 1]?.removeAttribute('data-active'),
                onReverseComplete: () => dots[i - 1]?.setAttribute('data-active', ''),
              },
              at,
            )
            .to(
              dots[i],
              {
                scale: 1.6,
                duration: 0.3,
                onStart: () => dots[i]?.setAttribute('data-active', ''),
                onReverseComplete: () => dots[i]?.removeAttribute('data-active'),
              },
              at + 0.1,
            );

          if (belt) tl.to(belt, { yPercent: -(100 / steps) * i, duration: 0.6 }, at);
          if (fill) tl.to(fill, { scaleY: (i + 1) / steps, duration: 0.6 }, at);
        }
      });

      mm.add('(prefers-reduced-motion: reduce), (max-width: 860px)', () => {
        container.current?.setAttribute('data-static', '');
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} id={id} className={`section-dark anchor-target ${styles.section}`}>
      <header className={styles.head}>
        <p className="badge">Casos</p>
        <h2 className={styles.title}>Casos reales, ya en producción</h2>
        <p className={styles.lede}>
          Nada de maquetas ni promesas. Esto es lo que construimos y hoy corre en el día a día
          de negocios como el tuyo.
        </p>
      </header>

      {/* ===== Escenario sticky (desktop) ===== */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.visual}>
          {CASES.map((c) => (
            <div key={c.title} className={styles.pane} data-pane>
              <div className={styles.paneVisual}>
                <CaseFrame image={c.image} />
              </div>
              <p className={styles.paneDesc}>{c.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.route}>
          <span className={styles.track} />
          <span className={styles.fill} data-fill />
          {CASES.map((c, i) => (
            <span
              key={c.title}
              className={styles.dot}
              style={{ top: `${((i + 0.5) / CASES.length) * 100}%` }}
            >
              <span className={styles.dotCore} data-dot />
            </span>
          ))}
          <span className={styles.arrow}>▼</span>
        </div>

        <div className={styles.titles}>
          <div className={styles.beltMask}>
            <div className={styles.belt} data-titles-belt>
              {CASES.map((c) => (
                <div key={c.title} className={styles.item} data-case-title>
                  <span className={styles.sector}>{c.pillar}</span>
                  <h3 className={styles.itemTitle}>{c.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Lista accesible / fallback móvil y reduced motion ===== */}
      <ul className={styles.staticList} role="list">
        {CASES.map((c) => (
          <li key={c.title} className={styles.staticCase}>
            <div className={styles.staticDiagram} aria-hidden="true">
              <CaseFrame image={c.image} />
            </div>
            <div>
              <span className={styles.sector}>{c.pillar}</span>
              <h3 className={styles.itemTitle}>{c.title}</h3>
              <p className={styles.itemDesc}>{c.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
