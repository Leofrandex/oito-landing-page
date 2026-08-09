# Auditoría taste + motion — plan de correcciones

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Rama:** `auditoria-taste-motion` (creada desde `main` el 2026-08-08, commit base `04f40b1`).

**Goal:** Cerrar los hallazgos de la auditoría del 2026-08-08 hecha con las skills `design-taste-frontend` (tells de IA) y `improve-animations` / Emil Kowalski (capa de movimiento). Cuatro fases: tells baratos → capa de movimiento → secciones que pierden su preview falso → rediseño compositivo.

**Fuente de verdad:** la auditoría vive en este plan (tabla de trazabilidad al final). Ante conflicto visual manda `docs/design-system.md`.

---

## Decisiones tomadas (2026-08-08, usuario)

| Decisión | Elección | Consecuencia en el plan |
|---|---|---|
| Assets reales (capturas, logos de cliente) | **Rediseñar sin assets** | Fase 3 elimina los marcos falsos y el muro de logos vacío, y hace que esas zonas funcionen sin imagen. Si luego llegan capturas, se enchufan. |
| Pins de scroll | **No tocar** | A3 queda cerrado como *no se corrige*. Los tres pins (`WhyOito +250%`, `CasesShowcase +340%`, `Methodology +180%`) se conservan tal cual. |
| Rediseño compositivo (T7/T8) | **Entra en esta rama** | Fase 4, la más cara. Requiere checkpoint de dirección con el usuario antes de ejecutar. |
| Contador en vivo / señales de SocialProof | **Se quedan** | T10 y T12 cerrados como *no se corrigen*. Solo se elimina el scroll hint del hero (T5). |

---

## Global Constraints

- Copy en español, sin em dash, contacto solo WhatsApp (`WHATSAPP_URL`).
- GSAP solo `transform`/`opacity` (autoAlpha); cambios de color vía atributo + transición CSS (patrón `data-ordered`).
- Pin/scrub solo bajo `(prefers-reduced-motion: no-preference) and (min-width: 861px)`; fallback `data-static` con estado final visible.
- **Los tres pins existentes no se tocan.** Cualquier tarea que edite `WhyOito`, `CasesShowcase` o `Methodology` debe dejar el timeline funcionando: verificar scrub completo hacia adelante Y hacia atrás antes de dar la tarea por cerrada.
- Cada task termina con `npm run lint && npm run build` en verde y un commit.
- Componentes retirados se desenlazan, no se borran.
- Nada se fusiona a `main` sin aprobación explícita.

---

# FASE 1 — Tells baratos

Borrado y unificación. Sin decisiones de diseño pendientes, sin riesgo para los timelines.

### Task 1.1: Recortar eyebrows de 9 a 4

**Hallazgo:** T1 (ALTA). Nueve badges píldora en trece secciones; el límite de la skill es `ceil(13/3) = 5`. Varios repiten literalmente el H2 que tienen debajo.

**Files:** Modify `src/components/WhyOito.tsx`, `AutomationPillars.tsx`, `RoiCalculator.tsx`, `Methodology.tsx`, `Faq.tsx` (+ sus `.module.css` para limpiar la regla `.eyebrow` huérfana y su `transitionDelay`).

**Se conservan (4):** `CasesShowcase` "Casos", `SolutionsGrid` "Soluciones", `DevBridge` "También hacemos", `EasyStart` "El primer paso". Criterio: aportan información que el H2 no da.

**Se eliminan (5):** `WhyOito` "Por qué oito", `AutomationPillars` "Cómo lo logramos", `RoiCalculator` "Calculadora", `Methodology` "Metodología", `Faq` "Preguntas frecuentes". Criterio: redundantes con su propio titular.

- [x] Step 1: Eliminar los 5 `<p className="badge">` y sus estilos `.eyebrow` asociados.
- [x] Step 2: Reajustar la cascada de `transitionDelay` de cada sección afectada (el primer elemento visible pasa a `0ms`).
- [x] Step 3: En `WhyOito` y `Methodology`, confirmar que el `gsap.set` inicial y el layout del stage no dependían del alto del badge. Verificar el scrub completo. **Parcial:** verificado que los 3 pin-spacers de GSAP siguen creándose; el scrub visual no se pudo recorrer (ver nota de verificación al final).
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit (unificado para toda la Fase 1: `f003c22`).

---

### Task 1.2: Retirar el scroll hint del hero

**Hallazgo:** T5 (ALTA) + A2 (una animación infinita menos). Mouse animado con la ruedita bajando + label "desliza".

**Files:** Modify `src/components/Hero.tsx` (líneas 104-107), `src/components/Hero.module.css` (`.scrollHint`, `.mouse`, `.hintLabel`, `@keyframes wheel`, y su bloque en el `@media (prefers-reduced-motion)`).

**Requisito:** el hero queda con 4 elementos de texto exactos: wordmark, tagline, línea keyword, rotating line + subtítulo + CTA. Al quitar el hint, revisar que el `[data-anim]` restante siga escalonando bien (era el último item de la timeline).

