# Iniciativa SEO (roadmap C) — Spec de diseño

> Aprobado por el usuario el 2026-07-19 (brainstorm en sesión). Tres fases: A indexable, B rendimiento invisible, C GEO/consolas. Reemplaza el diagnóstico SEO obsoleto del roadmap (el sitio ya prerenderiza estático; no hay LoadingScreen ni `'use client'` global).

## Contexto y estado auditado (2026-07-19)

- El sitio prerenderiza estático (`○` en el build): el copy completo YA está en el HTML. El refactor SSR planeado como C1 **no es necesario**.
- `layout.tsx` solo trae `title` + `description`, ambos pre-pivote. Sin `metadataBase`, canonical, OG, Twitter, robots meta.
- No existen `robots.txt`, `sitemap.xml`, JSON-LD ni imagen OG.
- `/design-system` (doc interna) está pública e indexable. `/desarrollo-web` redirige a `/` pero sigue en el build.
- Bueno ya: `lang="es"`, favicon `src/app/icon.png`, fuentes con `next/font`, H1 con keyword ("oito lo hace por ti · Automatización con IA para tu negocio"), copy estático de las frases rotativas (sr-only), Vercel Analytics + Speed Insights activos.

## Decisiones fijadas en el brainstorm

- **Dominio canónico:** `https://oitove.com`.
- **Title:** `oito | Automatización con IA para pymes`.
- **Imagen OG:** generada en código (`ImageResponse`), 1200×630, wordmark + eslogan + keyword sobre forest-deep con acentos mint.
- **`/design-system`:** 404 en producción, disponible solo en `npm run dev`.
- **Alcance:** las 3 fases (A+B+C), en orden.
- **Regla de oro de la Fase B:** cero cambios visuales. Si una optimización altera un píxel del diseño aprobado, no entra; se documenta y se presenta aparte para decisión del usuario.

---

## Fase A — Indexable

1. **Metadata completa** en `src/app/layout.tsx`:
   - `metadataBase: new URL('https://oitove.com')`.
   - `title`: `oito | Automatización con IA para pymes`. `description` pivotada a solo automatización, alineada al deck v2 (sin "software a medida" como servicio principal), ~150-160 caracteres, con CTA implícito.
   - `alternates.canonical: '/'`.
   - `openGraph`: type website, locale `es_ES` (formato `idioma_TERRITORIO` válido; no existe un locale pan-LatAm), url, siteName "oito", title/description coherentes, imagen generada.
   - `twitter`: `summary_large_image`.
   - `robots`: index/follow explícito en `/`.
2. **Imagen OG generada:** `src/app/opengraph-image.tsx` con `ImageResponse` (1200×630). Composición: fondo forest-deep, wordmark "oito" grande, eslogan "lo hace por ti", línea keyword "Automatización con IA para tu negocio", acentos mint (sin cargar el shader; tipografía embebida o system-safe). Sirve también para Twitter.
3. **`src/app/robots.ts`:** allow general; disallow `/design-system` y `/desarrollo-web`; referencia al sitemap.
4. **`src/app/sitemap.ts`:** una sola URL (`/`), `lastModified` dinámico.
5. **JSON-LD** (script `application/ld+json` en el layout o `page.tsx`, datos centralizados en `src/lib/seo.ts` o similar):
   - `Organization`: name oito, url, logo (`/logo_oito.png` o el icon), `sameAs` (Instagram `https://www.instagram.com/oito.vee/`), `email info@oitove.com`, `areaServed` LatAm.
   - `WebSite`: name + url.
   - `FAQPage`: las 6 preguntas/respuestas REALES de `Faq.tsx` (fuente única: exportar el array FAQS y reutilizarlo, no duplicar el texto).
6. **Higiene de rutas:**
   - `/design-system`: `notFound()` en producción (`process.env.NODE_ENV === 'production'`), accesible en dev.
   - `/desarrollo-web`: `robots: { index: false }` en su metadata + excluida del sitemap (ya redirige; el noindex cubre el intervalo hasta que Google la saque).

