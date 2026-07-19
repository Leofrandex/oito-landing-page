# Experiencia inmersiva v3 — Fase E: Ronda de pulido (decisiones del preview)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar a la landing real las 5 decisiones tomadas sobre `/preview-pulido`: dolor con piezas de interfaz scroll-driven, pilares en fila, casos con marco de captura, soluciones con pregunta de cierre, y BorderGlow guardado como componente de la casa.

**Architecture:** Los componentes de preview en `src/components/preview/` contienen las implementaciones visuales YA aprobadas por el usuario a fidelidad 1:1: cada task PORTA ese código al componente real correspondiente (adaptándolo a scroll scrub donde aplique) en vez de reescribir desde cero. Al final, la ruta de preview se elimina y el BorderGlow adaptado se preserva en `src/components/ui/`.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, GSAP + ScrollTrigger (patrones de la casa: useGSAP + matchMedia + `data-static`).

**Fuentes de verdad visual:** `src/components/preview/` (ronda 3, commit `6e9a562`) + spec `2026-07-19-experiencia-inmersiva-design.md` §5 (transversales).

## Global Constraints

- Copy en español sin em dash; contacto solo WhatsApp (`WHATSAPP_URL`).
- GSAP solo transform/opacity (autoAlpha); cambios de color vía atributo + transición CSS (patrón `data-ordered`).
- Pin/scrub solo en `(prefers-reduced-motion: no-preference) and (min-width: 861px)`; fallback `data-static` con estado final visible.
- `ref={container}` SIEMPRE adjunto en la sección raíz de cada escena GSAP (lección de la fase D).
- Componentes retirados se preservan (desenlazar ≠ borrar).
- Cada task termina con `npm run lint && npm run build` en verde y un commit.

---

### Task 1: Dolor con piezas de interfaz scroll-driven

**Files:**
- Modify: `src/components/WhyOito.tsx` (reemplazar el sistema de chips por las piezas)
- Modify: `src/components/WhyOito.module.css`
- Read (fuente a portar): `src/components/preview/` variante `dolor-modulos` (piezas de UI sin contenedor sobre fondo claro)

**Requisitos:**
1. Las piezas son las de `dolor-modulos` del preview (barra de título, tarjeta pequeña, chip, mini gráfica, fila de lista), con sus estilos claros exactos (blanco + borde rojizo en caos → acentos mint al ensamblar vía `data-ordered`).
2. Comportamiento scroll-driven (pinned scrub, misma estructura de timeline que hoy): estado inicial = piezas ESPARCIDAS por TODA la sección (algunas por encima/alrededor de la zona de texto, rotadas; usar el patrón de offsets medidos pre-pin con getBoundingClientRect de la fase D, con un SCATTER más amplio que cubra ~90% del alto/ancho del stage); con el scrub las piezas VIAJAN AL CENTRO y se ensamblan en la mini composición ordenada del preview, entre los dos argumentos.
3. Layout pedido por el usuario: el argumento 1 arranca MÁS ARRIBA en el stage (no centrado vertical), y su salida al scrollear es más intensa (y: -60, autoAlpha ~0.15) para que quede "dockeado" en el borde superior mientras las piezas se ensamblan; el argumento 2 aterriza al final como hoy.
4. Los textos de arg1/arg2 NO cambian. z-index: las piezas pueden pasar por encima del texto en el estado de caos (texto no interactivo en ese momento), pero al ensamblarse quedan agrupadas al centro sin tapar los argumentos.
5. Móvil/reduced (`data-static`): composición ensamblada estática entre los dos textos, todo visible.

- [ ] Step 1: Portar markup/estilos de piezas desde el preview a WhyOito (reemplazando el `<ul>` de chips).
- [ ] Step 2: Adaptar el useGSAP: scatter amplio medido pre-pin → timeline scrub (arg1 dock arriba → piezas viajan/ensamblan con stagger + data-ordered → arg2 aterriza).
- [ ] Step 3: `npm run lint && npm run build` verdes.
- [ ] Step 4: Commit: `feat(dolor): piezas de interfaz que se ensamblan con el scroll`

---

### Task 2: Pilares en fila (retirar circuito)

**Files:**
- Modify: `src/components/AutomationPillars.tsx`
- Modify: `src/components/AutomationPillars.module.css`
- Read (fuente): preview `pilares-fila`

**Requisitos:**
1. Eliminar el SVG de cables y pulsos y el layout triangular absoluto: los 3 nodos vuelven a una fila de 3 columnas (grid como el pre-circuito: `repeat(3, 1fr)`, gap clamp) con el estilo de nodo actual (glass, iconWrap, título, desc).
2. Conservar el glow secuencial 1→2→3 en la capa `::after` (opacity-only), gateado en `.inner[data-revealed]` (en la página real el `Reveal` sí dispara; usar delays 0/1.2/2.4s ciclo 3.6s como el preview).
3. Móvil: columna apilada (sin línea vertical); reduced motion: nodos estáticos con borde mint.

