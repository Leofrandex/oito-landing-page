# Visual Home Implementation Plan (2b)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to
> implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Reconstruir el Home (`/`) como página cinemática híbrida usando el copy aprobado, sobre
la fundación 2a (shell, hilos, glass, Header/Footer/StickyCTA).

**Architecture:** Secciones nuevas como componentes en `src/components/`. El Home (`src/app/page.tsx`)
las ensambla. Tratamiento **híbrido**: hero oscuro (forest-deep + hilos), secciones de contenido
en claro (cream). Vidrio (`GlassCard` / `.glass`) para tarjetas; `GlassSurface` reservado a piezas
premium puntuales.

**Tech Stack:** Next.js 16, React 19, TS, CSS Modules, GSAP, framer-motion, OGL (Threads), TextType.

## Global Constraints

- **Fuente de texto (verbatim):** `docs/content/copy-deck.md` (sección "PÁGINA 1 — HOME"). Usar
  ese copy exacto; no inventar.
- **Tagline:** `oito LO HACE POR TI`. **Efecto TextType** en hero rotando frases de AMBOS pilares
  (lista en copy-deck §1). 🔒 conservar.
- **Hilos 🔒:** fondo WebGL existente. El hero muestra los hilos (fondo oscuro); el hero puede
  montar una instancia interactiva (mouse) propia. Resto de secciones claras tapan los hilos.
- **CTA único:** WhatsApp `https://wa.me/584241344659`. Sin formulario ni Cal.com.
- **Colores:** mint `#09bc8a`, forest `#004346`, forest-deep `#002a2c`, cream `#f4fcf9`, neon `#00ffaa`.
- **Casos:** anonimizados por sector (nombres reales NO públicos). Sin métricas inventadas.
- **Glass:** `.glass`/`.glass-strong`/`GlassCard` ya existen. `prefers-reduced-motion` respetado.
- **Verificación:** no hay tests; gate = `npm run build` pasa + revisión visual en dev (`-p 3939`).
- **Idioma UI:** español.

---

### Task 1: Backdrop base oscuro + tokens de sección (resuelve C2)

**Files:** Modify `src/app/globals.css`; Modify `src/components/ThreadsBackground.tsx`

**Interfaces:** Produces utilidades `.sectionDark` / `.sectionLight` y un base oscuro tras los hilos.

- [ ] **Step 1:** En `ThreadsBackground.tsx`, dar al div contenedor `backgroundColor: '#002a2c'`
  (forest-deep) para que donde los hilos sean transparentes se vea oscuro (no blanco). NO tocar
  Threads.tsx ni Threads.module.css.
- [ ] **Step 2:** En `globals.css` añadir utilidades de sección:
  ```css
  .sectionDark { position: relative; color: #fff; }
  .sectionLight { position: relative; background: var(--color-mint-light, #f4fcf9); color: #1a1a1a; }
  ```
  (Definir `--color-mint-light: #f4fcf9` en `:root` si no existe.)
- [ ] **Step 3:** `npm run build` pasa.
- [ ] **Step 4:** Commit: `feat(home): dark backdrop base + section bg utilities (C2)`

---

### Task 2: Hero del Home (oscuro, TextType, CTA, skip)

**Files:** Rewrite `src/components/Hero.tsx`; Modify `src/components/Hero.module.css`

**Interfaces:** Consumes `TextType`, `scrollToSection` (opcional). Produces `Hero` (sección `#hero`,
oscuro, transparente para mostrar hilos). Copy: copy-deck §1.

- [ ] **Step 1:** Hero a pantalla (`min-height: 100dvh`), fondo transparente (muestra hilos del
  shell sobre base forest-deep). Contenido centrado: marca `oito` grande (Varela Round, mint con
  glow), tagline `LO HACE POR TI`, efecto `TextType` con las frases de ambos pilares (copy-deck §1),
  subtítulo fijo, botón CTA WhatsApp (`https://wa.me/584241344659`), micro-link "saltar intro".
  Mantener `id="hero"`. Texto claro.
- [ ] **Step 2:** Animación de entrada (GSAP o framer) con `prefers-reduced-motion` respetado.
- [ ] **Step 3:** `npm run build` pasa.
- [ ] **Step 4:** Commit: `feat(home): rebuild hero (dark, TextType both pillars, WhatsApp CTA)`

---

### Task 3: TwoPillars

**Files:** Create `src/components/TwoPillars.tsx` + `.module.css`

**Interfaces:** Consumes `GlassCard`, `next/link`, íconos Lucide. Produces `TwoPillars`.
Copy: copy-deck §2.

- [ ] **Step 1:** Sección (clara o de transición) con título "Dos formas en que oito lo resuelve"
  + 2 `GlassCard` (hover) lado a lado: **Desarrollo web & software** (link `/desarrollo-web`) y
  **Automatización & IA** (link `/automatizacion-ia`), cada una con ícono Lucide, copy del deck y
  link "Ver … →". Responsive: 2 col → 1 col en móvil.
- [ ] **Step 2:** `npm run build` pasa.
- [ ] **Step 3:** Commit: `feat(home): add TwoPillars section`

---

### Task 4: CaseStudy (componente reutilizable) + FeaturedCases

**Files:** Create `src/components/CaseStudy.tsx` + `.module.css`; Create `src/components/FeaturedCases.tsx` + `.module.css`

**Interfaces:** `CaseStudy` props: `{ title: string; pillar: 'Desarrollo'|'Automatización'; sector: string; body: string; hasShots?: boolean }`. `FeaturedCases` consume `CaseStudy` + `GlassCard`.
Copy: copy-deck §5 (4 casos: Ponce-Benzo, Hospiwaste, SecureByte, Go To Truckers — anonimizados).

