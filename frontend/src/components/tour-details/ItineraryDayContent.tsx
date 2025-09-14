import type { ItineraryDay } from '../../types';

interface ItineraryDayContentProps {
  itinerary: ItineraryDay[];
  currentDay: number;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

const ItineraryDayContent = ({ 
  itinerary, 
  currentDay, 
  onPreviousDay, 
  onNextDay 
}: ItineraryDayContentProps) => {
  return (
    <div className="day-content mb-8">
      {itinerary.map((day, index) => (
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
                {day.subtitle && (
                  <p className="text-sm text-slate-600 mb-3 font-medium">{day.subtitle}</p>
                )}
                <div className="w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-4"></div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6">
              <p className="text-slate-700 leading-relaxed">{day.description}</p>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <button 
                onClick={onPreviousDay}
                className={`flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-300 ${currentDay === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentDay === 1}
              >
                <i className="fas fa-chevron-left"></i>
                Previous
              </button>
              
              <span className="text-sm text-slate-500 font-medium">
                {currentDay} of {itinerary.length} days
              </span>
              
              <button 
                onClick={onNextDay}
                className={`flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-300 ${currentDay === itinerary.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentDay === itinerary.length}
              >
                Next
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryDayContent;
