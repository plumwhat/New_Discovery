

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppState, Role, AutomationType, TabId, ExportFormat, TabDefinition, DiscoveryAnswer, RoiModuleState, PainPointLevel1Pain, QualificationQuestion, EditableDiscoveryQuestionsTemplates, EditableModuleSolutionContentMap, ConversationStepId } from './types'; // Removed EditableReverseWaterfallCheatSheets
import { 
    INITIAL_STATE, 
    TAB_METADATA, 
    MODULES_BY_AUTOMATION_TYPE, 
    ALL_MODULES, 
    DISCOVERY_QUESTIONS_TEMPLATES as defaultDiscoveryTemplatesConst, 
    ROI_INPUT_TEMPLATES as defaultRoiInputTemplatesConst, 
    FOOTER_COPYRIGHT_OWNER, 
    // QUALIFICATION_QUESTIONS_QUALITATIVE as defaultQualQualQuestionsConst, // Removed
    // QUALIFICATION_QUESTIONS_QUANTITATIVE as defaultQualQuantQuestionsConst, // Removed
    QUALIFICATION_QUESTIONS_BY_MODULE, // Keep this for potential future use if needed for direct access, though currently QualificationTab handles its own questions.
    initialPainPointsState,
    initialCustomerConversationState
} from './constants';

import Header from './components/Header';
import ControlsSection from './components/ControlsSection';
import TabNavigation from './components/TabNavigation';
import ExportSection from './components/ExportSection';
import { generateExportContent, triggerDownload, generateSolutionDocumentContent } from './services/exportService'; 
// Removed: import AdminPanel from './components/admin/AdminPanel'; 
// Removed: import { useEditableData, clearAllAdminCustomizations } from './hooks/useEditableData'; 

// Import Tab Components
import HomeTab from './components/HomeTab';
import CustomerConversationsTab from './components/CustomerConversationsTab'; 
import OpportunityScorecardTab from './components/OpportunityScorecardTab';
import QualificationTab from './components/QualificationTab';
import DiscoveryQuestionsTab from './components/DiscoveryQuestionsTab';
import RoiCalculatorTab from './components/RoiCalculatorTab';
import SolutionBuilderTab from './components/SolutionBuilderTab';
import { PainPointsTab } from './components/PainPointsTab'; // Changed to named import
import HelpTab from './components/HelpTab'; // New HelpTab import

