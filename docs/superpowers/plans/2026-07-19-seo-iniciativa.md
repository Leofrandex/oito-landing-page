# Iniciativa SEO — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar la landing técnicamente lista para publicar: indexable (metadata/OG/robots/sitemap/JSON-LD), más rápida sin tocar un píxel del diseño aprobado, y visible para crawlers de IA y consolas.

**Architecture:** Tres fases secuenciales sobre la app Next.js 16 (App Router, prerender estático). Fase A usa las convenciones nativas de metadata de Next (`metadata`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, JSON-LD inline). Fase B optimiza bajo una regla dura de cero cambios visuales, con verificación por capturas del controlador. Fase C añade `llms.txt`, robots de IA y soporte de consolas.

**Tech Stack:** Next.js 16 (App Router), TypeScript, `next/og` (ImageResponse), OGL (hilos WebGL), GSAP.

## Global Constraints

- **Dominio canónico:** `https://oitove.com` (spec, decisión usuario 2026-07-19).
- **Title:** `oito | Automatización con IA para pymes` (verbatim, decisión usuario).
- **Fase B, regla de oro:** si un cambio altera un solo píxel del diseño aprobado, NO entra. Los 3 candidatos visuales (DPR de hilos, blur del glass, GlassSurface del header) NO se implementan en este plan.
- **Copy:** español, tuteo, sin em dash (—) en ningún texto visible o meta. El copy nuevo (description, OG, llms.txt) se deriva de `docs/content/copy-deck-v2.md` (fuente de verdad).
- **No fusionar a `main`** (regla de la rama `oito-page-v5`).
- No hay framework de tests en el repo: la verificación de cada tarea es `npm run build` + `npm run lint` + inspección del output (`curl`/lectura del HTML generado) según se indica.
- Las tareas marcadas **[CONTROLADOR]** las ejecuta el controlador de la sesión (usan navegador/criterio humano), no un subagente.

---

### Task 1: Metadata completa + higiene de rutas

**Files:**
- Modify: `src/app/layout.tsx:28-32` (bloque `metadata`)
- Modify: `src/app/desarrollo-web/page.tsx` (añadir metadata noindex)
- Modify: `src/app/design-system/page.tsx` (404 en producción)

**Interfaces:**
- Produces: la constante de title/description que Task 2 y Task 4 deben reutilizar coherentemente. Title exacto: `oito | Automatización con IA para pymes`. Description exacta (155 chars, sin em dash): `Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) con IA, para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.`

- [ ] **Step 1: Reemplazar el bloque `metadata` de `src/app/layout.tsx`**

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://oitove.com"),
  title: "oito | Automatización con IA para pymes",
  description:
    "Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) con IA, para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "oito",
    title: "oito | Automatización con IA para pymes",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.",
  },
  twitter: {
    card: "summary_large_image",
    title: "oito | Automatización con IA para pymes",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA para que tú te enfoques en crecer.",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 2: noindex en `/desarrollo-web`**

En `src/app/desarrollo-web/page.tsx` (hoy solo hace `redirect('/')`), añadir antes del componente:

```ts
export const metadata = {
  robots: { index: false, follow: false },
};
```

- [ ] **Step 3: `/design-system` solo en desarrollo**

En `src/app/design-system/page.tsx`, al inicio del componente de página (server component):

```ts
import { notFound } from "next/navigation";
```

y como primera línea del cuerpo del componente:

```ts
if (process.env.NODE_ENV === "production") notFound();
```

Si el componente es `'use client'`, en su lugar crear un wrapper server: renombrar el archivo actual a `DesignSystemClient.tsx` (mismo directorio) y crear `page.tsx` server que haga el guard y renderice el client. (Verificar primero con la cabecera del archivo.)

- [ ] **Step 4: Verificar**

Run: `npm run build`
Expected: build verde; `/design-system` sigue apareciendo como ruta (el 404 es en runtime de producción).

Run: `npm run lint` → sin errores.

Run (tras `npm run build`): `grep -o '<title>[^<]*</title>' .next/server/app/index.html` (o inspeccionar el HTML prerenderizado equivalente)
Expected: `<title>oito | Automatización con IA para pymes</title>`, y el HTML contiene `rel="canonical" href="https://oitove.com/"` y las etiquetas `og:`.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/desarrollo-web/page.tsx src/app/design-system/
git commit -m "seo(a): metadata completa, noindex desarrollo-web, design-system solo en dev"
```

---

### Task 2: Imagen OG generada en código

**Files:**
- Create: `src/app/opengraph-image.tsx`

**Interfaces:**
- Consumes: title/description de Task 1 (coherencia de copy).
- Produces: `/opengraph-image` (1200×630 PNG) que Next enlaza automáticamente en `og:image` y `twitter:image`.

- [ ] **Step 1: Crear `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const alt = "oito, lo hace por ti: automatización con IA para pymes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Composición de marca sobre forest-deep. Tipografía del sistema (bold, redondeada
 * donde se pueda): la ImageResponse no carga las fuentes del sitio sin embeber el
 * archivo; si más adelante se quiere Varela Round exacta, se añade el .ttf en assets
 * y se pasa en `fonts`. Decisión consciente para no bloquear la fase. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#002a2c",
          color: "#eafff6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: 0,
            right: 0,
            height: 240,
            display: "flex",
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(9,188,138,0.28), rgba(9,188,138,0) 70%)",
          }}
        />
        <div style={{ fontSize: 160, fontWeight: 700, letterSpacing: -4, display: "flex" }}>
          oito
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 40,
            fontWeight: 600,
            letterSpacing: 14,
            color: "#09bc8a",
            display: "flex",
          }}
        >
          LO HACE POR TI
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "rgba(234,255,246,0.78)",
            display: "flex",
          }}
        >
          Automatización con IA para tu negocio
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 2: Verificar**

