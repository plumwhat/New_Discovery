

import { Role, AutomationType, Module, TabId, ScorecardQuestion, QualificationQuestion, QualificationStatus, DiscoveryQuestion, RoiInput, AppState, ExportFormat, TabMetadata, SolutionBuilderState, ModuleSolutionContent } from './types';
// Component imports are removed from here (e.g. HomeTab, OpportunityScorecardTab, etc.)

// Import Icons using relative paths
import { HomeIcon, PresentationChartBarIcon, ShieldCheckIcon, MagnifyingGlassIcon, CalculatorIcon, PuzzlePieceIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon, LightBulbIcon, ListBulletIcon, InformationCircleIcon, ArrowDownTrayIcon } from './components/common/Icons';


export const APP_TITLE = "Process Automation";
export const APP_SUBTITLE = "Discovery & ROI Calculator";
export const RESELLER_COMPANY_NAME = "Your Reseller Company Name"; // Kept for potential other uses, but removed from solution proposal intro

export const ROLES: Role[] = [Role.PRESALES, Role.SALES, Role.SDR_SAD];
export const AUTOMATION_TYPES: AutomationType[] = [AutomationType.FINANCE, AutomationType.BUSINESS];

export const FINANCE_MODULES: Module[] = [
  { id: "accountsPayable", name: "Accounts Payable", technologyPartner: "Esker" },
  { id: "orderManagement", name: "Order Management", technologyPartner: "Esker" },
  { id: "customerInquiryManagement", name: "Customer Inquiry Management", technologyPartner: "Esker" },
  { id: "cashApplication", name: "Cash Application", technologyPartner: "Esker" },
  { id: "collectionManagement", name: "Collection Management", technologyPartner: "Esker" },
  { id: "creditManagement", name: "Credit Management", technologyPartner: "Esker" },
  { id: "claimsDeductions", name: "Claims & Deductions", technologyPartner: "Esker" },
  { id: "expenseManagement", name: "Expense Management", technologyPartner: "Esker" },
  { id: "procurement", name: "Procurement", technologyPartner: "Esker" },
  { id: "invoiceDelivery", name: "Invoice Delivery", technologyPartner: "Esker" },
  { id: "supplierManagement", name: "Supplier Management", technologyPartner: "Esker" },
];

export const BUSINESS_MODULES: Module[] = [
  { id: "documentManagement", name: "Document Management", technologyPartner: "M-Files" },
  { id: "workflowManagement", name: "Workflow Management", technologyPartner: "Nintex" },
  { id: "processMapping", name: "Process Mapping", technologyPartner: "Nintex" },
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
  orderManagement: {
    qualitative: [
        { id: "om_qual_1", text: "Describe your end-to-end order management process. Where are the primary bottlenecks?" },
        { id: "om_qual_2", text: "What are the most common reasons for order processing delays or errors?" },
    ],
    quantitative: [
        { id: "om_quant_1", text: "How many sales orders do you process per month?" },
        { id: "om_quant_2", text: "What is the average number of lines per order?" },
    ]
  },
  customerInquiryManagement: { qualitative: [{id: "cim_q1", text:"Sample CIM Qual"}], quantitative: [{id: "cim_q1_quant", text:"Sample CIM Quant"}]},
  cashApplication: { qualitative: [{id: "ca_q1", text:"Sample CA Qual"}], quantitative: [{id: "ca_q1_quant", text:"Sample CA Quant"}]},
  collectionManagement: { qualitative: [{id: "cm_q1", text:"Sample CM Qual"}], quantitative: [{id: "cm_q1_quant", text:"Sample CM Quant"}]},
  creditManagement: { qualitative: [{id: "crm_q1", text:"Sample CRM Qual"}], quantitative: [{id: "crm_q1_quant", text:"Sample CRM Quant"}]},
  claimsDeductions: { qualitative: [{id: "cd_q1", text:"Sample CD Qual"}], quantitative: [{id: "cd_q1_quant", text:"Sample CD Quant"}]},
  expenseManagement: { qualitative: [{id: "em_q1", text:"Sample EM Qual"}], quantitative: [{id: "em_q1_quant", text:"Sample EM Quant"}]},
  procurement: { qualitative: [{id: "proc_q1", text:"Sample PROC Qual"}], quantitative: [{id: "proc_q1_quant", text:"Sample PROC Quant"}]},
  invoiceDelivery: { qualitative: [{id: "id_q1", text:"Sample ID Qual"}], quantitative: [{id: "id_q1_quant", text:"Sample ID Quant"}]},
  supplierManagement: { qualitative: [{id: "sm_q1", text:"Sample SM Qual"}], quantitative: [{id: "sm_q1_quant", text:"Sample SM Quant"}]},
  documentManagement: { 
    qualitative: [{id: "dm_q1", text:"Describe your current document storage and retrieval process. What are the key challenges?"}], 
    quantitative: [{id: "dm_q1_quant", text:"Approximately how many documents are processed/archived monthly?"}]
  },
  workflowManagement: { 
    qualitative: [{id: "wm_q1", text:"Identify a key business process that is currently manual or inefficient. What are its steps?"}], 
    quantitative: [{id: "wm_q1_quant", text:"How many users are typically involved in this process?"}]
  },
  processMapping: { 
    qualitative: [{id: "pm_q1", text:"Are current business processes well-documented? If so, how are these documents maintained?"}], 
    quantitative: [{id: "pm_q1_quant", text:"How much time is spent on average identifying process bottlenecks or inefficiencies per quarter?"}]
  },
  default: {
    qualitative: Array.from({ length: 5 }, (_, i) => ({ id: `def_qual_${i+1}`, text: `Default Qualitative Question ${i+1} for this module?` })),
    quantitative: Array.from({ length: 5 }, (_, i) => ({ id: `def_quant_${i+1}`, text: `Default Quantitative Question ${i+1} for this module? (metric)` })),
  }
};

