import React, { createContext, useContext, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Trek, TourItem, TourCategory } from '../types';
import { getTrekImagePath } from '../utils/assets';
import { createSlug } from '../utils';

interface TourContextType {
  tourItems: TourItem[]; // New structure supporting both tours and categories
  treksData: Trek[]; // All individual tours (flattened from categories and direct tours)
  getTrekBySlug: (slug: string) => Trek | undefined;
  getCategoryBySlug: (slug: string) => TourCategory | undefined;
  getToursByCategory: (categorySlug: string) => Trek[];
  getCategoryForTour: (trekSlug: string) => TourCategory | undefined;
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

  // Sample trek data using our Trek interface - memoized to prevent recreation
  const individualTreks: Trek[] = useMemo(() => [
    {
      slug: createSlug("Everest Base Camp Trek"),
      title: "Everest Base Camp Trek",
      image: getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek'),
      slideshowImages: [
        getTrekImagePath('Everest_Base_Camp_stock.jpg', 'Everest_Base_Camp_Trek'),
        getTrekImagePath('Everest_Base_Camp_1.jpg', 'Everest_Base_Camp_Trek'),
        getTrekImagePath('Everest_Base_Camp_2.png', 'Everest_Base_Camp_Trek'),
        getTrekImagePath('Everest_Base_Camp_3.png', 'Everest_Base_Camp_Trek')
      ],
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
          subtitle: "Welcome to the Gateway of the Himalayas",
          description: "Welcome to Nepal! Upon arrival at Tribhuvan International Airport, you'll be transferred to your hotel in Kathmandu. Meet your trek guide and fellow trekkers for a briefing about the upcoming adventure. Explore the vibrant streets of Thamel and enjoy authentic Nepali cuisine. Rest well as tomorrow begins your mountain journey. This is also a good time to do any last-minute shopping for trekking gear or souvenirs."
        },
        {
          day: 2,
          title: "LUKLA 2800m/9186ft & PHAKDING 2652m/8701ft",
          subtitle: "Thrilling Mountain Flight & Trek Beginning",
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
      image: getTrekImagePath('Mount_Kailash_Manasarovar_2.jpg', 'Mount_Kailash_Mansarovar'),
      slideshowImages: [
        getTrekImagePath('Mount_Kailash_Manasarovar_2.jpg', 'Mount_Kailash_Mansarovar'),
        getTrekImagePath('Mount_Kailash_Manasarovar_2.jpg', 'Mount_Kailash_Mansarovar'),
        getTrekImagePath('Mount_Kailash_Manasarovar_2.jpg', 'Mount_Kailash_Mansarovar'),
      ],
      type: "Sacred Pilgrimage",
      difficulty: "Challenging",
      duration: "11N / 12D",
      maxAltitude: "5,630m",
      price: "₹2,25,000",
  description: "A sacred pilgrimage to Mount Kailash and Mansarovar, combining spiritual rituals, remote high-altitude landscapes, and deep cultural encounters. This challenging journey includes long drives across the Tibetan plateau, scenic views of snow-capped peaks, and the transformative Kailash kora (circumambulation).",
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
      slug: createSlug("Annapurna Base Camp Trek"),
      title: "Annapurna Base Camp Trek",
      image: getTrekImagePath('Annapurna_Base_Camp_1.jpg', 'Annapurna_Base_Camp'),
      slideshowImages: [
        getTrekImagePath('Annapurna_Base_Camp_1.jpg', 'Annapurna_Base_Camp'),
        getTrekImagePath('Annapurna_Base_Camp_2.jpg', 'Annapurna_Base_Camp'),
        getTrekImagePath('Annapurna_Base_Camp_3.jpg', 'Annapurna_Base_Camp'),
        getTrekImagePath('Annapurna_Base_Camp_4.jpg', 'Annapurna_Base_Camp')
      ],
      category: "AnnapurnaTrek",
      type: "Himalayan Trek",
      difficulty: "Moderate",
      duration: "12N / 13D",
      maxAltitude: "4,120m",
      price: "₹1,25,000",
      shortDescription: "The Annapurna Sanctuary Trek is an ideal first Himalayan adventure, offering superb views, gentle acclimatization, and rich cultural significance. The extended route includes Ghorepani’s rhododendron forests and the iconic Poon Hill viewpoint for sweeping panoramas.",
      description: "The Annapurna Sanctuary Trek is the perfect first Himalayan trek – It offers wonderful walking and Superb views without undue acclimatisation problems and all within a short period of time. The trek takes you right into the Annapurna Sanctuary, a high glacial basin located north of Pokhara and known as the ‘Sanctuary’ both because of its natural beauty and its religious significance to local people who believe in the divine presence there of the goddesses, Annapurna and Gangapurna, important figures in Hindu myth and folklore. The extended version of Annapurna Sanctuary Trek takes you to the mystical village of Ghorepani and its forests that is considered as the Capital Land of Himalayan Rhododendrons. Poon Hill is in the go-to list for taking a bird’s-eye view towards the entire trip route.",
      itinerary: [
        {
          day: 1,
          title: "Kathmandu",
          description: "Welcome to Nepal. Kathmandu is an incredible mixture of legend and modern development with a rich artistic and cultural heritage. Kathmandu has been a travellers' centre for many years. It’s very important that you attend the welcome meeting at the hotel lobby. However, you need not worry for the schedule as it will be published on the notice boards beforehand your check in."
        },
        {
          day: 2,
          title: "Fly Pokhara > Drive to Nayapul & Trek to Ulleri (2080m / 6824ft)",
          description: "Take a small aircraft to leave Leaving Kathmandu behind early in the morning, its a short and one of the most scenic flights you’ve ever had in your lifetime. Pokhara is just 25 minutes fly away from Kathmandu. Upon landing at Pokhara airport, quickly get arranged with luggage and jump onto a vehicle to drive off to Nayapul. Its another section of journey which is on the road but again filled with lots of interesting sceneries to see and get fascinated. It takes something like 2 hours to reach Nayapul, where the trek starts. While you sip a cup of fresh tea by the bank of a stream, your guide and porters organise load of your baggage. The trek starts immediately after you have finished your tea.  Gear up and follow the Bhurundi Khola to Thikhedhunga, trek through farmland before a steep ascent to reach Ulleri. At 8091 metres, Annapurna 1 is one of the highest mountains in the world. Its surrounding sister mountains are equally imposing and create magnificent panoramas from any viewpoint. This trek covers a wide variety of terrain, from lowland pastures and peaceful villages to powerful glaciers and stunning mountain views. In the rugged mountain scenery, you stay in mountain communities and meet friendly Nepali hill people as they go about their daily lives. The expedition is not only visually superb but also a chance to learn about local cultures. Along the way, see thundering waterfalls of melted snow, cross icy rivers and reward yourself with a soak in natural hot springs."
        },
        {
          day: 3,
          title: "Ghorepani (2750m / 9022ft)",
          description: "Ascend to Ghorepani village through a pleasant rhododendron forest, but the day is full of uphill climbing. However, it doesn’t feel as much of a struggling since there are interesting villages and sceneries to see every next few minutes."
        },
        {
          day: 4,
          title: "Tadapani (2700m / 8858ft)",
          description: "Waking up early and one hour of strenuous struggling up to Poon Hill rewards you with the best views of sunrise over the Annapurna Massif and its neighbouring peaks. This is once in a lifetime scene, if your laze isn’t the winner, you should at least try it once. Then the adventure continues as you continue your trek on to Tadapani."
        },
        {
          day: 5,
          title: "Chomrong (2177m / 7143ft)",
          description: "This morning you’ll descend to Kimrung Khola before climbing again to Chomrong village, at the base of Hiunchuli (6441 metres). There are breathtaking views of Annapurna and Macchhapuchhre from here."
        },
        {
          day: 6,
          title: "Dobhan (2670m / 8760ft)",
          description: "Begin by trekking for approximately 3 hours through the forest to Kuldi Ghar, then down to the banks of the Modi River and up again to Doban."
        },
        {
          day: 7,
          title: "Dobhan to Machhapuchhre Base Camp (3700m / 12139ft)",
          description: "Passing through Himalaya Hotel, continue up the narrow valley to Deurali. Sticking to the west bank of the Modi River, enter an open valley near Machhapuchhre Base Camp."
        },
        {
          day: 8,
          title: "Annapurna Base Camp (4130m / 13549ft) > back to Himalaya",
          description: "Early in the morning trek up to Annapurna Base Camp. The struggle uphill at that altitude takes around 2 hours but the hard work to get here is worth it. See the magic of change of colours of the majestic peaks by sunrise. Stroll around for an hour and then start tracing the way back to Himalaya."
        },
        {
          day: 9,
          title: "Chomrong (2177m / 7143ft)",
          description: "Passing back through the forests, pastures and staircases, trek back to Chhomrong."
        },
        {
          day: 10,
          title: "Steep descent down to Jhinu Danda > trek to Kimche and drive to Pokhara.",
          description: "There is a natural hotspring on the bank of Modi Khola, where you can plunge and take a well deserved manicure. Take lunch at Jhinu Danda and trek to Kimche where a vehicle awaits to bring us back to Pokhara. It is around 4 hours drive to Pokhara from Kimche. On reaching to Pokhara, get checked into a hotel and rush to the lakeside for a nights party."
        },
        {
          day: 11,
          title: "Fly back to Kathmandu",
          description: "In the morning free time to stroll around the lake city Pokhara. In the afternoon take the same short flight that you have taken some 10 days ago. On reaching to Kathmandu, get transferred to hotel and stay overnight. "
        },
        {
          day: 12,
          title: "Departure, end the trip. ",
          description: "Your incredible Annapurna Base Camp adventure comes to an end. After breakfast, transfer to Tribhuvan International Airport for your departure or onward journey. Take with you unforgettable memories of towering peaks, warm Nepali hospitality, and the sense of achievement from completing this magnificent trek. The mountains will forever call you back to Nepal's majestic Himalayas."
        },
        {
          day: 13,
          title: "Tadapani (2700m / 8858ft)",
          description: "Waking up early and one hour of strenuous struggling up to Poon Hill rewards you with the best views of sunrise over the Annapurna Massif and its neighbouring peaks. This is once in a lifetime scene, if your laze isn’t the winner, you should at least try it once. Then the adventure continues as you continue your trek on to Tadapani."
        },
      ]
    },
    {
      slug: createSlug("Annapurna Base Camp Express"),
      title: "Annapurna Base Camp Express",
      image: getTrekImagePath('Annapurna_Base_Camp_Express_1.jpg', 'Annapurna_Base_Camp_Express'),
      slideshowImages: [
        getTrekImagePath('Annapurna_Base_Camp_Express_1.jpg', 'Annapurna_Base_Camp_Express'),
        getTrekImagePath('Annapurna_Base_Camp_Express_2.jpg', 'Annapurna_Base_Camp_Express'),
        getTrekImagePath('Annapurna_Base_Camp_Express_3.jpg', 'Annapurna_Base_Camp_Express'),
        getTrekImagePath('Annapurna_Base_Camp_Express_4.jpg', 'Annapurna_Base_Camp_Express'),
      ],
      category: "AnnapurnaTrek",
      type: "Himalayan Trek",
      difficulty: "Moderate",
      duration: "8N / 9D",
      maxAltitude: "4,120m",
      price: "₹1,55,000",
      shortDescription: "The Annapurna Sanctuary Trek is an ideal first Himalayan trek, offering stunning mountain views and immersive walking experiences without major acclimatization challenges. The journey leads to Annapurna Base Camp (4,130m), a breathtaking amphitheater of eleven towering peaks, revered for both its natural beauty and spiritual significance.",
      description: "The Annapurna Sanctuary Trek is the perfect first Himalayan trek – It offers wonderful walking and superb views without undue acclimatisation problems and all within a short period of time. The trek takes you right into the Annapurna Sanctuary, a high glacial basin located north of Pokhara and known as the ‘Sanctuary’ both because of its natural beauty and its religious significance to local people who believe in the divine presence there of the goddesses, Annapurna and Gangapurna, important figures in Hindu myth and folklore. The focus of the trek is Annapurna Base Camp, a magnificent spot at 4,130m/13,550 set below a ring of eleven of Nepal’s major peaks. Here you will have a spectacular view of these giants including the immensely impressive south face of Annapurna I.",
      itinerary: [
        {
          day: 1,
          title: "Kathmandu",
          description: "Welcome to Nepal. Kathmandu is an incredible mixture of legend and modern development with a rich artistic and cultural heritage. Kathmandu has been a travellers' centre for many years. It’s very important that you attend the welcome meeting at the hotel lobby. However, you need not worry for the schedule as it will be published on the notice board beforehand your check in."
        },
        {
          day: 2,
          title: "Fly Pokhara > Drive to Kimche & Trek to Chhomrong (2177m / 7143ft)",
          description: "Take a small aircraft to leave Leaving Kathmandu behind early in the morning, its a short and one of the most scenic flights you’ve ever had in your lifetime. Pokhara is just 25 minutes fly away from Kathmandu. Upon landing at Pokhara airport, quickly get arranged with luggage and jump onto a vehicle to drive off to Nayapul. Its another section of journey which is on the road but again filled with lots of interesting sceneries to see and get fascinated. It takes something like 3 hours to reach Kimche, where the trek starts from. Get immediately arranged with load of your baggage and porters and start trekking towards New Bridge. The initial part of the trail follows upstream Modi Khola. The last leg of the trek is steep uphill until the village of Chhomrong, which is located on the top of the hill. The magnificent Fishtail stands at the backdrop."
        },
        {
          day: 3,
          title: "Dobhan (2670m / 8760ft)",
          description: "Begin by trekking for approximately 3 hours through the forest to Kuldi Ghar, then down to the banks of the Modi River and up again to Doban."
        },
        {
          day: 4,
          title: "Dobhan to Machhapuchhre Base Camp (3700m / 12139ft)",
          description: "Passing through Himalaya Hotel, continue up the narrow valley to Deurali. Sticking to the west bank of the Modi River, enter an open valley near Machhapuchhre Base Camp."
        },
        {
          day: 5,
          title: "Annapurna Base Camp (4130m / 13549ft) > back to Himalaya",
          description: "Early in the morning trek up to Annapurna Base Camp. The struggle uphill at that altitude takes around 2 hours but the hard work to get here is worth it. See the magic of change of colours of the majestic peaks by sunrise. Stroll around for an hour and then start tracing the way back to Himalaya."
        },
        {
          day: 6,
          title: "Chomrong (2177m / 7143ft)",
          description: "Passing back through the forests, pastures and staircases, trek back to Chhomrong."
        },
        {
          day: 7,
          title: "Steep descent down to Jhinu Danda > trek to Kimche and drive to Pokhara.",
          description: "There is a natural hotspring on the bank of Modi Khola, where you can plunge and take a well deserved manicure. Take lunch at Jhinu Danda and trek to Kimche where a vehicle awaits to bring us back to Pokhara. It is around 4 hours drive to Pokhara from Kimche. On reaching to Pokhara, get checked into a hotel and rush to the lakeside for a nights party."
        },
        {
          day: 8,
          title: "Fly back to Kathmandu",
          description: "In the morning free time to stroll around the lake city Pokhara. In the afternoon take the same short flight that you have taken some 10 days ago. On reaching to Kathmandu, get transferred to hotel and stay overnight."
        },
        {
          day: 9,
          title: "Departure, end the trip.",
          description: "After breakfast, you will be transferred to the airport for your onward journey."
        },
      ]
    },
    // Independent tours (not in categories)
    {
      slug: createSlug("Temples and Mountains"),
      title: "Temples and Mountains",
      image: getTrekImagePath('Temples_And_Mountains_1.jpg', 'Temples_And_Mountains'),
      slideshowImages: [
        getTrekImagePath('Temples_And_Mountains_1.jpg', 'Temples_And_Mountains'),
        getTrekImagePath('Temples_And_Mountains_2.jpg', 'Temples_And_Mountains'),
        getTrekImagePath('Temples_And_Mountains_3.jpg', 'Temples_And_Mountains'),
        getTrekImagePath('Temples_And_Mountains_4.jpg', 'Temples_And_Mountains'),
        getTrekImagePath('Temples_And_Mountains_5.jpg', 'Temples_And_Mountains'),
      ],
      category: "NepalTours",
      type: "Nepal Family Package",
      duration: "5N / 6D",
      price: "₹65,000",
      description: "Nepal is the home to the supreme deities, untouched cultures, mesmerizing nature and centuries-old heritages. This brisk journey takes you right into the heart of these heritages and gives you an awe-spiring experience.",
      itinerary: [
        {
          day: 1,
          title: "MUM – KTM",
          description: "Fly Pune to Kathmandu. Meet the airport rep. and get transferred to your designated hotel. Check in and participate on a briefing session. Welcome dinner will be hosted on your honor. Meals: Dinner only."
        },
        {
          day: 2,
          title: "Kathmandu – Pokhara",
          description: "Drive from Kathmandu to Pokhara. A scenic drive from Kathmandu to Pokhara is a memorable journey in itself. Take a cable car lift to go and pay homage to Mata Manokamana, the Goddess of fulfillment. Continue the journey further onto Pokhara. Upon reaching to Pokhara, a quick check in procedure and some time is allowed to get refreshed. Go to the boating station, get onboard one of the wooden boats and row off to the temple of Mata Tal Barahi. Later in the evening get back to the hotel. Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 3,
          title: "Pokhara",
          description: "Exploration around Pokhara. Rise up early in the morning to drive up to Sarangkot view point to absorb the amazing view of sunrise over the Annpurna massif. Drive back to the city; on the way have a blessing from Mata Vindyabasisni. Back to the hotel, have breakfast and drive up to the World Peace Pagoda. Drive down to Devi’s Fall then go to International Mountain Museum. Later in the day stroll around the lakeside area and relax. Meals: Breakfast & Dinner"
        },
        {
          day: 4,
          title: "Pokhara – Kathmandu",
          description: "Fly back to Kathmandu. Take the first flight and fly back to Kathmandu. Get onboard a vehicle and go straight out to the ancient city of Bhaktapur for the sightseeing. The tour continues onto Patan. Later in the afternoon visit Baudha; the largest dome stupa in South Asia which is believed to have inhoused the Buddha relics. Drive back to the hotel and check in. Meals: Breakfast & Dinner"
        },
        {
          day: 5,
          title: "Full day Kathmandu",
          description: "Sightseeing of the heritage sites. Early morning drive to Chandragiri base and take a cable car lift to the top. It serves as the view tower to the Central Himalaya as well as the valley underneath. The sightseeing tour further continues to Swoyambhu, Kathmandu Durbar Square and Maha Vishnu Budhanilakantha. Back to the hotel for overnight. A Farewell Dinner will be hosted in your honor. Meals: Breakfast & Dinner."
        },
        {
          day: 6,
          title: "Departure",
          description: "End of an epic journey. But wait a moment… how can you simply go back not having had paid your visit to the principal deity; the mighty Shiva! Start a few hours ahead of your airport timing so that you can have a peaceful time to pray to the God. Meals: Breakfast"
        },
      ]
    },
    {
      slug: createSlug("Spiritual Journey of Nepal"),
      title: "Spiritual Journey of Nepal",
      image: getTrekImagePath('Spiritual_Journey_of_Nepal_Cover.jpg', 'Spiritual_Journey_of_Nepal'),
      slideshowImages: [
        getTrekImagePath('Spiritual_Journey_of_Nepal_Cover.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_1.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_2.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_3.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_5.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_6.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_7.jpg', 'Spiritual_Journey_of_Nepal'),
        getTrekImagePath('Spiritual_Journey_of_Nepal_8.jpg', 'Spiritual_Journey_of_Nepal'),
      ],
      category: "NepalTours",
      type: "Nepal Family Package",
      duration: "7N / 8D",
      price: "₹1,95,000",
      description: "Himalaya is the abode of Gods – mentions every Veda, Purana and Upanishada. Nepal is home to 3/4th of the entire Himalaya; no wonder why most of the deities are believed to have dwelled this land. This particular journey has been designed to give you a sense of meeting with the Gods and Goddesses in person and getting blessed.",
      itinerary: [
        {
          day: 1,
          title: "MUM – KTM",
          description: "Fly Pune to Kathmandu. Meet the airport rep. and get transferred to your designated hotel. Check in and participate on a briefing session. Welcome dinner will be hosted on your honor. Meals: Welcome Dinner."
        },
        {
          day: 2,
          title: "Kathmandu – Pokhara",
          description: "Drive from Kathmandu to Pokhara. A scenic drive from Kathmandu to Pokhara is a memorable journey in itself. Take a cable car lift to go and pay homage to Mata Manokamana, the Goddess of fulfillment. Continue the journey further onto Pokhara. Upon reaching to Pokhara, a quick check in procedure and some time is allowed to get refreshed. Go to the boating station, get onboard one of the wooden boats and row off to the temple of Mata Tal Barahi. Later in the evening get back to the hotel. Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 3,
          title: "Pokhara to Muktinath",
          description: "Drive from Pokhara to Muktinath. The real Tirtha Yatra begins here today as you rise up early in the morning to drive up to Muktinath. On the way at Tatopani (a natural hotspring) you can cleanse yourself before taking a darshan of Galeshwor Mahadev. Then the journey continues onto Ghasa, Kalopani, Marpha, Jomsom, Kakbeni and Muktinath. Upon reaching Muktinath, settle down in a guesthouse and relax to recuperate some energy to go and get the first Darshan of the Lord Muktinath. You may take a holy bath at the 108 dhaara. An overnight at the guesthouse.  Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 4,
          title: "Muktinath to Pokhara",
          description: "Drive back to Pokhara. Early morning you have yet another opportunity to take Darshan of the Lord of Salvation. After breakfast, drive down to Pokhara, retracing the road that was taken yesterday. On reaching to Pokhara, check into a cozy hotel docked at the lake front and relax for the whole evening. Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 5,
          title: "Pokhara Exploration",
          description: "Sightseeing in and around Pokhara. You will be woken up really early in the morning and rushed in a vehicle up to Sarangkot hilltop. The breathtaking views of the sunrise over the Annapurna Himalayas is the reward for this hard job done early in the morning. Drive back down to Pokhara, have breakfast and start the sightseeing trip of World Peace Pagoda, Devi’s Fall, Bidyabasini Temple and International Mountain Museum."
        },
        {
          day: 6,
          title: "Fly Pokhara to Kathmandu",
          description: "Fly Pokhara to Kathmandu. Sightseeing of Bhaktapur & Patan. You will be put up on an early morning flight to fly back to Kathmandu. There’s a lot waiting for you back in the capital city of Nepal. And also a lot of chaotic traffic! Hence, we start pretty early to compensate the time lost in between the sites. Upon arriving at Kathmandu airport, get onboard a vehicle and head straight out to visit the World Heritage sites of Bhaktapur and later onto Patan. The lunch today is on yourself to give you an independence of choice. We bring you to your hotel later in the evening and let you relax. Meals: Breakfast & Dinner"
        },
        {
          day: 7,
          title: "Full day Kathmandu",
          description: "Sightseeing of the heritage sites. Early morning drive to Chandragiri base and take a cable car lift to the top. It serves as the view tower to the Central Himalaya as well as the valley underneath. The sightseeing tour further continues to Swoyambhu, Kathmandu Durbar Square and Maha Vishnu Budhanilakantha. Back to the hotel for overnight. A Farewell Dinner will be hosted in your honor. Meals: Breakfast & Dinner."
        },
        {
          day: 8,
          title: "Departure",
          description: "The Ultimate is here, finally! You will be picked up from your hotel well in advance and take you to Pashupatinath Temple to take blessings from the Lord Shiva. After your meeting with the God himself, we see you off to the airport. Meals: Breakfast"
        },
      ]
    },
    {
      slug: createSlug("Nature and History"),
      title: "Nature and History",
      image: getTrekImagePath('Nature_And_History_3.jpg', 'Nature_And_History'),
      slideshowImages: [
        getTrekImagePath('Nature_And_History_3.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_1.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_2.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_4.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_5.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_6.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_7.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_8.jpg', 'Nature_And_History'),
        getTrekImagePath('Nature_And_History_9.jpg', 'Nature_And_History'),
      ],
      category: "NepalTours",
      type: "Nepal Family Package",
      duration: "7N / 8D",
      price: "₹1,65,000",
      description: "If you are a nature lover, then this is the most perfect thing to do. It goes so deep into the flora and fauna of the low lands and Himalayan mid hills that one finds himself totally lost in awe of the lushness. A perfect blend of culture, heritage and nature for a perfect family holiday.",
      itinerary: [
        {
          day: 1,
          title: "MUM – KTM",
          description: "Fly Pune to Kathmandu Meet the airport rep. and get transferred to your designated hotel. Check in and participate on a briefing session. Welcome dinner will be hosted on your honor. Meals: Welcome Dinner"
        },
        {
          day: 2,
          title: "Kathmandu to Chitwan",
          description: "Drive from Kathmandu to Chitwan National Park. A scenic drive from Kathmandu to Chitwan National Park is a memorable journey in itself. On the half way down at Kurintar, detour for a Darshan of Mata Manokamana, the Goddess of fulfillment of wishes. Continue the journey further down to Chitwan. Upon reaching Chitwan, a quick check in procedure at a jungle lodge and participate on a trip briefing session. Some jungle activities will be carried out right away. Tharu Cultural shows are shown in later in the evening. Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 3,
          title: "Chitwan",
          description: "Jungle activities. A full day to explore the insides of the national park and do uncountable number of jungle activities such as canoe ride, jungle walk, safari and jeep safari. Meals: Breakfast, Lunch & dinner"
        },
        {
          day: 4,
          title: "Chitwan to Pokhara",
          description: "Fly from Chitwan to Pokhara. A short flight out from Bharatpur airport to puts you down at the lake city of Pokhara. On reaching Pokhara, get onboard a vehicle and drive to the hotel that is situated right at the lakeshore. Check in, get refreshed and go for a boat ride to the temple that is located on an island made by the lake. Relax by the lake in the evening. Meals: Breakfast & Dinner"
        },
        {
          day: 5,
          title: "Pokhara",
          description: "Exploration around Pokhara. Rise up early in the morning to drive up to Sarangkot view point to absorb the amazing view of sunrise over the Annpurna massif. Drive back to the city; on the way have a blessing from Mata Vindyabasisni. Back to the hotel, have breakfast and drive up to the World Peace Pagoda. Drive down to Devi’s Fall then go to International Mountain Museum. Later in the day stroll around the lakeside area and relax. Meals: Breakfast & Dinner"
        },
        {
          day: 6,
          title: "Pokhara – Kathmandu",
          description: "Fly back to Kathmandu. Take the first flight and fly back to Kathmandu. Get onboard a vehicle and go straight out to the ancient city of Bhaktapur for the sightseeing. The tour continues onto Patan. Later in the afternoon visit Baudha; the largest dome stupa in South Asia which is believed to have inhoused the Buddha relics. Drive back to the hotel and check in. Meals: Breakfast & Dinner"
        },
        {
          day: 7,
          title: "Full day Kathmandu",
          description: "Sightseeing of the heritage sites. Early morning drive to Chandragiri base and take a cable car lift to the top. It serves as the view tower to the Central Himalaya as well as the valley underneath. The sightseeing tour further continues to Swoyambhu, Kathmandu Durbar Square and Maha Vishnu Budhanilakantha. Back to the hotel for overnight. A Farewell Dinner will be hosted in your honor. Meals: Breakfast & Dinner."
        },
        {
          day: 8,
          title: "Departure",
          description: "Departure day. We are yet to go and take blessings from the mightiest of all the deities, the mighty Shiva! Start a few hours ahead of your airport timing so that you can have a peaceful time to pray to the God. Har Har Mahadev! Meals: Breakfast"
        },
      ]
    },
    {
      slug: createSlug("Wilderness and Divinity"),
      title: "Wilderness and Divinity",
      image: getTrekImagePath('Wilderness_And_Divinity_8.jpg', 'Wilderness_And_Divinity'),
      slideshowImages: [
        getTrekImagePath('Wilderness_And_Divinity_8.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_7.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_1.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_2.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_3.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_4.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_5.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_6.jpg', 'Wilderness_And_Divinity'),
        getTrekImagePath('Wilderness_And_Divinity_9.jpg', 'Wilderness_And_Divinity'),
      ],
      category: "NepalTours",
      type: "Nepal Family Package",
      duration: "9N / 10D",
      price: "₹1,65,000",
      description: "Nepal, from the pinnacle of Mount Sagarmatha at 8848.86m to the low lands of Chitwan National Park at almost sea-level of elevation is barely 250 kilometers apart. Endowed with such a varied vegetation and landscape, Nepal is the home to almost every living creature and plant found on earth. The northern boundary is the never-ending series of the tallest mountain peaks on earth whereas the southern boundary is flat land stretching from east to west. Taking the advantage of varied landscape and vegetation, one can have the widest range of experience of adventure, nature and culture of this country.",
      itinerary: [
        {
          day: 1,
          title: "MUM – KTM",
          description: "Fly Pune to Kathmandu. Meet the airport rep. and get transferred to your designated hotel. Check in and participate on a briefing session. Welcome dinner will be hosted on your honor. Meals: Welcome Dinner."
        },
        {
          day: 2,
          title: "Kathmandu – Chitwan",
          description: "Drive from Kathmandu to Chitwan. A scenic drive from Kathmandu to Pokhara is a memorable journey in itself. Take a cable car lift to go and pay homage to Mata Manokamana, the Goddess of fulfillment of wishes. Continue the journey further down to Chitwan National Park. Upon reaching to Chitwan, a quick check in procedure and partake on a briefing session followed by one of the jungle activities. Later in the evening participate in Tharu Cultural Show and dinner. Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 3,
          title: "Chitwan",
          description: "Full day jungle activities. Explore the insides of Chitwan National Park by participating in Jungle safari, Canoe ride, Walks and Jeep ride etc."
        },
        {
          day: 4,
          title: "Chitwan to Pokhara & Tatopani",
          description: "Fly from Chitwan to Pokhara and drive to Tatopani. Take a short flight from Bharatpur Chitwan to Pokhara. On reaching to Pokhara, get onboard a vehicle and start driving towards Tatopani. It takes about 4 hours to reach Tatopani. Check into one of the nicest riverside hotels and you will have a free time to plunge into natural hotspring, Tatopani Kund."
        },
        {
          day: 5,
          title: "Tatopani to Muktinath & back to Marpha",
          description: "Drive from Tatopani to Muktinath & turn back to Marpha. Driving from Tatopani to Muktinath is a pleasant journey, traversing numerous villages and gorges, before ascending the slopes of Muktinath. Upon reaching Muktinath, take the Darshan of the Lord Vishnu and have a lunch in one of the nearby guesthouses. Get back into the vehicle and drive down to Marpha. Settle down in an apple orchard to experience the Thakali culture and food.  Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 6,
          title: "Marpha to Pokhara",
          description: "Drive back to Pokhara. After breakfast, drive down to Pokhara, retracing the road that was taken yesterday. Get blessings from Shanker Mahadev at Galeshwor on the way. On reaching to Pokhara, check into a cozy hotel docked at the lake front and relax for the whole evening. Meals: Breakfast, Lunch & Dinner"
        },
        {
          day: 7,
          title: "Pokhara Exploration",
          description: "Sightseeing in and around Pokhara. You will be woken up really early in the morning and rushed in a vehicle up to Sarangkot hilltop. The breathtaking views of the sunrise over the Annapurna Himalayas is the reward for this hard job done early in the morning. Drive back down to Pokhara, have breakfast and start the sightseeing trip of World Peace Pagoda, Devi’s Fall, Bidyabasini Temple and International Mountain Museum."
        },
        {
          day: 8,
          title: "Fly Pokhara to Kathmandu",
          description: "Fly Pokhara to Kathmandu – Sightseeing of Bhaktapur & Patan. You will be put up on an early morning flight to fly back to Kathmandu. Upon arriving at Kathmandu airport, get onboard a vehicle and head straight out to visit the World Heritage sites of Bhaktapur and later onto Patan. The lunch today is on yourself to give you an independence of choice. We bring you to your hotel later in the evening and let you relax. Meals: Breakfast & Dinner"
        },
        {
          day: 9,
          title: "Full day Kathmandu",
          description: "Sightseeing of the heritage sites. Early morning drive to Chandragiri base and take a cable car lift to the top. It serves as the view tower to the Central Himalaya as well as the valley underneath. The sightseeing tour further continues to Swoyambhu, Kathmandu Durbar Square and Maha Vishnu Budhanilakantha. Back to the hotel for overnight. A Farewell Dinner will be hosted in your honor. Meals: Breakfast & Dinner."
        },
        {
          day: 10,
          title: "Departure",
          description: "The Ultimate is here, finally! You will be picked up from your hotel well in advance and take you to Pashupatinath Temple to take blessings from the Lord Shiva. After your meeting with the God himself, we see you off to the airport. Meals: Breakfast"
        },
      ]
    }
  ], []); // Empty dependency array since this is static data

