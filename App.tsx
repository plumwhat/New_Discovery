
import React, { useState, useEffect, useCallback } from 'react';
import { AppState, Role, AutomationType, TabId, ExportFormat, TabDefinition, RoiModuleState, RoiCalculationFactors, QualificationStatus, QualificationModuleData } from './types';
import { 
    INITIAL_STATE, 
    TABS, 
    MODULES_BY_AUTOMATION_TYPE, 
    ALL_MODULES, 
    DISCOVERY_QUESTIONS_TEMPLATES, 
    ROI_INPUT_TEMPLATES,
    DEFAULT_AP_CALCULATION_FACTORS,
    DEFAULT_GENERIC_CALCULATION_FACTORS,
    QUALIFICATION_QUESTIONS_MODULE_TEMPLATES // Added for initialization
} from './constants';
import Header from './components/Header';
import ControlsSection from './components/ControlsSection';
import TabNavigation from './components/TabNavigation';
import ExportSection from './components/ExportSection';
import { generateExportContent, triggerDownload } from './services/exportService';

const initialSingleQualificationSectionState = {
  answers: {},
  averageScore: 0,
  status: QualificationStatus.NOT_STARTED,
};

const getInitialQualificationModuleData = (): QualificationModuleData => ({
  qualitative: { ...initialSingleQualificationSectionState, answers: {} },
  quantitative: { ...initialSingleQualificationSectionState, answers: {} },
});


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    // Deep copy INITIAL_STATE to prevent shared references, especially for nested objects
    const initialStateCopy = JSON.parse(JSON.stringify(INITIAL_STATE));
    
    // Ensure all modules have their qualification data initialized
    ALL_MODULES.forEach(module => {
        if (!initialStateCopy.qualification.moduleData[module.id]) {
            initialStateCopy.qualification.moduleData[module.id] = getInitialQualificationModuleData();
        }
    });
    return initialStateCopy;
  });

  const { selectedRole, selectedAutomationType, selectedModuleId, activeTab, exportFormat } = appState;

  // Initialize discovery and ROI data for all modules if not present (runs once on mount)
   useEffect(() => {
    setAppState(currentAppState => {
      let needsUpdate = false;
      const newDiscoveryQuestions = { ...currentAppState.discoveryQuestions };
      const newRoiCalculator = { ...currentAppState.roiCalculator };
      const newQualificationData = { ...currentAppState.qualification.moduleData };

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
          const defaultFactors = module.id === 'accountsPayable' ? { ...DEFAULT_AP_CALCULATION_FACTORS } : { ...DEFAULT_GENERIC_CALCULATION_FACTORS };
          
          newRoiCalculator[module.id] = {
            annualSalary: INITIAL_STATE.roiCalculator[module.id]?.annualSalary || 60000,
            annualSoftwareCost: INITIAL_STATE.roiCalculator[module.id]?.annualSoftwareCost || 10000,
            upfrontProfServicesCost: INITIAL_STATE.roiCalculator[module.id]?.upfrontProfServicesCost || 5000,
            solutionLifespanYears: INITIAL_STATE.roiCalculator[module.id]?.solutionLifespanYears || 3,
            inputs: roiInputTemplate.reduce((acc, input) => {
              acc[input.id] = input.value;
              return acc;
            }, {} as { [inputId: string]: string | number }),
            results: null,
            calculationFactors: { ...defaultFactors },
            defaultCalculationFactors: { ...defaultFactors },
          };
        }
        if (!newQualificationData[module.id]) {
            needsUpdate = true;
            newQualificationData[module.id] = getInitialQualificationModuleData();
        }
      });

      if (needsUpdate) {
        return {
          ...currentAppState,
          discoveryQuestions: newDiscoveryQuestions,
          roiCalculator: newRoiCalculator,
          qualification: {
            ...currentAppState.qualification,
            moduleData: newQualificationData,
          }
        };
      }
      return currentAppState;
    });
  }, []); 


  const visibleTabs = TABS.filter(tab => tab.roles.includes(selectedRole));

  useEffect(() => {
    if (!visibleTabs.find(tab => tab.id === activeTab) && visibleTabs.length > 0) {
      setAppState(prev => ({ ...prev, activeTab: visibleTabs[0].id }));
    } else if (visibleTabs.length === 0 && activeTab !== null) {
       setAppState(prev => ({ ...prev, activeTab: TABS[0].id }));
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
      const freshInitialState = JSON.parse(JSON.stringify(INITIAL_STATE)); 
      
      const newDiscoveryQuestions = { ...freshInitialState.discoveryQuestions };
      const newRoiCalculator = { ...freshInitialState.roiCalculator };
      const newQualificationModuleData: { [moduleId: string]: QualificationModuleData } = {};

       ALL_MODULES.forEach(module => {
          const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
          newDiscoveryQuestions[module.id] = {
            qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
            quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
          };
        
          const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default;
          const defaultFactors: RoiCalculationFactors = module.id === 'accountsPayable' 
            ? { ...DEFAULT_AP_CALCULATION_FACTORS } 
            : { ...DEFAULT_GENERIC_CALCULATION_FACTORS };
          
          newRoiCalculator[module.id] = {
            annualSalary: freshInitialState.roiCalculator[module.id]?.annualSalary || 60000,
            annualSoftwareCost: freshInitialState.roiCalculator[module.id]?.annualSoftwareCost || 10000,
            upfrontProfServicesCost: freshInitialState.roiCalculator[module.id]?.upfrontProfServicesCost || 5000,
            solutionLifespanYears: freshInitialState.roiCalculator[module.id]?.solutionLifespanYears || 3,
            inputs: roiInputTemplate.reduce((acc, input) => { 
              acc[input.id] = input.value;
              return acc;
            }, {} as { [inputId: string]: string | number }),
            results: null, 
            calculationFactors: { ...defaultFactors },
            defaultCalculationFactors: { ...defaultFactors },
          };

          newQualificationModuleData[module.id] = getInitialQualificationModuleData();
      });

      setAppState({
        ...freshInitialState, 
        discoveryQuestions: newDiscoveryQuestions, 
        roiCalculator: newRoiCalculator, 
        qualification: {
            ...freshInitialState.qualification,
            moduleData: newQualificationModuleData,
        }
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
        &copy; 2025 Brad Whatman
      </footer>
    </div>
  );
};

export default App;
