import type { Metadata } from "next";
import { Varela_Round, DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyWhatsAppCTA from '@/components/StickyWhatsAppCTA';
import ThreadsBackground from '@/components/ThreadsBackground';
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "oito | Automatización con IA",
  description: "Aumenta la productividad de tu empresa con automatización inteligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${varelaRound.variable} ${dmSans.variable} ${playfair.variable} antialiased`}>
        <ThreadsBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
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
