'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyOito.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WhyOito() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const beforeRef = useRef<HTMLDivElement>(null);
    const afterRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!scrollContainerRef.current || !beforeRef.current || !afterRef.current) return;

        // Respect prefers-reduced-motion: skip the pinned scrub animation
        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainerRef.current,
                start: 'top top',
                end: '+=250%',
                pin: true,
                scrub: 1,
            },
        });

        tl.to(beforeRef.current, {
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.9,
            duration: 1,
        }).fromTo(
            afterRef.current,
            { opacity: 0, filter: 'blur(10px)', scale: 1.1 },
            { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1 },
            '-=0.2'
        );
    }, { scope: scrollContainerRef });

    return (
        <section id="why-oito" className={`sectionLight ${styles.whyOito}`}>
            {/* Text blocks */}
            <div className={styles.textArea}>
                <motion.div
                    className={styles.block}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.blockTitle}>
                        El tiempo no se recupera,{' '}
                        <span className={styles.highlight}>los ingresos sí</span>
                    </h2>
                    <p className={styles.blockText}>
                        La mayoría de los negocios están atrapados en procesos fragmentados y
                        tareas manuales. Eso cuesta tiempo — y el tiempo es lo único que no
                        vuelve.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.block}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className={styles.blockTitle}>
                        Tú enfócate en crecer. De lo técnico nos encargamos nosotros
                    </h2>
                    <p className={styles.blockText}>
                        En oito construimos y automatizamos el motor invisible de tu negocio:
                        el software que necesitas y los procesos que te quitan horas.
                    </p>
                </motion.div>
            </div>

            {/* GSAP pinned antes→después transition */}
            <div ref={scrollContainerRef} className={styles.scrollSection}>
                <div className={styles.scrollContent}>
                    {/* Before state */}
                    <div ref={beforeRef} className={styles.stateBefore}>
                        <h3 className={styles.stateTitle}>Tu negocio hoy</h3>
                        <p className={styles.stateDesc}>
                            Caos, tareas manuales, cuellos de botella.
                        </p>
                        <div className={styles.chaosVisual}>
                            <div className={`${styles.chaosLine} ${styles.chaosLine1}`} />
                            <div className={`${styles.chaosLine} ${styles.chaosLine2}`} />
                            <div className={`${styles.chaosLine} ${styles.chaosLine3}`} />
                            <div className={`${styles.chaosLine} ${styles.chaosLine4}`} />
                            <div className={`${styles.chaosLine} ${styles.chaosLine5}`} />
                        </div>
                    </div>

                    {/* After state */}
                    <div ref={afterRef} className={styles.stateAfter}>
                        <h3 className={styles.stateTitle}>
                            Tu negocio con{' '}
                            <span className={styles.brandName}>oito</span>
                        </h3>
                        <p className={styles.stateDesc}>
                            Orden, sistemas a medida, procesos en automático.
                        </p>
                        <div className={styles.orderVisual}>
                            <div className={`${styles.orderLine} ${styles.orderLine1}`} />
                            <div className={`${styles.orderLine} ${styles.orderLine2}`} />
                            <div className={`${styles.orderLine} ${styles.orderLine3}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Origin tagline */}
            <motion.p
                className={styles.origin}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Nacimos en Venezuela, trabajamos para toda LatAm.
            </motion.p>
        </section>
    );
}