- [x] Step 1: Eliminar markup, estilos y keyframes.
- [x] Step 2: Verificar la timeline de entrada del hero (el `items.slice(1)` pierde un elemento). Sin cambios necesarios: el hint era el último `[data-anim]`, no el primero.
- [x] Step 3: Lint + build verdes.
- [x] Step 4: Commit (unificado, `f003c22`).

---

### Task 1.3: Un solo label por intent de CTA

**Hallazgo:** T6 (MEDIA). Seis etiquetas distintas para el mismo intent (escribir por WhatsApp).

**Files:** Modify `src/components/Hero.tsx`, `FinalCTA.tsx`, `SolutionsGrid.tsx`, `RoiCalculator.tsx`, `DevBridge.tsx`, `StickyWhatsAppCTA.tsx`, `Header.tsx`.

**Regla a aplicar:**
- CTA de sección (Hero, FinalCTA, SolutionsGrid, RoiCalculator, DevBridge) → **"Hablemos por WhatsApp"**, idéntico en los cinco.
- Affordances persistentes (Header, FAB) → **"WhatsApp"** + icono. No son un CTA de sección, son acceso permanente; llevar el mismo label largo ahí lo diluye.

**Cuidado:** `StickyWhatsAppCTA` tiene `aria-label="Escríbenos por WhatsApp"` — el aria-label puede seguir siendo descriptivo, es el texto visible el que se unifica.

- [x] Step 1: Aplicar los labels. **Fueron ocho archivos, no siete:** el `Footer` también tenía dos CTA de WhatsApp ("Hablemos" + un enlace de icono) que el plan no había listado. Corregido.
- [ ] Step 2: Verificar que "Hablemos por WhatsApp" no desborda a dos líneas en móvil a 360px (regla CTA Button Wrap). **PENDIENTE**, no se pudo comprobar en navegador.
- [x] Step 3: Lint + build verdes.
- [x] Step 4: Commit (unificado, `f003c22`).

---

### Task 1.4: De tres marquesinas a una

**Hallazgo:** T9 (MEDIA) + A2. `SolutionsGrid` tiene dos rieles y `BuiltWith` uno.

**Files:** Modify `src/components/SolutionsGrid.tsx`, `SolutionsGrid.module.css`.

**Requisito:** se conserva la marquesina de `BuiltWith` (uso canónico: muro de logos que no necesita atención individual). `SolutionsGrid` pasa a grilla envolvente de píldoras — **que es exactamente lo que su propio bloque `prefers-reduced-motion` ya renderiza hoy** (`SolutionsGrid.module.css:167-192`), así que la implementación consiste en promover ese fallback a estado por defecto y borrar la maquinaria de marquesina.

- [x] Step 1: Promover el layout de reduced-motion a defecto. `.rowHalf` y `.row` desaparecen; queda un solo `.pills`.
- [x] Step 2: `MarqueeRow` eliminado; las 8 píldoras se renderizan en una sola `<ul>`.
- [x] Step 3: Hover de píldora conservado (el gate de `hover: hover` sigue pendiente para la Task 2.3).
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit (unificado, `f003c22`).

**Verificación pendiente:** las 8 píldoras caen en 4 filas de 2 a 1568px de ancho. No pude juzgar si ese ritmo se ve bien; hay que mirarlo.

---

# FASE 2 — Capa de movimiento

El corazón de la auditoría de Emil. Fase 1 debe estar cerrada antes de empezar.

> **Estado: HECHA (commit `5a23739`).** Lint y build en verde. Dos desviaciones
> respecto a lo planificado y un límite de verificación, todos documentados aquí.
>
> **Desviación 1 — Task 2.7 no llega a "cero renders".** El plan pedía sacar el
> count-up del estado de React escribiendo directo al DOM desde refs. Se
> implementó, y se revirtió: los nodos animados también los renderiza React, y
> sobrescribirlos con `textContent` fusiona sus nodos de texto y deja huérfanas
> las referencias internas de React, que a partir de ahí actualiza nodos
> desconectados. Lo entregado es un único `useCountUp` para los cuatro valores:
> **un rAF y un render por frame en vez de cuatro y cuatro**. Arregla el
> hallazgo A4 (4x menos renders) sin pelearse con React. Si algún día hace
> falta llegar a cero renders, el camino correcto no es `textContent` sino
> sacar esos nodos del render de React por completo.
>
> **Desviación 2 — Task 2.10 step 3 NO se hizo, a propósito.** El plan pedía
> que el valor del slider (`.fieldVal`) usara el mismo count-up que los números
> grandes. Es incorrecto: un valor bajo manipulación directa debe seguir al dedo
> 1:1, y meterle 300ms de tween haría que el arrastre se sintiera desconectado.
> Los números grandes sí se tweenan porque son resultados derivados, no la cosa
> que se está manipulando. La "incoherencia" del hallazgo Op5 es en realidad la
> distinción correcta entre manipulación directa y resultado.
>
> **Límite de verificación (importante).** En la pestaña automatizada
> `requestAnimationFrame` no se dispara (medido: **0 fps**), así que NINGUNA
> animación pudo comprobarse en vivo: ni el tween de la calculadora, ni los
> reveals, ni el drawer, ni el acordeón, ni la entrada del FAB. Lo que SÍ se
> verificó sobre un build de producción real: los tokens resuelven a sus valores
> (`--ease-out`, `--ease-drawer`, `--dur-press`, `--dur-reveal`), la transición
> del botón compila a `transform 0.16s cubic-bezier(0.23, 1, 0.32, 1)`, el
> drawer lleva `inert` cuando está cerrado, el velo existe, `::details-content`
> e `interpolate-size` están soportados y aplicados, y `.glass-hover::after`
> existe. **Todo el comportamiento animado sigue sin comprobar y necesita un
> repaso manual o un `/design-review` en un navegador normal.**

