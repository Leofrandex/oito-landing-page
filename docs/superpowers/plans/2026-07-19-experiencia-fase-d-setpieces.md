# Experiencia inmersiva v3 — Fase D: Set pieces de scroll

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir los momentos scroll-driven del spec: coreografía de entrada del Hero, narrativa intercalada del dolor, escaparate sticky de casos con titulares flotantes, y la metodología como workflow que se ejecuta.

**Architecture:** GSAP + `@gsap/react` (useGSAP) + ScrollTrigger, ya en uso en el repo (`BeforeAfter.tsx` es el patrón de referencia: `useGSAP` con scope, pin + scrub, fallback estático con `data-static` bajo reduced motion). Cada set piece usa `gsap.matchMedia()`: la escena pinned corre solo en `(prefers-reduced-motion: no-preference) and (min-width: 861px)`; móvil y reduced-motion reciben un layout estático/apilado digno. Animar solo transform/opacity (autoAlpha).

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, gsap 3 + @gsap/react + ScrollTrigger.

**Spec:** `docs/superpowers/specs/2026-07-19-experiencia-inmersiva-design.md` (§3.1, §3.2, §3.4, §3.7, §4, §5)

## Global Constraints

- Copy en español, sin em dash; contacto solo WhatsApp. El copy fino final llega con el copy deck v2: esta fase usa el copy existente de cada componente salvo donde la task indique texto nuevo.
- Animar solo transform/opacity (`autoAlpha`); nada de blur/box-shadow/height animados por GSAP.
- Reduced motion y móvil (≤860px): sin pinning; estados finales visibles y layout apilado.
- Componentes retirados del render (`FeaturedCases`, `BeforeAfter`) se PRESERVAN en `src/components/`.
- Ritmo §4: Casos = OSCURO (restaura la costura pilares→casos→soluciones). Metodología conserva su fondo con degradado invertido (luz desde abajo).
- Cada task termina con `npm run lint && npm run build` en verde y un commit.

---

### Task 1: Hero con coreografía de entrada rica

**Files:**
- Modify: `src/components/Hero.tsx` (reemplazo completo)
- Modify: `src/components/Hero.module.css` (añadir bloques; conservar todo lo existente)

**Interfaces:**
- Consumes: patrón `useGSAP` existente; `TextType`, `Button`, `WhatsAppIcon`.
- Produces: mismo `Hero({ isLoaded })`. TextType queda SOLO con frases de automatización (spec §3.1 + contenido v2 §4).

- [ ] **Step 1: Reemplazar `src/components/Hero.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import WhatsAppIcon from './WhatsAppIcon';
import TextType from './TextType';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './Hero.module.css';

/* Solo frases de automatización (spec v3 3.1; las de desarrollo salen del hero). */
const ROTATING = [
  'automatiza tu facturación',
  'agiliza tu prospección',
  'ordena tu CRM',
  'gestiona tu inventario',
  'responde a tus clientes 24/7',
  'genera tus reportes',
];

const WORDMARK_LETTERS = ['o', 'i', 't', 'o'];

export default function Hero({ isLoaded = true }: { isLoaded?: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLElement>('[data-letter]');
      const items = gsap.utils.toArray<HTMLElement>('[data-anim]');
      const tagline = root.current?.querySelector<HTMLElement>('[data-tagline]') ?? null;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce || !isLoaded) {
        gsap.set([...letters, ...items], { opacity: 1, y: 0 });
        if (tagline) tagline.removeAttribute('data-collapsed');
        return;
      }

      gsap.set(letters, { opacity: 0, y: 34 });
      gsap.set(items, { opacity: 0, y: 24 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        /* Letras del wordmark, una a una */
        .to(letters, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 })
        /* El tagline aparece expandiendo su letter-spacing (via atributo + transición CSS) */
        .call(() => tagline?.removeAttribute('data-collapsed'), [], '-=0.3')
        .to(items[0], { opacity: 1, y: 0, duration: 0.6 }, '-=0.1')
        .to(items.slice(1), { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.3');
    },
    { scope: root, dependencies: [isLoaded] },
  );

  return (
    <section id="hero" className={styles.hero} ref={root}>
      <div className={styles.inner}>
        <h1 className={styles.headline}>
          <span className={`${styles.wordmark} wordmark`} aria-label="oito">
            {WORDMARK_LETTERS.map((letter, i) => (
              <span key={i} data-letter aria-hidden="true" className={styles.letter}>
                {letter}
              </span>
            ))}
          </span>
          <span className={styles.tagline} data-tagline data-collapsed>
            lo hace por ti
          </span>
        </h1>

        <p className={styles.rotatingLine} data-anim>
          <TextType
            text={ROTATING}
            as="span"
            className={styles.rotating}
            typingSpeed={50}
            deletingSpeed={30}
            pauseDuration={2000}
          />
        </p>

        <p className={styles.subtitle} data-anim>
          Tu equipo técnico que construye software y automatiza procesos.
        </p>

        <div className={styles.actions} data-anim>
          <Button variant="primary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={22} />
            Hablemos por WhatsApp
          </Button>
        </div>

        <div className={styles.scrollHint} data-anim aria-hidden="true">
          <span className={styles.mouse} />
          <span className={styles.hintLabel}>desliza</span>
        </div>
      </div>
    </section>
  );
}
```

