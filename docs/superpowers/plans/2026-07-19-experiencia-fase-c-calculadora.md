# Experiencia inmersiva v3 — Fase C: Calculadora editorial

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir `RoiCalculator` como la sección editorial oscura del spec §3.6: sliders finos con glow, cifra héroe de dinero, dos columnas verticales gemelas ("Hoy" rojiza vs "Con oito" mint) con anotación delta, y todos los números animados con count-up fluido.

**Architecture:** Un hook nuevo `useCountUp` (rAF + ease-out, respeta reduced motion) provee los números fluidos; `RoiCalculator` se reescribe como `'use client'` sobre `section-dark` sin tarjeta contenedora. Las columnas animan con `transform: scaleY` (origen abajo) para cumplir la regla transform/opacity; el fill de los sliders se pinta con un gradiente inline calculado.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules. Verificación: `npm run lint` + `npm run build` + revisión visual.

**Spec:** `docs/superpowers/specs/2026-07-19-experiencia-inmersiva-design.md` (§3.6, §4, §5)

## Global Constraints

- Copy en español, sin em dash; cifras como potencial ("cálculo estimado · ~70% recuperable" visible); contacto solo WhatsApp (`WHATSAPP_URL`).
- ⚠ Requisito explícito del usuario: números y columnas SIEMPRE con animación fluida (count-up/tween ~300ms ease-out siguiendo el deslizador), nunca saltos. Con `prefers-reduced-motion`: los valores cambian instantáneo (sin tween) y no hay transiciones.
- Animar solo transform/opacity (columnas con `scaleY`, no `height`).
- La sección pasa a `section-dark` (ritmo §4); acento rojizo cálido SOLO aquí y en el dolor: gradiente `#7e3626 → #c25a41` para "Hoy".
- Conserva el contrato `RoiCalculator({ id })` con `id` + `anchor-target` en la sección raíz (hermana directa de `<main>`).
- A11y: sliders `<input type="range">` nativos con label visible, resultado con `aria-live="polite"`, targets ≥44px (thumb 22px con hit area del track completo), foco visible.
- Cada task termina con `npm run lint && npm run build` en verde y un commit.

---

### Task 1: Hook `useCountUp`

**Files:**
- Create: `src/components/ui/useCountUp.ts`

**Interfaces:**
- Produces: `useCountUp(target: number, duration?: number): number` — devuelve un valor que persigue `target` con ease-out cúbico vía requestAnimationFrame; con reduced motion devuelve `target` directo. Task 2 lo consume para dinero, horas y columnas.

- [ ] **Step 1: Crear `src/components/ui/useCountUp.ts`**

```ts
'use client';

import { useEffect, useRef, useState } from 'react';

/** Persigue `target` con un tween ease-out (~duration ms) vía requestAnimationFrame.
 *  Con prefers-reduced-motion salta directo al valor (sin animación).
 *  Pensado para los números de la calculadora (requisito: nunca saltos bruscos). */
export default function useCountUp(target: number, duration = 300): number {
  const [value, setValue] = useState(target);
  const currentRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      currentRef.current = target;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con media query leída al vuelo, no cascada de renders
      setValue(target);
      return;
    }

    const from = currentRef.current;
    if (from === target) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      currentRef.current = v;
      setValue(v);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}
```

- [ ] **Step 2: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores (el hook aún no tiene consumidor; eso es normal en este paso).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/useCountUp.ts
git commit -m "feat(ui): hook useCountUp para numeros con tween fluido"
```

---

### Task 2: RoiCalculator editorial oscuro con columnas gemelas

**Files:**
- Modify: `src/components/RoiCalculator.tsx` (reemplazo completo)
- Modify: `src/components/RoiCalculator.module.css` (reemplazo completo)

**Interfaces:**
- Consumes: `useCountUp` (Task 1), `Reveal`, `Button`, `WhatsAppIcon`, `WHATSAPP_URL`, clases `section-dark`, `badge`, `anchor-target`, tokens `--mint`, `--on-dark`, `--on-dark-soft`.
- Produces: `RoiCalculator({ id })` (contrato con `page.tsx` intacto).

- [ ] **Step 1: Reemplazar `src/components/RoiCalculator.tsx`**

```tsx
'use client';

import { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import Reveal from './ui/Reveal';
import Button from '@/components/ui/Button';
import useCountUp from './ui/useCountUp';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './RoiCalculator.module.css';

const fmt = new Intl.NumberFormat('es', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/* Máximo teórico de horas/mes con los sliders al tope (20 personas x 40 h x 4.33).
 * Escala sqrt para que las columnas se muevan de forma visible en todo el rango. */
const MAX_HORAS_MES = 20 * 40 * 4.33;
const colPct = (horas: number) => 8 + 84 * Math.sqrt(horas / MAX_HORAS_MES);

type FieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  prefix?: string;
};

function Field({ label, value, min, max, onChange, prefix }: FieldProps) {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        <span>{label}</span>
        <span className={styles.fieldVal}>
          {prefix}
          {value}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.range}
        style={{
          background: `linear-gradient(to right, var(--mint) ${pct}%, rgba(255, 255, 255, 0.12) ${pct}%)`,
        }}
      />
    </div>
  );
}

