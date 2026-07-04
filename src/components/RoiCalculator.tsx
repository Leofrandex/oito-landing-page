'use client';

import { useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import Reveal from './ui/Reveal';
import styles from './RoiCalculator.module.css';

const fmt = new Intl.NumberFormat('es', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

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
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [personas, setPersonas] = useState(2);
  const [horasSemana, setHorasSemana] = useState(10);
  const [costoHora, setCostoHora] = useState(8);

  const horasMes = personas * horasSemana * 4.33;
  const costoMensual = Math.round(horasMes * costoHora);
  const costoAnual = costoMensual * 12;
  const horasRecuperables = Math.round(horasMes * 0.7);

  return (
    <section className={`section-light ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head} style={{ transitionDelay: '0ms' }}>
          <p className={styles.eyebrow}>Calculadora</p>
          <h2 className={styles.title}>
            Calcula el costo real de <span className={styles.accent}>no automatizar</span>
          </h2>
          <p className={styles.lede}>
            Analiza cuánto pierde tu equipo en tareas repetitivas y el impacto de automatizarlas.
          </p>
        </header>

        <div className={`glass-light ${styles.panel}`} style={{ transitionDelay: '120ms' }}>
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
          </div>

          <div className={styles.result} aria-live="polite">
            <span className={styles.resultLabel}>Costo mensual de esas tareas</span>
            <span className={styles.resultValue}>
              {fmt.format(costoMensual)}
              <span className={styles.per}>/mes</span>
            </span>
            <span className={styles.resultSub}>
              {fmt.format(costoAnual)} al año · ~{horasRecuperables} h/mes recuperables
            </span>
            <span className={styles.estimateTag}>Cálculo estimado · ~70% potencial recuperable</span>
            <a
              href="https://wa.me/584241344659"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <WhatsAppIcon size={20} />
              Hablemos de tu caso
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