Nota: si `.tagline` en el CSS actual está dentro del `<h1>` con estilos propios, conservarlos; el atributo `data-collapsed` solo modula `letter-spacing` y opacidad (ver Step 2). El `aria-label="oito"` en el wrapper + `aria-hidden` en las letras mantiene el wordmark legible para lectores de pantalla.

- [ ] **Step 2: Añadir a `src/components/Hero.module.css`** (sin borrar lo existente)

```css
/* ===== Coreografía de entrada (fase D) ===== */
.letter {
  display: inline-block;
  will-change: transform, opacity;
}

/* El tagline expande su letter-spacing al entrar (transición CSS disparada por GSAP) */
.tagline {
  transition:
    letter-spacing 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.9s ease;
}

.tagline[data-collapsed] {
  letter-spacing: 0.02em;
  opacity: 0;
}

/* CTA con glow que respira (pausado bajo reduced motion) */
.actions :global(a) {
  animation: cta-breathe 2.6s ease-in-out infinite;
}

@keyframes cta-breathe {
  0%,
  100% {
    box-shadow: 0 12px 28px -10px rgba(9, 188, 138, 0.55);
  }
  50% {
    box-shadow: 0 12px 40px -6px rgba(9, 188, 138, 0.85);
  }
}

/* Scroll hint */
.scrollHint {
  position: absolute;
  bottom: clamp(1rem, 3vh, 2rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.mouse {
  width: 18px;
  height: 30px;
  border: 1.5px solid var(--on-dark-soft);
  border-radius: 999px;
  position: relative;
}

.mouse::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 50%;
  width: 3px;
  height: 7px;
  border-radius: 999px;
  background: var(--mint);
  animation: wheel 1.8s ease-out infinite;
}

@keyframes wheel {
  0% {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, 9px);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, 9px);
    opacity: 0;
  }
}

.hintLabel {
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--on-dark-soft);
}

@media (prefers-reduced-motion: reduce) {
  .tagline {
    transition: none;
  }

  .tagline[data-collapsed] {
    letter-spacing: inherit;
    opacity: 1;
  }

  .actions :global(a) {
    animation: none;
  }

  .mouse::after {
    animation: none;
  }
}
```

Nota: si `.hero` no tiene `position: relative`, añadirla (el scroll hint es absoluto). Si el keyframe de box-shadow del CTA choca con la regla de "solo transform/opacity", se acepta como excepción puntual documentada: es un loop de 1 elemento, compositado como sombra de baja frecuencia (mismo trade-off que el glow estático); si el gate de la Task 5 lo objeta, sustituir por un pseudo-elemento con opacity.

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.module.css
git commit -m "feat(hero): coreografia de entrada rica y TextType solo automatizacion (spec v3 3.1)"
```

---

### Task 2: El dolor como narrativa intercalada (WhyOito scroll-driven)

**Files:**
- Modify: `src/components/WhyOito.tsx` (reemplazo completo)
- Modify: `src/components/WhyOito.module.css` (añadir bloques nuevos; conservar `.section`, `.glow`, `.eyebrow` y tokens usados)
- Nota: `BeforeAfter` sale del render (el archivo se preserva).

**Interfaces:**
- Consumes: patrón `BeforeAfter.tsx` (useGSAP + pin + scrub + `data-static`), clases `section-light`, `badge`.
- Produces: `WhyOito()` que ya NO monta `<BeforeAfter />`; la secuencia caos→orden vive dentro.

- [ ] **Step 1: Reemplazar `src/components/WhyOito.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyOito.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Tareas reales de pyme: el caos que se ordena (spec v3 3.2). */
const TASKS = [
  '23 correos sin responder',
  'Copiar pedido al Excel',
  'Recordar cobro vencido',
  'Pasar datos al CRM',
  'Armar reporte del lunes',
  'Confirmar citas de mañana',
];

