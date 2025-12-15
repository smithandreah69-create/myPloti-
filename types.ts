import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  location: string;
  price: number; // Numeric for calculations
  priceStr: string; // Display string
  imageUrl: string;
  images: string[];
  description: string;
  features: string[];
  type: 'Residential' | 'Commercial' | 'House' | 'Wall';
  size: string;
  purpose: 'Investment' | 'Settlement' | 'Commercial';
  amenities: string[];
  // House specific fields
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  status?: 'Ready' | 'Off-plan';
}

export interface PortfolioItem {
  id: string;
  category: 'Construction' | 'Interior' | 'Landscaping' | 'Wall';
  title: string;
  location: string;
  description: string;
  mainImage: string;
  gallery: string[];
  specs: { label: string; value: string }[];
  completionDate?: string;
  client?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; 
  content: string;
  imageUrl: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface HouseType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPriceStr: string;
  features: string[];
}

export interface CompletedProject {
    id: string;
    title: string;
    location: string;
    imageUrl: string;
}

export interface Partner {
    id: string;
    name: string;
    logoUrl: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

export interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

// --- NEW ADMIN TYPES ---

export interface Inquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  purpose: string;
  message: string;
  status: 'New' | 'Read' | 'Contacted';
  location: string;
}

export interface KnowledgeBaseItem {
  id: string;
  topic: string;
  content: string;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export interface GlobalDesign {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string; // e.g., '0.5rem'
}

export interface MediaItem {
  id: string;
  url: string; // Base64 or external URL
  name: string;
  type: 'image' | 'document';
  date: string;
  size?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  module: string; // e.g., 'Properties', 'Pages'
  details: string;
  timestamp: string;
  user: string;
}

// --- PAGE BUILDER TYPES ---

export type SectionType = 
  | 'Hero' 
  | 'RichText' 
  | 'Features' 
  | 'ProjectGrid' 
  | 'ContactForm' 
  | 'Testimonials' 
  | 'CallToAction'
  | 'TeamGrid'
  | 'FAQ'
  | 'WhyChooseUs'      
  | 'ConstructionTeaser' 
  | 'HowItWorks'       
  | 'Stats'            
  | 'Map'              
  | 'ServicesGrid';    

export interface SectionStyle {
  backgroundColor?: string;
  textColor?: string;
  paddingTop?: string; // e.g., 'py-20' or px value
  paddingBottom?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface PageSection {
  id: string;
  type: SectionType;
  content: any; 
  style?: SectionStyle; // New: Design tab properties
}

export interface PageMeta {
  title?: string;
  description?: string;
  ogImage?: string;
}

export interface PageStructure {
  id: string; 
  title: string; 
  meta?: PageMeta; // New: SEO Settings
  sections: PageSection[];
  isSystem?: boolean; 
}