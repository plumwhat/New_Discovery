

export enum Role {
  SALES = "Sales",
  PRESALES = "Presales",
  CSM = "Customer Success Manager", // Changed from SDR
  SAD = "SAD",
}

export enum ServiceType { // Renamed from AutomationType
  FINANCE = "Finance Automation",
  BUSINESS = "Business Automation",
  ITS = "IT Services", // Added ITS
}

export enum TabId {
  HOME = "Home",
  CUSTOMER_CONVERSATIONS = "Customer Conversations", 
  PAIN_POINTS = "Pain Points", 
  OPPORTUNITY_SCORECARD = "Opportunity Scorecard",
  ENGAGEMENT_WORKFLOW = "Engagement Workflow", 
  QUALIFICATION = "Qualification",
  DISCOVERY_QUESTIONS = "Discovery Questions",
  ROI_CALCULATOR = "ROI Calculator",
  SOLUTION_BUILDER = "Solution Builder",
  CUSTOMER_RETENTION_PLAYBOOK = "Customer Retention Playbook",
  HELP = "Help", // New TabId
}

export interface Module {
  id: string;
  name: string;
  technologyPartner?: "Esker" | "M-Files" | "Nintex" | "Generic" | "Fujifilm Business Innovation"; // Added Fujifilm
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
  id: string; // Added ID for easier management in admin panel
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

export interface QualificationState {
  qualitative: QualificationSectionState;
  quantitative: QualificationSectionState;
}

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
  value: string | number; // Value is instance data, not part of template structure for editing.
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
  monthlyCostOfDelay: number; 
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

export enum PainPointMode {
  WATERFALL = "Waterfall",
  REVERSE_WATERFALL = "ReverseWaterfall",
}

export interface PainPointSolutionMapping {
  painIdentified: string;
  suggestedSolutionsProductIds: string[]; 
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
    id: string; // Added ID for list management
    question: string;
    aligningAnswer: string;
}

export interface ReverseWaterfallCheatSheet {
  objective: string;
  highLevelPain: string; 
  specificProcessPain: string; 
  keyDiscoveryPoints: ReverseWaterfallCheatSheetKeyPoint[];
  keyBenefits?: string[]; 
}

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
  selectedProductForCheatSheet: string | null; 
}

export enum ConversationStepId {
  INTRODUCTION_OBJECTIVES = "Introduction & Objectives", 
  EXPLORATION_CHALLENGES = "Exploration & Challenges",   
  INTRODUCE_SOLUTION = "Introduce Solution",           
  QUALIFY_ARRANGE_FOLLOW_UP = "Qualify & Arrange Follow-Up", 
  WRAP_UP = "Wrap-Up",                             
}

export interface ConversationExchange { 
  id: string; 
  sectionId: ConversationStepId; 
  scriptItemId?: string; 
  type: 'section_completed' | 'focus_determined' | 'script_presented' | 'question_answered' | 'note_taken' | 'module_question_answered' | 'follow_up_details';
  promptText?: string; 
  answerText?: string; 
  moduleKey?: string; 
  details?: any; 
}

export type ScriptItemType = 'script' | 'input_prompt' | 'question_textarea' | 'module_question_group' | 'radio_group' | 'final_notes' | 'interest_buttons';


export interface CustomerConversationState {
  activeSectionId: ConversationStepId; 
  completedSectionIds: ConversationStepId[]; 

  exchangeAnswers: Record<string, string>; 
  moduleExchangeAnswers: Record<string, Record<string, string>>; 
  
  exchanges: ConversationExchange[]; 

  currentServiceFocus: ServiceType | null; // Renamed from currentAutomationFocus
  explorationInput: string; 
  followUpDetails: {
    interestConfirmed: boolean | null;
    contactName: string;
    contactEmail: string;
    meetingDate: string;
    meetingTime: string;
    specialistNeeded: ServiceType | null; // Changed from AutomationType
    notes: string;
  };
  generalNotes: string; 
}

export enum EngagementStepType {
  INITIAL_ENGAGEMENT = 'Initial Engagement',
  HEALTH_CHECK = 'Health Check',
  CUSTOMER_MEETING = 'Customer Meeting',
  QUALIFICATION = 'Qualification',
  DISCOVERY_MEETING = 'Discovery Meeting',
  PROCESS_MAPS = 'Process Maps',
  DEMONSTRATION = 'Demonstration',
  ROI_SOLUTION_PRESENTATION = 'ROI & Solution Presentation',
}

