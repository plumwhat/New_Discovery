

import React from 'react';
import { RadioGroupProps } from '../../types';

const RadioGroup = <T extends string | number,>({ name, options, selectedValue, onChange, label, }: RadioGroupProps<T>): React.ReactNode => {
  return (
    <div>
      {label && <legend className="text-sm font-medium text-gray-900 mb-2">{label}</legend>}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2"> {/* Changed to flex-wrap and gap for better responsiveness */}
        {options.map((option) => (
          <div key={option.value.toString()} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="focus:ring-[#01916D] h-4 w-4 text-[#01916D] border-gray-300"
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 block text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;