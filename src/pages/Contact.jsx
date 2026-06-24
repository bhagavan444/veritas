import React, { useEffect } from 'react';
import ContactHero from '../components/Contact/ContactHero';
import Channels from '../components/Contact/Channels';
import DirectContact from '../components/Contact/DirectContact';
import ConnectLinks from '../components/Contact/ConnectLinks';
import WhyExists from '../components/Contact/WhyExists';
import ContactCTA from '../components/Contact/ContactCTA';
import Footer from '../components/Footer/Footer';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      <ContactHero />
      <Channels />
      <DirectContact />
      <ConnectLinks />
      <WhyExists />
      <ContactCTA />
      <Footer />
    </main>
  );
}