export enum EngagementStepStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    SKIPPED = 'skipped',
}

export interface EngagementWorkflowStep {
  id: string;
  stepType: EngagementStepType;
  objectives: string[];
  salesActions: string[];
  status: EngagementStepStatus;
}

export interface EngagementWorkflowState {
  steps: EngagementWorkflowStep[];
}

export interface CustomerRetentionState {
  completedActions: Record<string, boolean>;
}

export interface AppState {
  customerCompany: string;
  customerName: string;
  dateCompleted: string; 
  selectedRole: Role;
  selectedServiceType: ServiceType; // Renamed from selectedAutomationType
  selectedModuleId: string | null; 
  activeTab: TabId;
  opportunityScorecard: ScorecardState;
  qualification: QualificationState;
  discoveryQuestions: DiscoveryQuestionsState;
  roiCalculator: RoiCalculatorState;
  solutionBuilder: SolutionBuilderState; 
  painPoints: PainPointsAppState; 
  customerConversations: CustomerConversationState; 
  engagementWorkflow: EngagementWorkflowState; // New state slice
  customerRetention: CustomerRetentionState;
  exportFormat: ExportFormat;
  isAdminPanelVisible?: boolean; // Added for Admin Panel Phase 2
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string; 
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success"; 
  size?: "sm" | "md" | "lg";
  icon?: React.ReactElement<IconProps>;
  iconPosition?: 'left' | 'right';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isCurrency?: boolean; 
  unit?: string; 
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
  selectedValue: T | undefined; // Allow undefined for unanswered
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
  purpose?: string; 
}

export interface TabMetadata {
  id: TabId;
  label: string;
  roles: Role[];
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  purpose?: string; 
}

export interface ModuleSolutionContent {
  executiveSummaryBoilerplate: (partnerName: string) => string;
  solutionOverviewDetails: (partnerName: string, moduleName: string) => string; 
  coreElements: (partnerName: string, moduleName: string) => string[];
  technologyPartnerName: "Esker" | "M-Files" | "Nintex" | "leading automation technologies" | "Fujifilm Business Innovation";
}

export interface EditableModuleSolutionContent {
    executiveSummaryBoilerplate: string; 
    solutionOverviewDetails: string; 
    coreElements: string[]; // List of strings
    technologyPartnerName: "Esker" | "M-Files" | "Nintex" | "leading automation technologies" | "Fujifilm Business Innovation" | "Generic";
}
export interface EditableModuleSolutionContentMap {
    [moduleId: string]: EditableModuleSolutionContent;
}
export interface ScriptItem {
  id: string;
  type: ScriptItemType;
  text: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  targetStateProperty?: keyof CustomerConversationState['followUpDetails'] | 'explorationInput' | 'generalNotes';
  moduleServiceFocus?: ServiceType; // Renamed from moduleAutomationFocus
}
export interface ConversationSectionConfig {
  id: ConversationStepId;
  title: string;
  scriptItems: ScriptItem[];
  nextSectionId?: ConversationStepId;
  preLogic?: (state: CustomerConversationState) => Partial<CustomerConversationState>;
  postLogic?: (state: CustomerConversationState, answers: Record<string, string>) => Partial<Pick<CustomerConversationState, 'currentServiceFocus' | 'followUpDetails' | 'explorationInput'>>; // Changed currentAutomationFocus to currentServiceFocus
}

// Admin Configuration Types
export interface RoiCalculationConstants {
  hourlyRateDivisor?: number;
  automationTimeSavingPercentage?: number;
  automationErrorReductionPercentage?: number;
}

export interface AdminConfigStructure {
  // Phase 1
  appTitle?: string;
  scorecardQuestions?: ScorecardQuestion[];
  roiInputTemplates?: Record<string, RoiInput[]>; // Key: moduleID
  roiCalculationConstants?: RoiCalculationConstants;

  // Phase 2
  appSubtitle?: string;
  resellerCompanyName?: string;
  footerCopyrightOwner?: string;
  
  // Phase 3
  qualificationQuestions?: AllModuleQualificationQuestions;
  qualificationThresholds?: { qualified: number; clarification: number };
  discoveryQuestionsTemplates?: EditableDiscoveryQuestionsTemplates;
  painPointHierarchy?: PainPointLevel1Pain[];
  reverseWaterfallCheatSheets?: EditableReverseWaterfallCheatSheets;
  moduleSolutionContent?: EditableModuleSolutionContentMap;
  
  // Future
  tabMetadata?: TabMetadata[];
}