export const ROI_INPUT_TEMPLATES: Record<string, RoiInput[]> = {
  accountsPayable: [
    { id: "ap_roi_numInvoicesPerMonth", label: "Number of invoices per month", type: "number", value: "" },
    { id: "ap_roi_avgManualProcessingTimePerInvoiceMins", label: "Avg. manual processing time per invoice (mins)", type: "number", value: "" },
    { id: "ap_roi_currentInvoiceErrorRatePercentage", label: "Current invoice error/exception rate (%)", type: "number", value: "" },
    { id: "ap_roi_avgTimeToResolveExceptionMins", label: "Avg. time to resolve an exception (mins)", type: "number", value: "" },
    { id: "ap_roi_annualValueMissedEarlyPaymentDiscounts", label: "Annual value of missed early payment discounts ($)", type: "number", value: "", isCurrency: true },
    { id: "ap_roi_annualCostPhysicalInvoiceStorage", label: "Annual cost of physical invoice storage ($)", type: "number", value: "", isCurrency: true },
    { id: "ap_roi_numFTEs", label: "Number of FTEs in AP process", type: "number", value: ""},
  ],
  orderManagement: [
    { id: "om_roi_numSalesOrdersPerMonth", label: "Number of sales orders per month", type: "number", value: "" },
    { id: "om_roi_avgManualOrderEntryTimeMins", label: "Avg. manual order entry time (mins)", type: "number", value: "" },
    { id: "om_roi_currentOrderErrorRatePercentage", label: "Current order error rate (%)", type: "number", value: "" },
    { id: "om_roi_avgCostToReworkOrderError", label: "Avg. cost to rework an order error ($)", type: "number", value: "", isCurrency: true },
    { id: "om_roi_numFTEs", label: "Number of FTEs in Order Entry process", type: "number", value: ""},
  ],
  customerInquiryManagement: [{id:"cim_roi_1", label:"Sample CIM ROI", type:"number", value:""}],
  cashApplication: [{id:"ca_roi_1", label:"Sample CA ROI", type:"number", value:""}],
  collectionManagement: [{id:"col_roi_1", label:"Sample COL ROI", type:"number", value:""}],
  creditManagement: [{id:"crm_roi_1", label:"Sample CRM ROI", type:"number", value:""}],
  claimsDeductions: [{id:"cd_roi_1", label:"Sample CD ROI", type:"number", value:""}],
  expenseManagement: [{id:"em_roi_1", label:"Sample EM ROI", type:"number", value:""}],
  procurement: [{id:"proc_roi_1", label:"Sample PROC ROI", type:"number", value:""}],
  invoiceDelivery: [{id:"id_roi_1", label:"Sample ID ROI", type:"number", value:""}],
  supplierManagement: [{id:"sm_roi_1", label:"Sample SM ROI", type:"number", value:""}],
  documentManagement: [{id:"docm_roi_1", label:"Sample DOCM ROI", type:"number", value:""}],
  workflowManagement: [{id:"wm_roi_1", label:"Sample WM ROI", type:"number", value:""}],
  processMapping: [{id:"pm_roi_1", label:"Sample PM ROI", type:"number", value:""}],
  default: [
    { id: "def_roi_manualTaskTimeHrsWeek", label: "Time Spent on Manual Task (hours/week)", type: "number", value: "" },
    { id: "def_roi_numberOfEmployeesPerformingTask", label: "Number of Employees Performing Task", type: "number", value: "" },
  ]
};

