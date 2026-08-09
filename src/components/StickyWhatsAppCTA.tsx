'use client';

import { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './StickyWhatsAppCTA.module.css';
import { WHATSAPP_URL } from '@/lib/constants';

/* El FAB entra cuando el hero sale de pantalla, que es justo cuando el CTA
 * principal deja de estar a la vista. Antes estaba siempre ahí, sin más razón
 * que estar (auditoría 2026-08-08, oportunidad Op4).
 * IntersectionObserver, no listener de scroll. */
export default function StickyWhatsAppCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    /* En páginas sin hero (p. ej. /desarrollo-web) el FAB se muestra siempre. */
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura del DOM al montar, no una cascada de renders
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.fab} ${visible ? styles.visible : ''}`}
      aria-label="Escríbenos por WhatsApp"
      // Fuera de pantalla no debe ser alcanzable con el tabulador.
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
    >
      <WhatsAppIcon size={24} />
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
