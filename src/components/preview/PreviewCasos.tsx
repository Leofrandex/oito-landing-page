'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/all';
import styles from './PreviewCasos.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

type Variant = 'mosaico' | 'columna';

/* Datos NEUTROS (canales, 24/7, PWA, GPS, sector). Nunca métricas de resultado. */
type CaseData = {
  pillar: 'Automatización' | 'Desarrollo';
  title: string;
  description: string;
  dato: string;
  datoLabel: string;
  chips: string[];
};

const CASES: CaseData[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs) y los reparte en el CRM.',
    dato: '3 canales',
    datoLabel: 'Entradas',
    chips: ['Email', 'WhatsApp', 'Web', 'CRM'],
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Agentes con RAG generan correos de venta personalizados y los envían desde el correo de cada vendedor.',
    dato: '24/7',
    datoLabel: 'Operación',
    chips: ['IA', 'RAG', 'Email'],
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos',
    description:
      'PWA para una planta de tratamiento: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios.',
    dato: 'PWA',
    datoLabel: 'Instalable',
    chips: ['PWA', 'Firmas', 'PDF', 'Fotos'],
  },
  {
    pillar: 'Desarrollo',
    title: 'Rastreo de fuerza de campo',
    description:
      'App móvil + panel web para una distribuidora: GPS en tiempo real, modo offline y cámara anti-fraude.',
    dato: 'GPS',
    datoLabel: 'Tiempo real',
    chips: ['GPS', 'Offline', 'Cámara'],
  },
];

const STEPS = CASES.length;

export default function PreviewCasos({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [active, setActive] = useState(0);

  /* Auto-avance cada ~3.5s: captura el estado Flip ANTES del re-render. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      const left = leftRef.current;
      if (left) flipState.current = Flip.getState(left.querySelectorAll('[data-flip]'));
      setActive((a) => (a + 1) % STEPS);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  /* Tras pintar el nuevo caso, Flip anima el cambio de tamaño/posición fluido. */
  useLayoutEffect(() => {
    if (flipState.current) {
      Flip.from(flipState.current, {
        duration: 0.6,
        ease: 'power2.inOut',
        absolute: true,
      });
      flipState.current = null;
    }
  }, [active]);

  /* Línea de recorrido, puntos y cinta de titulares (idéntico al bloque real). */
  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const dots = gsap.utils.toArray<HTMLElement>('[data-dot]');
      const fill = root.querySelector<HTMLElement>('[data-fill]');
      const belt = root.querySelector<HTMLElement>('[data-belt]');
      const dur = reduce ? 0 : 0.5;

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

  const c = CASES[active];

  return (
    <section className={`section-dark ${styles.section}`}>
      <header className={styles.head}>
        <p className="badge">Casos</p>
        <h2 className={styles.title}>
          Lo que <span className="wordmark">oito</span> ya ha construido
        </h2>
      </header>

      <div className={styles.stage} ref={container}>
        {/* ===== Izquierda: bloques con tamaño según contenido (Flip) ===== */}
        <div className={styles.left} ref={leftRef}>
          <div className={variant === 'mosaico' ? styles.mosaic : styles.column}>
            <div className={`${styles.block} ${styles.desc}`} data-flip data-flip-id="desc">
              <span className={styles.sector}>{c.pillar}</span>
              <p className={styles.descText}>{c.description}</p>
            </div>
            <div className={`${styles.block} ${styles.dato}`} data-flip data-flip-id="dato">
              <span className={styles.datoBig}>{c.dato}</span>
              <span className={styles.datoLabel}>{c.datoLabel}</span>
            </div>
            <div className={`${styles.block} ${styles.stack}`} data-flip data-flip-id="stack">
              {c.chips.map((chip) => (
                <span key={chip} className={styles.chip}>
                  {chip}
                </span>
              ))}
            </div>
            <div className={`${styles.block} ${styles.sectorTile}`} data-flip data-flip-id="sector">
              {c.pillar}
            </div>
          </div>
        </div>

        {/* ===== Centro: línea de recorrido ===== */}
        <div className={styles.route} aria-hidden="true">
          <span className={styles.track} />
          <span className={styles.fill} data-fill />
          {CASES.map((cs, i) => (
            <span
              key={cs.title}
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
              {CASES.map((cs) => (
                <div key={cs.title} className={styles.item}>
                  <span className={styles.sector}>{cs.pillar}</span>
                  <h3 className={styles.itemTitle}>{cs.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
