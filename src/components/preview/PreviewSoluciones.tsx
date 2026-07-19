'use client';

import { useEffect, useRef, useState } from 'react';
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
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { WHATSAPP_URL } from '@/lib/constants';
import sg from '@/components/SolutionsGrid.module.css';
import styles from './PreviewSoluciones.module.css';

type Variant = 'flujo' | 'chat' | 'cta';

type Solution = { icon: LucideIcon; name: string; note: string; detail: string };

/* Copy real de SolutionsGrid (las 8 soluciones y sus notas). */
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

/* Marquesina REAL: mismos estilos y keyframe de SolutionsGrid (reuso directo). */
function MarqueeRow({ items, reverse, activeName, onPick }: MarqueeRowProps) {
  const pills = (hidden: boolean) => (
    <div className={sg.rowHalf} aria-hidden={hidden || undefined}>
      {items.map(({ icon: Icon, name, note }) => (
        <button
          key={name}
          type="button"
          className={sg.pill}
          aria-pressed={!hidden && activeName === name ? true : undefined}
          tabIndex={hidden ? -1 : undefined}
          onClick={() => onPick(name)}
        >
          <Icon size={15} strokeWidth={1.8} aria-hidden="true" />
          <span>{name}</span>
          <span className={sg.pillNote}>{note}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className={`${sg.row} ${reverse ? sg.rowReverse : ''}`}>
      <div className={sg.rowTrack}>
        {pills(false)}
        {pills(true)}
      </div>
    </div>
  );
}

export default function PreviewSoluciones({ variant }: { variant: Variant }) {
  const container = useRef<HTMLDivElement>(null);
  const [activeName, setActiveName] = useState(SOLUTIONS[0].name);
  const active = SOLUTIONS.find((s) => s.name === activeName) ?? SOLUTIONS[0];
  const ActiveIcon = active.icon;

  /* La solución activa rota cada ~4s (como hoy). */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setActiveName((cur) => {
        const i = SOLUTIONS.findIndex((s) => s.name === cur);
        return SOLUTIONS[(i + 1) % SOLUTIONS.length].name;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  /* Animaciones del destacado (flujo: pulso viajando; chat: burbujas en loop). */
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = container.current;
      if (!root) return;

      if (variant === 'flujo') {
        const flow = root.querySelector<HTMLElement>('[data-flow]');
        const pulse = root.querySelector<HTMLElement>('[data-flow-pulse]');
        if (flow && pulse) {
          const travel = Math.max(flow.clientWidth - 16, 60);
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
          tl.set(pulse, { x: 4, opacity: 0 })
            .to(pulse, { opacity: 1, duration: 0.2 })
            .to(pulse, { x: travel, duration: 1.5, ease: 'power1.inOut' })
            .to(pulse, { opacity: 0, duration: 0.2 });
        }
      }

      if (variant === 'chat') {
        const bubbles = gsap.utils.toArray<HTMLElement>('[data-bubble]');
        gsap.fromTo(
          bubbles,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.35 },
        );
      }
    },
    { scope: container, dependencies: [variant, activeName] },
  );

  return (
    <section className={`section-light ${styles.section}`} ref={container}>
      <div className={sg.inner} data-revealed>
        <header className={styles.head}>
          <p className="badge">Soluciones</p>
          <h2 className={styles.title}>Lo que la automatización puede hacer por ti</h2>
          <p className={styles.disclaimer}>
            Ejemplos de soluciones comunes. Las cifras son estimaciones de impacto potencial, no
            resultados garantizados.
          </p>
        </header>

        <div className={sg.marquee}>
          <MarqueeRow items={ROW_A} activeName={activeName} onPick={setActiveName} />
          <MarqueeRow items={ROW_B} reverse activeName={activeName} onPick={setActiveName} />
        </div>

        {/* ===== Destacado (alternativas de la ronda 2) ===== */}
        {variant === 'flujo' && (
          <div className={`glass-light ${styles.featured} ${styles.featuredFlow}`} aria-live="polite">
            <div className={styles.featuredMain}>
              <span className={styles.featuredIcon} aria-hidden="true">
                <ActiveIcon size={22} strokeWidth={1.7} />
              </span>
              <div>
                <h3 className={styles.featuredName}>{active.name}</h3>
                <p className={styles.featuredDetail}>{active.detail}</p>
              </div>
            </div>
            <div className={styles.flow} data-flow aria-hidden="true">
              <span className={styles.flowNode}>Entrada</span>
              <span className={styles.flowThread} />
              <span className={`${styles.flowNode} ${styles.flowCore}`}>
                <span className="wordmark">oito</span>
              </span>
              <span className={styles.flowThread} />
              <span className={styles.flowNode}>Resultado</span>
              <span className={styles.flowPulse} data-flow-pulse />
            </div>
          </div>
        )}

        {variant === 'chat' && (
          <div className={`glass-light ${styles.featured} ${styles.featuredChat}`} aria-live="polite">
            <div className={styles.featuredMain}>
              <span className={styles.featuredIcon} aria-hidden="true">
                <ActiveIcon size={22} strokeWidth={1.7} />
              </span>
              <div>
                <h3 className={styles.featuredName}>{active.name}</h3>
                <p className={styles.featuredDetail}>{active.detail}</p>
              </div>
            </div>
            <div className={styles.chat} aria-hidden="true">
              <div className={`${styles.bubble} ${styles.bubbleIn}`} data-bubble>
                Hola, ¿me ayudan con {active.name.toLowerCase()}?
              </div>
              <div className={`${styles.bubble} ${styles.bubbleOut}`} data-bubble>
                Claro, lo dejamos funcionando en automático.
              </div>
              <div className={`${styles.bubble} ${styles.bubbleOut}`} data-bubble>
                ¿Te lo automatizamos? 🚀
              </div>
            </div>
          </div>
        )}

        {variant === 'cta' && (
          <div className={`glass-light ${styles.featured} ${styles.featuredCta}`} aria-live="polite">
            <span className={styles.featuredIcon} aria-hidden="true">
              <ActiveIcon size={22} strokeWidth={1.7} />
            </span>
            <div className={styles.featuredCtaBody}>
              <h3 className={styles.featuredName}>{active.name}</h3>
              <p className={styles.featuredDetail}>{active.detail}</p>
            </div>
            <a
              className={styles.ctaBtn}
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, me interesa: ${active.name}`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Automatiza esto →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
