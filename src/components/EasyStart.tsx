import { HandCoins, ShieldCheck, Clock, type LucideIcon } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './EasyStart.module.css';

/* Rampa emocional pre-CTA: desdramatiza el primer paso. SIN botón — el CTA vive
 * en <FinalCTA> justo después (ambas oscuras, sin divisor, cierre continuo). */
const POINTS: { icon: LucideIcon; text: string }[] = [
  { icon: HandCoins, text: 'La primera conversación no cuesta nada' },
  { icon: ShieldCheck, text: 'Sin compromiso ni letra chica' },
  { icon: Clock, text: 'Te respondemos rápido y en español' },
];

export default function EasyStart() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
          El primer paso
        </p>
        <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
          Empezar es más simple de lo que crees
        </h2>
        <p className={styles.lede} style={{ transitionDelay: '140ms' }}>
          No necesitas tener todo claro ni un documento perfecto. Nos escribes, nos cuentas en qué
          andas, y desde ahí lo resolvemos contigo.
        </p>

        <ul className={styles.points}>
          {POINTS.map(({ icon: Icon, text }, i) => (
            <li
              key={text}
              className={`glass ${styles.point}`}
              style={{ transitionDelay: `${220 + i * 90}ms` }}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon size={22} strokeWidth={1.7} />
              </span>
              <span className={styles.pointText}>{text}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