**Verificación A:** build verde; HTML de `/` contiene canonical/OG/JSON-LD; Rich Results Test (Organization + FAQPage) sin errores; previsualización OG correcta (opengraph.xyz o similar); `curl /robots.txt` y `/sitemap.xml` correctos; `/design-system` devuelve 404 en build de producción.

---

## Fase B — Rendimiento invisible

**Proceso por optimización:** medir (Lighthouse local, guardar puntajes) → aplicar → **comparar capturas antes/después de la página completa (deben ser idénticas)** → conservar o revertir. Evidencia en el ledger.

Se implementan (cumplen la regla de oro):
1. **Pausa de los hilos WebGL** (`Threads.tsx`/`ThreadsBackground.tsx`): detener el rAF cuando `document.hidden` y cuando el canvas queda completamente cubierto por secciones claras (IntersectionObserver sobre marcadores de sección o umbral de scroll). Reanudar sin salto visible.
2. **Code-splitting bajo el fold:** `next/dynamic` (con SSR activo) para secciones pesadas no-hero (RoiCalculator, CasesShowcase, Methodology, Faq...). El HTML prerenderizado no cambia; baja el JS del chunk inicial.
3. **`content-visibility: auto`** solo en secciones SIN pin de ScrollTrigger (las pineadas — WhyOito, CasesShowcase, Methodology — quedan fuera para no romper las mediciones de GSAP).
4. **Higiene de bundle y assets:** auditar dependencias sin uso en producción (candidato: framer-motion si quedó huérfano tras el rediseño; verificar), componentes legacy no montados que entren al bundle por imports, assets muertos en `/public` (next.svg, vercel.svg, file.svg, globe.svg, window.svg y capturas viejas si no se usan).
5. **`next/image`** para los PNG en uso donde no altere el render (dimensiones idénticas).

NO se aplican (violan la regla; se presentan aparte con A/B para decisión del usuario, como cierre de la fase):
- Cap de resolución interna (DPR) del canvas de hilos.
- Reducción del radio de blur del glass.
- Reemplazo de la refracción SVG del header (GlassSurface).

**Verificación B:** Lighthouse antes/después documentado; capturas de todas las secciones idénticas (diff visual); build + lint verdes; animaciones de scroll verificadas a mano (pins intactos).

---

## Fase C — GEO y consolas

1. **`llms.txt`** en la raíz pública: qué es oito, servicios, casos (anonimizados), contacto, apuntando a la URL canónica. Contenido derivado del copy deck v2 (fuente de verdad), en español.
2. **Robots amistoso con crawlers de IA:** en `robots.ts`, permitir explícitamente GPTBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended (decisión: permitir todos; el negocio gana si las IAs citan a oito).
3. **Search Console:** añadir soporte de verificación por meta tag (`metadata.verification.google`, valor vía env `NEXT_PUBLIC_GSC_VERIFICATION` o constante). El alta y el envío del sitemap los hace el usuario con su cuenta (instrucciones paso a paso como entregable).
4. **IndexNow (opcional, si el tiempo de la fase lo permite):** clave estática en `/public` + documentación de ping manual tras deploys relevantes. Sin automatización server-side por ahora (sitio estático).

**Verificación C:** `llms.txt` accesible y coherente con el deck; robots.txt lista los bots de IA; checklist de Search Console entregado al usuario.

---

## Fuera de alcance

- Refactor SSR (innecesario: ya prerenderiza).
- Blog / contenido nuevo, keywords research amplio, link building.
- Cambios visuales de cualquier tipo (los tres candidatos gated de la Fase B se deciden con el usuario en sesión aparte).
- hreflang (una sola versión en español; no hay variantes por país).
- Automatización server-side de IndexNow.

## Criterio de cierre de la iniciativa

Las 3 fases verificadas + roadmap actualizado (C cerrada) + ficha V.O.L.T. sincronizada. La landing queda técnicamente lista para publicar; la decisión de fusionar a `main` y salir al aire sigue siendo del usuario (regla de la rama).
