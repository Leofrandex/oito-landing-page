# Página /desarrollo-web — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la página `/desarrollo-web` (hoy stub) con sus 6 secciones, reutilizando los átomos y creando 4 componentes de sección propios de Desarrollo.

**Architecture:** 4 componentes nuevos (`DevServices`, `DevProcess`, `DevCases`, `DevTech`) que componen los átomos existentes (`ServiceHero`, `FinalCTA`, `CaseStudy`, `CaseDiagrams`, `Button`, badge, `Reveal`), ensamblados en `page.tsx`. Sin tocar la página de Automatización. Presentacional; verificación por build + captura visual.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, lucide-react.

## Global Constraints

- **Visual = design-system:** badges §4 (clase global `badge`), botones §3 (`<Button>`), glass (`glass-light` en tarjetas sobre claro), Outfit titulares (h2=600, h3 tarjeta=500 por regla global), DM Sans cuerpo, mint sobre oscuro / **`--mint-ink` para texto/acento mint sobre claro**, wordmark "oito" en Varela Round (mint siempre).
- **Ritmo:** `page.tsx` en orden Hero(`section-dark` interno) · DevServices(`section-light`) · DevProcess(`section-dark`) · DevCases(`section-light`) · DevTech(`section-dark`) · FinalCTA(`section-dark`).
- **Patrón de sección compartido** (como `FeaturedCases`): `<section className="section-{light|dark} styles.section">` → `<Reveal className={styles.inner}>` → `<header>` con `<p className="badge styles.eyebrow" style={{transitionDelay:'0ms'}}>` + `<h2 styles.title>` + (opcional `<p styles.lede>`) → contenido. Grupo de reveal en CSS: `.eyebrow,.title,… { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s cubic-bezier(.22,1,.36,1) }` y `.inner[data-revealed] .eyebrow,… { opacity:1; transform:none }` + bloque `prefers-reduced-motion` que las deja visibles.
- **UX (ui-ux-pro-max):** un mensaje por tarjeta; hover con feedback (`glass-hover` o lift sutil) + `cursor` donde sea clickeable; gap ≥ 8px; stack en móvil; sin CLS (reservar aspecto de media).
- **No pushear.** Verificación: `npm run build` limpio + captura visual (controlador); no levantar servidores en subagentes. No tests unitarios (UI presentacional).

**Diagramas de caso disponibles** (`src/components/CaseDiagrams.tsx`): `RouteDiagram`, `ChainDiagram`, `FunnelDiagram`, `FanoutDiagram`, `ProspectDiagram`.
**Átomos y sus props:** `ServiceHero {title:ReactNode, subtitle:string, rotating:string[]}` · `FinalCTA {title:ReactNode, lede:string}` · `CaseStudy {pillar:'Desarrollo'|'Automatización', title, description, tags:string[], diagram:ReactNode, reverse?:boolean}`.

---

### Task 1: `DevCases` (sección de casos)

**Files:** Create `src/components/DevCases.tsx`, `src/components/DevCases.module.css`.

**Interfaces:** Produces `<DevCases />` (sin props). Consume `CaseStudy`, `CaseDiagrams`, `Reveal`.

Es un clon de `FeaturedCases` con los 3 casos de Desarrollo y SIN el footer de CTAs "ver todo".

- [ ] **Step 1: `DevCases.module.css`**

Copiar el contenido de `src/components/FeaturedCases.module.css` a `src/components/DevCases.module.css`
**tal cual** (mismas clases: `.section, .inner, .head, .eyebrow, .title, .brand, .lede, .rows, .row`,
grupos de reveal y responsive). Eliminar solo las reglas de `.ctas` (no se usan aquí).

- [ ] **Step 2: `DevCases.tsx`**

