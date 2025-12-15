import React, { useState } from 'react';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { Map, Calendar, FileCheck, Home, ChevronDown, ChevronUp, ShieldCheck, Users, Hammer, Award, ArrowRight } from 'lucide-react';
import { PROCESS_FAQS } from '../constants';
import { ViewState } from '../App';

interface ProcessPageProps {
    onNavigate?: (view: ViewState, params?: any) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
      {
          icon: Map,
          title: "Choose Your Plot",
          description: "Browse our verified portfolio of prime plots in high-growth areas. Filter by location, price, and purpose to find your perfect match.",
          cta: "View Listings",
          action: () => onNavigate?.('properties')
      },
      {
          icon: Calendar,
          title: "Visit the Site",
          description: "Seeing is believing. Schedule a free site visit on Wednesdays or Saturdays. We provide transport so you can inspect the land personally.",
          cta: "Book Visit",
          action: () => onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'Site Visit' })
      },
      {
          icon: FileCheck,
          title: "Secure Your Plot",
          description: "Once satisfied, pay a deposit to secure your plot. We offer flexible payment plans up to 12 months. We handle all the legal paperwork.",
          cta: "Inquire on Payments",
          action: () => onNavigate?.('contact', { purpose: 'General Inquiry', context: 'Inquiry about Payment Plans' })
      },
      {
          icon: Home,
          title: "Build Your Home",
          description: "Ready to build? Our construction team will help you choose a design, get approvals, and build your dream home with up to 70% financing.",
          cta: "Estimate Cost",
          action: () => onNavigate?.('service_construction', { scrollTo: 'calculator' })
      }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Your Journey to Owning Land <br /> & <span className="text-[#007636] dark:text-[#4ade80]">Building a Home</span> Made Simple
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                We've streamlined real estate into an easy 4-step process. From choosing a plot to moving into your dream home, we are with you every step of the way.
            </p>
            <div className="flex justify-center">
                <Button variant="primary" className="shadow-lg px-8 py-3 text-lg" onClick={() => onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'Consultation' })}>
                    Book a Consultation
                </Button>
            </div>
         </div>
         {/* Decorative elements */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 dark:bg-green-900/30 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 dark:bg-orange-900/30 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Step-by-Step Process */}
      <section className="py-20 bg-white dark:bg-gray-900 relative transition-colors duration-300">
         <div className="container mx-auto px-4">
            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-10">
                    <div className="h-full bg-gradient-to-r from-[#007636] to-[#b96807] w-full opacity-20 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <FadeInSection key={index} delay={`delay-${index * 150}`}>
                            <div className="flex flex-col items-center text-center group bg-white dark:bg-gray-800 p-4 rounded-xl hover:shadow-xl transition-all duration-300 dark:hover:bg-gray-700/50">
                                <div className="w-24 h-24 bg-white dark:bg-gray-700 border-4 border-[#007636] text-[#007636] dark:text-[#4ade80] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#007636] group-hover:text-white transition-all duration-300 relative z-10">
                                    <step.icon size={36} />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#b96807] text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 flex-grow">{step.description}</p>
                                <button 
                                    onClick={step.action}
                                    className="text-[#007636] dark:text-[#4ade80] font-semibold text-sm flex items-center hover:text-[#b96807] dark:hover:text-[#fbbf24] transition-colors"
                                >
                                    {step.cta} <ArrowRight size={14} className="ml-1" />
                                </button>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-20 bg-[#1a2e24] text-white">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">Why Trust MyPloti?</h2>
                  <p className="text-gray-300 max-w-2xl mx-auto">
                      We prioritize transparency, legal compliance, and customer satisfaction above all else.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                      <ShieldCheck size={40} className="text-[#4ade80] mb-4" />
                      <h3 className="font-bold text-lg mb-2">100% Secure</h3>
                      <p className="text-sm text-gray-300">All plots have ready title deeds. We conduct strict due diligence.</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                      <Award size={40} className="text-[#4ade80] mb-4" />
                      <h3 className="font-bold text-lg mb-2">NCA Registered</h3>
                      <p className="text-sm text-gray-300">Fully licensed and compliant with National Construction Authority standards.</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                      <Users size={40} className="text-[#4ade80] mb-4" />
                      <h3 className="font-bold text-lg mb-2">1000+ Clients</h3>
                      <p className="text-sm text-gray-300">Join a growing community of satisfied homeowners and investors.</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                      <Hammer size={40} className="text-[#4ade80] mb-4" />
                      <h3 className="font-bold text-lg mb-2">45+ Projects</h3>
                      <p className="text-sm text-gray-300">A proven track record of delivering quality projects on time.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4 max-w-3xl">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Common Questions</h2>
                  <p className="text-gray-600 dark:text-gray-300">Everything you need to know about buying land and building with us.</p>
              </div>

              <div className="space-y-4">
                  {PROCESS_FAQS.map((faq, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 overflow-hidden">
                          <button 
                              className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                              onClick={() => toggleFaq(index)}
                          >
                              <span className="font-bold text-gray-800 dark:text-white">{faq.question}</span>
                              {openFaq === index ? (
                                  <ChevronUp size={20} className="text-[#007636] dark:text-[#4ade80]" />
                              ) : (
                                  <ChevronDown size={20} className="text-gray-400 dark:text-gray-400" />
                              )}
                          </button>
                          <div 
                              className={`px-6 transition-all duration-300 ease-in-out ${
                                  openFaq === index ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                              }`}
                          >
                              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-600 pt-4">
                                  {faq.answer}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="text-center mt-12">
                  <Button variant="outline" onClick={() => onNavigate?.('contact', { purpose: 'General Inquiry' })}>
                      Talk to an Advisor
                  </Button>
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
              <div className="bg-[#007636] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  
                  <div className="relative z-10 max-w-2xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Journey Today</h2>
                      <p className="text-lg text-green-100 mb-8">
                          Don't wait to own your dream property. Book a site visit today and take the first step towards homeownership with confidence.
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Button variant="white" className="text-lg shadow-lg" onClick={() => onNavigate?.('contact', { scrollTo: 'booking-form', purpose: 'Site Visit' })}>
                             Book a Site Visit
                          </Button>
                          <Button className="bg-[#b96807] hover:bg-[#965405] text-white border-none text-lg shadow-lg">
                             Download Brochure
                          </Button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};