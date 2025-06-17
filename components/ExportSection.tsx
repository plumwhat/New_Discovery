

import React from 'react';
import { ExportFormat } from '../types';
import RadioGroup from './common/RadioGroup';
import Button from './common/Button';
import { ArrowDownTrayIcon, TrashIcon } from './common/Icons';

interface ExportSectionProps {
  exportFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
  onExport: () => void;
  onClearForm: () => void;
  onClearCurrentTab: () => void; // New prop
}

const ExportSection: React.FC<ExportSectionProps> = ({ 
  exportFormat, 
  onFormatChange, 
  onExport, 
  onClearForm,
  onClearCurrentTab // New prop
}) => {
  const exportOptions = [
    { value: ExportFormat.TXT, label: "Text File (.txt)" },
    { value: ExportFormat.MD, label: "Markdown (.md)" },
    { value: ExportFormat.AI_PROMPT, label: "AI Prompt (.txt)" },
    { value: ExportFormat.HTML, label: "HTML File (.html)" },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Actions & Export</h2>
      <div className="space-y-4">
        <div>
          <RadioGroup
            label="Export Options"
            name="exportFormat"
            options={exportOptions}
            selectedValue={exportFormat}
            onChange={onFormatChange}
          />
        </div>
        <div className="pt-4 border-t border-gray-200 space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3">
          <Button 
            onClick={onExport} 
            variant="primary" 
            icon={<ArrowDownTrayIcon />}
            iconPosition="left"
            className="w-full sm:w-auto flex-grow sm:flex-grow-0"
          >
            Export Data
          </Button>
          <Button 
            onClick={onClearCurrentTab} 
            variant="secondary" 
            icon={<TrashIcon />} // Consider a different icon, e.g., a "tab-specific" clear icon if available
            iconPosition="left"
            className="w-full sm:w-auto flex-grow sm:flex-grow-0"
          >
            Clear Current Tab Data
          </Button>
          <Button 
            onClick={onClearForm} 
            variant="danger" 
            icon={<TrashIcon />}
            iconPosition="left"
            className="w-full sm:w-auto flex-grow sm:flex-grow-0"
          >
            Clear All Form Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSection;
