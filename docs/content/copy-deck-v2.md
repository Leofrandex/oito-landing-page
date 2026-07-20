# Copy Deck v2 - Landing única de automatización (oito)

> Texto final de la landing única (`/`) tras el pivote a solo automatización.
> Spec: `docs/superpowers/specs/2026-07-17-contenido-v2-design.md`.
> Voz: "oito lo hace por ti" (cercana, técnica, confiada, tuteo). Sin em dash.
> Cifras siempre como potencial. Casos anonimizados por sector.
> `[REQUIERE TU INPUT]` = dato real que aporta el usuario, no se inventa.

---

# 1. Hero

> **H1 híbrido, variante B (decisión usuario 2026-07-19):** el `<h1>` contiene marca + eslogan + keyword SEO. Visualmente "oito" es el protagonista absoluto y el eslogan queda intacto; la keyword es una línea de apoyo discreta debajo. Google lee: "oito lo hace por ti Automatización con IA para tu negocio".

**Marca (grande, dentro del H1):** `oito`
**Eslogan (oficial, dentro del H1):** `LO HACE POR TI`
**Keyword SEO (línea de apoyo, dentro del H1):** Automatización con IA para tu negocio

**Efecto TextType ("Automatizamos" queda FIJO; solo rota el complemento):**
Automatizamos → **tu prospección** · **tu CRM** · **tu seguimiento de leads** · **tu cobranza** · **tu soporte** · **tu inventario** · **tus reportes** · **tu facturación**

> Requisito SEO: las 8 frases deben existir también como texto estático en el DOM (visualmente ocultas), porque el efecto se escribe con JavaScript y el crawler no espera la animación.

**Subtítulo (fijo, debajo del efecto):**
> Automatizamos lo repetitivo de tu negocio para que tú te enfoques en crecer.

**CTA principal:** `Hablemos por WhatsApp`

> El titular "Deja que la IA trabaje por ti." se retiró (decisión usuario 2026-07-19): el eslogan oficial de la marca es "oito lo hace por ti" y la carga de keywords pasa a la línea SEO del H1. El CTA final (§11) conserva su eco "¿Listo para que la IA trabaje por ti?".

---

# 2. Header (navegación)

**Enlaces (anclas de sección):** `Casos` · `Soluciones` · `Metodología` · `FAQ`
**Botón:** `WhatsApp`

> Pilares y Calculadora de ROI quedan fuera del nav (se llega por scroll). La página /desarrollo-web está oculta (redirige a /) y no aparece en el nav.

> **Excepción deliberada de CTA (no "corregir"):** el botón compacto del header dice solo `WhatsApp` (por espacio); los CTA de sección dicen `Hablemos por WhatsApp`. Es intencional, no una inconsistencia.

---

# 3. Por qué oito

**Bloque 1 (dolor, ventas):**
**Título:** El tiempo no se recupera, **los ingresos sí**
> Mientras tu equipo hace seguimiento a mano, hay prospectos que se cansan de esperar y compran en otro lado. No es falta de ganas: es que el tiempo no te alcanza para responder a todos, a tiempo.

> Decisión usuario 2026-07-19: se conserva el título ya construido (mejor que el propuesto "Cada lead sin responder...") y se adopta el cuerpo del deck (gancho de ventas).

**Bloque 2 (apertura al techo integral):**
**Título:** Tú enfócate en crecer. **De lo técnico nos encargamos nosotros**
> En oito construimos y automatizamos el motor invisible de tu negocio, con IA que ejecuta el trabajo repetitivo por ti.

**Antes → Después (animación de WhyOito):**
- **Tu negocio hoy:** Caos, tareas manuales, tiempo que se escapa.
- **Tu negocio con oito:** Orden, procesos en automático, IA que ejecuta.

---

# 4. Los 3 pilares

**Título:** Nos basamos en 3 pilares
1. **Productividad:** Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio.
2. **Integración:** Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella.
3. **IA Agéntica:** Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma.

---

# 5. Casos reales

**Título:** Casos reales, ya en producción

**Bajada:** Nada de maquetas ni promesas. Esto es lo que construimos y hoy corre en el día a día de negocios como el tuyo.

