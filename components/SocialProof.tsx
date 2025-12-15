import React from 'react';
import { Quote } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { FadeInSection } from './FadeInSection';

export const SocialProof: React.FC = () => {
  const { stats, testimonials, partners } = useData();

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat) => (
                <div key={stat.id} className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    {/* Assuming static icons for simplicity, but could be dynamic mapped */}
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                What Our <span className="text-[#007636] dark:text-[#4ade80]">Clients Say</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t, index) => (
                    <FadeInSection key={t.id} delay={`delay-${index * 100}`}>
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative h-full border border-gray-100 dark:border-gray-700">
                            <Quote className="text-[#007636]/20 dark:text-[#007636]/40 absolute top-6 right-6" size={48} />
                            <p className="text-gray-600 dark:text-gray-300 mb-6 italic relative z-10">"{t.content}"</p>
                            <div className="flex items-center gap-4">
                                <img src={t.imageUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#007636]" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">{t.name}</h4>
                                    <p className="text-xs text-[#b96807] dark:text-[#fbbf24] font-semibold uppercase">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                ))}
            </div>
        </div>

        {/* Partners */}
        <div className="pt-12 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-400 dark:text-gray-500 font-medium mb-8 uppercase tracking-widest text-sm">Our Trusted Partners</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 dark:opacity-40 grayscale hover:grayscale-0 dark:hover:opacity-80 transition-all duration-500">
                {partners.map(p => (
                    <img key={p.id} src={p.logoUrl} alt={p.name} title={p.name} className="h-12 object-contain invert dark:invert-0" /> // Invert for dark mode if logos are black
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};