const TAB_COMPONENTS: Record<TabId, React.FC<any>> = {
  [TabId.HOME]: HomeTab,
  [TabId.CUSTOMER_CONVERSATIONS]: CustomerConversationsTab, 
  [TabId.PAIN_POINTS]: PainPointsTab,
  [TabId.OPPORTUNITY_SCORECARD]: OpportunityScorecardTab,
  [TabId.QUALIFICATION]: QualificationTab,
  [TabId.DISCOVERY_QUESTIONS]: DiscoveryQuestionsTab,
  [TabId.ROI_CALCULATOR]: RoiCalculatorTab,
  [TabId.SOLUTION_BUILDER]: SolutionBuilderTab,
  [TabId.HELP]: HelpTab, // Added HelpTab
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
        try {
            const parsedState = JSON.parse(storedState);
            // Ensure admin mode is not part of the loaded state
            const { isAdminModeActive, ...restOfParsedState } = parsedState; 
            
            // Handle potential old SDR_SAD role from localStorage
            let validatedSelectedRole = restOfParsedState.selectedRole;
            if (validatedSelectedRole === "SDR/SAD") { // Check for the old string value
                validatedSelectedRole = Role.SDR; // Default to SDR or another appropriate role
            }


            const validatedState = {
                ...INITIAL_STATE, 
                ...restOfParsedState,
                selectedRole: validatedSelectedRole, // Use validated role
                painPoints: parsedState.painPoints ? { ...initialPainPointsState, ...parsedState.painPoints } : JSON.parse(JSON.stringify(initialPainPointsState)),
                customerConversations: parsedState.customerConversations ? { ...initialCustomerConversationState, ...parsedState.customerConversations } : JSON.parse(JSON.stringify(initialCustomerConversationState)),
                // isAdminModeActive is removed
            };
            return validatedState;
        } catch (error) {
            console.error("Error parsing stored app state:", error);
        }
    }
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  });

  const { 
    customerCompany, customerName, dateCompleted,
    selectedRole, selectedAutomationType, selectedModuleId, activeTab, exportFormat 
  } = appState;


  useEffect(() => {
    const { ...stateToSave } = appState;
    delete (stateToSave as any).isAdminModeActive; 
    localStorage.setItem('appState', JSON.stringify(stateToSave));
  }, [appState]);


  useEffect(() => {
    setAppState(currentAppState => {
      let needsUpdate = false;
      const newDiscoveryQuestions = { ...currentAppState.discoveryQuestions };
      const newRoiCalculator = { ...currentAppState.roiCalculator };

      ALL_MODULES.forEach(module => {
        const currentModuleDiscovery = newDiscoveryQuestions[module.id];
        const templateForModule = defaultDiscoveryTemplatesConst[module.id];

        if (!currentModuleDiscovery || (templateForModule && (
            (currentModuleDiscovery.qualitative?.length || 0) === 0 && templateForModule.qualitative.length > 0 ||
            (currentModuleDiscovery.quantitative?.length || 0) === 0 && templateForModule.quantitative.length > 0
        ))) {
          needsUpdate = true;
          if (templateForModule) {
            newDiscoveryQuestions[module.id] = {
              qualitative: templateForModule.qualitative.map(q => ({ 
                  questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false 
              })),
              quantitative: templateForModule.quantitative.map(q => ({ 
                  questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false
              })),
            };
          } else {
             newDiscoveryQuestions[module.id] = { qualitative: [], quantitative: [] };
          }
        }

        if (!newRoiCalculator[module.id]?.inputs || Object.keys(newRoiCalculator[module.id].inputs).length === 0) {
          needsUpdate = true;
          const roiInputTemplate = defaultRoiInputTemplatesConst[module.id] || defaultRoiInputTemplatesConst.default;
          const baseRoiModuleState = INITIAL_STATE.roiCalculator[module.id] || {
            annualSalary: 60000, annualSoftwareCost: 10000, upfrontProfServicesCost: 5000, solutionLifespanYears: 3, inputs: {}, results: null,
          };
          newRoiCalculator[module.id] = {
            ...baseRoiModuleState,
            inputs: roiInputTemplate.reduce((acc, input) => { acc[input.id] = input.value; return acc; }, {} as { [inputId: string]: string | number }),
            results: null, 
          };
        }
      });
      
      let finalState = { ...currentAppState };
      if (needsUpdate) {
        finalState.discoveryQuestions = newDiscoveryQuestions;
        finalState.roiCalculator = newRoiCalculator;
      }
      if (!finalState.painPoints) { 
          finalState.painPoints = JSON.parse(JSON.stringify(initialPainPointsState));
          needsUpdate = true; 
      }
      if (!finalState.customerConversations) { // Ensure Customer Conversations state is initialized
          finalState.customerConversations = JSON.parse(JSON.stringify(initialCustomerConversationState));
          needsUpdate = true;
      }

      return needsUpdate ? finalState : currentAppState;
    });
  }, []); 

  const effectiveTabs: TabDefinition[] = useMemo(() => {
    return TAB_METADATA.map(tabMeta => ({
      ...tabMeta,
      component: TAB_COMPONENTS[tabMeta.id],
    })).filter(tab => tab.component);
  }, []);

  const visibleTabs = useMemo(() => {
    return effectiveTabs.filter(tab => tab.roles.includes(selectedRole));
  }, [selectedRole, effectiveTabs]);

  useEffect(() => {
    if (visibleTabs.length > 0 && !visibleTabs.find(tab => tab.id === activeTab)) {
      setAppState(prev => ({ ...prev, activeTab: visibleTabs[0].id }));
    } else if (visibleTabs.length === 0 && activeTab !== TabId.HOME) {
      const homeTabAvailable = effectiveTabs.find(tab => tab.id === TabId.HOME);
      if (homeTabAvailable) {
        setAppState(prev => ({ ...prev, activeTab: TabId.HOME }));
      }
    }
  }, [selectedRole, activeTab, visibleTabs, effectiveTabs]);
  

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
    const currentModule = ALL_MODULES.find(m => m.id === appState.selectedModuleId);
    const moduleName = currentModule ? currentModule.name.replace(/\s+/g, '_') : 'General';
    const companyNameClean = appState.customerCompany.replace(/\s+/g, '_') || 'Customer';
    const filename = `${companyNameClean}_${moduleName}_Report_${appState.dateCompleted}.${appState.exportFormat === ExportFormat.AI_PROMPT ? 'txt' : appState.exportFormat}`;
    triggerDownload(content, filename, appState.exportFormat);
  }, [appState]);
  
  const handleClearForm = useCallback(() => {
    if(window.confirm("Are you sure you want to clear ALL data from every tab? This action cannot be undone.")) {
      const freshInitialState = JSON.parse(JSON.stringify(INITIAL_STATE));
      freshInitialState.dateCompleted = new Date().toISOString().slice(0, 10);
      freshInitialState.painPoints = JSON.parse(JSON.stringify(initialPainPointsState));
      freshInitialState.customerConversations = JSON.parse(JSON.stringify(initialCustomerConversationState));

      ALL_MODULES.forEach(module => {
          const discoveryTemplate = defaultDiscoveryTemplatesConst[module.id];
          if (discoveryTemplate) {
            freshInitialState.discoveryQuestions[module.id] = {
              qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false})),
              quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false})),
            };
          } else {
             freshInitialState.discoveryQuestions[module.id] = { qualitative: [], quantitative: [] };
          }

          const roiInputTemplate = defaultRoiInputTemplatesConst[module.id] || defaultRoiInputTemplatesConst.default;
          freshInitialState.roiCalculator[module.id] = {
            annualSalary: 60000,
            annualSoftwareCost: 10000,
            upfrontProfServicesCost: 5000,
            solutionLifespanYears: 3,
            inputs: roiInputTemplate.reduce((acc, input) => {
              acc[input.id] = input.value; 
              return acc;
            }, {} as { [inputId: string]: string | number }),
            results: null,
          };
      });
      setAppState(freshInitialState);
    }
  }, [setAppState]); 

  const handleClearCurrentTabData = useCallback(() => {
    if (!window.confirm(`Are you sure you want to clear data for the current tab (${activeTab})? This action cannot be undone.`)) {
      return;
    }
    setAppState(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); 

      switch (activeTab) {
        case TabId.OPPORTUNITY_SCORECARD:
          newState.opportunityScorecard = JSON.parse(JSON.stringify(INITIAL_STATE.opportunityScorecard));
          break;
        case TabId.QUALIFICATION:
          newState.qualification = JSON.parse(JSON.stringify(INITIAL_STATE.qualification));
          break;
        case TabId.DISCOVERY_QUESTIONS:
          if (prev.selectedModuleId) {
            const discoveryTemplate = defaultDiscoveryTemplatesConst[prev.selectedModuleId];
            if (discoveryTemplate) {
                 newState.discoveryQuestions[prev.selectedModuleId] = {
                    qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
                    quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
                 };
            } else {
                 newState.discoveryQuestions[prev.selectedModuleId] = { qualitative: [], quantitative: [] };
            }
          }
          break;
        case TabId.ROI_CALCULATOR:
          if (prev.selectedModuleId) { 
            const roiInputTemplate = defaultRoiInputTemplatesConst[prev.selectedModuleId] || defaultRoiInputTemplatesConst.default;
            const baseRoiModuleState = INITIAL_STATE.roiCalculator[prev.selectedModuleId] || {
                annualSalary: 60000, annualSoftwareCost: 10000, upfrontProfServicesCost: 5000, solutionLifespanYears: 3, inputs: {}, results: null,
            };
            newState.roiCalculator[prev.selectedModuleId] = {
                ...baseRoiModuleState,
                inputs: roiInputTemplate.reduce((acc, input) => {
                    acc[input.id] = input.value; 
                    return acc;
                }, {} as { [inputId: string]: string | number }),
                results: null,
            };
          }
          break;
        case TabId.SOLUTION_BUILDER:
          newState.solutionBuilder = JSON.parse(JSON.stringify(INITIAL_STATE.solutionBuilder));
          break;
        case TabId.PAIN_POINTS:
          newState.painPoints = JSON.parse(JSON.stringify(initialPainPointsState));
          break;
        case TabId.CUSTOMER_CONVERSATIONS: 
          newState.customerConversations = JSON.parse(JSON.stringify(initialCustomerConversationState));
          break;
        case TabId.HELP: // Help tab is static, no data to clear
          break;
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
          onClearCurrentTab={handleClearCurrentTabData} 
        />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {FOOTER_COPYRIGHT_OWNER}. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
