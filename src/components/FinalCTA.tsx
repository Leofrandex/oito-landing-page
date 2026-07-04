import type { ReactNode } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import Reveal from './ui/Reveal';
import styles from './FinalCTA.module.css';

type FinalCTAProps = {
  title?: ReactNode;
  lede?: string;
};

export default function FinalCTA({
  title = (
    <>
      ¿Listo para que <span className={`wordmark ${styles.brand}`}>oito</span> lo haga por ti?
    </>
  ),
  lede = 'Cuéntanos qué tienes en mente. Te respondemos por WhatsApp, sin compromiso.',
}: FinalCTAProps = {}) {
  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <Reveal className={styles.inner}>
        <h2 className={styles.title} style={{ transitionDelay: '0ms' }}>
          {title}
        </h2>
        <p className={styles.lede} style={{ transitionDelay: '90ms' }}>
          {lede}
        </p>
        <div className={styles.actions} style={{ transitionDelay: '180ms' }}>
          <a
            href="https://wa.me/584241344659"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <WhatsAppIcon size={24} />
            Hablemos por WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
