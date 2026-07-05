# Fase 2b Visual — Sistema Button compartido (design)

Fecha: 2026-07-05 · Rama: `oito-page-v5` · Iniciativa: **Visual**, Fase 2b

## Contexto

Los CTAs del sitio están duplicados como `.cta`/`.ctaButton`/`.cardLink` bespoke en 7 componentes,
con valores y tokens inconsistentes y sin el ease "bouncy" del design-system §3. Esta fase los
consolida en un componente compartido `<Button>` con las 3 variantes en uso.

## Alcance

- **En alcance:** componente `<Button>` (variantes primary/secondary/tertiary, tamaños default/sm,
  render polimórfico link/`<a>`/`<button>`), reemplazo en 7 componentes, centralizar la URL de
  WhatsApp, y los **fixes de accesibilidad de la revisión UX** (2026-07-05): `--mint-ink` para
  texto mint sobre claro, `:focus-visible` global + en el Button, y `sm` a 44px (ver §Accesibilidad).
- **Fuera de alcance:** `StickyWhatsAppCTA` (FAB flotante, verde WhatsApp, persistente — queda como
  componente aparte, pero usará la constante de URL). Variante `oitomatiza` (§3, sin consumidor).
  Estado `disabled` (ningún CTA lo usa hoy; se añade cuando haga falta).

## Componente

**Ubicación:** `src/components/ui/Button.tsx` + `src/components/ui/Button.module.css`.
Presentacional, **sin `'use client'`** (elige el tag por props; no usa hooks). Consumible desde
componentes server o client.

**API:**
```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';   // default 'primary'
  size?: 'default' | 'sm';                            // default 'default'
  href?: string;
  external?: boolean;                                 // true → <a target=_blank>; false → next/link
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;                          // texto + ícono opcional
};
```

**Render (por props):**
- `href` + `external` → `<a href target="_blank" rel="noopener noreferrer">`
- `href` sin `external` → `<Link href>` (next/link) para rutas internas
- sin `href` → `<button type="button" onClick>`
- Clases: `clsx(styles.button, styles[variant], size==='sm' && styles.sm, className)`.

**Íconos:** vía `children` (ej. `<Button variant="primary" external href={WHATSAPP_URL}><WhatsAppIcon size={22}/> Hablemos por WhatsApp</Button>`). El CSS maneja el `gap` y el deslizamiento de la flecha final en hover.

## Variantes (valores exactos; tokens compartidos `--mint`/`--forest-deep`)

Base común (`.button`): `display:inline-flex; align-items:center; gap:0.55rem; border-radius:9999px;
font-family:var(--font-dm-sans),sans-serif; font-weight:700; text-decoration:none; cursor:pointer;
transition: transform .2s cubic-bezier(.175,.885,.32,1.275), background-color .2s ease, box-shadow .2s ease, color .2s ease;`

- **primary:** `background:var(--mint); color:var(--forest-deep); box-shadow:0 0 34px rgba(9,188,138,.45);`
  · hover: `background:#fff; color:var(--forest-deep); transform:translateY(-2px); box-shadow:0 0 44px rgba(0,255,170,.55);`
- **secondary:** `background:rgba(9,188,138,.12); border:1px solid rgba(9,188,138,.40); color:var(--forest-deep);`
  · hover: `background:var(--mint); color:var(--forest-deep); transform:translateY(-2px);`
- **tertiary:** `background:none; color:var(--mint-ink); padding:0;` (link; `--mint-ink` pasa AA sobre
  claro. En `.section-dark` el color sube a `var(--mint)`.) · flecha final: `.button.tertiary svg:last-child`
  con `transition:transform .2s ease`, hover → `transform:translateX(4px)`. hover del texto: `opacity:.85`.

Deslizamiento de flecha también en **secondary** (flecha final desliza en hover), no en primary (ícono es líder).

## Tamaños

- **default:** `min-height:52px; padding:0 1.9rem; font-size:1rem;` (preserva el tamaño actual sustancial; ≥44px de §3).
- **sm:** `min-height:44px; padding:0 1.25rem; font-size:0.9rem;` (para el CTA del Header; ≥44px por §2 táctil).
- **tertiary** ignora min-height/padding de tamaño (es un link inline).

`@media (prefers-reduced-motion: reduce)`: sin `transform` en hover (ni lift ni deslizamiento).