> Spotlight con tabs: un caso a la vez, con su etiqueta de tipo y sector. Anonimizados por sector, sin nombres de cliente en el texto público (nota interna entre corchetes solo para referencia del equipo).

**Caso 1**
**Etiqueta:** `Automatización`
**Sector:** Ciberseguridad
**Título:** Calificación y enrutamiento de leads con IA
> Las cotizaciones llegaban por email, WhatsApp y chat web y se gestionaban a mano. Construimos un flujo en n8n que lee los mensajes y adjuntos (PDF, Excel, imágenes), califica el lead con IA, lo deduplica en el CRM, lo reparte por turnos al equipo y responde pidiendo lo que falte.
`[SecureByte - pendiente permiso]`

**Caso 2**
**Etiqueta:** `Automatización`
**Sector:** Logística B2B
**Título:** Secuencias de venta personalizadas con IA
> Agentes de IA, con RAG sobre la guía de ventas del negocio, extraen el contexto de cada empresa desde el CRM y generan correos de venta personalizados, enviados en automático desde el correo del vendedor asignado.
`[Go To Truckers - pendiente permiso]`

**Caso 3**
**Etiqueta:** `Automatización`
**Sector:** Ciberseguridad
**Título:** Prospección outbound B2B con IA
> El flujo busca prospectos, los investiga con agentes de IA (búsqueda web y modelos de razonamiento), los puntúa con una rúbrica de 0 a 100 (nivel de decisión, riesgo del sector, urgencia) y redacta cold emails diferenciados, dejando los leads listos separados de los fríos.
`[SupraBT - pendiente permiso]`

**Caso 4**
**Etiqueta:** `Desarrollo`
**Sector:** Distribución farmacéutica
**Título:** App de rastreo de fuerza de campo
> App móvil nativa + panel web para gestionar al equipo de ventas en campo: GPS en tiempo real, modo offline y cámara anti-fraude para verificar cada visita.
`[Ponce-Benzo - pendiente permiso]` · `[REQUIERE TU INPUT: capturas reales de la app, si existen]`

> **Nota:** este es el único caso de *Desarrollo* en el spotlight: el guiño de que, detrás de la automatización, hay el mismo músculo técnico para construir software a medida cuando el negocio lo necesita. Se eligió este caso (y no el de trazabilidad de desechos) porque cierra el arco de VENTAS del roster: calificación → secuencias → prospección → equipo de ventas en campo (decisión usuario 2026-07-19). El caso de trazabilidad (con capturas reales confirmadas) queda en banca para cuando se reactive `/desarrollo-web`.

---

# 6. Qué puedes automatizar

**Título:** Lo que la automatización puede hacer por ti
**Bajada:** Ejemplos de soluciones comunes para tu operación.

> Decisión usuario 2026-07-19: se retiró la frase "las cifras son estimaciones de impacto potencial, no resultados garantizados" (tono de abogado). El framing de potencial queda incorporado en el "hasta ~" de las cifras mismas.

> Marquesina de dos filas (loop continuo, sentido opuesto cada una) con las 8 soluciones. Este es el punto donde el mensaje abre del gancho de ventas (leads, Casos) al techo integral: cualquier tarea repetitiva del negocio, no solo prospección.

1. **Calificador de leads:** hasta ~85% menos tiempo de triage
2. **Soporte 24/7:** respuestas al instante, a cualquier hora
3. **CRM al día:** datos sincronizados sin tipeo manual
4. **Control de stock:** alertas antes de quedarte sin inventario
5. **Cobranza:** recordatorios automáticos de pago
6. **Reportes:** listos cada mañana sin armarlos a mano
7. **Reseñas:** pide y gestiona reseñas en automático
8. **Documentos:** extrae datos de PDFs y adjuntos

**Cierre (pregunta + CTA):**
**Título:** ¿Cuál le quitaría más **trabajo** a tu equipo?
**CTA:** `Cuéntanos por WhatsApp`

---

# 7. Calculadora de ROI

**Título:** Calcula el costo real de **no automatizar**
**Bajada:** Ajusta los tres valores a tu operación. El resto lo hace la página.

> Calculadora con 3 sliders (personas en tareas repetitivas, horas por semana por persona, costo por hora) y una comparación visual de dos columnas: "Hoy" vs "Con oito", con la diferencia de horas que "vuelven a ti /mes".

