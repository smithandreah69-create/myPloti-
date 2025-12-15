import React from 'react';
import { Map, Eye, Lock, Home, ArrowRight } from 'lucide-react';
import { FadeInSection } from './FadeInSection';

interface HowItWorksProps {
    content?: any;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ content }) => {
  const defaultSteps = [
    { icon: Map, title: 'Choose Plot', desc: 'Browse our portfolio of prime locations.' },
    { icon: Eye, title: 'Visit Site', desc: 'Book a free site visit to see for yourself.' },
    { icon: Lock, title: 'Secure Plot', desc: 'Pay deposit and sign sale agreement.' },
    { icon: Home, title: 'Build Home', desc: 'We help you design and construct.' },
  ];

  // Map icon names from string if coming from DB, or use defaults
  const steps = content?.steps || defaultSteps;
  const title = content?.title || "How It Works";
  const subtitle = content?.subtitle || "Your simple path to homeownership.";

  return (
    <section id="process" className="py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">{subtitle}</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -z-10">
            <div className="h-full bg-[#007636]/20 dark:bg-[#007636]/40 w-3/4 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step: any, index: number) => (
              <FadeInSection key={index} delay={`delay-${index * 150}`}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white dark:bg-gray-800 border-4 border-[#007636] text-[#007636] dark:text-[#4ade80] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:bg-[#007636] group-hover:text-white transition-all duration-300 relative z-10">
                    <Home size={36} /> {/* Generic icon for now if dynamic mapping isn't set up */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#b96807] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">{step.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};