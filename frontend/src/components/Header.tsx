import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

/*
 * NOTE: react-router-hash-link does not reliably work with HashRouter
 * 
 * Known issues when using HashRouter + react-router-hash-link:
 * - Navigation links may not scroll to sections properly
 * - Active link highlighting may not work as expected 
 * - Hash fragment routing conflicts can occur
 * 
 * If you experience issues with navigation, scrolling, or active link highlighting,
 * this HashRouter + react-router-hash-link combination is likely the root cause.
 * 
 * Current workaround: Custom intersection observer for active state detection
 * Alternative solutions: Switch to BrowserRouter or implement custom hash scrolling
 */

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const handleMobileMenuClose = () => {
    setIsOpen(false);
  };

  // Custom scroll function with header offset for smooth scrolling
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Header height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  // Intersection Observer for active section detection
  useEffect(() => {
    const sections = ['home', 'services', 'tours', 'about', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0.1
      }
    );

    sectionElements.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [location.pathname]);

  const isNavActive = (section: string) => {
    if (location.pathname === '/') {
      return activeSection === section;
    } else if (location.pathname === '/tours' && section === 'tours') {
      return true;
    } else if (location.pathname.startsWith('/tours/') && section === 'tours') {
      return true;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            {/* Company logo */}
            <img 
              src="/aptours/assets/logo.png" 
              alt="AP Tours & Travels Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="text-lg font-semibold text-slate-800">AP Tours & Travels</div>
              <div className="text-xs text-slate-500">
                Explore. Experience. Enjoy.
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <HashLink
              smooth
              to="/#home"
              scroll={scrollWithOffset}
              className={`nav-link text-sm transition-colors ${
                isNavActive('home') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="/#services"
              scroll={scrollWithOffset}
              className={`nav-link text-sm transition-colors ${
                isNavActive('services') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Services
            </HashLink>
            <HashLink
              smooth
              to="/#tours"
              scroll={scrollWithOffset}
              className={`nav-link text-sm transition-colors ${
                isNavActive('tours') && location.pathname === '/' ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Tours
            </HashLink>
            <Link
              to="/tours"
              className={`nav-link text-sm transition-colors ${
                isNavActive('tours') && location.pathname !== '/' ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              All Tours
            </Link>
            <HashLink
              smooth
              to="/#about"
              scroll={scrollWithOffset}
              className={`nav-link text-sm transition-colors ${
                isNavActive('about') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              About
            </HashLink>
            <HashLink
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              className={`nav-link text-sm transition-colors ${
                isNavActive('contact') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Contact
            </HashLink>
          </nav>

          <div className="flex items-center gap-3">
            <HashLink
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              className="hidden md:inline-block px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              Enquire
            </HashLink>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-slate-700 focus:outline-none focus:ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 pb-6 flex flex-col gap-2">
            <HashLink 
              smooth
              to="/#home"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors ${
                isNavActive('home') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Home
            </HashLink>
            <HashLink 
              smooth
              to="/#services"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors ${
                isNavActive('services') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Services
            </HashLink>
            <HashLink 
              smooth
              to="/#tours"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors ${
                isNavActive('tours') && location.pathname === '/' ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Tours
            </HashLink>
            <Link
              to="/tours"
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors ${
                isNavActive('tours') && location.pathname !== '/' ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              All Tours
            </Link>
            <HashLink 
              smooth
              to="/#about"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors ${
                isNavActive('about') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              About
            </HashLink>
            <HashLink 
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className={`block py-2 transition-colors ${
                isNavActive('contact') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Contact
            </HashLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
