# Spec — Iniciativa 2: Visual (rediseño oito)

> **Estado:** Borrador para revisión del usuario.
> **Rama:** `oito-page-v5` · **Fecha:** 2026-06-18
> Parte 2 de 3 (Contenido ✅ → **Visual** → SEO). Construye las 3 páginas con el copy aprobado.
> Insumos: `docs/content/copy-deck.md`, `agents.md` (kit visual), `CLAUDE.md`.

---

## 1. Objetivo

Reconstruir oito como **sitio multipágina cinemático** (3 rutas) usando el copy ya aprobado,
los hilos WebGL, el lenguaje **glassmorphism** y el kit visual de marca. No cubre SEO técnico
(SSR/metadata/sitemap = Iniciativa 3) ni cambios de contenido (ya cerrados).

---

## 2. Arquitectura de la app (multipágina)

Hoy: SPA `'use client'` en `src/app/page.tsx` con navegación por anclas (`scrollToSection`).
Nuevo: **3 rutas reales** (Next App Router):

```
src/app/page.tsx                 → Home (/)
src/app/desarrollo-web/page.tsx  → /desarrollo-web
src/app/automatizacion-ia/page.tsx → /automatizacion-ia
```

**Shell compartido** (en `layout.tsx` o layout de grupo): fondo de hilos WebGL (`Threads`),
`Header` (nav por rutas), `Footer`, y `StickyWhatsAppCTA` (botón flotante persistente).
- La navegación pasa de `scrollToSection` a `<Link>` de Next. Se elimina la lógica de anclas
  para navegación entre páginas (se permite scroll suave dentro de una misma página).
- `LoadingScreen`: solo en Home (primera impresión), con opción "saltar".
- **Frontera con SEO (Iniciativa 3):** aquí se crean rutas y estructura. Evitar añadir
  `'use client'` innecesario; dejar componentes presentacionales como server components cuando
  no necesiten interactividad, para facilitar el SSR posterior.

---

## 3. Lenguaje visual

**Tratamiento híbrido:** hero y momentos clave en oscuro (forest green + hilos); bloques de
mucho contenido pueden ir en claro (cream mint) donde la legibilidad lo pida.

**Glassmorphism (central) — receta:**
- `.glass` (tarjetas, chips, header): `background: rgba(255,255,255,.035)`,
  `backdrop-filter: blur(7px) saturate(1.35)`, borde `rgba(255,255,255,.14)`, radio 26px,
  sombra + highlight interior.
- `.glass-strong` (bloques con mucho texto): `background: rgba(0,38,40,.20)`,
  `backdrop-filter: blur(11px) saturate(1.45)`, borde `rgba(9,188,138,.26)`.
- Texto sobre vidrio: leve `text-shadow` para contraste.
- Referencia viva: `.superpowers/mockups/glassmorphism-v2.html`.

**Hilos 🔒:** `Threads.tsx` (WebGL) se conserva como fondo protagonista. Acentos derivados del
kit (`oito-visual-resources.html`): figuras de nodos, divisores de hilo, viñetas Glow Tech.

**Tipografía:** Varela Round (display/marca) + DM Sans (cuerpo). *(Resolver discrepancia de
`agents.md` que menciona Outfit: se mantiene Varela Round, ya en uso.)*

**Color:** mint `#09bc8a`, forest `#004346`, forest-deep `#002a2c`, cream `#f4fcf9`,
neon `#00ffaa` (glow). Íconos Lucide stroke 1.5.

**Efecto TextType 🔒:** se conserva en los heroes, ampliado a ambos pilares.

---

## 4. Inventario de componentes

