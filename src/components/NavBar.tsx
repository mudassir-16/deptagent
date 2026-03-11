import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/faculty', label: 'Faculty' },
    { path: '/mous', label: 'MOUs' },
    { path: '/research', label: 'Research' },
    { path: '/iii', label: 'III (Industry Institute Interaction)' },
    { path: '/clubs', label: 'Clubs' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/placements', label: 'Placements' },
    { path: '/events', label: 'Events' },
    { path: '/newsletters', label: 'Newsletters' },
    { path: '/contact', label: 'Contact' },
    { path: 'https://vits-it-alumni-portal.vercel.app', label: 'Alumni↗', external: true }
  ];

  return (
    <nav className="bg-gradient-to-r from-department-purple to-department-blue text-white py-3 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center">
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white focus:outline-none p-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu size={28} />
            </button>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a 
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-2 py-1 text-md font-medium text-white/80 hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`relative px-2 py-1 text-md font-medium ${isActive(link.path) ? 'text-white' : 'text-white/80 hover:text-white'}`}
                >
                  {link.label}
                  <span 
                    className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'}`}
                  />
                </Link>
              )
            ))}
          </div>
          {/* Mobile Nav Overlay using Portal */}
          {isMenuOpen && typeof window !== 'undefined' && createPortal(
            <>
              <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
              <div className="md:hidden fixed top-0 left-0 w-full h-full z-50 bg-department-purple p-6 pt-20 flex flex-col gap-4 shadow-2xl overflow-y-auto" style={{maxHeight:'100vh'}}>
                <button
                  className="absolute top-4 right-4 text-white bg-department-blue rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white z-50"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {navLinks.map((link) => (
                  link.external ? (
                    <a 
                      key={link.path}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-lg font-semibold py-3 px-4 rounded transition-colors duration-200 text-white/90 hover:bg-department-blue/80 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className={`block w-full text-lg font-semibold py-3 px-4 rounded transition-colors duration-200 ${isActive(link.path) ? 'bg-department-blue text-white' : 'text-white/90 hover:bg-department-blue/80 hover:text-white'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </>,
            document.body
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
