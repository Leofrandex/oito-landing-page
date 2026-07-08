# Spec — Carrusel de "Casos destacados" (home)

> Fecha: 2026-07-08 · Rama: `oito-page-v5` · Iniciativa: Visual (A)
> **⚠️ SUPERSEDED (2026-07-08b):** tras probar el coverflow implementado, el usuario lo
> descartó y eligió **Spotlight + riel** (opción 3 de los mockups). El diseño vigente está
> en la sección **"Revisión 2026-07-08b"** al final de este documento. Las secciones §1-§7
> siguientes describen el coverflow (historial); leerlas solo como referencia de contexto,
> constraints y decisiones compartidas (fondo claro, `.glass-light`, alcance home, a11y).

## 1. Objetivo

Reemplazar el bloque de casos del home (`FeaturedCases`, hoy filas editoriales
alternadas) por un **carrusel coverflow 3D interactivo** ("visually stunning" +
reactivo al mouse), manteniendo copy, diagramas y CTAs. El componente de carrusel
se construye **reutilizable** para poder aplicarlo luego a las páginas internas
(`/desarrollo-web`, `/automatizacion-ia`), pero **esta iteración solo toca el home**.

Decisiones fijadas en brainstorming:
- **Alcance:** componente reutilizable; se aplica al **home ahora**, internas después.
- **Fondo:** **claro** (`section-light`, cream mint). Tarjetas `.glass-light`
  (vidrio blanco esmerilado afinado el 2026-07-08). Sin hilos WebGL detrás.
- **Arquetipo:** Coverflow 3D + tilt (opción 1 de los mockups).
  Referencia viva: `.superpowers/mockups/casos-carrusel-mockups-claro.html`.

## 2. Arquitectura de componentes

### `CaseCard.tsx` (nuevo, presentacional)
Tarjeta **vertical** (la versión "de pie" del caso). Reutiliza el tipo
`CaseStudyData` existente (`src/components/CaseStudy.tsx`).

- Estructura: **media** (diagrama `CaseDiagrams`, ~150px alto, glow mint radial) →
  **pill de pilar** → **título** (Outfit 600, ~18px) → **descripción**
  (DM Sans, ~13.5px) → **lista de tags**.
- Superficie: `.glass-light`. Hover: `.glass-hover` (lo aplica el carrusel solo a
  la tarjeta activa, para no competir con el 3D).
- Pill de pilar: Desarrollo = tono azulado; Automatización = tono teal. **Texto en
  tono oscuro** (no mint) por contraste AA sobre claro (design-system §1.4).
- Ancho fijo (~320–340px) para el cálculo del coverflow.
- Sin estado; puramente visual. CSS en `CaseCard.module.css`.

### `CasesCarousel.tsx` (nuevo, `'use client'`)
Isla interactiva. Props: `cases: CaseStudyData[]`.

- Estado: `active` (índice), estado de drag, offset de tilt.
- Render: un "stage" con `perspective`; dentro, un track con las N `CaseCard`
  posicionadas por transform según su distancia al activo. Debajo: controles
  (flecha ‹, dots, flecha ›).
- **Todas las tarjetas permanentemente montadas** en el DOM (no se desmontan) → SEO.
- CSS en `CasesCarousel.module.css`.

### `FeaturedCases.tsx` (se modifica)
Sigue siendo **server component**.
- Conserva: `<header>` con badge "Casos destacados", título "Lo que oito ya ha
  construido", lede; y los **2 CTAs** ("Ver todo el desarrollo/la automatización").
  Conserva el `Reveal` del header.
- Cambia: elimina el bloque `.rows` (map de `CaseStudy` alternado) y en su lugar
  renderiza `<CasesCarousel cases={CASES} />`. El array `CASES` (con `diagram` como
  ReactNode) se mantiene aquí y se pasa por prop (paso de elementos server→client
  permitido en RSC).

### `CaseStudy.tsx` (editorial, actual)
**No se toca.** Queda para las páginas internas (fase posterior).

