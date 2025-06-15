
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
    const numValue = parseFloat(value);
    // Allow values between 0 and 3 (max possible average score)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 3) {
        setLocalThresholds(prev => ({ ...prev, [field]: numValue }));
    } else if (value === "") {
        setLocalThresholds(prev => ({ ...prev, [field]: 0 })); 
    }
  };
  
  const handleSave = () => {
    if (localThresholds.qualifiedMinAverage <= localThresholds.clarificationMinAverage) {
        alert("'Qualified' minimum average must be greater than 'Requires Clarification' minimum average.");
        return;
    }
    if (localThresholds.clarificationMinAverage < 0 || localThresholds.qualifiedMinAverage < 0 || localThresholds.clarificationMinAverage > 3 || localThresholds.qualifiedMinAverage > 3){
      alert("Thresholds must be between 0 and 3.");
      return;
    }
    onSave(localThresholds);
  };


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Admin Settings - Qualification Thresholds</h3>
        
        <Input
          label="Qualified (Min. Average Score)"
          type="number"
          id="qualifiedMinAverageThreshold"
          value={localThresholds.qualifiedMinAverage.toString()}
          onChange={(e) => handleInputChange('qualifiedMinAverage', e.target.value)}
          min="0"
          max="3"
          step="0.1"
          placeholder="e.g., 2.4"
        />
        <Input
          label="Requires Clarification (Min. Average Score)"
          type="number"
          id="clarificationMinAverageThreshold"
          value={localThresholds.clarificationMinAverage.toString()}
          onChange={(e) => handleInputChange('clarificationMinAverage', e.target.value)}
          min="0"
          max="3"
          step="0.1"
          placeholder="e.g., 1.7"
        />
        <p className="text-xs text-gray-500">'Do Not Proceed' is for scores &lt; 'Requires Clarification' Min. Average. Max average score is 3.</p>

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
