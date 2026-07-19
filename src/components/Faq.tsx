import { ChevronDown } from 'lucide-react';
import Reveal from './ui/Reveal';
import styles from './Faq.module.css';

/* Objeciones pre-CTA (sin datos inventados, §7). Refuerza el posicionamiento de
 * dos pilares independientes. Acordeón nativo <details> — accesible y sin JS. */
const FAQS: { q: string; a: string }[] = [
  {
    q: '¿Cuánto cuesta?',
    a: 'Cada proyecto es distinto, así que no manejamos precios de lista. La primera conversación por WhatsApp no cuesta nada: entendemos tu caso y te damos una propuesta clara antes de que decidas.',
  },
  {
    q: '¿Y si todavía no sé qué necesito?',
    a: 'Es lo normal, y está bien. Empezamos con una auditoría: nos cuentas cómo trabajas hoy y nosotros identificamos dónde te podemos ayudar más, sea desarrollo, automatización o ambas.',
  },
  {
    q: '¿Tengo que cambiar las herramientas que ya uso?',
    a: 'No. Nos integramos con lo que ya tienes (tu CRM, tus hojas de cálculo, WhatsApp, lo que sea). La idea es sumar, no obligarte a empezar de cero.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Depende del alcance, y siempre trabajamos en entregas claras. Una web o una automatización puntual toma semanas; un sistema a medida se construye por fases para que veas avances desde temprano.',
  },
  {
    q: '¿Hacen solo IA o solo desarrollo?',
    a: 'Las dos, y son independientes. Puedes contratar solo tu software, solo tus automatizaciones, o las dos con el mismo equipo detrás.',
  },
  {
    q: '¿Trabajan con empresas de mi país?',
    a: 'Sí. Trabajamos con pymes de toda LatAm de forma remota, en español. La distancia no es problema: todo arranca con un mensaje.',
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
