# Visual Foundation Implementation Plan (2a)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir el sitio de SPA a multipágina y montar el shell compartido (hilos de fondo,
header de vidrio, footer, CTA WhatsApp flotante) y el sistema de glassmorphism reutilizable.

**Architecture:** Next.js App Router con 3 rutas. `layout.tsx` aloja el shell compartido:
fondo `Threads` (WebGL, fijo), `Header` (nav por rutas), `Footer`, `StickyWhatsAppCTA`. Se
introduce un primitivo `GlassCard` y utilidades CSS `.glass` / `.glass-strong`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3, CSS Modules, GSAP, OGL (Threads).

## Global Constraints

- **Sin framework de tests** en el repo → ciclo de verificación = `npm run build` (debe pasar)
  + revisión visual en `npm run dev`. No añadir jest/vitest en esta iniciativa.
- **Hilos 🔒:** no eliminar ni reemplazar `Threads.tsx`. Se reutiliza como fondo.
- **TextType 🔒:** se conserva.
- **Receta de vidrio (verbatim):** `.glass` = `background: rgba(255,255,255,.035)`,
  `backdrop-filter: blur(7px) saturate(1.35)`, `border: 1px solid rgba(255,255,255,.14)`,
  `border-radius: 26px`. `.glass-strong` = `background: rgba(0,38,40,.20)`,
  `backdrop-filter: blur(11px) saturate(1.45)`, `border: 1px solid rgba(9,188,138,.26)`.
- **CTA único:** WhatsApp `https://wa.me/584241344659`. Sin formulario ni Cal.com.
- **Colores:** mint `#09bc8a`, forest `#004346`, forest-deep `#002a2c`, cream `#f4fcf9`.
- **Accesibilidad:** respetar `prefers-reduced-motion`; contraste AA; touch targets ≥44px.
- **Idioma de la UI:** español. **Rutas:** `/`, `/desarrollo-web`, `/automatizacion-ia`.

---

### Task 1: Sistema de vidrio y tokens en globals.css

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: clases utilitarias globales `.glass`, `.glass-strong`, `.glass-hover`, y bloque
  `@media (prefers-reduced-motion: reduce)`. Las consumen `GlassCard`, `Header`, y los componentes
  de cada página.

- [ ] **Step 1: Añadir variables y utilidades de vidrio**

Agregar al final de `src/app/globals.css`:

```css
/* ===== Glassmorphism (lenguaje visual oito) ===== */
.glass {
  background: rgba(255, 255, 255, 0.035);
  backdrop-filter: blur(7px) saturate(1.35);
  -webkit-backdrop-filter: blur(7px) saturate(1.35);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 26px;
  box-shadow: 0 8px 36px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.20);
}
.glass-strong {
  background: rgba(0, 38, 40, 0.20);
  backdrop-filter: blur(11px) saturate(1.45);
  -webkit-backdrop-filter: blur(11px) saturate(1.45);
  border: 1px solid rgba(9, 188, 138, 0.26);
  border-radius: 26px;
  box-shadow: 0 10px 44px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.16);
}
.glass-hover { transition: transform .25s ease, box-shadow .25s ease; }
.glass-hover:hover { transform: translateY(-6px); box-shadow: 0 18px 50px rgba(9,188,138,.20); }

/* En móvil, reducir nº de capas con blur costoso: fallback sólido translúcido */
@media (max-width: 768px) {
  .glass { backdrop-filter: blur(5px) saturate(1.2); -webkit-backdrop-filter: blur(5px) saturate(1.2); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
  .glass-hover:hover { transform: none; }
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: compila sin errores de CSS.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(visual): add glassmorphism utilities and reduced-motion handling"
```

---

### Task 2: Primitivo GlassCard

**Files:**
- Create: `src/components/ui/GlassCard.tsx`