  // Create tour items structure with categories and individual tours
  const tourItems: TourItem[] = useMemo(() => [
    {
      type: 'tour',
      tour: individualTreks.find(trek => trek.title === "Everest Base Camp Trek")!
    },
    {
      type: 'tour',
      tour: individualTreks.find(trek => trek.title === "Mount Kailash Mansarovar")!
    },
    {
      type: 'category',
      category: {
        slug: createSlug("Annapurna Trek"),
        title: "Annapurna Trek",
        description: "Classic Annapurna region treks through terraced villages, rhododendron forests, and high mountain passes — offering spectacular mountain vistas, cultural encounters with local Gurung and Magar communities, and options for moderate to challenging itineraries.",
        image: getTrekImagePath('Annapurna_Base_Camp_Cover.jpg', 'Annapurna_Base_Camp'),
        type: 'category',
        tours: individualTreks.filter(trek => trek.category?.includes('AnnapurnaTrek'))
      }
    },
    {
      type: 'category',
      category: {
        slug: createSlug("Nepal Tours"),
        title: "Nepal Tours",
        description: "Curated cultural and adventure tours across Nepal — from Kathmandu's UNESCO heritage sites to Himalayan foothills and scenic valleys. Ideal for first-time visitors and those seeking immersive local experiences.",
        image: getTrekImagePath('Spiritual_Journey_of_Nepal_Cover.jpg', 'Spiritual_Journey_of_Nepal'),
        type: 'category',
        tours: individualTreks.filter(trek => trek.category?.includes('NepalTours'))
      }
    },
  ], [individualTreks]);

