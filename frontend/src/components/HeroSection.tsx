import React from 'react';
import ParallaxSection from './ParallaxSection';
import FeaturedTours from './FeaturedTours';

const HeroSection: React.FC = () => {
  return (
    <ParallaxSection
      backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      // backgroundImage="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
      className=""
    >
      <div className="fade-in-up px-4 sm:px-0">
        <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-medium backdrop-blur-sm border border-emerald-400/30">
          Established • Trusted
        </span>
      </div>
      
      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight fade-in-up px-4 sm:px-0">
        AP Tours & Travels
      </h1>
      
      <h2 className="mt-4 text-lg sm:text-2xl font-light text-blue-100 fade-in-up px-6 sm:px-0 text-center max-w-3xl mx-auto hero-text-container">
        Tailor-made experiences for curious travellers
      </h2>
      
      <div className="mt-12 px-2 sm:px-0">
        <FeaturedTours />
      </div>
    </ParallaxSection>
  );
};

export default HeroSection;
