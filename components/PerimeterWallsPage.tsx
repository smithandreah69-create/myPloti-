import React from 'react';
import { ViewState } from '../App';
import { ArrowLeft, ShieldCheck, Lock, Zap, BrickWall } from 'lucide-react';
import { Button } from './Button';
import { PortfolioGrid } from './PortfolioGrid';
import { WALL_PROJECTS } from '../constants';

interface PerimeterWallsPageProps {
    onNavigate: (view: ViewState, params?: any) => void;
}

export const PerimeterWallsPage: React.FC<PerimeterWallsPageProps> = ({ onNavigate }) => {
    const handleConsult = () => {
        onNavigate('contact', { purpose: 'Perimeter Wall Quote' });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-32 pb-20 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1623190695034-75466c429672?auto=format&fit=crop&w=1920&q=80" 
                        alt="Perimeter Wall" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <button onClick={() => onNavigate('projects_hub')} className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Back to Projects
                    </button>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Secure <span className="text-[#4ade80]">Perimeter Walls</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Protect your investment with durable stone walls and advanced security integration.
                    </p>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety Starts at the Boundary</h2>
                        <p className="text-gray-600 text-lg">
                            A perimeter wall is the first line of defense for your home. We construct high-quality, reinforced stone walls that define your property and provide peace of mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#007636] transition-colors group">
                            <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-[#b96807] mb-6 group-hover:bg-[#007636] group-hover:text-white transition-colors">
                                <BrickWall size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Stone Masonry Walls</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Machine-cut stone walls with reinforced concrete columns, keyed finishes, and coping. Built to last for generations.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b96807] rounded-full mr-2"></span> Standard 9ft height</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b96807] rounded-full mr-2"></span> Dressed or Keyed finish</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#007636] transition-colors group">
                            <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-[#b96807] mb-6 group-hover:bg-[#007636] group-hover:text-white transition-colors">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Electric Fencing</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Top-wall electric fencing solutions with alarm systems and razor wire options for maximum deterrence.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b96807] rounded-full mr-2"></span> 8-strand / 10-strand</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b96807] rounded-full mr-2"></span> Siren & Strobe light</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-[#007636] transition-colors group">
                            <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-[#b96807] mb-6 group-hover:bg-[#007636] group-hover:text-white transition-colors">
                                <Lock size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Gate Systems</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Custom steel gates (sliding or swing) with options for automation and video intercom integration.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b96807] rounded-full mr-2"></span> Heavy gauge steel</li>
                                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-[#b96807] rounded-full mr-2"></span> Remote controlled</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                         <div className="bg-[#007636] text-white p-8 rounded-2xl max-w-3xl mx-auto shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Get a Quote for Your Boundary Wall</h3>
                            <p className="text-green-100 mb-6">
                                We offer competitive per-foot rates for standard 50x100 and 100x100 plots.
                            </p>
                            <Button variant="white" onClick={handleConsult}>Request Quote</Button>
                         </div>
                    </div>
                </div>
            </section>

             {/* Portfolio Grid */}
             <PortfolioGrid items={WALL_PROJECTS} title="Our Completed Wall Projects" />
        </div>
    );
};