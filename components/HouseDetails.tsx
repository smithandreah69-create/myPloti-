import React, { useState } from 'react';
import { Project } from '../types';
import { MapPin, ArrowLeft, BedDouble, Bath, Layers, CheckCircle, MessageSquare, Briefcase, PaintBucket, Flower, Shield, Zap, Hammer } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../App';

interface HouseDetailsProps {
    project: Project;
    onBack: () => void;
    onNavigate: (view: ViewState, params?: any) => void;
}

export const HouseDetails: React.FC<HouseDetailsProps> = ({ project, onBack, onNavigate }) => {
    const [activeImage, setActiveImage] = useState(project.imageUrl);

    const handleConsult = (service?: string) => {
        const context = service 
            ? `Inquiry about ${service} for ${project.title}`
            : `House Inquiry: ${project.title} (${project.priceStr})`;
        onNavigate('contact', { scrollTo: 'booking-form', purpose: 'Consultation', context });
    };

    // Detailed Specifications Data
    const specifications = [
        {
            category: "Structure & Walling",
            icon: Hammer,
            items: [
                "Reinforced concrete foundation to structural engineer details",
                "Machine cut stone walling (200mm external, 150mm internal)",
                "Reinforced concrete lintels, beams and columns",
                "Damp proof course (DPC) and membrane"
            ]
        },
        {
            category: "Roofing",
            icon: Layers,
            items: [
                "Gauge 28 pre-painted roofing sheets (Box/Tile profile)",
                "Treated timber cypress trusses",
                "PVC rain water gutters and downpipes",
                "Gypsum ceiling with cornice in all living areas"
            ]
        },
        {
            category: "Finishes & Flooring",
            icon: PaintBucket,
            items: [
                "Ceramic tiles in living room, dining, and wet areas",
                "Laminate or tiled flooring in bedrooms",
                "Silk vinyl emulsion paint for internal walls",
                "Weather guard paint for external walls"
            ]
        },
        {
            category: "Fittings & Fixtures",
            icon: CheckCircle,
            items: [
                "MDF/HDF wardrobes in all bedrooms",
                "Fitted kitchen cabinets with granite worktops",
                "Standard sanitary ware (toilets, basins, showers)",
                "Solid core flush doors and steel casement windows"
            ]
        },
        {
            category: "Electrical & Plumbing",
            icon: Zap,
            items: [
                "Concealed electrical wiring with standard switches",
                "Instant shower heating provision",
                "PPR/PVC plumbing piping",
                "Septic tank or sewer connection provision"
            ]
        }
    ];

    const otherServices = [
        { name: "Interior Design", icon: PaintBucket, desc: "Custom furnishings & decor" },
        { name: "Landscaping", icon: Flower, desc: "Garden & compound design" },
        { name: "Security Systems", icon: Shield, desc: "CCTV & Electric fencing" },
        { name: "Solar Installation", icon: Zap, desc: "Water heating & backup" },
    ];

    return (
        <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button 
                    onClick={onBack}
                    className="flex items-center text-gray-500 hover:text-[#007636] mb-6 transition-colors font-medium"
                >
                    <ArrowLeft size={18} className="mr-2" /> Back to Houses
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* LEFT COLUMN - HOUSE DETAILS */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <div className="h-[400px] w-full overflow-hidden relative">
                                <img src={activeImage} alt={project.title} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 bg-[#007636] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                    Construction Package
                                </div>
                            </div>
                            {/* Thumbnails */}
                            <div className="p-4 flex gap-3 overflow-x-auto">
                                {project.images?.map((img, idx) => (
                                    <img 
                                        key={idx} 
                                        src={img} 
                                        alt={`View ${idx}`} 
                                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImage === img ? 'border-[#b96807]' : 'border-transparent hover:border-gray-200'}`}
                                        onClick={() => setActiveImage(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* General Details Content */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                             <div className="flex items-center text-gray-600 mb-4">
                                <MapPin size={18} className="mr-1 text-[#b96807]" /> {project.location}
                             </div>
                             
                             <div className="flex flex-wrap gap-6 py-6 border-t border-b border-gray-100 mb-6">
                                {project.bedrooms && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#007636]">
                                            <BedDouble size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase">Bedrooms</span>
                                            <span className="font-bold">{project.bedrooms}</span>
                                        </div>
                                    </div>
                                )}
                                {project.bathrooms && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#007636]">
                                            <Bath size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase">Bathrooms</span>
                                            <span className="font-bold">{project.bathrooms}</span>
                                        </div>
                                    </div>
                                )}
                                {project.floors && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#007636]">
                                            <Layers size={20} />
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase">Floors</span>
                                            <span className="font-bold">{project.floors}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-700">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#007636]">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase">Plinth Area</span>
                                        <span className="font-bold">{project.size}</span>
                                    </div>
                                </div>
                             </div>

                             <div className="prose text-gray-600 max-w-none">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Design Concept</h3>
                                <p className="mb-4">{project.description}</p>
                             </div>
                        </div>

                        {/* Detailed Construction Specifications */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Briefcase className="text-[#b96807]" /> Construction Specifications
                            </h2>
                            <p className="text-gray-500 mb-8 border-l-4 border-[#007636] pl-4 italic">
                                This package includes a complete "Key-in-Hand" delivery. The following works are covered in the quoted price:
                            </p>

                            <div className="space-y-8">
                                {specifications.map((spec, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-[#007636] flex-shrink-0">
                                                <spec.icon size={24} />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-bold text-gray-800 mb-3">{spec.category}</h3>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                                    {spec.items.map((item, i) => (
                                                        <li key={i} className="flex items-start text-sm text-gray-600">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#b96807] mt-1.5 mr-2 flex-shrink-0"></div>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        {index !== specifications.length - 1 && (
                                            <div className="absolute left-6 top-14 bottom-[-20px] w-px bg-gray-100 hidden md:block"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - PRICING & SERVICES (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            
                            {/* Price Card */}
                            <div className="bg-[#007636] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-green-100 text-sm font-medium mb-1">Standard Finish Price</p>
                                    <h2 className="text-3xl font-bold">{project.priceStr}</h2>
                                    <p className="text-xs text-green-200 mt-2">*Excludes land cost & external works</p>
                                    
                                    <Button 
                                        variant="white" 
                                        fullWidth 
                                        className="mt-6 font-bold text-[#007636]"
                                        onClick={() => handleConsult()}
                                    >
                                        <MessageSquare size={18} /> Request Quote
                                    </Button>
                                </div>
                                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                                    <Hammer size={120} />
                                </div>
                            </div>

                            {/* Other Services Card */}
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-lg">Other Services</h3>
                                    <p className="text-xs text-gray-500">Add-ons to complete your home</p>
                                </div>
                                
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {otherServices.map((service, index) => (
                                            <div 
                                                key={index} 
                                                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-100"
                                                onClick={() => handleConsult(service.name)}
                                            >
                                                <div className="w-10 h-10 bg-[#b96807]/10 rounded-full flex items-center justify-center text-[#b96807] group-hover:bg-[#b96807] group-hover:text-white transition-colors">
                                                    <service.icon size={20} />
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-bold text-gray-800 text-sm">{service.name}</h4>
                                                    <p className="text-xs text-gray-500">{service.desc}</p>
                                                </div>
                                                <div className="text-gray-300 group-hover:text-[#007636]">
                                                    <ArrowLeft size={16} className="rotate-180" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                        <p className="text-xs text-blue-800 leading-relaxed">
                                            <strong>Note:</strong> We also offer structural engineering, architectural plan revisions, and biodigester installation upon request.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};