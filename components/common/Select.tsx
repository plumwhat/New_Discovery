
import React from 'react';
import { SelectProps } from '../../types';

const Select: React.FC<SelectProps> = ({ label, id, options, className = '', placeholder, ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select
        id={id}
        className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm ${className}`}
        {...props}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(option => (
          <option key={option.value.toString()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
