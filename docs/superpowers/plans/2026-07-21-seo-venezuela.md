# SEO Venezuela + hero sin redundancia — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivotar la señal geo del sitio de LatAm a Venezuela (copy, metadata, schema, llms.txt, GBP) y dejar una sola mención de "automatización" en el hero.

**Architecture:** Solo cambios de texto/datos en componentes existentes — sin componentes nuevos ni cambios de layout. El schema cambia de tipo `Organization` a `ProfessionalService` con dirección parcial (ciudad, sin calle). Entregable no-código: checklist de actualización del Google Business Profile.

**Tech Stack:** Next.js 16 (App Router), TypeScript, metadata API de Next, JSON-LD.

**Spec:** `docs/superpowers/specs/2026-07-21-seo-venezuela-design.md`

## Global Constraints

- Cero cambios visuales de layout: solo texto. La línea rotativa del hero debe seguir funcionando idéntica.
- La dirección física NUNCA se publica: en schema solo `addressLocality: "Caracas"` + `addressCountry: "VE"`.
- Tras el barrido, `grep -i "LatAm|Latinoam"` en `src/` y `public/` debe dar 0 resultados.
- No hay suite de tests en este proyecto: la verificación por tarea es grep + `npm run build` + `npm run lint`.
- Commits en español siguiendo el estilo del repo (`feat:`, `fix:`, `docs:`, scope entre paréntesis).
- La imagen OG de Canva llega después: NO reemplazar `opengraph-image.tsx` por archivo estático en este plan; solo actualizar su texto.

---

### Task 1: Hero sin redundancia + Venezuela

**Files:**
- Modify: `src/components/Hero.tsx:12-13` (comentario), `:74-76` (kw line), `:80` (fijo rotativa), `:92-94` (subtítulo)

**Interfaces:**
- Produces: el H1 visible pasa a contener "Automatización con IA para negocios en Venezuela" (Task 2 y 3 usan la misma frase en OG y schema).

- [ ] **Step 1: Actualizar el comentario del deck (líneas 12-13)**

Reemplazar:
```tsx
/* Deck v2 §1: "Automatizamos" queda fijo y solo rota el complemento nominal.
 * Las 8 frases existen además como texto estático oculto (SEO: el crawler no espera al efecto). */
```
por:
```tsx
/* Deck v2 §1 (ajuste 2026-07-21): "Hacemos" queda fijo (conecta con "oito lo hace por ti")
 * y solo rota el complemento nominal; "automatización" aparece una sola vez, en la línea
 * keyword del H1. Las 8 frases existen además como texto estático oculto (SEO). */
```

- [ ] **Step 2: Línea keyword del H1 (líneas 72-76)**

Reemplazar:
```tsx
          {/* Keyword SEO dentro del H1 (deck v2 §1, variante B): Google lee
           * "oito lo hace por ti Automatización con IA para tu negocio". */}
          <span className={styles.kwLine} data-anim>
            Automatización con IA para tu negocio
          </span>
```
por:
```tsx
          {/* Keyword SEO dentro del H1 (deck v2 §1, variante B): Google lee
           * "oito lo hace por ti Automatización con IA para negocios en Venezuela". */}
          <span className={styles.kwLine} data-anim>
            Automatización con IA para negocios en Venezuela
          </span>
```

- [ ] **Step 3: Fijo de la línea rotativa (línea 80)**

Reemplazar:
```tsx
          <span className={styles.rotatingFixed}>Automatizamos </span>
```
por:
```tsx
          <span className={styles.rotatingFixed}>Hacemos </span>
```
(Los 8 ítems de `ROTATING` y el `srOnly` no cambian: "Hacemos tu prospección" etc. ya leen bien.)

- [ ] **Step 4: Subtítulo (línea 93)**

Reemplazar:
```tsx
          Automatizamos lo repetitivo de tu negocio para que tú te enfoques en crecer.
```
por:
```tsx
          Nos encargamos de lo repetitivo de tu negocio para que tú te enfoques en crecer.
```

- [ ] **Step 5: Verificar**

