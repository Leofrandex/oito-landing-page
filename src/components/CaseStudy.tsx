// src/components/CaseStudy.tsx
'use client';

import GlassCard from './ui/GlassCard';
import styles from './CaseStudy.module.css';

export type CaseStudyProps = {
  title: string;
  pillar: 'Desarrollo' | 'Automatización';
  sector: string;
  body: string;
  hasShots?: boolean;
};

export default function CaseStudy({ title, pillar, sector, body, hasShots }: CaseStudyProps) {
  const isMint = pillar === 'Desarrollo';

  return (
    <GlassCard
      variant="strong"
      hover
      className={styles.card}
    >
      {/* Pillar chip */}
      <span className={`${styles.chip} ${isMint ? styles.chipMint : styles.chipForest}`}>
        {pillar}
      </span>

      {/* Sector label */}
      <p className={styles.sector}>{sector}</p>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Body */}
      <p className={styles.body}>{body}</p>

      {/* Optional screenshot placeholder */}
      {hasShots && (
        <div className={styles.shotPlaceholder} aria-label="Captura de pantalla disponible">
          <span className={styles.shotLabel}>captura disponible</span>
        </div>
      )}
    </GlassCard>
  );
}