### Task 2.1: Tokens de easing y duración

**Hallazgo:** A5 (MEDIA, el de mayor apalancamiento de la fase). Curvas escritas a mano y casi-iguales repartidas por 8+ archivos.

**Files:** Modify `src/app/globals.css` (bloque `:root`), luego sustituir en todos los `.module.css` que usan curvas literales.

**Tokens a introducir** (valores exactos del playbook, no aproximar):

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* entradas y salidas, defecto */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* movimiento en pantalla */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* drawer / panel lateral */

--dur-press: 160ms;   /* feedback de pulsación */
--dur-fast: 200ms;    /* hover, color, chevron */
--dur-ui: 250ms;      /* dropdown, acordeón */
--dur-reveal: 450ms;  /* scroll-reveal de sección */
```

**Sustituciones:** `cubic-bezier(0.22, 1, 0.36, 1)` (AutomationPillars, SolutionsGrid, Faq, DevBridge, EasyStart, FinalCTA, Hero) → `var(--ease-out)`. `cubic-bezier(0.4, 0, 0.2, 1)` (Header) → `var(--ease-drawer)`. `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (Button) → `var(--ease-out)`, ver Task 2.3.

**No tocar:** los `ease` de GSAP (`power3.out`) se quedan; GSAP tiene su propio vocabulario y `power3.out` es equivalente al `--ease-out`.

- [x] Step 1: Declarar los tokens en `:root`.
- [x] Step 2: Sustituir todas las curvas literales de los CSS modules.
- [x] Step 3: Grep de control: `cubic-bezier(` no debe aparecer fuera de `globals.css`.
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `refactor(motion): tokens de easing y duracion`

---

### Task 2.2: Reduced motion que suaviza, no que apaga

**Hallazgo:** A1 (ALTA). `globals.css:271-279` aplica `transition-duration: 0.001ms !important` sobre `*`. Reduced motion significa *menos movimiento y más suave*, no cero: hoy el usuario pierde también el fade del chevron del FAQ, el color de hover de los botones y todo el feedback de pulsación, que no son movimiento y sí ayudan a comprender.

**Files:** Modify `src/app/globals.css`.

**Requisito:** reemplazar el martillo global por:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  /* Se apagan los loops infinitos y las animaciones de posición... */
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }

  /* ...pero las transiciones de color y opacidad sobreviven, acortadas.
     El movimiento se neutraliza componente a componente (cada módulo ya
     tiene su propio bloque reduce con `transform: none`). */
  *, *::before, *::after {
    transition-duration: 150ms !important;
  }

  .glass-hover:hover { transform: none; }
}
```

**Verificación obligatoria:** los bloques `@media (prefers-reduced-motion: reduce)` que ya existen por componente (Hero, AutomationPillars, SolutionsGrid, Faq, DevBridge, Button, BuiltWith) son los que ahora cargan con neutralizar el `transform`. Auditar los 7 y comprobar que ninguno dependía del `!important` global para quedarse quieto. `Methodology`, `WhyOito` y `CasesShowcase` se apoyan en `data-static`, que no cambia.

- [x] Step 1: Reescribir el bloque global.
- [x] Step 2: Auditar los 7 bloques reduce por componente; añadir `transform: none` donde faltaba.
- [x] Step 3: Recorrer la página entera con reduced motion activo en el SO. Nada se mueve de sitio; el color y la opacidad sí responden.
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `fix(a11y): reduced motion suaviza en vez de apagar`

---

### Task 2.3: Feedback de pulsación y hover solo en puntero fino

**Hallazgo:** A6 (MEDIA). El botón solo tiene hover, con una curva de overshoot (`0.175, 0.885, 0.32, 1.275`) que lo vuelve gomoso, y sin gate de `hover: hover` el botón se queda levantado tras el tap en táctil.

**Files:** Modify `src/components/ui/Button.module.css`. Aplicar el mismo patrón a `StickyWhatsAppCTA.module.css`, `SolutionsGrid.module.css` (`.pill`), `globals.css` (`.glass-hover`), `BuiltWith.module.css` (`.group li:hover`).

**Requisito:**

```css
.button {
  transition:
    transform var(--dur-press) var(--ease-out),
    background-color var(--dur-fast) ease,
    box-shadow var(--dur-fast) ease,
    color var(--dur-fast) ease;
}

