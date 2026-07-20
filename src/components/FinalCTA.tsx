import type { ReactNode } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import Reveal from './ui/Reveal';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './FinalCTA.module.css';

type FinalCTAProps = {
  title?: ReactNode;
  lede?: string;
};

export default function FinalCTA({
  title = <>¿Listo para que la IA trabaje por ti?</>,
  lede = 'Cuéntanos qué proceso te quita horas. Te respondemos por WhatsApp, sin compromiso.',
}: FinalCTAProps = {}) {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <h2 className={styles.title} style={{ transitionDelay: '0ms' }}>
          {title}
        </h2>
        <p className={styles.lede} style={{ transitionDelay: '90ms' }}>
          {lede}
        </p>
        <div className={styles.actions} style={{ transitionDelay: '180ms' }}>
          <Button variant="primary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={24} />
            Hablemos por WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
