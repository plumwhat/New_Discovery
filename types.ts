

export enum Role {
  SALES = "Sales",
  PRESALES = "Presales",
  SDR = "SDR",
  SAD = "SAD",
}

export enum AutomationType {
  FINANCE = "Finance Automation",
  BUSINESS = "Business Automation",
}

export enum TabId {
  HOME = "Home",
  CUSTOMER_CONVERSATIONS = "Customer Conversations", 
  PAIN_POINTS = "Pain Points", 
  OPPORTUNITY_SCORECARD = "Opportunity Scorecard",
  QUALIFICATION = "Qualification",
  DISCOVERY_QUESTIONS = "Discovery Questions",
  ROI_CALCULATOR = "ROI Calculator",
  SOLUTION_BUILDER = "Solution Builder",
  HELP = "Help", // New TabId
}

export interface Module {
  id: string;
  name: string;
  technologyPartner?: "Esker" | "M-Files" | "Nintex" | "Generic"; 
}

export interface ScorecardQuestion {
  id: string;
  text: string;
}

export type ScorecardAnswer = "yes" | "no" | "unsure" | "";

export interface ScorecardState {
  answers: { [key: string]: ScorecardAnswer };
  totalScore: number;
}

export interface QualificationQuestionOption { 
  label: string; 
  value: number;
}

export interface QualificationQuestion {
  id: string;
  text: string;
  options: QualificationQuestionOption[];
}

export enum QualificationStatus {
  NOT_STARTED = "Not Started",
  QUALIFIED = "Qualified",
  CLARIFICATION_REQUIRED = "Clarification Required",
  NOT_SUITABLE = "Not Suitable",
}

export interface QualificationSectionState {
  answers: { [key: string]: number | "" }; 
  score: number;
  status: QualificationStatus;
}

export interface QualificationAdminSettings { // This remains for in-app qualification threshold setting, not full admin panel
  thresholds: {
    qualified: number;
    clarification: number;
  };
  defaultThresholds: {
      qualified: number;
      clarification: number;
  };
}

export interface QualificationState {
  qualitative: QualificationSectionState;
  quantitative: QualificationSectionState;
  adminSettings: QualificationAdminSettings;
  showAdminSettings: boolean; // This toggle can remain for the built-in qualification settings panel
}

// For module-specific qualification questions
export interface ModuleQualificationQuestions {
  qualitative: QualificationQuestion[];
  quantitative: QualificationQuestion[];
}
export interface AllModuleQualificationQuestions {
  [moduleId: string]: ModuleQualificationQuestions;
}


export interface DiscoveryQuestion {
  id: string;
  text: string;
  isCustom?: boolean; 
  placeholderHint?: string; 
}

export interface DiscoveryAnswer {
  questionId: string; 
  questionText: string; 
  answer: string; 
  isCustom?: boolean; 
}

export interface DiscoveryModuleState {
  qualitative: DiscoveryAnswer[];
  quantitative: DiscoveryAnswer[];
}

export interface DiscoveryQuestionsState {
  [moduleId: string]: DiscoveryModuleState;
}

// Describes the structure of DISCOVERY_QUESTIONS_TEMPLATES in constants.ts
export interface EditableDiscoveryQuestionsTemplates {
    [moduleId: string]: {
        qualitative: DiscoveryQuestion[];
        quantitative: DiscoveryQuestion[];
    };
}


export interface RoiInput {
  id: string;
  label: string;
  type: "number" | "text";
  value: string | number;
  unit?: string;
  isCurrency?: boolean;
}

export interface RoiResults {
  totalAnnualGrossSavings: number;
  totalInvestmentOverLifespan: number;
  upfrontInvestment: number;
  annualRecurringSoftwareCost: number;
  solutionLifespanYears: number;
  overallRoiPercentage: number;
  totalNetBenefitOverLifespan: number;
  paybackPeriodMonths: number;
  savingsCalculationWorkings: Array<{ category: string; formula: string; result: number; inputsUsed: Record<string, string | number> }>;
  annualBreakdown: Array<{
    year: number;
    grossSavings: number;
    softwareCost: number;
    investment: number;
    netCashFlow: number;
    cumulativeNetCashFlow: number;
  }>;
}

