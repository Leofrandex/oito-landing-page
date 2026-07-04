import WhatsAppIcon from './WhatsAppIcon';
import styles from './StickyWhatsAppCTA.module.css';

export default function StickyWhatsAppCTA() {
  return (
    <a
      href="https://wa.me/584241344659"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon size={24} />
      <span className={styles.label}>Hablemos</span>
    </a>
  );
}
