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
        title="Bloque 1 — Dolor: piezas desordenadas que se van construyendo"
        desc="Mismo texto real de arg1 y arg2; en la banda del medio, fragmentos rojizos sueltos se ensamblan pieza a pieza en una composición ordenada mint y luego se desarman (loop)."
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
        title="Bloque 3 — Casos: bento con tamaño según contenido + resize fluido (Flip)"
        desc="Cada bloque mide lo que su contenido pide; al cambiar de caso los bloques crecen/encogen y se reacomodan con el plugin Flip de GSAP. Avanza solo cada ~3.5s."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="casos-flip-mosaico" note="dos columnas fluidas tipo masonry compacto" />
        <PreviewCasos variant="mosaico" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="casos-flip-columna" note="una sola columna con fila de chips/mini-tiles que refluyen" />
        <PreviewCasos variant="columna" />
      </div>

      {/* ===== Bloque 4 — Soluciones ===== */}
      <BlockHead
        title="Bloque 4 — Soluciones: la marquesina se queda; alternativas del destacado"
        desc="La marquesina real en movimiento (8 píldoras + notas); cambia solo el destacado de abajo. La solución activa rota cada ~4s (o al hacer click en una píldora)."
      />
      <div className={styles.variantWrap}>
        <LabelBar id="destacado-flujo" note="mini-diagrama de flujo entrada → oito → resultado" />
        <PreviewSoluciones variant="flujo" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="destacado-chat" note="mini conversación WhatsApp en loop" />
        <PreviewSoluciones variant="chat" />
      </div>
      <div className={styles.variantWrap}>
        <LabelBar id="destacado-cta" note="detail + botón contextual 'Automatiza esto →' (WhatsApp real)" />
        <PreviewSoluciones variant="cta" />
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
