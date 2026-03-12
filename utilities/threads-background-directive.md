# 🧵 Threads Background Visual Directive

This directive outlines the specific visual and technical requirements to reproduce the signature "Threads" background used in the **oito** brand identity. Use this to maintain 100% consistency across sales proposals, websites, and marketing materials.

## 🎨 Brand Color Palette
| Element | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Background** | `#004346` | Deep teal, solid base. |
| **Threads Accent** | `#09bc8a` | Vibrant mint green, used for wavy lines. |

## 🖼️ Visual Aesthetic Principles
- **Organic Flow**: Lines must be wavy and fluid, resembling digital fibers or silk threads moving in a breeze.
- **Depth of Field**: Incorporate a mix of sharp, high-contrast lines and softly blurred (out-of-focus) lines to create a sense of terminal depth.
- **Minimalist Structure**: The composition should be clean, with the threads concentrated on one side or flowing horizontally, leaving breathing room for text.
- **Gradient Glow**: Threads should have a subtle inner glow rather than flat colors.

---

## 🤖 Method A: AI Generation Prompt
Use the following prompt in high-end AI tools (Midjourney, DALL-E 3, Adobe Firefly):

> **Prompt:** "A premium abstract corporate background for a high-tech sales proposal. Background color: solid Deep Teal (#004346). Features elegant, wavy, flowing 'threads' or organic digital fibers sweeping horizontally across the canvas in vibrant Mint Green (#09bc8a). Lines vary in thickness, opacity, and focus (some sharp, some blurred) to create a sophisticated sense of depth. High resolution, 4K, minimalist, clean professional aesthetic. No text, no icons."

---

## 💻 Method B: Technical Implementation (Shader Logic)
To reproduce the background programmatically using WebGL (OGL/Three.js), use these parameters:

### **Fragment Shader Constants:**
```glsl
const int LINE_COUNT = 40;
const float LINE_WIDTH = 1.0;
const float BLUR_STRENGTH = 5.0;
const vec3 BG_COLOR = vec3(0.0, 0.263, 0.275); // #004346
const vec3 ACCENT_COLOR = vec3(0.035, 0.737, 0.541); // #09bc8a
```

### **Generation Logic:**
- **Noise Type**: 2D Perlin or Simplex noise.
- **Movement**: Time-based horizontal translation (`iTime`).
- **Amplitude**: Modulated by `smoothstep` to fade lines in/out at the edges.
- **Distance**: Vertical separation between threads should be varied to avoid a perfect grid.

---

## 📥 Asset Usage
- **Proposals**: Use as a full-page background for "Cover" and "Closing" slides.
- **Overlay**: When using text on top, ensure a minimum of 0.8 opacity for the text to maintain readability against the dark teal.
- **Orientation**: Landscape (16:9) is standard for sales decks.
