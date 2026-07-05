'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './SocialProof.module.css';

export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion();

  // Neutral placeholder count (4-6 placeholders for balance)
  const placeholderCount = 5;
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => i);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.container}>
        {/* Title with mint accent on "oito" */}
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          Negocios que ya dejaron que <span className={`${styles.mintText} wordmark`}>oito</span> lo haga por ellos
        </motion.h2>

        {/* Neutral logo placeholders */}
        <motion.div
          className={styles.logosGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {placeholders.map((idx) => (
            <motion.div
              key={idx}
              className={styles.logoPlaceholder}
              variants={itemVariants}
              aria-label={`Client logo placeholder ${idx + 1}`}
            >
              {/* Neutral icon: horizontal dash */}
              <div className={styles.placeholderIcon}>—</div>
            </motion.div>
          ))}
        </motion.div>

        {/* TODO: Extension marker for real assets */}
        {/* TODO: reemplazar con logos/testimonios reales cuando el usuario los aporte (ver CLAUDE.md §7) */}
      </div>
    </section>
  );
}
