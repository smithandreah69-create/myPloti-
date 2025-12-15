import React from 'react';
import { ViewState } from '../App';
import { ArrowLeft, CheckCircle, PaintBucket, Sofa, Lamp } from 'lucide-react';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { PortfolioGrid } from './PortfolioGrid';
import { INTERIOR_PROJECTS } from '../constants';

interface InteriorsPageProps {
    onNavigate: (view: ViewState, params?: any) => void;
}

export const InteriorsPage: React.FC<InteriorsPageProps> = ({ onNavigate }) => {
    const handleConsult = () => {
        onNavigate('contact', { purpose: 'Interior Design Inquiry' });
    };

    const features = [
        { title: 'Gypsum Ceilings', desc: 'Modern bulkhead and recessed lighting designs.' },
        { title: 'Custom Cabinetry', desc: 'Kitchens, wardrobes, and TV units tailored to your space.' },
        { title: 'Paint & Finishes', desc: 'High-quality silk vinyl, textured, and stucco finishes.' },
        { title: 'Lighting Design', desc: 'Ambient, task, and accent lighting solutions.' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-32 pb-20 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80" 
                        alt="Interior Design" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <button onClick={() => onNavigate('projects_hub')} className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={18} className="mr-2" /> Back to Projects
                    </button>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Premium <span className="text-[#4ade80]">Interiors</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Elevate your living experience with bespoke interior design solutions that blend functionality with breathtaking aesthetics.
                    </p>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Designed for Living</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Our interior design team works closely with you to create spaces that reflect your personality and lifestyle. 
                                Whether you need a full home makeover or specific upgrades like a modern kitchen or gypsum ceiling, we deliver perfection.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {features.map((f, i) => (
                                    <div key={i} className="flex gap-3">
                                        <CheckCircle className="text-[#007636] flex-shrink-0" size={20} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{f.title}</h4>
                                            <p className="text-xs text-gray-500">{f.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button onClick={handleConsult}>Request Design Quote</Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" className="rounded-xl shadow-lg w-full h-64 object-cover" alt="Kitchen" />
                            <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80" className="rounded-xl shadow-lg w-full h-64 object-cover mt-8" alt="Living Room" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Portfolio Grid */}
            <PortfolioGrid items={INTERIOR_PROJECTS} title="Our Latest Designs" />

            {/* Styles Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Styles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FadeInSection>
                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                                <Sofa size={40} className="mx-auto text-[#b96807] mb-4" />
                                <h3 className="font-bold text-lg mb-2">Modern Minimalist</h3>
                                <p className="text-sm text-gray-500">Clean lines, neutral palettes, and functional spaces.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay="delay-100">
                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                                <PaintBucket size={40} className="mx-auto text-[#b96807] mb-4" />
                                <h3 className="font-bold text-lg mb-2">Contemporary Luxury</h3>
                                <p className="text-sm text-gray-500">Bold textures, metallic accents, and premium finishes.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay="delay-200">
                            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
                                <Lamp size={40} className="mx-auto text-[#b96807] mb-4" />
                                <h3 className="font-bold text-lg mb-2">Warm Rustic</h3>
                                <p className="text-sm text-gray-500">Natural wood tones, cozy lighting, and earthy vibes.</p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>
        </div>
    );
};