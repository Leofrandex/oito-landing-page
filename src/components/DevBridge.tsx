import Reveal from './ui/Reveal';
import Button from '@/components/ui/Button';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './DevBridge.module.css';

/* Puente a desarrollo web (spec 2026-07-19 §3.9): tono "también hacemos",
 * jerarquía menor que los CTA de WhatsApp. El navegador de la derecha se
 * construye solo en loop (CSS puro). */
export default function DevBridge() {
  return (
    <section className={`section-light cv-auto ${styles.section}`}>
      <Reveal className={styles.inner}>
        <div className={styles.copy}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            También hacemos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '80ms' }}>
            Tu página web, <span className={styles.accent}>construida por oito</span>
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '160ms' }}>
            El mismo estudio que automatiza tu operación puede construir la cara digital de tu
            negocio: rápida, moderna y hecha para vender.
          </p>
          <div className={styles.ctaWrap} style={{ transitionDelay: '240ms' }}>
            <Button variant="secondary" external href={WHATSAPP_URL}>
              <WhatsAppIcon size={18} />
              Cuéntanos qué quieres hacer
            </Button>
          </div>
        </div>

        <div className={styles.browser} style={{ transitionDelay: '200ms' }} aria-hidden="true">
          <div className={styles.browserBar}>
            <i /><i /><i />
          </div>
          <div className={styles.canvas}>
            <span className={`${styles.el} ${styles.e1}`} />
            <span className={`${styles.el} ${styles.e2}`} />
            <span className={`${styles.el} ${styles.e3}`} />
            <span className={`${styles.el} ${styles.e4}`} />
            <span className={`${styles.el} ${styles.e5}`} />
            <span className={`${styles.el} ${styles.e6}`} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
