
import { Role, AutomationType, Module, TabId, ScorecardQuestion, QualificationQuestion, QualificationStatus, DiscoveryQuestion, RoiInput, AppState, ExportFormat, TabDefinition } from './types';
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

// Updated Discovery Questions from OCR
export const DISCOVERY_QUESTIONS_TEMPLATES: Record<string, { qualitative: DiscoveryQuestion[], quantitative: DiscoveryQuestion[] }> = {
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_1", text: "Describe your current invoice approval workflow. What are the biggest bottlenecks?" },
      { id: "ap_qual_2", text: "What is the biggest pain point in your current AP process?" },
      { id: "ap_qual_3", text: "How do you currently handle exceptions and discrepancies in invoices?" },
      { id: "ap_qual_4", text: "What is the impact of invoice processing delays on your financial reporting and supplier relationships?" },
      { id: "ap_qual_5", text: "How do you ensure compliance with internal controls and audit trails for AP?" },
      { id: "ap_qual_6", text: "Describe your process for onboarding new suppliers and managing their information." },
      { id: "ap_qual_7", text: "What systems are you currently using for accounting/ERP and invoice processing?" },
      { id: "ap_qual_8", text: "What is your strategic vision for the future of your accounts payable function?" },
      { id: "ap_qual_9", text: "How do you handle supplier inquiries about payment status, and how much time does this consume?" },
      { id: "ap_qual_10", text: "What are the risks associated with your current AP process (e.g., fraud, errors)?" },
    ],
    quantitative: [
      { id: "ap_quant_1", text: "How many invoices do you process per month?" },
      { id: "ap_quant_2", text: "What percentage of your invoices are received electronically vs. paper?" },
      { id: "ap_quant_3", text: "What is your average cost to process a single invoice?" },
      { id: "ap_quant_4", text: "How many FTEs are dedicated to the AP process?" },
      { id: "ap_quant_5", text: "What is your on-time payment percentage for suppliers?" },
      { id: "ap_quant_6", text: "What is the value of early payment discounts you miss annually?" },
      { id: "ap_quant_7", text: "How much time does your team spend on manual data entry from invoices?" },
      { id: "ap_quant_8", text: "What is the average time (in days) to get an invoice approved?" },
      { id: "ap_quant_9", text: "How many people are typically involved in an invoice approval workflow?" },
      { id: "ap_quant_10", text: "How many supplier payment-related inquiries do you receive per week?" },
    ],
  },
  orderManagement: {
    qualitative: [
        { id: "om_qual_1", text: "Describe your end-to-end order management process, from receipt to fulfilment. Where are the primary bottlenecks?" },
        { id: "om_qual_2", text: "What are the most common reasons for order processing delays or errors?" },
        { id: "om_qual_3", text: "How do you handle complex orders, such as those with special pricing, custom configurations, or multiple delivery locations?" },
        { id: "om_qual_4", text: "What is the customer experience like when they inquire about an order status? How is that information accessed?" },
        { id: "om_qual_5", text: "How do you manage communication between sales, customer service, and fulfilment teams regarding orders?" },
        { id: "om_qual_6", text: "What is your process for handling order exceptions, such as credit holds, stock-outs, or shipping issues?" },
        { id: "om_qual_7", text: "How adaptable is your current process to new sales channels or business models (e.g., e-commerce, subscriptions)?" },
        { id: "om_qual_8", text: "What are the biggest challenges in providing customers with real-time visibility into their orders?" },
        { id: "om_qual_9", text: "How do you measure customer satisfaction with the order process?" },
        { id: "om_qual_10", text: "What is your strategic goal for improving the overall customer order experience?" },
    ],
    quantitative: [
        { id: "om_quant_1", text: "How many sales orders do you process per month?" },
        { id: "om_quant_2", text: "What is the average number of lines per order?" },
        { id: "om_quant_3", text: "What percentage of orders are received manually (email, phone) vs. electronically (EDI, portal)?" },
        { id: "om_quant_4", text: "What is the average time (in minutes) required to manually enter one order?" },
        { id: "om_quant_5", text: "What is your current order accuracy rate (i.e., percentage of orders processed without any errors)?" },
        { id: "om_quant_6", text: "What is the average cost to remediate an order error (including shipping, returns, and labour)?" },
        { id: "om_quant_7", text: "How many FTEs are dedicated to manual order entry and processing?" },
        { id: "om_quant_8", text: "What is your average order cycle time (from receipt to ready-for-shipment) in hours?" },
        { id: "om_quant_9", text: "How many order status inquiries do you receive per week?" },
        { id: "om_quant_10", text: "What percentage of your orders result in a dispute or claim later in the process?" },
    ]
  },
  customerInquiryManagement: {
    qualitative: [
        { id: "cim_qual_1", text: "What are the top 3-5 types of customer inquiries you receive most frequently?" },
        { id: "cim_qual_2", text: "Describe the typical journey of a customer inquiry from the moment it's received to when it's resolved." },
        { id: "cim_qual_3", text: "How do your agents find the information needed to answer inquiries? What systems do they access?" },
        { id: "cim_qual_4", text: "What is the process for handling an inquiry that the first agent cannot resolve?" },
        { id: "cim_qual_5", text: "How do you ensure consistent and accurate answers are provided across your team and channels?" },
        { id: "cim_qual_6", text: "What are the biggest frustrations for your agents when handling customer inquiries?" },
        { id: "cim_qual_7", text: "How do you gather feedback from customers about their service experience?" },
        { id: "cim_qual_8", text: "What is the impact on the business when inquiry resolution is slow or inaccurate?" },
        { id: "cim_qual_9", text: "How do you identify trends or root causes from the inquiries you receive?" },
        { id: "cim_qual_10", text: "What level of self-service capability do you currently offer customers to find answers themselves?" },
    ],
    quantitative: [
        { id: "cim_quant_1", text: "How many customer inquiries do you receive per month across all channels (email, phone, portal)?" },
        { id: "cim_quant_2", text: "What is your average First Contact Resolution (FCR) rate?" },
        { id: "cim_quant_3", text: "What is the average handling time (AHT) for an inquiry, in minutes?" },
        { id: "cim_quant_4", text: "How many FTEs are dedicated to responding to customer inquiries?" },
        { id: "cim_quant_5", text: "What is your target response time (SLA) for different inquiry types?" },
        { id: "cim_quant_6", text: "What is your current Customer Satisfaction (CSAT) or Net Promoter Score (NPS) for customer service?" },
        { id: "cim_quant_7", text: "What percentage of inquiries are escalated to a senior team member or manager?" },
        { id: "cim_quant_8", text: "What is the cost of labour per inquiry (AHT * agent hourly rate)?" },
        { id: "cim_quant_9", text: "How many inquiries, on average, does a single agent handle per day?" },
        { id: "cim_quant_10", text: "What is the ratio of inquiries to the number of orders or active customers?" },
    ]
  },
  cashApplication: {
    qualitative: [
        { id: "ca_qual_1", text: "Describe the process of matching a payment to open invoices. What makes this difficult?" },
        { id: "ca_qual_2", text: "How do you receive remittance advice from customers? (e.g., email attachments, web portal downloads, EDI)" },
        { id: "ca_qual_3", text: "What happens when a customer sends a payment without remittance information?" },
        { id: "ca_qual_4", text: "How are deductions, short-pays, and other exceptions identified and coded during cash application?" },
        { id: "ca_qual_5", text: "What is the impact on the collections team when cash is not applied promptly and accurately?" },
        { id: "ca_qual_6", text: "How much manual effort is involved in processing lockbox files or bank statements?" },
        { id: "ca_qual_7", text: "What are the main challenges in reconciling applied cash with your bank accounts?" },
        { id: "ca_qual_8", text: "How does your current process handle payments that cover invoices across multiple business units or currencies?" },
        { id: "ca_qual_9", text: "What visibility does the credit team have into a customer's payment status?" },
        { id: "ca_qual_10", text: "What are the primary goals for improving your cash application process?" },
    ],
    quantitative: [
        { id: "ca_quant_1", text: "How many payments do you process per month?" },
        { id: "ca_quant_2", text: "What percentage of payments are currently applied automatically (touch-free)?" },
        { id: "ca_quant_3", text: "What is the average time (in minutes) to manually research and apply a single payment with exceptions?" },
        { id: "ca_quant_4", text: "How many unapplied cash items are open at the end of an average month?" },
        { id: "ca_quant_5", text: "What is the total value of unapplied cash at month-end?" },
        { id: "ca_quant_6", text: "How many FTEs are dedicated to the cash application process?" },
        { id: "ca_quant_7", text: "What are your bank lockbox fees per month/year?" },
        { id: "ca_quant_8", text: "What percentage of remittance data needs to be manually keyed from a document or image?" },
        { id: "ca_quant_9", text: "How many distinct ERPs or billing systems are you applying cash against?" },
        { id: "ca_quant_10", text: "By how many days does manual cash application delay the update of a customer's true outstanding balance?" },
    ]
  },
  collectionManagement: {
    qualitative: [
        { id: "cm_qual_1", text: "Describe your standard collections strategy. How do you segment customers for different treatments?" },
        { id: "cm_qual_2", text: "What triggers a collections activity for an overdue invoice?" },
        { id: "cm_qual_3", text: "How do your collectors prioritise their work each day?" },
        { id: "cm_qual_4", text: "What information do your collectors need to be effective, and how easily can they access it?" },
        { id: "cm_qual_5", text: "How are disputes that are identified during collections routed and resolved?" },
        { id: "cm_qual_6", text: "Describe the process for managing and tracking payment promises." },
        { id: "cm_qual_7", text: "How does the collections team collaborate with the sales department on sensitive accounts?" },
        { id: "cm_qual_8", text: "What are the biggest challenges your collectors face in their day-to-day work?" },
        { id: "cm_qual_9", text: "How do you measure the performance and effectiveness of your collections team?" },
        { id: "cm_qual_10", text: "What is your approach to maintaining positive customer relationships while collecting debt?" },
    ],
    quantitative: [
        { id: "cm_quant_1", text: "What is your current average Days Sales Outstanding (DSO)?" },
        { id: "cm_quant_2", text: "What is the total value of your accounts receivable over 90 days past due?" },
        { id: "cm_quant_3", text: "How many FTEs are dedicated to collections activities?" },
        { id: "cm_quant_4", text: "What is your Collection Effectiveness Index (CEI)?" },
        { id: "cm_quant_5", text: "What is the average number of collection 'touches' (calls, emails) per month?" },
        { id: "cm_quant_6", text: "What percentage of your AR portfolio is typically past due?" },
        { id: "cm_quant_7", text: "What is the total amount of bad debt you write off annually?" },
        { id: "cm_quant_8", text: "What is the cost of third-party collection agency fees per year?" },
        { id: "cm_quant_9", text: "How much time do collectors spend on administrative tasks (e.g., preparing reports, finding contact info) vs. actual customer contact?" },
        { id: "cm_quant_10", text: "What percentage of disputes are identified through collections activities?" },
    ]
  },
  creditManagement: {
    qualitative: [
        { id: "crm_qual_1", text: "Describe your process for assessing a new customer's creditworthiness. What information do you use?" },
        { id: "crm_qual_2", text: "How are credit limits determined and reviewed?" },
        { id: "crm_qual_3", text: "What is the process for placing a customer on credit hold, and what is the business impact?" },
        { id: "crm_qual_4", text: "How do you balance the need for sales growth with the risk of bad debt?" },
        { id: "crm_qual_5", text: "How does the credit team communicate with sales and customer service?" },
        { id: "crm_qual_6", text: "What are the biggest challenges in getting timely and accurate credit information?" },
        { id: "crm_qual_7", text: "How do you monitor the credit risk of your existing customer base?" },
        { id: "crm_qual_8", text: "What tools or systems are used for credit management today?" },
        { id: "crm_qual_9", text: "How do you handle credit management for international customers or different business units?" },
        { id: "crm_qual_10", text: "What is your long-term strategy for proactive credit risk management?" },
    ],
    quantitative: [
        { id: "crm_quant_1", text: "How many new credit applications do you process per month?" },
        { id: "crm_quant_2", text: "What is the average time (in hours or days) to approve a new credit application?" },
        { id: "crm_quant_3", text: "How many FTEs are dedicated to credit management?" },
        { id: "crm_quant_4", text: "What is your total annual bad debt write-off amount?" },
        { id: "crm_quant_5", text: "What percentage of your revenue is impacted by orders on credit hold each month?" },
        { id: "crm_quant_6", text: "How often are customer credit limits reviewed?" },
        { id: "crm_quant_7", text: "What is the cost of your third-party credit reporting services annually?" },
        { id: "crm_quant_8", text: "What percentage of credit decisions are fully automated vs. requiring manual review?" },
        { id: "crm_quant_9", text: "How many credit limit increase requests do you process per month?" },
        { id: "crm_quant_10", text: "What is the value of sales orders lost or delayed due to slow credit approvals?" },
    ]
  },
  claimsDeductions: {
    qualitative: [
        { id: "cd_qual_1", text: "What are the most common types of claims and deductions you deal with (e.g., shortages, promotions, pricing)?" },
        { id: "cd_qual_2", text: "Describe the process from when a deduction is taken by a customer to when it is resolved." },
        { id: "cd_qual_3", text: "How do you gather the necessary backup documentation (e.g., proof of delivery, promotional agreements) to validate a claim?" },
        { id: "cd_qual_4", text: "What are the biggest challenges in identifying the root cause of deductions?" },
        { id: "cd_qual_5", text: "How do you collaborate with other departments (sales, logistics) to resolve claims?" },
        { id: "cd_qual_6", text: "What is the process for disputing and recovering invalid deductions?" },
        { id: "cd_qual_7", text: "What visibility do you have into deduction trends and their financial impact?" },
        { id: "cd_qual_8", text: "How much manual effort is involved in coding and processing deductions in your ERP?" },
        { id: "cd_qual_9", text: "What is the impact of unresolved deductions on your cash flow and DSO?" },
        { id: "cd_qual_10", text: "What are your strategic goals for reducing the overall volume of claims and deductions?" },
    ],
    quantitative: [
        { id: "cd_quant_1", text: "How many deductions do you process per month?" },
        { id: "cd_quant_2", text: "What is the total dollar value of deductions processed per month?" },
        { id: "cd_quant_3", text: "What percentage of deductions are eventually determined to be invalid?" },
        { id: "cd_quant_4", text: "Of the invalid deductions, what percentage are successfully recovered?" },
        { id: "cd_quant_5", text: "What is the average time (in days) to resolve a deduction from start to finish (DDO)?" },
        { id: "cd_quant_6", text: "How many FTEs are dedicated to managing claims and deductions?" },
        { id: "cd_quant_7", text: "What is the average value of a single deduction?" },
        { id: "cd_quant_8", text: "What is the value of promotional deductions vs. non-promotional deductions?" },
        { id: "cd_quant_9", text: "How much time is spent manually researching a single complex deduction?" },
        { id: "cd_quant_10", text: "What is the value of deductions written off each year?" },
    ]
  },
  expenseManagement: {
    qualitative: [
        { id: "em_qual_1", text: "Describe your current expense reporting process for employees. What are their biggest frustrations?" },
        { id: "em_qual_2", text: "What is the approval workflow for an expense report? Where are the typical delays?" },
        { id: "em_qual_3", text: "How do you ensure expense claims comply with company policy?" },
        { id: "em_qual_4", text: "What are the challenges with collecting and managing physical receipts?" },
        { id: "em_qual_5", text: "How is corporate credit card data reconciled with expense reports?" },
        { id: "em_qual_6", text: "What visibility does the finance team have into employee spend before it's been reported?" },
        { id: "em_qual_7", text: "How do you handle out-of-policy expense requests or exceptions?" },
        { id: "em_qual_8", text: "What are the biggest pain points for your AP/finance team when processing expense reports?" },
        { id: "em_qual_9", text: "How do you analyse spending patterns to identify potential savings or policy improvements?" },
        { id: "em_qual_10", text: "What is your strategy for improving the employee experience and control around T&E spending?" },
    ],
    quantitative: [
        { id: "em_quant_1", text: "How many expense reports do you process per month?" },
        { id: "em_quant_2", text: "What is the average number of line items per expense report?" },
        { id: "em_quant_3", text: "How long does it take an employee, on average, to complete and submit an expense report (in minutes)?" },
        { id: "em_quant_4", text: "How long does it take for an expense report to be fully processed and reimbursed (in days)?" },
        { id: "em_quant_5", text: "What is the average cost to process a single expense report?" },
        { id: "em_quant_6", text: "How many FTEs in your finance/AP team are involved in processing expense reports?" },
        { id: "em_quant_7", text: "What percentage of expense reports are returned to employees for correction?" },
        { id: "em_quant_8", text: "What is the value of out-of-policy spend identified per year?" },
        { id: "em_quant_9", text: "How much is spent on overnight shipping for receipts or reports?" },
        { id: "em_quant_10", text: "What percentage of expenses are submitted via a mobile device?" },
    ]
  },
  procurement: {
    qualitative: [
        { id: "proc_qual_1", text: "Describe your procure-to-pay (P2P) process from requisition to payment. Where are the biggest challenges?" },
        { id: "proc_qual_2", text: "How do employees request goods or services? Is there a standard, easy-to-use process?" },
        { id: "proc_qual_3", text: "What is your approval process for purchase requisitions?" },
        { id: "proc_qual_4", text: "How do you ensure employees are buying from preferred suppliers at negotiated prices?" },
        { id: "proc_qual_5", text: "What are the main causes of 'maverick' or off-contract spending?" },
        { id: "proc_qual_6", text: "How do you manage supplier catalogs and ensure pricing is up-to-date?" },
        { id: "proc_qual_7", text: "What is the process for creating a purchase order after a requisition is approved?" },
        { id: "proc_qual_8", text: "How do you track goods receipt against purchase orders?" },
        { id: "proc_qual_9", text: "What are the biggest challenges in matching invoices to purchase orders (2-way or 3-way match)?" },
        { id: "proc_qual_10", text: "What are your key goals for gaining better control and visibility over company spend?" },
    ],
    quantitative: [
        { id: "proc_quant_1", text: "How many purchase requisitions/orders do you process per month?" },
        { id: "proc_quant_2", text: "What is the average cost to process a single purchase order?" },
        { id: "proc_quant_3", text: "What percentage of your indirect spend is 'maverick' or off-contract?" },
        { id: "proc_quant_4", text: "How many FTEs are involved in the procurement and PO processing function?" },
        { id: "proc_quant_5", text: "What is your PO-to-invoice match rate?" },
        { id: "proc_quant_6", text: "How much time is spent manually correcting PO or invoice mismatch errors?" },
        { id: "proc_quant_7", text: "What percentage of your spend is with your top 10 suppliers?" },
        { id: "proc_quant_8", text: "What is the average cycle time from requisition to PO dispatch (in days)?" },
        { id: "proc_quant_9", text: "How many suppliers are in your active master file?" },
        { id: "proc_quant_10", text: "What is the value of missed volume discounts or rebates annually?" },
    ]
  },
  invoiceDelivery: {
    qualitative: [
        { id: "id_qual_1", text: "Describe your process for creating and sending customer invoices. Is it automated or manual?" },
        { id: "id_qual_2", text: "What different formats and delivery channels do you need to support for your customers (e.g., print, email PDF, portal upload, EDI)?" },
        { id: "id_qual_3", text: "What are the biggest challenges in meeting diverse customer e-invoicing requirements?" },
        { id: "id_qual_4", text: "How do you handle and track invoice delivery failures or rejections?" },
        { id: "id_qual_5", text: "What is the customer experience when they have a question about an invoice they've received?" },
        { id: "id_qual_6", text: "How much manual effort is involved in posting invoices to customer AP portals?" },
        { id: "id_qual_7", text: "What visibility do you have to confirm that a customer has actually received and viewed their invoice?" },
        { id: "id_qual_8", text: "How does your invoice delivery process impact your Days Sales Outstanding (DSO)?" },
        { id: "id_qual_9", text: "What are the main reasons for invoice disputes, and could they be prevented at the delivery stage?" },
        { id: "id_qual_10", text: "What is your strategy for migrating more customers from paper to electronic invoicing?" },
    ],
    quantitative: [
        { id: "id_quant_1", text: "How many customer invoices do you send per month?" },
        { id: "id_quant_2", text: "What is the average cost to print and mail a single paper invoice?" },
        { id: "id_quant_3", text: "What percentage of your invoices are sent electronically (email, EDI, portal)?" },
        { id: "id_quant_4", text: "How many FTEs are involved in the invoice creation and delivery process?" },
        { id: "id_quant_5", text: "How many customer AP portals do you have to manually upload invoices into?" },
        { id: "id_quant_6", text: "What is the error rate for invoices that are rejected by customers due to formatting or data issues?" },
        { id: "id_quant_7", text: "How much time (in minutes) is spent on average resolving a single delivery failure?" },
        { id: "id_quant_8", text: "What is your current average DSO?" },
        { id: "id_quant_9", text: "How many customer inquiries are related to not having received an invoice?" },
        { id: "id_quant_10", text: "What is the cost of materials (paper, envelopes, toner) for invoicing per year?" },
    ]
  },
  supplierManagement: {
    qualitative: [
        { id: "sm_qual_1", text: "Describe your process for onboarding a new supplier. What information do you collect and how?" },
        { id: "sm_qual_2", text: "How do you manage and maintain the accuracy of your supplier master data?" },
        { id: "sm_qual_3", text: "What are the biggest risks associated with your current supplier onboarding process (e.g., fraud, compliance)?" },
        { id: "sm_qual_4", text: "How do you manage supplier compliance documents (e.g., certificates of insurance, tax forms)?" },
        { id: "sm_qual_5", text: "What is the process for suppliers to update their information (e.g., bank details, address)?" },
        { id: "sm_qual_6", text: "How do you segment your suppliers and manage relationships with strategic partners?" },
        { id: "sm_qual_7", text: "What level of self-service capability do you offer your suppliers?" },
        { id: "sm_qual_8", text: "How do you communicate with your supplier base about policies, performance, or other important updates?" },
        { id: "sm_qual_9", text: "What are the main challenges in ensuring a single, accurate view of each supplier across your organisation?" },
        { id: "sm_qual_10", text: "What are your primary goals for improving supplier collaboration and reducing supply chain risk?" },
    ],
    quantitative: [
        { id: "sm_quant_1", text: "How many active suppliers are in your master file?" },
        { id: "sm_quant_2", text: "How many new suppliers do you onboard per year?" },
        { id: "sm_quant_3", text: "How long does it take (in days) to fully onboard a new supplier?" },
        { id: "sm_quant_4", text: "How many FTEs are involved in managing supplier data and onboarding?" },
        { id: "sm_quant_5", text: "What percentage of your supplier records are estimated to be duplicates or contain outdated information?" },
        { id: "sm_quant_6", text: "How many fraudulent or incorrect supplier payments have you experienced in the last year?" },
        { id: "sm_quant_7", text: "What is the average time (in hours) spent manually verifying a new supplier's details?" },
        { id: "sm_quant_8", text: "How many supplier-related inquiries (e.g., 'update my details') do you handle per week?" },
        { id: "sm_quant_9", text: "What percentage of your suppliers are onboarded via a self-service portal vs. manually?" },
        { id: "sm_quant_10", text: "What is the cost associated with a single payment error due to incorrect supplier data?" },
    ]
  },
  documentManagement: {
    qualitative: [
        { id: "dm_qual_1", text: "How are your critical business documents currently stored and organised, and what are the challenges with that approach?" },
        { id: "dm_qual_2", text: "Describe the process for reviewing and approving documents. Where are the bottlenecks?" },
        { id: "dm_qual_3", text: "What are the consequences of not being able to find a document when needed?" },
        { id: "dm_qual_4", text: "How do you control access to sensitive documents and what are your concerns around security?" },
        { id: "dm_qual_5", text: "Describe your process for collaborating on documents with both internal and external stakeholders." },
        { id: "dm_qual_6", text: "What are the challenges with accessing documents when working remotely or on mobile devices?" },
        { id: "dm_qual_7", text: "How do you manage document retention and disposal policies for compliance?" },
        { id: "dm_qual_8", text: "What integrations exist between your current document storage and other business systems (e.g., CRM, ERP)?" },
        { id: "dm_qual_9", text: "What is your process for onboarding a new employee and giving them access to the right information?" },
        { id: "dm_qual_10", text: "What are your top 3 goals for improving how you manage your organisation's information and documents?" },
    ],
    quantitative: [
        { id: "dm_quant_1", text: "What is the estimated volume of new documents created or received daily/weekly?" },
        { id: "dm_quant_2", text: "How much time do employees spend searching for documents on average per week?" },
        { id: "dm_quant_3", text: "What is the total number of employees who regularly handle or search for documents?" },
        { id: "dm_quant_4", text: "How much physical office space (in square metres) is dedicated to paper document storage?" },
        { id: "dm_quant_5", text: "What is the annual cost of offsite document storage, if any?" },
        { id: "dm_quant_6", text: "How many compliance or audit-related requests for documents do you handle per year?" },
        { id: "dm_quant_7", text: "What is the estimated cost of a single compliance breach related to document mismanagement?" },
        { id: "dm_quant_8", text: "What is the annual cost of printing, copying, and mailing documents?" },
        { id: "dm_quant_9", text: "What is the error rate (%) for documents filed or processed manually?" },
        { id: "dm_quant_10", text: "How long (in days) is the average lifecycle of a contract from creation to signature?" },
    ]
  },
  workflowManagement: {
    qualitative: [
        { id: "wm_qual_1", text: "Which of your current business processes are the most manual and time-consuming?" },
        { id: "wm_qual_2", text: "Describe a key approval process (e.g., CapEx request, new hire onboarding, contract review). Where are the delays?" },
        { id: "wm_qual_3", text: "How are tasks and responsibilities assigned and tracked in your current workflows?" },
        { id: "wm_qual_4", text: "What is the visibility into the status of a process? Can you easily see where a task is stuck?" },
        { id: "wm_qual_5", text: "How do you handle exceptions or deviations from the standard process?" },
        { id: "wm_qual_6", text: "What is the employee experience like when they have to participate in these manual processes?" },
        { id: "wm_qual_7", text: "How easy or difficult is it to change an existing process when business needs evolve?" },
        { id: "wm_qual_8", text: "How do you ensure processes are followed consistently and comply with internal policies?" },
        { id: "wm_qual_9", text: "What is the impact of process bottlenecks on your department's or the company's goals?" },
        { id: "wm_qual_10", text: "What are your key objectives for implementing workflow automation?" },
    ],
    quantitative: [
        { id: "wm_quant_1", text: "How many forms or requests are processed manually per month for a key workflow?" },
        { id: "wm_quant_2", text: "What is the average end-to-end cycle time for that workflow (in days or hours)?" },
        { id: "wm_quant_3", text: "What is the error rate (%) for tasks completed manually within the process?" },
        { id: "wm_quant_4", text: "How many FTEs are involved in managing or executing this specific workflow?" },
        { id: "wm_quant_5", text: "How much time do managers spend on average approving or re-routing tasks per week?" },
        { id: "wm_quant_6", text: "What is the cost associated with errors or rework in this process annually?" },
        { id: "wm_quant_7", text: "How many email follow-ups or status update requests occur for a single instance of the workflow?" },
        { id: "wm_quant_8", text: "What is the volume of documents associated with this process?" },
        { id: "wm_quant_9", text: "How long does it take to audit a completed process?" },
        { id: "wm_quant_10", text: "What is the estimated productivity loss (in hours per year) due to process inefficiencies?" },
    ]
  },
  processMapping: {
    qualitative: [
        { id: "pm_qual_1", text: "How are your business processes currently documented, if at all?" },
        { id: "pm_qual_2", text: "Who is responsible for defining and maintaining process knowledge in your organisation?" },
        { id: "pm_qual_3", text: "How do you onboard and train new employees on your standard operating procedures?" },
        { id: "pm_qual_4", text: "When a process needs to be improved, what is the first step you take?" },
        { id: "pm_qual_5", text: "How do you foster collaboration between different departments when designing or changing a process?" },
        { id: "pm_qual_6", text: "What are the challenges in getting a single, agreed-upon view of how a process actually works?" },
        { id: "pm_qual_7", text: "How do you identify risks, inefficiencies, or compliance gaps in your current processes?" },
        { id: "pm_qual_8", text: "What is the 'go-to' source for employees when they have a question about how to perform a task?" },
        { id: "pm_qual_9", text: "How do you manage and communicate process changes to the entire organisation?" },
        { id: "pm_qual_10", text: "What are your primary goals for undertaking a process mapping initiative?" },
    ],
    quantitative: [
        { id: "pm_quant_1", text: "How many core business processes are currently undocumented or have outdated documentation?" },
        { id: "pm_quant_2", text: "How much time (in hours) is typically spent in workshops and interviews to understand a single complex process?" },
        { id: "pm_quant_3", text: "What is the estimated cost of a failed process improvement project due to poor initial understanding?" },
        { id: "pm_quant_4", text: "How many different versions of the 'same' process exist across different teams or locations?" },
        { id: "pm_quant_5", text: "On average, how long does it take for a new hire to become fully proficient in a key process?" },
        { id: "pm_quant_6", text: "How many process-related errors or issues are reported per month?" },
        { id: "pm_quant_7", text: "What is the annual budget for external consultants for process improvement initiatives?" },
        { id: "pm_quant_8", text: "How many hours per year does management spend resolving issues caused by process ambiguity?" },
        { id: "pm_quant_9", text: "What percentage of your IT projects are delayed due to unclear process requirements?" },
        { id: "pm_quant_10", text: "How many compliance or audit findings in the last year were related to inconsistent process execution?" },
    ]
  },
  default: { 
    qualitative: Array.from({ length: 5 }, (_, i) => ({ id: `def_qual_${i+1}`, text: `Default Qualitative Question ${i+1} for this module?` })),
    quantitative: Array.from({ length: 5 }, (_, i) => ({ id: `def_quant_${i+1}`, text: `Default Quantitative Question ${i+1} for this module? (metric)` })),
  }
};

