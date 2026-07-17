# Pivote a solo Automatización — Plan de documentación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aterrizar el pivote a solo-automatización (spec 2026-07-17) en la documentación del proyecto: CLAUDE.md y copy-deck.md.

**Architecture:** Solo ediciones de Markdown, sin código. Dos tareas independientes, un commit cada una. La fuente de verdad es `docs/superpowers/specs/2026-07-17-pivote-automatizacion-design.md`.

**Tech Stack:** Markdown, git.

## Global Constraints

- Responder e interactuar en español; los docs del proyecto se escriben en español.
- No tocar código (`src/`) ni el spec: solo `CLAUDE.md` y `docs/content/copy-deck.md`.
- No borrar el copy de desarrollo del copy-deck: se marca congelado, no se elimina.
- Conservar verbatim los bloques 🔒 de marca (tagline, TextType, hilos) salvo el ajuste explícito de frases del TextType.

---

### Task 1: Actualizar CLAUDE.md (posicionamiento, roadmap, pendiente agents.md)

**Files:**
- Modify: `CLAUDE.md` (§2 completo; bloque "⚠️ Pendiente" al final de §3; bloque "📍 Roadmap re-planificado" dentro de §5)

**Interfaces:**
- Consumes: spec `docs/superpowers/specs/2026-07-17-pivote-automatizacion-design.md`
- Produces: CLAUDE.md alineado al pivote (lo leen todas las sesiones futuras)

- [ ] **Step 1: Reemplazar la sección §2 completa**

Sustituir todo el bloque desde `## 2. Posicionamiento ✅ FIJADO (en brainstorming 2026-06)` hasta la línea anterior a `## 3. Identidad visual` por:

```markdown
## 2. Posicionamiento ✅ FIJADO (pivote 2026-07-17)

oito es un **estudio de automatización e IA para pymes hispanohablantes de LatAm**.
Un solo servicio público: **automatización / IA** (flujos, agentes, integraciones).

- **Desarrollo web/software** deja de ser pilar del sitio: queda como capacidad interna
  con **mención secundaria** (una entrada en el FAQ + el caso Hospiwaste en el spotlight
  de casos) y como línea de crecimiento futuro. Su página (`/desarrollo-web`) y
  componentes (`Dev*`, `TwoPillars`, `ServiceHero`) quedan congelados en el historial
  de git; no se borran ni se reescriben.
- **Voz de marca:** se mantiene el tagline *"oito LO HACE POR TI"* (firma, no se cambia).
  Subfrases solo de automatización ("automatiza tu [X]"); se retiran las de construir
  web/app/sistema.
- **🔒 Efecto de marca (se conserva):** el efecto TextType de palabras que se escriben/borran
  (`TextType.jsx`) sigue en el Hero, rotando SOLO frases de automatización.
- **Cliente:** pymes LatAm, español, varios países. SEO en español amplio (no local).
- **Estructura:** una sola landing (`/`); sin páginas de servicio separadas.

Spec del pivote: `docs/superpowers/specs/2026-07-17-pivote-automatizacion-design.md`.
```

- [ ] **Step 2: Reemplazar el bloque de roadmap en §5**

Sustituir el bloque completo `**📍 Roadmap re-planificado (2026-07-05) — secuencia A → B → C:**` (con sus viñetas A/B/C) por:

```markdown
**📍 Roadmap re-planificado (2026-07-17, pivote a solo automatización):**
- **A. Contenido v2** ← SIGUIENTE. Brainstorm de mensaje desde cero para la landing
  única: a quién le hablamos, qué dolor, qué promesa, frases del TextType, estructura de
  secciones. Entregable: copy deck v2 + resolución de duplicados (HowWeWorkHome vs
  Methodology; FeaturedCases vs AutomationCases vs CasesSpotlight).
- **B. Recomposición** — cirugía de rutas (eliminar `/desarrollo-web` y
  `/automatizacion-ia`, todo se fusiona en `/`) + montar la landing única con los
  componentes maduros vestidos con el copy nuevo. Header pasa a anclas de sección.
  No se construyen componentes nuevos salvo que Contenido v2 lo pida.
- **C. Iniciativa SEO** (sin empezar), simplificada a una sola URL: C1 refactor SSR
  (quitar `'use client'` → islas), C2 metadata/OG/canonical, C3 robots + sitemap,
  C4 JSON-LD, C5 CWV + on-page. Title orientado a automatización con IA.

*Backlog visual heredado:* glow bullets (cuando haya listas), nodos §7 (requiere crear
assets), gate de revisión UX/diseño al cierre de cada fase. El pendiente "unificar tokens
v5 de TwoPillars" queda obsoleto: el componente se retira del sitio.
```

- [ ] **Step 3: Actualizar el pendiente de agents.md al final de §3**

Sustituir la línea:

```markdown
**⚠️ Pendiente:** `agents.md` aún describe a oito como "Automatización e IA" → actualizar al nuevo posicionamiento (§2).
```

por:

```markdown
**⚠️ Pendiente:** revisar `agents.md`: su descripción "Automatización e IA" vuelve a ser
casi correcta tras el pivote 2026-07-17; solo falta reflejar que desarrollo queda como
capacidad congelada (§2).
```

- [ ] **Step 4: Verificar consistencia**

Run: `grep -n "dos líneas\|dos pilares\|2026-07-05) — secuencia" CLAUDE.md`
Expected: sin resultados (o solo menciones históricas deliberadas; no debe quedar ninguna afirmación vigente de dos pilares).

Run: `grep -n "pivote 2026-07-17" CLAUDE.md`
Expected: al menos 2 resultados (§2 y §3/§5).

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(claude): posicionamiento y roadmap pivotados a solo automatización"
```

---

### Task 2: Marcar PÁGINA 2 (desarrollo) como congelada en el copy-deck

**Files:**
- Modify: `docs/content/copy-deck.md:132` (justo bajo el heading de PÁGINA 2)

**Interfaces:**
- Consumes: spec del pivote (decisión de congelar desarrollo)
- Produces: copy-deck con la sección de desarrollo marcada como fuera del sitio

- [ ] **Step 1: Insertar el aviso de congelación**

Bajo la línea `# PÁGINA 2 — DESARROLLO WEB & SOFTWARE (`/desarrollo-web`)` (línea 132), insertar:

```markdown

> **🧊 CONGELADA (pivote 2026-07-17):** oito pivota a solo automatización y esta página
> sale del sitio. El copy se conserva intacto para cuando se retome la línea de
> desarrollo. No usar en la landing única, salvo el caso Hospiwaste (que pasa al
> spotlight de casos como guiño de desarrollo). Ver
> `docs/superpowers/specs/2026-07-17-pivote-automatizacion-design.md`.
```

- [ ] **Step 2: Verificar**

Run: `grep -n "CONGELADA" docs/content/copy-deck.md`
Expected: 1 resultado, en la línea siguiente al heading de PÁGINA 2.

- [ ] **Step 3: Commit**

```bash
git add docs/content/copy-deck.md
git commit -m "docs(copy-deck): congelar PÁGINA 2 desarrollo (pivote a solo automatización)"
```
