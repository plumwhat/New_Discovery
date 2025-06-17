
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
}

const ExportSection: React.FC<ExportSectionProps> = ({ exportFormat, onFormatChange, onExport, onClearForm }) => {
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
        <RadioGroup
          label="Export Options"
          name="exportFormat"
          options={exportOptions}
          selectedValue={exportFormat}
          onChange={onFormatChange}
        />
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
          <Button 
            onClick={onExport} 
            variant="primary" 
            icon={<ArrowDownTrayIcon />}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Export Data
          </Button>
          <Button 
            onClick={onClearForm} 
            variant="danger" 
            icon={<TrashIcon />}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Clear All Form Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSection;
