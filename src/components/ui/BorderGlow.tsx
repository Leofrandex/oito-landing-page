// src/components/ui/BorderGlow.tsx
'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import styles from './BorderGlow.module.css';
import { clsx } from 'clsx';

/*
 * BorderGlow adaptado a oito (React Bits): glow de borde rastreado por el
 * puntero, construido con dos capas enmascaradas (rim conico base + spotlight
 * radial) mas un halo interior. Marca oito: malla mint monocroma.
 *
 * Props principales:
 * - light: variante clara (fondo claro + glow mas suave, intensidad 0.55
 *   en vez de 0.9).
 * - className: clases extra para el contenedor de la tarjeta.
 * - children: contenido de la tarjeta (icono, titulo, texto, etc).
 *
 * GUARDADO sin consumidores por decision del usuario (2026-07-19): se evaluara
 * aplicarlo a tarjetas del sitio mas adelante. Adaptado desde el prototipo de
 * src/components/preview/PreviewBorderGlow.tsx, retirado en esa misma fecha.
 * No importar todavia sin antes revisar con el usuario donde se va a usar.
 */

type BorderGlowProps = {
  light?: boolean;
  className?: string;
  children: ReactNode;
};

export default function BorderGlow({ light, className, children }: BorderGlowProps) {
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
    <div
      ref={ref}
      className={clsx(styles.card, light && styles.cardLight, className)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.rimBase} aria-hidden="true" />
      <span className={styles.rimSpot} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
