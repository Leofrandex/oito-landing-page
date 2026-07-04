'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { Code2, Workflow } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import styles from './TwoPillars.module.css';

const pillars = [
  {
    icon: Code2,
    title: 'Desarrollo web & software',
    text: 'Sitios, apps y sistemas a medida que se ven increíbles y funcionan rápido. De la idea al producto, sin que tú toques una línea de código.',
    linkLabel: 'Ver desarrollo →',
    href: '/desarrollo-web',
  },
  {
    icon: Workflow,
    title: 'Automatización & IA',
    text: 'Flujos y agentes que hacen el trabajo repetitivo por ti: prospección, cobranza, soporte, reportes. Tu operación, en piloto automático.',
    linkLabel: 'Ver automatización →',
    href: '/automatizacion-ia',
  },
];

export default function TwoPillars() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : i * 0.15,
        ease: [0.25, 0, 0, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section className={`sectionLight ${styles.section}`}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <p className={styles.eyebrow}>Dos pilares · un equipo</p>
          <h2 className={styles.title}>
            Dos formas en que{' '}
            <span className={styles.mintText}>oito</span>{' '}
            lo resuelve
          </h2>
          <p className={styles.subtitle}>
            Contrata una o ambas. Cada una, con todo el equipo detrás.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.href}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={styles.cardWrapper}
              >
                <GlassCard
                  variant="strong"
                  hover
                  className={styles.card}
                >
                  <div className={styles.iconWrap}>
                    <Icon size={28} strokeWidth={1.5} color="var(--color-accent)" />
                  </div>

                  <h3 className={styles.cardTitle}>{pillar.title}</h3>
                  <p className={styles.cardText}>{pillar.text}</p>

                  <Link href={pillar.href} className={styles.cardLink}>
                    {pillar.linkLabel}
                  </Link>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
