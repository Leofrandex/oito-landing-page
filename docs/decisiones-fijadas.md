# Decisiones fijadas (oito landing)

> Registro único de las decisiones ✅ FIJADAS y 🔒 INNEGOCIABLES del rediseño. Son la **verdad vigente**: no se violan sin una decisión nueva que las reemplace explícitamente.
> Nada es definitivo hasta aparecer aquí marcado como ✅ FIJADO. Detalle visual con valores exactos → [design-system.md](design-system.md).

---

## Posicionamiento — ✅ FIJADO (pivote 2026-07-17)
oito es un **estudio de automatización e IA para pymes hispanohablantes de LatAm**. Un solo servicio público: **automatización / IA** (flujos, agentes, integraciones).

- **Desarrollo web/software** sale de la landing para lanzar solo con automatización, pero es un **plan de reactivación cercano** (empezando por desarrollo web), no un descarte. Mientras tanto aparece como capacidad interna con **mención secundaria** (una entrada en el FAQ + un caso de desarrollo en el spotlight: desde 2026-07-19, la app de rastreo de fuerza de campo; antes, Hospiwaste).
  - **🧊 Preservado, listo para reactivar (2026-07-18):** la página `/desarrollo-web` y los componentes `Dev*` (DevServices, DevProcess, DevCases, DevTech), `ServiceHero` y `TwoPillars` **se conservan intactos en la rama**; no se borran ni se reescriben. Reactivar desarrollo web = volver a enlazar la ruta, no reconstruir. El copy vive en `content/copy-deck.md` PÁGINA 2 (🧊 congelada, no eliminada).
  - **Ruta `/desarrollo-web`:** se quita del sitio público (sin enlace en nav ni indexación) al montar la landing única; el código queda listo para reenchufar. Decidido 2026-07-18.
- **Cliente:** pymes LatAm, español, varios países. SEO en español amplio (no local).
- **Estructura:** una sola landing (`/`); sin páginas de servicio separadas.
- Spec: `superpowers/specs/2026-07-17-pivote-automatizacion-design.md`.

## Voz de marca — ✅ FIJADO
- Se mantiene el tagline **"oito LO HACE POR TI"** (firma, no se cambia).
- **✅ H1 del Hero, híbrido variante B (2026-07-19):** el `<h1>` contiene marca + eslogan + keyword SEO **"Automatización con IA para tu negocio"** como línea de apoyo discreta debajo del eslogan. "oito" sigue siendo el protagonista visual absoluto. El titular alternativo "Deja que la IA trabaje por ti" se descartó como H1 (sobrevive como eco en el CTA final). Detalle en `content/copy-deck-v2.md` §1.
- **✅ TextType con prefijo fijo (2026-07-19):** "Automatizamos" queda fijo y solo rota el complemento nominal ("tu prospección", "tu CRM", ...8 frases). Las frases existen además como texto estático oculto en el DOM (SEO).
- **✅ Disclaimers ligeros (2026-07-19):** las cifras siguen siendo potencial, pero el framing vive en el "hasta ~" de cada cifra y en el "Cálculo estimado" de la calculadora; se retiran las frases largas tipo "no son resultados garantizados".
- **✅ Roster de casos orientado a ventas (2026-07-19):** 3 Automatización + 1 Desarrollo, donde el caso de desarrollo es la **app de rastreo de fuerza de campo** (cierra el arco de ventas). El caso de trazabilidad queda en banca para la reactivación de `/desarrollo-web`.
- Subfrases solo de automatización ("automatiza tu [X]"); se retiran las de construir web/app/sistema.
- **🔒 Efecto TextType (se conserva):** las palabras que se escriben/borran (`TextType.jsx`) siguen en el Hero, rotando SOLO frases de automatización.
- **✅ Copy a eliminar (feedback usuario):**
  - Quitar "Nacimos en Venezuela, trabajamos para toda LatAm".
  - Quitar "Sin cifras infladas, solo lo que hicimos."
- **✅ Sin em dash `—` en el copy (2026-07-07):** ningún texto visible del sitio usa el guion largo. Reescribir con coma, punto, dos puntos o paréntesis. Aplica a copy, `aria-label`s y contenido renderizado (los comentarios de código quedan fuera).

## Contacto — ✅ FIJADO
- **Solo WhatsApp** como canal. Se elimina el embed de Cal.com (`@calcom/embed-react`) y el formulario con Resend (`src/app/actions.ts` / `sendEmail`).
- WhatsApp: `https://wa.me/584241344659`. Simplifica el sitio y mejora rendimiento.

---

## Visual

**📐 La biblia visual manda.** El handoff con valores exactos vive en [design-system.md](design-system.md). Ante conflicto con `agents.md` (referencia de marca de alto nivel), **manda `design-system.md`**.

Paleta base: Verde Mint `#09bc8a` (acento) · Forest Green `#004346` · Forest Deep `#002a2c` · Cream Mint `#f4fcf9` (fondo claro) · Neon Mint `#00ffaa` (glow). Motivo central: **"hilos" (threads)** que fluyen e interconectan nodos.

### 🔒 INNEGOCIABLE — Hilos dinámicos
El efecto de hilos WebGL animado y reactivo al mouse (`src/components/Threads.tsx`, shader OGL con ruido Perlin) es **esencia de marca** y se conserva como protagonista del Hero. Su lenguaje visual (nodos + trazos interconectados) se extiende al resto del sitio como **acentos** (fondo `hilos-fondo.png`, figuras vectoriales del kit, divisores), pero el shader pesado NO corre permanentemente en todas las secciones (rendimiento/SEO). **Nunca eliminar ni reemplazar el efecto de hilos.**

