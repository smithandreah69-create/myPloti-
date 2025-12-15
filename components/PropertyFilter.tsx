import React from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';

interface FilterProps {
  onFilterChange: (filters: any) => void;
  filters: {
    location: string;
    type: string;
    priceRange: string;
    purpose: string;
  };
}

// Wrapper to add custom arrow
const SelectWrapper = ({ children, label }: { children?: React.ReactNode, label: string }) => (
  <div className="relative group">
      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide ml-1">{label}</label>
      <div className="relative">
          {children}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500 group-hover:text-[#007636] dark:group-hover:text-[#4ade80] transition-colors">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </div>
      </div>
  </div>
);

export const PropertyFilter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // Modern select styling with larger border radius and padding
  const selectClassName = "w-full p-3 px-4 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 focus:border-[#007636] dark:focus:border-[#4ade80] focus:ring-2 focus:ring-[#007636]/20 dark:focus:ring-[#4ade80]/20 outline-none transition-all hover:bg-white dark:hover:bg-gray-700 hover:border-[#007636]/30 dark:hover:border-[#4ade80]/30 cursor-pointer appearance-none";
  
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 mb-12 relative z-30 transition-colors duration-300">
        <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 text-xl">
            <Search size={24} className="text-[#007636] dark:text-[#4ade80]" /> Find Your Ideal Property
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <SelectWrapper label="Location">
                <select 
                    className={selectClassName}
                    value={filters.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                >
                    <option value="">All Locations</option>
                    <option value="Joska">Joska</option>
                    <option value="Juja">Juja</option>
                    <option value="Kitengela">Kitengela</option>
                    <option value="Ngong">Ngong</option>
                    <option value="Malindi">Malindi</option>
                </select>
            </SelectWrapper>
            
            <SelectWrapper label="Type">
                <select 
                    className={selectClassName}
                    value={filters.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="Residential">Residential Plot</option>
                    <option value="Commercial">Commercial Plot</option>
                    <option value="House">House</option>
                </select>
            </SelectWrapper>

            <SelectWrapper label="Price Range">
                <select 
                    className={selectClassName}
                    value={filters.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                >
                    <option value="">Any Price</option>
                    <option value="low">Under 500k</option>
                    <option value="mid">500k - 1.5M</option>
                    <option value="high">Above 1.5M</option>
                </select>
            </SelectWrapper>

            <SelectWrapper label="Purpose">
                <select 
                    className={selectClassName}
                    value={filters.purpose}
                    onChange={(e) => handleChange('purpose', e.target.value)}
                >
                    <option value="">Any Purpose</option>
                    <option value="Investment">Investment</option>
                    <option value="Settlement">Settlement</option>
                    <option value="Commercial">Commercial</option>
                </select>
            </SelectWrapper>

            <div className="flex items-end">
                <Button fullWidth className="py-3.5 h-[50px] rounded-2xl shadow-md hover:shadow-lg transition-all text-base">
                    Search
                </Button>
            </div>
        </div>
    </div>
  );
};