## 3. Interacción

### Desktop (coverflow 3D)
- Tarjeta **central**: escala 1, sin rotación (salvo tilt), z-index máximo.
- **Laterales**: por cada paso de distancia `d` respecto al activo →
  `translateX(±180px·d)`, `translateZ(-220px·|d|)`, `rotateY(∓38°·d)`,
  `scale(1 − 0.12·|d|)`, `opacity(1 − 0.18·|d|)`, `filter: brightness(.94)`.
  Tarjetas con `|d| > 2` quedan a opacidad 0 (no visibles) pero montadas.
- **Tilt**: solo la activa; sigue el mouse dentro del stage
  (`rotateX ≈ ±14°`, `rotateY ≈ ±16°`). Se resetea en `mouseleave`.
- **Avance**: flechas ‹ ›; **drag** con umbral ~60px; **clic en lateral** la centra;
  **dots** saltan a índice.
- Transiciones con `transform`/`opacity`/`filter` (~0.55s, ease
  `cubic-bezier(.22,.61,.36,1)`).

### Teclado y foco
- La región del carrusel captura ←/→ para navegar.
- **Solo la tarjeta activa es focuseable**; las demás `aria-hidden="true"` y sus
  focusables desactivados. (En el home las tarjetas no tienen links internos, pero
  se deja la regla lista para internas.)
- Foco visible en flechas y dots (botones reales `<button>`).

### `prefers-reduced-motion` (obligatorio, design-system)
- Sin 3D ni tilt. Fallback → **track horizontal con scroll-snap**: tarjetas planas
  en fila, `scroll-snap-type: x mandatory`, navegables por las mismas flechas
  (que hacen `scrollBy`) y por swipe/rueda. Transiciones instantáneas.

### Móvil (≤ ~768px)
- El coverflow 3D pesa → degrada al **mismo track scroll-snap nativo** (swipe táctil,
  sin `perspective`, sin tilt). El 3D completo solo en desktop.
- Implementación: la lógica de posicionamiento 3D se activa por media query /
  detección; el mismo markup sirve para ambos modos.

### ARIA
- Contenedor: `role="group"` + `aria-roledescription="carousel"` +
  `aria-label="Casos destacados"`.
- Cada slide: `aria-label="Caso {i} de {n}: {título}"`.
- **Live region** (`aria-live="polite"`) que anuncia el caso activo al cambiar.
- Flechas con `aria-label` ("Caso anterior/siguiente"); dots con `aria-label`.

## 4. Accesibilidad y calidad (gate §8)

- Contraste AA: pills/labels en tono oscuro sobre claro; nada de mint como texto.
- Targets táctiles ≥ 44px (flechas 44px; dots con área de toque ampliada).
- Respeta `prefers-reduced-motion` (arriba).
- Al cierre, pasar por el lente `ui-ux-pro-max` + `frontend-design` (estados de
  interacción, foco, jerarquía de CTAs, consistencia con design-system).

## 5. Fuera de alcance (esta iteración)

- Páginas internas `/desarrollo-web` y `/automatizacion-ia` (fase posterior con el
  mismo `CasesCarousel`).
- Cambios de copy, diagramas, o los CTAs.
- Autoplay/auto-rotación (descartado por accesibilidad y por el reglamento de
  rendimiento del design-system).
- Capturas/mockups reales de clientes (dependen de datos pendientes, §7 CLAUDE.md).

## 6. Archivos afectados

| Archivo | Acción |
|---|---|
| `src/components/CaseCard.tsx` | nuevo (presentacional, vertical) |
| `src/components/CaseCard.module.css` | nuevo |
| `src/components/CasesCarousel.tsx` | nuevo (`'use client'`, interacción) |
| `src/components/CasesCarousel.module.css` | nuevo |
| `src/components/FeaturedCases.tsx` | modificar (usar el carrusel) |
| `src/components/FeaturedCases.module.css` | limpiar estilos `.rows/.row` sin uso |
| `src/components/CaseStudy.tsx` | sin cambios (internas) |

