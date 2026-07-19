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
        title="Bloque 1 — Dolor: piezas desordenadas que se van construyendo (sin contenedor)"
        desc="Mismo texto real de arg1 y arg2; entre ambos, fragmentos rojizos sueltos flotan directamente sobre el fondo claro (sin panel oscuro) y se ensamblan pieza a pieza en una composición ordenada mint, luego se desarman (loop)."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="dolor-modulos" note="fragmentos de UI que se ensamblan en un mini panel/dashboard" />
        <PreviewDolor variant="modulos" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="dolor-pipeline" note="bloques con icono que encajan en un riel formando una cadena" />
        <PreviewDolor variant="pipeline" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="dolor-torre" note="ladrillos que caen y construyen una estructura" />
        <PreviewDolor variant="torre" />
      </div>

      {/* ===== Bloque 2 — Pilares ===== */}
      <BlockHead
        title="Bloque 2 — Pilares: DECIDIDO, montar para confirmación"
        desc="Los 3 nodos reales en una misma fila (grid 3 columnas, diseño pre-circuito). Sin conectores ni SVG; única vida = glow secuencial 1→2→3."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="pilares-fila" note="DECIDIDO: confirmar" />
        <PreviewPilares />
      </div>

      {/* ===== Bloque 3 — Casos ===== */}
      <BlockHead
        title="Bloque 3 — Casos: header apretado + recorrido real + titulares; el lado del contenido sin bento"
        desc="Se mantienen el header, la línea de recorrido y el lado de solo titulares. El lado del contenido en 3 tratamientos nuevos, todos sin cajas bento. Avanza solo cada ~3.5s con crossfade."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="casos-editorial" note="pura tipografía: descripción grande con palabras clave mint + chips de stack" />
        <PreviewCasos variant="editorial" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="casos-ficha" note="ficha técnica minimal: Problema / Solución con hairlines + fila de chips" />
        <PreviewCasos variant="ficha" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="casos-marco" note="marco de dispositivo oscuro con placeholder digno (para capturas reales)" />
        <PreviewCasos variant="marco" />
      </div>

      {/* ===== Bloque 4 — Soluciones ===== */}
      <BlockHead
        title="Bloque 4 — Soluciones: la marquesina se queda arriba; debajo va una pregunta de cierre"
        desc="La marquesina real en movimiento (8 píldoras + notas) se mantiene arriba en ambas variantes; cambia solo el cierre de abajo, ahora un titular tipo pregunta con CTA a WhatsApp."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="pregunta-cta" note="titular fijo centrado + Button secundario a WhatsApp" />
        <PreviewSoluciones variant="pregunta-cta" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="pregunta-dinamica" note="el nombre de la solución activa rota en mint cada ~3s + CTA WhatsApp" />
        <PreviewSoluciones variant="pregunta-dinamica" />
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
