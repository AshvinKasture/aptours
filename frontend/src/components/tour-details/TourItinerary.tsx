import { useState, useEffect } from 'react';
import ItineraryTimeline from './ItineraryTimeline';
import ItineraryDayContent from './ItineraryDayContent';
import type { ItineraryDay } from '../../types';

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

const TourItinerary = ({ itinerary }: TourItineraryProps) => {
  const [currentDay, setCurrentDay] = useState<number>(1);

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
    if (currentDay < itinerary.length) {
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
    if (progressElement && itinerary.length > 0) {
      const progressPercentage = ((day - 1) / (itinerary.length - 1)) * 100;
      progressElement.style.width = `${progressPercentage}%`;
    }
  };

  // Update timeline progress when component mounts or currentDay changes
  useEffect(() => {
    updateTimelineProgress(currentDay);
  }, [currentDay, itinerary.length]);

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        <i className="fas fa-route text-sky-600 mr-2"></i>
        Detailed Itinerary
      </h2>
      
      {/* Desktop Timeline */}
      <ItineraryTimeline 
        itinerary={itinerary}
        currentDay={currentDay}
        onDaySelect={showDay}
        isMobile={false}
      />

      {/* Mobile Timeline */}
      <div className="md:hidden">
        <ItineraryTimeline 
          itinerary={itinerary}
          currentDay={currentDay}
          onDaySelect={showDay}
          isMobile={true}
        />
      </div>

      {/* Day Content */}
      <ItineraryDayContent 
        itinerary={itinerary}
        currentDay={currentDay}
        onPreviousDay={previousDay}
        onNextDay={nextDay}
      />
      
      {/* Itinerary Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
        <div className="flex items-start gap-3">
          <i className="fas fa-exclamation-triangle text-amber-500 mt-1"></i>
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">Important Notice</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              * The itinerary is subject to change due to weather conditions, natural disasters, 
              flight cancellations, or other unforeseen circumstances beyond our control. 
              Safety is our top priority, and modifications may be necessary to ensure the 
              wellbeing of all participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItinerary;
