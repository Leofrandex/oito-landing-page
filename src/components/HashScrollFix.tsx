'use client';
import { useEffect } from 'react';

/* Las secciones WhyOito, CasesShowcase y Methodology montan pines de GSAP
 * ScrollTrigger que agregan spacers al layout. En una carga completa con
 * hash en la URL, el navegador salta al ancla ANTES de que esos pines
 * existan, dejando el destino cientos/miles de px por debajo de donde
 * debería quedar. Este componente reintenta el scroll una vez montados
 * los pines. */
export default function HashScrollFix() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      const raf2 = () =>
        requestAnimationFrame(() => {
          window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
          }, 300);
        });

      requestAnimationFrame(raf2);
    };

    scrollToHash();

    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return null;
}
