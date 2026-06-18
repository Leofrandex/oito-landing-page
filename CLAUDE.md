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

## 3. Identidad visual → ver `agents.md`

`agents.md` es la **biblia visual** (colores, tipografía, sistema de hilos, íconos).
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

**⚠️ Discrepancias a reconciliar (decisión pendiente):**
- `agents.md` dice heading = **Outfit**, pero el código usa **Varela Round + Playfair**. Definir cuál es la verdad.
- `agents.md` aún describe a oito como "Automatización e IA" → actualizar al nuevo posicionamiento (§2).

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
1. **Contenido** — mensaje, estructura de secciones, copy, keywords *(cimiento)*. ← EN CURSO
2. **Visual** — reconstrucción de componentes con el nuevo look + integración del copy.
3. **SEO** — técnico (SSR, metadata, OG, sitemap, robots, datos estructurados, rendimiento) + on-page final.

Specs en `docs/superpowers/specs/`.

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
- No fusionar a `main` sin aprobación explícita.
