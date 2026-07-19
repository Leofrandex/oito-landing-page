'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  RouteDiagram,
  ChainDiagram,
  FunnelDiagram,
  FanoutDiagram,
} from '@/components/CaseDiagrams';
import styles from './PreviewCasos.module.css';

type Variant = 'bento4' | 'cardstats';

type CaseData = {
  pillar: 'Automatización' | 'Desarrollo';
  title: string;
  description: string;
  diagram: ReactNode;
  statBig: string; // stat NEUTRAL, nunca resultado
  statLabel: string;
  tags: string[];
  stats3: Array<{ big: string; label: string }>;
};

const CASES: CaseData[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Para un integrador de ciberseguridad: un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs y adjuntos), califica con IA y los reparte en el CRM.',
    diagram: <FunnelDiagram />,
    statBig: '3 canales',
    statLabel: 'Entradas unificadas',
    tags: ['Email', 'WhatsApp', 'Web', 'PDF', 'CRM', 'IA'],
    stats3: [
      { big: '3 canales', label: 'Entradas' },
      { big: 'IA', label: 'Calificación' },
      { big: 'CRM', label: 'Reparto' },
    ],
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA con RAG generan correos de venta personalizados y los envían en automático desde el correo de cada vendedor.',
    diagram: <FanoutDiagram />,
    statBig: '24/7',
    statLabel: 'Envío automático',
    tags: ['IA', 'RAG', 'Email', 'Ventas', 'B2B'],
    stats3: [
      { big: '24/7', label: 'Operación' },
      { big: 'RAG', label: 'Contexto' },
      { big: '1:1', label: 'Personalizado' },
    ],
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios en automático.',
    diagram: <ChainDiagram />,
    statBig: 'PWA',
    statLabel: 'App instalable',
    tags: ['PWA', 'Pesaje', 'Firmas', 'PDF', 'Fotos'],
    stats3: [
      { big: 'PWA', label: 'Plataforma' },
      { big: 'PDF', label: 'Reportes' },
      { big: 'Firmas', label: 'Evidencia' },
    ],
  },
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'App móvil nativa + panel web para una distribuidora farmacéutica: GPS en tiempo real, modo offline y cámara anti-fraude para verificar visitas en campo.',
    diagram: <RouteDiagram />,
    statBig: 'GPS',
    statLabel: 'Tiempo real',
    tags: ['GPS', 'Offline', 'Cámara', 'Móvil', 'Panel web'],
    stats3: [
      { big: 'GPS', label: 'Ubicación' },
      { big: 'Offline', label: 'Sin señal' },
      { big: 'Anti-fraude', label: 'Cámara' },
    ],
  },
];

const STEPS = CASES.length;

export default function PreviewCasos({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Auto-avance cada ~3s (salvo reduced motion). */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % STEPS);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const panes = gsap.utils.toArray<HTMLElement>('[data-pane]');
      const dots = gsap.utils.toArray<HTMLElement>('[data-dot]');
      const fill = root.querySelector<HTMLElement>('[data-fill]');
      const belt = root.querySelector<HTMLElement>('[data-belt]');

      const dur = reduce ? 0 : 0.5;

      panes.forEach((p, i) => {
        gsap.to(p, { autoAlpha: i === active ? 1 : 0, duration: dur, ease: 'power2.out' });
      });
      dots.forEach((d, i) => {
        gsap.to(d, {
          opacity: i === active ? 1 : 0.4,
          scale: i === active ? 1.4 : 1,
          duration: dur,
        });
      });
      if (fill) gsap.to(fill, { scaleY: (active + 1) / STEPS, duration: reduce ? 0 : 0.6 });
      if (belt) gsap.to(belt, { yPercent: -(100 / STEPS) * active, duration: reduce ? 0 : 0.6 });
    },
    { scope: container, dependencies: [active] },
  );

  return (
    <section className={`section-dark ${styles.section}`}>
      <header className={styles.head}>
        <p className="badge">Casos</p>
        <h2 className={styles.title}>
          Lo que <span className="wordmark">oito</span> ya ha construido
        </h2>
      </header>

      <div className={styles.stage} ref={container}>
        {/* ===== Izquierda: bento ===== */}
        <div className={styles.left}>
          {CASES.map((c) => (
            <div key={c.title} className={styles.pane} data-pane aria-hidden="true">
              {variant === 'bento4' ? (
                <div className={styles.bento}>
                  <div className={`${styles.paneCard} ${styles.wide}`}>
                    <div className={styles.wideMedia}>{c.diagram}</div>
                    <span className={styles.sector}>{c.pillar}</span>
                    <p className={styles.paneDesc}>{c.description}</p>
                  </div>
                  <div className={`${styles.paneCard} ${styles.statTile}`}>
                    <span className={styles.statBig}>{c.statBig}</span>
                    <span className={styles.statLabel}>{c.statLabel}</span>
                  </div>
                  <div className={`${styles.paneCard} ${styles.tagsTile}`}>
                    {c.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.cardStack}>
                  <div className={`${styles.paneCard} ${styles.cardMain}`}>
                    <span className={styles.sector}>{c.pillar}</span>
                    <p className={styles.paneDesc}>{c.description}</p>
                  </div>
                  <div className={styles.statsRow}>
                    {c.stats3.map((s) => (
                      <div key={s.big} className={`${styles.paneCard} ${styles.statTile}`}>
                        <span className={styles.statBig}>{s.big}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ===== Centro: línea de recorrido ===== */}
        <div className={styles.route} aria-hidden="true">
          <span className={styles.track} />
          <span className={styles.fill} data-fill />
          {CASES.map((c, i) => (
            <span
              key={c.title}
              className={styles.dot}
              data-dot
              style={{ top: `${((i + 0.5) / STEPS) * 100}%` }}
            />
          ))}
        </div>

        {/* ===== Derecha: solo titulares ===== */}
        <div className={styles.titles} aria-hidden="true">
          <div className={styles.beltMask}>
            <div className={styles.belt} data-belt>
              {CASES.map((c) => (
                <div key={c.title} className={styles.item}>
                  <span className={styles.sector}>{c.pillar}</span>
                  <h3 className={styles.itemTitle}>{c.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
