import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { PortfolioModal } from './PortfolioModal';
import { FadeInSection } from './FadeInSection';
import { ArrowRight, Plus } from 'lucide-react';

interface PortfolioGridProps {
    items: PortfolioItem[];
    title?: string;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, title = "Recent Projects" }) => {
    const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenProject = (project: PortfolioItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our portfolio of completed works. Click on any project to view detailed specifications and gallery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <FadeInSection key={item.id} delay={`delay-${index * 100}`}>
                            <div 
                                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col"
                                onClick={() => handleOpenProject(item)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                                    <img 
                                        src={item.mainImage} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#b96807] shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                            <Plus size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#007636] px-3 py-1 rounded-full text-xs font-bold shadow-sm z-20">
                                        {item.category}
                                    </div>
                                </div>
                                
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#007636] transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.description}</p>
                                    <div className="mt-auto flex items-center text-[#b96807] font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                                        View Details <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>

            <PortfolioModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                project={selectedProject} 
            />
        </section>
    );
};