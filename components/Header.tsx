import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../App';
import { useData } from '../contexts/DataContext';

interface HeaderProps {
  onNavigate?: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { theme, toggleTheme } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewState, e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigate) {
          onNavigate(view);
          setIsMobileMenuOpen(false);
      }
  };

  const navLinks = [
    { name: 'Home', view: 'home' as const },
    { name: 'Properties', view: 'properties' as const },
    { name: 'Projects', view: 'projects_hub' as const },
  ];

  const secondaryLinks = [
      { name: 'Process', view: 'process' as const },
      { name: 'About', view: 'about' as const },
      { name: 'Contact', view: 'contact' as const },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-white dark:bg-gray-900 shadow-lg py-2' 
          : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center relative z-50">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={(e) => handleNavClick('home', e)}
        >
          {/* Custom SVG Icon to match MyPloti Brand */}
          <div className="w-10 h-10 relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
             <svg viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                <defs>
                    <linearGradient id="logoGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="45%" stopColor="#f59e0b" /> {/* Bright Orange Top */}
                        <stop offset="45%" stopColor="#007636" /> {/* Green Bottom */}
                    </linearGradient>
                </defs>
                <path d="M50 5C27.9 5 10 22.9 10 45C10 75 50 115 50 115C50 115 90 75 90 45C90 22.9 72.1 5 50 5ZM50 65C39 65 30 56 30 45C30 34 39 25 50 25C61 25 70 34 70 45C70 56 61 65 50 65Z" fill="url(#logoGradient)"/>
                <circle cx="50" cy="45" r="16" fill="white"/>
            </svg>
          </div>
          
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#007636] leading-none tracking-tight">
                MyPloti
            </span>
            <span className="text-[0.65rem] font-bold text-[#b96807] uppercase tracking-widest leading-tight mt-1">
                Interiors & Construction
            </span>
          </div>
        </div>

        {/* Desktop Nav - Visible on Large Screens only */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href="#"
              onClick={(e) => handleNavClick(link.view, e)}
              className="text-gray-600 dark:text-gray-300 hover:text-[#007636] dark:hover:text-[#007636] font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          {secondaryLinks.map((link) => (
            link.view ? (
                <a 
                  key={link.name} 
                  href="#"
                  onClick={(e) => handleNavClick(link.view!, e)}
                  className="text-gray-600 dark:text-gray-300 hover:text-[#007636] dark:hover:text-[#007636] font-medium transition-colors"
                >
                  {link.name}
                </a>
            ) : (
                <a 
                  key={link.name} 
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#007636] dark:hover:text-[#007636] font-medium transition-colors"
                >
                  {link.name}
                </a>
            )
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle - Visible on Large Screens only */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="flex items-center gap-2 text-[#007636] font-medium">
             <Phone size={18} />
             <span>(+254) 709 202 299</span>
          </div>
          <Button 
            variant="primary" 
            className="py-2 px-4 text-sm"
            onClick={(e) => handleNavClick('contact', e)}
          >
            Book Site Visit
          </Button>
        </div>

        {/* Mobile/Tablet Toggle - Visible on md and smaller */}
        <div className="flex items-center gap-2 lg:hidden">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="text-gray-700 dark:text-gray-200 hover:text-[#007636] transition-colors p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div 
        className={`lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-all duration-300 ease-in-out transform ${
            isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
          <div className="flex flex-col items-center justify-start pt-32 pb-10 px-6 gap-4 h-full overflow-y-auto">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href="#"
                className="w-full text-center text-xl font-medium text-gray-800 dark:text-gray-200 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={(e) => handleNavClick(link.view, e)}
              >
                {link.name}
              </a>
            ))}
             {secondaryLinks.map((link) => (
               link.view ? (
                <a 
                    key={link.name} 
                    href="#"
                    className="w-full text-center text-xl font-medium text-gray-800 dark:text-gray-200 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    onClick={(e) => handleNavClick(link.view!, e)}
                >
                    {link.name}
                </a>
               ) : (
                <a 
                    key={link.name} 
                    href="#"
                    className="w-full text-center text-xl font-medium text-gray-800 dark:text-gray-200 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {link.name}
                </a>
               )
            ))}
          </div>
      </div>
    </header>
  );
};