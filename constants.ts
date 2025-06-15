import { Role, AutomationType, Module, TabId, ScorecardQuestion, QualificationQuestion, QualificationStatus, DiscoveryQuestion, RoiInput, AppState, ExportFormat, TabDefinition, RoiCalculationFactors } from './types';
import OpportunityScorecardTab from './components/OpportunityScorecardTab';
import QualificationTab from './components/QualificationTab';
import DiscoveryQuestionsTab from './components/DiscoveryQuestionsTab';
import RoiCalculatorTab from './components/RoiCalculatorTab';

export const APP_TITLE = "Process Automation";
export const APP_SUBTITLE = "Discovery & ROI Calculator";

export const ROLES: Role[] = [Role.PRESALES, Role.SALES, Role.SDR_SAD];
export const AUTOMATION_TYPES: AutomationType[] = [AutomationType.FINANCE, AutomationType.BUSINESS];

export const FINANCE_MODULES: Module[] = [
  { id: "accountsPayable", name: "Accounts Payable" },
  { id: "orderManagement", name: "Order Management" },
  { id: "customerInquiryManagement", name: "Customer Inquiry Management" },
  { id: "cashApplication", name: "Cash Application" },
  { id: "collectionManagement", name: "Collection Management" },
  { id: "creditManagement", name: "Credit Management" },
  { id: "claimsDeductions", name: "Claims & Deductions" },
  { id: "expenseManagement", name: "Expense Management" },
  { id: "procurement", name: "Procurement" },
  { id: "invoiceDelivery", name: "Invoice Delivery" },
  { id: "supplierManagement", name: "Supplier Management" },
];

export const BUSINESS_MODULES: Module[] = [
  { id: "documentManagement", name: "Document Management" },
  { id: "workflowManagement", name: "Workflow Management" },
  { id: "processMapping", name: "Process Mapping" },
];

export const MODULES_BY_AUTOMATION_TYPE: Record<AutomationType, Module[]> = {
  [AutomationType.FINANCE]: FINANCE_MODULES,
  [AutomationType.BUSINESS]: BUSINESS_MODULES,
};

export const ALL_MODULES: Module[] = [...FINANCE_MODULES, ...BUSINESS_MODULES];


export const SCORECARD_QUESTIONS: ScorecardQuestion[] = [
  { id: "q1", text: "Is there a clear executive sponsor for this initiative?" },
  { id: "q2", text: "Is the pain point well-defined and acknowledged by the prospect?" },
  { id: "q3", text: "Is there an allocated budget or willingness to invest?" },
  { id: "q4", text: "Is the timeline for implementation reasonable and agreed upon?" },
  { id: "q5", text: "Does the prospect understand the value proposition of automation?" },
];

export const QUALIFICATION_QUESTIONS_QUALITATIVE: QualificationQuestion[] = [
  { id: "qual1", text: "Strategic Alignment: How well does this automation align with the company's strategic objectives?", options: [{label: "Poorly (0)", value: 0}, {label: "Somewhat (5)", value: 5}, {label: "Well (10)", value: 10}, {label: "Perfectly (15)", value: 15}] },
  { id: "qual2", text: "Change Readiness: How prepared is the organization for process changes?", options: [{label: "Not Ready (0)", value: 0}, {label: "Hesitant (5)", value: 5}, {label: "Moderately Ready (10)", value: 10}, {label: "Very Ready (15)", value: 15}] },
  { id: "qual3", text: "Stakeholder Buy-in: What is the level of commitment from key stakeholders?", options: [{label: "Low (0)", value: 0}, {label: "Medium (5)", value: 5}, {label: "High (10)", value: 10}, {label: "Full Commitment (15)", value: 15}] },
  { id: "qual4", text: "Risk Appetite: How comfortable is the company with adopting new technologies?", options: [{label: "Risk Averse (0)", value: 0}, {label: "Cautious (5)", value: 5}, {label: "Open (10)", value: 10}, {label: "Eager (15)", value: 15}] },
];