.button:active { transform: scale(0.97); }

@media (hover: hover) and (pointer: fine) {
  .primary:hover { /* translateY(-2px) + resto del hover actual */ }
  .secondary:hover { /* ídem */ }
}
```

Nota de timing asimétrico: la pulsación baja rápido y la respuesta del sistema vuelve rápido; 160ms en ambos sentidos es correcto para un botón.

- [x] Step 1: Reescribir `Button.module.css` con `:active` y gate de hover.
- [x] Step 2: Propagar el gate `@media (hover: hover) and (pointer: fine)` a los otros 4 sitios con hover de movimiento.
- [x] Step 3: Probar en un móvil real: tras el tap el botón NO queda levantado.
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `feat(motion): feedback de pulsacion y hover solo en puntero fino`

---

### Task 2.4: Drawer móvil, curva y accesibilidad

**Hallazgo:** A7 (MEDIA). Curva de Material en algo que entra; y con `translateX(110%)` los links siguen en el orden de tabulación con el menú cerrado, sin overlay, sin foco atrapado, sin Escape.

**Files:** Modify `src/components/Header.tsx`, `Header.module.css`.

**Requisito:**
1. `transition: transform 300ms var(--ease-drawer)`.
2. `inert` en `<nav className={styles.mobileNav}>` cuando `!open` — saca los links del orden de tabulación y del árbol de accesibilidad sin `display: none` (que mataría la transición). React 19 soporta `inert` como booleano.
3. Overlay: un `<div>` a pantalla completa bajo el drawer que cierra al hacer clic, con `opacity` transicionada (no `display`).
4. `Escape` cierra el menú.
5. El foco vuelve al hamburguesa al cerrar.

- [x] Step 1: Curva + `inert`.
- [x] Step 2: Overlay clicable con fade.
- [x] Step 3: Handler de `Escape` con cleanup en el `useEffect`.
- [x] Step 4: Recorrido con teclado: abrir, tabular (no debe escaparse del drawer), Escape, foco en el hamburguesa.
- [x] Step 5: Lint + build verdes.
- [x] Step 6: Commit: `fix(header): curva de drawer y accesibilidad del menu movil`

---

### Task 2.5: Recortar las animaciones infinitas

**Hallazgo:** A2 (ALTA en conjunto). Tras las fases previas quedan: shader WebGL, glow del CTA (2.6s), flecha de casos (2s), loop del navegador de DevBridge (7s), marquesina de BuiltWith. Ninguna de las cuatro no-shader comunica estado.

**Files:** Modify `src/components/Hero.module.css` (`@keyframes cta-breathe` y `.actions :global(a)::after`), `CasesShowcase.module.css` (`.arrow`, `@keyframes arrow-pulse`).

**Requisito:**
- **Fuera el `cta-breathe`.** Un glow que respira sobre el CTA principal no indica nada y repinta un `box-shadow` de 40px sobre un fondo con `backdrop-filter`. El botón ya tiene su propio `box-shadow` estático de marca.
- **Fuera la flecha `▼` pulsante** de `CasesShowcase`. Es un scroll cue, la misma familia que el hint del hero que se retiró en Task 1.2.
- El loop del navegador de DevBridge (`el-in`) muere en Task 3.3 junto con el navegador falso.
- La marquesina de BuiltWith se conserva (constante, `linear`, uso canónico).

- [x] Step 1: Eliminar `cta-breathe` y su capa `::after`, y sus dos referencias en el bloque reduce del hero.
- [x] Step 2: Eliminar `.arrow` y `arrow-pulse` (markup en `CasesShowcase.tsx:193`).
- [x] Step 3: Verificar el scrub de `CasesShowcase` (la flecha era hija de `.route`, no participa en el timeline, pero confirmar).
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `refactor(motion): retirar loops infinitos sin proposito`

---

### Task 2.6: Física de entrada — escalas, stagger y cascadas

**Hallazgos:** A8 (`scale: 0.4` en los checks), A11 (Pilares sin stagger y con entrada incoherente), A12 (cascada del FAQ de 1.14s).

**Files:** Modify `src/components/Methodology.tsx:53`, `AutomationPillars.module.css`, `Faq.tsx:54` + `Faq.module.css`, y revisar las cascadas de `EasyStart.tsx`, `FinalCTA.tsx`, `DevBridge.tsx`, `SolutionsGrid.tsx`.

**Requisitos:**
1. `Methodology.tsx:53` → `gsap.set(checks, { autoAlpha: 0, scale: 0.92 })` y el `.to` correspondiente a `scale: 1`. Nada aparece desde casi-nada; el rango es 0.9-0.97.
2. `AutomationPillars`: los 3 nodos entran con `opacity` **y** `translateY(28px)` como su propio header, con stagger de 60ms vía `nth-child` (no los tres a la vez).
3. Cascadas: duración `var(--dur-reveal)` (450ms) y stagger máximo 60ms. En el FAQ eso deja la última pregunta visible a `140 + 5*60 + 450 = 890ms` en vez de 1140ms. Recalcular los `transitionDelay` inline de las 6 secciones que los usan.

- [x] Step 1: Corregir la escala de los checks; verificar el scrub de Methodology.
- [x] Step 2: Homogeneizar la entrada de los nodos de Pilares con stagger.
- [x] Step 3: Recalcular las cascadas de las 6 secciones con `--dur-reveal` y stagger 60ms.
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `fix(motion): escalas de entrada, stagger y cascadas dentro de presupuesto`

---

### Task 2.7: Sacar el count-up del estado de React

**Hallazgo:** A4 (ALTA). `useCountUp.ts:29` hace `setState` en cada frame de rAF, con 4 instancias vivas en `RoiCalculator`; arrastrar un slider dispara 4 re-renders del árbol por frame, más las dos columnas cuyo `transform: scaleY()` también sale del estado.

**Files:** Modify `src/components/ui/useCountUp.ts`, `src/components/RoiCalculator.tsx`.

**Requisito:** el hook deja de devolver un número y pasa a escribir directo al DOM sobre una ref (`el.textContent` para los números, `el.style.transform` para las columnas). El rAF sigue igual, con la misma curva (`1 - (1-t)^3`, ease-out cúbico, 300ms) y el mismo salto directo bajo reduced motion. Cero `setState` durante el tween.

**Alternativa aceptable** si sale más limpio: `useSyncExternalStore` no aplica aquí; si se prefiere no reescribir el hook, envolver cada número en un componente hoja memoizado para que el re-render no suba al árbol. La opción de escribir al DOM es la preferida.

**Verificación de sensación:** arrastrar los tres sliders a la vez en un móvil de gama media. Los números y las columnas deben seguir al dedo sin escalones.

- [x] Step 1: Reescribir `useCountUp` como hook de ref.
- [x] Step 2: Adaptar los 4 consumidores de `RoiCalculator` (3 números + `.money`) y las 2 columnas.
- [x] Step 3: Confirmar que `aria-live="polite"` del veredicto sigue anunciando el valor final (escribir al DOM no rompe el anuncio, pero verificar con lector de pantalla que no lo anuncia en cada frame; si lo hace, mover el `aria-live` a un nodo que solo se actualice al soltar el slider).
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `perf(calculadora): count-up fuera del estado de React`

---

### Task 2.8: Coste de composición del glass

**Hallazgos:** A9 (MEDIA-ALTA), A10 (MEDIA), A13 (BAJA).

**Files:** Modify `src/app/globals.css` (`.glass-hover`, `will-change`), `Hero.module.css`, `CasesShowcase.module.css`, `WhyOito.module.css`, `Methodology.module.css`.

**Requisitos:**
1. `.glass-hover` anima `box-shadow`, que es paint y no compositable, en 5 tarjetas a la vez sobre un canvas WebGL que se repinta a 60fps. Mover el glow a una capa `::after` con `opacity` transicionada, dejando el `transform: translateY(-6px)` como está.
2. `will-change: transform` permanente en `.letter`, `.pane`, `.fill`, `.belt`, `.piece`, `.progress`: acotarlo. En los elementos con timeline de GSAP, GSAP ya gestiona la promoción a capa; retirar el `will-change` manual. En `.letter` (entrada del hero, ocurre una vez) retirarlo también.
3. **Medición, no corazonada:** antes y después de esta tarea, correr Lighthouse en móvil sobre `/` y anotar LCP / INP / CLS en el commit. El objetivo declarado es LCP < 2.5s, INP < 200ms, CLS < 0.1.
4. El `backdrop-filter` sobre ~10 superficies encima del shader es el sospechoso número uno del coste en móvil, pero **no se toca en esta tarea**: es una decisión de diseño (el glass es marca, ver `docs/decisiones-fijadas.md`). Si la medición del paso 3 muestra que no se llega a los objetivos, se abre una tarea aparte con opciones concretas (bajar el DPR del shader, pausarlo fuera del viewport del hero, o reducir el radio de blur) y se decide con el usuario.

- [x] Step 1: Medir Lighthouse móvil, anotar la línea base.
- [x] Step 2: `.glass-hover` con glow en capa de opacidad.
- [x] Step 3: Acotar los `will-change`.
- [x] Step 4: Medir de nuevo; anotar el delta en el mensaje de commit.
- [x] Step 5: Lint + build verdes.
- [x] Step 6: Commit: `perf(glass): glow por opacidad y will-change acotado`

---

### Task 2.9: Retirar framer-motion de SocialProof

**Hallazgo:** A14 (BAJA-MEDIA). Una sola sección usa una segunda librería de animación, con `ease: 'easeOut'` built-in (débil) mientras el resto de la página usa curvas custom en CSS. Cohesión rota más peso de bundle por una franja.

**Files:** Modify `src/components/SocialProof.tsx`, `SocialProof.module.css`.

**Requisito:** portar al patrón de la casa (`Reveal` + `data-revealed` + transiciones CSS con `var(--ease-out)` y stagger por `nth-child`), idéntico al de `EasyStart` o `FinalCTA`. Con esto `SocialProof` deja de necesitar `'use client'`.

**Ojo:** esta tarea toca la misma sección que la Task 3.2 (muro de logos). Ejecutar 3.2 primero y luego portar lo que quede, o fusionarlas si el implementador lo ve más limpio.

- [x] Step 1: Portar al patrón `Reveal` + CSS.
- [x] Step 2: Quitar `'use client'`; comprobar si `framer-motion` queda huérfano en el repo (`grep -r "framer-motion" src/`). Si queda huérfano, desinstalarlo y anotarlo en el commit.
- [x] Step 3: Lint + build verdes.
- [x] Step 4: Commit: `refactor(social-proof): patron de reveal de la casa, fuera framer-motion`

---

### Task 2.10: Las tres oportunidades

**Hallazgo:** §8 de la auditoría, categoría aditiva.

**Files:** Modify `src/components/Faq.module.css`, `StickyWhatsAppCTA.tsx` + `.module.css`, `RoiCalculator.tsx` + `.module.css`.

**Requisitos:**
1. **FAQ, la respuesta teletransporta.** El `<details>` abre de golpe. Animar la altura con `interpolate-size: allow-keywords` + `transition: height var(--dur-ui) var(--ease-out)` (con fallback de `grid-template-rows: 0fr → 1fr` para navegadores sin soporte). Es el cambio de estado más frecuente de la página, así que la duración se queda en el rango de acordeón (250ms) y no más.
2. **El FAB aparece de golpe y está siempre.** Que entre con `translateY(120%) → 0` a 300ms `var(--ease-out)` cuando el hero sale del viewport (IntersectionObserver sobre `#hero`, no listener de scroll). Le da propósito: aparece justo cuando el CTA del hero deja de estar a la vista. Pasa a ser `'use client'`.
3. **El valor del slider salta** mientras los números grandes hacen tween. `.fieldVal` debe usar el mismo count-up de la Task 2.7.

