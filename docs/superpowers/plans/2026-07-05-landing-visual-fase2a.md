# Fase 2a Visual (eyebrow badge + unificar clases de sección) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Estandarizar el eyebrow duplicado en una clase global `.badge` (píldora §4) y eliminar la dualidad de clases de sección.

**Architecture:** Una clase utilitaria global `.badge` (bloque `fit-content` centrado con `margin-inline:auto`, así se centra en cualquier contenedor sin trabajo por componente) reemplaza el estilo visual del `.eyebrow` en 9 componentes; el hook de reveal de cada módulo se conserva. Aparte, `TwoPillars` migra a `.section-light` y se borran las clases camelCase de `globals.css`. Sin lógica nueva: CSS/JSX presentacional. Verificación por build + captura visual.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules.

## Global Constraints

- **Badge §4:** Outfit 700 · uppercase · 11px · `bg rgba(9,188,138,.14)` · texto mint (`var(--mint)`) · borde `rgba(9,188,138,.30)` · altura ~28 · radio píldora.
- Los 9 eyebrows están **centrados** → `.badge` se centra con `margin-inline:auto` (no tocar la alineación por componente, salvo WhyOito que centra en el propio `.eyebrow`).
- **Conservar** el reveal escalonado de cada sección (no tocar los grupos `.eyebrow, .title { opacity:0 }` ni `[data-revealed] .eyebrow`) y el espaciado (ej. `margin-bottom` de TwoPillars).
- Varela Round solo en el wordmark "oito"; el badge va en Outfit (regla §4).
- **No pushear** (decisión del usuario). Commits locales en `oito-page-v5`.
- **Verificación visual (controlador):** cada tarea cierra con `npm run build` limpio + commit. La captura visual consolidada la hace el controlador tras las tareas (no levantar servidores en los subagentes).

---

### Task 1: Unificar clases de sección

**Files:**
- Modify: `src/components/TwoPillars.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: `TwoPillars.tsx` → usar `.section-light`**

Localizar la apertura de sección:
```tsx
    <section className={`sectionLight ${styles.section}`}>
```
Reemplazar por:
```tsx
    <section className={`section-light ${styles.section}`}>
