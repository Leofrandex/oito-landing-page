import { FAQS } from "@/components/Faq";

export const SITE_URL = "https://oitove.com";

/** JSON-LD de la landing: ProfessionalService + WebSite + FAQPage (fuente única: FAQS del componente). */
export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#org`,
        name: "oito",
        url: SITE_URL,
        logo: `${SITE_URL}/logo_oito.png`,
        email: "info@oitove.com",
        telephone: "+584241344659",
        sameAs: ["https://www.instagram.com/oito.vee/"],
        areaServed: { "@type": "Country", name: "Venezuela" },
        /* Service area business: la dirección verificable es privada (GBP);
         * aquí solo ciudad y país, nunca la calle. */
        address: {
          "@type": "PostalAddress",
          addressLocality: "Caracas",
          addressCountry: "VE",
        },
        description:
          "Estudio de automatización e IA para pymes en Venezuela. Automatizamos lo repetitivo de tu negocio para que tú te enfoques en crecer.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "oito",
        inLanguage: "es",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