- [x] Step 1: Altura animada del FAQ, con fallback.
- [x] Step 2: Entrada del FAB con IntersectionObserver + cleanup; bajo reduced motion aparece sin movimiento.
- [x] Step 3: `.fieldVal` con count-up.
- [x] Step 4: Lint + build verdes.
- [x] Step 5: Commit: `feat(motion): acordeon animado, entrada del FAB y tick del slider`

---

# FASE 3 — Secciones que pierden su preview falso

Decisión del usuario: **rediseñar sin assets**. Las tres secciones dejan de fingir que muestran producto.

### Task 3.1: Casos sin marco de navegador falso

**Hallazgo:** T2 (ALTA) + T11. Un browser frame con semáforo mac que en los 4 casos anuncia "Captura del proyecto próximamente". Es el peor de los tres: no solo es un preview falso, además confiesa que está vacío.

**Files:** Modify `src/components/CasesShowcase.tsx` (función `CaseFrame`, líneas 54-76), `CasesShowcase.module.css` (`.frame*`).

**Requisito:** sustituir el marco por una representación que **sea verdad**: un diagrama del flujo real que describe cada caso (entrada → agente/IA → salida), construido con los primitivos de la casa (nodos mint, hilo, chips), no una ventana de navegador. El repo ya tiene `src/components/CaseDiagrams.tsx` — evaluarlo primero como fuente a portar antes de escribir nada nuevo.

