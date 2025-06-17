

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppState, Role, AutomationType, TabId, ExportFormat, TabDefinition, DiscoveryAnswer, RoiModuleState } from './types';
import { INITIAL_STATE, TAB_METADATA, MODULES_BY_AUTOMATION_TYPE, ALL_MODULES, DISCOVERY_QUESTIONS_TEMPLATES, ROI_INPUT_TEMPLATES } from './constants';

import Header from './components/Header';
import ControlsSection from './components/ControlsSection';
import TabNavigation from './components/TabNavigation';
import ExportSection from './components/ExportSection';
import { generateExportContent, triggerDownload } from './services/exportService';

// Import Tab Components
import HomeTab from './components/HomeTab';
import OpportunityScorecardTab from './components/OpportunityScorecardTab';
import QualificationTab from './components/QualificationTab';
import DiscoveryQuestionsTab from './components/DiscoveryQuestionsTab';
import RoiCalculatorTab from './components/RoiCalculatorTab';
import SolutionBuilderTab from './components/SolutionBuilderTab';

const TAB_COMPONENTS: Record<TabId, React.FC<any>> = {
  [TabId.HOME]: HomeTab,
  [TabId.OPPORTUNITY_SCORECARD]: OpportunityScorecardTab,
  [TabId.QUALIFICATION]: QualificationTab,
  [TabId.DISCOVERY_QUESTIONS]: DiscoveryQuestionsTab,
  [TabId.ROI_CALCULATOR]: RoiCalculatorTab,
  [TabId.SOLUTION_BUILDER]: SolutionBuilderTab,
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => JSON.parse(JSON.stringify(INITIAL_STATE)));
  const { 
    customerCompany, customerName, dateCompleted,
    selectedRole, selectedAutomationType, selectedModuleId, activeTab, exportFormat 
  } = appState;

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
          const initialModuleRoiStateBase = INITIAL_STATE.roiCalculator[module.id] || {
            annualSalary: 60000,
            annualSoftwareCost: 10000,
            upfrontProfServicesCost: 5000,
            solutionLifespanYears: 3,
            inputs: {},
            results: null,
          };

          newRoiCalculator[module.id] = {
            ...initialModuleRoiStateBase,
            inputs: roiInputTemplate.reduce((acc, input) => {
              acc[input.id] = input.value;
              return acc;
            }, {} as { [inputId: string]: string | number }),
            results: null, 
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
  }, []);

  const effectiveTabs: TabDefinition[] = useMemo(() => {
    return TAB_METADATA.map(tabMeta => ({
      ...tabMeta,
      component: TAB_COMPONENTS[tabMeta.id],
    }));
  }, []);

  const visibleTabs = useMemo(() => {
    return effectiveTabs.filter(tab => tab.roles.includes(selectedRole));
  }, [selectedRole, effectiveTabs]);

  useEffect(() => {
    if (!visibleTabs.find(tab => tab.id === activeTab)) {
      setAppState(prev => ({ ...prev, activeTab: visibleTabs[0]?.id || TabId.HOME }));
    }
  }, [selectedRole, activeTab, visibleTabs]);

  const handleCustomerCompanyChange = useCallback((company: string) => {
    setAppState(prev => ({ ...prev, customerCompany: company }));
  }, []);

  const handleCustomerNameChange = useCallback((name: string) => {
    setAppState(prev => ({ ...prev, customerName: name }));
  }, []);

  const handleDateCompletedChange = useCallback((date: string) => {
    setAppState(prev => ({ ...prev, dateCompleted: date }));
  }, []);

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
    const companyName = customerCompany.replace(/\s+/g, '_') || 'Customer';
    const filename = `${companyName}_${moduleName}_Report_${dateCompleted}.${exportFormat === ExportFormat.AI_PROMPT ? 'txt' : exportFormat}`;
    triggerDownload(content, filename, exportFormat);
  }, [appState, selectedModuleId, exportFormat, customerCompany, dateCompleted]);
  
  const handleClearForm = useCallback(() => {
    if(window.confirm("Are you sure you want to clear ALL data from every tab? This action cannot be undone.")) {
      // Create a deep clone of INITIAL_STATE which contains all default structures.
      const freshInitialState = JSON.parse(JSON.stringify(INITIAL_STATE));
      // Ensure dateCompleted is set to the current day, as INITIAL_STATE's date is fixed at load time.
      freshInitialState.dateCompleted = new Date().toISOString().slice(0, 10);
      setAppState(freshInitialState);
    }
  }, [setAppState]);

  const handleClearCurrentTabData = useCallback(() => {
    if (!window.confirm(`Are you sure you want to clear data for the current tab (${activeTab})? This action cannot be undone.`)) {
      return;
    }
    setAppState(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); // Deep clone current state to modify

      switch (activeTab) {
        case TabId.OPPORTUNITY_SCORECARD:
          newState.opportunityScorecard = JSON.parse(JSON.stringify(INITIAL_STATE.opportunityScorecard));
          break;
        case TabId.QUALIFICATION:
          newState.qualification = JSON.parse(JSON.stringify(INITIAL_STATE.qualification));
          break;
        case TabId.DISCOVERY_QUESTIONS:
          if (prev.selectedModuleId && INITIAL_STATE.discoveryQuestions[prev.selectedModuleId]) {
            newState.discoveryQuestions[prev.selectedModuleId] = JSON.parse(JSON.stringify(INITIAL_STATE.discoveryQuestions[prev.selectedModuleId]));
          } else if (prev.selectedModuleId) { // Fallback if module somehow not in INITIAL_STATE (should not happen with current setup)
             const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[prev.selectedModuleId] || DISCOVERY_QUESTIONS_TEMPLATES.default;
             newState.discoveryQuestions[prev.selectedModuleId] = {
                qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
                quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
             };
          }
          break;
        case TabId.ROI_CALCULATOR:
          if (prev.selectedModuleId && INITIAL_STATE.roiCalculator[prev.selectedModuleId]) {
            newState.roiCalculator[prev.selectedModuleId] = JSON.parse(JSON.stringify(INITIAL_STATE.roiCalculator[prev.selectedModuleId]));
          } else if (prev.selectedModuleId) { // Fallback (should not happen with current setup)
            const roiInputTemplate = ROI_INPUT_TEMPLATES[prev.selectedModuleId] || ROI_INPUT_TEMPLATES.default;
            // Reconstruct a basic initial state for this module's ROI
            newState.roiCalculator[prev.selectedModuleId] = {
                annualSalary: 60000, // Default values
                annualSoftwareCost: 10000,
                upfrontProfServicesCost: 5000,
                solutionLifespanYears: 3,
                inputs: roiInputTemplate.reduce((acc, input) => {
                    acc[input.id] = input.value; // Reset to template default (empty string)
                    return acc;
                }, {} as { [inputId: string]: string | number }),
                results: null,
            };
          }
          break;
        case TabId.SOLUTION_BUILDER:
          newState.solutionBuilder = JSON.parse(JSON.stringify(INITIAL_STATE.solutionBuilder));
          break;
        // Home tab and general app controls (customerCompany, etc.) are not cleared by "Clear Current Tab"
      }
      return newState;
    });
  }, [activeTab, setAppState]);

  const ActiveTabComponent = visibleTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-100 font-['Inter'] text-gray-900">
      <Header />
      <main className="container mx-auto p-4 md:p-8 max-w-7xl">
        <ControlsSection
          appState={appState}
          onCustomerCompanyChange={handleCustomerCompanyChange}
          onCustomerNameChange={handleCustomerNameChange}
          onDateCompletedChange={handleDateCompletedChange}
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
          {ActiveTabComponent ? <ActiveTabComponent appState={appState} setAppState={setAppState} /> : <p>Select a tab.</p>}
        </div>
        <ExportSection
          exportFormat={exportFormat}
          onFormatChange={handleExportFormatChange}
          onExport={handleExportData}
          onClearForm={handleClearForm}
          onClearCurrentTab={handleClearCurrentTabData} // Pass new handler
        />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Process Automation Tool. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
