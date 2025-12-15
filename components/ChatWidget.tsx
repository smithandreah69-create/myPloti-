import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Bot, Sparkles, StopCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useData } from '../contexts/DataContext';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export const ChatWidget: React.FC = () => {
  const { knowledgeBase, siteConfig } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Hello! I am the MyPloti AI assistant. How can I help you find your dream property today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const model = 'gemini-2.5-flash';
      
      // Construct dynamic system instruction based on Knowledge Base and Config
      const kbText = knowledgeBase.map(item => `- ${item.topic}: ${item.content}`).join('\n');
      
      const systemInstruction = `You are a helpful and professional real estate assistant for MyPloti, a leading Kenyan real estate company. 
      Your goal is to assist users in finding land, understanding construction packages, and booking site visits.
      
      Key Company Info:
      - Phone: ${siteConfig.contactPhone}
      - Email: ${siteConfig.contactEmail}
      - Address: ${siteConfig.contactAddress}
      
      Custom Knowledge Base:
      ${kbText}
      
      General Services: Selling land (plots), residential construction, interior design, landscaping.
      
      Tone: Friendly, professional, persuasive but trustworthy. 
      Currency: Use KES (Kenya Shillings).
      Keep responses concise and easy to read on a chat widget.`;

      // Construct history for context (limit to last 10 messages)
      const history = messages.slice(-10).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: model,
        config: { systemInstruction },
        history: history
      });

      const result = await chat.sendMessage({ message: userMessage.text });
      const responseText = result.text;

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "I'm having trouble connecting right now. Please try again or call our support line.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const toggleListening = () => {
    if (isListening) {
        setIsListening(false);
        return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Voice input is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-KE'; // Kenyan English context
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
        {/* Trigger Button - Positioned above WhatsApp button (bottom-24) */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-[#007636]'} text-white border-2 border-white`}
            aria-label="Chat with AI"
        >
            {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        </button>

        {/* Chat Window */}
        <div className={`fixed bottom-44 right-6 z-50 w-[320px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`} style={{ maxHeight: 'calc(100vh - 200px)', height: '500px' }}>
            
            {/* Header */}
            <div className="bg-[#007636] p-4 rounded-t-2xl flex items-center justify-between text-white shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold">MyPloti AI</h3>
                        <div className="flex items-center gap-1.5 text-xs text-green-100">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Online & Ready
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/80">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-[#007636] text-white rounded-tr-none' 
                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl">
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full border border-gray-200 focus-within:border-[#007636] focus-within:ring-1 focus-within:ring-[#007636]/20 transition-all">
                    <button 
                        onClick={toggleListening}
                        className={`p-2 rounded-full transition-colors flex-shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-[#007636] hover:bg-white'}`}
                        title="Talk to AI"
                    >
                        {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
                    </button>
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type or talk..."
                        className="flex-grow bg-transparent outline-none text-sm text-gray-700 min-w-0"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={`p-2 rounded-full flex-shrink-0 transition-all ${input.trim() ? 'bg-[#007636] text-white shadow-md hover:scale-105' : 'bg-gray-200 text-gray-400'}`}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    </>
  );
};