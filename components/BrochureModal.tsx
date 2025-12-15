import React, { useState } from 'react';
import { X, Download, CheckCircle, FileText } from 'lucide-react';
import { Button } from './Button';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and download
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      
      // Simulate download trigger
      const link = document.createElement('a');
      link.href = '#'; // Mock link
      link.download = 'myploti-brochure.pdf';
      // link.click(); // Commented out to prevent actual navigation error in preview
    }, 1500);
  };

  const handleClose = () => {
      setStep('form');
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-fadeIn">
        <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
            <X size={24} />
        </button>

        <div className="p-8">
            {step === 'form' ? (
                <>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-[#007636]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#007636]">
                            <FileText size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Download Brochure</h2>
                        <p className="text-gray-600 text-sm mt-2">
                            Get our comprehensive guide to land ownership and construction packages.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input type="text" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007636] outline-none" placeholder="Enter your name" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007636] outline-none" placeholder="+254..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                            <input type="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007636] outline-none" placeholder="Enter your email" />
                        </div>
                        
                        <Button fullWidth type="submit" disabled={isLoading} className="mt-2">
                            {isLoading ? 'Processing...' : 'Download Now'}
                        </Button>
                    </form>
                </>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#007636]">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
                    <p className="text-gray-600 mb-6">
                        Your brochure is downloading. Check your downloads folder.
                    </p>
                    <Button variant="outline" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};