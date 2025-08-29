import { useEffect } from 'react';

export const useParallax = () => {
  useEffect(() => {
    // This hook now mainly handles global parallax optimizations
    const isMobile = () => window.innerWidth <= 768;
    
    // Optimize scroll performance
    let ticking = false;
    
    const optimizeScrolling = () => {
      if (!isMobile()) {
        // For desktop, ensure smooth scrolling performance
        const parallaxSections = document.querySelectorAll('.parallax-section');
        parallaxSections.forEach((section) => {
          const element = section as HTMLElement;
          element.style.willChange = 'transform';
          element.style.backfaceVisibility = 'hidden';
        });
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(optimizeScrolling);
        ticking = true;
      }
    };

    // Initial optimization
    optimizeScrolling();
    
    // Handle window resize
    const handleResize = () => {
      requestTick();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
