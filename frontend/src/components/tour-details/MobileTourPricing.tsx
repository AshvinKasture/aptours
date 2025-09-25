import { useEnquiryModal } from '../../contexts/EnquiryModalContext';

interface MobileTourPricingProps {
  price: string;
}

const MobileTourPricing = ({ price }: MobileTourPricingProps) => {
  const { openModal } = useEnquiryModal();
  // Check environment variable for pricing display
  const showPricing = import.meta.env.VITE_SHOW_PRICING !== 'false';

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        {showPricing ? (
          <>
            <div className="text-sm text-slate-500 mb-2">Starting from</div>
            <div className="text-4xl font-bold text-sky-600 mb-1">{price}</div>
            <div className="text-sm text-slate-500">per person</div>
          </>
        ) : (
          <>
            <div className="text-lg font-semibold text-slate-700 mb-2">Price Available on Enquiry</div>
            <div className="text-sm text-slate-500">Contact us for competitive pricing</div>
          </>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        <button
          onClick={openModal}
          className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Enquire Now
        </button>
        
        <button className="w-full px-6 py-3 border-2 border-sky-600 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-all duration-300">
          Download Itinerary
        </button>
      </div>

      <div className="text-xs text-slate-500 text-center">
        <i className="fas fa-shield-alt mr-1"></i>
        {showPricing ? 'Best price guaranteed • Free cancellation' : 'Quick response guaranteed • Free consultation'}
      </div>
    </div>
  );
};

export default MobileTourPricing;
