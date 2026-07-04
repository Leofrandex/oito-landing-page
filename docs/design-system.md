# oito v5 — Handoff de sistema visual (para Claude Code)

> Decisiones tomadas en la exploración de diseño. **Verbatim-implementable**: valores exactos, no aproximados.
> Rama destino: `oito-page-v5`. Fondo: híbrido oscuro (hero/momentos) + claro (contenido).
> Las hojas de referencia vivas están en `refs/*.html` de este paquete — ábrelas para ver cada componente en contexto.
>
> **Este documento es la biblia visual de oito.** Reemplaza la versión anterior de `design-system.md`
> (que fijaba DM Sans para titulares y 6 glow bullets). Ver el apéndice al final para la referencia
> técnica complementaria (colores HSL, config Tailwind, grupos de íconos Lucide) rescatada de esa versión.

---

## 0. Reglas transversales (léelas primero)

1. **`base.css` fija `h1–h6 { color: var(--color-text-dark) }`.** Todo título sobre fondo **oscuro** DEBE llevar override a color claro (`#eafff6`). Recomendado: clase utilitaria `.on-dark` que fuerce `color:#eafff6` en headings, o que cada componente de sección oscura ya traiga el color claro. Sin esto → títulos dark-on-dark invisibles.
2. **El efecto glass depende de que haya textura detrás.** `.glass` casi no tiene relleno propio (3.5% blanco): solo difumina lo que hay atrás. En secciones oscuras donde uses `.glass`, mantené los hilos visibles (opacity ~0.6–0.9). Si la sección es plana, usá `.glass-strong` (tiene fill propio) o `.glass-light`.
3. **Un solo `.glass`.** Hay una única definición en `tokens/effects.css`; no dupliques variantes.

---

## 1. Tipografía  ✅ FIJADO

Resuelve la discrepancia previa: **manda `agents.md` (Outfit)**. Eliminar Playfair del código y de la doc.

| Rol | Fuente | Pesos |
|---|---|---|
| Titulares (hero, secciones, tarjetas) | **Outfit** | 800 hero · 700 secciones · 600/700 tarjetas |
| Cuerpo / UI | **DM Sans** | 400 / 500 |
| Wordmark `oito` + CTA lúdico `oitomatiza` | **Varela Round** | 400 |

- El wordmark `oito` va **siempre en minúscula**.
- El CTA **funcional** (WhatsApp) va en **DM Sans 700**, NO Varela Round (mejor legibilidad a tamaño chico; coincide con el código v5).
- La palabra rotante del hero usa `.mint-shine` (ya en `effects.css`).

---

## 2. Glassmorphism  ✅ FIJADO

**Decisión clave: `GlassSurface` (refracción SVG) SOLO en el header. Todo lo demás con `.glass` / `.glass-strong` / `.glass-light`.**

Razón: `GlassSurface` corre un grafo de filtro SVG (feImage + 3 feDisplacementMap + 3 feColorMatrix + 2 feBlend + blur) como `backdrop-filter` → carísimo de componer y regenera el mapa en resize; multiplicado por N elementos tumba FPS en móvil, y solo funciona en Chromium. Vale la pena para 1 instancia (el header, momento estrella); no para tarjetas/chips/secciones.

| Clase | Uso | Valores (de `tokens/effects.css`) |
|---|---|---|
| `.glass` | Acento sutil sobre **oscuro** (necesita hilos detrás) | `bg rgba(255,255,255,.035)` · `blur(7px) saturate(1.35)` · borde `rgba(255,255,255,.14)` · radio `26px` |
| `.glass-strong` | Bloques con **texto** sobre oscuro (fill propio, legible) | `bg rgba(0,38,40,.20)` · `blur(11px) saturate(1.45)` · borde `rgba(9,188,138,.26)` |
| `.glass-light` | Tarjetas sobre **claro** | `bg rgba(255,255,255,.40)` · `blur(12px) saturate(1.4)` · borde `rgba(255,255,255,.65)` · sombra `0 12px 30px rgba(0,67,70,.09)` |
| `.glass-hover` | Hover de tarjeta | levanta `translateY(-6px)` + `box-shadow: var(--shadow-mint)` |

**Header (GlassSurface) — parámetros exactos ya calibrados:**
`height 62 · borderRadius 31 · backgroundOpacity 0.18 · saturation 1.6 · distortionScale -160 · blur 9 · displace 3`, con `color-scheme: dark` en el contenedor. El overlay de menú móvil (`position:fixed`) va FUERA del GlassSurface (el backdrop-filter crea containing block).

