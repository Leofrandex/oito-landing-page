import Reveal from './ui/Reveal';
import styles from './DevProcess.module.css';

const STEPS: { n: string; title: string; body: string }[] = [
  { n: '1', title: 'Descubrimiento', body: 'Entendemos qué necesitas y para quién.' },
  { n: '2', title: 'Diseño', body: 'Definimos la experiencia y la interfaz antes de programar.' },
  { n: '3', title: 'Desarrollo', body: 'Construimos con tecnología moderna, en entregas claras.' },
  { n: '4', title: 'Entrega & soporte', body: 'Lanzamos, medimos y te acompañamos.' },
];

export default function DevProcess() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Cómo trabajamos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            De la idea al producto
          </h2>
        </header>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.n} className={styles.step} style={{ transitionDelay: `${180 + i * 110}ms` }}>
              <span className={styles.node} aria-hidden="true">{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
