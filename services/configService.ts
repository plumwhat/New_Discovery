
import {
  AdminConfigStructure,
  ScorecardQuestion,
  RoiInput,
  RoiCalculationConstants as RoiCalculationConstantsType, // Renamed to avoid conflict
  AllModuleQualificationQuestions,
  EditableDiscoveryQuestionsTemplates,
  PainPointLevel1Pain,
  EditableReverseWaterfallCheatSheets,
  EditableModuleSolutionContentMap,
} from '../types';
import { 
  APP_TITLE as DEFAULT_APP_TITLE,
  APP_SUBTITLE as DEFAULT_APP_SUBTITLE,
  RESELLER_COMPANY_NAME as DEFAULT_RESELLER_COMPANY_NAME,
  FOOTER_COPYRIGHT_OWNER as DEFAULT_FOOTER_COPYRIGHT_OWNER,
} from '../constants/appConfigConstants';
import { SCORECARD_QUESTIONS as DEFAULT_SCORECARD_QUESTIONS } from '../constants/scorecardConstants';
import {
  ROI_INPUT_TEMPLATES as DEFAULT_ROI_INPUT_TEMPLATES,
  HOURLY_RATE_DIVISOR as DEFAULT_HOURLY_RATE_DIVISOR,
  AUTOMATION_TIME_SAVING_PERCENTAGE as DEFAULT_AUTOMATION_TIME_SAVING_PERCENTAGE,
  AUTOMATION_ERROR_REDUCTION_PERCENTAGE as DEFAULT_AUTOMATION_ERROR_REDUCTION_PERCENTAGE,
} from '../constants/roiConstants';
import { 
  QUALIFICATION_QUESTIONS_BY_MODULE as DEFAULT_QUALIFICATION_QUESTIONS_BY_MODULE,
  DEFAULT_QUALIFICATION_THRESHOLDS,
  QUALIFICATION_EMAIL_TEMPLATES_BY_MODULE,
} from '../constants/qualificationConstants';
import { DISCOVERY_QUESTIONS_TEMPLATES as DEFAULT_DISCOVERY_QUESTIONS_TEMPLATES } from '../constants/discoveryConstants';
import { PAIN_POINT_HIERARCHY as DEFAULT_PAIN_POINT_HIERARCHY, REVERSE_WATERFALL_CHEAT_SHEETS as DEFAULT_REVERSE_WATERFALL_CHEAT_SHEETS } from '../constants/painPointConstants';
import { MODULE_SPECIFIC_SOLUTION_CONTENT as DEFAULT_MODULE_SPECIFIC_SOLUTION_CONTENT } from '../constants/solutionContentConstants';


const ADMIN_CONFIG_LOCAL_STORAGE_KEY = 'adminAppConfig';

/**
 * Loads the admin configuration from localStorage.
 * @returns The parsed AdminConfigStructure object or null if not found or error.
 */
export const loadAdminConfig = (): AdminConfigStructure | null => {
  try {
    const storedConfig = localStorage.getItem(ADMIN_CONFIG_LOCAL_STORAGE_KEY);
    if (storedConfig) {
      return JSON.parse(storedConfig) as AdminConfigStructure;
    }
  } catch (error) {
    console.error("Error loading admin config from localStorage:", error);
  }
  return null;
};

/**
 * Saves the admin configuration to localStorage.
 * @param config - The AdminConfigStructure object to save.
 */
export const saveAdminConfig = (config: AdminConfigStructure): void => {
  try {
    localStorage.setItem(ADMIN_CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Error saving admin config to localStorage:", error);
  }
};

/**
 * Clears the admin configuration from localStorage.
 */
export const clearAdminConfig = (): void => {
  try {
    localStorage.removeItem(ADMIN_CONFIG_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing admin config from localStorage:", error);
  }
};


// --- Getters for Phase 1 & 2 configurable items ---

export const getAppTitle = (): string => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.appTitle ?? DEFAULT_APP_TITLE;
};

export const getAppSubtitle = (): string => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.appSubtitle ?? DEFAULT_APP_SUBTITLE;
};

export const getResellerCompanyName = (): string => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.resellerCompanyName ?? DEFAULT_RESELLER_COMPANY_NAME;
};

export const getFooterCopyrightOwner = (): string => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.footerCopyrightOwner ?? DEFAULT_FOOTER_COPYRIGHT_OWNER;
};

export const getScorecardQuestions = (): ScorecardQuestion[] => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.scorecardQuestions !== undefined ? adminConfig.scorecardQuestions : DEFAULT_SCORECARD_QUESTIONS;
};

