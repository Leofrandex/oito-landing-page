# Spec — Pivote a solo Automatización (2026-07-17)

## Decisión

oito pivota su posicionamiento: por ahora es un **estudio de automatización e IA para
pymes hispanohablantes de LatAm**. Un solo servicio, un solo mensaje. Desarrollo
web/software deja de ser un pilar del sitio: queda como capacidad interna con mención
secundaria y como línea de crecimiento futuro.

Decisiones del usuario (brainstorm 2026-07-17):
1. **Una sola landing**: el Home absorbe lo mejor de `/automatizacion-ia` y se convierte
   en LA página de automatización. Se elimina la página de servicio separada.
2. **Desarrollo = mención secundaria**: sin página dedicada, sin pilar. Solo toques ligeros.
3. **Casos**: 3 de automatización (SecureByte, Go To Truckers, SupraBT) + 1 de desarrollo
   (Hospiwaste, que tiene capturas confirmadas) como guiño de músculo técnico.
4. **Mensaje desde cero**: el pivote amerita una nueva pasada de contenido (Contenido v2),
   no un simple ajuste del copy existente.
5. **Secuencia (Enfoque A)**: mensaje primero, recomposición después, SEO al final.

## Qué se conserva intacto (no negociable, sobrevive al pivote)

- Tagline **"oito LO HACE POR TI"** y efecto **TextType** (rotando SOLO frases de
  automatización; se quitan las de construir web/app/sistema).
- **Hilos WebGL** (`Threads.tsx`) como protagonista del Hero + lenguaje de nodos/trazos.
- Todo el **design system** (`docs/design-system.md`): Outfit/DM Sans/Varela Round,
  glassmorphism `.glass`/`.glass-light`, GlassSurface del header, sistema Button, badges,
  paleta mint/forest.
- Contacto **solo WhatsApp**.

## Estructura del sitio

| Ruta | Destino |
|---|---|
| `/` | Única landing pública. Fusión del Home actual + lo mejor de `/automatizacion-ia`. |
| `/automatizacion-ia` | Se elimina (fusionada en `/`). |
| `/desarrollo-web` | Se elimina del sitio. Código y specs quedan en git para el futuro. |
| `/design-system` | Se queda (herramienta interna). |

Sin redirects: la v5 nunca se publicó; producción sigue en la v4.

**Header**: la navegación deja de apuntar a páginas de servicio; pasa a anclas de sección
de la landing. Qué anclas exactamente se define en Contenido v2.

## Inventario de componentes

**Se conservan** (cuáles entran y en qué orden lo fija Contenido v2):
- Del Home: Hero + ThreadsBackground, SocialProof, WhyOito, CasesSpotlight/CaseStudy,
  Faq, EasyStart, FinalCTA, Header, Footer, StickyWhatsAppCTA.
- De `/automatizacion-ia`: AutomationPillars, AutomationCases, SolutionsGrid,
  RoiCalculator, Methodology, BuiltWith.

**Se retiran del sitio** (código queda en historial de git):
- TwoPillars, ServiceHero, DevServices, DevProcess, DevCases, DevTech.
- Las rutas `/desarrollo-web` y `/automatizacion-ia`.

**Duplicados a resolver en Contenido v2** (solo sobrevive uno de cada grupo):
- "Cómo trabajamos": HowWeWorkHome vs Methodology.
- Casos: FeaturedCases vs AutomationCases vs CasesSpotlight.

## Mención secundaria de desarrollo

Dos toques ligeros, sin sección propia:
1. Una entrada en el FAQ (tipo "¿También hacen páginas web o software?").
2. El caso Hospiwaste dentro del spotlight de casos, presentado como proyecto de
   desarrollo.

El copy exacto se escribe en Contenido v2.

## Roadmap actualizado (reemplaza la secuencia A→B→C previa)

- **A. Contenido v2** ← siguiente paso. Brainstorm de mensaje desde cero: a quién le
  hablamos, qué dolor, qué promesa, frases del TextType, estructura de secciones de la
  landing única. Entregable: copy deck v2 + resolución de duplicados. Cierra con spec+plan
  propios.
- **B. Recomposición** — cirugía de rutas + montar la landing única con los componentes
  maduros vestidos con el copy nuevo. No se construyen componentes nuevos salvo que
  Contenido v2 lo pida.
- **C. SEO** — igual que el plan previo pero simplificado a una URL: SSR/islas, metadata/
  OG/canonical, robots + sitemap, JSON-LD, CWV + on-page. Title orientado a
  automatización con IA.

**Backlog heredado** (sigue vigente salvo lo que aplique solo a componentes retirados):
tokens v5 de TwoPillars (queda obsoleto al retirarse TwoPillars), glow bullets, nodos §7,
gate de revisión UX/diseño al cierre de cada fase.

## Documentación a actualizar

- **CLAUDE.md**: §2 posicionamiento (solo automatización, desarrollo = futuro), §5 roadmap
  (esta secuencia), referencias a la página de desarrollo.
- **copy-deck.md**: marcar PÁGINA 2 (desarrollo) como congelada para el futuro.
- **agents.md**: el pendiente cambia de "actualizar a dos pilares" a "confirmar
  posicionamiento solo-automatización" (su descripción vieja vuelve a ser casi correcta).

## Fuera de alcance

- Cambiar identidad visual, tipografía o efectos de marca.
- Escribir el copy nuevo (eso es Contenido v2, siguiente brainstorm).
- Borrar código de desarrollo del historial de git.
- Redirects o consideraciones de URLs publicadas (la v5 no está en producción).
