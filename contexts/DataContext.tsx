import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    FEATURED_PROJECTS as INITIAL_PROJECTS, 
    HOUSE_TYPES as INITIAL_HOUSES,
    TEAM_MEMBERS as INITIAL_TEAM,
    CONSTRUCTION_PROJECTS as INITIAL_CONSTRUCTION,
    INTERIOR_PROJECTS as INITIAL_INTERIORS,
    LANDSCAPING_PROJECTS as INITIAL_LANDSCAPING,
    WALL_PROJECTS as INITIAL_WALLS,
    TESTIMONIALS as INITIAL_TESTIMONIALS,
    PARTNERS as INITIAL_PARTNERS,
    STATS as INITIAL_STATS,
    PROCESS_FAQS as INITIAL_FAQS
} from '../constants';
import { Project, HouseType, TeamMember, PortfolioItem, Inquiry, KnowledgeBaseItem, SiteConfig, Testimonial, Partner, Stat, FAQItem, PageStructure, PageSection, GlobalDesign, MediaItem, ActivityLog } from '../types';

interface DataContextType {
    // Data States
    projects: Project[];
    houseTypes: HouseType[];
    teamMembers: TeamMember[];
    portfolio: PortfolioItem[]; 
    testimonials: Testimonial[];
    partners: Partner[];
    stats: Stat[];
    faqs: FAQItem[];
    inquiries: Inquiry[];
    knowledgeBase: KnowledgeBaseItem[];
    siteConfig: SiteConfig;
    pages: PageStructure[];
    globalDesign: GlobalDesign;
    mediaLibrary: MediaItem[]; 
    activityLogs: ActivityLog[]; 
    
    // Theme
    theme: 'light' | 'dark';
    toggleTheme: () => void;

    // CRUD Actions
    updateProject: (id: string, data: Partial<Project>) => void;
    addProject: (project: Project) => void;
    deleteProject: (id: string) => void;
    
    updateHouse: (id: string, data: Partial<HouseType>) => void;
    addHouse: (house: HouseType) => void;
    deleteHouse: (id: string) => void;

    updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
    addTeamMember: (member: TeamMember) => void;
    deleteTeamMember: (id: string) => void;

    updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
    addTestimonial: (item: Testimonial) => void;
    deleteTestimonial: (id: string) => void;

    updatePortfolioItem: (id: string, data: Partial<PortfolioItem>) => void;
    addPortfolioItem: (item: PortfolioItem) => void;
    deletePortfolioItem: (id: string) => void;

    updatePartner: (id: string, data: Partial<Partner>) => void;
    addPartner: (item: Partner) => void;
    deletePartner: (id: string) => void;

    updateStat: (id: string, data: Partial<Stat>) => void;
    
    addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) => void;
    updateInquiryStatus: (id: string, status: 'New' | 'Read' | 'Contacted') => void;
    deleteInquiry: (id: string) => void;

    addKnowledgeBaseItem: (item: Omit<KnowledgeBaseItem, 'id'>) => void;
    updateKnowledgeBaseItem: (id: string, content: string) => void;
    deleteKnowledgeBaseItem: (id: string) => void;

    updateSiteConfig: (config: Partial<SiteConfig>) => void;
    updateGlobalDesign: (design: Partial<GlobalDesign>) => void;
    
    // Media Actions
    addMedia: (file: File) => Promise<string>;
    deleteMedia: (id: string) => void;

    // Page Builder Actions
    addPage: (page: PageStructure) => void;
    updatePage: (id: string, page: Partial<PageStructure>) => void;
    deletePage: (id: string) => void;

    importProjectsFromCSV: (csvText: string) => void;
    resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_CONFIG: SiteConfig = {
    heroTitle: "Building Dreams Into Homes.",
    heroSubtitle: "Secure affordable land, access modern home designs, and get tailored construction solutions anywhere in Kenya.",
    contactPhone: "(+254) 709 202 299",
    contactEmail: "info@myploti.co.ke",
    contactAddress: "View Park Towers, 14th Floor, Uhuru Highway, Nairobi"
};

const INITIAL_DESIGN: GlobalDesign = {
    primaryColor: '#007636',
    secondaryColor: '#b96807',
    fontFamily: 'Poppins',
    borderRadius: '0.75rem' // rounded-xl
};

const INITIAL_KB: KnowledgeBaseItem[] = [
    { id: '1', topic: 'Location', content: 'We have plots in Joska, Juja, Kitengela, Ngong, and Malindi.' },
    { id: '2', topic: 'Pricing', content: 'Our plots range from KES 350,000 to KES 2.5M depending on location.' },
    { id: '3', topic: 'Site Visits', content: 'We offer free site visits on Wednesdays and Saturdays with transport from Nairobi CBD.' }
];