| Componente | Acción | Notas |
|---|---|---|
| `Threads` | Reutilizar 🔒 | Fondo WebGL, esencia |
| `TextType` | Reutilizar 🔒 | Efecto escribir/borrar |
| `LoadingScreen` | Reutilizar | Solo Home + botón saltar |
| `Globe`, `WhatsAppIcon` | Reutilizar | |
| `Header` | Reconstruir | Nav por rutas, vidrio, CTA WhatsApp, estado activo |
| `Footer` | Reconstruir | Links multipágina, tagline nuevo, origen LatAm |
| `Hero` | Reconstruir | Home + variantes para páginas de servicio |
| `Contact` | Reconstruir | Solo WhatsApp; quitar form + Cal.com |
| `AuthorityBanner` | Reubicar | → `/automatizacion-ia` ("construido con") |
| `About` | Dividir | "Por qué oito" (Home) + pilares → `/automatizacion-ia` |
| `Portfolio` (MagicBento) | Reutilizar | Grid en `/automatizacion-ia` + subset Home |
| `HowWeWork` | Reutilizar | `/automatizacion-ia` + condensado Home + variante dev |
| `Pricing` (ROI) | Reutilizar | → `/automatizacion-ia` |

**Nuevos:** `TwoPillars`, `SocialProof`, `FeaturedCases`, `CaseStudy` (reutilizable),
`ServicesGrid`, `TechStack`, `StickyWhatsAppCTA`, `FinalCTA`, `SectionDivider`, `GlassCard`
(primitivo de vidrio reutilizable).

**A eliminar:** `src/app/actions.ts` (sendEmail), dependencia de formulario; embed Cal.com.
Dependencias a quitar tras migrar: `@calcom/embed-react`, `resend` (confirmar en Iniciativa 3).

---

## 5. Layout por página (mapeo al copy deck)

### Home (`/`)
1. Hero inmersivo (glass-strong) — Threads + TextType + CTA WhatsApp + saltar
2. `TwoPillars` — 2 GlassCards → rutas de servicio
3. `SocialProof` — logos + testimonios (arranca liviano; sin testimonios reales aún)
4. "Por qué oito" — About condensado + antes→después (pinned GSAP)
5. `FeaturedCases` — 4 casos (2 dev + 2 auto) en GlassCards
6. `HowWeWork` condensado — 3 pasos
7. `FinalCTA` — WhatsApp

### /desarrollo-web
1. Hero (variante) + TextType (web/app/sistema)
2. `ServicesGrid` — 3 GlassCards (sitios · apps web/sistemas · apps móviles)
3. Proceso de desarrollo (4 pasos)
4. Casos — `CaseStudy` ×3 (Ponce-Benzo, Hospitalar, Hospiwaste; Hospiwaste con capturas)
5. `TechStack` — chips de vidrio (stack real)
6. `FinalCTA` — WhatsApp

### /automatizacion-ia
1. Hero (variante) + TextType (facturación/CRM/…)
2. Pilares (Productividad/Integración/IA Agéntica) — del About
3a. Casos reales — `CaseStudy` ×3 (SecureByte, GTT, SupraBT)
3b. Grid de soluciones ilustrativas — Portfolio actual (KPIs reformulados a "potencial")
4. Calculadora ROI — Pricing (etiquetar como estimación)
5. Metodología + contador en vivo — HowWeWork
6. "Construido con" — AuthorityBanner (logos de herramientas)
7. `FinalCTA` — WhatsApp

---

## 6. Guardarraíles (de ui-ux-pro-max)

- **Rendimiento:** efectos con `transform`/`opacity`. Dosificar `backdrop-filter` en móvil
  (limitar nº de capas de vidrio simultáneas; fallback a fill sólido translúcido si hace falta).
- **Accesibilidad:** respetar `prefers-reduced-motion` (degradar hilos/parallax). Contraste
  AA en texto sobre vidrio (de ahí `glass-strong` + text-shadow). Foco visible. Touch targets ≥44px.
- **Responsive:** mobile-first; breakpoints 375/768/1024/1440; sin scroll horizontal.
- **Animación:** 150–300ms, ease-out al entrar; stagger 30–50ms en listas; no infinito decorativo.

---

## 7. Fuera de alcance

- **Iniciativa 3 (SEO):** SSR/conversión `'use client'`, metadata/OG/JSON-LD, sitemap, robots,
  rendimiento/CWV, validación de keywords, limpieza de dependencias muertas.
- Contenido/copy: ya cerrado (`copy-deck.md`).

---

## 8. Pendientes

- Datos de casos (permisos, testimonios, capturas) — ver `CLAUDE.md §7`. El layout los soporta
  pero arrancan anonimizados/livianos.
- Confirmar conservar `Globe` en "Por qué oito" o sustituir por figura de nodos del kit.
