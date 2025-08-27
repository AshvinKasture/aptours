import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Trek } from '../types';
import { getTrekImagePath } from '../utils/assets';

interface TourContextType {
  treksData: Trek[];
  filteredTreks: Trek[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  getTrekById: (id: string) => Trek | undefined;
  getFilterCount: (filterId: string) => number;
  getAllCount: () => number;
  filterButtons: Array<{
    id: string;
    label: string;
    icon: string;
    color: string;
    description: string;
  }>;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTours = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTours must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredTreks, setFilteredTreks] = useState<Trek[]>([]);

  // Sample trek data using our Trek interface
  const treksData: Trek[] = [
    {
      id: '1',
      title: "Everest Base Camp Trek",
      image: getTrekImagePath('Everest_Base_Camp_stock.jpg'),
      slideshowImages: [
        getTrekImagePath('Everest_Base_Camp_stock.jpg'),
        getTrekImagePath('Everest_Base_Camp_stock.jpg'),
        getTrekImagePath('Everest_Base_Camp_stock.jpg')
      ],
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Extreme",
      duration: "15N / 16D",
      maxAltitude: "5,364m",
      groupSize: "8-12 people",
      price: "₹1,85,000",
      highlights: ['Sherpa culture', 'Tengboche Monastery', 'Kala Patthar viewpoint'],
      description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kathmandu",
          description: "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you'll be transferred to your hotel in Kathmandu. Meet your trek guide and fellow trekkers for a briefing about the upcoming adventure. Explore the vibrant streets of Thamel and enjoy authentic Nepali cuisine. Rest well as tomorrow begins your mountain journey. This is also a good time to do any last-minute shopping for trekking gear or souvenirs."
        },
        {
          day: 2,
          title: "Fly to Lukla, Trek to Phakding",
          description: "Early morning scenic flight to Lukla (2,840m), one of the world's most thrilling airports. Begin your trek through the beautiful Dudh Koshi valley towards Phakding (2,610m). Cross several suspension bridges decorated with colorful prayer flags. The trail offers stunning views of snow-capped peaks and provides the first taste of Sherpa culture. This gentle trek helps with acclimatization while enjoying the mountain atmosphere."
        },
        {
          day: 3,
          title: "Trek to Namche Bazaar",
          description: "Trek from Phakding to the famous Namche Bazaar (3,440m), the gateway to the Everest region. Cross the impressive Hillary Suspension Bridge and enter Sagarmatha National Park. The steep climb to Namche is challenging but rewarding, with first glimpses of Mount Everest on clear days. Namche is a bustling Sherpa town with markets, internet cafes, and stunning mountain views. This marks your entry into the high Himalayas."
        },
        {
          day: 4,
          title: "Acclimatization Day in Namche",
          description: "Important acclimatization day in Namche Bazaar. Take a day hike to Everest View Hotel (3,880m) for spectacular panoramic views of Everest, Lhotse, and Ama Dablam. Visit the Sherpa Culture Museum and learn about the history and traditions of the region. Explore the colorful Saturday market if timing allows. Rest and hydrate well to prepare your body for higher altitudes ahead."
        },
        {
          day: 5,
          title: "Trek to Tengboche Monastery",
          description: "Scenic trek to Tengboche (3,860m), home to the region's most important monastery. The trail offers incredible views of Everest, Nuptse, Lhotse, Ama Dablam, and other peaks. Visit the famous Tengboche Monastery, a spiritual center of the Khumbu region. If fortunate, witness the evening prayers of the Buddhist monks. The monastery sits on a ridge with 360-degree mountain views, making it one of the most scenic stops on the trek."
        }
      ]
    },
    {
      id: '2',
      title: "Mount Kailash Mansarovar",
      image: getTrekImagePath('Kailash_stock.jpg'),
      slideshowImages: [
        getTrekImagePath('Kailash_stock.jpg'),
        getTrekImagePath('Kailash_stock.jpg'),
        getTrekImagePath('Kailash_stock.jpg')
      ],
      category: "pilgrimage",
      type: "Sacred Pilgrimage",
      difficulty: "Challenging",
      duration: "11N / 12D",
      maxAltitude: "5,630m",
      groupSize: "10-15 people",
      price: "₹2,25,000",
      highlights: ['Sacred Mt. Kailash', 'Mansarovar Lake', 'Spiritual journey'],
      description: "Embark on the most sacred pilgrimage in the Himalayas. Visit the divine Mount Kailash and the pristine Mansarovar Lake.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kathmandu",
          description: "Arrive in Kathmandu and transfer to hotel. Attend comprehensive briefing about the sacred Kailash Mansarovar pilgrimage. Complete necessary documentation and medical check-up. Visit Pashupatinath Temple for blessings before the holy journey. Prepare mentally and spiritually for this transformative pilgrimage. Rest well as the journey requires physical and mental preparation."
        },
        {
          day: 2,
          title: "Drive to Syabrubesi",
          description: "Early morning drive to Syabrubesi (1,550m), approximately 7-8 hours through scenic hills and valleys. Pass through traditional Nepali villages and terraced fields. Cross the border into Tibet and complete immigration formalities. The landscape gradually changes from subtropical to alpine. Overnight at guesthouse and prepare for the high-altitude journey ahead."
        },
        {
          day: 3,
          title: "Drive to Saga",
          description: "Long drive across the Tibetan plateau to Saga (4,640m). Experience the vast, open landscapes of Tibet with distant views of the Himalayas. Stop at local checkpoints and enjoy traditional Tibetan lunch. The high-altitude drive provides gradual acclimatization. Witness the unique Tibetan culture and Buddhist monasteries along the route. Rest and acclimatize in Saga for the night."
        },
        {
          day: 4,
          title: "First Darshan of Mount Kailash",
          description: "Drive to Darchen (4,560m) with the first magnificent darshan of sacred Mount Kailash. This moment is deeply spiritual for pilgrims as they witness the holy mountain in all its glory. Perform traditional prayers and offer gratitude for reaching this sacred place. Prepare for the holy Kailash Kora (circumambulation) starting tomorrow. The energy around Mount Kailash is palpable and transformative."
        },
        {
          day: 5,
          title: "Holy Mansarovar Lake",
          description: "Visit the sacred Mansarovar Lake (4,590m), one of the highest freshwater lakes in the world. Take holy bath in the pristine waters believed to cleanse sins and purify the soul. Perform puja and meditation on the shores of this divine lake. The crystal-clear waters reflect the snow-capped peaks creating a heavenly atmosphere. Experience profound peace and spiritual connection with the divine."
        }
      ]
    },
    {
      id: '3',
      title: "Nepal Cultural Family Tour",
      image: getTrekImagePath('BoudhnathStupa.jpg'),
      slideshowImages: [
        getTrekImagePath('BoudhnathStupa.jpg'),
        getTrekImagePath('BoudhnathStupa.jpg'),
        getTrekImagePath('BoudhnathStupa.jpg')
      ],
      category: "cultural family",
      type: "Nepal Family Package",
      duration: "7N / 8D",
      groupSize: "4-8 people",
      price: "₹45,000",
      highlights: ['Kathmandu UNESCO sites', 'Boudhanath Stupa', 'Patan Durbar Square', 'Mountain views'],
      description: "Perfect family adventure exploring Nepal's rich cultural heritage, ancient temples, and stunning mountain views. Designed for all ages with comfortable accommodations.",
      itinerary: [
        {
          day: 1,
          title: "Arrival and Kathmandu Exploration",
          description: "Welcome to Nepal! Airport pickup and transfer to family-friendly hotel in Kathmandu. Begin with a visit to Swayambhunath (Monkey Temple) for panoramic views of the Kathmandu valley. Explore the colorful streets of Thamel with its shops, cafes, and vibrant atmosphere. Evening welcome dinner featuring traditional Nepali cuisine and cultural dance performance. Perfect introduction to Nepal's rich culture for the whole family."
        },
        {
          day: 2,
          title: "Kathmandu UNESCO World Heritage Sites",
          description: "Full day exploring Kathmandu's UNESCO World Heritage Sites. Visit the sacred Pashupatinath Temple on the banks of Bagmati River. Explore Boudhanath Stupa, one of the largest Buddhist stupas in the world. Walk through Kathmandu Durbar Square with its ancient palaces and temples. Each site offers unique insights into Nepal's religious and cultural diversity. Family-friendly guided tours with engaging stories for children."
        },
        {
          day: 3,
          title: "Patan and Bhaktapur Day Trip",
          description: "Visit the medieval cities of Patan and Bhaktapur, showcasing exquisite Newari architecture. Explore Patan Durbar Square with its intricate wood and stone carvings. Watch traditional craftsmen at work creating pottery, metalwork, and woodcarvings. Bhaktapur's well-preserved medieval charm offers excellent photo opportunities. Try local delicacies like king curd (juju dhau) and traditional sweets. Perfect cultural immersion for families."
        },
        {
          day: 4,
          title: "Sunrise at Nagarkot",
          description: "Early morning drive to Nagarkot (2,195m) for spectacular Himalayan sunrise views. On clear days, witness stunning views of Mount Everest, Langtang, and Annapurna ranges. Family-friendly hike through pine forests and terraced fields. Visit local villages and interact with friendly locals. Enjoy panoramic mountain vistas and fresh mountain air. Return to Kathmandu with lifetime memories of the Himalayas."
        },
        {
          day: 5,
          title: "Pokhara - City of Lakes",
          description: "Scenic drive or short flight to beautiful Pokhara (823m), the city of lakes. Enjoy boating on serene Phewa Lake with reflections of Annapurna range. Visit Devi's Falls and explore mysterious Gupteshwor Cave. Take the cable car to Sarangkot for stunning mountain views. Pokhara offers a relaxed atmosphere perfect for families with children. Evening lakeside stroll and dinner by the lake."
        }
      ]
    },
    {
      id: '4',
      title: "Hidden Himalayan Valleys",
      image: getTrekImagePath('hidden_himalayan_valleys_stock.jpg'),
      slideshowImages: [
        getTrekImagePath('hidden_himalayan_valleys_stock.jpg'),
        getTrekImagePath('hidden_himalayan_valleys_stock.jpg'),
        getTrekImagePath('hidden_himalayan_valleys_stock.jpg')
      ],
      category: "cultural adventure",
      type: "Himalayan Trek",
      difficulty: "Moderate",
      duration: "10N / 11D",
      maxAltitude: "4,200m",
      groupSize: "6-10 people",
      price: "₹85,000",
      highlights: ['Hidden valleys', 'Ancient monasteries', 'Traditional villages', 'Local culture'],
      description: "Explore hidden valleys, ancient monasteries, and traditional mountain villages. Immerse yourself in local culture and pristine natural beauty.",
      itinerary: [
        {
          day: 1,
          title: "Journey to Hidden Valley Base",
          description: "Begin the adventure with a scenic drive through winding mountain roads to reach the hidden valley base camp. Pass through traditional villages where time seems to have stopped. Meet local guides and porters who will share their knowledge of secret trails. Set up camp in a pristine meadow surrounded by towering peaks. Experience the tranquility of untouched wilderness as you prepare for the days ahead."
        },
        {
          day: 2,
          title: "Ancient Monastery Discovery",
          description: "Trek through rhododendron forests to discover a 500-year-old monastery hidden in the valley. Meet the resident monks who maintain ancient traditions and wisdom. Participate in morning prayers and meditation sessions. Learn about traditional Tibetan Buddhism and local customs. The monastery offers incredible views of snow-capped peaks and sacred valleys. Evening spent listening to monk's stories about the region's spiritual history."
        },
        {
          day: 3,
          title: "Traditional Village Immersion",
          description: "Visit remote mountain villages where families have lived for generations. Experience authentic mountain hospitality and traditional lifestyle. Participate in daily activities like farming, weaving, and food preparation. Learn about sustainable living practices adapted to high-altitude conditions. Share meals with local families and hear stories of mountain life. This cultural exchange provides deep insights into Himalayan communities."
        },
        {
          day: 4,
          title: "Secret Valley Exploration",
          description: "Venture into a secret valley known only to locals, accessible through a hidden trail. Discover pristine alpine lakes reflecting surrounding peaks. Encounter rare wildlife including blue sheep and golden eagles. The valley offers opportunities for meditation and spiritual reflection. Crystal-clear streams and wildflower meadows create a paradise-like setting. Camp under star-filled skies in this untouched wilderness sanctuary."
        }
      ]
    },
    {
      id: '5',
      title: "Annapurna Circuit Trek",
      image: getTrekImagePath('AnnapurnaBaseCamp.jpg'),
      slideshowImages: [
        getTrekImagePath('AnnapurnaBaseCamp.jpg'),
        getTrekImagePath('AnnapurnaBaseCamp.jpg'),
        getTrekImagePath('AnnapurnaBaseCamp.jpg')
      ],
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Challenging",
      duration: "14N / 15D",
      maxAltitude: "5,416m",
      groupSize: "8-12 people",
      price: "₹1,25,000",
      highlights: ['Thorong La Pass', 'Diverse landscapes', 'Annapurna range', 'Mountain villages'],
      description: "Classic trek around the Annapurna massif featuring diverse landscapes, from subtropical forests to high alpine terrain with stunning mountain views.",
      itinerary: [
        {
          day: 1,
          title: "Drive to Besisahar and Trek Start",
          description: "Drive from Kathmandu to Besisahar (760m), the starting point of the classic Annapurna Circuit. Begin trekking through subtropical valleys with rice terraces and banana plantations. Experience the dramatic landscape changes as you gain altitude. Cross suspension bridges over roaring rivers and pass through traditional Gurung villages. The diverse ecosystems range from tropical to alpine within a single day's trek."
        },
        {
          day: 2,
          title: "Manang Valley Acclimatization",
          description: "Reach the beautiful Manang valley (3,519m), a crucial acclimatization stop. Spend an extra day to adjust to altitude while exploring this fascinating region. Visit the Himalayan Rescue Association for altitude sickness information. Explore traditional Tibetan-influenced culture and ancient monasteries. Take day hikes to Gangapurna Lake or climb to viewpoints for stunning Annapurna range vistas."
        },
        {
          day: 3,
          title: "Thorong La Pass Challenge",
          description: "Conquer the famous Thorong La Pass (5,416m), the highest point of the trek. Start early morning climb through rocky terrain and snow fields. Experience the triumph of reaching this legendary high-altitude pass. Enjoy spectacular 360-degree views of Annapurna, Dhaulagiri, and surrounding peaks. Descend to Muktinath, a sacred pilgrimage site for both Hindus and Buddhists."
        },
        {
          day: 4,
          title: "Descent to Pokhara Valley",
          description: "Complete the circuit with descent through diverse landscapes to Pokhara. Pass through the deepest gorge in the world between Annapurna and Dhaulagiri. Experience dramatic climate and vegetation changes from alpine to subtropical. Visit local villages and witness the traditional way of life. Celebrate completion of this epic journey in the beautiful lakeside city of Pokhara."
        }
      ]
    },
    {
      id: '6',
      title: "Manaslu Circuit Trek",
      image: getTrekImagePath('AnnapurnaLodge.jpg'),
      slideshowImages: [
        getTrekImagePath('AnnapurnaLodge.jpg'),
        getTrekImagePath('AnnapurnaLodge.jpg'),
        getTrekImagePath('AnnapurnaLodge.jpg')
      ],
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Challenging",
      duration: "16N / 17D",
      maxAltitude: "5,106m",
      groupSize: "6-10 people",
      price: "₹1,55,000",
      highlights: ['Larkya La Pass', 'Remote valleys', 'Manaslu Base Camp', 'Tibetan culture'],
      description: "Off-the-beaten-path trek around Mount Manaslu, the eighth highest peak in the world, through remote valleys and traditional Tibetan villages.",
      itinerary: [
        {
          day: 1,
          title: "Journey to Soti Khola",
          description: "Drive from Kathmandu to Soti Khola (700m) through scenic hills and rural landscapes. This marks the beginning of the remote Manaslu Circuit adventure. The trail follows the Budhi Gandaki River through terraced fields and traditional villages. Experience the authentic rural life of Nepal away from tourist crowds. Set up camp and prepare for the wilderness trek ahead into the restricted Manaslu region."
        },
        {
          day: 2,
          title: "Remote Valley Exploration",
          description: "Trek through increasingly remote valleys with spectacular gorges and waterfalls. Cross numerous suspension bridges over the powerful Budhi Gandaki River. Pass through villages where Tibetan culture becomes more prominent. Encounter friendly locals maintaining traditional lifestyles unchanged for centuries. The landscape becomes more dramatic as you enter the heart of the Manaslu conservation area."
        },
        {
          day: 3,
          title: "Manaslu Base Camp Views",
          description: "Reach viewpoints offering magnificent vistas of Mount Manaslu (8,163m), the world's eighth highest peak. Trek through alpine meadows with yaks grazing peacefully. Visit ancient monasteries where monks practice traditional Buddhism. Experience the spiritual energy of this sacred mountain region. The close-up views of Manaslu's massive ice walls and seracs are breathtaking."
        },
        {
          day: 4,
          title: "Larkya La Pass Crossing",
          description: "Conquer the challenging Larkya La Pass (5,106m), the technical highlight of the trek. Navigate through glacial terrain and rocky moraines. Experience dramatic weather changes and spectacular mountain panoramas. The pass offers views of Himlung Himal, Cheo Himal, and Annapurna II. Descend into the Annapurna region, completing this incredible circuit trek around the magnificent Manaslu massif."
        }
      ]
    }
  ];

  const filterButtons = [
    { 
      id: 'all', 
      label: 'All Treks', 
      icon: '🏔️',
      color: 'from-slate-500 to-slate-600',
      description: 'All available treks'
    },
    { 
      id: 'himalayan', 
      label: 'Himalayan', 
      icon: '⛰️',
      color: 'from-blue-500 to-indigo-600',
      description: 'High altitude adventures'
    },
    { 
      id: 'pilgrimage', 
      label: 'Pilgrimage', 
      icon: '🙏',
      color: 'from-amber-500 to-orange-600',
      description: 'Sacred spiritual journeys'
    },
    { 
      id: 'cultural', 
      label: 'Cultural', 
      icon: '🏛️',
      color: 'from-emerald-500 to-teal-600',
      description: 'Heritage & traditions'
    },
    { 
      id: 'adventure', 
      label: 'Adventure', 
      icon: '🎒',
      color: 'from-red-500 to-pink-600',
      description: 'Thrilling expeditions'
    }
  ];

  // Filter logic
  useEffect(() => {
    let filtered = treksData;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(trek => trek.category?.includes(selectedFilter));
    }

    setFilteredTreks(filtered);
  }, [selectedFilter]);

  // Helper functions
  const getTrekById = (id: string): Trek | undefined => {
    return treksData.find(trek => trek.id === id);
  };

  const getFilterCount = (filterId: string): number => {
    return treksData.filter(trek => trek.category?.includes(filterId)).length;
  };

  const getAllCount = (): number => {
    return treksData.length;
  };

  const value: TourContextType = {
    treksData,
    filteredTreks,
    selectedFilter,
    setSelectedFilter,
    getTrekById,
    getFilterCount,
    getAllCount,
    filterButtons
  };

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
};
