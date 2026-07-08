'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CaseStudyData } from './CaseStudy';
import CaseCard from './CaseCard';
import styles from './CasesCarousel.module.css';

type Mode = 'flat' | 'cover';

export default function CasesCarousel({ cases }: { cases: CaseStudyData[] }) {
  const [active, setActive] = useState(0);
  // Arranca en 'flat' para que SSR y el primer render cliente coincidan (sin transforms).
  // El efecto lo sube a 'cover' en desktop capaz.
  const [mode, setMode] = useState<Mode>('flat');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(cases.length - 1, i)),
    [cases.length],
  );

  // Modo según capacidad del cliente: coverflow solo en ancho > 768px sin reduced-motion.
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 769px)');
    const update = () => setMode(!motion.matches && wide.matches ? 'cover' : 'flat');
    update();
    motion.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, []);

  const scrollToFlat = useCallback((i: number) => {
    const card = trackRef.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const next = clamp(i);
      setActive(next);
      if (mode === 'flat') scrollToFlat(next);
    },
    [clamp, mode, scrollToFlat],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    }
  };

  // Tilt: solo modo cover, solo la tarjeta activa.
  const onMouseMove = (e: React.MouseEvent) => {
    if (mode !== 'cover' || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: -((e.clientY - r.top) / r.height - 0.5) * 14,
    });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Drag con umbral (solo cover).
  const onPointerDown = (e: React.PointerEvent) => {
    if (mode !== 'cover') return;
    dragStart.current = e.clientX;
    dragged.current = false;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (mode !== 'cover' || dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    if (dx > 60) {
      dragged.current = true;
      goTo(active - 1);
    } else if (dx < -60) {
      dragged.current = true;
      goTo(active + 1);
    }
    dragStart.current = null;
  };

  // En flat, sincroniza el índice activo con el scroll (para dots y live region).
  const onScroll = () => {
    if (mode !== 'flat' || !trackRef.current) return;
    const track = trackRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const c = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < min) {
        min = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const slideStyle = (i: number): CSSProperties | undefined => {
    if (mode !== 'cover') return undefined;
    const off = i - active;
    const abs = Math.abs(off);
    const base =
      `translateX(${off * 180}px) translateZ(${-abs * 220}px) ` +
      `rotateY(${off * -38}deg) scale(${1 - abs * 0.12})`;
    const transform =
      i === active ? `${base} rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : base;
    return {
      transform,
      opacity: abs > 2 ? 0 : 1 - abs * 0.18,
      zIndex: 10 - abs,
      filter: i === active ? 'none' : 'brightness(0.94)',
      pointerEvents: abs > 2 ? 'none' : 'auto',
    };
  };

  return (
    <div
      className={styles.wrap}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Casos destacados"
      onKeyDown={onKeyDown}
    >
      <div
        ref={stageRef}
        className={`${styles.stage} ${mode === 'cover' ? styles.cover : styles.flat}`}
        onMouseMove={onMouseMove}
        onMouseLeave={resetTilt}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {cases.map((c, i) => {
            const isActive = i === active;
            const canCenter = mode === 'cover' && !isActive;
            return (
              <div
                key={c.title}
                className={`${styles.slide} ${canCenter ? styles.clickable : ''}`}
                style={slideStyle(i)}
                role="group"
                aria-roledescription="slide"
                aria-label={`Caso ${i + 1} de ${cases.length}: ${c.title}`}
                aria-hidden={mode === 'cover' && !isActive ? true : undefined}
                onClick={
                  canCenter
                    ? () => {
                        if (dragged.current) {
                          dragged.current = false;
                          return;
                        }
                        goTo(i);
                      }
                    : undefined
                }
              >
                <CaseCard {...c} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.nav}
          onClick={() => goTo(active - 1)}
          aria-label="Caso anterior"
          disabled={active === 0}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className={styles.dots}>
          {cases.map((c, i) => (
            <button
              key={c.title}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotOn : ''}`}
              aria-label={`Ir al caso ${i + 1}: ${c.title}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.nav}
          onClick={() => goTo(active + 1)}
          aria-label="Caso siguiente"
          disabled={active === cases.length - 1}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <p className={styles.live} aria-live="polite">
        Caso {active + 1} de {cases.length}: {cases[active].title}
      </p>
    </div>
  );
}
