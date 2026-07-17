# CLAUDE.md — Guía del proyecto (oito landing)

> **Documento vivo.** Se actualiza conforme tomamos decisiones del rediseño.
> No tratar nada aquí como definitivo hasta marcarlo como ✅ FIJADO.

---

## 1. Qué es este proyecto

Landing page de **oito**, un estudio digital para **pymes hispanohablantes de LatAm**.
Actualmente en rediseño completo (rama `oito-page-v5`).

**Stack:**
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 + CSS Modules por componente
- Animación: GSAP, framer-motion, OGL (shader de hilos), Lenis (smooth scroll)
- Contacto: Cal.com embed + Resend (formulario) + WhatsApp *(en simplificación, ver §4)*
- Deploy: Vercel (Analytics + Speed Insights)

**Comandos:**
- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` — eslint

---

## 2. Posicionamiento ✅ FIJADO (en brainstorming 2026-06)

oito es un **estudio digital con dos líneas de servicio independientes**:
1. **Desarrollo web/software** (páginas, apps, sistemas a medida)
2. **Automatización / IA** (flujos, agentes, integraciones)

Un cliente puede contratar solo una. No somos "solo IA".

- **Voz de marca:** se mantiene el tagline *"oito LO HACE POR TI"* (firma, no se cambia).
  Lo que se amplía son las **subfrases**: además de "automatiza tu [X]" ahora también
  "construye tu [web/app/sistema]". Cubre los dos pilares sin tocar el tagline.
- **🔒 Efecto de marca (se conserva):** el efecto TextType de palabras que se escriben/borran
  (`TextType.jsx`) sigue en el Hero, ampliado para rotar frases de ambos pilares.
- **Cliente:** pymes LatAm, español, varios países. SEO en español amplio (no local).
- **Estructura:** mostrar los dos pilares por separado (más superficie SEO).

---

## 3. Identidad visual → ver `docs/design-system.md`

**📐 Biblia visual = `docs/design-system.md`** (handoff revisado: tipografía, glass, botones,
chips, GlassCard, glow bullets, nodos, paleta — valores exactos verbatim-implementables).
`agents.md` queda como referencia de marca de alto nivel; ante conflicto, **manda
`docs/design-system.md`**.
Resumen rápido:
- **Verde Mint** `#09bc8a` (acento) · **Forest Green** `#004346` · **Forest Deep** `#002a2c`
- **Cream Mint** `#f4fcf9` (fondo claro) · **Neon Mint** `#00ffaa` (glow)
- Motivo central: **"hilos" (threads)** que fluyen e interconectan nodos.

**🔒 INNEGOCIABLE — Hilos dinámicos:** El efecto de hilos WebGL animado y reactivo al
mouse (`src/components/Threads.tsx`, shader OGL con ruido Perlin) es **esencia de marca** y
se conserva como protagonista del Hero. Su lenguaje visual (nodos + trazos interconectados)
se extiende al resto del sitio como **acentos** (fondo `hilos-fondo.png`, figuras vectoriales
del kit, divisores), pero el shader pesado NO corre permanentemente en todas las secciones
(rendimiento/SEO). Nunca eliminar ni reemplazar el efecto de hilos.

**✅ FIJADO — Tipografía (actualizado 2026-07-04):** **Outfit** para titulares (hero/secciones/
tarjetas), **DM Sans** para cuerpo y UI, **Varela Round SOLO para el wordmark "oito"** (y el CTA
lúdico `oitomatiza`). El CTA funcional de WhatsApp va en DM Sans 700. Esto **revierte** la decisión
previa de "headings = DM Sans": ahora manda `agents.md`/`design-system.md` → **Outfit**.
Tareas de código (fase visual): quitar **Playfair** de `layout.tsx`, añadir Outfit, y corregir
`globals.css`/`base.css` que hoy aplican Varela Round a todos los h1-h6. Detalle en
`docs/design-system.md` §1.

**✅ FIJADO — Copy a eliminar (feedback usuario):**
- Quitar "Nacimos en Venezuela, trabajamos para toda LatAm" del sitio.
- Quitar "Sin cifras infladas, solo lo que hicimos."

**✅ FIJADO — Sin em dash (`—`) en el copy (2026-07-07):** Ningún texto visible del sitio usa el
guion largo `—`. Reescribir con coma, punto, dos puntos o paréntesis según corresponda. Aplica a
todo el copy, `aria-label`s y contenido renderizado (los comentarios de código quedan fuera).

