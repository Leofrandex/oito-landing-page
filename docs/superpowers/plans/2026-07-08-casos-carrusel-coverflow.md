# Carrusel Coverflow "Casos destacados" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el bloque de casos del home por un carrusel coverflow 3D interactivo (reactivo al mouse), reutilizable, sobre fondo claro con tarjetas `.glass-light`.

**Architecture:** Un componente presentacional `CaseCard` (tarjeta vertical) + una isla cliente `CasesCarousel` que maneja índice activo, drag, tilt, teclado, dots y flechas. `FeaturedCases` (server component) conserva header y CTAs y monta el carrusel. En desktop sin reduced-motion → coverflow 3D; en móvil o con reduced-motion → track horizontal scroll-snap con el mismo markup.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, CSS Modules, lucide-react. Sin framework de tests: la verificación de cada tarea es `npm run lint` + `npm run build` + verificación en navegador con `npm run dev`.

## Global Constraints

- Idioma de interacción con el usuario: **español**.
- **Sin em dash (`—`)** en ningún texto visible, `aria-label` o contenido renderizado (CLAUDE.md §3).
- Copy de casos, diagramas (`CaseDiagrams`) y los 2 CTAs **no cambian**.
- **`prefers-reduced-motion`**: sin 3D ni tilt; degradar a scroll-snap (obligatorio, design-system).
- **Contraste AA**: el mint `#09bc8a` NO se usa como texto/ícono sobre fondo claro (design-system §1.4). Pills/labels en tono oscuro.
- Superficie de tarjeta: clase global `.glass-light` (ya afinada 2026-07-08). No redefinir glass local.
- Efectos solo con `transform`/`opacity`/`filter`. Targets táctiles ≥ 24px.
- Variables CSS existentes: `--forest`, `--forest-deep`, `--mint`, `--ink-soft`.
- No fusionar a `main`. Trabajar en rama `oito-page-v5`.
- **No** hacer `git add -A`: el working tree tiene WIP del usuario. Cada commit añade solo los archivos de su tarea, por ruta explícita.

---

### Task 1: `CaseCard` — tarjeta vertical presentacional

**Files:**
- Create: `src/components/CaseCard.tsx`
- Create: `src/components/CaseCard.module.css`

**Interfaces:**
- Consumes: `CaseStudyData`, `Pillar` (tipos ya exportados por `src/components/CaseStudy.tsx`).
- Produces: `export default function CaseCard(props: CaseStudyData): JSX.Element` — tarjeta vertical (media dark arriba, cuerpo claro abajo), superficie `.glass-light`. Ancho fijo 320px.

- [ ] **Step 1: Crear `src/components/CaseCard.tsx`**

```tsx
import type { LucideIcon } from 'lucide-react';
import { Code2, Workflow } from 'lucide-react';
import type { CaseStudyData, Pillar } from './CaseStudy';
import styles from './CaseCard.module.css';

const PILLAR_ICON: Record<Pillar, LucideIcon> = {
  Desarrollo: Code2,
  Automatización: Workflow,
};

/** Tarjeta "de pie" (vertical) usada por el carrusel coverflow. Superficie = .glass-light.
 *  Reutiliza el tipo y los diagramas del caso editorial (CaseStudy). */
export default function CaseCard({ pillar, title, description, tags, diagram }: CaseStudyData) {
  const PillarIcon = PILLAR_ICON[pillar];
  return (
    <article className={`glass-light ${styles.card}`}>
      <div className={styles.media} aria-hidden="true">
        <span className={styles.mediaGrid} />
        <div className={styles.diagram}>{diagram}</div>
      </div>
      <div className={styles.body}>
        <span className={`${styles.pillar} ${styles[pillar === 'Desarrollo' ? 'dev' : 'auto']}`}>
          <PillarIcon size={15} strokeWidth={2} />
          {pillar}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <ul className={styles.tags}>
          {tags.map((t) => (
            <li key={t} className={styles.tag}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Crear `src/components/CaseCard.module.css`**

```css
.card {
  width: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Panel de media oscuro que porta el diagrama de sistema (mismo lenguaje que CaseStudy). */
.media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  padding: 1.25rem;
  background:
    radial-gradient(75% 80% at 50% 45%, rgba(9, 188, 138, 0.14), transparent 72%),
    var(--forest-deep);
}

