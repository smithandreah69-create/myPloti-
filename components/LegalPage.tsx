import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ViewState } from '../App';

interface LegalPageProps {
    type?: string;
    onNavigate: (view: ViewState) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type = 'privacy', onNavigate }) => {
    
    const getContent = () => {
        switch(type) {
            case 'terms':
                return {
                    title: 'Terms & Conditions',
                    date: 'Last Updated: October 2023',
                    content: (
                        <div className="space-y-6 text-gray-700">
                            <p>Welcome to MyPloti. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">1. Property Listings</h3>
                            <p>All property descriptions, prices, and availability are subject to change without notice. While we strive for accuracy, MyPloti cannot guarantee that all information is completely error-free.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">2. Payments & Deposits</h3>
                            <p>Reservation fees and deposits for plots or construction services are non-refundable unless otherwise stated in a written sale agreement. Payments should only be made to MyPloti official bank accounts.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">3. Site Visits</h3>
                            <p>Free site visits are provided on designated days. MyPloti reserves the right to reschedule visits due to weather or logistical reasons.</p>
                        </div>
                    )
                };
            case 'cookie':
                return {
                    title: 'Cookie Policy',
                    date: 'Last Updated: October 2023',
                    content: (
                        <div className="space-y-6 text-gray-700">
                            <p>This policy explains how we use cookies and similar tracking technologies on our website.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">What are Cookies?</h3>
                            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve your experience.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">How We Use Cookies</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., secure login).</li>
                                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics).</li>
                                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements to you.</li>
                            </ul>
                        </div>
                    )
                };
            case 'disclaimer':
                return {
                    title: 'Disclaimer',
                    date: 'Last Updated: October 2023',
                    content: (
                        <div className="space-y-6 text-gray-700">
                            <p>The information provided on this website is for general informational purposes only.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">No Professional Advice</h3>
                            <p>While we are experts in real estate, the content on this site does not constitute legal, financial, or investment advice. We recommend consulting with your own legal counsel before signing any agreements.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">Third Party Links</h3>
                            <p>Our website may contain links to third-party websites. MyPloti is not responsible for the content or privacy practices of these external sites.</p>
                        </div>
                    )
                };
            case 'privacy':
            default:
                return {
                    title: 'Privacy Policy',
                    date: 'Last Updated: October 2023',
                    content: (
                        <div className="space-y-6 text-gray-700">
                            <p>At MyPloti, we value your privacy and are committed to protecting your personal data.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">Information We Collect</h3>
                            <p>We collect information you provide directly to us, such as when you fill out a contact form, book a site visit, or sign up for our newsletter. This may include your name, email, phone number, and property preferences.</p>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">How We Use Your Information</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To provide and maintain our services.</li>
                                <li>To notify you about changes to our services or new listings.</li>
                                <li>To provide customer support.</li>
                                <li>To monitor the usage of our service.</li>
                            </ul>
                            
                            <h3 className="text-xl font-bold text-gray-900 mt-6">Data Security</h3>
                            <p>We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.</p>
                        </div>
                    )
                };
        }
    };

    const data = getContent();

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <button 
                    onClick={() => onNavigate('home')} 
                    className="flex items-center text-[#007636] font-bold mb-8 hover:underline"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="border-b border-gray-100 pb-8 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{data.title}</h1>
                        <p className="text-gray-500 text-sm">{data.date}</p>
                    </div>

                    <div className="prose prose-green max-w-none">
                        {data.content}
                    </div>
                </div>
            </div>
        </div>
    );
};