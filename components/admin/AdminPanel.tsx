

import React, { useState, useEffect, useCallback } from 'react';
import { 
    AdminConfigStructure, 
    ScorecardQuestion, 
    RoiInput, 
    RoiCalculationConstants as RoiCalculationConstantsType,
    Module,
    AllModuleQualificationQuestions,
    ModuleQualificationQuestions,
    QualificationQuestion,
    QualificationQuestionOption,
    EditableDiscoveryQuestionsTemplates,
    DiscoveryQuestion,
    PainPointLevel1Pain,
    EditableReverseWaterfallCheatSheets,
    ReverseWaterfallCheatSheetKeyPoint,
    EditableModuleSolutionContentMap,
    EditableModuleSolutionContent,
} from '../../types';
import { 
    loadAdminConfig, 
    saveAdminConfig, 
    clearAdminConfig,
    getAppTitle as getDefaultAppTitle,
    getAppSubtitle as getDefaultAppSubtitle,
    getResellerCompanyName as getDefaultResellerCompanyName,
    getFooterCopyrightOwner as getDefaultFooterCopyrightOwner,
    getScorecardQuestions as getDefaultScorecardQuestions,
    getRoiInputTemplates as getDefaultRoiInputTemplates,
    getRoiCalculationConstants as getDefaultRoiCalculationConstants,
    getQualificationQuestionsByModule as getDefaultQualificationQuestions,
    getQualificationThresholds as getDefaultQualificationThresholds,
    getDiscoveryQuestionsTemplates as getDefaultDiscoveryTemplates,
    getPainPointHierarchy as getDefaultPainPointHierarchy,
    getReverseWaterfallCheatSheets as getDefaultReverseWaterfallCheatSheets,
    getModuleSolutionContentMap as getDefaultModuleSolutionContentMap,
    getQualificationEmailTemplate,
} from '../../services/configService';
import { ALL_MODULES, MODULES_BY_SERVICE_TYPE, FINANCE_MODULES, BUSINESS_MODULES, ITS_MODULES } from '../../constants/moduleConstants';
import { ROI_INPUT_TEMPLATES as DEFAULT_ROI_INPUT_TEMPLATES_CONST } from '../../constants/roiConstants';

import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import { XCircleIcon, PlusCircleIcon, TrashIcon, ArrowUturnLeftIcon, ChevronDownIcon, ChevronRightIcon, CheckCircleIcon } from '../common/Icons';
import { generateUUID } from '../../utils/textUtils';

