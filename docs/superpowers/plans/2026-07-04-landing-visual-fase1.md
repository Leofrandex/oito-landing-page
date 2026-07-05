# Fase 1 Visual (Outfit + SocialProof oscuro + ritmo) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar la primera fase de cumplimiento del design-system al Home: tipografía Outfit en todos los titulares, SocialProof en oscuro con cajas glass, y el ritmo oscuro/claro correcto.

**Architecture:** Cambio fundacional primero (cargar Outfit + regla global de headings), luego corregir los dos componentes que sobreescriben la fuente con Varela Round (TwoPillars, SocialProof), y rediseñar SocialProof a oscuro. Sin lógica nueva: son cambios de tipografía y CSS presentacional. Verificación por `npm run build` + captura visual (no hay tests unitarios para CSS).

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, CSS Modules, `next/font/google`.

## Global Constraints

- **Tipografía (design-system §1):** Outfit para titulares (800 hero / 700 secciones / 600–700 tarjetas); DM Sans para cuerpo y UI; **Varela Round SOLO para el wordmark "oito"** (clase global `.wordmark`). El CTA de WhatsApp va en DM Sans 700 (no cambiar).
- **Regla §0:** todo heading sobre fondo oscuro DEBE ir en color claro (`var(--on-dark)` = `#eafff6`) con leve `text-shadow` para contraste sobre los hilos.
- **Glass (§0/§2):** `.glass` casi no tiene relleno propio → solo funciona con hilos visibles detrás. SocialProof oscuro los tiene (base `--forest-deep` transparente sobre el canvas global).
- **Accesibilidad:** WCAG AA; respetar `prefers-reduced-motion` (sin regresiones).
- **No pushear** (decisión del usuario). Commits locales en `oito-page-v5`.
- **Verificación visual (cada tarea):** tras `npm run build` limpio, levantar `npx next start -p 3030` y capturar la ruta con el script puppeteer existente en el scratchpad
  `C:\Users\SEBAST~1.CAS\AppData\Local\Temp\claude\C--Users-sebastian-castro-Documents-oito-Pagina-web-landing-page-v4\ec7cc687-4c1f-4a55-a2ea-8bf2acb1b88b\scratchpad\compare\shot-merged.js`
  (ajustar la constante `TARGETS` al puerto 3030 y a la ruta que corresponda). Luego leer el PNG y comparar contra lo esperado. Detener el server al terminar (`taskkill //PID <pid> //F` del puerto 3030).

---

### Task 1: Cargar Outfit y aplicarlo a los headings

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: variable CSS `--font-outfit` disponible globalmente; regla `h1–h6 { font-family: var(--font-outfit) … }`. Las Tareas 2 y 3 dependen de que esta regla exista.

- [ ] **Step 1: Importar y configurar Outfit en `layout.tsx`**

Reemplazar la línea de import (línea 2):
```tsx
import { Varela_Round, DM_Sans } from "next/font/google";
```
por:
```tsx
import { Varela_Round, DM_Sans, Outfit } from "next/font/google";
```

Añadir la config de Outfit justo después del bloque `dmSans` (tras la línea 20):
```tsx
const outfit = Outfit({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-outfit",
});
```

- [ ] **Step 2: Añadir la variable al `<body>`**

Reemplazar (línea 35):
```tsx
      <body className={`${varelaRound.variable} ${dmSans.variable} antialiased`}>
```
por:
```tsx
      <body className={`${varelaRound.variable} ${dmSans.variable} ${outfit.variable} antialiased`}>
```

- [ ] **Step 3: Aplicar Outfit a los headings en `globals.css`**

Localizar la regla de headings (empieza con el comentario "Headings use the body font…") y reemplazar el bloque:
```css
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.01em;
}
```
por:
```css
/* Titulares en Outfit (design-system §1). Varela Round queda reservado al wordmark "oito". */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-outfit), var(--font-dm-sans), sans-serif;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.01em;
}
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores, TypeScript OK, rutas generadas.

- [ ] **Step 5: Captura de verificación**

Levantar `npx next start -p 3030`, capturar `http://localhost:3030/` (ver Global Constraints).
Esperado: los titulares de las secciones del worktree (WhyOito "El tiempo no se recupera", FeaturedCases "Lo que oito ya ha construido", HowWeWork "Cómo oito lo hace", FinalCTA "¿Listo para…") ahora en **Outfit**. El tagline del Hero "lo hace por ti" en **Outfit**; el "oito" grande sigue en **Varela Round**. TwoPillars y SocialProof **todavía** en Varela Round (se corrigen en Task 2/3). Detener el server.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat(visual): cargar Outfit y aplicarlo a los headings (design-system §1)"
```

---

### Task 2: TwoPillars — títulos a Outfit + wordmark

**Files:**
- Modify: `src/components/TwoPillars.module.css:30` (`.title`), `:98` (`.cardTitle`)
- Modify: `src/components/TwoPillars.tsx` (span "oito")

**Interfaces:**
- Consumes: regla global `h1–h6 → Outfit` (Task 1), clase global `.wordmark`.

- [ ] **Step 1: Quitar Varela Round de `.title` en `TwoPillars.module.css`**

En `.title` (línea ~18-24) eliminar la línea:
```css
  font-family: var(--font-varela-round), sans-serif;