/* Posiciones dispersas (caos) y en fila (orden), en % del escenario. */
const SCATTER = [
  { left: '6%', top: '12%', rot: -7 },
  { left: '38%', top: '4%', rot: 5 },
  { left: '66%', top: '16%', rot: -4 },
  { left: '18%', top: '58%', rot: 8 },
  { left: '48%', top: '66%', rot: -6 },
  { left: '74%', top: '54%', rot: 4 },
];

export default function WhyOito() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        const arg1 = container.current?.querySelector<HTMLElement>('[data-arg1]');
        const arg2 = container.current?.querySelector<HTMLElement>('[data-arg2]');
        const belt = container.current?.querySelector<HTMLElement>('[data-belt]');
        const chips = gsap.utils.toArray<HTMLElement>('[data-chip]');

        gsap.set(arg2, { autoAlpha: 0, y: 30 });
        gsap.set(belt, { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
          },
        });

        /* 1) El argumento 1 ya está visible; entra el caos */
        tl.to(belt, { autoAlpha: 1, duration: 0.3 })
          /* 2) El argumento 1 cede el foco */
          .to(arg1, { autoAlpha: 0.25, y: -24, duration: 0.5 }, '<')
          /* 3) Las tareas se ordenan en fila (transform hacia su slot data-order) */
          .to(
            chips,
            {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1,
              stagger: 0.08,
              onStart: () => container.current?.setAttribute('data-ordered', ''),
              onReverseComplete: () => container.current?.removeAttribute('data-ordered'),
            },
            '+=0.1',
          )
          /* 4) Aterriza la conclusión */
          .to(arg2, { autoAlpha: 1, y: 0, duration: 0.6 }, '+=0.2');

        /* Los chips arrancan en su posición de caos; GSAP los lleva a x/y 0
         * (su posición final en la fila la define el CSS del estado ordenado). */
        chips.forEach((chip, i) => {
          const dx = chip.dataset.dx ?? '0';
          const dy = chip.dataset.dy ?? '0';
          gsap.set(chip, { x: Number(dx), y: Number(dy), rotation: SCATTER[i]?.rot ?? 0 });
        });
      });

      mm.add('(prefers-reduced-motion: reduce), (max-width: 860px)', () => {
        container.current?.setAttribute('data-static', '');
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className={`section-light ${styles.section} ${styles.narrative}`}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.stage}>
        <p className={`badge ${styles.eyebrow}`}>Por qué oito</p>

        <div className={styles.arg} data-arg1>
          <h2 className={styles.argTitle}>
            El tiempo no se recupera, <span className={styles.accent}>los ingresos sí</span>
          </h2>
          <p className={styles.argBody}>
            La mayoría de los negocios están atrapados en procesos fragmentados y tareas
            manuales. Eso cuesta tiempo, y el tiempo es lo único que no vuelve.
          </p>
        </div>

        <ul className={styles.belt} data-belt aria-hidden="true">
          {TASKS.map((task, i) => (
            <li key={task} className={styles.chip} data-chip data-dx="0" data-dy="0">
              {task}
            </li>
          ))}
        </ul>

        <div className={styles.arg} data-arg2>
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
    </section>
  );
}
```

**⚠ Ajuste obligatorio del implementador (los `data-dx/dy` de arriba son placeholders deliberados):** para que GSAP lleve cada chip DESDE el caos HASTA la fila, el layout base (CSS) es la FILA ordenada (flex wrap centrado), y el estado de caos se logra con `gsap.set` inicial de `x/y/rotation` aleatorio-fijo. Implementarlo así: eliminar `data-dx/dy` del TSX y en el `useGSAP` calcular el offset inicial de cada chip a partir de `SCATTER[i]` y el tamaño del escenario:

```ts
const stage = container.current!.querySelector<HTMLElement>(`.${styles.stage}`)!;
const stageRect = stage.getBoundingClientRect();
chips.forEach((chip, i) => {
  const rect = chip.getBoundingClientRect();
  const targetX = (parseFloat(SCATTER[i].left) / 100) * stageRect.width;
  const targetY = (parseFloat(SCATTER[i].top) / 100) * stageRect.height;
  gsap.set(chip, {
    x: targetX - (rect.left - stageRect.left),
    y: targetY - (rect.top - stageRect.top),
    rotation: SCATTER[i].rot,
  });
});
```

y el timeline los anima a `{ x: 0, y: 0, rotation: 0 }` (su lugar natural en la fila). El atributo `data-ordered` en el contenedor cambia el color de los chips (rojizo→mint) vía CSS con transición propia.

- [ ] **Step 2: Añadir a `src/components/WhyOito.module.css`**

Conservar `.section`, `.glow`, `.eyebrow`, `.argTitle`, `.argBody`, `.accent` (y eliminar los estilos del layout de dos columnas `.args`/`.inner` si quedan sin uso). Añadir:

```css
/* ===== Narrativa intercalada (fase D) ===== */
.narrative {
  overflow: hidden;
}

