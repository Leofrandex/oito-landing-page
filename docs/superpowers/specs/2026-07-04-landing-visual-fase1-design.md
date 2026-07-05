# Fase 1 Visual — Outfit + SocialProof oscuro + ritmo (design)

Fecha: 2026-07-04 · Rama: `oito-page-v5` · Iniciativa: **Visual** (pasada de cumplimiento del design-system)

## Contexto

El landing (Home) no sigue varios lineamientos de `docs/design-system.md`. Una auditoría del Home
identificó estos gaps:

| Eje | Estado actual | Severidad |
|---|---|---|
| §1 Tipografía → Outfit | Outfit no cargado; títulos en DM Sans o Varela Round | 🔴 |
| Ritmo oscuro/claro (§7) | SocialProof en claro | 🟡 |
| §3 Botones | Sin sistema compartido; CTAs ad-hoc | 🟡 (Fase 2) |
| §4 Chips/eyebrows | `.eyebrow` distinto por componente | 🟡 (Fase 2) |
| §6 Glow bullets | 0 usos | 🟢 (Fase 2) |
| §7 Nodos (glifos PNG) | 0 usos, assets no existen | ⚪ (Fase 3, bloqueado) |

La pasada Visual se descompone en fases. **Este spec cubre la Fase 1.**

## Objetivo (Fase 1)

Dejar el Home coherente en lo más visible del design-system: **tipografía Outfit en todo el landing**,
**SocialProof en oscuro** (piloto pedido por el usuario), y el **ritmo oscuro/claro** correcto.

## Fuera de alcance (Fases posteriores)

- Fase 2: sistema `Button` compartido (§3), `eyebrow/badge` estandarizado (§4), glow bullets en listas (§6).
- Fase 3: nodos como acentos de sección (§7) — requiere crear los assets PNG primero.

## Orden real de secciones del Home

`page.tsx`: Hero → TwoPillars → SocialProof → WhyOito → FeaturedCases → HowWeWorkHome → FinalCTA
(+ Footer desde `layout.tsx`). El bloque oscuro "Tu negocio hoy → con oito" lo renderiza
`BeforeAfter`, que se monta **dentro de `WhyOito`** (no es una sección aparte).

Secuencia de fondos actual:
`Hero(D) · TwoPillars(L) · SocialProof(L) · WhyOito-intro(L) · BeforeAfter(D) · FeaturedCases(L) · HowWeWork(D) · FinalCTA(D) · Footer(D)`

---

## Parte A — Tipografía a Outfit (transversal)

**Regla del design-system §1:** Outfit para titulares (800 hero / 700 secciones / 600–700 tarjetas);
DM Sans para cuerpo y UI; Varela Round **solo** para el wordmark "oito" (y CTA lúdico `oitomatiza`).

Cambios:
1. **`src/app/layout.tsx`**: importar `Outfit` de `next/font/google` (pesos 600, 700, 800),
   exponer como `--font-outfit`, y añadir la variable al `className` del `<body>`.
2. **`src/app/globals.css`**: en la regla `h1,h2,h3,h4,h5,h6` añadir
   `font-family: var(--font-outfit), var(--font-dm-sans), sans-serif;` (mantener `font-weight: 700`,
   `line-height`, `letter-spacing` actuales). El hero puede subir a 800 en su propio módulo.
3. **Corregir mal uso de Varela Round en títulos** (hoy violan §1):
   - `src/components/SocialProof.module.css` `.title` → quitar `var(--font-varela-round)` (heredará Outfit del `h2`).
   - `src/components/TwoPillars.module.css` `.title` (línea ~30) y `.cardTitle` (línea ~98) → quitar Varela Round → Outfit.
4. **Preservar el wordmark**: los "oito" que aparecen dentro de esos títulos deben ir en Varela Round.
   Envolver el `<span>` de "oito" con la clase global `.wordmark` (además de su `.mintText` para el color),
   en `SocialProof.tsx` y `TwoPillars.tsx`.
5. **Spot-check del Hero** (`Hero.tsx`/`.module.css`): confirmar que "oito" sigue como wordmark (Varela Round)
   y que ningún titular quedó en DM Sans donde debería ser Outfit. Ajustar si aplica.

No tocar el cuerpo/UI (siguen en DM Sans). No introducir Outfit en botones (los CTA van en DM Sans 700).

---

## Parte B — SocialProof → oscuro

Archivo: `src/components/SocialProof.tsx` + `SocialProof.module.css`.

1. **Sección**: cambiar la clase `sectionLight` → `section-dark`. Los hilos WebGL del fondo global
   quedan visibles detrás (base oscura `--forest-deep`).
2. **Título**: en Outfit (heredado), color claro `var(--on-dark)` (regla §0: headings sobre oscuro
   necesitan color claro). El "oito" en `.wordmark` + color mint (`.mintText`). Leve `text-shadow`
   para contraste sobre los hilos (§0 / WCAG AA).
3. **Cajas de logo (placeholders)**: reestilizar de tinte claro a **glass sobre oscuro** (regla §0/§2):
   fondo `rgba(255,255,255,.04)`, borde `rgba(9,188,138,.20–.26)`, `backdrop-filter: blur(7px)`,
   radio 22px. El "—" placeholder en tono claro tenue (`--on-dark-soft`). Mantener 5 cajas y el grid responsivo.
   Hover coherente con el design-system (levantar sutil / brillo mint), respetando `prefers-reduced-motion`.
4. **Conservar** los comentarios TODO de reemplazo por logos/testimonios reales (CLAUDE.md §7).

## Parte C — Ritmo oscuro/claro

Único cambio: **SocialProof pasa a oscuro**. Secuencia resultante:
`D · L · D · L · D · L · D · D · D` — alternancia limpia arriba + cierre oscuro cinemático
(HowWeWork/FinalCTA/Footer). Ninguna otra sección se retrata en esta fase.

---

## Enfoque de implementación

Fundacional primero, verificando en cada paso:
1. Cargar Outfit (layout + globals) y corregir los títulos Varela Round → verificar build + captura.
2. SocialProof → oscuro (sección + glass + tipografía) → verificar contraste y hilos detrás.
3. Verificación final del Home completo.

## Criterios de éxito / verificación

- `npm run build` limpio (0 errores, TypeScript OK).
- Captura del Home: todos los titulares en Outfit; "oito" en Varela Round; SocialProof oscuro con
  cajas glass e hilos visibles detrás; ritmo `D·L·D·L·D·L·D·D·D`.
- Contraste de texto sobre oscuro legible (WCAG AA), con `text-shadow` donde haya hilos detrás.
- `prefers-reduced-motion` respetado (sin regresiones).
- Ningún cambio de cuerpo/UI a Outfit; Varela Round solo en wordmark.

## Archivos afectados

- `src/app/layout.tsx` (cargar Outfit)
- `src/app/globals.css` (h1–h6 → Outfit)
- `src/components/SocialProof.tsx` + `SocialProof.module.css` (oscuro + glass + tipografía + wordmark)
- `src/components/TwoPillars.tsx` + `TwoPillars.module.css` (títulos → Outfit + wordmark)
- `src/components/Hero.*` (spot-check, ajuste menor si aplica)
