import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { FadeInSection } from './FadeInSection';
import { useData } from '../contexts/DataContext';

interface ContactPageProps {
    initialData?: any;
    onDownloadBrochure: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialData, onDownloadBrochure }) => {
    const { addInquiry, siteConfig } = useData();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        purpose: 'Site Visit',
        projectType: 'Land',
        location: '',
        message: ''
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (initialData) {
            if (initialData.purpose) {
                setFormData(prev => ({ ...prev, purpose: initialData.purpose }));
            }
            if (initialData.context) {
                setFormData(prev => ({ ...prev, message: `I am interested in: ${initialData.context}` }));
            }
            
            if (initialData.scrollTo === 'booking-form') {
                const formElement = document.getElementById('booking-form');
                if (formElement) {
                    setTimeout(() => {
                        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        }
    }, [initialData]);

    // Custom TikTok Icon
    const TiktokIcon = ({ size = 20 }: { size?: number }) => (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
    );

    const socials = [
        { icon: Facebook, href: "https://www.facebook.com/people/MyPloti/61577272052699/" },
        { icon: Twitter, href: "https://x.com/MyPloti" },
        { icon: Instagram, href: "https://www.instagram.com/myploti/" },
        { icon: TiktokIcon, href: "https://www.tiktok.com/@my.ploti" }
    ];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!formData.name.trim()) newErrors.name = 'Full Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
        else if (formData.phone.length < 10) newErrors.phone = 'Phone number is too short (min 10 digits)';
        if (!formData.email.trim()) newErrors.email = 'Email Address is required';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.location.trim()) newErrors.location = 'Preferred Location is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'phone') newValue = value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Save to context (Admin Panel)
            addInquiry(formData);
            setSubmitted(true);
        } else {
            const firstError = document.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const getInputClass = (fieldName: string) => {
        const baseClass = "w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600";
        if (errors[fieldName]) {
            return `${baseClass} border-red-500 focus:ring-red-200 focus:border-red-500`;
        }
        return `${baseClass} border-gray-300 focus:ring-[#007636] dark:focus:ring-[#4ade80] focus:border-transparent`;
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="pt-32 pb-16 bg-[#1a2e24] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch & <span className="text-[#4ade80]">Book Your Site Visit</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Our team is ready to guide you to your dream plot or home.
                    </p>
                </div>
            </div>

            <section className="py-20" id="booking-form">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2">
                            <FadeInSection>
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Send className="text-[#007636] dark:text-[#4ade80]" /> Send us a Message
                                    </h2>
                                    
                                    {submitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-[#007636] dark:text-[#4ade80] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Thank you for contacting us. Our team will get back to you shortly to confirm your site visit.</p>
                                            <Button variant="outline" className="mt-6" onClick={() => {
                                                setSubmitted(false);
                                                setFormData({ ...formData, message: '' });
                                            }}>Send Another Message</Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name <span className="text-red-500">*</span></label>
                                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={getInputClass('name')} placeholder="John Doe" />
                                                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.name}</p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                                    <input type="tel" maxLength={15} name="phone" value={formData.phone} onChange={handleChange} className={getInputClass('phone')} placeholder="0700000000" />
                                                    {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.phone}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address <span className="text-red-500">*</span></label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass('email')} placeholder="john@example.com" />
                                                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.email}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Purpose</label>
                                                    <select name="purpose" value={formData.purpose} onChange={handleChange} className={getInputClass('purpose')}>
                                                        <option value="Site Visit">Book Site Visit</option>
                                                        <option value="General Inquiry">General Inquiry</option>
                                                        <option value="Purchase">Plot Purchase</option>
                                                        <option value="Construction">Construction Quote</option>
                                                        <option value="Partnership">Partnership</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Property Type</label>
                                                    <select name="projectType" value={formData.projectType} onChange={handleChange} className={getInputClass('projectType')}>
                                                        <option value="Land">Land / Plot</option>
                                                        <option value="Maisonette">Maisonette</option>
                                                        <option value="Bungalow">Bungalow</option>
                                                        <option value="Commercial">Commercial</option>
                                                        <option value="Perimeter Wall">Perimeter Wall</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Preferred Location <span className="text-red-500">*</span></label>
                                                <input type="text" name="location" value={formData.location} onChange={handleChange} className={getInputClass('location')} placeholder="e.g. Joska, Juja" />
                                                {errors.location && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.location}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message / Notes <span className="text-red-500">*</span></label>
                                                <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={getInputClass('message')} placeholder="Tell us more about your requirements..."></textarea>
                                                {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/>{errors.message}</p>}
                                            </div>

                                            <Button fullWidth type="submit" className="text-lg">Submit & Schedule Visit</Button>
                                        </form>
                                    )}
                                </div>
                            </FadeInSection>
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <FadeInSection delay="delay-100">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-[#007636] dark:text-[#4ade80] flex-shrink-0"><MapPin size={24} /></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">Visit Our Office</h4>
                                                <p className="text-gray-600 dark:text-gray-300">{siteConfig?.contactAddress || "Nairobi, Kenya"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-[#007636] dark:text-[#4ade80] flex-shrink-0"><Phone size={24} /></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">Call Us</h4>
                                                <p className="text-gray-600 dark:text-gray-300 mb-1">Mon - Fri: 8am - 6pm</p>
                                                <a href={`tel:${siteConfig?.contactPhone}`} className="text-[#b96807] dark:text-[#fbbf24] font-bold hover:underline">{siteConfig?.contactPhone}</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-[#007636] dark:text-[#4ade80] flex-shrink-0"><Mail size={24} /></div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">Email Us</h4>
                                                <a href={`mailto:${siteConfig?.contactEmail}`} className="text-[#b96807] dark:text-[#fbbf24] font-bold hover:underline">{siteConfig?.contactEmail}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Follow Us</h4>
                                        <div className="flex gap-4">
                                            {socials.map((social, i) => (
                                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#007636] dark:hover:bg-[#4ade80] hover:text-white transition-colors">
                                                    <social.icon size={20} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>

                            <FadeInSection delay="delay-200">
                                <div className="bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden h-80 shadow-lg border border-gray-300 dark:border-gray-700 relative">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817367963486!2d36.81926067405232!3d-1.283454335624773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c1%3A0x2b8e35c2c4b7b20!2sView%20Park%20Towers!5e0!3m2!1sen!2ske!4v1698765432100!5m2!1sen!2ske" 
                                        width="100%" 
                                        height="100%" 
                                        style={{border:0}} 
                                        allowFullScreen 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="MyPloti Location"
                                    ></iframe>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};