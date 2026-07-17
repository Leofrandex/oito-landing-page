# Copy Deck v2 — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Producir `docs/content/copy-deck-v2.md`, el texto final en español de las 10 secciones de la landing única de automatización, siguiendo la arquitectura del spec.

**Architecture:** Trabajo de contenido, no de código. No hay build ni tests unitarios. Cada tarea redacta un bloque narrativo del deck y lo verifica contra reglas objetivas (sin em dash, cifras como potencial, voz, piezas verbatim ya decididas). El deck se construye de arriba hacia abajo para que la voz del Hero (Tarea 1) ancle el resto; una tarea final hace la pasada de coherencia global.

**Tech Stack:** Markdown, git, grep para verificación.

**Fuentes:**
- Spec (contrato): `docs/superpowers/specs/2026-07-17-contenido-v2-design.md`.
- Mina de copy a adaptar: `docs/content/copy-deck.md` PÁGINA 3 (Automatización, líneas ~223-291) y PÁGINA 1 (Home, líneas ~13-130). PÁGINA 2 está congelada; solo se rescata el caso Hospiwaste (líneas ~101-103).

## Global Constraints

- Todo el copy en **español**, tuteo, voz cercana/técnica/confiada ("oito lo hace por ti").
- **Sin em dash (`—`)** en ningún texto: usar coma, punto, dos puntos o paréntesis.
- **Cifras solo como potencial** ("hasta ~85%", "cálculo estimado"); ninguna como resultado medido salvo caso real con permiso. Ningún caso tiene métricas medidas.
- **Casos anonimizados por sector**; no usar nombres de cliente ni logos (ninguno tiene permiso).
- **No inventar testimonios** ni datos. Los datos que el usuario debe aportar se marcan `[REQUIERE TU INPUT: ...]`.
- Contacto **solo WhatsApp** (`https://wa.me/584241344659`); CTA siempre "Hablemos por WhatsApp".
- Tagline **"oito LO HACE POR TI"** y TextType solo con frases de automatización.
- No eliminar copy previo del repo: `copy-deck-v2.md` es archivo nuevo; `copy-deck.md` solo se referencia.

---

### Task 1: Scaffold del deck + Hero + Header

**Files:**
- Create: `docs/content/copy-deck-v2.md`

**Interfaces:**
- Produces: el archivo del deck con encabezado, la sección Hero final y la nav del header. Las tareas siguientes anexan secciones a este mismo archivo, en orden.

- [ ] **Step 1: Crear el archivo con encabezado y metadatos**

Crear `docs/content/copy-deck-v2.md` empezando con:

```markdown
# Copy Deck v2 — Landing única de automatización (oito)

> Texto final de la landing única (`/`) tras el pivote a solo automatización.
> Spec: `docs/superpowers/specs/2026-07-17-contenido-v2-design.md`.
> Voz: "oito lo hace por ti" (cercana, técnica, confiada, tuteo). Sin em dash.
> Cifras siempre como potencial. Casos anonimizados por sector.
> `[REQUIERE TU INPUT]` = dato real que aporta el usuario, no se inventa.

---

# 1. Hero
```

- [ ] **Step 2: Redactar el Hero (pieza verbatim ya decidida en brainstorm)**

Anexar al archivo, usando estos textos ya aprobados (no reescribir el titular ni el tagline):

```markdown
**Marca (grande):** `oito`
**Tagline:** `LO HACE POR TI`

**Titular:** Deja que la IA trabaje por ti.

**Efecto TextType (se escribe/borra, rota estas frases):**
tu **prospección** · tu **CRM** · tu **seguimiento de leads** · tu **cobranza** · tu **soporte** · tu **inventario** · tus **reportes** · tu **facturación**

**Subtítulo (fijo, debajo del efecto):**
> Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) para que tú te enfoques en crecer.

**CTA principal:** `Hablemos por WhatsApp`

---

# 2. Header (navegación)
```

- [ ] **Step 3: Redactar la nav del header (anclas ya decididas)**

Anexar:

```markdown
**Enlaces (anclas de sección):** `Casos` · `Qué automatizar` · `Cómo trabajamos` · `FAQ`
**Botón:** `Hablemos por WhatsApp`

> Pilares y Calculadora de ROI quedan fuera del nav (se llega por scroll).

---
```

- [ ] **Step 4: Verificar reglas objetivas**