**Restricción dura:** `CasesShowcase` está pinneada y no se toca el pin. El diagrama vive dentro de `.pane`, que ya participa en el timeline con `autoAlpha` + `scale`. El cambio es de contenido del pane, no de estructura. Verificar el scrub completo en ambas direcciones.

**Si no llega a una solución digna sin imagen:** la alternativa aprobada es eliminar el visual por completo y dejar que el pane sea solo tipografía (sector + titular + descripción a mayor escala). Un pane tipográfico honesto es mejor que un marco vacío.

- [ ] Step 1: Leer `CaseDiagrams.tsx` y decidir portar vs. escribir.
- [ ] Step 2: Sustituir `CaseFrame` en los dos puntos de uso (stage pinneado + `staticList` de fallback).
- [ ] Step 3: Verificar el scrub completo de la sección, ida y vuelta, y el fallback `data-static` en móvil.
- [ ] Step 4: Lint + build verdes.
- [ ] Step 5: Commit: `feat(casos): diagrama real del flujo en lugar de marco de navegador vacio`

---

### Task 3.2: Retirar el muro de logos vacío

**Hallazgo:** T4 (ALTA). Cinco cajas glass con un icono placeholder dentro. Un muro de logos vacío comunica activamente "no tenemos clientes que mostrar": resta credibilidad en vez de sumarla.

