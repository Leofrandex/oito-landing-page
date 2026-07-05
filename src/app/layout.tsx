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
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "oito | Desarrollo de software y automatización con IA",
  description:
    "Estudio digital para pymes de LatAm. Construimos software a medida y automatizamos tus procesos con IA. oito lo hace por ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${varelaRound.variable} ${dmSans.variable} ${outfit.variable} antialiased`}>
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
