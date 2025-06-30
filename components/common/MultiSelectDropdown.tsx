

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './Icons';

interface MultiSelectProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectProps> = ({ label, options, selectedValues, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelectedValues);
  };
  
  const getDisplayValue = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length > 2) return `${selectedValues.length} items selected`;
    return selectedValues.map(val => options.find(opt => opt.value === val)?.label || val).join(', ');
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#01916D] focus:border-[#01916D] sm:text-sm"
        >
          <span className="block truncate">{getDisplayValue()}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </span>
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border rounded-md max-h-60 overflow-auto">
            <ul className="py-1">
              {options.map(option => (
                <li key={option.value} className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleSelect(option.value)}
                    className="h-4 w-4 text-[#01916D] focus:ring-[#017a59] border-gray-300 rounded mr-3"
                  />
                  <span className="text-sm text-gray-900">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default MultiSelectDropdown;