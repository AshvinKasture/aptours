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
