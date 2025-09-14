import { HashLink } from 'react-router-hash-link';

interface TourPricingProps {
  price: string;
  onScrollWithOffset: (el: HTMLElement) => void;
}

const TourPricing = ({ price, onScrollWithOffset }: TourPricingProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <div className="text-sm text-slate-500 mb-2">Starting from</div>
        <div className="text-4xl font-bold text-sky-600 mb-1">{price}</div>
        <div className="text-sm text-slate-500">per person</div>
      </div>
      
      <div className="space-y-3 mb-6">
        <HashLink
          smooth
          to="/#contact"
          scroll={onScrollWithOffset}
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
        Best price guaranteed
      </div>
    </div>
  );
};

export default TourPricing;