```tsx
import Reveal from './ui/Reveal';
import CaseStudy, { type CaseStudyData } from './CaseStudy';
import { RouteDiagram, ProspectDiagram, ChainDiagram } from './CaseDiagrams';
import styles from './DevCases.module.css';

/* Anonimizado por sector (CLAUDE.md §7). Refs internas: Ponce-Benzo, Hospitalar, Hospiwaste. */
const CASES: CaseStudyData[] = [
  {
    pillar: 'Desarrollo',
    title: 'App de rastreo de fuerza de campo',
    description:
      'Sistema dual para una distribuidora farmacéutica: app móvil nativa con GPS continuo en segundo plano, modo offline-first y cámara anti-fraude (solo fotos en vivo), más un panel web supervisor con rutas en tiempo real, mapas de calor y asignación de tareas.',
    tags: ['App móvil', 'Sistema a medida', 'Dashboard'],
    diagram: <RouteDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'Plataforma interna de operaciones',
    description:
      'Plataforma web a medida para un distribuidor de equipos médicos: centraliza servicio técnico (órdenes correctivas, preventivas y predictivas), logística, cobranzas y compras, con importación masiva desde SAP, firmas digitales y un portal para sus clientes.',
    tags: ['Sistema a medida', 'Dashboard', 'Portal de clientes'],
    diagram: <ProspectDiagram />,
  },
  {
    pillar: 'Desarrollo',
    title: 'App de trazabilidad de desechos peligrosos',
    description:
      'PWA para una planta de tratamiento de desechos hospitalarios: gestiona el ciclo de vida de los contenedores con puntos de control en ruta, pesaje con peso neto facturable, evidencia fotográfica y firmas, generando en automático los reportes PDF que exige la regulación.',
    tags: ['PWA', 'Sistema a medida', 'Dashboard'],
    diagram: <ChainDiagram />,
  },
];

export default function DevCases() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Casos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Proyectos que hemos construido
          </h2>
        </header>

        <div className={styles.rows}>
          {CASES.map((c, i) => (
            <div key={c.title} className={styles.row} style={{ transitionDelay: `${200 + i * 110}ms` }}>
              <CaseStudy {...c} reverse={i % 2 === 1} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 3: Build** — `npm run build` → `✓ Compiled successfully`, 0 errores.
- [ ] **Step 4: Commit**
```bash
git add src/components/DevCases.tsx src/components/DevCases.module.css
git commit -m "feat(desarrollo): sección DevCases (3 casos de desarrollo anonimizados)"
```

---

### Task 2: `DevServices` (sección "Qué construimos")

**Files:** Create `src/components/DevServices.tsx`, `src/components/DevServices.module.css`.

**Interfaces:** Produces `<DevServices />` (sin props).

Sección clara con 3 tarjetas de servicio (ícono → título → descripción), superficie `glass-light` + hover.

- [ ] **Step 1: `DevServices.tsx`**

```tsx
import { Globe, LayoutDashboard, Smartphone, type LucideIcon } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './DevServices.module.css';

const SERVICES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Globe,
    title: 'Sitios web & landing pages',
    body: 'Páginas rápidas, bonitas y pensadas para convertir. Tu mejor primera impresión online.',
  },
  {
    icon: LayoutDashboard,
    title: 'Apps web & sistemas a medida',
    body: 'Plataformas, paneles y software interno hechos a la medida de tu operación. Lo que necesitas, sin atarte a herramientas genéricas.',
  },
  {
    icon: Smartphone,
    title: 'Apps móviles',
    body: 'Aplicaciones para iOS y Android que ponen tu negocio en el bolsillo de tus clientes.',
  },
];

