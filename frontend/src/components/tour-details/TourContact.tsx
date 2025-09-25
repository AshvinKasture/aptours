import { useEnquiryModal } from '../../contexts/EnquiryModalContext';

interface TourContactProps {
  onScrollWithOffset?: (el: HTMLElement) => void;
}

const TourContact = (_: TourContactProps) => {
  const { openModal } = useEnquiryModal();
  // Check environment variable for pricing display
  const showPricing = import.meta.env.VITE_SHOW_PRICING !== 'false';

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Need Help?</h3>
      
      {!showPricing && (
        <div className="mb-4">
          <button
            onClick={openModal}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
          >
            Enquire Now
          </button>
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
            <i className="fas fa-phone text-sky-600"></i>
          </div>
          <div>
            <div className="text-sm font-medium text-slate-800">Call Us</div>
            <div className="text-sm text-slate-600">+91 92702 48887</div>
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
  );
};

export default TourContact;