Referencias: `refs/header-glass-compare.html`, `refs/glass-scroll-demo.html`, `refs/glass-vs-glasssurface-escenarios.html`.

---

## 3. Botones  ✅ FIJADO

Ease bouncy de marca: `cubic-bezier(.175,.885,.32,1.275)`. Todos pill (`radius 9999px`), `min-height 44px`, texto DM Sans 700.

| Nivel | Sobre oscuro | Sobre claro | Hover |
|---|---|---|---|
| **Primario · CTA** | pill mint `#09bc8a`, texto `#002a2c` | igual | **invierte a fondo blanco**, texto forest, `translateY(-2px)`, glow mint |
| **Secundario** | *ghost*: transparente, borde `rgba(9,188,138,.55)`, texto mint | *outline*: borde `rgba(0,67,70,.28)`, texto forest | rellena (mint / forest) + lift |
| **Terciario · link** | texto mint + flecha | texto `#0f8a68` + flecha | flecha se desliza `translateX(4px)` |
| **oitomatiza** (lúdico) | Varela Round, pill mint | — | blanco + `scale(1.02)` |

- Tamaños: default (`12px 22px`) y `sm` (`9px 17px`, min-height 38).
- Estado `disabled`: mint al 25% / texto atenuado, `pointer-events:none`.
- Ícono opcional (Lucide `message-circle` para WhatsApp; `arrow-right` en links). **Nota:** el ícono actual de WhatsApp es un bubble genérico de Lucide, no el logo de marca — reemplazar si se quiere el glifo oficial.

Referencia: `refs/botones-chips.html`.

---

## 4. Chips  ✅ FIJADO

| Tipo | Uso | Estilo |
|---|---|---|
| **Tag de stack** | tecnologías (Next.js, n8n…) | glass: oscuro `bg rgba(0,38,40,.42)` borde mint 28% · claro `bg rgba(255,255,255,.55)` borde forest 14% · `blur(8px)` |
| **Badge de sección** | eyebrow ("Dos líneas", "Casos") | Outfit 700 uppercase 11px · `bg rgba(9,188,138,.14)` · texto mint · borde mint 30% · altura 28 |
| **Filtro** | interactivo | outline; estado `.active` = fill mint, texto forest |

Todos `white-space:nowrap`, altura 34px (tag/filter) / 28px (badge).

---

## 5. GlassCard  ✅ FIJADO

**Anatomía única:** chip de ícono (46px, `radius 13`, `bg rgba(9,188,138,.14)`, borde mint 30%, ícono Lucide mint `stroke 1.6`) → título Outfit 700 20px → cuerpo DM Sans 13.5px → acción link con flecha. Footer anclado abajo (`margin-top:auto`) para alinear CTAs entre tarjetas de distinto largo. Padding 24, `radius var(--radius-lg)` (26px), `display:flex; flex-direction:column; gap:12px`.

- Superficie según fondo: `.glass-strong` (texto sobre oscuro) · `.glass` (acento oscuro) · `.glass-light` (claro).
- Hover: `.glass-hover` (levanta 6px + glow mint) + la flecha del link se desliza.
- **Flexiona a tarjeta de caso** (FeaturedCases): agrega placeholder de imagen `16/10` (rayado dashed mint con label monospace hasta tener capturas reales) + tags de sector/servicio arriba. No es un componente aparte.

Referencia: `refs/glasscard.html`.

---

## 6. GlowBullet  ✅ FIJADO (reducido a 3)

**Solo se conservan: `circle`, `ring`, `arrow`.** Descartados: `diamond`, `cross`, `sparkle`.

| Viñeta | Clase (ya en `effects.css`) | Uso |
|---|---|---|
| circle | `.glow-circle` | listas de beneficios ("Por qué oito") |
| ring | `.glow-ring` | listas secundarias / sobre claro |
| arrow | `.glow-icon` sobre Lucide `chevron-right` | features accionables ("Qué automatizamos") |

Referencia: `refs/glowbullet-nodos.html`.

---

## 7. Nodos (glifos geométricos)  ✅

6 PNG mint en `assets/nodes/` (circular, triangular, cuadrado, pentagonal, hexagonal, diamante): contorno geométrico + anillo concéntrico punteado + núcleo mint sólido. Usos: **acento de sección** (nodo grande translúcido ~opacity .5 detrás del título) y **marcador inline** junto a labels. Son el puente visual entre los hilos WebGL y la UI. Nunca dibujarlos a mano — usar los PNG.

