import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { Trek } from '../types';
import { getTrekImagePath } from '../utils/assets';

const TourDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
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
  const totalSlides = 3;

  // Custom scroll function with header offset for smooth scrolling
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Header height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Trek data using our Trek interface (same as ToursPage)
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
      groupSize: "8-12 people",
      price: "₹1,85,000",
      highlights: ['Sherpa culture', 'Tengboche Monastery', 'Kala Patthar viewpoint'],
      description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kathmandu",
          description: "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you'll be transferred to your hotel in Kathmandu. Meet your trek guide and fellow trekkers for a briefing about the upcoming adventure. Explore the vibrant streets of Thamel and enjoy authentic Nepali cuisine. Rest well as tomorrow begins your mountain journey. This is also a good time to do any last-minute shopping for trekking gear or souvenirs."
        },
        {
          day: 2,
          title: "Fly to Lukla, Trek to Phakding",
          description: "Early morning scenic flight to Lukla (2,840m), one of the world's most thrilling airports. Begin your trek through the beautiful Dudh Koshi valley towards Phakding (2,610m). Cross several suspension bridges decorated with colorful prayer flags. The trail offers stunning views of snow-capped peaks and provides the first taste of Sherpa culture. This gentle trek helps with acclimatization while enjoying the mountain atmosphere."
        },
        {
          day: 3,
          title: "Trek to Namche Bazaar",
          description: "Trek from Phakding to the famous Namche Bazaar (3,440m), the gateway to the Everest region. Cross the impressive Hillary Suspension Bridge and enter Sagarmatha National Park. The steep climb to Namche is challenging but rewarding, with first glimpses of Mount Everest on clear days. Namche is a bustling Sherpa town with markets, internet cafes, and stunning mountain views. This marks your entry into the high Himalayas."
        },
        {
          day: 4,
          title: "Acclimatization Day in Namche",
          description: "Important acclimatization day in Namche Bazaar. Take a day hike to Everest View Hotel (3,880m) for spectacular panoramic views of Everest, Lhotse, and Ama Dablam. Visit the Sherpa Culture Museum and learn about the history and traditions of the region. Explore the colorful Saturday market if timing allows. Rest and hydrate well to prepare your body for higher altitudes ahead."
        },
        {
          day: 5,
          title: "Trek to Tengboche Monastery",
          description: "Scenic trek to Tengboche (3,860m), home to the region's most important monastery. The trail offers incredible views of Everest, Nuptse, Lhotse, Ama Dablam, and other peaks. Visit the famous Tengboche Monastery, a spiritual center of the Khumbu region. If fortunate, witness the evening prayers of the Buddhist monks. The monastery sits on a ridge with 360-degree mountain views, making it one of the most scenic stops on the trek."
        }
      ]
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
      groupSize: "10-15 people",
      price: "₹2,25,000",
      highlights: ['Sacred Mt. Kailash', 'Mansarovar Lake', 'Spiritual journey'],
      description: "Embark on the most sacred pilgrimage in the Himalayas. Visit the divine Mount Kailash and the pristine Mansarovar Lake.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kathmandu",
          description: "Arrive in Kathmandu and transfer to hotel. Attend comprehensive briefing about the sacred Kailash Mansarovar pilgrimage. Complete necessary documentation and medical check-up. Visit Pashupatinath Temple for blessings before the holy journey. Prepare mentally and spiritually for this transformative pilgrimage. Rest well as the journey requires physical and mental preparation."
        },
        {
          day: 2,
          title: "Drive to Syabrubesi",
          description: "Early morning drive to Syabrubesi (1,550m), approximately 7-8 hours through scenic hills and valleys. Pass through traditional Nepali villages and terraced fields. Cross the border into Tibet and complete immigration formalities. The landscape gradually changes from subtropical to alpine. Overnight at guesthouse and prepare for the high-altitude journey ahead."
        },
        {
          day: 3,
          title: "Drive to Saga",
          description: "Long drive across the Tibetan plateau to Saga (4,640m). Experience the vast, open landscapes of Tibet with distant views of the Himalayas. Stop at local checkpoints and enjoy traditional Tibetan lunch. The high-altitude drive provides gradual acclimatization. Witness the unique Tibetan culture and Buddhist monasteries along the route. Rest and acclimatize in Saga for the night."
        },
        {
          day: 4,
          title: "First Darshan of Mount Kailash",
          description: "Drive to Darchen (4,560m) with the first magnificent darshan of sacred Mount Kailash. This moment is deeply spiritual for pilgrims as they witness the holy mountain in all its glory. Perform traditional prayers and offer gratitude for reaching this sacred place. Prepare for the holy Kailash Kora (circumambulation) starting tomorrow. The energy around Mount Kailash is palpable and transformative."
        },
        {
          day: 5,
          title: "Holy Mansarovar Lake",
          description: "Visit the sacred Mansarovar Lake (4,590m), one of the highest freshwater lakes in the world. Take holy bath in the pristine waters believed to cleanse sins and purify the soul. Perform puja and meditation on the shores of this divine lake. The crystal-clear waters reflect the snow-capped peaks creating a heavenly atmosphere. Experience profound peace and spiritual connection with the divine."
        }
      ]
    },
    {
      id: '3',
      title: "Nepal Cultural Family Tour",
      image: getTrekImagePath('BoudhnathStupa.jpg'),
      category: "cultural family",
      type: "Nepal Family Package",
      duration: "7N / 8D",
      groupSize: "4-8 people",
      price: "₹45,000",
      highlights: ['Kathmandu UNESCO sites', 'Boudhanath Stupa', 'Patan Durbar Square', 'Mountain views'],
      description: "Perfect family adventure exploring Nepal's rich cultural heritage, ancient temples, and stunning mountain views. Designed for all ages with comfortable accommodations.",
      itinerary: [
        {
          day: 1,
          title: "Arrival and Kathmandu Exploration",
          description: "Welcome to Nepal! Airport pickup and transfer to family-friendly hotel in Kathmandu. Begin with a visit to Swayambhunath (Monkey Temple) for panoramic views of the Kathmandu valley. Explore the colorful streets of Thamel with its shops, cafes, and vibrant atmosphere. Evening welcome dinner featuring traditional Nepali cuisine and cultural dance performance. Perfect introduction to Nepal's rich culture for the whole family."
        },
        {
          day: 2,
          title: "Kathmandu UNESCO World Heritage Sites",
          description: "Full day exploring Kathmandu's UNESCO World Heritage Sites. Visit the sacred Pashupatinath Temple on the banks of Bagmati River. Explore Boudhanath Stupa, one of the largest Buddhist stupas in the world. Walk through Kathmandu Durbar Square with its ancient palaces and temples. Each site offers unique insights into Nepal's religious and cultural diversity. Family-friendly guided tours with engaging stories for children."
        },
        {
          day: 3,
          title: "Patan and Bhaktapur Day Trip",
          description: "Visit the medieval cities of Patan and Bhaktapur, showcasing exquisite Newari architecture. Explore Patan Durbar Square with its intricate wood and stone carvings. Watch traditional craftsmen at work creating pottery, metalwork, and woodcarvings. Bhaktapur's well-preserved medieval charm offers excellent photo opportunities. Try local delicacies like king curd (juju dhau) and traditional sweets. Perfect cultural immersion for families."
        },
        {
          day: 4,
          title: "Sunrise at Nagarkot",
          description: "Early morning drive to Nagarkot (2,195m) for spectacular Himalayan sunrise views. On clear days, witness stunning views of Mount Everest, Langtang, and Annapurna ranges. Family-friendly hike through pine forests and terraced fields. Visit local villages and interact with friendly locals. Enjoy panoramic mountain vistas and fresh mountain air. Return to Kathmandu with lifetime memories of the Himalayas."
        },
        {
          day: 5,
          title: "Pokhara - City of Lakes",
          description: "Scenic drive or short flight to beautiful Pokhara (823m), the city of lakes. Enjoy boating on serene Phewa Lake with reflections of Annapurna range. Visit Devi's Falls and explore mysterious Gupteshwor Cave. Take the cable car to Sarangkot for stunning mountain views. Pokhara offers a relaxed atmosphere perfect for families with children. Evening lakeside stroll and dinner by the lake."
        }
      ]
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
      groupSize: "6-10 people",
      price: "₹85,000",
      highlights: ['Hidden valleys', 'Ancient monasteries', 'Traditional villages', 'Local culture'],
      description: "Explore hidden valleys, ancient monasteries, and traditional mountain villages. Immerse yourself in local culture and pristine natural beauty.",
      itinerary: [
        {
          day: 1,
          title: "Journey to Hidden Valley Base",
          description: "Begin the adventure with a scenic drive through winding mountain roads to reach the hidden valley base camp. Pass through traditional villages where time seems to have stopped. Meet local guides and porters who will share their knowledge of secret trails. Set up camp in a pristine meadow surrounded by towering peaks. Experience the tranquility of untouched wilderness as you prepare for the days ahead."
        },
        {
          day: 2,
          title: "Ancient Monastery Discovery",
          description: "Trek through rhododendron forests to discover a 500-year-old monastery hidden in the valley. Meet the resident monks who maintain ancient traditions and wisdom. Participate in morning prayers and meditation sessions. Learn about traditional Tibetan Buddhism and local customs. The monastery offers incredible views of snow-capped peaks and sacred valleys. Evening spent listening to monk's stories about the region's spiritual history."
        },
        {
          day: 3,
          title: "Traditional Village Immersion",
          description: "Visit remote mountain villages where families have lived for generations. Experience authentic mountain hospitality and traditional lifestyle. Participate in daily activities like farming, weaving, and food preparation. Learn about sustainable living practices adapted to high-altitude conditions. Share meals with local families and hear stories of mountain life. This cultural exchange provides deep insights into Himalayan communities."
        },
        {
          day: 4,
          title: "Secret Valley Exploration",
          description: "Venture into a secret valley known only to locals, accessible through a hidden trail. Discover pristine alpine lakes reflecting surrounding peaks. Encounter rare wildlife including blue sheep and golden eagles. The valley offers opportunities for meditation and spiritual reflection. Crystal-clear streams and wildflower meadows create a paradise-like setting. Camp under star-filled skies in this untouched wilderness sanctuary."
        }
      ]
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
      groupSize: "8-12 people",
      price: "₹1,25,000",
      highlights: ['Thorong La Pass', 'Diverse landscapes', 'Annapurna range', 'Mountain villages'],
      description: "Classic trek around the Annapurna massif featuring diverse landscapes, from subtropical forests to high alpine terrain with stunning mountain views.",
      itinerary: [
        {
          day: 1,
          title: "Drive to Besisahar and Trek Start",
          description: "Drive from Kathmandu to Besisahar (760m), the starting point of the classic Annapurna Circuit. Begin trekking through subtropical valleys with rice terraces and banana plantations. Experience the dramatic landscape changes as you gain altitude. Cross suspension bridges over roaring rivers and pass through traditional Gurung villages. The diverse ecosystems range from tropical to alpine within a single day's trek."
        },
        {
          day: 2,
          title: "Manang Valley Acclimatization",
          description: "Reach the beautiful Manang valley (3,519m), a crucial acclimatization stop. Spend an extra day to adjust to altitude while exploring this fascinating region. Visit the Himalayan Rescue Association for altitude sickness information. Explore traditional Tibetan-influenced culture and ancient monasteries. Take day hikes to Gangapurna Lake or climb to viewpoints for stunning Annapurna range vistas."
        },
        {
          day: 3,
          title: "Thorong La Pass Challenge",
          description: "Conquer the famous Thorong La Pass (5,416m), the highest point of the trek. Start early morning climb through rocky terrain and snow fields. Experience the triumph of reaching this legendary high-altitude pass. Enjoy spectacular 360-degree views of Annapurna, Dhaulagiri, and surrounding peaks. Descend to Muktinath, a sacred pilgrimage site for both Hindus and Buddhists."
        },
        {
          day: 4,
          title: "Descent to Pokhara Valley",
          description: "Complete the circuit with descent through diverse landscapes to Pokhara. Pass through the deepest gorge in the world between Annapurna and Dhaulagiri. Experience dramatic climate and vegetation changes from alpine to subtropical. Visit local villages and witness the traditional way of life. Celebrate completion of this epic journey in the beautiful lakeside city of Pokhara."
        }
      ]
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
      groupSize: "6-10 people",
      price: "₹1,55,000",
      highlights: ['Larkya La Pass', 'Remote valleys', 'Manaslu Base Camp', 'Tibetan culture'],
      description: "Off-the-beaten-path trek around Mount Manaslu, the eighth highest peak in the world, through remote valleys and traditional Tibetan villages.",
      itinerary: [
        {
          day: 1,
          title: "Journey to Soti Khola",
          description: "Drive from Kathmandu to Soti Khola (700m) through scenic hills and rural landscapes. This marks the beginning of the remote Manaslu Circuit adventure. The trail follows the Budhi Gandaki River through terraced fields and traditional villages. Experience the authentic rural life of Nepal away from tourist crowds. Set up camp and prepare for the wilderness trek ahead into the restricted Manaslu region."
        },
        {
          day: 2,
          title: "Remote Valley Exploration",
          description: "Trek through increasingly remote valleys with spectacular gorges and waterfalls. Cross numerous suspension bridges over the powerful Budhi Gandaki River. Pass through villages where Tibetan culture becomes more prominent. Encounter friendly locals maintaining traditional lifestyles unchanged for centuries. The landscape becomes more dramatic as you enter the heart of the Manaslu conservation area."
        },
        {
          day: 3,
          title: "Manaslu Base Camp Views",
          description: "Reach viewpoints offering magnificent vistas of Mount Manaslu (8,163m), the world's eighth highest peak. Trek through alpine meadows with yaks grazing peacefully. Visit ancient monasteries where monks practice traditional Buddhism. Experience the spiritual energy of this sacred mountain region. The close-up views of Manaslu's massive ice walls and seracs are breathtaking."
        },
        {
          day: 4,
          title: "Larkya La Pass Crossing",
          description: "Conquer the challenging Larkya La Pass (5,106m), the technical highlight of the trek. Navigate through glacial terrain and rocky moraines. Experience dramatic weather changes and spectacular mountain panoramas. The pass offers views of Himlung Himal, Cheo Himal, and Annapurna II. Descend into the Annapurna region, completing this incredible circuit trek around the magnificent Manaslu massif."
        }
      ]
    }
  ];

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

  // Get multiple images for carousel
  const getCarouselImages = (trek: Trek) => {
    const baseImage = trek.image;
    return [
      baseImage,
      baseImage, // For now, using same image - in real app, these would be different images
      baseImage
    ];
  };

  useEffect(() => {
    if (id) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        const trekDetails = treksData.find(t => t.id === id);
        setTrek(trekDetails || null);
        setIsLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [id]);

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
                to="/#tours" 
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

      {/* Back Navigation */}
      <section className="py-4 px-4 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <HashLink 
            to="/#tours" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
            <span className="text-sm font-medium">Back to All Treks</span>
          </HashLink>
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
                  {getCarouselImages(trek).map((image, index) => (
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
                  {getCarouselImages(trek).map((_, index) => (
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
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full">
                    <i className={`${getTypeIcon(trek.type)} text-sm`}></i>
                    <span>{trek.type}</span>
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">{trek.title}</h1>
              </div>

              {/* Quick Info Cards (Desktop) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-chart-line text-orange-600 text-xl"></i>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">Difficulty</div>
                  <div className="text-sm font-bold text-slate-800">{trek.difficulty || 'N/A'}</div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-mountain text-purple-600 text-xl"></i>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">Max Altitude</div>
                  <div className="text-sm font-bold text-slate-800">{trek.maxAltitude || 'N/A'}</div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-clock text-blue-600 text-xl"></i>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">Duration</div>
                  <div className="text-sm font-bold text-slate-800">{trek.duration}</div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-users text-green-600 text-xl"></i>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">Group Size</div>
                  <div className="text-sm font-bold text-slate-800">{trek.groupSize || 'N/A'}</div>
                </div>
              </div>

              {/* About This Trek Section (Desktop) */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Trek</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">{trek.description}</p>
                  
                  {/* Placeholder for future detailed content */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 text-center">
                      <i className="fas fa-info-circle mr-2"></i>
                      Detailed itinerary, inclusions, and other information will be added here.
                    </p>
                  </div>
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
                    Best price guaranteed • Free cancellation
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
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 text-sm font-semibold rounded-full">
                <i className={`${getTypeIcon(trek.type)} text-sm`}></i>
                <span>{trek.type}</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{trek.title}</h1>
            
            {/* Mobile Compact Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-orange-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Difficulty</div>
                  <div className="text-sm font-bold text-slate-800">{trek.difficulty || 'N/A'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-mountain text-purple-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Max Altitude</div>
                  <div className="text-sm font-bold text-slate-800">{trek.maxAltitude || 'N/A'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-clock text-blue-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="text-sm font-bold text-slate-800">{trek.duration}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-green-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Group Size</div>
                  <div className="text-sm font-bold text-slate-800">{trek.groupSize || 'N/A'}</div>
                </div>
              </div>
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
                
                {/* Placeholder for future detailed content */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 text-center">
                    <i className="fas fa-info-circle mr-2"></i>
                    Detailed itinerary, inclusions, and other information will be added here.
                  </p>
                </div>
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
