import React from 'react';
import { Project } from '../types';
import { MapPin, ArrowLeft, CheckCircle, Share2, Calendar } from 'lucide-react';
import { Button } from './Button';
import { Calculator } from './Calculator';
import { ViewState } from '../App';

interface PropertyDetailsProps {
  project: Project;
  onBack: () => void;
  onNavigate: (view: ViewState, params?: any) => void;
  onDownloadBrochure: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ project, onBack, onNavigate, onDownloadBrochure }) => {
  const [activeImage, setActiveImage] = React.useState(project.imageUrl);

  return (
    <div className="pt-24 pb-12 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Back */}
        <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-[#007636] mb-6 transition-colors font-medium"
        >
            <ArrowLeft size={18} className="mr-2" /> Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Gallery & Description */}
            <div className="lg:col-span-2">
                <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <img src={activeImage} alt={project.title} className="w-full h-96 object-cover" />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {project.images?.map((img, idx) => (
                        <img 
                            key={idx} 
                            src={img} 
                            alt={`View ${idx}`} 
                            className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImage === img ? 'border-[#b96807] scale-105' : 'border-transparent hover:border-gray-300'}`}
                            onClick={() => setActiveImage(img)}
                        />
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                            <div className="flex items-center text-gray-600">
                                <MapPin size={18} className="mr-1 text-[#b96807]" /> {project.location}
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-2xl font-bold text-[#007636]">{project.priceStr}</div>
                             <div className="text-sm text-gray-500">Starting Price</div>
                        </div>
                    </div>
                    
                    <div className="border-t border-b border-gray-100 py-6 my-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <span className="block text-xs text-gray-500 uppercase">Type</span>
                            <span className="font-semibold">{project.type}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase">Size</span>
                            <span className="font-semibold">{project.size}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase">Purpose</span>
                            <span className="font-semibold">{project.purpose}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 uppercase">Status</span>
                            <span className="font-semibold text-[#007636]">Available</span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-600 mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Description</h3>
                        <p>{project.description}</p>
                        <p className="mt-4">
                            Ideal for {project.purpose.toLowerCase()}. {project.location} is a rapidly developing area 
                            ensuring high appreciation rates. The project is fully beaconed with ready title deeds.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">Amenities & Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[...project.features, ...(project.amenities || [])].map((feat, i) => (
                                <div key={i} className="flex items-center text-gray-600">
                                    <CheckCircle size={16} className="text-[#007636] mr-2" />
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-500 mb-8">
                    <div className="text-center">
                        <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Map View Loading...</p>
                        <p className="text-sm">(Integration with Google Maps would go here)</p>
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    {/* Actions - Removed specific buttons as requested */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#007636]">
                        <h3 className="font-bold text-gray-900 mb-4">Interested?</h3>
                        <div className="space-y-3">
                            <Button fullWidth variant="outline" className="flex items-center justify-center" onClick={onDownloadBrochure}>
                                <Share2 size={18} className="mr-2" /> Share Property
                            </Button>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 text-center">
                            Use the tool below to plan your payment.
                        </div>
                    </div>

                    {/* Calculator */}
                    <div>
                        <Calculator initialPrice={project.price} onNavigate={onNavigate} compact />
                    </div>

                    {/* Safety Badge */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex gap-3 items-start">
                        <CheckCircle className="text-[#007636] flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-sm text-[#007636]">Verified Property</h4>
                            <p className="text-xs text-gray-600 mt-1">
                                This property has a clean title deed and has passed all due diligence checks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};