'use client';

import { motion, useReducedMotion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './FinalCTA.module.css';

const FADE_UP_BASE = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 as const },
} as const;

export default function FinalCTA() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="final-cta" className={styles.section}>
            <div className={styles.inner}>
                <motion.h2
                    className={styles.title}
                    {...(shouldReduceMotion ? {} : {
                        ...FADE_UP_BASE,
                        transition: { duration: 0.7, delay: 0 },
                    })}
                >
                    ¿Listo para que{' '}
                    <span className={styles.brand}>oito</span>{' '}
                    lo haga por ti?
                </motion.h2>

                <motion.p
                    className={styles.subtitle}
                    {...(shouldReduceMotion ? {} : {
                        ...FADE_UP_BASE,
                        transition: { duration: 0.7, delay: 0.15 },
                    })}
                >
                    Cuéntanos qué tienes en mente. Te respondemos por WhatsApp, sin compromiso.
                </motion.p>

                <motion.a
                    href="https://wa.me/584241344659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaButton}
                    {...(shouldReduceMotion ? {} : {
                        ...FADE_UP_BASE,
                        transition: { duration: 0.7, delay: 0.3 },
                    })}
                >
                    <WhatsAppIcon size={22} />
                    Hablemos por WhatsApp
                </motion.a>
            </div>
        </section>
    );
}
