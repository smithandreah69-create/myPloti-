import React, { useState, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { Button } from './Button';
import { ViewState } from '../App';
import { 
    Trash2, Edit2, Plus, Save, X, LogOut, 
    LayoutDashboard, MessageSquare, Database, Settings, 
    Upload, FileText, CheckCircle, BrainCircuit, Users, Star, Briefcase, Image as ImageIcon,
    Layout, ArrowUp, ArrowDown, Monitor, Palette, Globe, Layers, MoreHorizontal, Activity, List,
    Eye, Smartphone, Tablet, RotateCcw, RotateCw, ChevronDown, Cloud, Search, Check
} from 'lucide-react';
import { PageStructure, PageSection, SectionType, SectionStyle } from '../types';
import { DynamicPage } from './DynamicPage'; // Import for Preview Mode

interface AdminDashboardProps {
    onNavigate: (view: ViewState) => void;
}

type TabType = 'dashboard' | 'listings' | 'portfolio' | 'social' | 'team' | 'inquiries' | 'kb' | 'config' | 'builder' | 'design' | 'media';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
    const { 
        projects, houseTypes, inquiries, knowledgeBase, siteConfig, teamMembers, testimonials, partners, stats, portfolio, pages, globalDesign, mediaLibrary, activityLogs,
        updateProject, addProject, deleteProject, 
        updateHouse, addHouse, deleteHouse,
        updateInquiryStatus, deleteInquiry,
        addKnowledgeBaseItem, updateKnowledgeBaseItem, deleteKnowledgeBaseItem,
        updateSiteConfig, updateGlobalDesign,
        updateTeamMember, addTeamMember, deleteTeamMember,
        updateTestimonial, addTestimonial, deleteTestimonial,
        updatePartner, addPartner, deletePartner,
        updateStat,
        updatePortfolioItem, addPortfolioItem, deletePortfolioItem,
        addMedia, deleteMedia,
        addPage, updatePage, deletePage,
        resetData 
    } = useData();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [listingType, setListingType] = useState<'land' | 'houses'>('land');
    
    // Editor States
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>(null);
    const [editorType, setEditorType] = useState<string>(''); 
    
    // Media Picker State
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const [targetFieldForMedia, setTargetFieldForMedia] = useState<string>('');

    // Page Builder States
    const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [sectionEditorTab, setSectionEditorTab] = useState<'content' | 'design'>('content');
    const [pageSettingsId, setPageSettingsId] = useState<string | null>(null); 

    // Studio States
    const [previewMode, setPreviewMode] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [lastSaved, setLastSaved] = useState<string>('Autosave on');

    // Effect to simulate auto-save feedback
    useEffect(() => {
        setLastSaved('Saving...');
        const timer = setTimeout(() => setLastSaved('Autosave on'), 1500);
        return () => clearTimeout(timer);
    }, [projects, pages, siteConfig, globalDesign, portfolio, teamMembers]); // Watch for changes

    const triggerSave = () => {
        setLastSaved('Saving...');
    };

    // --- AUTHENTICATION ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') setIsAuthenticated(true);
        else alert('Incorrect password');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
                <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#007636]">MyPloti Studio</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Passcode</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#007636]" placeholder="Enter admin passcode" />
                        </div>
                        <Button fullWidth type="submit">Enter Studio</Button>
                        <button type="button" onClick={() => onNavigate('home')} className="w-full text-center text-gray-500 text-sm hover:underline">Back to Site</button>
                    </form>
                </div>
            </div>
        );
    }

    // --- PREVIEW MODE RENDERER ---
    if (previewMode) {
        const pageToPreview = pages.find(p => p.id === selectedPageId) || pages[0];
        return (
            <div className="bg-white min-h-screen relative z-50">
                <div className="fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white flex items-center justify-between px-4 z-[60] shadow-lg">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm bg-gray-800 px-2 py-1 rounded">Preview Mode</span>
                        <span className="text-gray-400 text-xs">Viewing: {pageToPreview.title}</span>
                    </div>
                    <Button variant="white" className="py-1 px-4 h-8 text-xs" onClick={() => setPreviewMode(false)}>Exit Preview</Button>
                </div>
                <div className="pt-14 h-screen overflow-y-auto">
                    <DynamicPage page={pageToPreview} onNavigate={() => {}} onDownloadBrochure={() => {}} />
                </div>
            </div>
        );
    }

    // --- HANDLERS ---
    const startEdit = (item: any, type: string) => {
        setEditingId(item.id);
        setEditForm({ ...item });
        setEditorType(type);
    };

    const handleSave = () => {
        triggerSave();
        const isNew = editingId?.startsWith('new');
        const id = isNew ? Date.now().toString() : editingId!;
        const data = { ...editForm, id }; 

        if (editorType === 'land') { isNew ? addProject(data) : updateProject(id, data); }
        else if (editorType === 'house') { isNew ? addHouse(data) : updateHouse(id, data); }
        else if (editorType === 'team') { isNew ? addTeamMember(data) : updateTeamMember(id, data); }
        else if (editorType === 'testimonial') { isNew ? addTestimonial(data) : updateTestimonial(id, data); }
        else if (editorType === 'partner') { isNew ? addPartner(data) : updatePartner(id, data); }
        else if (editorType === 'portfolio') { isNew ? addPortfolioItem(data) : updatePortfolioItem(id, data); }
        else if (editorType === 'stat') { updateStat(id, data); }

        setEditingId(null); setEditForm(null); setEditorType('');
    };

    const handleDelete = (id: string, type: string) => {
        if (!confirm('Delete this item?')) return;
        triggerSave();
        if (type === 'land') deleteProject(id);
        else if (type === 'house') deleteHouse(id);
        else if (type === 'team') deleteTeamMember(id);
        else if (type === 'testimonial') deleteTestimonial(id);
        else if (type === 'partner') deletePartner(id);
        else if (type === 'portfolio') deletePortfolioItem(id);
        else if (type === 'page') deletePage(id);
    };

    const handlePublish = () => {
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            alert("Site Published Successfully! All changes are live.");
        }, 1500);
    };

    // --- MEDIA PICKER LOGIC ---
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await addMedia(file);
            } catch (err) {
                console.error(err);
            }
        }
    };

    const openMediaPicker = (field: string) => {
        setTargetFieldForMedia(field);
        setIsMediaPickerOpen(true);
    };

    const handleSelectMedia = (url: string) => {
        triggerSave();
        if (activeTab === 'builder' && activeSectionId && selectedPageId) {
            const page = pages.find(p => p.id === selectedPageId);
            if(page) {
                const updatedSections = page.sections.map(s => 
                    s.id === activeSectionId ? { ...s, content: { ...s.content, [targetFieldForMedia]: url } } : s
                );
                updatePage(selectedPageId, { sections: updatedSections });
            }
        } else {
            setEditForm({ ...editForm, [targetFieldForMedia]: url });
        }
        setIsMediaPickerOpen(false);
    };

    // --- PAGE BUILDER LOGIC ---
    const handleAddPage = () => {
        const id = prompt("Enter page URL slug (e.g. 'news') - lowercase, no spaces:");
        if(!id) return;
        if(pages.find(p => p.id === id)) { alert("Page ID exists"); return; }
        const newPage: PageStructure = {
            id: id.toLowerCase().replace(/\s/g, '-'),
            title: id.charAt(0).toUpperCase() + id.slice(1),
            meta: { title: id.charAt(0).toUpperCase() + id.slice(1), description: '' },
            sections: [{ id: 's1', type: 'Hero', content: { title: 'New Page', subtitle: 'Subtitle goes here', bgImage: 'https://via.placeholder.com/1920x600' }}]
        };
        addPage(newPage);
        setSelectedPageId(newPage.id);
        triggerSave();
    };

    const handleAddSection = (type: SectionType) => {
        if(!selectedPageId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        
        let defaultContent: any = {};
        if (type === 'Features') defaultContent = { title: 'Features', items: [{title: 'Feature 1', desc: 'Desc'}] };
        else if (type === 'WhyChooseUs') defaultContent = { title: 'Why Choose Us', reasons: [{title: 'Reason', description: 'Desc'}] };
        else defaultContent = getDefaultContentForType(type);

        const newSection: PageSection = {
            id: 's-' + Date.now(),
            type,
            content: defaultContent,
            style: { paddingTop: '80', paddingBottom: '80', backgroundColor: 'bg-white', textAlign: 'left' }
        };
        updatePage(selectedPageId, { sections: [...page.sections, newSection] });
        triggerSave();
    };

    const handleMoveSection = (direction: 'up' | 'down', index: number) => {
        if(!selectedPageId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        const newSections = [...page.sections];
        if(direction === 'up' && index > 0) {
            [newSections[index], newSections[index-1]] = [newSections[index-1], newSections[index]];
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index+1]] = [newSections[index+1], newSections[index]];
        }
        updatePage(selectedPageId, { sections: newSections });
        triggerSave();
    };

    const handleDeleteSection = (sectionId: string) => {
        if(!selectedPageId || !confirm("Remove section?")) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        updatePage(selectedPageId, { sections: page.sections.filter(s => s.id !== sectionId) });
        setActiveSectionId(null);
        triggerSave();
    };

    const handleUpdateSectionContent = (field: string, value: any) => {
        if(!selectedPageId || !activeSectionId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        const updatedSections = page.sections.map(s => 
            s.id === activeSectionId ? { ...s, content: { ...s.content, [field]: value } } : s
        );
        updatePage(selectedPageId, { sections: updatedSections });
        triggerSave();
    };

    const handleUpdateNestedContent = (arrayField: string, index: number, itemField: string, value: any) => {
        if(!selectedPageId || !activeSectionId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        const section = page.sections.find(s => s.id === activeSectionId);
        if (!section) return;

        const newArray = [...(section.content[arrayField] || [])];
        newArray[index] = { ...newArray[index], [itemField]: value };

        const updatedSections = page.sections.map(s => 
            s.id === activeSectionId ? { ...s, content: { ...s.content, [arrayField]: newArray } } : s
        );
        updatePage(selectedPageId, { sections: updatedSections });
        triggerSave();
    };

    const handleAddNestedItem = (arrayField: string, template: any) => {
        if(!selectedPageId || !activeSectionId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        const section = page.sections.find(s => s.id === activeSectionId);
        if (!section) return;

        const newArray = [...(section.content[arrayField] || []), template];
        const updatedSections = page.sections.map(s => 
            s.id === activeSectionId ? { ...s, content: { ...s.content, [arrayField]: newArray } } : s
        );
        updatePage(selectedPageId, { sections: updatedSections });
        triggerSave();
    };

    const handleDeleteNestedItem = (arrayField: string, index: number) => {
        if(!selectedPageId || !activeSectionId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        const section = page.sections.find(s => s.id === activeSectionId);
        if (!section) return;

        const newArray = section.content[arrayField].filter((_:any, i:number) => i !== index);
        const updatedSections = page.sections.map(s => 
            s.id === activeSectionId ? { ...s, content: { ...s.content, [arrayField]: newArray } } : s
        );
        updatePage(selectedPageId, { sections: updatedSections });
        triggerSave();
    };

    const handleUpdateSectionStyle = (field: keyof SectionStyle, value: any) => {
        if(!selectedPageId || !activeSectionId) return;
        const page = pages.find(p => p.id === selectedPageId);
        if(!page) return;
        const updatedSections = page.sections.map(s => 
            s.id === activeSectionId ? { ...s, style: { ...(s.style || {}), [field]: value } } : s
        );
        updatePage(selectedPageId, { sections: updatedSections });
        triggerSave();
    };

    const handleUpdatePageMeta = (field: string, value: string) => {
        if(!pageSettingsId) return;
        const page = pages.find(p => p.id === pageSettingsId);
        if(!page) return;
        updatePage(pageSettingsId, { meta: { ...(page.meta || {}), [field]: value } });
        triggerSave();
    };

    const getDefaultContentForType = (type: SectionType) => {
        switch(type) {
            case 'Hero': return { title: 'Hero Title', subtitle: 'Subtitle text', bgImage: 'https://via.placeholder.com/1920x600', buttonText: 'Click Me', buttonLink: 'contact' };
            case 'RichText': return { heading: 'Section Heading', body: 'Enter your paragraph text here...' };
            case 'Features': return { title: 'Our Features', items: [{title: 'Feature 1', desc: 'Description'}] };
            case 'CallToAction': return { title: 'Call To Action', subtitle: 'Do something now', buttonText: 'Go', link: 'contact' };
            case 'ContactForm': return { title: 'Contact Us', subtitle: 'Get in touch' };
            case 'WhyChooseUs': return { title: 'Your Trusted Partner', subtitle: 'Why Choose MyPloti' };
            case 'HowItWorks': return { title: 'How It Works', subtitle: 'Simple steps' };
            case 'ConstructionTeaser': return { title: 'Build With Us', body: 'Let us build your dream home.' };
            default: return {};
        }
    };

    // --- COMPONENTS ---
    const SidebarItem = ({ id, label, icon: Icon }: any) => (
        <button onClick={() => { setActiveTab(id); setEditingId(null); setSelectedPageId(null); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === id ? 'bg-[#007636] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Icon size={18} /> <span className="font-medium text-sm">{label}</span>
        </button>
    );

    const InputField = ({ label, field, type = 'text', rows = 0 }: any) => (
        <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
            {rows > 0 ? (
                <textarea value={editForm[field] || ''} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-[#007636] outline-none" rows={rows} />
            ) : (
                <input type={type} value={editForm[field] || ''} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })} className="w-full p-2 border border-gray-300 rounded focus:border-[#007636] outline-none" />
            )}
        </div>
    );

    const ImagePicker = ({ label, field = 'imageUrl' }: any) => (
        <div className="mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
            <div className="flex gap-2 items-center">
                {(editForm && editForm[field]) ? (
                    <img src={editForm[field]} className="w-16 h-16 rounded object-cover border border-gray-200" />
                ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center border border-dashed border-gray-300 text-gray-400"><ImageIcon size={20} /></div>
                )}
                <div className="flex-grow">
                     <div className="flex gap-2">
                        <input type="text" value={editForm ? editForm[field] : ''} onChange={e => setEditForm({...editForm, [field]: e.target.value})} className="flex-grow p-2 border rounded text-xs" placeholder="Image URL" />
                        <button onClick={() => openMediaPicker(field)} className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap">Select</button>
                     </div>
                </div>
            </div>
        </div>
    );

    const SectionImagePicker = ({ label, field }: { label: string, field: string }) => {
        const page = pages.find(p => p.id === selectedPageId);
        const section = page?.sections.find(s => s.id === activeSectionId);
        const value = section?.content[field] || '';

        return (
            <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
                <div className="flex gap-2 items-center">
                    {value && <img src={value} className="w-16 h-16 rounded object-cover border border-gray-200" />}
                    <div className="flex-grow">
                        <div className="flex gap-2">
                            <input type="text" value={value} onChange={e => handleUpdateSectionContent(field, e.target.value)} className="flex-grow p-2 border rounded text-xs" placeholder="Image URL" />
                            <button onClick={() => openMediaPicker(field)} className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap">Select</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-sm overflow-hidden">
            {/* --- WIX STUDIO STYLE DARK HEADER --- */}
            <header className="h-14 bg-[#111111] border-b border-gray-800 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
                {/* Left: Page Selector & Autosave */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors" onClick={() => setActiveTab('builder')}>
                        <span className="font-medium text-sm text-gray-200">
                            {pages.find(p => p.id === selectedPageId)?.title || 'Home'}
                        </span>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                    <div className="h-4 w-px bg-gray-700"></div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        {lastSaved === 'Saving...' ? <Activity size={14} className="animate-spin text-blue-400"/> : <Cloud size={14} />}
                        <span>{lastSaved}</span>
                    </div>
                </div>

                {/* Center: Breakpoints & Canvas Info */}
                <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
                    <div className="flex bg-[#2a2a2a] rounded p-0.5">
                        <button className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Desktop"><Monitor size={16} /></button>
                        <button className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Tablet"><Tablet size={16} /></button>
                        <button className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white" title="Mobile"><Smartphone size={16} /></button>
                    </div>
                    <span className="text-xs text-gray-500 font-mono hidden md:block">1280px</span>
                    <span className="text-xs text-gray-500 font-mono hidden md:block">100%</span>
                </div>

                {/* Right: Actions (No Upgrade Button) */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Undo"><RotateCcw size={16} /></button>
                    <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Redo"><RotateCw size={16} /></button>
                    <div className="h-4 w-px bg-gray-700 mx-1"></div>
                    <button className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Notifications"><Activity size={16} /></button>
                    <button
                        onClick={() => selectedPageId ? setPreviewMode(true) : alert("Select a page in Page Builder to preview")}
                        className="p-2 hover:bg-white/10 rounded text-gray-400 hover:text-white" title="Preview"
                    >
                        <Eye size={18} />
                    </button>
                    <Button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 h-8 text-xs font-semibold ml-2 rounded shadow-none border-none"
                    >
                        {isPublishing ? 'Publishing...' : 'Publish'}
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 pt-14 h-screen">
                {/* --- SIDEBAR --- */}
                <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto z-30">
                    <div className="p-4 space-y-1">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2 px-2">Main</div>
                        <SidebarItem id="dashboard" label="Overview" icon={LayoutDashboard} />
                        <SidebarItem id="inquiries" label="Inbox & CRM" icon={MessageSquare} />
                        
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-2">Site & Design</div>
                        <SidebarItem id="builder" label="Page Builder" icon={Layout} />
                        <SidebarItem id="design" label="Design System" icon={Palette} />
                        <SidebarItem id="media" label="Media Manager" icon={ImageIcon} />
                        
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-2">Content Collections</div>
                        <SidebarItem id="listings" label="Properties" icon={Database} />
                        <SidebarItem id="portfolio" label="Portfolio" icon={Briefcase} />
                        <SidebarItem id="team" label="Team Members" icon={Users} />
                        <SidebarItem id="social" label="Social Proof" icon={Star} />
                        <SidebarItem id="kb" label="AI Knowledge Base" icon={BrainCircuit} />
                        
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6 px-2">System</div>
                        <SidebarItem id="config" label="Configuration" icon={Settings} />
                    </div>
                    <div className="p-4 border-t border-gray-100 mt-auto bg-gray-50">
                        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium w-full p-2 rounded hover:bg-red-50 transition-colors">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </aside>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
                    {activeTab === 'builder' ? (
                        /* --- PAGE BUILDER INTERFACE --- */
                        <div className="flex h-full">
                            {/* Page Structure Panel */}
                            <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
                                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-700">Site Pages</h3>
                                    <button onClick={handleAddPage} className="p-1.5 bg-[#007636] text-white rounded hover:bg-[#005c2b]"><Plus size={16}/></button>
                                </div>
                                <div className="overflow-y-auto flex-grow p-2 space-y-1">
                                    {pages.map(page => (
                                        <div 
                                            key={page.id} 
                                            onClick={() => { setSelectedPageId(page.id); setActiveSectionId(null); }}
                                            className={`flex justify-between items-center p-3 rounded cursor-pointer group transition-colors ${selectedPageId === page.id ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' : 'hover:bg-gray-50 text-gray-700'}`}
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <FileText size={16} className="flex-shrink-0" />
                                                <span className="font-medium capitalize truncate">{page.title}</span>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={(e) => { e.stopPropagation(); setPageSettingsId(page.id); }} className="p-1 hover:bg-white rounded text-gray-400 hover:text-blue-600" title="SEO Settings"><Settings size={14}/></button>
                                                {!page.isSystem && (
                                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(page.id, 'page'); }} className="p-1 hover:bg-white rounded text-gray-400 hover:text-red-600" title="Delete Page"><Trash2 size={14}/></button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Canvas Area */}
                            <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-100 relative">
                                {selectedPageId ? (
                                    <>
                                        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
                                            <div>
                                                <h3 className="font-bold text-gray-800">{pages.find(p => p.id === selectedPageId)?.title}</h3>
                                                <p className="text-xs text-gray-500">Drag sections to reorder</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Desktop View"><Monitor size={18}/></button>
                                                <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Tablet View"><Tablet size={18}/></button>
                                                <button className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Mobile View"><Smartphone size={18}/></button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-grow overflow-y-auto p-8 flex justify-center">
                                            <div className="w-full max-w-4xl bg-white min-h-[800px] shadow-xl border border-gray-200 flex flex-col">
                                                <div className="p-4 border-b border-dashed border-gray-300 text-center text-gray-400 text-xs uppercase font-bold bg-gray-50/50">Header (Global)</div>
                                                
                                                <div className="flex-grow p-4 space-y-4">
                                                    {pages.find(p => p.id === selectedPageId)?.sections.map((section, idx) => (
                                                        <div 
                                                            key={section.id}
                                                            onClick={() => { setActiveSectionId(section.id); setSectionEditorTab('content'); }}
                                                            className={`relative group border-2 rounded-lg p-4 transition-all cursor-pointer ${activeSectionId === section.id ? 'border-blue-500 ring-4 ring-blue-100 bg-blue-50/10' : 'border-transparent hover:border-gray-300 bg-white hover:shadow-sm'}`}
                                                        >
                                                            <div className="absolute -top-3 left-4 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                                {section.type}
                                                            </div>
                                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded-lg p-1 border border-gray-100">
                                                                <button onClick={(e) => { e.stopPropagation(); handleMoveSection('up', idx); }} disabled={idx === 0} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"><ArrowUp size={14}/></button>
                                                                <button onClick={(e) => { e.stopPropagation(); handleMoveSection('down', idx); }} disabled={idx === (pages.find(p => p.id === selectedPageId)?.sections.length || 0) - 1} className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"><ArrowDown size={14}/></button>
                                                                <button onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14}/></button>
                                                            </div>
                                                            
                                                            {/* Preview of Content */}
                                                            <div className="pointer-events-none opacity-80 scale-95 origin-top-left">
                                                                <h4 className="font-bold text-gray-900 truncate">{section.content.title || section.content.heading || 'Untitled Section'}</h4>
                                                                <p className="text-gray-500 text-xs truncate">{JSON.stringify(section.content).substring(0, 60)}...</p>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-400 gap-4 hover:border-[#007636] hover:text-[#007636] hover:bg-green-50/30 transition-all cursor-default">
                                                        <span className="font-medium">Add New Section</span>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl">
                                                            {['Hero', 'RichText', 'Features', 'CallToAction', 'ContactForm', 'Testimonials', 'FAQ', 'ProjectGrid', 'TeamGrid', 'WhyChooseUs', 'ConstructionTeaser', 'HowItWorks', 'ServicesGrid', 'Map'].map(type => (
                                                                <button 
                                                                    key={type} 
                                                                    onClick={() => handleAddSection(type as SectionType)}
                                                                    className="p-2 bg-white border border-gray-200 hover:border-[#007636] hover:text-[#007636] hover:shadow-md text-xs font-medium rounded text-center transition-all"
                                                                >
                                                                    + {type}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 border-t border-dashed border-gray-300 text-center text-gray-400 text-xs uppercase font-bold bg-gray-50/50">Footer (Global)</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4"><Layout size={32}/></div>
                                        <p className="font-medium">Select a page from the left to start editing</p>
                                    </div>
                                )}
                            </div>

                            {/* Properties Panel */}
                            <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
                                {selectedPageId && activeSectionId ? (
                                    <>
                                        <div className="flex border-b border-gray-200">
                                            <button onClick={() => setSectionEditorTab('content')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${sectionEditorTab === 'content' ? 'border-[#007636] text-[#007636] bg-green-50/50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>Content</button>
                                            <button onClick={() => setSectionEditorTab('design')} className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${sectionEditorTab === 'design' ? 'border-[#007636] text-[#007636] bg-green-50/50' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>Design</button>
                                        </div>
                                        <div className="flex-grow overflow-y-auto p-6">
                                            {sectionEditorTab === 'content' ? (
                                                /* CONTENT TAB Logic from previous turn... */
                                                (() => {
                                                    const page = pages.find(p => p.id === selectedPageId);
                                                    const section = page?.sections.find(s => s.id === activeSectionId);
                                                    if(!section) return null;
                                                    
                                                    // Reusing the robust content editor logic
                                                    return (
                                                        <div className="space-y-6 animate-fadeIn">
                                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 pb-2 border-b border-gray-100 flex items-center gap-2">
                                                                <Edit2 size={12}/> {section.type} Properties
                                                            </div>
                                                            {(section.type === 'Hero' || section.type === 'CallToAction') && (
                                                                <>
                                                                    <div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label><input className="w-full p-2 border rounded" value={section.content.title || ''} onChange={(e) => handleUpdateSectionContent('title', e.target.value)} /></div>
                                                                    <div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subtitle</label><textarea className="w-full p-2 border rounded" rows={3} value={section.content.subtitle || ''} onChange={(e) => handleUpdateSectionContent('subtitle', e.target.value)} /></div>
                                                                    {section.type === 'Hero' && <SectionImagePicker label="Background Image" field="bgImage" />}
                                                                    <div className="grid grid-cols-2 gap-2"><div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Btn Text</label><input className="w-full p-2 border rounded" value={section.content.buttonText || ''} onChange={(e) => handleUpdateSectionContent('buttonText', e.target.value)} /></div><div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Btn Link</label><input className="w-full p-2 border rounded" value={section.content.buttonLink || ''} onChange={(e) => handleUpdateSectionContent('buttonLink', e.target.value)} /></div></div>
                                                                </>
                                                            )}
                                                            {section.type === 'RichText' && (<><div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Heading</label><input className="w-full p-2 border rounded" value={section.content.heading || ''} onChange={(e) => handleUpdateSectionContent('heading', e.target.value)} /></div><div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Body</label><textarea className="w-full p-2 border rounded" rows={8} value={section.content.body || ''} onChange={(e) => handleUpdateSectionContent('body', e.target.value)} /></div></>)}
                                                            {/* Feature List Editor */}
                                                            {section.type === 'Features' && (
                                                                <div className="space-y-4">
                                                                    <div className="mb-2"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label><input className="w-full p-2 border rounded" value={section.content.title || ''} onChange={(e) => handleUpdateSectionContent('title', e.target.value)} /></div>
                                                                    <label className="block text-xs font-bold text-gray-500 uppercase">Items</label>
                                                                    {section.content.items?.map((item:any, i:number) => (
                                                                        <div key={i} className="bg-gray-50 p-2 rounded border border-gray-200 relative"><button onClick={() => handleDeleteNestedItem('items', i)} className="absolute top-1 right-1 text-red-400 hover:text-red-600"><X size={12}/></button><input className="w-full p-1 border rounded text-xs mb-1 font-bold" value={item.title} onChange={e => handleUpdateNestedContent('items', i, 'title', e.target.value)} /><textarea className="w-full p-1 border rounded text-xs" value={item.desc} onChange={e => handleUpdateNestedContent('items', i, 'desc', e.target.value)} rows={2}/></div>
                                                                    ))}
                                                                    <Button variant="outline" className="w-full py-1 text-xs" onClick={() => handleAddNestedItem('items', {title: 'New', desc: 'Description'})}>+ Add Item</Button>
                                                                </div>
                                                            )}
                                                            {/* Dynamic Section Warning */}
                                                            {['ProjectGrid','Testimonials','TeamGrid','FAQ','ServicesGrid'].includes(section.type) && (
                                                                <div className="p-4 bg-blue-50 text-blue-800 rounded text-xs text-center border border-blue-100">
                                                                    This section automatically pulls data from the <strong>{section.type === 'ProjectGrid' ? 'Properties' : section.type === 'TeamGrid' ? 'Team' : 'CMS'}</strong> tab.
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })()
                                            ) : (
                                                /* DESIGN TAB Logic */
                                                (() => {
                                                    const page = pages.find(p => p.id === selectedPageId);
                                                    const section = page?.sections.find(s => s.id === activeSectionId);
                                                    if(!section) return null;
                                                    const style = section.style || { paddingTop: '80', paddingBottom: '80', backgroundColor: 'bg-white', textAlign: 'left' };
                                                    return (
                                                        <div className="space-y-6 animate-fadeIn">
                                                            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Background</label><div className="grid grid-cols-4 gap-2">{['bg-white', 'bg-gray-50', 'bg-gray-900', 'bg-[#007636]', 'bg-[#1a2e24]'].map(bg => (<button key={bg} onClick={() => handleUpdateSectionStyle('backgroundColor', bg)} className={`h-8 rounded border ${bg.includes('white') ? 'border-gray-300' : 'border-transparent'} ${bg} ${style.backgroundColor === bg ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`} title={bg}/>))}</div></div>
                                                            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Text Color</label><select value={style.textColor || 'text-gray-900'} onChange={(e) => handleUpdateSectionStyle('textColor', e.target.value)} className="w-full p-2 border rounded"><option value="text-gray-900">Dark</option><option value="text-white">White</option><option value="text-[#007636]">Brand Green</option></select></div>
                                                            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Padding Y (px)</label><input type="range" min="0" max="200" step="10" value={parseInt(style.paddingTop || '80')} onChange={(e) => handleUpdateSectionStyle('paddingTop', e.target.value)} className="w-full accent-[#007636]" /><div className="text-right text-xs text-gray-500">{style.paddingTop || '80'}px</div></div>
                                                            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Alignment</label><div className="flex border rounded overflow-hidden">{['left', 'center', 'right'].map(align => (<button key={align} onClick={() => handleUpdateSectionStyle('textAlign', align)} className={`flex-1 py-2 text-xs uppercase font-bold hover:bg-gray-50 ${style.textAlign === align ? 'bg-gray-100 text-[#007636]' : 'bg-white text-gray-500'}`}>{align}</button>))}</div></div>
                                                        </div>
                                                    )
                                                })()
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                                        <Settings size={48} className="mb-4 opacity-20" />
                                        <p>Select a section in the canvas to edit its content and design.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* --- OTHER TABS (CMS, SETTINGS, ETC) --- */
                        <div className="p-8 h-full overflow-y-auto">
                            {activeTab === 'dashboard' && (
                                <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
                                    <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Admin</h1>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Unread Inquiries', value: inquiries.filter(i => i.status === 'New').length, color: 'text-red-500' },
                                            { label: 'Total Properties', value: projects.length, color: 'text-gray-800' },
                                            { label: 'Portfolio Items', value: portfolio.length, color: 'text-gray-800' },
                                            { label: 'Published Pages', value: pages.length, color: 'text-blue-600' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                                <h3 className="text-gray-500 text-xs font-bold uppercase">{stat.label}</h3>
                                                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Activity size={18}/> Recent Activity</h3>
                                            <div className="space-y-0 divide-y divide-gray-100 max-h-60 overflow-y-auto">
                                                {activityLogs.length > 0 ? activityLogs.map(log => (
                                                    <div key={log.id} className="py-3 flex gap-4 text-sm">
                                                        <span className="text-gray-400 text-xs whitespace-nowrap w-24">{log.timestamp.split(',')[1]}</span>
                                                        <span className="font-bold text-gray-700 w-24">{log.module}</span>
                                                        <span className="text-gray-600 truncate">{log.action}: {log.details}</span>
                                                    </div>
                                                )) : <div className="text-gray-400 text-center py-4">No recent activity.</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- CMS TABS --- */}
                            {activeTab === 'listings' && (
                                <div className="flex flex-col h-full animate-fadeIn max-w-6xl mx-auto">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-4"><h1 className="text-2xl font-bold text-gray-800">Properties</h1><div className="bg-white rounded-lg p-1 border border-gray-200 flex"><button onClick={() => setListingType('land')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${listingType === 'land' ? 'bg-[#007636] text-white' : 'text-gray-600'}`}>Land</button><button onClick={() => setListingType('houses')} className={`px-4 py-1.5 rounded-md text-sm font-medium ${listingType === 'houses' ? 'bg-[#007636] text-white' : 'text-gray-600'}`}>Designs</button></div></div>
                                        <Button onClick={() => { setEditForm(listingType === 'land' ? { id: '', title: '', location: '', price: 0, priceStr: 'KES 0', type: 'Residential', size: '50x100', purpose: 'Investment', description: '', imageUrl: '', features: [] } : { id: '', title: '', description: '', imageUrl: '', startingPriceStr: 'KES 0M', features: [] }); setEditingId('new'); setEditorType(listingType === 'land' ? 'land' : 'house'); }}><Plus size={16} className="mr-2" /> Add New</Button>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">{(listingType === 'land' ? projects : houseTypes).map((item: any) => (<div key={item.id} className="p-4 flex gap-4 items-center hover:bg-gray-50"><img src={item.imageUrl || 'https://via.placeholder.com/100'} className="w-12 h-12 rounded object-cover bg-gray-100" /><div className="flex-grow"><div className="font-bold text-gray-900">{item.title}</div><div className="text-xs text-gray-500">{listingType === 'land' ? item.priceStr : item.startingPriceStr}</div></div><button onClick={() => startEdit(item, listingType === 'land' ? 'land' : 'house')} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={() => handleDelete(item.id, listingType === 'land' ? 'land' : 'house')} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div>))}</div></div>
                                        {editingId && editForm && (editorType === 'land' || editorType === 'house') && <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sticky top-4 h-fit"><div className="flex justify-between items-center mb-6"><h3 className="font-bold">Editor</h3><button onClick={() => setEditingId(null)}><X size={20}/></button></div><InputField label="Title" field="title" /><ImagePicker label="Main Image" field="imageUrl" />{editorType === 'land' ? <><div className="grid grid-cols-2 gap-4"><InputField label="Price Text" field="priceStr" /><InputField label="Price Num" field="price" type="number" /></div><InputField label="Location" field="location" /></> : <InputField label="Starting Price" field="startingPriceStr" />}<InputField label="Description" field="description" rows={4} /><Button fullWidth onClick={handleSave}>Save Changes</Button></div>}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'inquiries' && (
                                <div className="space-y-6 max-w-6xl mx-auto">
                                    <h1 className="text-2xl font-bold text-gray-800">Inbox & Leads</h1>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <table className="w-full text-left border-collapse"><thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="p-4">Date</th><th className="p-4">Name</th><th className="p-4">Contact</th><th className="p-4">Interest</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{inquiries.map((inquiry) => (<tr key={inquiry.id} className="hover:bg-gray-50 transition-colors"><td className="p-4 text-sm text-gray-500">{inquiry.date}</td><td className="p-4 font-medium">{inquiry.name}</td><td className="p-4 text-sm"><div>{inquiry.email}</div><div className="text-gray-500">{inquiry.phone}</div></td><td className="p-4 text-sm"><div className="font-bold text-[#007636]">{inquiry.purpose}</div><div className="text-xs text-gray-500 truncate max-w-[150px]">{inquiry.message}</div></td><td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${inquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{inquiry.status}</span></td><td className="p-4 flex gap-2"><button onClick={() => updateInquiryStatus(inquiry.id, 'Read')} className="p-1.5 text-blue-600 bg-blue-50 rounded"><CheckCircle size={16}/></button><button onClick={() => deleteInquiry(inquiry.id)} className="p-1.5 text-red-600 bg-red-50 rounded"><Trash2 size={16}/></button></td></tr>))}</tbody></table>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'portfolio' && (
                                <div className="flex flex-col h-full max-w-6xl mx-auto"><div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Portfolio</h1><Button onClick={() => { setEditForm({ id: '', title: '', category: 'Construction', location: '', description: '', mainImage: '', gallery: [], specs: [] }); setEditingId('new'); setEditorType('portfolio'); }}><Plus size={16} className="mr-2" /> Add Project</Button></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">{portfolio.map((item) => (<div key={item.id} className="p-4 flex gap-4 items-center hover:bg-gray-50"><img src={item.mainImage} className="w-12 h-12 rounded object-cover bg-gray-100" /><div className="flex-grow"><div className="font-bold text-gray-900">{item.title}</div><div className="text-xs text-gray-500">{item.category}</div></div><button onClick={() => startEdit(item, 'portfolio')} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={() => handleDelete(item.id, 'portfolio')} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div>))}</div></div>{editingId && editForm && editorType === 'portfolio' && <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sticky top-4 h-fit"><div className="flex justify-between items-center mb-6"><h3 className="font-bold">Portfolio Editor</h3><button onClick={() => setEditingId(null)}><X size={20}/></button></div><InputField label="Title" field="title" /><div className="mb-4"><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label><select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full p-2 border rounded"><option>Construction</option><option>Interior</option><option>Landscaping</option><option>Wall</option></select></div><InputField label="Location" field="location" /><ImagePicker label="Main Image" field="mainImage" /><InputField label="Description" field="description" rows={4} /><Button fullWidth onClick={handleSave}>Save Project</Button></div>}</div></div>
                            )}

                            {activeTab === 'team' && (
                                <div className="flex flex-col h-full max-w-6xl mx-auto"><div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Team</h1><Button onClick={() => { setEditForm({ id: '', name: '', role: '', bio: '', imageUrl: '' }); setEditingId('new'); setEditorType('team'); }}><Plus size={16} className="mr-2" /> Add Member</Button></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">{teamMembers.map((item) => (<div key={item.id} className="p-4 flex gap-4 items-center hover:bg-gray-50"><img src={item.imageUrl} className="w-12 h-12 rounded-full object-cover bg-gray-100" /><div className="flex-grow"><div className="font-bold text-gray-900">{item.name}</div><div className="text-xs text-gray-500">{item.role}</div></div><button onClick={() => startEdit(item, 'team')} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button><button onClick={() => handleDelete(item.id, 'team')} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button></div>))}</div></div>{editingId && editForm && editorType === 'team' && <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 sticky top-4 h-fit"><div className="flex justify-between items-center mb-6"><h3 className="font-bold">Team Editor</h3><button onClick={() => setEditingId(null)}><X size={20}/></button></div><InputField label="Name" field="name" /><InputField label="Role" field="role" /><ImagePicker label="Profile Photo" field="imageUrl" /><InputField label="Bio" field="bio" rows={4} /><Button fullWidth onClick={handleSave}>Save Member</Button></div>}</div></div>
                            )}

                            {activeTab === 'social' && (
                                <div className="space-y-8 max-w-6xl mx-auto"><h1 className="text-2xl font-bold text-gray-800">Social Proof</h1><div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h3 className="font-bold text-lg mb-4">Stats</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{stats.map(stat => (<div key={stat.id} className="p-4 bg-gray-50 rounded-lg"><div className="text-xs text-gray-500 uppercase">{stat.label}</div><input value={stat.value} onChange={(e) => updateStat(stat.id, { value: e.target.value })} className="w-full bg-transparent font-bold text-xl border-b border-gray-300 focus:border-[#007636] outline-none mt-1"/></div>))}</div></div><div><div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg">Testimonials</h3><Button onClick={() => { setEditForm({ name: '', role: '', content: '', imageUrl: '' }); setEditingId('new'); setEditorType('testimonial'); }} className="text-xs py-2"><Plus size={14}/> Add</Button></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{testimonials.map(t => (<div key={t.id} className="bg-white p-4 rounded-lg border border-gray-200 relative group"><div className="absolute top-2 right-2 hidden group-hover:flex gap-1"><button onClick={() => startEdit(t, 'testimonial')} className="p-1 bg-blue-50 text-blue-600 rounded"><Edit2 size={14}/></button><button onClick={() => handleDelete(t.id, 'testimonial')} className="p-1 bg-red-50 text-red-600 rounded"><Trash2 size={14}/></button></div><div className="flex items-center gap-2 mb-2"><img src={t.imageUrl} className="w-8 h-8 rounded-full bg-gray-100" /><div><div className="font-bold text-sm">{t.name}</div><div className="text-xs text-gray-500">{t.role}</div></div></div><p className="text-xs text-gray-600 line-clamp-3">"{t.content}"</p></div>))}</div></div>{editingId && editForm && (editorType === 'testimonial' || editorType === 'partner') && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white p-6 rounded-xl max-w-md w-full"><h3 className="font-bold text-lg mb-4">Edit {editorType}</h3><InputField label="Name" field="name" />{editorType === 'testimonial' ? <><InputField label="Role" field="role" /><InputField label="Content" field="content" rows={3} /><ImagePicker label="Avatar" field="imageUrl" /></> : <ImagePicker label="Logo URL" field="logoUrl" />}<div className="flex gap-2 mt-4"><Button fullWidth onClick={handleSave}>Save</Button><Button fullWidth variant="outline" onClick={() => setEditingId(null)}>Cancel</Button></div></div></div>)}</div>
                            )}

                            {activeTab === 'kb' && (
                                <div className="space-y-6 max-w-6xl mx-auto"><div className="flex justify-between items-center"><div><h1 className="text-2xl font-bold text-gray-800">AI Knowledge Base</h1><p className="text-gray-500 text-sm">Teach your chatbot facts.</p></div><Button onClick={() => addKnowledgeBaseItem({ topic: 'New Topic', content: '' })}><Plus size={16} className="mr-2" /> Add Fact</Button></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{knowledgeBase.map((kb) => (<div key={kb.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><div className="flex justify-between mb-4"><div className="font-bold text-lg text-[#007636] mr-4">{kb.topic}</div><button onClick={() => deleteKnowledgeBaseItem(kb.id)} className="text-red-400 hover:text-red-600"><X size={18}/></button></div><textarea value={kb.content} onChange={(e) => updateKnowledgeBaseItem(kb.id, e.target.value)} className="w-full h-24 p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#007636] outline-none text-sm" placeholder="Enter info..." /></div>))}</div></div>
                            )}

                            {activeTab === 'design' && (
                                <div className="max-w-3xl space-y-8 mx-auto"><h1 className="text-2xl font-bold text-gray-800">Global Design System</h1><div className="grid grid-cols-2 gap-8"><div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h3 className="font-bold mb-4 flex items-center gap-2"><Palette size={18}/> Brand Colors</h3><div className="space-y-4"><div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Primary Color</label><div className="flex gap-4 items-center"><input type="color" value={globalDesign.primaryColor} onChange={(e) => updateGlobalDesign({primaryColor: e.target.value})} className="h-10 w-10 rounded cursor-pointer border-none" /><span className="font-mono bg-gray-100 px-2 py-1 rounded">{globalDesign.primaryColor}</span></div></div><div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Secondary Color</label><div className="flex gap-4 items-center"><input type="color" value={globalDesign.secondaryColor} onChange={(e) => updateGlobalDesign({secondaryColor: e.target.value})} className="h-10 w-10 rounded cursor-pointer border-none" /><span className="font-mono bg-gray-100 px-2 py-1 rounded">{globalDesign.secondaryColor}</span></div></div></div></div><div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"><h3 className="font-bold mb-4 flex items-center gap-2"><Settings size={18}/> Typography & UI</h3><div className="space-y-4"><div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Font Family</label><select value={globalDesign.fontFamily} onChange={(e) => updateGlobalDesign({fontFamily: e.target.value})} className="w-full p-2 border rounded"><option value="Poppins">Poppins</option><option value="Inter">Inter</option><option value="Roboto">Roboto</option></select></div><div><label className="block text-xs font-bold text-gray-500 uppercase mb-2">Border Radius</label><select value={globalDesign.borderRadius} onChange={(e) => updateGlobalDesign({borderRadius: e.target.value})} className="w-full p-2 border rounded"><option value="0px">Square (0px)</option><option value="0.5rem">Rounded (8px)</option><option value="0.75rem">Large (12px)</option><option value="1.5rem">Extra Large (24px)</option></select></div></div></div></div></div>
                            )}

                            {activeTab === 'media' && (
                                <div className="space-y-6 max-w-6xl mx-auto"><div className="flex justify-between items-center"><h1 className="text-2xl font-bold text-gray-800">Media Library</h1><label className="bg-[#007636] hover:bg-[#005c2b] text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium transition-colors"><Upload size={16}/> Upload Image<input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,application/pdf" /></label></div><div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">{mediaLibrary.map((item) => (<div key={item.id} className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-[#007636] relative group">{item.type === 'image' ? (<img src={item.url} className="w-full h-full object-cover" title={item.name} />) : (<div className="w-full h-full flex flex-col items-center justify-center text-gray-400"><FileText size={32} /><span className="text-xs mt-2 px-2 truncate w-full text-center">{item.name}</span></div>)}<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2"><button onClick={() => { navigator.clipboard.writeText(item.url); alert("URL Copied!"); }} className="text-white text-xs hover:underline">Copy URL</button><button onClick={() => deleteMedia(item.id)} className="text-red-400 hover:text-red-200 p-1"><Trash2 size={16}/></button></div></div>))}</div></div>
                            )}

                            {activeTab === 'config' && (
                                <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200 mx-auto"><h1 className="text-2xl font-bold text-gray-800 mb-6">Site Configuration</h1><div className="p-4 bg-blue-50 text-blue-800 rounded mb-6 text-sm">Edit the global Header and Footer settings here.</div><div className="space-y-6"><InputField label="Hero Title" field="heroTitle" /><InputField label="Hero Subtitle" field="heroSubtitle" rows={3} /><div className="grid grid-cols-2 gap-6"><InputField label="Phone" field="contactPhone" /><InputField label="Email" field="contactEmail" /></div><InputField label="Address" field="contactAddress" /><Button fullWidth onClick={handleSave}>Save Configuration</Button></div></div>
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* MODALS */}
            {isMediaPickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-8">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-fadeIn">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-gray-800">Select Media</h3>
                            <button onClick={() => setIsMediaPickerOpen(false)}><X size={24}/></button>
                        </div>
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-end">
                             <label className="bg-[#007636] hover:bg-[#005c2b] text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium text-sm">
                                <Upload size={16}/> Upload New
                                <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                            </label>
                        </div>
                        <div className="flex-grow overflow-y-auto p-6 grid grid-cols-4 gap-4">
                            {mediaLibrary.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleSelectMedia(item.url)}
                                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#007636] cursor-pointer relative group"
                                >
                                    <img src={item.url} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {pageSettingsId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Page Settings (SEO)</h3>
                            <button onClick={() => setPageSettingsId(null)}><X size={20} className="text-gray-400 hover:text-red-500"/></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Page Title (Meta Title)</label>
                                <input className="w-full p-2 border rounded" placeholder="e.g. About Us | MyPloti" value={pages.find(p => p.id === pageSettingsId)?.meta?.title || ''} onChange={(e) => handleUpdatePageMeta('title', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description (Meta Description)</label>
                                <textarea className="w-full p-2 border rounded" rows={3} placeholder="Brief summary for search engines..." value={pages.find(p => p.id === pageSettingsId)?.meta?.description || ''} onChange={(e) => handleUpdatePageMeta('description', e.target.value)} />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <Button onClick={() => setPageSettingsId(null)}>Done</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};