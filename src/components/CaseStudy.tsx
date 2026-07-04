import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Code2, Workflow } from 'lucide-react';
import styles from './CaseStudy.module.css';

export type Pillar = 'Desarrollo' | 'Automatización';

export type CaseStudyData = {
  pillar: Pillar;
  title: string;
  description: string;
  tags: string[];
  /** System diagram (or, in the future, a real screenshot) shown as the case media. */
  diagram: ReactNode;
};

const PILLAR_ICON: Record<Pillar, LucideIcon> = {
  Desarrollo: Code2,
  Automatización: Workflow,
};

/** Reusable case row. Anonymized by sector (no client names, no invented metrics).
 *  `reverse` alternates the media/content sides for editorial rhythm. */
export default function CaseStudy({
  pillar,
  title,
  description,
  tags,
  diagram,
  reverse = false,
}: CaseStudyData & { reverse?: boolean }) {
  const PillarIcon = PILLAR_ICON[pillar];
  return (
    <article className={`glass-light ${styles.card} ${reverse ? styles.reverse : ''}`}>
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
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
