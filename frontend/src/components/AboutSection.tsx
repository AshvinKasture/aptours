import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            About AP Tours & Travels
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your trusted partner for extraordinary mountain adventures and cultural discoveries
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p className="text-slate-700 leading-relaxed mb-6">
                  Based in Pune, Maharashtra, we specialize in crafting authentic mountain adventures and cultural journeys across India and the Himalayas. From sacred pilgrimages to challenging treks, we bring together local expertise and international standards to create unforgettable experiences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop" alt="Mountain guides" className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl p-2">
                <img 
                  src="/logo_transparent.png" 
                  alt="AP Tours & Travels Logo" 
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
