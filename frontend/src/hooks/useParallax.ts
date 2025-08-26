import { useEffect } from 'react';

export const useParallax = () => {
  useEffect(() => {
    const initMobileParallax = () => {
      const isMobile = window.innerWidth <= 768;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      if (isMobile) {
        setupMobileParallax(parallaxElements);
      } else {
        setupDesktopParallax(parallaxElements);
      }
    };

    const setupMobileParallax = (parallaxElements: NodeListOf<Element>) => {
      parallaxElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.backgroundAttachment = 'scroll';
        htmlElement.style.backgroundPosition = 'center center';
        htmlElement.style.backgroundSize = 'cover';
        htmlElement.style.backgroundRepeat = 'no-repeat';
        htmlElement.style.transform = 'none';
        htmlElement.style.willChange = 'auto';
      });
      
      let ticking = false;
      
      const updateMobileParallax = () => {
        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight + 200 && (elementTop + elementHeight) > -200) {
            const rawProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
            const scrollProgress = Math.max(0, Math.min(1, rawProgress));
            
            const parallaxOffset = (scrollProgress - 0.5) * 30;
            
            let zoomFactor;
            if (scrollProgress < 0.5) {
              zoomFactor = 105 - (scrollProgress * 10);
            } else {
              zoomFactor = 100 - ((scrollProgress - 0.5) * 10);
            }
            
            const clampedZoom = Math.max(95, Math.min(105, zoomFactor));
            
            (element as HTMLElement).style.transform = 
              `translateY(${parallaxOffset}px) scale(${clampedZoom / 100})`;
          }
        });
        
        ticking = false;
      };
      
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateMobileParallax);
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', requestTick, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestTick);
      };
    };

    const setupDesktopParallax = (parallaxElements: NodeListOf<Element>) => {
      parallaxElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.backgroundAttachment = 'fixed';
        htmlElement.style.transform = 'none';
        htmlElement.style.willChange = 'auto';
      });
    };

    initMobileParallax();
    
    const handleResize = () => {
      initMobileParallax();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};
