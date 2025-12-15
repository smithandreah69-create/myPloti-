import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../App';

interface CalculatorProps {
  initialPrice?: number;
  onNavigate: (view: ViewState, params?: any) => void;
  compact?: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ initialPrice = 850000, onNavigate, compact = false }) => {
  // Use strings for inputs to allow empty state while typing
  const [priceStr, setPriceStr] = useState<string>(initialPrice.toString());
  const [depositStr, setDepositStr] = useState<string>(Math.floor(initialPrice * 0.1).toString());
  const [monthsStr, setMonthsStr] = useState<string>("12");

  // Parse values for calculation
  const price = parseInt(priceStr) || 0;
  const deposit = parseInt(depositStr) || 0;
  const months = parseInt(monthsStr) || 0;

  // Calculation Logic:
  // 1. Balance = Price - Deposit
  // 2. Monthly = Ceil(Balance / Months)
  const balance = Math.max(0, price - deposit);
  const monthlyPayment = (months > 0 && balance > 0) ? Math.ceil(balance / months) : 0;
  const totalPayable = deposit + (monthlyPayment * months);

  // Input Handlers with Digit Validation
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setPriceStr(val);
  };

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setDepositStr(val);
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
        // Optional: limit months to reasonable number e.g. 60
        if (val === "" || parseInt(val) <= 60) {
            setMonthsStr(val);
        }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(val);
  };

  const handleConsult = () => {
      onNavigate('contact', { 
          context: `Estimator Inquiry: Property Value ${formatCurrency(price)}, Deposit ${formatCurrency(deposit)}, ${months} Months`,
          purpose: 'Consultation' 
      });
  };

  return (
    <div className={`bg-white rounded-xl shadow-2xl p-6 md:p-8 border-t-4 border-[#b96807] transform transition-all ${compact ? '' : 'md:-translate-y-12'} relative z-20 mx-auto w-full`}>
      <div className="flex flex-col mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CalcIcon className="text-[#b96807]" />
          Payment Estimator
        </h3>
        <p className="text-gray-500 text-sm">Calculate your monthly installments.</p>
      </div>

      <div className="space-y-5">
        {/* Price Input */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Property Value (KES)</label>
            <input 
                type="text" 
                inputMode="numeric"
                value={priceStr} 
                onChange={handlePriceChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007636] focus:border-transparent outline-none transition-all font-semibold text-gray-900 bg-white"
                placeholder="Enter amount"
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Deposit Input */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Deposit (KES)</label>
                <input 
                    type="text" 
                    inputMode="numeric"
                    value={depositStr} 
                    onChange={handleDepositChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007636] focus:border-transparent outline-none transition-all font-semibold text-gray-900 bg-white"
                    placeholder="Deposit"
                />
            </div>

            {/* Months Input */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Duration (Months)</label>
                <input 
                    type="text" 
                    inputMode="numeric"
                    value={monthsStr} 
                    onChange={handleMonthsChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007636] focus:border-transparent outline-none transition-all font-semibold text-gray-900 bg-white"
                    placeholder="Months"
                />
            </div>
        </div>

        {/* Results Area */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Balance to Pay:</span>
                <span className="font-semibold">{formatCurrency(balance)}</span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Est. Monthly Installment</div>
                <div className="text-3xl font-bold text-[#007636]">
                    {formatCurrency(monthlyPayment)}
                </div>
            </div>
        </div>

        <Button fullWidth onClick={handleConsult} className="flex items-center justify-center gap-2">
            <MessageSquare size={18} /> Consult Us
        </Button>
      </div>
    </div>
  );
};