## Mapeo de reemplazo

| Variante | Componente | CTA actual → acción |
|---|---|---|
| primary | `Hero`, `FinalCTA`, `ServiceHero`, `RoiCalculator` | `<a className={styles.cta}>` (WhatsApp) → `<Button variant="primary" external href={WHATSAPP_URL}>` |
| primary `sm` | `Header` | CTA WhatsApp pequeño → `<Button variant="primary" size="sm" external href={WHATSAPP_URL}>` |
| secondary | `FeaturedCases` | `<Link className={styles.cta}>Ver … <ArrowRight/></Link>` → `<Button variant="secondary" href="/…">Ver … <ArrowRight/></Button>` |
| tertiary | `TwoPillars` (cardLink), `Footer` ("Hablemos →") | link con flecha → `<Button variant="tertiary" …>` |

En cada componente: reemplazar el JSX del CTA por `<Button>` y **eliminar** del módulo CSS las
reglas del CTA reemplazado (`.cta`, `.ctaButton`, `.cardLink`, y sus `:hover`). No tocar otros
estilos (layout de contenedores `.actions`/`.ctas` se conserva).

## Constante de WhatsApp

Crear `src/lib/constants.ts` con:
```ts
export const WHATSAPP_URL = 'https://wa.me/584241344659';
```
Reemplazar el literal `https://wa.me/584241344659` en todos los componentes que lo usan (los CTAs
primarios, `Footer`, y `StickyWhatsAppCTA`) por el import de `WHATSAPP_URL`.

## Accesibilidad (de la revisión UX 2026-07-05)

Hallazgos de la revisión con `ui-ux-pro-max`/`frontend-design`, triados contra el design-system:

1. **`--mint-ink` (contraste mint-texto sobre claro).** Añadir el token `--mint-ink: #0c8060` a
   `globals.css` (ver design-system §0.4). Aplicar como color de **texto/ícono mint sobre secciones
   claras** — badges, links terciarios, spans de acento (`.accent-mint`, `.mintText`, `.accent`) —
   con override a `var(--mint)` dentro de `.section-dark` (donde el mint sí pasa AA). Es un **fix
   catch-up** de Fase 1/2a además del Button.
2. **`:focus-visible` de marca.** Añadir un anillo de foco visible y consistente:
   - Global (fallback) en `globals.css`: `:focus-visible { outline: 2px solid var(--mint); outline-offset: 2px; border-radius: inherit; }`
   - En `.button`: `:focus-visible { outline: 2px solid var(--mint); outline-offset: 3px; }` (sobre oscuro el mint resalta; sobre claro basta el offset — verificar).
3. **Touch target `sm` = 44px** (ya reflejado en §Tamaños).

## Criterios de éxito / verificación

- `npm run build` limpio (0 errores, TypeScript OK).
- Captura de Home y Automatización: los CTAs primarios (WhatsApp) se ven idénticos/consistentes;
  el "Ver … →" de FeaturedCases como secondary; los links terciarios con su flecha; el CTA del
  Header en `sm`. Hovers correctos (primary invierte a blanco; secondary rellena; terciario desliza flecha).
- El FAB sticky sin cambios (salvo que use la constante).
- `grep` confirma 0 literales `wa.me/584241344659` fuera de `constants.ts`, y 0 clases `.cta`/`.cardLink`/`.ctaButton` huérfanas.
- `prefers-reduced-motion` respetado.

## Archivos afectados

- Crear: `src/components/ui/Button.tsx`, `src/components/ui/Button.module.css`, `src/lib/constants.ts`
- Modificar (JSX → `<Button>` + quitar CSS del CTA viejo + usar `WHATSAPP_URL`):
  `Hero`, `FinalCTA`, `ServiceHero`, `RoiCalculator`, `Header`, `FeaturedCases`, `TwoPillars`, `Footer`
- Modificar (solo constante): `StickyWhatsAppCTA`
- **Accesibilidad:** `src/app/globals.css` (token `--mint-ink`, `:focus-visible` global, y regla
  para texto/acento mint sobre claro → `--mint-ink`, con override `--mint` en `.section-dark`).
  El badge global (`.badge`) y las clases de acento sobre secciones claras heredan el arreglo;
  verificar contraste en TwoPillars/WhyOito/FeaturedCases.
