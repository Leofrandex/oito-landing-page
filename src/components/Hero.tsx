'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { scrollToSection } from '@/lib/scrollUtils';
import styles from './Hero.module.css';
import TextType from './TextType';

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const oitoTextRef = useRef<HTMLSpanElement>(null);
    const mainTextRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaButtonRef = useRef<HTMLButtonElement>(null);

    const ROTATING_WORDS = [
        "facturación",
        "prospección",
        "onboarding de clientes",
        "generación de contenido",
        "inventario",
        "generación de propuestas",
        "CRM",
        "reportes"
    ];

    const scrollToContact = () => scrollToSection('contact');

    useGSAP(() => {
        // Hide elements initially
        gsap.set([oitoTextRef.current, mainTextRef.current], { opacity: 0, y: 50 });
        gsap.set([descriptionRef.current, ctaButtonRef.current], { opacity: 0, y: 20 });

        if (!isLoaded) return;

        // Initial animation for Headline (Load only, not scroll-driven)
        const headlineTl = gsap.timeline();
        headlineTl.to([oitoTextRef.current, mainTextRef.current],
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        ).to([descriptionRef.current, ctaButtonRef.current],
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
        );

    }, { scope: sectionRef, dependencies: [isLoaded] });

    return (
        <section id="hero" className={styles.hero} ref={sectionRef}>
            <div className={styles.content} ref={contentRef}>
                <h1 className={styles.headline}>
                    <span className={styles.oitoText} ref={oitoTextRef} style={{ opacity: 0 }}>oito</span>
                    <span className="sr-only"> </span>
                    <span className={styles.mainText} ref={mainTextRef} style={{ opacity: 0 }}>LO HACE POR TI</span>
                </h1>
                <p className={styles.description} ref={descriptionRef} style={{ opacity: 0 }}>
                    Diseñamos sistemas de IA que automatizan tu{' '}
                    <br className={styles.mobileBreak} />
                    <TextType
                        text={ROTATING_WORDS}
                        as="span"
                        className={styles.rotatingTextWrap}
                        typingSpeed={50}
                        deletingSpeed={30}
                        pauseDuration={2000}
                    />
                </p>
                <button
                    type="button"
                    className={styles.ctaButton}
                    onClick={scrollToContact}
                    ref={ctaButtonRef}
                    style={{ opacity: 0 }}
                >
                    oitomatiza
                </button>
            </div>
        </section>
    );
}
