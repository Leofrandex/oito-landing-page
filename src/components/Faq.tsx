import { ChevronDown } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './Faq.module.css';

/* Objeciones pre-CTA (deck v2 §10, pivote a solo automatización). La entrada de
 * desarrollo cierra el arco y es la única mención al servicio junto con DevBridge.
 * Acordeón nativo <details> — accesible y sin JS. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: '¿Cuánto cuesta?',
    a: 'Cada proyecto es distinto, así que no manejamos precios de lista. La primera conversación por WhatsApp no cuesta nada: entendemos tu caso y te damos una propuesta clara antes de que decidas.',
  },
  {
    q: '¿Y si todavía no sé qué necesito?',
    a: 'Es lo normal, y está bien. Empezamos con una auditoría: nos cuentas cómo trabajas hoy y nosotros identificamos dónde la automatización te da más impacto.',
  },
  {
    q: '¿Tengo que cambiar las herramientas que ya uso?',
    a: 'No. Nos integramos con lo que ya tienes (tu CRM, tus hojas de cálculo, WhatsApp, lo que sea). La idea es sumar, no obligarte a empezar de cero.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Depende del alcance, y siempre trabajamos en entregas claras. Una automatización puntual puede estar corriendo en cuestión de semanas; un sistema a medida se construye por fases para que veas avances desde temprano.',
  },
  {
    q: '¿Trabajan en toda Venezuela?',
    a: 'Sí. Trabajamos con pymes de toda Venezuela de forma remota, estés donde estés. La distancia no es problema: todo arranca con un mensaje.',
  },
  {
    q: '¿Solo hacen automatización? ¿También páginas web o software?',
    a: 'Hoy nos enfocamos 100% en automatización e IA, que es donde generamos más impacto. También construimos páginas web y software a medida cuando un proyecto lo necesita (como la app de rastreo para equipos de campo que ves en los casos). Si tienes algo así en mente, escríbenos y lo conversamos.',
  },
];

type FaqProps = {
  id?: string;
};

export default function Faq({ id }: FaqProps) {
  return (
    <section id={id} className={`section-light anchor-target ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Preguntas frecuentes
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Antes de que hablemos
          </h2>
        </header>

        <ul className={styles.list}>
          {FAQS.map(({ q, a }, i) => (
            <li key={q} className={styles.item} style={{ transitionDelay: `${140 + i * 80}ms` }}>
              <details className={`glass-light ${styles.details}`}>
                <summary className={styles.summary}>
                  <span className={styles.q}>{q}</span>
                  <ChevronDown className={styles.chevron} size={20} strokeWidth={2} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{a}</p>
              </details>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