interface AdminPanelProps {
  onClose: () => void;
  onConfigSaved: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onConfigSaved }) => {
  const [config, setConfig] = useState<AdminConfigStructure>({});
  const [selectedAdminModuleId, setSelectedAdminModuleId] = useState<string>(ALL_MODULES[0]?.id || 'default');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [painPointJson, setPainPointJson] = useState('');

  useEffect(() => {
    const loadedConfig = loadAdminConfig();
    const defaults: AdminConfigStructure = {
        appTitle: getDefaultAppTitle(),
        appSubtitle: getDefaultAppSubtitle(),
        resellerCompanyName: getDefaultResellerCompanyName(),
        footerCopyrightOwner: getDefaultFooterCopyrightOwner(),
        scorecardQuestions: getDefaultScorecardQuestions(),
        roiInputTemplates: getDefaultRoiInputTemplates(),
        roiCalculationConstants: getDefaultRoiCalculationConstants(),
        qualificationQuestions: getDefaultQualificationQuestions(),
        qualificationThresholds: getDefaultQualificationThresholds(),
        discoveryQuestionsTemplates: getDefaultDiscoveryTemplates(),
        painPointHierarchy: getDefaultPainPointHierarchy(),
        reverseWaterfallCheatSheets: getDefaultReverseWaterfallCheatSheets(),
        moduleSolutionContent: getDefaultModuleSolutionContentMap(),
        qualificationEmailTemplate: getQualificationEmailTemplate(),
    };
    
    const newConfig: AdminConfigStructure = {
      appTitle: loadedConfig?.appTitle ?? defaults.appTitle,
      appSubtitle: loadedConfig?.appSubtitle ?? defaults.appSubtitle,
      resellerCompanyName: loadedConfig?.resellerCompanyName ?? defaults.resellerCompanyName,
      footerCopyrightOwner: loadedConfig?.footerCopyrightOwner ?? defaults.footerCopyrightOwner,
      scorecardQuestions: loadedConfig?.scorecardQuestions ?? defaults.scorecardQuestions,
      roiInputTemplates: loadedConfig?.roiInputTemplates ? {...defaults.roiInputTemplates, ...loadedConfig.roiInputTemplates} : defaults.roiInputTemplates,
      roiCalculationConstants: {
        ...defaults.roiCalculationConstants,
        ...(loadedConfig?.roiCalculationConstants ?? {})
      },
      qualificationQuestions: loadedConfig?.qualificationQuestions ? {...defaults.qualificationQuestions, ...loadedConfig.qualificationQuestions} : defaults.qualificationQuestions,
      qualificationThresholds: loadedConfig?.qualificationThresholds ?? defaults.qualificationThresholds,
      discoveryQuestionsTemplates: loadedConfig?.discoveryQuestionsTemplates ? {...defaults.discoveryQuestionsTemplates, ...loadedConfig.discoveryQuestionsTemplates} : defaults.discoveryQuestionsTemplates,
      painPointHierarchy: loadedConfig?.painPointHierarchy ?? defaults.painPointHierarchy,
      reverseWaterfallCheatSheets: loadedConfig?.reverseWaterfallCheatSheets ? {...defaults.reverseWaterfallCheatSheets, ...loadedConfig.reverseWaterfallCheatSheets} : defaults.reverseWaterfallCheatSheets,
      moduleSolutionContent: loadedConfig?.moduleSolutionContent ? {...defaults.moduleSolutionContent, ...loadedConfig.moduleSolutionContent } : defaults.moduleSolutionContent,
      qualificationEmailTemplate: loadedConfig?.qualificationEmailTemplate ?? defaults.qualificationEmailTemplate,
    };
    setConfig(newConfig);
    setPainPointJson(JSON.stringify(newConfig.painPointHierarchy || [], null, 2));
  }, []);
  
  const handleSimpleValueChange = (key: keyof AdminConfigStructure, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleScorecardQuestionChange = (index: number, text: string) => {
    const updatedQuestions = [...(config.scorecardQuestions || [])];
    updatedQuestions[index] = { ...updatedQuestions[index], text };
    setConfig(prev => ({ ...prev, scorecardQuestions: updatedQuestions }));
  };

  const addScorecardQuestion = () => {
    const newQuestion: ScorecardQuestion = { id: `custom-sq-${generateUUID()}`, text: "" };
    setConfig(prev => ({
      ...prev,
      scorecardQuestions: [...(prev.scorecardQuestions || []), newQuestion]
    }));
  };

  const deleteScorecardQuestion = (index: number) => {
    const updatedQuestions = [...(config.scorecardQuestions || [])];
    updatedQuestions.splice(index, 1);
    setConfig(prev => ({ ...prev, scorecardQuestions: updatedQuestions }));
  };
  
  const handleRoiInputChange = (moduleKey: string, inputIndex: number, field: keyof Omit<RoiInput, 'id' | 'value'>, value: any) => {
    setConfig(prev => {
        const roiTemplates = { ...(prev.roiInputTemplates || {}) };
        const moduleInputs = [...(roiTemplates[moduleKey] || [])];
        if (moduleInputs[inputIndex]) {
            (moduleInputs[inputIndex] as any)[field] = value;
            roiTemplates[moduleKey] = moduleInputs;
            return { ...prev, roiInputTemplates: roiTemplates };
        }
        return prev;
    });
  };

  const addRoiInput = (moduleKey: string) => {
    const newInput: RoiInput = { 
        id: `custom-roi-${generateUUID()}`, 
        label: "", 
        type: "number", 
        value: "", 
        unit: "", 
        isCurrency: false 
    };
    setConfig(prev => {
        const roiTemplates = { ...(prev.roiInputTemplates || {}) };
        const moduleInputs = [...(roiTemplates[moduleKey] || [])];
        moduleInputs.push(newInput);
        roiTemplates[moduleKey] = moduleInputs;
        return { ...prev, roiInputTemplates: roiTemplates };
    });
  };

  const deleteRoiInput = (moduleKey: string, inputIndex: number) => {
     setConfig(prev => {
        const roiTemplates = { ...(prev.roiInputTemplates || {}) };
        const moduleInputs = [...(roiTemplates[moduleKey] || [])];
        moduleInputs.splice(inputIndex, 1);
        roiTemplates[moduleKey] = moduleInputs;
        return { ...prev, roiInputTemplates: roiTemplates };
    });
  };

  const handleRoiConstantChange = (
    constantKey: keyof RoiCalculationConstantsType,
    value: string // Input value is string
  ) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue) && value !== "") return; // Allow empty string to clear, otherwise expect number

    const finalValue = (constantKey === 'automationTimeSavingPercentage' || constantKey === 'automationErrorReductionPercentage') && !isNaN(numericValue)
                       ? numericValue / 100 // Store as decimal if it's a percentage
                       : numericValue;

    setConfig(prev => ({
      ...prev,
      roiCalculationConstants: {
        ...(prev.roiCalculationConstants || {}),
        [constantKey]: isNaN(finalValue) && value === "" ? undefined : finalValue, // Store undefined if cleared
      },
    }));
  };

  const handleSaveChanges = () => {
    saveAdminConfig(config);
    onConfigSaved(); 
    onClose();
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all settings to their defaults? This action cannot be undone.")) {
      clearAdminConfig();
      onConfigSaved();
      onClose(); 
    }
  };
  
  const currentRoiInputs = config.roiInputTemplates?.[selectedAdminModuleId] || DEFAULT_ROI_INPUT_TEMPLATES_CONST[selectedAdminModuleId] || DEFAULT_ROI_INPUT_TEMPLATES_CONST.default || [];

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({...prev, [sectionName]: !prev[sectionName]}));
  };

  const Section: React.FC<{title: string; sectionKey: string; children: React.ReactNode}> = ({title, sectionKey, children}) => (
    <section className="mb-6 p-4 border rounded-md shadow-sm">
        <button onClick={() => toggleSection(sectionKey)} className="w-full flex justify-between items-center text-left text-lg font-medium text-[#017a59] mb-3 focus:outline-none">
            {title}
            {expandedSections[sectionKey] ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
        </button>
        {expandedSections[sectionKey] && <div className="mt-2 space-y-3">{children}</div>}
    </section>
  );

  // --- Phase 3 Specific Handlers ---

  // Qualification Questions
  const handleQualQuestionChange = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number, field: 'text', value: string) => {
      setConfig(prev => {
          const qualQuestions = JSON.parse(JSON.stringify(prev.qualificationQuestions || {}));
          if (!qualQuestions[moduleKey]) qualQuestions[moduleKey] = { qualitative: [], quantitative: [] };
          if (!qualQuestions[moduleKey][type]) qualQuestions[moduleKey][type] = [];
          
          qualQuestions[moduleKey][type][qIndex][field] = value;
          return { ...prev, qualificationQuestions: qualQuestions };
      });
  };

  const handleQualOptionChange = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number, oIndex: number, field: keyof QualificationQuestionOption, value: string | number) => {
       setConfig(prev => {
          const qualQuestions = JSON.parse(JSON.stringify(prev.qualificationQuestions || {}));
           if (!qualQuestions[moduleKey]?.[type]?.[qIndex]?.options?.[oIndex]) return prev;
          
          (qualQuestions[moduleKey][type][qIndex].options[oIndex] as any)[field] = field === 'value' ? Number(value) : value;
          return { ...prev, qualificationQuestions: qualQuestions };
      });
  };
  
  const addQualQuestion = (moduleKey: string, type: 'qualitative' | 'quantitative') => {
      const newQ: QualificationQuestion = { id: generateUUID(), text: "", options: [{id: generateUUID(), label: "", value: 0}]};
      setConfig(prev => {
          const qualQuestions = JSON.parse(JSON.stringify(prev.qualificationQuestions || {}));
          if (!qualQuestions[moduleKey]) qualQuestions[moduleKey] = { qualitative: [], quantitative: [] };
          if (!qualQuestions[moduleKey][type]) qualQuestions[moduleKey][type] = [];
          qualQuestions[moduleKey][type].push(newQ);
          return { ...prev, qualificationQuestions: qualQuestions };
      });
  };

  const deleteQualQuestion = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number) => {
      setConfig(prev => {
          const qualQuestions = JSON.parse(JSON.stringify(prev.qualificationQuestions || {}));
          if (!qualQuestions[moduleKey]?.[type]) return prev;
          qualQuestions[moduleKey][type].splice(qIndex, 1);
          return { ...prev, qualificationQuestions: qualQuestions };
      });
  };

  const addQualOption = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number) => {
      const newOpt: QualificationQuestionOption = {id: generateUUID(), label: "", value: 0};
      setConfig(prev => {
          const qualQuestions = JSON.parse(JSON.stringify(prev.qualificationQuestions || {}));
          if (!qualQuestions[moduleKey]?.[type]?.[qIndex]) return prev;
          qualQuestions[moduleKey][type][qIndex].options.push(newOpt);
          return { ...prev, qualificationQuestions: qualQuestions };
      });
  };
  const deleteQualOption = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number, oIndex: number) => {
       setConfig(prev => {
          const qualQuestions = JSON.parse(JSON.stringify(prev.qualificationQuestions || {}));
           if (!qualQuestions[moduleKey]?.[type]?.[qIndex]?.options) return prev;
          qualQuestions[moduleKey][type][qIndex].options.splice(oIndex, 1);
          return { ...prev, qualificationQuestions: qualQuestions };
      });
  };

  const handleQualThresholdChange = (field: 'qualified' | 'clarification', value: string) => {
      const numValue = parseInt(value, 10);
      setConfig(prev => ({
          ...prev,
          qualificationThresholds: {
              ...(prev.qualificationThresholds || { qualified: 0, clarification: 0 }),
              [field]: isNaN(numValue) ? 0 : numValue
          }
      }));
  };

  // Discovery Questions
  const handleDiscoveryQuestionChange = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number, field: keyof Omit<DiscoveryQuestion, 'id' | 'isCustom'>, value: string) => {
      setConfig(prev => {
          const discTemplates = JSON.parse(JSON.stringify(prev.discoveryQuestionsTemplates || {}));
          if (!discTemplates[moduleKey]) discTemplates[moduleKey] = { qualitative: [], quantitative: [] };
          if (!discTemplates[moduleKey][type]) discTemplates[moduleKey][type] = [];
          
          (discTemplates[moduleKey][type][qIndex] as any)[field] = value;
          return { ...prev, discoveryQuestionsTemplates: discTemplates };
      });
  };
  const addDiscoveryQuestion = (moduleKey: string, type: 'qualitative' | 'quantitative') => {
      const newQ: DiscoveryQuestion = { id: generateUUID(), text: "", placeholderHint: ""};
       setConfig(prev => {
          const discTemplates = JSON.parse(JSON.stringify(prev.discoveryQuestionsTemplates || {}));
          if (!discTemplates[moduleKey]) discTemplates[moduleKey] = { qualitative: [], quantitative: [] };
          if (!discTemplates[moduleKey][type]) discTemplates[moduleKey][type] = [];
          discTemplates[moduleKey][type].push(newQ);
          return { ...prev, discoveryQuestionsTemplates: discTemplates };
      });
  };
  const deleteDiscoveryQuestion = (moduleKey: string, type: 'qualitative' | 'quantitative', qIndex: number) => {
      setConfig(prev => {
          const discTemplates = JSON.parse(JSON.stringify(prev.discoveryQuestionsTemplates || {}));
          if (!discTemplates[moduleKey]?.[type]) return prev;
          discTemplates[moduleKey][type].splice(qIndex, 1);
          return { ...prev, discoveryQuestionsTemplates: discTemplates };
      });
  };

  // Pain Point Hierarchy (JSON Editor)
  const handlePainPointJsonChange = (jsonString: string) => {
      setPainPointJson(jsonString);
  };
  const updatePainPointHierarchyFromJson = () => {
      try {
          const parsedHierarchy = JSON.parse(painPointJson);
          // Basic validation could be added here if needed
          setConfig(prev => ({ ...prev, painPointHierarchy: parsedHierarchy as PainPointLevel1Pain[] }));
          alert("Pain Point Hierarchy updated from JSON.");
      } catch (error) {
          alert("Error parsing Pain Point Hierarchy JSON. Please check the format.\n" + (error as Error).message);
      }
  };

  // Reverse Waterfall Cheat Sheets
  const handleRwcsFieldChange = (moduleKey: string, field: keyof Omit<EditableReverseWaterfallCheatSheets[string], 'keyDiscoveryPoints' | 'keyBenefits'>, value: string) => {
      setConfig(prev => {
          const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
          if (!rwcs[moduleKey]) rwcs[moduleKey] = { objective: '', highLevelPain: '', specificProcessPain: '', keyDiscoveryPoints: [], keyBenefits: [] };
          (rwcs[moduleKey] as any)[field] = value;
          return { ...prev, reverseWaterfallCheatSheets: rwcs };
      });
  };
  const handleRwcsKeyPointChange = (moduleKey: string, kpIndex: number, field: keyof ReverseWaterfallCheatSheetKeyPoint, value: string) => {
      setConfig(prev => {
          const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
          if (!rwcs[moduleKey]?.keyDiscoveryPoints?.[kpIndex]) return prev;
          (rwcs[moduleKey].keyDiscoveryPoints[kpIndex] as any)[field] = value;
          return { ...prev, reverseWaterfallCheatSheets: rwcs };
      });
  };
  const addRwcsKeyPoint = (moduleKey: string) => {
      const newKp: ReverseWaterfallCheatSheetKeyPoint = { id: generateUUID(), question: "", aligningAnswer: ""};
       setConfig(prev => {
          const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
          if (!rwcs[moduleKey]) rwcs[moduleKey] = { objective: '', highLevelPain: '', specificProcessPain: '', keyDiscoveryPoints: [], keyBenefits: [] };
          if(!rwcs[moduleKey].keyDiscoveryPoints) rwcs[moduleKey].keyDiscoveryPoints = [];
          rwcs[moduleKey].keyDiscoveryPoints.push(newKp);
          return { ...prev, reverseWaterfallCheatSheets: rwcs };
      });
  };
  const deleteRwcsKeyPoint = (moduleKey: string, kpIndex: number) => {
      setConfig(prev => {
          const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
          if (!rwcs[moduleKey]?.keyDiscoveryPoints) return prev;
          rwcs[moduleKey].keyDiscoveryPoints.splice(kpIndex, 1);
          return { ...prev, reverseWaterfallCheatSheets: rwcs };
      });
  };
    const handleRwcsBenefitChange = (moduleKey: string, benefitIndex: number, value: string) => {
        setConfig(prev => {
            const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
            if (!rwcs[moduleKey]) rwcs[moduleKey] = { objective: '', highLevelPain: '', specificProcessPain: '', keyDiscoveryPoints: [], keyBenefits: [] };
            if (!rwcs[moduleKey].keyBenefits) rwcs[moduleKey].keyBenefits = [];
            rwcs[moduleKey].keyBenefits![benefitIndex] = value;
            return { ...prev, reverseWaterfallCheatSheets: rwcs };
        });
    };
    const addRwcsBenefit = (moduleKey: string) => {
        setConfig(prev => {
            const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
            if (!rwcs[moduleKey]) rwcs[moduleKey] = { objective: '', highLevelPain: '', specificProcessPain: '', keyDiscoveryPoints: [], keyBenefits: [] };
            if (!rwcs[moduleKey].keyBenefits) rwcs[moduleKey].keyBenefits = [];
            rwcs[moduleKey].keyBenefits!.push("");
            return { ...prev, reverseWaterfallCheatSheets: rwcs };
        });
    };
    const deleteRwcsBenefit = (moduleKey: string, benefitIndex: number) => {
        setConfig(prev => {
            const rwcs = JSON.parse(JSON.stringify(prev.reverseWaterfallCheatSheets || {}));
            if (!rwcs[moduleKey]?.keyBenefits) return prev;
            rwcs[moduleKey].keyBenefits!.splice(benefitIndex, 1);
            return { ...prev, reverseWaterfallCheatSheets: rwcs };
        });
    };


  // Module Solution Content
  const handleSolutionContentFieldChange = (moduleKey: string, field: keyof Omit<EditableModuleSolutionContent, 'coreElements' | 'technologyPartnerName'>, value: string) => {
      setConfig(prev => {
          const solContent = JSON.parse(JSON.stringify(prev.moduleSolutionContent || {}));
          if (!solContent[moduleKey]) solContent[moduleKey] = { executiveSummaryBoilerplate: '', solutionOverviewDetails: '', coreElements: [], technologyPartnerName: 'Generic' };
          (solContent[moduleKey] as any)[field] = value;
          return { ...prev, moduleSolutionContent: solContent };
      });
  };

   const handleSolutionContentPartnerChange = (moduleKey: string, value: EditableModuleSolutionContent['technologyPartnerName']) => {
      setConfig(prev => {
          const solContent = JSON.parse(JSON.stringify(prev.moduleSolutionContent || {}));
          if (!solContent[moduleKey]) solContent[moduleKey] = { executiveSummaryBoilerplate: '', solutionOverviewDetails: '', coreElements: [], technologyPartnerName: 'Generic' };
          solContent[moduleKey].technologyPartnerName = value;
          return { ...prev, moduleSolutionContent: solContent };
      });
  };

  const handleSolutionCoreElementChange = (moduleKey: string, elIndex: number, value: string) => {
      setConfig(prev => {
          const solContent = JSON.parse(JSON.stringify(prev.moduleSolutionContent || {}));
          if (!solContent[moduleKey]?.coreElements) return prev;
          solContent[moduleKey].coreElements[elIndex] = value;
          return { ...prev, moduleSolutionContent: solContent };
      });
  };
  const addSolutionCoreElement = (moduleKey: string) => {
      setConfig(prev => {
          const solContent = JSON.parse(JSON.stringify(prev.moduleSolutionContent || {}));
          if (!solContent[moduleKey]) solContent[moduleKey] = { executiveSummaryBoilerplate: '', solutionOverviewDetails: '', coreElements: [], technologyPartnerName: 'Generic' };
          if (!solContent[moduleKey].coreElements) solContent[moduleKey].coreElements = [];
          solContent[moduleKey].coreElements.push("");
          return { ...prev, moduleSolutionContent: solContent };
      });
  };
  const deleteSolutionCoreElement = (moduleKey: string, elIndex: number) => {
      setConfig(prev => {
          const solContent = JSON.parse(JSON.stringify(prev.moduleSolutionContent || {}));
          if (!solContent[moduleKey]?.coreElements) return prev;
          solContent[moduleKey].coreElements.splice(elIndex, 1);
          return { ...prev, moduleSolutionContent: solContent };
      });
  };
  
  const technologyPartnerOptions: Array<{value: EditableModuleSolutionContent['technologyPartnerName'], label: string}> = [
    { value: "Esker", label: "Esker" },
    { value: "M-Files", label: "M-Files" },
    { value: "Nintex", label: "Nintex" },
    { value: "Fujifilm Business Innovation", label: "Fujifilm Business Innovation" },
    { value: "Generic", label: "Generic/Leading Tech" }
  ];

  const currentQualQuestions = config.qualificationQuestions?.[selectedAdminModuleId] || { qualitative: [], quantitative: [] };
  const currentDiscoveryTemplates = config.discoveryQuestionsTemplates?.[selectedAdminModuleId] || { qualitative: [], quantitative: [] };
  const currentRwcs = config.reverseWaterfallCheatSheets?.[selectedAdminModuleId] || { objective: '', highLevelPain: '', specificProcessPain: '', keyDiscoveryPoints: [], keyBenefits: [] };
  const currentSolutionContent = config.moduleSolutionContent?.[selectedAdminModuleId] || { executiveSummaryBoilerplate: '', solutionOverviewDetails: '', coreElements: [], technologyPartnerName: 'Generic' };

  if (Object.keys(config).length === 0) {
    return <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"><div className="bg-white p-8 rounded-lg shadow-xl">Loading configuration...</div></div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start overflow-y-auto p-4 print-hidden">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl my-8 relative">
        <Button 
            onClick={onClose} 
            variant="ghost" 
            size="sm" 
            className="!absolute top-4 right-4 !p-1"
            aria-label="Close Admin Panel"
        >
            <XCircleIcon className="w-8 h-8 text-red-500 hover:text-red-700"/>
        </Button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Admin Settings</h2>
        
        <div className="mb-6">
            <Select
                label="Select Module to Edit Configurations For:"
                value={selectedAdminModuleId}
                onChange={e => setSelectedAdminModuleId(e.target.value)}
                options={ALL_MODULES.map(m => ({ value: m.id, label: m.name }))}
                className="mb-4"
            />
        </div>

        <Section title="App Settings" sectionKey="appSettings">
          <div className="space-y-3">
            <Input label="Application Title" value={config.appTitle || ""} onChange={e => handleSimpleValueChange('appTitle', e.target.value)} />
            <Input label="Application Subtitle" value={config.appSubtitle || ""} onChange={e => handleSimpleValueChange('appSubtitle', e.target.value)} />
            <Input label="Reseller Company Name" value={config.resellerCompanyName || ""} onChange={e => handleSimpleValueChange('resellerCompanyName', e.target.value)} />
            <Input label="Footer Copyright Owner" value={config.footerCopyrightOwner || ""} onChange={e => handleSimpleValueChange('footerCopyrightOwner', e.target.value)} />
          </div>
        </Section>

        <Section title="Opportunity Scorecard Questions" sectionKey="scorecard">
          {(config.scorecardQuestions || []).map((q, index) => (
            <div key={q.id || index} className="flex items-center space-x-2 mb-2">
              <Input 
                className="flex-grow"
                value={q.text} 
                onChange={e => handleScorecardQuestionChange(index, e.target.value)} 
                aria-label={`Scorecard Question ${index + 1}`}
              />
              <Button onClick={() => deleteScorecardQuestion(index)} variant="danger" size="sm" icon={<TrashIcon />} />
            </div>
          ))}
          <Button onClick={addScorecardQuestion} variant="secondary" size="sm" icon={<PlusCircleIcon />} iconPosition="left">Add Question</Button>
        </Section>

        <Section title={`ROI Input Templates for ${ALL_MODULES.find(m=>m.id===selectedAdminModuleId)?.name || 'Module'}`} sectionKey="roiInputs">
            {currentRoiInputs.map((input, index) => (
                <div key={input.id || index} className="p-3 border rounded-md mb-3 bg-gray-50 space-y-2">
                    <Input 
                        label="Input Label" 
                        value={input.label} 
                        onChange={e => handleRoiInputChange(selectedAdminModuleId, index, 'label', e.target.value)} 
                    />
                    <Select 
                        label="Input Type"
                        value={input.type}
                        onChange={e => handleRoiInputChange(selectedAdminModuleId, index, 'type', e.target.value as "number" | "text")}
                        options={[{value: "number", label: "Number"}, {value: "text", label: "Text"}]}
                    />
                    <Input 
                        label="Unit (Optional)" 
                        value={input.unit || ""} 
                        onChange={e => handleRoiInputChange(selectedAdminModuleId, index, 'unit', e.target.value)} 
                    />
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            id={`roi-isCurrency-${selectedAdminModuleId}-${index}`}
                            checked={!!input.isCurrency}
                            onChange={e => handleRoiInputChange(selectedAdminModuleId, index, 'isCurrency', e.target.checked)}
                            className="h-4 w-4 text-[#01916D] focus:ring-[#017a59] border-gray-300 rounded mr-2"
                        />
                        <label htmlFor={`roi-isCurrency-${selectedAdminModuleId}-${index}`} className="text-sm text-gray-700">Is Currency Input?</label>
                    </div>
                    <Button onClick={() => deleteRoiInput(selectedAdminModuleId, index)} variant="danger" size="sm" icon={<TrashIcon />} />
                </div>
            ))}
            <Button onClick={() => addRoiInput(selectedAdminModuleId)} variant="secondary" size="sm" icon={<PlusCircleIcon />} iconPosition="left">Add Input</Button>
        </Section>

        <Section title="ROI Calculation Constants" sectionKey="roiConstants">
          <div className="space-y-3">
            <Input 
              label="Hourly Rate Divisor (Annual Salary / X = Hourly Rate)" 
              type="number"
              value={config.roiCalculationConstants?.hourlyRateDivisor ?? ""} 
              onChange={e => handleRoiConstantChange('hourlyRateDivisor', e.target.value)}
            />
            <Input 
              label="Automation Time Saving (%)" 
              type="number"
              value={config.roiCalculationConstants?.automationTimeSavingPercentage !== undefined ? config.roiCalculationConstants.automationTimeSavingPercentage * 100 : ""} 
              onChange={e => handleRoiConstantChange('automationTimeSavingPercentage', e.target.value)}
              unit="%"
            />
            <Input 
              label="Automation Error Reduction (%)" 
              type="number"
              value={config.roiCalculationConstants?.automationErrorReductionPercentage !== undefined ? config.roiCalculationConstants.automationErrorReductionPercentage * 100 : ""}
              onChange={e => handleRoiConstantChange('automationErrorReductionPercentage', e.target.value)}
              unit="%"
            />
          </div>
        </Section>

        {/* Qualification Questions */}
        <Section title={`Qualification Questions & Thresholds for ${ALL_MODULES.find(m=>m.id===selectedAdminModuleId)?.name || 'Module'}`} sectionKey="qualification">
            {/* Qualitative Questions */}
            <h4 className="text-md font-semibold mt-4 mb-2 text-gray-700">Qualitative Questions</h4>
            {(currentQualQuestions.qualitative || []).map((q, qIdx) => (
                <div key={q.id} className="p-3 border rounded-md mb-3 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                        <Input label={`Q${qIdx+1} Text`} className="flex-grow" value={q.text} onChange={e => handleQualQuestionChange(selectedAdminModuleId, 'qualitative', qIdx, 'text', e.target.value)} />
                        <Button onClick={() => deleteQualQuestion(selectedAdminModuleId, 'qualitative', qIdx)} variant="danger" size="sm" icon={<TrashIcon />} />
                    </div>
                    <div className="ml-4 space-y-1">
                        {q.options.map((opt, oIdx) => (
                            <div key={opt.id} className="flex items-center space-x-1">
                                <Input label={`Opt ${oIdx+1} Label`} value={opt.label} onChange={e => handleQualOptionChange(selectedAdminModuleId, 'qualitative', qIdx, oIdx, 'label', e.target.value)} className="w-2/3"/>
                                <Input label={`Value`} type="number" value={opt.value} onChange={e => handleQualOptionChange(selectedAdminModuleId, 'qualitative', qIdx, oIdx, 'value', e.target.value)} className="w-1/4"/>
                                <Button onClick={() => deleteQualOption(selectedAdminModuleId, 'qualitative', qIdx, oIdx)} variant="danger" size="sm" className="!p-1" icon={<TrashIcon className="w-3 h-3"/>} />
                            </div>
                        ))}
                        <Button onClick={() => addQualOption(selectedAdminModuleId, 'qualitative', qIdx)} variant="ghost" size="sm" icon={<PlusCircleIcon />} iconPosition="left">Add Option</Button>
                    </div>
                </div>
            ))}
            <Button onClick={() => addQualQuestion(selectedAdminModuleId, 'qualitative')} variant="secondary" size="sm">Add Qualitative Question</Button>

            {/* Quantitative Questions */}
            <h4 className="text-md font-semibold mt-6 mb-2 text-gray-700">Quantitative Questions</h4>
             {(currentQualQuestions.quantitative || []).map((q, qIdx) => (
                <div key={q.id} className="p-3 border rounded-md mb-3 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                        <Input label={`Q${qIdx+1} Text`} className="flex-grow" value={q.text} onChange={e => handleQualQuestionChange(selectedAdminModuleId, 'quantitative', qIdx, 'text', e.target.value)} />
                        <Button onClick={() => deleteQualQuestion(selectedAdminModuleId, 'quantitative', qIdx)} variant="danger" size="sm" icon={<TrashIcon />} />
                    </div>
                    <div className="ml-4 space-y-1">
                        {q.options.map((opt, oIdx) => (
                            <div key={opt.id} className="flex items-center space-x-1">
                                <Input label={`Opt ${oIdx+1} Label`} value={opt.label} onChange={e => handleQualOptionChange(selectedAdminModuleId, 'quantitative', qIdx, oIdx, 'label', e.target.value)} className="w-2/3"/>
                                <Input label={`Value`} type="number" value={opt.value} onChange={e => handleQualOptionChange(selectedAdminModuleId, 'quantitative', qIdx, oIdx, 'value', e.target.value)} className="w-1/4"/>
                                <Button onClick={() => deleteQualOption(selectedAdminModuleId, 'quantitative', qIdx, oIdx)} variant="danger" size="sm" className="!p-1" icon={<TrashIcon className="w-3 h-3"/>} />
                            </div>
                        ))}
                        <Button onClick={() => addQualOption(selectedAdminModuleId, 'quantitative', qIdx)} variant="ghost" size="sm" icon={<PlusCircleIcon />} iconPosition="left">Add Option</Button>
                    </div>
                </div>
            ))}
            <Button onClick={() => addQualQuestion(selectedAdminModuleId, 'quantitative')} variant="secondary" size="sm">Add Quantitative Question</Button>
            
            {/* Thresholds */}
            <h4 className="text-md font-semibold mt-6 mb-2 text-gray-700">Qualification Thresholds</h4>
            <div className="grid grid-cols-2 gap-4">
                <Input label="Qualified Score Threshold" type="number" value={config.qualificationThresholds?.qualified || ""} onChange={e => handleQualThresholdChange('qualified', e.target.value)} />
                <Input label="Clarification Score Threshold" type="number" value={config.qualificationThresholds?.clarification || ""} onChange={e => handleQualThresholdChange('clarification', e.target.value)} />
            </div>
        </Section>

        <Section title="Qualification Email Template" sectionKey="qualEmailTemplate">
            <p className="text-xs text-gray-600 mb-2">
                Edit the email body for the Health Check email. Available placeholders:
                <code className="text-xs bg-gray-200 p-1 rounded mx-1">{'{customerCompany}'}</code>,
                <code className="text-xs bg-gray-200 p-1 rounded mx-1">{'{moduleName}'}</code>,
                <code className="text-xs bg-gray-200 p-1 rounded mx-1">{'{dateCompleted}'}</code>,
                <code className="text-xs bg-gray-200 p-1 rounded mx-1">{'{qualitativeContent}'}</code>,
                <code className="text-xs bg-gray-200 p-1 rounded mx-1">{'{quantitativeContent}'}</code>.
            </p>
            <Textarea
                label="Email Body Template"
                value={config.qualificationEmailTemplate || ""}
                onChange={e => handleSimpleValueChange('qualificationEmailTemplate', e.target.value)}
                rows={10}
                className="font-mono text-sm"
            />
        </Section>

        {/* Discovery Questions */}
        <Section title={`Discovery Question Templates for ${ALL_MODULES.find(m=>m.id===selectedAdminModuleId)?.name || 'Module'}`} sectionKey="discovery">
            {/* Qualitative Questions */}
            <h4 className="text-md font-semibold mt-4 mb-2 text-gray-700">Qualitative Templates</h4>
            {(currentDiscoveryTemplates.qualitative || []).map((q, qIdx) => (
                <div key={q.id} className="p-3 border rounded-md mb-3 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                        <Textarea label={`Q${qIdx+1} Text`} value={q.text} onChange={e => handleDiscoveryQuestionChange(selectedAdminModuleId, 'qualitative', qIdx, 'text', e.target.value)} rows={2}/>
                        <Button onClick={() => deleteDiscoveryQuestion(selectedAdminModuleId, 'qualitative', qIdx)} variant="danger" size="sm" icon={<TrashIcon />} />
                    </div>
                    <Input label="Placeholder/Hint" value={q.placeholderHint || ""} onChange={e => handleDiscoveryQuestionChange(selectedAdminModuleId, 'qualitative', qIdx, 'placeholderHint', e.target.value)} />
                </div>
            ))}
            <Button onClick={() => addDiscoveryQuestion(selectedAdminModuleId, 'qualitative')} variant="secondary" size="sm">Add Qualitative Template</Button>

            {/* Quantitative Questions */}
            <h4 className="text-md font-semibold mt-6 mb-2 text-gray-700">Quantitative Templates</h4>
             {(currentDiscoveryTemplates.quantitative || []).map((q, qIdx) => (
                <div key={q.id} className="p-3 border rounded-md mb-3 bg-gray-50">
                    <div className="flex items-center space-x-2 mb-2">
                         <Textarea label={`Q${qIdx+1} Text`} value={q.text} onChange={e => handleDiscoveryQuestionChange(selectedAdminModuleId, 'quantitative', qIdx, 'text', e.target.value)} rows={2}/>
                        <Button onClick={() => deleteDiscoveryQuestion(selectedAdminModuleId, 'quantitative', qIdx)} variant="danger" size="sm" icon={<TrashIcon />} />
                    </div>
                    <Input label="Placeholder/Hint" value={q.placeholderHint || ""} onChange={e => handleDiscoveryQuestionChange(selectedAdminModuleId, 'quantitative', qIdx, 'placeholderHint', e.target.value)} />
                </div>
            ))}
            <Button onClick={() => addDiscoveryQuestion(selectedAdminModuleId, 'quantitative')} variant="secondary" size="sm">Add Quantitative Template</Button>
        </Section>

        {/* Pain Point Hierarchy (JSON Editor) */}
        <Section title="Pain Point Hierarchy (Edit as JSON)" sectionKey="painPointHierarchy">
            <Textarea 
                label="Pain Point Hierarchy JSON"
                value={painPointJson}
                onChange={e => handlePainPointJsonChange(e.target.value)}
                rows={15}
                className="font-mono text-xs"
                placeholder="Enter or paste Pain Point Hierarchy JSON here..."
            />
            <Button onClick={updatePainPointHierarchyFromJson} variant="secondary" className="mt-2">Update Hierarchy from JSON</Button>
            <p className="text-xs text-gray-500 mt-1">Warning: Invalid JSON will not be saved. Ensure the structure matches 'PainPointLevel1Pain[]'. Validate your JSON externally if unsure.</p>
        </Section>

        {/* Reverse Waterfall Cheat Sheets */}
        <Section title={`Reverse Waterfall Cheat Sheet for ${ALL_MODULES.find(m=>m.id===selectedAdminModuleId)?.name || 'Module'}`} sectionKey="rwcs">
            <Input label="Objective" value={currentRwcs.objective} onChange={e => handleRwcsFieldChange(selectedAdminModuleId, 'objective', e.target.value)} />
            <Textarea label="High-Level Pain" value={currentRwcs.highLevelPain} onChange={e => handleRwcsFieldChange(selectedAdminModuleId, 'highLevelPain', e.target.value)} rows={2}/>
            <Textarea label="Specific Process Pain" value={currentRwcs.specificProcessPain} onChange={e => handleRwcsFieldChange(selectedAdminModuleId, 'specificProcessPain', e.target.value)} rows={2}/>
            
            <h4 className="text-md font-semibold mt-4 mb-2 text-gray-700">Key Discovery Points</h4>
            {(currentRwcs.keyDiscoveryPoints || []).map((kp, kpIdx) => (
                 <div key={kp.id} className="p-2 border rounded-md mb-2 bg-gray-50">
                    <div className="flex items-start space-x-2">
                        <Textarea label={`Question ${kpIdx+1}`} value={kp.question} onChange={e => handleRwcsKeyPointChange(selectedAdminModuleId, kpIdx, 'question', e.target.value)} rows={2} className="flex-grow"/>
                        <Button onClick={() => deleteRwcsKeyPoint(selectedAdminModuleId, kpIdx)} variant="danger" size="sm" className="!p-1 mt-6" icon={<TrashIcon className="w-4 h-4"/>} />
                    </div>
                    <Textarea label={`Aligning Answer ${kpIdx+1}`} value={kp.aligningAnswer} onChange={e => handleRwcsKeyPointChange(selectedAdminModuleId, kpIdx, 'aligningAnswer', e.target.value)} rows={2}/>
                 </div>
            ))}
            <Button onClick={() => addRwcsKeyPoint(selectedAdminModuleId)} variant="secondary" size="sm">Add Key Discovery Point</Button>

            <h4 className="text-md font-semibold mt-4 mb-2 text-gray-700">Key Benefits</h4>
            {(currentRwcs.keyBenefits || []).map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-center space-x-2 mb-2">
                    <Input label={`Benefit ${bIdx+1}`} value={benefit} onChange={e => handleRwcsBenefitChange(selectedAdminModuleId, bIdx, e.target.value)} className="flex-grow"/>
                    <Button onClick={() => deleteRwcsBenefit(selectedAdminModuleId, bIdx)} variant="danger" size="sm" className="!p-1" icon={<TrashIcon className="w-3 h-3"/>} />
                </div>
            ))}
            <Button onClick={() => addRwcsBenefit(selectedAdminModuleId)} variant="secondary" size="sm" icon={<PlusCircleIcon />} iconPosition="left">Add Key Benefit</Button>
        </Section>

        {/* Module Solution Content Section */}
        <Section title={`Module Solution Content for ${ALL_MODULES.find(m=>m.id===selectedAdminModuleId)?.name || 'Module'}`} sectionKey="solutionContent">
            <Select
                label="Technology Partner Name"
                value={currentSolutionContent.technologyPartnerName}
                onChange={e => handleSolutionContentPartnerChange(selectedAdminModuleId, e.target.value as EditableModuleSolutionContent['technologyPartnerName'])}
                options={technologyPartnerOptions}
                className="mb-2"
            />
            <Textarea label={`Executive Summary Boilerplate (use {moduleName} and {partnerName} placeholders)`} value={currentSolutionContent.executiveSummaryBoilerplate} onChange={e => handleSolutionContentFieldChange(selectedAdminModuleId, 'executiveSummaryBoilerplate', e.target.value)} rows={4} className="mb-2" />
            <Textarea label={`Solution Overview Details (use {moduleName} and {partnerName} placeholders)`} value={currentSolutionContent.solutionOverviewDetails} onChange={e => handleSolutionContentFieldChange(selectedAdminModuleId, 'solutionOverviewDetails', e.target.value)} rows={6} className="mb-2" />
            
            <h4 className="text-md font-semibold mt-4 mb-2 text-gray-700">{`Core Elements (use {moduleName} and {partnerName} placeholders)`}</h4>
            {(currentSolutionContent.coreElements || []).map((el, elIdx) => (
                 <div key={elIdx} className="flex items-center space-x-2 mb-2">
                    <Input label={`Element ${elIdx+1}`} value={el} onChange={e => handleSolutionCoreElementChange(selectedAdminModuleId, elIdx, e.target.value)} className="flex-grow"/>
                    <Button onClick={() => deleteSolutionCoreElement(selectedAdminModuleId, elIdx)} variant="danger" size="sm" className="!p-1" icon={<TrashIcon className="w-3 h-3"/>} />
                 </div>
            ))}
            <Button onClick={() => addSolutionCoreElement(selectedAdminModuleId)} variant="secondary" size="sm" icon={<PlusCircleIcon />} iconPosition="left">Add Core Element</Button>
        </Section>


        <div className="mt-8 pt-6 border-t flex justify-end space-x-3">
          <Button onClick={handleResetToDefaults} variant="ghost" className="text-red-600 hover:bg-red-50" icon={<ArrowUturnLeftIcon />} iconPosition="left">Reset All to Defaults</Button>
          <Button onClick={handleSaveChanges} variant="primary" icon={<CheckCircleIcon />} iconPosition="left">Save Changes & Close</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;