export const QUALIFICATION_QUESTIONS_QUANTITATIVE: QualificationQuestion[] = [
  { id: "quant1", text: "Volume of Transactions/Tasks: What is the estimated daily/monthly volume?", options: [{label: "Low (<100/day) (0)", value: 0}, {label: "Medium (100-500/day) (5)", value: 5}, {label: "High (500-2000/day) (10)", value: 10}, {label: "Very High (>2000/day) (15)", value: 15}] },
  { id: "quant2", text: "Current Process Time: How long does the current manual process take per unit?", options: [{label: ">1hr (0)", value: 0}, {label: "30-60min (5)", value: 5}, {label: "15-30min (10)", value: 10}, {label: "<15min (but repetitive) (15)", value: 15}] },
  { id: "quant3", text: "Error Rate: What is the current error rate in the manual process?", options: [{label: "<1% (0)", value: 0}, {label: "1-5% (5)", value: 5}, {label: "5-10% (10)", value: 10}, {label: ">10% (15)", value: 15}] },
  { id: "quant4", text: "Number of FTEs Involved: How many Full-Time Equivalents are involved in this process?", options: [{label: "<1 (0)", value: 0}, {label: "1-2 (5)", value: 5}, {label: "3-5 (10)", value: 10}, {label: ">5 (15)", value: 15}] },
];

export const DEFAULT_QUALIFICATION_THRESHOLDS = {
  qualified: 40, 
  clarification: 20, 
};

export const DISCOVERY_QUESTIONS_TEMPLATES: Record<string, { qualitative: DiscoveryQuestion[], quantitative: DiscoveryQuestion[] }> = {
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_1", text: "Describe your current invoice approval workflow. What are the biggest bottlenecks?" },
      { id: "ap_qual_2", text: "What is the biggest pain point in your current AP process?" },
      { id: "ap_qual_3", text: "How do you currently handle exceptions and discrepancies in invoices?" },
      { id: "ap_qual_4", text: "What is the impact of invoice processing delays on your financial reporting and supplier relationships?" },
      { id: "ap_qual_5", text: "How do you ensure compliance with internal controls and audit trails for AP?" },
    ],
    quantitative: [
      { id: "ap_quant_1", text: "How many invoices do you process per month?" },
      { id: "ap_quant_2", text: "What percentage of your invoices are received electronically vs. paper?" },
      { id: "ap_quant_3", text: "What is your average cost to process a single invoice?" },
      { id: "ap_quant_4", text: "How many FTEs are dedicated to the AP process?" },
      { id: "ap_quant_5", text: "What is your on-time payment percentage for suppliers?" },
    ],
  },
  orderManagement: { qualitative: [{id: "om_qual_1", text:"Describe order management."}], quantitative: [{id: "om_quant_1", text:"Volume of orders?"}]},
  customerInquiryManagement: { qualitative: [{id: "cim_qual_1", text:"Describe customer inquiry process."}], quantitative: [{id: "cim_quant_1", text:"Number of inquiries?"}]},
  cashApplication: { qualitative: [{id: "ca_qual_1", text:"Describe cash application."}], quantitative: [{id: "ca_quant_1", text:"Payments processed?"}]},
  collectionManagement: { qualitative: [{id: "col_qual_1", text:"Describe collections."}], quantitative: [{id: "col_quant_1", text:"DSO?"}]},
  creditManagement: { qualitative: [{id: "cr_qual_1", text:"Describe credit management."}], quantitative: [{id: "cr_quant_1", text:"Credit apps processed?"}]},
  claimsDeductions: { qualitative: [{id: "cd_qual_1", text:"Describe claims/deductions."}], quantitative: [{id: "cd_quant_1", text:"Number of deductions?"}]},
  expenseManagement: { qualitative: [{id: "em_qual_1", text:"Describe expense management."}], quantitative: [{id: "em_quant_1", text:"Expense reports/month?"}]},
  procurement: { qualitative: [{id: "pr_qual_1", text:"Describe procurement."}], quantitative: [{id: "pr_quant_1", text:"POs per month?"}]},
  invoiceDelivery: { qualitative: [{id: "id_qual_1", text:"Describe invoice delivery."}], quantitative: [{id: "id_quant_1", text:"Invoices sent/month?"}]},
  supplierManagement: { qualitative: [{id: "sm_qual_1", text:"Describe supplier management."}], quantitative: [{id: "sm_quant_1", text:"Active suppliers?"}]},
  documentManagement: { qualitative: [{id: "doc_qual_1", text:"Describe document management."}], quantitative: [{id: "doc_quant_1", text:"Volume of new documents?"}]},
  workflowManagement: { qualitative: [{id: "wm_qual_1", text:"Describe workflow management."}], quantitative: [{id: "wm_quant_1", text:"Manual forms processed?"}]},
  processMapping: { qualitative: [{id: "pm_qual_1", text:"Describe process mapping."}], quantitative: [{id: "pm_quant_1", text:"Undocumented processes?"}]},
  default: { 
    qualitative: Array.from({ length: 2 }, (_, i) => ({ id: `def_qual_${i+1}`, text: `Default Qualitative Question ${i+1} for this module?` })),
    quantitative: Array.from({ length: 2 }, (_, i) => ({ id: `def_quant_${i+1}`, text: `Default Quantitative Question ${i+1} for this module? (metric)` })),
  }
};

