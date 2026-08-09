'use client';

import { useEffect, useRef, useState } from 'react';

/** Persigue VARIOS objetivos numéricos a la vez con un tween ease-out cúbico
 *  (~duration ms) y devuelve los valores animados.
 *
 *  El punto de tener un solo hook para todos los valores: antes la calculadora
 *  llamaba a `useCountUp` cuatro veces, así que arrastrar un slider disparaba
 *  cuatro rAF y cuatro setState por frame (auditoría 2026-08-08, hallazgo A4).
 *  Aquí hay un único rAF y un único setState por frame para los cuatro.
 *
 *  Nota de implementación: se probó escribir directo al DOM desde refs para
 *  llegar a cero renders, y se descartó. Los nodos animados también los
 *  renderiza React; sobrescribirlos con textContent fusiona sus nodos de texto
 *  y deja huérfanas las referencias internas de React, que a partir de ahí
 *  actualiza nodos desconectados. Un setState por frame es la opción correcta:
 *  React sigue siendo el único dueño del DOM.
 *
 *  Con prefers-reduced-motion salta directo al valor final, sin animación. */
export default function useCountUp(targets: number[], duration = 300): number[] {
  const [values, setValues] = useState<number[]>(targets);
  const currentRef = useRef<number[]>(targets);
  const rafRef = useRef<number | null>(null);

  /* Clave estable: el array de objetivos es nuevo en cada render, así que
   * depender de él directamente relanzaría el efecto siempre. */
  const key = targets.join(',');

  useEffect(() => {
    const to = key.split(',').map(Number);
    const from = currentRef.current;

    const settle = () => {
      currentRef.current = to;
      setValues(to);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      settle();
      return;
    }

    if (from.length === to.length && from.every((v, i) => v === to[i])) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = to.map((target, i) => {
        const origin = from[i] ?? target;
        return origin + (target - origin) * eased;
      });
      currentRef.current = next;
      setValues(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = to;
        setValues(to);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [key, duration]);

  return values;
}
