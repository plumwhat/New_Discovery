
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Role, AutomationType, TabId, ExportFormat, TabDefinition, RoiModuleState } from './types';
import { INITIAL_STATE, TABS, MODULES_BY_AUTOMATION_TYPE, ALL_MODULES, DISCOVERY_QUESTIONS_TEMPLATES, ROI_INPUT_TEMPLATES } from './constants';
import Header from './components/Header';
import ControlsSection from './components/ControlsSection';
import TabNavigation from './components/TabNavigation';
import ExportSection from './components/ExportSection';
import { generateExportContent, triggerDownload } from './services/exportService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);

  const { selectedRole, selectedAutomationType, selectedModuleId, activeTab, exportFormat } = appState;

  // Initialize discovery and ROI data for all modules if not present
  useEffect(() => {
    setAppState(currentAppState => {
      let needsUpdate = false;
      const newDiscoveryQuestions = { ...currentAppState.discoveryQuestions };
      const newRoiCalculator = { ...currentAppState.roiCalculator };

      ALL_MODULES.forEach(module => {
        if (!newDiscoveryQuestions[module.id]) {
          needsUpdate = true;
          const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
          newDiscoveryQuestions[module.id] = {
            qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
            quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
          };
        }
        if (!newRoiCalculator[module.id]) {
          needsUpdate = true;
          const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default;
          // Use defaults from INITIAL_STATE for the specific module if available, otherwise general defaults
          const initialModuleRoiState: RoiModuleState = INITIAL_STATE.roiCalculator[module.id] || {
            annualSalary: 60000,
            annualSoftwareCost: 10000,
            upfrontProfServicesCost: 5000,
            solutionLifespanYears: 3,
            inputs: {},
            results: null,
          };

          newRoiCalculator[module.id] = {
            ...initialModuleRoiState, // Spread to get all properties
            inputs: roiInputTemplate.reduce((acc, input) => { // Override inputs with template
              acc[input.id] = input.value;
              return acc;
            }, {} as { [inputId: string]: string | number }),
            results: null, // Ensure results are reset
          };
        }
      });

      if (needsUpdate) {
        return {
          ...currentAppState,
          discoveryQuestions: newDiscoveryQuestions,
          roiCalculator: newRoiCalculator,
        };
      }
      return currentAppState;
    });
  }, []); // Run once on mount


  const visibleTabs = TABS.filter(tab => tab.roles.includes(selectedRole));

  useEffect(() => {
    // If current activeTab is not visible for the new role, switch to the first available one
    if (!visibleTabs.find(tab => tab.id === activeTab)) {
      setAppState(prev => ({ ...prev, activeTab: visibleTabs[0]?.id || prev.activeTab }));
    }
  }, [selectedRole, activeTab, visibleTabs]);

  const handleRoleChange = useCallback((role: Role) => {
    setAppState(prev => ({ ...prev, selectedRole: role }));
  }, []);

  const handleAutomationTypeChange = useCallback((type: AutomationType) => {
    const newModules = MODULES_BY_AUTOMATION_TYPE[type] || [];
    const newSelectedModuleId = newModules.length > 0 ? newModules[0].id : null;
    setAppState(prev => ({ 
      ...prev, 
      selectedAutomationType: type,
      selectedModuleId: newSelectedModuleId,
    }));
  }, []);

  const handleModuleChange = useCallback((moduleId: string) => {
    setAppState(prev => ({ ...prev, selectedModuleId: moduleId }));
  }, []);

  const handleTabChange = useCallback((tabId: TabId) => {
    setAppState(prev => ({ ...prev, activeTab: tabId }));
  }, []);

  const handleExportFormatChange = useCallback((format: ExportFormat) => {
    setAppState(prev => ({ ...prev, exportFormat: format }));
  }, []);

  const handleExportData = useCallback(() => {
    const content = generateExportContent(appState);
    const moduleName = selectedModuleId ? ALL_MODULES.find(m => m.id === selectedModuleId)?.name.replace(/\s+/g, '_') : 'General';
    const filename = `${moduleName}_Report_${new Date().toISOString().slice(0,10)}.${exportFormat === ExportFormat.AI_PROMPT ? 'txt' : exportFormat}`;
    triggerDownload(content, filename, exportFormat);
  }, [appState, selectedModuleId, exportFormat]);
  
  const handleClearForm = useCallback(() => {
    if(window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      // Re-initialize state, ensuring dynamic parts are also reset
      const freshInitialState = JSON.parse(JSON.stringify(INITIAL_STATE)); // Deep copy to avoid mutation issues with nested objects
      const newDiscoveryQuestions = { ...freshInitialState.discoveryQuestions };
      const newRoiCalculator = { ...freshInitialState.roiCalculator };

       ALL_MODULES.forEach(module => {
          const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
          newDiscoveryQuestions[module.id] = {
            qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
            quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
          };
        
          const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default;
           // Get default values for this module from the fresh initial state
          const initialModuleRoiState: RoiModuleState = freshInitialState.roiCalculator[module.id] || {
            annualSalary: 60000,
            annualSoftwareCost: 10000,
            upfrontProfServicesCost: 5000,
            solutionLifespanYears: 3,
            inputs: {}, // Will be overridden by template below
            results: null,
          };

          newRoiCalculator[module.id] = {
            ...initialModuleRoiState, // Spread to get all base properties
            inputs: roiInputTemplate.reduce((acc, input) => { // Override inputs with template
              acc[input.id] = input.value;
              return acc;
            }, {} as { [inputId: string]: string | number }),
            results: null, // Ensure results are reset
          };
      });
      setAppState({
        ...freshInitialState, // Spread the base fresh state
        discoveryQuestions: newDiscoveryQuestions, // Apply the newly initialized discovery questions
        roiCalculator: newRoiCalculator, // Apply the newly initialized ROI calculator data
      });
    }
  }, []);

  const ActiveTabContent = visibleTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100 font-['Inter'] text-gray-900">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-7xl">
        <ControlsSection
          appState={appState}
          onRoleChange={handleRoleChange}
          onAutomationTypeChange={handleAutomationTypeChange}
          onModuleChange={handleModuleChange}
        />
        <TabNavigation
          tabs={visibleTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <div className="tab-content">
          {ActiveTabContent ? <ActiveTabContent appState={appState} setAppState={setAppState} /> : <p>Select a tab.</p>}
        </div>
        <ExportSection
          exportFormat={exportFormat}
          onFormatChange={handleExportFormatChange}
          onExport={handleExportData}
          onClearForm={handleClearForm}
        />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Process Automation Tool. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
