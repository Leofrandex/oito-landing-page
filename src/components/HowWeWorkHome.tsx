'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { MessageCircle, Code2, TrendingUp } from 'lucide-react';
import styles from './HowWeWorkHome.module.css';

const steps = [
    {
        id: 1,
        icon: MessageCircle,
        title: 'Contacto & Auditoría',
        description:
            'Hablamos por WhatsApp, entendemos tu negocio e identificamos dónde podemos ayudarte más.',
    },
    {
        id: 2,
        icon: Code2,
        title: 'Construcción & Implementación',
        description:
            'Diseñamos y desarrollamos la solución a medida, integrándola con lo que ya usas.',
    },
    {
        id: 3,
        icon: TrendingUp,
        title: 'Monitoreo & Mejora',
        description:
            'Medimos, ajustamos y escalamos para que los resultados se mantengan en el tiempo.',
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: 'easeOut' },
    },
};

const HowWeWorkHome: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className={styles.section} aria-labelledby="hwwh-title">
            <div className={styles.container} ref={ref}>
                {/* Title */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                >
                    <h2 id="hwwh-title" className={styles.title}>
                        Cómo{' '}
                        <span className={styles.brandHighlight}>oito</span>{' '}
                        lo hace
                    </h2>
                </motion.div>

                {/* Steps */}
                <motion.div
                    className={styles.stepsGrid}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                className={styles.card}
                                variants={itemVariants}
                            >
                                {/* Connector line (desktop) */}
                                {index < steps.length - 1 && (
                                    <span
                                        className={styles.connectorLine}
                                        aria-hidden="true"
                                    />
                                )}

                                {/* Step number badge */}
                                <div className={styles.numberBadge} aria-hidden="true">
                                    {step.id}
                                </div>

                                {/* Icon */}
                                <div className={styles.iconWrap} aria-hidden="true">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>

                                {/* Text */}
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HowWeWorkHome;
