import React from 'react';
import { ViewState } from '../App';
import { ArrowLeft, Flower, Sun, Umbrella } from 'lucide-react';
import { Button } from './Button';
import { PortfolioGrid } from './PortfolioGrid';
import { LANDSCAPING_PROJECTS } from '../constants';

interface LandscapingPageProps {
    onNavigate: (view: ViewState, params?: any) => void;
}

export const LandscapingPage: React.FC<LandscapingPageProps> = ({ onNavigate }) => {
    const handleConsult = () => {
        onNavigate('contact', { purpose: 'Landscaping Inquiry' });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-32 pb-20 bg-[#1a2e24] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-50">
                    <img 
                        src="https://images.unsplash.com/photo-1558905540-2129015929b1?auto=format&fit=crop&w=1920&q=80" 
                        alt="Landscaping" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <button onClick={() => onNavigate('projects_hub')} className="flex items-center text-gray-200 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Back to Projects
                    </button>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert <span className="text-[#4ade80]">Landscaping</span></h1>
                    <p className="text-xl text-gray-200 max-w-2xl">
                        Transform your outdoor space into a personal sanctuary. From lush gardens to durable paving.
                    </p>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                             <div className="absolute top-0 -left-4 w-24 h-24 bg-green-100 rounded-full z-0"></div>
                             <div className="absolute bottom-0 -right-4 w-32 h-32 bg-orange-100 rounded-full z-0"></div>
                             <img src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=800&q=80" alt="Paved Driveway" className="relative z-10 rounded-2xl shadow-2xl w-full" />
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete Outdoor Solutions</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                A beautiful home deserves a beautiful setting. Our landscaping division specializes in creating functional and aesthetic outdoor environments.
                                We handle everything from soil preparation to the final installation of features.
                            </p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-[#007636] flex items-center justify-center flex-shrink-0">
                                        <Flower size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Garden Design & Planting</h4>
                                        <p className="text-sm text-gray-600">Selection of indigenous and exotic plants suitable for your soil.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 text-[#b96807] flex items-center justify-center flex-shrink-0">
                                        <Sun size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Cabro Paving & Walkways</h4>
                                        <p className="text-sm text-gray-600">Durable, heavy-duty paving for driveways and parking areas.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Umbrella size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Gazebos & Pergolas</h4>
                                        <p className="text-sm text-gray-600">Custom timber or steel structures for outdoor relaxation.</p>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handleConsult}>Get a Free Site Assessment</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <PortfolioGrid items={LANDSCAPING_PROJECTS} title="Our Landscaping Work" />
        </div>
    );
};