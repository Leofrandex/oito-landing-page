# Página `/desarrollo-web` — diseño (spec)

Fecha: 2026-07-06 · Rama: `oito-page-v5` · Iniciativa: **B (Contenido — construir Desarrollo-web)**

## Contexto

La página `/desarrollo-web` hoy es un stub. El copy ya está cerrado en `docs/content/copy-deck.md`
(PÁGINA 2). Esta página cierra la iniciativa Contenido. Espeja la estructura de `/automatizacion-ia`
reutilizando los **átomos** ya construidos y creando **componentes de sección propios de Desarrollo**
(sin tocar la página de Automatización — decisión del usuario, 0 riesgo).

**Fuentes de verdad combinadas:**
- **Visual:** `docs/design-system.md` manda (colores mint/forest/cream, Outfit/DM Sans/Varela, glass,
  badges §4, botones §3, escala de pesos, `--mint-ink` para texto mint sobre claro, `.section-dark/light`).
- **Layout/UX:** patrones de `ui-ux-pro-max` (Feature-Rich Showcase, Trust & Authority): un mensaje
  por tarjeta, jerarquía ícono→título→texto, hover con feedback (`glass-hover`), gap táctil ≥8px,
  reservar espacio (sin CLS), stack en móvil, CTA repetido. Ante conflicto, gana el design-system.

## Reutilización (átomos con props — reuse directo)

- **`ServiceHero`** `{ title, subtitle, rotating }` — hero de servicio.
- **`FinalCTA`** `{ title, lede }` — CTA final.
- **`CaseStudy`** + **`CaseDiagrams`** — tarjeta de caso + diagrama de hilos (como en Home/Automatización).
- **`Button`** (§3), badge global (§4), **`Reveal`** (animación de entrada por sección).

Componentes **nuevos** (propios de Desarrollo, componen los átomos): `DevServices`, `DevProcess`,
`DevCases`, `DevTech`.

## Estructura y ritmo

`page.tsx` ensambla, en orden, con ritmo **`D · L · D · L · D · D`**:

| # | Sección | Fondo | Componente |
|---|---|---|---|
| 1 | Hero | 🌑 `section-dark` (hero) | `ServiceHero` |
| 2 | Servicios | ☀️ `section-light` | `DevServices` |
| 3 | Cómo trabajamos | 🌑 `section-dark` | `DevProcess` |
| 4 | Casos | ☀️ `section-light` | `DevCases` |
| 5 | Tecnologías | 🌑 `section-dark` | `DevTech` |
| 6 | CTA final | 🌑 `section-dark` | `FinalCTA` |

(Tecnologías + FinalCTA = cierre oscuro, coherente con la preferencia del Home.)

## Secciones nuevas (detalle)

### 1. Hero — `ServiceHero` (reuse)
- `title`: "Construimos el **software** que tu empresa necesita" (con "software" en `.accent-mint`/mint según fondo oscuro → mint OK).
- `subtitle`: "Sitios web, apps móviles y sistemas a medida. De la idea al producto, rápido y bien hecho."
- `rotating` (TextType): `['tu página web', 'tu app', 'tu sistema interno', 'tu dashboard']`.
- CTA WhatsApp (el que ya trae ServiceHero).

### 2. `DevServices` (nuevo) — sección clara, "Qué construimos"
- badge (§4) "Qué construimos" + `<h2>` título.
- **3 tarjetas** en grid (stack en móvil), cada una: chip de ícono Lucide (46px, mint, `stroke 1.5`)
  → `<h3>` título (Outfit 500, tarjeta) → cuerpo DM Sans. Superficie `glass-light` + `glass-hover`.
  Un mensaje por tarjeta (ui-ux-pro-max).
  1. **Sitios web & landing pages** — "Páginas rápidas, bonitas y pensadas para convertir. Tu mejor primera impresión online." (ícono ej. `Globe`)
  2. **Apps web & sistemas a medida** — "Plataformas, paneles y software interno hechos a la medida de tu operación. Lo que necesitas, sin atarte a herramientas genéricas." (ícono ej. `LayoutDashboard`)
  3. **Apps móviles** — "Aplicaciones para iOS y Android que ponen tu negocio en el bolsillo de tus clientes." (ícono ej. `Smartphone`)

### 3. `DevProcess` (nuevo) — sección oscura, "De la idea al producto"
- badge (§4) "Cómo trabajamos" + `<h2>` "De la idea al producto".
- **4 pasos** con nodo numerado (mismo lenguaje visual que `HowWeWorkHome`/`Methodology`: número en
  nodo mint + `<h3>` título + descripción). Progresión clara (ui-ux-pro-max: pasos con progreso).
  1. **Descubrimiento** — "Entendemos qué necesitas y para quién."
  2. **Diseño** — "Definimos la experiencia y la interfaz antes de programar."
  3. **Desarrollo** — "Construimos con tecnología moderna, en entregas claras."
  4. **Entrega & soporte** — "Lanzamos, medimos y te acompañamos."