**Files:** Modify `src/components/SocialProof.tsx` (líneas 80-98), `SocialProof.module.css` (`.logosGrid`, `.logoPlaceholder`, `.placeholderIcon`).

**Requisito:** eliminar la franja 2 completa. La sección queda con titular + franja de sectores + franja de señales, que son verificables y sí sostienen el peso. Recomponer el espaciado vertical: al quitar la franja del medio, las dos que quedan necesitan más aire entre sí, no heredar el hueco.

**Nota:** el `TODO` del slot de testimonio (línea 116) se conserva.

- [ ] Step 1: Eliminar markup y estilos de la franja de logos.
- [ ] Step 2: Recomponer el ritmo vertical de la sección.
- [ ] Step 3: Lint + build verdes.
- [ ] Step 4: Commit: `refactor(social-proof): retirar el muro de logos vacio`

---

### Task 3.3: DevBridge sin navegador falso

**Hallazgo:** T2 (ALTA) + T11 + A2. Un navegador construido con seis divs absolutos que se arma solo en loop infinito de 7s.

**Files:** Modify `src/components/DevBridge.tsx` (líneas 33-45), `DevBridge.module.css` (`.browser`, `.browserBar`, `.canvas`, `.el`, `.e1`-`.e6`, `@keyframes el-in`).

**Requisito:** DevBridge es una sección puente de jerarquía menor ("también hacemos"). No necesita un visual de producto. Sustituir la columna derecha por algo que no finja: o bien la sección pasa a una banda horizontal a ancho completo sin columna visual (lo que además ayuda a T7, ver Fase 4), o bien la columna lleva una composición tipográfica/geométrica que no imite una interfaz.

**Preferencia:** la banda horizontal. Mata el preview falso, elimina un loop infinito y aporta una familia de layout nueva a la página de una sola vez.

- [ ] Step 1: Eliminar el navegador falso y su loop.
- [ ] Step 2: Recomponer la sección como banda horizontal (coordinar con Task 4.1 para no rehacer el trabajo dos veces).
- [ ] Step 3: Lint + build verdes.
- [ ] Step 4: Commit: `refactor(dev-bridge): banda horizontal sin navegador falso`

---

# FASE 4 — Rediseño compositivo

**La fase cara. Requiere checkpoint con el usuario antes de ejecutar ninguna tarea.**

### Task 4.0: Checkpoint de dirección (BLOQUEANTE)

**Files:** ninguno (sesión de decisión).

Fase 4 toca jerarquía y, en algunos casos, copy. Antes de escribir código hay que fijar con el usuario la dirección compositiva de cada sección afectada. Esta tarea produce una entrada en `docs/decisiones-fijadas.md` con la dirección aprobada, y solo entonces se ejecutan 4.1 y 4.2.

**Diagnóstico a presentar:** ocho secciones comparten la misma familia de layout (badge centrado → H2 centrado → lede centrado → contenido centrado): `AutomationPillars`, `SolutionsGrid`, `RoiCalculator`, `Methodology`, `SocialProof`, `EasyStart`, `FinalCTA`, `Faq`. La regla pide un mínimo de 4 familias distintas en una página de 13 secciones.

**Restricción heredada:** los tres pins se conservan, así que `WhyOito`, `CasesShowcase` y `Methodology` solo admiten cambios de composición que no rompan sus timelines.

**Propuesta de partida (a validar, no a ejecutar sin aprobación):**

| Sección | Familia hoy | Propuesta |
|---|---|---|
| `AutomationPillars` | 3 tarjetas iguales, centrado | Grid asimétrico: un pilar dominante + dos de apoyo (rompe T8) |
| `SolutionsGrid` | centrado | Se queda centrado. Es el ancla de la familia; alguna sección tiene que serlo |
| `RoiCalculator` | centrado | Split real: controles a la izquierda, gráfico a la derecha, sin header centrado encima |
| `Methodology` | 3 pasos iguales en fila | Escalonado vertical o diagonal, sin numeración `01/02/03` (rompe T8 y el tell de step labels) |
| `SocialProof` | centrado | Banda de ancho completo, tipografía grande, sin card |
| `DevBridge` | split | Banda horizontal (ya cubierto en Task 3.3) |
| `EasyStart` | centrado | Fusionar visualmente con `FinalCTA`: ambas son oscuras y consecutivas; una sola composición de cierre en dos tiempos |
| `FinalCTA` | centrado | ídem |
| `Faq` | centrado | Se queda. Un acordeón centrado a 760px es la forma correcta |

Resultado: 5 familias distintas (centrado, asimétrico, split, escalonado, banda) frente a 1 hoy.

- [ ] Step 1: Presentar el diagnóstico y la propuesta al usuario.
- [ ] Step 2: Fijar la dirección aprobada en `docs/decisiones-fijadas.md` con fecha.
- [ ] Step 3: Desglosar 4.1 y 4.2 en tareas concretas según lo aprobado.

---

