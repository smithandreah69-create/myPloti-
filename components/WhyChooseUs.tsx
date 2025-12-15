import React from 'react';
import { ShieldCheck, Banknote, HardHat, FileCheck } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

interface WhyChooseUsProps {
    content?: any;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ content }) => {
  const defaultReasons = [
    {
      icon: ShieldCheck,
      title: "Fully Registered",
      description: "We are compliant with NCA and all relevant Kenyan regulators for your peace of mind."
    },
    {
      icon: Banknote,
      title: "70% Financing",
      description: "We partner with banks to offer up to 70% construction financing to help you build."
    },
    {
      icon: HardHat,
      title: "Expert Team",
      description: "Over 20 years of combined experience in civil engineering and project management."
    },
    {
      icon: FileCheck,
      title: "No Hidden Costs",
      description: "Clear agreements and milestone-based payments. What you sign is what you pay."
    }
  ];

  const reasons = content?.reasons || defaultReasons;
  const title = content?.title || "Your Trusted Partner in Land & Construction";
  const subtitle = content?.subtitle || "Why Choose MyPloti";
  const body = content?.body || "We don't just sell land; we help you build a legacy. From identifying the perfect plot to handing over the keys to your new home, we handle the entire value chain so you don't have to worry about the details.";
  const image = content?.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80";

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background circle */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 dark:bg-green-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          <div className="md:w-1/2">
            <FadeInSection>
              <h4 className="text-[#b96807] dark:text-[#fbbf24] font-bold uppercase tracking-wider mb-2">{subtitle}</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {body}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reasons.map((reason: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="w-12 h-12 bg-[#007636]/10 dark:bg-[#007636]/20 rounded-lg flex items-center justify-center text-[#007636] dark:text-[#4ade80]">
                      <ShieldCheck size={24} /> 
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{reason.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{reason.description}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>

          <div className="md:w-1/2 relative">
             <FadeInSection delay="delay-200">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-700">
                    <img 
                        src={image} 
                        alt="Construction Site Engineer" 
                        className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                        <p className="font-bold text-xl">"Quality is not an act, it is a habit."</p>
                    </div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs border border-gray-100 dark:border-gray-700">
                    <div className="bg-[#b96807] text-white p-3 rounded-full">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">100% Secure</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Title deeds processed within 60 days</p>
                    </div>
                </div>
             </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};