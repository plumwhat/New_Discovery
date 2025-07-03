

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AppState, Role, ServiceType, TabId, ExportFormat, TabDefinition } from './types'; // Renamed AutomationType to ServiceType
import { loadInitialState } from './services/appInitializer'; 
import { INITIAL_STATE } from './constants/initialStateConstants'; 
import { TAB_METADATA } from './constants/tabConstants';
import { MODULES_BY_SERVICE_TYPE, ALL_MODULES } from './constants/moduleConstants'; // Renamed from MODULES_BY_AUTOMATION_TYPE
import { getFooterCopyrightOwner } from './services/configService'; // Import new getter
import { initialPainPointsState } from './constants/painPointConstants';
import { initialCustomerConversationState } from './constants/initialStateConstants';


import Header from './components/Header';
import ControlsSection from './components/ControlsSection';
import TabNavigation from './components/TabNavigation';
import ExportSection from './components/ExportSection';
import AdminPanel from './components/admin/AdminPanel'; // Import AdminPanel
import { generateExportContent, triggerDownload } from './services/exportService';

// Import Tab Components
import HomeTab from './components/HomeTab';
import CustomerConversationsTab from './components/CustomerConversationsTab';
import OpportunityScorecardTab from './components/OpportunityScorecardTab';
import EngagementWorkflowTab from './components/EngagementWorkflowTab';
import QualificationTab from './components/QualificationTab';
import DiscoveryQuestionsTab from './components/DiscoveryQuestionsTab';
import RoiCalculatorTab from './components/RoiCalculatorTab';
import SolutionBuilderTab from './components/SolutionBuilderTab';
import { PainPointsTab } from './components/PainPointsTab';
import HelpTab from './components/HelpTab';
import CustomerRetentionPlaybookTab from './components/CustomerRetentionPlaybookTab';

