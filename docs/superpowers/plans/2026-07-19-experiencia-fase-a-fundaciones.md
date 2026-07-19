# Experiencia inmersiva v3 — Fase A: Fundaciones y recomposición

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar la landing única `/` montada con las 11 secciones del spec (usando los componentes actuales como base), header con anclas + link a /desarrollo-web, ruta /automatizacion-ia desenlazada y todo el trabajo pendiente commiteado.

**Architecture:** Fase de recomposición sin construir componentes nuevos: se reordena `page.tsx` con los componentes maduros existentes, se convierte el header a navegación por anclas y se desenlaza la ruta de automatización (su contenido se fusiona en `/`). Los componentes que el spec reemplaza en fases B-D (SolutionsGrid, RoiCalculator, CasesSpotlight) se montan tal cual como placeholders funcionales.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules. Sin framework de tests: la verificación es `npm run lint` + `npm run build` + revisión visual en `npm run dev`.

**Spec:** `docs/superpowers/specs/2026-07-19-experiencia-inmersiva-design.md`

## Global Constraints

- Todo el copy en español, sin em dash (`—`); contacto solo WhatsApp (`WHATSAPP_URL` de `src/lib/constants`).
- **Desenlazar ≠ borrar:** los componentes `TwoPillars`, `FeaturedCases` (tras Fase D), `HowWeWorkHome`, `AutomationCases`, `ServiceHero` y todos los `Dev*` se PRESERVAN en `src/components/` aunque dejen de renderizarse.
- `docs/design-system.md` manda en valores visuales. No fusionar a `main`.
- La ruta `/desarrollo-web` SE MANTIENE viva (decisión 2026-07-19). Solo `/automatizacion-ia` se desenlaza.
- Cada task termina con lint + build en verde y un commit.

---

### Task 1: Commit del trabajo pendiente en el working tree

**Files:**
- Modify: `.gitignore` (añadir `.vscode/`)
- Commit (sin editar): `CLAUDE.md`, `docs/design-system.md`, `src/app/globals.css`, `src/app/page.tsx` (estado actual), `src/app/design-system/page.tsx`, todos los `src/components/*` modificados, `src/components/EasyStart.*`, `src/components/Faq.*` (nuevos), `.claude/` (hooks del proyecto)

**Interfaces:**
- Produces: working tree limpio; el sistema liquid glass y los componentes `EasyStart`/`Faq` quedan versionados y disponibles para las tasks siguientes.

- [ ] **Step 1: Revisar qué hay pendiente**

Run: `git status --short`
Expected: los modificados/nuevos listados arriba (liquid glass en CSS, EasyStart, Faq, docs) y los untracked `.claude/`, `.vscode/`.

- [ ] **Step 2: Ignorar `.vscode/`**

Añadir al final de `.gitignore`:

```gitignore

# editor local
.vscode/
```

- [ ] **Step 3: Verificar que el estado pendiente compila**

Run: `npm run lint && npm run build`
Expected: ambos terminan sin errores. Si el build falla, ese arreglo es parte de esta task (el trabajo viejo no puede commitearse roto); anotar el fix en el commit.

- [ ] **Step 4: Commit del trabajo visual pendiente**

```bash
git add CLAUDE.md docs/design-system.md src/ .gitignore
git commit -m "feat(visual): liquid glass + rim suave, EasyStart y Faq (trabajo pendiente de sesiones 2026-07-08)"
```

- [ ] **Step 5: Commit de los hooks del proyecto**

```bash
git add .claude/
git commit -m "chore: hooks de proyecto (cierre V.O.L.T.)"
```

Nota: si `.claude/` contiene `settings.local.json` u otros archivos personales, excluirlos añadiéndolos a `.gitignore` en este mismo paso (solo se versionan hooks y settings compartidos).

- [ ] **Step 6: Verificar working tree limpio**

Run: `git status --short`
Expected: sin salida.

---

### Task 2: Recomponer `/` con el orden de las 11 secciones

