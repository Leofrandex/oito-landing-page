import Reveal from './ui/Reveal';
import Button from '@/components/ui/Button';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './DevBridge.module.css';

/* Puente a desarrollo web (spec 2026-07-19 §3.9): tono "también hacemos",
 * jerarquía menor que los CTA de WhatsApp.
 *
 * Auditoría 2026-08-08 (T2 + A2): la columna derecha era un navegador falso
 * hecho con seis divs absolutos que se armaba solo en loop infinito de 7s. Se
 * retiró. La sección pasa a banda horizontal (copy a la izquierda, CTA a la
 * derecha), que además le da a la página una familia de layout distinta de las
 * pilas centradas del resto (hallazgo T7). */
export default function DevBridge() {
  return (
    <section className={`section-light cv-auto ${styles.section}`}>
      <Reveal className={styles.inner}>
        <div className={styles.copy}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            También hacemos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '60ms' }}>
            Tu página web, <span className={styles.accent}>construida por oito</span>
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '120ms' }}>
            El mismo estudio que automatiza tu operación puede construir la cara digital de tu
            negocio: rápida, moderna y hecha para vender.
          </p>
        </div>

        <div className={styles.ctaWrap} style={{ transitionDelay: '180ms' }}>
          <Button variant="secondary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={18} />
            Hablemos por WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
