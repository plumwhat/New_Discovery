

export enum Role {
  SALES = "Sales",
  PRESALES = "Presales",
  SDR_SAD = "SDR/SAD",
}

export enum AutomationType {
  FINANCE = "Finance Automation",
  BUSINESS = "Business Automation",
}

export enum TabId {
  HOME = "Home",
  OPPORTUNITY_SCORECARD = "Opportunity Scorecard",
  QUALIFICATION = "Qualification",
  DISCOVERY_QUESTIONS = "Discovery Questions",
  ROI_CALCULATOR = "ROI Calculator",
  SOLUTION_BUILDER = "Solution Builder",
}

export interface Module {
  id: string;
  name: string;
  technologyPartner?: "Esker" | "M-Files" | "Nintex" | "Generic"; // Added for clarity
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

export interface QualificationQuestion {
  id: string;
  text: string;
  options: { label: string; value: number }[];
}

export enum QualificationStatus {
  NOT_STARTED = "Not Started",
  QUALIFIED = "Qualified",
  CLARIFICATION_REQUIRED = "Clarification Required",
  NOT_SUITABLE = "Not Suitable",
}

export interface QualificationSectionState {
  answers: { [key: string]: number | "" }; // Store selected option's value (score)
  score: number;
  status: QualificationStatus;
}

export interface QualificationAdminSettings {
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
  showAdminSettings: boolean;
}

export interface DiscoveryQuestion {
  id: string;
  text: string;
  isCustom?: boolean;
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

export interface AppState {
  customerCompany: string;
  customerName: string;
  dateCompleted: string; // ISO string format: "YYYY-MM-DD"
  selectedRole: Role;
  selectedAutomationType: AutomationType;
  selectedModuleId: string | null; 
  activeTab: TabId;
  opportunityScorecard: ScorecardState;
  qualification: QualificationState;
  discoveryQuestions: DiscoveryQuestionsState;
  roiCalculator: RoiCalculatorState;
  solutionBuilder: SolutionBuilderState; 
  exportFormat: ExportFormat; // For general app export
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
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

// Full TabDefinition including the component
export interface TabDefinition {
  id: TabId;
  label: string;
  roles: Role[];
  component: React.FC<TabProps>;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

// TabMetadata for defining tabs in constants.ts without direct component import
export interface TabMetadata {
  id: TabId;
  label: string;
  roles: Role[];
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}


export interface TabProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export interface ModuleSolutionContent {
  executiveSummaryBoilerplate: (partnerName: string) => string;
  solutionOverviewDetails: (partnerName: string, moduleName: string) => string;
  coreElements: (partnerName: string, moduleName: string) => string[]; // New field for core functionalities
  technologyPartnerName: "Esker" | "M-Files" | "Nintex" | "leading automation technologies";
}