export interface RoiModuleState {
  annualSalary: number;
  annualSoftwareCost: number;
  upfrontProfServicesCost: number;
  solutionLifespanYears: number;
  inputs: { [inputId: string]: string | number };
  results: RoiResults | null;
}

export interface RoiCalculatorState {
  [moduleId: string]: RoiModuleState;
}

export interface RequirementBlock {
  id: string;
  requirement: string;
  solution: string;
}

export interface SolutionBuilderState {
  selectedCoreModuleId: string | null;
  requirementBlocks: RequirementBlock[];
  showDocumentView: boolean;
  editingBlockId: string | null; 
}

export enum ExportFormat {
  TXT = "txt",
  MD = "md",
  AI_PROMPT = "ai_prompt",
  HTML = "html",
}

// --- Pain Points Tab Types ---
export enum PainPointMode {
  WATERFALL = "Waterfall",
  REVERSE_WATERFALL = "ReverseWaterfall",
}

export interface PainPointSolutionMapping {
  painIdentified: string;
  suggestedSolutionsProductIds: string[]; // Module IDs
}

export interface PainPointAnswerOption {
  id: string;
  text: string;
  leadsToSolutionMapping?: PainPointSolutionMapping; 
  isNotAligned?: boolean; 
}

export interface PainPointLevel3Question {
  id: string;
  text: string; 
  answerOptions: PainPointAnswerOption[]; 
}

export interface PainPointLevel2Pain {
  id: string;
  text: string;
  level3Questions: PainPointLevel3Question[]; 
}

export interface PainPointLevel1Pain {
  id: string;
  text: string;
  level2Pains: PainPointLevel2Pain[];
}

export interface ReverseWaterfallCheatSheetKeyPoint {
    question: string;
    aligningAnswer: string;
}

export interface ReverseWaterfallCheatSheet {
  objective: string;
  highLevelPain: string; 
  specificProcessPain: string; 
  keyDiscoveryPoints: ReverseWaterfallCheatSheetKeyPoint[];
}

// Describes the structure of REVERSE_WATERFALL_CHEAT_SHEETS in constants.ts
export interface EditableReverseWaterfallCheatSheets {
    [moduleId: string]: ReverseWaterfallCheatSheet;
}


export interface WaterfallLogEntry {
    type: 'L1Pain' | 'L2Pain' | 'L3QuestionSelected' | 'L3AnswerSelected' | 'L3Outcome' | 'GlobalOutcome';
    text: string; 
    details?: string; 
}

export enum WaterfallStep {
  SELECT_L1_PAIN = 0,
  SELECT_L2_PAIN = 1,
  SELECT_L3_QUESTION = 2, 
  ANSWER_L3_QUESTION = 3, 
  SHOW_L3_OUTCOME = 4,    
  SHOW_L2_SUMMARY_OR_GLOBAL_OUTCOME = 5, 
}

export interface AccumulatedSolutionInfo {
  questionId: string;
  questionText: string;
  answerId: string;
  answerText: string;
  solutionMapping: PainPointSolutionMapping;
}

export interface PainPointsAppState {
  activeMode: PainPointMode;
  // Waterfall State
  currentWaterfallStep: WaterfallStep; 
  selectedL1PainId: string | null;
  selectedL2PainId: string | null;
  
  availableL3QuestionIds: string[]; 
  selectedL3QuestionId: string | null; 
  answeredL3QuestionIds: string[]; 

  selectedL3AnswerId: string | null; 
  
  showNotAlignedMessage: boolean; 
  
  currentL3AlignmentDetails: PainPointSolutionMapping | null; 
  accumulatedL2Solutions: AccumulatedSolutionInfo[]; 

  waterfallConversationLog: WaterfallLogEntry[]; 
  showConversationView: boolean; 
  // Reverse Waterfall State
  selectedProductForCheatSheet: string | null; 
}

