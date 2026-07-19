'use client';

import { useEffect, useRef, useState } from 'react';

/** Persigue `target` con un tween ease-out (~duration ms) vía requestAnimationFrame.
 *  Con prefers-reduced-motion salta directo al valor (sin animación).
 *  Pensado para los números de la calculadora (requisito: nunca saltos bruscos). */
export default function useCountUp(target: number, duration = 300): number {
  const [value, setValue] = useState(target);
  const currentRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentRef.current = target;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con media query leída al vuelo, no cascada de renders
      setValue(target);
      return;
    }

    const from = currentRef.current;
    if (from === target) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      currentRef.current = v;
      setValue(v);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}
