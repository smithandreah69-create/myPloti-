import React, { useState } from 'react';
import { Calculator, ArrowRight, Hammer } from 'lucide-react';
import { Button } from './Button';
import { ViewState } from '../App';

interface ConstructionCalculatorProps {
    onNavigate?: (view: ViewState, params?: any) => void;
}

export const ConstructionCalculator: React.FC<ConstructionCalculatorProps> = ({ onNavigate }) => {
  const [houseType, setHouseType] = useState('bungalow');
  const [area, setArea] = useState(100);
  const [finish, setFinish] = useState('standard');

  // Base rates per SQM in KES (Updated to reflect realistic 2024/2025 Market Rates)
  // Standard Bungalow baseline: approx KES 42,000 per SQM
  const baseRate = 42000; 
  
  const typeMultipliers: Record<string, number> = {
    bungalow: 1.0,
    maisonette: 1.35, // Structural cost for slabs/staircases adds ~35%
    flatroof: 1.45    // Reinforced concrete flat roofs + waterproofing are costlier
  };

  const finishMultipliers: Record<string, number> = {
    basic: 0.70,    // Shell & Core only
    standard: 1.0,  // Standard ceramic tiles, MDF, standard paint
    premium: 1.6    // Porcelain/Wood flooring, Gypsum, Granite, high-end fittings
  };

  const calculateCost = () => {
    const cost = area * baseRate * typeMultipliers[houseType] * finishMultipliers[finish];
    return Math.floor(cost);
  };

  const totalCost = calculateCost();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(val);
  };

  const handleGetQuote = () => {
      if (onNavigate) {
          onNavigate('contact', { 
              purpose: 'Construction Quote', 
              context: `Construction Estimate: ${formatCurrency(totalCost)} for ${area}sqm ${houseType} (${finish} finish)`,
              scrollTo: 'booking-form'
          });
      }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-[#007636] p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center gap-2">
            <Calculator /> Construction Cost Estimator
        </h3>
        <p className="text-green-100 text-sm mt-2">
            Get a realistic estimate for your project based on current market rates.
        </p>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">House Type</label>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        {id: 'bungalow', label: 'Bungalow'},
                        {id: 'maisonette', label: 'Maisonette'},
                        {id: 'flatroof', label: 'Flat Roof'}
                    ].map(type => (
                        <button
                            key={type.id}
                            onClick={() => setHouseType(type.id)}
                            className={`py-2 px-1 text-sm rounded-lg border-2 transition-all ${
                                houseType === type.id 
                                ? 'border-[#007636] bg-green-50 text-[#007636] font-bold' 
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Floor Area: <span className="text-[#007636]">{area} SQM</span>
                </label>
                <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    step="10" 
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007636]" 
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>50 SQM</span>
                    <span>500 SQM</span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Finish Level</label>
                <select 
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-1 focus:ring-[#007636] outline-none"
                >
                    <option value="basic" className="text-gray-900 bg-white">Basic (Shell & Core)</option>
                    <option value="standard" className="text-gray-900 bg-white">Standard Finishes</option>
                    <option value="premium" className="text-gray-900 bg-white">Premium Luxury Finishes</option>
                </select>
            </div>
        </div>

        {/* Output */}
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-gray-200">
            <div className="w-16 h-16 bg-[#b96807]/10 rounded-full flex items-center justify-center text-[#b96807] mb-4">
                <Hammer size={32} />
            </div>
            <p className="text-gray-500 font-medium mb-1">Estimated Construction Cost</p>
            <h2 className="text-4xl font-bold text-[#007636] mb-6">{formatCurrency(totalCost)}</h2>
            
            <p className="text-xs text-gray-400 mb-6 max-w-xs">
                *This is an estimate based on average SQM rates. Final BQ pricing depends on site conditions (soil type, slope) and specific material choices.
            </p>

            <Button variant="primary" fullWidth className="shadow-lg" onClick={handleGetQuote}>
                Get Accurate BQ Quote <ArrowRight size={16} />
            </Button>
        </div>
      </div>
    </div>
  );
};