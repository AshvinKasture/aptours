import { useRef, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrekCard from '../components/TrekCard';
import Breadcrumb from '../components/Breadcrumb';
import { useTours } from '../contexts/TourContext';

const ToursPage = () => {
  const pageTopRef = useRef<HTMLDivElement>(null);
  const { filteredTreks } = useTours();

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
  }, []);

  return (
    <div ref={pageTopRef} className="antialiased text-slate-50">
      <Header />
      <Breadcrumb showFilter={true} />

      {/* Treks Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          {filteredTreks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="treksGrid">
              {filteredTreks.map((trek) => (
                <TrekCard key={trek.slug} trek={trek} />
              ))}
            </div>
          ) : (
            /* Ultra-Minimal No Results State */
            <div className="text-center py-8">
              <div className="max-w-xs mx-auto">
                <svg className="mx-auto h-12 w-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-600 mb-1">No treks in this category</h3>
                <p className="text-slate-500 text-sm mb-3">Select "All Categories" from the dropdown above to see all treks</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-20 px-4 bg-gradient-to-br from-sky-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <div className="floating mb-6">
            <i className="fas fa-compass text-6xl text-white/80"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Can't Find Your Perfect Trek?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            We specialize in creating custom trekking experiences tailored to your preferences, fitness level, and time constraints.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HashLink 
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              className="inline-block px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Request Custom Trek
            </HashLink>
            <a 
              href="tel:+919822020500" 
              className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Speak to Expert
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToursPage;
