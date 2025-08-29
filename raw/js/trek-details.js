// Trek Details Page JavaScript

// Global variables
let currentSlide = 0;
const totalSlides = 3;
let currentDay = 1;
let itineraryData = [];

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure treksData is loaded
  setTimeout(function() {
    // Check if treksData is available
    if (typeof treksData === 'undefined') {
      console.error('treksData is not defined');
      document.getElementById('loadingState').classList.add('hidden');
      document.getElementById('errorState').classList.remove('hidden');
      return;
    }

    // Get trek ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const trekId = urlParams.get('id') || urlParams.get('trek');
    
    console.log('Looking for trek with ID:', trekId);
    console.log('Available treks:', treksData.map(t => ({id: t.id, name: t.name})));
    
    // Find the trek in our data by ID
    const trek = treksData.find(t => t.id === parseInt(trekId));
    
    if (trek) {
      console.log('Trek found:', trek.name);
      // Hide loading state and show content
      document.getElementById('loadingState').classList.add('hidden');
      document.getElementById('trekDetailsContainer').classList.remove('hidden');
      
      // Populate the page with trek data
      populateTrekDetails(trek);
    } else {
      // Show error state
      console.error('Trek not found for ID:', trekId);
      console.log('Available trek IDs:', treksData.map(t => t.id));
      document.getElementById('loadingState').classList.add('hidden');
      document.getElementById('errorState').classList.remove('hidden');
    }
  }, 100);
  
  // Set current year safely
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

function populateTrekDetails(trek) {
  // Hero carousel images
  const images = [
    trek.image,
    // Add fallback images for other slides
    trek.image.includes('unsplash') ? 
      trek.image.replace('?q=80&w=1200', '?q=80&w=1200&fit=crop&crop=top') :
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
    trek.image.includes('unsplash') ? 
      trek.image.replace('?q=80&w=1200', '?q=80&w=1200&fit=crop&crop=center') :
      'https://images.unsplash.com/photo-1571114980634-71de3a83be98?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3'
  ];
  
  document.getElementById('trekImage1').src = images[0];
  document.getElementById('trekImage1').alt = trek.name + ' - View 1';
  document.getElementById('trekImage2').src = images[1];
  document.getElementById('trekImage2').alt = trek.name + ' - View 2';
  document.getElementById('trekImage3').src = images[2];
  document.getElementById('trekImage3').alt = trek.name + ' - View 3';
  
  // Initialize carousel
  initializeCarousel();
  
  // Trek type tag with appropriate styling (Desktop)
  const trekTypeTag = document.getElementById('trekTypeTag');
  const trekTypeIcon = document.getElementById('trekTypeIcon');
  const trekType = document.getElementById('trekType');
  
  trekTypeIcon.className = trek.typeIcon + ' text-sm';
  trekType.textContent = trek.type;
  
  // Set tag color based on trek type
  let tagClasses = 'inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full ';
  if (trek.type.includes('Himalayan') || trek.type.includes('Nature')) {
    tagClasses += 'bg-sky-100 text-sky-700';
  } else if (trek.type.includes('Sacred') || trek.type.includes('Pilgrimage')) {
    tagClasses += 'bg-purple-100 text-purple-700';
  } else if (trek.type.includes('Cultural')) {
    tagClasses += 'bg-emerald-100 text-emerald-700';
  } else {
    tagClasses += 'bg-sky-100 text-sky-700'; // default
  }
  trekTypeTag.className = tagClasses;
  
  // Trek type tag with appropriate styling (Mobile)
  const trekTypeTagMobile = document.getElementById('trekTypeTagMobile');
  const trekTypeIconMobile = document.getElementById('trekTypeIconMobile');
  const trekTypeMobile = document.getElementById('trekTypeMobile');
  
  trekTypeIconMobile.className = trek.typeIcon + ' text-sm';
  trekTypeMobile.textContent = trek.type;
  trekTypeTagMobile.className = tagClasses;
  
  document.getElementById('trekName').textContent = trek.name;
  document.getElementById('trekNameMobile').textContent = trek.name;
  
  // Quick info cards (desktop)
  document.getElementById('trekDifficulty').textContent = trek.difficulty;
  document.getElementById('trekMaxAltitude').textContent = trek.maxAltitude;
  document.getElementById('trekDuration').textContent = trek.duration;
  document.getElementById('trekGroupSize').textContent = trek.groupSize;
  
  // Quick info cards (mobile compact)
  document.getElementById('trekDifficultyMobile').textContent = trek.difficulty;
  document.getElementById('trekMaxAltitudeMobile').textContent = trek.maxAltitude;
  document.getElementById('trekDurationMobile').textContent = trek.duration;
  document.getElementById('trekGroupSizeMobile').textContent = trek.groupSize;
  
  // Detailed description (both desktop and mobile)
  document.getElementById('detailedDescriptionDesktop').textContent = trek.description;
  document.getElementById('detailedDescription').textContent = trek.description;
  
  // Pricing (both mobile and desktop)
  document.getElementById('trekPriceDesktop').textContent = trek.price;
  document.getElementById('trekPriceMobile').textContent = trek.price;
  
  // Initialize itinerary if available
  if (trek.itinerary && trek.itinerary.length > 0) {
    try {
      initializeItinerary(trek.itinerary);
    } catch (error) {
      console.error('Error initializing itinerary:', error);
      // Hide itinerary sections if there's an error
      const desktopItinerary = document.querySelector('.lg\\:col-span-2 .bg-white:nth-child(3)');
      const mobileItinerary = document.querySelector('.lg\\:hidden .bg-white:nth-child(3)');
      if (desktopItinerary) {
        desktopItinerary.style.display = 'none';
      }
      if (mobileItinerary) {
        mobileItinerary.style.display = 'none';
      }
    }
  } else {
    // Hide itinerary sections if no data
    const desktopItinerary = document.querySelector('.lg\\:col-span-2 .bg-white:nth-child(3)');
    const mobileItinerary = document.querySelector('.lg\\:hidden .bg-white:nth-child(3)');
    if (desktopItinerary) {
      desktopItinerary.style.display = 'none';
    }
    if (mobileItinerary) {
      mobileItinerary.style.display = 'none';
    }
  }
  
  // Update page title
  document.title = `${trek.name} - AP Tours & Travels`;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = `${trek.description} - Book your ${trek.name} adventure with AP Tours & Travels.`;
  }
}

