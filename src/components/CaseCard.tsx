import type { LucideIcon } from 'lucide-react';
import { Code2, Workflow } from 'lucide-react';
import type { CaseStudyData, Pillar } from './CaseStudy';
import styles from './CaseCard.module.css';

const PILLAR_ICON: Record<Pillar, LucideIcon> = {
  Desarrollo: Code2,
  Automatización: Workflow,
};

/** Tarjeta "de pie" (vertical) usada por el carrusel coverflow. Superficie = .glass-light.
 *  Reutiliza el tipo y los diagramas del caso editorial (CaseStudy). */
export default function CaseCard({ pillar, title, description, tags, diagram }: CaseStudyData) {
  const PillarIcon = PILLAR_ICON[pillar];
  return (
    <article className={`glass-light glass-hover ${styles.card}`}>
      <div className={styles.media} aria-hidden="true">
        <span className={styles.mediaGrid} />
        <div className={styles.diagram}>{diagram}</div>
      </div>
      <div className={styles.body}>
        <span className={`${styles.pillar} ${styles[pillar === 'Desarrollo' ? 'dev' : 'auto']}`}>
          <PillarIcon size={15} strokeWidth={2} />
          {pillar}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <ul className={styles.tags}>
          {tags.map((t) => (
            <li key={t} className={styles.tag}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
