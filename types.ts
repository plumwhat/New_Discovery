
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
  HOME = "Home", // Added Home Tab
  OPPORTUNITY_SCORECARD = "Opportunity Scorecard",
  QUALIFICATION = "Qualification",
  DISCOVERY_QUESTIONS = "Discovery Questions",
  ROI_CALCULATOR = "ROI Calculator",
}

export interface Module {
  id: string;
  name: string;
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
  value: number; // PDF Rating: 1, 2, or 3
}
export interface QualificationQuestion {
  id: string;
  text: string;
  options: QualificationQuestionOption[];
}

export enum QualificationStatus {
  NOT_STARTED = "Not Started",
  QUALIFIED = "Qualified",
  CLARIFICATION_REQUIRED = "Requires Clarification", // Updated label for consistency
  NOT_SUITABLE = "Do Not Proceed", // Updated label for consistency
}

export interface QualificationSectionState {
  answers: { [questionId: string]: number | "" }; // Store selected option's PDF rating (1,2,3) or ""
  averageScore: number; // Calculated average score (0-3)
  status: QualificationStatus;
}

export interface QualificationAdminSettings {
  thresholds: {
    qualifiedMinAverage: number; // e.g., 2.4
    clarificationMinAverage: number; // e.g., 1.7
  };
  defaultThresholds: {
    qualifiedMinAverage: number;
    clarificationMinAverage: number;
  };
}

export interface QualificationModuleData {
  qualitative: QualificationSectionState;
  quantitative: QualificationSectionState;
}
export interface QualificationState {
  moduleData: {
    [moduleId: string]: QualificationModuleData;
  };
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
  type: "number" | "text"; // Can be extended
  value: string | number; // User input is string, converted for calculation
  unit?: string; // e.g., "hours/week", "%", "$"
  isCurrency?: boolean; // Hint for formatting
  placeholder?: string; // Specific placeholder for this input
}

export interface RoiCalculationFactors {
  timeSavingPercentage: number; // Stored as 0-1 (e.g., 0.75 for 75%)
  errorReductionPercentage: number; // Stored as 0-1
  // Add other specific factors as needed by various module calculations
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
    investment: number; // Upfront in Y1, 0 otherwise
    netCashFlow: number;
    cumulativeNetCashFlow: number;
  }>;
}

export interface RoiModuleState {
  annualSalary: number | string; // Allow string for input field
  annualSoftwareCost: number | string;
  upfrontProfServicesCost: number | string;
  solutionLifespanYears: number | string;
  inputs: { [inputId: string]: string | number }; // Module-specific metrics
  results: RoiResults | null;
  calculationFactors: RoiCalculationFactors;
  defaultCalculationFactors: RoiCalculationFactors; // For reset functionality
}

export interface RoiCalculatorState {
  [moduleId: string]: RoiModuleState;
}

export enum ExportFormat {
  TXT = "txt",
  MD = "md",
  AI_PROMPT = "ai_prompt",
  HTML = "html",
}

export interface AppState {
  selectedRole: Role;
  selectedAutomationType: AutomationType;
  selectedModuleId: string | null;
  activeTab: TabId;
  opportunityScorecard: ScorecardState;
  qualification: QualificationState;
  discoveryQuestions: DiscoveryQuestionsState;
  roiCalculator: RoiCalculatorState;
  exportFormat: ExportFormat;
  isRoiAdminModalOpen: boolean; 
}

// Props for common components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
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

export type TabDefinition = {
  id: TabId;
  label: string;
  roles: Role[];
  component: React.FC<TabProps>;
};

export interface TabProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  // Any other common props for tabs
}