Run: `npm run build`
Expected: build verde y la ruta `/opengraph-image` listada en el output.

Run: `npm run dev` en background y `curl -s -o og.png -w "%{content_type} %{size_download}" http://localhost:3000/opengraph-image`
Expected: `image/png` con tamaño > 10000 bytes. Abrir `og.png` y confirmar composición (wordmark, eslogan mint, keyword) — el controlador la valida visualmente en la revisión de la tarea.

- [ ] **Step 3: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "seo(a): imagen OG 1200x630 generada con ImageResponse"
```

---

### Task 3: robots.ts + sitemap.ts

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`

**Interfaces:**
- Produces: `/robots.txt` y `/sitemap.xml`. Task 12 (Fase C) MODIFICARÁ `robots.ts` para añadir bots de IA; mantener la estructura de `rules` como array.

- [ ] **Step 1: Crear `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/design-system", "/desarrollo-web"],
      },
    ],
    sitemap: "https://oitove.com/sitemap.xml",
  };
}
```

- [ ] **Step 2: Crear `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://oitove.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Verificar**

Run: `npm run build` → verde. Con `npm run dev`: `curl -s http://localhost:3000/robots.txt` y `curl -s http://localhost:3000/sitemap.xml`
Expected: robots con las dos rutas disallow y la línea `Sitemap: https://oitove.com/sitemap.xml`; sitemap con una sola `<url>` (`https://oitove.com`).

- [ ] **Step 4: Commit**

```bash
git add src/app/robots.ts src/app/sitemap.ts
git commit -m "seo(a): robots.txt y sitemap.xml nativos"
```

---

### Task 4: JSON-LD (Organization + WebSite + FAQPage)

**Files:**
- Modify: `src/components/Faq.tsx:7` (exportar `FAQS`)
- Create: `src/lib/seo.ts`
- Modify: `src/app/page.tsx` (inyectar el script)

**Interfaces:**
- Consumes: el array `FAQS: { q: string; a: string }[]` de `Faq.tsx` (hoy es `const` privado; pasa a `export const FAQS`).
- Produces: `buildJsonLd(): object` en `src/lib/seo.ts` y `SITE_URL = "https://oitove.com"`.

- [ ] **Step 1: Exportar FAQS**

En `src/components/Faq.tsx`, cambiar `const FAQS: { q: string; a: string }[] = [` por `export const FAQS: { q: string; a: string }[] = [`. Nada más cambia.

- [ ] **Step 2: Crear `src/lib/seo.ts`**

```ts
import { FAQS } from "@/components/Faq";

export const SITE_URL = "https://oitove.com";

/** JSON-LD de la landing: Organization + WebSite + FAQPage (fuente única: FAQS del componente). */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "oito",
        url: SITE_URL,
        logo: `${SITE_URL}/logo_oito.png`,
        email: "info@oitove.com",
        sameAs: ["https://www.instagram.com/oito.vee/"],
        areaServed: "Latinoamérica",
        description:
          "Estudio de automatización e IA para pymes hispanohablantes de LatAm. Automatizamos lo repetitivo de tu negocio para que tú te enfoques en crecer.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "oito",
        inLanguage: "es",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
```