.stage {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: clamp(1.5rem, 4vh, 2.5rem);
  padding: clamp(3rem, 8vh, 5rem) 1rem;
}

.arg {
  max-width: 56ch;
}

.belt {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  max-width: 640px;
}

.chip {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b4a3f;
  background: #fff;
  border: 1px solid rgba(180, 84, 62, 0.4);
  border-radius: 10px;
  padding: 0.45rem 0.85rem;
  box-shadow: 0 6px 14px -6px rgba(0, 67, 70, 0.22);
  will-change: transform;
  transition:
    color 0.5s ease,
    border-color 0.5s ease;
}

.narrative[data-ordered] .chip {
  color: var(--ink, #0c8060);
  border-color: rgba(9, 188, 138, 0.55);
}

/* ===== Fallback estático (móvil / reduced motion) ===== */
.narrative[data-static] .stage {
  min-height: 0;
}

.narrative[data-static] [data-arg2] {
  opacity: 1;
  transform: none;
}

.narrative[data-static] .chip {
  color: var(--ink, #0c8060);
  border-color: rgba(9, 188, 138, 0.55);
  transform: none !important;
}
```

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores. `grep -n "BeforeAfter" src/components/WhyOito.tsx` no devuelve nada; el archivo `BeforeAfter.tsx` sigue existiendo.

- [ ] **Step 4: Commit**

```bash
git add src/components/WhyOito.tsx src/components/WhyOito.module.css
git commit -m "feat(dolor): narrativa intercalada pinned, el caos se ordena (spec v3 3.2)"
```

---

### Task 3: CasesShowcase, escaparate sticky con titulares flotantes

**Files:**
- Create: `src/components/CasesShowcase.tsx`
- Create: `src/components/CasesShowcase.module.css`
- Modify: `src/app/page.tsx` (reemplazar `FeaturedCases` por `CasesShowcase` en el slot `#casos`)

**Interfaces:**
- Consumes: diagramas existentes de `./CaseDiagrams` (`RouteDiagram`, `ChainDiagram`, `FunnelDiagram`, `FanoutDiagram`), patrón useGSAP/matchMedia.
- Produces: `CasesShowcase({ id })`. `FeaturedCases`, `CasesSpotlight`, `CaseStudy` quedan preservados sin render.

- [ ] **Step 1: Crear `src/components/CasesShowcase.tsx`**

```tsx
'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouteDiagram, ChainDiagram, FunnelDiagram, FanoutDiagram } from './CaseDiagrams';
import styles from './CasesShowcase.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ShowcaseCase = {
  pillar: 'Automatización' | 'Desarrollo';
  title: string;
  description: string;
  diagram: ReactNode;
};

/* Casos anonimizados por sector (copy actual de FeaturedCases; el deck v2 lo afinará). */
const CASES: ShowcaseCase[] = [
  {
    pillar: 'Automatización',
    title: 'Calificación de leads con IA',
    description:
      'Para un integrador de ciberseguridad: un flujo recibe cotizaciones por email, WhatsApp y web, extrae los datos (incluso de PDFs y adjuntos), califica con IA y los reparte en el CRM.',
    diagram: <FunnelDiagram />,
  },
  {
    pillar: 'Automatización',
    title: 'Secuencias de venta con IA',
    description:
      'Para un bróker logístico B2B: agentes de IA con RAG generan correos de venta personalizados y los envían en automático desde el correo de cada vendedor.',
    diagram: <FanoutDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'Trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: pesaje, evidencia fotográfica, firmas y reportes PDF regulatorios en automático.',
    diagram: <ChainDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'App móvil nativa + panel web para una distribuidora farmacéutica: GPS en tiempo real, modo offline y cámara anti-fraude para verificar visitas en campo.',
    diagram: <RouteDiagram />,
  },
];

export default function CasesShowcase({ id }: { id?: string }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        const panes = gsap.utils.toArray<HTMLElement>('[data-pane]');
        const titles = gsap.utils.toArray<HTMLElement>('[data-case-title]');
        const dots = gsap.utils.toArray<HTMLElement>('[data-dot]');
        const fill = container.current?.querySelector<HTMLElement>('[data-fill]');
        const belt = container.current?.querySelector<HTMLElement>('[data-titles-belt]');
        const steps = CASES.length;

        /* Estados iniciales: caso 0 activo */
        gsap.set(panes.slice(1), { autoAlpha: 0, scale: 1.04 });
        gsap.set(titles, { opacity: 0.25 });
        gsap.set(titles[0], { opacity: 1 });
        gsap.set(dots, { opacity: 0.4, scale: 1 });
        gsap.set(dots[0], { opacity: 1, scale: 1.4 });
        gsap.set(fill ?? null, { scaleY: 1 / steps });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: `+=${steps * 85}%`,
            pin: true,
            scrub: 1,
          },
        });

        for (let i = 1; i < steps; i++) {
          const at = i;
          tl.to(panes[i - 1], { autoAlpha: 0, scale: 1.04, duration: 0.4 }, at)
            .fromTo(
              panes[i],
              { autoAlpha: 0, scale: 0.97 },
              { autoAlpha: 1, scale: 1, duration: 0.5 },
              at + 0.1,
            )
            .to(belt ?? null, { yPercent: -(100 / steps) * i, duration: 0.6 }, at)
            .to(titles[i - 1], { opacity: 0.25, duration: 0.4 }, at)
            .to(titles[i], { opacity: 1, duration: 0.4 }, at + 0.15)
            .to(dots[i - 1], { opacity: 0.4, scale: 1, duration: 0.3 }, at)
            .to(dots[i], { opacity: 1, scale: 1.4, duration: 0.3 }, at + 0.1)
            .to(fill ?? null, { scaleY: (i + 1) / steps, duration: 0.6 }, at);
        }
      });

      mm.add('(prefers-reduced-motion: reduce), (max-width: 860px)', () => {
        container.current?.setAttribute('data-static', '');
      });
    },
    { scope: container },
  );

  return (
    <section id={id} className={`section-dark anchor-target ${styles.section}`}>
      <header className={styles.head}>
        <p className={`badge ${styles.eyebrow}`}>Casos</p>
        <h2 className={styles.title}>
          Lo que <span className="wordmark">oito</span> ya ha construido
        </h2>
      </header>

      {/* ===== Escenario sticky (desktop) ===== */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.visual}>
          {CASES.map((c, i) => (
            <div key={c.title} className={styles.pane} data-pane>
              <div className={styles.diagram}>{c.diagram}</div>
              <span className={styles.caption}>{c.pillar}</span>
            </div>
          ))}
        </div>

        <div className={styles.route}>
          <span className={styles.track} />
          <span className={styles.fill} data-fill />
          {CASES.map((c, i) => (
            <span
              key={c.title}
              className={styles.dot}
              data-dot
              style={{ top: `${((i + 0.5) / CASES.length) * 100}%` }}
            />
          ))}
          <span className={styles.arrow}>▼</span>
        </div>

        <div className={styles.titles}>
          <div className={styles.beltMask}>
            <div className={styles.belt} data-titles-belt>
              {CASES.map((c) => (
                <div key={c.title} className={styles.item} data-case-title>
                  <span className={styles.sector}>{c.pillar}</span>
                  <h3 className={styles.itemTitle}>{c.title}</h3>
                  <p className={styles.itemDesc}>{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Lista accesible / fallback móvil y reduced motion ===== */}
      <ul className={styles.staticList} role="list">
        {CASES.map((c) => (
          <li key={c.title} className={styles.staticCase}>
            <div className={styles.staticDiagram} aria-hidden="true">
              {c.diagram}
            </div>
            <div>
              <span className={styles.sector}>{c.pillar}</span>
              <h3 className={styles.itemTitle}>{c.title}</h3>
              <p className={styles.itemDesc}>{c.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Nota de accesibilidad deliberada: el escenario animado es `aria-hidden` y el contenido REAL para lectores de pantalla (y para móvil/reduced motion) es `.staticList`. En desktop con motion, `.staticList` se oculta visualmente con la clase (ver CSS) pero permanece en el árbol accesible (`clip-path` techniques NO: usar la clase `.srOnlyDesktop` de abajo que lo saca del flujo visual sin `display:none`).

- [ ] **Step 2: Crear `src/components/CasesShowcase.module.css`**

```css
.section {
  position: relative;
  padding: clamp(4rem, 8vw, 6rem) 1.5rem 0;
}

.head {
  text-align: center;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.title {
  margin-top: 0.9rem;
  font-size: clamp(1.75rem, 4vw, 2.8rem);
  letter-spacing: -0.02em;
  color: var(--on-dark);
}

/* ===== Escenario ===== */
.stage {
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  height: 100vh;
  max-height: 720px;
  display: grid;
  grid-template-columns: 1.15fr 40px 1fr;
  gap: clamp(1rem, 3vw, 2rem);
  align-items: center;
  padding-bottom: 3rem;
}

.visual {
  position: relative;
  height: min(62vh, 460px);
}

.pane {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(120deg, rgba(9, 188, 138, 0.16), rgba(9, 188, 138, 0.03) 55%, rgba(9, 188, 138, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.22), 0 24px 48px -20px rgba(0, 0, 0, 0.6);
  will-change: transform, opacity;
}

.diagram {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.diagram > * {
  width: 100%;
  height: 100%;
}

.caption {
  padding: 0.7rem 1.1rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--mint);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* ===== Línea de recorrido ===== */
.route {
  position: relative;
  height: min(62vh, 460px);
  width: 40px;
}

.track {
  position: absolute;
  left: 50%;
  top: 2%;
  bottom: 2%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    rgba(9, 188, 138, 0.05),
    rgba(9, 188, 138, 0.35),
    rgba(9, 188, 138, 0.05)
  );
}

.fill {
  position: absolute;
  left: 50%;
  top: 2%;
  height: 96%;
  width: 2px;
  transform: translateX(-50%);
  transform-origin: top;
  background: var(--mint);
  box-shadow: 0 0 10px rgba(9, 188, 138, 0.8);
  will-change: transform;
}

.dot {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--mint);
  will-change: transform, opacity;
}

.arrow {
  position: absolute;
  left: 50%;
  bottom: -18px;
  transform: translateX(-50%);
  color: var(--mint);
  font-size: 12px;
  animation: arrow-pulse 2s ease-in-out infinite;
}

@keyframes arrow-pulse {
  0%,
  100% {
    transform: translate(-50%, 0);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, 4px);
    opacity: 1;
  }
}

/* ===== Titulares flotantes ===== */
.titles {
  height: min(62vh, 460px);
  display: flex;
  align-items: center;
}

.beltMask {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent);
}

.belt {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 400%;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding-right: 0.5rem;
}

.sector {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--mint);
  font-weight: 600;
}