export const ROI_INPUT_TEMPLATES: Record<string, RoiInput[]> = {
  accountsPayable: [
    { id: "ap_roi_numInvoicesPerMonth", label: "Number of invoices per month", type: "number", value: "", placeholder: "e.g., 5000" },
    { id: "ap_roi_avgManualProcessingTimePerInvoiceMins", label: "Avg. manual processing time per invoice (mins)", type: "number", value: "", placeholder: "e.g., 15" },
    { id: "ap_roi_currentInvoiceErrorRatePercentage", label: "Current invoice error/exception rate (%)", type: "number", value: "", placeholder: "e.g., 5 (for 5%)" },
    { id: "ap_roi_avgTimeToResolveExceptionMins", label: "Avg. time to resolve an exception (mins)", type: "number", value: "", placeholder: "e.g., 30" },
    { id: "ap_roi_annualValueMissedEarlyPaymentDiscounts", label: "Annual value of missed early payment discounts ($)", type: "number", value: "", isCurrency: true, placeholder: "e.g., 10000" },
    { id: "ap_roi_annualCostPhysicalInvoiceStorage", label: "Annual cost of physical invoice storage ($)", type: "number", value: "", isCurrency: true, placeholder: "e.g., 2000" },
    { id: "ap_roi_numFTEs", label: "Number of FTEs in AP process", type: "number", value: "", placeholder: "e.g., 5"},
  ],
  orderManagement: [
    { id: "om_roi_numSalesOrdersPerMonth", label: "Number of sales orders per month", type: "number", value: "", placeholder: "e.g., 2000" },
    { id: "om_roi_avgManualOrderEntryTimeMins", label: "Avg. manual order entry time (mins)", type: "number", value: "", placeholder: "e.g., 10" },
    { id: "om_roi_currentOrderErrorRatePercentage", label: "Current order error rate (%)", type: "number", value: "", placeholder: "e.g., 8 (for 8%)" },
    { id: "om_roi_avgCostToReworkOrderError", label: "Avg. cost to rework an order error ($)", type: "number", value: "", isCurrency: true, placeholder: "e.g., 25" },
    { id: "om_roi_numFTEs", label: "Number of FTEs in Order Entry process", type: "number", value: "", placeholder: "e.g., 3"},
  ],
  claimsDeductions: [
    { id: "cd_roi_deductionsProcessedPerMonth", label: "Deductions processed per month", type: "number", value: "", placeholder: "e.g., 1000" },
    { id: "cd_roi_avgResearchTimePerDeductionHrs", label: "Avg. research time per deduction (hrs)", type: "number", value: "", placeholder: "e.g., 1.5" },
    { id: "cd_roi_percentageDeductionsInvalidPercentage", label: "Percentage of deductions that are invalid (%)", type: "number", value: "", placeholder: "e.g., 15 (for 15%)" },
    { id: "cd_roi_totalValueOfDeductionsPerMonth", label: "Total value of deductions per month ($)", type: "number", value: "", isCurrency: true, placeholder: "e.g., 50000" },
    { id: "cd_roi_numFTEs", label: "Number of FTEs for Claims/Deductions", type: "number", value: "", placeholder: "e.g., 2"},
  ],
  default: [ 
    { id: "def_roi_manualTaskTimeHrsWeek", label: "Time Spent on Manual Task (hours/week/employee)", type: "number", value: "", placeholder: "e.g., 20" },
    { id: "def_roi_numberOfEmployeesPerformingTask", label: "Number of Employees Performing Task", type: "number", value: "", placeholder: "e.g., 3" },
    { id: "def_roi_numTransactionsPerMonth", label: "Number of Transactions/Items per Month (related to task)", type: "number", value: "", placeholder: "e.g., 1000" },
    { id: "def_roi_errorRatePercentage", label: "Error Rate in Manual Task (%)", type: "number", value: "", placeholder: "e.g., 10 (for 10%)" },
    { id: "def_roi_costPerError", label: "Cost per Error ($) (excluding labor to fix)", type: "number", value: "", isCurrency: true, placeholder: "e.g., 50" },
    { id: "def_roi_avgTimeToFixErrorMins", label: "Avg. Labor Time to Fix an Error (mins)", type: "number", value: "", placeholder: "e.g., 45" },
  ]
};
// Ensure all modules have at least the default template if not specified
ALL_MODULES.forEach(module => {
    if (!ROI_INPUT_TEMPLATES[module.id]) {
        ROI_INPUT_TEMPLATES[module.id] = ROI_INPUT_TEMPLATES.default;
    }
});