const initialQualificationSectionState = {
  answers: {},
  score: 0,
  status: QualificationStatus.NOT_STARTED,
};

const initialSolutionBuilderState: SolutionBuilderState = {
  selectedCoreModuleId: null,
  requirementBlocks: [],
  showDocumentView: false,
  editingBlockId: null, 
};

export const INITIAL_STATE: AppState = {
  customerCompany: "",
  customerName: "",
  dateCompleted: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD
  selectedRole: Role.PRESALES,
  selectedAutomationType: AutomationType.FINANCE,
  selectedModuleId: FINANCE_MODULES[0].id,
  activeTab: TabId.HOME,
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
  solutionBuilder: initialSolutionBuilderState,
  exportFormat: ExportFormat.TXT,
};

ALL_MODULES.forEach(module => {
  const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
  INITIAL_STATE.discoveryQuestions[module.id] = {
    qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
    quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
  };

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


export const TAB_METADATA: TabMetadata[] = [
  { id: TabId.HOME, label: "Home", roles: [Role.SALES, Role.PRESALES, Role.SDR_SAD], icon: HomeIcon },
  { id: TabId.OPPORTUNITY_SCORECARD, label: "Opportunity Scorecard", roles: [Role.SALES], icon: PresentationChartBarIcon },
  { id: TabId.QUALIFICATION, label: "Qualification", roles: [Role.SALES, Role.PRESALES, Role.SDR_SAD], icon: ShieldCheckIcon },
  { id: TabId.DISCOVERY_QUESTIONS, label: "Discovery Questions", roles: [Role.PRESALES, Role.SDR_SAD], icon: MagnifyingGlassIcon },
  { id: TabId.ROI_CALCULATOR, label: "ROI Calculator", roles: [Role.SALES, Role.PRESALES], icon: CalculatorIcon },
  { id: TabId.SOLUTION_BUILDER, label: "Solution Builder", roles: [Role.PRESALES], icon: PuzzlePieceIcon },
];

export const HOURLY_RATE_DIVISOR = 2080;
export const AUTOMATION_TIME_SAVING_PERCENTAGE = 0.75;
export const AUTOMATION_ERROR_REDUCTION_PERCENTAGE = 0.80;

// Default Executive Summary, can be adapted by specific modules.
const defaultExecutiveSummary = (partnerName: string, moduleName: string) => 
    `The proposed ${moduleName} solution is designed to streamline and optimize critical processes. By addressing inefficiencies, this solution, leveraging ${partnerName}, aims to significantly enhance operational throughput, reduce errors, and improve overall satisfaction.`;

const defaultSolutionOverview = (partnerName: string, moduleName: string) => `
      <p>Our proposed solution for <strong>${moduleName}</strong>, centered around <strong>${partnerName}'s capabilities</strong>, offers a comprehensive approach to automating and optimizing your key processes. This platform is designed to handle a high volume and variety of tasks specific to ${moduleName}.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intelligent Capture & Data Extraction:</strong> ${partnerName} AI can automatically capture information from various sources and accurately extract relevant data, significantly reducing manual data entry.</li>
        <li><strong>Automated Validation & Enrichment:</strong> The system intelligently validates data against your business rules and existing systems.</li>
        <li><strong>Streamlined Workflow & Exception Handling:</strong> Customizable workflows route items for approval, manage exceptions, and provide full visibility.</li>
        <li><strong>Seamless ERP/System Integration:</strong> ${partnerName} often provides deep, bidirectional integration with leading ERP systems and other business applications.</li>
        <li><strong>Enhanced Visibility & Analytics:</strong> Real-time dashboards and comprehensive reporting provide insights into process performance.</li>
      </ul>
      <p>This solution leverages technologies from ${partnerName} for core process automation, ensuring a robust and scalable platform for your ${moduleName} needs.</p>
    `;

const defaultCoreElements = (partnerName: string, moduleName: string): string[] => [
    `Leverages ${partnerName}'s AI for intelligent data capture and processing.`,
    `Automates rule-based tasks and decision-making.`,
    `Provides configurable workflows for approvals and exception management.`,
    `Integrates with existing ERP and business systems.`,
    `Offers dashboards and analytics for process visibility and insights.`
];


export const MODULE_SPECIFIC_SOLUTION_CONTENT: Record<string, ModuleSolutionContent> = {
  orderManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: (partnerName) => `The proposed Order Management automation solution, leveraging ${partnerName}, is designed to streamline and optimize the critical order-to-cash cycle. By addressing inefficiencies in current order processing, this solution aims to significantly enhance operational throughput, reduce errors, and improve overall customer satisfaction.`,
    solutionOverviewDetails: (partnerName, moduleName) => `
      <p>Our proposed solution for <strong>${moduleName}</strong>, centered around <strong>${partnerName}'s AI-powered Order Management</strong> technology, offers a comprehensive approach to automating and optimizing your entire order-to-cash process. This platform is designed to handle a high volume and variety of sales orders, regardless of their format (EDI, email, PDF, portal, fax) or channel.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intelligent Order Capture & Data Extraction:</strong> ${partnerName} AI automatically captures orders from any source and accurately extracts relevant data using machine learning, significantly reducing manual data entry and associated errors. This accelerates the initial stages of order processing.</li>
        <li><strong>Automated Order Validation & Enrichment:</strong> The system intelligently validates orders against your business rules and ERP data (e.g., pricing, availability, customer details). Missing information can be automatically flagged or enriched, minimizing exceptions and delays.</li>
        <li><strong>Streamlined Workflow & Exception Handling:</strong> Customizable workflows route orders for approval, manage exceptions, and provide full visibility into the order lifecycle. This ensures orders are processed efficiently and blockages are quickly resolved.</li>
        <li><strong>Seamless ERP Integration:</strong> ${partnerName} provides deep, bidirectional integration with leading ERP systems, ensuring data consistency and eliminating the need for duplicate data entry. This creates a unified process from order receipt to fulfillment and invoicing.</li>
        <li><strong>Enhanced Visibility & Analytics:</strong> Real-time dashboards and comprehensive reporting provide insights into order statuses, processing times, team performance, and potential bottlenecks, enabling continuous process improvement.</li>
        <li><strong>Improved Customer & Staff Experience:</strong> By automating tedious manual tasks, your team can focus on value-added activities and customer service. Customers benefit from faster order confirmation, fewer errors, and proactive communication.</li>
      </ul>
      <p>This solution leverages technologies from ${partnerName} for core process automation, ensuring a robust and scalable platform for your business needs.</p>
    `,
    coreElements: (partnerName, moduleName) => [
        `AI-powered order data capture from any format (email, EDI, PDF, portal).`,
        `Automated order validation and enrichment against ERP data.`,
        `Prioritized task management and exception handling workflows.`,
        `Real-time order status visibility for customers and internal teams.`,
        `Seamless ERP integration for end-to-end process flow.`
    ]
  },
  accountsPayable: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: (partnerName) => `This Accounts Payable automation initiative, powered by ${partnerName}, targets the reduction of manual effort and the improvement of financial controls within your AP department. The goal is to transform AP from a cost center into a strategic function through enhanced efficiency and visibility.`,
    solutionOverviewDetails: (partnerName, moduleName) => `
      <p>The proposed Accounts Payable solution for <strong>${moduleName}</strong>, built upon <strong>${partnerName}'s Procure-to-Pay suite</strong>, automates the end-to-end invoice lifecycle. It addresses common AP challenges such as manual data entry, lengthy approval cycles, and lack of visibility.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Automated Invoice Capture & Data Entry:</strong> ${partnerName} accurately captures invoices from any format (paper, PDF, EDI) and extracts data using AI, eliminating most manual keying.</li>
        <li><strong>Intelligent GL Coding & PO Matching:</strong> The system can suggest or automate GL coding and performs 2-way or 3-way matching against purchase orders and receipts.</li>
        <li><strong>Configurable Approval Workflows:</strong> Invoices are routed electronically based on your business rules, accelerating approvals and improving compliance.</li>
        <li><strong>Supplier Portal & Communication:</strong> A self-service portal for suppliers enhances communication and reduces inquiries to your AP team.</li>
        <li><strong>Mobile Accessibility & Analytics:</strong> Approve invoices and monitor performance on-the-go with mobile apps and gain insights through comprehensive dashboards.</li>
      </ul>
      <p>By implementing this solution, you can expect significant reductions in processing costs, improved DPO (Days Payable Outstanding), enhanced supplier relationships, and stronger financial controls.</p>
    `,
    coreElements: (partnerName, moduleName) => [
        `AI-driven invoice data capture and validation (OCR, machine learning).`,
        `Automated 2-way and 3-way Purchase Order matching.`,
        `Configurable electronic approval workflows with delegation and escalation.`,
        `Supplier portal for invoice status inquiries and dynamic discounting options.`,
        `Comprehensive accrual reporting and performance analytics dashboards.`
    ]
  },
  documentManagement: {
    technologyPartnerName: "M-Files",
    executiveSummaryBoilerplate: (partnerName) => `The proposed Document Management solution, featuring ${partnerName}, aims to revolutionize how your organization manages and utilizes critical business information. It focuses on breaking down data silos, ensuring compliance, and improving collaboration through intelligent information management.`,
    solutionOverviewDetails: (partnerName, moduleName) => `
      <p>Our solution for <strong>${moduleName}</strong> leverages the <strong>${partnerName} intelligent information management platform</strong>. ${partnerName} organizes and manages documents based on *what* they are, rather than *where* they're stored, connecting them with relevant business processes and data across systems.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Metadata-driven Architecture:</strong> ${partnerName} uses metadata to classify, secure, and retrieve documents, enabling dynamic views and personalized access.</li>
        <li><strong>Repository Neutrality:</strong> Connect to and manage information across various existing repositories (e.g., network folders, SharePoint, ERPs) without requiring data migration.</li>
        <li><strong>Automated Workflows & Version Control:</strong> Streamline document-centric processes with built-in workflow capabilities and robust version history.</li>
        <li><strong>Compliance & Governance:</strong> Enforce access controls, retention policies, and audit trails to meet regulatory requirements.</li>
        <li><strong>Enhanced Collaboration & Search:</strong> Quickly find relevant information regardless of its location and collaborate securely on documents.</li>
      </ul>
      <p>With ${partnerName}, you can transform your ${moduleName} into a strategic asset, ensuring the right information is in the right hands at the right time.</p>
    `,
    coreElements: (partnerName, moduleName) => [
        `Metadata-driven architecture for dynamic content organization.`,
        `Connectors to existing repositories (network folders, SharePoint, etc.) without data migration.`,
        `Automated version control, audit trails, and document lifecycle management.`,
        `Configurable workflows for document review, approval, and other processes.`,
        `Advanced search capabilities and role-based permissions for security.`
    ]
  },
  workflowManagement: {
    technologyPartnerName: "Nintex",
    executiveSummaryBoilerplate: (partnerName) => `This Workflow Management solution, utilizing the ${partnerName} Process Platform, is designed to automate and optimize your core business processes. The objective is to increase operational agility, reduce manual interventions, and enhance overall process efficiency.`,
    solutionOverviewDetails: (partnerName, moduleName) => `
      <p>The proposed solution for <strong>${moduleName}</strong> is powered by the <strong>${partnerName} Process Platform</strong>, a leading solution for process automation and orchestration. ${partnerName} allows for the rapid design, deployment, and management of workflows across your organization.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intuitive Visual Workflow Design:</strong> Easily design and modify workflows using a drag-and-drop interface, requiring minimal to no code.</li>
        <li><strong>Broad Connectivity:</strong> Integrate workflows with a wide range of enterprise systems, cloud services, and content repositories.</li>
        <li><strong>Advanced Workflow Features:</strong> Implement complex logic, parallel approvals, task escalations, and automated actions.</li>
        <li><strong>Process Analytics & Optimization:</strong> Gain insights into workflow performance to identify bottlenecks and areas for improvement.</li>
        <li><strong>Robotic Process Automation (RPA):</strong> ${partnerName} often includes RPA capabilities to automate repetitive, rules-based tasks within your workflows.</li>
      </ul>
      <p>By leveraging ${partnerName} for ${moduleName}, you can drive significant improvements in productivity, consistency, and compliance across your business operations.</p>
    `,
    coreElements: (partnerName, moduleName) => [
        `Intuitive, drag-and-drop visual workflow designer.`,
        `Extensive connectors for integrating with enterprise systems and cloud services.`,
        `Customizable forms for data capture and user interaction within processes.`,
        `Process analytics and reporting for monitoring performance and identifying bottlenecks.`,
        `Support for complex logic, parallel tasks, and escalations.`
    ]
  },
  processMapping: {
    technologyPartnerName: "Nintex",
     executiveSummaryBoilerplate: (partnerName) => `The Process Mapping initiative, supported by ${partnerName}'s capabilities, aims to provide clear visibility into your current business processes. This foundational step is crucial for identifying inefficiencies, standardizing operations, and planning effective automation strategies.`,
    solutionOverviewDetails: (partnerName, moduleName) => `
      <p>For <strong>${moduleName}</strong>, we propose utilizing tools and methodologies often found within the <strong>${partnerName} Process Platform</strong>, such as ${partnerName} Process Manager (formerly Promapp®). These tools facilitate collaborative process mapping and documentation.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Collaborative Process Documentation:</strong> Engage teams to easily capture, map, and maintain business processes in a central, accessible repository.</li>
        <li><strong>Standardized Process Visualization:</strong> Create clear, consistent process maps that are easy for all stakeholders to understand.</li>
        <li><strong>Process Improvement & Feedback:</strong> Enable continuous improvement by allowing users to provide feedback and suggestions directly on process maps.</li>
        <li><strong>Risk & Compliance Management:</strong> Link processes to risks and controls, aiding in compliance efforts.</li>
        <li><strong>Foundation for Automation:</strong> Well-documented processes are essential for successful workflow automation and RPA initiatives.</li>
      </ul>
      <p>Effective ${moduleName} using ${partnerName} tools provides the clarity needed to optimize operations and drive digital transformation.</p>
    `,
    coreElements: (partnerName, moduleName) => [
        `Collaborative, web-based platform for process mapping and documentation.`,
        `Standardized notation and visualization for clear process understanding.`,
        `Version control and change management for process documentation.`,
        `Mechanisms for process feedback, improvement suggestions, and ownership.`,
        `Ability to link processes to risks, compliance requirements, and systems.`
    ]
  },
  default: {
    technologyPartnerName: "leading automation technologies",
    executiveSummaryBoilerplate: (partnerName: string) => defaultExecutiveSummary(partnerName, "key business processes"),
    solutionOverviewDetails: defaultSolutionOverview,
    coreElements: defaultCoreElements
  }
};

