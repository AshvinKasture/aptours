import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleMobileMenuClose = () => {
    setIsOpen(false);
  };

  // Custom scroll function with header offset for smooth scrolling
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Header height offset
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
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
            <div className="hidden sm:block">
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
                isActive('/') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="/#services"
              scroll={scrollWithOffset}
              className="nav-link text-sm text-slate-700 hover:text-sky-600 transition-colors"
            >
              Services
            </HashLink>
            <HashLink
              smooth
              to="/#tours"
              scroll={scrollWithOffset}
              className="nav-link text-sm text-slate-700 hover:text-sky-600 transition-colors"
            >
              Tours
            </HashLink>
            <HashLink
              smooth
              to="/#about"
              scroll={scrollWithOffset}
              className="nav-link text-sm text-slate-700 hover:text-sky-600 transition-colors"
            >
              About
            </HashLink>
            <HashLink
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              className="nav-link text-sm text-slate-700 hover:text-sky-600 transition-colors"
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
                isActive('/') ? 'text-sky-600 font-medium' : 'text-slate-700 hover:text-sky-600'
              }`}
            >
              Home
            </HashLink>
            <HashLink 
              smooth
              to="/#services"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className="block py-2 text-slate-700 hover:text-sky-600 transition-colors"
            >
              Services
            </HashLink>
            <HashLink 
              smooth
              to="/#tours"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className="block py-2 text-slate-700 hover:text-sky-600 transition-colors"
            >
              Tours
            </HashLink>
            <HashLink 
              smooth
              to="/#about"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className="block py-2 text-slate-700 hover:text-sky-600 transition-colors"
            >
              About
            </HashLink>
            <HashLink 
              smooth
              to="/#contact"
              scroll={scrollWithOffset}
              onClick={handleMobileMenuClose}
              className="block py-2 text-slate-700 hover:text-sky-600 transition-colors"
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
