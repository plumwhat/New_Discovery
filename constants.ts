

import { Role, AutomationType, Module, TabId, ScorecardQuestion, QualificationQuestion, QualificationStatus, DiscoveryQuestion, RoiInput, AppState, ExportFormat, TabMetadata, SolutionBuilderState, ModuleSolutionContent, PainPointLevel1Pain, ReverseWaterfallCheatSheet, PainPointMode, PainPointsAppState, WaterfallStep, ReverseWaterfallCheatSheetKeyPoint, EditableDiscoveryQuestionsTemplates, EditableReverseWaterfallCheatSheets, EditableModuleSolutionContentMap, QualificationQuestionOption, ConversationStepId, CustomerConversationState } from './types';

import { HomeIcon, PresentationChartBarIcon, ShieldCheckIcon, MagnifyingGlassIcon, CalculatorIcon, PuzzlePieceIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon, LightBulbIcon, ListBulletIcon, InformationCircleIcon, ArrowDownTrayIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, ChatBubbleBottomCenterTextIcon } from './components/common/Icons'; 


export const APP_TITLE = "Process Automation";
export const APP_SUBTITLE = "Engagement Platform";
export const RESELLER_COMPANY_NAME = "Your Reseller Company Name"; 
export const FOOTER_COPYRIGHT_OWNER = "Brad Whatman"; // New constant for footer

export const ROLES: Role[] = [Role.PRESALES, Role.SALES, Role.SDR, Role.SAD];
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
export const ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB: Module[] = ALL_MODULES;


export const SCORECARD_QUESTIONS: ScorecardQuestion[] = [
  { id: "q1", text: "Is there a clear executive sponsor for this initiative?" },
  { id: "q2", text: "Is the pain point well-defined and acknowledged by the prospect?" },
  { id: "q3", text: "Is there an allocated budget or willingness to invest?" },
  { id: "q4", text: "Is the timeline for implementation reasonable and agreed upon?" },
  { id: "q5", text: "Does the prospect understand the value proposition of automation?" },
];