// Populate default content for all modules if not explicitly defined
ALL_MODULES.forEach(module => {
    if (!MODULE_SPECIFIC_SOLUTION_CONTENT[module.id]) {
        const partnerName = module.technologyPartner && module.technologyPartner !== "Generic" 
            ? module.technologyPartner 
            : "leading automation platforms";
        
        MODULE_SPECIFIC_SOLUTION_CONTENT[module.id] = {
            technologyPartnerName: partnerName as ModuleSolutionContent['technologyPartnerName'],
            executiveSummaryBoilerplate: (pn) => `This automation solution for ${module.name}, utilizing ${pn}, is designed to address key challenges within this process area, aiming to enhance efficiency, reduce manual effort, and improve overall operational performance.`,
            solutionOverviewDetails: (pn, mn) => `
              <p>The proposed solution for <strong>${mn}</strong> will leverage best-in-class automation technologies, such as ${pn}, to streamline your current processes. While specific features will be tailored to your unique requirements, the general approach involves:</p>
              <ul>
                <li>Automating repetitive data entry and validation tasks.</li>
                <li>Implementing intelligent workflows for approvals and exception handling.</li>
                <li>Providing enhanced visibility and control over the process.</li>
                <li>Integrating with existing systems to ensure data consistency.</li>
              </ul>
              <p>Further details and specific capabilities can be discussed and customized based on a deeper understanding of your requirements for ${mn}.</p>
            `,
            coreElements: (pn, mn) => [
              `Automates key tasks within the ${mn} process.`,
              `Designed to reduce manual effort and improve accuracy.`,
              `Offers workflows to streamline operations related to ${mn}.`,
              `Aims to provide better visibility and control over ${mn} activities.`,
              `Integrates with relevant systems to ensure data consistency for ${mn}.`
            ]
        };
    }
});