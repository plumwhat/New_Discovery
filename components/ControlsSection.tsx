
import React from 'react';
import { AppState, Role, AutomationType, Module } from '../types';
import { ROLES, AUTOMATION_TYPES, MODULES_BY_AUTOMATION_TYPE } from '../constants';
import Select from './common/Select';

interface ControlsSectionProps {
  appState: AppState;
  onRoleChange: (role: Role) => void;
  onAutomationTypeChange: (type: AutomationType) => void;
  onModuleChange: (moduleId: string) => void;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  appState,
  onRoleChange,
  onAutomationTypeChange,
  onModuleChange,
}) => {
  const availableModules = MODULES_BY_AUTOMATION_TYPE[appState.selectedAutomationType] || [];

  return (
    <div className="p-6 bg-white shadow rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Select
        label="Your Role"
        id="roleSelect"
        value={appState.selectedRole}
        onChange={(e) => onRoleChange(e.target.value as Role)}
        options={ROLES.map(role => ({ value: role, label: role }))}
      />
      <Select
        label="Automation Type"
        id="automationTypeSelect"
        value={appState.selectedAutomationType}
        onChange={(e) => onAutomationTypeChange(e.target.value as AutomationType)}
        options={AUTOMATION_TYPES.map(type => ({ value: type, label: type }))}
      />
      <Select
        label="Select Module"
        id="moduleSelect"
        value={appState.selectedModuleId || ""}
        onChange={(e) => onModuleChange(e.target.value)}
        options={availableModules.map(module => ({ value: module.id, label: module.name }))}
        disabled={availableModules.length === 0}
        placeholder={availableModules.length === 0 ? "N/A" : "Select a module"}
      />
    </div>
  );
};

export default ControlsSection;