**Veredicto (bajo los sliders):**
> [monto]/mes en trabajo manual
> Cálculo estimado sobre ~70% del tiempo recuperable.

> Decisión usuario 2026-07-19: sin línea aparte de "no es una cifra garantizada". El "Cálculo estimado" pegado al veredicto es el único framing, discreto y suficiente.

**CTA:** `Hablemos de tu caso`

---

# 8. Cómo trabajamos

**Título:** Metodología **oito**

> Sección con scroll pineado: el hilo se llena y cada nodo se enciende con su check a medida que avanzas por los 3 pasos. Al cierre del pin, aparece el contador en vivo.

1. **Contacto & Auditoría:** Hablamos por WhatsApp, entendemos tu negocio e identificamos dónde podemos ayudarte más.
2. **Construcción & Implementación:** Diseñamos y desarrollamos la solución a medida, integrándola con lo que ya usas.
3. **Monitoreo & Mejora:** Medimos, ajustamos y escalamos para que los resultados se mantengan en el tiempo.

**Contador en vivo (cierre de la sección, enmarcado como ilustrativo, sin nota al pie aparte):**
> En los **[N]** segundos que llevas leyendo, `oito` podría haber:
> - calificado **[N]** leads
> - enviado **[N]** propuestas
> - validado **[N]** facturas

---

# 9. Prueba social

**Título:** Negocios que ya dejaron que **oito** lo haga por ellos

**Franja 1, sectores atendidos (reales, sin nombres):**
> Ciberseguridad · Logística · Salud · Farmacéutica · Gestión de desechos · Transporte B2B

**Franja 2, logos de clientes:**
> `[REQUIERE TU INPUT: logos de clientes con permiso de uso. Mientras no haya permiso, esta franja muestra placeholders neutros, no logos inventados.]`

**Franja 3, señales neutrales (datos verdaderos, sin nombres):**
- **6+** proyectos entregados
- **6** sectores distintos
- **24/7** operando en automático
- **100%** remoto y en español

> ✅ Cifras confirmadas por el usuario (2026-07-19): las 4 se quedan tal cual.

**Construido con (stack):** Sistemas construidos con: OpenAI, Anthropic, Gemini, Perplexity, n8n, Make, Zapier, HubSpot, Zoho, Airtable, Notion, ClickUp, Slack, Google Sheets, WhatsApp, Instagram (carrusel de logos de herramientas, como prueba de competencia técnica, no de clientes).

**Testimonio (1 slot, listo para cuando haya permiso):**
> `[REQUIERE TU INPUT: testimonio real, cita + nombre + empresa. Mientras no haya, esta sección muestra solo sectores, stack y señales neutrales. No usar testimonios ficticios.]`

> **Nota de fuente:** la franja de señales neutrales y el bloque "Construido con" se rellenaron con datos reales ya implementados en `src/components/SocialProof.tsx` y `src/components/BuiltWith.tsx`, en vez de dejar los placeholders `[REQUIERE TU INPUT]` que traía el brief.

---

# 10. FAQ

**Título:** Antes de que hablemos

1. **¿Cuánto cuesta?**
> Cada proyecto es distinto, así que no manejamos precios de lista. La primera conversación por WhatsApp no cuesta nada: entendemos tu caso y te damos una propuesta clara antes de que decidas.

2. **¿Y si todavía no sé qué necesito?**
> Es lo normal, y está bien. Empezamos con una auditoría: nos cuentas cómo trabajas hoy y nosotros identificamos dónde la automatización te da más impacto.

3. **¿Tengo que cambiar las herramientas que ya uso?**
> No. Nos integramos con lo que ya tienes (tu CRM, tus hojas de cálculo, WhatsApp, lo que sea). La idea es sumar, no obligarte a empezar de cero.

4. **¿Cuánto tarda?**
> Depende del alcance, y siempre trabajamos en entregas claras. Una automatización puntual puede estar corriendo en cuestión de semanas; un sistema a medida se construye por fases para que veas avances desde temprano.

5. **¿Trabajan con empresas de mi país?**
> Sí. Trabajamos con pymes de toda LatAm de forma remota, en español. La distancia no es problema: todo arranca con un mensaje.