---

## 8. Paleta e íconos (recordatorio)

- Mint `#09bc8a` (acento único) · Forest `#004346` · Deep `#002a2c`/`#001a1c` · Cream `#f4fcf9` · Neon `#00ffaa` (glow) · Charcoal `#333` (cuerpo).
- Íconos: **Lucide**, `stroke-width: 1.5`.
- Hilos: shader WebGL innegociable (protagonista del hero); PNG estáticos (`hilos-fondo`, `bg-content-*`) como acentos en el resto.

---

## Pendiente para el equipo
- Actualizar `agents.md`/`CLAUDE.md` del repo: quitar Playfair, confirmar Outfit.
- Capturas reales de casos (solo Hospiwaste confirmó); resto anonimizado por sector.
- Definir glifo oficial de WhatsApp si no se usa el bubble de Lucide.

---
---

## Apéndice — Referencia técnica complementaria

> Rescatado de la versión anterior de `design-system.md`. Solo se conservan las secciones que **no
> contradicen** las decisiones de arriba (la tipografía y los glow bullets de esa versión quedaron
> obsoletos y se omiten a propósito).

### A. Colores de marca — tabla completa con HSL

| Nombre | Hex | Variable CSS | HSL (Tailwind) | Uso |
| :--- | :--- | :--- | :--- | :--- |
| Verde Mint | `#09bc8a` | `--color-accent` | `163 91% 39%` | Acento principal: CTAs, hovers, viñetas, enlaces activos, íconos de acento. |
| Forest Green | `#004346` | `--color-hero-bg` | `183 100% 14%` | Fondo de héroes y secciones oscuras especiales. |
| Forest Green Deep | `#002a2c` | `--color-hero-bg-deep` | `183 100% 9%` | Fondo base principal, tarjetas oscuras. |
| Cream Mint | `#f4fcf9` | `--color-bg` / `--color-mint-light` | `163 45% 97%` | Fondo de secciones claras. |
| Neon Mint | `#00ffaa` | — | `160 100% 50%` | Brillo extremo opcional para glow y gradientes. |
| Charcoal | `#333333` | `--color-text-charcoal` | — | Texto de cuerpo en fondos claros. |
| Dark (Base) | `#1a1a1a` | `--color-text-dark` | — | Títulos oscuros sobre fondos claros. |
| Light | `#ffffff` | `--color-text-light` | `0 0% 100%` | Texto principal sobre fondos oscuros. |

### B. Configuración de color en Tailwind (`tailwind.config.ts`)

```typescript
colors: {
  primary: {
    DEFAULT: 'hsl(var(--primary))',       // Forest Green Deep
    foreground: 'hsl(var(--primary-foreground))'
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',        // Verde Mint
    foreground: 'hsl(var(--accent-foreground))'
  },
  mint: '#09bc8a',
  forest: '#004346',
  'forest-deep': '#002a2c',
  'mint-light': '#f4fcf9',
  neon: '#00ffaa',
}
```

### C. Escala tipográfica responsiva (tamaños — las fuentes son las del §1)

```css
:root {
    --text-h1: 4rem;         /* Móvil: 2.2rem · Breakpoint 480px: 1.8rem */
    --text-h2: 2.5rem;       /* Móvil: 1.8rem · Breakpoint 480px: 1.5rem */
    --text-subtitle: 1.5rem; /* Móvil: 1.125rem · Breakpoint 480px: 1.1rem */
    --text-body: 1.125rem;   /* Móvil: 1rem · Breakpoint 480px: 0.95rem */
}
```

### D. Grupos de íconos Lucide recomendados (`stroke-width: 1.5`)

- **IA y Automatización**: `Brain`, `Bot`, `Cpu`, `Sparkles`, `Zap`, `Workflow`, `GitMerge`, `Infinity`, `Network`, `Layers`, `Terminal`, `Code`.
- **Datos**: `Database`, `Cable`, `Link2`, `Globe`, `FileText`, `BarChart3`, `Cloud`, `Server`.
- **Comunicación**: `Mail`, `MessageSquare`, `Users`, `TrendingUp`, `Calendar`, `ShieldCheck`, `Clock`, `Settings`, `Send`.
- **Navegación / UI**: `ArrowRight`, `ChevronRight`, `Plus`, `Minus`, `X`, `Check`, `ExternalLink`, `Lock`, `Eye`.
