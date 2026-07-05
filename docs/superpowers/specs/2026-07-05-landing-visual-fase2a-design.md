# Fase 2a Visual — Eyebrow badge + unificar clases de sección (design)

Fecha: 2026-07-05 · Rama: `oito-page-v5` · Iniciativa: **Visual**, Fase 2a (consistencia)

## Contexto

La Fase 2 (sistemas de componentes) se dividió en **2a (consistencia rápida)** y **2b (sistema
Button)**. Este spec cubre la **2a**, que tras auditoría se reduce a dos limpiezas:

1. **Eyebrow → badge (§4):** la clase `.eyebrow` está duplicada casi idéntica en 9 componentes.
   El design-system §4 la define como **badge tipo píldora**; hoy es texto suelto. Se unifica en
   una sola clase global con el estilo §4.
2. **Unificar clases de sección:** `TwoPillars` es el único componente que aún usa `.sectionLight`
   (camelCase, familia "v5"); el resto ya usa `.section-*` (guion, familia "worktree"). Se elimina
   la dualidad.

## Fuera de alcance

- **Glow bullets (§6):** no hay listas de beneficios en el contenido actual (los `<li>` existentes
  son tarjetas, pasos, tags, logos y navegación). Sin dónde aplicarlos → diferidos. Las clases
  `.glow-*` ya existen en `globals.css` para cuando haya contenido de listas.
- **Sistema Button (§3):** Fase 2b.
- **Chips "Tag de stack" y "Filtro" (§4):** no forman parte de esta pasada; solo el badge de sección.

## Parte 1 — Eyebrow → badge píldora global

**Regla §4 (Badge de sección):** Outfit 700 · uppercase · 11px · `bg rgba(9,188,138,.14)` ·
texto mint · borde mint 30% · altura 28.

**Componentes con eyebrow (9):** `AutomationCases`, `AutomationPillars`, `FeaturedCases`,
`HowWeWorkHome`, `Methodology`, `RoiCalculator`, `SolutionsGrid`, `TwoPillars`, `WhyOito`.

**Enfoque:** clase utilitaria **global** (no componente React) — el eyebrow es texto puro sin
lógica, la clase global es liviana, funciona en server components y no toma posesión del reveal
que cada sección ya define.

1. **`globals.css`:** añadir clase global `.badge`:
   ```css
   .badge {
     display: inline-flex; align-items: center; height: 28px;
     padding: 0 12px; border-radius: 999px;
     font-family: var(--font-outfit), var(--font-dm-sans), sans-serif;
     font-weight: 700; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
     color: var(--mint);
     background: rgba(9, 188, 138, 0.14);
     border: 1px solid rgba(9, 188, 138, 0.30);
   }
   ```
2. **En cada componente (JSX):** aplicar la clase global `badge` al elemento del eyebrow.
3. **En cada módulo (CSS):** quitar del bloque `.eyebrow` las propiedades **visuales de la píldora**
   (`font-size`, `font-weight`, `letter-spacing`, `text-transform`, `color`, `display`) — las que
   controla `.badge`. **Conservar:** (a) el hook de reveal (`opacity`, `transform`, `transition`)
   donde exista, para no romper la animación escalonada; y (b) el **espaciado/layout** (`margin`,
   o el `gap` del contenedor padre) que posiciona el badge respecto al título. Se quita `display`
   del módulo para que gane el `inline-flex` de `.badge` (necesario para centrar la píldora).
   Nota de especificidad: al quitar las props en conflicto del módulo, `.badge` (global) controla
   el visual sin depender del orden de carga CSS.
   - **Componentes con reveal `data-revealed`** (worktree: WhyOito, FeaturedCases, HowWeWorkHome,
     Methodology, SolutionsGrid, AutomationCases, AutomationPillars, RoiCalculator): el elemento
     lleva **ambas** clases → `className={\`badge ${styles.eyebrow}\`}`; el módulo mantiene
     `.eyebrow` solo con las props de reveal y sus selectores `[data-revealed] .eyebrow`.
   - **TwoPillars** (usa framer-motion; el eyebrow va dentro de un `motion.div` que anima al
     padre, el `.eyebrow` no tiene reveal propio): tras quitar el estilo visual, el módulo
     `.eyebrow` queda vacío → se elimina y el JSX usa solo `className="badge"`.

**Resultado:** una sola fuente de verdad para el badge; píldora consistente (§4) en todas las
secciones; eyebrows en Outfit; se elimina la duplicación de ~9 bloques CSS.

## Parte 2 — Unificar clases de sección

1. **`TwoPillars.tsx`:** cambiar la clase de sección `sectionLight` → `section-light`.
2. **`globals.css`:** eliminar las reglas duplicadas `.sectionLight` y `.sectionDark` (camelCase).
   Se conservan `.section-light` y `.section-dark` (guion) como únicas.
3. **Verificar** que no queda ningún uso de `sectionLight`/`sectionDark` en `src/` tras el cambio
   (`grep`).

## Criterios de éxito / verificación

- `npm run build` limpio (0 errores, TypeScript OK).
- Captura de Home y Automatización: **todos los eyebrows se ven como la misma píldora** (fondo mint
  translúcido + borde), en Outfit 700; las animaciones de reveal siguen funcionando.
- Fondos de sección sin cambios (el ritmo oscuro/claro se mantiene).
- `grep` confirma 0 usos de `sectionLight`/`sectionDark` y una sola definición del badge.
- Sin regresiones de contraste ni layout.

## Archivos afectados

- `src/app/globals.css` (añadir `.badge`; quitar `.sectionLight`/`.sectionDark`)
- 9 componentes con eyebrow: `*.tsx` (aplicar clase `badge`) + `*.module.css` (quitar visual de
  `.eyebrow`, conservar reveal): AutomationCases, AutomationPillars, FeaturedCases, HowWeWorkHome,
  Methodology, RoiCalculator, SolutionsGrid, TwoPillars, WhyOito
- `src/components/TwoPillars.tsx` (además: `sectionLight` → `section-light`)