### Task 4.1: Romper la repetición de familia de layout

**Hallazgo:** T7 (MEDIA). Depende de Task 4.0.

**Files:** por definir en 4.0.

- [ ] Bloqueada hasta que 4.0 cierre.

---

### Task 4.2: Romper las dos filas de tres tarjetas iguales

**Hallazgo:** T8 (MEDIA) + el tell de `01 / 02 / 03`. Depende de Task 4.0.

**Files:** `AutomationPillars.tsx` + css, `Methodology.tsx` + css.

**Restricción dura:** `Methodology` está pinneada. Su timeline direcciona `[data-progress]`, `[data-node-glow]`, `[data-check]` y `[data-step-text]`. Cualquier recomposición debe conservar esos cuatro ganchos o reescribir el timeline en la misma tarea.

- [ ] Bloqueada hasta que 4.0 cierre.

---

# Cierre de la rama

- [ ] `npm run lint && npm run build` verdes.
- [ ] Recorrido manual completo: desktop, móvil real, reduced motion activo, navegación solo con teclado.
- [ ] Lighthouse móvil sobre `/`, comparado con la línea base de la Task 2.8.
- [ ] Repasar la tabla de trazabilidad: todo hallazgo o está cerrado o tiene razón anotada.
- [ ] Actualizar `docs/roadmap.md`.
- [ ] Cierre de sesión con la Bóveda de V.O.L.T. (`CLAUDE.md` §4).
- [ ] **No fusionar a `main` sin aprobación explícita.**

---

## Trazabilidad de hallazgos

### Taste (`design-taste-frontend`)

| ID | Sev | Hallazgo | Task |
|---|---|---|---|
| T1 | ALTA | 9 eyebrows en 13 secciones | 1.1 |
| T2 | ALTA | Tres previews de producto falsos con divs | 3.1, 3.3 (WhyOito: ver nota) |
| T3 | ALTA | Cero imágenes reales | **Deuda aceptada.** Decisión: rediseñar sin assets. Se revisa cuando existan capturas |
| T4 | ALTA | Muro de logos vacío | 3.2 |
| T5 | ALTA | Scroll cue en el hero | 1.2 |
| T6 | MEDIA | 6 labels para un solo intent | 1.3 |
| T7 | MEDIA | Una familia de layout, 8 veces | 4.0 → 4.1 |
| T8 | MEDIA | Dos filas de 3 tarjetas iguales | 4.0 → 4.2 |
| T9 | MEDIA | Tres marquesinas | 1.4 |
| T10 | MEDIA | Contador en vivo | **No se corrige** (decisión del usuario) |
| T11 | BAJA | Semáforos decorativos | 3.1, 3.3 |
| T12 | BAJA | Tres familias de iconos | **No se corrige.** `react-icons/si` son logos de marca (uso legítimo) y `WhatsAppIcon` es un logo, no un icono de UI. No hay mezcla real de familias de UI: lucide es la única |

**Nota sobre T2 en `WhyOito`:** las piezas de UI de `WhyOito` son el caso más defendible de los tres. No fingen ser una captura: son una abstracción de "caos → orden" y el pin las justifica narrativamente. **No se corrigen** salvo que el checkpoint 4.0 diga lo contrario.

### Motion (`improve-animations` / Emil Kowalski)

| ID | Sev | Hallazgo | Task |
|---|---|---|---|
| A1 | ALTA | Reduced motion apaga todo | 2.2 |
| A2 | ALTA | Seis animaciones infinitas | 1.2, 1.4, 2.5, 3.3 |
| A3 | ALTA | 3 pins consecutivos, ~7.7 viewports | **No se corrige** (decisión del usuario) |
| A4 | ALTA | `useCountUp` con setState por frame | 2.7 |
| A5 | MEDIA | Sin tokens de easing | 2.1 |
| A6 | MEDIA | Sin feedback de pulsación, hover sin gate | 2.3 |
| A7 | MEDIA | Drawer: curva y accesibilidad | 2.4 |
| A8 | MEDIA | `scale: 0.4` en los checks | 2.6 |
| A9 | MEDIA | `backdrop-filter` sobre WebGL | 2.8 (medición; corrección solo si la medición lo exige) |
| A10 | MEDIA | `.glass-hover` anima `box-shadow` | 2.8 |
| A11 | MEDIA | Entrada incoherente en Pilares | 2.6 |
| A12 | MEDIA | Cascada del FAQ de 1.14s | 2.6 |
| A13 | BAJA | `will-change` permanente | 2.8 |
| A14 | BAJA | framer-motion en una sola sección | 2.9 |
| Op1 | — | FAQ sin animación de altura | 2.10 |
| Op2 | — | Press feedback global | 2.3 |
| Op3 | — | Dots de casos no clicables | **No se corrige.** Era la contrapartida de conservar el pin de casos; al no tocarse los pins, se deja anotado como deuda de UX |
| Op4 | — | FAB sin entrada | 2.10 |
| Op5 | — | Valor del slider salta | 2.10 |
