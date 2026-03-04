'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import styles from './Contact.module.css';
import { sendEmail } from '@/app/actions';

const countryCodes = [
    { code: '+58', country: 'VE', name: 'Venezuela' },
    { code: '+1', country: 'US', name: 'Estados Unidos' },
    { code: '+52', country: 'MX', name: 'México' },
    { code: '+54', country: 'AR', name: 'Argentina' },
    { code: '+55', country: 'BR', name: 'Brasil' },
    { code: '+56', country: 'CL', name: 'Chile' },
    { code: '+57', country: 'CO', name: 'Colombia' },
    { code: '+51', country: 'PE', name: 'Perú' },
    { code: '+593', country: 'EC', name: 'Ecuador' },
    { code: '+591', country: 'BO', name: 'Bolivia' },
    { code: '+595', country: 'PY', name: 'Paraguay' },
    { code: '+598', country: 'UY', name: 'Uruguay' },
    { code: '+506', country: 'CR', name: 'Costa Rica' },
    { code: '+507', country: 'PA', name: 'Panamá' },
    { code: '+503', country: 'SV', name: 'El Salvador' },
    { code: '+502', country: 'GT', name: 'Guatemala' },
    { code: '+504', country: 'HN', name: 'Honduras' },
    { code: '+505', country: 'NI', name: 'Nicaragua' },
    { code: '+53', country: 'CU', name: 'Cuba' },
    { code: '+1-809', country: 'DO', name: 'Rep. Dominicana' },
    { code: '+34', country: 'ES', name: 'España' },
    { code: '+351', country: 'PT', name: 'Portugal' },
    { code: '+33', country: 'FR', name: 'Francia' },
    { code: '+49', country: 'DE', name: 'Alemania' },
    { code: '+39', country: 'IT', name: 'Italia' },
    { code: '+44', country: 'GB', name: 'Reino Unido' },
];

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [selectedCode, setSelectedCode] = useState(countryCodes[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialise Cal.com API
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                styles: { branding: { brandColor: "#09bc8a" } },
                hideEventTypeDetails: false,
                layout: "month_view"
            });
        })();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setStatus(null);

        // Prepend country code to phone
        const rawPhone = formData.get('phone') as string;
        if (rawPhone) {
            formData.set('phone', `${selectedCode.code} ${rawPhone}`);
        }

        try {
            const result = await sendEmail(formData);

            if (result.success) {
                setStatus({
                    type: 'success',
                    message: '¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.'
                });
                (document.getElementById('contact-form') as HTMLFormElement)?.reset();
            } else {
                setStatus({
                    type: 'error',
                    message: result.error || 'Hubo un error al enviar el mensaje.'
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Ocurrió un error inesperado.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className={styles.contact}>
            {/* ENCABEZADO CENTRADO */}
            <motion.div
                className={styles.headerSection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className={styles.headline}>
                    <span className={styles.brandWord}>oitomatiza</span>
                    con nosotros
                </h2>
                <p className={styles.subheadline}>
                    ¿Listo para transformar tu negocio?
                </p>
            </motion.div>

            <div className={styles.contentContainer}>

                {/* COLUMNA IZQUIERDA: FORMULARIO */}
                <motion.div
                    className={styles.leftCol}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className={styles.colDescription}>
                        Contáctanos para descubrir cómo nuestros servicios pueden elevar tu potencial y optimizar tus resultados.
                    </p>

                    <div className={styles.formContainer}>
                        <form id="contact-form" className={styles.form} action={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className={styles.label}>Nombre y apellidos</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={styles.input}
                                    required
                                    placeholder="Tu nombre y apellidos"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.input}
                                    required
                                    placeholder="nombre@empresa.com"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="phone" className={styles.label}>Teléfono</label>
                                <div className={styles.phoneRow}>
                                    <div className={styles.countryCodeWrapper} ref={dropdownRef}>
                                        <button
                                            type="button"
                                            className={styles.countryCodeButton}
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            aria-haspopup="listbox"
                                            aria-expanded={isDropdownOpen}
                                        >
                                            <span className={styles.countryFlag}>{selectedCode.country}</span>
                                            <span className={styles.countryCodeText}>{selectedCode.code}</span>
                                            <ChevronDown
                                                size={14}
                                                className={`${styles.dropdownChevron} ${isDropdownOpen ? styles.dropdownChevronOpen : ''}`}
                                            />
                                        </button>

                                        {isDropdownOpen && (
                                            <ul className={styles.dropdownMenu} role="listbox">
                                                {countryCodes.map((item) => (
                                                    <li
                                                        key={item.code + item.country}
                                                        role="option"
                                                        aria-selected={selectedCode.code === item.code}
                                                        className={`${styles.dropdownItem} ${selectedCode.code === item.code ? styles.dropdownItemActive : ''}`}
                                                        onClick={() => {
                                                            setSelectedCode(item);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                    >
                                                        <span className={styles.dropdownCountry}>{item.country}</span>
                                                        <span className={styles.dropdownName}>{item.name}</span>
                                                        <span className={styles.dropdownCode}>{item.code}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={`${styles.input} ${styles.phoneInput}`}
                                        placeholder="412 123 4567"
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="message" className={styles.label}>¿Qué tienes en mente?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={styles.textarea}
                                    required
                                    placeholder="Cuéntanos brevemente sobre tu proyecto o necesidades..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitButton}
                                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                            </button>

                            {status && (
                                <div className={status.type === 'success' ? styles.successMessage : styles.errorMessage}>
                                    {status.message}
                                </div>
                            )}
                        </form>
                    </div>
                </motion.div>

                {/* SEPARADOR VERTICAL */}
                <motion.div
                    className={styles.dividerWrapper}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className={styles.dividerLine}></div>
                    <span className={styles.dividerText}>o</span>
                    <div className={styles.dividerLine}></div>
                </motion.div>

                {/* COLUMNA DERECHA: CALENDARIO */}
                <motion.div
                    className={styles.rightCol}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className={styles.colDescription}>
                        Agenda directamente tu cita en tan solo unos pocos clicks para empezar a explorar los puntos de mejora dentro de tu empresa.
                    </p>

                    <div className={styles.calContainer}>
                        <ul className={styles.checklist}>
                            <li>
                                <CheckCircle2 size={24} className={styles.checkIcon} />
                                <div>
                                    <strong>Auditoría rápida:</strong> Identificamos tus puntos de dolor.
                                </div>
                            </li>
                            <li>
                                <CheckCircle2 size={24} className={styles.checkIcon} />
                                <div>
                                    <strong>Plan de acción:</strong> Te mostramos qué tareas precisan de automatización urgente.
                                </div>
                            </li>
                            <li>
                                <CheckCircle2 size={24} className={styles.checkIcon} />
                                <div>
                                    <strong>Cero compromiso:</strong> 30 minutos de valor, sin presiones de venta.
                                </div>
                            </li>
                        </ul>

                        <p className={styles.calTextSeparator}>
                            Selecciona el momento que mejor se adapte a tu agenda para una sesión de descubrimiento <strong>sin ningún compromiso.</strong>
                        </p>

                        <button
                            className={styles.calButton}
                            data-cal-link="sebastian-castro"
                            data-cal-config='{"layout":"month_view"}'
                        >
                            <CalendarIcon size={22} />
                            Agenda tu cita
                        </button>

                        <div className={styles.horizontalDivider}></div>

                        <p className={styles.calTextSeparator}>
                            ¿Tienes alguna duda rápida o una solicitud menor? Puedes consultarnos de forma inmediata a través de WhatsApp.
                        </p>

                        <a
                            href="https://wa.me/584241344659"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.calButton}
                            style={{ textDecoration: 'none' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                            Escríbenos
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
