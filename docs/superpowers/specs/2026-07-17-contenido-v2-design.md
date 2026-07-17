# Spec — Contenido v2: landing única de automatización (2026-07-17)

> Diseño de mensaje para la landing única de oito tras el pivote a solo automatización
> (spec del pivote: `2026-07-17-pivote-automatizacion-design.md`). Este spec define la
> **arquitectura de mensaje y la dirección de contenido sección por sección**. El texto
> final (copy deck v2) se redacta en la fase de implementación (writing-plans → ejecución).

## 1. Posicionamiento del mensaje

- **Audiencia principal:** pyme **B2B con foco en ventas** (empresas que venden a otras
  empresas y sufren en prospección, calificación de leads, seguimiento y CRM). Es el
  terreno de los 3 casos reales.
- **Alcance:** **automatización integral con entrada por ventas.** El mensaje engancha por
  el dolor de ventas (la puerta), pero deja claro que oito automatiza cualquier proceso del
  negocio (el techo). Ventas es el gancho, no el límite.
- **Promesa central (hero):** aspiracional, el estado final. "Deja que la IA trabaje por ti."
- **Voz:** cercana, técnica, confiada. Tuteo. Firma "oito lo hace por ti".

## 2. Reglas de contenido (heredadas, aplican a todo el copy)

- Tagline **"oito LO HACE POR TI"** intacto; TextType solo con frases de automatización.
- Contacto **solo WhatsApp** (`https://wa.me/584241344659`); CTA sticky/flotante.
- **Sin em dash (`—`)**: coma, punto, dos puntos o paréntesis.
- **Honestidad de cifras:** ninguna cifra como resultado medido salvo caso real con
  permiso; las ilustrativas se redactan como potencial ("hasta ~85%", "cálculo estimado").
- Eliminado del copy: "Nacimos en Venezuela, trabajamos para toda LatAm" y "Sin cifras
  infladas, solo lo que hicimos".
- Casos **anonimizados por sector** hasta que el cliente autorice nombre/logo.
- No usar testimonios ficticios.

## 3. Estructura de la landing (orden fijo) y mapeo a componentes

Arco narrativo: enganchar por el dolor de ventas → mostrar cómo lo resuelve oito → probarlo
con casos → abrir al techo integral → cerrar.

| # | Sección | Componente | Dirección de contenido |
|---|---------|------------|------------------------|
| 1 | Hero | `Hero` + `ThreadsBackground` | Wordmark "oito" + "LO HACE POR TI"; titular "Deja que la IA trabaje por ti."; TextType (ver §4); subtítulo que nombra procesos (prospección, CRM, soporte, reportes) y cierra en "para que tú te enfoques en crecer"; CTA WhatsApp. |
| 2 | Por qué oito / el dolor | `WhyOito` | Engancha por ventas ("cada lead sin responder es una venta que se enfría") y abre al costo del trabajo manual en general. Antes→Después: caos manual → operación en automático. |
| 3 | Los 3 pilares | `AutomationPillars` | Productividad · Integración · IA Agéntica (cómo lo hace oito). Reutiliza el copy de pilares actual. |
| 4 | Casos reales | `CasesSpotlight` (sobre `CaseStudy`) | Los 3 de automatización (SecureByte, Go To Truckers, SupraBT) etiquetados *Automatización* + Hospiwaste etiquetado *Desarrollo*. Anónimos por sector. Sin cifras de resultado. |
| 5 | Qué puedes automatizar | `SolutionsGrid` | **Punto de apertura del gancho de ventas al techo integral.** Grid de soluciones (soporte, inventario, cobranza, reportes, documentos, reseñas...). KPIs como potencial. |
| 6 | Calculadora de ROI | `RoiCalculator` | "Cuánto te cuesta no automatizar." Resultados etiquetados como estimación. |
| 7 | Cómo trabajamos | `Methodology` | Metodología oito + contador en vivo (enmarcado como ilustrativo). |
| 8 | Prueba social ligera | `SocialProof` + `BuiltWith` | Franja de señales neutrales (ver §5) + carrusel "Construido con" (stack). Estructura lista para 1 testimonio cuando haya permiso. |
| 9 | FAQ | `Faq` | Preguntas frecuentes, incluye la entrada de desarrollo (ver §6). |
| 10 | CTA final | `EasyStart` / `FinalCTA` | Cierre + WhatsApp. |

**Duplicados resueltos:**
- "Cómo trabajamos": se usa **`Methodology`**; se descarta `HowWeWorkHome`.
- Casos: se usa **`CasesSpotlight`**; se descartan `FeaturedCases` y `AutomationCases`.

Los componentes descartados y la sección "Los dos pilares" (`TwoPillars`) salen de la
landing; su código queda en git.

## 4. TextType (frases que rotan bajo el hero)

Orden: ventas primero, luego abriendo al resto. Lista propuesta (afinable en implementación):

`tu prospección · tu CRM · tu seguimiento de leads · tu cobranza · tu soporte · tu inventario · tus reportes · tu facturación`

## 5. Credibilidad sin logos ni testimonios

La prueba social la cargan tres elementos, sin inventar clientes:
1. **Los 4 casos reales** (§3, sección 4), contados en detalle, anónimos por sector.
2. **Franja de señales neutrales** (en `SocialProof`): datos verdaderos sin nombres, p. ej.
   "4 proyectos en producción", "sectores: ciberseguridad, logística, salud", "flujos
   corriendo 24/7". Redacción final y cifras exactas a confirmar con el usuario en
   implementación (deben ser verdaderas).
3. **Stack "Construido con"** (`BuiltWith`): carrusel de herramientas (n8n, OpenAI,
   HubSpot, Apollo, Make, Zapier...) como prueba de competencia técnica.

La sección se monta **lista para un testimonio** (1 slot), oculto o mostrando solo el stack
mientras no haya material con permiso. No se usan testimonios ficticios.

## 6. Mención secundaria de desarrollo

Sin sección propia. Dos toques:
1. **Entrada de FAQ** (dirección; texto final en implementación):
   > **¿Solo hacen automatización? ¿También páginas web o software?**
   > Hoy nos enfocamos 100% en automatización e IA, que es donde generamos más impacto.
   > También construimos software a medida cuando un proyecto lo necesita (como el sistema
   > de trazabilidad que ves en los casos). Si tienes algo así en mente, escríbenos y lo
   > conversamos.
2. **Hospiwaste** en el spotlight de casos, etiquetado *Desarrollo*, como guiño de músculo
   técnico (tiene capturas reales confirmadas).

## 7. Navegación (header)

Con una sola página, el header pasa a **anclas de sección**:
`Casos · Qué automatizar · Cómo trabajamos · FAQ` + botón WhatsApp.
Pilares y ROI quedan fuera del nav (se llega por scroll) para no saturar.

## 8. Entregable de la siguiente fase

El copy deck v2 (`docs/content/copy-deck-v2.md` o sección nueva en el deck existente) con el
**texto final** de las 10 secciones, siguiendo esta arquitectura. Datos que el usuario debe
aportar antes o durante esa fase: cifras verdaderas para la franja de señales neutrales (§5);
todo lo demás se puede redactar con lo disponible.

## 9. Fuera de alcance

- Cambios visuales o de componentes (eso es la fase B, Recomposición).
- Escribir el texto final aquí (es la implementación de este spec).
- Conseguir permisos de logos/testimonios (los aporta el usuario cuando estén).
- SEO / metadata (iniciativa C).
