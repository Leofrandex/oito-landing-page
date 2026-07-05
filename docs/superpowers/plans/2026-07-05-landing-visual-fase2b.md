# Fase 2b Visual (sistema Button + accesibilidad) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidar los 7 CTAs bespoke en un componente `<Button>` (§3) y aplicar los fixes de accesibilidad de la revisión UX (contraste `--mint-ink`, `:focus-visible`, touch target).

**Architecture:** Un componente presentacional `<Button>` en `ui/` con render polimórfico (link externo `<a>` / ruta interna `<Link>` / `<button>`) y 3 variantes. Antes, una tarea de fundaciones de accesibilidad en `globals.css`. Sin lógica nueva; verificación por build + captura visual.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, `clsx` (ya es dependencia).

## Global Constraints

- **Variantes §3:** primary (fill mint, hover invierte a blanco), secondary (mint 12% + borde, hover rellena), tertiary (link mint + flecha que desliza). Píldora `radius 9999px`, DM Sans 700, ease bouncy `cubic-bezier(.175,.885,.32,1.275)`.
- **Tamaños:** default `min-height:52px`; sm `min-height:44px` (≥44 por §2 táctil).
- **Contraste (design-system §0.4):** texto/ícono mint sobre **claro** usa `--mint-ink #0c8060`; sobre **oscuro** usa `--mint`. Aplica a `.badge`, tertiary y spans de acento.
- **Foco:** `:focus-visible` con anillo mint visible (global + Button).
- **WhatsApp:** `WHATSAPP_URL = 'https://wa.me/584241344659'` centralizado; 0 literales fuera de `constants.ts`.
- **Fuera de alcance:** `StickyWhatsAppCTA` como componente (solo usa la constante); variante `oitomatiza`; estado `disabled`.
- **No pushear.** Verificación: `npm run build` limpio + captura visual (controlador); no levantar servidores en subagentes.

---

### Task 1: Fundaciones de accesibilidad (contraste + foco)

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/WhyOito.module.css`

**Interfaces:**
- Produces: token CSS `--mint-ink`; `.badge` legible sobre claro; `:focus-visible` global. La Task 2 (Button) consume `--mint-ink`.

- [ ] **Step 1: Añadir `--mint-ink` a `:root` en `globals.css`**

En el bloque `:root` (sección "Semantic (worktree)"), tras la línea `--on-dark-soft: ...;` añadir:
```css
    --mint-ink: #0c8060; /* mint oscuro para texto/ícono mint sobre fondo claro (WCAG AA) */
```

- [ ] **Step 2: `.badge` a `--mint-ink` con override en oscuro**

Localizar en `globals.css` la regla `.badge { ... color: var(--mint); ... }` y cambiar `color: var(--mint);` por `color: var(--mint-ink);`. Inmediatamente **después** del bloque `.badge { ... }` añadir:
```css
.section-dark .badge { color: var(--mint); }
```

- [ ] **Step 3: `:focus-visible` global**

Añadir cerca de las utilidades globales (tras la regla `button { ... }`):
```css
:where(a, button, [tabindex]):focus-visible {
    outline: 2px solid var(--mint);
    outline-offset: 2px;
}
```
(`:where(...)` = especificidad 0, para que los estilos de foco del Button puedan sobreescribir. Nada de `border-radius` aquí: redondearía el elemento entero.)

- [ ] **Step 4: WhyOito — acento sobre claro a `--mint-ink`**

En `src/components/WhyOito.module.css`, la clase `.accent` (usada en "los ingresos sí" / "De lo técnico…", sección clara) — cambiar:
```css
.accent {
  color: var(--mint);
}
```
por:
```css
.accent {
  color: var(--mint-ink);
}
```

- [ ] **Step 5: Build + captura**

Run: `npm run build` → `✓ Compiled successfully`, 0 errores.
Captura de verificación (controlador): en secciones claras, los **badges** y el acento de WhyOito se ven en verde más oscuro y legible; en secciones oscuras los badges siguen en mint; el foco de teclado (Tab) muestra anillo mint.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/components/WhyOito.module.css
git commit -m "fix(a11y): --mint-ink para texto mint sobre claro + :focus-visible global"
```

---

### Task 2: Constante WhatsApp + componente `<Button>`

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.module.css`
- Modify: `src/components/StickyWhatsAppCTA.tsx` (usar la constante)

**Interfaces:**
- Produces: `WHATSAPP_URL: string`; `<Button variant size href external onClick className children>`. Tasks 3-4 consumen ambos.

- [ ] **Step 1: Crear `src/lib/constants.ts`**

```ts
export const WHATSAPP_URL = 'https://wa.me/584241344659';
```

- [ ] **Step 2: Crear `src/components/ui/Button.tsx`**

```tsx
import Link from 'next/link';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'default' | 'sm';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
};