.itemTitle {
  font-size: clamp(1.2rem, 2.4vw, 1.6rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--on-dark);
}

.itemDesc {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--on-dark-soft);
  max-width: 40ch;
}

/* ===== Lista accesible / fallback ===== */
.staticList {
  list-style: none;
  max-width: 720px;
  margin: 0 auto;
  padding-bottom: clamp(3rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.staticCase {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.25rem;
  align-items: center;
}

.staticDiagram {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(9, 188, 138, 0.08);
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}

/* Desktop con motion: el escenario manda y la lista sale del flujo visual
 * pero sigue disponible para lectores de pantalla. */
@media (prefers-reduced-motion: no-preference) and (min-width: 861px) {
  .staticList {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
}

/* Móvil / reduced motion: el escenario se oculta y manda la lista */
@media (prefers-reduced-motion: reduce), (max-width: 860px) {
  .stage {
    display: none;
  }
}

@media (max-width: 640px) {
  .staticCase {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Montar en `src/app/page.tsx`**

Reemplazar el import y el uso de `FeaturedCases`:

```tsx
import CasesShowcase from '@/components/CasesShowcase';
```

```tsx
      <CasesShowcase id="casos" />
```

(`FeaturedCases` deja de importarse; su archivo se preserva.)

- [ ] **Step 4: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores; `grep -n "FeaturedCases" src/app/page.tsx` no devuelve nada.

- [ ] **Step 5: Commit**

```bash
git add src/components/CasesShowcase.tsx src/components/CasesShowcase.module.css src/app/page.tsx
git commit -m "feat(casos): escaparate sticky con titulares flotantes y linea de recorrido (spec v3 3.4)"
```

---

### Task 4: Metodología como workflow que se ejecuta

**Files:**
- Modify: `src/components/Methodology.tsx` (reemplazo completo)
- Modify: `src/components/Methodology.module.css` (añadir bloques; conservar TODO lo existente: `.section`, `.inner`, `.head`, `.steps`, `.thread`, `.step`, `.node`, `.num`, `.stepTitle`, `.stepDesc` y responsive)

**Interfaces:**
- Consumes: diseño actual intacto (nodos, hilo, LiveCounter); patrón useGSAP/matchMedia.
- Produces: mismo `Methodology()` sin props; sección pinned solo en desktop con motion.

- [ ] **Step 1: Reemplazar `src/components/Methodology.tsx`**

```tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessagesSquare, Blocks, TrendingUp, type LucideIcon } from 'lucide-react';
import LiveCounter from './LiveCounter';
import styles from './Methodology.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = { icon: LucideIcon; title: string; description: string };

const STEPS: Step[] = [
  {
    icon: MessagesSquare,
    title: 'Contacto & Auditoría',
    description:
      'Hablamos por WhatsApp, entendemos tu negocio e identificamos dónde podemos ayudarte más.',
  },
  {
    icon: Blocks,
    title: 'Construcción & Implementación',
    description: 'Diseñamos y desarrollamos la solución a medida, integrándola con lo que ya usas.',
  },
  {
    icon: TrendingUp,
    title: 'Monitoreo & Mejora',
    description: 'Medimos, ajustamos y escalamos para que los resultados se mantengan en el tiempo.',
  },
];

/* El diseño actual se conserva; el scroll lo "ejecuta" como un workflow:
 * el hilo se llena, cada nodo se enciende y cae su check (spec v3 3.7). */
export default function Methodology() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 861px)', () => {
        const progress = container.current?.querySelector<HTMLElement>('[data-progress]');
        const glows = gsap.utils.toArray<HTMLElement>('[data-node-glow]');
        const checks = gsap.utils.toArray<HTMLElement>('[data-check]');
        const items = gsap.utils.toArray<HTMLElement>('[data-step]');

        gsap.set(progress ?? null, { scaleX: 0 });
        gsap.set(glows, { autoAlpha: 0 });
        gsap.set(checks, { autoAlpha: 0, scale: 0.4 });
        gsap.set(items, { autoAlpha: 0.35 });
        gsap.set(items[0], { autoAlpha: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1,
          },
        });

        STEPS.forEach((_, i) => {
          const at = i;
          tl.to(items[i], { autoAlpha: 1, duration: 0.3 }, at)
            .to(glows[i], { autoAlpha: 1, duration: 0.3 }, at + 0.1)
            .to(progress ?? null, { scaleX: (i + 1) / STEPS.length, duration: 0.7 }, at + 0.15)
            .to(checks[i], { autoAlpha: 1, scale: 1, duration: 0.3 }, at + 0.6)
            .to(glows[i], { autoAlpha: 0, duration: 0.3 }, at + 0.8);
        });
      });

      mm.add('(prefers-reduced-motion: reduce), (max-width: 860px)', () => {
        container.current?.setAttribute('data-static', '');
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className={`section-dark ${styles.section} ${styles.workflow}`}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`}>Metodología</p>
          <h2 className={styles.title}>
            Metodología <span className="wordmark">oito</span>
          </h2>
        </header>

        <ol className={styles.steps}>
          <span className={styles.thread} aria-hidden="true">
            <span className={styles.progress} data-progress />
          </span>
          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className={styles.step} data-step>
              <div className={styles.node}>
                <span className={styles.nodeGlow} data-node-glow aria-hidden="true" />
                <Icon size={26} strokeWidth={1.6} />
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.check} data-check aria-hidden="true">
                  ✓
                </span>
              </div>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{description}</p>
            </li>
          ))}
        </ol>

        <LiveCounter />
      </div>
    </section>
  );
}
```

Nota: el `Reveal` que envolvía `.inner` se retira en esta sección (el pin de ScrollTrigger asume el control); si al quitarlo los estilos `[data-revealed]` del CSS dejan elementos con `opacity: 0` permanente, eliminar o neutralizar esas reglas en el module CSS (los estados los maneja GSAP y el fallback `data-static`).

- [ ] **Step 2: Añadir a `src/components/Methodology.module.css`**

```css
/* ===== Workflow ejecutándose (fase D) ===== */
/* Degradado invertido: luz desde abajo (ritmo del bloque oscuro, spec v3 §4) */
.workflow {
  background: linear-gradient(to top, rgba(9, 188, 138, 0.06), transparent 55%);
}