const initialQualificationSectionState = {
  answers: {},
  score: 0,
  status: QualificationStatus.NOT_STARTED,
};

export const HOURLY_RATE_DIVISOR = 2080; // Standard hours in a work year (40 hrs/week * 52 weeks)

export const DEFAULT_BASE_CALCULATION_FACTORS: RoiCalculationFactors = {
  timeSavingPercentage: 0.75, // 75%
  errorReductionPercentage: 0.80, // 80%
};

// More specific default factors if needed for certain module types or specific modules
export const DEFAULT_AP_CALCULATION_FACTORS: RoiCalculationFactors = {
  timeSavingPercentage: 0.75,
  errorReductionPercentage: 0.80,
};

export const DEFAULT_GENERIC_CALCULATION_FACTORS: RoiCalculationFactors = {
  timeSavingPercentage: 0.60, // Example: generic might be less certain
  errorReductionPercentage: 0.50, // Example
};

export const DEMO_ROI_GLOBAL_SETTINGS = {
  annualSalary: "75000",
  annualSoftwareCost: "15000",
  upfrontProfServicesCost: "7000",
  solutionLifespanYears: "3",
};

export const DEMO_ROI_SPECIFIC_INPUTS: Record<string, { [inputId: string]: string }> = {
  accountsPayable: {
    ap_roi_numInvoicesPerMonth: "5000",
    ap_roi_avgManualProcessingTimePerInvoiceMins: "15",
    ap_roi_currentInvoiceErrorRatePercentage: "5",
    ap_roi_avgTimeToResolveExceptionMins: "30",
    ap_roi_annualValueMissedEarlyPaymentDiscounts: "10000",
    ap_roi_annualCostPhysicalInvoiceStorage: "2000",
    ap_roi_numFTEs: "5",
  },
  orderManagement: {
    om_roi_numSalesOrdersPerMonth: "2500",
    om_roi_avgManualOrderEntryTimeMins: "12",
    om_roi_currentOrderErrorRatePercentage: "7",
    om_roi_avgCostToReworkOrderError: "30",
    om_roi_numFTEs: "4",
  },
   customerInquiryManagement: {
    def_roi_manualTaskTimeHrsWeek: "15",
    def_roi_numberOfEmployeesPerformingTask: "5",
    def_roi_numTransactionsPerMonth: "3000", // Inquiries
    def_roi_errorRatePercentage: "3", // e.g. FCR miss rate
    def_roi_costPerError: "10", // cost of unresolved inquiry
    def_roi_avgTimeToFixErrorMins: "20", // extra time for escalated inquiry
  },
  cashApplication: {
    def_roi_manualTaskTimeHrsWeek: "10",
    def_roi_numberOfEmployeesPerformingTask: "2",
    def_roi_numTransactionsPerMonth: "4000", // Payments
    def_roi_errorRatePercentage: "4", // Mis-applications
    def_roi_costPerError: "5",
    def_roi_avgTimeToFixErrorMins: "25",
  },
  collectionManagement: {
    def_roi_manualTaskTimeHrsWeek: "25", // Time spent on manual collection activities
    def_roi_numberOfEmployeesPerformingTask: "3",
    def_roi_numTransactionsPerMonth: "1000", // Number of overdue accounts actively managed
    def_roi_errorRatePercentage: "10", // % of overdue that goes to bad debt / higher collection cost
    def_roi_costPerError: "100", // Avg value of account that becomes harder to collect due to delay
    def_roi_avgTimeToFixErrorMins: "0", // Not fixing errors, but reducing DSO / bad debt
  },
  creditManagement: {
    def_roi_manualTaskTimeHrsWeek: "8",
    def_roi_numberOfEmployeesPerformingTask: "1",
    def_roi_numTransactionsPerMonth: "200", // Credit applications
    def_roi_errorRatePercentage: "5", // Bad credit decisions
    def_roi_costPerError: "500", // Avg cost of one bad credit decision
    def_roi_avgTimeToFixErrorMins: "0",
  },
  claimsDeductions: {
    cd_roi_deductionsProcessedPerMonth: "1200",
    cd_roi_avgResearchTimePerDeductionHrs: "2",
    cd_roi_percentageDeductionsInvalidPercentage: "20",
    cd_roi_totalValueOfDeductionsPerMonth: "60000",
    cd_roi_numFTEs: "2.5",
  },
  expenseManagement: {
    def_roi_manualTaskTimeHrsWeek: "5",
    def_roi_numberOfEmployeesPerformingTask: "1", // Finance team processing
    def_roi_numTransactionsPerMonth: "500", // Expense reports
    def_roi_errorRatePercentage: "8", // Non-compliant / error rate in reports
    def_roi_costPerError: "15",
    def_roi_avgTimeToFixErrorMins: "30",
  },
  procurement: {
    def_roi_manualTaskTimeHrsWeek: "12",
    def_roi_numberOfEmployeesPerformingTask: "2",
    def_roi_numTransactionsPerMonth: "800", // POs
    def_roi_errorRatePercentage: "6", // Maverick spend / PO errors
    def_roi_costPerError: "75", // Avg cost of off-contract purchase premium or fixing PO
    def_roi_avgTimeToFixErrorMins: "40",
  },
   invoiceDelivery: {
    def_roi_manualTaskTimeHrsWeek: "8",
    def_roi_numberOfEmployeesPerformingTask: "1",
    def_roi_numTransactionsPerMonth: "2000", // Invoices sent
    def_roi_errorRatePercentage: "2", // Delivery failures / rejections
    def_roi_costPerError: "5", // Cost to resend / resolve
    def_roi_avgTimeToFixErrorMins: "15",
  },
  supplierManagement: {
    def_roi_manualTaskTimeHrsWeek: "10",
    def_roi_numberOfEmployeesPerformingTask: "1.5",
    def_roi_numTransactionsPerMonth: "50", // New suppliers / updates
    def_roi_errorRatePercentage: "3", // Errors in supplier data leading to payment issues
    def_roi_costPerError: "200", // Cost of a payment error / compliance issue
    def_roi_avgTimeToFixErrorMins: "60",
  },
  documentManagement: {
    def_roi_manualTaskTimeHrsWeek: "10", // Time employees spend searching / mismanaging docs
    def_roi_numberOfEmployeesPerformingTask: "50", // Number of employees affected
    def_roi_numTransactionsPerMonth: "0", // Not transaction based in this sense
    def_roi_errorRatePercentage: "5", // % of time wasted due to inefficient doc mngmt
    def_roi_costPerError: "0", // Cost is implicit in wasted time
    def_roi_avgTimeToFixErrorMins: "0",
  },
  workflowManagement: {
     def_roi_manualTaskTimeHrsWeek: "15", // Aggregate time spent in manual steps of key workflows
     def_roi_numberOfEmployeesPerformingTask: "10", // Employees involved in these workflows
     def_roi_numTransactionsPerMonth: "500", // Instances of these workflows
     def_roi_errorRatePercentage: "8", // Errors within the manual workflow
     def_roi_costPerError: "40",
     def_roi_avgTimeToFixErrorMins: "50",
  },
  processMapping: {
    def_roi_manualTaskTimeHrsWeek: "5", // Time spent trying to understand / document processes manually for projects
    def_roi_numberOfEmployeesPerformingTask: "2", // Analysts/PMs
    def_roi_numTransactionsPerMonth: "4", // Number of process improvement projects / year / 12
    def_roi_errorRatePercentage: "25", // % of projects delayed/reworked due to poor understanding
    def_roi_costPerError: "5000", // Cost of rework/delay for one such project
    def_roi_avgTimeToFixErrorMins: "0",
  },
  default: { // Fallback demo data for modules not explicitly listed
    def_roi_manualTaskTimeHrsWeek: "10",
    def_roi_numberOfEmployeesPerformingTask: "2",
    def_roi_numTransactionsPerMonth: "500",
    def_roi_errorRatePercentage: "7",
    def_roi_costPerError: "20",
    def_roi_avgTimeToFixErrorMins: "30",
  }
};


export const INITIAL_STATE: AppState = {
  selectedRole: Role.PRESALES,
  selectedAutomationType: AutomationType.FINANCE,
  selectedModuleId: FINANCE_MODULES[0].id, 
  activeTab: TabId.QUALIFICATION, 
  opportunityScorecard: {
    answers: {},
    totalScore: 0,
  },
  qualification: {
    qualitative: { ...initialQualificationSectionState },
    quantitative: { ...initialQualificationSectionState },
    adminSettings: {
      thresholds: { ...DEFAULT_QUALIFICATION_THRESHOLDS },
      defaultThresholds: { ...DEFAULT_QUALIFICATION_THRESHOLDS }
    },
    showAdminSettings: false,
  },
  discoveryQuestions: {}, 
  roiCalculator: {}, 
  exportFormat: ExportFormat.TXT,
  isRoiAdminModalOpen: false,
};

ALL_MODULES.forEach(module => {
  const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
  INITIAL_STATE.discoveryQuestions[module.id] = {
    qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
    quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
  };

  const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default;
  const currentModuleDefaultFactors = module.id === 'accountsPayable' 
    ? { ...DEFAULT_AP_CALCULATION_FACTORS } 
    : { ...DEFAULT_GENERIC_CALCULATION_FACTORS };

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
    calculationFactors: { ...currentModuleDefaultFactors },
    defaultCalculationFactors: { ...currentModuleDefaultFactors },
  };
});


export const TABS: TabDefinition[] = [
  { id: TabId.OPPORTUNITY_SCORECARD, label: "Opportunity Scorecard", roles: [Role.SALES], component: OpportunityScorecardTab },
  { id: TabId.QUALIFICATION, label: "Qualification", roles: [Role.SALES, Role.PRESALES, Role.SDR_SAD], component: QualificationTab },
  { id: TabId.DISCOVERY_QUESTIONS, label: "Discovery Questions", roles: [Role.PRESALES, Role.SDR_SAD], component: DiscoveryQuestionsTab },
  { id: TabId.ROI_CALCULATOR, label: "ROI Calculator", roles: [Role.SALES, Role.PRESALES], component: RoiCalculatorTab },
];

export const ROI_CALCULATION_FACTOR_CONFIG: Record<keyof RoiCalculationFactors, { label: string, description: string }> = {
  timeSavingPercentage: {
    label: "Automation Time Saving (%)",
    description: "Estimated percentage of time saved on manual tasks after automation (e.g., 75 for 75%).",
  },
  errorReductionPercentage: {
    label: "Automation Error Reduction (%)",
    description: "Estimated percentage reduction in errors after automation (e.g., 80 for 80%).",
  },
};
