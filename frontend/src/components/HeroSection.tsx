import React from 'react';
import ParallaxSection from './ParallaxSection';
import FeaturedTours from './FeaturedTours';

const HeroSection: React.FC = () => {
  return (
    <ParallaxSection
      // backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
      backgroundImage="/assets/parallax/Kailash_landscape.jpg"
      // mobileBackgroundImage="/assets/parallax/Kailash_portrait.JPG"
      className=""
    > 
      <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight fade-in-up px-4 sm:px-0">
        <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-orange-300 bg-clip-text text-transparent">
          AP Tours & Travels
        </span>
      </h1>
      
      <h2 className="mt-4 text-lg sm:text-2xl font-semibold fade-in-up px-6 sm:px-0 text-center max-w-3xl mx-auto hero-text-container">
        <span className="bg-gradient-to-r from-blue-200 via-white to-blue-100 bg-clip-text text-transparent">
          Where every journey becomes a story
        </span>
      </h2>
      
      <div className="mt-12 px-2 sm:px-0">
        <FeaturedTours />
      </div>
    </ParallaxSection>
  );
};

export default HeroSection;