- [ ] **Step 1:** `CaseStudy` = tarjeta de vidrio con etiqueta de pilar, sector, título y descripción
  (del deck). Sin nombres de cliente. Sin métricas. `hasShots` muestra un placeholder de imagen.
- [ ] **Step 2:** `FeaturedCases`: título "Lo que oito ya ha construido" + bajada + grid de 4
  `CaseStudy` (datos del deck §5) + link "Ver todas las soluciones →".
- [ ] **Step 3:** `npm run build` pasa.
- [ ] **Step 4:** Commit: `feat(home): add CaseStudy component + FeaturedCases section`

---

### Task 5: "Por qué oito" (About condensado)

**Files:** Create `src/components/WhyOito.tsx` + `.module.css` (deriva de `About.tsx` actual)

**Interfaces:** Consumes framer-motion / GSAP. Produces `WhyOito`. Copy: copy-deck §4.

- [ ] **Step 1:** Versión condensada del About: bloques "El tiempo no se recupera, los ingresos sí"
  y "Tú enfócate en crecer…", + animación antes→después (caos→orden — reutilizar de `About.tsx`),
  + línea de origen "Nacimos en Venezuela, trabajamos para toda LatAm". Sección clara.
  Decidir: conservar `Globe` o sustituir por figura de nodos del kit (preguntar si dudas).
- [ ] **Step 2:** `npm run build` pasa.
- [ ] **Step 3:** Commit: `feat(home): add condensed WhyOito section`

---

### Task 6: HowWeWork condensado (Home)

**Files:** Create `src/components/HowWeWorkHome.tsx` + `.module.css` (deriva de `HowWeWork.tsx`)

**Interfaces:** Produces `HowWeWorkHome`. Copy: copy-deck §6 (3 pasos).

- [ ] **Step 1:** 3 pasos (Contacto & Auditoría / Construcción & Implementación / Monitoreo & Mejora)
  con copy del deck. Versión simple (sin el contador en vivo, que va en /automatizacion-ia).
- [ ] **Step 2:** `npm run build` pasa.
- [ ] **Step 3:** Commit: `feat(home): add condensed HowWeWork section`

---

### Task 7: FinalCTA

**Files:** Create `src/components/FinalCTA.tsx` + `.module.css`

**Interfaces:** Produces `FinalCTA`. Copy: copy-deck §7.

- [ ] **Step 1:** Sección de cierre a contraste (oscuro) con título "¿Listo para que oito lo haga
  por ti?", bajada y botón WhatsApp grande (glow). Copy del deck §7.
- [ ] **Step 2:** `npm run build` pasa.
- [ ] **Step 3:** Commit: `feat(home): add final CTA section`

---

### Task 8: SocialProof (liviano, sin assets reales aún)

**Files:** Create `src/components/SocialProof.tsx` + `.module.css`

**Interfaces:** Produces `SocialProof`. Copy: copy-deck §3.

- [ ] **Step 1:** Sección con título "Negocios que ya dejaron que oito lo haga por ellos". Como NO
  hay logos/testimonios reales aún (ver CLAUDE.md §7), renderizar un estado liviano: una franja de
  placeholders neutros para logos + una nota interna (comentario) de que se completará con assets
  reales. NO inventar testimonios ni logos. Mantener la sección discreta para no parecer vacía.
- [ ] **Step 2:** `npm run build` pasa.
- [ ] **Step 3:** Commit: `feat(home): add lightweight SocialProof placeholder`

---

### Task 9: Ensamblar el Home

**Files:** Rewrite `src/app/page.tsx`

**Interfaces:** Consume todas las secciones nuevas. Mantener `LoadingScreen` + estado `isLoaded`.

- [ ] **Step 1:** Reescribir `page.tsx` para renderizar en orden: `LoadingScreen` (con skip),
  `Hero`, `TwoPillars`, `SocialProof`, `WhyOito`, `FeaturedCases`, `HowWeWorkHome`, `FinalCTA`.
  Quitar los imports/secciones viejos del Home (AuthorityBanner, About, Portfolio, HowWeWork,
  Pricing, Contact) — esos componentes se reutilizan en `/automatizacion-ia` (Plan 2d), no se borran.
  Sin imports sin usar. El hero muestra los hilos; las secciones claras los tapan.
- [ ] **Step 2:** Asegurar que ninguna sección quede tapada bajo el Header fixed (padding superior
  donde aplique; el hero ocupa el tope a pantalla completa, así que el header lo sobrevuela).
- [ ] **Step 3:** `npm run build` pasa; revisión visual en dev `-p 3939`.
- [ ] **Step 4:** Commit: `feat(home): assemble redesigned home page`

---

## Self-Review

- **Cobertura copy-deck §1-§7:** Hero(T2) §1, TwoPillars(T3) §2, SocialProof(T8) §3, WhyOito(T5) §4,
  FeaturedCases(T4) §5, HowWeWorkHome(T6) §6, FinalCTA(T7) §7, ensamblaje(T9). ✅
- **Híbrido:** hero oscuro (T2) + secciones claras (T3-T8) + base oscuro (T1). ✅
- **Reuso:** componentes viejos NO se borran (van a 2d); el Home deja de usarlos (T9).
- **Sin placeholders de plan:** el texto exacto vive en copy-deck.md (referencia, no placeholder);
  cada tarea nombra archivos y responsabilidades concretas.

## Próximos planes
2c /desarrollo-web · 2d /automatizacion-ia (reusa About/Portfolio/Pricing/HowWeWork/AuthorityBanner)
· 2e limpieza (eliminar Contact form/actions.ts/Cal.com; depurar deps).
