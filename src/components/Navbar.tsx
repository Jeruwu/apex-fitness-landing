import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Slide in on load
    if (navRef.current) {
      navRef.current.classList.add('nav-ready');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      id="mainNav" 
      ref={navRef}
      style={{
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '',
        background: scrolled ? 'rgba(13,13,13,0.97)' : ''
      }}
    >
      <a href="#" className="nav-logo">APEX<span>.</span></a>
      
      <div className={`nav-links ${isOpen ? 'nav-open' : ''}`} id="navLinks">
        <a href="#hero" onClick={closeMenu}>Home</a>
        <a href="#methodology" onClick={closeMenu}>How it Works</a>
        <a href="#training" onClick={closeMenu}>Services</a>
        <a href="#reviews" onClick={closeMenu}>Reviews</a>
        <a href="#pricing" onClick={closeMenu}>Pricing</a>
        <a href="#form" className="nav-cta" onClick={closeMenu}>Book Free Session</a>
      </div>
      
      <button 
        className="hamburger" 
        aria-label="Menu" 
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
