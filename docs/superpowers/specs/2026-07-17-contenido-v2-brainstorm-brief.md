# Brief de arranque — Brainstorm de Contenido v2 (landing única de automatización)

> **Para el agente de la próxima sesión.** Este documento NO es un spec cerrado: es el
> contexto completo para que arranques el **brainstorm** de Contenido v2 sin releer la
> sesión anterior. Tu primer paso debe ser invocar la skill `superpowers:brainstorming`
> y trabajar con el usuario en español. El entregable final del brainstorm será un spec
> (`docs/superpowers/specs/YYYY-MM-DD-contenido-v2-design.md`) y luego un plan.

---

## 1. Qué pasó antes (contexto del pivote)

El 2026-07-17 el usuario decidió **pivotar el posicionamiento**: por ahora oito es un
**estudio de SOLO automatización / IA** para pymes hispanohablantes de LatAm. Desarrollo
web/software se pospone como línea de crecimiento futuro.

Ese pivote ya está **cerrado y documentado** (no lo re-litigues):
- Spec del pivote: `docs/superpowers/specs/2026-07-17-pivote-automatizacion-design.md`
- CLAUDE.md §2 (posicionamiento) y §5 (roadmap A→B→C) ya actualizados.
- `docs/content/copy-deck.md`: PÁGINA 2 (desarrollo) marcada 🧊 congelada; nota de que
  PÁGINA 1 y 3 serán reemplazadas por el copy deck v2 (este trabajo).

Roadmap vigente: **A. Contenido v2 (ESTO) → B. Recomposición → C. SEO.**

## 2. Decisiones YA tomadas por el usuario (son restricciones, no preguntas)

1. **Una sola landing pública** (`/`). Se eliminan las rutas `/automatizacion-ia` y
   `/desarrollo-web` (en la fase B de código; aquí solo diseñamos el contenido de `/`).
2. **Solo automatización** como servicio. Cero pilar de desarrollo.
3. **Desarrollo = mención secundaria**, sin sección propia: (a) una entrada de FAQ tipo
   "¿También hacen páginas web o software?" y (b) el caso **Hospiwaste** dentro del
   spotlight de casos, presentado como proyecto de desarrollo (guiño de músculo técnico).
4. **Casos = 3 automatización + Hospiwaste**: SecureByte, Go To Truckers, SupraBT
   (automatización) + Hospiwaste (desarrollo). Todos anonimizados por sector hasta que el
   cliente autorice nombre/logo.
5. **Mensaje desde cero**: el usuario NO quiere reutilizar el copy tal cual; quiere
   repensar hero, propuesta de valor y estructura de secciones para el nicho de
   automatización. El copy viejo es *base de partida*, no molde.

## 3. Innegociables de marca (no se tocan en el brainstorm)

- Tagline **"oito LO HACE POR TI"** (firma).
- Efecto **TextType** (palabras que se escriben/borran) en el Hero, ahora rotando SOLO
  frases de automatización (se retiran "construye tu web/app/sistema").
- **Hilos WebGL** como protagonista del Hero.
- Contacto **solo WhatsApp** (`https://wa.me/584241344659`), botón sticky/flotante.
- **Honestidad de cifras:** ninguna cifra como resultado medido salvo caso real con
  permiso. Las ilustrativas se redactan como potencial ("hasta ~85%").
- **Sin em dash (`—`)** en copy visible: usar coma, punto, dos puntos o paréntesis.
- Copy a eliminar (feedback previo): "Nacimos en Venezuela, trabajamos para toda LatAm" y
  "Sin cifras infladas, solo lo que hicimos".

## 4. Preguntas abiertas que el brainstorm debe resolver (una a una, con el usuario)

Estas son el corazón del brainstorm. No las respondas por tu cuenta:

- **Audiencia y dolor:** ¿a qué pyme/persona exacta le hablamos (rol, tamaño, sector)? ¿el
  dolor central es "pierdo horas en lo repetitivo", "no doy abasto", "pierdo leads", otro?
