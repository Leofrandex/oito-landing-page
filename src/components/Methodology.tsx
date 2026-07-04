import { MessagesSquare, Blocks, TrendingUp, type LucideIcon } from 'lucide-react';
import Reveal from './ui/Reveal';
import LiveCounter from './LiveCounter';
import styles from './Methodology.module.css';

type Step = { icon: LucideIcon; title: string; description: string };

const STEPS: Step[] = [
  {
    icon: MessagesSquare,
    title: 'Contacto & Auditoría',
    description:
      'Hablamos por WhatsApp, entendemos tu negocio e identificamos dónde podemos ayudarte más.',
  },
  {
    icon: Blocks,
    title: 'Construcción & Implementación',
    description: 'Diseñamos y desarrollamos la solución a medida, integrándola con lo que ya usas.',
  },
  {
    icon: TrendingUp,
    title: 'Monitoreo & Mejora',
    description: 'Medimos, ajustamos y escalamos para que los resultados se mantengan en el tiempo.',
  },
];

export default function Methodology() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} style={{ transitionDelay: '0ms' }}>
            Metodología
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Metodología <span className="wordmark">oito</span>
          </h2>
        </header>

        <ol className={styles.steps}>
          <span className={styles.thread} aria-hidden="true" />
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className={styles.step}
              style={{ transitionDelay: `${220 + i * 140}ms` }}
            >
              <div className={styles.node}>
                <Icon size={26} strokeWidth={1.6} />
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{description}</p>
            </li>
          ))}
        </ol>

        <LiveCounter />
      </Reveal>
    </section>
  );
}