.thread {
  position: relative;
}

.progress {
  position: absolute;
  inset: 0;
  transform-origin: left;
  background: var(--mint);
  box-shadow: 0 0 12px rgba(9, 188, 138, 0.7);
  border-radius: inherit;
  will-change: transform;
}

.node {
  position: relative;
}

.nodeGlow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 30px rgba(9, 188, 138, 0.5), inset 0 0 0 2px rgba(9, 188, 138, 0.7);
  opacity: 0;
}

.check {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--mint);
  color: #032a20;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

/* Fallback estático: todo completado */
.workflow[data-static] .progress {
  transform: scaleX(1);
}

.workflow[data-static] .check {
  opacity: 1;
  transform: none;
}

.workflow[data-static] [data-step] {
  opacity: 1;
}
```

Nota: si `.thread` actual es un pseudo-elemento o no admite hijos, convertirlo en `<span>` real (como muestra el TSX) conservando sus estilos visuales exactos. Si el hilo es vertical en móvil, no importa: en móvil la escena no corre (`data-static`).

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/Methodology.tsx src/components/Methodology.module.css
git commit -m "feat(metodologia): workflow que se ejecuta con el scroll (spec v3 3.7)"
```

---

### Task 5: BuiltWith a oscuro + verificación de fase, gate UX y ledger

