'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Hero from '@/components/Hero';
import AuthorityBanner from '@/components/AuthorityBanner';
import About from '@/components/About';

import FeaturedCases from '@/components/FeaturedCases';
import Portfolio from '@/components/Portfolio';
import HowWeWork from '@/components/HowWeWork';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';

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
      <AuthorityBanner />
      <About />
      <FeaturedCases />
      <Portfolio />
      <HowWeWork />
      <Pricing />
      <Contact />
    </main>
  );
}
