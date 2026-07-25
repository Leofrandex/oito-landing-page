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
2. **⚠️ El `backdrop-filter` NO refracta los hilos globales (2026-07-08).** El fondo de hilos (`ThreadsBackground`) es un **canvas WebGL `position:fixed`**, y por cómo compone Chromium, `backdrop-filter` **no captura capas fijas aceleradas por GPU**: los hilos atraviesan el vidrio **sin difuminarse** (se ven idénticos dentro y fuera). *Comprobado.* Consecuencias: **(a)** `.glass` lleva **cuerpo propio** (fill translúcido tipo liquid glass + luz interior + rim de luz, ver §2) para leer como vidrio sin depender del fondo; **(b)** si querés que el vidrio **refracte** algo, pintá una textura **LOCAL** en la sección (un glow en `.section::before`, misma capa → sí se refracta), como en `EasyStart`/`AutomationPillars`/`SolutionsGrid`. Nunca prometas (ni en propuestas/PDF) que el vidrio distorsiona los hilos animados: no es posible con esta arquitectura.
3. **Un solo `.glass`.** Hay una única definición (en `src/app/globals.css`); no dupliques variantes.
4. **✅ Mint único como acento (decisión usuario 2026-07-08).** El mint `#09bc8a` es el **único**
   color de acento para texto/ícono en **todos** los fondos, claros y oscuros (badges, links
   terciarios, spans de acento, wordmark). Se **eliminó** el token `--mint-ink` `#0c8060` que antes
   se usaba sobre fondo claro por contraste. **⚠️ Trade-off consciente:** como texto sobre fondo
   claro el mint queda ~2.3:1 (por debajo de WCAG AA); se prioriza la consistencia y la vibración de
   marca sobre el contraste. Los rellenos/bordes/fondos mint no cambian.

---

## 1. Tipografía  ✅ FIJADO

Resuelve la discrepancia previa: **manda `agents.md` (Outfit)**. Eliminar Playfair del código y de la doc.

| Rol | Fuente | Pesos |
|---|---|---|
| Titulares (hero, secciones, tarjetas) | **Outfit** | 700 hero · 600 secciones · 500 tarjetas |
| Cuerpo / UI | **DM Sans** | 400 / 500 |
| Wordmark `oito` + CTA lúdico `oitomatiza` | **Varela Round** | 400 |

- El wordmark `oito` va **siempre en minúscula**.
- El CTA **funcional** (WhatsApp) va en **DM Sans 700**, NO Varela Round (mejor legibilidad a tamaño chico; coincide con el código v5).
- La palabra rotante del hero usa `.mint-shine` (ya en `effects.css`).
- **Actualización 2026-07-04 (decisión del usuario):** se aligeran los titulares a una
  escala que baja de 100 en 100 — **hero 700 · secciones 600 · tarjetas 500** (antes era
  800 / 700 / 600-700). El hero se apoya en tamaño + color mint + glow para destacar, así
  que 700 basta. Tono más editorial, menos "bold".
- **Mapeo a niveles HTML** (según nuestro markup): `h1` = hero → **700** · `h2` = título de
  sección → **600** · `h3` = título de tarjeta / sub-item → **500** · `h4` = sub-encabezado
  menor → **500** (el spec no lo define; se alinea con tarjetas) · `h5`/`h6` no se usan.
  Implementar el peso **por nivel** (no una regla única `h1–h6`).

---

## 2. Glassmorphism  ✅ FIJADO

**Decisión clave: `GlassSurface` (refracción SVG) SOLO en el header. Todo lo demás con `.glass` / `.glass-light`.**

> **✅ FIJADO 2026-07-25 — Vidrio frosteado, canto sólido 1px (decisión del usuario):**
> Solo existen **dos** clases de vidrio y se eligen por el tono del fondo:
> - **`.glass` → fondos OSCUROS** (`rgba(255,255,255,.035)`): vidrio neutro que no tiñe, `blur(7px) saturate(1.35)`, borde sólido `1px solid rgba(255,255,255,.14)`, sombra `0 8px 36px rgba(0,0,0,.22)` + brillo `inset 0 1px 0 rgba(255,255,255,.20)`, `border-radius: 26px`.
> - **`.glass-light` → fondos CLAROS** (`rgba(255,255,255,.40)`): frosteado blanco opaco que atenúa los hilos, `blur(12px) saturate(1.4)`, borde sólido `1px solid rgba(255,255,255,.65)`, sombra `0 12px 30px rgba(0,67,70,.09)` + brillo `inset 0 1px 0 rgba(255,255,255,.65)`, `border-radius: 26px`.
> - **Canto sólido de 1px:** NO hay rim enmascarado pseudo `::after`. El `::after` de estos elementos queda libre para los componentes.
>
> **Historial (obsoleto, solo referencia):** 2026-07-07 se eliminó `.glass-strong`. 2026-07-08 (a/b/c) liquid glass con rim enmascarado — sustituidos por vidrio neutro/frosteado de canto sólido.

Razón para GlassSurface solo-header: corre un grafo de filtro SVG (feImage + 3 feDisplacementMap + 3 feColorMatrix + 2 feBlend + blur) como `backdrop-filter` → carísimo de componer y regenera el mapa en resize; multiplicado por N elementos tumba FPS en móvil, y solo funciona en Chromium. Vale la pena para 1 instancia (el header); no para tarjetas/chips/secciones.

