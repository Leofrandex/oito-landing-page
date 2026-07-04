import styles from './CaseDiagrams.module.css';

/* Each diagram depicts, in the oito node+thread language, the actual system built
 * for that case — used as the case-card media until real screenshots are authorized. */

const VB = '0 0 220 150';

/** Field-tracking app: a GPS route with stops. */
export function RouteDiagram() {
  return (
    <svg className={styles.svg} viewBox={VB} fill="none" aria-hidden="true">
      <path className={styles.route} d="M26 124 C 52 78, 70 60, 86 52 S 126 96, 146 94 S 184 50, 194 40" />
      <circle className={styles.node} cx="26" cy="124" r="7" />
      <circle className={styles.nodeSoft} cx="86" cy="52" r="6" />
      <circle className={`${styles.glow} ${styles.pulse}`} cx="146" cy="94" r="7" />
      <circle className={styles.node} cx="194" cy="40" r="7" />
    </svg>
  );
}

/** Waste traceability: a chain of checkpoints ending in a regulatory report. */
export function ChainDiagram() {
  const xs = [30, 88, 146];
  return (
    <svg className={styles.svg} viewBox={VB} fill="none" aria-hidden="true">
      <path className={styles.thread} d="M30 75 H186" />
      {xs.map((x, i) => (
        <g key={x}>
          <circle className={i === 1 ? `${styles.glow} ${styles.pulse}` : styles.node} cx={x} cy="75" r="8" />
          <path className={styles.mark} d={`M${x - 3} 75 l2.5 2.5 l4 -5`} />
        </g>
      ))}
      {/* report document */}
      <rect className={styles.box} x="176" y="62" width="26" height="32" rx="4" />
      <path className={styles.thread} d="M182 72 H196 M182 79 H196 M182 86 H192" strokeWidth="1.6" />
    </svg>
  );
}

/** Lead qualification: multichannel inputs converge into an AI node, then to CRM. */
export function FunnelDiagram() {
  return (
    <svg className={styles.svg} viewBox={VB} fill="none" aria-hidden="true">
      <path className={styles.thread} d="M30 38 C 70 38, 84 75, 116 75" />
      <path className={styles.thread} d="M30 75 H116" />
      <path className={styles.thread} d="M30 112 C 70 112, 84 75, 116 75" />
      <path className={styles.thread} d="M124 75 H178" />
      <circle className={styles.nodeSoft} cx="30" cy="38" r="6" />
      <circle className={styles.nodeSoft} cx="30" cy="75" r="6" />
      <circle className={styles.nodeSoft} cx="30" cy="112" r="6" />
      <circle className={`${styles.glow} ${styles.pulse}`} cx="120" cy="75" r="11" />
      <rect className={styles.box} x="180" y="64" width="22" height="22" rx="5" />
    </svg>
  );
}

/** Sales sequences: one source fans out to many personalized recipients. */
export function FanoutDiagram() {
  return (
    <svg className={styles.svg} viewBox={VB} fill="none" aria-hidden="true">
      <path className={styles.thread} d="M44 75 H104" />
      <path className={styles.thread} d="M104 75 C 150 75, 150 36, 188 36" />
      <path className={styles.thread} d="M104 75 H188" />
      <path className={styles.thread} d="M104 75 C 150 75, 150 114, 188 114" />
      <rect className={styles.box} x="20" y="62" width="26" height="26" rx="5" />
      <path className={styles.thread} d="M22 66 L33 76 L44 66" strokeWidth="1.8" />
      <circle className={`${styles.glow} ${styles.pulse}`} cx="104" cy="75" r="8" />
      <circle className={styles.node} cx="188" cy="36" r="6" />
      <circle className={styles.node} cx="188" cy="75" r="6" />
      <circle className={styles.node} cx="188" cy="114" r="6" />
    </svg>
  );
}

/** Prospección outbound: buscar → investigar con IA → puntuar 0-100 → cold email. */
export function ProspectDiagram() {
  return (
    <svg className={styles.svg} viewBox="0 0 220 150" fill="none" aria-hidden="true">
      <path className={styles.thread} d="M44 75 H101" />
      <path className={styles.thread} d="M123 75 H150" />
      {/* origen: búsqueda */}
      <circle className={styles.box} cx="30" cy="75" r="13" />
      <path className={styles.thread} d="M35 80 L43 88" strokeWidth="2" />
      {/* nodo IA central (investiga) */}
      <circle className={`${styles.glow} ${styles.pulse}`} cx="112" cy="75" r="11" />
      {/* medidor de score 0-100 (arco) */}
      <path className={styles.thread} d="M152 96 A 22 22 0 0 1 196 96" strokeWidth="3" />
      <circle className={styles.node} cx="174" cy="73" r="4" />
      {/* salida: cold email */}
      <rect className={styles.box} x="163" y="34" width="24" height="18" rx="3" />
      <path className={styles.thread} d="M165 37 L175 45 L185 37" strokeWidth="1.6" />
      <path className={styles.thread} d="M139 66 L160 50" />
    </svg>
  );
}
