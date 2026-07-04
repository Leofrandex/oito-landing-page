'use client';

import { useEffect, useState } from 'react';
import styles from './Methodology.module.css';

/* Ilustrativo ("podría haber"), no un dato real. Las 3 métricas y sus ritmos
 * provienen del contador de la página original; rediseñadas para esta página. */
const METRICS = [
  { verb: 'calificado', noun: 'leads', divisor: 3.5 },
  { verb: 'enviado', noun: 'propuestas', divisor: 20 },
  { verb: 'validado', noun: 'facturas', divisor: 14 },
];

export default function LiveCounter() {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSecs(45);
      return;
    }
    const update = () => setSecs(Math.floor(performance.now() / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.counter}>
      <p className={styles.counterText}>
        En los <span className={styles.counterSecs}>{secs}</span> segundos que llevas leyendo,{' '}
        <span className="wordmark">oito</span> podría haber:
      </p>
      <div className={styles.metrics}>
        {METRICS.map(({ verb, noun, divisor }) => (
          <div className={styles.metric} key={noun}>
            <span className={styles.metricVerb}>{verb}</span>
            <span className={styles.metricNum}>{Math.floor(secs / divisor)}</span>
            <span className={styles.metricNoun}>{noun}</span>
          </div>
        ))}
      </div>
      <span className={styles.counterNote}>
        estimación ilustrativa de lo que la automatización podría procesar
      </span>
    </div>
  );
}
