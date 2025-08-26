import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import type { Trek } from '../types';

const ToursSection: React.FC = () => {
  // Sample trek data - this would normally come from a backend API
  const featuredTreks: Trek[] = [
    {
      id: '1',
      title: 'Everest Base Camp',
      description: 'Journey to the base of the world\'s highest mountain through breathtaking Himalayan landscapes.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '14 days',
      difficulty: 'Challenging',
      price: 'Starting from ₹85,000',
      highlights: ['Sherpa culture', 'Tengboche Monastery', 'Kala Patthar viewpoint']
    },
    {
      id: '2',
      title: 'Kailash Mansarovar',
      description: 'Sacred pilgrimage to Mount Kailash and the holy Mansarovar Lake in Tibet.',
      image: 'https://images.unsplash.com/photo-1601821139990-9fc929db79ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '12 days',
      difficulty: 'Moderate',
      price: 'Starting from ₹1,25,000',
      highlights: ['Sacred Mt. Kailash', 'Mansarovar Lake', 'Spiritual journey']
    },
    {
      id: '3',
      title: 'Hidden Himalayan Valleys',
      description: 'Explore remote valleys and ancient villages in the lesser-known regions of the Himalayas.',
      image: 'https://images.unsplash.com/photo-1640179563805-184d0da2ba6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      duration: '10 days',
      difficulty: 'Moderate',
      price: 'Starting from ₹65,000',
      highlights: ['Remote villages', 'Local culture', 'Pristine nature']
    }
  ];

  const getDifficultyColor = (difficulty: Trek['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-orange-100 text-orange-800';
      case 'Extreme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="tours" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Featured Treks & Tours
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Embark on extraordinary journeys through breathtaking landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <HashLink 
              to="/tours"
              smooth
              className="inline-block px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all duration-300"
            >
              View All Tours
            </HashLink>
            <HashLink 
              smooth
              to="/#contact"
              className="inline-block px-6 py-3 rounded-lg border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-300"
            >
              Request Custom Package
            </HashLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTreks.map((trek) => (
            <div 
              key={trek.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={trek.image}
                  alt={trek.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trek.difficulty)}`}>
                    {trek.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {trek.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {trek.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-clock"></i>
                    {trek.duration}
                  </span>
                  <span className="font-semibold text-sky-600">
                    {trek.price}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-slate-500 mb-2">Highlights:</div>
                  <div className="flex flex-wrap gap-2">
                    {trek.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link 
                  to={`/tours/${trek.id}`}
                  className="w-full block text-center px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
