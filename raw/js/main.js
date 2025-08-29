/**
 * AP Tours & Travels - Main JavaScript
 * Handles navigation, parallax effects, and form interactions
 */

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

/**
 * Main application initialization
 */
function initializeApp() {
  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Initialize components
  initMobileMenu();
  initNavigationHandlers();
  initMobileParallax();
  initFormHandlers();
  initFeaturedTreks();
  
  // Handle initial page load with hash
  handleInitialHash();
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
  const mobileBtn = document.getElementById("mobileBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

/**
 * Enhanced mobile parallax handler with zoom effects
 */
function initMobileParallax() {
  const isMobile = window.innerWidth <= 768;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (isMobile) {
    setupMobileParallax(parallaxElements);
  } else {
    setupDesktopParallax(parallaxElements);
  }
  
  // Re-initialize on window resize
  window.addEventListener('resize', initMobileParallax);
}

/**
 * Setup mobile parallax with zoom effects
 */
function setupMobileParallax(parallaxElements) {
  // Configure mobile display properties
  parallaxElements.forEach(element => {
    element.style.backgroundAttachment = 'scroll';
    element.style.backgroundPosition = 'center center';
    element.style.backgroundSize = 'cover';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.transform = 'none';
    element.style.willChange = 'auto';
  });
  
  // Add enhanced mobile parallax effect with zoom
  let ticking = false;
  
  function updateMobileParallax() {
    parallaxElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Only apply effect when element is in viewport or near it
      if (elementTop < windowHeight + 200 && (elementTop + elementHeight) > -200) {
        // Calculate scroll progress for this element (0 to 1)
        const rawProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
        const scrollProgress = Math.max(0, Math.min(1, rawProgress));
        
        // Subtle parallax offset
        const parallaxOffset = (scrollProgress - 0.5) * 30; // 30px max offset
        
        // Zoom effect calculation
        let zoomFactor;
        if (scrollProgress < 0.5) {
          // Element is entering viewport - zoom from 105% to 100%
          zoomFactor = 105 - (scrollProgress * 10);
        } else {
          // Element is leaving viewport - zoom from 100% to 95%
          zoomFactor = 100 - ((scrollProgress - 0.5) * 10);
        }
        
        // Apply the effects
        element.style.backgroundPosition = `center calc(50% + ${parallaxOffset}px)`;
        element.style.backgroundSize = `${zoomFactor}%`;
        
        // Add subtle opacity effect for elements far from center
        const centerDistance = Math.abs(scrollProgress - 0.5);
        const opacity = 1 - (centerDistance * 0.1);
        element.style.opacity = Math.max(0.9, opacity);
      }
    });
    
    ticking = false;
  }
  
  function requestMobileParallaxTick() {
    if (!ticking) {
      requestAnimationFrame(updateMobileParallax);
      ticking = true;
    }
  }
  
  // Remove any existing listeners first
  window.removeEventListener('scroll', window.mobileParallaxHandler);
  
  // Add new optimized listener
  window.mobileParallaxHandler = requestMobileParallaxTick;
  window.addEventListener('scroll', window.mobileParallaxHandler, { passive: true });
  
  // Initial call to set up elements
  updateMobileParallax();
}

/**
 * Setup desktop parallax
 */
function setupDesktopParallax(parallaxElements) {
  // Remove mobile parallax listener for desktop
  window.removeEventListener('scroll', window.mobileParallaxHandler);
  
  // Reset to fixed attachment for desktop
  parallaxElements.forEach(element => {
    element.style.backgroundAttachment = 'fixed';
    element.style.backgroundPosition = 'center';
    element.style.backgroundSize = 'cover';
    element.style.transform = 'none';
    element.style.opacity = '1';
  });
}

/**
 * Navigation and smooth scrolling handlers
 */
function initNavigationHandlers() {
  const mobileMenu = document.getElementById("mobileMenu");
  
  // Hash link handler: smooth scroll and show sections with proper offset
  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href") || "#home";
      const id = href.replace("#", "") || "home";
      const targetElement = document.getElementById(id);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
        
        // Calculate offset for sticky header
        const headerHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        // Smooth scroll to target with offset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Handle initial hash on page load
 */
function handleInitialHash() {
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const targetElement = document.getElementById(id);
      
      if (targetElement) {
        const headerHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 100);
      }
    }
  });
}

/**
 * Form handling functionality
 */
function initFormHandlers() {
  const enquiryForm = document.getElementById("enquiryForm");
  
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", handleFormSubmit);
  }
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
  const status = document.getElementById("formStatus");
  status.textContent = "Sending...";
  
  try {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });
    
    if (res.ok) {
      status.textContent = "Thank you — we received your enquiry.";
      form.reset();
    } else {
      const err = await res.json().catch(() => ({}));
      status.textContent = err.error || "Something went wrong. Please try again.";
    }
  } catch (err) {
    status.textContent = "Unable to send — check form endpoint or network.";
  }
}

/**
 * Featured Treks Data (subset from treks.js)
 */
const featuredTreksData = [
  {
    id: 1,
    name: "Everest Base Camp Trek",
    image: "./assets/Everest_Base_Camp_stock.jpg",
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
    description: "Journey to the base of the world's highest peak. Experience breathtaking Himalayan landscapes, Sherpa culture, and the ultimate trekking adventure."
  },
  {
    id: 2,
    name: "Mount Kailash Mansarovar",
    image: "./assets/Kailash_stock.jpg",
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
    description: "Embark on the most sacred pilgrimage in the Himalayas. Visit the divine Mount Kailash and the pristine Mansarovar Lake."
  },
  {
    id: 3,
    name: "Hidden Himalayan Valleys",
    image: "./assets/hidden_himalayan_valleys_stock.jpg",
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
    description: "Discover remote valleys, authentic local culture, and pristine mountain landscapes away from the crowds."
  }
];

/**
 * Creates a featured trek card with consistent styling and height
 */
function createFeaturedTrekCard(trek) {
  return `
    <article class="trek-card group h-full">
      <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
        <!-- Image Container -->
        <div class="relative overflow-hidden flex-shrink-0">
          <img 
            src="${trek.image}" 
            alt="${trek.name}" 
            class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
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
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex items-center gap-2 mb-3">
            <i class="${trek.typeIcon} ${trek.priceColor}"></i>
            <span class="text-sm text-slate-600 font-medium">${trek.type}</span>
          </div>
          
          <h3 class="text-xl font-bold text-slate-800 mb-2 ${trek.titleHoverColor} transition-colors">
            ${trek.name}
          </h3>
          
          <p class="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
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
          <div class="flex items-center justify-between mt-auto">
            <div>
              <div class="text-xs text-slate-500 mb-1">Starting from</div>
              <div class="text-2xl font-bold ${trek.priceColor}">${trek.price}</div>
              <div class="text-xs text-slate-500">per person</div>
            </div>
            <a href="./treks/trek-details.html?id=${trek.id}" 
               class="cta-button px-6 py-3 bg-gradient-to-r ${trek.buttonGradient} text-white font-semibold rounded-lg ${trek.buttonHoverGradient} transition-all duration-300 flex-shrink-0">
              View Details
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initializes the featured treks section
 */
function initFeaturedTreks() {
  const featuredContainer = document.getElementById('featuredTreksContainer');
  if (!featuredContainer) return;
  
  // Render featured trek cards
  const trekCards = featuredTreksData.map(trek => createFeaturedTrekCard(trek)).join('');
  featuredContainer.innerHTML = trekCards;
  
  // Add staggered animation
  const cards = featuredContainer.querySelectorAll('.trek-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }, index * 200);
  });
}
