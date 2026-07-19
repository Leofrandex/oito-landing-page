'use client';

import { useState } from 'react';
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

type Solution = { icon: LucideIcon; name: string; note: string; detail: string };

/* Estimaciones de impacto POTENCIAL, no resultados medidos (disclaimer visible). */
const SOLUTIONS: Solution[] = [
  {
    icon: Inbox,
    name: 'Calificador de leads',
    note: 'hasta ~85% menos tiempo de triage',
    detail:
      'Cada consulta entra, se clasifica y se responde sola: tu equipo solo atiende a los que ya quieren comprar.',
  },
  {
    icon: Headset,
    name: 'Soporte 24/7',
    note: 'respuestas en segundos, 24/7',
    detail:
      'Un asistente que responde las preguntas frecuentes de tus clientes a cualquier hora, y escala a un humano cuando hace falta.',
  },
  {
    icon: Database,
    name: 'CRM al día',
    note: 'datos sincronizados sin tipeo manual',
    detail:
      'Cada contacto, nota y venta queda registrado en tu CRM en automático, sin copiar y pegar entre sistemas.',
  },
  {
    icon: Boxes,
    name: 'Control de stock',
    note: 'alertas antes de quedarte sin inventario',
    detail:
      'El inventario se vigila solo: cuando un producto llega a su mínimo, te avisa o dispara la orden de compra.',
  },
  {
    icon: ReceiptText,
    name: 'Cobranza',
    note: 'recordatorios automáticos de pago',
    detail:
      'Las facturas vencidas se persiguen solas: recordatorios oportunos por WhatsApp o correo hasta que se pagan.',
  },
  {
    icon: FileBarChart,
    name: 'Reportes',
    note: 'reportes listos sin armarlos a mano',
    detail:
      'Los números de tu negocio llegan armados y a tiempo: ventas, operación o lo que midas, sin abrir una hoja de cálculo.',
  },
  {
    icon: Star,
    name: 'Reseñas',
    note: 'pide y gestiona reseñas en automático',
    detail:
      'Después de cada venta o servicio, el sistema pide la reseña por ti y te avisa cuando llega una negativa.',
  },
  {
    icon: FileText,
    name: 'Documentos',
    note: 'extrae datos de PDFs y adjuntos',
    detail:
      'Facturas, órdenes y documentos dejan de digitarse: la IA extrae los datos y los mete donde van.',
  },
];

const ROW_A = SOLUTIONS.slice(0, 4);
const ROW_B = SOLUTIONS.slice(4);

type MarqueeRowProps = {
  items: Solution[];
  reverse?: boolean;
  activeName: string;
  onPick: (name: string) => void;
};

function MarqueeRow({ items, reverse, activeName, onPick }: MarqueeRowProps) {
  /* El contenido se duplica para el loop continuo; la copia es decorativa. */
  const pills = (hidden: boolean) => (
    <div className={styles.rowHalf} aria-hidden={hidden || undefined}>
      {items.map(({ icon: Icon, name, note }) => (
        <button
          key={name}
          type="button"
          className={styles.pill}
          aria-pressed={!hidden && activeName === name ? true : undefined}
          tabIndex={hidden ? -1 : undefined}
          onClick={() => onPick(name)}
        >
          <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
          <span>{name}</span>
          <span className={styles.pillNote}>{note}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={`${styles.row} ${reverse ? styles.rowReverse : ''}`}>
      <div className={styles.rowTrack}>
        {pills(false)}
        {pills(true)}
      </div>
    </div>
  );
}

export default function SolutionsGrid({ id }: { id?: string }) {
  const [activeName, setActiveName] = useState(SOLUTIONS[0].name);
  const active = SOLUTIONS.find((s) => s.name === activeName) ?? SOLUTIONS[0];
  const ActiveIcon = active.icon;

  return (
    <section id={id} className={`section-light anchor-target ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
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

        <div className={styles.marquee} style={{ transitionDelay: '200ms' }}>
          <MarqueeRow items={ROW_A} activeName={activeName} onPick={setActiveName} />
          <MarqueeRow items={ROW_B} reverse activeName={activeName} onPick={setActiveName} />
        </div>

        <div
          className={`glass-light ${styles.featured}`}
          style={{ transitionDelay: '280ms' }}
          aria-live="polite"
        >
          <span className={styles.featuredIcon} aria-hidden="true">
            <ActiveIcon size={22} strokeWidth={1.7} />
          </span>
          <div>
            <h3 className={styles.featuredName}>{active.name}</h3>
            <p className={styles.featuredDetail}>{active.detail}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