- [ ] Step 1: Simplificar TSX (fuera SVG/paths/posiciones pos) y CSS (fuera .wires/.pulse/.n1-n3 absolutos y responsive del circuito).
- [ ] Step 2: Glow secuencial por nth-child bajo `[data-revealed]`.
- [ ] Step 3: Lint + build verdes.
- [ ] Step 4: Commit: `feat(pilares): fila de tres nodos con glow secuencial (fuera circuito)`

---

### Task 3: Casos con marco de captura + solo titulares

**Files:**
- Modify: `src/components/CasesShowcase.tsx`
- Modify: `src/components/CasesShowcase.module.css`
- Read (fuente): preview `casos-marco`

**Requisitos:**
1. El panel visual (panes izquierdos) deja los diagramas SVG y pasa al MARCO del preview: browser frame oscuro elegante con placeholder digno (patrón sutil + wordmark tenue + "Captura del proyecto próximamente") y 1 línea de descripción del caso debajo del marco (dentro del pane). Cuando existan capturas reales (Hospiwaste primero), el marco recibirá la imagen; dejar el markup listo (un slot `image?` en el tipo del caso, hoy siempre placeholder).
2. La columna derecha muestra SOLO sector + titular (se elimina `.itemDesc` del belt; el copy de descripción vive ahora en el pane izquierdo y en `.staticList`).
3. Reducir el aire entre el header de sección y el escenario (margin-bottom del head ~1.5rem, y revisar padding superior del stage) para que todo quepa mejor en pantalla.
4. `staticList` (móvil/a11y) conserva descripción completa; su lado visual usa el mismo marco compacto.
5. Pin/scrub/belt/línea/dots intactos.

- [ ] Step 1: Portar el marco desde el preview (markup + CSS) a los panes.
- [ ] Step 2: Quitar descripciones del belt derecho; apretar espaciados del header.
- [ ] Step 3: Lint + build verdes.
- [ ] Step 4: Commit: `feat(casos): marco de captura proximamente y titulares limpios`

---

### Task 4: Soluciones con pregunta de cierre (fuera destacado)

**Files:**
- Modify: `src/components/SolutionsGrid.tsx`
- Modify: `src/components/SolutionsGrid.module.css`
- Read (fuente): preview `pregunta-cta`

**Requisitos:**
1. La marquesina queda EXACTAMENTE como está (dos filas, pausa hover/focus, notas en las píldoras).
2. Se elimina la tarjeta destacada y su estado: las píldoras dejan de ser botones de selección (pasan a elementos no interactivos: `<span>`/`<li>`; fuera `aria-pressed`, `onPick`, `useState`, `cursor: pointer`; conservar el hover-lift visual). Si el componente ya no necesita estado, quitar `'use client'` y volverlo server component (la marquesina es CSS puro). El fallback de reduced-motion (grid envolvente, copia oculta) se conserva.
3. Debajo de la marquesina va el cierre del preview `pregunta-cta`: titular centrado "¿Cuál le quitaría más trabajo a tu equipo?" (con "más trabajo" en mint, tamaño del preview) + `Button variant="secondary" external href={WHATSAPP_URL}` con texto "Cuéntanos por WhatsApp".
4. El disclaimer de cifras como potencial se conserva donde está.

- [ ] Step 1: Portar el cierre pregunta+CTA; retirar destacado y estado.
- [ ] Step 2: Lint + build verdes (verificar que el componente funcione como server component si se quitó 'use client').
- [ ] Step 3: Commit: `feat(soluciones): pregunta de cierre con CTA en lugar del destacado`

---

### Task 5: Guardar BorderGlow, retirar preview y verificación de fase

**Files:**
- Create: `src/components/ui/BorderGlow.tsx` + `src/components/ui/BorderGlow.module.css` (o .css según el patrón del preview)
- Delete: `src/app/preview-pulido/` y `src/components/preview/` (la ruta y sus componentes; el BorderGlow adaptado se muda antes de borrar)
- Modify: `.superpowers/sdd/progress.md` (gitignoreado)

**Requisitos:**
1. Mover el BorderGlow adaptado a mint (del preview) a `src/components/ui/BorderGlow.tsx` como componente de la casa SIN consumidores (decisión: guardado, no aplicado). Documentar sus props en un comentario de cabecera.
2. Borrar la ruta `/preview-pulido` y `src/components/preview/` completos (su código queda en el historial de git).
3. Verificación completa: lint + build (la ruta preview ya no aparece); recorrido visual del controlador en navegador real: dolor con piezas esparcidas→ensambladas y arg1 dockeando arriba, pilares en fila con glow, casos con marco y titulares limpios, soluciones con pregunta+CTA, y regresión rápida del resto (hero, calculadora, metodología, anclas).
4. Ledger: bloque de cierre de Fase E.

- [ ] Step 1: Mudar BorderGlow a ui/ (commit: `feat(ui): BorderGlow adaptado a mint, guardado sin consumidores`).
- [ ] Step 2: Borrar preview (commit: `chore: retirar pagina interna de preview de pulido`).
- [ ] Step 3: Verificación + ledger.
