import React from 'react';
import { useMobileMenu } from '../hooks/useMobileMenu';

const Header: React.FC = () => {
  const { isOpen, toggle } = useMobileMenu();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#treks', label: 'Tours' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleNavClick = (href: string) => {
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => handleNavClick('#home')} 
            className="flex items-center gap-3"
          >
            <img 
              src="/logo.png" 
              alt="AP Tours & Travels Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <div className="text-lg font-semibold text-slate-800">AP Tours & Travels</div>
              <div className="text-xs text-slate-500">Explore. Experience. Enjoy.</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                className="nav-link text-sm text-slate-700 hover:text-sky-600 transition-colors"
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-block px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              Enquire
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggle}
              className="md:hidden p-2 rounded-md text-slate-700 focus:outline-none focus:ring"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pb-6 flex flex-col gap-2 bg-white/95 backdrop-blur">
          {navLinks.map((link) => (
            <button
              key={link.href}
              className="block py-2 text-slate-700 hover:text-sky-600 transition-colors text-left"
              onClick={() => {
                handleNavClick(link.href);
                toggle();
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
