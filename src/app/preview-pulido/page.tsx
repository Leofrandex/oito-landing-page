import type { Metadata } from 'next';
import PreviewDolor from '@/components/preview/PreviewDolor';
import PreviewPilares from '@/components/preview/PreviewPilares';
import PreviewCasos from '@/components/preview/PreviewCasos';
import PreviewSoluciones from '@/components/preview/PreviewSoluciones';
import PreviewBorderGlow from '@/components/preview/PreviewBorderGlow';
import styles from './preview-pulido.module.css';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Preview pulido (interno) | oito',
};

function LabelBar({ id, note }: { id: string; note?: string }) {
  return (
    <div className={styles.labelBar}>
      <span className={styles.chip}>{id}</span>
      {note ? <span className={styles.note}>{note}</span> : null}
    </div>
  );
}

function BlockHead({ title, desc }: { title: string; desc: string }) {
  return (
    <div className={styles.blockHead}>
      <h2 className={styles.blockTitle}>{title}</h2>
      <p className={styles.blockDesc}>{desc}</p>
    </div>
  );
}

export default function PreviewPulidoPage() {
  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <h1 className={styles.introTitle}>Preview de pulido (interno)</h1>
        <p className={styles.introBody}>
          Comparación 1:1 de variantes con los tokens, clases globales, tipografía y estilos reales
          del sitio. Las demos hacen autoplay en bucle para comparar sin scroll. Elige por bloque.
        </p>
      </div>

      {/* ===== Bloque 1 — Dolor ===== */}
      <BlockHead
        title="Bloque 1 — Dolor: visual compacto antes/después"
        desc="Mismo texto real de arg1 y arg2; cambia solo el visual del medio."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="dolor-morph" note="crossfade + blur hoy→con oito (lenguaje BeforeAfter)" />
        <PreviewDolor variant="morph" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="dolor-gemelas" note="dos tarjetas glass-light espejadas" />
        <PreviewDolor variant="gemelas" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="dolor-cortina" note="cortina mint que revela el orden (clip-path)" />
        <PreviewDolor variant="cortina" />
      </div>

      {/* ===== Bloque 2 — Pilares ===== */}
      <BlockHead
        title="Bloque 2 — Pilares: tratamiento de las conexiones"
        desc="Nodos, iconos y textos reales de AutomationPillars; cambia solo cómo se conectan."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="pilares-sinlineas" note="sin SVG, solo glow secuencial 1→2→3" />
        <PreviewPilares variant="sinlineas" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="pilares-pcb" note="trazas PCB en ángulo recto + pads + pulsos" />
        <PreviewPilares variant="pcb" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="pilares-anillo" note="anillo elíptico punteado + punto orbitando" />
        <PreviewPilares variant="anillo" />
      </div>

      {/* ===== Bloque 3 — Casos ===== */}
      <BlockHead
        title="Bloque 3 — Casos: bento izquierda + titulares derecha"
        desc="Header real con menos aire; a la derecha solo sector + titular (sin descripción). Avanza solo cada ~3s."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="casos-bento4" note="bento por caso: tarjeta ancha + stat neutral + tags" />
        <PreviewCasos variant="bento4" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="casos-cardstats" note="tarjeta de descripción + fila de 3 stats neutrales" />
        <PreviewCasos variant="cardstats" />
      </div>

      {/* ===== Bloque 4 — Soluciones ===== */}
      <BlockHead
        title="Bloque 4 — Soluciones: tratamiento del detalle"
        desc="Píldoras reales; cambia cómo se muestra el detalle. Interactivas de verdad (hover / click)."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="soluciones-popover" note="popover flotante anclado a la píldora" />
        <PreviewSoluciones variant="popover" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="soluciones-expandir" note="la píldora se expande inline con el detalle" />
        <PreviewSoluciones variant="expandir" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="soluciones-sindetalle" note="solo píldoras, sin bloque de detalle" />
        <PreviewSoluciones variant="sindetalle" />
      </div>

      {/* ===== Bloque 5 — BorderGlow ===== */}
      <BlockHead
        title="Bloque 5 — BorderGlow adaptado a oito"
        desc="Glow de borde rastreado por el puntero (mueve el mouse sobre las tarjetas). Malla mint monocroma."
      />
      <PreviewBorderGlow />
    </main>
  );
}
