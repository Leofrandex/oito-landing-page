'use client';

import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.col}>
                        <h2 className={styles.logo}>oito</h2>
                        <p className={styles.tagline}>
                            Transformamos negocios a través de la automatización inteligente.
                            Eficiencia y escalabilidad para tu futuro.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Explorar</h3>
                        <ul className={styles.list}>
                            <li><a href="#about" className={styles.link}>Descubre</a></li>
                            <li><a href="#portfolio" className={styles.link}>Soluciones</a></li>
                            <li><a href="#how-we-work" className={styles.link}>Nuestro Proceso</a></li>
                            <li><a href="#pricing-calculator" className={styles.link}>ROI</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Contacto</h3>
                        <ul className={styles.list}>
                            <li>
                                <a href="mailto:info@oitove.com" className={styles.link}>
                                    info@oitove.com
                                </a>
                            </li>
                            <li className={styles.contactItem}>Agendemos una llamada</li>
                            <li>
                                <a href="#contact" style={{ textDecoration: 'none' }}>
                                    <button className={styles.ctaButton}>
                                        Hablemos <ArrowRight size={16} />
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Síguenos</h3>
                        <div className={styles.socials}>
                            <a href="https://wa.me/584241344659" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                                <WhatsAppIcon size={20} />
                            </a>
                            <a href="https://www.instagram.com/oito.vee/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} <span className={styles.brandName}>oito</span>. Todos los derechos reservados.
                    </div>

                </div>
            </div>
        </footer>
    );
}
