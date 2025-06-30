
import { AppState, Role, DiscoveryAnswer, DiscoveryQuestion, ServiceType } from '../types'; // Renamed AutomationType to ServiceType
import { INITIAL_STATE as BASE_INITIAL_STATE, initialCustomerConversationState } from '../constants/initialStateConstants'; 
import { initialPainPointsState } from '../constants/painPointConstants'; 
import { ALL_MODULES, MODULES_BY_SERVICE_TYPE } from '../constants/moduleConstants'; // Added MODULES_BY_SERVICE_TYPE
import { DISCOVERY_QUESTIONS_TEMPLATES as defaultDiscoveryTemplatesConst } from '../constants/discoveryConstants';
import { ROI_INPUT_TEMPLATES as defaultRoiInputTemplatesConst } from '../constants/roiConstants';

/**
 * Loads the initial application state.
 * It first attempts to load and parse state from localStorage.
 * If localStorage state exists, it's merged with the base initial state,
 * applying any necessary migrations or corrections (e.g., role updates,
 * ensuring discovery questions and ROI calculator structures are up-to-date
 * for all modules while preserving user data).
 * If no stored state is found or parsing fails, a fresh, fully processed
 * initial state is returned.
 *
 * @returns {AppState} The fully initialized application state.
 */
export const loadInitialState = (): AppState => {
  let finalState: AppState;
  const storedState = localStorage.getItem('appState');

  if (storedState) {
    try {
      const parsedState = JSON.parse(storedState);
      finalState = { ...JSON.parse(JSON.stringify(BASE_INITIAL_STATE)), ...parsedState };

      if ((finalState.selectedRole as string) === "SDR/SAD") {
        finalState.selectedRole = Role.CSM; 
      }
      // Ensure selectedServiceType is valid, or default
      if (!Object.values(ServiceType).includes(finalState.selectedServiceType as ServiceType)) {
        finalState.selectedServiceType = BASE_INITIAL_STATE.selectedServiceType;
      }
      delete (finalState as any).isAdminModeActive;

    } catch (error) {
      console.error("Error parsing stored app state, using fresh initial state:", error);
      finalState = JSON.parse(JSON.stringify(BASE_INITIAL_STATE));
    }
  } else {
    finalState = JSON.parse(JSON.stringify(BASE_INITIAL_STATE));
  }

  // Check and update selectedModuleId based on selectedServiceType
  const modulesForSelectedService = MODULES_BY_SERVICE_TYPE[finalState.selectedServiceType] || [];
  const currentModuleIsValidForService = modulesForSelectedService.some(m => m.id === finalState.selectedModuleId);

  if (!finalState.selectedModuleId || !currentModuleIsValidForService) {
    finalState.selectedModuleId = modulesForSelectedService.length > 0 ? modulesForSelectedService[0].id : null;
  }


  const newDiscoveryQuestions = { ...(finalState.discoveryQuestions || {}) };
  const newRoiCalculator = { ...(finalState.roiCalculator || {}) };

  ALL_MODULES.forEach(module => {
    const currentModuleDiscovery = newDiscoveryQuestions[module.id];
    const templateForModule = defaultDiscoveryTemplatesConst[module.id];

    if (templateForModule) {
      const preserveAnswersAndCustom = (
          existingAnswers: DiscoveryAnswer[] = [],
          templateQuestions: DiscoveryQuestion[] = []
      ): DiscoveryAnswer[] => {
          const combined: DiscoveryAnswer[] = [];
          const existingAnswerMap = new Map(existingAnswers.map(a => [a.questionId, a]));

          templateQuestions.forEach(tq => {
              const existing = existingAnswerMap.get(tq.id);
              combined.push(existing || { questionId: tq.id, questionText: tq.text, answer: "", isCustom: tq.isCustom || false });
              existingAnswerMap.delete(tq.id); 
          });
          existingAnswerMap.forEach(customQ => { 
              if(customQ.isCustom) combined.push(customQ);
          });
          return combined;
      };
      
      newDiscoveryQuestions[module.id] = {
        qualitative: preserveAnswersAndCustom(currentModuleDiscovery?.qualitative, templateForModule.qualitative),
        quantitative: preserveAnswersAndCustom(currentModuleDiscovery?.quantitative, templateForModule.quantitative),
      };
    } else if (!currentModuleDiscovery) {
       newDiscoveryQuestions[module.id] = { qualitative: [], quantitative: [] };
    }

    const currentModuleRoi = newRoiCalculator[module.id];
    const roiInputTemplate = defaultRoiInputTemplatesConst[module.id] || defaultRoiInputTemplatesConst.default;
    
    const baseRoiModuleState = BASE_INITIAL_STATE.roiCalculator[module.id] || {
        annualSalary: 60000, annualSoftwareCost: 10000, upfrontProfServicesCost: 5000, solutionLifespanYears: 3, inputs: {}, results: null,
    };

    const newInputs: { [inputId: string]: string | number } = {};
    roiInputTemplate.forEach(inputTpl => {
        newInputs[inputTpl.id] = currentModuleRoi?.inputs?.[inputTpl.id] !== undefined 
                                 ? currentModuleRoi.inputs[inputTpl.id] 
                                 : inputTpl.value;
    });

    newRoiCalculator[module.id] = {
      annualSalary: currentModuleRoi?.annualSalary !== undefined ? currentModuleRoi.annualSalary : baseRoiModuleState.annualSalary,
      annualSoftwareCost: currentModuleRoi?.annualSoftwareCost !== undefined ? currentModuleRoi.annualSoftwareCost : baseRoiModuleState.annualSoftwareCost,
      upfrontProfServicesCost: currentModuleRoi?.upfrontProfServicesCost !== undefined ? currentModuleRoi.upfrontProfServicesCost : baseRoiModuleState.upfrontProfServicesCost,
      solutionLifespanYears: currentModuleRoi?.solutionLifespanYears !== undefined ? currentModuleRoi.solutionLifespanYears : baseRoiModuleState.solutionLifespanYears,
      inputs: newInputs,
      results: currentModuleRoi?.results || null,
    };
  });

  finalState.discoveryQuestions = newDiscoveryQuestions;
  finalState.roiCalculator = newRoiCalculator;

  finalState.painPoints = { ...JSON.parse(JSON.stringify(initialPainPointsState)), ...(finalState.painPoints || {}) };
  finalState.customerConversations = { ...JSON.parse(JSON.stringify(initialCustomerConversationState)), ...(finalState.customerConversations || {}) };
  
  // Safely merge the engagementWorkflow state
  finalState.engagementWorkflow = {
    ...JSON.parse(JSON.stringify(BASE_INITIAL_STATE.engagementWorkflow)),
    ...(finalState.engagementWorkflow || {})
  };
  if (!Array.isArray(finalState.engagementWorkflow.steps)) {
      finalState.engagementWorkflow.steps = [];
  }

  // Ensure currentServiceFocus in customerConversations is valid or null
  if (finalState.customerConversations.currentServiceFocus && !Object.values(ServiceType).includes(finalState.customerConversations.currentServiceFocus as ServiceType)) {
    finalState.customerConversations.currentServiceFocus = null;
  }
  if (finalState.customerConversations.followUpDetails.specialistNeeded && !Object.values(ServiceType).includes(finalState.customerConversations.followUpDetails.specialistNeeded as ServiceType)) {
    finalState.customerConversations.followUpDetails.specialistNeeded = null;
  }
  
  return finalState;
};