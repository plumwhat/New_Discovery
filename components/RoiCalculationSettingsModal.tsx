import React, { useState, useEffect } from 'react';
import { RoiCalculationFactors } from '../types';
import { ROI_CALCULATION_FACTOR_CONFIG } from '../constants';
import Input from './common/Input';
import Button from './common/Button';

interface RoiCalculationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  moduleName: string;
  currentFactors: RoiCalculationFactors;
  defaultFactors: RoiCalculationFactors;
  onSave: (newFactors: RoiCalculationFactors) => void;
}

const RoiCalculationSettingsModal: React.FC<RoiCalculationSettingsModalProps> = ({
  isOpen,
  onClose,
  moduleName,
  currentFactors,
  defaultFactors,
  onSave,
}) => {
  const [localFactors, setLocalFactors] = useState<RoiCalculationFactors>(currentFactors);

  useEffect(() => {
    setLocalFactors(currentFactors);
  }, [currentFactors, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (factorKey: keyof RoiCalculationFactors, value: string) => {
    const numValue = parseFloat(value);
    // Store as 0-100 for input, convert to 0-1 on save
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setLocalFactors(prev => ({ ...prev, [factorKey]: numValue / 100 }));
    } else if (value === "") {
      setLocalFactors(prev => ({ ...prev, [factorKey]: 0 }));
    }
  };

  const handleSave = () => {
    // Ensure values are valid before saving (e.g. not NaN, within 0-1 range)
    const validatedFactors: RoiCalculationFactors = {
        timeSavingPercentage: Number(localFactors.timeSavingPercentage) || 0,
        errorReductionPercentage: Number(localFactors.errorReductionPercentage) || 0,
    };
    // Clamp values to be safe, though input validation should handle most cases
    validatedFactors.timeSavingPercentage = Math.max(0, Math.min(1, validatedFactors.timeSavingPercentage));
    validatedFactors.errorReductionPercentage = Math.max(0, Math.min(1, validatedFactors.errorReductionPercentage));

    onSave(validatedFactors);
    onClose();
  };

  const handleRestoreDefaults = () => {
    setLocalFactors(defaultFactors);
    // Optionally, could save immediately on restore or require user to hit save.
    // For now, just updates local state, user must save.
  };

  return (
    <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-center transition-opacity duration-300 ease-in-out"
        aria-labelledby="roi-settings-modal-title"
        role="dialog"
        aria-modal="true"
    >
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalFadeInScaleUp">
        <h3 id="roi-settings-modal-title" className="text-xl font-semibold text-gray-800">
          ROI Calculation Settings for {moduleName}
        </h3>

        {(Object.keys(ROI_CALCULATION_FACTOR_CONFIG) as Array<keyof RoiCalculationFactors>).map(factorKey => (
          <div key={factorKey}>
            <Input
              label={`${ROI_CALCULATION_FACTOR_CONFIG[factorKey].label}`}
              type="number"
              id={`factor-${factorKey}`}
              value={(localFactors[factorKey] * 100).toString()} // Display as 0-100
              onChange={(e) => handleInputChange(factorKey, e.target.value)}
              min="0"
              max="100"
              placeholder="e.g., 75 for 75%"
            />
            <p className="text-xs text-gray-500 mt-1">{ROI_CALCULATION_FACTOR_CONFIG[factorKey].description}</p>
          </div>
        ))}
        
        <p className="text-xs text-gray-500">Changes here affect ROI calculations for this module. Percentages are entered as numbers (e.g., 75 for 75%).</p>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t mt-6">
          <Button onClick={onClose} variant="secondary" className="w-full sm:w-auto">Back</Button>
          <Button onClick={handleRestoreDefaults} variant="ghost" className="w-full sm:w-auto">Restore Defaults</Button>
          <Button onClick={handleSave} variant="primary" className="w-full sm:w-auto">Save Settings</Button>
        </div>
      </div>
      {/* Add animation style */}
      <style>{`
        @keyframes modalFadeInScaleUp {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-modalFadeInScaleUp {
          animation: modalFadeInScaleUp 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default RoiCalculationSettingsModal;