| Clase | Uso | Valores |
|---|---|---|
| `.glass` | Superficie sobre **oscuro** — *Vidrio neutro* | fill `rgba(255, 255, 255, 0.035)` · `blur(7px) saturate(1.35)` · borde `1px solid rgba(255,255,255,0.14)` · radio `26px` · sombra `0 8px 36px rgba(0,0,0,0.22)` + brillo `inset 0 1px 0 rgba(255,255,255,0.20)` · móvil ≤768px: `blur(6px) saturate(1.3)` |
| `.glass-light` | Superficie sobre **claro** — *Frosteado opaco* | fill `rgba(255, 255, 255, 0.40)` · `blur(12px) saturate(1.4)` · borde `1px solid rgba(255,255,255,0.65)` · radio `26px` · sombra `0 12px 30px rgba(0,67,70,0.09)` + brillo `inset 0 1px 0 rgba(255,255,255,0.65)` · móvil ≤768px: `blur(9px) saturate(1.3)` |
| `.glass-hover` | Hover de tarjeta | levanta `translateY(-6px)` + `box-shadow: 0 18px 50px rgba(9,188,138,.20)` |

### 2.1 Rim suave (canto de vidrio) — receta exacta

El borde de `.glass` y `.glass-light` se dibuja con un pseudo-elemento `::after` cuyo degradado solo pinta el canto (técnica de máscara). Da un borde luminoso que capta la luz de forma desigual alrededor del perímetro (aspecto de vidrio real), en vez de una línea de color plana.

```css
.glass, .glass-light { position: relative; }           /* el rim se posiciona sobre la tarjeta */
.glass::after, .glass-light::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.4px;
  background: linear-gradient(135deg,
    rgba(255,255,255,.55), rgba(255,255,255,.08) 36%,
    rgba(255,255,255,0) 58%, rgba(255,255,255,.24));    /* "rim suave" */
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
```

> ⚠️ **Caveat de implementación:** el rim ocupa el `::after` del elemento con `.glass`/`.glass-light`. Si un componente ya usa `::after` sobre ese mismo nodo (o necesita su propio pseudo), mover el rim a un `::before` o a un hijo. Verificar al migrar `CaseStudy`, `EasyStart`, etc. Además, como el fill es translúcido, **revisar contraste del texto** sobre los hilos (usar `--on-dark`/`--ink` según tono).

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

**Anatomía única:** chip de ícono (46px, `radius 13`, `bg rgba(9,188,138,.14)`, borde mint 30%, ícono Lucide mint `stroke 1.6`) → título Outfit 500 20px → cuerpo DM Sans 13.5px → acción link con flecha. Footer anclado abajo (`margin-top:auto`) para alinear CTAs entre tarjetas de distinto largo. Padding 24, `radius var(--radius-lg)` (26px), `display:flex; flex-direction:column; gap:12px`.

- Superficie según fondo: `.glass` (sobre oscuro, con hilos detrás) · `.glass-light` (sobre claro).
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

- Mint `#09bc8a` (acento único, mismo color en todo fondo; ver §0.4) · Forest `#004346` · Deep `#002a2c`/`#001a1c` · Cream `#f4fcf9` · Neon `#00ffaa` (glow) · Charcoal `#333` (cuerpo).
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

---

## 9. Patrones de la Experiencia v3 (fases B-D, 2026-07-19)  ✅ FIJADO

Patrones nuevos aprobados en el spec `2026-07-19-experiencia-inmersiva-design.md` e implementados en la rama:

- **Set piece pinned (receta base):** `useGSAP` + `gsap.matchMedia()`; la escena scroll-driven corre SOLO en `(prefers-reduced-motion: no-preference) and (min-width: 861px)`; la otra rama marca `data-static` en el contenedor y el CSS muestra el estado final completo. GSAP anima SOLO transform/opacity (`autoAlpha`). Referencias: `WhyOito` (caos→orden, +=250%), `CasesShowcase` (+=85% por caso), `Methodology` (+=180%). ⚠️ El `ref={container}` en la sección raíz es obligatorio (sin él la escena no inicializa; bug real corregido en `f6fda15`).
- **Circuito conectado (pilares):** nodos `.glass` + cables SVG (`stroke rgba(9,188,138,.22)` 1.5px) + pulsos (`stroke-dasharray 40 900`, dashoffset 940→0, ciclo 4.5s, delays 0/1.5/3s) + glow del nodo en `::after` animado SOLO por opacity (box-shadow estático `0 0 32px rgba(9,188,138,.35)` + ring inset 1.5px).
- **Marquesina de píldoras (soluciones):** dos filas duplicadas (`translateX(-50%)` loop 32s, direcciones opuestas), pausa en hover/focus-within, máscara lateral 8%; píldora: blanco .6, borde `rgba(0,67,70,.14)`, activa borde mint .7 + fondo mint .1. Reduced motion: grid envolvente, copia oculta.
- **Count-up fluido:** hook `useCountUp` (`src/components/ui/useCountUp.ts`, rAF + ease-out cúbico ~300ms, re-tween desde el valor interpolado). Todo número que cambia en vivo lo usa; nunca saltos.
- **Columnas gemelas (calculadora):** barras con `transform: scaleY` (origen bottom, escala sqrt sobre horas máx), "Hoy" rojizo `#7e3626→#c25a41`, "Con oito" mint con glow. El rojizo SOLO existe en calculadora y en el caos del dolor (color de costo/problema).
- **Anclas con secciones pinned:** los saltos por hash necesitan `HashScrollFix` (corrección por asentamiento hasta que los pin-spacers montan) + intercepción de clic en Header con `scrollIntoView`. `scroll-margin-top: 90px` en `.anchor-target` da el offset del header.
