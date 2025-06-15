
import { Role, AutomationType, Module, TabId, ScorecardQuestion, QualificationQuestion, QualificationStatus, DiscoveryQuestion, RoiInput, AppState, ExportFormat, TabDefinition, RoiCalculationFactors, QualificationModuleData } from './types';
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
  { id: "expenseManagement", name: "Expense Management" },
  { id: "procurement", name: "Procurement" },
  { id: "cashApplication", name: "Cash Application" },
  { id: "collectionManagement", name: "Collection Management" },
  { id: "creditManagement", name: "Credit Management" },
  { id: "orderManagement", name: "Order Management" },
  { id: "customerInquiryManagement", name: "Customer Inquiry Management" },
  { id: "claimsDeductions", name: "Claims & Deductions" },
  { id: "supplierManagement", name: "Supplier Management" },
  { id: "invoiceDelivery", name: "Invoice Delivery" },
];

export const BUSINESS_MODULES: Module[] = [
  { id: "documentManagement", name: "Document Management" },
  { id: "workflowManagement", name: "Workflow Management" },
  { id: "processMapping", name: "Process Mapping" },
];

export const ALL_MODULES: Module[] = [...FINANCE_MODULES, ...BUSINESS_MODULES];

export const MODULES_BY_AUTOMATION_TYPE: Record<AutomationType, Module[]> = {
  [AutomationType.FINANCE]: FINANCE_MODULES,
  [AutomationType.BUSINESS]: BUSINESS_MODULES,
};


export const SCORECARD_QUESTIONS: ScorecardQuestion[] = [
  { id: "q1", text: "Is there a clear executive sponsor for this initiative?" },
  { id: "q2", text: "Is the pain point well-defined and acknowledged by the prospect?" },
  { id: "q3", text: "Is there an allocated budget or willingness to invest?" },
  { id: "q4", text: "Is the timeline for implementation reasonable and agreed upon?" },
  { id: "q5", text: "Does the prospect understand the value proposition of automation?" },
];

const workflowManagementQualificationQuestions = {
    qualitative: [
        { id: "wm_qual_q1", text: "How are your key business processes, like new employee onboarding, currently documented?", options: [ { label: "They aren't documented; we rely on tribal knowledge and walking people through it.", value: 3 }, { label: "We have some outdated Visio diagrams or Word documents stored on a network drive.", value: 2 }, { label: "We have a central, accessible process repository that is actively maintained.", value: 1 } ]},
        { id: "wm_qual_q2", text: "How do managers get visibility into the status of a process instance, like a specific capital expenditure request?", options: [ { label: "They have to ask the person they think is currently working on it via email or phone.", value: 3 }, { label: "There might be a shared spreadsheet, but it's manually updated and often inaccurate.", value: 2 }, { label: "They can view a graphical, real-time dashboard showing the status of all in-flight processes.", value: 1 } ]},
        { id: "wm_qual_q3", text: "What happens when a key person in a process is out of the office?", options: [ { label: "The process grinds to a halt until they return.", value: 3 }, { label: "Their email inbox fills up with approval requests, which they have to deal with when they get back.", value: 2 }, { label: "Tasks are automatically delegated to a designated backup based on defined business rules.", value: 1 } ]},
        { id: "wm_qual_q4", text: "How are process improvement ideas from employees captured and evaluated?", options: [ { label: "They aren't. There is no formal mechanism for suggesting improvements.", value: 3 }, { label: "Employees might mention them to their manager, but there's no process for acting on them.", value: 2 }, { label: "We have a formal intake process for improvement ideas that allows for prioritization and implementation.", value: 1 } ]},
        { id: "wm_qual_q5", text: "How does the organization ensure that a process is executed the same way every time, for compliance and quality control?", options: [ { label: "We can't. There is significant variation depending on who is performing the task.", value: 3 }, { label: "We rely on training and manual checklists, but enforcement is difficult.", value: 2 }, { label: "The automated workflow ensures the process is executed according to the defined standard every time.", value: 1 } ]},
    ],
    quantitative: [
        { id: "wm_quant_q6", text: "What is the average end-to-end cycle time for a critical, but manual, process like contract review?", options: [ { label: "> 20 days", value: 3 }, { label: "10 - 20 days", value: 2 }, { label: "< 10 days", value: 1 } ]},
        { id: "wm_quant_q7", text: "What is the error rate for this process (i.e., percentage of times it needs to be sent back or reworked)?", options: [ { label: "> 25%", value: 3 }, { label: "10% - 25%", value: 2 }, { label: "< 10%", value: 1 } ]},
        { id: "wm_quant_q8", text: "How many different people or departments are involved in the handoffs for this process?", options: [ { label: "> 7", value: 3 }, { label: "4 - 6", value: 2 }, { label: "1 - 3", value: 1 } ]},
        { id: "wm_quant_q9", text: "What percentage of a manager's time is spent on \"process administration\" (chasing status updates, follow-ups, etc.) vs. value-added work?", options: [ { label: "> 30%", value: 3 }, { label: "15% - 30%", value: 2 }, { label: "< 15%", value: 1 } ]},
        { id: "wm_quant_q10", text: "How long would it take your organization to adapt this process to a new business rule or compliance requirement?", options: [ { label: "Weeks or months, with significant manual effort and retraining.", value: 3 }, { label: "A few weeks, but it would be a painful project.", value: 2 }, { label: "A few hours or days, via simple configuration changes in a workflow tool.", value: 1 } ]},
    ]
};