Nota: `Faq.tsx` es `'use client'` pero exportar un array de strings e importarlo desde un módulo server es válido (solo datos serializables).

- [ ] **Step 3: Inyectar en `src/app/page.tsx`**

Añadir el import y el script como primer hijo de `<main>`:

```tsx
import { buildJsonLd } from "@/lib/seo";
```

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
/>
```

- [ ] **Step 4: Verificar**

Run: `npm run build && npm run lint` → verdes.
Con dev server: `curl -s http://localhost:3000/ | grep -o 'application/ld+json'` → 1 coincidencia; extraer el JSON y validarlo (`node -e` con `JSON.parse`) → parsea sin error, contiene `"@type":"FAQPage"` con 6 `Question`.
El controlador lo pasa por el Rich Results Test al cierre de la fase (Task 5).

- [ ] **Step 5: Commit**

```bash
git add src/components/Faq.tsx src/lib/seo.ts src/app/page.tsx
git commit -m "seo(a): JSON-LD Organization + WebSite + FAQPage desde fuente unica"
```

---

### Task 5: [CONTROLADOR] Verificación de cierre de Fase A

- [ ] Build de producción + `npm start` (o dev): inspeccionar el `<head>` de `/` (title, description, canonical, og:*, twitter:*, robots) y el JSON-LD.
- [ ] Validar el JSON-LD en el Rich Results Test (https://search.google.com/test/rich-results) pegando el HTML si el sitio aún no es público.
- [ ] Ver `og.png` (o `/opengraph-image` en el navegador) y aprobar la composición visual.
- [ ] `/design-system` en build de producción devuelve 404; `/robots.txt` y `/sitemap.xml` correctos.
- [ ] Registrar resultado en `.superpowers/sdd/progress.md`.

---

### Task 6: [CONTROLADOR] Baseline de rendimiento (antes de Fase B)

- [ ] `npm run build`: guardar el bloque "First Load JS" del output en `.superpowers/seo/baseline-build.txt`.
- [ ] Con el sitio corriendo: Lighthouse desktop y mobile sobre `http://localhost:3000` (DevTools o `npx lighthouse`), guardar puntajes (Performance, LCP, TBT, CLS) en `.superpowers/seo/baseline-lighthouse.md`.
- [ ] Capturas de referencia de las secciones (hero, dolor, pilares, casos, soluciones, calculadora, metodología, prueba social, puente, FAQ, cierre) con las herramientas de navegador del controlador, guardadas para comparar en Task 11.

---

### Task 7: Pausar los hilos WebGL cuando no se ven

**Files:**
- Modify: `src/components/Threads.tsx:230-253` (loop `update` y cleanup del `useEffect`)

**Interfaces:**
- Consumes: `animationFrameId` (ref existente, línea 137) y la función `update` (línea 230).
- Produces: nada exportado; comportamiento: el rAF se detiene con la pestaña oculta o cuando una sección clara cubre el viewport completo, y se reanuda sin salto.

- [ ] **Step 1: Añadir la lógica de pausa dentro del `useEffect` existente, después de `animationFrameId.current = requestAnimationFrame(update);` (línea 244)**

```ts
/* Pausa invisible: el shader no corre si la pestaña está oculta o si una sección
 * clara (cream, opaca) cubre todo el viewport; ahí los hilos no se ven de todos
 * modos. Al reanudar, iTime sigue de t real: sin salto perceptible. */
let paused = false;
function setPaused(next: boolean) {
    if (next === paused) return;
    paused = next;
    if (paused) {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
    } else if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(update);
    }
}
function evaluatePause() {
    if (document.hidden) {
        setPaused(true);
        return;
    }
    const vh = window.innerHeight;
    const covered = Array.from(document.querySelectorAll('.section-light')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= 0 && r.bottom >= vh;
    });
    setPaused(covered);
}
let scrollTick = false;
function onScroll() {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
        scrollTick = false;
        evaluatePause();
    });
}
document.addEventListener('visibilitychange', evaluatePause);
window.addEventListener('scroll', onScroll, { passive: true });
```

- [ ] **Step 2: Ampliar el cleanup existente (líneas 246-253)** añadiendo:

```ts
document.removeEventListener('visibilitychange', evaluatePause);
window.removeEventListener('scroll', onScroll);
```

- [ ] **Step 3: Verificar**

Run: `npm run build && npm run lint` → verdes.
Manual (dev server): en el hero los hilos se mueven; scrollear hasta que una sección clara llene la pantalla (p. ej. mitad de Soluciones) y en DevTools > Performance confirmar que los frames GPU caen; volver al hero → hilos animándose igual que antes.
Expected: sin cambio visual alguno en zonas donde los hilos son visibles.

- [ ] **Step 4: Commit**

```bash
git add src/components/Threads.tsx
git commit -m "perf(b): pausar el shader de hilos con pestana oculta o viewport cubierto"
```

---

### Task 8: Code-splitting de secciones bajo el fold

**Files:**
- Modify: `src/app/page.tsx:1-38`

**Interfaces:**
- Consumes: los componentes de sección existentes (default exports).
- Produces: mismo árbol de secciones; solo cambia el mecanismo de import de las que van bajo el fold.

- [ ] **Step 1: Cambiar imports estáticos por `next/dynamic` (con SSR, que es el default) para las secciones pesadas bajo el fold**

En `src/app/page.tsx`, mantener estáticos `HashScrollFix`, `Hero`, `WhyOito` (above the fold / primer pin) y `buildJsonLd`, y cambiar el resto:

```tsx
import nextDynamic from "next/dynamic";

const AutomationPillars = nextDynamic(() => import("@/components/AutomationPillars"));
const CasesShowcase = nextDynamic(() => import("@/components/CasesShowcase"));
const SolutionsGrid = nextDynamic(() => import("@/components/SolutionsGrid"));
const RoiCalculator = nextDynamic(() => import("@/components/RoiCalculator"));
const Methodology = nextDynamic(() => import("@/components/Methodology"));
const SocialProof = nextDynamic(() => import("@/components/SocialProof"));
const BuiltWith = nextDynamic(() => import("@/components/BuiltWith"));
const DevBridge = nextDynamic(() => import("@/components/DevBridge"));
const Faq = nextDynamic(() => import("@/components/Faq"));
const EasyStart = nextDynamic(() => import("@/components/EasyStart"));
const FinalCTA = nextDynamic(() => import("@/components/FinalCTA"));
```

(NO usar `ssr: false`: el HTML prerenderizado debe seguir conteniendo todo el copy.)

- [ ] **Step 2: Verificar que el HTML no cambió**

Run: `npm run build` → verde. Comparar el texto visible del HTML prerenderizado de `/` antes/después (guardado en Task 6 / regenerado ahora): idéntico.
Comparar "First Load JS" contra `.superpowers/seo/baseline-build.txt`: **si no baja, revertir la tarea** (el split solo se queda si paga).

- [ ] **Step 3: Verificar anclas**

Manual: `/#casos`, `/#soluciones`, `/#metodologia`, `/#faq` siguen aterrizando con el offset correcto (los pins insertan spacers al hidratar; `HashScrollFix` ya lo maneja, confirmar que sigue OK).

- [ ] **Step 4: Commit (o revert documentado)**

```bash
git add src/app/page.tsx
git commit -m "perf(b): code-splitting de secciones bajo el fold (SSR intacto)"
```

---

### Task 9: content-visibility en secciones sin pin

**Files:**
- Modify: `src/app/globals.css` (utilidad nueva)
- Modify: `src/components/SocialProof.tsx`, `src/components/BuiltWith.tsx`, `src/components/DevBridge.tsx`, `src/components/EasyStart.tsx`, `src/components/FinalCTA.tsx` (añadir la clase)

**Interfaces:**
- Produces: clase global `.cv-auto`. NO aplicarla a secciones con pin de ScrollTrigger (WhyOito, CasesShowcase, Methodology) ni a secciones con ancla de nav (SolutionsGrid `#soluciones`, RoiCalculator `#calculadora`, Faq `#faq`, CasesShowcase `#casos`): el salto de ancla sobre contenido no pintado puede aterrizar impreciso.

- [ ] **Step 1: Añadir la utilidad a `globals.css`** (junto a `.anchor-target`):

```css
/* Rendimiento: el navegador omite render del contenido fuera de pantalla.
 * SOLO en secciones sin pin de ScrollTrigger y sin ancla de navegación. */
.cv-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 700px;
}
```

- [ ] **Step 2: Aplicar la clase** en el `className` del `<section>` de: SocialProof, BuiltWith, DevBridge, EasyStart y FinalCTA (ejemplo en DevBridge):

```tsx
<section className={`section-light cv-auto ${styles.section}`}>
```

- [ ] **Step 3: Verificar**

Run: `npm run build && npm run lint` → verdes.
Manual: scroll completo de la página, arriba y abajo, sin saltos de layout ni parpadeos; las 3 secciones pineadas intactas.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/components/SocialProof.tsx src/components/BuiltWith.tsx src/components/DevBridge.tsx src/components/EasyStart.tsx src/components/FinalCTA.tsx
git commit -m "perf(b): content-visibility auto en secciones sin pin ni ancla"
```

---

### Task 10: Higiene de bundle y assets

**Files:**
- Modify: `package.json` (quitar dependencias sin uso)
- Delete: assets muertos de `public/`

**Interfaces:**
- Consumes: nada de tareas previas.
- Produces: bundle más chico; ningún cambio de comportamiento.

> Nota de alcance: el spec listaba también migrar PNGs a `next/image`, pero la auditoría encontró CERO referencias a imágenes de `public/` desde `src/` (el sitio es CSS/SVG/canvas). No hay nada que migrar; se documenta como N/A.

- [ ] **Step 1: Verificar uso real de cada candidata** (el grep manda; si aparece algún uso en `src/`, la dependencia SE QUEDA):

Run, por cada una de: `@calcom/embed-react`, `resend`, `cobe`, `lenis`, `react-spring`, `react-icons`, `tailwindcss-animate`, `class-variance-authority`, `tailwind-merge`:

```bash
grep -rn "<paquete>" src/ --include="*.ts" --include="*.tsx" --include="*.jsx" --include="*.css"
```

Contexto de la auditoría previa: `@calcom/embed-react` y `resend` además están mandadas a eliminar por `docs/decisiones-fijadas.md` (§Contacto). `framer-motion` SE QUEDA (lo usa `SocialProof.tsx`). `tailwindcss-animate`/`class-variance-authority`/`tailwind-merge` pueden estar referenciadas en `tailwind.config.ts` o `src/lib` — revisar también ahí antes de quitar.

- [ ] **Step 2: Desinstalar las que dieron cero usos**

```bash
npm uninstall @calcom/embed-react resend cobe lenis react-spring react-icons
```

(ajustando la lista al resultado real del Step 1).

- [ ] **Step 3: Borrar assets muertos de `public/`** (cero referencias en `src/`, verificado en auditoría): `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`, `oito_cold_email.png`. **Conservar**: `logo_oito.png` (lo usa el JSON-LD de Task 4), `oito_logo_2.png`, `hilos-fondo.png`, `iconos/`, `videos/` (revisar referencias antes de tocar estos últimos; ante la duda, se quedan).

- [ ] **Step 4: Verificar**

Run: `npm run build && npm run lint` → verdes. Comparar "First Load JS" y el peso de `node_modules` implicado; anotar en el ledger.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json public/
git commit -m "perf(b): fuera dependencias sin uso (calcom/resend/etc) y assets muertos"
```

---

### Task 11: [CONTROLADOR] Verificación de cierre de Fase B

- [ ] Lighthouse desktop+mobile de nuevo; comparar contra `.superpowers/seo/baseline-lighthouse.md` y documentar el delta en el ledger.
- [ ] Capturas de las mismas secciones que Task 6 y comparación contra las de referencia: **deben ser visualmente idénticas** (los hilos animados pueden variar de fase; todo lo demás, pixel-igual).
- [ ] Scroll completo manual: pins (dolor, casos, metodología) intactos; anclas correctas; TextType escribiendo.
- [ ] Si alguna optimización causó cualquier diferencia visual: revertir esa optimización (regla de oro) y documentarlo.
- [ ] Presentar al usuario la lista de los 3 candidatos visuales NO aplicados (DPR hilos, blur glass, GlassSurface header) con su impacto estimado, para decisión en sesión aparte.

---

### Task 12: llms.txt + robots de IA

**Files:**
- Create: `public/llms.txt`
- Modify: `src/app/robots.ts` (añadir bots de IA)

**Interfaces:**
- Consumes: estructura `rules` array de Task 3; copy de `docs/content/copy-deck-v2.md`.

- [ ] **Step 1: Crear `public/llms.txt`** (derivado del deck v2; sin em dash; sin nombres de cliente):

```markdown
# oito

> Estudio de automatización e IA para pymes hispanohablantes de LatAm. Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) para que tú te enfoques en crecer. Lema: "oito lo hace por ti".

Sitio: https://oitove.com (landing única, en español).

## Servicios

- Automatización de procesos con IA: calificación y enrutamiento de leads, secuencias de venta personalizadas, prospección outbound B2B, soporte 24/7, CRM al día, control de stock, cobranza, reportes, reseñas y extracción de datos de documentos.
- Metodología en 3 pasos: contacto y auditoría, construcción e implementación, monitoreo y mejora.
- También construye páginas web y software a medida cuando un proyecto lo necesita.

## Casos (anonimizados por sector)

- Ciberseguridad: flujo en n8n que lee mensajes y adjuntos, califica leads con IA, los deduplica en el CRM y los reparte al equipo.
- Logística B2B: agentes de IA con RAG que generan correos de venta personalizados desde el CRM.
- Ciberseguridad: prospección outbound con investigación por agentes de IA y scoring de 0 a 100.
- Distribución farmacéutica: app móvil + panel web para el equipo de ventas en campo (GPS, offline, verificación de visitas).

## Contacto

- WhatsApp: https://wa.me/584241344659 (canal único)
- Email: info@oitove.com
- Instagram: https://www.instagram.com/oito.vee/
```

- [ ] **Step 2: Añadir bots de IA a `src/app/robots.ts`** (reemplazar el array `rules`):

```ts
rules: [
  {
    userAgent: "*",
    allow: "/",
    disallow: ["/design-system", "/desarrollo-web"],
  },
  {
    userAgent: ["GPTBot", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended"],
    allow: "/",
    disallow: ["/design-system", "/desarrollo-web"],
  },
],
```

- [ ] **Step 3: Verificar**

Run: `npm run build` → verde; `curl -s http://localhost:3000/robots.txt` muestra los grupos de bots de IA; `curl -s http://localhost:3000/llms.txt` devuelve el contenido; `grep "—" public/llms.txt` → vacío.

- [ ] **Step 4: Commit**

```bash
git add public/llms.txt src/app/robots.ts
git commit -m "seo(c): llms.txt y robots con crawlers de IA permitidos"
```

---

### Task 13: Search Console + IndexNow (soporte)

**Files:**
- Modify: `src/app/layout.tsx` (verification)
- Create: `docs/seo-consolas.md` (checklist para el usuario)

**Interfaces:**
- Consumes: metadata de Task 1.

- [ ] **Step 1: Soporte de verificación en `layout.tsx`** — añadir al objeto `metadata`:

```ts
verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
  ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
  : undefined,
```

- [ ] **Step 2: Crear `docs/seo-consolas.md`** con el checklist para el usuario:

```markdown
# Consolas de búsqueda — pasos del usuario

## Google Search Console (hacer tras publicar en oitove.com)
1. Entrar a https://search.google.com/search-console con la cuenta Google del negocio.
2. Añadir propiedad → "Prefijo de URL" → `https://oitove.com`.
3. Método de verificación "Etiqueta HTML": copiar SOLO el valor de `content="..."`.
4. En Vercel → Settings → Environment Variables: `NEXT_PUBLIC_GSC_VERIFICATION` = ese valor → redeploy.
5. Volver a Search Console → Verificar.
6. Sitemaps → enviar `https://oitove.com/sitemap.xml`.
7. A los pocos días: revisar Cobertura (la única URL indexable es `/`).

## Bing Webmaster Tools (opcional, alimenta a Copilot)
1. https://www.bing.com/webmasters → "Importar desde Google Search Console" (un clic, hereda la verificación).
2. Enviar el mismo sitemap.

## IndexNow (opcional)
Con Bing Webmaster activo, usar "URL Submission" manual tras deploys con cambios de contenido. Automatizarlo queda fuera de alcance mientras el sitio sea estático.
```

- [ ] **Step 3: Verificar**

Run: `npm run build` → verde (sin la env, `verification` queda undefined y no emite meta). Con `NEXT_PUBLIC_GSC_VERIFICATION=test npm run build`: el HTML contiene `google-site-verification`.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx docs/seo-consolas.md
git commit -m "seo(c): verificacion GSC por env + checklist de consolas para el usuario"
```

---

### Task 14: [CONTROLADOR] Cierre de la iniciativa

- [ ] Verificación final: build + lint verdes; repaso del spec sección por sección contra lo implementado.
- [ ] Añadir `docs/seo-consolas.md` a `docs/index.md`.
- [ ] Roadmap: marcar C cerrada; anotar los 3 candidatos visuales de rendimiento como decisión pendiente del usuario.
- [ ] Ledger actualizado y ficha V.O.L.T. sincronizada (fase, pendientes de usuario: alta en Search Console tras publicar).
