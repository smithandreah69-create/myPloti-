import React from 'react';
import { PageStructure, PageSection, SectionStyle } from '../types';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { ContactPage } from './ContactPage';
import { FeaturedProjects } from './FeaturedProjects';
import { SocialProof } from './SocialProof';
import { ConstructionTeaser } from './ConstructionTeaser';
import { WhyChooseUs } from './WhyChooseUs';
import { HowItWorks } from './HowItWorks';
import { ProjectsHub } from './ProjectsHub'; 
import { useData } from '../contexts/DataContext';
import { ViewState } from '../App';
import { CheckCircle, MapPin } from 'lucide-react';

interface DynamicPageProps {
    page: PageStructure;
    onNavigate: (view: ViewState, params?: any) => void;
    onDownloadBrochure: () => void;
}

// Wrapper to apply styles
const SectionWrapper: React.FC<{ style?: SectionStyle; children: React.ReactNode }> = ({ style, children }) => {
    const bg = style?.backgroundColor || 'bg-white';
    const textColor = style?.textColor || 'text-gray-900';
    const py = style?.paddingTop ? `pt-[${style.paddingTop}px] pb-[${style.paddingBottom || style.paddingTop}px]` : 'py-20';
    const align = style?.textAlign ? `text-${style.textAlign}` : '';

    // Convert custom px values if present (simple heuristic)
    const paddingStyle = style?.paddingTop && style.paddingTop !== 'py-20' 
        ? { paddingTop: `${style.paddingTop}px`, paddingBottom: `${style.paddingBottom || style.paddingTop}px` } 
        : undefined;

    return (
        <div className={`${bg} ${textColor} ${!paddingStyle ? py : ''} ${align} transition-colors duration-300`} style={paddingStyle}>
            {children}
        </div>
    );
};

const DynamicHero: React.FC<{ content: any, onNavigate: any }> = ({ content, onNavigate }) => (
    <div className="relative pt-32 pb-20 bg-gray-900 text-white text-center overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
            <img src={content.bgImage} className="w-full h-full object-cover opacity-40" alt="Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl">{content.title}</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md">{content.subtitle}</p>
            {content.buttonText && (
                <Button onClick={() => onNavigate(content.buttonLink || 'contact')} className="shadow-xl text-lg px-8">{content.buttonText}</Button>
            )}
        </div>
    </div>
);

const RichText: React.FC<{ content: any, style?: SectionStyle }> = ({ content, style }) => (
    <div className={`container mx-auto px-4 max-w-4xl prose prose-lg ${style?.textAlign === 'center' ? 'text-center' : ''}`}>
        {content.heading && <h2 className="text-3xl font-bold mb-6" style={{color: 'inherit'}}>{content.heading}</h2>}
        <div className="whitespace-pre-wrap leading-relaxed opacity-90">{content.body}</div>
    </div>
);

const Features: React.FC<{ content: any }> = ({ content }) => (
    <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{content.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gray-900">
                        <CheckCircle className="text-[#007636]" size={20} /> {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

const CallToAction: React.FC<{ content: any, onNavigate: any }> = ({ content, onNavigate }) => (
    <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.title || "Ready to start?"}</h2>
        <p className="opacity-90 mb-8 max-w-2xl mx-auto text-lg">{content.subtitle}</p>
        <Button variant="white" onClick={() => onNavigate(content.link || 'contact')} className="text-lg px-8">{content.buttonText || "Contact Us"}</Button>
    </div>
);

export const DynamicPage: React.FC<DynamicPageProps> = ({ page, onNavigate, onDownloadBrochure }) => {
    const { teamMembers, faqs } = useData();

    // Set page title for SEO
    React.useEffect(() => {
        if (page.meta?.title) document.title = page.meta.title;
        else document.title = `${page.title} | MyPloti`;
    }, [page]);

    const renderSectionContent = (section: PageSection) => {
        switch (section.type) {
            case 'Hero': return <DynamicHero content={section.content} onNavigate={onNavigate} />;
            case 'RichText': return <RichText content={section.content} style={section.style} />;
            case 'Features': return <Features content={section.content} />;
            case 'ContactForm': return <ContactPage initialData={section.content} onDownloadBrochure={onDownloadBrochure} />;
            case 'ProjectGrid': return <FeaturedProjects onNavigate={onNavigate} />;
            case 'Testimonials': return <SocialProof />;
            case 'CallToAction': return <CallToAction content={section.content} onNavigate={onNavigate} />;
            case 'WhyChooseUs': return <WhyChooseUs content={section.content} />;
            case 'ConstructionTeaser': return <ConstructionTeaser onNavigate={onNavigate} content={section.content} />;
            case 'HowItWorks': return <HowItWorks content={section.content} />;
            case 'ServicesGrid': return <div className="py-12"><ProjectsHub onNavigate={onNavigate} /></div>; 
            case 'Map': return (
                    <div className="h-96 w-full bg-gray-200 relative">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817367963486!2d36.81926067405232!3d-1.283454335624773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c1%3A0x2b8e35c2c4b7b20!2sView%20Park%20Towers!5e0!3m2!1sen!2ske!4v1698765432100!5m2!1sen!2ske" 
                            width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" title="MyPloti Location"
                        ></iframe>
                    </div>
                );
            case 'TeamGrid': return (
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map(m => (
                                <div key={m.id} className="text-center group">
                                    <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-[#007636] transition-colors">
                                        <img src={m.imageUrl} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="font-bold text-xl">{m.name}</h3>
                                    <p className="text-[#b96807] font-medium text-sm">{m.role}</p>
                                    <p className="text-gray-500 text-sm mt-3 max-w-xs mx-auto">{m.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'FAQ': return (
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((f, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h4 className="font-bold mb-2 text-gray-900">{f.question}</h4>
                                    <p className="text-gray-600 text-sm">{f.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default: return <div className="p-8 text-center text-red-500">Unknown Section Type: {section.type}</div>;
        }
    };

    return (
        <div className="min-h-screen">
            {page.sections.map((section, index) => (
                <FadeInSection key={section.id} delay={`delay-${index * 100}`}>
                    {/* Specialized Wrappers for Full-width backgrounds vs Contained content */}
                    {(section.type === 'Hero' || section.type === 'CallToAction' || section.type === 'Map') ? (
                        <div className="w-full">{renderSectionContent(section)}</div>
                    ) : (
                        <SectionWrapper style={section.style}>
                            {renderSectionContent(section)}
                        </SectionWrapper>
                    )}
                </FadeInSection>
            ))}
        </div>
    );
};