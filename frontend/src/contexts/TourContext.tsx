import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Trek } from '../types';
import { getTrekImagePath } from '../utils/assets';
import { createSlug } from '../utils';

interface TourContextType {
  treksData: Trek[];
  filteredTreks: Trek[];
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  getTrekBySlug: (slug: string) => Trek | undefined;
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
      slug: createSlug("Everest Base Camp Trek"),
      title: "Everest Base Camp Trek",
      image: getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek'),
      slideshowImages: [
        getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek'),
        getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek'),
        getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek')
      ],
      category: "himalayan adventure",
      type: "Himalayan Trek",
      difficulty: "Moderate",
      duration: "13N / 14D",
      maxAltitude: "5,364m",
      price: "₹1,85,000",
      description: "The Everest Base Camp trek is a guided adventure through the heart of the Himalayas, offering breathtaking views of Everest, Nuptse, and Lhotse. Trekkers experience Sherpa culture, visit iconic sites like Thyangboche and Kalapatthar, and end at the historic Everest Base Camp.",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kathmandu",
          description: "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you'll be transferred to your hotel in Kathmandu. Meet your trek guide and fellow trekkers for a briefing about the upcoming adventure. Explore the vibrant streets of Thamel and enjoy authentic Nepali cuisine. Rest well as tomorrow begins your mountain journey. This is also a good time to do any last-minute shopping for trekking gear or souvenirs."
        },
        {
          day: 2,
          title: "LUKLA 2800m/9186ft & PHAKDING 2652m/8701ft",
          description: "A memorable 30-minute mountain flight from Kathmandu to Lukla, spectacular aerial view of snowcapped peaks ranges. Lukla has the most amazing Short Take Off and Landing (STOL) airstrip in Nepal and is quite a dramatic place. Lunch will be served at Lukla or en route to Phakding, depending upon the arrival time. You will have time to wander around, while the Sherpa crew sort and divide the baggage on the Ghopkyo (mixed breed of yak and normal cow, as the yak cannot survive below 3000m/9843ft) some loads are carried by porters. Trek to Phakding is mostly a gradual uphill walk with a pleasant view of Kusum-Kangru (6369m/20895ft), going over a suspension bridge and climbing to Ghat from where 1.5 hrs of walking will take us to Phakding for the overnight stay in a lodge at Phakding near the banks of Dudh Koshi river."
        },
        {
          day: 3,
          title: "NAMCHE BAZAAR 3440m/11286ft",
          description: "From Phakding, trek along the bank of Dudh Koshi crossing it and re-crossing it later via suspension bridges. We pass through Benkar village with a magnificent view of Thamserkhu 6608m. It is a busy trail filled with trekkers, porter and Ghopkyos (cross between cow and a yak) leading to Monjo (2835m/9301ft), a small Sherpa settlement. Moving ahead we come to the entrance of Everest National Park at Jorsalle (3096m/11296ft); the last place with shops till we reach Namche Bazaar. It’s a 2 hour’s uphill walk along a winding trail to the famed Namche Bazaar with its colorful houses located in a natural U-shaped amphitheatre. The trek offers magnificent views of Kwangde, Kusum Kangru, Everest- Nuptse wall, Lhotse and a close view of Taweche."
        },
        {
          day: 4,
          title: "NAMCHE BAZAAR 3440m/11286ft",
          description: "We halt for a day at Namche Bazaar for rest and acclimatization. You can go on a short day hike to the nearby Sherpa villages of Khumjung and Kunde to view Everest, Lhotse and Ama Dablam. Or take a short walk to the Everest National Park office, perched atop a magnificent spot overlooking Namche Bazaar and breathtaking views of the surrounding snowcapped giants and deep valleys. A nearby museum provides interesting information regarding the Himalayas."
        },
        {
          day: 5,
          title: "THYANGBOCHE 3867m/12687 ft",
          description: "The walk is fairly easy for the first half then a 20 minutes climb to the top ridge of Namche Bazaar from where the trail proceeds with magnificent views of the giant snow peaks of Everest, Nuptse, Lhotse, Ama Dablam, Thermasharkhu and Kwangde-ri peak till we reach Phungitenga (3250m/10663ft) a small Sherpa settlement with beautiful prayer wheels propelled by water. Silver fir blue pines, rhododendron and some few magnolia and birch trees cover the area. From there a winding trail through the pleasant shaded woods takes us to Thyangboche, the beautiful spot offers an eyeful of Himalayan beauties—Mt. Ama Dablam, considered the most beautiful mountain, Everest, Nuptse, Lhotse and Lhotse Shar."
        },
        {
          day: 6,
          title: "DINGBOCHE 4358m/14298ft",
          description: "The trail descends through a beautiful forest of birch, fir, juniper and rhododendron to Deboche (3650m/11975ft) with magnificent view of Mt Ama Dablam, Mt Everest, Nuptse and Lhotse. Along the way we’ll see religious motifs painted and carved on rock faces, Buddhist stupas, prayer wheels and flags. The trail goes past a long mani prayer wall, then over a bridge above the narrow gorge of Imja-Tse river and up a gradual walk to Pangboche (3900m12795ft). From here we push on to scenic Shomare for lunch. No more trees at this altitude but stunning views of Ama Dablam, Nuptse and Lhotse. Later we’ll wall through the beautiful Imjatse valley, from where the Island Peak (6189m/20,305ft), Nepal’s most popular trekking peak, comes to view. The trek ends at Dingboche (4358m/14298ft), an authentic mountain settlement with beautiful patchwork of field enclosed by stone walls."
        },
        {
          day: 7,
          title: "DINGBOCHE 4358m/14298ft",
          description: "Today’s a day of rest. You can hike eastwards to Chhukhung (4730m/14800ft) that lies within the Imjatse valley for better acclimatization which takes about 3-4 hrs from Dingboche. The trek is gradual but you will feel the thin air as the altitude gains slowly while approaching. At Chhukhung, there are about five teahouses overlooking the superb view of snowcapped peaks and glaciers of Lhotse, Ama Dablam and Imja glacier. Chhukhung is the last settlement in eastern Khumbu region."
        },
        {
          day: 8,
          title: "LOBUCHE 4928m/16168ft",
          description: "From Dingboche the trail heads north with the path ascending gradually for about 40 -50 minutes as you approach a stupa with mani prayer wheels. From here it’s a gentle trail over the stony meadow overlooking Pheriche village (4270m/14009ft) down below. After a pleasant walk of 1.5 to 2 hrs the trail reaches Thugla after crossing a small wooden bridge over the raging Khumbu glacial river. From here a steep 1 hr walk will take us to a resting spot that fantastically showcases Everest and other prominent Himalayan peaks. A gradual ascent of 1.5 to 2 hours will take us to Lobuche, which comes as a surprise as it is a very tiny settlement, well-hidden and sheltered from the wind, a pastoral home of yak herders."
        },
        {
          day: 9,
          title: "GORAKSHEP 5140m/16,865ft & EVEREST BASE CAMP 5364m/17598ft",
          description: "The first hour of walk involves a gradual ascent at the end of the grassy field then a short climb of about 20 minutes. Continue along the side of the Khumbu Glacier, which is straight forward at first, but later the path becomes rocky and an awkward climb across the moraine. This is compensated by the fabulous mountain setting as the path gets closer to the world’s highest mountain. The sugar loaf dome of Pumori lies directly ahead and to our right, on the opposite side of the glacier, Nuptse rises in a sheer spire. Just behind it, remaining elusive to the last moment is the Mt Everest. Gorakshep is another small cluster of teashops, directly above is Kalapatthar 5545m/18192ft. After a break here at Gorakshep we’ll continue towards Everest Base Camp and the Khumbu Icefall. Treading upon the icefall can be quite tricky, trails change every year due to glacial movements, so pay special heed and follow the lead Sherpa. The walk can be quite strenuous due to thin air, rocky dunes, moraines and streams till you reach the base camp but it’s worth it. The base camp is a lively place during the high expedition season. Head back to Gorakshep for the overnight stay."
        },
        {
          day: 10,
          title: "KALAPATTHAR 5545m/18,192ft, PHERICHE 4243m/13920ft",
          description: "Early morning hike to Kalapatthar, a small rocky peak on the southwest ridge of Mt.Pumori, which is a popular peak for expedition groups to acclimatize and to perform practice climbs before attempting higher summits. View from here is beyond imagination, Everest seems just a stone’s throw away between Nuptse and Lhotse while other snowcapped giants dominate the surrounding view. The Everest Base Camp is also visible from here on the Khumbu Glacier. After a wonderful time here we’ll descend back to Gorakshep and continue our journey to Pheriche. It’s a downhill walk most of the way after reaching Thugla where the Dingboche trails branches off and our route descends further down to the flat Pheriche valley. Afternoons can be very windy here and an hour’s walk will take us to Pheriche for the overnight stop."
        },
        {
          day: 11,
          title: "NAMCHE BAZAAR 3440m/11286ft",
          description: "From Pheriche a short walk brings you to a bridge then it is downhill all the way, with few ups along the way. At the end of it lies a bridge from where the trail heads back to the woodlands and vegetation with an hour-long uphill walk to Namche for the overnight stop."
        },
        {
          day: 12,
          title: "LUKLA 2800m/9186ft",
          description: "You can walk at your own leisurely pace enjoying the lush green scenery and the amazing view of the surrounding mountains. Apart from a few short uphill stretches, the only long climb will be from a place called Choplung just before reaching Lukla (40 minutes). At Lukla, we’ll have a merry dinner party at night with the whole Sherpa crew and porters."
        },
        {
          day: 13,
          title: "KATHMANDU 1336m/4383ft",
          description: "The flight back to Kathmandu offers another chance to enjoy the aerial view of the Himalayas all the way to Kathmandu. Flights are usually scheduled in the morning due to high winds in the afternoon; sometime flights can be delayed due to weather or some other reason. Upon reaching Kathmandu, our staff will arrange your hotel transfer and escort you there. Upon reaching Kathmandu please inform our staff if you would like to go for a guided tour of the city or take the early morning mountain flight to view the mountains tomorrow."
        },
        {
          day: 14,
          title: "KATHMANDU 1336m/4383ft",
          description: "This day has been allotted as contingency in case there is weather issues."
        },
        {
          day: 15,
          title: "Departure 1336m/4383ft",
          description: "As per your international flight time, we will transfer you to the airport."
        },
      ]
    },
    {
      slug: createSlug("Mount Kailash Mansarovar"),
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
      price: "₹2,25,000",
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
      slug: createSlug("Nepal Cultural Family Tour"),
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
      price: "₹45,000",
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
      slug: createSlug("Hidden Himalayan Valleys"),
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
      price: "₹85,000",
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
      slug: createSlug("Annapurna Circuit Trek"),
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
      price: "₹1,25,000",
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
      slug: createSlug("Manaslu Circuit Trek"),
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
      price: "₹1,55,000",
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
  const getTrekBySlug = (slug: string): Trek | undefined => {
    return treksData.find(trek => trek.slug === slug);
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
    getTrekBySlug,
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
