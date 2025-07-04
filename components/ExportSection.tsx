
import React, { useState } from 'react';
import { ExportFormat } from '../types';
import RadioGroup from './common/RadioGroup';
import Button from './common/Button';
import { ArrowDownTrayIcon, TrashIcon, ChevronDownIcon, ChevronRightIcon } from './common/Icons';

interface ExportSectionProps {
  exportFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
  onExport: () => void;
  onResetAllData: () => void; // Changed prop name
  onClearCurrentTab: () => void;
}

const ExportSection: React.FC<ExportSectionProps> = ({ 
  exportFormat, 
  onFormatChange, 
  onExport, 
  onResetAllData, // Changed prop name
  onClearCurrentTab
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const exportOptions = [
    { value: ExportFormat.TXT, label: "Text File (.txt)" },
    { value: ExportFormat.MD, label: "Markdown (.md)" },
    { value: ExportFormat.AI_PROMPT, label: "AI Prompt (.txt)" },
    { value: ExportFormat.HTML, label: "HTML File (.html)" },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-gray-800 mb-4 focus:outline-none"
        aria-expanded={isExpanded}
        aria-controls="export-actions-content"
      >
        Actions & Export
        {isExpanded ? <ChevronDownIcon className="w-6 h-6 text-gray-600" /> : <ChevronRightIcon className="w-6 h-6 text-gray-600" />}
      </button>
      
      {isExpanded && (
        <div id="export-actions-content" className="space-y-4 transition-all duration-300 ease-in-out">
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
              icon={<TrashIcon />}
              iconPosition="left"
              className="w-full sm:w-auto flex-grow sm:flex-grow-0"
            >
              Clear Current Tab Data
            </Button>
            <Button 
              onClick={onResetAllData} // Changed prop name
              variant="danger" 
              icon={<TrashIcon />}
              iconPosition="left"
              className="w-full sm:w-auto flex-grow sm:flex-grow-0"
            >
              Reset All Application Data
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportSection;
