import Hero from '@/components/Hero';
import TwoPillars from '@/components/TwoPillars';
import SocialProof from '@/components/SocialProof';
import WhyOito from '@/components/WhyOito';
import FeaturedCases from '@/components/FeaturedCases';
import HowWeWorkHome from '@/components/HowWeWorkHome';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
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
