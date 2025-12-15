import React from 'react';
import { useData } from '../contexts/DataContext';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { ArrowRight } from 'lucide-react';
import { ViewState } from '../App';

interface ConstructionTeaserProps {
    onNavigate: (view: ViewState, params?: any) => void;
    content?: any;
}

export const ConstructionTeaser: React.FC<ConstructionTeaserProps> = ({ onNavigate, content }) => {
  const { houseTypes } = useData();

  const title = content?.title || "Build With Us";
  const body = content?.body || "Already have a plot? Let us bring your vision to life. Choose from our standard designs or let us create a custom masterpiece for you.";

  const handleEstimateClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate('service_construction', { scrollTo: 'calculator' });
  };

  return (
    <section id="construction" className="py-16 md:py-24 bg-[#1a2e24] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                <p className="text-gray-300">
                    {body}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {houseTypes.slice(0, 3).map((house, index) => (
            <FadeInSection key={house.id} delay={`delay-${index * 100}`}>
              <div className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={handleEstimateClick}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
                <img 
                    src={house.imageUrl} 
                    alt={house.title} 
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <h3 className="text-2xl font-bold mb-2">{house.title}</h3>
                    <p className="text-sm text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {house.description}
                    </p>
                    <div className="flex items-center text-[#b96807] font-semibold text-sm uppercase tracking-wider">
                        View Plan <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};