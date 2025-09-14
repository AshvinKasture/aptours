import TourBadges from './TourBadges';
import type { Trek } from '../../types';

interface MobileTourHeaderProps {
  trek: Trek;
}

const MobileTourHeader = ({ trek }: MobileTourHeaderProps) => {
  return (
    <div className="lg:hidden bg-white rounded-2xl p-6 shadow-xl mb-8">
      <div className="mb-4">
        <TourBadges 
          type={trek.type}
          difficulty={trek.difficulty}
          maxAltitude={trek.maxAltitude}
          size="small"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">{trek.title}</h1>
      <div className="flex items-center gap-2 text-slate-600">
        <i className="fas fa-clock text-blue-600"></i>
        <span className="text-lg font-semibold">{trek.duration}</span>
        <span className="text-sm">journey</span>
      </div>
    </div>
  );
};

export default MobileTourHeader;
