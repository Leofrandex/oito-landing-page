'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { scrollToSection } from '@/lib/scrollUtils';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header({ isLoaded = true }: { isLoaded?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
        e.preventDefault();
        closeMenu();
        scrollToSection(id);
    };

    return (
        <>
            <header
                className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${isOpen ? styles.menuOpen : ''}`}
                style={{
                    opacity: isLoaded ? 1 : 0,
                    pointerEvents: isLoaded ? 'auto' : 'none',
                    transition: 'opacity 0.6s ease'
                }}
            >
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Link href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className={styles.oitoLogoWrapper}>
                            <Image src="/oito_logo_2.png" alt="oito" width={75} height={35} className={styles.logoImage} priority />
                            <div className={styles.logoMintMask} aria-hidden="true" />
                        </Link>
                    </div>

                    <button
                        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>

                    <div className={`${styles.navWrapper} ${isOpen ? styles.open : ''}`}>
                        <nav className={styles.nav}>
                            <Link href="#about" className={styles.navLink} onClick={(e) => handleNavClick(e, 'about')}>Descubre</Link>
                            <Link href="#portfolio" className={styles.navLink} onClick={(e) => handleNavClick(e, 'portfolio')}>Soluciones</Link>
                            <Link href="#how-we-work" className={styles.navLink} onClick={(e) => handleNavClick(e, 'how-we-work')}>Nuestro Proceso</Link>
                            <Link href="#pricing-calculator" className={styles.navLink} onClick={(e) => handleNavClick(e, 'pricing-calculator')}>ROI</Link>

                            <button
                                type="button"
                                className={styles.mobileCta}
                                onClick={(e) => handleNavClick(e, 'contact')}
                            >
                                Contáctanos
                            </button>
                        </nav>
                    </div>

                    <button
                        type="button"
                        className={styles.desktopCta}
                        onClick={(e) => handleNavClick(e, 'contact')}
                    >
                        Contáctanos
                    </button>
                </div>
            </header>
        </>
    );
}
