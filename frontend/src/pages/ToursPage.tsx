import { useRef, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrekCard from '../components/TrekCard';
import CategoryCard from '../components/CategoryCard';
import { useTours } from '../contexts/TourContext';

const ToursPage = () => {
  const pageTopRef = useRef<HTMLDivElement>(null);
  const { tourItems } = useTours();

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

      {/* Tours and Categories Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-12 text-center">Our Tours</h1>
          
          {/* Unified Grid for Categories and Individual Tours */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourItems.map((item) => (
              item.type === 'category' ? (
                <CategoryCard key={item.category!.slug} category={item.category!} />
              ) : (
                <TrekCard key={item.tour!.slug} trek={item.tour!} />
              )
            ))}
          </div>
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
              href="tel:+919270248887" 
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