Run: `grep -c "utomatiza" src/components/Hero.tsx` (o Grep tool, pattern `utomatiza`)
Expected: exactamente 2 matches (comentario del deck + línea keyword del H1); en JSX visible solo 1.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat(hero): una sola mención de automatización y keyword geo Venezuela"
```

---

### Task 2: Metadata + imagen OG interina

**Files:**
- Modify: `src/app/layout.tsx:31-48`
- Modify: `src/app/opengraph-image.tsx:3,62`

**Interfaces:**
- Consumes: frase keyword de Task 1 ("Automatización con IA para negocios en Venezuela").
- Produces: title canónico `oito | Automatización con IA para pymes en Venezuela` (Task 5 lo referencia en el checklist GBP).

- [ ] **Step 1: Title y description en `layout.tsx`**

Reemplazar (líneas 31-33):
```tsx
  title: "oito | Automatización con IA para pymes",
  description:
    "Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) con IA, para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.",
```
por:
```tsx
  title: "oito | Automatización con IA para pymes en Venezuela",
  description:
    "Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) con IA. Pymes en Venezuela, remoto y en español. Escríbenos por WhatsApp.",
```

- [ ] **Step 2: openGraph (líneas 40-42)**

Reemplazar:
```tsx
    title: "oito | Automatización con IA para pymes",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.",
```
por:
```tsx
    title: "oito | Automatización con IA para pymes en Venezuela",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA. Pymes en Venezuela, remoto y en español.",
```

- [ ] **Step 3: twitter (líneas 46-48)**

Reemplazar:
```tsx
    title: "oito | Automatización con IA para pymes",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA para que tú te enfoques en crecer.",
```
por:
```tsx
    title: "oito | Automatización con IA para pymes en Venezuela",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA. Pymes en Venezuela, remoto y en español.",
```

- [ ] **Step 4: Texto de la imagen OG generada (interino hasta el PNG de Canva)**

En `src/app/opengraph-image.tsx`:

Línea 3, reemplazar:
```tsx
export const alt = "oito, lo hace por ti: automatización con IA para pymes";
```
por:
```tsx
export const alt = "oito, lo hace por ti: automatización con IA para pymes en Venezuela";
```

Línea 62, reemplazar:
```tsx
          Automatización con IA para tu negocio
```
por:
```tsx
          Automatización con IA para negocios en Venezuela
```

- [ ] **Step 5: Verificar**

Run: `grep -n "Venezuela" src/app/layout.tsx src/app/opengraph-image.tsx`
Expected: 6 líneas en `layout.tsx` (3 titles + 3 descriptions) y 2 en `opengraph-image.tsx` (alt + línea keyword). Luego `grep -n "LatAm" src/app/layout.tsx` → 0 resultados.

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx src/app/opengraph-image.tsx
git commit -m "feat(seo): metadata e imagen OG enfocadas a Venezuela"
```

---

### Task 3: Schema ProfessionalService

**Files:**
- Modify: `src/lib/seo.ts:10-21`

**Interfaces:**
- Consumes: nada de tareas previas (el bloque Organization actual).
- Produces: nodo JSON-LD `ProfessionalService` con `@id` `${SITE_URL}/#org` — los nodos `WebSite` (publisher) y `FAQPage` que lo referencian NO cambian.

- [ ] **Step 1: Reemplazar el nodo Organization**

En `src/lib/seo.ts`, reemplazar (líneas 10-21):
```ts
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "oito",
        url: SITE_URL,
        logo: `${SITE_URL}/logo_oito.png`,
        email: "info@oitove.com",
        sameAs: ["https://www.instagram.com/oito.vee/"],
        areaServed: "Venezuela" /* ver nota */,
        description:
          "Estudio de automatización e IA para pymes hispanohablantes de LatAm. Automatizamos lo repetitivo de tu negocio para que tú te enfoques en crecer.",
      },
```
**Nota:** el bloque actual dice `areaServed: "Latinoamérica"`; el reemplazo completo queda así:
```ts
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#org`,
        name: "oito",
        url: SITE_URL,
        logo: `${SITE_URL}/logo_oito.png`,
        email: "info@oitove.com",
        sameAs: ["https://www.instagram.com/oito.vee/"],
        areaServed: { "@type": "Country", name: "Venezuela" },
        /* Service area business: la dirección verificable es privada (GBP);
         * aquí solo ciudad y país, nunca la calle. */
        address: {
          "@type": "PostalAddress",
          addressLocality: "Caracas",
          addressCountry: "VE",
        },
        description:
          "Estudio de automatización e IA para pymes en Venezuela. Automatizamos lo repetitivo de tu negocio para que tú te enfoques en crecer.",
      },
