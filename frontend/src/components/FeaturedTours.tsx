import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTours } from '../contexts/TourContext';

const FeaturedTours: React.FC = () => {
  const navigate = useNavigate();
  const { treksData } = useTours();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Get featured tours (first 6 tours for the carousel)
  const featuredTours = treksData.slice(0, 6);
  // Duplicate tours for seamless infinite scroll
  const duplicatedTours = [...featuredTours, ...featuredTours];

  const handleTourClick = (slug: string) => {
    navigate(`/tours/${slug}`);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!isScrolling || featuredTours.length === 0) return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    
    const scroll = () => {
      if (container && isScrolling) {
        scrollPosition += 0.5; // Slower, smoother scroll
        container.scrollLeft = scrollPosition;
        
        // Get the actual scroll width
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        
        // Reset when we've scrolled halfway through the duplicated content
        if (scrollPosition >= maxScrollLeft / 2) {
          scrollPosition = 0;
          container.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 20); // 50fps for smooth scrolling

    return () => {
      clearInterval(intervalId);
    };
  }, [isScrolling, featuredTours.length]);

  return (
    <div className="w-full max-w-7xl mx-auto px-1 sm:px-4">
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 fade-in-up px-4 sm:px-2">
          Featured Adventures
        </h3>
        <p className="text-xs sm:text-lg text-blue-50/80 fade-in-up max-w-2xl mx-auto px-8 sm:px-4 leading-relaxed hero-text-container">
          <span className="sm:hidden">Popular journeys await</span>
          <span className="hidden sm:inline">Discover our most popular journeys and create memories that last a lifetime</span>
        </p>
      </div>
      
      <div className="relative">
        {/* Play/Pause Toggle Button */}
        <button
          onClick={() => setIsScrolling(!isScrolling)}
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600/80 hover:bg-emerald-500 backdrop-blur-sm border-2 border-white/40 hover:border-white/60 transition-all duration-300 shadow-xl ${isScrolling ? 'animate-pulse' : ''}`}
          aria-label={isScrolling ? 'Pause auto-scroll' : 'Resume auto-scroll'}
        >
          {isScrolling ? (
            /* Pause Icon */
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            /* Play Icon */
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Scrolling Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-8 pb-6 scrollbar-hide px-2 sm:px-4 -mx-2 sm:-mx-4"
          style={{ 
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
          }}
        >
          {duplicatedTours.map((tour, index) => (
            <div
              key={`${tour.slug}-${index}`}
              className="flex-shrink-0 group cursor-pointer fade-in-up"
              style={{ animationDelay: `${(index % featuredTours.length) * 0.1}s` }}
              onClick={() => handleTourClick(tour.slug)}
            >
              {/* Tour Card */}
              <div className="relative w-64 h-40 sm:w-80 sm:h-56 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl border border-white/10">
                {/* Image */}
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Shimmer Effect on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                
                {/* Tour Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                  <h4 className="text-white font-bold text-sm sm:text-xl line-clamp-2 group-hover:text-emerald-200 transition-colors duration-300 leading-tight text-center px-1">
                    {tour.title}
                  </h4>
                  
                  {/* Hover CTA */}
                  <div className="mt-2 sm:mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-center">
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-200 bg-emerald-500/20 px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-400/30">
                      <span className="hidden sm:inline">Explore Journey</span>
                      <span className="sm:hidden">Explore</span>
                      <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <span className="bg-white/90 text-slate-800 text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Auto-scroll Status */}
        <div className="flex items-center justify-center mt-6 sm:mt-8 space-x-4 opacity-75 px-4">
          <div className="hidden sm:flex items-center space-x-2 text-blue-100/60 text-sm">
            {isScrolling ? (
              <>
                <div className="animate-pulse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <span>Auto-scrolling • Use toggle to pause</span>
                <div className="animate-pulse">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6l5-3-5-3z" />
                </svg>
                <span>Scrolling paused • Click play to resume</span>
              </>
            )}
          </div>
          <div className="sm:hidden flex items-center space-x-2 text-blue-100/60 text-xs">
            {isScrolling ? (
              <>
                <div className="animate-pulse">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <span>Auto-scrolling</span>
              </>
            ) : (
              <span>Paused</span>
            )}
          </div>
        </div>
        
        {/* View All Tours Button */}
        <div className="flex justify-center mt-6 sm:mt-8 px-4">
          <button
            onClick={() => navigate('/tours')}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 group text-sm sm:text-base"
          >
            <span className="hidden sm:inline">View All Adventures</span>
            <span className="sm:hidden">View All Tours</span>
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTours;