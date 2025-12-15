import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../App';
import { useData } from '../contexts/DataContext';

interface HeroProps {
  onNavigate: (view: ViewState, params?: any) => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80", // Original Modern Home
  "https://images.unsplash.com/photo-1600596542815-600021529844?auto=format&fit=crop&w=1920&q=80", // Modern Flat Roof
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80", // Luxury Villa
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80"  // Coastal/Pool House
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { siteConfig } = useData();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBookVisit = () => {
    onNavigate('contact', { scrollTo: 'booking-form', purpose: 'Site Visit' });
  };

  const handleExplore = () => {
    onNavigate('properties');
  };

  return (
    <div className="relative pt-24 pb-12 md:pt-32 md:pb-32 lg:min-h-[85vh] flex items-center bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Background Image Slider with Overlay */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
            <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
                <img 
                  src={img} 
                  alt={`Completed Project ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/40"></div>
            </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <div className="max-w-5xl">
          <div className="inline-block px-4 py-1 mb-6 rounded-full bg-[#b96807]/20 border border-[#b96807] backdrop-blur-sm">
             <span className="text-[#b96807] font-bold text-sm tracking-wide uppercase">Trusted by 1000+ Kenyans</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
            {siteConfig?.heroTitle || "Building Dreams Into Homes."}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md">
            {siteConfig?.heroSubtitle || "Secure affordable land, access modern home designs, and get tailored construction solutions anywhere in Kenya."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="primary" className="text-lg px-10 py-4 shadow-xl hover:scale-105 transition-transform" onClick={handleBookVisit}>
              Book a Site Visit
            </Button>
            <Button variant="secondary" className="text-lg px-10 py-4 shadow-xl hover:scale-105 transition-transform" onClick={handleExplore}>
              <Search size={20} /> Explore
            </Button>
          </div>
        </div>
      </div>

      {/* Abstract decorative shape */}
      <div className="absolute bottom-0 right-0 hidden lg:block w-1/3 h-full pointer-events-none">
         <div className="bg-[#007636] opacity-10 w-full h-full transform skew-x-12 translate-x-20"></div>
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {HERO_IMAGES.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-[#4ade80] w-6' : 'bg-white/50 hover:bg-white'}`}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
      </div>
    </div>
  );
};