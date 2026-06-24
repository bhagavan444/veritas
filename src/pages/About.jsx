import React, { useEffect } from 'react';
import HeroSection from '../components/About/HeroSection';
import StorySection from '../components/About/StorySection';
import PhilosophySection from '../components/About/PhilosophySection';
import ArchitectureSection from '../components/About/ArchitectureSection';
import ReportShowcase from '../components/About/ReportShowcase';
import PrincipleSection from '../components/About/PrincipleSection';
import FutureSection from '../components/About/FutureSection';
import FinalCTA from '../components/About/FinalCTA';
import Footer from '../components/Footer/Footer'; // Reusing Home Footer

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "#000", color: "#fff" }}>
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <ArchitectureSection />
      <ReportShowcase />
      <PrincipleSection />
      <FutureSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
