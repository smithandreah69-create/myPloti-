import React from 'react';
import { ViewState } from '../App';
import { ArrowRight, Hammer, PaintBucket, Flower, ShieldCheck } from 'lucide-react';
import { FadeInSection } from './FadeInSection';
import { Button } from './Button';

interface ProjectsHubProps {
    onNavigate: (view: ViewState, params?: any) => void;
}

export const ProjectsHub: React.FC<ProjectsHubProps> = ({ onNavigate }) => {
    const services = [
        {
            id: 'construction',
            title: 'Construction',
            description: 'Full-service residential and commercial building construction. From foundation to handover, we deliver quality homes.',
            icon: Hammer,
            view: 'service_construction',
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
            color: 'bg-blue-600'
        },
        {
            id: 'interiors',
            title: 'Interiors',
            description: 'Transform your indoor spaces with our premium interior design, gypsum finishes, and custom cabinetry solutions.',
            icon: PaintBucket,
            view: 'service_interiors',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
            color: 'bg-purple-600'
        },
        {
            id: 'landscaping',
            title: 'Landscaping',
            description: 'Create your own eden. Professional garden design, cabro paving, planting, and outdoor recreational spaces.',
            icon: Flower,
            view: 'service_landscaping',
            image: 'https://images.unsplash.com/photo-1558905540-2129015929b1?auto=format&fit=crop&w=800&q=80',
            color: 'bg-green-600'
        },
        {
            id: 'walls',
            title: 'Perimeter Walls',
            description: 'Secure your property with robust stone walls, electric fencing, and automated gate systems.',
            icon: ShieldCheck,
            view: 'service_walls',
            image: 'https://images.unsplash.com/photo-1623190695034-75466c429672?auto=format&fit=crop&w=800&q=80',
            color: 'bg-orange-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-[#1a2e24] pt-32 pb-20 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our <span className="text-[#4ade80]">Expertise</span></h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        MyPloti offers comprehensive construction solutions tailored to your needs. 
                        Choose a service below to explore our capabilities.
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 -mt-10 pb-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <FadeInSection key={service.id} delay={`delay-${index * 100}`}>
                            <div 
                                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full flex flex-col border border-transparent dark:border-gray-700"
                                onClick={() => onNavigate(service.view as ViewState)}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10"></div>
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className={`absolute top-4 left-4 ${service.color} text-white p-3 rounded-xl shadow-lg z-20`}>
                                        <service.icon size={24} />
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#007636] dark:group-hover:text-[#4ade80] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center text-[#b96807] dark:text-[#fbbf24] font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                                        View Projects <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-white dark:bg-gray-800 py-20 transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Not sure what you need?</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Our team of experts is ready to guide you through your project, no matter the size or complexity.
                    </p>
                    <Button 
                        onClick={() => onNavigate('contact', { purpose: 'Consultation' })}
                        className="hover:!bg-black hover:!text-white hover:!border-black dark:hover:!bg-white dark:hover:!text-black"
                    >
                        Talk to an Expert
                    </Button>
                </div>
            </div>
        </div>
    );
};