const TAB_COMPONENTS: Record<TabId, React.FC<any>> = {
  [TabId.HOME]: HomeTab,
  [TabId.CUSTOMER_CONVERSATIONS]: CustomerConversationsTab,
  [TabId.PAIN_POINTS]: PainPointsTab,
  [TabId.OPPORTUNITY_SCORECARD]: OpportunityScorecardTab,
  [TabId.ENGAGEMENT_WORKFLOW]: EngagementWorkflowTab,
  [TabId.QUALIFICATION]: QualificationTab,
  [TabId.DISCOVERY_QUESTIONS]: DiscoveryQuestionsTab,
  [TabId.ROI_CALCULATOR]: RoiCalculatorTab,
  [TabId.SOLUTION_BUILDER]: SolutionBuilderTab,
  [TabId.CUSTOMER_RETENTION_PLAYBOOK]: CustomerRetentionPlaybookTab,
  [TabId.HELP]: HelpTab,
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(loadInitialState);

  const {
    customerCompany, customerName, dateCompleted,
    selectedRole, selectedServiceType, selectedModuleId, activeTab, exportFormat, isAdminPanelVisible // Renamed selectedAutomationType to selectedServiceType
  } = appState;


  useEffect(() => {
    const stateToSave = { ...appState };
    // Do not save isAdminPanelVisible to localStorage
    delete stateToSave.isAdminPanelVisible;
    localStorage.setItem('appState', JSON.stringify(stateToSave));
  }, [appState]);

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

  const handleServiceTypeChange = useCallback((type: ServiceType) => { // Renamed from handleAutomationTypeChange
    const newModules = MODULES_BY_SERVICE_TYPE[type] || []; // Renamed from MODULES_BY_AUTOMATION_TYPE
    const newSelectedModuleId = newModules.length > 0 ? newModules[0].id : null;
    setAppState(prev => ({
      ...prev,
      selectedServiceType: type, // Renamed from selectedAutomationType
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

  const handleResetAllData = useCallback(() => {
    if(window.confirm("Are you sure you want to reset all application data? This action cannot be undone.")) {
      // Preserve admin panel visibility
      setAppState(prev => ({...loadInitialState(), isAdminPanelVisible: prev.isAdminPanelVisible})); 
    }
  }, [setAppState]);


  const handleClearCurrentTabData = useCallback(() => {
    if (!window.confirm(`Are you sure you want to clear data for the current tab (${activeTab})? This action cannot be undone.`)) {
      return;
    }
    setAppState(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); 
      const baseInitialStateCopy = JSON.parse(JSON.stringify(INITIAL_STATE));

      switch (activeTab) {
        case TabId.OPPORTUNITY_SCORECARD:
          newState.opportunityScorecard = baseInitialStateCopy.opportunityScorecard;
          break;
        case TabId.ENGAGEMENT_WORKFLOW:
          newState.engagementWorkflow = baseInitialStateCopy.engagementWorkflow;
          break;
        case TabId.QUALIFICATION:
          newState.qualification = baseInitialStateCopy.qualification;
          break;
        case TabId.DISCOVERY_QUESTIONS:
          if (prev.selectedModuleId) {
            newState.discoveryQuestions[prev.selectedModuleId] = baseInitialStateCopy.discoveryQuestions[prev.selectedModuleId] || { qualitative: [], quantitative: [] };
          }
          break;
        case TabId.ROI_CALCULATOR:
          if (prev.selectedModuleId) {
            newState.roiCalculator[prev.selectedModuleId] = baseInitialStateCopy.roiCalculator[prev.selectedModuleId] || {
                annualSalary: 60000, annualSoftwareCost: 10000, upfrontProfServicesCost: 5000, solutionLifespanYears: 3, inputs: {}, results: null,
            };
          }
          break;
        case TabId.SOLUTION_BUILDER:
          newState.solutionBuilder = baseInitialStateCopy.solutionBuilder;
          break;
        case TabId.PAIN_POINTS:
          newState.painPoints = JSON.parse(JSON.stringify(initialPainPointsState));
          break;
        case TabId.CUSTOMER_CONVERSATIONS:
          newState.customerConversations = JSON.parse(JSON.stringify(initialCustomerConversationState));
          break;
        case TabId.CUSTOMER_RETENTION_PLAYBOOK:
          newState.customerRetention = baseInitialStateCopy.customerRetention;
          break;
      }
      return newState;
    });
  }, [activeTab, setAppState]);
  
  const toggleAdminPanel = useCallback(() => {
    setAppState(prev => ({ ...prev, isAdminPanelVisible: !prev.isAdminPanelVisible }));
  }, []);

  const handleAdminConfigSaved = useCallback(() => {
    // Reload initial state to pick up new configurations from configService
    setAppState(prev => ({...loadInitialState(), isAdminPanelVisible: prev.isAdminPanelVisible}));
    alert("Admin configurations saved. The application has been refreshed with new settings.");
  }, [setAppState]);


  const ActiveTabComponent = visibleTabs.find(tab => tab.id === activeTab)?.component;
  const footerCopyrightOwner = getFooterCopyrightOwner(); // Get from config service

  return (
    <div className="min-h-screen bg-gray-100 font-['Inter'] text-gray-900">
      <Header 
        toggleAdminPanel={toggleAdminPanel} 
        onResetAllData={handleResetAllData} 
      />
      {isAdminPanelVisible && (
        <AdminPanel 
          onClose={toggleAdminPanel}
          onConfigSaved={handleAdminConfigSaved}
        />
      )}
      <main className={`container mx-auto p-4 md:p-8 max-w-7xl ${isAdminPanelVisible ? 'hidden' : ''}`}>
        <ControlsSection
          appState={appState}
          onCustomerCompanyChange={handleCustomerCompanyChange}
          onCustomerNameChange={handleCustomerNameChange}
          onDateCompletedChange={handleDateCompletedChange}
          onRoleChange={handleRoleChange}
          onServiceTypeChange={handleServiceTypeChange} // Renamed prop
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
          onResetAllData={handleResetAllData} // Changed prop name
          onClearCurrentTab={handleClearCurrentTabData}
        />
      </main>
      <footer className={`text-center p-4 text-sm text-gray-500 print-hidden ${isAdminPanelVisible ? 'hidden' : ''}`}>
        &copy; {new Date().getFullYear()} {footerCopyrightOwner}. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
