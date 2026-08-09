'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import WhatsAppIcon from './WhatsAppIcon';
import TextType from './TextType';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './Hero.module.css';

/* Deck v2 §1 (ajuste 2026-07-21): "Hacemos" queda fijo (conecta con "oito lo hace por ti")
 * y solo rota el complemento nominal; "automatización" aparece una sola vez, en la línea
 * keyword del H1. Las 8 frases existen además como texto estático oculto (SEO). */
const ROTATING = [
  'tu prospección',
  'tu CRM',
  'tu seguimiento de leads',
  'tu cobranza',
  'tu soporte',
  'tu inventario',
  'tus reportes',
  'tu facturación',
];

const WORDMARK_LETTERS = ['o', 'i', 't', 'o'];

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLElement>('[data-letter]');
      const items = gsap.utils.toArray<HTMLElement>('[data-anim]');
      const tagline = root.current?.querySelector<HTMLElement>('[data-tagline]') ?? null;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce || !isLoaded) {
        gsap.set([...letters, ...items], { opacity: 1, y: 0 });
        if (tagline) tagline.removeAttribute('data-collapsed');
        return;
      }

      gsap.set(letters, { opacity: 0, y: 34 });
      gsap.set(items, { opacity: 0, y: 24 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        /* Letras del wordmark, una a una */
        .to(letters, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 })
        /* El tagline aparece expandiendo su letter-spacing (via atributo + transición CSS) */
        .call(() => tagline?.removeAttribute('data-collapsed'), [], '-=0.3')
        .to(items[0], { opacity: 1, y: 0, duration: 0.6 }, '-=0.1')
        .to(items.slice(1), { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.3');
    },
    { scope: root, dependencies: [isLoaded] },
  );

  return (
    <section id="hero" className={styles.hero} ref={root}>
      <div className={styles.inner}>
        <h1 className={styles.headline}>
          <span className={`${styles.wordmark} wordmark`} aria-label="oito">
            {WORDMARK_LETTERS.map((letter, i) => (
              <span key={i} data-letter aria-hidden="true" className={styles.letter}>
                {letter}
              </span>
            ))}
          </span>
          <span className={styles.tagline} data-tagline data-collapsed>
            lo hace por ti
          </span>
          {/* Keyword SEO dentro del H1 (deck v2 §1, variante B): Google lee
           * "oito lo hace por ti Automatización con IA para negocios en Venezuela". */}
          <span className={styles.kwLine} data-anim>
            Automatización con IA para negocios en Venezuela
          </span>
        </h1>

        <p className={styles.rotatingLine} data-anim>
          <span className={styles.rotatingFixed}>Hacemos </span>
          <TextType
            text={ROTATING}
            as="span"
            className={styles.rotating}
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={2000}
          />
          <span className={styles.srOnly}>{ROTATING.join(', ')}</span>
        </p>

        <p className={styles.subtitle} data-anim>
          Nos encargamos de lo repetitivo de tu negocio para que tú te enfoques en crecer.
        </p>

        <div className={styles.actions} data-anim>
          <Button variant="primary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={22} />
            Hablemos por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