```
El comentario de la línea 5 del archivo pasa de `Organization + WebSite + FAQPage` a `ProfessionalService + WebSite + FAQPage`.

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: build verde. Luego `grep -n "ProfessionalService\|Caracas\|LatAm" src/lib/seo.ts` → 1 ProfessionalService, 1 Caracas, 0 LatAm.

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo.ts
git commit -m "feat(seo): schema ProfessionalService con área de servicio Venezuela"
```

---

### Task 4: Barrido LatAm → Venezuela (Footer, FAQ, llms.txt)

**Files:**
- Modify: `src/components/Footer.tsx:16`
- Modify: `src/components/Faq.tsx:26-27`
- Modify: `public/llms.txt:3`

**Interfaces:**
- Consumes: nada. Produces: nada (solo copy).

- [ ] **Step 1: Footer (línea 16)**

Reemplazar:
```tsx
              Automatización con IA para pymes de LatAm.
```
por:
```tsx
              Automatización con IA para pymes en Venezuela.
```

- [ ] **Step 2: FAQ de cobertura (líneas 26-27)**

Reemplazar:
```ts
    q: '¿Trabajan con empresas de mi país?',
    a: 'Sí. Trabajamos con pymes de toda LatAm de forma remota, en español. La distancia no es problema: todo arranca con un mensaje.',
```
por:
```ts
    q: '¿Trabajan en toda Venezuela?',
    a: 'Sí. Trabajamos con pymes de toda Venezuela de forma remota, estés donde estés. La distancia no es problema: todo arranca con un mensaje.',
```
(Ojo: `FAQS` alimenta también el JSON-LD FAQPage vía `seo.ts` — no hay nada más que tocar, es fuente única.)

- [ ] **Step 3: llms.txt (línea 3)**

Reemplazar:
```
> Estudio de automatización e IA para pymes hispanohablantes de LatAm. Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) para que tú te enfoques en crecer. Lema: "oito lo hace por ti".
```
por:
```
> Estudio de automatización e IA para pymes en Venezuela. Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) para que tú te enfoques en crecer. Lema: "oito lo hace por ti".
```

- [ ] **Step 4: Verificar el barrido completo**

Run (Grep tool): pattern `LatAm|Latinoam`, case-insensitive, en `src/` y `public/`
Expected: 0 resultados en ambos.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Faq.tsx public/llms.txt
git commit -m "feat(copy): barrido LatAm a Venezuela en footer, FAQ y llms.txt"
```

---

### Task 5: Checklist GBP + docs

**Files:**
- Create: `docs/gbp-checklist.md`
- Modify: `docs/decisiones-fijadas.md` (nueva sección antes de `## Pendientes marcados`, línea 68)
- Modify: `docs/roadmap.md` (registrar iniciativa en la sección de roadmap)
- Modify: `docs/index.md` (línea nueva para gbp-checklist)

**Interfaces:**
- Consumes: title de Task 2 y decisión de dirección privada de Task 3 (se citan en el checklist).

- [ ] **Step 1: Crear `docs/gbp-checklist.md`**

```markdown
# Checklist — Actualizar Google Business Profile (2026-07-21)

> Lo ejecuta el usuario con su cuenta de Google en https://business.google.com. El perfil YA existe: esto es actualización, no creación. Objetivo: coherencia total con el sitio (NAP) y señal local Caracas/Venezuela.

## Identidad
- [ ] Nombre del negocio: exactamente **oito** (sin añadir keywords tipo "oito - automatización": Google puede suspender el perfil por eso).
- [ ] Categoría principal: **Consultor de automatización** (si no existe, "Empresa de software" o "Consultor de informática").
- [ ] Categorías secundarias: Empresa de software, Servicio de marketing por internet (opcional).
- [ ] Descripción (máx. 750 chars, primeras ~250 son las visibles): "Estudio de automatización e IA para pymes en Venezuela. Automatizamos lo repetitivo de tu negocio —prospección, CRM, soporte, cobranza, reportes— para que tú te enfoques en crecer. Trabajamos 100% remoto en todo el país. oito lo hace por ti."

## Ubicación (service area business)
- [ ] En "Ubicación": mantener la dirección de verificación pero **desactivar "mostrar dirección a los clientes"**.
- [ ] Área de servicio: **Caracas** + **Venezuela** (se pueden listar ambas).

## Contacto
- [ ] Sitio web: `https://oitove.com`
- [ ] Teléfono/WhatsApp: +58 424-1344659 (el mismo del sitio — coherencia NAP).
- [ ] Perfil de Instagram en enlaces sociales: `https://www.instagram.com/oito.vee/`

