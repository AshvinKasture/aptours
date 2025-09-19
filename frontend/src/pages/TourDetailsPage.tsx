import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTours } from '../contexts/TourContext';
import type { Trek } from '../types';
import {
  TourBreadcrumb,
  TourCarousel,
  TourHeader,
  TourPricing,
  TourContact,
  TourAbout,
  TourItinerary,
  LoadingSpinner,
  NotFoundTrek,
  MobileTourHeader,
  MobileTourPricing
} from '../components/tour-details';

const TourDetailsPage = () => {
  const pageTopRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { getTrekBySlug, getCategoryForTour } = useTours();
  const [trek, setTrek] = useState<Trek | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check environment variable for pricing display
  const showPricing = import.meta.env.VITE_SHOW_PRICING !== 'false';

  // Custom scroll function with header offset for smooth scrolling
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Header height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Scroll to top when component mounts - React best practice with useRef
  useEffect(() => {
    const scrollToTop = () => {
      if (pageTopRef.current) {
        pageTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to window scrollTo if ref not available
        window.scrollTo(0, 0);
      }
    };
    
    // Small delay to ensure page is fully loaded
    const timeoutId = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timeoutId);
  }, [slug]);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!trek) {
    return <NotFoundTrek />;
  }

  // Get category for this tour
  const category = trek ? getCategoryForTour(trek.slug) : undefined;

  return (
    <div ref={pageTopRef} className="antialiased text-slate-50">
      <Header />
      
      <TourBreadcrumb trekTitle={trek.title} category={category} />

      {/* Trek Details Content */}
      <main className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image Carousel Section */}
          <TourCarousel images={trek.slideshowImages} title={trek.title} />

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column: Title + Stats + About */}
            <div className="lg:col-span-2 space-y-6">
              <TourHeader trek={trek} />
              <TourAbout description={trek.description} />
              {trek.itinerary && <TourItinerary itinerary={trek.itinerary} />}
            </div>

            {/* Right Column: Pricing + Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {showPricing && <TourPricing price={trek.price} onScrollWithOffset={scrollWithOffset} />}
                <TourContact onScrollWithOffset={scrollWithOffset} />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <MobileTourHeader trek={trek} />

          <div className="lg:hidden space-y-6">
            {showPricing && <MobileTourPricing price={trek.price} onScrollWithOffset={scrollWithOffset} />}
            <TourAbout description={trek.description} />
            {trek.itinerary && <TourItinerary itinerary={trek.itinerary} />}
            <TourContact onScrollWithOffset={scrollWithOffset} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TourDetailsPage;
