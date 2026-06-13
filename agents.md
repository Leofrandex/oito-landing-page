# Identidad Visual de Oito - Guía para Agentes y Desarrolladores

Esta guía recopila las especificaciones técnicas y recursos de la identidad visual de **Oito** (Automatización e Inteligencia Artificial). Sirve como referencia para mantener la consistencia estética en toda la web y plataformas digitales.

---

## 1. Colores de la Marca (Brand Colors)

Los colores principales de Oito reflejan una identidad moderna, limpia y altamente tecnológica. Se dividen en los siguientes códigos hexadecimales:

### Colores Clave
* **Verde Mint (Acento principal)**: `#09bc8a` (Definido como `--color-accent` / `--color-accent-rgb: 9, 188, 138`).
  * *Uso*: Botones de llamada a la acción (CTA), viñetas iluminadas, enlaces, estados hover, iconos de acento y viñetas activas.
* **Forest Green (Verde Oscuro principal)**: `#004346` (Definido como `--color-hero-bg` / `--color-hero-bg-rgb: 0, 67, 70`).
  * *Uso*: Fondo principal de secciones clave (ej. sección Hero), color secundario para logos, y color de trazo para recursos en fondos claros.
* **Forest Green Deep (Verde Oscuro Profundo)**: `#002a2c` o `#001a1c` (Definido como `--color-hero-bg-deep`).
  * *Uso*: Fondos oscuros de sección, tarjetas de información en modo oscuro, y el fondo base del previsualizador de hilos.
* **Cream Mint (Fondo Claro)**: `#f4fcf9` o `#eefbf6` (Definido como `--color-bg` o `--color-mint-light`).
  * *Uso*: Fondos de sección claros en contraste con recursos Forest Green.
* **Neon Mint (Brillo Extremo)**: `#00ffaa` (Opcional, usado en gradientes dinámicos del portafolio).

---

## 2. Tipografía Estándar (Typography Standards)

Oito utiliza una combinación de fuentes limpias y redondeadas de Google Fonts para combinar amigabilidad técnica con profesionalismo.

* **Outfit** (Heading principal de secciones y títulos de tarjetas):
  * *Uso*: `font-family: 'Outfit', sans-serif;` con pesos `800` (extra bold) o `600` (semi bold).
* **Varela Round** (Títulos de marca e isotipos tipográficos):
  * *Uso*: `font-family: 'Varela Round', sans-serif;` para títulos redondeados y amigables.
* **DM Sans** (Textos de cuerpo y descripciones):
  * *Uso*: `font-family: 'DM Sans', sans-serif;` con pesos `400` (regular) o `500` (medium).

---

## 3. Elementos Gráficos e Hilos (Threads)

El concepto visual de Oito gira en torno a **"hilos" (threads)** que fluyen y se entrelazan de forma orgánica, representando flujos de trabajo inteligentes y automatizaciones continuas.

### A. Fondo de Hilos WebGL (Generativo)
* Se implementa mediante un shader de fragmentos WebGL con **ruido Perlin 2D** que dibuja ondas paralelas difuminadas con transparencia nativa.
* **Fórmula visual**: Hilos en Verde Mint (`#09bc8a`) sobre fondo oscuro `#002a2c`, o hilos en Forest Green (`#004346`) sobre fondo blanco/claro.

### B. Figuras Vectoriales (Shapes)
Activos lineales de diseño compuestos por un contorno geométrico exterior principal, un halo concéntrico interior punteado (`stroke-dasharray="6,4"`) y un núcleo circular sólido centralizado, simbolizando flujos lógicos e integraciones inteligentes:
* **Red de Nodos Lineal**: Curvas que enlazan nodos de datos y procesamiento.
* **Matriz Concéntrica**: Círculos y guías radiales de visor de IA.
* **Nodo Circular**: Círculo exterior simétrico con núcleo central.
* **Nodo Triangular**: Triángulo equilátero exterior con núcleo central (disponible en versión angular o con esquinas redondeadas).
* **Nodo Cuadrado**: Cuadrado exterior con núcleo central (disponible en versión angular o con esquinas redondeadas).
* **Nodo Pentagonal**: Pentágono exterior de 5 lados con núcleo central (disponible en versión angular o con esquinas redondeadas).
* **Nodo Hexagonal**: Hexágono exterior de 6 lados con núcleo central (disponible en versión angular o con esquinas redondeadas).
* **Nodo Octogonal**: Octágono exterior de 8 lados con núcleo central (disponible en versión angular o con esquinas redondeadas).
* **Nodo Diamante**: Rombo exterior con núcleo central (disponible en versión angular o con esquinas redondeadas).

### C. Separadores de Sección (Dividers)
* **Onda Orgánica**: Onda de flujo continuo.
* **Línea Discontinua**: Segmentos técnicos con pequeños círculos de parada.
* **Hilo Doble**: Dos líneas cruzadas de frecuencia.
* **Separador de Nodo**: Líneas paralelas convergentes en un núcleo circular.

---

## 4. Estilos de Bullet Points (Glow Tech)

Viñetas optimizadas con sombreado de brillo (`box-shadow` o `drop-shadow`) en Verde Mint o Forest Green para destacar características del producto:

1. **Glow Circle**: Círculo de neón difuso (`width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 12px #09bc8a;`).
2. **Glow Ring**: Anillo con halo (`border: 2px solid #09bc8a; box-shadow: 0 0 10px #09bc8a;`).
3. **Glow Diamond**: Diamante rotado 45 grados (`transform: rotate(45deg); box-shadow: 0 0 12px #09bc8a;`).
4. **Glow Arrow**: Chevron de dirección (`filter: drop-shadow(0 0 4px #09bc8a);`).
5. **Glow Cross**: Cruz técnica de integración.
6. **Glow Sparkle**: Destello lineal para funciones automatizadas por IA.

---

## 5. Iconografía (Lucide Icons)

La interfaz de Oito utiliza una biblioteca ampliada de 78 iconos Lucide con un grosor de trazo más delgado y premium de `1.5px` (`stroke-width: 1.5px`):
* *IA & Automatización*: `Brain`, `Bot`, `Cpu`, `Sparkles`, `Zap`, `Workflow`, `GitMerge`, `Infinity`, `Network`, `Layers`, `Terminal`, `TerminalSquare`, `Code`, `Code2`.
* *Datos & Ecosistema*: `Database`, `Cable`, `Link2`, `Globe`, `FileText`, `FileCode`, `BarChart3`, `Activity`, `CheckCircle2`, `Cloud`, `CloudLightning`, `Server`, `HardDrive`, `Folder`.
* *Comunicación & CRM*: `Mail`, `MessageSquare`, `Users`, `TrendingUp`, `Calendar`, `ShieldCheck`, `Clock`, `Settings`, `Share2`, `Bell`, `Send`, `Smartphone`, `Laptop`, `Phone`, `UserCheck`, `UserPlus`, `UserX`.
* *Utilidades & UI*: `ArrowRight`, `ArrowLeft`, `ChevronRight`, `ChevronLeft`, `ChevronUp`, `ChevronDown`, `Plus`, `Minus`, `X`, `Check`, `Copy`, `Trash2`, `Edit3`, `Download`, `Upload`, `Search`, `SearchCode`, `Filter`, `HelpCircle`, `Home`, `LogOut`, `LogIn`, `ExternalLink`, `Lock`, `Unlock`, `Eye`, `EyeOff`, `Sun`, `Moon`, `Star`, `Award`, `Trophy`, `Briefcase`.