// Updated ROI Input Templates from OCR
export const ROI_INPUT_TEMPLATES: Record<string, RoiInput[]> = {
  accountsPayable: [
    { id: "ap_roi_numInvoicesPerMonth", label: "Number of invoices per month", type: "number", value: "" },
    { id: "ap_roi_avgManualProcessingTimePerInvoiceMins", label: "Avg. manual processing time per invoice (mins)", type: "number", value: "" },
    // Average annual salary is a global ROI input now, not repeated per module metric.
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
  customerInquiryManagement: [
    { id: "cim_roi_numCustomerInquiriesPerMonth", label: "Number of customer inquiries per month", type: "number", value: "" },
    { id: "cim_roi_avgHandlingTimePerInquiryMins", label: "Avg. handling time per inquiry (mins)", type: "number", value: "" },
    { id: "cim_roi_currentFCRRatePercentage", label: "Current First Contact Resolution rate (%)", type: "number", value: "" },
    { id: "cim_roi_numFTEs", label: "Number of FTEs in Customer Inquiry process", type: "number", value: ""},
  ],
  cashApplication: [
    { id: "ca_roi_numPaymentsProcessedPerMonth", label: "Number of payments processed per month", type: "number", value: "" },
    { id: "ca_roi_avgManualApplicationTimePerPaymentMins", label: "Avg. manual application time per payment (mins)", type: "number", value: "" },
    { id: "ca_roi_percentagePaymentsUnappliedInitiallyPercentage", label: "Percentage of payments unapplied initially (%)", type: "number", value: "" },
    { id: "ca_roi_numFTEs", label: "Number of FTEs in Cash Application process", type: "number", value: ""},
  ],
  collectionManagement: [
    { id: "col_roi_totalAnnualRevenue", label: "Total annual revenue ($)", type: "number", value: "", isCurrency: true },
    { id: "col_roi_currentDSODays", label: "Current Days Sales Outstanding (DSO)", type: "number", value: "" },
    { id: "col_roi_numOfCollectionsFTEs", label: "Number of collections FTEs", type: "number", value: "" },
    { id: "col_roi_annualBadDebtWriteOff", label: "Annual bad debt write-off ($)", type: "number", value: "", isCurrency: true },
  ],
  creditManagement: [
    { id: "crm_roi_newCreditApplicationsPerMonth", label: "New credit applications per month", type: "number", value: "" },
    { id: "crm_roi_avgTimeToApproveCreditAppHrs", label: "Avg. time to approve a credit app (hrs)", type: "number", value: "" },
    { id: "crm_roi_annualBadDebtWriteOff", label: "Annual bad debt write-off ($)", type: "number", value: "", isCurrency: true },
    { id: "crm_roi_numFTEs", label: "Number of FTEs in Credit Management", type: "number", value: ""},
  ],
  claimsDeductions: [
    { id: "cd_roi_deductionsProcessedPerMonth", label: "Deductions processed per month", type: "number", value: "" },
    { id: "cd_roi_avgResearchTimePerDeductionHrs", label: "Avg. research time per deduction (hrs)", type: "number", value: "" },
    { id: "cd_roi_percentageDeductionsInvalidPercentage", label: "Percentage of deductions that are invalid (%)", type: "number", value: "" },
    { id: "cd_roi_totalValueOfDeductionsPerMonth", label: "Total value of deductions per month ($)", type: "number", value: "", isCurrency: true },
    { id: "cd_roi_numFTEs", label: "Number of FTEs for Claims/Deductions", type: "number", value: ""},
  ],
  expenseManagement: [
    { id: "em_roi_expenseReportsPerMonth", label: "Expense reports per month", type: "number", value: "" },
    { id: "em_roi_avgProcessingTimePerReportMins", label: "Avg. processing time per report (mins)", type: "number", value: "" },
    { id: "em_roi_nonCompliantExpenseRatePercentage", label: "Non-compliant expense rate (%)", type: "number", value: "" },
    { id: "em_roi_averageExpenseReportValue", label: "Average expense report value ($)", type: "number", value: "", isCurrency: true },
    { id: "em_roi_numFTEs", label: "Number of FTEs for Expense Mngmt", type: "number", value: ""},
  ],
  procurement: [
    { id: "proc_roi_purchaseOrdersPerMonth", label: "Purchase Orders per month", type: "number", value: "" },
    { id: "proc_roi_avgProcessingTimePerPOMins", label: "Avg. processing time per PO (mins)", type: "number", value: "" },
    { id: "proc_roi_maverickSpendRatePercentage", label: "Maverick spend rate (%)", type: "number", value: "" },
    { id: "proc_roi_totalAnnualSpend", label: "Total annual spend ($)", type: "number", value: "", isCurrency: true },
    { id: "proc_roi_numFTEs", label: "Number of FTEs for Procurement", type: "number", value: ""},
  ],
  invoiceDelivery: [
    { id: "id_roi_invoicesSentPerMonth", label: "Invoices sent per month", type: "number", value: "" },
    { id: "id_roi_numOfManualAPPortalUploadsPerMonth", label: "Number of manual AP portal uploads per month", type: "number", value: "" },
    { id: "id_roi_avgCostToPrintAndMailInvoice", label: "Avg. cost to print & mail an invoice ($)", type: "number", value: "", isCurrency: true },
    { id: "id_roi_numFTEs", label: "Number of FTEs for Invoice Delivery", type: "number", value: ""},
  ],
  supplierManagement: [
    { id: "sm_roi_newSuppliersOnboardedPerYear", label: "New suppliers onboarded per year", type: "number", value: "" },
    { id: "sm_roi_avgTimeToOnboardSupplierHrs", label: "Avg. time to onboard a supplier (hrs)", type: "number", value: "" },
    { id: "sm_roi_complianceIssuesPerYear", label: "Compliance issues per year", type: "number", value: "" },
    { id: "sm_roi_avgCostPerComplianceIssue", label: "Avg. cost per compliance issue ($)", type: "number", value: "", isCurrency: true },
    { id: "sm_roi_numFTEs", label: "Number of FTEs for Supplier Mngmt", type: "number", value: ""},
  ],
  documentManagement: [
    { id: "docm_roi_numEmployeesHandlingDocs", label: "Number of employees handling documents", type: "number", value: "" },
    { id: "docm_roi_avgHrsWeekEmployeesSpendSearching", label: "Avg. hours/week employees spend searching for documents", type: "number", value: "" },
    { id: "docm_roi_annualPhysicalDocStorageCost", label: "Annual physical document storage cost ($)", type: "number", value: "", isCurrency: true },
    { id: "docm_roi_complianceIncidentsLast2Years", label: "Compliance incidents in last 2 years", type: "number", value: "" },
    { id: "docm_roi_avgCostPerComplianceIncident", label: "Avg. cost per compliance incident ($)", type: "number", value: "", isCurrency: true },
    { id: "docm_roi_annualPrintingMailingCost", label: "Annual printing & mailing cost ($)", type: "number", value: "", isCurrency: true },
  ],
  workflowManagement: [
    { id: "wm_roi_numKeyManualWorkflows", label: "Number of key manual workflows", type: "number", value: "" },
    { id: "wm_roi_avgCycleTimePerWorkflowInstanceHrs", label: "Avg. cycle time per workflow instance (hrs)", type: "number", value: "" },
    { id: "wm_roi_numInstancesPerWorkflowPerMonth", label: "Number of instances per workflow per month", type: "number", value: "" },
    { id: "wm_roi_currentErrorRatePercentage", label: "Current error rate (%)", type: "number", value: "" },
    { id: "wm_roi_avgCostToFixProcessError", label: "Avg. cost to fix a process error ($)", type: "number", value: "", isCurrency: true },
    { id: "wm_roi_numFTEs", label: "Number of FTEs for these Workflows", type: "number", value: ""},
  ],
  processMapping: [
    { id: "pm_roi_numProcessImprovementProjectsPerYear", label: "Number of process improvement projects per year", type: "number", value: "" },
    { id: "pm_roi_avgDiscoveryTimePerProjectHrs", label: "Avg. discovery time per project (hrs)", type: "number", value: "" },
    { id: "pm_roi_projectFailureReworkRatePercentage", label: "Project failure/rework rate due to poor analysis (%)", type: "number", value: "" },
    { id: "pm_roi_avgCostOfFailedReworkedProject", label: "Avg. cost of a failed/reworked project ($)", type: "number", value: "", isCurrency: true },
    { id: "pm_roi_numFTEs", label: "Number of FTEs in Process Mapping/Discovery", type: "number", value: ""},
  ],
  default: [ // Fallback, less specific
    { id: "def_roi_manualTaskTimeHrsWeek", label: "Time Spent on Manual Task (hours/week)", type: "number", value: "" },
    { id: "def_roi_numberOfEmployeesPerformingTask", label: "Number of Employees Performing Task", type: "number", value: "" },
    { id: "def_roi_errorRatePercentage", label: "Error Rate in Manual Task (%)", type: "number", value: "" },
    { id: "def_roi_costPerError", label: "Cost per Error ($)", type: "number", value: "", isCurrency: true },
  ]
};

const initialQualificationSectionState = {
  answers: {},
  score: 0,
  status: QualificationStatus.NOT_STARTED,
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
};

// Initialize dynamic parts of the state
ALL_MODULES.forEach(module => {
  const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
  INITIAL_STATE.discoveryQuestions[module.id] = {
    qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
    quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
  };

  const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default;
  INITIAL_STATE.roiCalculator[module.id] = {
    annualSalary: 60000, 
    annualSoftwareCost: 10000, // Default value
    upfrontProfServicesCost: 5000, // Default value
    solutionLifespanYears: 3, // Default value
    inputs: roiInputTemplate.reduce((acc, input) => {
      acc[input.id] = input.value; // Initialize with empty string or default number
      return acc;
    }, {} as { [inputId: string]: string | number }),
    results: null,
  };
});


export const TABS: TabDefinition[] = [
  { id: TabId.OPPORTUNITY_SCORECARD, label: "Opportunity Scorecard", roles: [Role.SALES], component: OpportunityScorecardTab },
  { id: TabId.QUALIFICATION, label: "Qualification", roles: [Role.SALES, Role.PRESALES, Role.SDR_SAD], component: QualificationTab },
  { id: TabId.DISCOVERY_QUESTIONS, label: "Discovery Questions", roles: [Role.PRESALES, Role.SDR_SAD], component: DiscoveryQuestionsTab },
  { id: TabId.ROI_CALCULATOR, label: "ROI Calculator", roles: [Role.SALES, Role.PRESALES], component: RoiCalculatorTab },
];

export const HOURLY_RATE_DIVISOR = 2080; // Standard hours in a work year (40 hrs/week * 52 weeks)
export const AUTOMATION_TIME_SAVING_PERCENTAGE = 0.75; // Default assumption of 75% time saving post-automation
export const AUTOMATION_ERROR_REDUCTION_PERCENTAGE = 0.80; // Default assumption of 80% error reduction
