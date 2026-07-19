import Reveal from './ui/Reveal';
import BeforeAfter from './BeforeAfter';
import styles from './WhyOito.module.css';

export default function WhyOito() {
  return (
    <>
      <section className={`section-light ${styles.section}`}>
        <div className={styles.glow} aria-hidden="true" />

        <Reveal className={styles.inner}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Por qué oito
          </p>

          <div className={styles.args}>
            <div className={styles.arg} style={{ transitionDelay: '80ms' }}>
              <h2 className={styles.argTitle}>
                El tiempo no se recupera, <span className={styles.accent}>los ingresos sí</span>
              </h2>
              <p className={styles.argBody}>
                La mayoría de los negocios están atrapados en procesos fragmentados y tareas
                manuales. Eso cuesta tiempo, y el tiempo es lo único que no vuelve.
              </p>
            </div>

            <div className={styles.arg} style={{ transitionDelay: '180ms' }}>
              <h2 className={styles.argTitle}>
                Tú enfócate en crecer.{' '}
                <span className={styles.accent}>De lo técnico nos encargamos nosotros</span>
              </h2>
              <p className={styles.argBody}>
                En <span className="wordmark">oito</span> construimos y automatizamos el motor
                invisible de tu negocio: el software que necesitas y los procesos que te quitan
                horas.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Signature moment: pinned scroll-scrub transition (caos → orden). */}
      <BeforeAfter />
    </>
  );
}
