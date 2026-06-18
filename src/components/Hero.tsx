'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';
import TextType from './TextType';

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
    const sectionRef = useRef<HTMLElement>(null);
    const brandRef = useRef<HTMLSpanElement>(null);
    const taglineRef = useRef<HTMLSpanElement>(null);
    const typeRowRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const skipRef = useRef<HTMLButtonElement>(null);

    const PHRASES = [
        'construye tu página web',
        'diseña tu app móvil',
        'crea tu sistema a medida',
        'automatiza tu facturación',
        'agiliza tu prospección',
        'ordena tu CRM',
        'gestiona tu inventario',
        'responde a tus clientes 24/7',
        'genera tus reportes',
    ];

    const prefersReducedMotion =
        typeof window !== 'undefined'
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;

    const handleSkip = () => {
        const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
        if (next) {
            next.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    useGSAP(() => {
        const els = [
            brandRef.current,
            taglineRef.current,
            typeRowRef.current,
            subtitleRef.current,
            ctaRef.current,
            skipRef.current,
        ];

        if (prefersReducedMotion) {
            gsap.set(els, { opacity: 1, y: 0 });
            return;
        }

        gsap.set(els, { opacity: 0, y: 40 });

        if (!isLoaded) return;

        gsap.timeline()
            .to(brandRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
            .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
            .to(typeRowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
            .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
            .to([ctaRef.current, skipRef.current], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
            }, '-=0.2');
    }, { scope: sectionRef, dependencies: [isLoaded] });

    return (
        <section id="hero" className={styles.hero} ref={sectionRef}>
            <div className={styles.content}>
                {/* Brand wordmark */}
                <span className={styles.brand} ref={brandRef} style={{ opacity: 0 }}>
                    oito
                </span>

                {/* Tagline */}
                <span className={styles.tagline} ref={taglineRef} style={{ opacity: 0 }}>
                    LO HACE POR TI
                </span>

                {/* TextType rotating phrases */}
                <div className={styles.typeRow} ref={typeRowRef} style={{ opacity: 0 }}>
                    <TextType
                        text={PHRASES}
                        as="span"
                        className={styles.typeWrap}
                        typingSpeed={45}
                        deletingSpeed={25}
                        pauseDuration={2200}
                        showCursor={true}
                    />
                </div>

                {/* Fixed subtitle */}
                <p className={styles.subtitle} ref={subtitleRef} style={{ opacity: 0 }}>
                    Tu equipo técnico que construye software y automatiza procesos — para que tú no tengas que lidiar con lo técnico.
                </p>

                {/* WhatsApp CTA */}
                <a
                    href="https://wa.me/584241344659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaButton}
                    ref={ctaRef}
                    style={{ opacity: 0 }}
                >
                    Hablemos por WhatsApp
                </a>

                {/* Skip intro */}
                <button
                    type="button"
                    className={styles.skipLink}
                    onClick={handleSkip}
                    ref={skipRef}
                    style={{ opacity: 0 }}
                >
                    saltar intro
                </button>
            </div>
        </section>
    );
}