**⚠️ Pendiente:** `agents.md` aún describe a oito como "Automatización e IA" → actualizar al nuevo posicionamiento (§2).

---

## 4. Contacto ✅ FIJADO

**Solo WhatsApp** como canal de contacto. Se elimina:
- El embed de Cal.com (`@calcom/embed-react`)
- El formulario con Resend (`src/app/actions.ts` / `sendEmail`)

WhatsApp actual: `https://wa.me/584241344659`. Esto simplifica el sitio y mejora rendimiento.

---

## 5. Plan de rediseño

**Una rama:** `oito-page-v5` → se fusiona a `main` una sola vez al final.

**Tres iniciativas, secuenciales, cada una con su spec + plan:**
1. **Contenido** — mensaje, estructura, copy, keywords *(cimiento)*.
2. **Visual** — reconstrucción de componentes con el nuevo look + integración del copy.
3. **SEO** — técnico (SSR, metadata, OG, sitemap, robots, datos estructurados, rendimiento) + on-page final.

Specs/planes en `docs/superpowers/specs/` y `docs/superpowers/plans/`.

**📍 Roadmap re-planificado (2026-07-05) — secuencia A → B → C:**
- **A. Terminar Visual** ← EN CURSO. Fase 1 ✅ (tipografía Outfit + escala de pesos 700/600/500 +
  SocialProof oscuro), Fase 2a ✅ (badge §4 + unificar clases de sección). **Fase 2b** (sistema
  Button §3) con spec listo, pendiente plan + build. *Backlog no bloqueante:* unificar tokens de
  `TwoPillars` (usa set "v5"), glow bullets (cuando haya listas), nodos §7 (requiere crear assets).
  **Gate de revisión UX/diseño** con `ui-ux-pro-max` + `frontend-design` (ver §8).
- **B. Construir página `/desarrollo-web`** — hoy es **stub**; el copy YA existe (copy-deck PÁGINA 2:
  Hero, Servicios, Cómo trabajamos, Casos, Tecnologías, CTA). Reutilizar los patrones maduros del
  Automatización. Cierra la iniciativa Contenido.
- **C. Iniciativa SEO** (sin empezar): C1 refactor SSR (quitar `'use client'` de páginas → islas),
  C2 metadata/OG/canonical por página, C3 robots + sitemap, C4 JSON-LD, C5 CWV + on-page.
  *Dependencias:* SSR toca componentes Visual (hacerlo con Visual estable); sitemap/metadata final
  necesita que exista Desarrollo-web.

Estado detallado y acuerdos: `.superpowers/sdd/progress.md` (ledger de ejecución) y los specs por fase.

**✅ FIJADO — Glassmorphism sobre hilos (liquid glass, 2026-07-08):** Lenguaje visual central.
Solo **dos** clases, elegidas por el tono del fondo:
- **`.glass` (fondos oscuros) = estilo "Liquid mint":** degradado translúcido teñido de mint
  (`120deg, mint 30%→5%→15%`), `blur(11px) saturate(1.5)`, brillo superior + luz interior mint.
- **`.glass-light` (fondos claros) = estilo "Liquid sheen":** mismo tratamiento glossy en blanco
  translúcido (`120deg, blanco 30%→5%→12%`), `blur(11px) saturate(1.4)`.
- **Ambas usan "Rim suave":** el borde es un **canto de luz en degradado enmascarado**
  (pseudo-elemento `::after`), no un `border` sólido de color. Da aspecto de vidrio real.

Valores exactos + receta del rim en `docs/design-system.md` §2 y §2.1. Se aplica al header (vía
`GlassSurface`, refracción SVG aparte), hero, tarjetas, chips y CTAs. **Pendiente:** llevar estas
recetas a `globals.css` y a los componentes (se decidió hacerlo después de fijar los docs).

