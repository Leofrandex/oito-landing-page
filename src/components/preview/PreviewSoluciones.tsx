'use client';

import { useState } from 'react';
import { Inbox, Headset, Database, Boxes, ReceiptText, type LucideIcon } from 'lucide-react';
import styles from './PreviewSoluciones.module.css';

type Variant = 'popover' | 'expandir' | 'sindetalle';

type Solution = { icon: LucideIcon; name: string; note: string; detail: string };

/* Copy real de SolutionsGrid (primeras 5 soluciones). */
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
];

export default function PreviewSoluciones({ variant }: { variant: Variant }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className={`section-light ${styles.section}`}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className="badge">Soluciones</p>
          <h2 className={styles.title}>Lo que la automatización puede hacer por ti</h2>
        </header>

        {variant === 'popover' && (
          <div className={styles.rowWrap}>
            {SOLUTIONS.map(({ icon: Icon, name, note, detail }) => (
              <div
                key={name}
                className={styles.pillAnchor}
                onMouseEnter={() => setActive(name)}
                onMouseLeave={() => setActive((cur) => (cur === name ? null : cur))}
              >
                <button
                  type="button"
                  className={styles.pill}
                  aria-pressed={active === name || undefined}
                  onClick={() => setActive((cur) => (cur === name ? null : name))}
                >
                  <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                  <span>{name}</span>
                  <span className={styles.pillNote}>{note}</span>
                </button>
                {active === name && (
                  <div className={styles.popover} role="tooltip">
                    <p className={styles.popoverName}>{name}</p>
                    <p className={styles.popoverDetail}>{detail}</p>
                    <span className={styles.popoverArrow} aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {variant === 'expandir' && (
          <div className={`${styles.rowWrap} ${styles.rowExpand}`}>
            {SOLUTIONS.map(({ icon: Icon, name, note, detail }) => {
              const open = active === name;
              return (
                <button
                  key={name}
                  type="button"
                  className={`${styles.pill} ${styles.pillExpandable}`}
                  aria-expanded={open}
                  onClick={() => setActive((cur) => (cur === name ? null : name))}
                >
                  <span className={styles.pillHeadRow}>
                    <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>{name}</span>
                    <span className={styles.pillNote}>{note}</span>
                  </span>
                  <span className={styles.expandDetail}>{detail}</span>
                </button>
              );
            })}
          </div>
        )}

        {variant === 'sindetalle' && (
          <div className={styles.rowWrap}>
            {SOLUTIONS.map(({ icon: Icon, name, note }) => (
              <button key={name} type="button" className={styles.pill}>
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{name}</span>
                <span className={styles.pillNote}>{note}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