// Carousel functionality
function initializeCarousel() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.carousel-dot');
  
  // Navigation buttons
  prevBtn.addEventListener('click', () => {
    currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    updateCarousel();
  });
  
  nextBtn.addEventListener('click', () => {
    currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
    updateCarousel();
  });
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Auto-advance carousel every 5 seconds
  setInterval(() => {
    currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
    updateCarousel();
  }, 5000);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
      updateCarousel();
    }
  });
}

function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  
  // Update slides
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Itinerary functionality
function initializeItinerary(itinerary) {
  itineraryData = itinerary;
  currentDay = 1;
  
  // Generate timeline dots for desktop
  const timelineDots = document.getElementById('timelineDots');
  if (timelineDots) {
    timelineDots.innerHTML = itinerary.map(day => 
      `<div class="timeline-dot ${day.day === 1 ? 'active' : ''}" data-day="${day.day}">
        <span class="timeline-dot-label">Day ${day.day}</span>
      </div>`
    ).join('');
    
    // Add click events to timeline dots
    timelineDots.querySelectorAll('.timeline-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const dayNumber = parseInt(dot.dataset.day);
        showDay(dayNumber);
      });
    });
  }
  
  // Generate mobile timeline dots
  const mobileTimelineDots = document.getElementById('mobileTimelineDots');
  if (mobileTimelineDots) {
    mobileTimelineDots.innerHTML = itinerary.map(day => 
      `<div class="mobile-timeline-dot ${day.day === 1 ? 'active' : ''}" data-day="${day.day}">
        <span class="mobile-dot-label">Day ${day.day}</span>
      </div>`
    ).join('');
    
    // Add click events to mobile timeline dots
    mobileTimelineDots.querySelectorAll('.mobile-timeline-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const dayNumber = parseInt(dot.dataset.day);
        showDay(dayNumber);
      });
    });
  }
  
  // Show first day content and update timeline progress
  showDay(1);
  updateTimelineProgress();
}

function showDay(dayNumber) {
  const dayData = itineraryData.find(day => day.day === dayNumber);
  if (!dayData) return;
  
  currentDay = dayNumber;
  
  // Update timeline dots (desktop)
  document.querySelectorAll('.timeline-dot').forEach(dot => {
    const dotDay = parseInt(dot.dataset.day);
    dot.classList.remove('active', 'completed');
    
    if (dotDay === dayNumber) {
      dot.classList.add('active');
    } else if (dotDay < dayNumber) {
      dot.classList.add('completed');
    }
  });
  
  // Update mobile timeline dots
  document.querySelectorAll('.mobile-timeline-dot').forEach(dot => {
    const dotDay = parseInt(dot.dataset.day);
    dot.classList.remove('active', 'completed');
    
    if (dotDay === dayNumber) {
      dot.classList.add('active');
    } else if (dotDay < dayNumber) {
      dot.classList.add('completed');
    }
  });
  
  // Update timeline progress
  updateTimelineProgress();
  
  // Generate content for both desktop and mobile
  const contentHTML = `
    <div class="itinerary-day-content animate-fade-in">
      <div class="flex items-start gap-4 mb-6">
        <div class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
          ${dayData.day}
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-slate-800 mb-2">${dayData.title}</h3>
          <div class="w-full h-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-4"></div>
        </div>
      </div>
      
      <div class="bg-slate-50 rounded-xl p-6">
        <p class="text-slate-700 leading-relaxed">${dayData.description}</p>
      </div>
      
      <div class="flex justify-between items-center mt-6">
        <button 
          onclick="previousDay()" 
          class="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors duration-300 ${dayNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
          ${dayNumber === 1 ? 'disabled' : ''}
        >
          <i class="fas fa-chevron-left"></i>
          Previous
        </button>
        
        <span class="text-sm text-slate-500 font-medium">
          ${dayNumber} of ${itineraryData.length} days
        </span>
        
        <button 
          onclick="nextDay()" 
          class="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors duration-300 ${dayNumber === itineraryData.length ? 'opacity-50 cursor-not-allowed' : ''}"
          ${dayNumber === itineraryData.length ? 'disabled' : ''}
        >
          Next
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;
  
  // Update both desktop and mobile content
  const desktopContent = document.getElementById('itineraryContent');
  const mobileContent = document.getElementById('itineraryContentMobile');
  
  if (desktopContent) {
    desktopContent.innerHTML = contentHTML;
  }
  if (mobileContent) {
    mobileContent.innerHTML = contentHTML;
  }
}

function nextDay() {
  if (currentDay < itineraryData.length) {
    showDay(currentDay + 1);
  }
}

function previousDay() {
  if (currentDay > 1) {
    showDay(currentDay - 1);
  }
}

function updateTimelineProgress() {
  const progressBar = document.getElementById('timelineProgress');
  if (progressBar && itineraryData.length > 0) {
    const progressPercentage = ((currentDay - 1) / (itineraryData.length - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
}
