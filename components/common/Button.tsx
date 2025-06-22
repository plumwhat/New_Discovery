

import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon, 
  iconPosition = 'left', 
  ...props 
}) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm hover:shadow-md inline-flex items-center justify-center";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: "bg-[#01916D] text-white hover:bg-[#017a59] focus:ring-[#01916D]",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-[#01916D] hover:bg-[#E6F4F1] focus:ring-[#01916D]",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const iconMargin = children ? (iconPosition === 'left' ? 'mr-2' : 'ml-2') : '';

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && React.cloneElement(icon, { className: `${iconSize} ${iconMargin}` })}
      {children}
      {icon && iconPosition === 'right' && React.cloneElement(icon, { className: `${iconSize} ${iconMargin}` })}
    </button>
  );
};

export default Button;