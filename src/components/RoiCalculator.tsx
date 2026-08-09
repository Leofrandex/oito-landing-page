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

  /* Un solo tween para los cuatro números: un rAF y un render por frame. */
  const [costoAnim, horasHoyAnim, horasOitoAnim, deltaAnim] = useCountUp([
    costoMensual,
    horasMes,
    horasRestantes,
    horasRecuperables,
  ]);

  /* La columna "Hoy" usa la escala sqrt para moverse en todo el rango; la de
   * "Con oito" es proporcional lineal a ella para que la diferencia real se lea. */
  const hoyScale = colPct(horasHoyAnim) / 100;
  const oitoScale = horasHoyAnim > 0 ? hoyScale * (horasOitoAnim / horasHoyAnim) : 0;

  return (
    <section id={id} className={`section-dark anchor-target ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <h2 className={styles.title} style={{ transitionDelay: '0ms' }}>
            Calcula el costo real de <span className={styles.accent}>no automatizar</span>
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '60ms' }}>
            Ajusta los tres valores a tu operación. El resto lo hace la página.
          </p>
        </header>

        <div className={styles.layout} style={{ transitionDelay: '120ms' }}>
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

            <div className={styles.verdict}>
              <span className={styles.money}>
                {fmt.format(Math.round(costoAnim))}
                <span className={styles.per}>/mes en trabajo manual</span>
              </span>
              <span className={styles.note}>Cálculo estimado sobre ~70% del tiempo recuperable</span>
              {/* El anuncio usa el valor OBJETIVO, no el animado: con aria-live
                  sobre un número que cambia 60 veces por segundo, el lector de
                  pantalla no callaría. Así cambia una vez por interacción. */}
              <span className={styles.srOnly} aria-live="polite">
                {`${fmt.format(Math.round(costoMensual))} al mes en trabajo manual`}
              </span>
            </div>

            <Button variant="primary" external href={WHATSAPP_URL}>
              <WhatsAppIcon size={20} />
              Hablemos por WhatsApp
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
