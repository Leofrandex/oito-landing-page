'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PreviewCasos.module.css';

type Variant = 'editorial' | 'ficha' | 'marco';

type Segment = { t: string; m?: boolean };

/* Datos NEUTROS (canales, 24/7, PWA, GPS, sector). Nunca métricas de resultado.
 * problema/solucion redactados en 1 línea a partir de la descripción real. */
type CaseData = {
  pillar: 'Automatización' | 'Desarrollo';
  title: string;
  editorial: Segment[];
  problema: string;
  solucion: string;
  caption: string;
  chips: string[];
};

const CASES: CaseData[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    editorial: [
      { t: 'Las cotizaciones entran por ' },
      { t: 'email, WhatsApp y web', m: true },
      { t: ', y un flujo ' },
      { t: 'extrae los datos', m: true },
      { t: ' —incluso de PDFs— y los reparte solo en el CRM.' },
    ],
    problema: 'Las cotizaciones llegan por email, WhatsApp y web, y alguien las pasa a mano al CRM.',
    solucion: 'Un flujo las recibe, extrae los datos (incluso de PDFs) y las reparte solo.',
    caption: 'Un flujo recibe, extrae y reparte cada cotización en el CRM.',
    chips: ['Email', 'WhatsApp', 'Web', 'CRM'],
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    editorial: [
      { t: 'Agentes con ' },
      { t: 'RAG', m: true },
      { t: ' generan correos de venta ' },
      { t: 'personalizados', m: true },
      { t: ' y los envían desde el correo de cada vendedor.' },
    ],
    problema: 'Escribir correos de venta personalizados uno por uno consume el día del equipo.',
    solucion: 'Agentes con RAG los redactan y los envían desde el correo de cada vendedor.',
    caption: 'Agentes con RAG redactan y envían las secuencias de venta.',
    chips: ['IA', 'RAG', 'Email'],
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos',
    editorial: [
      { t: 'Una ' },
      { t: 'PWA', m: true },
      { t: ' para la planta: pesaje, ' },
      { t: 'evidencia fotográfica', m: true },
      { t: ', firmas y ' },
      { t: 'reportes PDF', m: true },
      { t: ' regulatorios.' },
    ],
    problema: 'El pesaje, las firmas y la evidencia de la planta vivían en papel.',
    solucion: 'Una PWA captura pesaje, fotos y firmas, y arma los reportes PDF regulatorios.',
    caption: 'PWA de planta: pesaje, evidencia, firmas y reportes PDF.',
    chips: ['PWA', 'Firmas', 'PDF', 'Fotos'],
  },
  {
    pillar: 'Desarrollo',
    title: 'Rastreo de fuerza de campo',
    editorial: [
      { t: 'App móvil y panel web con ' },
      { t: 'GPS en tiempo real', m: true },
      { t: ', ' },
      { t: 'modo offline', m: true },
      { t: ' y cámara anti-fraude para la fuerza de campo.' },
    ],
    problema: 'La distribuidora no veía dónde estaba su fuerza de campo ni podía validar visitas.',
    solucion: 'App móvil con GPS en tiempo real, modo offline y cámara anti-fraude, más panel web.',
    caption: 'App móvil con GPS, offline y cámara, más panel web.',
    chips: ['GPS', 'Offline', 'Cámara'],
  },
];

const STEPS = CASES.length;

export default function PreviewCasos({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Auto-avance de caso cada ~3.5s. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STEPS), 3500);
    return () => window.clearInterval(id);
  }, []);

  /* Línea de recorrido, puntos, cinta de titulares + crossfade del contenido. */
  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const dots = gsap.utils.toArray<HTMLElement>('[data-dot]');
      const fill = root.querySelector<HTMLElement>('[data-fill]');
      const belt = root.querySelector<HTMLElement>('[data-belt]');
      const content = root.querySelector<HTMLElement>('[data-content]');
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

      /* Crossfade + slight y del lado del contenido al cambiar de caso. */
      if (content && !reduce) {
        gsap.fromTo(
          content,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        );
      }
    },
    { scope: container, dependencies: [active, variant] },
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
        {/* ===== Izquierda: lado del contenido (sin bento) ===== */}
        <div className={styles.left}>
          <div className={styles.content} data-content>
            {variant === 'editorial' && (
              <div className={styles.editorial}>
                <span className={styles.sector}>{c.pillar}</span>
                <p className={styles.editorialText}>
                  {c.editorial.map((seg, i) =>
                    seg.m ? (
                      <span key={i} className={styles.kw}>
                        {seg.t}
                      </span>
                    ) : (
                      <span key={i}>{seg.t}</span>
                    ),
                  )}
                </p>
                <div className={styles.chipRow}>
                  {c.chips.map((chip) => (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {variant === 'ficha' && (
              <div className={styles.ficha}>
                <div className={styles.fichaRow}>
                  <span className={styles.fichaLabel}>Problema</span>
                  <p className={styles.fichaValue}>{c.problema}</p>
                </div>
                <div className={styles.fichaRow}>
                  <span className={styles.fichaLabel}>Solución</span>
                  <p className={styles.fichaValue}>{c.solucion}</p>
                </div>
                <div className={styles.chipRow}>
                  {c.chips.map((chip) => (
                    <span key={chip} className={styles.chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {variant === 'marco' && (
              <div className={styles.marco}>
                <div className={styles.frame} aria-hidden="true">
                  <div className={styles.frameBar}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className={styles.frameCanvas}>
                    <span className={styles.framePattern} />
                    <span className={`wordmark ${styles.frameWordmark}`}>oito</span>
                    <span className={styles.frameNote}>captura del proyecto próximamente</span>
                  </div>
                </div>
                <p className={styles.marcoCaption}>{c.caption}</p>
              </div>
            )}
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
