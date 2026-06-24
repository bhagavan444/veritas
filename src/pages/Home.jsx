import React, { useEffect } from "react";
import HeroSection from "../components/Home/HeroSection";
import ProblemSection from "../components/Home/ProblemSection";
import TransformationSection from "../components/Home/TransformationSection";
import ProductReveal from "../components/Home/ProductReveal";
import PhilosophySection from "../components/Home/PhilosophySection";
import FinalCTA from "../components/Home/FinalCTA";
import Footer from '../components/Footer/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "#000", color: "#fff" }}>
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <ProductReveal />
      <PhilosophySection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