export default function RoiCalculator({ id }: { id?: string }) {
  const [personas, setPersonas] = useState(2);
  const [horasSemana, setHorasSemana] = useState(10);
  const [costoHora, setCostoHora] = useState(8);

  const horasMes = personas * horasSemana * 4.33;
  const costoMensual = horasMes * costoHora;
  const horasRecuperables = horasMes * 0.7;
  const horasRestantes = horasMes - horasRecuperables;

  /* Todos los números y las columnas persiguen su objetivo con tween fluido. */
  const costoAnim = useCountUp(costoMensual);
  const horasHoyAnim = useCountUp(horasMes);
  const horasOitoAnim = useCountUp(horasRestantes);
  const deltaAnim = useCountUp(horasRecuperables);

  const hoyScale = colPct(horasHoyAnim) / 100;
  const oitoScale = colPct(horasOitoAnim) / 100;

  return (
    <section id={id} className={`section-dark anchor-target ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Calculadora
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Calcula el costo real de <span className={styles.accent}>no automatizar</span>
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '130ms' }}>
            Ajusta los tres valores a tu operación. El resto lo hace la página.
          </p>
        </header>

        <div className={styles.layout} style={{ transitionDelay: '200ms' }}>
          <div className={styles.controls}>
            <Field
              label="Personas en tareas repetitivas"
              value={personas}
              min={1}
              max={20}
              onChange={setPersonas}
            />
            <Field
              label="Horas por semana, por persona"
              value={horasSemana}
              min={1}
              max={40}
              onChange={setHorasSemana}
            />
            <Field
              label="Costo por hora (USD)"
              value={costoHora}
              min={2}
              max={50}
              onChange={setCostoHora}
              prefix="$"
            />

            <div className={styles.verdict} aria-live="polite">
              <span className={styles.money}>
                {fmt.format(Math.round(costoAnim))}
                <span className={styles.per}>/mes en trabajo manual</span>
              </span>
              <span className={styles.note}>Cálculo estimado · ~70% del tiempo es recuperable</span>
            </div>

            <Button variant="primary" external href={WHATSAPP_URL}>
              <WhatsAppIcon size={20} />
              Hablemos de tu caso
            </Button>
          </div>

          <div className={styles.plot} aria-hidden="true">
            <div className={styles.baseline} />
            <div className={styles.colWrap}>
              <div className={styles.colTrack}>
                <div
                  className={`${styles.col} ${styles.colHoy}`}
                  style={{ transform: `scaleY(${hoyScale})` }}
                />
              </div>
              <span className={styles.colNum}>{Math.round(horasHoyAnim)} h</span>
              <span className={styles.colLab}>Hoy</span>
            </div>
            <div className={styles.colWrap}>
              <div className={styles.colTrack}>
                <div
                  className={`${styles.col} ${styles.colOito}`}
                  style={{ transform: `scaleY(${oitoScale})` }}
                />
              </div>
              <span className={styles.colNum}>{Math.round(horasOitoAnim)} h</span>
              <span className={styles.colLab}>Con oito</span>
            </div>
            <div className={styles.delta}>
              <span className={styles.deltaArrow} />
              <span className={styles.deltaText}>
                {Math.round(deltaAnim)} h<br />
                vuelven
                <br />a ti /mes
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Reemplazar `src/components/RoiCalculator.module.css`**

```css
/* Editorial abierto oscuro (spec v3 3.6): sin tarjeta contenedora.
 * Acento rojizo cálido SOLO aquí y en el dolor (color de costo/problema). */
.section {
  position: relative;
  padding: clamp(4.5rem, 9vw, 8rem) 1.5rem;
}

.section::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(45% 45% at 78% 22%, rgba(194, 90, 65, 0.12), transparent 70%);
}

.inner {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
}

.head {
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
}

.title {
  margin-top: 0.9rem;
  font-size: clamp(1.75rem, 4vw, 2.8rem);
  letter-spacing: -0.02em;
  color: var(--on-dark);
}

.accent {
  color: var(--mint);
}

.lede {
  margin-top: 0.6rem;
  font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  color: var(--on-dark-soft);
}

/* ===== Layout dos columnas ===== */
.layout {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-start;
}

/* ===== Sliders finos con glow ===== */
.field {
  width: 100%;
}

.fieldLabel {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.55rem;
  font-size: 0.9rem;
  color: var(--on-dark-soft);
}

.fieldVal {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--on-dark);
  font-variant-numeric: tabular-nums;
}

.range {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 3px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  /* el fill se pinta inline con linear-gradient según el valor */
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #06231e;
  border: 2.5px solid var(--mint);
  box-shadow: 0 0 16px rgba(9, 188, 138, 0.55);
  cursor: grab;
}

.range::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #06231e;
  border: 2.5px solid var(--mint);
  box-shadow: 0 0 16px rgba(9, 188, 138, 0.55);
  cursor: grab;
}

