# Spec — Iniciativa 1: Contenido (rediseño oito)

> **Estado:** Borrador para revisión del usuario.
> **Rama:** `rediseno-2026` · **Fecha:** 2026-06-14
> Parte 1 de 3 (Contenido → Visual → SEO). Define mensaje, arquitectura y copy.
> La ejecución visual detallada es la Iniciativa 2; el SEO técnico es la Iniciativa 3.

---

## 1. Contexto y objetivo

oito pasa de ser una landing one-page enfocada 100% en automatización/IA a un **sitio
multipágina de un estudio digital con dos líneas de servicio**. Esta iniciativa define
**qué dice** el sitio (mensaje, secciones, copy, keywords). No cubre el cómo se ve
(Iniciativa 2) ni el SEO técnico/SSR (Iniciativa 3).

**Objetivos de contenido:**
- Comunicar dos pilares (desarrollo + automatización) sin sonar a "hacemos de todo".
- Ampliar el posicionamiento más allá de "solo IA".
- Contenido honesto (E-E-A-T): sin métricas inventadas.
- Más superficie de keywords (una página por servicio).

---

## 2. Posicionamiento y marco de mensaje

**Quién es oito:** estudio digital para **pymes hispanohablantes de LatAm**, con dos líneas
**independientes**: (1) desarrollo web/software y (2) automatización/IA. Un cliente puede
contratar solo una.

**Voz de marca:** se mantiene el ADN *"oito lo hace por ti"*. El verbo se amplía de
"automatiza" a **construir + automatizar**.

- **Promesa central:** *"Tu equipo técnico que lo construye y lo automatiza por ti — para
  que tú no tengas que lidiar con lo técnico."*
- **Tagline Hero:** `oito — LO HACE POR TI` (SE MANTIENE; firma de marca, no se cambia).
- **Efecto de marca (se conserva):** el efecto de texto que se escribe/borra
  (`TextType.jsx`) sigue en el Hero como firma, pero **ampliado a los dos pilares**.
  Rota frases que alternan construir y automatizar, p. ej.:
  *construye tu **página web** · diseña tu **app** · automatiza tu **facturación** ·
  agiliza tu **prospección** · ordena tu **CRM**…* En cada página de servicio se reusa el
  mismo efecto con palabras específicas de ese pilar.