export default function DevServices() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Servicios
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Qué construimos
          </h2>
        </header>
        <div className={styles.grid}>
          {SERVICES.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className={`glass-light ${styles.card}`}
              style={{ transitionDelay: `${180 + i * 110}ms` }}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon size={26} strokeWidth={1.5} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardBody}>{body}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```
Nota de copy: badge = "Servicios", `<h2>` = "Qué construimos" (evita duplicar el mismo texto).

- [ ] **Step 2: `DevServices.module.css`**

```css
.section { position: relative; padding: clamp(5rem, 10vw, 8rem) 1.5rem; }
.inner { max-width: 1080px; margin: 0 auto; text-align: center; }
.head { margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
.title { font-size: var(--text-h2); line-height: 1.15; color: var(--ink); margin-top: 0.9rem; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; text-align: left; }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
.card {
  display: flex; flex-direction: column; gap: 0.9rem;
  padding: 1.9rem 1.7rem; border-radius: var(--radius-lg, 22px);
  transition: transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.25s ease;
}
.card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,67,70,0.10); }
.iconWrap {
  display: inline-flex; align-items: center; justify-content: center;
  width: 46px; height: 46px; border-radius: 13px;
  background: rgba(9,188,138,0.12); border: 1px solid rgba(9,188,138,0.30); color: var(--mint-ink);
}
.cardTitle { font-size: 1.2rem; color: var(--ink); }
.cardBody { font-size: 1rem; line-height: 1.6; color: var(--ink-soft); }
/* reveal */
.eyebrow, .title, .card { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1); }
.inner[data-revealed] .eyebrow, .inner[data-revealed] .title, .inner[data-revealed] .card { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .eyebrow, .title, .card { opacity: 1; transform: none; transition: none; } }
```

- [ ] **Step 3: Build** — `npm run build` limpio.
- [ ] **Step 4: Commit**
```bash
git add src/components/DevServices.tsx src/components/DevServices.module.css
git commit -m "feat(desarrollo): sección DevServices (3 servicios)"
```

---

### Task 3: `DevProcess` (sección "De la idea al producto")

**Files:** Create `src/components/DevProcess.tsx`, `src/components/DevProcess.module.css`.

Sección oscura con 4 pasos numerados (nodo mint + título + descripción). Basar el lenguaje visual en `HowWeWorkHome` (nodos numerados sobre oscuro).

- [ ] **Step 1: `DevProcess.tsx`**

```tsx
import Reveal from './ui/Reveal';
import styles from './DevProcess.module.css';

const STEPS: { n: string; title: string; body: string }[] = [
  { n: '1', title: 'Descubrimiento', body: 'Entendemos qué necesitas y para quién.' },
  { n: '2', title: 'Diseño', body: 'Definimos la experiencia y la interfaz antes de programar.' },
  { n: '3', title: 'Desarrollo', body: 'Construimos con tecnología moderna, en entregas claras.' },
  { n: '4', title: 'Entrega & soporte', body: 'Lanzamos, medimos y te acompañamos.' },
];

