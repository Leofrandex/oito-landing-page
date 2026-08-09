import type { ReactNode } from 'react';
import { HandCoins, ShieldCheck, Clock, type LucideIcon } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import Reveal from './ui/Reveal';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './FinalCTA.module.css';

type FinalCTAProps = {
  title?: ReactNode;
  lede?: string;
};

/* Cierre en dos tiempos (auditoría 2026-08-08, T7 + decisión del usuario
 * 2026-08-09). Antes esto eran DOS secciones oscuras seguidas y centradas:
 * <EasyStart> ("empezar es simple", con tres tarjetas de vidrio) y este CTA.
 * Decían lo mismo y sus dos titulares centrados competían entre sí.
 *
 * Ahora los tres motivos sostienen la petición en lugar de precederla: van a
 * la izquierda como lista, y el titular con el CTA a la derecha. Un titular,
 * un CTA, una familia de layout menos repetida.
 *
 * <EasyStart> queda desenlazado de la home pero se conserva en el repo. */
const REASONS: { icon: LucideIcon; text: string }[] = [
  { icon: HandCoins, text: 'La primera conversación no cuesta nada' },
  { icon: ShieldCheck, text: 'Sin compromiso ni letra chica' },
  { icon: Clock, text: 'Te respondemos rápido y en español' },
];

export default function FinalCTA({
  title = <>¿Listo para que la IA trabaje por ti?</>,
  lede = 'Cuéntanos qué proceso te quita horas. Te respondemos por WhatsApp, sin compromiso.',
}: FinalCTAProps = {}) {
  return (
    <section className={`section-dark cv-auto ${styles.section}`}>
      <Reveal className={styles.inner}>
        <ul className={styles.reasons} role="list">
          {REASONS.map(({ icon: Icon, text }, i) => (
            <li
              key={text}
              className={styles.reason}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className={styles.reasonIcon} aria-hidden="true">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              {text}
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <h2 className={styles.title} style={{ transitionDelay: '60ms' }}>
            {title}
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '120ms' }}>
            {lede}
          </p>
          <div className={styles.actions} style={{ transitionDelay: '180ms' }}>
            <Button variant="primary" external href={WHATSAPP_URL}>
              <WhatsAppIcon size={24} />
              Hablemos por WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