- **Origen:** *"Nacimos en Venezuela, trabajamos para toda LatAm."* (reemplaza "primera
  agencia en Venezuela").

---

## 3. Mapa del sitio y navegación

| Página | URL | Propósito |
|---|---|---|
| Home | `/` | Escaparate cinemático: captar, presentar 2 pilares, prueba social, CTA |
| Desarrollo web/software | `/desarrollo-web` | Vender el pilar de desarrollo (contenido nuevo) |
| Automatización/IA | `/automatizacion-ia` | Vender el pilar de automatización (reutiliza contenido actual) |

**Navegación (header):** Inicio · Desarrollo · Automatización · Casos · **WhatsApp** (CTA).
**Footer:** enlaces a las 3 páginas + secciones, datos de contacto (`info@oitove.com`,
IG `@oito.vee`, WhatsApp), origen LatAm.

---

## 4. Modelo de contacto

**Solo WhatsApp** (`https://wa.me/584241344659`) como canal. CTA persistente (sticky/flotante)
en todo el sitio. Se **elimina**: embed de Cal.com (`@calcom/embed-react`) y formulario con
Resend (`src/app/actions.ts`). Email se mantiene solo como dato en el footer.

---

## 5. Arquitectura de contenido — HOME

Patrón: *Immersive/Interactive Experience + Feature-Rich Showcase*. Tratamiento híbrido
(hero oscuro / contenido claro). CTA en hero + tras pilares + al final.

| # | Sección | Contenido | Origen |
|---|---|---|---|
| 1 | **Hero inmersivo** | Hilos WebGL + "oito LO HACE POR TI" + efecto TextType rotando frases de ambos pilares + CTA WhatsApp + opción saltar | Evoluciona Hero actual |
| 2 | **Los 2 pilares** | Dos tarjetas (Desarrollo \| Automatización) con 1 frase cada una → links a sus páginas | NUEVO |
| 3 | **Prueba social** | Logos de clientes reales + 1-2 testimonios (con permiso). Sustituye el banner de "herramientas" como prueba principal | Reemplaza AuthorityBanner |
| 4 | **Por qué oito** | Versión condensada de About: "el tiempo no se recupera, los ingresos sí" + antes→después | Condensa About actual |
| 5 | **Casos destacados** | 3-4 casos cruzados (ambos pilares) → "ver más" en páginas de servicio | Subconjunto de Portfolio |
| 6 | **Cómo trabajamos** | Proceso en 3 pasos resumido (genera confianza) | Condensa HowWeWork |
| 7 | **CTA final** | Cierre fuerte a WhatsApp | NUEVO |

El banner de logos de **herramientas** (OpenAI, Make, n8n…) se conserva pero **degradado a
"construido con"** dentro de la página de automatización, no como prueba social del Home.

---

## 6. Arquitectura de contenido — /desarrollo-web (NUEVO)

Servicios: **sitios web/landing pages · apps web y sistemas a medida · apps móviles.**

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | "Construimos el software que tu empresa necesita" + CTA WhatsApp |
| 2 | Servicios | 3 tarjetas: Sitios web · Apps web/sistemas a medida · Apps móviles |
| 3 | Cómo trabajamos | Proceso de desarrollo (descubrimiento → diseño → desarrollo → entrega) |
| 4 | Casos de desarrollo | Proyectos reales (mockups/descripción + resultado, sin capturas si incomodan) |
| 5 | Tecnologías | Stack con el que construyen (genera confianza técnica) |
| 6 | CTA | WhatsApp |

---

## 7. Arquitectura de contenido — /automatizacion-ia (REUTILIZA)

Hereda casi todo el contenido actual, reorganizado:

| # | Sección | Origen |
|---|---|---|
| 1 | Hero | Adaptado: "Automatizamos lo repetitivo con IA" + CTA |
| 2 | Pilares (Productividad/Integración/IA Agéntica) | About actual |
| 3 | Soluciones (grid de casos) | Portfolio actual completo |
| 4 | Calculadora ROI | Pricing actual |
| 5 | Metodología + contador en vivo | HowWeWork actual |
| 6 | "Construido con" (logos de herramientas) | AuthorityBanner actual |
| 7 | CTA | WhatsApp |

---

## 8. Honestidad / E-E-A-T (crítico para SEO)

- **KPIs del portafolio son ilustrativos** → reformular para no afirmar resultados medidos.
  - ❌ "Logramos −85% de trabajo manual" → ✅ "Reduce hasta ~85% el trabajo manual" /
    "Potencial de" / "Casos típicos". Etiquetar claramente como ejemplos/estimaciones.
- **Prueba social real disponible** (logos, testimonios, proyectos): usar con permiso.
  Las capturas que incomoden se sustituyen por mockups/descripciones.
- **Contador en vivo de HowWeWork** ("oito habría calificado N leads"): mantener pero
  enmarcar como ilustrativo, no como métrica real de clientes.

---

## 9. Keywords (borrador, a validar en Iniciativa 3 SEO)

| Página | Keyword principal | Secundarias |
|---|---|---|
| Home | agencia desarrollo web y automatización LatAm | estudio digital pymes, software y automatización |
| /desarrollo-web | desarrollo de software a medida / páginas web para pymes | apps web, apps móviles, sistemas a medida |
| /automatizacion-ia | automatización de procesos con IA | agentes de IA, automatización pymes, IA para empresas |

---

## 10. Fuera de alcance (otras iniciativas)

- **Iniciativa 2 (Visual):** maquetación, animaciones, integración de hilos/kit visual,
  componentes nuevos, paleta aplicada, responsive.
- **Iniciativa 3 (SEO):** SSR/conversión desde `'use client'`, metadata/OG/JSON-LD, sitemap,
  robots, rendimiento/CWV, validación de keywords.

---

## 11. Pendientes abiertos

- Textos finales (copy) de cada sección — se redactan al implementar esta iniciativa.
- Lista concreta de clientes/testimonios a exhibir (requiere permisos del usuario).
- Reconciliar discrepancias de `agents.md` (fuente tipográfica Outfit vs Varela Round;
  actualizar descripción de oito al nuevo posicionamiento).
