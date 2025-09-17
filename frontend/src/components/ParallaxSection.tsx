import React, { useRef, useEffect } from 'react';
import type { ParallaxSectionProps } from '../types';

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  backgroundImage, 
  mobileBackgroundImage,
  className = '', 
  children 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [currentImage, setCurrentImage] = React.useState(backgroundImage);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Use mobile image if provided, otherwise fallback to desktop image
      setCurrentImage(mobile && mobileBackgroundImage ? mobileBackgroundImage : backgroundImage);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      // Mobile: Enhanced animations and interactions
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Trigger mobile-specific CSS animations
              section.classList.add('mobile-parallax-active');
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(section);
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
    // Desktop uses pure CSS parallax (background-attachment: fixed)
  }, [backgroundImage, mobileBackgroundImage, isMobile]);

  return (
    <section
      ref={sectionRef}
      className={`parallax-section min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url('${currentImage}')`,
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-blue-900/40 z-10"></div>
      
      {/* Mobile-specific animated overlay */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30 z-15"></div>
        <div className="absolute inset-0 opacity-20 z-20 animate-pulse" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                                radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.3) 0%, transparent 50%)`
             }}>
        </div>
      </div>
      
      {/* Desktop pattern overlay */}
      <div className="absolute inset-0 hidden md:block opacity-10 z-20" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
      </div>
      
      {/* Content */}
      <div className="relative z-30 text-center text-white px-4 max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