```

- [ ] **Step 2: Quitar las clases camelCase de `globals.css`**

Localizar y eliminar estas dos líneas (la sección "v5 (camelCase)"):
```css
/* v5 (camelCase) — usados por TwoPillars / SocialProof / Hero */
.sectionDark { position: relative; color: #fff; }
.sectionLight { position: relative; background: var(--color-mint-light, #f4fcf9); color: #1a1a1a; }
```
(Se conservan `.section-dark` y `.section-light`.)

- [ ] **Step 3: Verificar 0 usos camelCase**

Run: `grep -rnE "sectionLight|sectionDark" src/`
Expected: sin resultados (0 coincidencias).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/TwoPillars.tsx src/app/globals.css
git commit -m "refactor(visual): unificar clases de sección (.section-light) y quitar camelCase"
```

---

### Task 2: Clase global `.badge` + aplicar a TwoPillars y WhyOito

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/TwoPillars.tsx`, `src/components/TwoPillars.module.css`
- Modify: `src/components/WhyOito.tsx`, `src/components/WhyOito.module.css`

**Interfaces:**
- Produces: clase global `.badge` (píldora §4). La Task 3 la consume aplicándola en los 7 componentes restantes.

- [ ] **Step 1: Añadir `.badge` a `globals.css`**

Añadir tras el bloque `.accent-mint` (junto a las utilidades globales):
```css
/* Badge de sección (eyebrow) — design-system §4. Píldora centrada. */
.badge {
    display: block;
    width: fit-content;
    margin-inline: auto;
    padding: 6px 13px;
    border-radius: 999px;
    font-family: var(--font-outfit), var(--font-dm-sans), sans-serif;
    font-weight: 700;
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--mint);
    background: rgba(9, 188, 138, 0.14);
    border: 1px solid rgba(9, 188, 138, 0.30);
}
```

- [ ] **Step 2: TwoPillars JSX → clase `badge`**

En `TwoPillars.tsx` reemplazar:
```tsx
          <p className={styles.eyebrow}>Dos pilares · un equipo</p>
```
por:
```tsx
          <p className={`badge ${styles.eyebrow}`}>Dos pilares · un equipo</p>
```

- [ ] **Step 3: TwoPillars module → quitar visual, conservar espaciado**

En `TwoPillars.module.css` reemplazar el bloque `.eyebrow`:
```css
.eyebrow {
  display: inline-block;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.9rem;
}
```
por (solo el espaciado; el visual lo da `.badge`):
```css
.eyebrow {
  margin-bottom: 0.9rem;
}
```

- [ ] **Step 4: WhyOito JSX → clase `badge`**

En `WhyOito.tsx` reemplazar:
```tsx
          <p className={styles.eyebrow} style={{ transitionDelay: '0ms' }}>
```
por:
```tsx
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
```

- [ ] **Step 5: WhyOito module → quitar el bloque visual `.eyebrow`**

En `WhyOito.module.css` eliminar por completo el bloque visual (líneas ~20-27):
```css
.eyebrow {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--mint);
  text-align: center;
}
```
(El `text-align:center` ya no hace falta: `.badge` se centra con `margin-inline:auto`. **No tocar** el grupo de reveal `.eyebrow, .arg { opacity:0; ... }` ni `.inner[data-revealed] .eyebrow` — siguen referenciando `.eyebrow`, que el elemento aún tiene.)

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/components/TwoPillars.tsx src/components/TwoPillars.module.css src/components/WhyOito.tsx src/components/WhyOito.module.css
git commit -m "feat(visual): clase global .badge (§4) + aplicar en TwoPillars y WhyOito"
```

---

### Task 3: Aplicar `.badge` a los 7 componentes restantes

**Files (cada uno .tsx + .module.css):**
- `FeaturedCases`, `HowWeWorkHome`, `Methodology`, `RoiCalculator`, `SolutionsGrid`, `AutomationCases`, `AutomationPillars`

**Interfaces:**
- Consumes: clase global `.badge` (Task 2).

**Transformación uniforme (idéntica para los 7):** cada uno tiene un eyebrow centrado por su
contenedor (`text-align:center` en `.head`/`.inner`) y una clase `.eyebrow` con solo estilo
visual (`font-size` 0.8–0.82rem, `font-weight:700`, `letter-spacing` 0.22–0.24em,
`text-transform:uppercase`, `color:var(--mint)`), a veces también dentro de un grupo de reveal
`.eyebrow, .title { opacity:0; ... }`.

Para **cada** componente:
1. **JSX:** cambiar `className={styles.eyebrow}` → `` className={`badge ${styles.eyebrow}`} `` (conservar el `style={{ transitionDelay: ... }}` si lo tiene).
2. **Module CSS:** en el bloque **standalone** `.eyebrow { ... }` quitar las props visuales
   (`font-size`, `font-weight`, `letter-spacing`, `text-transform`, `color`). Si el bloque queda
   vacío, eliminarlo. **No tocar** los grupos de reveal (`.eyebrow, .title { opacity:0 }`,
   `[data-revealed] .eyebrow`, y el bloque `prefers-reduced-motion`) — siguen usando `.eyebrow`.

- [ ] **Step 1: Ejemplo canónico — FeaturedCases**

JSX (`FeaturedCases.tsx`): reemplazar
```tsx
          <p className={styles.eyebrow} style={{ transitionDelay: '0ms' }}>
```
por
```tsx
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
```
Module (`FeaturedCases.module.css`): en el bloque standalone `.eyebrow { ... }` borrar las líneas
`font-size`, `font-weight`, `letter-spacing`, `text-transform`, `color`. Si queda vacío, borrar el
bloque. Dejar intactos los grupos `.eyebrow, .title, .lede, .row, .ctas { ... }` de reveal.

- [ ] **Step 2: Aplicar la misma transformación a los otros 6**

Repetir exactamente el patrón del Step 1 en:
`HowWeWorkHome`, `Methodology`, `RoiCalculator`, `SolutionsGrid`, `AutomationCases`, `AutomationPillars`.
(RoiCalculator no tiene `style={{transitionDelay}}` en su eyebrow — solo `className`; el resto sí.)

- [ ] **Step 3: Verificar que no quedó estilo visual suelto de eyebrow**

Run: `grep -rnE "\.eyebrow \{" src/components/*.module.css | wc -l` y revisar que los bloques
restantes solo contengan reveal/vacío. Opcional: `grep -rn "styles.eyebrow" src/components/*.tsx`
debe mostrar los 9 ahora con `badge` delante.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturedCases.* src/components/HowWeWorkHome.* src/components/Methodology.* src/components/RoiCalculator.* src/components/SolutionsGrid.* src/components/AutomationCases.* src/components/AutomationPillars.*
git commit -m "feat(visual): aplicar .badge a los 7 componentes restantes"
```

---

### Task 4: Verificación visual consolidada (controlador)

- [ ] **Step 1: Build final**

Run: `npm run build` → `✓ Compiled successfully`, 0 errores, rutas `/`, `/automatizacion-ia`, `/desarrollo-web`, `/design-system`.

- [ ] **Step 2: Captura y checklist**

Levantar `npx next start -p 3030`, capturar Home y `/automatizacion-ia`. Verificar:
- [ ] Los eyebrows de TODAS las secciones se ven como la **misma píldora** (fondo mint translúcido + borde), centrados, en Outfit 700 uppercase.
- [ ] Las animaciones de reveal siguen funcionando (los eyebrows aparecen con la sección).
- [ ] Fondos de sección sin cambios (ritmo D·L·D·L·D·L·D·D·D intacto; TwoPillars sigue claro).
- [ ] Sin regresiones de espaciado (badge separado del título como antes).

Detener el server (`taskkill` del PID en 3030).

## Notas de cierre

- No entra: glow bullets (sin contenido de listas), sistema Button (Fase 2b), chips de stack/filtro.
- Al terminar, `oito-page-v5` tendrá 3 commits nuevos de Fase 2a (sin pushear).