```
(El `h2` heredará Outfit de la regla global.)

- [ ] **Step 2: Quitar Varela Round de `.cardTitle`**

En `.cardTitle` (línea ~86-92) eliminar la línea:
```css
  font-family: var(--font-varela-round), sans-serif;
```
Añadir en su lugar, dentro de `.cardTitle`:
```css
  font-family: var(--font-outfit), var(--font-dm-sans), sans-serif;
  font-weight: 700;
```
(Los `h3` de tarjeta llevan peso 700 explícito según §1.)

- [ ] **Step 3: Envolver "oito" del título en `.wordmark` (`TwoPillars.tsx`)**

Localizar en el `<h2 className={styles.title}>`:
```tsx
            Dos formas en que{' '}
            <span className={styles.mintText}>oito</span>{' '}
            lo resuelve
```
Reemplazar el span por:
```tsx
            <span className={`${styles.mintText} wordmark`}>oito</span>
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores.

- [ ] **Step 5: Captura de verificación**

Capturar `http://localhost:3030/` (server de Task 1 o relanzar).
Esperado: título "Dos formas en que oito lo resuelve" con "Dos formas…/lo resuelve" en **Outfit** y "oito" en **Varela Round** (mint); títulos de tarjeta ("Desarrollo web & software", "Automatización & IA") en **Outfit**. El eyebrow "DOS PILARES · UN EQUIPO" sin cambios.

- [ ] **Step 6: Commit**

```bash
git add src/components/TwoPillars.tsx src/components/TwoPillars.module.css
git commit -m "fix(visual): TwoPillars títulos a Outfit; wordmark 'oito' en Varela Round"
```

---

### Task 3: SocialProof → oscuro (glass) + Outfit + wordmark

**Files:**
- Modify: `src/components/SocialProof.tsx` (clase de sección + wordmark)
- Modify: `src/components/SocialProof.module.css` (título, cajas glass, colores oscuros)

**Interfaces:**
- Consumes: regla global `h1–h6 → Outfit` (Task 1); clase global `.wordmark`; utilidad `.section-dark`; tokens `--on-dark`, `--on-dark-soft`.

- [ ] **Step 1: Sección a oscuro + wordmark en `SocialProof.tsx`**

Reemplazar la apertura de sección:
```tsx
    <section className={`sectionLight ${styles.section}`}>
```
por:
```tsx
    <section className={`section-dark ${styles.section}`}>
```

Envolver el "oito" del título — reemplazar:
```tsx
          Negocios que ya dejaron que <span className={styles.mintText}>oito</span> lo haga por ellos
```
por:
```tsx
          Negocios que ya dejaron que <span className={`${styles.mintText} wordmark`}>oito</span> lo haga por ellos
```

- [ ] **Step 2: Título a Outfit + color claro en `SocialProof.module.css`**

Reemplazar el bloque `.title` (líneas ~19-28):
```css
.title {
  font-family: var(--font-varela-round, sans-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-dark);
  text-align: center;
  line-height: 1.2;
  max-width: 600px;
  margin: 0;
}
```
por:
```css
.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--on-dark);
  text-shadow: 0 2px 18px rgba(0, 20, 22, 0.55);
  text-align: center;
  line-height: 1.2;
  max-width: 600px;
  margin: 0;
}
```
(Sin `font-family` → hereda Outfit del `h2` global.)

- [ ] **Step 3: Cajas de logo → glass sobre oscuro**

Reemplazar el bloque `.logoPlaceholder` (líneas ~44-57):
```css
.logoPlaceholder {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 67, 70, 0.05);
  border: 1px solid rgba(9, 188, 138, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 67, 70, 0.06);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
}
```
por:
```css
.logoPlaceholder {
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(9, 188, 138, 0.22);
  border-radius: 22px;
  backdrop-filter: blur(7px) saturate(1.2);
  -webkit-backdrop-filter: blur(7px) saturate(1.2);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.10);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
}
```

- [ ] **Step 4: Hover y placeholder icon a tonos oscuros**

Reemplazar el bloque `.logoPlaceholder:hover` (líneas ~59-63):
```css
.logoPlaceholder:hover {
  background: rgba(0, 67, 70, 0.09);
  border-color: rgba(9, 188, 138, 0.38);
  box-shadow: 0 8px 28px rgba(0, 67, 70, 0.1);
}
```
por:
```css
.logoPlaceholder:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(9, 188, 138, 0.42);
  box-shadow: 0 16px 40px rgba(9, 188, 138, 0.16);
}
```

