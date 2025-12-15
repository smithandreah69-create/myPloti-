import React, { useEffect } from 'react';
import { Button } from './Button';
import { ConstructionCalculator } from './ConstructionCalculator';
import { CONSTRUCTION_PROJECTS } from '../constants';
import { useData } from '../contexts/DataContext';
import { Project, HouseType } from '../types';
import { FadeInSection } from './FadeInSection';
import { CheckCircle, ArrowRight, ShieldCheck, Banknote, HardHat, Phone, ArrowLeft } from 'lucide-react';
import { ViewState } from '../App';
import { PortfolioGrid } from './PortfolioGrid';

interface ConstructionPageProps {
    onNavigate?: (view: ViewState, params?: any) => void;
    onDownloadBrochure?: () => void;
    initialData?: any;
    onViewDetails?: (project: Project) => void;
}

export const ConstructionPage: React.FC<ConstructionPageProps> = ({ onNavigate, onDownloadBrochure, initialData, onViewDetails }) => {
  const { houseTypes } = useData();

  useEffect(() => {
    if (initialData?.scrollTo === 'calculator') {
        setTimeout(() => {
            const el = document.getElementById('cost-calculator');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Attempt to focus the first input inside
                const input = el.querySelector('input');
                if (input) input.focus();
            }
        }, 100);
    }
  }, [initialData]);

  const handleBookConsultation = () => {
    // Redirect to phone dialpad
    window.location.href = "tel:+254709202299";
  };

  const handleViewHouse = (house: HouseType) => {
    if (!onViewDetails) return;
    
    // Convert HouseType to Project structure for the details view
    let numericPrice = 0;
    const priceSanitized = house.startingPriceStr.replace(/[^0-9.]/g, '');
    
    if (house.startingPriceStr.includes('M') || house.startingPriceStr.includes('m')) {
        numericPrice = parseFloat(priceSanitized) * 1000000;
    } else {
        // Remove commas if any (though regex above keeps dots only if numeric, let's be safer)
        numericPrice = parseFloat(house.startingPriceStr.replace(/,/g, '').replace(/[^0-9.]/g, ''));
    }

    const project: Project = {
        id: `design-${house.id}`,
        title: house.title,
        location: 'Flexible Location', // Since it's a design
        price: numericPrice || 0,
        priceStr: house.startingPriceStr,
        imageUrl: house.imageUrl,
        images: [house.imageUrl, "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600596542815-600021529844?auto=format&fit=crop&w=800&q=80"],
        description: house.description,
        features: house.features,
        type: 'House',
        size: 'N/A',
        purpose: 'Settlement',
        amenities: ['Customizable Layout', 'NCA Approved Structural Plans', 'Standard or Premium Finishes'],
        status: 'Off-plan',
        bedrooms: parseInt(house.features.find(f => f.includes('Bedroom'))?.replace(/[^0-9]/g, '') || '0') || undefined
    };
    onViewDetails(project);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:min-h-[70vh] flex items-center bg-[#1a2e24] overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80" 
                alt="Construction Site Kenya" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e24] to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
            <button onClick={() => onNavigate?.('projects_hub')} className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-medium">
                <ArrowLeft size={18} className="mr-2" /> Back to Projects
            </button>
            <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b96807]/20 border border-[#b96807] text-[#b96807] font-bold text-sm uppercase tracking-wide mb-6">
                    <HardHat size={16} /> Licensed Contractors
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Build Your <span className="text-[#4ade80]">Dream Home</span> With Confidence.
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                    From architectural design to key handover, we deliver modern, high-quality construction services across Kenya. Transparent pricing, no hidden costs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" className="text-lg px-8" onClick={() => {
                        document.getElementById('cost-calculator')?.scrollIntoView({ behavior: 'smooth' });
                    }}>Estimate Cost</Button>
                    <Button variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-black" onClick={handleBookConsultation}>
                        Book Consultation
                    </Button>
                </div>
            </div>
        </div>
      </div>

      {/* House Types Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our <span className="text-[#007636]">House Designs</span></h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Choose from our portfolio of modern, efficient designs or let us create a custom masterpiece for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {houseTypes.map((house, idx) => (
                    <FadeInSection key={house.id} delay={`delay-${idx * 100}`}>
                        <div 
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
                            onClick={() => handleViewHouse(house)}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={house.imageUrl} 
                                    alt={house.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#007636] px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                                    Popular
                                </div>
                            </div>
                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{house.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{house.description}</p>
                                
                                <div className="space-y-1 mb-4 flex-grow">
                                    {house.features?.map((f, i) => (
                                        <div key={i} className="flex items-center text-xs text-gray-500 font-medium">
                                            <CheckCircle size={12} className="text-[#b96807] mr-2" /> {f}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-gray-100 mt-auto">
                                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-[#007636]">{house.startingPriceStr}</span>
                                        <button 
                                            className="text-[#b96807] hover:bg-[#b96807] hover:text-white p-2 rounded-full transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleViewHouse(house);
                                            }}
                                        >
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                ))}
            </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-white" id="cost-calculator">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Plan Your Budget <span className="text-[#007636]">Effectively</span>
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Knowing your construction costs upfront is crucial for a successful project. 
                        Use our calculator to get an estimated cost for your dream home based on size, type, and finish quality.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-[#007636] flex-shrink-0">
                                <Banknote size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Transparent Estimates</h4>
                                <p className="text-sm text-gray-500">Get a breakdown that reflects current market rates.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-[#b96807] flex-shrink-0">
                                <HardHat size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Flexible Options</h4>
                                <p className="text-sm text-gray-500">Adjust finishes to fit your specific budget needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full">
                    <ConstructionCalculator onNavigate={onNavigate} />
                </div>
            </div>
        </div>
      </section>

      {/* Why Build With Us */}
      <section className="py-20 bg-[#1a2e24] text-white">
        <div className="container mx-auto px-4">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Build With MyPloti?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    We bring professionalism and integrity to the Kenyan construction industry.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <ShieldCheck size={48} className="mx-auto mb-4 text-[#4ade80]" />
                    <h3 className="text-xl font-bold mb-3">NCA Registered</h3>
                    <p className="text-gray-400 text-sm">
                        Fully compliant with National Construction Authority regulations ensuring safety and quality.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <Banknote size={48} className="mx-auto mb-4 text-[#4ade80]" />
                    <h3 className="text-xl font-bold mb-3">Milestone Payments</h3>
                    <p className="text-gray-400 text-sm">
                        Pay in structured installments as the project progresses. No upfront risk.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <HardHat size={48} className="mx-auto mb-4 text-[#4ade80]" />
                    <h3 className="text-xl font-bold mb-3">Professional Management</h3>
                    <p className="text-gray-400 text-sm">
                        Dedicated project managers to ensure timelines are met and quality is maintained.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Completed Projects / Portfolio Grid */}
      <PortfolioGrid items={CONSTRUCTION_PROJECTS} title="Recent Construction Projects" />

      {/* Final CTA */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
              <div className="bg-[#007636] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  
                  <div className="relative z-10 max-w-2xl mx-auto">
                      <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to break ground?</h2>
                      <p className="text-lg text-green-100 mb-8">
                          Start your home building journey today with a team of trusted professionals. 
                          Schedule a free consultation to discuss your vision.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Button variant="white" className="text-lg shadow-lg" onClick={handleBookConsultation}>
                             <Phone size={18} /> Book Consultation
                          </Button>
                          <Button 
                            className="bg-[#b96807] hover:bg-[#965405] text-white border-none text-lg shadow-lg"
                            onClick={onDownloadBrochure}
                          >
                             Download Brochure
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};