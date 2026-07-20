import type { Metadata } from "next";
import { Varela_Round, DM_Sans, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThreadsBackground from "@/components/ThreadsBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyWhatsAppCTA from "@/components/StickyWhatsAppCTA";
import "./globals.css";

const varelaRound = Varela_Round({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-varela-round",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const outfit = Outfit({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oitove.com"),
  title: "oito | Automatización con IA para pymes",
  description:
    "Automatizamos lo repetitivo de tu negocio (prospección, CRM, soporte, reportes) con IA, para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "oito",
    title: "oito | Automatización con IA para pymes",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA para que tú te enfoques en crecer. Pymes de LatAm, remoto y en español.",
  },
  twitter: {
    card: "summary_large_image",
    title: "oito | Automatización con IA para pymes",
    description:
      "Automatizamos lo repetitivo de tu negocio con IA para que tú te enfoques en crecer.",
  },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${varelaRound.variable} ${dmSans.variable} ${outfit.variable} antialiased`}>
        {/* En refresh la página vuelve arriba: debe correr ANTES de que el navegador
         * restaure el scroll o salte al ancla, por eso es inline y no un efecto React. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'){history.scrollRestoration='manual';if(location.hash)history.replaceState(null,'',location.pathname+location.search);window.scrollTo(0,0);}}catch(e){}})();`,
          }}
        />
        <ThreadsBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Header />
          {children}
          <Footer />
        </div>
        <StickyWhatsAppCTA />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
