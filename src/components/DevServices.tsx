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