**Files:**
- Modify: `src/app/page.tsx` (reemplazo completo)
- Modify: `src/app/globals.css` (utilidad de anclas)

**Interfaces:**
- Consumes: componentes existentes ya commiteados en Task 1.
- Produces: los ids de ancla `#casos`, `#soluciones`, `#calculadora`, `#faq` que Task 3 (header) enlaza. La sección puente dev NO se monta aquí (llega en Fase B); FAQ ya cubre la mención de desarrollo.

- [ ] **Step 1: Reemplazar `src/app/page.tsx` completo**

```tsx
import Hero from '@/components/Hero';
import WhyOito from '@/components/WhyOito';
import AutomationPillars from '@/components/AutomationPillars';
import FeaturedCases from '@/components/FeaturedCases';
import SolutionsGrid from '@/components/SolutionsGrid';
import RoiCalculator from '@/components/RoiCalculator';
import Methodology from '@/components/Methodology';
import SocialProof from '@/components/SocialProof';
import BuiltWith from '@/components/BuiltWith';
import Faq from '@/components/Faq';
import EasyStart from '@/components/EasyStart';
import FinalCTA from '@/components/FinalCTA';

/* Orden de las 11 secciones del spec 2026-07-19 (§3).
 * FeaturedCases, SolutionsGrid y RoiCalculator son la base actual que las
 * fases B-D reemplazan por los patrones nuevos. El puente dev se añade en Fase B. */
export default function Home() {
  return (
    <main>
      <Hero />
      <WhyOito />
      <AutomationPillars />
      <div id="casos" className="anchor-target">
        <FeaturedCases />
      </div>
      <div id="soluciones" className="anchor-target">
        <SolutionsGrid />
      </div>
      <div id="calculadora" className="anchor-target">
        <RoiCalculator />
      </div>
      <Methodology />
      <SocialProof />
      <BuiltWith />
      <div id="faq" className="anchor-target">
        <Faq />
      </div>
      <EasyStart />
      <FinalCTA />
    </main>
  );
}
```

Nota: `TwoPillars` y `HowWeWorkHome` salen del render (los archivos se preservan).

- [ ] **Step 2: Añadir la utilidad de anclas a `src/app/globals.css`**

Al final del archivo:

```css
/* Anclas de sección: compensa el header fijo y da scroll suave */
.anchor-target {
  scroll-margin-top: 90px;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

Si `html { scroll-behavior }` ya existe (Lenis puede manejar el smooth scroll), no duplicar: dejar solo `.anchor-target` y la regla de reduced-motion.

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Revisión visual**

Run: `npm run dev` y abrir `http://localhost:3000/`.
Expected: las secciones aparecen en el orden 1-11 del spec; `http://localhost:3000/#calculadora` aterriza en la calculadora sin quedar tapada por el header.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat(recomposicion): landing unica con el orden de 11 secciones del spec v3"
```

---

### Task 3: Header con anclas + link a desarrollo web

**Files:**
- Modify: `src/components/Header.tsx:11-31`

**Interfaces:**
- Consumes: ids `#casos`, `#soluciones`, `#calculadora`, `#faq` creados en Task 2.
- Produces: navegación definitiva del sitio (anclas + `/desarrollo-web` + CTA WhatsApp).

- [ ] **Step 1: Reemplazar los links y su render en `src/components/Header.tsx`**

Sustituir el array `links` (líneas 11-15) por:

```tsx
const links = [
  { href: '/#casos', label: 'Casos' },
  { href: '/#soluciones', label: 'Soluciones' },
  { href: '/#calculadora', label: 'Calculadora' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/desarrollo-web', label: 'Desarrollo web' },
];
```

Y ajustar `navLinks` para que el estado activo solo aplique a rutas reales (las anclas no tienen `pathname` propio):

```tsx
  const navLinks = (onClick?: () => void) =>
    links.map((l) => (
      <Link
        key={l.href}
        href={l.href}
        className={clsx(
          styles.navLink,
          !l.href.includes('#') && pathname === l.href && styles.active
        )}
        onClick={onClick}
      >
        {l.label}
      </Link>
    ));
```

- [ ] **Step 2: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 3: Revisión visual**

En `npm run dev`: los 5 links del header desktop y del menú móvil navegan a su ancla (scroll suave, sin tapar el título) o a `/desarrollo-web`; el menú móvil se cierra al elegir; "Desarrollo web" se marca activo solo dentro de esa ruta.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat(header): navegacion por anclas de seccion + link a desarrollo web"
```

---

### Task 4: Desenlazar `/automatizacion-ia`

**Files:**
- Delete: `src/app/automatizacion-ia/page.tsx` (y el directorio)
- Modify: cualquier archivo con links a `/automatizacion-ia` (localizar con grep; típicamente `src/components/Footer.tsx` y `src/components/TwoPillars.tsx`)

**Interfaces:**
- Consumes: la landing recompuesta (Task 2) que ya absorbe todo el contenido de esa ruta.
- Produces: sitio de 2 URLs (`/` y `/desarrollo-web`). Los componentes `ServiceHero` y `AutomationCases` quedan sin consumidor pero PRESERVADOS.

- [ ] **Step 1: Localizar referencias a la ruta**

Run: `grep -rn "automatizacion-ia" src/`
Expected: la página misma y los links de navegación que la apuntan (Footer, TwoPillars u otros).

- [ ] **Step 2: Eliminar el directorio de la ruta**

```bash
git rm -r src/app/automatizacion-ia
```

- [ ] **Step 3: Corregir cada referencia encontrada**

Para cada link hallado en el Step 1 (fuera de componentes ya desenlazados como TwoPillars, que no renderiza y puede conservar su link interno):
- Links de navegación (p.ej. Footer): apuntar a `/#soluciones` (o el ancla más pertinente al texto del link).
- Si el texto del link decía "Automatización", conservar el label y cambiar solo el `href`.

- [ ] **Step 4: Verificar que no queda ninguna referencia activa**

Run: `grep -rn "automatizacion-ia" src/ --include="*.tsx" --include="*.ts"`
Expected: como máximo referencias dentro de componentes preservados que NO se renderizan (TwoPillars, HowWeWorkHome). Ninguna en `src/app/`, `Header`, `Footer` ni componentes montados.

- [ ] **Step 5: Verificar build**

Run: `npm run lint && npm run build`
Expected: sin errores; la ruta `/automatizacion-ia` ya no aparece en el listado de rutas del build.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(recomposicion): desenlazar /automatizacion-ia (contenido fusionado en /)"
```

---

### Task 5: Verificación de fase y ledger

**Files:**
- Modify: `.superpowers/sdd/progress.md` (añadir bloque de la fase)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: Fase A cerrada y registrada; base estable para Fase B.

- [ ] **Step 1: Verificación completa**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 2: Recorrido visual completo**

En `npm run dev`, recorrer `/` de arriba a abajo y `/desarrollo-web`:
- Orden de secciones correcto, sin secciones duplicadas ni huecos visuales entre fondos claro/oscuro.
- Las 4 anclas del header funcionan desde `/` y desde `/desarrollo-web` (navegación cruzada).
- Móvil (≤768px): menú hamburguesa navega y cierra correctamente.

- [ ] **Step 3: Registrar en el ledger**

Añadir al final de `.superpowers/sdd/progress.md`:

```markdown
# Experiencia v3 — Fase A: fundaciones (spec 2026-07-19)
- Task 1 (commit pendiente): complete
- Task 2 (recomposición 11 secciones): complete
- Task 3 (header anclas): complete
- Task 4 (desenlazar /automatizacion-ia): complete
- Task 5 (verificación): complete
Siguiente: Fase B (pilares circuito, marquesina soluciones, prueba social, puente dev).
```

- [ ] **Step 4: Commit**

```bash
git add .superpowers/sdd/progress.md
git commit -m "docs(ledger): fase A de experiencia v3 cerrada"
```
