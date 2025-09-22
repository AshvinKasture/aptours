import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Subscribed! (This is a demo)');
      setEmail('');
    }
  };

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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
              <a href="./treks/index.html" className="hover:text-sky-400 transition-colors">All Treks</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <div className="font-semibold text-white mb-3">Subscribe</div>
          <p className="text-sm text-slate-400 mb-4">
            Get occasional trip ideas and offers — no spam.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-sm rounded-md bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              required
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-md bg-sky-600 text-white text-sm hover:bg-sky-700 transition-colors"
            >
              Join
            </button>
          </form>
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
