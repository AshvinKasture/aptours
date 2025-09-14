const TourContact = () => {
  return (
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
  );
};

export default TourContact;