- **Propuesta de valor / hero:** ¿cuál es la promesa central de una landing 100%
  automatización? ¿el hero actual ("Automatizamos lo repetitivo con IA") sirve o se
  repiensa?
- **Frases del TextType:** lista final de frases de automatización a rotar.
- **Estructura de secciones** de la landing única: qué secciones, en qué orden, y
  resolución de los **duplicados** (ver §5).
- **Mención de desarrollo:** redacción exacta de la entrada de FAQ y cómo se presenta
  Hospiwaste en el spotlight.
- **Prueba social sin material:** hoy NO hay logos ni testimonios con permiso (ver §6).
  ¿cómo se arma la sección? ¿se pospone, se usa "construido con" como stack, se usa conteo
  de proyectos?
- **Navegación del header:** con una sola página, el header pasa a anclas de sección.
  ¿cuáles anclas?

## 5. Duplicados de componentes a resolver (decisión de contenido)

En la landing única solo sobrevive UNO de cada grupo. El brainstorm decide cuál, según la
estructura de secciones elegida:
- **"Cómo trabajamos":** `HowWeWorkHome` vs `Methodology`.
- **Casos:** `FeaturedCases` vs `AutomationCases` vs `CasesSpotlight`.
  (Nota: `CasesSpotlight` es el patrón más reciente, montado sobre `CaseStudy`; ver §5 de
  CLAUDE.md y commits recientes.)

## 6. Datos que faltan (el usuario los aportará; no inventar)

- **Permisos de nombre/logo** de los 4 casos: ninguno confirmado → anonimizados por sector.
- **Testimonios:** ninguno disponible. No usar ficticios.
- **Capturas/mockups:** solo **Hospiwaste** confirmó capturas reales.
- **Métricas/tiempos:** ningún caso tiene métricas medidas → redactar sin cifras de
  resultado.

## 7. Inventario de copy existente (base de partida, en `docs/content/copy-deck.md`)

- **PÁGINA 1 (HOME actual):** hero de dos pilares, sección "Los dos pilares", prueba
  social (placeholders), "Por qué oito", casos destacados cruzados, "Cómo trabajamos",
  CTA. Gran parte asume dos pilares → se repiensa.
- **PÁGINA 3 (AUTOMATIZACIÓN actual):** hero "Automatizamos lo repetitivo con IA",
  3 pilares (Productividad / Integración / IA Agéntica), 3 casos reales de automatización,
  grid de soluciones, calculadora de ROI, metodología + contador en vivo, "Construido con",
  CTA. **Esta es la mina principal de copy reutilizable.**
- **PÁGINA 2 (DESARROLLO):** 🧊 congelada. Solo se rescata el caso Hospiwaste
  (trazabilidad de desechos peligrosos, PWA, con capturas reales).

## 8. Componentes disponibles (maduros, ya revisados por gates UX)

Del Home: Hero + ThreadsBackground, SocialProof, WhyOito, CasesSpotlight/CaseStudy, Faq,
EasyStart, FinalCTA, Header, Footer, StickyWhatsAppCTA.
De automatización: AutomationPillars, AutomationCases, SolutionsGrid, RoiCalculator,
Methodology, BuiltWith.
El brainstorm no construye componentes nuevos salvo que el contenido lo exija; se viste lo
que existe con el copy nuevo (eso es la fase B, Recomposición).

## 9. Referencias

- Biblia visual: `docs/design-system.md` (no se toca en Contenido, pero condiciona qué es
  realizable).
- Guía del proyecto: `CLAUDE.md` (§2 posicionamiento, §5 roadmap, §7 pendientes de datos,
  §8 convenciones: español, brainstorm→spec→plan→implementación, gate UX al cierre).
- Ledger de ejecución: `.superpowers/sdd/progress.md`.
- Voz de marca: cercana, técnica, confiada ("oito lo hace por ti").

---

**Arranque sugerido para el próximo agente:** invoca `superpowers:brainstorming`, confirma
con el usuario que las decisiones de §2 siguen firmes, y empieza por la pregunta de
**audiencia y dolor** (§4), que ancla todo lo demás.
