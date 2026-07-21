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
- **A. Contenido v2** ✅ CERRADA (2026-07-19). Copy deck v2 redactado y revisado: [`content/copy-deck-v2.md`](content/copy-deck-v2.md) es el copy vigente de las 13 secciones + §14 "Estado de integración" (checklist de divergencias deck↔componentes). Spec: `superpowers/specs/2026-07-17-contenido-v2-design.md`. Plan: `superpowers/plans/2026-07-17-contenido-v2-copy-deck.md`. **Pendiente de input del usuario antes de integrar:** confirmar las 4 cifras de la franja de señales (posible doble conteo de sectores).
- **A2. Integración del copy** ✅ CERRADA (2026-07-19). Deck v2 aplicado a todos los componentes tras la ronda de decisiones del usuario (H1 híbrido con keyword SEO, roster de casos con arco de ventas, disclaimers ligeros; ver `decisiones-fijadas.md` §Voz de marca). Pendiente: verificación visual del usuario en navegador.
- **B. Recomposición** — cirugía de rutas (quitar del sitio `/desarrollo-web` y `/automatizacion-ia`, todo se fusiona en `/`) + montar la landing única con los componentes maduros vestidos con el copy nuevo. Header pasa a anclas de sección. No se construyen componentes nuevos salvo que Contenido v2 lo pida. **Quitar la ruta = desenlazar, no borrar código:** los componentes `Dev*`/`ServiceHero`/`TwoPillars` se preservan en la rama para la iniciativa D.
- **C. Iniciativa SEO** ✅ CERRADA (2026-07-20). Las 3 fases implementadas y revisadas (spec: `superpowers/specs/2026-07-19-seo-iniciativa-design.md`): A indexable (metadata/OG generada/robots/sitemap/JSON-LD, `/design-system` solo en dev), B rendimiento invisible (pausa de hilos, content-visibility, limpieza de deps; code-splitting revertido por medición), C GEO/consolas (llms.txt, bots de IA, GSC por env, [`seo-consolas.md`](seo-consolas.md)). **Pendientes del usuario:** (1) verificación interactiva en navegador (pins, anclas, pausa de hilos); (2) tras publicar: alta en Search Console + Rich Results Test + previsualización OG; (3) decisión sobre los 4 candidatos de rendimiento con impacto visual (DPR de hilos, blur del glass, GlassSurface del header, coreografía de entrada del hero que domina el LCP móvil de 4.8s).
- **D. Reactivar desarrollo web** (futuro cercano, sin fecha). No es "algún día": es plan próximo. Revive `/desarrollo-web` (código ya construido y preservado) + descongela PÁGINA 2 del copy deck, y decide cómo convive con automatización (¿dos servicios de nuevo? ¿home con dos pilares?). Requiere su propio brainstorm cuando llegue el momento.
- ✅ **SEO Venezuela (2026-07-21):** enfoque geo del sitio pivotado de LatAm a Venezuela (copy, metadata, schema ProfessionalService, llms.txt) + hero sin redundancia de "automatización" + checklist GBP (`docs/gbp-checklist.md`). Imagen OG de Canva integrada (estática, texto "para tu negocio" por decisión del usuario). Pendiente del usuario: ejecutar el checklist GBP y push para publicar.

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
