'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Globe from './Globe';
import styles from './About.module.css';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const pillars = [
    {
        id: '01',
        title: 'Productividad',
        description: 'Eliminamos labores manuales repetitivas para que tu equipo se enfoque únicamente en crecer el negocio.'
    },
    {
        id: '02',
        title: 'Integración',
        description: 'Unificamos tus software y bases de datos para que la información fluya sin interrupciones ni cuellos de botella.'
    },
    {
        id: '03',
        title: 'IA Agéntica',
        description: 'Desplegamos agentes que razonan y ejecutan flujos completos, tomando acciones autónomas para cumplir tus metas.'
    }
];


export default function About() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const beforeRef = useRef<HTMLDivElement>(null);
    const afterRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!scrollContainerRef.current || !beforeRef.current || !afterRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainerRef.current,
                start: "top top",
                end: "+=250%", // Distance to scroll
                pin: true,
                scrub: 1,
            }
        });

        tl.to(beforeRef.current, {
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.9,
            duration: 1
        })
            .fromTo(afterRef.current, {
                opacity: 0,
                filter: "blur(10px)",
                scale: 1.1
            }, {
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
                duration: 1
            }, "-=0.2");

    }, { scope: scrollContainerRef });

    return (
        <section id="about" className={styles.about}>
            <div className={styles.introSection}>
                <motion.div
                    className={styles.imagePlaceholder}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Globe />
                </motion.div>

                <div className={styles.textContent}>
                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className={styles.introTitle}>
                            El tiempo no se recupera, <span className={styles.highlight}>los ingresos sí</span>
                        </h3>
                        <p className={styles.introParagraph}>
                            En el ecosistema empresarial, el tiempo es una ventaja competitiva. La mayoría de los negocios están atrapados en procesos fragmentados, lo que impacta directamente en <span className={styles.highlight}>sus ingresos</span>.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className={styles.introTitle}>
                            Las empresas no deberían perder tiempo en <span className={styles.highlight}>labores repetitivas</span>
                        </h3>
                        <p className={styles.introParagraph}>
                            Por eso, en <span className={styles.brandHighlight}>oito</span> diseñamos sistemas inteligentes de IA que actúan como el <span className={styles.highlight}>motor invisible</span> de tu crecimiento.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className={styles.introTitle}>
                            Transformamos la complejidad técnica en <span className={styles.highlight}>simplicidad operativa</span>
                        </h3>
                        <p className={styles.introParagraph}>
                            Mientras <span className={styles.brandHighlight}>oito</span> trabaja en segundo plano, tú recuperas el recurso más valioso de tu negocio: <span className={styles.highlight}>el tiempo para innovar y escalar.</span>
                        </p>
                    </motion.div>
                </div>
            </div >

            <div className={styles.infoArea}>
                <motion.h3
                    className={styles.infoTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    ¿Por qué <span className={styles.brandHighlightLarge}>oito</span>?
                </motion.h3>

                <motion.p
                    className={styles.infoDescription}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Somos la primera agencia en Venezuela que empodera a las empresas y a sus equipos mediante el diseño de sistemas de <span className={styles.highlight}>IA agéntica</span> que razonan y ejecutan. Nos basamos en 3 pilares fundamentales:
                </motion.p>

                <div className={styles.columnsContainer}>
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            className={styles.column}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <h4 className={styles.columnTitle}>{pillar.title}</h4>
                            <p className={styles.columnText}>{pillar.description}</p>

                            <div className={styles.columnVisualContainer}>
                                {pillar.id === '01' && (
                                    <div className={styles.visualProductivity}>
                                        <div className={styles.prodBar}></div>
                                        <div className={styles.prodBar}></div>
                                        <div className={styles.prodBar}></div>
                                    </div>
                                )}
                                {pillar.id === '02' && (
                                    <div className={styles.visualIntegration}>
                                        <div className={styles.intNode}></div>
                                        <div className={styles.intLine}></div>
                                        <div className={`${styles.intNode} ${styles.active}`}></div>
                                        <div className={styles.intLine}></div>
                                        <div className={styles.intNode}></div>
                                        <div className={styles.intData}></div>
                                    </div>
                                )}
                                {pillar.id === '03' && (
                                    <div className={styles.visualAgentic}>
                                        <div className={styles.robotHead}>
                                            <div className={styles.robotEye}></div>
                                            <div className={styles.robotEye}></div>
                                        </div>
                                        <div className={styles.robotAntenna}></div>
                                        <div className={styles.robotSignal}></div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* GSAP Scroll Pinned Transition Section */}
            <div ref={scrollContainerRef} className={styles.scrollSection}>
                <div className={styles.scrollContent}>
                    {/* Before State */}
                    <div ref={beforeRef} className={styles.stateBefore}>
                        <h3 className={styles.stateTitle}>Tu negocio hoy</h3>
                        <p className={styles.stateDesc}>Caos, tareas manuales, cuellos de botella.</p>
                        <div className={styles.chaosVisual}>
                            <div className={`${styles.chaosLine} ${styles.chaosLine1}`}></div>
                            <div className={`${styles.chaosLine} ${styles.chaosLine2}`}></div>
                            <div className={`${styles.chaosLine} ${styles.chaosLine3}`}></div>
                            <div className={`${styles.chaosLine} ${styles.chaosLine4}`}></div>
                            <div className={`${styles.chaosLine} ${styles.chaosLine5}`}></div>
                        </div>
                    </div>

                    {/* After State */}
                    <div ref={afterRef} className={styles.stateAfter}>
                        <h3 className={styles.stateTitle}>Tu negocio con <span className={styles.brandName}>oito</span></h3>
                        <p className={styles.stateDesc}>Orden, flujos integrados, IA agéntica operando.</p>
                        <div className={styles.orderVisual}>
                            <div className={`${styles.orderLine} ${styles.orderLine1}`}></div>
                            <div className={`${styles.orderLine} ${styles.orderLine2}`}></div>
                            <div className={`${styles.orderLine} ${styles.orderLine3}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
