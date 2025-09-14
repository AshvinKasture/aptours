import TourBadges from './TourBadges';
import type { Trek } from '../../types';

interface TourHeaderProps {
  trek: Trek;
}

const TourHeader = ({ trek }: TourHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl">
      <div className="mb-4">
        <TourBadges 
          type={trek.type}
          difficulty={trek.difficulty}
          maxAltitude={trek.maxAltitude}
          size="large"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{trek.title}</h1>
      <div className="flex items-center gap-2 text-slate-600 mb-2">
        <i className="fas fa-clock text-blue-600"></i>
        <span className="text-lg font-semibold">{trek.duration}</span>
        <span className="text-sm">journey</span>
      </div>
    </div>
  );
};

export default TourHeader;
