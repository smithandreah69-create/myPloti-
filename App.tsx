import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PropertiesPage } from './components/PropertiesPage';
import { PropertyDetails } from './components/PropertyDetails';
import { HouseDetails } from './components/HouseDetails';
import { ConstructionPage } from './components/ConstructionPage';
import { ProjectsHub } from './components/ProjectsHub';
import { InteriorsPage } from './components/InteriorsPage';
import { LandscapingPage } from './components/LandscapingPage';
import { PerimeterWallsPage } from './components/PerimeterWallsPage';
import { ProcessPage } from './components/ProcessPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChatWidget } from './components/ChatWidget';
import { BrochureModal } from './components/BrochureModal';
import { Project } from './types';
import { DataProvider, useData } from './contexts/DataContext'; // Import useData
import { AdminDashboard } from './components/AdminDashboard';
import { LegalPage } from './components/LegalPage';
import { DynamicPage } from './components/DynamicPage';

export type ViewState = 
  | 'home' 
  | 'properties' 
  | 'property_details' 
  | 'house_details' 
  | 'projects_hub' 
  | 'service_construction' 
  | 'service_interiors' 
  | 'service_landscaping' 
  | 'service_walls'
  | 'process' 
  | 'about' 
  | 'contact'
  | 'admin'
  | 'legal'
  | string; // Allow dynamic strings

const AppContent: React.FC = () => {
  const { pages } = useData(); // Get pages from context
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewParams, setViewParams] = useState<any>({});
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // Check URL params on mount to handle "Open in New Tab"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const typeParam = params.get('type');

    if (viewParam) {
        setCurrentView(viewParam as ViewState);
        if (typeParam) {
            setViewParams({ type: typeParam });
        }
    }
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProject]);

  const handleNavigate = (view: ViewState, params?: any) => {
    setCurrentView(view);
    if (params) {
        setViewParams(params);
    } else {
        setViewParams({});
    }
    
    if (view !== 'property_details' && view !== 'house_details') {
      setSelectedProject(null);
    }
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    if (project.type === 'House') {
        setCurrentView('house_details');
    } else {
        setCurrentView('property_details');
    }
  };

  const handleOpenBrochure = () => {
      setIsBrochureModalOpen(true);
  };

  if (currentView === 'admin') {
      return <AdminDashboard onNavigate={handleNavigate} />;
  }

  // --- ROUTER LOGIC ---
  const renderMainContent = () => {
      // 1. Static Routes
      switch(currentView) {
          case 'home': return <HomePage onNavigate={handleNavigate} onDownloadBrochure={handleOpenBrochure} />;
          case 'properties': return <PropertiesPage onViewDetails={handleViewProject} onNavigate={handleNavigate} onDownloadBrochure={handleOpenBrochure} initialFilters={viewParams} />;
          case 'property_details': return selectedProject ? <PropertyDetails project={selectedProject} onBack={() => handleNavigate('properties')} onNavigate={handleNavigate} onDownloadBrochure={handleOpenBrochure} /> : null;
          case 'house_details': return selectedProject ? <HouseDetails project={selectedProject} onBack={() => handleNavigate('service_construction')} onNavigate={handleNavigate} /> : null;
          case 'projects_hub': return <ProjectsHub onNavigate={handleNavigate} />;
          case 'service_construction': return <ConstructionPage onNavigate={handleNavigate} onDownloadBrochure={handleOpenBrochure} initialData={viewParams} onViewDetails={handleViewProject} />;
          case 'service_interiors': return <InteriorsPage onNavigate={handleNavigate} />;
          case 'service_landscaping': return <LandscapingPage onNavigate={handleNavigate} />;
          case 'service_walls': return <PerimeterWallsPage onNavigate={handleNavigate} />;
          case 'process': return <ProcessPage onNavigate={handleNavigate} />;
          case 'about': return <AboutPage onDownloadBrochure={handleOpenBrochure} onNavigate={handleNavigate} />;
          case 'contact': return <ContactPage initialData={viewParams} onDownloadBrochure={handleOpenBrochure} />;
          case 'legal': return <LegalPage type={viewParams.type} onNavigate={handleNavigate} />;
      }

      // 2. Dynamic Routes
      const dynamicPage = pages.find(p => p.id === currentView);
      if (dynamicPage) {
          return <DynamicPage page={dynamicPage} onNavigate={handleNavigate} onDownloadBrochure={handleOpenBrochure} />;
      }

      // 3. Fallback
      return <HomePage onNavigate={handleNavigate} onDownloadBrochure={handleOpenBrochure} />;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header onNavigate={handleNavigate} />
      <main>
        {renderMainContent()}
      </main>
      <Footer 
        onNavigate={handleNavigate} 
        onDownloadBrochure={handleOpenBrochure}
        showCTA={currentView !== 'properties' && currentView !== 'legal'}
      />
      <WhatsAppButton />
      <ChatWidget />
      <BrochureModal 
        isOpen={isBrochureModalOpen} 
        onClose={() => setIsBrochureModalOpen(false)} 
      />
    </div>
  );
};

const App: React.FC = () => {
    return (
        <DataProvider>
            <AppContent />
        </DataProvider>
    );
};

export default App;