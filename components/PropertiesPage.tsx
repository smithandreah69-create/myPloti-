import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { Project } from '../types';
import { PropertyCard } from './PropertyCard';
import { PropertyFilter } from './PropertyFilter';
import { FadeInSection } from './FadeInSection';
import { Button } from './Button';
import { ViewState } from '../App';

interface PropertiesPageProps {
  onViewDetails: (project: Project) => void;
  onNavigate: (view: ViewState, params?: any) => void;
  onDownloadBrochure: () => void;
  initialFilters?: any;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ onViewDetails, onNavigate, onDownloadBrochure, initialFilters }) => {
  const { projects } = useData();
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceRange: '',
    purpose: ''
  });

  useEffect(() => {
    if (initialFilters) {
        setFilters(prev => ({
            ...prev,
            ...initialFilters
        }));
    }
  }, [initialFilters]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (filters.location && !p.location.includes(filters.location)) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      
      if (filters.priceRange) {
        if (filters.priceRange === 'low' && p.price >= 500000) return false;
        if (filters.priceRange === 'mid' && (p.price < 500000 || p.price > 1500000)) return false;
        if (filters.priceRange === 'high' && p.price <= 1500000) return false;
      }
      return true;
    });
  }, [filters, projects]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Properties Hero */}
      <div className="bg-[#1a2e24] pt-32 pb-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect <span className="text-[#4ade80]">Plot or Home</span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Browse our wide selection of residential and commercial plots across Kenya. Secure your future today.
          </p>
          <div className="flex justify-center gap-4">
             <Button variant="primary" onClick={() => onNavigate('contact', { scrollTo: 'booking-form', purpose: 'Site Visit' })}>Book a Site Visit</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <PropertyFilter filters={filters} onFilterChange={setFilters} />
        
        <div className="mb-8 text-gray-600 dark:text-gray-300">
            Showing {filteredProjects.length} properties
        </div>

        {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                {filteredProjects.map((project, index) => (
                    <FadeInSection key={project.id} delay={`delay-${(index % 3) * 100}`}>
                        <PropertyCard project={project} onViewDetails={onViewDetails} />
                    </FadeInSection>
                ))}
            </div>
        ) : (
            <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No properties found matching your filters.</p>
                <Button variant="outline" onClick={() => setFilters({location: '', type: '', priceRange: '', purpose: ''})}>
                    Clear Filters
                </Button>
            </div>
        )}

        {/* Trust Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-gray-200 dark:border-gray-700 mt-8">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
                <div className="w-12 h-12 bg-[#007636]/10 dark:bg-[#007636]/20 rounded-full flex items-center justify-center text-[#007636] dark:text-[#4ade80] font-bold">1</div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Verified Title Deeds</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">All due diligence done for you.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
                <div className="w-12 h-12 bg-[#007636]/10 dark:bg-[#007636]/20 rounded-full flex items-center justify-center text-[#007636] dark:text-[#4ade80] font-bold">2</div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Transparent Pricing</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">No hidden charges or fees.</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-transparent dark:border-gray-700">
                <div className="w-12 h-12 bg-[#007636]/10 dark:bg-[#007636]/20 rounded-full flex items-center justify-center text-[#007636] dark:text-[#4ade80] font-bold">3</div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">NCA Registered</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Compliant with all regulations.</p>
                </div>
            </div>
        </div>

        {/* Final CTA */}
        <div className="bg-[#007636] text-white rounded-2xl p-12 text-center mb-16 relative overflow-hidden">
             <div className="relative z-10">
                 <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
                 <p className="mb-8 max-w-xl mx-auto text-green-100">
                     Our team can help you source specific land requirements. Talk to us today.
                 </p>
                 <div className="flex justify-center gap-4">
                     <Button variant="white" onClick={() => onNavigate('contact', { scrollTo: 'booking-form', purpose: 'General Inquiry' })}>Book Consultation</Button>
                     <Button variant="secondary" onClick={onDownloadBrochure}>Download Brochure</Button>
                 </div>
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>
      </div>
    </div>
  );
};