# Experiencia inmersiva v3 — Fase B: Secciones medias

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir los 4 patrones de sección aprobados en el spec para las secciones medias: pilares como circuito conectado, soluciones como marquesina viva con destacado, prueba social con sectores + señales, y la sección nueva del puente a desarrollo web.

**Architecture:** Cada task rediseña UN componente montado en `/` (o crea uno nuevo) siguiendo el patrón de la casa: componente server con `Reveal` (que marca `data-revealed`) + CSS Modules; interactividad puntual con `'use client'` solo donde hace falta (marquesina). Animaciones solo con transform/opacity, loops en CSS, y fallback estático con `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, lucide-react. Verificación: `npm run lint` + `npm run build` + revisión visual.

**Spec:** `docs/superpowers/specs/2026-07-19-experiencia-inmersiva-design.md` (§3.3, §3.5, §3.8, §3.9, §4, §5)

## Global Constraints

- Copy en español, tuteo, **sin em dash (`—`)**; cifras solo como potencial; contacto solo WhatsApp (`WHATSAPP_URL`).
- **No inventar datos:** sectores y señales de prueba social salen de los casos reales del copy deck; sin logos ni testimonios de clientes.
- `docs/design-system.md` manda en valores visuales: mint `#09bc8a` = `var(--mint)`, oscuro base = tokens existentes, `.glass` (oscuro) / `.glass-light` (claro), `.badge` para eyebrows.
- **Reduced motion obligatorio:** todo loop/marquee/pulso tiene fallback estático digno.
- Animar solo `transform`/`opacity` (los pulsos SVG usan `stroke-dashoffset`, aceptado por ser SVG ligero).
- Ritmo de color del spec §4: Pilares OSCURO, Soluciones CLARO, Prueba social OSCURO, Puente dev CLARO.
- Los componentes siguen siendo hermanos directos dentro de `<main>` (la costura de tono depende de adyacencia CSS): el ancla va en la sección misma vía prop `id` (patrón del fix `5020b5f`).
- Cada task termina con `npm run lint && npm run build` en verde y un commit.

---

### Task 1: AutomationPillars como circuito conectado

**Files:**
- Modify: `src/components/AutomationPillars.tsx` (reemplazo completo)
- Modify: `src/components/AutomationPillars.module.css` (reemplazo completo)

**Interfaces:**
- Consumes: `Reveal` (`src/components/ui/Reveal.tsx`, marca `data-revealed` en su div), clases globales `section-dark`, `badge`, `glass`, tokens `--mint`, `--forest-deep`, `--on-dark`, `--on-dark-soft`.
- Produces: mismo default export `AutomationPillars()` sin props; el copy de los 3 pilares NO cambia.

- [ ] **Step 1: Reemplazar `src/components/AutomationPillars.tsx`**