**Interfaces:**
- Produces: `GlassCard` — `({ variant?: 'glass' | 'strong', hover?: boolean, as?: keyof JSX.IntrinsicElements, className?: string, children, ...rest }) => JSX.Element`.
  Lo consumen `TwoPillars`, `FeaturedCases`, `CaseStudy`, `ServicesGrid`, etc. (planes siguientes).

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/ui/GlassCard.tsx
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type GlassCardProps = {
  variant?: 'glass' | 'strong';
  hover?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function GlassCard({
  variant = 'glass',
  hover = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={clsx(variant === 'strong' ? 'glass-strong' : 'glass', hover && 'glass-hover', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: compila; tipos OK (`clsx` ya está en dependencias).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GlassCard.tsx
git commit -m "feat(visual): add reusable GlassCard primitive"
```

---

### Task 3: Shell compartido en layout.tsx (fondo de hilos + estructura)

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/ThreadsBackground.tsx`
- Modify: `src/app/page.tsx` (quitar Threads/Header/Footer que se mueven al shell — se reescribe en Plan 2b; aquí solo se evita doble render)

**Interfaces:**
- Consumes: `Threads` (existente), `Header`, `Footer`, `StickyWhatsAppCTA` (Tasks 4-6).
- Produces: layout con fondo de hilos fijo en todas las rutas.

- [ ] **Step 1: Crear contenedor de fondo de hilos (client)**

```tsx
// src/components/ThreadsBackground.tsx
'use client';
import Threads from './Threads';

export default function ThreadsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Threads amplitude={1} distance={0} enableMouseInteraction={false} isLoaded={true} />
    </div>
  );
}
```

> Nota: `enableMouseInteraction={false}` como fondo global por rendimiento; el Home podrá montar
> una instancia interactiva propia en su hero (Plan 2b). Verificar la firma real de props de
> `Threads.tsx` y ajustar si difiere.

- [ ] **Step 2: Montar el shell en layout.tsx**

Reemplazar el `return` de `src/app/layout.tsx` por:

```tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWhatsAppCTA from '@/components/StickyWhatsAppCTA';
import ThreadsBackground from '@/components/ThreadsBackground';
// ...fuentes y metadata existentes...

return (
  <html lang="es">
    <body className={`${varelaRound.variable} ${dmSans.variable} ${playfair.variable} antialiased`}>
      <ThreadsBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        {children}
        <Footer />
      </div>
      <StickyWhatsAppCTA />
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);
```

- [ ] **Step 3: Evitar doble render en page.tsx**

En `src/app/page.tsx`, eliminar los renders de `<Threads/>`, `<Header/>`, `<Footer/>` (ahora viven
en el layout). Dejar solo las secciones de contenido del Home. *(El Home completo se reescribe en
Plan 2b; este paso solo previene duplicados para que el build/preview funcione.)*

- [ ] **Step 4: Verificar build y visual**

Run: `npm run build` — Expected: pasa.
Run: `npm run dev` y abrir `/` — Expected: hilos de fondo visibles en toda la página; sin
duplicados de header/footer.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/ThreadsBackground.tsx src/app/page.tsx
git commit -m "feat(visual): shared app shell with fixed threads background"
```

---

### Task 4: StickyWhatsAppCTA (botón flotante persistente)

**Files:**
- Create: `src/components/StickyWhatsAppCTA.tsx`
- Create: `src/components/StickyWhatsAppCTA.module.css`

**Interfaces:**
- Consumes: `WhatsAppIcon` (existente).
- Produces: `StickyWhatsAppCTA` — botón flotante fijo abajo-derecha, enlace a WhatsApp.

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/StickyWhatsAppCTA.tsx
import WhatsAppIcon from './WhatsAppIcon';
import styles from './StickyWhatsAppCTA.module.css';

export default function StickyWhatsAppCTA() {
  return (
    <a
      href="https://wa.me/584241344659"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon size={24} />
      <span className={styles.label}>Hablemos</span>
    </a>
  );
}
```

- [ ] **Step 2: Estilos (≥44px, seguro en safe-area)**

```css
/* src/components/StickyWhatsAppCTA.module.css */
.fab {
  position: fixed; right: 18px; bottom: calc(18px + env(safe-area-inset-bottom));
  z-index: 50; display: inline-flex; align-items: center; gap: 8px;
  min-height: 52px; padding: 0 18px; border-radius: 50px;
  background: #25d366; color: #fff; font-weight: 700; text-decoration: none;
  box-shadow: 0 6px 22px rgba(0,0,0,.30);
}
.label { font-family: var(--font-varela-round), sans-serif; font-size: 15px; }
@media (max-width: 480px) { .label { display: none; } .fab { padding: 0 14px; } }
```

- [ ] **Step 3: Verificar build y visual**

Run: `npm run build` — Expected: pasa.
Visual: el botón aparece fijo en todas las páginas, tappable, sin tapar contenido clave.

- [ ] **Step 4: Commit**

```bash
git add src/components/StickyWhatsAppCTA.tsx src/components/StickyWhatsAppCTA.module.css
git commit -m "feat(visual): add sticky WhatsApp floating CTA"
```

---

### Task 5: Header (nav por rutas, vidrio, CTA, menú móvil, estado activo)

**Files:**
- Rewrite: `src/components/Header.tsx`
- Modify: `src/components/Header.module.css` (añadir/ajustar; conservar lo reutilizable)

**Interfaces:**
- Consumes: `usePathname` (next/navigation), clase `.glass`.
- Produces: `Header` sin props, navegación por `<Link>`, CTA WhatsApp.

- [ ] **Step 1: Reescribir Header con rutas**

```tsx
// src/components/Header.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import styles from './Header.module.css';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/desarrollo-web', label: 'Desarrollo' },
  { href: '/automatizacion-ia', label: 'Automatización' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={clsx(styles.header, 'glass')}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="oito inicio">
          <Image src="/oito_logo_2.png" alt="oito" width={75} height={35} priority />
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú" aria-expanded={open}
        >
          <span /><span /><span />
        </button>
        <nav className={clsx(styles.nav, open && styles.open)}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(styles.navLink, pathname === l.href && styles.active)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/584241344659"
            target="_blank" rel="noopener noreferrer"
            className={styles.cta}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Ajustar estilos**

En `Header.module.css`: hacer `.header` sticky (`position: sticky; top: 14px; z-index: 40;`
margen centrado, max-width). Añadir `.active { color: var(--color-accent); }`. Conservar estilos
de hamburguesa/menú móvil existentes; eliminar reglas que dependían de `scrolled`/`menuOpen` por
scroll si ya no aplican. CTA con fondo mint, texto forest-deep, ≥44px.

- [ ] **Step 3: Verificar build y navegación**

Run: `npm run build` — Expected: pasa.
Visual: header de vidrio; clicar enlaces navega entre rutas (las páginas de servicio pueden ser
stubs temporales); el enlace activo se resalta; menú móvil abre/cierra.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/components/Header.module.css
git commit -m "feat(visual): rebuild header with route nav, glass, WhatsApp CTA"
```

---

### Task 6: Footer (links multipágina, posicionamiento nuevo)

**Files:**
- Rewrite: `src/components/Footer.tsx`
- Modify: `src/components/Footer.module.css` (ajustes menores)

**Interfaces:**
- Consumes: `WhatsAppIcon`, íconos Lucide existentes, `<Link>`.
- Produces: `Footer` con enlaces a las 3 rutas y datos de contacto.

- [ ] **Step 1: Reescribir Footer**

Reemplazar enlaces de anclas por rutas y actualizar copy. Columnas:
- **Marca:** logo `oito` + tagline: *"oito lo hace por ti. Construimos y automatizamos para pymes de LatAm."*
- **Explorar:** `<Link>` a `/`, `/desarrollo-web`, `/automatizacion-ia`.
- **Contacto:** `info@oitove.com` (mailto) + botón "Hablemos" → WhatsApp.
- **Síguenos:** WhatsApp (`https://wa.me/584241344659`), Instagram (`https://www.instagram.com/oito.vee/`).
  Quitar enlaces `#` muertos de LinkedIn/Twitter (o dejar solo los reales).
- **Bottom:** `© {año} oito` + *"Nacimos en Venezuela, trabajamos para toda LatAm."*

```tsx
// fragmento clave: navegación por rutas
import Link from 'next/link';
// ...
<li><Link href="/desarrollo-web" className={styles.link}>Desarrollo web</Link></li>
<li><Link href="/automatizacion-ia" className={styles.link}>Automatización & IA</Link></li>
```

- [ ] **Step 2: Verificar build y visual**

Run: `npm run build` — Expected: pasa.
Visual: footer con enlaces que navegan; sin enlaces `#` muertos; tagline/origen nuevos.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.module.css
git commit -m "feat(visual): rebuild footer with multipage links and new positioning"
```

---

### Task 7: Stubs de rutas de servicio (para navegación funcional)

**Files:**
- Create: `src/app/desarrollo-web/page.tsx`
- Create: `src/app/automatizacion-ia/page.tsx`

**Interfaces:**
- Produces: rutas válidas que renderizan un placeholder mínimo (se completan en Planes 2c/2d).

- [ ] **Step 1: Crear stubs**

```tsx
// src/app/desarrollo-web/page.tsx
export default function DesarrolloWebPage() {
  return <main style={{ minHeight: '60vh', padding: '120px 24px', color: '#fff' }}>
    <h1>Desarrollo web & software</h1>
    <p>Contenido en construcción (Plan 2c).</p>
  </main>;
}
```

```tsx
// src/app/automatizacion-ia/page.tsx
export default function AutomatizacionIAPage() {
  return <main style={{ minHeight: '60vh', padding: '120px 24px', color: '#fff' }}>
    <h1>Automatización & IA</h1>
    <p>Contenido en construcción (Plan 2d).</p>
  </main>;
}
```

- [ ] **Step 2: Verificar build y navegación**

Run: `npm run build` — Expected: 3 rutas compilan.
Visual: navegar entre Inicio / Desarrollo / Automatización funciona end-to-end con el shell.

- [ ] **Step 3: Commit**

```bash
git add src/app/desarrollo-web/page.tsx src/app/automatizacion-ia/page.tsx
git commit -m "feat(visual): add service route stubs for working navigation"
```

---

## Self-Review

- **Cobertura del spec (§2-§4):** arquitectura multipágina (Tasks 3,7), shell compartido
  (Task 3), sistema de vidrio (Tasks 1,2), Header (5), Footer (6), StickyCTA (4). ✅
  Pendiente para planes siguientes: heroes, secciones de contenido, casos, limpieza form/Cal.com.
- **Placeholders:** los "stubs" (Task 7) son intencionales y se completan en 2c/2d; no son
  placeholders de plan.
- **Consistencia de tipos:** `GlassCard` (Task 2) expone `variant: 'glass'|'strong'`, usado
  consistentemente; clases `.glass`/`.glass-strong` definidas en Task 1 y consumidas en 2 y 5.
- **Verificar antes de codear:** confirmar la firma real de props de `Threads.tsx` (Task 3 Step 1).

## Próximos planes

2b Home · 2c /desarrollo-web · 2d /automatizacion-ia · 2e Limpieza (eliminar `actions.ts`,
formulario, Cal.com; depurar dependencias).
