import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';
import Button from './ui/Button';
import WhatsAppIcon from './WhatsAppIcon';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`section-dark ${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <span className={`wordmark ${styles.logo}`}>oito</span>
            <p className={styles.tagline}>
              Automatización con IA para pymes en Venezuela.
            </p>
          </div>

          <div className={styles.col}>
            <h3 className={styles.heading}>Explorar</h3>
            <ul className={styles.list}>
              <li><Link href="/" className={styles.link}>Inicio</Link></li>
              <li><Link href="/#soluciones" className={styles.link}>Automatización &amp; IA</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.heading}>Contacto</h3>
            <ul className={styles.list}>
              <li><a href="mailto:info@oitove.com" className={styles.link}>info@oitove.com</a></li>
              <li>
                <Button variant="tertiary" external href={WHATSAPP_URL}>
                  WhatsApp <ArrowRight size={16} />
                </Button>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.heading}>Síguenos</h3>
            <div className={styles.socials}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                <WhatsAppIcon size={20} />
              </a>
              <a href="https://www.instagram.com/oito.vee/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          &copy; {new Date().getFullYear()} <span className="wordmark">oito</span>. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