export default function DevProcess() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Cómo trabajamos
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            De la idea al producto
          </h2>
        </header>
        <ol className={styles.steps}>
          {STEPS.map((s, i) => (
            <li key={s.n} className={styles.step} style={{ transitionDelay: `${180 + i * 110}ms` }}>
              <span className={styles.node} aria-hidden="true">{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: `DevProcess.module.css`**

```css
.section { position: relative; padding: clamp(5rem, 10vw, 8rem) 1.5rem; }
.inner { max-width: 1080px; margin: 0 auto; text-align: center; }
.head { margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
.title { font-size: var(--text-h2); line-height: 1.15; color: var(--on-dark); text-shadow: 0 2px 18px rgba(0,20,22,0.5); margin-top: 0.9rem; }
.steps { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; padding: 0; margin: 0; text-align: center; }
@media (max-width: 860px) { .steps { grid-template-columns: 1fr 1fr; } }
@media (max-width: 480px) { .steps { grid-template-columns: 1fr; } }
.step { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
.node {
  display: inline-flex; align-items: center; justify-content: center;
  width: 46px; height: 46px; border-radius: 50%;
  background: rgba(9,188,138,0.14); border: 1px solid rgba(9,188,138,0.4);
  color: var(--mint); font-family: var(--font-outfit), sans-serif; font-weight: 700;
  box-shadow: 0 0 20px rgba(9,188,138,0.25); margin-bottom: 0.4rem;
}
.stepTitle { font-size: 1.15rem; color: var(--on-dark); }
.stepBody { font-size: 0.98rem; line-height: 1.55; color: var(--on-dark-soft); max-width: 220px; }
/* reveal */
.eyebrow, .title, .step { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1); }
.inner[data-revealed] .eyebrow, .inner[data-revealed] .title, .inner[data-revealed] .step { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .eyebrow, .title, .step { opacity: 1; transform: none; transition: none; } }
```

- [ ] **Step 3: Build** — limpio. **Step 4: Commit**
```bash
git add src/components/DevProcess.tsx src/components/DevProcess.module.css
git commit -m "feat(desarrollo): sección DevProcess (4 pasos)"
```

---

### Task 4: `DevTech` (sección "Tecnologías")

**Files:** Create `src/components/DevTech.tsx`, `src/components/DevTech.module.css`.

Sección oscura: stack por categoría; cada tecnología como chip (§4 tag de stack) sobre oscuro.

- [ ] **Step 1: `DevTech.tsx`**

```tsx
import Reveal from './ui/Reveal';
import styles from './DevTech.module.css';

const GROUPS: { label: string; items: string[] }[] = [
  { label: 'Web', items: ['Next.js', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Query', 'React Hook Form', 'Zod', 'Recharts', 'Leaflet'] },
  { label: 'Móvil & PWA', items: ['React Native (Expo)', 'PWA (next-pwa)', 'Geolocalización', 'Cámara', 'Offline (SQLite)'] },
  { label: 'Backend & datos', items: ['Supabase', 'PostgreSQL', 'PostGIS', 'Auth', 'RLS', 'Storage'] },
  { label: 'Documentos & extras', items: ['Generación de PDF', 'Firmas electrónicas', 'Importación Excel/SAP', 'Mapas y geolocalización'] },
];

export default function DevTech() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Tecnologías
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Construido con tecnología de primera
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '140ms' }}>
            Usamos herramientas modernas y probadas para que tu producto sea rápido, seguro y escalable.
          </p>
        </header>
        <div className={styles.groups}>
          {GROUPS.map((g, i) => (
            <div key={g.label} className={styles.group} style={{ transitionDelay: `${200 + i * 90}ms` }}>
              <h3 className={styles.groupLabel}>{g.label}</h3>
              <ul className={styles.chips}>
                {g.items.map((t) => (
                  <li key={t} className={styles.chip}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: `DevTech.module.css`**

```css
.section { position: relative; padding: clamp(5rem, 10vw, 8rem) 1.5rem; }
.inner { max-width: 980px; margin: 0 auto; text-align: center; }
.head { margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
.title { font-size: var(--text-h2); line-height: 1.15; color: var(--on-dark); text-shadow: 0 2px 18px rgba(0,20,22,0.5); margin-top: 0.9rem; }
.lede { margin: 1rem auto 0; max-width: 560px; font-size: 1.05rem; line-height: 1.6; color: var(--on-dark-soft); }
.groups { display: flex; flex-direction: column; gap: 1.75rem; text-align: left; }
.group { display: grid; grid-template-columns: 160px 1fr; gap: 1rem; align-items: start; }
@media (max-width: 640px) { .group { grid-template-columns: 1fr; gap: 0.6rem; } }
.groupLabel { font-family: var(--font-outfit), sans-serif; font-weight: 600; font-size: 1rem; color: var(--mint); padding-top: 0.35rem; }
.chips { list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 0; }
.chip {
  display: inline-flex; align-items: center; height: 32px; padding: 0 12px; border-radius: 999px;
  font-family: var(--font-dm-sans), sans-serif; font-weight: 500; font-size: 0.85rem;
  color: var(--on-dark); background: rgba(0,38,40,0.42); border: 1px solid rgba(9,188,138,0.28);
  backdrop-filter: blur(8px); white-space: nowrap;
}
/* reveal */
.eyebrow, .title, .lede, .group { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1); }
.inner[data-revealed] .eyebrow, .inner[data-revealed] .title, .inner[data-revealed] .lede, .inner[data-revealed] .group { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .eyebrow, .title, .lede, .group { opacity: 1; transform: none; transition: none; } }
```

- [ ] **Step 3: Build** — limpio. **Step 4: Commit**
```bash
git add src/components/DevTech.tsx src/components/DevTech.module.css
git commit -m "feat(desarrollo): sección DevTech (stack por categoría)"
```

---

### Task 5: Ensamblar `page.tsx` + verificación

**Files:** Modify `src/app/desarrollo-web/page.tsx`.

- [ ] **Step 1: Reemplazar el stub por el ensamblaje**

```tsx
import ServiceHero from '@/components/ServiceHero';
import DevServices from '@/components/DevServices';
import DevProcess from '@/components/DevProcess';
import DevCases from '@/components/DevCases';
import DevTech from '@/components/DevTech';
import FinalCTA from '@/components/FinalCTA';

export const metadata = {
  title: 'Desarrollo web, apps y software a medida | oito',
  description:
    'Construimos sitios web, apps móviles y sistemas a medida para pymes de LatAm. De la idea al producto, rápido y bien hecho. oito lo hace por ti.',
};

export default function DesarrolloWebPage() {
  return (
    <main>
      <ServiceHero
        title={<>Construimos el <span className="accent-mint">software</span> que tu empresa necesita</>}
        subtitle="Sitios web, apps móviles y sistemas a medida. De la idea al producto, rápido y bien hecho."
        rotating={['tu página web', 'tu app', 'tu sistema interno', 'tu dashboard']}
      />
      <DevServices />
      <DevProcess />
      <DevCases />
      <DevTech />
      <FinalCTA
        title={<>¿Tienes un <span className="accent-mint">proyecto</span> en mente?</>}
        lede="Cuéntanos qué necesitas construir. Te respondemos por WhatsApp, sin compromiso."
      />
    </main>
  );
}
```

- [ ] **Step 2: Build** — `npm run build` → limpio; la ruta `/desarrollo-web` deja de ser stub.

- [ ] **Step 3: Verificación visual (controlador)** — `npx next start` + captura de `/desarrollo-web`. Checklist:
  - [ ] 6 secciones en orden; ritmo `D·L·D·L·D·D`.
  - [ ] Hero con TextType rotando; "software" en mint.
  - [ ] Servicios: 3 tarjetas glass con hover; íconos mint-ink; badge "Servicios".
  - [ ] Proceso: 4 pasos con nodos numerados sobre oscuro.
  - [ ] Casos: 3 tarjetas `CaseStudy` con diagrama, alternadas, badges/acentos mint-ink sobre claro.
  - [ ] Tecnologías: chips por categoría sobre oscuro; label mint.
  - [ ] FinalCTA con "proyecto" en mint + botón WhatsApp.
  - [ ] Foco de teclado (anillo mint) en CTAs/links; sin CLS.

- [ ] **Step 4: Commit**
```bash
git add src/app/desarrollo-web/page.tsx
git commit -m "feat(desarrollo): ensamblar página /desarrollo-web (6 secciones)"
```

## Notas de cierre

- Al terminar, correr el **gate de revisión UX** (`ui-ux-pro-max` + `frontend-design`) sobre la página nueva.
- Decisión de copy menor resuelta en Task 2: badge de Servicios dice "Servicios" (el `<h2>` dice "Qué construimos") para no duplicar texto.
- Casos anonimizados; el de desechos tiene capturas reales → ascender a captura cuando haya permiso.
