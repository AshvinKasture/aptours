import React from 'react';
import ParallaxSection from './ParallaxSection';

const HeroSection: React.FC = () => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      className=""
    >
      <div className="fade-in-up">
        <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-medium backdrop-blur-sm border border-emerald-400/30">
          Established • Trusted
        </span>
      </div>
      
      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight fade-in-up">
        AP Tours & Travels
      </h1>
      
      <h2 className="mt-4 text-xl sm:text-2xl font-light text-blue-100 fade-in-up">
        Tailor-made experiences for curious travellers
      </h2>
      
      <p className="mt-6 text-lg text-blue-50/90 max-w-2xl mx-auto fade-in-up">
        From Himalayan treks to cultural heritage tours — we design journeys that stay with you. 
        Explore handcrafted itineraries, small-group treks, and private tours.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up">
        <button
          onClick={() => handleNavClick('#treks')}
          className="inline-block px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Explore Our Tours
        </button>
        <button
          onClick={() => handleNavClick('#contact')}
          className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
        >
          Plan Your Journey
        </button>
      </div>
    </ParallaxSection>
  );
};

export default HeroSection;
