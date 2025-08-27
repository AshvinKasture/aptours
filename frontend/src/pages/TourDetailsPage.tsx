import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTours } from '../contexts/TourContext';
import type { Trek } from '../types';

const TourDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTrekBySlug } = useTours();
  const [trek, setTrek] = useState<Trek | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Timeline/Itinerary state and functions
  const [currentDay, setCurrentDay] = useState<number>(1);
  
  // Get current trek's itinerary
  const currentItinerary = trek?.itinerary || [];
  
  // Timeline navigation functions
  const showDay = (day: number) => {
    setCurrentDay(day);
    updateTimelineProgress(day);
    
    // Force re-render to update active states
    setTimeout(() => {
      updateTimelineProgress(day);
    }, 100);
  };

  const nextDay = () => {
    if (currentDay < currentItinerary.length) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      updateTimelineProgress(newDay);
    }
  };

  const previousDay = () => {
    if (currentDay > 1) {
      const newDay = currentDay - 1;
      setCurrentDay(newDay);
      updateTimelineProgress(newDay);
    }
  };

  const updateTimelineProgress = (day: number) => {
    const progressElement = document.querySelector('.timeline-progress') as HTMLElement;
    if (progressElement && currentItinerary.length > 0) {
      const progressPercentage = ((day - 1) / (currentItinerary.length - 1)) * 100;
      progressElement.style.width = `${progressPercentage}%`;
    }
  };

  // Update timeline progress when component mounts or currentDay changes
  useEffect(() => {
    updateTimelineProgress(currentDay);
  }, [currentDay, currentItinerary.length]);
  
  const totalSlides = trek?.slideshowImages?.length || 3;

  // Custom scroll function with header offset for smooth scrolling
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Header height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Helper functions for styling (same as TrekCard)
  const getTypeIcon = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'fas fa-mountain';
      case 'Sacred Pilgrimage': return 'fas fa-om';
      case 'Nepal Family Package': return 'fas fa-leaf';
      case 'Bike Rides': return 'fas fa-motorcycle';
      default: return 'fas fa-mountain';
    }
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  useEffect(() => {
    if (slug) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        const trekDetails = getTrekBySlug(slug);
        setTrek(trekDetails || null);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [slug, getTrekBySlug]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (trek) {
      const interval = setInterval(() => {
        setCurrentSlide(current => current === totalSlides - 1 ? 0 : current + 1);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [trek, totalSlides]);

  if (isLoading) {
    return (
      <div className="antialiased text-slate-50">
        <Header />
        {/* Loading State */}
        <main className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
              <p className="mt-4 text-slate-600">Loading trek details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!trek) {
    return (
      <div className="antialiased text-slate-50">
        <Header />
        {/* Error State */}
        <main className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-20">
              <div className="text-6xl text-slate-300 mb-4">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-600 mb-2">Trek Not Found</h2>
              <p className="text-slate-500 mb-6">The trek you're looking for doesn't exist or has been removed.</p>
              <HashLink 
                to="/tours" 
                className="inline-block px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
              >
                Back to All Treks
              </HashLink>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="antialiased text-slate-50">
      <Header />
      
      {/* Combined Breadcrumb and Back Navigation */}
      <section className="py-4 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Back Icon Button */}
            <HashLink 
              to="/tours" 
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200"
              title="Back to All Treks"
            >
              <i className="fas fa-arrow-left text-sm"></i>
            </HashLink>
            
            {/* Breadcrumb */}
            <nav className="flex-1 min-w-0">
              <ol className="flex items-center space-x-2 text-sm">
                <li className="flex items-center">
                  <HashLink 
                    to="/"
                    className="text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    Home
                  </HashLink>
                </li>
                <li className="flex items-center">
                  <svg 
                    className="w-4 h-4 text-slate-400 mx-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <HashLink 
                    to="/tours"
                    className="text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    All Tours
                  </HashLink>
                </li>
                <li className="flex items-center">
                  <svg 
                    className="w-4 h-4 text-slate-400 mx-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="text-slate-600 font-medium truncate">
                    {trek?.title || "Tour Details"}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Trek Details Content */}
      <main className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image Carousel Section */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl mb-6">
            <div className="relative h-96 overflow-hidden">
              {/* Carousel Container */}
              <div className="relative w-full h-full">
                {/* Carousel Images */}
                <div className="relative w-full h-full">
                  {trek.slideshowImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${trek.title} - View ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/aptours/assets/logo.png';
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 text-slate-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {trek.slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-white/90 scale-120'
                          : 'bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column: Title + Stats + About */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trek Title Section */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full">
                    <i className={`${getTypeIcon(trek.type)} text-sm`}></i>
                    <span>{trek.type}</span>
                  </span>
                  {trek.difficulty && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                      <i className="fas fa-chart-line text-xs"></i>
                      <span>Difficulty: {trek.difficulty}</span>
                    </span>
                  )}
                  {trek.maxAltitude && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                      <i className="fas fa-mountain text-xs"></i>
                      <span>Max Altitude: {trek.maxAltitude}</span>
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{trek.title}</h1>
                <div className="flex items-center gap-2 text-slate-600 mb-2">
                  <i className="fas fa-clock text-blue-600"></i>
                  <span className="text-lg font-semibold">{trek.duration}</span>
                  <span className="text-sm">journey</span>
                </div>
              </div>

              {/* About This Trek Section (Desktop) */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Trek</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">{trek.description}</p>
                </div>
              </div>

              {/* Itinerary Section (Desktop) */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-8">
                  <i className="fas fa-route text-sky-600 mr-2"></i>
                  Detailed Itinerary
                </h2>
                
                {/* Desktop Timeline */}
                <div className="timeline-container desktop-timeline hidden md:block mb-8">
                  <div className="timeline-line">
                    <div className="timeline-progress"></div>
                  </div>
                  <div className="timeline-dots">
                    {currentItinerary.map((day: any, index: number) => (
                      <div 
                        key={index}
                        className={`timeline-dot ${currentDay === day.day ? 'active' : ''} ${currentDay > day.day ? 'completed' : ''}`}
                        onClick={() => showDay(day.day)}
                      >
                        <span className="timeline-dot-label">Day {day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Timeline */}
                <div className="mobile-timeline md:hidden mb-8">
                  <div className="day-selector">
                    <button 
                      className="nav-btn prev" 
                      onClick={previousDay}
                      disabled={currentDay === 1}
                    >
                      &#8249;
                    </button>
                    <span className="current-day">Day {currentDay}</span>
                    <button 
                      className="nav-btn next" 
                      onClick={nextDay}
                      disabled={currentDay === currentItinerary.length}
                    >
                      &#8250;
                    </button>
                  </div>
                  <div className="mobile-progress">
                    <div 
                      className="mobile-progress-bar"
                      style={{ 
                        width: `${((currentDay - 1) / (currentItinerary.length - 1)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Day Content */}
                <div className="day-content mb-8">
                  {currentItinerary.map((day: any, index: number) => (
                    <div 
                      key={index}
                      className={`day-detail ${currentDay === day.day ? 'active' : ''}`}
                    >
                      <div className="itinerary-day-content animate-fade-in">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{day.title}</h3>
                            <div className="w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-4"></div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-xl p-6">
                          <p className="text-slate-700 leading-relaxed">{day.description}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-6">
                          <button 
                            onClick={previousDay}
                            className={`flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-300 ${currentDay === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentDay === 1}
                          >
                            <i className="fas fa-chevron-left"></i>
                            Previous
                          </button>
                          
                          <span className="text-sm text-slate-500 font-medium">
                            {currentDay} of {currentItinerary.length} days
                          </span>
                          
                          <button 
                            onClick={nextDay}
                            className={`flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-300 ${currentDay === currentItinerary.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentDay === currentItinerary.length}
                          >
                            Next
                            <i className="fas fa-chevron-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Itinerary Disclaimer */}
                <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-exclamation-triangle text-amber-500 mt-1"></i>
                    <div>
                      <p className="text-sm text-amber-800 font-medium mb-1">Important Notice</p>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        * The itinerary is subject to change due to weather conditions, natural disasters, 
                        flight cancellations, or other unforeseen circumstances beyond our control. 
                        Safety is our top priority, and modifications may be necessary to ensure the 
                        wellbeing of all participants.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing + Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Section */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-sm text-slate-500 mb-2">Starting from</div>
                    <div className="text-4xl font-bold text-sky-600 mb-1">{trek.price}</div>
                    <div className="text-sm text-slate-500">per person</div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <HashLink
                      smooth
                      to="/#contact"
                      scroll={scrollWithOffset}
                      className="w-full block text-center px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Enquire Now
                    </HashLink>
                    
                    <button className="w-full px-6 py-3 border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all duration-300">
                      Download Itinerary
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 text-center">
                    <i className="fas fa-shield-alt mr-1"></i>
                    Best price guaranteed
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-phone text-sky-600"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">Call Us</div>
                        <div className="text-sm text-slate-600">+91 98220 20500</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-envelope text-sky-600"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">Email Us</div>
                        <div className="text-sm text-slate-600">info@aptours.in</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Title Section */}
          <div className="lg:hidden bg-white rounded-2xl p-6 shadow-xl mb-8">
            <div className="mb-4 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
                <i className={`${getTypeIcon(trek.type)} text-xs`}></i>
                <span>{trek.type}</span>
              </span>
              {trek.difficulty && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  <i className="fas fa-chart-line text-xs"></i>
                  <span>{trek.difficulty}</span>
                </span>
              )}
              {trek.maxAltitude && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  <i className="fas fa-mountain text-xs"></i>
                  <span>{trek.maxAltitude}</span>
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{trek.title}</h1>
            <div className="flex items-center gap-2 text-slate-600">
              <i className="fas fa-clock text-blue-600"></i>
              <span className="text-lg font-semibold">{trek.duration}</span>
              <span className="text-sm">journey</span>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="lg:hidden space-y-6">
            {/* Mobile Pricing Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-sm text-slate-500 mb-2">Starting from</div>
                <div className="text-4xl font-bold text-sky-600 mb-1">{trek.price}</div>
                <div className="text-sm text-slate-500">per person</div>
              </div>
              
              <div className="space-y-3 mb-6">
                <HashLink
                  smooth
                  to="/#contact"
                  scroll={scrollWithOffset}
                  className="w-full block text-center px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Enquire Now
                </HashLink>
                
                <button className="w-full px-6 py-3 border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all duration-300">
                  Download Itinerary
                </button>
              </div>

              <div className="text-xs text-slate-500 text-center">
                <i className="fas fa-shield-alt mr-1"></i>
                Best price guaranteed • Free cancellation
              </div>
            </div>

            {/* About This Trek Section (Mobile) */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Trek</h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">{trek.description}</p>
              </div>
            </div>

            {/* Itinerary Section (Mobile) */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">
                <i className="fas fa-route text-sky-600 mr-2"></i>
                Detailed Itinerary
              </h2>
              
              {/* Mobile Timeline */}
              <div className="mobile-timeline-container mb-6">
                <div className="mobile-timeline-dots">
                  {currentItinerary.map((day: any, index: number) => (
                    <div 
                      key={index}
                      className={`mobile-timeline-dot ${currentDay === day.day ? 'active' : ''} ${currentDay > day.day ? 'completed' : ''}`}
                      onClick={() => showDay(day.day)}
                    >
                      <span className="mobile-dot-label">Day {day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Content */}
              <div className="day-content mb-8">
                {currentItinerary.map((day: any, index: number) => (
                  <div 
                    key={index}
                    className={`day-detail ${currentDay === day.day ? 'active' : ''}`}
                  >
                    <div className="itinerary-day-content animate-fade-in">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {day.day}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{day.title}</h3>
                          <div className="w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-4"></div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 rounded-xl p-6">
                        <p className="text-slate-700 leading-relaxed">{day.description}</p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-6">
                        <button 
                          onClick={previousDay}
                          className={`flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-300 ${currentDay === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={currentDay === 1}
                        >
                          <i className="fas fa-chevron-left"></i>
                          Previous
                        </button>
                        
                        <span className="text-sm text-slate-500 font-medium">
                          {currentDay} of {currentItinerary.length} days
                        </span>
                        
                        <button 
                          onClick={nextDay}
                          className={`flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-300 ${currentDay === currentItinerary.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={currentDay === currentItinerary.length}
                        >
                          Next
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Itinerary Disclaimer */}
              <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <i className="fas fa-exclamation-triangle text-amber-500 mt-1"></i>
                  <div>
                    <p className="text-sm text-amber-800 font-medium mb-1">Important Notice</p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      * The itinerary is subject to change due to weather conditions, natural disasters, 
                      flight cancellations, or other unforeseen circumstances beyond our control. 
                      Safety is our top priority, and modifications may be necessary to ensure the 
                      wellbeing of all participants.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Contact Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-sky-600"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">Call Us</div>
                    <div className="text-sm text-slate-600">+91 98220 20500</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-sky-600"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">Email Us</div>
                    <div className="text-sm text-slate-600">info@aptours.in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TourDetailsPage;
