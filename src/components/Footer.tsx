'use client';

import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-whatsapp"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                </svg>
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
                    {/* Optional: Legal links if needed in the future */}
                    {/* <div className={styles.legal}>
                        <a href="#" className={styles.legalLink}>Privacidad</a>
                        <a href="#" className={styles.legalLink}>Términos</a>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}
