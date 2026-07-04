import {
  Inbox,
  Headset,
  Database,
  Boxes,
  ReceiptText,
  FileBarChart,
  Star,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './SolutionsGrid.module.css';

type Solution = { icon: LucideIcon; name: string; note: string };

/* Estimaciones de impacto POTENCIAL, no resultados medidos (disclaimer visible). */
const SOLUTIONS: Solution[] = [
  { icon: Inbox, name: 'Calificador de leads', note: 'hasta ~85% menos tiempo de triage' },
  { icon: Headset, name: 'Soporte 24/7', note: 'respuestas en segundos, 24/7' },
  { icon: Database, name: 'CRM al día', note: 'datos sincronizados sin tipeo manual' },
  { icon: Boxes, name: 'Control de stock', note: 'alertas antes de quedarte sin inventario' },
  { icon: ReceiptText, name: 'Cobranza', note: 'recordatorios automáticos de pago' },
  { icon: FileBarChart, name: 'Reportes', note: 'reportes listos sin armarlos a mano' },
  { icon: Star, name: 'Reseñas', note: 'pide y gestiona reseñas en automático' },
  { icon: FileText, name: 'Documentos', note: 'extrae datos de PDFs y adjuntos' },
];

export default function SolutionsGrid() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.eyebrow} style={{ transitionDelay: '0ms' }}>
            Soluciones
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Lo que la automatización puede hacer por ti
          </h2>
          <p className={styles.disclaimer} style={{ transitionDelay: '130ms' }}>
            Ejemplos de soluciones comunes. Las cifras son estimaciones de impacto potencial, no
            resultados garantizados.
          </p>
        </header>

        <ul className={styles.grid}>
          {SOLUTIONS.map(({ icon: Icon, name, note }, i) => (
            <li
              key={name}
              className={`glass ${styles.tile}`}
              style={{ transitionDelay: `${200 + i * 70}ms` }}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon size={24} strokeWidth={1.6} />
              </span>
              <h3 className={styles.name}>{name}</h3>
              <span className={styles.metric}>{note}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
