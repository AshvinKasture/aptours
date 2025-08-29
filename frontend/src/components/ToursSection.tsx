import { HashLink } from 'react-router-hash-link';
import TrekCard from './TrekCard';
import type { Trek } from '../types';
import { getTrekImagePath } from '../utils/assets';
import { createSlug } from '../utils';

const ToursSection: React.FC = () => {
  // Featured trek data - matching the HTML version exactly
  const featuredTreks: Trek[] = [
    {
      slug: createSlug('Everest Base Camp Trek'),
      title: 'Everest Base Camp Trek',
      description: 'Journey to the base of the world\'s highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure.',
      image: getTrekImagePath('Everest_Base_Camp_stock.jpg'),
      duration: '15N / 16D',
      difficulty: 'Extreme',
      type: 'Himalayan Trek',
      price: '₹1,85,000',
      maxAltitude: '5,364m',
      highlights: ['Sherpa culture', 'Tengboche Monastery', 'Kala Patthar viewpoint'],
      slideshowImages: [
        getTrekImagePath('Everest_Base_Camp_stock.jpg'),
        getTrekImagePath('Everest_Base_Camp_stock.jpg'),
        getTrekImagePath('Everest_Base_Camp_stock.jpg')
      ]
    },
    {
      slug: createSlug('Mount Kailash Mansarovar'),
      title: 'Mount Kailash Mansarovar',
      description: 'Embark on the most sacred pilgrimage in the Himalayas. Visit the divine Mount Kailash and the pristine Mansarovar Lake.',
      image: getTrekImagePath('Kailash_stock.jpg'),
      duration: '11N / 12D',
      difficulty: 'Challenging',
      type: 'Sacred Pilgrimage',
      price: '₹2,25,000',
      maxAltitude: '5,630m',
      highlights: ['Sacred Mt. Kailash', 'Mansarovar Lake', 'Spiritual journey'],
      slideshowImages: [
        getTrekImagePath('Kailash_stock.jpg'),
        getTrekImagePath('Kailash_stock.jpg'),
        getTrekImagePath('Kailash_stock.jpg')
      ]
    },
    {
      slug: createSlug('Nepal Cultural Family Tour'),
      title: 'Nepal Cultural Family Tour',
      description: 'Perfect family adventure exploring Nepal\'s rich cultural heritage, ancient temples, and stunning mountain views. Designed for all ages with comfortable accommodations.',
      image: getTrekImagePath('BoudhnathStupa.jpg'),
      duration: '7N / 8D',
      type: 'Nepal Family Package',
      price: '₹45,000',
      highlights: ['Kathmandu UNESCO sites', 'Boudhanath Stupa', 'Patan Durbar Square', 'Mountain views'],
      slideshowImages: [
        getTrekImagePath('BoudhnathStupa.jpg'),
        getTrekImagePath('BoudhnathStupa.jpg'),
        getTrekImagePath('BoudhnathStupa.jpg')
      ]
    }
  ];

  return (
    <section id="tours" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Featured Treks & Tours
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Embark on extraordinary journeys through breathtaking landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <HashLink 
              to="/tours"
              smooth
              className="inline-block px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all duration-300"
            >
              View All Tours
            </HashLink>
            <HashLink 
              smooth
              to="/#contact"
              className="inline-block px-6 py-3 rounded-lg border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all duration-300"
            >
              Request Custom Package
            </HashLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredTreks.map((trek) => (
            <TrekCard key={trek.slug} trek={trek} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToursSection;