export const QUALIFICATION_QUESTIONS_QUALITATIVE: QualificationQuestion[] = [
  { id: "qual1", text: "Strategic Alignment: How well does this automation align with the company's strategic objectives?", options: [{label: "Poorly (0)", value: 0}, {label: "Somewhat (5)", value: 5}, {label: "Well (10)", value: 10}, {label: "Perfectly (15)", value: 15}] },
  { id: "qual2", text: "Change Readiness: How prepared is the organisation for process changes?", options: [{label: "Not Ready (0)", value: 0}, {label: "Hesitant (5)", value: 5}, {label: "Moderately Ready (10)", value: 10}, {label: "Very Ready (15)", value: 15}] },
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

export const DISCOVERY_QUESTIONS_TEMPLATES: EditableDiscoveryQuestionsTemplates = {
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_1", text: "Can you walk me through your current end-to-end accounts payable process, from invoice receipt to payment execution?" },
      { id: "ap_qual_2", text: "What are the biggest bottlenecks or pain points your team experiences in the AP process today?" },
      { id: "ap_qual_3", text: "How are supplier invoices typically received (e.g., paper, email PDF, EDI, portal) and what percentage falls into each category?" },
      { id: "ap_qual_4", text: "Describe your invoice approval workflow. How are invoices routed, and who is involved in approvals?" },
      { id: "ap_qual_5", text: "How do you handle exceptions, such as invoice discrepancies (price, quantity), missing POs, or incorrect coding?" },
      { id: "ap_qual_6", text: "What level of visibility do you have into invoice statuses, payment due dates, and potential bottlenecks?" },
      { id: "ap_qual_7", text: "How does your AP process impact supplier relationships and your ability to capture early payment discounts?" },
      { id: "ap_qual_8", text: "What are your key concerns regarding compliance, fraud prevention, and audit trails within AP?" },
      { id: "ap_qual_9", text: "What systems are currently used for AP (e.g., ERP, specific AP tools, spreadsheets) and how well are they integrated?" },
      { id: "ap_qual_10", text: "If you could change one thing about your AP process, what would it be and why?" },
    ],
    quantitative: [
      { id: "ap_quant_1", text: "Approximately how many supplier invoices do you process per month/year?", placeholderHint: "Enter number" },
      { id: "ap_quant_2", text: "What is the average cost to process a single invoice (including labour, systems, storage)?", placeholderHint: "Enter currency amount" },
      { id: "ap_quant_3", text: "How many Full-Time Equivalents (FTEs) are dedicated to the AP process?", placeholderHint: "Enter number of FTEs" },
      { id: "ap_quant_4", text: "What is your current Days Payable Outstanding (DPO)?", placeholderHint: "Enter number of days" },
      { id: "ap_quant_5", text: "What percentage of invoices are processed and paid on time (without penalties)?", placeholderHint: "Enter percentage" },
      { id: "ap_quant_6", text: "What is the estimated error rate in manual data entry for invoices?", placeholderHint: "Enter percentage" },
    ],
  },
  orderManagement: {
    qualitative: [
        { id: "om_qual_1", text: "Describe your current order management process from when an order is received to when it's entered into the ERP/fulfilment system." },
        { id: "om_qual_2", text: "What are the different channels through which you receive customer orders (e.g., email, EDI, fax, web portal)?" },
        { id: "om_qual_3", text: "What are the most common challenges or bottlenecks in your order entry and processing cycle?" },
        { id: "om_qual_4", text: "How are order errors (e.g., incorrect pricing, part numbers, quantities, addresses) typically identified and resolved?" },
        { id: "om_qual_5", text: "What level of visibility do your sales/CSR teams and customers have into order status throughout the lifecycle?" },
        { id: "om_qual_6", text: "How do you handle order changes, cancellations, or expedite requests from customers?" },
        { id: "om_qual_7", text: "What is the impact of order processing delays or errors on customer satisfaction and operational costs (e.g., rush shipping)?" },
        { id: "om_qual_8", text: "Are there specific types of orders (e.g., complex configurations, international, large volume) that are more problematic?" },
        { id: "om_qual_9", text: "How well does your current order management process integrate with other systems like inventory, shipping, and finance?" },
        { id: "om_qual_10", text: "What are your goals for improving the order management process (e.g., speed, accuracy, customer experience)?" },
    ],
    quantitative: [
        { id: "om_quant_1", text: "How many sales orders do you process on average per day/month?", placeholderHint: "Enter number" },
        { id: "om_quant_2", text: "What is the average time it takes to manually enter one order into your system?", placeholderHint: "Enter time (e.g., minutes)" },
        { id: "om_quant_3", text: "What percentage of orders require manual intervention or correction due to errors or missing information?", placeholderHint: "Enter percentage" },
        { id: "om_quant_4", text: "What is your on-time order fulfilment rate?", placeholderHint: "Enter percentage" },
        { id: "om_quant_5", text: "How many FTEs are primarily involved in manual order entry and processing tasks?", placeholderHint: "Enter number of FTEs" },
        { id: "om_quant_6", text: "What is the estimated cost associated with each order error (e.g., rework, returns, shipping)?", placeholderHint: "Enter currency amount" },
    ]
  },
  customerInquiryManagement: {
    qualitative: [
      { id: "cim_qual_1", text: "What are the primary channels customers use to submit inquiries (e.g., phone, email, web form, chat)?" },
      { id: "cim_qual_2", text: "What are the most common types of customer inquiries your team handles (e.g., order status, invoice questions, product info, complaints)?" },
      { id: "cim_qual_3", text: "Can you describe the typical lifecycle of a customer inquiry, from receipt to resolution?" },
      { id: "cim_qual_4", text: "What tools or systems do your customer service representatives (CSRs) use to manage and resolve inquiries?" },
      { id: "cim_qual_5", text: "What are the biggest challenges CSRs face in accessing information needed to answer inquiries promptly and accurately?" },
      { id: "cim_qual_6", text: "How are inquiries prioritised and escalated if they cannot be resolved by the first point of contact?" },
      { id: "cim_qual_7", text: "What level of visibility do you have into inquiry volumes, response times, and resolution rates?" },
      { id: "cim_qual_8", text: "How do you ensure consistent and accurate responses across different CSRs and channels?" },
      { id: "cim_qual_9", text: "Is there a knowledge base or FAQ system available to CSRs and/or customers?" },
      { id: "cim_qual_10", text: "What is the impact of slow or inaccurate inquiry resolution on customer satisfaction and loyalty?" }
    ],
    quantitative: [
      { id: "cim_quant_1", text: "What is the average number of customer inquiries received per day/month?", placeholderHint: "Enter number" },
      { id: "cim_quant_2", text: "What is the average handling time (AHT) per inquiry?", placeholderHint: "Enter time (e.g., minutes)" },
      { id: "cim_quant_3", text: "What is your First Contact Resolution (FCR) rate?", placeholderHint: "Enter percentage" },
      { id: "cim_quant_4", text: "How many CSRs are dedicated to handling customer inquiries?", placeholderHint: "Enter number of FTEs" },
      { id: "cim_quant_5", text: "What is your current Customer Satisfaction (CSAT) score related to inquiry handling?", placeholderHint: "Enter score or percentage" },
      { id: "cim_quant_6", text: "What percentage of inquiries require escalation to a supervisor or another department?", placeholderHint: "Enter percentage" }
    ]
  },
  cashApplication: {
    qualitative: [
      { id: "ca_qual_1", text: "Describe your current process for applying cash from customer payments to open invoices." },
      { id: "ca_qual_2", text: "How do you typically receive remittance information from customers (e.g., EDI, email, bank files, paper)?" },
      { id: "ca_qual_3", text: "What are the main challenges in matching payments to invoices accurately and efficiently?" },
      { id: "ca_qual_4", text: "How are partial payments, short payments, or payments without clear remittance details handled?" },
      { id: "ca_qual_5", text: "What is the process for identifying and resolving unapplied cash?" },
      { id: "ca_qual_6", text: "How much manual effort is involved in data entry, matching, and exception handling in cash application?" },
      { id: "ca_qual_7", text: "What systems or tools are currently used for cash application (e.g., ERP module, lockbox services, spreadsheets)?" },
      { id: "ca_qual_8", text: "How does the efficiency of your cash application process impact your Days Sales Outstanding (DSO)?" },
      { id: "ca_qual_9", text: "What level of visibility does your AR team have into incoming payments and application status?" },
      { id: "ca_qual_10", text: "Are there specific types of customers or payment methods that cause more difficulties in cash application?" }
    ],
    quantitative: [
      { id: "ca_quant_1", text: "How many customer payments do you process on average per month?", placeholderHint: "Enter number" },
      { id: "ca_quant_2", text: "What percentage of payments are currently auto-matched by your system(s)?", placeholderHint: "Enter percentage" },
      { id: "ca_quant_3", text: "What is the average time it takes to manually apply a payment that isn't auto-matched?", placeholderHint: "Enter time (e.g., minutes)" },
      { id: "ca_quant_4", text: "How many FTEs are primarily involved in the cash application process?", placeholderHint: "Enter number of FTEs" },
      { id: "ca_quant_5", text: "What is the typical volume or value of unapplied cash at month-end?", placeholderHint: "Enter currency amount or count" },
      { id: "ca_quant_6", text: "What percentage of remittance advices are received electronically vs. manually?", placeholderHint: "Enter percentage" }
    ]
  },
  collectionManagement: {
    qualitative: [
      { id: "cm_qual_1", text: "Can you describe your current collections strategy and process for overdue accounts?" },
      { id: "cm_qual_2", text: "How are collection activities prioritised (e.g., by amount, age of debt, customer risk)?" },
      { id: "cm_qual_3", text: "What methods are used for customer communication during the collections process (e.g., emails, calls, letters)?" },
      { id: "cm_qual_4", text: "How are payment promises tracked and followed up on?" },
      { id: "cm_qual_5", text: "What are the common reasons customers give for late payments or disputes identified during collections?" },
      { id: "cm_qual_6", text: "What tools or systems do your collectors use to manage their workload and track interactions?" },
      { id: "cm_qual_7", text: "How much manual effort is involved in preparing dunning notices, call lists, and reports?" },
      { id: "cm_qual_8", text: "How is the effectiveness of your collections process measured and reported?" },
      { id: "cm_qual_9", text: "What is the process for escalating seriously delinquent accounts or referring them to third-party agencies?" },
      { id: "cm_qual_10", text: "How does your collections process impact customer relationships?" }
    ],
    quantitative: [
      { id: "cm_quant_1", text: "What is your current average Days Sales Outstanding (DSO)?", placeholderHint: "Enter number of days" },
      { id: "cm_quant_2", text: "What percentage of your total receivables is typically overdue (e.g., >30, >60, >90 days)?", placeholderHint: "Enter percentages for buckets" },
      { id: "cm_quant_3", text: "What is your Bad Debt as a percentage of revenue?", placeholderHint: "Enter percentage" },
      { id: "cm_quant_4", text: "How many collectors are on your team?", placeholderHint: "Enter number of FTEs" },
      { id: "cm_quant_5", text: "What is the average number of collection activities (calls, emails) per collector per day?", placeholderHint: "Enter number" },
      { id: "cm_quant_6", text: "What is the Collection Effectiveness Index (CEI)?", placeholderHint: "Enter percentage" }
    ]
  },
  creditManagement: {
    qualitative: [
      { id: "cr_qual_1", text: "Describe your process for assessing the creditworthiness of new customers." },
      { id: "cr_qual_2", text: "What information sources do you use for credit checks (e.g., credit bureaus, financial statements, trade references)?" },
      { id: "cr_qual_3", text: "How are credit limits determined and approved for new and existing customers?" },
      { id: "cr_qual_4", text: "What is your policy for reviewing and updating credit limits for existing customers?" },
      { id: "cr_qual_5", text: "How are customers placed on credit hold, and what is the process for releasing orders or accounts from credit hold?" },
      { id: "cr_qual_6", text: "What are the main challenges in managing customer credit risk effectively?" },
      { id: "cr_qual_7", text: "How often do sales or customer service encounter delays due to credit approval processes?" },
      { id: "cr_qual_8", text: "What systems or tools are used to manage customer credit information and risk profiles?" },
      { id: "cr_qual_9", text: "How is credit policy communicated and enforced across the organisation?" },
      { id: "cr_qual_10", text: "What reporting or analytics do you use for monitoring overall credit exposure and portfolio risk?" }
    ],
    quantitative: [
      { id: "cr_quant_1", text: "How many new customer credit applications do you process per month?", placeholderHint: "Enter number" },
      { id: "cr_quant_2", text: "What is the average time it takes to approve a new customer credit application?", placeholderHint: "Enter time (e.g., hours or days)" },
      { id: "cr_quant_3", text: "What percentage of orders are typically delayed or held due to credit issues?", placeholderHint: "Enter percentage" },
      { id: "cr_quant_4", text: "What is your company's total credit exposure at any given time?", placeholderHint: "Enter currency amount" },
      { id: "cr_quant_5", text: "What percentage of your customer base has actively managed credit limits?", placeholderHint: "Enter percentage" },
      { id: "cr_quant_6", text: "What is the value of sales written off to bad debt annually?", placeholderHint: "Enter currency amount" }
    ]
  },
  claimsDeductions: {
    qualitative: [
      { id: "cd_qual_1", text: "What are the most common types of customer claims or deductions your company experiences (e.g., shortages, damages, pricing errors, promotional allowances)?" },
      { id: "cd_qual_2", text: "Describe your current process for receiving, logging, and investigating customer claims/deductions." },
      { id: "cd_qual_3", text: "Who is responsible for validating claims and approving or denying them?" },
      { id: "cd_qual_4", text: "What documentation or evidence is typically required to process a claim/deduction?" },
      { id: "cd_qual_5", text: "What are the main challenges in resolving claims/deductions in a timely manner?" },
      { id: "cd_qual_6", text: "How is information about resolved claims (e.g., credit memos issued) communicated to customers and updated in your systems?" },
      { id: "cd_qual_7", text: "What is the impact of unresolved or slowly processed claims on customer relationships and financial reporting?" },
      { id: "cd_qual_8", text: "Do you perform root cause analysis on frequent claim types to prevent recurrence?" },
      { id: "cd_qual_9", text: "What systems or tools are used for tracking and managing claims/deductions?" },
      { id: "cd_qual_10", text: "How much visibility do you have into the overall status, value, and aging of open claims/deductions?" }
    ],
    quantitative: [
      { id: "cd_quant_1", text: "What is the average number of customer claims/deductions received per month?", placeholderHint: "Enter number" },
      { id: "cd_quant_2", text: "What is the average value of a claim/deduction?", placeholderHint: "Enter currency amount" },
      { id: "cd_quant_3", text: "What is the average time it takes to resolve a claim/deduction from receipt to closure?", placeholderHint: "Enter time (e.g., days)" },
      { id: "cd_quant_4", text: "What percentage of claims/deductions are typically deemed valid vs. invalid?", placeholderHint: "Enter percentage valid" },
      { id: "cd_quant_5", text: "How many FTEs are involved in processing and managing claims/deductions?", placeholderHint: "Enter number of FTEs" },
      { id: "cd_quant_6", text: "What is the total value of claims/deductions written off or absorbed annually?", placeholderHint: "Enter currency amount" }
    ]
  },
  expenseManagement: {
    qualitative: [
      { id: "em_qual_1", text: "Describe your current process for employees submitting expense reports." },
      { id: "em_qual_2", text: "How are receipts captured and attached to expense reports (e.g., paper, mobile photos, email forwards)?" },
      { id: "em_qual_3", text: "What is the approval workflow for expense reports? Who is involved and how are approvals managed?" },
      { id: "em_qual_4", text: "How does your company ensure compliance with travel and expense (T&E) policies?" },
      { id: "em_qual_5", text: "What are the common challenges or frustrations for employees when submitting expenses, or for approvers/finance when processing them?" },
      { id: "em_qual_6", text: "How are corporate credit card transactions reconciled with expense reports?" },
      { id: "em_qual_7", text: "What level of visibility does finance have into employee spend and T&E budget adherence?" },
      { id: "em_qual_8", text: "How long does it typically take for an employee to be reimbursed after submitting an expense report?" },
      { id: "em_qual_9", text: "What systems or tools are currently used for expense management?" },
      { id: "em_qual_10", text: "Are there particular types of expenses or departments that present more challenges?" }
    ],
    quantitative: [
      { id: "em_quant_1", text: "How many expense reports are processed per month on average?", placeholderHint: "Enter number" },
      { id: "em_quant_2", text: "What is the average cost to process a single expense report (including labour for submission, approval, and finance processing)?", placeholderHint: "Enter currency amount" },
      { id: "em_quant_3", text: "What percentage of expense reports are typically returned for correction or more information?", placeholderHint: "Enter percentage" },
      { id: "em_quant_4", text: "How many FTEs (in total across employees, approvers, finance) are involved in the expense management process?", placeholderHint: "Enter number of FTEs" },
      { id: "em_quant_5", text: "What is the estimated percentage of out-of-policy or non-compliant spend identified?", placeholderHint: "Enter percentage" },
      { id: "em_quant_6", text: "What is the average reimbursement cycle time from submission to payment?", placeholderHint: "Enter time (e.g., days)" }
    ]
  },
  procurement: {
    qualitative: [
      { id: "proc_qual_1", text: "Describe your current process for employees to request goods or services (requisition process)." },
      { id: "proc_qual_2", text: "What is the approval workflow for purchase requisitions? Who is involved, and how are approvals tracked?" },
      { id: "proc_qual_3", text: "How are purchase orders (POs) created and sent to suppliers?" },
      { id: "proc_qual_4", text: "How do you ensure that purchases are made from preferred suppliers and under negotiated terms/contracts?" },
      { id: "proc_qual_5", text: "What are the main challenges in managing spend and ensuring compliance with procurement policies?" },
      { id: "proc_qual_6", text: "What level of visibility do you have into committed spend (from approved requisitions/POs) versus actual spend?" },
      { id: "proc_qual_7", text: "How is budget availability checked and managed during the procurement process?" },
      { id: "proc_qual_8", text: "What systems or tools are currently used for procurement (e.g., e-procurement system, ERP module, manual processes)?" },
      { id: "proc_qual_9", text: "How do you handle invoice matching against POs (2-way, 3-way matching)?" },
      { id: "proc_qual_10", text: "What are your key objectives for improving the procure-to-pay (P2P) cycle?" }
    ],
    quantitative: [
      { id: "proc_quant_1", text: "How many purchase requisitions or POs are processed per month?", placeholderHint: "Enter number" },
      { id: "proc_quant_2", text: "What is the average cycle time from requisition creation to PO dispatch?", placeholderHint: "Enter time (e.g., days)" },
      { id: "proc_quant_3", text: "What percentage of your indirect spend is currently managed through approved POs (spend under management)?", placeholderHint: "Enter percentage" },
      { id: "proc_quant_4", text: "What is the estimated percentage of 'maverick spend' (purchases made outside of approved channels/policies)?", placeholderHint: "Enter percentage" },
      { id: "proc_quant_5", text: "How many FTEs are involved in the operational procurement process (requisitioning, PO creation, approvals)?", placeholderHint: "Enter number of FTEs" },
      { id: "proc_quant_6", text: "What is the average cost to process a purchase order?", placeholderHint: "Enter currency amount" }
    ]
  },
  invoiceDelivery: {
    qualitative: [
      { id: "id_qual_1", text: "Describe your current process for generating and sending customer invoices." },
      { id: "id_qual_2", text: "What channels do you use to deliver invoices to customers (e.g., email, postal mail, EDI, customer portal)?" },
      { id: "id_qual_3", text: "What are the main challenges or delays in getting invoices to customers promptly after goods/services are delivered?" },
      { id: "id_qual_4", text: "How do you handle customer preferences for invoice delivery formats or channels?" },
      { id: "id_qual_5", text: "What is the process for tracking invoice delivery and confirming receipt by the customer?" },
      { id: "id_qual_6", text: "How often do customers report not receiving invoices, or receiving them late, as a reason for delayed payment?" },
      { id: "id_qual_7", text: "What is the impact of invoice delivery issues on your Days Sales Outstanding (DSO) and customer relationships?" },
      { id: "id_qual_8", text: "Are there any compliance requirements related to invoice content or delivery that are challenging to meet?" },
      { id: "id_qual_9", text: "What systems are used for invoice generation and delivery? How well are they integrated?" },
      { id: "id_qual_10", text: "Do you offer customers a self-service portal to view and download their invoices?" }
    ],
    quantitative: [
      { id: "id_quant_1", text: "How many customer invoices do you send out per month on average?", placeholderHint: "Enter number" },
      { id: "id_quant_2", text: "What percentage of your invoices are delivered electronically versus by postal mail?", placeholderHint: "Enter percentage electronic" },
      { id: "id_quant_3", text: "What is the average cost to send a paper invoice (including printing, postage, labour)?", placeholderHint: "Enter currency amount" },
      { id: "id_quant_4", text: "How many FTEs are involved in the invoice generation and distribution process?", placeholderHint: "Enter number of FTEs" },
      { id: "id_quant_5", text: "What is the average time lag between goods/service delivery and invoice dispatch?", placeholderHint: "Enter time (e.g., days)" },
      { id: "id_quant_6", text: "What percentage of customer payment delays are attributed to invoice delivery issues or disputes about invoice content?", placeholderHint: "Enter percentage" }
    ]
  },
  supplierManagement: {
    qualitative: [
      { id: "sm_qual_1", text: "Describe your current process for onboarding new suppliers." },
      { id: "sm_qual_2", text: "What information and documentation do you collect from new suppliers (e.g., banking details, tax forms, compliance certificates)?" },
      { id: "sm_qual_3", text: "How is supplier information (master data) maintained and kept up-to-date in your systems?" },
      { id: "sm_qual_4", text: "What are the main challenges in managing supplier relationships and communication?" },
      { id: "sm_qual_5", text: "Do you have a centralised portal for suppliers to self-manage their information, view POs, or submit invoices?" },
      { id: "sm_qual_6", text: "How do you assess supplier risk (e.g., financial stability, compliance, performance)?" },
      { id: "sm_qual_7", text: "What is your process for managing supplier performance and conducting reviews?" },
      { id: "sm_qual_8", text: "How are changes in supplier details (e.g., bank accounts) validated to prevent fraud?" },
      { id: "sm_qual_9", text: "What systems or tools are currently used for supplier relationship management (SRM) or supplier master data management?" },
      { id: "sm_qual_10", text: "How does effective supplier management (or lack thereof) impact your procurement and AP processes?" }
    ],
    quantitative: [
      { id: "sm_quant_1", text: "How many active suppliers do you currently work with?", placeholderHint: "Enter number" },
      { id: "sm_quant_2", text: "How many new suppliers do you typically onboard per year?", placeholderHint: "Enter number" },
      { id: "sm_quant_3", text: "What is the average time it takes to onboard a new supplier from initial contact to approved status?", placeholderHint: "Enter time (e.g., days)" },
      { id: "sm_quant_4", text: "How many FTEs are involved in supplier onboarding and master data management?", placeholderHint: "Enter number of FTEs" },
      { id: "sm_quant_5", text: "What percentage of supplier information is estimated to be outdated or inaccurate in your systems?", placeholderHint: "Enter percentage" },
      { id: "sm_quant_6", text: "How many supplier inquiries regarding invoice status or payments does your AP team handle per month?", placeholderHint: "Enter number" }
    ]
  },
  documentManagement: {
    qualitative: [
      { id: "dm_qual_1", text: "Where are your most critical business documents currently stored (e.g., shared drives, local PCs, email, physical cabinets)?" },
      { id: "dm_qual_2", text: "What are the biggest challenges your team faces when trying to find or retrieve specific documents or information?" },
      { id: "dm_qual_3", text: "How do you currently manage document versions? Have there been issues with people using outdated versions?" },
      { id: "dm_qual_4", text: "How do you control access to sensitive or confidential documents? Who can view, edit, or share them?" },
      { id: "dm_qual_5", text: "Describe your process for collaborating on documents that require input or approval from multiple people." },
      { id: "dm_qual_6", text: "What are your requirements or concerns regarding document retention policies and compliant disposal?" },
      { id: "dm_qual_7", text: "How prepared are you to respond to audit requests or legal discovery for specific documents?" },
      { id: "dm_qual_8", text: "What is the impact of inefficient document management on productivity, decision-making, or compliance risk?" },
      { id: "dm_qual_9", text: "Are there specific types of documents (e.g., contracts, HR records, project files) that are particularly challenging to manage?" },
      { id: "dm_qual_10", text: "How do remote or mobile workers access and work with company documents?" }
    ],
    quantitative: [
      { id: "dm_quant_1", text: "Estimate the total volume of documents (or gigabytes/terabytes of data) your organisation manages.", placeholderHint: "Enter number or size" },
      { id: "dm_quant_2", text: "On average, how much time does an employee spend per week searching for documents or information?", placeholderHint: "Enter time (e.g., hours)" },
      { id: "dm_quant_3", text: "What percentage of documents are estimated to be misfiled, duplicated, or lost?", placeholderHint: "Enter percentage" },
      { id: "dm_quant_4", text: "What are your annual costs associated with physical document storage (if applicable)?", placeholderHint: "Enter currency amount" },
      { id: "dm_quant_5", text: "How many users require regular access to these documents?", placeholderHint: "Enter number of users" },
      { id: "dm_quant_6", text: "What is the estimated cost of a compliance breach related to document mismanagement?", placeholderHint: "Enter currency amount (if known)" }
    ]
  },
  workflowManagement: {
    qualitative: [
      { id: "wm_qual_1", text: "Can you identify 2-3 key business processes that are currently highly manual, inefficient, or prone to bottlenecks?" },
      { id: "wm_qual_2", text: "Describe a typical approval process in your organisation (e.g., for documents, requests, expenses). What are the steps and handoffs involved?" },
      { id: "wm_qual_3", text: "How are tasks that require input from multiple people or departments currently managed and tracked?" },
      { id: "wm_qual_4", text: "What are the consequences of delays or errors in these manual workflows (e.g., missed deadlines, compliance issues, poor customer experience)?" },
      { id: "wm_qual_5", text: "How much visibility do managers have into the status of ongoing tasks and processes?" },
      { id: "wm_qual_6", text: "Are there processes that require integration between different systems or applications that are currently done manually?" },
      { id: "wm_qual_7", text: "How are exceptions or deviations from standard processes handled?" },
      { id: "wm_qual_8", text: "What is the appetite within the organisation for automating more business processes?" },
      { id: "wm_qual_9", text: "What tools, if any, are currently used for workflow automation or task management (e.g., email, spreadsheets, basic ERP workflows)?" },
      { id: "wm_qual_10", text: "If you could automate one specific workflow today, which one would provide the most immediate benefit and why?" }
    ],
    quantitative: [
      { id: "wm_quant_1", text: "For a key manual process, what is the average time it takes to complete one instance from start to finish?", placeholderHint: "Enter time (e.g., hours or days)" },
      { id: "wm_quant_2", text: "How many FTEs are primarily involved in executing this key manual process?", placeholderHint: "Enter number of FTEs" },
      { id: "wm_quant_3", text: "What is the estimated volume of instances for this key process per month/year?", placeholderHint: "Enter number" },
      { id: "wm_quant_4", text: "What percentage of these manual process instances result in errors or require rework?", placeholderHint: "Enter percentage" },
      { id: "wm_quant_5", text: "How many different systems/applications do users typically interact with to complete this process manually?", placeholderHint: "Enter number" },
      { id: "wm_quant_6", text: "Estimate the cost of delays or errors in this process annually.", placeholderHint: "Enter currency amount" }
    ]
  },
  processMapping: {
    qualitative: [
      { id: "pm_qual_1", text: "How are your current business processes documented (e.g., Visio diagrams, Word documents, wikis, tribal knowledge)?" },
      { id: "pm_qual_2", text: "How accessible and up-to-date is your current process documentation?" },
      { id: "pm_qual_3", text: "What are the biggest challenges in understanding, standardising, or improving your current processes?" },
      { id: "pm_qual_4", text: "Who is typically involved in defining and documenting processes? How collaborative is this effort?" },
      { id: "pm_qual_5", text: "How are process changes communicated and adopted across the relevant teams?" },
      { id: "pm_qual_6", text: "Do you have a clear understanding of process ownership and responsibilities?" },
      { id: "pm_qual_7", text: "Are you able to identify process bottlenecks, redundancies, or areas of non-compliance easily?" },
      { id: "pm_qual_8", text: "How does the lack of clear process maps impact employee training and onboarding?" },
      { id: "pm_qual_9", text: "Are your process mapping efforts linked to any strategic initiatives like digital transformation, compliance, or automation?" },
      { id: "pm_qual_10", text: "What features would be most valuable to you in a process mapping or management tool?" }
    ],
    quantitative: [
      { id: "pm_quant_1", text: "How many key business processes are currently undocumented or poorly documented?", placeholderHint: "Enter number" },
      { id: "pm_quant_2", text: "On average, how much time does it take to create or significantly update a process map using current methods?", placeholderHint: "Enter time (e.g., hours)" },
      { id: "pm_quant_3", text: "What percentage of your operational staff feel they have a clear understanding of the processes they are involved in?", placeholderHint: "Enter percentage" },
      { id: "pm_quant_4", text: "How frequently do key business processes change or require updates per year?", placeholderHint: "Enter number" },
      { id: "pm_quant_5", text: "Estimate the time spent annually on training new staff or retraining existing staff due to poorly understood processes.", placeholderHint: "Enter time (e.g., hours)" },
      { id: "pm_quant_6", text: "How many different departments or teams are typically involved in your most complex end-to-end processes?", placeholderHint: "Enter number" }
    ]
  }
};