  // Flatten all tours from categories and individual tours
  const treksData: Trek[] = useMemo(() => {
    const flattened: Trek[] = [];
    tourItems.forEach(item => {
      if (item.type === 'category' && item.category) {
        flattened.push(...item.category.tours);
      } else if (item.type === 'tour' && item.tour) {
        flattened.push(item.tour);
      }
    });
    return flattened;
  }, [tourItems]);

  // Helper functions
  const getTrekBySlug = useCallback((slug: string): Trek | undefined => {
    return treksData.find(trek => trek.slug === slug);
  }, [treksData]);

  const getCategoryBySlug = useCallback((slug: string): TourCategory | undefined => {
    for (const item of tourItems) {
      if (item.type === 'category' && item.category?.slug === slug) {
        return item.category;
      }
    }
    return undefined;
  }, [tourItems]);

  const getToursByCategory = useCallback((categorySlug: string): Trek[] => {
    const category = getCategoryBySlug(categorySlug);
    return category ? category.tours : [];
  }, [getCategoryBySlug]);

  const getCategoryForTour = useCallback((trekSlug: string): TourCategory | undefined => {
    for (const item of tourItems) {
      if (item.type === 'category' && item.category) {
        const tourInCategory = item.category.tours.find(tour => tour.slug === trekSlug);
        if (tourInCategory) {
          return item.category;
        }
      }
    }
    return undefined;
  }, [tourItems]);

  const value: TourContextType = {
    tourItems,
    treksData,
    getTrekBySlug,
    getCategoryBySlug,
    getToursByCategory,
    getCategoryForTour
  };

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
};
