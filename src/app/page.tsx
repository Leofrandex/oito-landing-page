'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Hero from '@/components/Hero';
import TwoPillars from '@/components/TwoPillars';
import SocialProof from '@/components/SocialProof';
import WhyOito from '@/components/WhyOito';
import FeaturedCases from '@/components/FeaturedCases';
import HowWeWorkHome from '@/components/HowWeWorkHome';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

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
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <Hero isLoaded={isLoaded} />
      <TwoPillars />
      <SocialProof />
      <WhyOito />
      <FeaturedCases />
      <HowWeWorkHome />
      <FinalCTA />
    </main>
  );
}
