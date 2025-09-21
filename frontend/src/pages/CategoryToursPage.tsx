import { useRef, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrekCard from '../components/TrekCard';
import { useTours } from '../contexts/TourContext';

const CategoryToursPage = () => {
  const pageTopRef = useRef<HTMLDivElement>(null);
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { getCategoryBySlug, getToursByCategory } = useTours();

  // Get category and tours - memoized to prevent recalculation
  const category = useMemo(() => {
    return categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  }, [categorySlug, getCategoryBySlug]);

  const categoryTours = useMemo(() => {
    return categorySlug ? getToursByCategory(categorySlug) : [];
  }, [categorySlug, getToursByCategory]);

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
  }, [categorySlug]);

  // If category not found, redirect to tours page
  if (!category) {
    return <Navigate to="/tours" replace />;
  }

  return (
    <div ref={pageTopRef} className="antialiased text-slate-50">
      <Header />
      
      {/* Category Breadcrumb */}
      <section className="py-4 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Back Icon Button */}
            <HashLink 
              to="/tours" 
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200"
              title="Back to All Tours"
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
                    Tours
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
                    {category.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Category Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-sky-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            {category.title}
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {category.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-blue-100">
              <i className="fas fa-route"></i>
              <span>{categoryTours.length} Adventures Available</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-blue-300/50"></div>
            <div className="flex items-center gap-2 text-blue-100">
              <i className="fas fa-star"></i>
              <span>Expert Guided Experiences</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tours Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {category.title} Adventures
            </h2>
            <p className="text-slate-600 max-w-2xl">
              Discover our carefully curated collection of {category.title.toLowerCase()} experiences, 
              designed to provide you with unforgettable memories and authentic adventures.
            </p>
          </div>

          {categoryTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="categoryToursGrid">
              {categoryTours.map((trek) => (
                <TrekCard key={trek.slug} trek={trek} />
              ))}
            </div>
          ) : (
            /* No Tours in Category */
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-mountain text-slate-400 text-xl"></i>
                </div>
                <h3 className="text-xl font-medium text-slate-600 mb-2">No Tours Available</h3>
                <p className="text-slate-500 mb-6">
                  We're currently updating our {category.title.toLowerCase()} collection. 
                  Check back soon for new adventures!
                </p>
                <HashLink 
                  to="/tours"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span>Browse All Tours</span>
                </HashLink>
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
            Ready for Your {category.title} Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let our expert team help you plan the perfect {category.title.toLowerCase()} experience 
            tailored to your preferences and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HashLink 
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              className="inline-block px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Plan Your Journey
            </HashLink>
            <a 
              href="tel:+919270248887" 
              className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Call Expert: +91 92702 48887
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryToursPage;