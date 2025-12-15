import React from 'react';
import { Project } from '../types';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface PropertyCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ project, onViewDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col border border-gray-100 dark:border-gray-700">
      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => onViewDetails(project)}>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#007636] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          {project.type}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
             <div className="text-white font-bold text-lg">{project.title}</div>
             <div className="text-white/90 text-sm flex items-center"><MapPin size={14} className="mr-1"/> {project.location}</div>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#b96807] dark:text-[#fbbf24] font-bold text-xl">{project.priceStr}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{project.size}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="space-y-1 mb-6 flex-grow">
          {project.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
              <CheckCircle size={12} className="text-[#007636] dark:text-[#4ade80] mr-2" />
              {feature}
            </div>
          ))}
        </div>
        
        <div className="mt-auto">
            <Button variant="outline" fullWidth className="text-sm py-2 group-hover:bg-[#007636] group-hover:text-white group-hover:border-[#007636] dark:border-[#4ade80] dark:text-[#4ade80] dark:group-hover:bg-[#4ade80] dark:group-hover:text-gray-900 dark:group-hover:border-[#4ade80]" onClick={() => onViewDetails(project)}>
                See More <ArrowRight size={16} className="ml-2" />
            </Button>
        </div>
      </div>
    </div>
  );
};