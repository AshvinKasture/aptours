import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="py-8 px-4 bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="AP Tours & Travels Logo" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-white">AP Tours & Travels</div>
              <div className="text-xs text-slate-400">Where every journey becomes a story</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Small groups • Expert guides • Responsible tourism
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="font-semibold text-white mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm text-slate-400">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <Link to="/tours" className="hover:text-sky-400 transition-colors">All Tours</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-6 border-t border-slate-700 pt-6 text-sm text-slate-500 text-center">
        &copy; {currentYear} AP Tours & Travels — Built with ❤️ by AshTech
      </div>
    </footer>
  );
};

export default Footer;
