'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './SocialProof.module.css';

/* Sectores REALES de los casos del copy deck (anonimizados, sin nombres de cliente).
 * Señales neutras verificables; sin métricas inventadas (CLAUDE.md / copy deck). */
const SECTORS = [
  'Ciberseguridad',
  'Logística',
  'Salud',
  'Farmacéutica',
  'Gestión de desechos',
  'Transporte B2B',
];

const SIGNALS = [
  { value: '6+', label: 'proyectos entregados' },
  { value: '6', label: 'sectores distintos' },
  { value: '24/7', label: 'operando en automático' },
  { value: '100%', label: 'remoto y en español' },
];

export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion();

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
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section className={`section-dark cv-auto ${styles.section}`}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          Negocios que ya dejaron que <span className={`${styles.mintText} wordmark`}>oito</span> lo
          haga por ellos
        </motion.h2>

        {/* Franja 1: sectores reales atendidos */}
        <motion.ul
          className={styles.sectors}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          role="list"
        >
          {SECTORS.map((sector) => (
            <motion.li key={sector} className={styles.sectorChip} variants={itemVariants}>
              {sector}
            </motion.li>
          ))}
        </motion.ul>

        {/* Franja 2: placeholders de logos (se vuelven logos reales cuando haya permiso) */}
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
              className={`glass glass-hover ${styles.logoPlaceholder}`}
              variants={itemVariants}
              aria-label={`Client logo placeholder ${idx + 1}`}
            >
              <div className={styles.placeholderIcon} aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>

        {/* Franja 3: señales neutras */}
        <motion.dl
          className={styles.signals}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {SIGNALS.map(({ value, label }) => (
            <motion.div key={label} className={styles.signal} variants={itemVariants}>
              <dt className={styles.signalLabel}>{label}</dt>
              <dd className={styles.signalValue}>{value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* TODO: slot de testimonio (1) cuando haya permiso del cliente */}
      </div>
    </section>
  );
}
