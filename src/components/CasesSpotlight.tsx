'use client';

import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import CaseStudy, { type CaseStudyData } from './CaseStudy';
import styles from './CasesSpotlight.module.css';

/** Un caso en foco (CaseStudy) + riel de miniaturas para saltar entre casos.
 *  Patrón tabs WAI-ARIA: riel = tablist, miniaturas = tab, foco = tabpanel. */
export default function CasesSpotlight({ cases }: { cases: CaseStudyData[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + cases.length) % cases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        select(active + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        select(active - 1);
        break;
      case 'Home':
        e.preventDefault();
        select(0);
        break;
      case 'End':
        e.preventDefault();
        select(cases.length - 1);
        break;
      default:
        break;
    }
  };

  const current = cases[active];

  return (
    <div className={styles.wrap}>
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className={styles.panel}
        tabIndex={0}
        key={active}
      >
        <CaseStudy {...current} />
      </div>

      <div role="tablist" aria-label="Casos destacados" className={styles.rail} onKeyDown={onKeyDown}>
        {cases.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`glass-light ${styles.thumb} ${selected ? styles.thumbOn : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={`${styles.pill} ${styles[c.pillar === 'Desarrollo' ? 'dev' : 'auto']}`}>
                {c.pillar}
              </span>
              <span className={styles.thumbTitle}>{c.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
