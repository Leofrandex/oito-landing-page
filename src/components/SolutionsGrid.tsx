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
import Button from './ui/Button';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './SolutionsGrid.module.css';

type Solution = { icon: LucideIcon; name: string; note: string };

/* Estimaciones de impacto POTENCIAL, no resultados medidos (disclaimer visible). */
const SOLUTIONS: Solution[] = [
  { icon: Inbox, name: 'Calificador de leads', note: 'hasta ~85% menos tiempo de triage' },
  { icon: Headset, name: 'Soporte 24/7', note: 'respuestas al instante, a cualquier hora' },
  { icon: Database, name: 'CRM al día', note: 'datos sincronizados sin tipeo manual' },
  { icon: Boxes, name: 'Control de stock', note: 'alertas antes de quedarte sin inventario' },
  { icon: ReceiptText, name: 'Cobranza', note: 'recordatorios automáticos de pago' },
  { icon: FileBarChart, name: 'Reportes', note: 'listos cada mañana sin armarlos a mano' },
  { icon: Star, name: 'Reseñas', note: 'pide y gestiona reseñas en automático' },
  { icon: FileText, name: 'Documentos', note: 'extrae datos de PDFs y adjuntos' },
];

export default function SolutionsGrid({ id }: { id?: string }) {
  return (
    <section id={id} className={`section-light anchor-target ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Soluciones
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '60ms' }}>
            Lo que la automatización puede hacer por ti
          </h2>
          <p className={styles.disclaimer} style={{ transitionDelay: '120ms' }}>
            Ejemplos de soluciones comunes para tu operación.
          </p>
        </header>

        <ul className={styles.pills} style={{ transitionDelay: '180ms' }} role="list">
          {SOLUTIONS.map(({ icon: Icon, name, note }) => (
            <li key={name} className={styles.pill}>
              <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
              <span>{name}</span>
              <span className={styles.pillNote}>{note}</span>
            </li>
          ))}
        </ul>

        <div className={styles.pregunta} style={{ transitionDelay: '240ms' }}>
          <h3 className={styles.preguntaTitle}>
            ¿Cuál le quitaría más <span className={styles.kw}>trabajo</span> a tu equipo?
          </h3>
          <Button variant="secondary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={18} />
            Hablemos por WhatsApp
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