Run: `grep -n "—" docs/content/copy-deck-v2.md`
Expected: sin resultados (ningún em dash).

Run: `grep -n "Deja que la IA trabaje por ti" docs/content/copy-deck-v2.md`
Expected: 1 resultado (titular presente verbatim).

- [ ] **Step 5: Commit**

```bash
git add docs/content/copy-deck-v2.md
git commit -m "content(v2): scaffold del deck + Hero + Header"
```

---

### Task 2: Por qué oito (dolor) + 3 Pilares

**Files:**
- Modify: `docs/content/copy-deck-v2.md` (anexar secciones 3 y 4)

**Interfaces:**
- Consumes: el archivo y la voz fijada en Task 1.
- Produces: el bloque de enganche (dolor por ventas → apertura integral) y los 3 pilares.

- [ ] **Step 1: Redactar "Por qué oito" (sección de dolor)**

Anexar una sección `# 3. Por qué oito` que cumpla esta dirección (redacción libre del implementer, respetando las constraints):
- **Engancha por ventas primero:** un bloque cuyo mensaje central sea que cada lead sin responder o sin seguimiento es una venta que se enfría. Adaptar el tono del bloque "El tiempo no se recupera, los ingresos sí" del deck viejo (`copy-deck.md` líneas ~70-72), pero afilado a ventas.
- **Abre al techo integral:** un segundo bloque que amplíe del dolor de ventas al costo del trabajo manual en general (soporte, operaciones, finanzas), con la promesa "tú enfócate en crecer, de lo técnico nos encargamos nosotros" (adaptar líneas ~74-76 del deck viejo).
- **Antes → Después** (para la animación de `WhyOito`): "Tu negocio hoy" (caos, tareas manuales, cuellos de botella) → "Tu negocio con oito" (orden, procesos en automático, IA que ejecuta). Adaptar líneas ~78-80.
- **NO incluir** "Nacimos en Venezuela..." (eliminado).
- Formato: usa **Título** + cita `>` para cada bloque, igual que el deck viejo.

- [ ] **Step 2: Redactar los 3 Pilares**

Anexar `# 4. Los 3 pilares` reutilizando y puliendo el copy del deck viejo (`copy-deck.md` líneas ~234-239):

```markdown
**Título:** Nos basamos en 3 pilares
1. **Productividad** — Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio.
2. **Integración** — Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella.
3. **IA Agéntica** — Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma.
```

Corrige los dos em dash de esa lista (los `—` tras Productividad/Integración/IA Agéntica) por dos puntos u otra puntuación permitida al redactar la versión final.

- [ ] **Step 3: Verificar reglas objetivas**

Run: `grep -n "—" docs/content/copy-deck-v2.md`
Expected: sin resultados.

Run: `grep -n "Venezuela" docs/content/copy-deck-v2.md`
Expected: sin resultados.

- [ ] **Step 4: Commit**

```bash
git add docs/content/copy-deck-v2.md
git commit -m "content(v2): Por qué oito (dolor) + 3 pilares"
```

---

### Task 3: Casos reales (spotlight)

**Files:**
- Modify: `docs/content/copy-deck-v2.md` (anexar sección 5)

**Interfaces:**
- Consumes: el archivo y la voz fijada.
- Produces: los 4 casos del spotlight (3 automatización + Hospiwaste como desarrollo), anonimizados.

- [ ] **Step 1: Redactar la sección de casos**

Anexar `# 5. Casos reales` con:
- **Título** que enmarque casos reales en producción, sin cifras infladas (adaptar sin usar la frase prohibida "Sin cifras infladas, solo lo que hicimos").
- **4 casos**, cada uno con: etiqueta de tipo, sector anónimo, y descripción de qué se construyó (sin métricas de resultado). Reutilizar las descripciones del deck viejo:
  1. *Automatización* · Calificación y enrutamiento de leads con IA (sector ciberseguridad). Base: `copy-deck.md` líneas ~245-249 (SecureByte).
  2. *Automatización* · Secuencias de venta personalizadas con IA (sector logística B2B). Base: líneas ~251-254 (Go To Truckers).
  3. *Automatización* · Prospección outbound B2B con IA (sector ciberseguridad). Base: líneas ~256-260 (SupraBT).
  4. *Desarrollo* · App de trazabilidad de desechos peligrosos, PWA (sector salud). Base: líneas ~101-103 (Hospiwaste). Marca que tiene capturas reales confirmadas: `[REQUIERE TU INPUT: capturas reales de Hospiwaste]`.