export const QUALIFICATION_QUESTIONS_MODULE_TEMPLATES: Record<string, { qualitative: QualificationQuestion[], quantitative: QualificationQuestion[] }> = {
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_q1", text: "How would you describe your team's ability to provide accrual reports for unprocessed invoices at month-end?", options: [ { label: "It's a highly manual, time-consuming process involving guesswork and chasing approvers.", value: 3 }, { label: "We can get a rough estimate, but it's not always accurate and requires significant effort.", value: 2 }, { label: "Our system provides real-time visibility, and accrual reporting is largely automated and accurate.", value: 1 } ]},
      { id: "ap_qual_q2", text: "When a senior executive asks for the status of a specific high-value invoice, what is the process to find that information?", options: [ { label: "It requires manually checking email inboxes, physical desk trays, and contacting multiple people.", value: 3 }, { label: "We can track it if it's been entered into the ERP, but there's a visibility gap before that point.", value: 2 }, { label: "We can look it up instantly in our system and see its exact status, location, and history.", value: 1 } ]},
      { id: "ap_qual_q3", text: "How are supplier-related documents (contracts, W-9s, certificates of insurance) managed in relation to their invoices?", options: [ { label: "They are stored in separate systems or filing cabinets, making cross-referencing difficult.", value: 3 }, { label: "They are stored in network folders, but access is not always easy or linked to the invoice.", value: 2 }, { label: "All related supplier documents are electronically attached to the invoice record in our system.", value: 1 } ]},
      { id: "ap_qual_q4", text: "Describe the process for handling an urgent, \"rush\" payment request.", options: [ { label: "It completely bypasses our standard process, leading to a lack of documentation and potential errors.", value: 3 }, { label: "We have an informal process, but it's disruptive and requires manual intervention and follow-up.", value: 2 }, { label: "We have a defined workflow for urgent payments that maintains controls and an audit trail.", value: 1 } ]},
      { id: "ap_qual_q5", text: "How does the AP team identify and manage invoices that are approaching their due date to prioritize work?", options: [ { label: "It's a manual effort, often relying on sorting stacks of paper or spreadsheets, and things get missed.", value: 3 }, { label: "The ERP might flag overdue invoices, but it's reactive, not proactive.", value: 2 }, { label: "Our system automatically prioritizes invoices based on due dates and discount opportunities.", value: 1 } ]},
    ],
    quantitative: [
      { id: "ap_quant_q6", text: "What percentage of your supplier invoices are linked to a Purchase Order?", options: [ { label: "< 40%", value: 3 }, { label: "40% - 70%", value: 2 }, { label: "> 70%", value: 1 } ]},
      { id: "ap_quant_q7", text: "In the last 12 months, how many times has a duplicate payment been made and later recovered?", options: [ { label: "More than 5 times, or we aren't sure.", value: 3 }, { label: "1-4 times.", value: 2 }, { label: "We have not had a confirmed duplicate payment.", value: 1 } ]},
      { id: "ap_quant_q8", text: "What is the average number of touches (by different people) for a single non-PO invoice to be processed?", options: [ { label: "More than 5 touches.", value: 3 }, { label: "3-4 touches.", value: 2 }, { label: "1-2 touches.", value: 1 } ]},
      { id: "ap_quant_q9", text: "What percentage of supplier inquiries are about routine payment status checks?", options: [ { label: "> 50%", value: 3 }, { label: "25% - 50%", value: 2 }, { label: "< 25%", value: 1 } ]},
      { id: "ap_quant_q10", text: "How many different GL codes does your AP team typically have to manually assign per invoice?", options: [ { label: "More than 4 codes on average.", value: 3 }, { label: "2-3 codes on average.", value: 2 }, { label: "1 code, or it's mostly automated from the PO.", value: 1 } ]},
    ]
  },
  expenseManagement: {
    qualitative: [
      { id: "em_qual_q1", text: "How would you describe the user experience for employees submitting expenses on their mobile devices?", options: [ { label: "They can't. They have to collect paper receipts and submit them from their computer.", value: 3 }, { label: "It's possible but clunky; most employees wait until they are back in the office.", value: 2 }, { label: "It's a simple, seamless process; they can snap photos of receipts and submit reports on the go.", value: 1 } ]},
      { id: "em_qual_q2", text: "How are corporate expense policies enforced within your current process?", options: [ { label: "It relies entirely on managers manually checking each line item against a policy document.", value: 3 }, { label: "We have some basic flags, but many out-of-policy items are still missed or approved.", value: 2 }, { label: "The system automatically flags or prevents out-of-policy submissions in real-time.", value: 1 } ]},
      { id: "em_qual_q3", text: "What is the process for reclaiming Value-Added Tax (VAT) on foreign travel expenses?", options: [ { label: "We don't have a process; it's considered a lost cost.", value: 3 }, { label: "It's a highly manual, paper-based process that we undertake periodically with limited success.", value: 2 }, { label: "We have a streamlined or automated process to identify and reclaim eligible VAT.", value: 1 } ]},
      { id: "em_qual_q4", text: "How does the finance team gain visibility into T&E spending liability before reports are submitted?", options: [ { label: "We have no visibility; we are completely blind until the end of the month or quarter.", value: 3 }, { label: "We can see corporate card feeds, but have no insight into out-of-pocket expenses.", value: 2 }, { label: "We have real-time visibility into both card transactions and out-of-pocket expenses as they occur.", value: 1 } ]},
      { id: "em_qual_q5", text: "When an expense is rejected, how is the correction and resubmission process handled?", options: [ { label: "It requires a whole new expense report to be created, which is frustrating for the employee.", value: 3 }, { label: "It's handled via email chains outside of the system, creating documentation gaps.", value: 2 }, { label: "The system allows for easy correction and resubmission of the specific non-compliant item.", value: 1 } ]},
    ],
    quantitative: [
      { id: "em_quant_q6", text: "What is the average number of days in your expense reimbursement cycle (submission to payment)?", options: [ { label: "> 21 days", value: 3 }, { label: "10 - 20 days", value: 2 }, { label: "< 10 days", value: 1 } ]},
      { id: "em_quant_q7", text: "What percentage of expense reports require manual clarification or correction by the finance team after manager approval?", options: [ { label: "> 20%", value: 3 }, { label: "5% - 20%", value: 2 }, { label: "< 5%", value: 1 } ]},
      { id: "em_quant_q8", text: "How many hours per week does your finance/AP team spend on auditing or processing expense reports?", options: [ { label: "> 40 hours", value: 3 }, { label: "10 - 40 hours", value: 2 }, { label: "< 10 hours", value: 1 } ]},
      { id: "em_quant_q9", text: "What percentage of T&E spend is put on personal cards versus corporate cards?", options: [ { label: "> 40%", value: 3 }, { label: "10% - 40%", value: 2 }, { label: "< 10%", value: 1 } ]},
      { id: "em_quant_q10", text: "What is your total number of corporate card transactions per month?", options: [ { label: "> 1,000", value: 3 }, { label: "250 - 1,000", value: 2 }, { label: "< 250", value: 1 } ]},
    ]
  },
  procurement: {
    qualitative: [
        { id: "pr_qual_q1", text: "How do employees typically find and select items they need to purchase for their job?", options: [ { label: "They search on their own through public websites and then submit a request.", value: 3 }, { label: "We provide a preferred supplier list, but employees have to go to their individual websites to find items.", value: 2 }, { label: "We have internal, searchable catalogs with pre-approved items and negotiated pricing.", value: 1 } ]},
        { id: "pr_qual_q2", text: "How are budget availability checks performed before a purchase is approved?", options: [ { label: "It's a manual check by the finance team late in the process, which can halt the purchase.", value: 3 }, { label: "The approver is expected to know their budget, but they don't have real-time data.", value: 2 }, { label: "The system performs an automatic budget check at the time of requisition.", value: 1 } ]},
        { id: "pr_qual_q3", text: "What happens when an employee tries to purchase from a non-approved or high-risk supplier?", options: [ { label: "There is nothing to stop them, we usually find out when the invoice arrives in AP.", value: 3 }, { label: "The approval workflow might catch it, but it depends on the diligence of the approver.", value: 2 }, { label: "The system prevents requisitions from being created for non-approved vendors.", value: 1 } ]},
        { id: "pr_qual_q4", text: "Describe the process for receiving goods or services. How is the PO updated to reflect what was received?", options: [ { label: "It's a manual, paper-based process in the warehouse, and the information is often slow to get to AP.", value: 3 }, { label: "We have a system, but adoption is low, and many receipts are still confirmed via email.", value: 2 }, { label: "We have a fully electronic goods receipt process that updates the PO in real-time.", value: 1 } ]},
        { id: "pr_qual_q5", text: "How does the procurement team leverage the organization's total spend data to negotiate better contracts?", options: [ { label: "They can't. The data is fragmented across multiple systems and is unreliable.", value: 3 }, { label: "It requires a significant manual effort to consolidate and analyze spend data for negotiations.", value: 2 }, { label: "They have on-demand access to clean, categorized spend analytics.", value: 1 } ]},
    ],
    quantitative: [
        { id: "pr_quant_q6", text: "What percentage of your organization's indirect spend is \"under management\" (i.e., goes through an approved procurement channel)?", options: [ { label: "< 50%", value: 3 }, { label: "50% - 80%", value: 2 }, { label: "> 80%", value: 1 } ]},
        { id: "pr_quant_q7", text: "What is the average number of days to get a purchase requisition approved and a PO issued?", options: [ { label: "> 7 days", value: 3 }, { label: "3 - 7 days", value: 2 }, { label: "< 3 days", value: 1 } ]},
        { id: "pr_quant_q8", text: "How many FTEs are dedicated to the purchasing/procurement function?", options: [ { label: "More FTEs than the business feels is necessary for the value provided.", value: 3 }, { label: "We feel we are adequately staffed but lack tools for efficiency.", value: 2 }, { label: "We run a lean, strategic team focused on sourcing and supplier management, not processing.", value: 1 } ]},
        { id: "pr_quant_q9", text: "What percentage of your POs end up with an invoice mismatch exception in AP?", options: [ { label: "> 15%", value: 3 }, { label: "5% - 15%", value: 2 }, { label: "< 5%", value: 1 } ]},
        { id: "pr_quant_q10", text: "How many suppliers represent 80% of your total spend?", options: [ { label: "A large, fragmented number, indicating a long tail of unmanaged suppliers.", value: 3 }, { label: "A moderate number, but could be consolidated further.", value: 2 }, { label: "A small, manageable number of strategic suppliers.", value: 1 } ]},
    ]
  },
  cashApplication: {
    qualitative: [
        { id: "ca_qual_q1", text: "When a payment is received without any remittance advice, what is the standard procedure?", options: [ { label: "The cash is posted \"on account\" and sits there until the customer complains or a collector investigates.", value: 3 }, { label: "An analyst has to manually contact the customer to ask which invoices they intended to pay.", value: 2 }, { label: "The system uses historical data and AI to propose a likely match for the analyst to review.", value: 1 } ]},
        { id: "ca_qual_q2", text: "How does your team handle remittance advice that arrives in non-standard formats, like a photo in an email or a unique portal format?", options: [ { label: "It requires completely manual data entry, which is slow and prone to error.", value: 3 }, { label: "We can handle some formats, but others require significant manual work.", value: 2 }, { label: "Our system can capture and extract data from a wide variety of formats automatically.", value: 1 } ]},
        { id: "ca_qual_q3", text: "How are parent/child company payments handled, where one entity pays on behalf of others?", options: [ { label: "It's a manual nightmare of cross-referencing accounts and invoices.", value: 3 }, { label: "We have a manual workaround, but it requires specialist knowledge within the team.", value: 2 }, { label: "Our system has rules to automatically identify and apply these complex payments.", value: 1 } ]},
        { id: "ca_qual_q4", text: "Describe how you manage the remittance details provided by major payment aggregators or customer portals (e.g., Ariba, Coupa).", options: [ { label: "We have to manually log into each portal, download reports, and key the data into our ERP.", value: 3 }, { label: "We have some scripts or partial automation, but it frequently breaks and requires maintenance.", value: 2 }, { label: "We have a solution that automatically retrieves and consolidates remittance from these sources.", value: 1 } ]},
        { id: "ca_qual_q5", text: "What is the impact on the team when a large, complex payment file arrives near the end of the day or month?", options: [ { label: "It often results in overtime or the cash being left unapplied until the next business day.", value: 3 }, { label: "The team has to drop everything else to focus on getting it done, disrupting other work.", value: 2 }, { label: "The system processes the bulk of it automatically, leaving only exceptions for manual review.", value: 1 } ]},
    ],
    quantitative: [
        { id: "ca_quant_q6", text: "What percentage of your total cash receipts are applied automatically without human intervention?", options: [ { label: "< 40%", value: 3 }, { label: "40% - 80%", value: 2 }, { label: "> 80%", value: 1 } ]},
        { id: "ca_quant_q7", text: "How many lockboxes or bank accounts does your team have to manually reconcile each day?", options: [ { label: "> 5", value: 3 }, { label: "2 - 4", value: 2 }, { label: "1 (or fully consolidated)", value: 1 } ]},
        { id: "ca_quant_q8", text: "On average, how many line items are in your largest remittance files?", options: [ { label: "> 500", value: 3 }, { label: "100 - 500", value: 2 }, { label: "< 100", value: 1 } ]},
        { id: "ca_quant_q9", text: "What is the average number of days cash sits as \"unapplied\" before it is matched to an invoice?", options: [ { label: "> 5 days", value: 3 }, { label: "2 - 4 days", value: 2 }, { label: "< 2 days", value: 1 } ]},
        { id: "ca_quant_q10", text: "What percentage of incoming payments are short-paid, creating a deduction or dispute?", options: [ { label: "> 10%", value: 3 }, { label: "3% - 10%", value: 2 }, { label: "< 3%", value: 1 } ]},
    ]
  },
  collectionManagement: {
    qualitative: [
        { id: "cm_qual_q1", text: "How does a collector prepare for their day's work? What information do they start with?", options: [ { label: "They print a static aging report from the ERP and start making calls from the top of the list.", value: 3 }, { label: "They work from a spreadsheet that may have some notes, but the prioritization is based on judgment.", value: 2 }, { label: "They log into a system that provides a prioritized worklist based on risk, value, and strategy.", value: 1 } ]},
        { id: "cm_qual_q2", text: "When a collector contacts a customer, what is the typical customer response regarding the status of the payment?", options: [ { label: "\"I already paid that,\" \"Which invoice?,\" or \"I'm waiting on a credit.\"", value: 3 }, { label: "They often need to provide copies of invoices, which delays the conversation.", value: 2 }, { label: "The customer has already been proactively notified and has all the information they need.", value: 1 } ]},
        { id: "cm_qual_q3", text: "How are collection notes, customer promises, and follow-up activities documented and tracked?", options: [ { label: "In personal spreadsheets, notepads, or Outlook calendars, with no central visibility.", value: 3 }, { label: "We have a shared spreadsheet or notes field in the ERP, but it's unstructured and hard to manage.", value: 2 }, { label: "All activities are logged against the customer account in a centralized system with automated reminders.", value: 1 } ]},
        { id: "cm_qual_q4", text: "How are collection strategies adjusted for different types of customers (e.g., key accounts vs. small accounts)?", options: [ { label: "We use the same one-size-fits-all approach for everyone.", value: 3 }, { label: "Collectors use their personal judgment to treat key customers differently.", value: 2 }, { label: "We have defined, automated strategies (e.g., tone, frequency) for different customer segments.", value: 1 } ]},
        { id: "cm_qual_q5", text: "What is the process for placing a customer dispute and pausing collection activities on a specific invoice?", options: [ { label: "It's an informal email request to the collector, who is then responsible for remembering not to call.", value: 3 }, { label: "We can change the status in the ERP, but it's a manual process and doesn't automatically resume.", value: 2 }, { label: "There is a formal dispute workflow that routes the issue for resolution and tracks its status.", value: 1 } ]},
    ],
    quantitative: [
        { id: "cm_quant_q6", text: "What is your current Days Sales Outstanding (DSO)?", options: [ { label: "Significantly higher than the industry average or has increased year-over-year.", value: 3 }, { label: "In line with the industry average, but we believe it could be better.", value: 2 }, { label: "Best-in-class for our industry.", value: 1 } ]},
        { id: "cm_quant_q7", text: "What percentage of a collector's time is spent on administrative tasks (e.g., preparing reports, sending invoice copies) vs. actual customer contact?", options: [ { label: "> 50%", value: 3 }, { label: "30% - 50%", value: 2 }, { label: "< 30%", value: 1 } ]},
        { id: "cm_quant_q8", text: "How many distinct customer accounts does each collector have to manage?", options: [ { label: "> 1000", value: 3 }, { label: "400 - 1000", value: 2 }, { label: "< 400", value: 1 } ]},
        { id: "cm_quant_q9", text: "What percentage of your AR portfolio is more than 90 days past due?", options: [ { label: "> 10%", value: 3 }, { label: "3% - 10%", value: 2 }, { label: "< 3%", value: 1 } ]},
        { id: "cm_quant_q10", text: "How many collectors have left the team (turnover) in the past 18 months?", options: [ { label: "More than 2, or high turnover is a known issue.", value: 3 }, { label: "1-2", value: 2 }, { label: "None, we have a stable and motivated team.", value: 1 } ]},
    ]
  },
  creditManagement: {
    qualitative: [
        { id: "crm_qual_q1", text: "How would you describe the collaboration between your credit and sales teams?", options: [ { label: "It's adversarial; credit is seen as a barrier to closing deals.", value: 3 }, { label: "They communicate when necessary, but the process is reactive and often creates friction.", value: 2 }, { label: "It's a strategic partnership with clear rules of engagement and shared goals.", value: 1 } ]},
        { id: "crm_qual_q2", text: "What triggers a review of an existing customer's credit limit?", options: [ { label: "Only when they significantly exceed their limit, or when collections reports a serious issue.", value: 3 }, { label: "We conduct periodic annual reviews, but the process is manual and time-consuming.", value: 2 }, { label: "We have automated alerts based on payment behavior, news, or updated credit bureau data.", value: 1 } ]},
        { id: "crm_qual_q3", text: "How are sales orders that are placed on credit hold managed and communicated?", options: [ { label: "The sales rep only finds out when the customer complains about a delayed order.", value: 3 }, { label: "An automated email is sent, but tracking resolution requires manual follow-up.", value: 2 }, { label: "There is a collaborative workflow with clear visibility for both sales and credit to resolve holds quickly.", value: 1 } ]},
        { id: "crm_qual_q4", text: "How are credit policies and decisions documented and stored for audit and review?", options: [ { label: "In disconnected emails and spreadsheets, making it difficult to reconstruct a decision.", value: 3 }, { label: "We have notes in the ERP, but they lack structure and supporting documentation.", value: 2 }, { label: "All decisions, data sources, and approvals are logged in a centralized, auditable system.", value: 1 } ]},
        { id: "crm_qual_q5", text: "How does the credit team assess risk for parent companies and their various subsidiaries?", options: [ { label: "We treat each entity as separate, which creates a fragmented view of our total risk exposure.", value: 3 }, { label: "It's a manual process of cross-referencing that relies on the analyst's personal knowledge.", value: 2 }, { label: "Our system allows us to link parent/child accounts for a consolidated view of risk.", value: 1 } ]},
    ],
    quantitative: [
        { id: "crm_quant_q6", text: "What is the average time it takes to make a credit decision for a new customer?", options: [ { label: "> 3 days", value: 3 }, { label: "1 - 2 days", value: 2 }, { label: "< 1 day", value: 1 } ]},
        { id: "crm_quant_q7", text: "What percentage of your total sales orders are placed on credit hold each month?", options: [ { label: "> 5%", value: 3 }, { label: "1% - 5%", value: 2 }, { label: "< 1%", value: 1 } ]},
        { id: "crm_quant_q8", text: "What is your bad debt write-off as a percentage of total revenue?", options: [ { label: "Higher than our industry average.", value: 3 }, { label: "In line with our industry average.", value: 2 }, { label: "Lower than our industry average.", value: 1 } ]},
        { id: "crm_quant_q9", text: "How many different external data sources (e.g., credit bureaus) does the team manually consult for a credit review?", options: [ { label: "> 3", value: 3 }, { label: "2", value: 2 }, { label: "1 (or it's an integrated, automated feed)", value: 1 } ]},
        { id: "crm_quant_q10", text: "What percentage of your customer portfolio has not had a credit review in the last 24 months?", options: [ { label: "> 30%", value: 3 }, { label: "10% - 30%", value: 2 }, { label: "< 10%", value: 1 } ]},
    ]
  },
  orderManagement: {
    qualitative: [
        { id: "om_qual_q1", text: "How are customer orders received via email captured and entered into your system?", options: [ { label: "A customer service representative (CSR) manually re-keys all the data from the email or attachment.", value: 3 }, { label: "We have some copy-paste methods, but it's still largely manual and error-prone.", value: 2 }, { label: "Orders are automatically captured and the data is extracted with high accuracy for CSR validation.", value: 1 } ]},
        { id: "om_qual_q2", text: "What visibility does a customer service representative have when a customer calls to ask about the status of their order?", options: [ { label: "They have to put the customer on hold while they check multiple systems or call the warehouse.", value: 3 }, { label: "They can see if the order has shipped from the ERP, but have no detail on its current status.", value: 2 }, { label: "They have a single screen with real-time, end-to-end visibility from order receipt to delivery.", value: 1 } ]},
        { id: "om_qual_q3", text: "How are pricing errors or invalid part numbers handled during order entry?", options: [ { label: "We often don't catch them until later in the process, requiring rework and customer follow-up.", value: 3 }, { label: "The CSR is expected to manually verify them, but mistakes are common.", value: 2 }, { label: "The system automatically validates orders against product and pricing master data in real-time.", value: 1 } ]},
        { id: "om_qual_q4", text: "Describe the process for handling an expedited or \"rush\" order.", options: [ { label: "It's a chaotic, informal process of phone calls and emails that disrupts the entire workflow.", value: 3 }, { label: "We have a process, but it requires significant manual intervention to prioritize.", value: 2 }, { label: "We have a defined \"rush\" order workflow that automatically prioritizes it across all departments.", value: 1 } ]},
        { id: "om_qual_q5", text: "How does the order management process provide feedback to sales or inventory management?", options: [ { label: "It doesn't. We are constantly surprised by stockouts or unfulfillable orders.", value: 3 }, { label: "We have periodic meetings to discuss issues, but the data is not timely.", value: 2 }, { label: "Dashboards and analytics provide real-time insights into order trends and inventory issues.", value: 1 } ]},
    ],
    quantitative: [
        { id: "om_quant_q6", text: "What percentage of your customer orders are received through manual channels (email, fax, phone)?", options: [ { label: "> 70%", value: 3 }, { label: "40% - 70%", value: 2 }, { label: "< 40%", value: 1 } ]},
        { id: "om_quant_q7", text: "What is the error rate for orders entered manually (i.e., percentage of orders requiring correction after entry)?", options: [ { label: "> 10%", value: 3 }, { label: "3% - 10%", value: 2 }, { label: "< 3%", value: 1 } ]},
        { id: "om_quant_q8", text: "What is the average time it takes for a CSR to process a single, standard sales order?", options: [ { label: "> 15 minutes", value: 3 }, { label: "5 - 15 minutes", value: 2 }, { label: "< 5 minutes", value: 1 } ]},
        { id: "om_quant_q9", text: "What is your perfect order rate (orders delivered on-time, complete, damage-free, with correct documentation)?", options: [ { label: "< 85%", value: 3 }, { label: "85% - 95%", value: 2 }, { label: "> 95%", value: 1 } ]},
        { id: "om_quant_q10", text: "How many CSRs (FTEs) are primarily dedicated to manual order entry?", options: [ { label: "A number that management feels is too high and could be reallocated to higher-value tasks.", value: 3 }, { label: "We are adequately staffed but could be more efficient.", value: 2 }, { label: "Our CSRs focus on customer service, not data entry.", value: 1 } ]},
    ]
  },
  customerInquiryManagement: {
    qualitative: [
        { id: "cim_qual_q1", text: "When a customer sends an inquiry to a general email inbox, what is the process for ensuring it is assigned and addressed?", options: [ { label: "Someone manually monitors the inbox and forwards emails, but things are often missed or delayed.", value: 3 }, { label: "We have some rules to auto-forward, but there is no tracking or accountability.", value: 2 }, { label: "The system automatically creates a case, assigns it, and tracks it against service levels.", value: 1 } ]},
        { id: "cim_qual_q2", text: "How does an agent find the information needed to resolve a common inquiry, like providing a proof of delivery?", options: [ { label: "They have to manually search through carrier websites or network folders, which is time-consuming.", value: 3 }, { label: "They might have bookmarks or a list of links, but it's not integrated.", value: 2 }, { label: "Key documents and information are automatically presented to them within a case management view.", value: 1 } ]},
        { id: "cim_qual_q3", text: "How are customer inquiries and the related internal conversations tracked?", options: [ { label: "Primarily in siloed email chains, making it impossible to see the full history of an issue.", value: 3 }, { label: "We might copy/paste notes into a central log, but it's cumbersome and inconsistent.", value: 2 }, { label: "All internal and external communication is automatically logged in a central, collaborative workspace.", value: 1 } ]},
        { id: "cim_qual_q4", text: "What is the customer experience when they check on the status of a previously submitted inquiry?", options: [ { label: "They have to call or email again, and often have to re-explain the issue to a new person.", value: 3 }, { label: "They can reply to their email chain, but the original agent may not be available.", value: 2 }, { label: "They can check the status themselves through a self-service portal.", value: 1 } ]},
        { id: "cim_qual_q5", text: "How does management get visibility into inquiry volumes, types, and resolution times?", options: [ { label: "Through manual and time-consuming report creation in spreadsheets, which are always out of date.", value: 3 }, { label: "We have some basic reports from our email system, but they lack business context.", value: 2 }, { label: "Through real-time dashboards with analytics on trends, bottlenecks, and team performance.", value: 1 } ]},
    ],
    quantitative: [
        { id: "cim_quant_q6", text: "What is your First Contact Resolution (FCR) rate for customer inquiries?", options: [ { label: "< 60%", value: 3 }, { label: "60% - 80%", value: 2 }, { label: "> 80%", value: 1 } ]},
        { id: "cim_quant_q7", text: "What is the average time to resolve a standard customer inquiry?", options: [ { label: "> 48 hours", value: 3 }, { label: "24 - 48 hours", value: 2 }, { label: "< 24 hours", value: 1 } ]},
        { id: "cim_quant_q8", text: "What percentage of total inquiries could be answered if customers had access to a self-service portal with order and invoice data?", options: [ { label: "> 50%", value: 3 }, { label: "25% - 50%", value: 2 }, { label: "< 25%", value: 1 } ]}, // Note: Options re-ordered to match PDF rating logic (High pain first)
        { id: "cim_quant_q9", text: "How many different systems must an agent typically access to resolve a single inquiry?", options: [ { label: "> 4 systems", value: 3 }, { label: "2-3 systems", value: 2 }, { label: "1 system", value: 1 } ]},
        { id: "cim_quant_q10", text: "What is the volume of inquiries your team handles per month?", options: [ { label: "A volume that is causing noticeable strain, delays, and employee burnout.", value: 3 }, { label: "A manageable, but high volume that limits proactive work.", value: 2 }, { label: "A volume that is easily handled by the current team.", value: 1 } ]},
    ]
  },
  claimsDeductions: {
    qualitative: [
        { id: "cnd_qual_q1", text: "How is backup documentation (e.g., Proof of Delivery, Bill of Lading) gathered to research a deduction?", options: [ { label: "An analyst manually hunts for it across carrier websites, email archives, and network folders.", value: 3 }, { label: "We have a central repository, but finding the right document for a specific claim is difficult.", value: 2 }, { label: "The system automatically gathers and links the required documentation to the deduction case.", value: 1 } ]},
        { id: "cnd_qual_q2", text: "Describe the collaboration process between the deductions team and the sales team to validate a promotional claim.", options: [ { label: "It's a series of disconnected emails and phone calls, and often results in frustration on both sides.", value: 3 }, { label: "We have a process, but it's manual and tracking the status of a request is difficult.", value: 2 }, { label: "There is a formal, collaborative workflow to route the claim for validation with full visibility.", value: 1 } ]},
        { id: "cnd_qual_q3", text: "How are reason codes for deductions assigned?", options: [ { label: "They are often guessed or lumped into a generic \"other\" category, making root cause analysis impossible.", value: 3 }, { label: "Analysts assign them manually based on their interpretation, leading to inconsistency.", value: 2 }, { label: "The system intelligently suggests reason codes based on remittance data and historical trends.", value: 1 } ]},
        { id: "cnd_qual_q4", text: "What is the process for collecting on an invalid deduction that has been denied?", options: [ { label: "It goes back to the collections team as an open balance, but they lack the context and backup to effectively collect.", value: 3 }, { label: "The deductions analyst is responsible for collecting, but this is not their primary skill set.", value: 2 }, { label: "There is an integrated workflow that provides the collector with all denial reasons and documentation.", value: 1 } ]},
        { id: "cnd_qual_q5", text: "How does the organization use deduction data to identify and fix root causes (e.g., recurring shipping errors)?", options: [ { label: "It doesn't. We are stuck in a reactive cycle of researching the same problems repeatedly.", value: 3 }, { label: "We create periodic reports, but the data is often too old or unreliable to drive meaningful change.", value: 2 }, { label: "We have real-time analytics and dashboards that help us proactively identify and address root causes.", value: 1 } ]},
    ],
    quantitative: [
        { id: "cnd_quant_q6", text: "What is your current average Days Deductions Outstanding (DDO)?", options: [ { label: "> 90 days", value: 3 }, { label: "45 - 90 days", value: 2 }, { label: "< 45 days", value: 1 } ]},
        { id: "cnd_quant_q7", text: "What percentage of total revenue is currently tied up in open deductions?", options: [ { label: "> 2%", value: 3 }, { label: "0.5% - 2%", value: 2 }, { label: "< 0.5%", value: 1 } ]},
        { id: "cnd_quant_q8", text: "What percentage of invalid deductions do you successfully recover?", options: [ { label: "< 50%", value: 3 }, { label: "50% - 75%", value: 2 }, { label: "> 75%", value: 1 } ]},
        { id: "cnd_quant_q9", text: "How much time does an analyst spend researching a single, complex deduction?", options: [ { label: "> 2 hours", value: 3 }, { label: "30 - 120 minutes", value: 2 }, { label: "< 30 minutes", value: 1 } ]},
        { id: "cnd_quant_q10", text: "What is the total annual dollar value of deductions that are written off simply due to a lack of time or documentation to fight them?", options: [ { label: "A number that is known to be significant and is a concern for finance leadership.", value: 3 }, { label: "We know it happens, but we haven't quantified the full impact.", value: 2 }, { label: "The value is minimal and well-controlled.", value: 1 } ]},
    ]
  },
  supplierManagement: {
    qualitative: [
        { id: "sm_qual_q1", text: "Describe the process for onboarding a new supplier.", options: [ { label: "It's an ad-hoc process handled via email, with no standardized information collection.", value: 3 }, { label: "We have a checklist or PDF form, but it requires manual data entry into our systems.", value: 2 }, { label: "We have a self-service portal where suppliers enter their own information through a guided workflow.", value: 1 } ]},
        { id: "sm_qual_q2", text: "How do you validate supplier information, such as bank account details, to prevent fraud?", options: [ { label: "We rely on the information provided in an email, which we know is a major risk.", value: 3 }, { label: "We perform a manual call-back to the supplier, but the process is not consistently followed.", value: 2 }, { label: "We use automated bank account validation services and have a multi-step approval workflow.", value: 1 } ]},
        { id: "sm_qual_q3", text: "How is supplier compliance (e.g., insurance certificates, tax forms) tracked and managed?", options: [ { label: "It's not. We collect it at onboarding but have no process for tracking expirations.", value: 3 }, { label: "We use calendar reminders or spreadsheets, but it's a manual and unreliable process.", value: 2 }, { label: "The system automatically tracks expiration dates and triggers renewal workflows.", value: 1 } ]},
        { id: "sm_qual_q4", text: "How is supplier performance information shared between procurement, AP, and receiving?", options: [ { label: "It isn't. Each department has its own siloed view of the supplier.", value: 3 }, { label: "Through periodic meetings or email, but there is no single source of truth.", value: 2 }, { label: "Through a centralized supplier scorecard that is accessible to all stakeholders.", value: 1 } ]},
        { id: "sm_qual_q5", text: "What is the experience for a supplier trying to update their own information (e.g., a new address or contact)?", options: [ { label: "They have to email multiple contacts within our organization and hope the information gets to the right place.", value: 3 }, { label: "They have a designated contact, but that person then has to manually update multiple systems.", value: 2 }, { label: "They can log into a self-service portal and update their own profile, which triggers an approval workflow.", value: 1 } ]},
    ],
    quantitative: [
        { id: "sm_quant_q6", text: "How long does it take, on average, to fully onboard a new supplier and make them \"ready to transact\"?", options: [ { label: "> 14 days", value: 3 }, { label: "5 - 14 days", value: 2 }, { label: "< 5 days", value: 1 } ]},
        { id: "sm_quant_q7", text: "How many active suppliers are in your supplier master file?", options: [ { label: "A large, unmanageable number with many duplicates and inactive records.", value: 3 }, { label: "More than we'd like, and we know it needs to be cleansed.", value: 2 }, { label: "A clean, well-managed number of active suppliers.", value: 1 } ]},
        { id: "sm_quant_q8", text: "What percentage of your supplier master data is known to be inaccurate or out of date?", options: [ { label: "> 20%", value: 3 }, { label: "5% - 20%", value: 2 }, { label: "< 5%", value: 1 } ]},
        { id: "sm_quant_q9", text: "How many hours per month does the AP or Procurement team spend answering routine supplier inquiries?", options: [ { label: "> 40 hours", value: 3 }, { label: "10 - 40 hours", value: 2 }, { label: "< 10 hours", value: 1 } ]},
        { id: "sm_quant_q10", text: "In the last 24 months, has the company been a victim of supplier-related fraud (e.g., bank account takeover)?", options: [ { label: "Yes.", value: 3 }, { label: "We had a near-miss that was caught manually.", value: 2 }, { label: "No, our controls are effective.", value: 1 } ]},
    ]
  },
  invoiceDelivery: {
    qualitative: [
        { id: "id_qual_q1", text: "What is the process when a customer claims they never received an invoice?", options: [ { label: "We manually resend it, but have no way of knowing if the original was lost, ignored, or sent to the wrong person.", value: 3 }, { label: "We can check our email \"sent\" folder, but that provides limited insight.", value: 2 }, { label: "We can track the delivery status and see if the customer has opened or viewed the invoice.", value: 1 } ]},
        { id: "id_qual_q2", text: "Do your customers require you to manually log into their AP portals to submit invoices? How is this managed?", options: [ { label: "Yes, it's a completely manual and time-consuming process that our team hates.", value: 3 }, { label: "Yes, but we have a dedicated person or team to handle it. It's still a high cost for us.", value: 2 }, { label: "We have an automated solution that \"connects\" to these portals and submits invoices for us.", value: 1 } ]},
        { id: "id_qual_q3", text: "How are credit memos or revised invoices created and delivered to customers?", options: [ { label: "It's a manual, out-of-system process that often creates confusion for the customer and our AR team.", value: 3 }, { label: "We follow a similar process to our initial invoice delivery, with the same manual challenges.", value: 2 }, { label: "The system links the credit memo directly to the original invoice and delivers it through the same automated channel.", value: 1 } ]},
        { id: "id_qual_q4", text: "What is the impact of invoice delivery errors or delays on your collections process?", options: [ { label: "It's a primary driver of disputes and payment delays; collectors spend a lot of time just providing invoice copies.", value: 3 }, { label: "It's a known issue that slows down collections, but we work around it.", value: 2 }, { label: "It's not a major factor; our collections team can focus on actual collection activities.", value: 1 } ]},
        { id: "id_qual_q5", text: "How does the business handle compliance with various country-specific e-invoicing mandates?", options: [ { label: "We rely on local partners or manual processes in each country, which is complex and expensive.", value: 3 }, { label: "We are aware of the mandates but are struggling to develop a scalable strategy.", value: 2 }, { label: "We have a single solution that manages global e-invoicing compliance.", value: 1 } ]},
    ],
    quantitative: [
        { id: "id_quant_q6", text: "What percentage of your total invoices are sent manually (paper or individual email attachments)?", options: [ { label: "> 60%", value: 3 }, { label: "20% - 60%", value: 2 }, { label: "< 20%", value: 1 } ]},
        { id: "id_quant_q7", text: "What is your estimated cost to send a single paper invoice (labor, postage, materials)?", options: [ { label: "> $5.00", value: 3 }, { label: "$2.00 - $5.00", value: 2 }, { label: "< $2.00", value: 1 } ]},
        { id: "id_quant_q8", text: "On average, how many days does it take from goods shipment to successful invoice delivery?", options: [ { label: "> 5 days", value: 3 }, { label: "2 - 4 days", value: 2 }, { label: "< 2 days", value: 1 } ]},
        { id: "id_quant_q9", text: "What percentage of your total collections effort is spent providing customers with copies of invoices they claim not to have received?", options: [ { label: "> 25%", value: 3 }, { label: "10% - 25%", value: 2 }, { label: "< 10%", value: 1 } ]},
        { id: "id_quant_q10", text: "How many different customer AP portals does your team have to manually access each month?", options: [ { label: "> 10", value: 3 }, { label: "3 - 10", value: 2 }, { label: "< 3 or none", value: 1 } ]},
    ]
  },
  documentManagement: { // From "Part II: Content & Document Management"
    qualitative: [
        { id: "dm_qual_q1", text: "How do you manage version control for critical documents like contracts or policies?", options: [ { label: "We don't. We use file naming conventions like \"Contract_v2_FINAL_final\" and hope for the best.", value: 3 }, { label: "We rely on people to check documents in and out of a network drive, but it's not enforced.", value: 2 }, { label: "Our system manages versioning automatically, providing a full audit history of changes.", value: 1 } ]},
        { id: "dm_qual_q2", text: "Describe the process for finding a specific document needed for an audit or legal request.", options: [ { label: "It's a fire drill. We have to manually search through filing cabinets, network drives, and email archives.", value: 3 }, { label: "We have a general idea of where it is, but it takes significant time and effort to locate.", value: 2 }, { label: "We can find any document in seconds using metadata-based search.", value: 1 } ]},
        { id: "dm_qual_q3", text: "How are access permissions to sensitive documents (e.g., HR records, M&A files) managed?", options: [ { label: "We rely on network folder permissions, but they are complex and difficult to manage and audit.", value: 3 }, { label: "We have a system, but permissions are applied broadly, not on a per-document basis.", value: 2 }, { label: "We have granular, role-based security that can be applied to individual documents or content types.", value: 1 } ]},
        { id: "dm_qual_q4", text: "How are documents related to a single project or customer case (e.g., contracts, emails, drawings) grouped together?", options: [ { label: "They are not. They exist in different silos, and it's up to the user to know where to look.", value: 3 }, { label: "We try to enforce a standard folder structure, but it's inconsistent and incomplete.", value: 2 }, { label: "The system automatically relates documents based on metadata, providing a complete 360-degree view.", value: 1 } ]},
        { id: "dm_qual_q5", text: "What is the process for reviewing and approving a document with multiple stakeholders?", options: [ { label: "A long, confusing email chain with multiple attachments and conflicting feedback.", value: 3 }, { label: "We circulate a document for review, but consolidating feedback and tracking status is manual.", value: 2 }, { label: "We use a parallel approval workflow where all comments and changes are tracked in one place.", value: 1 } ]},
    ],
    quantitative: [
        { id: "dm_quant_q6", text: "On average, how many hours per week does a knowledge worker spend searching for information?", options: [ { label: "> 8 hours (a full day)", value: 3 }, { label: "3 - 7 hours", value: 2 }, { label: "< 3 hours", value: 1 } ]},
        { id: "dm_quant_q7", text: "What percentage of your critical business documents exist only in paper form?", options: [ { label: "> 30%", value: 3 }, { label: "10% - 30%", value: 2 }, { label: "< 10%", value: 1 } ]},
        { id: "dm_quant_q8", text: "How many different content repositories (e.g., network drives, SharePoint sites, Box, Dropbox) does the organization officially support or unofficially use?", options: [ { label: "> 10", value: 3 }, { label: "3 - 10", value: 2 }, { label: "1-2, with a clear governance strategy.", value: 1 } ]},
        { id: "dm_quant_q9", text: "What is the annual cost of your physical, off-site document storage?", options: [ { label: "A number that is known and considered a significant, non-value-add expense.", value: 3 }, { label: "We have some, but the cost is not seen as a major issue.", value: 2 }, { label: "We are nearly 100% paperless and have no off-site storage costs.", value: 1 } ]},
        { id: "dm_quant_q10", text: "In the past 12 months, how many times has a project been delayed due to an inability to find the correct document or information?", options: [ { label: "Frequently; it's a commonly accepted frustration.", value: 3 }, { label: "Occasionally; it happens but is not considered a critical business problem.", value: 2 }, { label: "Rarely or never.", value: 1 } ]},
    ]
  },
  workflowManagement: workflowManagementQualificationQuestions,
  // processMapping will be assigned after this object's declaration
  default: { // Fallback, though ideally not used if all modules are covered
    qualitative: [{ id: "def_qual_1", text: "Default Qualitative Question: No specific questions loaded for this module. Describe the qualitative aspects.", options: [{label: "High Pain", value: 3}, {label: "Medium Pain", value: 2}, {label: "Low Pain", value: 1}]}],
    quantitative: [{ id: "def_quant_1", text: "Default Quantitative Question: No specific questions loaded for this module. Provide relevant metrics.", options: [{label: "Significant Impact", value: 3}, {label: "Moderate Impact", value: 2}, {label: "Minor Impact", value: 1}]}]
  }
};

