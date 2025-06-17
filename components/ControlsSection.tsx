
import React from 'react';
import { AppState, Role, AutomationType, Module } from '../types';
import { ROLES, AUTOMATION_TYPES, MODULES_BY_AUTOMATION_TYPE } from '../constants';
import Select from './common/Select';
import Input from './common/Input'; // Import Input component

interface ControlsSectionProps {
  appState: AppState;
  onCustomerCompanyChange: (company: string) => void;
  onCustomerNameChange: (name: string) => void;
  onDateCompletedChange: (date: string) => void;
  onRoleChange: (role: Role) => void;
  onAutomationTypeChange: (type: AutomationType) => void;
  onModuleChange: (moduleId: string) => void;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  appState,
  onCustomerCompanyChange,
  onCustomerNameChange,
  onDateCompletedChange,
  onRoleChange,
  onAutomationTypeChange,
  onModuleChange,
}) => {
  const availableModules = MODULES_BY_AUTOMATION_TYPE[appState.selectedAutomationType] || [];

  return (
    <div className="p-6 bg-white shadow rounded-lg mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Customer Company"
          id="customerCompany"
          type="text"
          value={appState.customerCompany}
          onChange={(e) => onCustomerCompanyChange(e.target.value)}
          placeholder="Enter company name"
        />
        <Input
          label="Customer Contact Name"
          id="customerName"
          type="text"
          value={appState.customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Enter contact name"
        />
        <Input
          label="Date Completed"
          id="dateCompleted"
          type="date"
          value={appState.dateCompleted}
          onChange={(e) => onDateCompletedChange(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
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
    </div>
  );
};

export default ControlsSection;