.mediaGrid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(9, 188, 138, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(9, 188, 138, 0.1) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(75% 75% at 50% 50%, black, transparent 78%);
  -webkit-mask-image: radial-gradient(75% 75% at 50% 50%, black, transparent 78%);
}

.diagram {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 220px;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
  padding: 1.4rem 1.5rem 1.6rem;
}

.pillar {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.78rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.dev {
  background: rgba(0, 67, 70, 0.1);
  color: var(--forest);
}

.auto {
  background: rgba(9, 188, 138, 0.16);
  color: #066b4d;
}

.title {
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  color: var(--forest-deep);
}

.desc {
  font-size: 0.94rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.2rem;
  padding: 0;
}

.tag {
  padding: 0.3rem 0.68rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--ink-soft);
  background: rgba(20, 32, 31, 0.05);
  border: 1px solid rgba(20, 32, 31, 0.08);
}
```

- [ ] **Step 3: Verificar typecheck y lint**

Run: `npm run lint`
Expected: sin errores en `CaseCard.tsx`.

Nota: la verificación visual ocurre en la Task 3 (cuando el carrusel se monta en el home). Aquí basta con que compile/lintee.

- [ ] **Step 4: Commit**

```bash
git add src/components/CaseCard.tsx src/components/CaseCard.module.css
git commit -m "feat(desarrollo): CaseCard vertical (tarjeta de pie para carrusel)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `CasesCarousel` — isla interactiva coverflow

**Files:**
- Create: `src/components/CasesCarousel.tsx`
- Create: `src/components/CasesCarousel.module.css`

**Interfaces:**
- Consumes: `CaseStudyData` (tipo de `CaseStudy.tsx`), `CaseCard` (Task 1, default export).
- Produces: `export default function CasesCarousel({ cases }: { cases: CaseStudyData[] }): JSX.Element` — carrusel cliente. Modo `cover` (3D, desktop sin reduced-motion) o `flat` (scroll-snap, móvil/reduced-motion), decidido en cliente con `matchMedia`.

- [ ] **Step 1: Crear `src/components/CasesCarousel.tsx`**

```tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CaseStudyData } from './CaseStudy';
import CaseCard from './CaseCard';
import styles from './CasesCarousel.module.css';

type Mode = 'flat' | 'cover';

export default function CasesCarousel({ cases }: { cases: CaseStudyData[] }) {
  const [active, setActive] = useState(0);
  // Arranca en 'flat' para que SSR y el primer render cliente coincidan (sin transforms).
  // El efecto lo sube a 'cover' en desktop capaz.
  const [mode, setMode] = useState<Mode>('flat');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  const clamp = useCallback(
    (i: number) => Math.max(0, Math.min(cases.length - 1, i)),
    [cases.length],
  );

  // Modo según capacidad del cliente: coverflow solo en ancho > 768px sin reduced-motion.
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 769px)');
    const update = () => setMode(!motion.matches && wide.matches ? 'cover' : 'flat');
    update();
    motion.addEventListener('change', update);
    wide.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      wide.removeEventListener('change', update);
    };
  }, []);

  const scrollToFlat = useCallback((i: number) => {
    const card = trackRef.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const next = clamp(i);
      setActive(next);
      if (mode === 'flat') scrollToFlat(next);
    },
    [clamp, mode, scrollToFlat],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    }
  };

  // Tilt: solo modo cover, solo la tarjeta activa.
  const onMouseMove = (e: React.MouseEvent) => {
    if (mode !== 'cover' || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: -((e.clientY - r.top) / r.height - 0.5) * 14,
    });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  // Drag con umbral (solo cover).
  const onPointerDown = (e: React.PointerEvent) => {
    if (mode === 'cover') dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (mode !== 'cover' || dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    if (dx > 60) goTo(active - 1);
    else if (dx < -60) goTo(active + 1);
    dragStart.current = null;
  };

  // En flat, sincroniza el índice activo con el scroll (para dots y live region).
  const onScroll = () => {
    if (mode !== 'flat' || !trackRef.current) return;
    const track = trackRef.current;
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const c = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < min) {
        min = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };

  const slideStyle = (i: number): CSSProperties | undefined => {
    if (mode !== 'cover') return undefined;
    const off = i - active;
    const abs = Math.abs(off);
    const base =
      `translateX(${off * 180}px) translateZ(${-abs * 220}px) ` +
      `rotateY(${off * -38}deg) scale(${1 - abs * 0.12})`;
    const transform =
      i === active ? `${base} rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : base;
    return {
      transform,
      opacity: abs > 2 ? 0 : 1 - abs * 0.18,
      zIndex: 10 - abs,
      filter: i === active ? 'none' : 'brightness(0.94)',
      pointerEvents: abs > 2 ? 'none' : 'auto',
    };
  };

  return (
    <div
      className={styles.wrap}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Casos destacados"
      onKeyDown={onKeyDown}
    >
      <div
        ref={stageRef}
        className={`${styles.stage} ${mode === 'cover' ? styles.cover : styles.flat}`}
        onMouseMove={onMouseMove}
        onMouseLeave={resetTilt}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {cases.map((c, i) => {
            const isActive = i === active;
            const asButton = mode === 'cover' && !isActive;
            return (
              <div
                key={c.title}
                className={styles.slide}
                style={slideStyle(i)}
                aria-label={`Caso ${i + 1} de ${cases.length}: ${c.title}`}
                aria-hidden={mode === 'cover' && !isActive ? true : undefined}
                role={asButton ? 'button' : undefined}
                tabIndex={asButton ? -1 : undefined}
                onClick={asButton ? () => goTo(i) : undefined}
              >
                <CaseCard {...c} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.nav}
          onClick={() => goTo(active - 1)}
          aria-label="Caso anterior"
          disabled={active === 0}
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        <div className={styles.dots}>
          {cases.map((c, i) => (
            <button
              key={c.title}
              type="button"
              className={`${styles.dot} ${i === active ? styles.dotOn : ''}`}
              aria-label={`Ir al caso ${i + 1}: ${c.title}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.nav}
          onClick={() => goTo(active + 1)}
          aria-label="Caso siguiente"
          disabled={active === cases.length - 1}
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <p className={styles.live} aria-live="polite">
        Caso {active + 1} de {cases.length}: {cases[active].title}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Crear `src/components/CasesCarousel.module.css`**

```css
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stage {
  position: relative;
  width: 100%;
}

/* ===== Coverflow (desktop, sin reduced-motion) ===== */
.cover {
  height: 460px;
  perspective: 1600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover .track {
  position: relative;
  width: 320px;
  height: 420px;
  transform-style: preserve-3d;
}

.cover .slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 320px;
  cursor: pointer;
  transition:
    transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.55s cubic-bezier(0.22, 0.61, 0.36, 1),
    filter 0.55s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}

/* ===== Fallback plano (móvil / reduced-motion): scroll-snap horizontal ===== */
.flat .track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0.5rem 1rem 1.25rem;
  scrollbar-width: none;
}

.flat .track::-webkit-scrollbar {
  display: none;
}

.flat .slide {
  flex: 0 0 300px;
  scroll-snap-align: center;
}

.flat .slide > * {
  width: 100%;
}

/* ===== Controles ===== */
.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.nav {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid rgba(9, 188, 138, 0.28);
  background: rgba(255, 255, 255, 0.7);
  color: var(--forest);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.nav:hover:not(:disabled) {
  background: var(--mint);
  color: #022;
  border-color: var(--mint);
  transform: scale(1.06);
}

.nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dots {
  display: flex;
  gap: 0.5rem;
}

/* Área de toque ampliada (content-box + padding) manteniendo el punto pequeño. */
.dot {
  width: 8px;
  height: 8px;
  padding: 8px;
  box-sizing: content-box;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 67, 70, 0.2);
  background-clip: content-box;
  cursor: pointer;
  transition: width 0.25s ease, background-color 0.25s ease, border-radius 0.25s ease;
}

.dotOn {
  width: 26px;
  border-radius: 8px;
  background: var(--mint);
  background-clip: content-box;
}

.live {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--ink-soft);
  text-align: center;
}

.nav:focus-visible,
.dot:focus-visible {
  outline: 2px solid var(--mint);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .cover .slide {
    transition: none;
  }
}
```

- [ ] **Step 3: Verificar typecheck y lint**

Run: `npm run lint`
Expected: sin errores en `CasesCarousel.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/components/CasesCarousel.tsx src/components/CasesCarousel.module.css
git commit -m "feat(desarrollo): CasesCarousel coverflow (isla cliente + fallback scroll-snap)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Montar el carrusel en `FeaturedCases` y limpiar CSS muerto

**Files:**
- Modify: `src/components/FeaturedCases.tsx`
- Modify: `src/components/FeaturedCases.module.css`

**Interfaces:**
- Consumes: `CasesCarousel` (Task 2, default export), `CaseStudyData` (tipo), diagramas de `CaseDiagrams`.
- Produces: el home renderiza el carrusel en lugar de las filas editoriales.

- [ ] **Step 1: Reescribir `src/components/FeaturedCases.tsx`**

Reemplazar el contenido completo por:

```tsx
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { type CaseStudyData } from './CaseStudy';
import { RouteDiagram, ChainDiagram, FunnelDiagram, FanoutDiagram } from './CaseDiagrams';
import CasesCarousel from './CasesCarousel';
import styles from './FeaturedCases.module.css';

/* Anonymized by sector — no client names, no invented metrics (CLAUDE.md §5/§7).
 * Internal refs: Ponce-Benzo, Hospiwaste, SecureByte, Go To Truckers. */
const CASES: CaseStudyData[] = [
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'App móvil nativa + panel web para una distribuidora farmacéutica: GPS en tiempo real, modo offline y cámara anti-fraude para verificar visitas de mercaderistas en campo.',
    tags: ['App móvil', 'Dashboard', 'Offline-first'],
    diagram: <RouteDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios en automático.',
    tags: ['PWA', 'Reportes PDF', 'Firmas'],
    diagram: <ChainDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Para un integrador de ciberseguridad: un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs y adjuntos), califica con IA y los reparte en el CRM.',
    tags: ['IA', 'CRM', 'Multicanal'],
    diagram: <FunnelDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA con RAG generan correos de venta personalizados y los envían en automático desde el correo de cada vendedor.',
    tags: ['Agentes IA', 'RAG', 'Outbound'],
    diagram: <FanoutDiagram />,
  },
];

export default function FeaturedCases() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Casos destacados
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Lo que <span className={`wordmark ${styles.brand}`}>oito</span> ya ha construido
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '140ms' }}>
            Proyectos reales para empresas reales.
          </p>
        </header>

        <div className={styles.carousel} style={{ transitionDelay: '200ms' }}>
          <CasesCarousel cases={CASES} />
        </div>

        <div className={styles.ctas} style={{ transitionDelay: '400ms' }}>
          <Button variant="secondary" href="/desarrollo-web">
            Ver todo el desarrollo <ArrowRight size={18} strokeWidth={2} />
          </Button>
          <Button variant="secondary" href="/automatizacion-ia">
            Ver toda la automatización <ArrowRight size={18} strokeWidth={2} />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Actualizar `src/components/FeaturedCases.module.css`**

Eliminar los bloques `.rows`, `.row` y `.row > *` (líneas 34-46 del original) y sustituir por un contenedor `.carousel`. Luego reemplazar `.row` por `.carousel` en los tres selectores de scroll-reveal.

Reemplazar este bloque:

```css
.rows {
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.row {
  display: flex;
}

.row > * {
  width: 100%;
}
```

por:

```css
.carousel {
  width: 100%;
}
```

Y en la sección de scroll-reveal, cambiar las dos listas de selectores para usar `.carousel` en vez de `.row`:

```css
/* ===== Scroll-reveal ===== */
.eyebrow,
.title,
.lede,
.carousel,
.ctas {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.inner[data-revealed] .eyebrow,
.inner[data-revealed] .title,
.inner[data-revealed] .lede,
.inner[data-revealed] .carousel,
.inner[data-revealed] .ctas {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .title,
  .lede,
  .carousel,
  .ctas {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 3: Levantar el dev server y verificar en navegador (desktop)**

Run: `npm run dev` y abrir `http://localhost:3000`, ir a la sección "Casos destacados".

Verificar (ventana ancha, sin reduced-motion):
- Se ven 4 tarjetas en coverflow (central grande, laterales con profundidad).
- Flechas ‹ › cambian de caso; la primera deshabilita ‹, la última deshabilita ›.
- Arrastrar sobre las tarjetas avanza/retrocede (umbral ~60px).
- Clic en una tarjeta lateral la centra.
- Los dots reflejan el activo y saltan al caso.
- Mover el mouse sobre la tarjeta central la inclina (tilt); al salir se endereza.
- Teclado: con foco en una flecha, ←/→ navegan.

- [ ] **Step 4: Verificar fallback (móvil + reduced-motion)**

- En DevTools, activar responsive ≤768px: la sección pasa a fila con scroll-snap; swipe/scroll horizontal funciona; flechas y dots siguen operando; sin 3D ni tilt.
- En DevTools → Rendering → "Emulate prefers-reduced-motion: reduce" (en ancho desktop): también cae a scroll-snap sin 3D.

- [ ] **Step 5: Verificar build y lint**

Run: `npm run lint && npm run build`
Expected: ambos pasan sin errores.

- [ ] **Step 6: Commit**

```bash
git add src/components/FeaturedCases.tsx src/components/FeaturedCases.module.css
git commit -m "feat(desarrollo): montar carrusel coverflow en Casos destacados del home

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Gate de revisión UX/diseño y verificación final

**Files:**
- Modify (si la revisión lo amerita): `src/components/CaseCard.module.css`, `src/components/CasesCarousel.tsx`, `src/components/CasesCarousel.module.css`

**Interfaces:**
- Consumes: los componentes de Tasks 1-3.
- Produces: hallazgos triados y corregidos; verificación final registrada.

- [ ] **Step 1: Pasar el lente de revisión UX/diseño**

Usar `ui-ux-pro-max` + `frontend-design` como **lente de crítica** (no de generación; la dirección la fija `docs/design-system.md`) sobre la sección del carrusel. Auditar: estados de interacción (hover/active/focus/disabled), accesibilidad (contraste AA de pills/tags/dots, foco visible, targets ≥24px, ARIA del carrusel y live region), jerarquía de los 2 CTAs vs el carrusel, y consistencia del glass con el design-system.

- [ ] **Step 2: Triar y corregir hallazgos**

Listar los hallazgos, contrastarlos con `docs/design-system.md`, y aplicar solo las correcciones alineadas con el design-system (no cambios de dirección). Si un hallazgo excede el alcance (p. ej. algo de las páginas internas), anotarlo como backlog, no implementarlo aquí.

- [ ] **Step 3: Verificación final**

Run: `npm run lint && npm run build`
Expected: pasan.

Confirmar en navegador el checklist de aceptación del spec (§7): coverflow navegable por los 5 medios; tilt + profundidad; fallback móvil/reduced-motion; contraste/foco/ARIA; header y 2 CTAs intactos; `CaseStudy` editorial sin cambios.

- [ ] **Step 4: Commit (si hubo correcciones)**

```bash
git add -- src/components/CaseCard.module.css src/components/CasesCarousel.tsx src/components/CasesCarousel.module.css
git commit -m "polish(desarrollo): ajustes UX/a11y del carrusel de casos tras gate de revisión

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Notas de verificación (self-review del plan)

- **Cobertura del spec:** §2 arquitectura → Tasks 1-3; §3 interacción (coverflow, teclado, reduced-motion, móvil, ARIA) → Task 2 (código) + Task 3 (verificación); §4 a11y/gate → Task 4; §5 fuera de alcance respetado (internas no se tocan, `CaseStudy` intacto); §6 archivos → coinciden; §7 criterios → Task 3 Steps 3-5 y Task 4 Step 3.
- **Sin em dash** en copy/aria de los componentes (se usan comas y dos puntos).
- **Consistencia de tipos:** `CaseStudyData`/`Pillar` importados de `CaseStudy.tsx`; `CasesCarousel` consume `CaseCard` (default) y expone `{ cases: CaseStudyData[] }`; `FeaturedCases` pasa `CASES` tipado. Nombres de clases CSS (`stage/cover/flat/track/slide/controls/nav/dots/dot/dotOn/live/wrap`) usados igual en `.tsx` y `.module.css`.
- **Sin framework de tests:** verificación por lint + build + navegador (declarado en Tech Stack y en cada Task).
