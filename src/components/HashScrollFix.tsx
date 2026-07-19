'use client';
import { useEffect } from 'react';

const SCROLL_MARGIN_TOP = 90;
const TOLERANCE_PX = 6;
const CHECK_INTERVAL_MS = 250;
const MAX_DURATION_MS = 4000;

/* Las secciones WhyOito, CasesShowcase y Methodology montan pines de GSAP
 * ScrollTrigger que agregan spacers al layout. En una carga completa con
 * hash en la URL, el navegador salta al ancla ANTES de que esos pines
 * existan, dejando el destino cientos/miles de px por debajo de donde
 * debería quedar. En hidrataciones lentas (dev server, dispositivos
 * lentos) los pines pueden montar recién varios cientos de ms después,
 * por lo que una única corrección no alcanza. Este componente reintenta
 * el scroll en un loop de asentamiento hasta que la posición se estabiliza
 * o se agota el tiempo máximo. */
export default function HashScrollFix() {
  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const clearTimers = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      intervalId = undefined;
      timeoutId = undefined;
    };

    const correct = (id: string): boolean => {
      const element = document.getElementById(id);
      if (!element) return false;

      const top = element.getBoundingClientRect().top;
      if (Math.abs(top - SCROLL_MARGIN_TOP) > TOLERANCE_PX) {
        element.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
        return false;
      }
      return true;
    };

    const scrollToHash = () => {
      clearTimers();

      const id = window.location.hash.slice(1);
      if (!id) return;

      let consecutiveOk = 0;

      intervalId = window.setInterval(() => {
        const ok = correct(id);
        consecutiveOk = ok ? consecutiveOk + 1 : 0;
        if (consecutiveOk >= 2) {
          clearTimers();
        }
      }, CHECK_INTERVAL_MS);

      timeoutId = window.setTimeout(() => {
        clearTimers();
      }, MAX_DURATION_MS);
    };

    scrollToHash();

    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      clearTimers();
    };
  }, []);

  return null;
}