## 7. Criterios de aceptación

1. El home muestra los 4 casos en coverflow; se puede navegar con flechas, drag,
   clic en lateral, dots y teclado ←/→.
2. La tarjeta activa se inclina siguiendo el mouse; las laterales muestran
   profundidad (Z/rotación/escala) y las 4 permanecen en el DOM.
3. Con `prefers-reduced-motion` o en móvil, la sección degrada a track scroll-snap
   funcional (swipe/flechas), sin 3D ni tilt.
4. Contraste AA en pills/labels; foco visible; ARIA de carrusel presente y live
   region anuncia el caso activo.
5. El header y los 2 CTAs se conservan; `CaseStudy` (editorial) sigue intacto.
6. `npm run build` y `npm run lint` pasan.

---

## Revisión 2026-07-08b — DISEÑO VIGENTE: Spotlight + riel

El coverflow se implementó y se descartó (no convenció al usuario). Se adopta **Spotlight +
riel** (opción 3 de los mockups; referencia viva `.superpowers/mockups/casos-carrusel-mockups-claro.html`).

**Se conserva de §1-§7:** fondo claro (`section-light`), header + 2 CTAs de `FeaturedCases`,
copy/diagramas de los 4 casos, alcance (home ahora, internas después), y las reglas de a11y
(contraste, foco, reduced-motion, sin em dash).

**Cambia el patrón de interacción y los componentes:**

### Arquitectura
- **`CasesSpotlight.tsx`** (nuevo, `'use client'`): un caso **en foco** a lo grande +
  un **riel de miniaturas** para saltar entre casos. Patrón **tabs WAI-ARIA** (riel =
  `tablist`, cada miniatura = `tab`, panel de foco = `tabpanel`).
- **Panel de foco = reutiliza `CaseStudy`** (la tarjeta editorial existente, media oscuro +
  cuerpo, sin `reverse`) renderizando el caso activo. DRY, componente ya maduro.
- **`FeaturedCases.tsx`**: monta `<CasesSpotlight cases={CASES} />` (reemplaza al carrusel).
- **Se eliminan** `CaseCard.tsx`/`.module.css` y `CasesCarousel.tsx`/`.module.css` (del coverflow).

### Interacción
- Clic en miniatura → cambia el foco. El panel hace un **fundido/entrada suave** al cambiar.
- **Teclado (tabs):** en el riel, ←/→ (y ↑/↓) mueven la selección con envoltura, `Home`/`End`
  saltan a extremos; el foco sigue a la selección (activación automática). Roving `tabindex`
  (solo el tab activo es `tabIndex=0`).
- **ARIA:** `tablist` con `aria-label`; cada `tab` con `id`, `aria-selected`, `aria-controls`;
  el `tabpanel` con `id` y `aria-labelledby` al tab activo. (El patrón tabs se autoanuncia; no
  hace falta live region aparte.)

### Reduced-motion / móvil
- `prefers-reduced-motion` → sin fundido (swap instantáneo), vía CSS.
- Móvil: el riel se envuelve (`flex-wrap`) y el `CaseStudy` ya apila a 1 columna (≤760px). Sin 3D.

### Criterios de aceptación (reemplazan §7 para el diseño vigente)
1. El home muestra un caso en foco (vía `CaseStudy`) + riel de 4 miniaturas; clic en una
   miniatura cambia el foco con fundido.
2. Teclado: patrón tabs completo (←/→/↑/↓/Home/End, roving tabindex, activación automática).
3. `prefers-reduced-motion` → sin fundido; móvil → riel envuelto y foco apilado, sin errores.
4. Contraste AA en pills/miniaturas; foco visible; ARIA de tabs correcto (`tablist`/`tab`/`tabpanel`).
5. Header y 2 CTAs conservados; `CaseStudy` reutilizado sin romper su uso editorial.
6. `npm run build` y `npm run lint` (a nivel de archivos tocados) pasan.
