# SEO Venezuela + hero sin redundancia — Spec de diseño

> Aprobado por el usuario el 2026-07-21 (brainstorm en sesión). Cambia el enfoque geo del sitio de LatAm a **Venezuela** (decisión "por ahora", reversible) y elimina la redundancia de "automatización" en el hero (aparecía 3 veces en cascada).

## Contexto

- La iniciativa SEO (cerrada 2026-07-19) dejó el sitio técnicamente indexable, pero la palabra "Venezuela" no existía en ningún lugar del sitio: para "automatización con ia venezuela" no había señal geo alguna.
- El usuario verificó que el sitio ya está indexado (`site:oitove.com`).
- Ya existe un perfil de Google Business Profile: la Fase GBP es **actualización**, no creación.
- Dirección verificable en **Caracas**; trabajo remoto (service area business, dirección oculta al público).

## Decisiones

- **Enfoque geo: solo Venezuela** (no "Venezuela y LatAm"). Implica actualizar `docs/decisiones-fijadas.md` (posicionamiento geo, con fecha, reversible a LatAm).
- **Imagen OG:** el usuario la replica en Canva (1200×630, PNG; si pesa >300 KB, JPG) con la línea "Automatización con IA para negocios en Venezuela". Al recibirla, se reemplaza `src/app/opengraph-image.tsx` (ImageResponse) por el archivo estático. Hasta entonces, se actualiza solo el texto del `opengraph-image.tsx` para que no quede desalineado.
- **Dirección privada:** el schema NO publica calle; solo `addressLocality: Caracas` + `addressCountry: VE`.

## 1. Hero (`src/components/Hero.tsx`)

- H1 línea keyword: `Automatización con IA para negocios en Venezuela` — única mención de "automatización" en el hero.
- Línea rotativa: fijo `Hacemos ` + los 8 ítems rotativos actuales sin cambios (`tu prospección`, `tu CRM`, …). "Hacemos" conecta con el eslogan "oito lo hace por ti".
- Subtítulo: `Nos encargamos de lo repetitivo de tu negocio para que tú te enfoques en crecer.`
- Actualizar el texto sr-only y el comentario del deck en el código.
- Verificar visualmente que "Hacemos" (más corto que "Automatizamos") no rompe el layout de la línea rotativa.

## 2. Metadata (`src/app/layout.tsx`)

- `title`: `oito | Automatización con IA para pymes en Venezuela`.
- `description` (~155 chars): "Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) con IA. Pymes en Venezuela, remoto y en español. Escríbenos por WhatsApp." — aquí "Automatizamos" se conserva: en la SERP no compite con el hero.
- `openGraph` y `twitter` alineados al nuevo title/description.
- `src/app/opengraph-image.tsx`: línea keyword → "Automatización con IA para negocios en Venezuela" (interino hasta recibir el PNG de Canva).

## 3. Schema (`src/lib/seo.ts`)

- `Organization` → **`ProfessionalService`** (subtipo de LocalBusiness): mantiene name/url/logo/email/sameAs y añade:
  - `areaServed`: Venezuela.
  - `address`: `PostalAddress` con `addressLocality: "Caracas"` y `addressCountry: "VE"` (sin calle).
  - `description` pivotada a Venezuela.
- `WebSite` y `FAQPage` sin cambios.

## 4. Barrido de "LatAm" → Venezuela

- `src/components/Footer.tsx`: "Automatización con IA para pymes en Venezuela."
- `src/components/Faq.tsx` (respuesta de cobertura): "Trabajamos con pymes en toda Venezuela de forma remota…" (misma estructura, cambia el geo).
- `public/llms.txt`: description pivotada a Venezuela.
- La FAQ "¿Solo hacen automatización?" y los casos NO se tocan.

## 5. Google Business Profile (entregable, lo ejecuta el usuario)

`docs/gbp-checklist.md` con el paso a paso para **actualizar** el perfil existente:
- Modo service area business: dirección oculta, área de servicio Caracas + Venezuela.
- Nombre exactamente "oito" (sin keyword stuffing).
- Categoría principal sugerida (consultor de automatización / empresa de software), web `https://oitove.com`, WhatsApp como contacto.
- Coherencia NAP con el sitio y el schema.

## 6. Docs

- `docs/decisiones-fijadas.md`: nueva decisión ✅ FIJADO — enfoque geo Venezuela (2026-07-21), reversible a LatAm.
- `docs/roadmap.md`: registrar esta iniciativa.
- `docs/index.md`: añadir `gbp-checklist.md`.

## Verificación

- `npm run build` y `npm run lint` verdes.
- HTML de `/` contiene el nuevo title/description/H1 y el JSON-LD ProfessionalService.
- Rich Results Test sin errores (FAQPage + ProfessionalService).
- Grep de "LatAm|Latinoamérica" en `src/` y `public/` sin resultados.
- Hero revisado visualmente (línea rotativa intacta).

## Fuera de alcance

- Contenido nuevo / blog orientado a keywords Venezuela (iniciativa aparte).
- Automatizar la subida de la imagen OG (se integra cuando el usuario la entregue).
- Cambios en casos, calculadora o resto de secciones.
