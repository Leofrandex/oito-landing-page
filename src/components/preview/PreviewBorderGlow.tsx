'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { Zap } from 'lucide-react';
import styles from './PreviewBorderGlow.module.css';

/* BorderGlow adaptado (React Bits): glow de borde rastreado por el puntero con
 * máscaras (rim cónico + spotlight radial). Marca oito: malla mint monocroma,
 * glowIntensity 0.9. La variante clara usa fondo claro y glow más suave. */

type GlowCardProps = {
  label: string;
  light?: boolean;
  children: ReactNode;
};

function GlowCard({ label, light, children }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const intensity = light ? 0.55 : 0.9;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    el.style.setProperty('--op', String(intensity));
  };

  const onLeave = () => {
    ref.current?.style.setProperty('--op', '0');
  };

  return (
    <div className={styles.cardOuter}>
      <div
        ref={ref}
        className={`${styles.card} ${light ? styles.cardLight : ''}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className={styles.halo} aria-hidden="true" />
        <span className={styles.rimBase} aria-hidden="true" />
        <span className={styles.rimSpot} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
      <span className={styles.cardLabel}>{label}</span>
    </div>
  );
}

export default function PreviewBorderGlow() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* (a) nodo de pilares */}
          <GlowCard label="bglow-pilares">
            <div className={styles.iconWrap} aria-hidden="true">
              <Zap size={26} strokeWidth={1.6} />
            </div>
            <h3 className={styles.nodeTitle}>Productividad</h3>
            <p className={styles.nodeDesc}>
              Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el
              negocio.
            </p>
          </GlowCard>

          {/* (b) tarjeta bento de casos */}
          <GlowCard label="bglow-casos">
            <span className={styles.sector}>Automatización</span>
            <h3 className={styles.caseTitle}>Calificación de leads con IA</h3>
            <p className={styles.caseDesc}>
              Recibe cotizaciones por email, WhatsApp y web, extrae los datos y los reparte en el
              CRM.
            </p>
            <div className={styles.tagRow}>
              <span className={styles.tag}>Email</span>
              <span className={styles.tag}>WhatsApp</span>
              <span className={styles.tag}>CRM</span>
              <span className={styles.tag}>IA</span>
            </div>
          </GlowCard>

          {/* (c) tarjeta glass-light clara */}
          <GlowCard label="bglow-claro" light>
            <h3 className={styles.claroTitle}>Soporte 24/7</h3>
            <p className={styles.claroBody}>
              Un asistente que responde las preguntas frecuentes de tus clientes a cualquier hora, y
              escala a un humano cuando hace falta.
            </p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
