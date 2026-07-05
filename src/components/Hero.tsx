'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import TextType from './TextType';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './Hero.module.css';

const ROTATING = [
  'construye tu página web',
  'diseña tu app móvil',
  'crea tu sistema a medida',
  'automatiza tu facturación',
  'agiliza tu prospección',
  'ordena tu CRM',
  'gestiona tu inventario',
  'responde a tus clientes 24/7',
  'genera tus reportes',
];

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-anim]');
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce || !isLoaded) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 28 });
      tl.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(items[0], { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
        .to(items.slice(1), { opacity: 1, y: 0, duration: 0.7, stagger: 0.16 }, '-=0.35');
    },
    { scope: root, dependencies: [isLoaded] },
  );

  const skipIntro = () => {
    tl.current?.progress(1);
  };

  return (
    <section id="hero" className={styles.hero} ref={root}>
      <div className={styles.inner}>
        <h1 className={styles.headline} data-anim>
          <span className={`${styles.wordmark} wordmark`}>oito</span>
          <span className={styles.tagline}>lo hace por ti</span>
        </h1>

        <p className={styles.rotatingLine} data-anim>
          <TextType
            text={ROTATING}
            as="span"
            className={styles.rotating}
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={2000}
          />
        </p>

        <p className={styles.subtitle} data-anim>
          Tu equipo técnico que construye software y automatiza procesos.
        </p>

        <div className={styles.actions} data-anim>
          <Button variant="primary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={22} />
            Hablemos por WhatsApp
          </Button>
        </div>

        <button type="button" className={styles.skip} data-anim onClick={skipIntro}>
          saltar intro <ArrowDown size={15} />
        </button>
      </div>
    </section>
  );
}
