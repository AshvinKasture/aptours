import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FeaturedTour } from "../types";
import { getTrekImagePath } from "../utils/assets";

const FeaturedTours: React.FC = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  // Dedicated featured tours data - minimal and curated
  const featuredTours: FeaturedTour[] = [
    {
      title: "Everest Base Camp Trek",
      image: getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek'),
      slug: "everest-base-camp-trek"
    },
    {
      title: "Annapurna Base Camp Trek",
      image: getTrekImagePath('Annapurna_Base_Camp_1.jpg', 'Annapurna_Base_Camp'),
      slug: "annapurna-base-camp-trek"
    },
    {
      title: "Kailash Mansarovar Yatra",
      image: getTrekImagePath('Kailash_stock.jpg'),
      slug: "kailash-mansarovar-yatra"
    },
    {
      title: "Langtang Valley Trek",
      image: getTrekImagePath('hidden_himalayan_valleys_stock.jpg'),
      slug: "langtang-valley-trek"
    },
    {
      title: "Manaslu Circuit Trek",
      image: getTrekImagePath('AnnapurnaLodge.jpg'),
      slug: "manaslu-circuit-trek"
    },
    {
      title: "Upper Mustang Trek",
      image: getTrekImagePath('BoudhnathStupa.jpg'),
      slug: "upper-mustang-trek"
    }
  ];
  // Duplicate tours for seamless infinite scroll
  const duplicatedTours = [...featuredTours, ...featuredTours];

  const handleTourClick = (slug: string) => {
    navigate(`/tours/${slug}`);
  };

  // Handle user scroll detection
  const handleUserScroll = () => {
    // Ignore programmatic scrolling
    if (isProgrammaticScrollRef.current) {
      isProgrammaticScrollRef.current = false;
      return;
    }
    
    setIsUserScrolling(true);

    // Clear existing timeout
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }

    // Resume auto-scroll after 3 seconds of no user interaction
    userScrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 3000);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (featuredTours.length === 0 || isUserScrolling) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = container.scrollLeft;

    const scroll = () => {
      if (container && !isUserScrolling) {
        scrollPosition += 0.5; // Slower, smoother scroll
        
        // Mark as programmatic scroll before changing scrollLeft
        isProgrammaticScrollRef.current = true;
        container.scrollLeft = scrollPosition;

        // Get the width of one set of tours (not duplicated)
        const singleSetWidth = container.scrollWidth / 2;
        
        // When we've scrolled through one complete set, seamlessly reset to the beginning
        // This creates the illusion of infinite scrolling since the content is identical
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = scrollPosition - singleSetWidth;
          isProgrammaticScrollRef.current = true;
          container.scrollLeft = scrollPosition;
        }
      }
    };

    const intervalId = setInterval(scroll, 20); // 50fps for smooth scrolling

    return () => {
      clearInterval(intervalId);
    };
  }, [featuredTours.length, isUserScrolling]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-1 sm:px-4">
      <div className="text-center mb-8 sm:mb-10"></div>

      <div className="relative">
        {/* Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-8 pb-6 scrollbar-hide px-2 sm:px-4 -mx-2 sm:-mx-4"
          style={{
            scrollBehavior: "auto",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          }}
          onScroll={() => {
            handleUserScroll();
          }}
        >
          {duplicatedTours.map((tour, index) => (
            <div
              key={`${tour.slug}-${index}`}
              className="flex-shrink-0 group cursor-pointer fade-in-up"
              style={{
                animationDelay: `${(index % featuredTours.length) * 0.1}s`,
              }}
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
                      <svg
                        className="ml-1 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
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

        {/* View All Tours Button */}
        <div className="flex justify-center mt-6 sm:mt-8 px-4">
          <button
            onClick={() => navigate("/tours")}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 group text-sm sm:text-base"
          >
            <span className="hidden sm:inline">View All Adventures</span>
            <span className="sm:hidden">View All Tours</span>
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTours;
