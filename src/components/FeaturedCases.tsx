// src/components/FeaturedCases.tsx
'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';
import CaseStudy, { type CaseStudyProps } from './CaseStudy';
import styles from './FeaturedCases.module.css';

const cases: CaseStudyProps[] = [
  {
    title: 'App de rastreo de fuerza de campo',
    pillar: 'Desarrollo',
    sector: 'Distribución farmacéutica',
    body: 'App móvil nativa + panel web para una distribuidora farmacéutica: GPS en tiempo real, modo offline y cámara anti-fraude para verificar visitas de mercaderistas en campo.',
  },
  {
    title: 'App de trazabilidad de desechos peligrosos',
    pillar: 'Desarrollo',
    sector: 'Gestión de desechos hospitalarios',
    body: 'PWA para una planta de tratamiento de desechos hospitalarios: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios en automático.',
    hasShots: true,
  },
  {
    title: 'Calificación de leads con IA',
    pillar: 'Automatización',
    sector: 'Ciberseguridad',
    body: 'Para un integrador de ciberseguridad: un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs y adjuntos), califica con IA y los reparte en el CRM.',
  },
  {
    title: 'Secuencias de venta con IA',
    pillar: 'Automatización',
    sector: 'Logística B2B',
    body: 'Para un bróker logístico B2B: agentes de IA con RAG generan correos de venta personalizados y los envían en automático desde el correo de cada vendedor.',
  },
];

export default function FeaturedCases() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        delay: shouldReduceMotion ? 0 : i * 0.12,
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
          <h2 className={styles.title}>
            Lo que <span className={styles.mintText}>oito</span> ya ha construido
          </h2>
          <p className={styles.subtitle}>
            Proyectos reales para empresas reales. Sin cifras infladas — solo lo que hicimos.
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <div className={styles.grid}>
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className={styles.cardWrapper}
            >
              <CaseStudy {...c} />
            </motion.div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          className={styles.ctaWrap}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : 0.5 }}
        >
          <Link href="/automatizacion-ia" className={styles.cta}>
            Ver todas las soluciones →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
