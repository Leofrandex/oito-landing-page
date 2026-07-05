'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import WhatsAppIcon from './WhatsAppIcon';
import TextType from './TextType';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './ServiceHero.module.css';

type ServiceHeroProps = { title: ReactNode; subtitle: string; rotating: string[] };

export default function ServiceHero({ title, subtitle, rotating }: ServiceHeroProps) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-anim]');
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(items, { opacity: 0, y: 28 });
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 });
    },
    { scope: root },
  );

  return (
    <section className={`section-dark ${styles.hero}`} ref={root}>
      <div className={styles.inner}>
        <h1 className={styles.title} data-anim>
          {title}
        </h1>
        <p className={styles.rotatingLine} data-anim>
          automatiza{' '}
          <TextType text={rotating} as="span" className={styles.rotating} typingSpeed={50} deletingSpeed={30} pauseDuration={1800} />
        </p>
        <p className={styles.subtitle} data-anim>
          {subtitle}
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
