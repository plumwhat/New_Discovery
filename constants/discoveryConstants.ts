import { EditableDiscoveryQuestionsTemplates } from '../types';

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
  managedITSupport: {
    qualitative: [
      { id: "ms_qual_1", text: "Describe your current IT support model (e.g., in-house team, outsourced provider, hybrid). What are its strengths and weaknesses?" },
      { id: "ms_qual_2", text: "What are the most common types of IT support requests or issues your end-users experience?" },
      { id: "ms_qual_3", text: "How satisfied are your end-users with the current IT support response times and resolution quality?" },
      { id: "ms_qual_4", text: "What processes are in place for IT asset management, including hardware and software inventory and lifecycle management?" },
      { id: "ms_qual_5", text: "How are IT system monitoring, patching, and preventative maintenance currently handled?" },
      { id: "ms_qual_6", text: "Are there specific IT skill gaps within your current team or challenges in retaining IT talent?" },
      { id: "ms_qual_7", text: "What are your organization's key IT strategic goals for the next 12-24 months (e.g., improving user experience, reducing IT costs, enhancing operational stability, supporting business growth)?" },
      { id: "ms_qual_8", text: "How does your current IT support structure align with your business continuity and disaster recovery plans?" },
      { id: "ms_qual_9", text: "What level of reporting and visibility do you have into IT support metrics (e.g., ticket volumes, resolution times, user satisfaction, system uptime)?" },
      { id: "ms_qual_10", text: "If you could significantly improve one aspect of your IT support and operations, what would it be?" },
    ],
    quantitative: [
      { id: "ms_quant_1", text: "How many end-users (employees, contractors) does your IT support system currently serve?", placeholderHint: "Enter number" },
      { id: "ms_quant_2", text: "What is the average monthly volume of IT support tickets or requests?", placeholderHint: "Enter number" },
      { id: "ms_quant_3", text: "What is your typical IT issue resolution time for critical vs. non-critical issues?", placeholderHint: "e.g., Critical: 2 hrs, Non-critical: 8 hrs" },
      { id: "ms_quant_4", text: "How many internal IT staff are dedicated to end-user support and IT operations (excluding strategic/development roles)?", placeholderHint: "Enter number of FTEs" },
      { id: "ms_quant_5", text: "What is your estimated annual budget for IT support (including internal staff costs, tools, and any external vendor fees)?", placeholderHint: "Enter currency amount" },
      { id: "ms_quant_6", text: "What percentage of IT issues are typically resolved on the first contact/interaction?", placeholderHint: "Enter percentage (First Call Resolution)" },
      { id: "ms_quant_7", text: "How many hours of IT system downtime (affecting multiple users) have you experienced in the last 6-12 months?", placeholderHint: "Enter number of hours" },
    ],
  },
  cybersecurityServices: {
    qualitative: [
      { id: "cs_qual_1", text: "What are your organization's primary cybersecurity concerns (e.g., ransomware, data breaches, phishing, insider threats, denial-of-service)?" },
      { id: "cs_qual_2", text: "Describe your current security infrastructure and tools (e.g., firewalls, EDR/XDR, SIEM, vulnerability scanners, email security). Are there any known gaps or areas needing an upgrade?" },
      { id: "cs_qual_3", text: "How do you currently manage security monitoring, threat detection, and incident response?" },
      { id: "cs_qual_4", text: "What are your key compliance or regulatory requirements related to data security and privacy (e.g., GDPR, Essential Eight, industry-specific standards)?" },
      { id: "cs_qual_5", text: "How is cybersecurity awareness and training handled for your employees? How effective do you find it?" },
      { id: "cs_qual_6", text: "What processes are in place for vulnerability management and security patching across your IT assets?" },
      { id: "cs_qual_7", text: "Do you conduct regular security assessments, penetration tests, or risk analyses? What were the key findings recently?" },
      { id: "cs_qual_8", text: "How is access to critical systems and sensitive data controlled and monitored within your organization?" },
      { id: "cs_qual_9", text: "What is your organization's plan for responding to a significant cybersecurity incident or data breach?" },
      { id: "cs_qual_10", text: "What level of visibility and reporting do you have on your overall security posture and threat landscape?" },
    ],
    quantitative: [
      { id: "cs_quant_1", text: "How many security incidents (requiring formal response) have you experienced in the last 12-24 months? What was the estimated impact (financial, operational, reputational)?" , placeholderHint: "Number & impact description"},
      { id: "cs_quant_2", text: "What is your current annual spend on cybersecurity tools, personnel, and services?", placeholderHint: "Enter currency amount" },
      { id: "cs_quant_3", text: "On average, how long does it take to detect and respond to a typical security alert or potential incident?", placeholderHint: "Enter time (e.g., hours or days)" },
      { id: "cs_quant_4", text: "How frequently are security audits or penetration tests conducted?", placeholderHint: "e.g., Annually, Bi-annually" },
      { id: "cs_quant_5", text: "Approximately how many endpoints (desktops, laptops, servers, mobile devices) and critical cloud assets need to be secured?", placeholderHint: "Enter number" },
      { id: "cs_quant_6", text: "What percentage of your IT budget is allocated to cybersecurity?", placeholderHint: "Enter percentage" },
      { id: "cs_quant_7", text: "How many dedicated cybersecurity FTEs do you have, or what portion of IT staff time is allocated to security tasks?", placeholderHint: "Enter number of FTEs or % time" },
    ]
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
      { id: "em_qual_10", text: "What are the goals for improving your expense management process?" }
    ],
    quantitative: [
      { id: "em_quant_1", text: "How many expense reports are processed per month?", placeholderHint: "Enter number" },
      { id: "em_quant_2", text: "What is the average time it takes for an employee to create an expense report?", placeholderHint: "Enter time (e.g., minutes)" },
      { id: "em_quant_3", text: "What is the average time it takes for the finance team to process one expense report?", placeholderHint: "Enter time (e.g., minutes)" },
      { id: "em_quant_4", text: "What is your company's total annual Travel & Expense (T&E) spend?", placeholderHint: "Enter currency amount" },
      { id: "em_quant_5", text: "What percentage of expense reports are submitted with errors or are out-of-policy?", placeholderHint: "Enter percentage" },
    ]
  },
  procurement: {
    qualitative: [
      { id: "proc_qual_1", text: "Can you describe your procure-to-pay (P2P) process, from requisition to supplier payment?" },
      { id: "proc_qual_2", text: "How do employees currently request goods or services?" },
      { id: "proc_qual_3", text: "What is the approval process for purchase requisitions and purchase orders?" },
      { id: "proc_qual_4", text: "How do you manage supplier catalogs and ensure employees are purchasing from preferred vendors at negotiated prices?" },
      { id: "proc_qual_5", text: "What are the biggest challenges in controlling 'maverick' or off-contract spending?" },
      { id: "proc_qual_6", text: "How do you track committed spend against budgets in real-time?" },
      { id: "proc_qual_7", text: "What is your process for receiving goods and services and matching them to purchase orders?" },
      { id: "proc_qual_8", text: "How are new suppliers onboarded and how is their information managed?" },
      { id: "proc_qual_9", text: "What level of visibility do you have into overall procurement spend and savings?" },
      { id: "proc_qual_10", text: "What are your primary goals for your procurement function (e.g., cost savings, risk mitigation, process efficiency)?" }
    ],
    quantitative: [
      { id: "proc_quant_1", text: "How many purchase orders (POs) do you generate per month?", placeholderHint: "Enter number" },
      { id: "proc_quant_2", text: "What is your total annual indirect spend?", placeholderHint: "Enter currency amount" },
      { id: "proc_quant_3", text: "What percentage of your spend is considered 'maverick' or off-contract?", placeholderHint: "Enter percentage" },
      { id: "proc_quant_4", text: "What is the average requisition-to-PO cycle time?", placeholderHint: "Enter time (e.g., days)" },
      { id: "proc_quant_5", text: "How many FTEs are involved in the procurement and purchasing process?", placeholderHint: "Enter number of FTEs" },
    ]
  },
  invoiceDelivery: {
    qualitative: [
      { id: "id_qual_1", text: "How are customer invoices created and delivered today?" },
      { id: "id_qual_2", text: "What formats do you use for sending invoices (e.g., paper, email PDF, EDI, portal upload)?" },
      { id: "id_qual_3", text: "What are the challenges associated with your current invoice delivery methods (e.g., cost of postage, delivery failures, customer preference)?" },
      { id: "id_qual_4", text: "How do you handle customer requests for invoice copies or questions about their invoices?" },
      { id: "id_qual_5", text: "Do you have visibility to confirm that a customer has received and viewed their invoice?" },
      { id: "id_qual_6", text: "How much manual effort is involved in printing, folding, stuffing, and mailing paper invoices?" },
      { id: "id_qual_7", text: "Are you able to comply with customer-specific delivery requirements (e.g., submitting to a specific portal)?" },
      { id: "id_qual_8", text: "How does your invoice delivery process impact your Days Sales Outstanding (DSO)?" },
      { id: "id_qual_9", text: "What systems are involved in generating invoice data and delivering the final invoice?" },
      { id: "id_qual_10", text: "What improvements would you like to see in your invoice delivery process?" }
    ],
    quantitative: [
      { id: "id_quant_1", text: "How many customer invoices do you send per month?", placeholderHint: "Enter number" },
      { id: "id_quant_2", text: "What percentage of your invoices are sent via paper mail?", placeholderHint: "Enter percentage" },
      { id: "id_quant_3", text: "What is the estimated cost (postage, paper, labour) to send one paper invoice?", placeholderHint: "Enter currency amount" },
      { id: "id_quant_4", text: "How many invoice-related inquiries does your AR/collections team handle per month?", placeholderHint: "Enter number" },
      { id: "id_quant_5", text: "What is the average number of days between invoice creation and invoice delivery to the customer?", placeholderHint: "Enter number of days" },
    ]
  },
  supplierManagement: {
    qualitative: [
      { id: "sm_qual_1", text: "Describe your current process for onboarding a new supplier." },
      { id: "sm_qual_2", text: "How do you collect and verify supplier information (e.g., banking details, compliance certificates, contact info)?" },
      { id: "sm_qual_3", text: "Where is supplier information stored, and how is it kept up-to-date?" },
      { id: "sm_qual_4", text: "What are the biggest challenges in managing your supplier master data?" },
      { id: "sm_qual_5", text: "How do you manage supplier risk and compliance (e.g., checking for sanctions, ensuring certifications are current)?" },
      { id: "sm_qual_6", text: "Do you have a self-service portal for suppliers to update their own information or check on invoice status?" },
      { id: "sm_qual_7", text: "How much time does your team spend responding to supplier inquiries?" },
      { id: "sm_qual_8", text: "What is the process for deactivating or archiving former suppliers?" },
      { id: "sm_qual_9", text: "How does your supplier management process integrate with your procurement and AP processes?" },
      { id: "sm_qual_10", text: "What are your key goals for improving supplier relationship management?" }
    ],
    quantitative: [
      { id: "sm_quant_1", text: "How many active suppliers do you have in your master file?", placeholderHint: "Enter number" },
      { id: "sm_quant_2", text: "How many new suppliers do you onboard on average per year?", placeholderHint: "Enter number" },
      { id: "sm_quant_3", text: "What is the average time it takes to fully onboard a new supplier?", placeholderHint: "Enter time (e.g., days)" },
      { id: "sm_quant_4", text: "What percentage of supplier data is estimated to be out-of-date or inaccurate?", placeholderHint: "Enter percentage" },
      { id: "sm_quant_5", text: "How many FTEs are involved in supplier master data management?", placeholderHint: "Enter number of FTEs" },
    ]
  },
  documentManagement: {
    qualitative: [
      { id: "dm_qual_1", text: "What are the most critical types of documents your business relies on daily (e.g., contracts, project files, HR records, quality documents)?" },
      { id: "dm_qual_2", text: "Can you describe the lifecycle of a typical important document, from creation to archiving?" },
      { id: "dm_qual_3", text: "What are the biggest frustrations your team has when it comes to finding or sharing documents?" },
      { id: "dm_qual_4", text: "How do you manage version control and ensure people are not working on outdated information?" },
      { id: "dm_qual_5", text: "What are your requirements for document security, access control, and compliance (e.g., GDPR, ISO standards)?" },
      { id: "dm_qual_6", text: "How do your remote or mobile workers access and collaborate on documents?" },
      { id: "dm_qual_7", text: "How are document-related processes, like review and approval workflows, currently managed?" },
      { id: "dm_qual_8", text: "What different systems or locations are currently used to store documents (e.g., network drives, SharePoint, email, physical cabinets)?" },
      { id: "dm_qual_9", text: "How much time is lost to recreating documents that can't be found?" },
      { id: "dm_qual_10", text: "What is your strategy for records management and document retention/disposal?" }
    ],
    quantitative: [
      { id: "dm_quant_1", text: "How many employees regularly create or need access to critical business documents?", placeholderHint: "Enter number" },
      { id: "dm_quant_2", text: "On average, how much time does an employee spend per week searching for documents or information?", placeholderHint: "Enter hours" },
      { id: "dm_quant_3", text: "What is the approximate total volume of your digital documents (in GB or TB)?", placeholderHint: "Enter storage amount" },
      { id: "dm_quant_4", text: "What is the estimated cost of physical document storage and retrieval per year?", placeholderHint: "Enter currency amount" },
      { id: "dm_quant_5", text: "How frequently do compliance or audit requests require significant effort to locate relevant documents?", placeholderHint: "e.g., times per year" },
    ]
  },
  workflowManagement: {
    qualitative: [
      { id: "wm_qual_1", text: "Which business processes are currently the most manual, time-consuming, or error-prone?" },
      { id: "wm_qual_2", text: "Can you walk me through a typical approval process (e.g., for a purchase, a document, a leave request)?" },
      { id: "wm_qual_3", text: "What are the consequences of delays or errors in these processes?" },
      { id: "wm_qual_4", text: "How are tasks handed off between different people or departments in a process?" },
      { id: "wm_qual_5", text: "What visibility do you have into the status of a process once it has started? Can you identify bottlenecks?" },
      { id: "wm_qual_6", text: "How are employees notified of tasks requiring their action?" },
      { id: "wm_qual_7", text: "How easy is it to adapt or change a process when business needs change?" },
      { id: "wm_qual_8", text: "What systems need to be involved or updated as part of these processes?" },
      { id: "wm_qual_9", text: "How are you ensuring compliance and creating audit trails for your key processes?" },
      { id: "wm_qual_10", text: "What is the business appetite for empowering departments to build their own simple workflows versus relying on IT?" }
    ],
    quantitative: [
      { id: "wm_quant_1", text: "How many instances of a key manual process do you run per month?", placeholderHint: "Enter number" },
      { id: "wm_quant_2", text: "What is the average end-to-end cycle time for this process?", placeholderHint: "Enter time (e.g., days, hours)" },
      { id: "wm_quant_3", text: "How many people or departments are typically involved in one cycle of the process?", placeholderHint: "Enter number" },
      { id: "wm_quant_4", text: "What percentage of process instances require rework or correction due to errors?", placeholderHint: "Enter percentage" },
      { id: "wm_quant_5", text: "How much time is spent by managers chasing approvals or status updates each week?", placeholderHint: "Enter hours" },
    ]
  },
  processMapping: {
    qualitative: [
      { id: "pm_qual_1", text: "Who is responsible for documenting business processes currently, and what tools do they use?" },
      { id: "pm_qual_2", text: "How are process maps stored, shared, and kept up-to-date?" },
      { id: "pm_qual_3", text: "What is the biggest challenge in achieving a shared understanding of how processes work across the organisation?" },
      { id: "pm_qual_4", text: "How often are processes reviewed or updated?" },
      { id: "pm_qual_5", text: "To what extent are current process maps used for training, compliance, or identifying automation opportunities?" }
    ],
    quantitative: [
      { id: "pm_quant_1", text: "How many critical business processes are currently undocumented or poorly documented?", placeholderHint: "Enter number" },
      { id: "pm_quant_2", text: "What is the estimated time (in hours) it takes for a new employee to get up to speed on a key process?", placeholderHint: "Enter hours" },
      { id: "pm_quant_3", text: "How much time is spent annually on audit preparations related to process documentation?", placeholderHint: "Enter hours or cost" },
      { id: "pm_quant_4", text: "What percentage of process-related projects are delayed due to unclear process definitions?", placeholderHint: "Enter percentage" }
    ]
  },
  default: {
    qualitative: [
      { id: "def_qual_1", text: "What are the primary qualitative challenges or goals for this module?" }
    ],
    quantitative: [
      { id: "def_quant_1", text: "What is the approximate volume of transactions/items handled by this process per month?", placeholderHint: "e.g., 500 reports, 1000 requests" },
      { id: "def_quant_2", text: "How many Full-Time Equivalent (FTE) employees are involved in this process?", placeholderHint: "Enter number" },
      { id: "def_quant_3", text: "What is the average time (in minutes or hours) to complete one cycle of this process manually?", placeholderHint: "e.g., 15 minutes" },
      { id: "def_quant_4", text: "What is the estimated error rate (%) in this manual process?", placeholderHint: "Enter percentage" }
    ]
  },
};
