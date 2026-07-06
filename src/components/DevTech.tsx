import Reveal from './ui/Reveal';
import styles from './DevTech.module.css';

const GROUPS: { label: string; items: string[] }[] = [
  { label: 'Web', items: ['Next.js', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Query', 'React Hook Form', 'Zod', 'Recharts', 'Leaflet'] },
  { label: 'Móvil & PWA', items: ['React Native (Expo)', 'PWA (next-pwa)', 'Geolocalización', 'Cámara', 'Offline (SQLite)'] },
  { label: 'Backend & datos', items: ['Supabase', 'PostgreSQL', 'PostGIS', 'Auth', 'RLS', 'Storage'] },
  { label: 'Documentos & extras', items: ['Generación de PDF', 'Firmas electrónicas', 'Importación Excel/SAP', 'Mapas y geolocalización'] },
];

export default function DevTech() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <Reveal className={styles.inner}>
        <header className={styles.head}>
          <p className={`badge ${styles.eyebrow}`} style={{ transitionDelay: '0ms' }}>
            Tecnologías
          </p>
          <h2 className={styles.title} style={{ transitionDelay: '70ms' }}>
            Construido con tecnología de primera
          </h2>
          <p className={styles.lede} style={{ transitionDelay: '140ms' }}>
            Usamos herramientas modernas y probadas para que tu producto sea rápido, seguro y escalable.
          </p>
        </header>
        <div className={styles.groups}>
          {GROUPS.map((g, i) => (
            <div key={g.label} className={styles.group} style={{ transitionDelay: `${200 + i * 90}ms` }}>
              <h3 className={styles.groupLabel}>{g.label}</h3>
              <ul className={styles.chips}>
                {g.items.map((t) => (
                  <li key={t} className={styles.chip}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
