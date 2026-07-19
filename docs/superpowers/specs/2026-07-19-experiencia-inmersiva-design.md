# Spec — Experiencia inmersiva v3: landing de automatización + puente a desarrollo web (2026-07-19)

> Diseño validado en sesión de brainstorm con mockups visuales (companion en
> `.superpowers/brainstorm/1250-1784438976/content/`). Este spec define la
> **arquitectura del sitio y el diseño de experiencia sección por sección**.
> El texto final sigue siendo entregable del copy deck v2 (ver §8).
> Supersede parcialmente el spec `2026-07-17-contenido-v2-design.md` en
> estructura (11 secciones, puente dev) y lo complementa en lo visual.

---

## 1. Decisiones de arquitectura

- **`/` (raíz) ES la experiencia inmersiva de automatización.** La venta principal,
  sin clics intermedios. No hay home genérica.
- **`/desarrollo-web` vuelve al sitio como página propia, más liviana.** El servicio
  es **exclusivamente páginas web** (no software a medida; los desarrollos de software
  son casos puntuales que no se venden en la página). Reutiliza los componentes `Dev*`
  preservados en la rama, re-vestidos con el nuevo lenguaje visual. Su rediseño
  profundo será una iniciativa propia cuando el servicio se active comercialmente.
- **Header:** anclas de sección dentro de `/` (Casos, Soluciones, Calculadora, FAQ)
  + link "Desarrollo web" → `/desarrollo-web` + CTA WhatsApp. GlassSurface se mantiene
  solo en el header.
- Contacto sigue siendo **solo WhatsApp** (decisión fijada previa, no cambia).

## 2. Identidad y estrategia de experiencia

- **La identidad se queda; la experiencia se rehace.** Mint `#09bc8a`, paleta
  oscura/cream, liquid glass (§2 design-system), hilos WebGL y wordmark intactos.
  `docs/design-system.md` sigue mandando en valores visuales; este spec añade
  patrones de sección nuevos que deberán documentarse allí al implementarse.
- **Nivel de scroll: híbrido.** 2 set pieces scroll-driven completas (Casos,
  Metodología) + un hero con coreografía de entrada rica + reveals y parallax
  refinados en el resto. No scrollytelling total: los momentos wow no compiten.
- Animaciones scroll-driven con GSAP ScrollTrigger (scrub, reversibles al subir).
  Reveals con el sistema actual (Reveal/framer-motion) enriquecido.

## 3. Las 11 secciones de `/` (orden fijo)

| # | Sección | Fondo | Patrón aprobado |
|---|---------|-------|-----------------|
| 1 | Hero | Oscuro | Concepto actual + coreografía de entrada |
| 2 | El dolor | Claro | Narrativa intercalada pinned (caos→orden) |
| 3 | Pilares | Oscuro | Circuito conectado con pulsos |
| 4 | Casos | Oscuro | Escaparate sticky + titulares flotantes (SET PIECE) |
| 5 | Qué automatizar | Claro | Marquesina de píldoras + destacado |
| 6 | Calculadora | Oscuro | Editorial abierto + columnas gemelas |
| 7 | Metodología | Oscuro | Diseño actual + workflow ejecutándose (SET PIECE) |
| 8 | Prueba social | Oscuro | Sectores + placeholders logos + señales + stack |
| 9 | Puente dev | Claro | Split con página armándose (NUEVA) |
| 10 | FAQ | Claro | Concepto actual re-vestido |
| 11 | CTA final | Oscuro | Concepto actual re-vestido |

### 3.1 Hero
Concepto actual intacto (wordmark + "LO HACE POR TI" + TextType + hilos + CTA
WhatsApp). Se enriquece SOLO la coreografía de entrada: letras del wordmark una a
una (rise + blur-out), tagline expandiendo su letter-spacing al aparecer, TextType,
CTA con glow que respira, scroll-hint animado. Sin transformación scroll-driven ni
demo viva (evaluadas y descartadas): el wow se reserva para Casos y Metodología.

