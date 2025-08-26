import React from 'react';
import type { ParallaxSectionProps } from '../types';

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  backgroundImage, 
  className = '', 
  children 
}) => {
  return (
    <section
      className={`parallax min-h-screen flex items-center justify-center relative ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-blue-900/30 z-10"></div>
      
      {/* Pattern overlay for texture */}
      <div className="absolute inset-0 opacity-10 z-20" 
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