### 4. `DevCases` (nuevo) — sección clara, "Proyectos que hemos construido"
- badge (§4) "Casos" + `<h2>` "Proyectos que hemos construido".
- **3 tarjetas `CaseStudy`** (compone el átomo, patrón de `AutomationCases`/`FeaturedCases`), con
  `CaseDiagrams` (diagrama de hilos), **anonimizadas por sector** (CLAUDE.md §7). Estructura del copy:
  reto → lo que construimos → tipo, condensado a los campos de `CaseStudy` (título, sector/tags, texto).
  1. **App de rastreo de fuerza de campo** — sector *distribuidora farmacéutica*. Tags: App móvil · Sistema a medida · Dashboard.
  2. **Plataforma interna de operaciones** — sector *distribuidor de equipos médicos*. Tags: Sistema a medida · Dashboard · Portal de clientes.
  3. **App de trazabilidad de desechos peligrosos** — sector *planta de tratamiento de desechos*. Tags: PWA · Sistema a medida · Dashboard. *(tiene capturas reales disponibles → ascender a captura cuando haya permiso; por ahora, diagrama.)*
- Nota: los casos 1 y 3 ya aparecen resumidos en el Home (FeaturedCases); aquí van con más detalle.

### 5. `DevTech` (nuevo) — sección oscura, "Construido con tecnología de primera"
- badge (§4) "Tecnologías" + `<h2>` "Construido con tecnología de primera" + bajada
  "Usamos herramientas modernas y probadas para que tu producto sea rápido, seguro y escalable."
- **Stack por categoría** en 4 grupos, cada tecnología como **chip "tag de stack" (§4)** (no banda de
  logos): alta densidad, escaneable (ui-ux-pro-max "tech specs"). Grupos:
  - **Web:** Next.js · React · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Query · React Hook Form · Zod · Recharts · Leaflet
  - **Móvil & PWA:** React Native (Expo) · PWA (next-pwa) · geolocalización · cámara · offline (SQLite)
  - **Backend & datos:** Supabase · PostgreSQL · PostGIS · Auth · RLS · Storage
  - **Documentos & extras:** generación de PDF · firmas electrónicas · importación Excel/SAP · mapas y geolocalización

### 6. CTA final — `FinalCTA` (reuse)
- `title`: "¿Tienes un proyecto en mente?" · `lede`: "Cuéntanos qué necesitas construir. Te respondemos por WhatsApp, sin compromiso." · CTA WhatsApp (ya lo trae FinalCTA). El copy-deck §6 no trae bajada; esta se redacta acorde al patrón del Home.

## Accesibilidad / UX (ui-ux-pro-max, subordinado al design-system)

- Badges/acentos mint sobre secciones **claras** usan `--mint-ink` (regla design-system §0.4); sobre
  oscuras, mint. El wordmark "oito" es la excepción (mint siempre).
- Tarjetas: `cursor` pointer + hover `glass-hover` (lift sutil), gap ≥ 8px, stack en móvil.
- Sin CLS: reservar el aspect-ratio de los diagramas/placeholders de caso.
- `prefers-reduced-motion` respetado (Reveal ya lo respeta).
- Foco de teclado con el `:focus-visible` global.

## Criterios de éxito / verificación

- `npm run build` limpio; la ruta `/desarrollo-web` deja de ser stub y renderiza las 6 secciones.
- Captura visual: estructura y ritmo `D·L·D·L·D·D`; tarjetas de servicio con hover; casos con diagrama;
  tech como chips por categoría; contraste correcto (mint-ink sobre claro).
- **Gate de revisión UX** (`ui-ux-pro-max` + `frontend-design`) al cierre.

## Fuera de alcance

- Refactor/generalización de los componentes de Automatización (se crean propios de Desarrollo).
- Capturas reales de casos (pendiente permiso — se ascienden después).
- Cambios en Home o SEO (iniciativa C).

## Archivos afectados

- Crear: `src/components/DevServices.tsx` (+ `.module.css`), `DevProcess.tsx` (+css), `DevCases.tsx` (+css), `DevTech.tsx` (+css)
- Modificar: `src/app/desarrollo-web/page.tsx` (ensamblar las 6 secciones)
- Reuse (sin modificar): `ServiceHero`, `FinalCTA`, `CaseStudy`, `CaseDiagrams`, `Button`, `Reveal`
