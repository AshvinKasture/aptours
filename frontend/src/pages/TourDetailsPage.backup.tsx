import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface TrekDetails {
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
  description: string;
  detailedDescription: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  bestTime: string;
  location: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

const TourDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [trek, setTrek] = useState<TrekDetails | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample detailed trek data (this would come from your backend/CMS in a real app)
  const trekDetailsData: TrekDetails[] = [
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
      description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure.",
      detailedDescription: "The Everest Base Camp Trek is the ultimate adventure for mountaineering enthusiasts and trekkers seeking to witness the world's highest peak up close. This iconic journey takes you through stunning Himalayan landscapes, traditional Sherpa villages, and ancient monasteries, culminating at the base camp of Mount Everest at 5,364 meters.",
      location: "Nepal Himalayas",
      bestTime: "March-May, September-November",
      highlights: [
        "Stand at Everest Base Camp (5,364m)",
        "Spectacular views of Mount Everest, Lhotse, and Ama Dablam",
        "Experience authentic Sherpa culture and hospitality",
        "Visit the famous Tengboche Monastery",
        "Cross thrilling suspension bridges",
        "Trek through UNESCO World Heritage Sagarmatha National Park"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kathmandu",
          description: "Arrive at Tribhuvan International Airport, Kathmandu. Transfer to hotel. Briefing about the trek and equipment check. Explore Thamel area in the evening."
        },
        {
          day: 2,
          title: "Fly to Lukla & Trek to Phakding",
          description: "Early morning scenic flight to Lukla (2,840m). Begin trekking to Phakding (2,610m). Walk through beautiful landscapes and cross suspension bridges."
        },
        {
          day: 3,
          title: "Phakding to Namche Bazaar",
          description: "Trek to Namche Bazaar (3,440m), the Sherpa capital. Cross several suspension bridges including the famous Hillary Bridge."
        },
        {
          day: 4,
          title: "Acclimatization Day in Namche",
          description: "Rest day for acclimatization. Hike to Everest View Hotel for stunning mountain views. Visit Sherpa Museum."
        },
        {
          day: 5,
          title: "Namche to Tengboche",
          description: "Trek to Tengboche (3,860m) through rhododendron forests. Visit the famous Tengboche Monastery."
        }
      ],
      inclusions: [
        "Accommodation in tea houses/lodges",
        "All meals during the trek",
        "Experienced English-speaking guide",
        "Porter service (1 porter for 2 trekkers)",
        "All permits and fees",
        "Domestic flights (Kathmandu-Lukla-Kathmandu)",
        "Airport transfers in Kathmandu",
        "First aid kit and oxygen meter"
      ],
      exclusions: [
        "International airfare",
        "Nepal visa fees",
        "Personal trekking equipment",
        "Personal expenses and tips",
        "Travel insurance",
        "Emergency helicopter evacuation",
        "Extra nights in Kathmandu",
        "Alcoholic beverages and soft drinks"
      ],
      requirements: [
        "Good physical fitness level",
        "Previous trekking experience recommended",
        "Proper trekking gear and clothing",
        "Travel insurance covering high altitude",
        "Medical clearance if required",
        "Positive attitude and team spirit"
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      const trekDetails = trekDetailsData.find(t => t.id === parseInt(id));
      setTrek(trekDetails || null);
    }
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'fas fa-info-circle' },
    { id: 'itinerary', label: 'Itinerary', icon: 'fas fa-route' },
    { id: 'inclusions', label: 'Inclusions', icon: 'fas fa-check-circle' },
    { id: 'requirements', label: 'Requirements', icon: 'fas fa-list-ul' }
  ];

  if (!trek) {
    return (
      <div className="antialiased text-slate-50">
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Trek Not Found</h1>
            <Link to="/treks" className="text-sky-600 hover:underline">
              ← Back to All Treks
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="antialiased text-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={trek.image}
          alt={trek.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <i className={`${trek.typeIcon} text-sky-600 text-sm`}></i>
                  <span className="text-xs font-medium text-slate-700">{trek.type}</span>
                </div>
                <div className={`px-3 py-1 rounded-full ${trek.difficultyColor} text-white text-xs font-medium backdrop-blur-sm`}>
                  {trek.difficulty}
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
                {trek.name}
              </h1>
              
              <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                {trek.description}
              </p>

              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <i className="fas fa-calendar"></i>
                  <span>{trek.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-mountain"></i>
                  <span>{trek.maxAltitude}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-users"></i>
                  <span>{trek.groupSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{trek.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <div>
                <div className="text-sm text-slate-500">Best Time</div>
                <div className="font-semibold text-slate-800">{trek.bestTime}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Starting From</div>
                <div className={`text-2xl font-bold ${trek.priceColor}`}>{trek.price}</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-medium transition-all duration-300 hover:shadow-lg"
              >
                Book Now
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
              >
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={tab.icon}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'overview' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">About This Trek</h3>
              <p className="text-slate-600 leading-relaxed mb-8">{trek.detailedDescription}</p>
              
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trek.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <i className="fas fa-star text-amber-500 mt-1"></i>
                    <span className="text-slate-600">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Daily Itinerary</h3>
              <div className="space-y-6">
                {trek.itinerary.map((day) => (
                  <div key={day.day} className="border-l-4 border-sky-600 pl-6 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-bold">
                        {day.day}
                      </div>
                      <h4 className="text-lg font-semibold text-slate-800">Day {day.day}: {day.title}</h4>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-6">
                  <i className="fas fa-check-circle mr-2"></i>
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {trek.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="fas fa-check text-emerald-500 mt-1"></i>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-2xl font-bold text-red-600 mb-6">
                  <i className="fas fa-times-circle mr-2"></i>
                  What's Not Included
                </h3>
                <ul className="space-y-3">
                  {trek.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="fas fa-times text-red-500 mt-1"></i>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Prerequisites & Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trek.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <i className="fas fa-exclamation-triangle text-amber-500 mt-1"></i>
                    <span className="text-slate-600">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-sky-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join us for an unforgettable journey. Our experienced guides and comprehensive planning ensure your safety and enjoyment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="inline-block px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Book This Trek
            </Link>
            <a 
              href="tel:+919270248887" 
              className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Call Expert
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TourDetailsPage;