- **NO** usar nombres de cliente en el texto público; mantener el patrón `[Nombre — pendiente permiso]` solo como nota interna si hace falta.
- Cerrar con nota de que Hospiwaste es el guiño de desarrollo (músculo técnico).

- [ ] **Step 2: Verificar reglas objetivas**

Run: `grep -nc "Automatización\|Desarrollo" docs/content/copy-deck-v2.md`
Expected: al menos 4 etiquetas de caso presentes.

Run: `grep -n "—" docs/content/copy-deck-v2.md`
Expected: sin resultados.

- [ ] **Step 3: Commit**

```bash
git add docs/content/copy-deck-v2.md
git commit -m "content(v2): casos reales (spotlight, 3 automatización + Hospiwaste)"
```

---

### Task 4: Qué puedes automatizar (grid) + Calculadora ROI + Cómo trabajamos

**Files:**
- Modify: `docs/content/copy-deck-v2.md` (anexar secciones 6, 7, 8)

**Interfaces:**
- Consumes: el archivo y la voz fijada.
- Produces: el bloque de apertura al techo integral + ROI + metodología.

- [ ] **Step 1: Redactar "Qué puedes automatizar" (grid de soluciones)**

Anexar `# 6. Qué puedes automatizar`. Este es el punto donde el mensaje abre del gancho de ventas al techo integral. Reutilizar el grid del deck viejo (`copy-deck.md` líneas ~262-267):

```markdown
**Título:** Lo que la automatización puede hacer por ti
**Bajada:** Ejemplos de soluciones comunes. Las cifras son estimaciones de impacto potencial, no resultados garantizados.
```

Listar las soluciones del grid (Calificador de Leads, Soporte, CRM, Stock/Inventario, Cobranza, Reportes, Reseñas, Documentos). Cualquier KPI se redacta como potencial ("hasta ~85%", no "-85%").

- [ ] **Step 2: Redactar "Calculadora de ROI"**

Anexar `# 7. Calculadora de ROI` (adaptar líneas ~269-273):

```markdown
**Título:** Calcula el costo real de **no automatizar**
**Bajada:** Analiza cuánto pierde tu equipo en tareas repetitivas y el impacto de automatizarlas.

> Los resultados son un cálculo estimado, no una cifra garantizada.
```

- [ ] **Step 3: Redactar "Cómo trabajamos" (metodología + contador)**

Anexar `# 8. Cómo trabajamos` (adaptar líneas ~275-279 y la metodología de 3 pasos del Home, líneas ~117-122):

```markdown
**Título:** Metodología **oito**
1. **Contacto y auditoría:** Hablamos por WhatsApp, entendemos tu negocio e identificamos dónde la automatización te da más impacto.
2. **Construcción e implementación:** Diseñamos el flujo o agente a medida y lo integramos con lo que ya usas.
3. **Monitoreo y mejora:** Medimos, ajustamos y escalamos para que los resultados se mantengan.

> Contador en vivo, enmarcado como ilustrativo: "En lo que llevas leyendo, oito podría haber..."
```

- [ ] **Step 4: Verificar reglas objetivas**

Run: `grep -n "—\|-[0-9]\+%" docs/content/copy-deck-v2.md`
Expected: sin resultados (ni em dash ni cifras negativas tipo "-85%").

- [ ] **Step 5: Commit**

```bash
git add docs/content/copy-deck-v2.md
git commit -m "content(v2): qué automatizar + ROI + cómo trabajamos"
```

---

### Task 5: Prueba social ligera + FAQ + CTA final

**Files:**
- Modify: `docs/content/copy-deck-v2.md` (anexar secciones 9, 10, 11)

**Interfaces:**
- Consumes: el archivo y la voz fijada.
- Produces: cierre del deck (credibilidad + FAQ con dev + CTA).

- [ ] **Step 1: Redactar "Prueba social ligera"**

Anexar `# 9. Prueba social` con los tres elementos del spec §5:

