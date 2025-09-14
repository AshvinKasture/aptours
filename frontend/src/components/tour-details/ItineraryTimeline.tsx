import type { ItineraryDay } from '../../types';

interface ItineraryTimelineProps {
  itinerary: ItineraryDay[];
  currentDay: number;
  onDaySelect: (day: number) => void;
  isMobile?: boolean;
}

const ItineraryTimeline = ({ itinerary, currentDay, onDaySelect, isMobile = false }: ItineraryTimelineProps) => {
  if (isMobile) {
    return (
      <div className="mobile-timeline-container mb-6">
        <div className="mobile-timeline-dots">
          {itinerary.map((day, index) => (
            <div 
              key={index}
              className={`mobile-timeline-dot ${currentDay === day.day ? 'active' : ''} ${currentDay > day.day ? 'completed' : ''}`}
              onClick={() => onDaySelect(day.day)}
            >
              <span className="mobile-dot-label">Day {day.day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-container desktop-timeline hidden md:block mb-8">
      <div className="timeline-line">
        <div className="timeline-progress"></div>
      </div>
      <div className="timeline-dots">
        {itinerary.map((day, index) => (
          <div 
            key={index}
            className={`timeline-dot ${currentDay === day.day ? 'active' : ''} ${currentDay > day.day ? 'completed' : ''}`}
            onClick={() => onDaySelect(day.day)}
          >
            <span className="timeline-dot-label">Day {day.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryTimeline;