**⚠️ Verdad técnica clave (2026-07-08, comprobado):** el `backdrop-filter` **NO refracta los hilos
del fondo**. `ThreadsBackground` es un canvas **WebGL `position:fixed`** (capa GPU) y Chromium no
incluye esas capas fijas aceleradas en el "backdrop" → los hilos **pasan por el vidrio sin
difuminarse** (idénticos dentro y fuera). Por eso: **(1)** `.glass` tiene **cuerpo propio** (fill
translúcido tipo liquid glass + rim de luz, ver `design-system.md` §2; móvil ≤768px `blur(8px)`)
para leer como vidrio en cualquier sección oscura sin depender del fondo; **(2)** la refracción
visible se logra con un **glow LOCAL** por sección (`.section::before`, misma capa que sí capta el
filtro) — aplicado en `EasyStart`, `AutomationPillars`, `SolutionsGrid`; los logos de `SocialProof`
también usan `.glass`. *`.glass-strong` se eliminó (2026-07-07).* **No prometer
(en web ni en propuestas/PDF) que el vidrio distorsiona los hilos animados: es imposible con esta
arquitectura.** Valores exactos en `docs/design-system.md` §2.

**✅ FIJADO — Glass premium (GlassSurface):** Para vidrio de alta calidad con **refracción SVG
real** (distorsiona el fondo, no solo blur) se usa `src/components/GlassSurface.jsx` (de React
Bits). Ya aplicado al **Header** (`displace=3`, `distortionScale=-160`, `backgroundOpacity=0.18`,
`color-scheme: dark` para legibilidad sobre oscuro, texto claro con sombra). ⚠️ La refracción SVG
solo funciona en **Chromium**; en Safari/Firefox cae a blur normal (fallback automático). Las
utilidades `.glass`/`.glass-light` y `GlassCard` siguen para vidrio simple/ligero. Nota: el
`backdrop-filter` crea containing block → elementos `position:fixed` hijos (ej. overlay de menú
móvil) deben ir FUERA del GlassSurface.

**✅ FIJADO — Dirección visual del Home:** Tratamiento **híbrido**: Hero y momentos clave en
oscuro cinemático (forest green + hilos WebGL), secciones de contenido en claro (cream mint)
para legibilidad y rendimiento. Patrón *Immersive/Interactive Experience + Feature-Rich
Showcase*. CTA persistente (WhatsApp sticky/flotante). Regla: **cinemático sin sacrificar
velocidad/SEO** — efectos con `transform`/`opacity`, degradación en móvil, respeta
`prefers-reduced-motion`, opción de saltar el intro.

---

## 6. Estado actual del SEO (diagnóstico) — a resolver en iniciativa 3

- `metadata` mínimo en `layout.tsx` (solo title + description). Falta OG, Twitter, canonical, robots, JSON-LD.
- Todo el sitio es `'use client'` detrás de un `LoadingScreen` con animación pesada → mala indexación y Core Web Vitals.
- No hay sitemap.xml ni robots.txt. Una sola página (SPA).
- Title actual ("oito | Automatización con IA") encierra el posicionamiento viejo.

---

## 7. Pendientes de datos (el usuario los conseguirá)

El copy deck (`docs/content/copy-deck.md`) está cerrado con **6 casos reales** (3 desarrollo:
Ponce-Benzo, Hospitalar, Hospiwaste · 3 automatización: SecureByte, Go To Truckers, SupraBT),
pero falta data que el usuario aportará después:

- **Permisos de nombre/logo:** los 6 clientes salieron N/D → por ahora **anonimizados por
  sector**. Nombrar + logo solo cuando el cliente autorice.
- **Testimonios:** ninguno disponible aún (sección de prueba social arranca sin testimonios
  o más liviana).
- **Capturas/mockups:** solo **Hospiwaste** confirmó capturas reales; los demás N/D.
- **Tiempos/métricas:** ningún caso tiene métricas medidas → se redacta sin cifras de resultado.

> Cuando lleguen estos datos, actualizar el copy deck y "ascender" los casos (nombre, logo,
> testimonio, capturas) donde haya permiso.

## 8. Convenciones de trabajo

- Responder e interactuar con el usuario en **español**.
- Cada iniciativa: brainstorming → spec aprobado → plan → implementación → verificación.
- Ejecución de planes con **subagent-driven-development** (implementer + reviewer por tarea).
- **✅ Gate de revisión UX/diseño (2026-07-05):** usar `ui-ux-pro-max` + `frontend-design` como
  **lente de revisión/crítica** (no de generación — la dirección la fija `docs/design-system.md`)
  al cierre de cada fase Visual y como catch-up de lo ya construido. Auditar estados de interacción,
  accesibilidad (contraste/targets/foco), jerarquía de CTAs y consistencia; triar hallazgos contra
  el design-system.
- No fusionar a `main` sin aprobación explícita.
