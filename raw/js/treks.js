/**
 * Treks Page JavaScript
 * Handles trek data management, filtering, and dynamic card generation
 */

// Trek data array
const treksData = [
  {
    id: 1,
    name: "Everest Base Camp Trek",
    image: "../assets/Everest_Base_Camp_stock.jpg",
    category: "himalayan adventure",
    type: "Himalayan Trek",
    typeIcon: "fas fa-mountain",
    difficulty: "Extreme",
    difficultyColor: "bg-red-500/90",
    duration: "15N / 16D",
    maxAltitude: "5,364m",
    groupSize: "8-12 pax",
    price: "₹1,85,000",
    priceColor: "text-sky-600",
    buttonGradient: "from-sky-600 to-blue-600",
    buttonHoverGradient: "hover:from-sky-700 hover:to-blue-700",
    titleHoverColor: "group-hover:text-sky-600",
    description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Arrive at Tribhuvan International Airport, Kathmandu. Transfer to hotel. Briefing about the trek and equipment check. Explore Thamel area in the evening."
      },
      {
        day: 2,
        title: "Fly to Lukla & Trek to Phakding",
        description: "Early morning scenic flight to Lukla (2,840m). Begin trekking to Phakding (2,610m). Walk through beautiful landscapes and cross suspension bridges. Overnight in tea house."
      },
      {
        day: 3,
        title: "Phakding to Namche Bazaar",
        description: "Trek to Namche Bazaar (3,440m), the Sherpa capital. Cross several suspension bridges including the famous Hillary Bridge. First glimpse of Everest weather permitting."
      },
      {
        day: 4,
        title: "Acclimatization Day in Namche",
        description: "Rest day for acclimatization. Hike to Everest View Hotel for stunning mountain views. Visit Sherpa Museum and explore the bustling Namche market."
      },
      {
        day: 5,
        title: "Namche to Tengboche",
        description: "Trek to Tengboche (3,860m) through rhododendron forests. Visit the famous Tengboche Monastery with panoramic views of Everest, Ama Dablam, and other peaks."
      },
      {
        day: 6,
        title: "Tengboche to Dingboche",
        description: "Continue to Dingboche (4,410m). Pass through Pangboche village and enjoy views of Lhotse, Island Peak, and Ama Dablam. Overnight in tea house."
      },
      {
        day: 7,
        title: "Acclimatization Day in Dingboche",
        description: "Second acclimatization day. Hike to Nagarjun Hill (5,100m) for spectacular views of Makalu, Lhotse, Cho Oyu, and other peaks. Return to Dingboche."
      },
      {
        day: 8,
        title: "Dingboche to Lobuche",
        description: "Trek to Lobuche (4,940m) via Thukla Pass. Pay respects at the memorial stones of climbers. Challenging day with thin air and rocky terrain."
      },
      {
        day: 9,
        title: "Lobuche to EBC via Gorak Shep",
        description: "Trek to Gorak Shep (5,164m) and continue to Everest Base Camp (5,364m). Achieve the main goal of reaching EBC. Return to Gorak Shep for overnight."
      },
      {
        day: 10,
        title: "Kala Patthar & Return to Pheriche",
        description: "Early morning hike to Kala Patthar (5,545m) for sunrise views of Everest. Best viewpoint of the trek. Descend to Pheriche (4,371m) for overnight."
      },
      {
        day: 11,
        title: "Pheriche to Namche Bazaar",
        description: "Long descent back to Namche Bazaar. Retrace steps through Tengboche and Phunki Tenga. Celebrate completion at Namche's Irish Pub."
      },
      {
        day: 12,
        title: "Namche to Lukla",
        description: "Final trekking day back to Lukla. Cross the Hillary Bridge one last time. Farewell dinner with trekking crew. Last night in the mountains."
      },
      {
        day: 13,
        title: "Fly back to Kathmandu",
        description: "Morning flight from Lukla to Kathmandu. Rest and recover at hotel. Optional shopping for souvenirs in Thamel. Farewell dinner."
      },
      {
        day: 14,
        title: "Explore Kathmandu",
        description: "Visit UNESCO World Heritage sites - Pashupatinath Temple, Boudhanath Stupa, or Swayambhunath. Rest and preparation for departure."
      },
      {
        day: 15,
        title: "Departure",
        description: "Transfer to Tribhuvan International Airport for final departure. End of the adventure with memories of a lifetime."
      }
    ]
  },
  {
    id: 2,
    name: "Mount Kailash Mansarovar",
    image: "../assets/Kailash_stock.jpg",
    category: "pilgrimage",
    type: "Sacred Pilgrimage",
    typeIcon: "fas fa-om",
    difficulty: "Spiritual",
    difficultyColor: "bg-purple-500/90",
    duration: "11N / 12D",
    maxAltitude: "5,630m",
    groupSize: "15-20 pax",
    price: "₹2,25,000",
    priceColor: "text-purple-600",
    buttonGradient: "from-purple-600 to-indigo-600",
    buttonHoverGradient: "hover:from-purple-700 hover:to-indigo-700",
    titleHoverColor: "group-hover:text-purple-600",
    description: "Embark on the most sacred pilgrimage in the Himalayas. Visit the divine Mount Kailash and the pristine Mansarovar Lake.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Arrive in Kathmandu. Transfer to hotel. Evening briefing and preparation for the sacred journey ahead."
      },
      {
        day: 2,
        title: "Drive to Syabrubesi",
        description: "Drive to Syabrubesi (1,550m) via scenic mountain roads. Prepare for border crossing formalities."
      },
      {
        day: 3,
        title: "Cross to Kerung & Drive to Saga",
        description: "Cross Nepal-Tibet border at Rasuwa. Drive to Saga (4,640m). First day at high altitude, rest and acclimatize."
      },
      {
        day: 4,
        title: "Saga to Mansarovar Lake",
        description: "Drive to sacred Mansarovar Lake (4,590m). Perform puja and take holy dip. Witness stunning sunset over the lake."
      },
      {
        day: 5,
        title: "Mansarovar to Darchen",
        description: "Morning rituals at Mansarovar. Drive to Darchen (4,575m), base camp for Kailash Parikrama. Preparation for circumambulation."
      },
      {
        day: 6,
        title: "Darchen to Dirapuk",
        description: "Begin Kailash Parikrama. Trek to Dirapuk (4,909m). First day of the sacred circumambulation around Mount Kailash."
      },
      {
        day: 7,
        title: "Dirapuk to Zuthulpuk via Dolma La",
        description: "Cross Dolma La Pass (5,630m) - the highest point. Descent to Zuthulpuk (4,790m). Most challenging day of the pilgrimage."
      },
      {
        day: 8,
        title: "Zuthulpuk to Darchen",
        description: "Complete the Kailash Parikrama by returning to Darchen. Celebration of completing the sacred circumambulation."
      },
      {
        day: 9,
        title: "Darchen to Saga",
        description: "Drive back to Saga. Rest and reflect on the spiritual journey completed. Overnight in guesthouse."
      },
      {
        day: 10,
        title: "Saga to Kerung",
        description: "Drive to Kerung near the Nepal border. Complete immigration formalities. Last night in Tibet."
      },
      {
        day: 11,
        title: "Kerung to Kathmandu",
        description: "Cross back to Nepal and drive to Kathmandu. Farewell dinner celebrating the successful completion of the pilgrimage."
      },
      {
        day: 12,
        title: "Departure",
        description: "Transfer to airport for final departure. End of the sacred journey with spiritual blessings and unforgettable memories."
      }
    ]
  },
  {
    id: 3,
    name: "Hidden Himalayan Valleys",
    image: "../assets/hidden_himalayan_valleys_stock.jpg",
    category: "himalayan cultural",
    type: "Cultural Trek",
    typeIcon: "fas fa-leaf",
    difficulty: "Moderate",
    difficultyColor: "bg-emerald-500/90",
    duration: "9N / 10D",
    maxAltitude: "4,200m",
    groupSize: "6-10 pax",
    price: "₹95,000",
    priceColor: "text-emerald-600",
    buttonGradient: "from-emerald-600 to-green-600",
    buttonHoverGradient: "hover:from-emerald-700 hover:to-green-700",
    titleHoverColor: "group-hover:text-emerald-600",
    description: "Discover untouched valleys, ancient monasteries, and traditional villages in the remote corners of the Himalayas."
  },
  {
    id: 4,
    name: "Annapurna Circuit Trek",
    image: "https://images.unsplash.com/photo-1597149834908-38c5580c8b52?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "himalayan adventure",
    type: "Himalayan Trek",
    typeIcon: "fas fa-mountain",
    difficulty: "Challenging",
    difficultyColor: "bg-orange-500/90",
    duration: "13N / 14D",
    maxAltitude: "5,416m",
    groupSize: "8-12 pax",
    price: "₹1,25,000",
    priceColor: "text-orange-600",
    buttonGradient: "from-orange-600 to-red-600",
    buttonHoverGradient: "hover:from-orange-700 hover:to-red-700",
    titleHoverColor: "group-hover:text-orange-600",
    description: "One of the world's most diverse treks. Experience varied landscapes from subtropical forests to alpine meadows."
  },
  {
    id: 5,
    name: "Char Dham Yatra",
    image: "https://images.unsplash.com/photo-1571114980634-71de3a83be98?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "pilgrimage cultural",
    type: "Sacred Journey",
    typeIcon: "fas fa-place-of-worship",
    difficulty: "Easy",
    difficultyColor: "bg-indigo-500/90",
    duration: "10N / 11D",
    maxAltitude: "3,415m",
    groupSize: "20-25 pax",
    price: "₹65,000",
    priceColor: "text-indigo-600",
    buttonGradient: "from-indigo-600 to-purple-600",
    buttonHoverGradient: "hover:from-indigo-700 hover:to-purple-700",
    titleHoverColor: "group-hover:text-indigo-600",
    description: "Visit the four sacred abodes - Yamunotri, Gangotri, Kedarnath, and Badrinath in a comfortable spiritual journey."
  },
  {
    id: 6,
    name: "Valley of Flowers Trek",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "himalayan adventure",
    type: "Nature Trek",
    typeIcon: "fas fa-seedling",
    difficulty: "Moderate",
    difficultyColor: "bg-emerald-500/90",
    duration: "5N / 6D",
    maxAltitude: "3,658m",
    groupSize: "10-15 pax",
    price: "₹42,000",
    priceColor: "text-emerald-600",
    buttonGradient: "from-emerald-600 to-green-600",
    buttonHoverGradient: "hover:from-emerald-700 hover:to-green-700",
    titleHoverColor: "group-hover:text-emerald-600",
    description: "A UNESCO World Heritage site famous for its endemic alpine flowers and diverse flora in the heart of Uttarakhand."
  }
];

