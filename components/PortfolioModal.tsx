import React, { useState } from 'react';
import { X, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioItem | null;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  // Combine main image and gallery for the slider
  const allImages = [project.mainImage, ...project.gallery].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col md:flex-row relative z-10 overflow-hidden animate-fadeIn">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
        >
            <X size={24} />
        </button>

        {/* Image Section */}
        <div className="md:w-3/5 bg-gray-900 relative flex flex-col">
            <div className="flex-grow relative overflow-hidden">
                <img 
                    src={allImages[activeImageIndex]} 
                    alt={project.title} 
                    className="w-full h-full object-cover absolute inset-0"
                />
            </div>
            {/* Thumbnails */}
            <div className="p-4 bg-black/50 flex gap-2 overflow-x-auto">
                {allImages.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx ? 'border-[#b96807] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                    >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

        {/* Content Section */}
        <div className="md:w-2/5 p-8 overflow-y-auto bg-white">
            <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-[#007636]/10 text-[#007636] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                    {project.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h2>
                <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={16} className="mr-1 text-[#b96807]" />
                    {project.location}
                </div>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8">
                <p>{project.description}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Project Specifications</h3>
                <div className="space-y-3">
                    {project.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">{spec.label}</span>
                            <span className="font-bold text-gray-900">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {project.completionDate && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={16} /> Completed: {project.completionDate}
                </div>
            )}
            
            <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#007636] font-bold text-sm">
                    <CheckCircle size={18} />
                    <span>Delivered on time and within budget</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};