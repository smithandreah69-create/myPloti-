import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { ViewState } from '../App';

interface FeaturedProjectsProps {
    onNavigate: (view: ViewState, params?: any) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onNavigate }) => {
  const { projects } = useData();

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-[#007636] dark:text-[#4ade80]">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our hand-picked selection of prime plots ready for development. 
            Located in high-growth areas with ready title deeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 6).map((project, index) => (
            <FadeInSection key={project.id} delay={`delay-${index * 100}`}>
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col border border-gray-100 dark:border-gray-700">
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => onNavigate('properties')}>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#007636] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Selling Fast
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                    <span className="text-[#b96807] dark:text-[#fbbf24] font-bold text-lg">{project.priceStr}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 text-sm">
                    <MapPin size={16} className="mr-1" />
                    {project.location}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <CheckCircle size={14} className="text-[#007636] dark:text-[#4ade80] mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" fullWidth onClick={() => onNavigate('properties')}>
                    View Plot Details
                  </Button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
        
        <div className="text-center mt-12">
            <button 
                onClick={() => onNavigate('properties')}
                className="text-[#007636] dark:text-[#4ade80] font-semibold hover:underline flex items-center justify-center gap-1 mx-auto transition-colors"
            >
                View All Projects <MapPin size={16} />
            </button>
        </div>
      </div>
    </section>
  );
};