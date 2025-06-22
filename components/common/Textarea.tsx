
import React from 'react';
import { TextareaProps } from '../../types';

const Textarea: React.FC<TextareaProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea
        id={id}
        rows={4}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#01916D] focus:border-[#01916D] sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;