## Coherencia con el sitio (ya implementada en código)
- Title del sitio: `oito | Automatización con IA para pymes en Venezuela`.
- Schema del sitio: `ProfessionalService`, Caracas/VE sin calle publicada.
- El nombre, web y teléfono del GBP deben coincidir EXACTO con lo anterior.

## Después de guardar
- [ ] Publicar 1-2 fotos/logo actualizados (el logo del sitio: `public/logo_oito.png`).
- [ ] Verificar en unos días cómo aparece buscando "oito caracas" y "oito automatización".
```

- [ ] **Step 2: Decisión fijada**

En `docs/decisiones-fijadas.md`, insertar ANTES de `## Pendientes marcados`:

```markdown
## Enfoque geográfico — ✅ FIJADO (2026-07-21)

El sitio se enfoca en **Venezuela**, no en LatAm genérico ("por ahora", reversible): copy visible, title/description, schema (`ProfessionalService`, Caracas/VE sin calle publicada), llms.txt y Google Business Profile (service area business, dirección oculta). Motivo: validación SEO real — el sitio no tenía ninguna señal geo y el mercado inicial es Venezuela. Si se reabre LatAm, el barrido inverso es mecánico (grep "Venezuela").

Del mismo brainstorm: el hero deja UNA sola mención de "automatización" (la línea keyword del H1, ahora con Venezuela); la línea rotativa pasa a "Hacemos [x]" y el subtítulo a "Nos encargamos de lo repetitivo…". Spec: `docs/superpowers/specs/2026-07-21-seo-venezuela-design.md`.
```

- [ ] **Step 3: Roadmap e index**

En `docs/roadmap.md`, añadir al final de la sección `## 📍 Roadmap re-planificado` la línea de la iniciativa cerrada:
```markdown
- ✅ **SEO Venezuela (2026-07-21):** enfoque geo del sitio pivotado de LatAm a Venezuela (copy, metadata, schema ProfessionalService, llms.txt) + hero sin redundancia de "automatización" + checklist GBP (`docs/gbp-checklist.md`). Pendiente del usuario: imagen OG de Canva y ejecutar el checklist GBP.
```
En `docs/index.md`, añadir en la lista de docs:
```markdown
- [`gbp-checklist.md`](gbp-checklist.md) — checklist para actualizar el Google Business Profile (Caracas, service area).
```
(Leer ambos archivos antes de editar para respetar el formato exacto de sus listas.)

- [ ] **Step 4: Commit**

```bash
git add docs/gbp-checklist.md docs/decisiones-fijadas.md docs/roadmap.md docs/index.md
git commit -m "docs(seo): decisión geo Venezuela fijada + checklist GBP"
```

---

### Task 6: Verificación final

**Files:** ninguno nuevo (solo verificación y, si algo falla, fixes).

- [ ] **Step 1: Build y lint**

Run: `npm run build` y `npm run lint`
Expected: ambos verdes, `/` prerenderizada (`○`).

- [ ] **Step 2: Grep final**

Run (Grep tool): pattern `LatAm|Latinoam`, `-i`, en `src/`, `public/` → 0 resultados.
Pattern `Venezuela` en `src/` → debe aparecer en `Hero.tsx`, `layout.tsx`, `opengraph-image.tsx`, `seo.ts`, `Footer.tsx`, `Faq.tsx`.

- [ ] **Step 3: Verificación en navegador (dev server)**

Run: `npm run dev` y abrir `http://localhost:3000`.
Verificar: (a) hero — H1 con Venezuela, "Hacemos [rotativa]" sin salto de layout, subtítulo nuevo; (b) view-source contiene el title nuevo y el JSON-LD con `ProfessionalService` y `Caracas`; (c) la animación de entrada del hero intacta.

- [ ] **Step 4: Rich Results Test (post-deploy, lo puede hacer el usuario)**

Tras el deploy de Vercel: https://search.google.com/test/rich-results con `https://oitove.com` → FAQPage sin errores (ProfessionalService no genera rich result propio; basta que no dé errores de sintaxis).

- [ ] **Step 5: Commit final (si hubo fixes)**

```bash
git add -A
git commit -m "fix(seo): ajustes de verificación final"
```