/** CTA compartido (design-system §3). Render polimórfico: <a> externo, <Link> interno o <button>. */
export default function Button({
  variant = 'primary',
  size = 'default',
  href,
  external = false,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = clsx(styles.button, styles[variant], size === 'sm' && styles.sm, className);

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Crear `src/components/ui/Button.module.css`**

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 52px;
  padding: 0 1.9rem;
  border-radius: 9999px;
  font-family: var(--font-dm-sans), sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.2s ease,
    box-shadow 0.2s ease, color 0.2s ease;
}
.button:focus-visible { outline: 2px solid var(--mint); outline-offset: 3px; }

.sm { min-height: 44px; padding: 0 1.25rem; font-size: 0.9rem; }

/* primary */
.primary { background: var(--mint); color: var(--forest-deep); box-shadow: 0 0 34px rgba(9, 188, 138, 0.45); }
.primary:hover { background: #fff; color: var(--forest-deep); transform: translateY(-2px); box-shadow: 0 0 44px rgba(0, 255, 170, 0.55); }

/* secondary */
.secondary { background: rgba(9, 188, 138, 0.12); border: 1px solid rgba(9, 188, 138, 0.4); color: var(--forest-deep); }
.secondary:hover { background: var(--mint); color: var(--forest-deep); transform: translateY(-2px); }

/* tertiary (link) */
.tertiary { min-height: 0; padding: 0; background: none; color: var(--mint-ink); font-weight: 600; }
:global(.section-dark) .tertiary { color: var(--mint); }
.tertiary:hover { opacity: 0.85; }

/* flecha final desliza en hover (secondary + tertiary) */
.secondary svg:last-child, .tertiary svg:last-child { transition: transform 0.2s ease; }
.secondary:hover svg:last-child, .tertiary:hover svg:last-child { transform: translateX(4px); }

@media (prefers-reduced-motion: reduce) {
  .primary:hover, .secondary:hover { transform: none; }
  .secondary:hover svg:last-child, .tertiary:hover svg:last-child { transform: none; }
}
```

- [ ] **Step 4: `StickyWhatsAppCTA` usa la constante**

En `src/components/StickyWhatsAppCTA.tsx`: añadir `import { WHATSAPP_URL } from '@/lib/constants';` y reemplazar el literal `href="https://wa.me/584241344659"` por `href={WHATSAPP_URL}`.

- [ ] **Step 5: Build**

Run: `npm run build` → `✓ Compiled successfully`, 0 errores (el Button compila aunque aún no tenga consumidores).

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants.ts src/components/ui/Button.tsx src/components/ui/Button.module.css src/components/StickyWhatsAppCTA.tsx
git commit -m "feat(visual): componente Button (§3) + constante WHATSAPP_URL"
```

---

### Task 3: Aplicar Button en los CTAs primarios

**Files (cada uno .tsx + .module.css):** `Hero`, `FinalCTA`, `ServiceHero`, `RoiCalculator`, `Header`.

**Interfaces:** Consume `<Button>` (Task 2) y `WHATSAPP_URL`.

**Transformación (uniforme):** el CTA de WhatsApp `<a href="…wa.me…" className={styles.cta}><WhatsAppIcon …/> texto</a>`
→ `<Button variant="primary" external href={WHATSAPP_URL}><WhatsAppIcon …/> texto</Button>` (Header además `size="sm"`).
Añadir `import Button from '@/components/ui/Button';` y `import { WHATSAPP_URL } from '@/lib/constants';`.
Del módulo, **eliminar** la regla `.cta { … }` y su `:hover` (ya no se usan). Conservar el contenedor
(`.actions`/etc.) y el resto.

- [ ] **Step 1: Ejemplo canónico — Hero**

En `Hero.tsx`, reemplazar el bloque del CTA (dentro de `.actions`):
```tsx
          <a
            href="https://wa.me/584241344659"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <WhatsAppIcon size={22} />
            Hablemos por WhatsApp
          </a>
```
por:
```tsx
          <Button variant="primary" external href={WHATSAPP_URL}>
            <WhatsAppIcon size={22} />
            Hablemos por WhatsApp
          </Button>
```
Añadir los dos imports arriba. En `Hero.module.css`, borrar el bloque `.cta { … }` y `.cta:hover { … }`.

- [ ] **Step 2: Aplicar el mismo patrón a FinalCTA, ServiceHero, RoiCalculator**

Igual que Hero (mantener el `size` del `WhatsAppIcon` que cada uno ya usa; el texto de su CTA se conserva). Borrar el `.cta`/`.cta:hover` de cada módulo.

- [ ] **Step 3: Header — primary `sm`**

En `Header.tsx`, el CTA de WhatsApp (`<a href="…wa.me…" className={styles.cta}>`) → `<Button variant="primary" size="sm" external href={WHATSAPP_URL}>…</Button>`. **No** tocar los `<Link>` de navegación ni el `<button>` de la hamburguesa. Borrar `.cta`/`.cta:hover` de `Header.module.css`.

- [ ] **Step 4: Build + captura**

Run: `npm run build` → limpio. Captura: los CTAs primarios se ven idénticos/consistentes; hover invierte a blanco; el del Header en `sm`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.* src/components/FinalCTA.* src/components/ServiceHero.* src/components/RoiCalculator.* src/components/Header.*
git commit -m "feat(visual): CTAs primarios usan <Button variant=primary>"
```

---

### Task 4: Button secondary + tertiary + verificación final

**Files:** `FeaturedCases` (secondary), `TwoPillars` (tertiary cardLink), `Footer` (tertiary + `section-dark`).

**Interfaces:** Consume `<Button>` y `WHATSAPP_URL`.

- [ ] **Step 1: FeaturedCases — secondary**

En `FeaturedCases.tsx`, los dos `<Link href="…" className={styles.cta}>Ver … <ArrowRight … /></Link>`
→ `<Button variant="secondary" href="/desarrollo-web">Ver todo el desarrollo <ArrowRight size={18} strokeWidth={2} /></Button>`
y el análogo a `/automatizacion-ia`. Añadir `import Button from '@/components/ui/Button';`. Borrar `.cta { … }` y `.cta:hover { … }` de `FeaturedCases.module.css` (conservar `.ctas` contenedor).

- [ ] **Step 2: TwoPillars — tertiary**

En `TwoPillars.tsx`, `<Link href={pillar.href} className={styles.cardLink}>{pillar.linkLabel}</Link>`
→ `<Button variant="tertiary" href={pillar.href}>{pillar.linkLabel}</Button>`. Añadir el import.
Borrar `.cardLink { … }` y `.cardLink:hover { … }` de `TwoPillars.module.css`.

- [ ] **Step 3: Footer — tertiary + `section-dark`**

En `Footer.tsx`: reemplazar `<a href={WHATSAPP}><button className={styles.ctaButton}>Hablemos <ArrowRight size={16} /></button></a>`
por `<Button variant="tertiary" external href={WHATSAPP_URL}>Hablemos <ArrowRight size={16} /></Button>`.
Usar `import { WHATSAPP_URL } from '@/lib/constants';` y **reemplazar TODOS los usos** de la const
local `WHATSAPP` por `WHATSAPP_URL` (incluido el `href` del link social de WhatsApp), luego eliminar
la const local.
Asegurar que el elemento raíz del footer tenga la clase `section-dark` (Footer es oscuro → así el tertiary
usa `--mint`, no `--mint-ink`). Borrar `.ctaButton`/`.ctaLink` de `Footer.module.css` si quedan huérfanas.

- [ ] **Step 4: Verificación final (build + grep + captura)**

Run: `npm run build` → limpio, rutas OK.
Run: `grep -rn "wa.me/584241344659" src/` → solo `src/lib/constants.ts`.
Run: `grep -rnE "styles\.(cta|cardLink|ctaButton)\b" src/components/*.tsx` → 0 (todos migrados).
Captura Home + Automatización: primary consistente (hover blanco); secondary "Ver … →" (hover rellena, flecha desliza); tertiary con flecha; foco de teclado con anillo mint; contraste de tertiary/badges OK.

- [ ] **Step 5: Commit**

```bash
git add src/components/FeaturedCases.* src/components/TwoPillars.* src/components/Footer.*
git commit -m "feat(visual): CTAs secondary/tertiary usan <Button>; footer section-dark"
```

## Notas de cierre

- **Decisión abierta (NO se toca en este plan):** el wordmark "oito" en mint dentro de títulos de
  **secciones claras** (TwoPillars, FeaturedCases…) también tiene bajo contraste (~2.3:1). Es texto
  grande + marca; oscurecerlo a `--mint-ink` cambiaría el look del wordmark. Queda como decisión de
  marca vs AA a consultar con el usuario (fuera de esta fase).
- No entra: `oitomatiza`, `disabled`, el FAB sticky como componente.
- Al terminar, `oito-page-v5` tendrá ~4 commits nuevos de Fase 2b.