### 3.2 El dolor (evolución de `WhyOito` + `BeforeAfter`)
Se **conserva el copy actual** de WhyOito (dos argumentos: "El tiempo no se
recupera, los ingresos sí" / "Tú enfócate en crecer. De lo técnico nos encargamos
nosotros"). Layout: **narrativa intercalada** scroll-driven (sección pinned):
1. Entra el argumento 1 (el problema), centrado.
2. Chips de tareas reales de pyme ("23 correos sin responder", "copiar pedido al
   Excel", "recordar cobro vencido"...) aparecen dispersos e inclinados (borde
   rojizo `#b4543e`) y **se ordenan** al centro, girando a mint.
3. Aterriza el argumento 2 (la solución) como conclusión.
Evoluciona el `BeforeAfter` ya existente en la rama.

### 3.3 Pilares (`AutomationPillars`)
**Circuito conectado** (oscuro). Los 3 pilares con su copy actual (Productividad ·
Integración · IA Agéntica) como nodos glass en layout triangular (2 arriba,
1 centro-abajo), conectados por cables SVG por los que viajan **pulsos de luz
mint**; cada nodo se ilumina (glow en el borde) al recibir el pulso. Vocabulario
visual: hilos del hero + nodos del design-system.

### 3.4 Casos — SET PIECE (reemplaza a `CasesSpotlight`)
**Escaparate sticky con titulares flotantes.** Sección pinned a pantalla completa:
- **Izquierda:** visual del caso (captura/mockup) fijo, con crossfade + leve scale
  al cambiar de caso.
- **Centro:** **línea de recorrido** vertical: track tenue, fill mint con glow que
  crece con el scroll, un dot por caso (el activo brilla y escala), flecha pulsante
  de dirección.
- **Derecha:** **titulares flotantes** (sector en eyebrow mint + titular grande +
  1 línea de descripción) que viajan de abajo hacia arriba con el scroll; el activo
  nítido, el resto con fade + blur sutil; máscaras degradadas arriba/abajo.
- Contenido: los 4 casos del spec de contenido v2 (3 automatización + Hospiwaste),
  anonimizados por sector, sin cifras de resultado.

### 3.5 Qué puedes automatizar (`SolutionsGrid`)
**Marquesina viva + destacado** (claro). Las 8 soluciones actuales con sus notas
como píldoras en **dos filas marquee** fluyendo en direcciones opuestas (pausa al
hover). Debajo, **tarjeta destacada** que rota la solución "en foco" con ícono y
detalle; clic en una píldora la trae al destacado. Disclaimer de cifras como
potencial se mantiene visible.

### 3.6 Calculadora (`RoiCalculator`)
**Editorial abierto oscuro, sin tarjeta contenedora.** Concepto: "hoy vs con oito".
- **Izquierda:** 3 sliders horizontales finos (track 3px, fill y thumb mint con
  glow), valor grande inline sobre cada uno; cifra héroe de dinero `$X /mes` +
  nota "cálculo estimado · ~70% recuperable" + CTA WhatsApp.
- **Derecha:** **dos columnas verticales gemelas** desde una línea base: "Hoy"
  (degradado rojizo `#7e3626→#c25a41`) y "Con oito" (mint con glow), con cifras
  de horas encima y etiqueta debajo; **anotación delta punteada** a la derecha:
  "X h vuelven a ti".
- ⚠ **Requisito explícito del usuario:** todos los números y las columnas se
  animan de forma **fluida y escalonada siguiendo el deslizador** (count-up/tween,
  p.ej. ~300ms ease-out por cambio). Nunca saltos bruscos de valor.
- El rojizo cálido aparece SOLO aquí y en el caos del dolor (color de
  "costo/problema"); el mint es siempre "solución".

### 3.7 Metodología — SET PIECE (`Methodology`)
Se **conserva el diseño actual** (3 nodos circulares icono+número, hilo conector,
LiveCounter, copy actual). Se añade el comportamiento **"workflow que se
ejecuta"** scroll-driven: sección pinned; con el scroll, el nodo activo se
enciende (glow mint), un pulso viaja por el hilo hacia el siguiente y cae un
check ✓ al completarse cada paso. Sin tarjetas nuevas ni cambio de layout.

### 3.8 Prueba social (`SocialProof` + `BuiltWith`)
Sin logos de clientes ni testimonios todavía (sin permisos). Tres franjas:
1. Chips de **sectores reales atendidos** + los **placeholders de logos** actuales
   (glass), listos para convertirse en logos reales cuando haya permiso.
2. Fila de **señales numéricas neutras** (proyectos entregados, sectores, países,
   24/7).
3. Marquesina **"Construido con"** del stack (n8n, OpenAI, WhatsApp Business API,
   Supabase...).
Estructura lista para 1 testimonio (slot) cuando exista.

### 3.9 Puente a desarrollo web (sección NUEVA)
**Split con página armándose** (claro, tono "también hacemos"):
- Izquierda: eyebrow "También hacemos" + titular ("Tu página web, construida por
  oito") + 1 línea + **CTA fantasma** "Conoce desarrollo web →" hacia
  `/desarrollo-web` (jerarquía menor que los CTA WhatsApp).
- Derecha: mockup de **navegador donde una página web se construye sola** (bloques
  apareciendo en secuencia con stagger + cursor animado), en loop discreto.

### 3.10 FAQ y 3.11 CTA final
Conceptos actuales (`Faq`, `EasyStart`/`FinalCTA`) re-vestidos con el nuevo
lenguaje: reveals ricos, glass y tipografía consistentes. La FAQ conserva la
entrada sobre desarrollo web. CTA final oscuro con glow mint central fuerte.

## 4. Ritmo de color (aprobado)

`O·C·O·O·C·O·O·O·C·C·O` (O=oscuro, C=claro). El tramo oscuro 6-7-8 se mantiene
con **matices diferenciados** (opción A validada):
- **Calculadora:** `#052e27→#041f1c` + acento rojizo cálido (único junto al dolor).
- **Metodología:** degradado **invertido** (`#041f1c→#062e28`, luz desde abajo)
  + pulsos en movimiento.
- **Prueba social:** intensidad baja (chips y stack atenuados), "valle" antes del
  puente claro.
Ese bloque oscuro es el "corazón técnico" de la página. Claros: `#fbf8f0→#f0ede2`
y `#faf7ef→#f2efe6`. Oscuros base: `#04302a→#041f1c`.

## 5. Requisitos transversales (obligatorios)

- **Reduced motion:** todo patrón scroll-driven/marquee/count-up tiene fallback
  estático digno con `prefers-reduced-motion` (estados finales visibles, sin
  pinning, sin marquees en movimiento).
- **Accesibilidad:** contraste según reglas del design-system (§0.4 mint único
  asumido), foco visible, targets ≥44px, marquesinas pausables, tablist/tabpanel
  correctos donde aplique, `aria-live` en resultados de calculadora.
- **Móvil:** las set pieces se simplifican (pinning corto o secuencia por reveals,
  sin scroll-jacking largo); marquesina táctil con scroll nativo; columnas de la
  calculadora apiladas.
- **Rendimiento:** animar solo transform/opacity; `will-change` puntual; los hilos
  WebGL siguen la regla existente (§0.2: `backdrop-filter` no los refracta;
  texturas locales por sección cuando el vidrio deba refractar algo). No perder de
  vista la iniciativa SEO (C: SSR/islas) al elegir qué es cliente y qué no.
- **Números:** siempre count-up/tween fluido (calculadora, señales, LiveCounter).

## 6. Impacto en el trabajo existente

- **Se conservan:** Hero (base), WhyOito (copy), AutomationPillars (copy),
  Methodology (diseño completo), Faq, EasyStart/FinalCTA (base), Header
  (GlassSurface), ThreadsBackground, sistema liquid glass.
- **Se reemplazan:** CasesSpotlight → escaparate sticky nuevo; SolutionsGrid
  estático → marquesina; RoiCalculator → editorial con columnas.
- **Nueva:** sección puente dev. **Vuelve:** ruta `/desarrollo-web` (Dev*
  re-vestidos, diseño profundo diferido).
- ⚠ Hay **trabajo sin commitear** en la rama (liquid glass en CSS/design-system,
  EasyStart, Faq): debe commitearse ANTES de iniciar la implementación de este spec.

## 7. Roadmap resultante (actualiza el bloque 📍 del roadmap)

- **A. Contenido v2 (copy deck):** sigue vigente, PERO su plan
  (`2026-07-17-contenido-v2-copy-deck.md`) debe actualizarse a la estructura de
  11 secciones (nueva: puente dev; header con link a /desarrollo-web; FAQ ya no
  es la única mención de dev).
- **B. Recomposición** se redefine como **implementación de este spec** (por fases:
  fundaciones/commit pendiente → secciones re-vestidas → set pieces → calculadora →
  puente + /desarrollo-web liviana).
- **C. SEO:** sin cambios de fondo, pero vuelve a ser 2 URLs (/, /desarrollo-web):
  metadata y sitemap lo reflejan.
- **D. Reactivar desarrollo web (comercial + rediseño profundo de la página):**
  iniciativa futura cercana, con su propio brainstorm.

## 8. Fuera de alcance de este spec

- El **texto final** de las secciones (entregable del copy deck v2 actualizado).
- El diseño profundo de `/desarrollo-web` (iniciativa D).
- Assets reales de casos (capturas/mockups por caso: solo Hospiwaste confirmado;
  el resto usa mockups ilustrativos anonimizados).
- Testimonios y logos (pendientes de permisos; estructura queda lista).
