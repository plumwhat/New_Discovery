
import React, { useState, useEffect } from 'react';
import { QualificationAdminSettings } from '../types';
import Input from './common/Input';
import Button from './common/Button';

interface AdminSettingsPanelProps {
  settings: QualificationAdminSettings;
  onSave: (newSettings: QualificationAdminSettings['thresholds']) => void;
  onRestoreDefaults: () => void;
  onClose: () => void;
}

const AdminSettingsPanel: React.FC<AdminSettingsPanelProps> = ({ settings, onSave, onRestoreDefaults, onClose }) => {
  const [localThresholds, setLocalThresholds] = useState(settings.thresholds);

  useEffect(() => {
    setLocalThresholds(settings.thresholds);
  }, [settings.thresholds]);

  const handleInputChange = (field: keyof QualificationAdminSettings['thresholds'], value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 60) { // Max score is 60
        setLocalThresholds(prev => ({ ...prev, [field]: numValue }));
    } else if (value === "") {
        setLocalThresholds(prev => ({ ...prev, [field]: 0 })); // Allow clearing field, treat as 0 or handle validation
    }
  };
  
  const handleSave = () => {
    // Basic validation: qualified threshold should be higher than clarification
    if (localThresholds.qualified <= localThresholds.clarification) {
        alert("Qualified threshold must be greater than Clarification Required threshold.");
        return;
    }
    onSave(localThresholds);
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Admin Settings - Qualification Thresholds</h3>
        
        <Input
          label="Qualified Threshold (Score > X)"
          type="number"
          id="qualifiedThreshold"
          value={localThresholds.qualified.toString()}
          onChange={(e) => handleInputChange('qualified', e.target.value)}
          min="0"
          max="60"
          placeholder="e.g., 40"
        />
        <Input
          label="Clarification Required Threshold (Score > X)"
          type="number"
          id="clarificationThreshold"
          value={localThresholds.clarification.toString()}
          onChange={(e) => handleInputChange('clarification', e.target.value)}
          min="0"
          max="60"
          placeholder="e.g., 20"
        />
        <p className="text-xs text-gray-500">Maximum score for each section is 60. 'Not Suitable' is for scores ≤ Clarification threshold.</p>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button onClick={onClose} variant="secondary">Back</Button>
          <Button onClick={onRestoreDefaults} variant="ghost">Restore Defaults</Button>
          <Button onClick={handleSave} variant="primary">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPanel;
