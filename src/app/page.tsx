'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import TwoPillars from '@/components/TwoPillars';
import SocialProof from '@/components/SocialProof';
import WhyOito from '@/components/WhyOito';
import FeaturedCases from '@/components/FeaturedCases';
import HowWeWorkHome from '@/components/HowWeWorkHome';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Remove the hash from the URL so it doesn't jump to the section on reload
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Hero />
      <TwoPillars />
      <SocialProof />
      <WhyOito />
      <FeaturedCases />
      <HowWeWorkHome />
      <FinalCTA />
    </main>
  );
}
