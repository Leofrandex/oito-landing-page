import WhatsAppIcon from './WhatsAppIcon';
import styles from './StickyWhatsAppCTA.module.css';
import { WHATSAPP_URL } from '@/lib/constants';

export default function StickyWhatsAppCTA() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon size={24} />
      <span className={styles.label}>WhatsApp</span>
    </a>
  );
}
