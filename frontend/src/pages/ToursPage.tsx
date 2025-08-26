import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Trek {
  id: number;
  name: string;
  image: string;
  category: string;
  type: string;
  typeIcon: string;
  difficulty: string;
  difficultyColor: string;
  duration: string;
  maxAltitude: string;
  groupSize: string;
  price: string;
  priceColor: string;
  buttonGradient: string;
  buttonHoverGradient: string;
  titleHoverColor: string;
  description: string;
}

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

  // Sample trek data (this would come from your backend/CMS in a real app)
  const treksData: Trek[] = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      image: "/aptours/assets/Everest_Base_Camp_stock.jpg",
      category: "himalayan adventure",
      type: "Himalayan Trek",
      typeIcon: "fas fa-mountain",
      difficulty: "Extreme",
      difficultyColor: "bg-red-500/90",
      duration: "15N / 16D",
      maxAltitude: "5,364m",
      groupSize: "8-12 pax",
      price: "₹1,85,000",
      priceColor: "text-sky-600",
      buttonGradient: "from-sky-600 to-blue-600",
      buttonHoverGradient: "hover:from-sky-700 hover:to-blue-700",
      titleHoverColor: "group-hover:text-sky-600",
      description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure."
    },
    {
      id: 2,
      name: "Kailash Mansarovar",
      image: "/aptours/assets/Kailash_stock.jpg",
      category: "pilgrimage",
      type: "Sacred Pilgrimage",
      typeIcon: "fas fa-om",
      difficulty: "Moderate",
      difficultyColor: "bg-orange-500/90",
      duration: "12N / 13D",
      maxAltitude: "5,640m",
      groupSize: "15-20 pax",
      price: "₹1,45,000",
      priceColor: "text-emerald-600",
      buttonGradient: "from-emerald-600 to-teal-600",
      buttonHoverGradient: "hover:from-emerald-700 hover:to-teal-700",
      titleHoverColor: "group-hover:text-emerald-600",
      description: "Sacred journey to Mount Kailash and Lake Mansarovar. A spiritual adventure combining breathtaking landscapes with profound religious significance."
    },
    {
      id: 3,
      name: "Hidden Himalayan Valleys",
      image: "/aptours/assets/hidden_himalayan_valleys_stock.jpg",
      category: "cultural adventure",
      type: "Cultural Trek",
      typeIcon: "fas fa-mountain",
      difficulty: "Moderate",
      difficultyColor: "bg-green-500/90",
      duration: "10N / 11D",
      maxAltitude: "4,200m",
      groupSize: "6-10 pax",
      price: "₹85,000",
      priceColor: "text-purple-600",
      buttonGradient: "from-purple-600 to-indigo-600",
      buttonHoverGradient: "hover:from-purple-700 hover:to-indigo-700",
      titleHoverColor: "group-hover:text-purple-600",
      description: "Explore hidden valleys, ancient monasteries, and traditional mountain villages. Immerse yourself in local culture and pristine natural beauty."
    }
  ];

  const filterButtons = [
    { id: 'all', label: 'All Treks' },
    { id: 'himalayan', label: 'Himalayan' },
    { id: 'pilgrimage', label: 'Pilgrimage' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'adventure', label: 'Adventure' }
  ];

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredTreks(treksData);
    } else {
      setFilteredTreks(treksData.filter(trek => trek.category.includes(selectedFilter)));
    }
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

  return (
    <div ref={pageTopRef} className="antialiased text-slate-50">
      <Header />

      {/* Filter Section */}
      <section className="filter-section py-4 md:py-8 px-4 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center">
            {filterButtons.map((button) => (
              <button
                key={button.id}
                className={`filter-btn px-3 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedFilter === button.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => handleFilterClick(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treks Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="treksGrid">
            {filteredTreks.map((trek) => (
              <div
                key={trek.id}
                className="group trek-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={trek.image}
                    alt={trek.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <i className={`${trek.typeIcon} text-sky-600 text-sm`}></i>
                    <span className="text-xs font-medium text-slate-700">{trek.type}</span>
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full ${trek.difficultyColor} text-white text-xs font-medium backdrop-blur-sm`}>
                    {trek.difficulty}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold text-slate-800 mb-3 transition-colors duration-300 ${trek.titleHoverColor}`}>
                    {trek.name}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {trek.description}
                  </p>

                  {/* Trek Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-calendar text-slate-400"></i>
                      <span className="text-slate-600">{trek.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-mountain text-slate-400"></i>
                      <span className="text-slate-600">{trek.maxAltitude}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-users text-slate-400"></i>
                      <span className="text-slate-600">{trek.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-tag text-slate-400"></i>
                      <span className={`font-semibold ${trek.priceColor}`}>{trek.price}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/tours/${trek.id}`}
                      className={`flex-1 text-center py-3 px-4 rounded-lg bg-gradient-to-r ${trek.buttonGradient} ${trek.buttonHoverGradient} text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/25`}
                    >
                      View Details
                    </Link>
                    <HashLink
                      smooth
                      to="/#contact"
                      scroll={scrollWithOffset}
                      className="px-4 py-3 rounded-lg border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
                    >
                      <i className="fas fa-envelope"></i>
                    </HashLink>
                  </div>
                </div>
              </div>
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