.range:focus-visible {
  outline: 2px solid var(--mint);
  outline-offset: 4px;
}

/* ===== Veredicto ===== */
.verdict {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.4rem;
}

.money {
  font-size: clamp(2rem, 4.5vw, 2.6rem);
  font-weight: 700;
  color: var(--on-dark);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}

.per {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--on-dark-soft);
}

.note {
  font-size: 0.75rem;
  color: var(--on-dark-soft);
  opacity: 0.8;
}

/* ===== Columnas gemelas ===== */
.plot {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(2rem, 5vw, 3.25rem);
  min-height: 320px;
  padding-right: 84px;
  padding-bottom: 52px;
}

.baseline {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 52px;
  height: 1px;
  background: rgba(255, 255, 255, 0.18);
}

.colWrap {
  position: relative;
  width: clamp(72px, 9vw, 96px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colTrack {
  position: relative;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: flex-end;
}

.col {
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  transform-origin: bottom;
  will-change: transform;
}

.colHoy {
  background: linear-gradient(to top, #7e3626, #c25a41);
}

.colOito {
  background: linear-gradient(to top, #067a5a, var(--mint));
  box-shadow: 0 0 22px rgba(9, 188, 138, 0.3);
}

.colNum {
  position: absolute;
  bottom: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--on-dark);
  font-variant-numeric: tabular-nums;
}

.colLab {
  position: absolute;
  bottom: -2px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--on-dark-soft);
}

/* Delta: anotacion punteada a la derecha */
.delta {
  position: absolute;
  right: 0;
  top: 12%;
  bottom: 40%;
  width: 76px;
  display: flex;
  gap: 0.6rem;
}

.deltaArrow {
  width: 2px;
  align-self: stretch;
  background: repeating-linear-gradient(
    to bottom,
    var(--mint) 0 6px,
    transparent 6px 11px
  );
  opacity: 0.8;
  position: relative;
}

.deltaArrow::after {
  content: "▼";
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--mint);
  font-size: 10px;
}

.deltaText {
  align-self: center;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--mint);
  font-variant-numeric: tabular-nums;
}

/* ===== Reveal ===== */
.eyebrow,
.title,
.lede,
.layout {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.65s ease,
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.inner[data-revealed] .eyebrow,
.inner[data-revealed] .title,
.inner[data-revealed] .lede,
.inner[data-revealed] .layout {
  opacity: 1;
  transform: none;
}

/* ===== Responsive ===== */
@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .plot {
    min-height: 260px;
    padding-right: 72px;
  }

  .colTrack {
    height: 180px;
  }
}

/* ===== Reduced motion ===== */
@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .title,
  .lede,
  .layout {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .col {
    will-change: auto;
  }
}
```

Nota: las columnas NO llevan `transition` CSS propia: su movimiento fluido viene del tween de `useCountUp` (que ya respeta reduced motion), evitando doble easing.

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 4: Revisión visual**

En dev: sección oscura sin tarjeta; al arrastrar cualquier slider, el dinero, las horas de ambas columnas y el delta se deslizan suavemente (nunca saltan) y las columnas escalan con el mismo ritmo; la columna "Hoy" rojiza y "Con oito" mint con glow; delta punteado a la derecha; foco visible en sliders; móvil apilado (controles arriba, columnas abajo).

- [ ] **Step 5: Commit**

```bash
git add src/components/RoiCalculator.tsx src/components/RoiCalculator.module.css
git commit -m "feat(calculadora): editorial oscuro con columnas gemelas y count-up fluido (spec v3 3.6)"
```

---

### Task 3: Verificación de fase y ledger

**Files:**
- Modify: `.superpowers/sdd/progress.md` (bloque de la fase; gitignoreado, no se commitea)

**Interfaces:**
- Consumes: todo lo anterior.
- Produces: Fase C cerrada; base para Fase D (set pieces).

- [ ] **Step 1: Verificación completa**

Run: `npm run lint && npm run build`
Expected: sin errores.

- [ ] **Step 2: Recorrido visual (controlador, navegador real)**

- Arrastrar los 3 sliders: números y columnas fluidos, sin saltos; `aria-live` no interrumpe (polite).
- Costuras de tono: soluciones (clara) → calculadora (oscura) dibuja costura; calculadora → metodología (oscura) sin costura (bloque oscuro del spec).
- Ancla `/#calculadora` aterriza bien.
- Móvil: layout apilado, thumb usable (≥22px + track completo).

- [ ] **Step 3: Registrar en el ledger**

Añadir el bloque de cierre de la Fase C a `.superpowers/sdd/progress.md` con rangos de commits reales y hallazgos.
