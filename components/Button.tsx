import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-[#007636] text-white hover:bg-[#005c2b] border border-transparent",
    secondary: "bg-[#b96807] text-white hover:bg-[#965405] border border-transparent",
    outline: "border-2 border-[#007636] text-[#007636] hover:bg-[#007636] hover:text-white bg-transparent dark:border-[#4ade80] dark:text-[#4ade80] dark:hover:bg-[#4ade80] dark:hover:text-gray-900",
    white: "bg-white text-[#007636] hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border border-transparent"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};