// --- Customer Conversations Tab Types ---
export enum ConversationStepId {
  INTRODUCTION_OBJECTIVES = "Introduction & Objectives", // Step 1
  EXPLORATION_CHALLENGES = "Exploration & Challenges",   // Step 2
  INTRODUCE_SOLUTION = "Introduce Solution",           // Step 3
  QUALIFY_ARRANGE_FOLLOW_UP = "Qualify & Arrange Follow-Up", // Step 4
  WRAP_UP = "Wrap-Up",                             // Step 5
}

export interface ConversationExchange {
  id: string; // Unique ID for each Q/A pair or script block
  stepId: ConversationStepId; // To which step this exchange belongs
  type: 'script' | 'question' | 'note' | 'module_question_group'; // Type of exchange
  prompt: string; // The script text or question posed, or title for module_question_group
  answer: string; // User-recorded answer or notes. For module_question_group, this might be a summary or not applicable.
  automationFocus?: AutomationType | null; // If this exchange leads to a focus
  modulePrompts?: Array<{ moduleId: string; moduleName: string; promptQuestion: string; answer: string }>; // Specific module prompts if applicable (used with type 'module_question_group')
}

export interface CustomerConversationState {
  currentStep: ConversationStepId;
  exchanges: ConversationExchange[]; // Log of all interactions
  currentAutomationFocus: AutomationType | null; // Tracks if conversation leans Finance or Business
  explorationInput: string; // User input to decide automation focus for step 2
  followUpDetails: {
    interestConfirmed: boolean | null;
    contactName: string;
    contactEmail: string;
    meetingDate: string;
    meetingTime: string;
    specialistNeeded: AutomationType | null;
    notes: string;
  };
  generalNotes: string; // Overall notes for the conversation
}


export interface AppState {
  customerCompany: string;
  customerName: string;
  dateCompleted: string; 
  selectedRole: Role;
  selectedAutomationType: AutomationType;
  selectedModuleId: string | null; 
  activeTab: TabId;
  opportunityScorecard: ScorecardState;
  qualification: QualificationState;
  discoveryQuestions: DiscoveryQuestionsState;
  roiCalculator: RoiCalculatorState;
  solutionBuilder: SolutionBuilderState; 
  painPoints: PainPointsAppState; 
  customerConversations: CustomerConversationState; 
  exportFormat: ExportFormat;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success"; 
  size?: "sm" | "md" | "lg";
  icon?: React.ReactElement<IconProps>;
  iconPosition?: 'left' | 'right';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

export interface RadioGroupProps<T extends string | number> {
  name: string;
  options: Array<{ value: T; label: string }>;
  selectedValue: T;
  onChange: (value: T) => void;
  label?: string;
}

export interface TabProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export interface TabDefinition {
  id: TabId;
  label: string;
  roles: Role[];
  component: React.FC<TabProps>;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  purpose?: string; // Optional: Add purpose here for Home tab display
}

export interface TabMetadata {
  id: TabId;
  label: string;
  roles: Role[];
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  purpose?: string; // Optional: Add purpose here for Home tab display
}

export interface ModuleSolutionContent {
  executiveSummaryBoilerplate: (partnerName: string) => string;
  solutionOverviewDetails: (partnerName: string, moduleName: string) => string; 
  coreElements: (partnerName: string, moduleName: string) => string[];
  technologyPartnerName: "Esker" | "M-Files" | "Nintex" | "leading automation technologies";
}

// Describes the structure of MODULE_SPECIFIC_SOLUTION_CONTENT in constants.ts
export interface EditableModuleSolutionContent {
    executiveSummaryBoilerplate: string; 
    solutionOverviewDetails: string; 
    coreElements: string[]; 
    technologyPartnerName: "Esker" | "M-Files" | "Nintex" | "leading automation technologies";
}
export interface EditableModuleSolutionContentMap {
    [moduleId: string]: EditableModuleSolutionContent;
}
