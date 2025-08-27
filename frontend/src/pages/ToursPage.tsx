import { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrekCard from '../components/TrekCard';
import Breadcrumb from '../components/Breadcrumb';
import type { Trek } from '../types';
import { getTrekImagePath } from '../utils/assets';

const ToursPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredTreks, setFilteredTreks] = useState<Trek[]>([]);
  const pageTopRef = useRef<HTMLDivElement>(null);

  // Custom scroll function with header offset for smooth scrolling
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Header height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Sample trek data using our Trek interface
  const treksData: Trek[] = [
    {
      id: '1',
      title: "Everest Base Camp Trek",
      image: getTrekImagePath('Everest_Base_Camp_stock.jpg'),
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Extreme",
      duration: "15N / 16D",
      maxAltitude: "5,364m",
      price: "₹1,85,000",
      highlights: ['Sherpa culture', 'Tengboche Monastery', 'Kala Patthar viewpoint'],
      description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure."
    },
    {
      id: '2',
      title: "Mount Kailash Mansarovar",
      image: getTrekImagePath('Kailash_stock.jpg'),
      category: "pilgrimage",
      type: "Sacred Pilgrimage",
      difficulty: "Challenging",
      duration: "11N / 12D",
      maxAltitude: "5,630m",
      price: "₹2,25,000",
      highlights: ['Sacred Mt. Kailash', 'Mansarovar Lake', 'Spiritual journey'],
      description: "Embark on the most sacred pilgrimage in the Himalayas. Visit the divine Mount Kailash and the pristine Mansarovar Lake."
    },
    {
      id: '3',
      title: "Nepal Cultural Family Tour",
      image: getTrekImagePath('BoudhnathStupa.jpg'),
      category: "cultural family",
      type: "Nepal Family Package",
      duration: "7N / 8D",
      price: "₹45,000",
      highlights: ['Kathmandu UNESCO sites', 'Boudhanath Stupa', 'Patan Durbar Square', 'Mountain views'],
      description: "Perfect family adventure exploring Nepal's rich cultural heritage, ancient temples, and stunning mountain views. Designed for all ages with comfortable accommodations."
    },
    {
      id: '4',
      title: "Hidden Himalayan Valleys",
      image: getTrekImagePath('hidden_himalayan_valleys_stock.jpg'),
      category: "cultural adventure",
      type: "Himalayan Trek",
      difficulty: "Moderate",
      duration: "10N / 11D",
      maxAltitude: "4,200m",
      price: "₹85,000",
      highlights: ['Hidden valleys', 'Ancient monasteries', 'Traditional villages', 'Local culture'],
      description: "Explore hidden valleys, ancient monasteries, and traditional mountain villages. Immerse yourself in local culture and pristine natural beauty."
    },
    {
      id: '5',
      title: "Annapurna Circuit Trek",
      image: getTrekImagePath('AnnapurnaBaseCamp.jpg'),
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Challenging",
      duration: "14N / 15D",
      maxAltitude: "5,416m",
      price: "₹1,25,000",
      highlights: ['Thorong La Pass', 'Diverse landscapes', 'Annapurna range', 'Mountain villages'],
      description: "Classic trek around the Annapurna massif featuring diverse landscapes, from subtropical forests to high alpine terrain with stunning mountain views."
    },
    {
      id: '6',
      title: "Manaslu Circuit Trek",
      image: getTrekImagePath('AnnapurnaLodge.jpg'),
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Challenging",
      duration: "16N / 17D",
      maxAltitude: "5,106m",
      price: "₹1,55,000",
      highlights: ['Larkya La Pass', 'Remote valleys', 'Manaslu Base Camp', 'Tibetan culture'],
      description: "Off-the-beaten-path trek around Mount Manaslu, the eighth highest peak in the world, through remote valleys and traditional Tibetan villages."
    }
  ];

  const filterButtons = [
    { 
      id: 'all', 
      label: 'All Treks', 
      icon: '🏔️',
      color: 'from-slate-500 to-slate-600',
      description: 'All available treks'
    },
    { 
      id: 'himalayan', 
      label: 'Himalayan', 
      icon: '⛰️',
      color: 'from-blue-500 to-indigo-600',
      description: 'High altitude adventures'
    },
    { 
      id: 'pilgrimage', 
      label: 'Pilgrimage', 
      icon: '🙏',
      color: 'from-amber-500 to-orange-600',
      description: 'Sacred spiritual journeys'
    },
    { 
      id: 'cultural', 
      label: 'Cultural', 
      icon: '🏛️',
      color: 'from-emerald-500 to-teal-600',
      description: 'Heritage & traditions'
    },
    { 
      id: 'adventure', 
      label: 'Adventure', 
      icon: '🎒',
      color: 'from-red-500 to-pink-600',
      description: 'Thrilling expeditions'
    }
  ];

  useEffect(() => {
    let filtered = treksData;

    // Filter by category
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(trek => trek.category?.includes(selectedFilter));
    }

    setFilteredTreks(filtered);
  }, [selectedFilter]);

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

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getFilterCount = (filterId: string) => {
    return treksData.filter(trek => trek.category?.includes(filterId)).length;
  };

  const getAllCount = () => {
    return treksData.length;
  };

  return (
    <div ref={pageTopRef} className="antialiased text-slate-50">
      <Header />
      <Breadcrumb 
        showFilter={true}
        filterOptions={filterButtons.slice(1)} // Remove 'All' option since it's the default
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterClick}
        getAllCount={getAllCount}
        getFilterCount={getFilterCount}
      />

      {/* Treks Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          {filteredTreks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="treksGrid">
              {filteredTreks.map((trek) => (
                <TrekCard key={trek.id} trek={trek} />
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
