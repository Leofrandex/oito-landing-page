import {
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiPerplexity,
  SiN8N,
  SiMake,
  SiZapier,
  SiHubspot,
  SiZoho,
  SiAirtable,
  SiNotion,
  SiClickup,
  SiSlack,
  SiGooglesheets,
  SiWhatsapp,
  SiInstagram,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import styles from './BuiltWith.module.css';

/* TODO: si se requiere fidelidad de marca, reemplazar por logos oficiales con permiso. */
const TOOLS: { icon: IconType; label: string }[] = [
  { icon: SiOpenai, label: 'OpenAI' },
  { icon: SiAnthropic, label: 'Anthropic' },
  { icon: SiGooglegemini, label: 'Gemini' },
  { icon: SiPerplexity, label: 'Perplexity' },
  { icon: SiN8N, label: 'n8n' },
  { icon: SiMake, label: 'Make' },
  { icon: SiZapier, label: 'Zapier' },
  { icon: SiHubspot, label: 'HubSpot' },
  { icon: SiZoho, label: 'Zoho' },
  { icon: SiAirtable, label: 'Airtable' },
  { icon: SiNotion, label: 'Notion' },
  { icon: SiClickup, label: 'ClickUp' },
  { icon: SiSlack, label: 'Slack' },
  { icon: SiGooglesheets, label: 'Google Sheets' },
  { icon: SiWhatsapp, label: 'WhatsApp' },
  { icon: SiInstagram, label: 'Instagram' },
];

export default function BuiltWith() {
  return (
    <section className={`section-dark ${styles.section}`}>
      <p className={styles.label}>Sistemas construidos con</p>
      <div className={styles.viewport}>
        {/* Two identical groups → track animates 0 → -50% for a seamless loop. */}
        <div className={styles.track}>
          {[0, 1].map((g) => (
            <ul className={styles.group} key={g} aria-hidden={g === 1 ? true : undefined}>
              {TOOLS.map(({ icon: Icon, label }) => (
                <li key={`${g}-${label}`}>
                  <Icon className={styles.logo} role="img" aria-label={label} title={label} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
