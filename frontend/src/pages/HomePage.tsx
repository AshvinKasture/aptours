import { useParallax } from '../hooks/useParallax';
import { HashLink } from 'react-router-hash-link';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ParallaxSection from '../components/ParallaxSection';
import ToursSection from '../components/ToursSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const HomePage = () => {
  // Initialize parallax effects
  useParallax();

  return (
    <div className="antialiased text-slate-50">
      <Header />
      
      <main id="app" className="max-w-full mx-auto">
        {/* HOME Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Adventure Awaits Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1640179563805-184d0da2ba6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <div className="floating mb-6">
            <i className="fas fa-hiking text-4xl md:text-5xl text-white/90"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Adventure Awaits</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl px-4">
            Step into a world where every path leads to wonder. From Himalayan treks to sacred Indian temples.
          </p>
          <div className="mt-6 md:mt-8">
            <div className="w-16 h-1 bg-white/50 mx-auto rounded-full"></div>
          </div>
        </ParallaxSection>

        {/* Sacred Journeys Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1601821139990-9fc929db79ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 floating">Sacred Journeys</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-4xl px-4">
            Experience the spiritual magnificence of Kailash Mansarovar, Char Dham, and the mystical landscapes of the Indian Himalayas
          </p>
          <div className="mt-6 md:mt-8">
            <HashLink 
              to="/#tours"
              smooth
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 text-sm md:text-base"
            >
              Discover Sacred Tours
            </HashLink>
          </div>
        </ParallaxSection>

        {/* Tours Section */}
        <ToursSection />

        {/* Reach New Heights Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1635183625020-93dc1face215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <div className="floating mb-6">
            <i className="fas fa-mountain text-5xl md:text-6xl text-white/90"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Reach New Heights</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl px-4">
            Every summit tells a story. Every trail leads to discovery. Join us in exploring India's most magnificent mountain ranges and sacred sites.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col items-center">
            <div className="w-16 h-1 bg-white/50 mx-auto rounded-full mb-4"></div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
        </ParallaxSection>

        {/* About Section */}
        <AboutSection />

        {/* Spiritual Temples Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1612438214708-f428a707dd4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0">
          <div className="floating mb-6">
            <i className="fas fa-om text-4xl md:text-5xl text-white/90"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Spiritual Temples</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl px-4">
            Discover ancient temples nestled in the mountains. Experience the divine blend of spirituality and natural beauty.
          </p>
          <div className="mt-6 md:mt-8">
            <HashLink 
              to="/#contact"
              smooth
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 text-sm md:text-base"
            >
              Plan Spiritual Journey
            </HashLink>
          </div>
        </ParallaxSection>

        {/* Final Call to Action Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1697106719728-14f5aad54a27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 floating">Ready for Your Adventure?</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-6 md:mb-8 max-w-3xl px-4">
            Let us craft your perfect mountain journey. From sacred peaks of Himalayas to ancient temples, your next great Indian adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <HashLink 
              to="/#contact"
              smooth
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              Start Your Journey
            </HashLink>
            <a 
              href="tel:+919822020500" 
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm md:text-base"
            >
              Call Now
            </a>
          </div>
        </ParallaxSection>

        {/* Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