**Files:**
- Modify: `src/components/BuiltWith.tsx` y/o `src/components/BuiltWith.module.css` (sección a `section-dark`, logos legibles sobre oscuro)
- Modify: `.superpowers/sdd/progress.md` (gitignoreado)
- Modify (si aplica): `docs/design-system.md`

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: ritmo §4 completo (`O·C·O·O·C·O·O·O·C·C·O`); Fase D cerrada.

- [ ] **Step 1: BuiltWith al bloque oscuro**

En `BuiltWith.tsx`, cambiar la clase de la sección de la variante clara a `section-dark`. En su module CSS, ajustar los logos para legibilidad sobre oscuro: si son `<img>`/SVG gris, aplicar `filter: brightness(0) invert(1); opacity: 0.55;` a los items (y `opacity: 0.8` en hover). Ajustar el color del label "Sistemas construidos con" a `var(--on-dark-soft)`.

- [ ] **Step 2: Verificación completa**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 3: Recorrido visual completo (controlador, navegador real)**

- Hero: letras una a una, tagline expandiéndose, CTA respirando, scroll hint.
- Dolor: pin, arg1 → caos ordenándose (chips rojizo→mint) → arg2; reversible al subir.
- Casos: pin, visual crossfade + línea llenándose + dots + titulares subiendo; ancla `/#casos`.
- Metodología: pin, hilo llenándose, nodos encendiéndose, checks cayendo; LiveCounter intacto.
- Ritmo de tono completo del spec §4 con costuras correctas; BuiltWith ya oscuro.
- Móvil (≤860px): NINGUNA sección pinea; casos = lista apilada; dolor = estático ordenado; sin scroll horizontal.
- Gate UX/diseño (CLAUDE.md §3): estados de interacción, contraste, targets, jerarquía CTAs; triar contra design-system.

- [ ] **Step 4: Registrar en el ledger y documentar patrones**

Añadir el bloque de cierre de la Fase D a `.superpowers/sdd/progress.md`. Documentar en `docs/design-system.md` (con fecha) los patrones nuevos que queden fijados (nodo de circuito, píldora de marquesina, receta de set piece pinned con matchMedia) y commitear:

```bash
git add docs/design-system.md
git commit -m "docs(design-system): patrones de la experiencia v3 (fases B-D)"
```
