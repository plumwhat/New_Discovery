
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
