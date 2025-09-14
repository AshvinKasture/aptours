import type { Trek } from '../../types';

interface TourBadgesProps {
  type: Trek['type'];
  difficulty?: Trek['difficulty'];
  maxAltitude?: string;
  size?: 'small' | 'large';
}

const TourBadges = ({ type, difficulty, maxAltitude, size = 'large' }: TourBadgesProps) => {
  const getTypeIcon = (type: Trek['type']) => {
    switch (type) {
      case 'Himalayan Trek': return 'fas fa-mountain';
      case 'Sacred Pilgrimage': return 'fas fa-om';
      case 'Nepal Family Package': return 'fas fa-leaf';
      case 'Bike Rides': return 'fas fa-motorcycle';
      default: return 'fas fa-mountain';
    }
  };

  const isSmall = size === 'small';

  return (
    <div className={`flex flex-wrap gap-${isSmall ? '1.5' : '2'}`}>
      <span className={`inline-flex items-center gap-${isSmall ? '1.5' : '2'} px-${isSmall ? '2.5' : '3'} py-1 bg-sky-100 text-sky-700 text-${isSmall ? 'xs' : 'sm'} font-semibold rounded-full`}>
        <i className={`${getTypeIcon(type)} text-${isSmall ? 'xs' : 'sm'}`}></i>
        <span>{type}</span>
      </span>
      {difficulty && (
        <span className={`inline-flex items-center gap-${isSmall ? '1' : '2'} px-${isSmall ? '2' : '3'} py-1 bg-orange-100 text-orange-700 text-${isSmall ? 'xs' : 'sm'} font-medium rounded-full`}>
          <i className="fas fa-chart-line text-xs"></i>
          <span>{isSmall ? difficulty : `Difficulty: ${difficulty}`}</span>
        </span>
      )}
      {maxAltitude && (
        <span className={`inline-flex items-center gap-${isSmall ? '1' : '2'} px-${isSmall ? '2' : '3'} py-1 bg-purple-100 text-purple-700 text-${isSmall ? 'xs' : 'sm'} font-medium rounded-full`}>
          <i className="fas fa-mountain text-xs"></i>
          <span>{isSmall ? maxAltitude : `Max Altitude: ${maxAltitude}`}</span>
        </span>
      )}
    </div>
  );
};

export default TourBadges;