/**
 * Creates HTML for a single trek card
 * @param {Object} trek - Trek data object
 * @returns {string} HTML string for the trek card
 */
function createTrekCard(trek) {
  return `
    <article class="trek-card ${trek.category} group" data-category="${trek.category}">
      <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <!-- Image Container -->
        <div class="relative overflow-hidden">
          <img 
            src="${trek.image}" 
            alt="${trek.name}" 
            class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3'"
          />
          <div class="absolute top-4 left-4">
            <span class="difficulty-badge px-3 py-1 bg-slate-800/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
              <i class="fas fa-mountain"></i>
              ${trek.maxAltitude}
            </span>
          </div>
          <div class="absolute top-4 right-4">
            <span class="duration-badge px-3 py-1 bg-white/90 text-slate-700 text-xs font-semibold rounded-full backdrop-blur-sm flex items-center gap-1">
              <i class="fas fa-clock"></i>
              ${trek.duration}
            </span>
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <i class="${trek.typeIcon} ${trek.priceColor}"></i>
            <span class="text-sm text-slate-600 font-medium">${trek.type}</span>
          </div>
          
          <h3 class="text-xl font-bold text-slate-800 mb-2 ${trek.titleHoverColor} transition-colors">
            ${trek.name}
          </h3>
          
          <p class="text-slate-600 text-sm mb-4 leading-relaxed">
            ${trek.description}
          </p>

          <!-- Trek Details -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="flex items-center gap-2">
              <i class="fas fa-chart-line text-orange-600 text-sm"></i>
              <div>
                <div class="text-xs text-slate-500">Difficulty</div>
                <div class="text-sm font-semibold text-slate-700">${trek.difficulty}</div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-users text-blue-600 text-sm"></i>
              <div>
                <div class="text-xs text-slate-500">Group Size</div>
                <div class="text-sm font-semibold text-slate-700">${trek.groupSize}</div>
              </div>
            </div>
          </div>

          <!-- Price and CTA -->
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-slate-500 mb-1">Starting from</div>
              <div class="text-2xl font-bold text-sky-600">${trek.price}</div>
              <div class="text-xs text-slate-500">per person</div>
            </div>
            <a href="./trek-details.html?id=${trek.id}" 
               class="cta-button px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300">
              View Details
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renders all treks to the grid
 * @param {Array} treks - Array of trek objects to render
 */
function renderTreks(treks = treksData) {
  const treksGrid = document.getElementById('treksGrid');
  if (!treksGrid) {
    console.error('Treks grid element not found');
    return;
  }
  
  // Add loading state
  treksGrid.classList.add('loading');
  
  // Clear existing content
  treksGrid.innerHTML = '';
  
  // Render trek cards
  const trekCards = treks.map(trek => createTrekCard(trek)).join('');
  treksGrid.innerHTML = trekCards;
  
  // Remove loading state
  treksGrid.classList.remove('loading');
  
  // Add staggered animation
  const cards = treksGrid.querySelectorAll('.trek-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }, index * 100);
  });
}

/**
 * Filters treks based on category
 * @param {string} category - Category to filter by ('all' for no filter)
 */
function filterTreks(category) {
  const filteredTreks = category === 'all' 
    ? treksData 
    : treksData.filter(trek => {
        const categories = trek.category.split(' ');
        return categories.includes(category);
      });
  
  renderTreks(filteredTreks);
}

/**
 * Updates active filter button state
 * @param {HTMLElement} activeButton - The button that was clicked
 */
function updateFilterButtons(activeButton) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.classList.remove('active', 'bg-sky-600', 'text-white');
    btn.classList.add('bg-slate-100', 'text-slate-700');
  });
  
  activeButton.classList.add('active', 'bg-sky-600', 'text-white');
  activeButton.classList.remove('bg-slate-100', 'text-slate-700');
}

/**
 * Initializes filter functionality
 */
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const filter = this.getAttribute('data-filter');
      
      // Update button states
      updateFilterButtons(this);
      
      // Filter and render treks
      filterTreks(filter);
      
      // Analytics tracking (if needed)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_treks', {
          event_category: 'engagement',
          event_label: filter
        });
      }
    });
  });
}

/**
 * Initializes load more functionality
 */
function initializeLoadMore() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading state
      const originalText = this.textContent;
      this.textContent = 'Loading...';
      this.disabled = true;
      
      // Simulate loading (in a real app, this would fetch more data)
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
        
        // You can add logic here to load more treks
        console.log('Load more treks functionality can be implemented here');
      }, 1000);
    });
  }
}

/**
 * Sets up intersection observer for lazy loading and animations
 */
function initializeIntersectionObserver() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Observe trek cards
    document.querySelectorAll('.trek-card').forEach(card => {
      observer.observe(card);
    });
  }
}

/**
 * Handles search functionality (if search input exists)
 */
function initializeSearch() {
  const searchInput = document.getElementById('trekSearch');
  
  if (searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      
      searchTimeout = setTimeout(() => {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
          renderTreks();
          return;
        }
        
        const filteredTreks = treksData.filter(trek => 
          trek.name.toLowerCase().includes(searchTerm) ||
          trek.description.toLowerCase().includes(searchTerm) ||
          trek.type.toLowerCase().includes(searchTerm) ||
          trek.category.toLowerCase().includes(searchTerm)
        );
        
        renderTreks(filteredTreks);
      }, 300);
    });
  }
}

/**
 * Sets the current year in footer
 */
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Main initialization function
 */
function initializeTreksPage() {
  // Render initial treks
  renderTreks();
  
  // Initialize all functionality
  initializeFilters();
  initializeLoadMore();
  initializeSearch();
  setCurrentYear();
  
  // Initialize intersection observer after a short delay
  setTimeout(initializeIntersectionObserver, 500);
  
  console.log('Treks page initialized successfully');
}

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize treks page functionality if we're on the treks listing page
  const treksGrid = document.getElementById('treksGrid');
  if (treksGrid) {
    initializeTreksPage();
  }
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    treksData,
    createTrekCard,
    renderTreks,
    filterTreks,
    initializeTreksPage
  };
}
