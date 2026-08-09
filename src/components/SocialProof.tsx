import Reveal from './ui/Reveal';
import styles from './SocialProof.module.css';

/* Sectores REALES de los casos del copy deck (anonimizados, sin nombres de cliente).
 * Señales neutras verificables; sin métricas inventadas (CLAUDE.md / copy deck). */
const SECTORS = [
  'Ciberseguridad',
  'Logística',
  'Salud',
  'Farmacéutica',
  'Gestión de desechos',
  'Transporte B2B',
];

const SIGNALS = [
  { value: '6+', label: 'proyectos entregados' },
  { value: '6', label: 'sectores distintos' },
  { value: '24/7', label: 'operando en automático' },
  { value: '100%', label: 'remoto y en español' },
];

/* Reveal + transiciones CSS, el patrón de la casa. Antes esta era la única
 * sección de la página que usaba framer-motion, con su `easeOut` built-in
 * mientras el resto usa las curvas de globals.css (auditoría 2026-08-08, A14). */
export default function SocialProof() {
  return (
    <section className={`section-dark cv-auto ${styles.section}`}>
      <Reveal className={styles.container}>
        <h2 className={styles.title} style={{ transitionDelay: '0ms' }}>
          Negocios que ya dejaron que <span className={`${styles.mintText} wordmark`}>oito</span> lo
          haga por ellos
        </h2>

        {/* Franja 1: sectores reales atendidos */}
        <ul className={styles.sectors} role="list">
          {SECTORS.map((sector, i) => (
            <li
              key={sector}
              className={styles.sectorChip}
              style={{ transitionDelay: `${60 + i * 60}ms` }}
            >
              {sector}
            </li>
          ))}
        </ul>

        {/* La franja de 5 placeholders de logos se retiró en la auditoría
            2026-08-08 (hallazgo T4): un muro de logos vacío comunica "no
            tenemos clientes que mostrar", así que restaba credibilidad en vez
            de sumarla. Vuelve cuando haya logos reales con permiso. */}

        {/* Franja 2: señales neutras */}
        <dl className={styles.signals}>
          {SIGNALS.map(({ value, label }, i) => (
            <div
              key={label}
              className={styles.signal}
              style={{ transitionDelay: `${60 + i * 60}ms` }}
            >
              <dt className={styles.signalLabel}>{label}</dt>
              <dd className={styles.signalValue}>{value}</dd>
            </div>
          ))}
        </dl>

        {/* TODO: slot de testimonio (1) cuando haya permiso del cliente */}
      </Reveal>
    </section>
  );
}