Reemplazar el bloque `.placeholderIcon` (líneas ~76-82):
```css
.placeholderIcon {
  font-size: 3rem;
  color: var(--color-text-charcoal);
  opacity: 0.3;
  font-weight: 300;
  line-height: 1;
}
```
por:
```css
.placeholderIcon {
  font-size: 3rem;
  color: var(--on-dark-soft);
  opacity: 0.6;
  font-weight: 300;
  line-height: 1;
}
```

- [ ] **Step 5: Ajustar el reset de `prefers-reduced-motion`**

Reemplazar el bloque reduced-motion de `.logoPlaceholder` (líneas ~65-74):
```css
@media (prefers-reduced-motion: reduce) {
  .logoPlaceholder {
    transition: none;
  }
  .logoPlaceholder:hover {
    background: rgba(0, 67, 70, 0.05);
    border-color: rgba(9, 188, 138, 0.22);
    box-shadow: 0 4px 16px rgba(0, 67, 70, 0.06);
  }
}
```
por:
```css
@media (prefers-reduced-motion: reduce) {
  .logoPlaceholder {
    transition: none;
  }
  .logoPlaceholder:hover {
    transform: none;
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(9, 188, 138, 0.22);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.10);
  }
}
```

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores.

- [ ] **Step 7: Captura de verificación**

Capturar `http://localhost:3030/`.
Esperado: la sección "Negocios que ya dejaron que oito lo haga por ellos" ahora en **fondo oscuro** con los **hilos visibles detrás**; título en Outfit color claro con "oito" en Varela Round + mint; las 5 cajas como **glass translúcido** (borde mint, blur) con el "—" en tono claro tenue. Contraste legible (WCAG AA).

- [ ] **Step 8: Commit**

```bash
git add src/components/SocialProof.tsx src/components/SocialProof.module.css
git commit -m "feat(visual): SocialProof a oscuro con cajas glass + título Outfit (ritmo D·L·D·L·D·L·D·D·D)"
```

---

### Task 4: Verificación final del Home + spot-check Hero

**Files:**
- Read-only: `src/components/Hero.tsx`, `src/components/Hero.module.css` (spot-check; solo modificar si se detecta una violación)

**Interfaces:**
- Consumes: resultado de Tasks 1-3.

- [ ] **Step 1: Spot-check del Hero**

Confirmar en `Hero.tsx`/`Hero.module.css` que:
- El "oito" grande usa la clase global `wordmark` (línea `<span className={`${styles.wordmark} wordmark`}>oito</span>`) → Varela Round. ✔ esperado sin cambios.
- El tagline "lo hace por ti" no setea `font-family` propio → hereda Outfit. ✔ esperado sin cambios.
- `.cta` y `.skip` siguen en DM Sans (UI). ✔ esperado sin cambios.

Si todo se cumple, no hay edición. Si algún título del Hero quedara en DM Sans/Varela indebidamente, corregirlo a Outfit (headings) o `.wordmark` (solo "oito").

- [ ] **Step 2: Build final**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 0 errores, TypeScript OK, todas las rutas (`/`, `/automatizacion-ia`, `/desarrollo-web`, `/design-system`).

- [ ] **Step 3: Captura completa del Home + checklist**

Capturar `http://localhost:3030/` (página completa). Verificar contra el design-system:
- [ ] Todos los titulares de sección en **Outfit**.
- [ ] Cada "oito" en **Varela Round** (hero, TwoPillars, SocialProof, etc.).
- [ ] SocialProof en **oscuro** con cajas glass e hilos detrás.
- [ ] Ritmo de fondos: `Hero(D) · TwoPillars(L) · SocialProof(D) · WhyOito(L) · BeforeAfter(D) · FeaturedCases(L) · HowWeWork(D) · FinalCTA(D) · Footer(D)`.
- [ ] Sin regresiones de contraste ni layout.

- [ ] **Step 4: Commit (si hubo cambios en Hero) + cierre**

Si el Step 1 requirió editar Hero:
```bash
git add src/components/Hero.tsx src/components/Hero.module.css
git commit -m "fix(visual): Hero spot-check tipografía Outfit/wordmark"
```
Si no hubo cambios, no commitear (la verificación queda registrada en la captura). Detener el server de `next start` (puerto 3030).

---

## Notas de cierre

- Esta fase **no** toca botones, chips/badges, glow bullets ni nodos (Fases 2 y 3 del design-system).
- No se elimina la dependencia de fuentes ni se toca `agents.md`/`CLAUDE.md` (ya reflejan Outfit).
- Al terminar, `oito-page-v5` tendrá ~4 commits nuevos de la Fase 1 (sin pushear hasta que el usuario lo indique).