// Assign processMapping after QUALIFICATION_QUESTIONS_MODULE_TEMPLATES is declared
QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.processMapping = {
  qualitative: QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.workflowManagement.qualitative.map(q => ({...q, id: q.id.replace('wm_', 'pm_')})),
  quantitative: QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.workflowManagement.quantitative.map(q => ({...q, id: q.id.replace('wm_', 'pm_')})),
};


export const DEFAULT_QUALIFICATION_THRESHOLDS = {
  qualifiedMinAverage: 2.4, 
  clarificationMinAverage: 1.7, 
};

export const DISCOVERY_QUESTIONS_TEMPLATES: Record<string, { qualitative: DiscoveryQuestion[], quantitative: DiscoveryQuestion[] }> = {
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_pdf_1", text: "Could you walk me through the entire journey of a supplier invoice, from the moment it arrives at your organization to the moment the payment is sent and reconciled?" },
      { id: "ap_qual_pdf_2", text: "What different channels do you receive invoices through today (e.g., paper mail, email attachments, supplier portals, EDI)? How do you consolidate them?" },
      { id: "ap_qual_pdf_3", text: "Describe the process for manually keying invoice data into your accounting system. What are the most common types of data entry errors you encounter?" },
      { id: "ap_qual_pdf_4", text: "How do you handle the approval process for non-PO invoices? How are they routed, and what is the typical time it takes to get one approved?" },
      { id: "ap_qual_pdf_5", text: "When an invoice is being routed for approval, how does the AP team maintain visibility into its status and location? What happens if an approver is out of the office?" },
      { id: "ap_qual_pdf_6", text: "Explain your process for three-way matching. What percentage of your invoices require manual exception handling due to mismatches?" },
      { id: "ap_qual_pdf_7", text: "When an exception occurs (e.g., a price or quantity mismatch), what is the step-by-step process to resolve it? Who is typically involved?" },
      { id: "ap_qual_pdf_8", text: "How do you currently prevent or detect duplicate invoices from being paid? Can you share an example of when a duplicate payment has occurred?" },
      { id: "ap_qual_pdf_9", text: "What is the relationship like between the AP team and the procurement team? How often do they communicate regarding PO or supplier issues?" },
      { id: "ap_qual_pdf_10", text: "How does the AP team handle inquiries from suppliers asking about payment status? How much time is dedicated to responding to these inquiries each week?" },
      { id: "ap_qual_pdf_11", text: "Describe your process for managing supplier payment information. How do you validate a request from a supplier to change their bank account details to prevent fraud?" },
      { id: "ap_qual_pdf_12", text: "What are the biggest challenges your team faces during the month-end closing process related to accounts payable?" },
      { id: "ap_qual_pdf_13", text: "If you could change one thing about your current AP process to make your team's life easier, what would it be and why?" },
      { id: "ap_qual_pdf_14", text: "How does the current process impact your ability to capture early payment discounts? What is your strategy for managing payment terms?" }
    ],
    quantitative: [
      { id: "ap_quant_pdf_1", text: "What is the total number of invoices your team processes per month, and how many full-time employees (FTEs) are dedicated to the AP function?" },
      { id: "ap_quant_pdf_2", text: "What is your estimated cost to process a single invoice, considering labor, printing, postage, and storage?" },
      { id: "ap_quant_pdf_3", text: "What is the average time it takes to process an invoice from receipt to approval for payment?" },
      { id: "ap_quant_pdf_4", text: "What percentage of your supplier payments are currently made by paper check versus electronic methods (ACH, wire)?" },
      { id: "ap_quant_pdf_5", text: "How much did the company pay in late payment fees or penalties to suppliers in the last year?" },
      { id: "ap_quant_pdf_6", text: "What percentage of available early payment discounts do you successfully capture, and what is the estimated dollar value of the discounts missed annually?" }
    ],
  },
  expenseManagement: {
    qualitative: [
        { id: "em_qual_pdf_1", text: "Can you walk me through your current expense reporting process from the employee's perspective, from incurring an expense to receiving reimbursement?" },
        { id: "em_qual_pdf_2", text: "How do employees capture and submit receipts? What are the main challenges they face with managing paper receipts?" },
        { id: "em_qual_pdf_3", text: "Describe the process for a manager to review and approve their team's expense reports. What information do they check for?" },
        { id: "em_qual_pdf_4", text: "How is your corporate expense policy communicated to employees? How do you ensure compliance with this policy during the approval process?" },
        { id: "em_qual_pdf_5", text: "What happens when an expense report contains an out-of-policy or questionable item? What is the process for rejection and resubmission?" },
        { id: "em_qual_pdf_6", text: "How are corporate credit card transactions reconciled with expense reports? What challenges does this reconciliation process present?" },
        { id: "em_qual_pdf_7", text: "How much visibility does the finance team have into employee spending before expense reports are submitted?" },
        { id: "em_qual_pdf_8", text: "What is the most common complaint you hear from employees about the expense reporting process? What about from managers?" },
        { id: "em_qual_pdf_9", text: "How do you handle expenses incurred in different currencies?" },
        { id: "em_qual_pdf_10", text: "Describe the final step where the accounting team processes the approved reports for payment. What manual work is involved?" },
        { id: "em_qual_pdf_11", text: "How do you currently analyze T&E spend across the entire organization? Can you easily identify total spending with a specific airline or hotel chain?" },
        { id: "em_qual_pdf_12", text: "What is the process for auditing expense reports? How are reports selected for audit, and what are you looking for?" },
        { id: "em_qual_pdf_13", text: "How does the current process protect against fraudulent expense submissions?" },
        { id: "em_qual_pdf_14", text: "If you were to design the ideal expense management process, what key features would it have?" }
    ],
    quantitative: [
        { id: "em_quant_pdf_1", text: "How many expense reports are processed on a monthly basis, and how many FTEs are involved in processing and auditing them?" },
        { id: "em_quant_pdf_2", text: "What is the average time from when an employee submits an expense report to when they are reimbursed?" },
        { id: "em_quant_pdf_3", text: "What is your estimated cost to process a single expense report, including all labor from submission to reimbursement?" },
        { id: "em_quant_pdf_4", text: "What percentage of your T&E spend is considered \"maverick\" or non-compliant with policy?" },
        { id: "em_quant_pdf_5", text: "How many corporate credit cards are currently issued to employees?" },
        { id: "em_quant_pdf_6", text: "What is the total annual T&E spend for the organization?" }
    ],
  },
  procurement: {
    qualitative: [
        { id: "pr_qual_pdf_1", text: "Can you describe the process an employee follows when they need to purchase a good or service? Where does it start?" },
        { id: "pr_qual_pdf_2", text: "Walk me through your purchase requisition and approval workflow. How are approvers determined, and how long does it typically take?" },
        { id: "pr_qual_pdf_3", text: "How do you manage your list of approved suppliers? How do employees access this list when making a purchase request?" },
        { id: "pr_qual_pdf_4", text: "What happens when an employee needs to make an urgent or unplanned purchase? Does the process support this, or do they find workarounds?" },
        { id: "pr_qual_pdf_5", text: "Describe the level of visibility you have into company-wide spending. Can you easily track spend by category, department, or supplier?" },
        { id: "pr_qual_pdf_6", text: "How are contracts with suppliers managed and stored? How do you ensure that purchases are made in accordance with negotiated contract terms and pricing?" },
        { id: "pr_qual_pdf_7", text: "What is your strategy for managing \"maverick\" or off-contract spending? How significant of a challenge is this for your organization?" },
        { id: "pr_qual_pdf_8", text: "How does the procurement team communicate with the AP team to resolve issues like PO-invoice mismatches?" },
        { id: "pr_qual_pdf_9", text: "Describe your process for sourcing and evaluating new suppliers. What criteria are most important?" },
        { id: "pr_qual_pdf_10", text: "How do you currently measure and track supplier performance? What happens when a supplier consistently underperforms?" },
        { id: "pr_qual_pdf_11", text: "What are the biggest bottlenecks or sources of frustration in your current procure-to-pay process?" },
        { id: "pr_qual_pdf_12", text: "How does your procurement process contribute to your organization's risk management strategy, particularly concerning supplier compliance and fraud prevention?" },
        { id: "pr_qual_pdf_13", text: "How are budgets enforced within your procurement workflow?" },
        { id: "pr_qual_pdf_14", text: "What are your top three goals for the procurement function over the next 12-18 months?" }
    ],
    quantitative: [
        { id: "pr_quant_pdf_1", text: "What is the total annual spend that goes through the formal procurement process? What percentage is this of your total addressable spend?" },
        { id: "pr_quant_pdf_2", text: "What percentage of your total spend is considered maverick or unmanaged?" },
        { id: "pr_quant_pdf_3", text: "What is the average cycle time for a purchase requisition, from submission to PO creation?" },
        { id: "pr_quant_pdf_4", text: "How many purchase orders does your team generate per month?" },
        { id: "pr_quant_pdf_5", text: "What is your on-time delivery rate from your top 10 suppliers?" },
        { id: "pr_quant_pdf_6", text: "What were the total cost savings or cost avoidance figures achieved by the procurement team in the last fiscal year?" }
    ],
  },
  cashApplication: {
    qualitative: [
        { id: "ca_qual_pdf_1", text: "Could you describe the end-to-end process of applying a customer's payment, starting from when you receive the payment information from the bank?" },
        { id: "ca_qual_pdf_2", text: "What are the different payment methods your customers use (e.g., ACH, wire, check, credit card)? Which is the most challenging to process and why?" },
        { id: "ca_qual_pdf_3", text: "How do you receive remittance information from your customers? Does it typically arrive with the payment, or through separate channels like email or a portal?" },
        { id: "ca_qual_pdf_4", text: "Walk me through the process of matching a single large payment that covers multiple invoices. What manual steps are involved?" },
        { id: "ca_qual_pdf_5", text: "What happens when remittance information is missing or incomplete? What is the process for contacting the customer to get the necessary details?" },
        { id: "ca_qual_pdf_6", text: "How are payment discrepancies, such as short payments or deductions, identified and coded during the cash application process?" },
        { id: "ca_qual_pdf_7", text: "Once a deduction is identified, how is that information passed to the team responsible for investigating and resolving it?" },
        { id: "ca_qual_pdf_8", text: "Describe the process of handling payments received via a bank lockbox. What challenges does your team face with the data provided by the bank?" },
        { id: "ca_qual_pdf_9", text: "How does your team handle the manual posting of applied cash into your ERP system? What is the potential for error in this step?" },
        { id: "ca_qual_pdf_10", text: "What is the impact of unapplied cash on your collections process? Have collectors ever contacted customers for invoices that were paid but not yet applied?" },
        { id: "ca_qual_pdf_11", text: "How does a delay in cash application affect the credit department's ability to make decisions about releasing new orders?" },
        { id: "ca_qual_pdf_12", text: "What level of visibility do you have into the cash application process? Can you easily track key metrics and identify bottlenecks?" },
        { id: "ca_qual_pdf_13", text: "What are the biggest pain points for the cash application team on a daily basis?" },
        { id: "ca_qual_pdf_14", text: "How do you currently measure the success and efficiency of your cash application process?" }
    ],
    quantitative: [
        { id: "ca_quant_pdf_1", text: "What is the average number of payments you process per day or per month?" },
        { id: "ca_quant_pdf_2", text: "How many FTEs are dedicated to the cash application function?" },
        { id: "ca_quant_pdf_3", text: "What percentage of your payments are applied automatically without any manual intervention (your straight-through processing rate)?" },
        { id: "ca_quant_pdf_4", text: "On average, what is the value of cash sitting in \"unapplied\" or \"on-account\" status at the end of any given day?" },
        { id: "ca_quant_pdf_5", text: "How long does it take, on average, to fully apply a payment from the time you receive the bank file?" },
        { id: "ca_quant_pdf_6", text: "What percentage of your incoming payments have remittance advice that requires manual data extraction (e.g., from a PDF or email body)?" }
    ],
  },
  collectionManagement: {
    qualitative: [
        { id: "col_qual_pdf_1", text: "Can you walk me through your typical collections process, from the moment an invoice becomes past due to when payment is received?" },
        { id: "col_qual_pdf_2", text: "How do your collectors prioritize which customers to contact each day? What data or reports do they use?" },
        { id: "col_qual_pdf_3", text: "What communication methods does your team use for collections (e.g., phone calls, emails, letters)? How do you track this activity?" },
        { id: "col_qual_pdf_4", text: "How do you tailor your collection strategy for different customer segments (e.g., large strategic accounts vs. small businesses)?" },
        { id: "col_qual_pdf_5", text: "Describe the process for handling a \"promise to pay.\" How are these promises tracked, and what happens if a customer breaks their promise?" },
        { id: "col_qual_pdf_6", text: "When a customer states they have not paid because of a dispute or deduction, what is the collector's role and how is the issue escalated for resolution?" },
        { id: "col_qual_pdf_7", text: "How is information shared between the collections team and other departments like cash application, credit, and sales?" },
        { id: "col_qual_pdf_8", text: "What are the most common reasons customers give for late payments?" },
        { id: "col_qual_pdf_9", text: "How do you manage and document customer disputes within your collections process? Is there a central place to see all dispute-related activity?" },
        { id: "col_qual_pdf_10", text: "What kind of visibility do managers have into the collections team's performance and workload?" },
        { id: "col_qual_pdf_11", text: "How do you balance the need to collect cash with the goal of maintaining a positive customer relationship?" },
        { id: "col_qual_pdf_12", text: "What are the biggest challenges or frustrations for your collections team?" },
        { id: "col_qual_pdf_13", text: "How does your collections process provide feedback to the credit management team about customer payment behavior?" },
        { id: "col_qual_pdf_14", text: "What does your collections reporting look like? What KPIs do you track, and how are they used to improve the process?" }
    ],
    quantitative: [
        { id: "col_quant_pdf_1", text: "What is your current Days Sales Outstanding (DSO)? How has this trended over the past year?" },
        { id: "col_quant_pdf_2", text: "What is your Collection Effectiveness Index (CEI)?" },
        { id: "col_quant_pdf_3", text: "What percentage of your total AR portfolio is currently past due (e.g., >30, >60, >90 days)?" },
        { id: "col_quant_pdf_4", text: "What is your average days delinquent (ADD)?" },
        { id: "col_quant_pdf_5", text: "What is your bad debt write-off as a percentage of revenue for the last fiscal year?" },
        { id: "col_quant_pdf_6", text: "How many collectors (FTEs) do you have, and how many accounts does each collector manage on average?" }
    ],
  },
  creditManagement: {
    qualitative: [
        { id: "cr_qual_pdf_1", text: "Can you walk me through your process for establishing a credit limit for a new customer?" },
        { id: "cr_qual_pdf_2", text: "What sources of information do you use to assess a customer's creditworthiness (e.g., credit reports, financial statements, trade references)?" },
        { id: "cr_qual_pdf_3", text: "How long does the credit application and approval process typically take for a new customer?" },
        { id: "cr_qual_pdf_4", text: "Who is involved in the credit approval process? What are the approval hierarchies based on the requested credit amount?" },
        { id: "cr_qual_pdf_5", text: "How often do you review and update the credit limits of your existing customers? What triggers a review?" },
        { id: "cr_qual_pdf_6", text: "What is the process when a customer exceeds their credit limit? How are sales orders placed on credit hold, and who has the authority to release them?" },
        { id: "cr_qual_pdf_7", text: "How does the credit team collaborate with the sales team, especially when a credit decision might impact a potential sale?" },
        { id: "cr_qual_pdf_8", text: "How is a customer's payment history and behavior, as tracked by the collections team, factored into credit management decisions?" },
        { id: "cr_qual_pdf_9", text: "What are the main criteria for classifying a customer as high-risk? How do your payment terms differ for these customers?" },
        { id: "cr_qual_pdf_10", text: "Describe the biggest challenges your credit management team faces today." },
        { id: "cr_qual_pdf_11", text: "How is credit policy documented and communicated across the organization?" },
        { id: "cr_qual_pdf_12", text: "How do you measure the performance and effectiveness of your credit management function?" },
        { id: "cr_qual_pdf_13", text: "What is the process for managing blocked orders? How much time does the team spend on this activity?" },
        { id: "cr_qual_pdf_14", text: "If a customer's account is written off as bad debt, what is the post-mortem process to understand what happened and prevent recurrence?" }
    ],
    quantitative: [
        { id: "cr_quant_pdf_1", text: "What is your total bad debt expense for the last fiscal year, both in absolute dollars and as a percentage of revenue?" },
        { id: "cr_quant_pdf_2", text: "What percentage of your active customer base has an assigned credit limit?" },
        { id: "cr_quant_pdf_3", text: "On average, how many sales orders are placed on credit hold each week?" },
        { id: "cr_quant_pdf_4", text: "What is the average amount of time an order stays on credit hold before being released or canceled?" },
        { id: "cr_quant_pdf_5", text: "What percentage of your total AR portfolio is secured versus unsecured?" },
        { id: "cr_quant_pdf_6", text: "How many FTEs are dedicated to the credit management function?" }
    ],
  },
  orderManagement: {
    qualitative: [
        { id: "om_qual_pdf_1", text: "Can you walk me through the complete journey of a customer order, from the moment it is received to the point it is successfully delivered?" },
        { id: "om_qual_pdf_2", text: "Through what channels do you receive customer orders (e.g., email, website, EDI, sales rep)? How are these orders entered into your system?" },
        { id: "om_qual_pdf_3", text: "What are the most common errors or exceptions that occur during the order entry process?" },
        { id: "om_qual_pdf_4", text: "How does your sales team get visibility into inventory levels when they are placing an order or making a promise to a customer?" },
        { id: "om_qual_pdf_5", text: "Describe the communication and hand-off process between the sales/customer service team and the warehouse or production team." },
        { id: "om_qual_pdf_6", text: "How is order status communicated back to the customer? How do you handle customer inquiries about where their order is?" },
        { id: "om_qual_pdf_7", text: "What is your process for managing backorders or situations where an item is out of stock?" },
        { id: "om_qual_pdf_8", text: "How do you handle complex orders, such as those with multiple shipping locations, customized items, or special fulfillment rules?" },
        { id: "om_qual_pdf_9", text: "How are changes or cancellations to an existing order managed across different departments?" },
        { id: "om_qual_pdf_10", text: "Describe the picking, packing, and shipping process in your warehouse. What are the main bottlenecks?" },
        { id: "om_qual_pdf_11", text: "How does the order management system integrate with your inventory management and financial systems? What data is passed between them?" },
        { id: "om_qual_pdf_12", text: "What are the biggest challenges you face in meeting customer delivery expectations?" },
        { id: "om_qual_pdf_13", text: "How do you measure the performance of your order management process? What KPIs are most important to you?" },
        { id: "om_qual_pdf_14", text: "If you could wave a magic wand and fix one part of your order management process, what would it be?" }
    ],
    quantitative: [
        { id: "om_quant_pdf_1", text: "What is your average order fulfillment cycle time (from order receipt to shipment)?" },
        { id: "om_quant_pdf_2", text: "What is your on-time shipment rate?" },
        { id: "om_quant_pdf_3", text: "What is your order accuracy rate (i.e., percentage of orders shipped without errors)?" },
        { id: "om_quant_pdf_4", text: "What is your backorder rate as a percentage of total orders?" },
        { id: "om_quant_pdf_5", text: "How many orders do you process per day/week on average?" },
        { id: "om_quant_pdf_6", text: "What is the average cost to process a single order?" }
    ],
  },
  customerInquiryManagement: {
    qualitative: [
        { id: "cim_qual_pdf_1", text: "What are the primary channels through which customers submit inquiries (e.g., phone, email, web form, portal)?" },
        { id: "cim_qual_pdf_2", text: "Can you walk me through the lifecycle of a typical customer inquiry, for instance, a question about an invoice charge?" },
        { id: "cim_qual_pdf_3", text: "How are incoming inquiries logged, categorized, and assigned to the right person or team for resolution?" },
        { id: "cim_qual_pdf_4", text: "How do you prioritize inquiries? Are there SLAs in place for different types of inquiries?" },
        { id: "cim_qual_pdf_5", text: "What information does an agent have at their fingertips when they receive a customer inquiry? Do they have a single view of the customer's order history, invoices, and past communications?" },
        { id: "cim_qual_pdf_6", text: "How do you ensure consistency in the answers provided by different team members? Do you use a centralized knowledge base or response templates?" },
        { id: "cim_qual_pdf_7", text: "What are the most common types of inquiries your team receives?" },
        { id: "cim_qual_pdf_8", text: "Describe the process for handling an inquiry that requires collaboration with another department (e.g., sales, warehouse) to resolve." },
        { id: "cim_qual_pdf_9", text: "How is the customer kept informed about the status of their inquiry, especially if it cannot be resolved on the first contact?" },
        { id: "cim_qual_pdf_10", text: "What are the biggest challenges or frustrations for your customer service team when handling inquiries?" },
        { id: "cim_qual_pdf_11", text: "How do you gather feedback from customers about their experience with your inquiry management process?" },
        { id: "cim_qual_pdf_12", text: "How do you measure the performance of your inquiry management process? What KPIs do you track?" },
        { id: "cim_qual_pdf_13", text: "What is the escalation path for a difficult or unresolved customer inquiry?" },
        { id: "cim_qual_pdf_14", text: "Do you offer self-service options for customers to find answers to common questions or check the status of their orders/inquiries?" }
    ],
    quantitative: [
        { id: "cim_quant_pdf_1", text: "What is the total volume of customer inquiries you receive per week/month across all channels?" },
        { id: "cim_quant_pdf_2", text: "How many FTEs are dedicated to handling customer inquiries?" },
        { id: "cim_quant_pdf_3", text: "What is your First Contact Resolution (FCR) rate?" },
        { id: "cim_quant_pdf_4", text: "What is your average response time and average resolution time for an inquiry?" },
        { id: "cim_quant_pdf_5", text: "What is your customer satisfaction score (CSAT) related to inquiry resolution?" },
        { id: "cim_quant_pdf_6", text: "What percentage of inquiries are currently handled through self-service channels?" }
    ],
  },
  claimsDeductions: {
    qualitative: [
        { id: "cd_qual_pdf_1", text: "Can you walk me through the entire lifecycle of a customer deduction, from the moment it's identified to its final resolution?" },
        { id: "cd_qual_pdf_2", text: "How are deductions typically identified? Is it during cash application, or are you notified by the customer separately?" },
        { id: "cd_qual_pdf_3", text: "Once a deduction is identified, how is it logged, categorized by reason code, and assigned for investigation?" },
        { id: "cd_qual_pdf_4", text: "What are the most common reasons for customer deductions in your business (e.g., trade promotions, shipping shortages, damaged goods, pricing errors)?" },
        { id: "cd_qual_pdf_5", text: "Describe the step-by-step process an analyst follows to investigate a deduction. What documents do they need to gather?" },
        { id: "cd_qual_pdf_6", text: "Where is the necessary backup documentation (like PODs, BOLs, contracts) stored, and how easy is it for an analyst to access it?" },
        { id: "cd_qual_pdf_7", text: "How does your team collaborate with other departments like Sales, Logistics, and Warehouse to validate or invalidate a claim? What are the challenges in this collaboration?" },
        { id: "cd_qual_pdf_8", text: "What is the approval process for writing off a deduction or issuing a credit memo?" },
        { id: "cd_qual_pdf_9", text: "If a deduction is deemed invalid, what is the process for communicating this to the customer and collecting the outstanding balance?" },
        { id: "cd_qual_pdf_10", text: "How do you prioritize which deductions to work on? Is it based on dollar amount, customer, or age?" },
        { id: "cd_qual_pdf_11", text: "What are the biggest bottlenecks or frustrations in your current deductions management process?" },
        { id: "cd_qual_pdf_12", text: "How do you track and report on deduction-related metrics like DDO and recovery rates?" },
        { id: "cd_qual_pdf_13", text: "Do any of your major customers have specific portals or strict timelines for disputing deductions that you must adhere to?" },
        { id: "cd_qual_pdf_14", text: "How does the data from your deductions process provide feedback to other parts of the business to prevent future occurrences?" }
    ],
    quantitative: [
        { id: "cd_quant_pdf_1", text: "What is the total dollar value of new deductions created each month?" },
        { id: "cd_quant_pdf_2", text: "What is your current average Days Deductions Outstanding (DDO)?" },
        { id: "cd_quant_pdf_3", text: "What percentage of total deductions are ultimately written off as uncollectible? What is the annual dollar value of these write-offs?" },
        { id: "cd_quant_pdf_4", text: "What is your recovery rate for invalid deductions?" },
        { id: "cd_quant_pdf_5", text: "How many FTEs are dedicated to researching and resolving deductions?" },
        { id: "cd_quant_pdf_6", text: "What is the average number of deductions processed per analyst per month?" }
    ],
  },
  supplierManagement: {
    qualitative: [
        { id: "sm_qual_pdf_1", text: "Can you describe your end-to-end process for bringing on a new supplier, from initial identification to being ready to receive a PO?" },
        { id: "sm_qual_pdf_2", text: "What information and documentation do you collect from new suppliers during onboarding (e.g., tax forms, compliance certificates, bank details)?" },
        { id: "sm_qual_pdf_3", text: "How is this supplier information stored and maintained? Is it in a centralized system?" },
        { id: "sm_qual_pdf_4", text: "How do you ensure the accuracy and validity of supplier information, particularly banking details, to prevent fraud?" },
        { id: "sm_qual_pdf_5", text: "What is your process for assessing and managing supplier-related risks (e.g., financial, operational, compliance, geopolitical)?" },
        { id: "sm_qual_pdf_6", text: "How do you currently measure and track the performance of your key suppliers? What KPIs do you use (e.g., on-time delivery, quality/defect rate)?" },
        { id: "sm_qual_pdf_7", text: "What happens when a key supplier underperforms? What is the process for remediation or offboarding?" },
        { id: "sm_qual_pdf_8", text: "How do you communicate with your suppliers? Do you have a supplier portal for them to self-serve, update information, or check invoice status?" },
        { id: "sm_qual_pdf_9", text: "Describe your strategy for supplier segmentation. Do you manage strategic partners differently from transactional vendors?" },
        { id: "sm_qual_pdf_10", text: "How do you foster collaboration and build strong relationships with your most critical suppliers?" },
        { id: "sm_qual_pdf_11", text: "What are the biggest challenges you face in managing your supplier base today?" },
        { id: "sm_qual_pdf_12", text: "How resilient is your supply chain? What contingency plans do you have in place for disruptions with key suppliers?" },
        { id: "sm_qual_pdf_13", text: "What is the process for offboarding a supplier when a contract ends or a relationship is terminated?" },
        { id: "sm_qual_pdf_14", text: "How visible is supplier performance data to the procurement and AP teams to inform their daily decisions?" }
    ],
    quantitative: [
        { id: "sm_quant_pdf_1", text: "How many active suppliers do you currently have in your master file?" },
        { id: "sm_quant_pdf_2", text: "What percentage of your suppliers would you classify as strategic partners?" },
        { id: "sm_quant_pdf_3", text: "What is the on-time delivery rate across your key suppliers?" },
        { id: "sm_quant_pdf_4", text: "What is the defect or return rate for materials received from your key suppliers?" },
        { id: "sm_quant_pdf_5", text: "How many new suppliers do you onboard on average each month?" },
        { id: "sm_quant_pdf_6", text: "How long does it typically take to fully onboard a new supplier?" }
    ],
  },
  invoiceDelivery: {
    qualitative: [
        { id: "id_qual_pdf_1", text: "Can you walk me through your current process for sending invoices to your customers after goods have been shipped or services rendered?" },
        { id: "id_qual_pdf_2", text: "What formats do you use to send invoices (e.g., paper mail, PDF email attachment, EDI, AP portal submission)?" },
        { id: "id_qual_pdf_3", text: "What portion of your invoicing process is manual? Describe the steps involved in printing and mailing paper invoices." },
        { id: "id_qual_pdf_4", text: "How do you manage customer preferences for how they wish to receive invoices?" },
        { id: "id_qual_pdf_5", text: "Do you have customers who require you to submit invoices through their specific AP portal? If so, describe that process." },
        { id: "id_qual_pdf_6", text: "What are the most common reasons for a customer to reject an invoice or claim they never received it?" },
        { id: "id_qual_pdf_7", text: "How do you track the status of a sent invoice? How do you confirm that the customer has received and acknowledged it?" },
        { id: "id_qual_pdf_8", text: "What are the biggest challenges or costs associated with your current invoice delivery methods?" },
        { id: "id_qual_pdf_9", text: "How are invoice errors (e.g., wrong pricing, incorrect PO number) identified and corrected before the invoice is sent?" },
        { id: "id_qual_pdf_10", text: "How does the invoice delivery process integrate with your AR and collections systems?" },
        { id: "id_qual_pdf_11", text: "What is the impact of delayed invoice delivery on your DSO and collections efforts?" },
        { id: "id_qual_pdf_12", text: "How much time does your team spend responding to customer inquiries about missing or incorrect invoices?" },
        { id: "id_qual_pdf_13", text: "Do you currently have an e-invoicing solution in place? If so, what is the adoption rate among your customers?" },
        { id: "id_qual_pdf_14", text: "What are your organization's goals related to digitizing the invoicing process?" }
    ],
    quantitative: [
        { id: "id_quant_pdf_1", text: "What is the total number of invoices you send to customers each month?" },
        { id: "id_quant_pdf_2", text: "What percentage of your invoices are sent via paper mail versus electronically (email, portal, EDI)?" },
        { id: "id_quant_pdf_3", text: "What is your estimated \"all-in\" cost to send a single paper invoice (including paper, printing, postage, and labor)?" },
        { id: "id_quant_pdf_4", text: "On average, how many days does it take from the time goods are shipped to the time the invoice is delivered to the customer?" },
        { id: "id_quant_pdf_5", text: "What percentage of your invoices generate a subsequent inquiry or dispute from the customer?" },
        { id: "id_quant_pdf_6", text: "How many FTEs are involved in the invoice generation and distribution process?" }
    ],
  },
  documentManagement: { 
    qualitative: [
        { id: "dm_qual_pdf_1", text: "Where are your most critical business documents currently stored (e.g., contracts, HR files, financial records)? Are they in a centralized location or scattered across multiple systems?" },
        { id: "dm_qual_pdf_2", text: "Can you describe the process for an employee to find a specific document, for example, a supplier contract from two years ago?" },
        { id: "dm_qual_pdf_3", text: "How do you manage version control for collaborative documents? How do you ensure everyone is working from the most recent and approved version?" },
        { id: "dm_qual_pdf_4", text: "Walk me through the lifecycle of a critical document, such as a new policy or a client agreement, from creation to approval, distribution, and archival." },
        { id: "dm_qual_pdf_5", text: "How do you control access to sensitive or confidential documents? Describe your use of permissions and security protocols." },
        { id: "dm_qual_pdf_6", text: "What is your process for capturing and digitizing paper documents that enter the organization?" },
        { id: "dm_qual_pdf_7", text: "How are documents shared and collaborated on between different departments or with external parties?" },
        { id: "dm_qual_pdf_8", text: "What are your organization's policies regarding document retention and disposal? How is this policy enforced?" },
        { id: "dm_qual_pdf_9", text: "Describe your disaster recovery and business continuity plan for your critical documents. How are they backed up?" },
        { id: "dm_qual_pdf_10", text: "What are the biggest challenges or frustrations your employees face when it comes to finding, sharing, or managing documents?" },
        { id: "dm_qual_pdf_11", text: "How does your current document management approach support compliance with industry regulations (e.g., GDPR, HIPAA, SOX)?" },
        { id: "dm_qual_pdf_12", text: "How much physical office space is currently dedicated to storing paper documents?" },
        { id: "dm_qual_pdf_13", text: "How are documents linked to related records in your core business systems (e.g., an invoice linked to a customer record in the ERP)?" },
        { id: "dm_qual_pdf_14", text: "What is your vision for an ideal document management environment in your organization?" }
    ],
    quantitative: [
        { id: "dm_quant_pdf_1", text: "On average, how many hours per week does a typical employee spend searching for documents or information needed to do their job?" },
        { id: "dm_quant_pdf_2", text: "What is the estimated volume of new documents (both digital and physical) created or received by your organization each month?" },
        { id: "dm_quant_pdf_3", text: "What is the annual cost associated with off-site physical document storage?" },
        { id: "dm_quant_pdf_4", text: "How many different systems or repositories are currently used to store official business documents?" },
        { id: "dm_quant_pdf_5", text: "What is the total amount of digital storage (in TB) currently consumed by your documents?" },
        { id: "dm_quant_pdf_6", text: "In the last year, have there been any instances of data loss or security breaches related to business documents?" }
    ],
  },
  workflowManagement: { 
    qualitative: [
        { id: "wm_qual_pdf_1", text: "Can you select one key cross-departmental process (like new employee onboarding or customer order fulfillment) and walk me through it from start to finish?" },
        { id: "wm_qual_pdf_2", text: "How are your key business processes currently documented? Are there formal process maps or flowcharts available?" },
        { id: "wm_qual_pdf_3", text: "How do you currently identify bottlenecks or inefficiencies in your processes?" },
        { id: "wm_qual_pdf_4", text: "Describe the handoffs that occur between different teams or departments in a typical process. Where do things most often fall through the cracks?" },
        { id: "wm_qual_pdf_5", text: "How are tasks assigned and tracked within a process? How do employees know what they need to work on next?" },
        { id: "wm_qual_pdf_6", text: "What happens when an exception or an error occurs in the middle of a process? What is the escalation path?" },
        { id: "wm_qual_pdf_7", text: "How much visibility do managers have into the real-time status of the processes they oversee?" },
        { id: "wm_qual_pdf_8", text: "How are approvals for tasks or documents managed today? Is it done via email, in-person signatures, or another method?" },
        { id: "wm_qual_pdf_9", text: "When a process needs to be changed or updated, how is that change designed, communicated, and implemented across the organization?" },
        { id: "wm_qual_pdf_10", text: "What are the most repetitive, manual tasks that your teams perform on a daily basis that you wish could be automated?" },
        { id: "wm_qual_pdf_11", text: "How does your organization ensure that processes are executed consistently and in compliance with company policies and regulations?" },
        { id: "wm_qual_pdf_12", text: "What is the impact on the business or the customer experience when a key process is delayed?" },
        { id: "wm_qual_pdf_13", text: "How much of your team's time is spent on low-value, administrative tasks versus strategic, high-value work?" },
        { id: "wm_qual_pdf_14", text: "What are the top 1-3 processes that you believe are most in need of improvement or automation, and why?" }
    ],
    quantitative: [
        { id: "wm_quant_pdf_1", text: "What is the average end-to-end cycle time for a key process (e.g., time to hire, time to fulfill an order)?" },
        { id: "wm_quant_pdf_2", text: "What is the error rate for this process (i.e., percentage of times it needs to be reworked or corrected)?" },
        { id: "wm_quant_pdf_3", text: "How many different applications or systems does an employee need to interact with to complete this single process?" },
        { id: "wm_quant_pdf_4", text: "What is the average time a task waits in a queue before it is picked up by the next person in the process?" },
        { id: "wm_quant_pdf_5", text: "How many email threads or manual communications are typically required to complete one instance of this process?" },
        { id: "wm_quant_pdf_6", text: "What is the estimated cost of a single process failure or significant delay?" }
    ],
  },
  processMapping: { // Re-using Workflow Management questions, ensuring correct DiscoveryQuestion format
    qualitative: QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.workflowManagement.qualitative.map(q => ({id: q.id.replace('wm_', 'pm_'), text: q.text, isCustom: false })),
    quantitative: QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.workflowManagement.quantitative.map(q => ({id: q.id.replace('wm_', 'pm_'), text: q.text, isCustom: false })),
  },
  default: { // Corrected default: no options, has isCustom
    qualitative: [{ id: "def_qual_d_1", text: "Default Qualitative Discovery Question: No specific questions loaded for this module. Describe the qualitative aspects.", isCustom: false }],
    quantitative: [{ id: "def_quant_d_1", text: "Default Quantitative Discovery Question: No specific questions loaded for this module. Provide relevant metrics.", isCustom: false }]
  }
};