```tsx
import { Zap, Workflow, BotMessageSquare } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './AutomationPillars.module.css';

const PILLARS = [
  {
    icon: Zap,
    title: 'Productividad',
    desc: 'Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio.',
    pos: 'n1' as const,
  },
  {
    icon: Workflow,
    title: 'Integración',
    desc: 'Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella.',
    pos: 'n2' as const,
  },
  {
    icon: BotMessageSquare,
    title: 'IA Agéntica',
    desc: 'Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma.',
    pos: 'n3' as const,
  },
];

/* Circuito conectado (spec 2026-07-19 §3.3): los 3 pilares como nodos glass de un
 * mismo circuito, con pulsos de luz mint viajando por los cables SVG. Layout
 * triangular: Productividad y IA Agéntica arriba, Integración centro-abajo. */
export default function AutomationPillars() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Cómo lo logramos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '80ms' }}>
            Nos basamos en 3 pilares
          </h2>
        </header>

        <div className={styles.circuit}>
          <svg
            className={styles.wires}
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* n1 (arriba-izq) -> n2 (centro-abajo) */}
            <path className={styles.wire} d="M215,190 C300,320 380,380 500,395" />
            {/* n3 (arriba-der) -> n2 */}
            <path className={styles.wire} d="M785,190 C700,320 620,380 500,395" />
            {/* n1 -> n3 (arco superior) */}
            <path className={styles.wire} d="M240,120 C420,40 580,40 760,120" />
            <path className={`${styles.pulse} ${styles.p1}`} d="M215,190 C300,320 380,380 500,395" />
            <path className={`${styles.pulse} ${styles.p2}`} d="M785,190 C700,320 620,380 500,395" />
            <path className={`${styles.pulse} ${styles.p3}`} d="M240,120 C420,40 580,40 760,120" />
          </svg>

          <ul className={styles.nodes} role="list">
            {PILLARS.map(({ icon: Icon, title, desc, pos }) => (
              <li key={title} className={`glass ${styles.node} ${styles[pos]}`}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <h3 className={styles.nodeTitle}>{title}</h3>
                <p className={styles.nodeDesc}>{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar `src/components/AutomationPillars.module.css`**

Conservar tal cual del archivo actual: el bloque `.section` (padding), `.section::before` (glow local), `.inner`, `.head`, `.title` y el bloque de scroll-reveal de `.eyebrow`/`.title`. Eliminar `.grid`, `.card`, `.cardTitle`, `.cardDesc` y su responsive. Añadir:

```css
/* ===== Circuito ===== */
.circuit {
  position: relative;
  min-height: 520px;
}

.wires {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.wire {
  fill: none;
  stroke: rgba(9, 188, 138, 0.22);
  stroke-width: 1.5;
}

.pulse {
  fill: none;
  stroke: var(--mint);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 40 900;
  stroke-dashoffset: 940;
  filter: drop-shadow(0 0 5px rgba(9, 188, 138, 0.8));
  opacity: 0;
}

.inner[data-revealed] .p1 { animation: pulse-travel 4.5s linear infinite; }
.inner[data-revealed] .p2 { animation: pulse-travel 4.5s linear infinite 1.5s; }
.inner[data-revealed] .p3 { animation: pulse-travel 4.5s linear infinite 3s; }

@keyframes pulse-travel {
  0% { stroke-dashoffset: 940; opacity: 0; }
  4% { opacity: 1; }
  30% { opacity: 1; }
  33% { stroke-dashoffset: 0; opacity: 0; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

/* ===== Nodos ===== */
.nodes {
  list-style: none;
  position: relative;
  height: 100%;
  min-height: 520px;
}

.node {
  position: absolute;
  width: min(320px, 34%);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: clamp(1.4rem, 2.6vw, 2rem);
}

.n1 { left: 2%; top: 0; }
.n3 { right: 2%; top: 0; }
.n2 { left: 50%; transform: translateX(-50%); bottom: 0; }

/* Encendido secuencial sincronizado con la llegada de cada pulso (llega ~33% de 4.5s) */
.inner[data-revealed] .n2 { animation: node-glow 4.5s ease-in-out infinite 1.5s; }
.inner[data-revealed] .n3 { animation: node-glow 4.5s ease-in-out infinite 4.5s; }
.inner[data-revealed] .n1 { animation: node-glow 4.5s ease-in-out infinite 3s; }

@keyframes node-glow {
  0%, 28% { box-shadow: none; border-color: rgba(255, 255, 255, 0.14); }
  33%, 55% {
    box-shadow: 0 0 32px rgba(9, 188, 138, 0.35);
    border-color: rgba(9, 188, 138, 0.65);
  }
  70%, 100% { box-shadow: none; border-color: rgba(255, 255, 255, 0.14); }
}

.iconWrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  flex-shrink: 0;
  color: var(--mint);
  background: var(--forest-deep);
  border: 2px solid rgba(9, 188, 138, 0.5);
  box-shadow: 0 0 24px rgba(9, 188, 138, 0.22);
}

.nodeTitle {
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--on-dark);
  line-height: 1.15;
}

.nodeDesc {
  font-size: clamp(0.92rem, 1.7vw, 1rem);
  line-height: 1.6;
  color: var(--on-dark-soft);
}

/* Reveal de los nodos */
.node {
  opacity: 0;
  transition: opacity 0.65s ease;
}

.inner[data-revealed] .node {
  opacity: 1;
}

/* ===== Responsive: en movil el circuito se apila con linea vertical ===== */
@media (max-width: 760px) {
  .circuit { min-height: 0; }
  .wires { display: none; }

  .nodes {
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-left: 18px;
  }

  .nodes::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(9, 188, 138, 0.05),
      rgba(9, 188, 138, 0.4),
      rgba(9, 188, 138, 0.05)
    );
  }

  .node,
  .n1,
  .n2,
  .n3 {
    position: static;
    width: 100%;
    transform: none;
  }
}

