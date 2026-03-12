'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Contact.module.css';
import { sendEmail } from '@/app/actions';

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

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

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setStatus(null);

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
                                    <strong>Plan de acción:</strong> Te mostramos qué tareas precisan de automatización.
                                </div>
                            </li>
                            <li>
                                <CheckCircle2 size={24} className={styles.checkIcon} />
                                <div>
                                    <strong>Cero compromiso:</strong> 30 minutos de valor, sin presiones de venta.
                                </div>
                            </li>
                        </ul>



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
                            <WhatsAppIcon />
                            Escríbenos
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
