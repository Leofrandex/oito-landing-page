# CLAUDE.md — Guía del proyecto (oito landing)

> **Guía delgada, a propósito.** Este archivo se carga en el contexto de cada sesión, así que se mantiene corto: qué es el proyecto, cómo se trabaja y **punteros** a `docs/`. El conocimiento y las decisiones NO viven aquí — viven en `docs/`.

---

## 1. Qué es este proyecto

Landing page de **oito**, un estudio de automatización e IA para **pymes en Venezuela** (decisión geo 2026-07-21, ver decisiones fijadas). Rediseño publicado en `main`.

**Stack:**
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 3 + CSS Modules por componente
- Animación: GSAP, framer-motion, OGL (shader de hilos), Lenis (smooth scroll)
- Contacto: solo WhatsApp (ver decisiones fijadas)
- Deploy: Vercel (Analytics + Speed Insights)

**Comandos:**
- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run lint` — eslint

---

## 2. Cómo se maneja la documentación

**Regla de oro: `CLAUDE.md` apunta, `docs/` guarda.** Este archivo no es un basurero de decisiones ni de historial; cuanto más engorda, más caro es leerlo cada sesión y menos sirve como guía.

**Empieza siempre por [`docs/index.md`](docs/index.md)** — es el mapa de todo lo que existe. Dónde vive cada cosa:

| Necesitas… | Vas a… |
|---|---|
| Saber qué sigue / estado / SEO / datos pendientes | [`docs/roadmap.md`](docs/roadmap.md) |
| Una decisión vigente (posicionamiento, copy, marca, glass) | [`docs/decisiones-fijadas.md`](docs/decisiones-fijadas.md) |
| Valores visuales exactos (tipografía, glass, paleta, nodos) | [`docs/design-system.md`](docs/design-system.md) — 📐 manda ante cualquier conflicto visual |
| Copy y casos | [`docs/content/copy-deck.md`](docs/content/copy-deck.md) |
| Specs y planes por fase | `docs/superpowers/specs/` y `docs/superpowers/plans/` |
| Ledger de ejecución fase por fase | `.superpowers/sdd/progress.md` |

**Al trabajar:**
- Cuando **fijes una decisión**, va a `docs/decisiones-fijadas.md` (con fecha), NO a este archivo. Aquí, como mucho, se ajusta un puntero.
- Cuando crees un doc con vida propia en `docs/`, **añade su línea a `docs/index.md`**.
- Si una sección de este `CLAUDE.md` empieza a acumular detalle, es señal de que debe **mudarse a `docs/`** y dejar solo el puntero.
- Nada es definitivo hasta estar en `docs/decisiones-fijadas.md` marcado como ✅ FIJADO.

**Estado actual:** rediseño en `oito-page-v5`; siguiente = **Contenido v2** (ver `docs/roadmap.md`).

---

## 3. Convenciones de trabajo

- Responder e interactuar con el usuario en **español**.
- Cada iniciativa: brainstorming → spec aprobado → plan → implementación → verificación.
- Ejecución de planes con **subagent-driven-development** (implementer + reviewer por tarea).
- **Gate de revisión UX/diseño (2026-07-05):** usar `ui-ux-pro-max` + `frontend-design` como **lente de revisión/crítica** (no de generación — la dirección la fija `docs/design-system.md`) al cierre de cada fase Visual y como catch-up de lo ya construido. Auditar estados de interacción, accesibilidad (contraste/targets/foco), jerarquía de CTAs y consistencia; triar hallazgos contra el design-system.
- No fusionar a `main` sin aprobación explícita.

---

## 4. Cierre de sesión — sincronizar con la Bóveda de V.O.L.T.

**Último paso obligatorio de toda sesión que cambie el estado del proyecto.** El detalle técnico vive en este repo; el ESTADO sube a la Bóveda central de oito.

Al terminar, actualiza la ficha central `V.O.L.T\vault\interno\proyectos\oitoweb.md`:
- **Sube SIEMPRE:** fase, alcance, decisiones (posicionamiento, marca), fechas comprometidas, bloqueos.
- **NO sube NUNCA:** detalle técnico (componentes, CSS, código, bugs, specs). Eso se queda en `docs/`; V.O.L.T. lo consulta bajo demanda vía el puntero `vault_local` de la ficha.

Un Stop hook (`.claude/hooks/volt-cierre-check.ps1`) lo verifica: si hoy cambió `docs/`, `CLAUDE.md` o `agents.md` y la ficha central no se tocó, bloquea el cierre. Sesiones de solo lectura, o de solo código sin cambio de estado, pueden terminar sin cierre.
