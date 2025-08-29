import React from 'react';
import type { Service } from '../types';

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      icon: '🎯',
      title: 'Custom Itineraries',
      description: 'Personalized travel plans designed around your interests, budget, and timeline. Every journey is unique.',
      delay: '0s'
    },
    {
      icon: '🏔️',
      title: 'Expert Guides',
      description: 'Local mountain guides with years of experience and deep knowledge of the terrain and culture.',
      delay: '2s'
    },
    {
      icon: '🛡️',
      title: 'Safety First',
      description: 'Comprehensive safety protocols, emergency preparedness, and support throughout your adventure.',
      delay: '4s'
    }
  ];

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Why Choose AP Tours?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We create extraordinary travel experiences with attention to every detail
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl glass shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div 
                className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 floating text-2xl"
                style={{ animationDelay: service.delay }}
              >
                {service.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