/* ===== Reduced motion: nodos visibles y encendidos, sin pulsos ===== */
@media (prefers-reduced-motion: reduce) {
  .node { opacity: 1; transition: none; }

  .inner[data-revealed] .p1,
  .inner[data-revealed] .p2,
  .inner[data-revealed] .p3 { animation: none; }

  .inner[data-revealed] .n1,
  .inner[data-revealed] .n2,
  .inner[data-revealed] .n3 {
    animation: none;
    border-color: rgba(9, 188, 138, 0.45);
  }
}
```

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Revisión visual**

En `npm run dev`: desktop = triángulo (2 nodos arriba, Integración abajo-centro) con pulsos mint viajando y nodos encendiéndose al llegarles; móvil (≤760px) = nodos apilados con línea vertical, sin SVG. Con reduced-motion: nodos estáticos con borde mint.

- [ ] **Step 5: Commit**

```bash
git add src/components/AutomationPillars.tsx src/components/AutomationPillars.module.css
git commit -m "feat(pilares): circuito conectado con pulsos de luz (spec v3 3.3)"
```

---

### Task 2: SolutionsGrid como marquesina viva + destacado

**Files:**
- Modify: `src/components/SolutionsGrid.tsx` (reemplazo completo; pasa a `'use client'`)
- Modify: `src/components/SolutionsGrid.module.css` (reemplazo completo)

**Interfaces:**
- Consumes: prop `id?: string` (la página le pasa `id="soluciones"`, patrón del fix 5020b5f), clases `section-light`, `badge`, `glass-light`, `anchor-target`.
- Produces: mismo default export `SolutionsGrid({ id })`. **La sección pasa de `section-dark` a `section-light`** (ritmo del spec §4).

- [ ] **Step 1: Reemplazar `src/components/SolutionsGrid.tsx`**

```tsx
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
      'Los números de tu negocio llegan armados y a tiempo: ventas, operacion o lo que midas, sin abrir una hoja de cálculo.',
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
```

- [ ] **Step 2: Reemplazar `src/components/SolutionsGrid.module.css`**

Conservar del archivo actual los valores de `.section` (padding), `.inner` (max-width), `.head`, `.title` y `.disclaimer`, **cambiando cualquier color de texto pensado para fondo oscuro a los tokens de fondo claro** (título en tinta oscura, sin text-shadow). Eliminar `.grid`, `.tile`, `.iconWrap`, `.name`, `.metric`. Añadir:

```css
/* ===== Marquesina ===== */
.marquee {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 1.5rem;
  /* difumina los extremos del riel */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.row {
  overflow: hidden;
}

.rowTrack {
  display: flex;
  width: max-content;
}

.inner[data-revealed] .row .rowTrack {
  animation: marquee-left 32s linear infinite;
}

.inner[data-revealed] .rowReverse .rowTrack {
  animation-name: marquee-right;
}

.row:hover .rowTrack,
.row:focus-within .rowTrack {
  animation-play-state: paused;
}

@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

.rowHalf {
  display: flex;
  gap: 0.75rem;
  padding-right: 0.75rem;
}

/* ===== Pildoras ===== */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--ink, #04302a);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 67, 70, 0.14);
  box-shadow: 0 8px 18px -10px rgba(0, 67, 70, 0.18);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.pill:hover {
  border-color: rgba(9, 188, 138, 0.55);
  transform: translateY(-2px);
}

.pill[aria-pressed='true'] {
  border-color: rgba(9, 188, 138, 0.7);
  background: rgba(9, 188, 138, 0.1);
}

.pill svg { color: var(--mint); flex-shrink: 0; }

.pillNote {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--mint);
}