### ✅ FIJADO — Tipografía (2026-07-04)
**Outfit** para titulares (hero/secciones/tarjetas), **DM Sans** para cuerpo y UI, **Varela Round SOLO para el wordmark "oito"** (y el CTA lúdico `oitomatiza`). El CTA funcional de WhatsApp va en DM Sans 700. Esto **revierte** la decisión previa de "headings = DM Sans". Tareas de código pendientes (fase visual): quitar Playfair de `layout.tsx`, añadir Outfit, y corregir `globals.css`/`base.css` que hoy aplican Varela Round a todos los h1-h6. Detalle en `design-system.md` §1.

### ✅ FIJADO — Dirección visual del Home
Tratamiento **híbrido**: Hero y momentos clave en oscuro cinemático (forest green + hilos WebGL), secciones de contenido en claro (cream mint) para legibilidad y rendimiento. Patrón *Immersive/Interactive Experience + Feature-Rich Showcase*. CTA persistente (WhatsApp sticky/flotante). Regla: **cinemático sin sacrificar velocidad/SEO** — efectos con `transform`/`opacity`, degradación en móvil, respeta `prefers-reduced-motion`, opción de saltar el intro.

### ✅ FIJADO — Glassmorphism (vidrio frosteado, canto sólido 1px, 2026-07-25)
Lenguaje visual central. Solo **dos** clases, elegidas por el tono del fondo:
- **`.glass` (fondos oscuros) = vidrio neutro (no tiñe):** fill `rgba(255, 255, 255, 0.035)`, `blur(7px) saturate(1.35)`, borde sólido `1px solid rgba(255, 255, 255, 0.14)`, sombra `0 8px 36px rgba(0, 0, 0, 0.22)`, `border-radius: 26px`.
- **`.glass-light` (fondos claros) = frosteado blanco (atenúa los hilos):** fill `rgba(255, 255, 255, 0.40)`, `blur(12px) saturate(1.4)`, borde sólido `1px solid rgba(255, 255, 255, 0.65)`, sombra `0 12px 30px rgba(0, 67, 70, 0.09)`, `border-radius: 26px`.
- **Canto sólido de 1px:** El borde es un `border` sólido de 1px. NO hay rim enmascarado pseudo `::after`: el `::after` de estos elementos queda libre para los componentes.
- *`.glass-strong` se eliminó (2026-07-07).*
- **Actualizado en `globals.css` (2026-07-25).**

### ⚠️ Verdad técnica clave del glass (2026-07-08, comprobado)
El `backdrop-filter` **NO refracta los hilos del fondo**: `ThreadsBackground` es un canvas WebGL `position:fixed` (capa GPU) y Chromium no incluye esas capas fijas aceleradas en el "backdrop" → los hilos pasan por el vidrio sin difuminarse. Por eso: **(1)** `.glass` tiene **cuerpo propio** (fill translúcido + rim de luz; móvil ≤768px `blur(8px)`) para leer como vidrio en cualquier sección oscura sin depender del fondo; **(2)** la refracción visible se logra con un **glow LOCAL** por sección (`.section::before`, misma capa que sí capta el filtro) — aplicado en `EasyStart`, `AutomationPillars`, `SolutionsGrid`; los logos de `SocialProof` también usan `.glass`. **No prometer (en web ni en propuestas/PDF) que el vidrio distorsiona los hilos animados: es imposible con esta arquitectura.**

### ✅ FIJADO — Glass premium (GlassSurface)
Para vidrio de alta calidad con **refracción SVG real** (distorsiona el fondo, no solo blur) se usa `src/components/GlassSurface.jsx` (de React Bits). Ya aplicado al **Header** (`displace=3`, `distortionScale=-160`, `backgroundOpacity=0.18`, `color-scheme: dark`, texto claro con sombra). ⚠️ La refracción SVG solo funciona en **Chromium**; en Safari/Firefox cae a blur normal (fallback automático). Las utilidades `.glass`/`.glass-light` y `GlassCard` siguen para vidrio simple/ligero. Nota: el `backdrop-filter` crea containing block → elementos `position:fixed` hijos (ej. overlay de menú móvil) deben ir FUERA del GlassSurface.

---

## Enfoque geográfico — ✅ FIJADO (2026-07-21)

El sitio se enfoca en **Venezuela**, no en LatAm genérico ("por ahora", reversible): copy visible, title/description, schema (`ProfessionalService`, Caracas/VE sin calle publicada), llms.txt y Google Business Profile (service area business, dirección oculta). Motivo: validación SEO real — el sitio no tenía ninguna señal geo y el mercado inicial es Venezuela. Si se reabre LatAm, el barrido inverso es mecánico (grep "Venezuela").

Del mismo brainstorm: el hero deja UNA sola mención de "automatización" (la línea keyword del H1, ahora con Venezuela); la línea rotativa pasa a "Hacemos [x]" y el subtítulo a "Nos encargamos de lo repetitivo…". Spec: `docs/superpowers/specs/2026-07-21-seo-venezuela-design.md`.

## Pendientes marcados
- **⚠️ `agents.md`:** su descripción "Automatización e IA" vuelve a ser casi correcta tras el pivote 2026-07-17; falta reflejar que desarrollo queda como capacidad congelada.
