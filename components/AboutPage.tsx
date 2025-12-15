import React from 'react';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { Target, Eye, ShieldCheck, CheckCircle, Award, Briefcase, Phone, Download } from 'lucide-react';
import { COMPANY_TIMELINE, PARTNERS } from '../constants'; 
import { useData } from '../contexts/DataContext';
import { ViewState } from '../App';

interface AboutPageProps {
    onNavigate?: (view: ViewState, params?: any) => void;
    onDownloadBrochure?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onDownloadBrochure }) => {
  const { teamMembers, partners } = useData();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-colors duration-300">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Who We Are
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Delivering trusted land and construction solutions across Kenya. We are more than a real estate company; we are your partners in building a legacy.
            </p>
            <div className="flex justify-center">
                <Button variant="primary" className="shadow-lg px-8 py-3 text-lg" onClick={() => onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'General Inquiry' })}>
                    Book a Consultation
                </Button>
            </div>
         </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <FadeInSection>
                    <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-800 h-full">
                        <div className="w-14 h-14 bg-[#007636] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                            <Target size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            To provide affordable, verified land and modern homes, making property ownership simple, transparent, and accessible for every Kenyan.
                        </p>
                    </div>
                </FadeInSection>
                <FadeInSection delay="delay-100">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-2xl border border-orange-100 dark:border-orange-800 h-full">
                        <div className="w-14 h-14 bg-[#b96807] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                            <Eye size={28} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            To be Kenya’s most trusted real estate and construction partner, known for integrity, quality delivery, and customer satisfaction.
                        </p>
                    </div>
                </FadeInSection>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    The experienced professionals dedicated to making your home ownership dream a reality.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <FadeInSection key={member.id} delay={`delay-${index * 100}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group hover:border-[#007636] transition-all">
                            <div className="h-72 overflow-hidden">
                                <img 
                                    src={member.imageUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                                <div className="text-[#b96807] dark:text-[#fbbf24] font-semibold text-sm mb-4 uppercase tracking-wide">{member.role}</div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.bio}</p>
                                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                   <Button variant="outline" className="text-xs py-2 px-4 w-full" onClick={() => onNavigate?.('contact', { scrollTo: 'booking-form', context: `Consultation with ${member.name}` })}>Book Consultation</Button>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                ))}
            </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="py-20 bg-[#1a2e24] text-white">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why We Are Trusted</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    We adhere to the highest standards of professionalism and compliance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10">
                     <Award size={40} className="text-[#4ade80] mb-4" />
                     <h3 className="font-bold text-lg mb-2">NCA Compliant</h3>
                     <p className="text-sm text-gray-300">Registered and approved by the National Construction Authority.</p>
                 </div>
                 <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10">
                     <ShieldCheck size={40} className="text-[#4ade80] mb-4" />
                     <h3 className="font-bold text-lg mb-2">Verified Titles</h3>
                     <p className="text-sm text-gray-300">All our plots come with ready, unencumbered title deeds.</p>
                 </div>
                 <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10">
                     <CheckCircle size={40} className="text-[#4ade80] mb-4" />
                     <h3 className="font-bold text-lg mb-2">Transparent</h3>
                     <p className="text-sm text-gray-300">Clear sale agreements and detailed construction BQs.</p>
                 </div>
                 <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10">
                     <Briefcase size={40} className="text-[#4ade80] mb-4" />
                     <h3 className="font-bold text-lg mb-2">Professional</h3>
                     <p className="text-sm text-gray-300">A qualified team of engineers, surveyors, and legal experts.</p>
                 </div>
            </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 uppercase tracking-wide">Our Strategic Partners</h2>
             <div className="flex flex-wrap justify-center gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {partners.map((p) => (
                    <img key={p.id} src={p.logoUrl} alt={p.name} title={p.name} className="h-16 object-contain invert dark:invert-0" />
                ))}
             </div>
             <div className="mt-12">
                 <Button variant="outline" onClick={() => onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'Partnership' })}>Become a Partner</Button>
             </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
              <div className="bg-[#007636] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  
                  <div className="relative z-10 max-w-2xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Secure Your Dream Property Today</h2>
                      <p className="text-lg text-green-100 mb-8">
                          Partner with trusted experts who have a proven track record. Let us guide you home.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Button variant="white" className="text-lg shadow-lg" onClick={() => onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'Site Visit' })}>
                             <Phone size={18} /> Book a Site Visit
                          </Button>
                          <Button 
                            className="bg-[#b96807] hover:bg-[#965405] text-white border-none text-lg shadow-lg"
                            onClick={onDownloadBrochure}
                          >
                             <Download size={18} /> Download Brochure
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};