6. **¿Solo hacen automatización? ¿También páginas web o software?** *(entrada obligatoria)*
> Hoy nos enfocamos 100% en automatización e IA, que es donde generamos más impacto. También construimos páginas web y software a medida cuando un proyecto lo necesita (como la app de rastreo para equipos de campo que ves en los casos). Si tienes algo así en mente, escríbenos y lo conversamos.

> Ajuste 2026-07-19 sobre la entrada verbatim original: se menciona "páginas web" explícitamente (petición del usuario) y la referencia del caso cambia de trazabilidad a la app de rastreo (el caso de trazabilidad salió del roster).

> **Nota:** el componente `src/components/Faq.tsx` trae las 6 preguntas pre-pivote. En este deck la antigua pregunta 5 ("¿Hacen solo IA o solo desarrollo?") se **eliminó** por contradecir el enfoque 100% automatización de la entrada verbatim; las preguntas 2 y 4 se **reescribieron** al pivote (quitando las menciones a "desarrollo" y "web"); y se **añade** la entrada verbatim de desarrollo (aquí la 6). El componente queda como divergencia a integrar (ver §14).

---

# 11. CTA final

**Título:** ¿Listo para que la IA trabaje por ti?
**Bajada:** Cuéntanos qué proceso te quita horas. Te respondemos por WhatsApp, sin compromiso.
**CTA:** `Hablemos por WhatsApp`

> **Nota de fuente:** `src/components/FinalCTA.tsx` aún muestra el copy anterior ("¿Listo para que oito lo haga por ti?" / "Cuéntanos qué tienes en mente"); se actualizará al copy de este deck en la fase de integración.

---

# 12. Puente de desarrollo (DevBridge)

> Posición real en la página: entre **Construido con (stack)** y **FAQ** (después de la sección 9 de prueba social, antes de la 10). Se numera aquí al cierre del deck para no romper el orden narrativo "gancho → prueba → cierre" de las secciones 9-11; el orden real de la landing construida es: Metodología → Prueba social → Construido con → **Puente de desarrollo** → FAQ → Empezar es fácil → CTA final.

**Eyebrow:** También hacemos
**Título:** Tu página web, construida por oito
**Bajada:** El mismo estudio que automatiza tu operación puede construir la cara digital de tu negocio: rápida, moderna y hecha para vender.
**CTA (botón secundario):** `Cuéntanos qué quieres hacer` *(WhatsApp; única excepción al texto estándar de CTA, ya construida y aprobada)*

> **Nota de alcance:** la página `/desarrollo-web` está oculta del sitio (ver `copy-deck.md`, PÁGINA 2). Este puente y la pregunta de desarrollo del FAQ (§10, entrada verbatim) son la única presencia de "desarrollo" en la landing pivotada a automatización. Copy ya construido en `src/components/DevBridge.tsx`, sin cambios: no rompe ninguna constraint (sin em dash, sin datos inventados, tuteo, CTA por WhatsApp).

---

# 13. Empezar es fácil (EasyStart)

> Posición real en la página: entre **FAQ** y **CTA final**, inmediatamente antes de la sección 11. Rampa emocional pre-CTA, sin botón propio: el CTA vive en la sección 11 justo después (ambas en fondo oscuro, sin divisor, cierre continuo).

**Eyebrow:** El primer paso
**Título:** Empezar es más simple de lo que crees
**Bajada:** No necesitas tener todo claro ni un documento perfecto. Nos escribes, nos cuentas en qué andas, y desde ahí lo resolvemos contigo.

**3 puntos (con ícono):**
- La primera conversación no cuesta nada
- Sin compromiso ni letra chica
- Te respondemos rápido y en español

> Copy ya construido en `src/components/EasyStart.tsx`, sin cambios: no rompe ninguna constraint.

---

# 14. Estado de integración (deck vs componentes construidos)

> **Para la fase de integración, no es copy de la landing.** Este deck es la fuente de verdad del texto. Las siguientes divergencias entre el deck y los componentes ya construidos siguen abiertas; consolidan lo que hasta ahora vivía en notas sueltas por sección más lo detectado en la pasada de coherencia. Al integrar, el componente se alinea al deck (salvo donde se indique lo contrario).