// Final check to ensure all modules from ALL_MODULES have an entry
// in DISCOVERY_QUESTIONS_TEMPLATES, using placeholders if necessary.
ALL_MODULES.forEach(module => {
    if (!DISCOVERY_QUESTIONS_TEMPLATES[module.id]) {
        console.warn(`Discovery questions for module ${module.name} (${module.id}) were not explicitly defined. Using generic placeholders.`);
        DISCOVERY_QUESTIONS_TEMPLATES[module.id] = {
             qualitative: [{ id: `${module.id.substring(0,3)}_qual_def_1`, text: `Default Qualitative Discovery Question for ${module.name}`, isCustom: false }],
             quantitative: [{ id: `${module.id.substring(0,3)}_quant_def_1`, text: `Default Quantitative Discovery Question for ${module.name}`, isCustom: false }]
        };
    }
});


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
  timeSavingPercentage: 0.60, 
  errorReductionPercentage: 0.50, 
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


// Helper to create ROI Inputs from DEMO_ROI_SPECIFIC_INPUTS keys
const createRoiInputsFromDemoKeys = (demoKeys: Record<string, string>): RoiInput[] => {
  return Object.keys(demoKeys).map(key => {
    let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Def Roi ', '').replace('Ap Roi ', '').replace('Cd Roi ', '').replace('Om Roi ', ''); // Basic formatting
    let type: "number" | "text" = "number";
    let unit: string | undefined = undefined;
    let isCurrency: boolean | undefined = undefined;
    let placeholder: string = "Enter value";

    if (key.toLowerCase().includes('time') && key.toLowerCase().includes('hrsweek')) {
        label = label.replace('Hrs Week', '(Hours/Week)');
        unit = "hours/week";
        placeholder = "e.g., 10";
    } else if (key.toLowerCase().includes('time') && key.toLowerCase().includes('mins')) {
        label = label.replace('Mins', '(Minutes)');
        unit = "minutes";
        placeholder = "e.g., 15";
    } else if (key.toLowerCase().includes('hrs') && !key.toLowerCase().includes('week')) {
        label = label.replace('Hrs', '(Hours)');
        unit = "hours";
        placeholder = "e.g., 2";
    } else if (key.toLowerCase().includes('percentage')) {
        label = label.replace('Percentage', '(%)');
        unit = "%";
        placeholder = "e.g., 5 for 5%";
    } else if (key.toLowerCase().includes('cost') || key.toLowerCase().includes('salary') || key.toLowerCase().includes('value')) {
        if (!label.includes('($)')) label += ' ($)';
        isCurrency = true;
        placeholder = "e.g., 10000";
    } else if (key.toLowerCase().includes('number') || key.toLowerCase().includes('num') || key.toLowerCase().includes('count') || key.toLowerCase().includes('ftes')) {
         placeholder = "e.g., 100";
    }


    // Specific overrides for known keys for better labels
    if (key === 'ap_roi_numInvoicesPerMonth') label = 'Number of Invoices Processed per Month';
    if (key === 'ap_roi_avgManualProcessingTimePerInvoiceMins') label = 'Avg. Manual Processing Time per Invoice (mins)';
    if (key === 'ap_roi_currentInvoiceErrorRatePercentage') label = 'Current Invoice Error Rate (%)';
    if (key === 'ap_roi_avgTimeToResolveExceptionMins') label = 'Avg. Time to Resolve Invoice Exception (mins)';
    if (key === 'ap_roi_annualValueMissedEarlyPaymentDiscounts') label = 'Annual Value of Missed Early Payment Discounts ($)';
    if (key === 'ap_roi_annualCostPhysicalInvoiceStorage') label = 'Annual Cost of Physical Invoice Storage ($)';
    if (key === 'ap_roi_numFTEs') label = 'Number of FTEs in AP Department';

    if (key === 'om_roi_numSalesOrdersPerMonth') label = 'Number of Sales Orders per Month';
    if (key === 'om_roi_avgManualOrderEntryTimeMins') label = 'Avg. Manual Order Entry Time (mins)';
    if (key === 'om_roi_currentOrderErrorRatePercentage') label = 'Current Order Error Rate (%)';
    if (key === 'om_roi_avgCostToReworkOrderError') label = 'Avg. Cost to Rework an Order Error ($)';
    if (key === 'om_roi_numFTEs') label = 'Number of FTEs in Order Management';
    
    if (key === 'cd_roi_deductionsProcessedPerMonth') label = 'Number of Deductions Processed per Month';
    if (key === 'cd_roi_avgResearchTimePerDeductionHrs') label = 'Avg. Research Time per Deduction (hrs)';
    if (key === 'cd_roi_percentageDeductionsInvalidPercentage') label = 'Percentage of Deductions Found Invalid (%)';
    if (key === 'cd_roi_totalValueOfDeductionsPerMonth') label = 'Total Value of Deductions per Month ($)';
    if (key === 'cd_roi_numFTEs') label = 'Number of FTEs for Deductions';

    if (key === 'def_roi_manualTaskTimeHrsWeek') label = 'Time Spent on Manual Tasks (Hours/Week/Employee)';
    if (key === 'def_roi_numberOfEmployeesPerformingTask') label = 'Number of Employees Performing These Tasks';
    if (key === 'def_roi_numTransactionsPerMonth') label = 'Number of Transactions/Items Processed per Month';
    if (key === 'def_roi_errorRatePercentage') label = 'Current Error Rate for Transactions (%)';
    if (key === 'def_roi_costPerError') label = 'Average Material Cost per Error ($)';
    if (key === 'def_roi_avgTimeToFixErrorMins') label = 'Average Time to Fix an Error (mins)';

    return {
      id: key,
      label,
      type,
      value: demoKeys[key] || (type === "number" ? "0" : ""), // Ensure initial value is string for input consistency
      unit,
      isCurrency,
      placeholder,
    };
  });
};