export const ROI_INPUT_TEMPLATES: Record<string, RoiInput[]> = {
  accountsPayable: [
    { id: "ap_roi_numInvoicesPerMonth", label: "Number of invoices per month", type: "number", value: "" },
  ],
  default: [
    { id: "def_roi_manualTaskTimeHrsWeekPTE", label: "Time Spent on Manual Task (hours/week per FTE)", type: "number", value: "" },
    { id: "def_roi_numEmployeesPerformingTask", label: "Number of FTEs Performing Task", type: "number", value: "" },
    { id: "def_roi_errorRateManualTaskPercentage", label: "Error rate in current manual task (%)", type: "number", value: "" },
    { id: "def_roi_avgTimeToCorrectErrorHrs", label: "Average time to correct an error (hours)", type: "number", value: "" },
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

export const initialPainPointsState: PainPointsAppState = { 
  activeMode: PainPointMode.WATERFALL,
  currentWaterfallStep: WaterfallStep.SELECT_L1_PAIN,
  selectedL1PainId: null,
  selectedL2PainId: null,
  availableL3QuestionIds: [],
  selectedL3QuestionId: null,
  answeredL3QuestionIds: [],
  selectedL3AnswerId: null,
  waterfallConversationLog: [],
  showNotAlignedMessage: false,
  currentL3AlignmentDetails: null,
  accumulatedL2Solutions: [], 
  showConversationView: false,
  selectedProductForCheatSheet: ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.length > 0 ? ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB[0].id : null,
};

// Initial state for Customer Conversations
export const initialCustomerConversationState: CustomerConversationState = {
  currentStep: ConversationStepId.INTRODUCTION_OBJECTIVES,
  exchanges: [],
  currentAutomationFocus: null,
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


export const INITIAL_STATE: AppState = {
  customerCompany: "",
  customerName: "",
  dateCompleted: new Date().toISOString().slice(0, 10), 
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
  painPoints: JSON.parse(JSON.stringify(initialPainPointsState)), 
  customerConversations: JSON.parse(JSON.stringify(initialCustomerConversationState)), 
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

export const TAB_PURPOSES: Record<TabId, string> = {
  [TabId.HOME]: "Provides a high-level overview of the tool, its tabs, and their purposes.",
  [TabId.CUSTOMER_CONVERSATIONS]: "Guides users through initial customer interactions using a structured script to qualify leads, identify automation focus (Finance/Business), and record conversation details for handoff.",
  [TabId.PAIN_POINTS]: "A guided discovery tool to explore customer pain points. Waterfall mode drills down from high-level pain to specific issues, mapping to solutions. Reverse Waterfall provides product-specific cheat sheets for sales prep.",
  [TabId.OPPORTUNITY_SCORECARD]: "Quickly assesses the high-level viability of a sales opportunity based on key criteria like executive sponsorship, defined pain, budget, and timeline. Generates an initial qualification score.",
  [TabId.QUALIFICATION]: "Delves deeper into qualitative (strategic alignment, change readiness) and quantitative (transaction volume, process time) aspects to determine if an opportunity is qualified, needs clarification, or is unsuitable.",
  [TabId.DISCOVERY_QUESTIONS]: "Offers a comprehensive list of module-specific questions (qualitative & quantitative) to guide detailed discovery conversations and capture customer responses and custom notes.",
  [TabId.ROI_CALCULATOR]: "Estimates potential Return on Investment by inputting key metrics for a selected process module. Calculates savings, net benefit, payback period, and provides annual breakdowns.",
  [TabId.SOLUTION_BUILDER]: "Visually constructs a customer's solution proposal by selecting a core module and detailing specific customer requirements and how the proposed software addresses them.",
  [TabId.HELP]: "Offers detailed guidance on getting started, understanding each tab's functionality, role-based access, and how to use the tool effectively for process automation discovery and ROI calculation."
};


export const TAB_METADATA: TabMetadata[] = [
  { id: TabId.HOME, label: "Home", roles: [Role.SALES, Role.PRESALES, Role.SDR, Role.SAD], icon: HomeIcon, purpose: TAB_PURPOSES[TabId.HOME] },
  { id: TabId.CUSTOMER_CONVERSATIONS, label: "Customer Conversations", roles: [Role.SALES, Role.SDR, Role.SAD], icon: ChatBubbleBottomCenterTextIcon, purpose: TAB_PURPOSES[TabId.CUSTOMER_CONVERSATIONS] },
  { id: TabId.PAIN_POINTS, label: "Pain Points", roles: [Role.SALES, Role.PRESALES, Role.SDR, Role.SAD], icon: ChatBubbleLeftRightIcon, purpose: TAB_PURPOSES[TabId.PAIN_POINTS] },
  { id: TabId.OPPORTUNITY_SCORECARD, label: "Opportunity Scorecard", roles: [Role.SALES], icon: PresentationChartBarIcon, purpose: TAB_PURPOSES[TabId.OPPORTUNITY_SCORECARD] },
  { id: TabId.QUALIFICATION, label: "Qualification", roles: [Role.SALES, Role.PRESALES, Role.SDR, Role.SAD], icon: ShieldCheckIcon, purpose: TAB_PURPOSES[TabId.QUALIFICATION] },
  { id: TabId.DISCOVERY_QUESTIONS, label: "Discovery Questions", roles: [Role.PRESALES, Role.SDR, Role.SAD], icon: MagnifyingGlassIcon, purpose: TAB_PURPOSES[TabId.DISCOVERY_QUESTIONS] },
  { id: TabId.ROI_CALCULATOR, label: "ROI Calculator", roles: [Role.SALES, Role.PRESALES], icon: CalculatorIcon, purpose: TAB_PURPOSES[TabId.ROI_CALCULATOR] },
  { id: TabId.SOLUTION_BUILDER, label: "Solution Builder", roles: [Role.PRESALES], icon: PuzzlePieceIcon, purpose: TAB_PURPOSES[TabId.SOLUTION_BUILDER] },
  { id: TabId.HELP, label: "Help", roles: [Role.SALES, Role.PRESALES, Role.SDR, Role.SAD], icon: InformationCircleIcon, purpose: TAB_PURPOSES[TabId.HELP] },
];

export const HOURLY_RATE_DIVISOR = 2080; 
export const AUTOMATION_TIME_SAVING_PERCENTAGE = 0.75; 
export const AUTOMATION_ERROR_REDUCTION_PERCENTAGE = 0.80; 

// --- PAIN POINTS TAB DATA ---
export const PAIN_POINT_HIERARCHY: PainPointLevel1Pain[] = [
  {
    id: "L1_A",
    text: "Issues with Cash Flow & Financial Health",
    level2Pains: [
      {
        id: "L2_A1", // Accounts Receivable Focus
        text: "Delays in getting paid by our customers (Accounts Receivable).",
        level3Questions: [
          // Original L3 Questions for L2_A1
          {
            id: "L3_A1_Q1",
            text: "Can you walk me through your current process for applying cash once a customer payment is received?",
            answerOptions: [
              { id: "L3_A1_Q1_A1", text: "It's highly manual, matching payments to invoices is slow and error-prone.", leadsToSolutionMapping: { painIdentified: "Manual, error-prone cash application process.", suggestedSolutionsProductIds: ["cashApplication"] }},
              { id: "L3_A1_Q1_A2", text: "We have a system, but it struggles with complex remittances or multiple currencies.", leadsToSolutionMapping: { painIdentified: "System limitations in handling complex remittances or FX.", suggestedSolutionsProductIds: ["cashApplication"] }},
              { id: "L3_A1_Q1_A3", text: "It's mostly automated and works fairly well.", isNotAligned: true },
              { id: "L3_A1_Q1_A4", text: "We outsource this, and it's managed effectively by a third party.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A1_Q2",
            text: "How do you currently handle remittances that don't match the invoice amount, like short payments or deductions?",
            answerOptions: [
              { id: "L3_A1_Q2_A1", text: "It's a very manual investigation process to identify and resolve them.", leadsToSolutionMapping: { painIdentified: "Manual, slow resolution of payment discrepancies and deductions.", suggestedSolutionsProductIds: ["claimsDeductions", "cashApplication"] }},
              { id: "L3_A1_Q2_A2", text: "We often write off small discrepancies due to lack of time to investigate.", leadsToSolutionMapping: { painIdentified: "Revenue leakage from uninvestigated short payments/deductions.", suggestedSolutionsProductIds: ["claimsDeductions"] }},
              { id: "L3_A1_Q2_A3", text: "We have a dedicated team, but they are overwhelmed with the volume.", leadsToSolutionMapping: { painIdentified: "High volume of claims/deductions overwhelming manual processes.", suggestedSolutionsProductIds: ["claimsDeductions", "collectionManagement"] }},
              { id: "L3_A1_Q2_A4", text: "This is rare, and we have clear procedures to handle them efficiently.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A1_Q3",
            text: "When you have overdue accounts, what does your collections process typically involve?",
            answerOptions: [
              { id: "L3_A1_Q3_A1", text: "It's ad-hoc, mainly reactive emails and calls when accounts become very overdue.", leadsToSolutionMapping: { painIdentified: "Reactive, ad-hoc collections leading to high DSO.", suggestedSolutionsProductIds: ["collectionManagement"] }},
              { id: "L3_A1_Q3_A2", text: "We have a process, but it's manual, time-consuming, and hard to track consistently.", leadsToSolutionMapping: { painIdentified: "Manual, inconsistent collections process lacking visibility.", suggestedSolutionsProductIds: ["collectionManagement", "invoiceDelivery"] }},
              { id: "L3_A1_Q3_A3", text: "Our team uses spreadsheets and basic reminders, but it's not very effective for prioritisation.", leadsToSolutionMapping: { painIdentified: "Ineffective prioritisation and tracking in collections.", suggestedSolutionsProductIds: ["collectionManagement"] }},
              { id: "L3_A1_Q3_A4", text: "We have an automated system that manages reminders and escalations well.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_A1
          {
            id: "L3_A1_Q4",
            text: "What's the most common reason customer payments are delayed or disputed, aside from inability to pay?",
            answerOptions: [
              { id: "L3_A1_Q4_A1", text: "Frequent disputes over invoice accuracy (pricing, quantity errors).", leadsToSolutionMapping: { painIdentified: "Invoice inaccuracies causing payment delays and disputes.", suggestedSolutionsProductIds: ["invoiceDelivery", "orderManagement"] }},
              { id: "L3_A1_Q4_A2", text: "Customers claim they never received the invoice or received it late.", leadsToSolutionMapping: { painIdentified: "Issues with invoice delivery timing and confirmation.", suggestedSolutionsProductIds: ["invoiceDelivery"] }},
              { id: "L3_A1_Q4_A3", text: "Our payment terms are confusing or not consistently communicated.", isNotAligned: true },
              { id: "L3_A1_Q4_A4", text: "It's rarely an issue; disputes are minimal and handled well.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A1_Q5",
            text: "How does your team manage situations where a customer is on credit hold but needs to place an urgent order?",
            answerOptions: [
              { id: "L3_A1_Q5_A1", text: "It's a chaotic, manual scramble to get credit release approved, often delaying orders.", leadsToSolutionMapping: { painIdentified: "Inefficient manual credit hold and release processes.", suggestedSolutionsProductIds: ["creditManagement"] }},
              { id: "L3_A1_Q5_A2", text: "We lack clear visibility into credit status when taking orders, causing downstream problems.", leadsToSolutionMapping: { painIdentified: "Poor visibility of customer credit status during order entry.", suggestedSolutionsProductIds: ["creditManagement", "orderManagement"] }},
              { id: "L3_A1_Q5_A3", text: "Sales often overrides credit holds without proper checks, increasing risk.", isNotAligned: true },
              { id: "L3_A1_Q5_A4", text: "We have an integrated system that flags credit issues early and streamlines approvals.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A1_Q6",
            text: "How easy is it for your finance team to get a clear, real-time picture of outstanding receivables and aging?",
            answerOptions: [
              { id: "L3_A1_Q6_A1", text: "Reporting is manual, time-consuming (e.g., spreadsheet-based), and often outdated.", leadsToSolutionMapping: { painIdentified: "Manual and outdated AR reporting hindering visibility.", suggestedSolutionsProductIds: ["collectionManagement", "cashApplication"] }},
              { id: "L3_A1_Q6_A2", text: "We have reports, but they don't easily drill down into problem accounts or dispute reasons.", leadsToSolutionMapping: { painIdentified: "AR reports lack actionable detail and drill-down capabilities.", suggestedSolutionsProductIds: ["collectionManagement"] }},
              { id: "L3_A1_Q6_A3", text: "Our ERP provides basic reports, but they require a lot of manipulation.", isNotAligned: true },
              { id: "L3_A1_Q6_A4", text: "We have excellent, real-time AR dashboards and reporting.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A1_Q7",
            text: "Do your customers have a way to view their invoices, payment history, or raise disputes online without contacting your team?",
            answerOptions: [
              { id: "L3_A1_Q7_A1", text: "No, all inquiries come through phone or email, which is a big workload.", leadsToSolutionMapping: { painIdentified: "Lack of customer self-service AR portal increasing manual workload.", suggestedSolutionsProductIds: ["invoiceDelivery", "customerInquiryManagement"] }},
              { id: "L3_A1_Q7_A2", text: "We have a basic portal, but it's not widely used or very functional.", leadsToSolutionMapping: { painIdentified: "Ineffective or underutilised customer AR portal.", suggestedSolutionsProductIds: ["invoiceDelivery"] }},
              { id: "L3_A1_Q7_A3", text: "We're considering it, but haven't implemented anything yet.", leadsToSolutionMapping: { painIdentified: "Considering but lacking customer self-service AR portal.", suggestedSolutionsProductIds: ["invoiceDelivery", "customerInquiryManagement"] } },
              { id: "L3_A1_Q7_A4", text: "Yes, our customers actively use a comprehensive self-service portal.", isNotAligned: true },
            ]
          }
        ],
      },
      {
        id: "L2_A2", // Accounts Payable Focus
        text: "It takes too long to process and pay supplier invoices (Accounts Payable).",
        level3Questions: [
          // Original L3 Questions for L2_A2
          {
            id: "L3_A2_Q1",
            text: "Could you describe how a supplier invoice gets from its arrival to the point where it's approved and paid?",
            answerOptions: [
              { id: "L3_A2_Q1_A1", text: "It's heavily paper-based, manual data entry, and physical routing for approvals.", leadsToSolutionMapping: { painIdentified: "Manual, paper-intensive AP processing with slow approvals.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q1_A2", text: "Invoices arrive by email, but then they are printed for manual processing and coding.", leadsToSolutionMapping: { painIdentified: "Manual processing of emailed invoices, lacking automation.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q1_A3", text: "We use an older system that requires a lot of manual intervention and isn't integrated well.", leadsToSolutionMapping: { painIdentified: "Outdated, non-integrated AP system causing inefficiencies.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q1_A4", text: "Our process is largely automated, integrated, and efficient.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A2_Q2",
            text: "How much visibility does your team have into the status of an invoice at any given time?",
            answerOptions: [
              { id: "L3_A2_Q2_A1", text: "Very little. We often have to manually search or ask around to find an invoice's status.", leadsToSolutionMapping: { painIdentified: "Lack of invoice status visibility in AP, leading to delays and supplier inquiries.", suggestedSolutionsProductIds: ["accountsPayable", "supplierManagement"] }},
              { id: "L3_A2_Q2_A2", text: "Only certain key people have visibility, it's not widely accessible.", leadsToSolutionMapping: { painIdentified: "Limited AP visibility, hindering proactive management.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q2_A3", text: "We have some visibility through our ERP, but it's not real-time or very detailed.", leadsToSolutionMapping: { painIdentified: "Partial or delayed visibility into invoice statuses.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q2_A4", text: "We have excellent real-time visibility for all stakeholders.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_A2
          {
            id: "L3_A2_Q3",
            text: "How are exceptions (e.g., price or quantity mismatches, missing POs) typically handled in your AP process?",
            answerOptions: [
              { id: "L3_A2_Q3_A1", text: "It's a lengthy back-and-forth email chain involving multiple departments.", leadsToSolutionMapping: { painIdentified: "Inefficient, email-based AP exception handling.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q3_A2", text: "Exceptions often sit unresolved for long periods, delaying payments.", leadsToSolutionMapping: { painIdentified: "Prolonged AP exception resolution times impacting payments.", suggestedSolutionsProductIds: ["accountsPayable", "supplierManagement"] }},
              { id: "L3_A2_Q3_A3", text: "We lack a standardised process, so it varies by person or situation.", isNotAligned: true },
              { id: "L3_A2_Q3_A4", text: "We have automated workflows that route exceptions to the right people quickly.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A2_Q4",
            text: "What challenges do you face with month-end closing related to accounts payable?",
            answerOptions: [
              { id: "L3_A2_Q4_A1", text: "Accruing for unprocessed invoices is a major manual effort and often inaccurate.", leadsToSolutionMapping: { painIdentified: "Manual and inaccurate AP accruals at month-end.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q4_A2", text: "We struggle to get all invoices processed in time, leading to a stressful close.", leadsToSolutionMapping: { painIdentified: "Delayed invoice processing complicating month-end close.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q4_A3", text: "Reconciling AP sub-ledger to GL is time-consuming due to data issues.", isNotAligned: true }, // More of an ERP/accounting system issue
              { id: "L3_A2_Q4_A4", text: "Our AP close process is smooth and largely automated.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A2_Q5",
            text: "How do you manage supplier inquiries about invoice or payment status?",
            answerOptions: [
              { id: "L3_A2_Q5_A1", text: "Our AP team spends a lot of time answering routine supplier calls and emails.", leadsToSolutionMapping: { painIdentified: "High AP staff time spent on supplier status inquiries.", suggestedSolutionsProductIds: ["supplierManagement", "accountsPayable"] }},
              { id: "L3_A2_Q5_A2", text: "Suppliers often complain they can't get timely updates.", leadsToSolutionMapping: { painIdentified: "Poor supplier experience due to slow AP inquiry responses.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_A2_Q5_A3", text: "We don't have a dedicated way for suppliers to check status themselves.", leadsToSolutionMapping: { painIdentified: "Lack of supplier self-service for invoice/payment status.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_A2_Q5_A4", text: "We have a supplier portal that provides self-service and reduces inquiries.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A2_Q6",
            text: "What's your process for capturing early payment discounts from suppliers?",
            answerOptions: [
              { id: "L3_A2_Q6_A1", text: "We miss most discount opportunities due to slow invoice processing.", leadsToSolutionMapping: { painIdentified: "Missed early payment discounts from slow AP processing.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q6_A2", text: "It's manual to track discount deadlines, and we often forget or run out of time.", leadsToSolutionMapping: { painIdentified: "Manual tracking leading to missed supplier discounts.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_A2_Q6_A3", text: "Only a few key suppliers have discount terms we actively manage.", isNotAligned: true }, // Could be limited scope, not necessarily a system pain
              { id: "L3_A2_Q6_A4", text: "Our system flags discount opportunities, and we capture them consistently.", isNotAligned: true },
            ]
          }
        ],
      },
      {
        id: "L2_A3", // Procurement & Expenses Focus
        text: "Difficulty managing and controlling company spend (Procurement & Expenses).",
        level3Questions: [
          // Original L3 Question for L2_A3
          {
            id: "L3_A3_Q1",
            text: "How does your team currently request and approve purchases?",
            answerOptions: [
              { id: "L3_A3_Q1_A1", text: "It's an informal email/verbal process, hard to track and often bypasses policy.", leadsToSolutionMapping: { painIdentified: "Informal, untracked procurement leading to maverick spend.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_A3_Q1_A2", text: "We use paper forms or spreadsheets, which are slow and lack spend visibility.", leadsToSolutionMapping: { painIdentified: "Manual, slow procurement processes with poor spend visibility.", suggestedSolutionsProductIds: ["procurement", "expenseManagement"] }},
              { id: "L3_A3_Q1_A3", text: "Our current system is cumbersome and not well-adopted by users.", leadsToSolutionMapping: { painIdentified: "Ineffective procurement system hindering adoption and control.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_A3_Q1_A4", text: "We have a streamlined, automated system for requisitions and approvals.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_A3
          {
            id: "L3_A3_Q2",
            text: "How are employee expense reports currently submitted and processed?",
            answerOptions: [
              { id: "L3_A3_Q2_A1", text: "Employees submit paper receipts attached to spreadsheets, it's very manual.", leadsToSolutionMapping: { painIdentified: "Manual, paper-based expense reporting process.", suggestedSolutionsProductIds: ["expenseManagement"] }},
              { id: "L3_A3_Q2_A2", text: "Processing expense reports takes a long time, and reimbursements are often delayed.", leadsToSolutionMapping: { painIdentified: "Slow expense report processing and reimbursement.", suggestedSolutionsProductIds: ["expenseManagement"] }},
              { id: "L3_A3_Q2_A3", text: "Checking for policy compliance on expense reports is difficult and inconsistent.", leadsToSolutionMapping: { painIdentified: "Inconsistent expense policy compliance and enforcement.", suggestedSolutionsProductIds: ["expenseManagement"] }},
              { id: "L3_A3_Q2_A4", text: "We use an online system with mobile receipt capture and automated policy checks.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A3_Q3",
            text: "How much visibility do you have into overall company spend before it occurs (i.e., committed spend)?",
            answerOptions: [
              { id: "L3_A3_Q3_A1", text: "Very little. We mostly see spend after invoices arrive or expenses are claimed.", leadsToSolutionMapping: { painIdentified: "Lack of pre-approved spend visibility (committed spend).", suggestedSolutionsProductIds: ["procurement", "expenseManagement"] }},
              { id: "L3_A3_Q3_A2", text: "Budget holders find it hard to track their actual spend against budget in real-time.", leadsToSolutionMapping: { painIdentified: "Difficulty tracking actual spend against budgets.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_A3_Q3_A3", text: "We rely on manual consolidation of data from various sources for spend analysis.", isNotAligned: true }, // More analytics tool, but P2P can feed it
              { id: "L3_A3_Q3_A4", text: "Our systems provide good real-time visibility into committed and actual spend.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A3_Q4",
            text: "What challenges, if any, do you face with supplier onboarding and managing supplier information for procurement?",
            answerOptions: [
              { id: "L3_A3_Q4_A1", text: "Onboarding new suppliers is a slow, paper-heavy process.", leadsToSolutionMapping: { painIdentified: "Slow, manual supplier onboarding for procurement.", suggestedSolutionsProductIds: ["supplierManagement", "procurement"] }},
              { id: "L3_A3_Q4_A2", text: "Keeping supplier details (banking, compliance docs) up-to-date is a constant struggle.", leadsToSolutionMapping: { painIdentified: "Difficulty maintaining accurate and current supplier master data.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_A3_Q4_A3", text: "We don't have a central, approved supplier list easily accessible to requesters.", leadsToSolutionMapping: { painIdentified: "Lack of centralised, accessible approved supplier list.", suggestedSolutionsProductIds: ["procurement", "supplierManagement"] }},
              { id: "L3_A3_Q4_A4", text: "Supplier management is well-integrated with our procurement system.", isNotAligned: true },
            ]
          },
          {
            id: "L3_A3_Q5",
            text: "How does your current procurement process support preferred supplier agreements or negotiated pricing?",
            answerOptions: [
              { id: "L3_A3_Q5_A1", text: "It's hard to ensure employees use preferred suppliers or get correct pricing.", leadsToSolutionMapping: { painIdentified: "Difficulty enforcing preferred supplier usage and pricing.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_A3_Q5_A2", text: "Requesters often don't know who the preferred suppliers are or what's been negotiated.", leadsToSolutionMapping: { painIdentified: "Lack of visibility into preferred supplier agreements for requesters.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_A3_Q5_A3", text: "We rely on manual checks by AP or procurement staff after the fact.", isNotAligned: true }, // Reactive
              { id: "L3_A3_Q5_A4", text: "Our system guides users to preferred suppliers and applies contract pricing automatically.", isNotAligned: true },
            ]
          }
        ]
      }
    ],
  },
  {
    id: "L1_B",
    text: "Inefficient Operations & Manual Processes",
    level2Pains: [
      {
        id: "L2_B1", // Order Management Focus
        text: "We struggle to process customer orders quickly and accurately.",
        level3Questions: [
          // Original L3 Questions for L2_B1
          {
            id: "L3_B1_Q1",
            text: "How do customer orders typically arrive today (e.g., email, PDF, EDI)?",
            answerOptions: [
              { id: "L3_B1_Q1_A1", text: "Mostly via email as PDFs, requiring manual data entry into our system.", leadsToSolutionMapping: { painIdentified: "Manual entry of PDF orders from email, causing delays and errors.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q1_A2", text: "We receive EDI orders, but many still come in unstructured formats requiring manual handling.", leadsToSolutionMapping: { painIdentified: "Mix of EDI and manual order types, burdening the team.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q1_A3", text: "Multiple channels (email, portal, phone), making consolidation and tracking difficult.", leadsToSolutionMapping: { painIdentified: "Fragmented order intake across multiple channels.", suggestedSolutionsProductIds: ["orderManagement", "customerInquiryManagement"] }},
              { id: "L3_B1_Q1_A4", text: "Primarily through a fully integrated EDI or customer portal system.", isNotAligned: true },
            ]
          },
           {
            id: "L3_B1_Q2",
            text: "What percentage of your orders require some form of manual correction or clarification before processing?",
            answerOptions: [
              { id: "L3_B1_Q2_A1", text: "A significant percentage (e.g., >20%) need corrections, causing major delays.", leadsToSolutionMapping: { painIdentified: "High order error rates requiring manual correction and delays.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q2_A2", text: "It's noticeable, especially with new customers or complex orders.", leadsToSolutionMapping: { painIdentified: "Frequent order clarifications, especially for new/complex orders.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q2_A3", text: "We catch most errors, but it takes considerable staff time to review and fix them.", leadsToSolutionMapping: { painIdentified: "Significant staff effort spent on order review and correction.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q2_A4", text: "Very few, our order validation processes are robust.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_B1
          {
            id: "L3_B1_Q3",
            text: "How much visibility do you and your customers have into an order's status once it's submitted?",
            answerOptions: [
              { id: "L3_B1_Q3_A1", text: "Very little. Customers call us frequently for updates, and we have to check multiple places.", leadsToSolutionMapping: { painIdentified: "Lack of order status visibility for customers and internal teams.", suggestedSolutionsProductIds: ["orderManagement", "customerInquiryManagement"] }},
              { id: "L3_B1_Q3_A2", text: "Our internal team has some visibility, but it's not easy for customers to see status themselves.", leadsToSolutionMapping: { painIdentified: "Limited customer self-service for order status tracking.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q3_A3", text: "Status updates are often delayed or not communicated proactively.", isNotAligned: true },
              { id: "L3_B1_Q3_A4", text: "We have real-time, self-service order tracking for everyone.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B1_Q4",
            text: "How are order confirmations and shipping notifications handled?",
            answerOptions: [
              { id: "L3_B1_Q4_A1", text: "These are largely manual processes, sometimes forgotten or sent late.", leadsToSolutionMapping: { painIdentified: "Manual and inconsistent order confirmations/shipping notifications.", suggestedSolutionsProductIds: ["orderManagement", "invoiceDelivery"] }}, // Invoice delivery if related to overall comms
              { id: "L3_B1_Q4_A2", text: "We generate them from our ERP, but it's a separate step for each order.", leadsToSolutionMapping: { painIdentified: "Manual generation of order/shipping notifications from ERP.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q4_A3", text: "Customers sometimes complain they didn't receive these communications.", isNotAligned: true }, // Could be delivery issue not system
              { id: "L3_B1_Q4_A4", text: "Confirmations and notifications are automated and sent promptly.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B1_Q5",
            text: "What's the impact on your business when orders are delayed or contain errors?",
            answerOptions: [
              { id: "L3_B1_Q5_A1", text: "Increased customer complaints, rush shipping costs, and sometimes lost sales.", leadsToSolutionMapping: { painIdentified: "Negative business impact from order errors/delays (costs, satisfaction).", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q5_A2", text: "It causes a lot of rework for our customer service and fulfilment teams.", leadsToSolutionMapping: { painIdentified: "Significant internal rework due to order processing issues.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q5_A3", text: "Our reputation suffers, and it strains customer relationships.", isNotAligned: true }, // General business impact
              { id: "L3_B1_Q5_A4", text: "Minimal impact, as errors and delays are very rare.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B1_Q6",
            text: "How do you handle order prioritisation or expedite requests?",
            answerOptions: [
              { id: "L3_B1_Q6_A1", text: "It's an informal, often chaotic process relying on who shouts loudest.", leadsToSolutionMapping: { painIdentified: "Informal and inefficient order prioritisation/expedite process.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q6_A2", text: "We lack clear rules or system support for prioritising orders effectively.", leadsToSolutionMapping: { painIdentified: "No systematic approach to order prioritisation.", suggestedSolutionsProductIds: ["orderManagement"] }},
              { id: "L3_B1_Q6_A3", text: "It requires manual intervention and communication across multiple teams.", isNotAligned: true },
              { id: "L3_B1_Q6_A4", text: "Our system allows for rule-based prioritisation and clear expedite flags.", isNotAligned: true },
            ]
          }
        ],
      },
      {
        id: "L2_B2", // Process Mapping & Workflow Focus
        text: "Our internal workflows and processes are confusing and inconsistent.",
        level3Questions: [
          // Original L3 Question for L2_B2
          {
            id: "L3_B2_Q1",
            text: "How do you currently document and share your standard operating procedures across the team?",
            answerOptions: [
              { id: "L3_B2_Q1_A1", text: "Documentation is outdated, hard to find, or non-existent for many processes.", leadsToSolutionMapping: { painIdentified: "Lack of accessible, current process documentation.", suggestedSolutionsProductIds: ["processMapping", "documentManagement"] }},
              { id: "L3_B2_Q1_A2", text: "We have SOPs, but they are static documents not easily updated or integrated into daily work.", leadsToSolutionMapping: { painIdentified: "Static, unintegrated SOPs leading to inconsistent process execution.", suggestedSolutionsProductIds: ["processMapping", "workflowManagement"] }},
              { id: "L3_B2_Q1_A3", text: "Each department has its own way, leading to inconsistencies across the organisation.", leadsToSolutionMapping: { painIdentified: "Siloed and inconsistent process documentation across departments.", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_B2_Q1_A4", text: "We use a central, dynamic system for process documentation and training.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_B2
          {
            id: "L3_B2_Q2",
            text: "When a process needs to be updated, what's involved in making that happen and communicating it effectively?",
            answerOptions: [
              { id: "L3_B2_Q2_A1", text: "It's a slow and cumbersome process to update documentation and ensure everyone is aware.", leadsToSolutionMapping: { painIdentified: "Inefficient process update and communication lifecycle.", suggestedSolutionsProductIds: ["processMapping", "workflowManagement"] }},
              { id: "L3_B2_Q2_A2", text: "Changes often don't get communicated properly, leading to continued errors or old methods.", leadsToSolutionMapping: { painIdentified: "Poor communication of process changes causing inconsistency.", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_B2_Q2_A3", text: "We struggle with version control for our process documents.", isNotAligned: true }, // Document Management can help
              { id: "L3_B2_Q2_A4", text: "We have a clear change management process for SOPs with automated notifications.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B2_Q3",
            text: "How do you identify bottlenecks or areas for improvement in your day-to-day workflows?",
            answerOptions: [
              { id: "L3_B2_Q3_A1", text: "It's mostly based on gut feel or when something goes significantly wrong.", leadsToSolutionMapping: { painIdentified: "Reactive approach to identifying process bottlenecks.", suggestedSolutionsProductIds: ["processMapping", "workflowManagement"] }}, // Workflow for analytics
              { id: "L3_B2_Q3_A2", text: "We lack the data or tools to objectively analyse process performance.", leadsToSolutionMapping: { painIdentified: "Inability to measure and analyse process performance.", suggestedSolutionsProductIds: ["workflowManagement"] }}, // Process mining/analytics part
              { id: "L3_B2_Q3_A3", text: "Different teams have different ideas of what the problems are.", isNotAligned: true },
              { id: "L3_B2_Q3_A4", text: "We use process analytics and regular reviews to proactively identify improvements.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B2_Q4",
            text: "Can you give an example of a business process that you feel takes more steps or handoffs than it should?",
            answerOptions: [
              { id: "L3_B2_Q4_A1", text: "Yes, [User describes a complex manual process, e.g., employee onboarding].", leadsToSolutionMapping: { painIdentified: "Identified overly complex manual process ripe for optimisation.", suggestedSolutionsProductIds: ["workflowManagement", "processMapping"] }},
              { id: "L3_B2_Q4_A2", text: "Many of our approval processes involve multiple emails and manual tracking.", leadsToSolutionMapping: { painIdentified: "Email-based approvals lacking automation and tracking.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_B2_Q4_A3", text: "We know some processes are inefficient, but haven't formally mapped them out.", leadsToSolutionMapping: { painIdentified: "Awareness of process inefficiencies without formal mapping.", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_B2_Q4_A4", text: "Most of our core processes are quite streamlined.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B2_Q5",
            text: "How are tasks that require input or action from multiple people or departments currently managed and tracked?",
            answerOptions: [
              { id: "L3_B2_Q5_A1", text: "Mostly through email chains or shared spreadsheets, it's hard to see progress.", leadsToSolutionMapping: { painIdentified: "Inefficient tracking of multi-step, cross-departmental tasks.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_B2_Q5_A2", text: "Tasks often get dropped or delayed because there's no clear ownership or reminder system.", leadsToSolutionMapping: { painIdentified: "Tasks delayed or dropped due to lack of workflow accountability.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_B2_Q5_A3", text: "Project management tools are used for some, but not for routine operational workflows.", isNotAligned: true },
              { id: "L3_B2_Q5_A4", text: "We use a workflow system that manages handoffs and tracks progress effectively.", isNotAligned: true },
            ]
          }
        ]
      }
    ],
  },
   {
    id: "L1_C",
    text: "Lack of Visibility, Control & Compliance Risk",
    level2Pains: [
      {
        id: "L2_C1", // Document Management Focus
        text: "We can never find the right document when we need it, and it's impacting compliance.",
        level3Questions: [
          // Original L3 Question for L2_C1
          {
            id: "L3_C1_Q1",
            text: "Where are your most critical business documents (like contracts, HR files, or project plans) stored today?",
            answerOptions: [
              { id: "L3_C1_Q1_A1", text: "They are scattered across shared drives, email inboxes, and local hard drives.", leadsToSolutionMapping: { painIdentified: "Dispersed document storage leading to retrieval issues and compliance risks.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q1_A2", text: "We have a central repository, but it's poorly organised and difficult to search effectively.", leadsToSolutionMapping: { painIdentified: "Poorly organised central repository hindering document access.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q1_A3", text: "Multiple systems are used, with no clear master or version control.", leadsToSolutionMapping: { painIdentified: "Multiple document systems lacking version control and a single source of truth.", suggestedSolutionsProductIds: ["documentManagement", "workflowManagement"] }},
              { id: "L3_C1_Q1_A4", text: "In a well-organised, version-controlled, and secure document management system.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_C1
          {
            id: "L3_C1_Q2",
            text: "Tell me about a time you struggled to find a specific version of a document. What was the impact?",
            answerOptions: [
              { id: "L3_C1_Q2_A1", text: "Yes, it happens often. We've wasted time or used outdated information as a result.", leadsToSolutionMapping: { painIdentified: "Frequent issues with version control leading to errors/inefficiency.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q2_A2", text: "We sometimes have multiple 'final' versions and aren't sure which is correct.", leadsToSolutionMapping: { painIdentified: "Lack of clear document versioning causing confusion.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q2_A3", text: "Our naming conventions are inconsistent, making version tracking hard.", isNotAligned: true },
              { id: "L3_C1_Q2_A4", text: "We have robust version control and rarely have issues finding the correct version.", isNotAligned: true },
            ]
          },
          {
            id: "L3_C1_Q3",
            text: "How do you control who has access to sensitive information or confidential documents?",
            answerOptions: [
              { id: "L3_C1_Q3_A1", text: "Access controls are basic (e.g., shared drive permissions) and hard to manage granularly.", leadsToSolutionMapping: { painIdentified: "Limited and difficult-to-manage access controls for documents.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q3_A2", text: "We're concerned that too many people might have access to things they shouldn't.", leadsToSolutionMapping: { painIdentified: "Potential over-exposure of sensitive documents due to poor access control.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q3_A3", text: "It relies on manual processes and trust, which isn't ideal for compliance.", isNotAligned: true },
              { id: "L3_C1_Q3_A4", text: "We have role-based access controls and audit trails for all sensitive documents.", isNotAligned: true },
            ]
          },
          {
            id: "L3_C1_Q4",
            text: "How do you collaborate on documents when multiple people need to provide input or approve them?",
            answerOptions: [
              { id: "L3_C1_Q4_A1", text: "Mostly by emailing attachments back and forth, which creates version chaos.", leadsToSolutionMapping: { painIdentified: "Email-based document collaboration leading to versioning issues.", suggestedSolutionsProductIds: ["documentManagement", "workflowManagement"] }},
              { id: "L3_C1_Q4_A2", text: "Tracking changes and consolidating feedback from multiple reviewers is very difficult.", leadsToSolutionMapping: { painIdentified: "Difficulty managing feedback and changes in collaborative documents.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q4_A3", text: "We use shared online documents, but without formal workflow for approvals.", isNotAligned: true }, // Could be SharePoint/Google Docs
              { id: "L3_C1_Q4_A4", text: "Our DMS has built-in co-authoring, versioning, and approval workflows.", isNotAligned: true },
            ]
          },
          {
            id: "L3_C1_Q5",
            text: "What are your main concerns regarding document retention policies and audit trails?",
            answerOptions: [
              { id: "L3_C1_Q5_A1", text: "We struggle to consistently apply retention policies across all our documents.", leadsToSolutionMapping: { painIdentified: "Inconsistent application of document retention policies.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q5_A2", text: "Producing documents for an audit is a major, time-consuming effort.", leadsToSolutionMapping: { painIdentified: "Difficulty and high effort in producing documents for audits.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q5_A3", text: "We're not always sure if we're meeting all our compliance obligations for document management.", leadsToSolutionMapping: { painIdentified: "Uncertainty about meeting document-related compliance obligations.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_C1_Q5_A4", text: "Automated retention and comprehensive audit trails are in place and effective.", isNotAligned: true },
            ]
          }
        ]
      }
    ],
  },
   {
    id: "L1_D",
    text: "Poor Supplier or Customer Relationships",
    level2Pains: [
      {
        id: "L2_D1", // Supplier Management Focus
        text: "Our suppliers complain about late payments or lack of visibility into invoice status.",
        level3Questions: [
           // Original L3 Question for L2_D1
           {
            id: "L3_D1_Q1",
            text: "How easy is it for suppliers to get updates on the status of their invoices?",
            answerOptions: [
              { id: "L3_D1_Q1_A1", text: "They frequently have to call or email our AP team, which is inefficient for everyone.", leadsToSolutionMapping: { painIdentified: "High volume of supplier inquiries due to lack of self-service invoice status.", suggestedSolutionsProductIds: ["supplierManagement", "accountsPayable"] }},
              { id: "L3_D1_Q1_A2", text: "We try to be responsive, but it's a manual effort to look up and provide updates.", leadsToSolutionMapping: { painIdentified: "Manual effort to provide invoice status updates to suppliers.", suggestedSolutionsProductIds: ["supplierManagement", "accountsPayable"] }},
              { id: "L3_D1_Q1_A3", text: "There's no easy way for them to check themselves; they rely solely on us.", leadsToSolutionMapping: { painIdentified: "Absence of supplier self-service capabilities for invoice tracking.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_D1_Q1_A4", text: "We provide a supplier portal with real-time status updates.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_D1
          {
            id: "L3_D1_Q2",
            text: "What is your process for onboarding new suppliers and collecting necessary documentation (e.g., banking details, tax forms)?",
            answerOptions: [
              { id: "L3_D1_Q2_A1", text: "It's a manual, often lengthy process involving emails and paper forms.", leadsToSolutionMapping: { painIdentified: "Manual and slow supplier onboarding process.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_D1_Q2_A2", text: "Ensuring all required supplier documentation is complete and up-to-date is a challenge.", leadsToSolutionMapping: { painIdentified: "Difficulty managing supplier documentation and compliance.", suggestedSolutionsProductIds: ["supplierManagement", "documentManagement"] }},
              { id: "L3_D1_Q2_A3", text: "Information is often stored in disparate systems or spreadsheets.", isNotAligned: true },
              { id: "L3_D1_Q2_A4", text: "We use a supplier portal for self-service onboarding and document submission.", isNotAligned: true },
            ]
          },
          {
            id: "L3_D1_Q3",
            text: "How do you communicate important updates or changes (e.g., policy changes, contact information) to your supplier base?",
            answerOptions: [
              { id: "L3_D1_Q3_A1", text: "Primarily through mass emails, but we're not sure everyone receives or reads them.", leadsToSolutionMapping: { painIdentified: "Ineffective or unreliable communication with suppliers.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_D1_Q3_A2", text: "It's ad-hoc, and we often find out suppliers have outdated information.", leadsToSolutionMapping: { painIdentified: "Ad-hoc supplier communication leading to outdated information.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_D1_Q3_A3", text: "There's no central platform for targeted supplier communications.", isNotAligned: true },
              { id: "L3_D1_Q3_A4", text: "Our supplier portal handles all important communications and updates.", isNotAligned: true },
            ]
          },
          {
            id: "L3_D1_Q4",
            text: "What feedback have you received from suppliers regarding your payment processes or communication?",
            answerOptions: [
              { id: "L3_D1_Q4_A1", text: "Suppliers complain about payment delays and the difficulty in getting status updates.", leadsToSolutionMapping: { painIdentified: "Negative supplier feedback on payment delays and communication.", suggestedSolutionsProductIds: ["accountsPayable", "supplierManagement"] }},
              { id: "L3_D1_Q4_A2", text: "Some suppliers are hesitant to offer us favourable terms due to past issues.", leadsToSolutionMapping: { painIdentified: "Strained supplier relationships impacting terms/negotiations.", suggestedSolutionsProductIds: ["accountsPayable", "supplierManagement"] }},
              { id: "L3_D1_Q4_A3", text: "We don't actively solicit feedback from suppliers on these processes.", isNotAligned: true },
              { id: "L3_D1_Q4_A4", text: "Generally, feedback is positive, and relationships are strong.", isNotAligned: true },
            ]
          },
          {
            id: "L3_D1_Q5",
            text: "How do you manage supplier risk, such as financial stability, compliance, or performance issues?",
            answerOptions: [
              { id: "L3_D1_Q5_A1", text: "Risk assessment is informal and not consistently applied across all suppliers.", leadsToSolutionMapping: { painIdentified: "Informal and inconsistent supplier risk management.", suggestedSolutionsProductIds: ["supplierManagement", "procurement"] }}, // Procurement for vendor scorecards
              { id: "L3_D1_Q5_A2", text: "We lack tools to proactively monitor changes in supplier risk profiles.", leadsToSolutionMapping: { painIdentified: "Inability to proactively monitor supplier risk.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_D1_Q5_A3", text: "We react to supplier issues as they arise rather than anticipating them.", isNotAligned: true },
              { id: "L3_D1_Q5_A4", text: "We have a robust supplier risk management program with system support.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_D2", // Customer Inquiry / Service Focus
        text: "Customers are frustrated with order errors, delays, or slow responses to inquiries.",
        level3Questions: [
           // Original L3 Question for L2_D2
           {
            id: "L3_D2_Q1",
            text: "How quickly and accurately are you able to respond to customer inquiries about orders, invoices, or products?",
            answerOptions: [
              { id: "L3_D2_Q1_A1", text: "Response times are slow, and often customers need to follow up multiple times.", leadsToSolutionMapping: { painIdentified: "Slow and inaccurate responses to customer inquiries.", suggestedSolutionsProductIds: ["customerInquiryManagement", "orderManagement", "invoiceDelivery"] }},
              { id: "L3_D2_Q1_A2", text: "Our team struggles to find information quickly as it's in different systems.", leadsToSolutionMapping: { painIdentified: "Difficulty accessing information to resolve customer inquiries promptly.", suggestedSolutionsProductIds: ["customerInquiryManagement", "documentManagement"] }},
              { id: "L3_D2_Q1_A3", text: "We manage, but it feels like we're constantly firefighting rather than being proactive.", leadsToSolutionMapping: { painIdentified: "Reactive customer service due to inefficient inquiry management.", suggestedSolutionsProductIds: ["customerInquiryManagement"] }},
              { id: "L3_D2_Q1_A4", text: "We have a streamlined process and tools that enable fast, accurate responses.", isNotAligned: true },
            ]
          },
          // New L3 Questions for L2_D2
          {
            id: "L3_D2_Q2",
            text: "What are the most common types of customer inquiries your team handles?",
            answerOptions: [
              { id: "L3_D2_Q2_A1", text: "A lot are about order status, shipment tracking, or invoice copies.", leadsToSolutionMapping: { painIdentified: "High volume of routine inquiries (order status, invoices).", suggestedSolutionsProductIds: ["customerInquiryManagement", "orderManagement", "invoiceDelivery"] }},
              { id: "L3_D2_Q2_A2", text: "Many inquiries are complex and require investigation across multiple departments.", leadsToSolutionMapping: { painIdentified: "Complex customer inquiries requiring cross-departmental investigation.", suggestedSolutionsProductIds: ["customerInquiryManagement", "workflowManagement"] }},
              { id: "L3_D2_Q2_A3", text: "Product information requests are common, but our website isn't always helpful.", isNotAligned: true }, // Website issue
              { id: "L3_D2_Q2_A4", text: "Inquiry types vary greatly, but most are resolved quickly on first contact.", isNotAligned: true },
            ]
          },
          {
            id: "L3_D2_Q3",
            text: "How does your customer service team track and manage incoming inquiries from various channels (email, phone, portal)?",
            answerOptions: [
              { id: "L3_D2_Q3_A1", text: "We use a shared email inbox, but it's hard to prioritise or ensure follow-up.", leadsToSolutionMapping: { painIdentified: "Managing inquiries via shared inbox, leading to poor tracking.", suggestedSolutionsProductIds: ["customerInquiryManagement"] }},
              { id: "L3_D2_Q3_A2", text: "Different team members might handle the same inquiry without realising it.", leadsToSolutionMapping: { painIdentified: "Lack of centralised inquiry tracking causing duplication of effort.", suggestedSolutionsProductIds: ["customerInquiryManagement"] }},
              { id: "L3_D2_Q3_A3", text: "We don't have a unified view of all customer interactions.", leadsToSolutionMapping: { painIdentified: "No single view of customer interactions across channels.", suggestedSolutionsProductIds: ["customerInquiryManagement"] }},
              { id: "L3_D2_Q3_A4", text: "We use a CRM or dedicated helpdesk system that consolidates all inquiries.", isNotAligned: true },
            ]
          },
          {
            id: "L3_D2_Q4",
            text: "What tools or information sources does your customer service team primarily use to resolve inquiries?",
            answerOptions: [
              { id: "L3_D2_Q4_A1", text: "They have to log into multiple systems (ERP, shipping, CRM) to find answers.", leadsToSolutionMapping: { painIdentified: "CSRs needing to access multiple systems to resolve inquiries.", suggestedSolutionsProductIds: ["customerInquiryManagement", "documentManagement"] }}, // CIM for unified view, DM for knowledge base
              { id: "L3_D2_Q4_A2", text: "Information is often outdated or hard to find, leading to incorrect answers.", leadsToSolutionMapping: { painIdentified: "Outdated or inaccessible information hindering inquiry resolution.", suggestedSolutionsProductIds: ["customerInquiryManagement", "documentManagement"] }},
              { id: "L3_D2_Q4_A3", text: "There's no centralised knowledge base for common issues and solutions.", leadsToSolutionMapping: { painIdentified: "Lack of a centralised knowledge base for customer service.", suggestedSolutionsProductIds: ["customerInquiryManagement", "documentManagement"] }},
              { id: "L3_D2_Q4_A4", text: "Our team has quick access to all necessary, up-to-date information in one place.", isNotAligned: true },
            ]
          },
          {
            id: "L3_D2_Q5",
            text: "How do you measure customer satisfaction with your inquiry handling and problem resolution?",
            answerOptions: [
              { id: "L3_D2_Q5_A1", text: "We don't have a formal way to measure it, mostly rely on anecdotal feedback.", leadsToSolutionMapping: { painIdentified: "Lack of formal customer satisfaction measurement for service.", suggestedSolutionsProductIds: ["customerInquiryManagement"] }}, // CIM often has CSAT features
              { id: "L3_D2_Q5_A2", text: "We track metrics like first call resolution, but it's a manual reporting effort.", leadsToSolutionMapping: { painIdentified: "Manual tracking of customer service KPIs.", suggestedSolutionsProductIds: ["customerInquiryManagement"] }},
              { id: "L3_D2_Q5_A3", text: "We know there are issues, but find it hard to pinpoint specific areas for improvement.", isNotAligned: true },
              { id: "L3_D2_Q5_A4", text: "We use automated CSAT surveys and have dashboards for key service metrics.", isNotAligned: true },
            ]
          }
        ]
      }
    ],
  },
];


export const REVERSE_WATERFALL_CHEAT_SHEETS: EditableReverseWaterfallCheatSheets = {
  // Esker
  "accountsPayable": {
    objective: "Use these questions and aligning answers to validate if the customer is experiencing significant pains addressable by Esker Accounts Payable.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "It takes too long to process and pay supplier invoices (Accounts Payable).",
    keyDiscoveryPoints: [
      { question: "Could you describe how a supplier invoice gets from its arrival to the point where it's approved and paid?", aligningAnswer: "It's heavily paper-based, manual data entry, and physical routing for approvals." },
      { question: "How much visibility does your team have into the status of an invoice at any given time?", aligningAnswer: "Very little. We often have to manually search or ask around to find an invoice's status." },
      { question: "How are exceptions (e.g., price or quantity mismatches, missing POs) typically handled in your AP process?", aligningAnswer: "It's a lengthy back-and-forth email chain involving multiple departments." },
      { question: "What challenges do you face with month-end closing related to accounts payable?", aligningAnswer: "Accruing for unprocessed invoices is a major manual effort and often inaccurate." },
      { question: "What's your process for capturing early payment discounts from suppliers?", aligningAnswer: "We miss most discount opportunities due to slow invoice processing." },
    ],
  },
  "orderManagement": {
    objective: "Use these questions and aligning answers to uncover challenges addressable by Esker Order Management.",
    highLevelPain: "Inefficient Operations & Manual Processes",
    specificProcessPain: "We struggle to process customer orders quickly and accurately.",
    keyDiscoveryPoints: [
      { question: "How do customer orders typically arrive today (e.g., email, PDF, EDI)?", aligningAnswer: "Mostly via email as PDFs, requiring manual data entry into our system." },
      { question: "What percentage of your orders require some form of manual correction or clarification before processing?", aligningAnswer: "A significant percentage (e.g., >20%) need corrections, causing major delays." },
      { question: "How much visibility do you and your customers have into an order's status once it's submitted?", aligningAnswer: "Very little. Customers call us frequently for updates, and we have to check multiple places." },
      { question: "How are order confirmations and shipping notifications handled?", aligningAnswer: "These are largely manual processes, sometimes forgotten or sent late." },
      { question: "What's the impact on your business when orders are delayed or contain errors?", aligningAnswer: "Increased customer complaints, rush shipping costs, and sometimes lost sales." },
      { question: "How do you handle order prioritisation or expedite requests?", aligningAnswer: "It's an informal, often chaotic process relying on who shouts loudest." },
    ],
  },
  "customerInquiryManagement": {
    objective: "Identify inefficiencies in customer inquiry handling addressable by Esker Customer Inquiry Management.",
    highLevelPain: "Poor Supplier or Customer Relationships",
    specificProcessPain: "Customers are frustrated with order errors, delays, or slow responses to inquiries.",
    keyDiscoveryPoints: [
        { question: "How quickly and accurately are you able to respond to customer inquiries about orders, invoices, or products?", aligningAnswer: "Response times are slow, and often customers need to follow up multiple times." },
        { question: "What are the most common types of customer inquiries your team handles?", aligningAnswer: "A lot are about order status, shipment tracking, or invoice copies." },
        { question: "How does your customer service team track and manage incoming inquiries from various channels (email, phone, portal)?", aligningAnswer: "We use a shared email inbox, but it's hard to prioritise or ensure follow-up." },
        { question: "What tools or information sources does your customer service team primarily use to resolve inquiries?", aligningAnswer: "They have to log into multiple systems (ERP, shipping, CRM) to find answers." },
        { question: "How do you measure customer satisfaction with your inquiry handling and problem resolution?", aligningAnswer: "We don't have a formal way to measure it, mostly rely on anecdotal feedback." },
    ],
  },
  "cashApplication": {
    objective: "Uncover difficulties in applying customer payments addressable by Esker Cash Application.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
        { question: "Can you walk me through your current process for applying cash once a customer payment is received?", aligningAnswer: "It's highly manual, matching payments to invoices is slow and error-prone." },
        { question: "How do you currently handle remittances that don't match the invoice amount, like short payments or deductions?", aligningAnswer: "It's a very manual investigation process to identify and resolve them." }, // Also points to Claims & Deductions
        { question: "How easy is it for your finance team to get a clear, real-time picture of outstanding receivables and aging?", aligningAnswer: "Reporting is manual, time-consuming (e.g., spreadsheet-based), and often outdated." } // Also points to Collection Management
    ],
  },
  "collectionManagement": {
    objective: "Determine challenges in managing overdue accounts addressable by Esker Collection Management.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
        { question: "When you have overdue accounts, what does your collections process typically involve?", aligningAnswer: "It's ad-hoc, mainly reactive emails and calls when accounts become very overdue." },
        { question: "How easy is it for your finance team to get a clear, real-time picture of outstanding receivables and aging?", aligningAnswer: "Reporting is manual, time-consuming (e.g., spreadsheet-based), and often outdated." }
    ],
  },
  "creditManagement": {
    objective: "Identify bottlenecks and risks in customer credit processes addressable by Esker Credit Management.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).", // Or a more specific L2 like "Challenges in assessing creditworthiness"
    keyDiscoveryPoints: [
        { question: "How does your team manage situations where a customer is on credit hold but needs to place an urgent order?", aligningAnswer: "It's a chaotic, manual scramble to get credit release approved, often delaying orders." }
    ],
  },
  "claimsDeductions": {
    objective: "Explore issues related to managing customer claims/deductions addressable by Esker Claims & Deductions.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
        { question: "How do you currently handle remittances that don't match the invoice amount, like short payments or deductions?", aligningAnswer: "It's a very manual investigation process to identify and resolve them." }
    ],
  },
   "expenseManagement": {
    objective: "Uncover inefficiencies in expense reporting addressable by Esker Expense Management.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Difficulty managing and controlling company spend (Procurement & Expenses).",
    keyDiscoveryPoints: [
        { question: "How are employee expense reports currently submitted and processed?", aligningAnswer: "Employees submit paper receipts attached to spreadsheets, it's very manual." },
        { question: "How much visibility do you have into overall company spend before it occurs (i.e., committed spend)?", aligningAnswer: "Very little. We mostly see spend after invoices arrive or expenses are claimed." }
    ],
  },
   "procurement": {
    objective: "Identify challenges in purchase requisition and approval processes addressable by Esker Procurement.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Difficulty managing and controlling company spend (Procurement & Expenses).",
    keyDiscoveryPoints: [
        { question: "How does your team currently request and approve purchases?", aligningAnswer: "It's an informal email/verbal process, hard to track and often bypasses policy." },
        { question: "How much visibility do you have into overall company spend before it occurs (i.e., committed spend)?", aligningAnswer: "Very little. We mostly see spend after invoices arrive or expenses are claimed." },
        { question: "What challenges, if any, do you face with supplier onboarding and managing supplier information for procurement?", aligningAnswer: "Onboarding new suppliers is a slow, paper-heavy process." },
        { question: "How does your current procurement process support preferred supplier agreements or negotiated pricing?", aligningAnswer: "It's hard to ensure employees use preferred suppliers or get correct pricing." }
    ],
  },
  "invoiceDelivery": {
    objective: "Understand issues related to sending customer invoices and related communications addressable by Esker Invoice Delivery.",
    highLevelPain: "Poor Supplier or Customer Relationships", // Can also be Cash Flow
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).", // Or "Customers complain about invoice issues"
    keyDiscoveryPoints: [
        { question: "What's the most common reason customer payments are delayed or disputed, aside from inability to pay?", aligningAnswer: "Customers claim they never received the invoice or received it late." },
        { question: "Do your customers have a way to view their invoices, payment history, or raise disputes online without contacting your team?", aligningAnswer: "No, all inquiries come through phone or email, which is a big workload." }
    ],
  },
  "supplierManagement": {
    objective: "Explore difficulties in supplier onboarding, communication, and information management addressable by Esker Supplier Management.",
    highLevelPain: "Poor Supplier or Customer Relationships", // Can also be Ops or Finance
    specificProcessPain: "Our suppliers complain about late payments or lack of visibility into invoice status.",
    keyDiscoveryPoints: [
        { question: "How easy is it for suppliers to get updates on the status of their invoices?", aligningAnswer: "They frequently have to call or email our AP team, which is inefficient for everyone." },
        { question: "What is your process for onboarding new suppliers and collecting necessary documentation (e.g., banking details, tax forms)?", aligningAnswer: "It's a manual, often lengthy process involving emails and paper forms." },
        { question: "How do you communicate important updates or changes (e.g., policy changes, contact information) to your supplier base?", aligningAnswer: "Primarily through mass emails, but we're not sure everyone receives or reads them." },
        { question: "What feedback have you received from suppliers regarding your payment processes or communication?", aligningAnswer: "Suppliers complain about payment delays and the difficulty in getting status updates." },
        { question: "How do you manage supplier risk, such as financial stability, compliance, or performance issues?", aligningAnswer: "Risk assessment is informal and not consistently applied across all suppliers." }
    ],
  },
  // M-Files
  "documentManagement": {
    objective: "Use these questions and aligning answers to identify critical issues with document management addressable by M-Files.",
    highLevelPain: "Lack of Visibility, Control & Compliance Risk",
    specificProcessPain: "We can never find the right document when we need it, and it's impacting compliance.",
    keyDiscoveryPoints: [
      { question: "Where are your most critical business documents (like contracts, HR files, or project plans) stored today?", aligningAnswer: "They are scattered across shared drives, email inboxes, and local hard drives." },
      { question: "Tell me about a time you struggled to find a specific version of a document. What was the impact?", aligningAnswer: "Yes, it happens often. We've wasted time or used outdated information as a result." },
      { question: "How do you control who has access to sensitive information or confidential documents?", aligningAnswer: "Access controls are basic (e.g., shared drive permissions) and hard to manage granularly." },
      { question: "How do you collaborate on documents when multiple people need to provide input or approve them?", aligningAnswer: "Mostly by emailing attachments back and forth, which creates version chaos." },
      { question: "What are your main concerns regarding document retention policies and audit trails?", aligningAnswer: "We struggle to consistently apply retention policies across all our documents." }
    ],
  },
  // Nintex
  "processMapping": {
    objective: "Use these questions and aligning answers to see if the customer needs better process understanding, addressable by Nintex Process Mapping.",
    highLevelPain: "Inefficient Operations & Manual Processes",
    specificProcessPain: "Our internal workflows and processes are confusing and inconsistent.",
    keyDiscoveryPoints: [
      { question: "How do you currently document and share your standard operating procedures across the team?", aligningAnswer: "Documentation is outdated, hard to find, or non-existent for many processes." },
      { question: "When a process needs to be updated, what's involved in making that happen and communicating it effectively?", aligningAnswer: "It's a slow and cumbersome process to update documentation and ensure everyone is aware." },
      { question: "How do you identify bottlenecks or areas for improvement in your day-to-day workflows?", aligningAnswer: "It's mostly based on gut feel or when something goes significantly wrong." },
      { question: "Can you give an example of a business process that you feel takes more steps or handoffs than it should?", aligningAnswer: "We know some processes are inefficient, but haven't formally mapped them out." } // This question can also lead to Workflow.
    ],
  },
  "workflowManagement": {
    objective: "Identify opportunities to automate manual tasks and streamline processes with Nintex Workflow Management.",
    highLevelPain: "Inefficient Operations & Manual Processes",
    specificProcessPain: "Our internal workflows and processes are confusing and inconsistent.", 
    keyDiscoveryPoints: [
        { question: "How do you currently document and share your standard operating procedures across the team?", aligningAnswer: "We have SOPs, but they are static documents not easily updated or integrated into daily work." }, // This answer points to both Mapping and Workflow
        { question: "How do you identify bottlenecks or areas for improvement in your day-to-day workflows?", aligningAnswer: "We lack the data or tools to objectively analyse process performance." },
        { question: "Can you give an example of a business process that you feel takes more steps or handoffs than it should?", aligningAnswer: "Yes, [User describes a complex manual process, e.g., employee onboarding]." },
        { question: "How are tasks that require input or action from multiple people or departments currently managed and tracked?", aligningAnswer: "Mostly through email chains or shared spreadsheets, it's hard to see progress." }
    ],
  },
};

export const MODULE_SPECIFIC_SOLUTION_CONTENT: EditableModuleSolutionContentMap = {
  orderManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `The proposed Order Management automation solution, leveraging {partnerName}, is designed to streamline and optimise the critical order-to-cash cycle. By addressing inefficiencies in current order processing, this solution aims to significantly enhance operational throughput, reduce errors, and improve overall customer satisfaction.`,
    solutionOverviewDetails: `
      <p>Our proposed solution for <strong>{moduleName}</strong>, centred around <strong>{partnerName}'s AI-powered Order Management</strong> technology, offers a comprehensive approach to automating and optimising your entire order-to-cash process. This platform is designed to handle a high volume and variety of sales orders, regardless of their format (EDI, email, PDF, portal, fax) or channel.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intelligent Order Capture & Data Extraction:</strong> {partnerName} AI automatically captures orders from any source and accurately extracts relevant data using machine learning, significantly reducing manual data entry and associated errors. This accelerates the initial stages of order processing.</li>
        <li><strong>Automated Order Validation & Enrichment:</strong> The system intelligently validates orders against your business rules and ERP data (e.g., pricing, availability, customer details). Missing information can be automatically flagged or enriched, minimising exceptions and delays.</li>
        <li><strong>Streamlined Workflow & Exception Handling:</strong> Customisable workflows route orders for approval, manage exceptions, and provide full visibility into the order lifecycle. This ensures orders are processed efficiently and blockages are quickly resolved.</li>
        <li><strong>Seamless ERP Integration:</strong> {partnerName} provides deep, bidirectional integration with leading ERP systems, ensuring data consistency and eliminating the need for duplicate data entry. This creates a unified process from order receipt to fulfilment and invoicing.</li>
        <li><strong>Enhanced Visibility & Analytics:</strong> Real-time dashboards and comprehensive reporting provide insights into order statuses, processing times, team performance, and potential bottlenecks, enabling continuous process improvement.</li>
        <li><strong>Improved Customer & Staff Experience:</strong> By automating tedious manual tasks, your team can focus on value-added activities and customer service. Customers benefit from faster order confirmation, fewer errors, and proactive communication.</li>
      </ul>
      <p>This solution leverages technologies from {partnerName} for core process automation, ensuring a robust and scalable platform for your business needs.</p>
    `,
    coreElements: [
        `AI-powered order data capture from any format (email, EDI, PDF, portal).`,
        `Automated order validation and enrichment against ERP data.`,
        `Prioritised task management and exception handling workflows.`,
        `Real-time order status visibility for customers and internal teams.`,
        `Seamless ERP integration for end-to-end process flow.`
    ]
  },
  accountsPayable: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This Accounts Payable automation initiative, powered by {partnerName}, targets the reduction of manual effort and the improvement of financial controls within your AP department. The goal is to transform AP from a cost centre into a strategic function through enhanced efficiency and visibility.`,
    solutionOverviewDetails: `
      <p>The proposed Accounts Payable solution for <strong>{moduleName}</strong>, built upon <strong>{partnerName}'s Procure-to-Pay suite</strong>, automates the end-to-end invoice lifecycle. It addresses common AP challenges such as manual data entry, lengthy approval cycles, and lack of visibility.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Automated Invoice Capture & Data Entry:</strong> {partnerName} accurately captures invoices from any format (paper, PDF, EDI) and extracts data using AI, eliminating most manual keying.</li>
        <li><strong>Intelligent GL Coding & PO Matching:</strong> The system can suggest or automate GL coding and performs 2-way or 3-way matching against purchase orders and receipts.</li>
        <li><strong>Configurable Approval Workflows:</strong> Invoices are routed electronically based on your business rules, accelerating approvals and improving compliance.</li>
        <li><strong>Supplier Portal & Communication:</strong> A self-service portal for suppliers enhances communication and reduces inquiries to your AP team.</li>
        <li><strong>Mobile Accessibility & Analytics:</strong> Approve invoices and monitor performance on-the-go with mobile apps and gain insights through comprehensive dashboards.</li>
      </ul>
      <p>By implementing this solution, you can expect significant reductions in processing costs, improved DPO (Days Payable Outstanding), enhanced supplier relationships, and stronger financial controls.</p>
    `,
    coreElements: [
        `AI-driven invoice data capture and validation (OCR, machine learning).`,
        `Automated 2-way and 3-way Purchase Order matching.`,
        `Configurable electronic approval workflows with delegation and escalation.`,
        `Supplier portal for invoice status inquiries and dynamic discounting options.`,
        `Comprehensive accrual reporting and performance analytics dashboards.`
    ]
  },
  documentManagement: {
    technologyPartnerName: "M-Files",
    executiveSummaryBoilerplate: `The proposed Document Management solution, featuring {partnerName}, aims to revolutionise how your organisation manages and utilises critical business information. It focuses on breaking down data silos, ensuring compliance, and improving collaboration through intelligent information management.`,
    solutionOverviewDetails: `
      <p>Our solution for <strong>{moduleName}</strong> leverages the <strong>{partnerName} intelligent information management platform</strong>. {partnerName} organises and manages documents based on *what* they are, rather than *where* they're stored, connecting them with relevant business processes and data across systems.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Metadata-driven Architecture:</strong> {partnerName} uses metadata to classify, secure, and retrieve documents, enabling dynamic views and personalised access.</li>
        <li><strong>Repository Neutrality:</strong> Connect to and manage information across various existing repositories (e.g., network folders, SharePoint, ERPs) without requiring data migration.</li>
        <li><strong>Automated Workflows & Version Control:</strong> Streamline document-centric processes with built-in workflow capabilities and robust version history.</li>
        <li><strong>Compliance & Governance:</strong> Enforce access controls, retention policies, and audit trails to meet regulatory requirements.</li>
        <li><strong>Enhanced Collaboration & Search:</strong> Quickly find relevant information regardless of its location and collaborate securely on documents.</li>
      </ul>
      <p>With {partnerName}, you can transform your {moduleName} into a strategic asset, ensuring the right information is in the right hands at the right time.</p>
    `,
    coreElements: [
        `Metadata-driven architecture for dynamic content organisation.`,
        `Connectors to existing repositories (network folders, SharePoint, etc.) without data migration.`,
        `Automated version control, audit trails, and document lifecycle management.`,
        `Configurable workflows for document review, approval, and other processes.`,
        `Advanced search capabilities and role-based permissions for security.`
    ]
  },
  workflowManagement: {
    technologyPartnerName: "Nintex",
    executiveSummaryBoilerplate: `This Workflow Management solution, utilising the {partnerName} Process Platform, is designed to automate and optimise your core business processes. The objective is to increase operational agility, reduce manual interventions, and enhance overall process efficiency.`,
    solutionOverviewDetails: `
      <p>The proposed solution for <strong>{moduleName}</strong> is powered by the <strong>{partnerName} Process Platform</strong>, a leading solution for process automation and orchestration. {partnerName} allows for the rapid design, deployment, and management of workflows across your organisation.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intuitive Visual Workflow Design:</strong> Easily design and modify workflows using a drag-and-drop interface, requiring minimal to no code.</li>
        <li><strong>Broad Connectivity:</strong> Integrate workflows with a wide range of enterprise systems, cloud services, and content repositories.</li>
        <li><strong>Advanced Workflow Features:</strong> Implement complex logic, parallel approvals, task escalations, and automated actions.</li>
        <li><strong>Process Analytics & Optimisation:</strong> Gain insights into workflow performance to identify bottlenecks and areas for improvement.</li>
        <li><strong>Robotic Process Automation (RPA):</strong> {partnerName} often includes RPA capabilities to automate repetitive, rules-based tasks within your workflows.</li>
      </ul>
      <p>By leveraging {partnerName} for {moduleName}, you can drive significant improvements in productivity, consistency, and compliance across your business operations.</p>
    `,
    coreElements: [
        `Intuitive, drag-and-drop visual workflow designer.`,
        `Extensive connectors for integrating with enterprise systems and cloud services.`,
        `Customisable forms for data capture and user interaction within processes.`,
        `Process analytics and reporting for monitoring performance and identifying bottlenecks.`,
        `Support for complex logic, parallel tasks, and escalations.`
    ]
  },
  processMapping: {
    technologyPartnerName: "Nintex",
     executiveSummaryBoilerplate: `The Process Mapping initiative, supported by {partnerName}'s capabilities, aims to provide clear visibility into your current business processes. This foundational step is crucial for identifying inefficiencies, standardising operations, and planning effective automation strategies.`,
    solutionOverviewDetails: `
      <p>For <strong>{moduleName}</strong>, we propose utilising tools and methodologies often found within the <strong>{partnerName} Process Platform</strong>, such as {partnerName} Process Manager (formerly Promapp®). These tools facilitate collaborative process mapping and documentation.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Collaborative Process Documentation:</strong> Engage teams to easily capture, map, and maintain business processes in a central, accessible repository.</li>
        <li><strong>Standardised Process Visualisation:</strong> Create clear, consistent process maps that are easy for all stakeholders to understand.</li>
        <li><strong>Process Improvement & Feedback:</strong> Enable continuous improvement by allowing users to provide feedback and suggestions directly on process maps.</li>
        <li><strong>Risk & Compliance Management:</strong> Link processes to risks and controls, aiding in compliance efforts.</li>
        <li><strong>Foundation for Automation:</strong> Well-documented processes are essential for successful workflow automation and RPA initiatives.</li>
      </ul>
      <p>Effective {moduleName} using {partnerName} tools provides the clarity needed to optimise operations and drive digital transformation.</p>
    `,
    coreElements: [
        `Collaborative, web-based platform for process mapping and documentation.`,
        `Standardised notation and visualisation for clear process understanding.`,
        `Version control and change management for process documentation.`,
        `Mechanisms for process feedback, improvement suggestions, and ownership.`,
        `Ability to link processes to risks, compliance requirements, and systems.`
    ]
  },
  default: { 
    technologyPartnerName: "leading automation technologies",
    executiveSummaryBoilerplate: `This automation solution for {moduleName}, utilising {partnerName}, is designed to address key challenges within this process area, aiming to enhance efficiency, reduce manual effort, and improve overall operational performance.`,
    solutionOverviewDetails: `
      <p>The proposed solution for <strong>{moduleName}</strong> will leverage best-in-class automation technologies, such as {partnerName}, to streamline your current processes. While specific features will be tailored to your unique requirements, the general approach involves:</p>
      <ul>
        <li>Automating repetitive data entry and validation tasks.</li>
        <li>Implementing intelligent workflows for approvals and exception handling.</li>
        <li>Providing enhanced visibility and control over the process.</li>
        <li>Integrating with existing systems to ensure data consistency.</li>
      </ul>
      <p>Further details and specific capabilities can be discussed and customised based on a deeper understanding of your requirements for {moduleName}.</p>
    `,
    coreElements: [
        `Automates key tasks within the {moduleName} process.`,
        `Designed to reduce manual effort and improve accuracy for {moduleName}.`,
        `Offers workflows to streamline operations related to {moduleName}.`,
        `Aims to provide better visibility and control over {moduleName} activities.`,
        `Integrates with relevant systems to ensure data consistency for {moduleName}.`
    ]
  }
};

// Ensure all modules have an entry in MODULE_SPECIFIC_SOLUTION_CONTENT
ALL_MODULES.forEach(module => {
    if (!MODULE_SPECIFIC_SOLUTION_CONTENT[module.id]) {
        const partnerNameString = module.technologyPartner && module.technologyPartner !== "Generic" 
            ? module.technologyPartner 
            : "leading automation platforms";
        
        MODULE_SPECIFIC_SOLUTION_CONTENT[module.id] = {
            technologyPartnerName: partnerNameString as ModuleSolutionContent['technologyPartnerName'],
            executiveSummaryBoilerplate: `This automation solution for {moduleName}, utilising {partnerName}, is designed to address key challenges within this process area, aiming to enhance efficiency, reduce manual effort, and improve overall operational performance.`,
            solutionOverviewDetails: `
              <p>The proposed solution for <strong>{moduleName}</strong> will leverage best-in-class automation technologies, such as {partnerName}, to streamline your current processes. While specific features will be tailored to your unique requirements, the general approach involves:</p>
              <ul>
                <li>Automating repetitive data entry and validation tasks.</li>
                <li>Implementing intelligent workflows for approvals and exception handling.</li>
                <li>Providing enhanced visibility and control over the process.</li>
                <li>Integrating with existing systems to ensure data consistency.</li>
              </ul>
              <p>Further details and specific capabilities can be discussed and customised based on a deeper understanding of your requirements for {moduleName}.</p>
            `,
            coreElements: [
              `Automates key tasks within the {moduleName} process.`,
              `Designed to reduce manual effort and improve accuracy for {moduleName}.`,
              `Offers workflows to streamline operations related to {moduleName}.`,
              `Aims to provide better visibility and control over {moduleName} activities.`,
              `Integrates with relevant systems to ensure data consistency for {moduleName}.`
            ]
        };
    }
});

// Ensure all product modules have a fallback in REVERSE_WATERFALL_CHEAT_SHEETS if not explicitly defined
ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.forEach(module => {
    if (!REVERSE_WATERFALL_CHEAT_SHEETS[module.id]) {
        REVERSE_WATERFALL_CHEAT_SHEETS[module.id] = {
            objective: `Use these questions to validate if the customer is experiencing significant pains addressable by ${module.technologyPartner ? module.technologyPartner + ' ' : ''}${module.name}.`,
            highLevelPain: "Generic Business Challenge", 
            specificProcessPain: `Inefficiencies in ${module.name}`, 
            keyDiscoveryPoints: [
                { question: `Can you describe your current process for ${module.name}?`, aligningAnswer: "It's highly manual and causes significant delays or errors." }, 
                { question: `What are the biggest challenges you face with ${module.name}?`, aligningAnswer: "Lack of visibility and control, leading to compliance issues or poor performance." } 
            ],
        };
    }
});