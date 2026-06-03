import { useScrollReveal } from './hooks/useScrollReveal';
import { useMagneticButton } from './hooks/useMagneticButton';
import { useTiltEffect } from './hooks/useTiltEffect';
import { useCounter } from './hooks/useCounter';
import { useScrollToAnchor } from './hooks/useScrollToAnchor';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import MethodologySection from './components/MethodologySection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  // Initialize hooks that apply to the whole DOM
  useScrollReveal();
  useMagneticButton();
  useTiltEffect();
  useCounter();
  useScrollToAnchor();

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <Navbar />
      <HeroSection />
      <MethodologySection />
      <ServicesSection />
      <ReviewsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default App;
