import React from 'react';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, ArrowUp, Lock } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../App';

interface FooterProps {
    onNavigate?: (view: ViewState, params?: any) => void;
    onDownloadBrochure?: () => void;
    showCTA?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onDownloadBrochure, showCTA = true }) => {
  const handleNavClick = (view: ViewState, e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigate) {
          onNavigate(view);
      }
  };

  const handleBookVisit = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'Site Visit' });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Custom TikTok Icon
  const TiktokIcon = ({ size = 16 }: { size?: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  const socials = [
      { icon: Facebook, href: "https://www.facebook.com/people/MyPloti/61577272052699/" },
      { icon: Twitter, href: "https://x.com/MyPloti" },
      { icon: Instagram, href: "https://www.instagram.com/myploti/" },
      { icon: TiktokIcon, href: "https://www.tiktok.com/@my.ploti" }
  ];

  const legalLinks = [
      { name: 'Privacy Policy', type: 'privacy' },
      { name: 'Terms & Conditions', type: 'terms' },
      { name: 'Cookie Policy', type: 'cookie' },
      { name: 'Disclaimer', type: 'disclaimer' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        
        {/* Pre-footer CTA */}
        {showCTA && (
            <div className="bg-[#007636] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden -mt-32 shadow-2xl mb-16">
                <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to own your plot?</h3>
                    <p className="text-green-100">Schedule a free site visit this Saturday. Transport is on us.</p>
                </div>
                <div className="flex gap-4 relative z-10">
                    <Button variant="white" onClick={handleBookVisit}>
                        Book Site Visit
                    </Button>
                    <Button 
                        className="border border-white text-white hover:bg-white hover:text-[#007636] bg-transparent"
                        onClick={onDownloadBrochure}
                    >
                        Download Brochure
                    </Button>
                </div>
                {/* Decor */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-[#007636] rounded flex items-center justify-center font-bold">M</div>
               <span className="text-xl font-bold">MyPloti</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Leading the way in affordable land solutions and modern construction in Kenya. We build dreams into homes.
            </p>
            <div className="flex gap-4">
               {socials.map((social, i) => (
                   <a 
                    key={i} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#b96807] transition-colors"
                   >
                       <social.icon size={16} />
                   </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" onClick={(e) => handleNavClick('properties', e)} className="hover:text-[#b96807] transition-colors">Featured Plots</a></li>
                <li><a href="#" onClick={(e) => handleNavClick('projects_hub', e)} className="hover:text-[#b96807] transition-colors">Our Projects</a></li>
                <li><a href="#" onClick={(e) => handleNavClick('about', e)} className="hover:text-[#b96807] transition-colors">About Us</a></li>
                <li><a href="#" onClick={(e) => handleNavClick('process', e)} className="hover:text-[#b96807] transition-colors">How It Works</a></li>
                <li><a href="#" onClick={(e) => handleNavClick('contact', e)} className="hover:text-[#b96807] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
                {legalLinks.map((link) => (
                    <li key={link.type}>
                        <a 
                            href={`?view=legal&type=${link.type}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#b96807] transition-colors"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#007636] mt-1" />
                    <span>View Park Towers, 14th Floor,<br/>Uhuru Highway, Nairobi</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone size={18} className="text-[#007636]" />
                    <span>(+254) 709 202 299</span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail size={18} className="text-[#007636]" />
                    <span>info@myploti.co.ke</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 relative">
            <div className="flex items-center gap-2">
                &copy; {new Date().getFullYear()} MyPloti Limited. All Rights Reserved.
            </div>

            {/* Admin Login Link - Now Visible */}
            <div className="mt-4 md:mt-0">
                <button 
                    onClick={() => onNavigate?.('admin')} 
                    className="flex items-center gap-2 text-gray-500 hover:text-[#007636] transition-colors font-semibold"
                >
                    <Lock size={14} /> Admin Login
                </button>
            </div>
            
            {/* Scroll To Top Button */}
            <button 
                onClick={scrollToTop}
                className="mt-4 md:mt-0 bg-[#007636] hover:bg-[#005c2b] text-white p-3 rounded-full transition-colors shadow-lg flex items-center justify-center group"
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </footer>
  );
};