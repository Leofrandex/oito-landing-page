# Roadmap y estado del rediseño (oito landing)

> Dónde vamos y qué falta. Decisiones ya fijadas → [decisiones-fijadas.md](decisiones-fijadas.md). Ledger de ejecución fase por fase → `.superpowers/sdd/progress.md`.

---

## Plan de rediseño
**Una rama:** `oito-page-v5` → se fusiona a `main` una sola vez al final (no fusionar sin aprobación explícita).

**Tres iniciativas, secuenciales, cada una con su spec + plan** (en `superpowers/specs/` y `superpowers/plans/`):
1. **Contenido** — mensaje, estructura, copy, keywords *(cimiento)*.
2. **Visual** — reconstrucción de componentes con el nuevo look + integración del copy.
3. **SEO** — técnico (SSR, metadata, OG, sitemap, robots, datos estructurados, rendimiento) + on-page final.

## 📍 Roadmap re-planificado (2026-07-17, pivote a solo automatización)
- **A. Contenido v2** ← EN CURSO. Mensaje desde cero para la landing única. Brainstorm cerrado; spec y plan escritos. Entregable: copy deck v2 (texto final de las 10 secciones) + resolución de duplicados (se usan `Methodology` y `CasesSpotlight`; se descartan `HowWeWorkHome`, `FeaturedCases`, `AutomationCases`). Spec: `superpowers/specs/2026-07-17-contenido-v2-design.md`. Plan: `superpowers/plans/2026-07-17-contenido-v2-copy-deck.md`.
- **B. Recomposición** — cirugía de rutas (quitar del sitio `/desarrollo-web` y `/automatizacion-ia`, todo se fusiona en `/`) + montar la landing única con los componentes maduros vestidos con el copy nuevo. Header pasa a anclas de sección. No se construyen componentes nuevos salvo que Contenido v2 lo pida. **Quitar la ruta = desenlazar, no borrar código:** los componentes `Dev*`/`ServiceHero`/`TwoPillars` se preservan en la rama para la iniciativa D.
- **C. Iniciativa SEO** (sin empezar), simplificada a una sola URL: C1 refactor SSR (quitar `'use client'` → islas), C2 metadata/OG/canonical, C3 robots + sitemap, C4 JSON-LD, C5 CWV + on-page. Title orientado a automatización con IA.
- **D. Reactivar desarrollo web** (futuro cercano, sin fecha). No es "algún día": es plan próximo. Revive `/desarrollo-web` (código ya construido y preservado) + descongela PÁGINA 2 del copy deck, y decide cómo convive con automatización (¿dos servicios de nuevo? ¿home con dos pilares?). Requiere su propio brainstorm cuando llegue el momento.

*Backlog visual heredado:* glow bullets (cuando haya listas), nodos (requiere crear assets), gate de revisión UX/diseño al cierre de cada fase. El pendiente "unificar tokens v5 de TwoPillars" queda en pausa: el componente se retira de la landing (preservado en la rama para la iniciativa D).

---

## Diagnóstico SEO (estado actual — a resolver en la iniciativa 3)
- `metadata` mínimo en `layout.tsx` (solo title + description). Falta OG, Twitter, canonical, robots, JSON-LD.
- Todo el sitio es `'use client'` detrás de un `LoadingScreen` con animación pesada → mala indexación y Core Web Vitals.
- No hay `sitemap.xml` ni `robots.txt`. Una sola página (SPA).
- Title actual ("oito | Automatización con IA") coincide con el posicionamiento del pivote 2026-07-17, pero falta afinarlo en la iniciativa SEO (C2: metadata por página).

---

## Pendientes de datos (el usuario los conseguirá)
El copy deck (`content/copy-deck.md`) está cerrado con **6 casos reales** (3 desarrollo: Ponce-Benzo, Hospitalar, Hospiwaste · 3 automatización: SecureByte, Go To Truckers, SupraBT), pero falta data:
- **Permisos de nombre/logo:** los 6 clientes salieron N/D → por ahora **anonimizados por sector**. Nombrar + logo solo cuando el cliente autorice.
- **Testimonios:** ninguno disponible aún (la prueba social arranca sin testimonios o más liviana).
- **Capturas/mockups:** solo **Hospiwaste** confirmó capturas reales; los demás N/D.
- **Tiempos/métricas:** ningún caso tiene métricas medidas → se redacta sin cifras de resultado.

> Cuando lleguen estos datos, actualizar el copy deck y "ascender" los casos (nombre, logo, testimonio, capturas) donde haya permiso.
