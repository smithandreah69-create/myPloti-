import React from 'react';
import { Hero } from './Hero';
import { FeaturedProjects } from './FeaturedProjects';
import { WhyChooseUs } from './WhyChooseUs';
import { ConstructionTeaser } from './ConstructionTeaser';
import { HowItWorks } from './HowItWorks';
import { SocialProof } from './SocialProof';
import { ViewState } from '../App';

interface HomePageProps {
    onNavigate: (view: ViewState, params?: any) => void;
    onDownloadBrochure: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onDownloadBrochure }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <FeaturedProjects onNavigate={onNavigate} />
      <WhyChooseUs />
      <ConstructionTeaser onNavigate={onNavigate} />
      <HowItWorks />
      <SocialProof />
    </>
  );
};