/* ===== Destacado ===== */
.featured {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 560px;
  margin: 0 auto;
  padding: 1.1rem 1.4rem;
}

.featuredIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
  color: var(--mint);
  background: rgba(9, 188, 138, 0.12);
  border: 1px solid rgba(9, 188, 138, 0.35);
}

.featuredName {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.featuredDetail {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--ink-soft, #5c6f69);
}

/* ===== Reveal ===== */
.eyebrow,
.title,
.disclaimer,
.marquee,
.featured {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.65s ease,
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.inner[data-revealed] .eyebrow,
.inner[data-revealed] .title,
.inner[data-revealed] .disclaimer,
.inner[data-revealed] .marquee,
.inner[data-revealed] .featured {
  opacity: 1;
  transform: none;
}

/* ===== Reduced motion: sin marquee, pildoras en grid envolvente ===== */
@media (prefers-reduced-motion: reduce) {
  .eyebrow, .title, .disclaimer, .marquee, .featured {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .inner[data-revealed] .row .rowTrack,
  .inner[data-revealed] .rowReverse .rowTrack {
    animation: none;
  }

  .marquee {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .rowTrack { width: auto; }

  .rowHalf { flex-wrap: wrap; justify-content: center; }

  /* ocultar la copia decorativa duplicada */
  .rowHalf[aria-hidden='true'] { display: none; }

  .pill { white-space: normal; }
}
```

Nota sobre tokens: si `--ink` / `--ink-soft` no existen en `globals.css`, usar los tokens equivalentes que el design-system defina para texto sobre claro (buscarlos en `globals.css`; los fallbacks hex de arriba son los valores correctos).

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Revisión visual**

En dev: sección ahora CLARA; dos filas de píldoras fluyendo en direcciones opuestas, pausan al hover; clic en una píldora la pone en la tarjeta destacada; con reduced-motion las píldoras quedan en grid estático sin duplicados visibles.

- [ ] **Step 5: Commit**

```bash
git add src/components/SolutionsGrid.tsx src/components/SolutionsGrid.module.css
git commit -m "feat(soluciones): marquesina viva con destacado sobre fondo claro (spec v3 3.5)"
```

---

### Task 3: SocialProof con sectores + señales (+ placeholders)

**Files:**
- Modify: `src/components/SocialProof.tsx` (reemplazo completo)
- Modify: `src/components/SocialProof.module.css` (añadir estilos; conservar los existentes de `.section`, `.container`, `.title`, `.logosGrid`, `.logoPlaceholder`, `.placeholderIcon`)

**Interfaces:**
- Consumes: clases `section-dark`, `badge`; framer-motion ya está en uso en este componente (se conserva).
- Produces: mismo default export `SocialProof()` sin props. BuiltWith NO se toca (sigue montado aparte en `page.tsx`).

- [ ] **Step 1: Reemplazar `src/components/SocialProof.tsx`**

```tsx
'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
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

export default function SocialProof() {
  const shouldReduceMotion = useReducedMotion();

  const placeholderCount = 5;
  const placeholders = Array.from({ length: placeholderCount }, (_, i) => i);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section className={`section-dark ${styles.section}`}>
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          Negocios que ya dejaron que <span className={`${styles.mintText} wordmark`}>oito</span> lo
          haga por ellos
        </motion.h2>

        {/* Franja 1: sectores reales atendidos */}
        <motion.ul
          className={styles.sectors}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          role="list"
        >
          {SECTORS.map((sector) => (
            <motion.li key={sector} className={styles.sectorChip} variants={itemVariants}>
              {sector}
            </motion.li>
          ))}
        </motion.ul>

        {/* Franja 2: placeholders de logos (se vuelven logos reales cuando haya permiso) */}
        <motion.div
          className={styles.logosGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {placeholders.map((idx) => (
            <motion.div
              key={idx}
              className={`glass glass-hover ${styles.logoPlaceholder}`}
              variants={itemVariants}
              aria-label={`Client logo placeholder ${idx + 1}`}
            >
              <div className={styles.placeholderIcon} aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>

        {/* Franja 3: señales neutras */}
        <motion.dl
          className={styles.signals}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {SIGNALS.map(({ value, label }) => (
            <motion.div key={label} className={styles.signal} variants={itemVariants}>
              <dt className={styles.signalLabel}>{label}</dt>
              <dd className={styles.signalValue}>{value}</dd>
            </motion.div>
          ))}
        </motion.dl>

        {/* TODO: slot de testimonio (1) cuando haya permiso del cliente */}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Añadir a `src/components/SocialProof.module.css`** (sin borrar lo existente)

```css
/* ===== Sectores reales ===== */
.sectors {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin: 1.75rem 0 2rem;
}

.sectorChip {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--on-dark-soft);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(9, 188, 138, 0.3);
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
}

/* ===== Señales neutras ===== */
.signals {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(1.5rem, 5vw, 3.5rem);
  margin-top: 2.25rem;
}

.signal {
  text-align: center;
}

.signalValue {
  font-size: clamp(1.6rem, 3.4vw, 2.1rem);
  font-weight: 600;
  color: var(--on-dark);
  font-variant-numeric: tabular-nums;
}

.signalLabel {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--on-dark-soft);
  order: 2;
}

.signal dt { order: 2; }
.signal dd { order: 1; }
```

Nota: `.signal` usa `display: flex; flex-direction: column;` implícito NO: añadirlo explícito:

```css
.signal {
  display: flex;
  flex-direction: column;
  text-align: center;
}
```

(el valor `dd` arriba, la etiqueta `dt` abajo, vía `order`).

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Revisión visual**

En dev: título → chips de 6 sectores → 5 placeholders glass → 4 señales numéricas. Stagger de entrada; con reduced-motion todo aparece sin desplazamiento.

- [ ] **Step 5: Commit**

```bash
git add src/components/SocialProof.tsx src/components/SocialProof.module.css
git commit -m "feat(prueba-social): sectores reales + placeholders + senales neutras (spec v3 3.8)"
```

---

### Task 4: Sección nueva DevBridge (puente a desarrollo web) + montaje

**Files:**
- Create: `src/components/DevBridge.tsx`
- Create: `src/components/DevBridge.module.css`
- Modify: `src/app/page.tsx` (montar entre `BuiltWith` y `Faq`)

**Interfaces:**
- Consumes: `Reveal`, `Button` (`src/components/ui/Button`, variantes `primary|secondary|tertiary`; usar `secondary` con `href` interno), clases `section-light`, `badge`.
- Produces: `DevBridge()` default export sin props, montado en `page.tsx` como sección 9 del spec.

- [ ] **Step 1: Crear `src/components/DevBridge.tsx`**

```tsx
import { ArrowRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import Button from '@/components/ui/Button';
import styles from './DevBridge.module.css';

/* Puente a desarrollo web (spec 2026-07-19 §3.9): tono "también hacemos",
 * jerarquía menor que los CTA de WhatsApp. El navegador de la derecha se
 * construye solo en loop (CSS puro). */
export default function DevBridge() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <div className={styles.copy}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            También hacemos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '80ms' }}>
            Tu página web, <span className={styles.accent}>construida por oito</span>
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '160ms' }}>
            El mismo estudio que automatiza tu operación puede construir la cara digital de tu
            negocio: rápida, moderna y hecha para vender.
          </p>
          <div className={styles.ctaWrap} style={{ transitionDelay: '240ms' }}>
            <Button variant="secondary" href="/desarrollo-web">
              Conoce desarrollo web
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className={styles.browser} style={{ transitionDelay: '200ms' }} aria-hidden="true">
          <div className={styles.browserBar}>
            <i /><i /><i />
          </div>
          <div className={styles.canvas}>
            <span className={`${styles.el} ${styles.e1}`} />
            <span className={`${styles.el} ${styles.e2}`} />
            <span className={`${styles.el} ${styles.e3}`} />
            <span className={`${styles.el} ${styles.e4}`} />
            <span className={`${styles.el} ${styles.e5}`} />
            <span className={`${styles.el} ${styles.e6}`} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

Nota: si `Button` no acepta children complejos con ícono o la variante `secondary` no admite `href` interno, revisar cómo lo hace otro consumidor existente (`FeaturedCases.tsx` usa `Button` con `href`) y seguir ese patrón exacto; si no hay precedente, usar `Link` de `next/link` con una clase local `.ghostCta` (borde mint 1.5px, radio 999px, texto mint oscuro).

- [ ] **Step 2: Crear `src/components/DevBridge.module.css`**

```css
.section {
  position: relative;
  padding: clamp(4rem, 8vw, 7rem) 1.5rem;
}

.inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.title {
  margin-top: 0.9rem;
  font-size: clamp(1.6rem, 3.6vw, 2.4rem);
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.accent {
  color: var(--mint);
}

.lede {
  margin-top: 0.9rem;
  font-size: clamp(0.98rem, 1.9vw, 1.1rem);
  line-height: 1.65;
  color: var(--ink-soft, #5c6f69);
  max-width: 46ch;
}

.ctaWrap {
  margin-top: 1.5rem;
}

/* ===== Navegador que se arma solo ===== */
.browser {
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(0, 67, 70, 0.14);
  box-shadow: 0 22px 48px -20px rgba(0, 67, 70, 0.3);
  overflow: hidden;
}

.browserBar {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 10px;
  background: #f1eee6;
  border-bottom: 1px solid rgba(0, 67, 70, 0.08);
}

.browserBar i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d8d3c4;
}

.canvas {
  position: relative;
  height: 250px;
}

.el {
  position: absolute;
  border-radius: 6px;
  opacity: 0;
}

.e1 { top: 22px; left: 18px; width: 38%; height: 16px; background: var(--forest-deep, #04302a); }
.e2 { top: 50px; left: 18px; width: 52%; height: 9px; background: #ddd8c9; }
.e3 { top: 66px; left: 18px; width: 44%; height: 9px; background: #ddd8c9; }
.e4 {
  top: 90px;
  left: 18px;
  width: 110px;
  height: 26px;
  border-radius: 999px;
  background: var(--mint);
}
.e5 {
  top: 22px;
  right: 18px;
  width: 34%;
  height: 130px;
  background: linear-gradient(140deg, rgba(9, 188, 138, 0.24), rgba(9, 188, 138, 0.07));
  border: 1px solid rgba(9, 188, 138, 0.3);
}
.e6 {
  bottom: 18px;
  left: 18px;
  right: 18px;
  height: 44px;
  background: #f4f1e9;
  border: 1px solid rgba(0, 67, 70, 0.08);
}

/* Los bloques aparecen en secuencia y el loop reinicia (solo cuando la sección ya se reveló) */
.inner[data-revealed] .e1 { animation: el-in 7s ease-out infinite; }
.inner[data-revealed] .e2 { animation: el-in 7s ease-out infinite 0.3s; }
.inner[data-revealed] .e3 { animation: el-in 7s ease-out infinite 0.55s; }
.inner[data-revealed] .e4 { animation: el-in 7s ease-out infinite 0.9s; }
.inner[data-revealed] .e5 { animation: el-in 7s ease-out infinite 1.25s; }
.inner[data-revealed] .e6 { animation: el-in 7s ease-out infinite 1.6s; }

@keyframes el-in {
  0% { opacity: 0; transform: translateY(10px); }
  6%, 88% { opacity: 1; transform: translateY(0); }
  96%, 100% { opacity: 0; transform: translateY(10px); }
}

/* ===== Reveal de entrada ===== */
.eyebrow,
.title,
.lede,
.ctaWrap,
.browser {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.65s ease,
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.inner[data-revealed] .eyebrow,
.inner[data-revealed] .title,
.inner[data-revealed] .lede,
.inner[data-revealed] .ctaWrap,
.inner[data-revealed] .browser {
  opacity: 1;
  transform: none;
}

/* ===== Responsive ===== */
@media (max-width: 820px) {
  .inner {
    grid-template-columns: 1fr;
  }

  .canvas { height: 210px; }
}

/* ===== Reduced motion: pagina "terminada", sin loop ===== */
@media (prefers-reduced-motion: reduce) {
  .eyebrow, .title, .lede, .ctaWrap, .browser {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .el { opacity: 1; }

  .inner[data-revealed] .e1,
  .inner[data-revealed] .e2,
  .inner[data-revealed] .e3,
  .inner[data-revealed] .e4,
  .inner[data-revealed] .e5,
  .inner[data-revealed] .e6 {
    animation: none;
  }
}
```

- [ ] **Step 3: Montar en `src/app/page.tsx`**

Añadir el import y montarlo entre `BuiltWith` y `Faq`:

```tsx
import DevBridge from '@/components/DevBridge';
```

```tsx
      <BuiltWith />
      <DevBridge />
      <Faq id="faq" />
```

- [ ] **Step 4: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 5: Revisión visual**

En dev: la sección aparece entre el carrusel de stack y la FAQ, en claro; el navegador arma la página en loop (bloques en secuencia + reinicio suave); el CTA lleva a `/desarrollo-web`; con reduced-motion la página del navegador aparece completa y estática.

- [ ] **Step 6: Commit**

```bash
git add src/components/DevBridge.tsx src/components/DevBridge.module.css src/app/page.tsx
git commit -m "feat(puente-dev): seccion nueva con navegador que se arma solo (spec v3 3.9)"
```

---

### Task 5: Verificación de fase, gate UX y ledger

**Files:**
- Modify: `.superpowers/sdd/progress.md` (bloque de la fase; NO se commitea, está gitignoreado)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: Fase B cerrada; base para Fase C (calculadora).

- [ ] **Step 1: Verificación completa**

Run: `npm run lint && npm run build`
Expected: sin errores; rutas `/` y `/desarrollo-web`.

- [ ] **Step 2: Recorrido visual completo (controlador, en navegador real)**

- Ritmo de tono resultante en `/`: verificar que las costuras entre secciones se dibujan en cada cambio claro/oscuro (soluciones ahora es clara).
- Pilares: pulsos y encendido; móvil apilado.
- Marquesina: flujo, pausa al hover, clic → destacado; teclado (tab a las píldoras, Enter selecciona).
- Prueba social: 3 franjas; señales sin datos inventados.
- Puente dev: loop del navegador, CTA a `/desarrollo-web`.
- Gate UX/diseño (CLAUDE.md §3): revisar estados de interacción, contraste, targets ≥44px y jerarquía de CTAs (el CTA del puente NO debe competir con los de WhatsApp); triar hallazgos contra el design-system.

- [ ] **Step 3: Registrar en el ledger**

Añadir al final de `.superpowers/sdd/progress.md` las líneas de cierre de la fase con los rangos de commits reales y los hallazgos del gate.

- [ ] **Step 4: Actualizar design-system si aplica**

Si el gate UX fijó valores nuevos (receta de píldora de marquesina, nodo de circuito), añadirlos a `docs/design-system.md` con fecha y commitear:

```bash
git add docs/design-system.md
git commit -m "docs(design-system): patrones de fase B (circuito, marquesina, senales)"
```

(Si no hubo valores nuevos que fijar, omitir este commit.)