const INITIAL_PAGES: PageStructure[] = [
    {
        id: 'home',
        title: 'Home',
        isSystem: true,
        meta: { title: 'Home | MyPloti', description: 'Affordable Land & Construction in Kenya' },
        sections: [
            { id: 's_hero', type: 'Hero', content: { title: 'Building Dreams Into Homes.', subtitle: 'Secure affordable land, access modern home designs, and get tailored construction solutions.', bgImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80', buttonText: 'Book a Site Visit', buttonLink: 'contact' } },
            { id: 's_featured', type: 'ProjectGrid', content: { title: 'Featured Projects' } },
            { id: 's_why', type: 'WhyChooseUs', content: { title: 'Your Trusted Partner' } },
            { id: 's_construct', type: 'ConstructionTeaser', content: { title: 'Build With Us' } },
            { id: 's_how', type: 'HowItWorks', content: { title: 'How It Works' } },
            { id: 's_social', type: 'Testimonials', content: {} }
        ]
    },
    {
        id: 'about',
        title: 'About Us',
        isSystem: true,
        sections: [
            { id: 's_about_hero', type: 'Hero', content: { title: 'Who We Are', subtitle: 'Delivering trusted land and construction solutions across Kenya.', bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80', buttonText: 'Contact Us' } },
            { id: 's_rich', type: 'RichText', content: { heading: 'Our Mission', body: 'To provide affordable, verified land and modern homes, making property ownership simple, transparent, and accessible for every Kenyan.' } },
            { id: 's_team', type: 'TeamGrid', content: {} },
            { id: 's_cta', type: 'CallToAction', content: { title: 'Become a Partner', subtitle: 'Join us in building the future of Kenya.', buttonText: 'Partner With Us', link: 'contact' } }
        ]
    },
    {
        id: 'projects_hub',
        title: 'Our Projects',
        isSystem: true,
        sections: [
            { id: 's_hub_hero', type: 'Hero', content: { title: 'Our Expertise', subtitle: 'Comprehensive construction solutions tailored to your needs.', bgImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80', buttonText: 'Explore Services' } },
            { id: 's_services', type: 'ServicesGrid', content: {} },
            { id: 's_cta_hub', type: 'CallToAction', content: { title: 'Not sure what you need?', subtitle: 'Talk to our experts today.', buttonText: 'Consultation', link: 'contact' } }
        ]
    },
    {
        id: 'contact',
        title: 'Contact',
        isSystem: true,
        sections: [
            { id: 's_contact_form', type: 'ContactForm', content: {} },
            { id: 's_map', type: 'Map', content: {} }
        ]
    }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // --- STATE INITIALIZATION ---
    const loadState = (key: string, fallback: any) => {
        try {
            const saved = localStorage.getItem(key);
            if (!saved) return fallback;
            const parsed = JSON.parse(saved);
            return parsed !== null ? parsed : fallback;
        } catch (e) {
            console.error(`Error loading state for ${key}`, e);
            return fallback;
        }
    };

    const [projects, setProjects] = useState<Project[]>(() => loadState('myploti_projects', INITIAL_PROJECTS));
    const [houseTypes, setHouseTypes] = useState<HouseType[]>(() => loadState('myploti_houses', INITIAL_HOUSES));
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => loadState('myploti_team', INITIAL_TEAM));
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => loadState('myploti_portfolio', [
        ...INITIAL_CONSTRUCTION, ...INITIAL_INTERIORS, ...INITIAL_LANDSCAPING, ...INITIAL_WALLS
    ]));
    const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadState('myploti_testimonials', INITIAL_TESTIMONIALS));
    const [partners, setPartners] = useState<Partner[]>(() => loadState('myploti_partners', INITIAL_PARTNERS));
    const [stats, setStats] = useState<Stat[]>(() => loadState('myploti_stats', INITIAL_STATS));
    const [faqs, setFaqs] = useState<FAQItem[]>(() => loadState('myploti_faqs', INITIAL_FAQS));
    const [inquiries, setInquiries] = useState<Inquiry[]>(() => loadState('myploti_inquiries', []));
    const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseItem[]>(() => loadState('myploti_kb', INITIAL_KB));
    const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => loadState('myploti_config', INITIAL_CONFIG));
    const [globalDesign, setGlobalDesign] = useState<GlobalDesign>(() => loadState('myploti_design', INITIAL_DESIGN));
    const [pages, setPages] = useState<PageStructure[]>(() => loadState('myploti_pages', INITIAL_PAGES));
    const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => loadState('myploti_media', []));
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => loadState('myploti_logs', []));

    // Theme State
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
            // Default to light, or system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // --- PERSISTENCE ---
    useEffect(() => localStorage.setItem('myploti_projects', JSON.stringify(projects)), [projects]);
    useEffect(() => localStorage.setItem('myploti_houses', JSON.stringify(houseTypes)), [houseTypes]);
    useEffect(() => localStorage.setItem('myploti_team', JSON.stringify(teamMembers)), [teamMembers]);
    useEffect(() => localStorage.setItem('myploti_portfolio', JSON.stringify(portfolio)), [portfolio]);
    useEffect(() => localStorage.setItem('myploti_testimonials', JSON.stringify(testimonials)), [testimonials]);
    useEffect(() => localStorage.setItem('myploti_partners', JSON.stringify(partners)), [partners]);
    useEffect(() => localStorage.setItem('myploti_stats', JSON.stringify(stats)), [stats]);
    useEffect(() => localStorage.setItem('myploti_faqs', JSON.stringify(faqs)), [faqs]);
    useEffect(() => localStorage.setItem('myploti_inquiries', JSON.stringify(inquiries)), [inquiries]);
    useEffect(() => localStorage.setItem('myploti_kb', JSON.stringify(knowledgeBase)), [knowledgeBase]);
    useEffect(() => localStorage.setItem('myploti_config', JSON.stringify(siteConfig)), [siteConfig]);
    useEffect(() => localStorage.setItem('myploti_design', JSON.stringify(globalDesign)), [globalDesign]);
    useEffect(() => localStorage.setItem('myploti_pages', JSON.stringify(pages)), [pages]);
    useEffect(() => localStorage.setItem('myploti_media', JSON.stringify(mediaLibrary)), [mediaLibrary]);
    useEffect(() => localStorage.setItem('myploti_logs', JSON.stringify(activityLogs)), [activityLogs]);

    // --- LOGGING HELPER ---
    const logAction = (action: string, module: string, details: string) => {
        const newLog: ActivityLog = {
            id: Date.now().toString(),
            action,
            module,
            details,
            timestamp: new Date().toLocaleString(),
            user: 'Admin'
        };
        setActivityLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
    };

    // --- HELPER ACTIONS ---
    const updateItem = (setter: any, id: string, data: any, moduleName: string = 'System') => {
        setter((prev: any[]) => prev.map(i => i.id === id ? { ...i, ...data } : i));
        logAction('Update', moduleName, `Updated item ID: ${id}`);
    };
    const addItem = (setter: any, item: any, moduleName: string = 'System') => {
        setter((prev: any[]) => [item, ...prev]);
        logAction('Create', moduleName, `Created new item`);
    };
    const deleteItem = (setter: any, id: string, moduleName: string = 'System') => {
        setter((prev: any[]) => prev.filter(i => i.id !== id));
        logAction('Delete', moduleName, `Deleted item ID: ${id}`);
    };

    // --- EXPORTS ---
    const updateProject = (id: string, data: Partial<Project>) => updateItem(setProjects, id, data, 'Properties');
    const addProject = (project: Project) => addItem(setProjects, project, 'Properties');
    const deleteProject = (id: string) => deleteItem(setProjects, id, 'Properties');

    const updateHouse = (id: string, data: Partial<HouseType>) => updateItem(setHouseTypes, id, data, 'House Designs');
    const addHouse = (house: HouseType) => addItem(setHouseTypes, house, 'House Designs');
    const deleteHouse = (id: string) => deleteItem(setHouseTypes, id, 'House Designs');

    const updateTeamMember = (id: string, data: Partial<TeamMember>) => updateItem(setTeamMembers, id, data, 'Team');
    const addTeamMember = (member: TeamMember) => addItem(setTeamMembers, member, 'Team');
    const deleteTeamMember = (id: string) => deleteItem(setTeamMembers, id, 'Team');

    const updatePortfolioItem = (id: string, data: Partial<PortfolioItem>) => updateItem(setPortfolio, id, data, 'Portfolio');
    const addPortfolioItem = (item: PortfolioItem) => addItem(setPortfolio, item, 'Portfolio');
    const deletePortfolioItem = (id: string) => deleteItem(setPortfolio, id, 'Portfolio');

    const updateTestimonial = (id: string, data: Partial<Testimonial>) => updateItem(setTestimonials, id, data, 'Testimonials');
    const addTestimonial = (item: Testimonial) => addItem(setTestimonials, item, 'Testimonials');
    const deleteTestimonial = (id: string) => deleteItem(setTestimonials, id, 'Testimonials');

    const updatePartner = (id: string, data: Partial<Partner>) => updateItem(setPartners, id, data, 'Partners');
    const addPartner = (item: Partner) => addItem(setPartners, item, 'Partners');
    const deletePartner = (id: string) => deleteItem(setPartners, id, 'Partners');

    const updateStat = (id: string, data: Partial<Stat>) => updateItem(setStats, id, data, 'Stats');

    const addInquiry = (data: Omit<Inquiry, 'id' | 'date' | 'status'>) => {
        const newInquiry: Inquiry = {
            ...data,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            status: 'New'
        };
        setInquiries(prev => [newInquiry, ...prev]);
        logAction('New Inquiry', 'CRM', `From: ${data.name}`);
    };
    const updateInquiryStatus = (id: string, status: 'New' | 'Read' | 'Contacted') => updateItem(setInquiries, id, { status }, 'CRM');
    const deleteInquiry = (id: string) => deleteItem(setInquiries, id, 'CRM');

    const addKnowledgeBaseItem = (item: Omit<KnowledgeBaseItem, 'id'>) => {
        setKnowledgeBase(prev => [...prev, { ...item, id: Date.now().toString() }]);
        logAction('Create', 'AI Knowledge', `Added topic: ${item.topic}`);
    };
    const updateKnowledgeBaseItem = (id: string, content: string) => updateItem(setKnowledgeBase, id, { content }, 'AI Knowledge');
    const deleteKnowledgeBaseItem = (id: string) => deleteItem(setKnowledgeBase, id, 'AI Knowledge');

    const updateSiteConfig = (config: Partial<SiteConfig>) => {
        setSiteConfig(prev => ({ ...prev, ...config }));
        logAction('Update', 'Config', 'Updated global site configuration');
    };
    const updateGlobalDesign = (design: Partial<GlobalDesign>) => {
        setGlobalDesign(prev => ({ ...prev, ...design }));
        logAction('Update', 'Design', 'Updated global design system');
    };

    const addPage = (page: PageStructure) => addItem(setPages, page, 'Pages');
    const updatePage = (id: string, data: Partial<PageStructure>) => updateItem(setPages, id, data, 'Pages');
    const deletePage = (id: string) => deleteItem(setPages, id, 'Pages');

    // --- MEDIA ACTIONS ---
    const addMedia = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (file.size > 2000000) { // 2MB Limit for localStorage sanity
                alert("File too large (Max 2MB).");
                reject("File too large");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                const newItem: MediaItem = {
                    id: 'media-' + Date.now(),
                    url: base64,
                    name: file.name,
                    type: file.type.startsWith('image') ? 'image' : 'document',
                    date: new Date().toLocaleDateString(),
                    size: (file.size / 1024).toFixed(1) + ' KB'
                };
                setMediaLibrary(prev => [newItem, ...prev]);
                logAction('Upload', 'Media', `Uploaded ${file.name}`);
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const deleteMedia = (id: string) => deleteItem(setMediaLibrary, id, 'Media');

    const importProjectsFromCSV = (csvText: string) => {
        try {
            const lines = csvText.split('\n');
            const newProjects: Project[] = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                const parts = line.split(',');
                if (parts.length >= 4) {
                    const price = parseInt(parts[2]) || 0;
                    newProjects.push({
                        id: 'csv-' + Date.now() + '-' + i,
                        title: parts[0],
                        location: parts[1],
                        price: price,
                        priceStr: `KES ${price.toLocaleString()}`,
                        description: parts[3],
                        imageUrl: 'https://via.placeholder.com/800', 
                        images: [],
                        features: ['Imported'],
                        type: 'Residential',
                        size: '50x100',
                        purpose: 'Investment',
                        amenities: []
                    });
                }
            }
            setProjects(prev => [...prev, ...newProjects]);
            alert(`Successfully imported ${newProjects.length} projects.`);
            logAction('Import', 'Properties', `Imported ${newProjects.length} from CSV`);
        } catch (e) {
            alert("Error parsing CSV.");
        }
    };

    const resetData = () => {
        if(confirm("Are you sure? This will revert all changes to default.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <DataContext.Provider value={{
            projects, houseTypes, teamMembers, portfolio, testimonials, partners, stats, faqs, inquiries, knowledgeBase, siteConfig, pages, globalDesign, mediaLibrary, activityLogs,
            theme, toggleTheme,
            updateProject, addProject, deleteProject,
            updateHouse, addHouse, deleteHouse,
            updateTeamMember, addTeamMember, deleteTeamMember,
            updatePortfolioItem, addPortfolioItem, deletePortfolioItem,
            updateTestimonial, addTestimonial, deleteTestimonial,
            updatePartner, addPartner, deletePartner,
            updateStat,
            addInquiry, updateInquiryStatus, deleteInquiry,
            addKnowledgeBaseItem, updateKnowledgeBaseItem, deleteKnowledgeBaseItem,
            updateSiteConfig, updateGlobalDesign,
            addMedia, deleteMedia,
            importProjectsFromCSV,
            addPage, updatePage, deletePage,
            resetData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};