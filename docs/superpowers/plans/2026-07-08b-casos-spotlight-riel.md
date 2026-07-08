# Spotlight + riel "Casos destacados" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Reemplazar el coverflow (descartado) por un patrón Spotlight + riel: un caso en foco (reutilizando `CaseStudy`) más un riel de miniaturas tipo tabs para cambiar de caso.

**Architecture:** `CasesSpotlight` (isla cliente, patrón tabs WAI-ARIA) renderiza el `CaseStudy` del caso activo como panel de foco y un riel de miniaturas (`tab`) para seleccionar. `FeaturedCases` (server) monta el componente y conserva header + CTAs. Se eliminan los componentes del coverflow.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, lucide-react. Sin framework de tests: verificación = `npm run lint` + `npm run build`.

## Global Constraints

- Idioma de interacción: español.
- **Sin em dash (`—`)** en texto visible, `aria-label`, JSX o comentarios renderizados. Usar comas/dos puntos.
- Copy de casos, diagramas (`CaseDiagrams`) y los 2 CTAs **no cambian**.
- **`prefers-reduced-motion`**: sin fundido (swap instantáneo), vía CSS.
- **Contraste AA**: pills/miniaturas en tono oscuro (mint solo como fondo/borde, no como texto). Variables: `--forest`, `--forest-deep`, `--mint`, `--ink-soft`, `--font-outfit`.
- Reutilizar `CaseStudy` (default export) y el tipo `CaseStudyData` de `src/components/CaseStudy.tsx`. **No** modificar `CaseStudy` (sigue en uso editorial en páginas internas).
- Patrón **tabs WAI-ARIA**: `tablist`/`tab`/`tabpanel`, roving `tabindex`, activación automática.
- No fusionar a `main`. Rama `oito-page-v5`.
- **No** `git add -A`: el working tree tiene WIP del usuario. Cada commit añade/borra solo los archivos de su tarea, por ruta explícita.

---

### Task 1: `CasesSpotlight` — foco (CaseStudy) + riel de miniaturas (tabs)

**Files:**
- Create: `src/components/CasesSpotlight.tsx`
- Create: `src/components/CasesSpotlight.module.css`

**Interfaces:**
- Consumes: `CaseStudy` (default export) y `CaseStudyData` (tipo) de `src/components/CaseStudy.tsx`.
- Produces: `export default function CasesSpotlight({ cases }: { cases: CaseStudyData[] }): JSX.Element`.

- [ ] **Step 1: Crear `src/components/CasesSpotlight.tsx`**

