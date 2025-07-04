



import { AppState, Role, ServiceType, TabId, ExportFormat, SolutionBuilderState, CustomerConversationState, QualificationStatus, ConversationStepId, Module, EngagementWorkflowState, CustomerRetentionState, EngagementStepType, EngagementStepStatus, EngagementWorkflowStep, EngagementAction } from '../types';
import { FINANCE_MODULES, ALL_MODULES, MODULES_BY_SERVICE_TYPE, ITS_MODULES, BUSINESS_MODULES } from './moduleConstants';
import { DEFAULT_QUALIFICATION_THRESHOLDS, initialQualificationSectionState } from './qualificationConstants';
import { DISCOVERY_QUESTIONS_TEMPLATES } from './discoveryConstants';
import { ROI_INPUT_TEMPLATES } from './roiConstants';
import { initialPainPointsState } from './painPointConstants';
import { ROLES as APP_ROLES, SERVICE_TYPES as APP_SERVICE_TYPES } from './appConfigConstants';
import { ENGAGEMENT_OBJECTIVES, ENGAGEMENT_SALES_ACTIONS } from './engagementWorkflowConstants';
import { generateUUID } from '../utils/textUtils';

const initialSolutionBuilderState: SolutionBuilderState = {
  selectedCoreModuleId: null,
  requirementBlocks: [],
  showDocumentView: false,
  editingBlockId: null,
};

export const initialCustomerConversationState: CustomerConversationState = {
  activeSectionId: ConversationStepId.INTRODUCTION_OBJECTIVES, 
  completedSectionIds: [], 
  exchangeAnswers: {}, 
  moduleExchangeAnswers: {}, 
  exchanges: [], 
  currentServiceFocus: null, 
  explorationInput: '',
  followUpDetails: {
    interestConfirmed: null,
    contactName: '',
    contactEmail: '',
    meetingDate: '',
    meetingTime: '',
    specialistNeeded: null, 
    notes: '',
  },
  generalNotes: '',
};

const initialEngagementWorkflowState: EngagementWorkflowState = {
    steps: Object.values(EngagementStepType).map(stepType => ({
        id: generateUUID(),
        stepType: stepType,
        status: EngagementStepStatus.PENDING,
        objectives: (ENGAGEMENT_OBJECTIVES[stepType] || []).map((text): EngagementAction => ({
            id: generateUUID(),
            text,
            completed: false,
        })),
        salesActions: (ENGAGEMENT_SALES_ACTIONS[stepType] || []).map((text): EngagementAction => ({
            id: generateUUID(),
            text,
            completed: false,
        })),
    })),
};

const initialCustomerRetentionState: CustomerRetentionState = {
  completedActions: {},
};

const defaultServiceType = APP_SERVICE_TYPES[0];
let defaultModulesForService: Module[] = [];
if (defaultServiceType === ServiceType.FINANCE) {
  defaultModulesForService = FINANCE_MODULES;
} else if (defaultServiceType === ServiceType.BUSINESS) {
  defaultModulesForService = BUSINESS_MODULES;
} else if (defaultServiceType === ServiceType.ITS) {
  defaultModulesForService = ITS_MODULES;
}


export const INITIAL_STATE: AppState = {
  customerCompany: "",
  customerName: "",
  dateCompleted: new Date().toISOString().slice(0, 10),
  selectedRole: APP_ROLES[0], 
  selectedServiceType: defaultServiceType, 
  selectedModuleId: defaultModulesForService.length > 0 ? defaultModulesForService[0].id : null, 
  activeTab: TabId.HOME,
  opportunityScorecard: {
    answers: {},
    totalScore: 0,
  },
  qualification: {
    qualitative: { ...initialQualificationSectionState },
    quantitative: { ...initialQualificationSectionState },
  },
  discoveryQuestions: {}, 
  roiCalculator: {}, 
  solutionBuilder: initialSolutionBuilderState,
  painPoints: JSON.parse(JSON.stringify(initialPainPointsState)),
  customerConversations: JSON.parse(JSON.stringify(initialCustomerConversationState)),
  engagementWorkflow: initialEngagementWorkflowState,
  customerRetention: initialCustomerRetentionState,
  exportFormat: ExportFormat.TXT,
};

ALL_MODULES.forEach(module => {
  const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id];
  if (!discoveryTemplate) {
      console.warn(`Discovery questions template not found for module ID: ${module.id}. Using a minimal fallback.`);
      INITIAL_STATE.discoveryQuestions[module.id] = { qualitative: [], quantitative: [] };
  } else {
    INITIAL_STATE.discoveryQuestions[module.id] = {
      qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
      quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
    };
  }

  const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default;
  INITIAL_STATE.roiCalculator[module.id] = {
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