'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouteDiagram, ChainDiagram, FunnelDiagram, FanoutDiagram } from './CaseDiagrams';
import styles from './CasesShowcase.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ShowcaseCase = {
  pillar: 'Automatización' | 'Desarrollo';
  title: string;
  description: string;
  diagram: ReactNode;
};

/* Casos anonimizados por sector (copy actual de FeaturedCases; el deck v2 lo afinará). */
const CASES: ShowcaseCase[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Para un integrador de ciberseguridad: un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs y adjuntos), califica con IA y los reparte en el CRM.',
    diagram: <FunnelDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA con RAG generan correos de venta personalizados y los envían en automático desde el correo de cada vendedor.',
    diagram: <FanoutDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios en automático.',
    diagram: <ChainDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'App móvil nativa + panel web para una distribuidora farmacéutica: GPS en tiempo real, modo offline y cámara anti-fraude para verificar visitas en campo.',
    diagram: <RouteDiagram />,
  },
];

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
        gsap.set(dots, { opacity: 0.4, scale: 1 });
        gsap.set(dots[0], { opacity: 1, scale: 1.4 });
        if (fill) gsap.set(fill, { scaleY: 1 / steps });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: `+=${steps * 85}%`,
            pin: true,
            scrub: 1,
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
            .to(dots[i - 1], { opacity: 0.4, scale: 1, duration: 0.3 }, at)
            .to(dots[i], { opacity: 1, scale: 1.4, duration: 0.3 }, at + 0.1);

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
    <section id={id} className={`section-dark anchor-target ${styles.section}`}>
      <header className={styles.head}>
        <p className={`badge ${styles.eyebrow}`}>Casos</p>
        <h2 className={styles.title}>
          Lo que <span className="wordmark">oito</span> ya ha construido
        </h2>
      </header>

      {/* ===== Escenario sticky (desktop) ===== */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.visual}>
          {CASES.map((c) => (
            <div key={c.title} className={styles.pane} data-pane>
              <div className={styles.diagram}>{c.diagram}</div>
              <span className={styles.caption}>{c.pillar}</span>
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
              data-dot
              style={{ top: `${((i + 0.5) / CASES.length) * 100}%` }}
            />
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
                  <p className={styles.itemDesc}>{c.description}</p>
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
              {c.diagram}
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