```markdown
**Franja de señales neutrales (datos verdaderos, sin nombres):**
- `[REQUIERE TU INPUT: nº de proyectos en producción, p. ej. "4 proyectos en producción"]`
- `[REQUIERE TU INPUT: sectores atendidos, p. ej. "ciberseguridad, logística, salud"]`
- `[REQUIERE TU INPUT: otra señal verdadera, p. ej. "flujos corriendo 24/7"]`

**Construido con (stack):** Sistemas construidos con: n8n, OpenAI, HubSpot, Apollo, Make, Zapier, Gemini... (carrusel de logos de herramientas, como prueba de competencia técnica, no de clientes).

**Testimonio (1 slot, listo para cuando haya permiso):**
> `[REQUIERE TU INPUT: testimonio real, cita + nombre + empresa. Mientras no haya, esta sección muestra solo el stack. No usar testimonios ficticios.]`
```

- [ ] **Step 2: Redactar "FAQ" (con la entrada de desarrollo verbatim)**

Anexar `# 10. FAQ`. Incluir varias preguntas frecuentes de automatización (redacción libre: p. ej. cuánto tarda, con qué herramientas trabajan, qué pasa si ya uso un CRM, cómo empezamos) y **obligatoriamente** esta entrada de desarrollo con el texto ya aprobado:

```markdown
**¿Solo hacen automatización? ¿También páginas web o software?**
> Hoy nos enfocamos 100% en automatización e IA, que es donde generamos más impacto. También construimos software a medida cuando un proyecto lo necesita (como el sistema de trazabilidad que ves en los casos). Si tienes algo así en mente, escríbenos y lo conversamos.
```

- [ ] **Step 3: Redactar "CTA final"**

Anexar `# 11. CTA final` (adaptar líneas ~287-290 del deck viejo):

```markdown
**Título:** ¿Listo para que la IA trabaje por ti?
**Bajada:** Cuéntanos qué proceso te quita horas. Te respondemos por WhatsApp, sin compromiso.
**CTA:** `Hablemos por WhatsApp`
```

- [ ] **Step 4: Verificar reglas objetivas**

Run: `grep -n "páginas web o software" docs/content/copy-deck-v2.md`
Expected: 1 resultado (entrada de desarrollo presente).

Run: `grep -n "—" docs/content/copy-deck-v2.md`
Expected: sin resultados.

- [ ] **Step 5: Commit**

```bash
git add docs/content/copy-deck-v2.md
git commit -m "content(v2): prueba social + FAQ (con dev) + CTA final"
```

---

### Task 6: Pasada de coherencia global + enlazar el deck viejo

**Files:**
- Modify: `docs/content/copy-deck-v2.md` (revisión de voz)
- Modify: `docs/content/copy-deck.md` (nota que apunta al v2 como vigente)

**Interfaces:**
- Consumes: el deck completo de las tareas 1-5.
- Produces: deck coherente en una sola voz + el deck viejo marcado como reemplazado por el v2 para la landing.

- [ ] **Step 1: Leer el deck completo y unificar voz**

Leer `docs/content/copy-deck-v2.md` de principio a fin. Ajustar inconsistencias de tono, longitud desigual entre secciones, repeticiones (p. ej. "automatiza" en exceso), y transiciones bruscas. No cambiar las piezas verbatim (Hero, entrada de desarrollo, TextType, anclas del header). Editar solo lo necesario para que lea como un solo autor.

- [ ] **Step 2: Verificar todas las reglas en una pasada**

Run: `grep -n "—" docs/content/copy-deck-v2.md`
Expected: sin resultados.

Run: `grep -niE "nacimos en venezuela|sin cifras infladas|/desarrollo-web|/automatizacion-ia" docs/content/copy-deck-v2.md`
Expected: sin resultados (nada de copy eliminado ni rutas muertas).

Run: `grep -nE "\-[0-9]+%|[0-9]+% menos|garantiz" docs/content/copy-deck-v2.md`
Expected: revisar manualmente que cualquier cifra esté enmarcada como potencial, no como resultado medido/garantizado.

- [ ] **Step 3: Enlazar el deck viejo al v2**

En `docs/content/copy-deck.md`, bajo la nota del pivote (cerca de la línea 5), añadir una línea:

```markdown
> **→ Copy vigente de la landing:** `docs/content/copy-deck-v2.md` (este archivo queda como base histórica).
```

- [ ] **Step 4: Commit**

```bash
git add docs/content/copy-deck-v2.md docs/content/copy-deck.md
git commit -m "content(v2): pasada de coherencia + enlazar deck v2 como vigente"
```
