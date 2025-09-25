import { useParallax } from '../hooks/useParallax';
import { useEnquiryModal } from '../contexts/EnquiryModalContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ParallaxSection from '../components/ParallaxSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BottomBar from '../components/BottomBar';

const HomePage = () => {
  // Initialize parallax effects
  useParallax();
  const { openModal } = useEnquiryModal();

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
        {/* <ParallaxSection backgroundImage="/kailash_stock.jpg"> */}
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

        {/* About Section */}
        <AboutSection />

        {/* Final Call to Action Parallax */}
        <ParallaxSection backgroundImage="https://images.unsplash.com/photo-1697106719728-14f5aad54a27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 floating">Ready for Your Adventure?</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-6 md:mb-8 max-w-3xl px-4">
            Let us craft your perfect mountain journey. From sacred peaks of Himalayas to ancient temples, your next great Indian adventure awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button 
              onClick={openModal}
              className="inline-block px-6 md:px-8 py-3 md:py-4 rounded-lg bg-white text-slate-900 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm md:text-base"
            >
              Start Your Journey
            </button>
            <a 
              href="tel:+919270248887" 
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
      
      {/* Bottom Bar - Only visible on mobile */}
      <BottomBar 
        phoneNumber="919270248887"
        whatsappNumber="919270248887"
      />
    </div>
  );
};

export default HomePage;
