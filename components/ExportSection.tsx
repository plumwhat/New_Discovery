
import React from 'react';
import { ExportFormat, AppState } from '../types';
import RadioGroup from './common/RadioGroup';
import Button from './common/Button';

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
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <Button onClick={onExport} variant="primary">Export Data</Button>
          <Button onClick={onClearForm} variant="danger">Clear All Form Data</Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSection;