**Hero (`src/components/Hero.tsx`)**
- **Subtítulo:** el componente aún muestra el copy pre-pivote "Tu equipo técnico que construye software y automatiza procesos." El deck (§1) pide "Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) para que tú te enfoques en crecer."
- **Frases del TextType:** el componente rota frases en forma verbal ("automatiza tu facturación", "agiliza tu prospección", "ordena tu CRM"…). El deck (§1, pieza verbatim) las define en forma nominal ("tu **prospección** · tu **CRM** · tu **seguimiento de leads**…"). Alinear el componente al deck.
- **Titular:** el deck (§1) define el titular "Deja que la IA trabaje por ti."; el componente hoy solo renderiza el wordmark ("oito" + "lo hace por ti") sin ese titular. Confirmar dónde entra al integrar.

**Por qué oito (`src/components/WhyOito.tsx`)**
- **Bloque 1:** el componente aún muestra el copy pre-pivote. Título "El tiempo no se recupera, los ingresos sí" y cuerpo "La mayoría de los negocios están atrapados en procesos fragmentados y tareas manuales. Eso cuesta tiempo, y el tiempo es lo único que no vuelve." El deck (§3) pide título "Cada lead sin responder es una venta que se enfría" con el gancho de ventas (prospectos que se cansan de esperar y compran en otro lado).
- **Bloque 2:** el título ya coincide ("Tú enfócate en crecer. De lo técnico nos encargamos nosotros"), pero el cuerpo aún es dual: "construimos y automatizamos el motor invisible de tu negocio: el software que necesitas y los procesos que te quitan horas." El deck (§3) reescribe el cuerpo hacia automatización ("oito construye y automatiza ese motor invisible, con IA que ejecuta el trabajo repetitivo por ti"). Alinear ambos bloques al deck al integrar.

**Casos (`src/components/CasesShowcase.tsx`, montado en `src/app/page.tsx`)**
- El roster del componente difiere del deck. Hoy trae **2 Automatización + 2 Desarrollo**: "Calificación de leads con IA", "Secuencias de venta con IA", "Trazabilidad de desechos peligrosos" (Desarrollo) y "App de rastreo de fuerza de campo" (Desarrollo, distribuidora farmacéutica). El deck (§5) define **3 Automatización + 1 Desarrollo**: incluye "Prospección outbound B2B con IA" (caso 3, ausente en el componente) y **no** contempla "App de rastreo de fuerza de campo" (ausente en el deck). Al integrar, alinear el roster al deck: añadir el caso 3 de outbound y retirar el de fuerza de campo.
- Además, la pasada de coherencia devolvió especificidad técnica a los casos del deck (n8n como motor del flujo; rúbrica "de 0 a 100"); las descripciones del componente son más genéricas. Reflejar el texto actual de §5, no una versión anterior.

**FAQ (`src/components/Faq.tsx`)**
- El componente trae las 6 preguntas pre-pivote. Divergencias con §10 tras esta revisión: (1) **eliminar** la pregunta "¿Hacen solo IA o solo desarrollo?" (contradecía el enfoque 100% automatización); (2) **reescribir** la 2 ("¿Y si todavía no sé qué necesito?") quitando "sea desarrollo, automatización o ambas"; (3) **reescribir** la 4 ("¿Cuánto tarda?") quitando "Una web o"; (4) **añadir** la entrada verbatim de desarrollo (§10, la que empieza "¿Solo hacen automatización?…"), que hoy falta en el componente. Todo es trabajo de código.

**CTA final (`src/components/FinalCTA.tsx`)**
- El componente muestra el copy anterior: título "¿Listo para que oito lo haga por ti?" y bajada "Cuéntanos qué tienes en mente…". El deck (§11) pide título "¿Listo para que la IA trabaje por ti?" y bajada "Cuéntanos qué proceso te quita horas. Te respondemos por WhatsApp, sin compromiso."

**Calculadora de ROI**
- El disclaimer del deck (§7) ahora exige una línea explícita "Es una estimación de potencial, no una cifra garantizada." visible bajo el veredicto. Confirmar que el componente la muestre separada, no fundida en el veredicto.

> Sin cambios pendientes conocidos en: DevBridge, EasyStart, SocialProof, BuiltWith (ya alineados al deck).

---