```tsx
'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import CaseStudy, { type CaseStudyData } from './CaseStudy';
import styles from './CasesSpotlight.module.css';

/** Un caso en foco (CaseStudy) + riel de miniaturas para saltar entre casos.
 *  Patrón tabs WAI-ARIA: riel = tablist, miniaturas = tab, foco = tabpanel. */
export default function CasesSpotlight({ cases }: { cases: CaseStudyData[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    const next = (i + cases.length) % cases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        select(active + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        select(active - 1);
        break;
      case 'Home':
        e.preventDefault();
        select(0);
        break;
      case 'End':
        e.preventDefault();
        select(cases.length - 1);
        break;
      default:
        break;
    }
  };

  const current = cases[active];

  return (
    <div className={styles.wrap}>
      <div
        role="tabpanel"
        id="caso-panel"
        aria-labelledby={`caso-tab-${active}`}
        className={styles.panel}
        key={active}
      >
        <CaseStudy {...current} />
      </div>

      <div role="tablist" aria-label="Casos destacados" className={styles.rail} onKeyDown={onKeyDown}>
        {cases.map((c, i) => {
          const selected = i === active;
          return (
            <button
              key={c.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`caso-tab-${i}`}
              aria-selected={selected}
              aria-controls="caso-panel"
              tabIndex={selected ? 0 : -1}
              className={`${styles.thumb} ${selected ? styles.thumbOn : ''}`}
              onClick={() => setActive(i)}
            >
              <span className={`${styles.pill} ${styles[c.pillar === 'Desarrollo' ? 'dev' : 'auto']}`}>
                {c.pillar}
              </span>
              <span className={styles.thumbTitle}>{c.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Crear `src/components/CasesSpotlight.module.css`**

```css
.wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Panel de foco: entra con un fundido suave cada vez que cambia (key={active} lo remonta). */
.panel {
  animation: fadeSwap 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@keyframes fadeSwap {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.995);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Riel de miniaturas */
.rail {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.thumb {
  flex: 1 1 200px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(0, 67, 70, 0.14);
  background: rgba(255, 255, 255, 0.55);
  color: var(--ink-soft);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.thumb:hover {
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-2px);
}

.thumbOn {
  border-color: var(--mint);
  background: rgba(9, 188, 138, 0.1);
}

.thumbTitle {
  font-family: var(--font-outfit), sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
  color: var(--forest-deep);
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
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

.thumb:focus-visible {
  outline: 2px solid var(--mint);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .panel {
    animation: none;
  }
}
```

- [ ] **Step 3: Verificar lint**

Run: `npm run lint`
Expected: sin errores en `CasesSpotlight.tsx` (los errores pre-existentes en archivos ajenos no cuentan).

Nota: `CaseStudy` no tiene `'use client'` pero es puramente presentacional (lucide-react + CSS Modules); importarlo dentro de este componente cliente es válido (se compila para cliente, sin APIs de servidor). La verificación visual ocurre en Task 2.

- [ ] **Step 4: Commit**

```bash
git add src/components/CasesSpotlight.tsx src/components/CasesSpotlight.module.css
git commit -m "feat(desarrollo): CasesSpotlight (foco CaseStudy + riel de miniaturas, patrón tabs)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Montar en `FeaturedCases` y eliminar los componentes del coverflow

**Files:**
- Modify: `src/components/FeaturedCases.tsx`
- Delete: `src/components/CaseCard.tsx`, `src/components/CaseCard.module.css`, `src/components/CasesCarousel.tsx`, `src/components/CasesCarousel.module.css`

**Interfaces:**
- Consumes: `CasesSpotlight` (Task 1, default export).
- Produces: el home renderiza el spotlight; el coverflow deja de existir.

- [ ] **Step 1: Editar `src/components/FeaturedCases.tsx`**

Cambiar el import del carrusel y el JSX montado. Reemplazar la línea de import:

```tsx
import CasesCarousel from './CasesCarousel';
```

por:

```tsx
import CasesSpotlight from './CasesSpotlight';
```

Y reemplazar el bloque montado:

```tsx
        <div className={styles.carousel} style={{ transitionDelay: '200ms' }}>
          <CasesCarousel cases={CASES} />
        </div>
```

por:

```tsx
        <div className={styles.carousel} style={{ transitionDelay: '200ms' }}>
          <CasesSpotlight cases={CASES} />
        </div>
```

(El resto de `FeaturedCases.tsx` — header, `CASES`, los 2 CTAs, imports de diagramas y del tipo `CaseStudyData` — no cambia. `FeaturedCases.module.css` no se toca: la clase `.carousel` sigue sirviendo como objetivo del scroll-reveal.)

- [ ] **Step 2: Eliminar los archivos del coverflow**

```bash
git rm src/components/CaseCard.tsx src/components/CaseCard.module.css src/components/CasesCarousel.tsx src/components/CasesCarousel.module.css
```

- [ ] **Step 3: Verificar que no queden referencias**

Run (grep): buscar `CaseCard` y `CasesCarousel` en `src/`. Expected: cero coincidencias (aparte de las ya eliminadas). Si aparece alguna, corregir antes de continuar.

- [ ] **Step 4: Verificar lint y build**

Run: `npm run lint` (a nivel de archivos tocados) y `npm run build`.
Expected: `npm run build` completa sin errores (confirma que no quedan imports rotos tras el borrado).

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturedCases.tsx
git commit -m "feat(desarrollo): montar Spotlight en Casos destacados y retirar coverflow

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

(El `git rm` ya deja los borrados en el índice; se incluyen en este commit junto con `FeaturedCases.tsx`.)

---

### Task 3: Gate de revisión UX/diseño y verificación final

**Files:**
- Modify (si la revisión lo amerita): `src/components/CasesSpotlight.tsx`, `src/components/CasesSpotlight.module.css`

- [ ] **Step 1: Lente de revisión UX/diseño**

Usar `ui-ux-pro-max` + `frontend-design` como lente de crítica (dirección la fija `docs/design-system.md`) sobre `CasesSpotlight`. Auditar: patrón tabs (roles, roving tabindex, activación, foco visible), contraste AA de miniaturas/pills, estado activo/hover, jerarquía foco vs riel vs los 2 CTAs, coherencia del `CaseStudy` reutilizado, y reduced-motion.

- [ ] **Step 2: Triar y corregir hallazgos**

Contrastar con `docs/design-system.md`; aplicar solo lo alineado. Backlog lo que exceda el alcance.

- [ ] **Step 3: Verificación final**

Run: `npm run lint` (archivos tocados) + `npm run build`. Expected: pasan.
Confirmar criterios de aceptación del spec (Revisión 2026-07-08b §Criterios): foco + ride de 4 miniaturas, clic cambia foco con fundido, teclado tabs completo, reduced-motion sin fundido, móvil apila, ARIA de tabs, header + 2 CTAs intactos, `CaseStudy` sin romper su uso editorial.

- [ ] **Step 4: Commit (si hubo correcciones)**

```bash
git add -- src/components/CasesSpotlight.tsx src/components/CasesSpotlight.module.css
git commit -m "polish(desarrollo): ajustes UX/a11y del spotlight de casos tras gate

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Notas (self-review del plan)

- **Cobertura del spec (Revisión 2026-07-08b):** arquitectura + interacción tabs → Task 1; montaje + retiro coverflow → Task 2; a11y/gate + verificación → Task 3. Fondo claro, header/CTAs y reutilización de `CaseStudy` respetados; `CaseStudy` no se modifica.
- **Sin em dash** en el código/aria de los componentes.
- **Consistencia de tipos:** `CaseStudyData` importado de `CaseStudy.tsx`; `CasesSpotlight` expone `{ cases: CaseStudyData[] }`; `FeaturedCases` pasa `CASES` tipado. Clases CSS (`wrap/panel/rail/thumb/thumbOn/thumbTitle/pill/dev/auto`) usadas igual en `.tsx` y `.module.css`.
- **Sin tests unitarios** (no hay framework): verificación por lint + build + navegador.
