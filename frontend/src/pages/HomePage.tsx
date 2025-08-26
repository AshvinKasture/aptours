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
          <div className="floating">
            <i className="fas fa-hiking text-5xl mb-6 text-white/80"></i>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Adventure Awaits</h2>
          <p className="text-xl sm:text-2xl font-light leading-relaxed max-w-3xl">
            Step into a world where every path leads to wonder. From Himalayan treks to sacred Indian temples.
          </p>
        </ParallaxSection>

        {/* Sacred Journeys Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1601821139990-9fc929db79ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 floating">Sacred Journeys</h2>
          <p className="text-xl sm:text-2xl font-light leading-relaxed">
            Experience the spiritual magnificence of Kailash Mansarovar, Char Dham, and the mystical landscapes of the Indian Himalayas
          </p>
          <div className="mt-8">
            <HashLink 
              to="/#tours"
              smooth
              className="inline-block px-8 py-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
            >
              Discover Sacred Tours
            </HashLink>
          </div>
        </ParallaxSection>

        {/* Tours Section */}
        <ToursSection />

        {/* Reach New Heights Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1635183625020-93dc1face215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <div className="floating">
            <i className="fas fa-mountain text-6xl mb-6 text-white/80"></i>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Reach New Heights</h2>
          <p className="text-xl sm:text-2xl font-light leading-relaxed max-w-3xl">
            Every summit tells a story. Every trail leads to discovery. Join us in exploring India's most magnificent mountain ranges and sacred sites.
          </p>
        </ParallaxSection>

        {/* About Section */}
        <AboutSection />

        {/* Spiritual Temples Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1612438214708-f428a707dd4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0">
          <div className="floating">
            <i className="fas fa-om text-5xl mb-6 text-white/80"></i>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Spiritual Temples</h2>
          <p className="text-xl sm:text-2xl font-light leading-relaxed max-w-3xl">
            Discover ancient temples nestled in the mountains. Experience the divine blend of spirituality and natural beauty.
          </p>
          <div className="mt-8">
            <HashLink 
              to="/#contact"
              smooth
              className="inline-block px-8 py-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
            >
              Plan Spiritual Journey
            </HashLink>
          </div>
        </ParallaxSection>

        {/* Final Call to Action Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1697106719728-14f5aad54a27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 floating">Ready for Your Adventure?</h2>
          <p className="text-xl sm:text-2xl font-light leading-relaxed mb-8 max-w-3xl">
            Let us craft your perfect mountain journey. From sacred peaks of Himalayas to ancient temples, your next great Indian adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HashLink 
              to="/#contact"
              smooth
              className="inline-block px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </HashLink>
            <a 
              href="tel:+919822020500" 
              className="inline-block px-8 py-4 rounded-lg border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
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
