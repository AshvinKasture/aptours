import { Link } from 'react-router-dom';
import type { Trek } from '../types';

interface TrekCardProps {
  trek: Trek;
}

const TrekCard: React.FC<TrekCardProps> = ({ trek }) => {
  // Check environment variable for pricing display
  const showPricing = import.meta.env.VITE_SHOW_PRICING !== 'false';

  const getDifficultyColor = (difficulty?: Trek['difficulty']) => {
    if (!difficulty) return 'bg-gray-500/90';
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/90';
      case 'Moderate': return 'bg-emerald-500/90';
      case 'Challenging': return 'bg-orange-500/90';
      case 'Extreme': return 'bg-red-500/90';
      default: return 'bg-gray-500/90';
    }
  };

  const getPriceColor = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'text-sky-600';
      case 'Sacred Pilgrimage': return 'text-purple-600';
      case 'Nepal Family Package': return 'text-emerald-600';
      case 'Bike Rides': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getButtonGradient = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'from-sky-600 to-blue-600';
      case 'Sacred Pilgrimage': return 'from-purple-600 to-indigo-600';
      case 'Nepal Family Package': return 'from-emerald-600 to-green-600';
      case 'Bike Rides': return 'from-orange-600 to-red-600';
      default: return 'from-gray-600 to-slate-600';
    }
  };

  const getButtonHoverGradient = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'hover:from-sky-700 hover:to-blue-700';
      case 'Sacred Pilgrimage': return 'hover:from-purple-700 hover:to-indigo-700';
      case 'Nepal Family Package': return 'hover:from-emerald-700 hover:to-green-700';
      case 'Bike Rides': return 'hover:from-orange-700 hover:to-red-700';
      default: return 'hover:from-gray-700 hover:to-slate-700';
    }
  };

  const getTitleHoverColor = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'group-hover:text-sky-600';
      case 'Sacred Pilgrimage': return 'group-hover:text-purple-600';
      case 'Nepal Family Package': return 'group-hover:text-emerald-600';
      case 'Bike Rides': return 'group-hover:text-orange-600';
      default: return 'group-hover:text-gray-600';
    }
  };

  const getTypeIcon = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'fas fa-mountain';
      case 'Sacred Pilgrimage': return 'fas fa-om';
      case 'Nepal Family Package': return 'fas fa-leaf';
      case 'Bike Rides': return 'fas fa-motorcycle';
      default: return 'fas fa-mountain';
    }
  };

  return (
    <article className="trek-card group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img 
            src={trek.image}
            alt={trek.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/logo.png'; // Fallback to logo if image fails to load
            }}
          />
          {trek.difficulty && (
            <div className="absolute top-4 left-4">
              <span className={`difficulty-badge px-3 py-1 ${getDifficultyColor(trek.difficulty)} text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1`}>
                <i className="fas fa-chart-line"></i>
                {trek.difficulty}
              </span>
            </div>
          )}
          {trek.maxAltitude && (
            <div className="absolute top-4 right-4">
              <span className="duration-badge px-3 py-1 bg-slate-800/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
                <i className="fas fa-mountain"></i>
                {trek.maxAltitude}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <i className={`${getTypeIcon(trek.type)} ${getPriceColor(trek.type)}`}></i>
              <span className="text-sm text-slate-600 font-medium">{trek.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-clock text-blue-600 text-sm"></i>
              <span className="text-sm font-semibold text-slate-700">{trek.duration}</span>
            </div>
          </div>
          
          <h3 className={`text-xl font-bold text-slate-800 mb-2 ${getTitleHoverColor(trek.type)} transition-colors`}>
            {trek.title}
          </h3>
          
          <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
            {trek.shortDescription || trek.description}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between mt-auto">
            {showPricing ? (
              <div>
                <div className="text-xs text-slate-500 mb-1">Starting from</div>
                <div className={`text-2xl font-bold ${getPriceColor(trek.type)}`}>{trek.price}</div>
                <div className="text-xs text-slate-500">per person</div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to={`/tours/${trek.slug}`}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-yellow-700 transition-all duration-300"
                >
                  Enquire
                </Link>
              </div>
            )}
            
            <Link 
              to={`/tours/${trek.slug}`}
              className={`cta-button px-6 py-3 bg-gradient-to-r ${getButtonGradient(trek.type)} text-white font-semibold rounded-lg ${getButtonHoverGradient(trek.type)} transition-all duration-300 flex-shrink-0`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TrekCard;