export const ROI_INPUT_TEMPLATES: Record<string, RoiInput[]> = {};

ALL_MODULES.forEach(module => {
  if (DEMO_ROI_SPECIFIC_INPUTS[module.id]) {
    ROI_INPUT_TEMPLATES[module.id] = createRoiInputsFromDemoKeys(DEMO_ROI_SPECIFIC_INPUTS[module.id]);
  } else {
    ROI_INPUT_TEMPLATES[module.id] = createRoiInputsFromDemoKeys(DEMO_ROI_SPECIFIC_INPUTS.default);
  }
});

if (!ROI_INPUT_TEMPLATES.default) {
   ROI_INPUT_TEMPLATES.default = createRoiInputsFromDemoKeys(DEMO_ROI_SPECIFIC_INPUTS.default);
}


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
    moduleData: {}, // Initialize as empty, App.tsx useEffect will populate
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

// Initialize module-specific data
ALL_MODULES.forEach(module => {
  // Initialize Qualification Module Data
  INITIAL_STATE.qualification.moduleData[module.id] = {
    qualitative: { answers: {}, averageScore: 0, status: QualificationStatus.NOT_STARTED },
    quantitative: { answers: {}, averageScore: 0, status: QualificationStatus.NOT_STARTED },
  };

  // Initialize Discovery Questions
  const discoveryTemplate = DISCOVERY_QUESTIONS_TEMPLATES[module.id] || DISCOVERY_QUESTIONS_TEMPLATES.default;
  INITIAL_STATE.discoveryQuestions[module.id] = {
    qualitative: discoveryTemplate.qualitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
    quantitative: discoveryTemplate.quantitative.map(q => ({ questionId: q.id, questionText: q.text, answer: "", isCustom: q.isCustom || false })),
  };

  // Initialize ROI Calculator
  const roiInputTemplate = ROI_INPUT_TEMPLATES[module.id] || ROI_INPUT_TEMPLATES.default; // Now defined
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