export const getRoiInputTemplates = (): Record<string, RoiInput[]> => {
  const adminConfig = loadAdminConfig();
  // Ensure a deep clone or careful merge if defaults are complex objects and adminConfig might only partially override.
  // For simple replacement like this, direct use or shallow clone is fine.
  return adminConfig?.roiInputTemplates ? { ...DEFAULT_ROI_INPUT_TEMPLATES, ...adminConfig.roiInputTemplates } : { ...DEFAULT_ROI_INPUT_TEMPLATES };
};

export const getRoiCalculationConstants = (): Required<RoiCalculationConstantsType> => {
  const adminConfig = loadAdminConfig();
  const defaults: Required<RoiCalculationConstantsType> = {
    hourlyRateDivisor: DEFAULT_HOURLY_RATE_DIVISOR,
    automationTimeSavingPercentage: DEFAULT_AUTOMATION_TIME_SAVING_PERCENTAGE,
    automationErrorReductionPercentage: DEFAULT_AUTOMATION_ERROR_REDUCTION_PERCENTAGE,
  };
  
  const mergedConstants = {
    ...defaults,
    ...(adminConfig?.roiCalculationConstants || {}),
  };

  // Ensure percentages are between 0 and 1 if they are provided
  if (mergedConstants.automationTimeSavingPercentage > 1 && mergedConstants.automationTimeSavingPercentage <=100) {
    mergedConstants.automationTimeSavingPercentage = mergedConstants.automationTimeSavingPercentage / 100;
  }
   if (mergedConstants.automationErrorReductionPercentage > 1 && mergedConstants.automationErrorReductionPercentage <= 100) {
    mergedConstants.automationErrorReductionPercentage = mergedConstants.automationErrorReductionPercentage / 100;
  }

  return mergedConstants;
};

// --- Getters for Phase 3 configurable items ---

export const getQualificationQuestionsByModule = (): AllModuleQualificationQuestions => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.qualificationQuestions ? { ...DEFAULT_QUALIFICATION_QUESTIONS_BY_MODULE, ...adminConfig.qualificationQuestions } : { ...DEFAULT_QUALIFICATION_QUESTIONS_BY_MODULE };
};

export const getQualificationThresholds = (): { qualified: number; clarification: number } => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.qualificationThresholds || DEFAULT_QUALIFICATION_THRESHOLDS;
};

export const getQualificationEmailTemplate = (moduleId?: string): string => {
  const adminConfig = loadAdminConfig();
  // Admin custom template has highest priority. This is useful for temporary global overrides.
  // The user can clear this in the admin panel to revert to module-specific templates.
  if (adminConfig?.qualificationEmailTemplate) {
    return adminConfig.qualificationEmailTemplate;
  }
  
  if (moduleId && QUALIFICATION_EMAIL_TEMPLATES_BY_MODULE[moduleId]) {
    return QUALIFICATION_EMAIL_TEMPLATES_BY_MODULE[moduleId];
  }
  
  // For any module not explicitly listed, use the default template which omits the link.
  return QUALIFICATION_EMAIL_TEMPLATES_BY_MODULE.default;
};

export const getDiscoveryQuestionsTemplates = (): EditableDiscoveryQuestionsTemplates => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.discoveryQuestionsTemplates ? { ...DEFAULT_DISCOVERY_QUESTIONS_TEMPLATES, ...adminConfig.discoveryQuestionsTemplates } : { ...DEFAULT_DISCOVERY_QUESTIONS_TEMPLATES };
};

export const getPainPointHierarchy = (): PainPointLevel1Pain[] => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.painPointHierarchy !== undefined ? adminConfig.painPointHierarchy : DEFAULT_PAIN_POINT_HIERARCHY;
};

export const getReverseWaterfallCheatSheets = (): EditableReverseWaterfallCheatSheets => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.reverseWaterfallCheatSheets ? { ...DEFAULT_REVERSE_WATERFALL_CHEAT_SHEETS, ...adminConfig.reverseWaterfallCheatSheets } : { ...DEFAULT_REVERSE_WATERFALL_CHEAT_SHEETS };
};

export const getModuleSolutionContentMap = (): EditableModuleSolutionContentMap => {
  const adminConfig = loadAdminConfig();
  return adminConfig?.moduleSolutionContent ? { ...DEFAULT_MODULE_SPECIFIC_SOLUTION_CONTENT, ...adminConfig.moduleSolutionContent } : { ...DEFAULT_MODULE_SPECIFIC_SOLUTION_CONTENT };
};
