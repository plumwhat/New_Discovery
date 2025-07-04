import { PainPointLevel1Pain, EditableReverseWaterfallCheatSheets, PainPointMode, PainPointsAppState, WaterfallStep, ModuleSolutionContent, ReverseWaterfallCheatSheetKeyPoint } from '../types';
import { ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB, ALL_MODULES } from './moduleConstants'; // Ensure ALL_MODULES is available if needed by logic here

export const PAIN_POINT_HIERARCHY: PainPointLevel1Pain[] = [
  {
    id: "L1_FIN_MANUAL_WORK",
    text: "Our finance department is overwhelmed with manual work, and we're struggling to close the books on time.",
    level2Pains: [
      {
        id: "L2_AP",
        text: "It takes too long to process and pay supplier invoices (Accounts Payable).",
        level3Questions: [
          {
            id: "L3_AP_Q1",
            text: "Could you describe how a supplier invoice gets from its arrival to the point where it's approved and paid?",
            answerOptions: [
              { id: "L3_AP_Q1_A1", text: "It's heavily paper-based, manual data entry, and physical routing for approvals.", leadsToSolutionMapping: { painIdentified: "Manual, paper-intensive AP processing with slow approvals.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_AP_Q1_A2", text: "Invoices arrive by email, but then they are printed for manual processing and coding.", leadsToSolutionMapping: { painIdentified: "Manual processing of emailed invoices, lacking automation.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_AP_Q1_A3", text: "We use an older system that requires a lot of manual intervention and isn't integrated well.", leadsToSolutionMapping: { painIdentified: "Outdated, non-integrated AP system causing inefficiencies.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_AP_Q1_A4", text: "Our process is largely automated, integrated, and efficient.", isNotAligned: true },
            ]
          },
          {
            id: "L3_AP_Q2",
            text: "How much visibility does your team have into the status of an invoice at any given time?",
            answerOptions: [
              { id: "L3_AP_Q2_A1", text: "Very little. We often have to manually search or ask around to find an invoice's status.", leadsToSolutionMapping: { painIdentified: "Lack of invoice status visibility in AP, leading to delays and supplier inquiries.", suggestedSolutionsProductIds: ["accountsPayable", "supplierManagement"] }},
              { id: "L3_AP_Q2_A2", text: "Only certain key people have visibility, it's not widely accessible.", leadsToSolutionMapping: { painIdentified: "Limited AP visibility, hindering proactive management.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_AP_Q2_A3", text: "We have some visibility through our ERP, but it's not real-time or very detailed.", leadsToSolutionMapping: { painIdentified: "Partial or delayed visibility into invoice statuses.", suggestedSolutionsProductIds: ["accountsPayable"] }},
              { id: "L3_AP_Q2_A4", text: "We have excellent real-time visibility for all stakeholders.", isNotAligned: true },
            ]
          },
        ],
      },
      {
        id: "L2_PROCURE",
        text: "Difficulty managing and controlling company spend (Procurement & Expenses).",
        level3Questions: [
          {
            id: "L3_PROCURE_Q1",
            text: "How does your team currently request and approve purchases?",
            answerOptions: [
              { id: "L3_PROCURE_Q1_A1", text: "It's an informal email/verbal process, hard to track and often bypasses policy.", leadsToSolutionMapping: { painIdentified: "Informal, untracked procurement leading to maverick spend.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_PROCURE_Q1_A2", text: "We use paper forms or spreadsheets, which are slow and lack spend visibility.", leadsToSolutionMapping: { painIdentified: "Manual, slow procurement processes with poor spend visibility.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_PROCURE_Q1_A3", text: "Our current system is cumbersome and not well-adopted by users.", leadsToSolutionMapping: { painIdentified: "Ineffective procurement system hindering adoption and control.", suggestedSolutionsProductIds: ["procurement"] }},
              { id: "L3_PROCURE_Q1_A4", text: "We have a streamlined, automated system for requisitions and approvals.", isNotAligned: true },
            ]
          },
          {
            id: "L3_PROCURE_Q2",
            text: "How are employee expense reports currently submitted and processed?",
            answerOptions: [
              { id: "L3_PROCURE_Q2_A1", text: "Employees submit paper receipts attached to spreadsheets, it's very manual.", leadsToSolutionMapping: { painIdentified: "Manual, paper-based expense reporting process.", suggestedSolutionsProductIds: ["expenseManagement"] }},
              { id: "L3_PROCURE_Q2_A2", text: "Processing expense reports takes a long time, and reimbursements are often delayed.", leadsToSolutionMapping: { painIdentified: "Slow expense report processing and reimbursement.", suggestedSolutionsProductIds: ["expenseManagement"] }},
              { id: "L3_PROCURE_Q2_A3", text: "Checking for policy compliance on expense reports is difficult and inconsistent.", leadsToSolutionMapping: { painIdentified: "Inconsistent expense policy compliance and enforcement.", suggestedSolutionsProductIds: ["expenseManagement"] }},
              { id: "L3_PROCURE_Q2_A4", text: "We use an online system with mobile receipt capture and automated policy checks.", isNotAligned: true },
            ]
          }
        ],
      },
      {
        id: "L2_SUPPLIER",
        text: "Managing supplier information and relationships is inefficient.",
        level3Questions: [
            {
                id: "L3_SUPPLIER_Q1",
                text: "What does your current supplier onboarding process look like?",
                answerOptions: [
                    { id: "L3_SUPPLIER_Q1_A1", text: "It's a manual process involving emails and spreadsheets to collect information.", leadsToSolutionMapping: { painIdentified: "Manual, inefficient supplier onboarding process.", suggestedSolutionsProductIds: ["supplierManagement"] }},
                    { id: "L3_SUPPLIER_Q1_A2", text: "We struggle to validate supplier data (e.g., bank details, compliance), which introduces risk.", leadsToSolutionMapping: { painIdentified: "Risk from unvalidated supplier data during onboarding.", suggestedSolutionsProductIds: ["supplierManagement"] }},
                    { id: "L3_SUPPLIER_Q1_A3", text: "We don't have a central place for supplier information, it's scattered.", leadsToSolutionMapping: { painIdentified: "Lack of a centralised supplier master data file.", suggestedSolutionsProductIds: ["supplierManagement", "documentManagement"] }},
                    { id: "L3_SUPPLIER_Q1_A4", text: "We have a self-service portal for suppliers to onboard themselves.", isNotAligned: true },
                ]
            }
        ]
      },
    ]
  },
  {
    id: "L1_FIN_DSO",
    text: "We are missing opportunities to capture discounts and our Days Sales Outstanding (DSO) is too high.",
    level2Pains: [
      {
        id: "L2_AR",
        text: "Delays in getting paid by our customers (Accounts Receivable).",
        level3Questions: [
          {
            id: "L3_AR_Q1",
            text: "Can you walk me through your current process for applying cash once a customer payment is received?",
            answerOptions: [
              { id: "L3_AR_Q1_A1", text: "It's highly manual, matching payments to invoices is slow and error-prone.", leadsToSolutionMapping: { painIdentified: "Manual, error-prone cash application process.", suggestedSolutionsProductIds: ["cashApplication"] }},
              { id: "L3_AR_Q1_A2", text: "We have a system, but it struggles with complex remittances or multiple currencies.", leadsToSolutionMapping: { painIdentified: "System limitations in handling complex remittances or FX.", suggestedSolutionsProductIds: ["cashApplication"] }},
              { id: "L3_AR_Q1_A3", text: "It's mostly automated and works fairly well.", isNotAligned: true },
            ]
          },
          {
            id: "L3_AR_Q2",
            text: "How do you currently handle remittances that don't match the invoice amount, like short payments or deductions?",
            answerOptions: [
              { id: "L3_AR_Q2_A1", text: "It's a very manual investigation process to identify and resolve them.", leadsToSolutionMapping: { painIdentified: "Manual, slow resolution of payment discrepancies and deductions.", suggestedSolutionsProductIds: ["claimsDeductions", "cashApplication"] }},
              { id: "L3_AR_Q2_A2", text: "We often write off small discrepancies due to lack of time to investigate.", leadsToSolutionMapping: { painIdentified: "Revenue leakage from uninvestigated short payments/deductions.", suggestedSolutionsProductIds: ["claimsDeductions"] }},
              { id: "L3_AR_Q2_A3", text: "We have a dedicated team, but they are overwhelmed with the volume.", leadsToSolutionMapping: { painIdentified: "High volume of claims/deductions overwhelming manual processes.", suggestedSolutionsProductIds: ["claimsDeductions", "collectionManagement"] }},
              { id: "L3_AR_Q2_A4", text: "This is rare, and we have clear procedures to handle them efficiently.", isNotAligned: true },
            ]
          },
          {
            id: "L3_AR_Q3",
            text: "When you have overdue accounts, what does your collections process typically involve?",
            answerOptions: [
              { id: "L3_AR_Q3_A1", text: "It's ad-hoc, mainly reactive emails and calls when accounts become very overdue.", leadsToSolutionMapping: { painIdentified: "Reactive, ad-hoc collections leading to high DSO.", suggestedSolutionsProductIds: ["collectionManagement"] }},
              { id: "L3_AR_Q3_A2", text: "We have a process, but it's manual, time-consuming, and hard to track consistently.", leadsToSolutionMapping: { painIdentified: "Manual, inconsistent collections process lacking visibility.", suggestedSolutionsProductIds: ["collectionManagement", "invoiceDelivery"] }},
              { id: "L3_AR_Q3_A3", text: "Our team uses spreadsheets and basic reminders, but it's not very effective for prioritisation.", leadsToSolutionMapping: { painIdentified: "Ineffective prioritisation and tracking in collections.", suggestedSolutionsProductIds: ["collectionManagement"] }},
              { id: "L3_AR_Q3_A4", text: "We have an automated system that manages reminders and escalations well.", isNotAligned: true },
            ]
          },
          {
            id: "L3_AR_Q4",
            text: "How do you handle delivering invoices to customers who have specific portal or format requirements?",
            answerOptions: [
                { id: "L3_AR_Q4_A1", text: "It's a completely manual process to log in to portals and upload invoices.", leadsToSolutionMapping: { painIdentified: "Manual invoice submission to customer AP portals.", suggestedSolutionsProductIds: ["invoiceDelivery"] }},
                { id: "L3_AR_Q4_A2", text: "We often face delays or rejections because we can't meet all the different format requirements.", leadsToSolutionMapping: { painIdentified: "Inability to meet diverse e-invoicing format requirements.", suggestedSolutionsProductIds: ["invoiceDelivery"] }},
                { id: "L3_AR_Q4_A3", text: "It delays our payments because if the invoice isn't delivered correctly, the clock hasn't started.", leadsToSolutionMapping: { painIdentified: "Delayed payments due to incorrect invoice delivery.", suggestedSolutionsProductIds: ["invoiceDelivery"] }},
                { id: "L3_AR_Q4_A4", text: "We use a service that handles multi-format and portal delivery for us.", isNotAligned: true },
            ]
          },
          {
            id: "L3_AR_Q5",
            text: "How does your team manage situations where a customer is on credit hold but needs to place an urgent order?",
            answerOptions: [
              { id: "L3_AR_Q5_A1", text: "It's a chaotic, manual scramble to get credit release approved, often delaying orders.", leadsToSolutionMapping: { painIdentified: "Inefficient manual credit hold and release processes.", suggestedSolutionsProductIds: ["creditManagement"] }},
              { id: "L3_AR_Q5_A2", text: "We lack clear visibility into credit status when taking orders, causing downstream problems.", leadsToSolutionMapping: { painIdentified: "Poor visibility of customer credit status during order entry.", suggestedSolutionsProductIds: ["creditManagement", "orderManagement"] }},
              { id: "L3_AR_Q5_A3", text: "Sales often overrides credit holds without proper checks, increasing risk.", isNotAligned: true },
              { id: "L3_AR_Q5_A4", text: "We have an integrated system that flags credit issues early and streamlines approvals.", isNotAligned: true },
            ]
          },
          {
            id: "L3_AR_Q7",
            text: "Do your customers have a way to view their invoices, payment history, or raise disputes online without contacting your team?",
            answerOptions: [
              { id: "L3_AR_Q7_A1", text: "No, all inquiries come through phone or email, which is a big workload.", leadsToSolutionMapping: { painIdentified: "Lack of customer self-service AR portal increasing manual workload.", suggestedSolutionsProductIds: ["invoiceDelivery", "customerInquiryManagement"] }},
              { id: "L3_AR_Q7_A2", text: "We have a basic portal, but it's not widely used or very functional.", leadsToSolutionMapping: { painIdentified: "Ineffective or underutilised customer AR portal.", suggestedSolutionsProductIds: ["invoiceDelivery"] }},
              { id: "L3_AR_Q7_A3", text: "We're considering it, but haven't implemented anything yet.", leadsToSolutionMapping: { painIdentified: "Considering but lacking customer self-service AR portal.", suggestedSolutionsProductIds: ["invoiceDelivery", "customerInquiryManagement"] } },
              { id: "L3_AR_Q7_A4", text: "Yes, our customers actively use a comprehensive self-service portal.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_BIZ_SALES_CS",
    text: "Our sales and customer service teams are bogged down by manual order entry and can't give customers fast updates.",
    level2Pains: [
      {
        id: "L2_ORDER_ENTRY",
        text: "Manual Sales Order Processing",
        level3Questions: [
            {
                id: "L3_ORDER_ENTRY_Q1",
                text: "Which best describes your sales order entry process?",
                answerOptions: [
                    { id: "L3_ORDER_ENTRY_Q1_A1", text: "It's a high-volume, manual data entry task that is prone to errors.", leadsToSolutionMapping: { painIdentified: "High manual workload in Sales Order Processing.", suggestedSolutionsProductIds: ["orderManagement"] }},
                    { id: "L3_ORDER_ENTRY_Q1_A2", text: "Our team has to deal with many different order formats (EDI, PDF, email), which complicates things.", leadsToSolutionMapping: { painIdentified: "Complexity from handling multiple order formats (EDI, PDF).", suggestedSolutionsProductIds: ["orderManagement"] }},
                    { id: "L3_ORDER_ENTRY_Q1_A3", text: "We have a system, but it's slow and not well integrated with inventory or shipping.", leadsToSolutionMapping: { painIdentified: "Slow and poorly integrated order management system.", suggestedSolutionsProductIds: ["orderManagement"] }},
                    { id: "L3_ORDER_ENTRY_Q1_A4", text: "It's largely automated and efficient.", isNotAligned: true }
                ]
            },
            {
                id: "L3_ORDER_ENTRY_Q2",
                text: "How do customers get updates on their order status?",
                answerOptions: [
                    { id: "L3_ORDER_ENTRY_Q2_A1", text: "They have to call or email our team, which takes up a lot of our time.", leadsToSolutionMapping: { painIdentified: "High volume of manual customer status inquiries.", suggestedSolutionsProductIds: ["customerInquiryManagement", "orderManagement"] }},
                    { id: "L3_ORDER_ENTRY_Q2_A2", text: "Our team lacks real-time visibility, so even they struggle to provide quick answers.", leadsToSolutionMapping: { painIdentified: "Poor order status visibility for internal teams and customers.", suggestedSolutionsProductIds: ["customerInquiryManagement", "orderManagement"] }},
                    { id: "L3_ORDER_ENTRY_Q2_A3", text: "We don't have a customer portal for self-service.", leadsToSolutionMapping: { painIdentified: "Lack of a customer self-service portal for order tracking.", suggestedSolutionsProductIds: ["orderManagement"] }},
                    { id: "L3_ORDER_ENTRY_Q2_A4", text: "Customers can track their orders through an online portal.", isNotAligned: true }
                ]
            }
        ]
      }
    ]
  },
  {
    id: "L1_BIZ_DOC_MGMT",
    text: "Finding the right document when we need it is a nightmare, and we're worried about version control and compliance.",
    level2Pains: [
      {
        id: "L2_DOC_CHAOS",
        text: "Difficulty finding and managing company documents and records.",
        level3Questions: [
          {
            id: "L3_DOC_CHAOS_Q1",
            text: "Where are your most critical business documents currently stored?",
            answerOptions: [
              { id: "L3_DOC_CHAOS_Q1_A1", text: "Across various network drives, local computers, and email inboxes.", leadsToSolutionMapping: { painIdentified: "Scattered, siloed document storage hindering access and control.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_DOC_CHAOS_Q1_A2", text: "Mainly in a shared drive, but the folder structure is chaotic and inconsistent.", leadsToSolutionMapping: { painIdentified: "Chaotic and inconsistent folder structures in shared drives.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_DOC_CHAOS_Q1_A3", text: "We use a system like SharePoint, but struggle with adoption and finding things.", leadsToSolutionMapping: { painIdentified: "Poor adoption and searchability in existing DMS (e.g., SharePoint).", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_DOC_CHAOS_Q1_A4", text: "We have a well-organized, central document management system.", isNotAligned: true },
            ]
          },
          {
            id: "L3_DOC_CHAOS_Q2",
            text: "How do you handle version control to ensure everyone is working on the correct document?",
            answerOptions: [
              { id: "L3_DOC_CHAOS_Q2_A1", text: "We don't, which often leads to confusion and rework.", leadsToSolutionMapping: { painIdentified: "Lack of version control causing confusion and rework.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_DOC_CHAOS_Q2_A2", text: "We use manual naming conventions like 'v1', 'v2', 'final', which is error-prone.", leadsToSolutionMapping: { painIdentified: "Error-prone manual versioning of documents.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_DOC_CHAOS_Q2_A3", text: "Our current system has check-in/check-out, but it's cumbersome.", leadsToSolutionMapping: { painIdentified: "Cumbersome check-in/check-out process in existing system.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_DOC_CHAOS_Q2_A4", text: "Our system handles versioning automatically and reliably.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_BIZ_PROCESS",
    text: "Our core business processes are inconsistent, hard to track, and rely on email and spreadsheets to get work done.",
     level2Pains: [
      {
        id: "L2_WORKFLOW",
        text: "Inefficient Internal Workflows and Approvals",
        level3Questions: [
          {
            id: "L3_WORKFLOW_Q1",
            text: "How do you currently manage workflows and approvals for key business processes?",
            answerOptions: [
              { id: "L3_WORKFLOW_Q1_A1", text: "Mainly through email chains and verbal follow-ups.", leadsToSolutionMapping: { painIdentified: "Inefficient, untrackable workflows based on email/verbal communication.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_WORKFLOW_Q1_A2", text: "We use spreadsheets or basic checklists to track progress.", leadsToSolutionMapping: { painIdentified: "Manual workflow tracking using spreadsheets.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_WORKFLOW_Q1_A3", text: "Our ERP has some workflow capabilities, but they are rigid and hard to adapt.", leadsToSolutionMapping: { painIdentified: "Rigid, inflexible ERP workflows hindering efficiency.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_WORKFLOW_Q1_A4", text: "We have a dedicated workflow automation platform.", isNotAligned: true },
            ]
          },
          {
            id: "L3_WORKFLOW_Q2",
            text: "How are your business processes currently documented, if at all?",
            answerOptions: [
              { id: "L3_WORKFLOW_Q2_A1", text: "They are not formally documented; it's mostly 'tribal knowledge'.", leadsToSolutionMapping: { painIdentified: "Lack of formal process documentation ('tribal knowledge').", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_WORKFLOW_Q2_A2", text: "We have outdated documents in various formats (Word, Visio) stored on shared drives.", leadsToSolutionMapping: { painIdentified: "Outdated and decentralised process documentation.", suggestedSolutionsProductIds: ["processMapping", "documentManagement"] }},
              { id: "L3_WORKFLOW_Q2_A3", text: "We try to document them, but it's hard to keep them current and get everyone to follow them.", leadsToSolutionMapping: { painIdentified: "Difficulty maintaining current and standardised process maps.", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_WORKFLOW_Q2_A4", text: "We use a central, collaborative process mapping tool.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_ITS_SUPPORT",
    text: "Our employees complain constantly about IT issues, and our internal IT team spends all their time 'fire-fighting' instead of on strategic projects.",
    level2Pains: [
      {
        id: "L2_IT_SUPPORT",
        text: "Our internal IT team is overwhelmed with daily support tasks.",
        level3Questions: [
          {
            id: "L3_IT_SUPPORT_Q1",
            text: "What percentage of your IT team's time is spent on reactive 'fire-fighting' versus proactive, strategic projects?",
            answerOptions: [
              { id: "L3_IT_SUPPORT_Q1_A1", text: "Almost entirely reactive (80%+).", leadsToSolutionMapping: { painIdentified: "IT team is stuck in reactive support mode.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_IT_SUPPORT_Q1_A2", text: "More reactive than proactive (60-80%).", leadsToSolutionMapping: { painIdentified: "IT team lacks time for strategic work due to support load.", suggestedSolutionsProductIds: ["managedITSupport", "itConsulting"] }},
              { id: "L3_IT_SUPPORT_Q1_A3", text: "It's about a 50/50 split.", isNotAligned: true },
              { id: "L3_IT_SUPPORT_Q1_A4", text: "Mostly proactive and strategic.", isNotAligned: true },
            ]
          },
          {
            id: "L3_IT_SUPPORT_Q2",
            text: "How do you handle IT support requests when your team is unavailable (e.g., after hours, holidays)?",
            answerOptions: [
              { id: "L3_IT_SUPPORT_Q2_A1", text: "We don't have formal after-hours support, which is a risk.", leadsToSolutionMapping: { painIdentified: "Lack of after-hours IT support creates business risk.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_IT_SUPPORT_Q2_A2", text: "Team members are on-call, but it leads to burnout and inconsistent response.", leadsToSolutionMapping: { painIdentified: "On-call IT support model causing staff burnout.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_IT_SUPPORT_Q2_A3", text: "We have a basic third-party service, but they lack knowledge of our specific systems.", isNotAligned: true },
              { id: "L3_IT_SUPPORT_Q2_A4", text: "We have a fully managed 24/7 support agreement.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_ITS_SECURITY",
    text: "We're increasingly concerned about cybersecurity threats like ransomware and phishing, and we're not sure if we're adequately protected.",
    level2Pains: [
      {
        id: "L2_IT_SECURITY",
        text: "We are worried about our cybersecurity posture and potential threats.",
        level3Questions: [
          {
            id: "L3_IT_SECURITY_Q1",
            text: "How do you currently monitor your IT environment for security threats?",
            answerOptions: [
              { id: "L3_IT_SECURITY_Q1_A1", text: "We rely on basic antivirus and firewall logs, but don't actively monitor them.", leadsToSolutionMapping: { painIdentified: "Reactive security monitoring, relying on basic tools.", suggestedSolutionsProductIds: ["cybersecurityServices", "managedITSupport"] }},
              { id: "L3_IT_SECURITY_Q1_A2", text: "We lack the in-house expertise to manage advanced security tools effectively.", leadsToSolutionMapping: { painIdentified: "Internal skills gap for managing security tools.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_IT_SECURITY_Q1_A3", text: "We get too many alerts and struggle to identify the real threats.", leadsToSolutionMapping: { painIdentified: "Alert fatigue from security tools, difficulty identifying real threats.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_IT_SECURITY_Q1_A4", text: "We have a dedicated SOC/MDR service that handles this for us.", isNotAligned: true },
            ]
          },
          {
            id: "L3_IT_SECURITY_Q2",
            text: "How confident are you in your ability to recover from a major security incident like ransomware?",
            answerOptions: [
              { id: "L3_IT_SECURITY_Q2_A1", text: "Not confident. Our backup and recovery plans are untested or inadequate.", leadsToSolutionMapping: { painIdentified: "Inadequate or untested disaster recovery/backup plans.", suggestedSolutionsProductIds: ["cybersecurityServices", "cloudSolutions", "managedITSupport"] }},
              { id: "L3_IT_SECURITY_Q2_A2", text: "We have backups, but we're unsure how quickly we could restore operations.", leadsToSolutionMapping: { painIdentified: "Uncertainty over recovery time objective (RTO) for backups.", suggestedSolutionsProductIds: ["cybersecurityServices", "cloudSolutions"] }},
              { id: "L3_IT_SECURITY_Q2_A3", text: "We have a plan, but it has not been tested recently.", isNotAligned: true },
              { id: "L3_IT_SECURITY_Q2_A4", text: "We have a robust, regularly tested incident response and recovery plan.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_ITS_INFRA",
    text: "Our current IT infrastructure feels outdated and is struggling to support our business needs, especially with remote work.",
    level2Pains: [
      {
        id: "L2_IT_INFRA",
        text: "Our IT infrastructure feels outdated and is struggling to keep up with business needs.",
        level3Questions: [
          {
            id: "L3_IT_INFRA_Q1",
            text: "What are the primary drivers for considering an infrastructure update (e.g., performance, reliability, security, remote work support)?",
            answerOptions: [
              { id: "L3_IT_INFRA_Q1_A1", text: "Our on-premise servers are aging and require significant capital to replace.", leadsToSolutionMapping: { painIdentified: "High capital expenditure needed for aging on-premise hardware.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_IT_INFRA_Q1_A2", text: "We need better support for a hybrid/remote workforce with secure access.", leadsToSolutionMapping: { painIdentified: "Need for better remote/hybrid work support and security.", suggestedSolutionsProductIds: ["modernWorkplaceITS", "cloudSolutions", "networkServices"] }},
              { id: "L3_IT_INFRA_Q1_A3", text: "Our network performance is a constant source of complaints and bottlenecks.", leadsToSolutionMapping: { painIdentified: "Poor network performance causing user complaints.", suggestedSolutionsProductIds: ["networkServices", "managedITSupport"] }},
              { id: "L3_IT_INFRA_Q1_A4", text: "We're unsure which path to take (cloud, hybrid, on-prem refresh) and need expert guidance.", leadsToSolutionMapping: { painIdentified: "Lack of clear IT strategy for infrastructure modernisation.", suggestedSolutionsProductIds: ["itConsulting"] }},
            ]
          },
          {
            id: "L3_IT_INFRA_Q2",
            text: "How are you currently leveraging cloud services?",
            answerOptions: [
              { id: "L3_IT_INFRA_Q2_A1", text: "We are not using the cloud much, if at all, and are concerned about the complexity.", leadsToSolutionMapping: { painIdentified: "Hesitancy to adopt cloud due to perceived complexity.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_IT_INFRA_Q2_A2", text: "We use some SaaS apps (like M365), but our core infrastructure is on-premise.", leadsToSolutionMapping: { painIdentified: "Limited cloud adoption, primarily SaaS apps.", suggestedSolutionsProductIds: ["cloudSolutions", "modernWorkplaceITS"] }},
              { id: "L3_IT_INFRA_Q2_A3", text: "We have some workloads in the cloud, but costs are getting hard to manage and visibility is poor.", leadsToSolutionMapping: { painIdentified: "Cloud cost management and visibility challenges.", suggestedSolutionsProductIds: ["cloudSolutions", "managedITSupport"] }},
              { id: "L3_IT_INFRA_Q2_A4", text: "We have a well-defined and managed hybrid/multi-cloud strategy.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  }
];

export const REVERSE_WATERFALL_CHEAT_SHEETS: EditableReverseWaterfallCheatSheets = {
  accountsPayable: {
    objective: "Uncover inefficiencies in the supplier invoice lifecycle to position AP Automation.",
    highLevelPain: "Our finance department is overwhelmed with manual work, and we're struggling to close the books on time.",
    specificProcessPain: "It takes too long to process and pay supplier invoices (Accounts Payable).",
    keyDiscoveryPoints: [
      { id: "rwcs_ap_1", question: "How much time does your team spend manually keying in invoice data?", aligningAnswer: "A significant amount; it's a major part of their day." },
      { id: "rwcs_ap_2", question: "What happens when an invoice needs approval from someone outside of finance?", aligningAnswer: "It gets sent by email and often gets lost or forgotten, delaying payment." },
      { id: "rwcs_ap_3", question: "How often are you able to capture early payment discounts?", aligningAnswer: "Rarely, if ever. Our process is too slow to meet the deadlines." },
      { id: "rwcs_ap_4", question: "How do suppliers inquire about the status of their payments?", aligningAnswer: "They call or email our AP team, which takes up a lot of their time." },
    ],
    keyBenefits: [
        "Reduce invoice processing costs by up to 80%.",
        "Capture more early payment discounts.",
        "Eliminate late payment penalties.",
        "Improve AP team productivity and morale.",
        "Enhance visibility and control over cash flow."
    ]
  },
  orderManagement: {
    objective: "Identify bottlenecks in order processing to position Order Management automation.",
    highLevelPain: "Our sales and customer service teams are bogged down by manual order entry and can't give customers fast updates.",
    specificProcessPain: "Manual Sales Order Processing",
    keyDiscoveryPoints: [
      { id: "rwcs_om_1", question: "How many different formats (e.g., email, PDF, EDI) do your sales orders arrive in?", aligningAnswer: "Many, and our team has to manually enter all of them, which is slow and causes errors." },
      { id: "rwcs_om_2", question: "What is the business impact of an order entry error?", aligningAnswer: "It causes shipping delays, incorrect invoices, and unhappy customers." },
      { id: "rwcs_om_3", question: "How much time does your customer service team spend answering 'Where is my order?' questions?", aligningAnswer: "A huge amount. They don't have real-time visibility to give quick answers." },
      { id: "rwcs_om_4", question: "How do you handle order volume spikes during peak seasons?", aligningAnswer: "We have to bring in temporary staff or work a lot of overtime, which is costly." },
    ],
    keyBenefits: [
        "Accelerate order processing from days/hours to minutes.",
        "Eliminate manual data entry errors and reduce rework.",
        "Improve customer satisfaction with faster confirmations and fewer mistakes.",
        "Increase team productivity by automating repetitive tasks.",
        "Provide real-time visibility into order status for staff and customers."
    ]
  },
  customerInquiryManagement: {
    objective: "Highlight inefficiencies in responding to customer queries to position an inquiry management solution.",
    highLevelPain: "Our sales and customer service teams are bogged down... and can't give customers fast updates.",
    specificProcessPain: "High volume of manual customer status inquiries.",
    keyDiscoveryPoints: [
      { id: "rwcs_cim_1", question: "What are the most common questions your customer service team receives?", aligningAnswer: "Order status, invoice copies, and stock availability." },
      { id: "rwcs_cim_2", question: "How many different systems does an agent have to check to answer a single customer question?", aligningAnswer: "Several, they have to check the ERP, the shipping system, and their email." },
      { id: "rwcs_cim_3", question: "How do you ensure every customer inquiry gets a consistent and timely response?", aligningAnswer: "It's difficult. We rely on shared inboxes, and things can get missed." },
      { id: "rwcs_cim_4", question: "Have you considered a self-service portal where customers could find answers themselves?", aligningAnswer: "We'd love to, but we don't have the technology to support it." },
    ],
    keyBenefits: [
        "Reduce manual workload on customer service teams by up to 50%.",
        "Improve First Contact Resolution (FCR) rates.",
        "Provide 24/7 self-service options for customers.",
        "Ensure consistent, accurate responses to all inquiries.",
        "Gain insights into customer query trends to improve underlying processes."
    ]
  },
  cashApplication: {
    objective: "Uncover challenges in matching payments to invoices to position cash application automation.",
    highLevelPain: "We are missing opportunities... and our Days Sales Outstanding (DSO) is too high.",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
      { id: "rwcs_ca_1", question: "What percentage of your customer payments require manual work to match them to the correct invoices?", aligningAnswer: "A very high percentage. Remittance information often comes separately or is missing." },
      { id: "rwcs_ca_2", question: "How much time does your team spend on the manual, repetitive task of keying in remittance data?", aligningAnswer: "It's one of their primary and most time-consuming tasks." },
      { id: "rwcs_ca_3", question: "How does unapplied cash at the end of the month impact your financial closing process and collections efforts?", aligningAnswer: "It's a major headache. It complicates our reporting and our collectors call customers about invoices that have already been paid." },
      { id: "rwcs_ca_4", question: "How do you handle complex payments, such as those covering hundreds of invoices or involving multiple deductions?", aligningAnswer: "With great difficulty. It can take hours or even days to reconcile a single complex payment." },
    ],
    keyBenefits: [
        "Increase auto-match rates to over 90%, freeing up significant staff time.",
        "Reduce unapplied cash and improve the accuracy of your AR ledger.",
        "Accelerate cash flow by applying payments faster.",
        "Improve collector efficiency by giving them a real-time view of paid invoices.",
        "Streamline the handling of deductions and short payments."
    ]
  },
  collectionManagement: {
    objective: "Identify inefficiencies in the collections process to position a collections automation solution.",
    highLevelPain: "We are missing opportunities... and our Days Sales Outstanding (DSO) is too high.",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
      { id: "rwcs_coll_1", question: "How do your collectors decide who to call each day?", aligningAnswer: "They mostly work off a standard aging report, but it's hard to prioritise effectively." },
      { id: "rwcs_coll_2", question: "How much of a collector's day is spent on administrative tasks like drafting reminder emails versus actually speaking with customers?", aligningAnswer: "A lot of time is spent on manual admin tasks, which limits their strategic impact." },
      { id: "rwcs_coll_3", question: "How do you track payment promises from customers and ensure they are followed up on?", aligningAnswer: "It's usually done with manual notes or calendar reminders, which are not always reliable." },
      { id: "rwcs_coll_4", question: "When a customer disputes an invoice during a collections call, how easy is it for the collector to access all the relevant documents?", aligningAnswer: "They often have to put the customer on hold or call them back while they find the information in another system." },
    ],
    keyBenefits: [
        "Reduce Days Sales Outstanding (DSO) by improving collections efficiency.",
        "Automate reminders and dunning notices to save collector time.",
        "Prioritise collection activities based on risk and value.",
        "Improve cash flow forecasting with better promise-to-pay tracking.",
        "Centralise collections information for more effective customer conversations."
    ]
  },
  procurement: {
    objective: "Identify uncontrolled spending and inefficient purchasing processes to position a procure-to-pay solution.",
    highLevelPain: "Our finance department is overwhelmed... and we're struggling to control company spend.",
    specificProcessPain: "Difficulty managing and controlling company spend (Procurement & Expenses).",
    keyDiscoveryPoints: [
        { id: "rwcs_proc_1", question: "How do you prevent employees from buying from non-preferred suppliers or outside of negotiated contracts ('maverick spend')?", aligningAnswer: "It's very difficult. We have policies, but no real way to enforce them before the purchase is made." },
        { id: "rwcs_proc_2", question: "What is the approval process like for a new purchase request?", aligningAnswer: "It's an email chain that can get stuck with one person for days, with no visibility on the status." },
        { id: "rwcs_proc_3", question: "How can department heads see how much of their budget has been spent or committed?", aligningAnswer: "They can't easily. They have to ask finance, who then has to manually compile the information." },
        { id: "rwcs_proc_4", question: "How do you ensure that you are being billed correctly for what you ordered?", aligningAnswer: "Our AP team does a 3-way match, but it's a very manual process because the PO and receiving data are in different systems." },
    ],
    keyBenefits: [
        "Increase spend under management and reduce maverick buying.",
        "Accelerate procure-to-pay cycle times.",
        "Improve budget visibility and control for all stakeholders.",
        "Leverage early payment discounts through faster invoice processing.",
        "Strengthen compliance and audit trails for all purchasing activities."
    ]
  },
  documentManagement: {
    objective: "Identify challenges with document access, version control, and security to position a central DMS.",
    highLevelPain: "Finding the right document when we need it is a nightmare, and we're worried about version control and compliance.",
    specificProcessPain: "Difficulty finding and managing company documents and records.",
    keyDiscoveryPoints: [
      { id: "rwcs_dm_1", question: "How do you ensure everyone is working from the latest version of a document?", aligningAnswer: "We don't have a reliable way; we often use file names like 'v2_final_final'." },
      { id: "rwcs_dm_2", question: "If you needed to find all contracts with a specific client, how would you do that?", aligningAnswer: "I would have to search through multiple shared drives and hope I find them all." },
      { id: "rwcs_dm_3", question: "How are sensitive documents (e.g., HR, legal) secured to prevent unauthorized access?", aligningAnswer: "We rely on basic folder permissions, but it's not very granular or secure." },
      { id: "rwcs_dm_4", question: "What is the process for approving a new policy document?", aligningAnswer: "It's an email chain that's hard to track, and we're never sure who has the final approved copy." },
    ],
    keyBenefits: [
        "Reduce time spent searching for information by up to 50%.",
        "Improve collaboration and eliminate rework from versioning errors.",
        "Enhance security and compliance with robust access controls.",
        "Automate document-centric workflows like review and approval.",
        "Provide a single source of truth for all critical business information."
    ]
  },
  workflowManagement: {
    objective: "Uncover manual, inconsistent, and untraceable processes to position a workflow automation platform.",
    highLevelPain: "Our core business processes are inconsistent, hard to track, and rely on email and spreadsheets to get work done.",
    specificProcessPain: "Inefficient Internal Workflows and Approvals",
    keyDiscoveryPoints: [
        { id: "rwcs_wm_1", question: "Can you walk me through a common approval process, like new hire onboarding or capital expenditure requests?", aligningAnswer: "It starts with an email, which gets forwarded multiple times. It's impossible to know where it is in the process." },
        { id: "rwcs_wm_2", question: "What happens if a key approver is on vacation?", aligningAnswer: "The process just stops until they get back. It's a major bottleneck." },
        { id: "rwcs_wm_3", question: "How do you ensure that all the required steps and information for a process are completed every time?", aligningAnswer: "We use manual checklists, but things are often missed, leading to compliance issues or rework." },
        { id: "rwcs_wm_4", question: "How much time do managers spend just chasing status updates or approvals?", aligningAnswer: "A significant amount of time that could be spent on more valuable work." },
    ],
    keyBenefits: [
        "Accelerate business processes by replacing manual steps with automated workflows.",
        "Improve visibility with real-time status tracking and dashboards.",
        "Ensure consistency and compliance with standardised, repeatable processes.",
        "Reduce operational costs by eliminating rework and manual follow-up.",
        "Empower departments to build and manage their own workflows."
    ]
  },
  managedITSupport: {
    objective: "Uncover strains on the internal IT team and business impact of IT issues to position Managed Services.",
    highLevelPain: "Our employees complain constantly about IT issues, and our internal IT team spends all their time 'fire-fighting' instead of on strategic projects.",
    specificProcessPain: "Our internal IT team is overwhelmed with daily support tasks.",
    keyDiscoveryPoints: [
      { id: "rwcs_ms_1", question: "How much of your IT team's focus is on day-to-day user support versus strategic projects that drive the business forward?", aligningAnswer: "Almost all of it is on user support; we have no time for strategic work." },
      { id: "rwcs_ms_2", question: "What is the business impact when a critical system goes down? How quickly can you currently respond?", aligningAnswer: "It's significant. We lose productivity and it can take hours to get things back online." },
      { id: "rwcs_ms_3", question: "How do you ensure all your systems are consistently patched and updated to protect against vulnerabilities?", aligningAnswer: "It's a manual effort and we often fall behind, which we know is a risk." },
      { id: "rwcs_ms_4", question: "What happens if a key IT person goes on leave or resigns? How is that knowledge retained?", aligningAnswer: "It would be a major problem; a lot of knowledge is tied up with one or two people." },
    ],
    keyBenefits: [
        "Free up internal IT to focus on strategic, value-add projects.",
        "Improve system uptime and reliability with proactive 24/7 monitoring.",
        "Enhance security posture through consistent patching and expert oversight.",
        "Provide predictable, budgetable IT operational costs.",
        "Gain access to a broader team of IT experts and advanced toolsets."
    ]
  },
   cybersecurityServices: {
    objective: "Identify security gaps, compliance concerns, and resource limitations to position Cybersecurity Services.",
    highLevelPain: "We're increasingly concerned about cybersecurity threats like ransomware and phishing, and we're not sure if we're adequately protected.",
    specificProcessPain: "We are worried about our cybersecurity posture and potential threats.",
    keyDiscoveryPoints: [
      { id: "rwcs_cs_1", question: "How do you currently monitor your network for suspicious activity, especially after hours?", aligningAnswer: "We rely on our firewall logs, but we don't have anyone actively watching them 24/7." },
      { id: "rwcs_cs_2", question: "Do your employees receive regular, effective training on how to spot phishing emails?", aligningAnswer: "Not formally, or it's very basic. It's a major concern for us." },
      { id: "rwcs_cs_3", question: "How confident are you that you could detect and respond to a ransomware attack before it spreads?", aligningAnswer: "Not very confident. We feel like we'd be playing catch-up." },
      { id: "rwcs_cs_4", question: "Are you required to meet any specific compliance standards (e.g., Essential Eight, GDPR), and how do you prove compliance?", aligningAnswer: "Yes, and preparing for audits is a very difficult, manual process." },
    ],
    keyBenefits: [
        "Gain 24/7 threat monitoring and response from a dedicated Security Operations Centre (SOC).",
        "Reduce the risk of data breaches and ransomware with advanced endpoint protection (EDR/XDR).",
        "Strengthen your 'human firewall' with effective security awareness training.",
        "Identify and remediate vulnerabilities before they can be exploited.",
        "Simplify compliance and audit preparation with expert guidance and reporting."
    ]
  },
  cloudSolutions: {
    objective: "Uncover challenges with on-premise infrastructure or existing cloud environments to position cloud services.",
    highLevelPain: "Our current IT infrastructure feels outdated and is struggling to support our business needs.",
    specificProcessPain: "Our IT infrastructure feels outdated and is struggling to keep up with business needs.",
    keyDiscoveryPoints: [
        { id: "rwcs_cld_1", question: "What are the biggest limitations of your current server infrastructure?", aligningAnswer: "It's aging, expensive to maintain, and we're running out of capacity." },
        { id: "rwcs_cld_2", question: "How are you managing the increasing costs and complexity of your public cloud environment?", aligningAnswer: "We're not. Our monthly bills are unpredictable and keep growing." },
        { id: "rwcs_cld_3", question: "How does your disaster recovery plan work, and how confident are you in it?", aligningAnswer: "It's based on tape backups and we're not confident we could recover quickly in a real disaster." },
        { id: "rwcs_cld_4", question: "How agile is your team when it comes to provisioning new resources for development or new projects?", aligningAnswer: "It's very slow. It can take weeks to get a new server set up." },
    ],
    keyBenefits: [
        "Reduce capital expenditure by shifting from on-premise hardware to an operational expense model.",
        "Improve scalability and performance by leveraging public cloud resources.",
        "Enhance business continuity and disaster recovery capabilities.",
        "Gain control and visibility over cloud spending through FinOps practices.",
        "Accelerate innovation by enabling faster provisioning of resources."
    ]
  },
  networkServices: {
    objective: "Identify network performance, reliability, and security issues to position managed network services.",
    highLevelPain: "Our current IT infrastructure feels outdated and is struggling to support our business needs.",
    specificProcessPain: "Our network performance is a constant source of complaints.",
    keyDiscoveryPoints: [
        { id: "rwcs_net_1", question: "How is the performance of your business-critical cloud applications (like Microsoft 365, Salesforce)?", aligningAnswer: "It's often slow and unreliable, especially for our branch offices." },
        { id: "rwcs_net_2", question: "How do you manage connectivity and security across your different office locations?", aligningAnswer: "We have expensive MPLS links that are inflexible, and managing security policies consistently is a challenge." },
        { id: "rwcs_net_3", question: "How much time does your IT team spend troubleshooting network-related issues?", aligningAnswer: "A lot. It's a major distraction from other important projects." },
        { id: "rwcs_net_4", question: "How do you provide secure and performant network access for your remote employees?", aligningAnswer: "They use a traditional VPN, but it's often slow and a bottleneck." },
    ],
    keyBenefits: [
        "Improve application performance and user experience with SD-WAN.",
        "Increase network agility and reduce connectivity costs.",
        "Enhance network security and provide secure remote access.",
        "Reduce the burden on internal IT with proactive 24/7 network monitoring and management.",
        "Gain visibility into network traffic and performance."
    ]
  },
  modernWorkplaceITS: {
    objective: "Uncover gaps in collaboration, security, and management of user-facing technology to position modern workplace services.",
    highLevelPain: "Our current IT infrastructure feels outdated and is struggling to support our business needs, especially with remote work.",
    specificProcessPain: "We aren't getting the most out of our collaboration tools like Microsoft 365.",
    keyDiscoveryPoints: [
        { id: "rwcs_mw_1", question: "How fully are you utilising the features within your Microsoft 365 subscription, beyond just email and Office apps?", aligningAnswer: "We're probably only using a small fraction of what we pay for. We don't use Teams or SharePoint effectively." },
        { id: "rwcs_mw_2", question: "How do you ensure that all employee devices (laptops, mobiles) are configured securely and consistently?", aligningAnswer: "It's a manual process for each device, and we're not sure if they are all compliant." },
        { id: "rwcs_mw_3", question: "How do employees collaborate on documents and projects when working from different locations?", aligningAnswer: "Mostly by emailing attachments, which leads to version control issues." },
        { id: "rwcs_mw_4", question: "How do you manage employee onboarding and offboarding to ensure they get access to what they need quickly, and that access is removed promptly when they leave?", aligningAnswer: "It's a manual process involving multiple teams and often takes too long, creating security risks." },
    ],
    keyBenefits: [
        "Maximise the ROI of your Microsoft 365 investment.",
        "Improve collaboration and productivity for a hybrid workforce.",
        "Enhance security and compliance with modern endpoint management.",
        "Streamline employee onboarding and offboarding processes.",
        "Provide a seamless and consistent user experience across all devices."
    ]
  },
  itConsulting: {
    objective: "Identify a lack of strategic direction or internal resources for major IT initiatives to position consulting services.",
    highLevelPain: "Our IT strategy feels reactive, and we're struggling to align technology with our long-term business goals.",
    specificProcessPain: "We are struggling to create a clear technology roadmap.",
    keyDiscoveryPoints: [
        { id: "rwcs_itc_1", question: "How confident are you that your current IT strategy will support your business goals over the next 3 years?", aligningAnswer: "Not very confident. Our strategy is more reactive to immediate problems than forward-looking." },
        { id: "rwcs_itc_2", question: "Do you have a major technology project coming up (e.g., ERP upgrade, cloud migration) where your team lacks prior experience?", aligningAnswer: "Yes, and we are concerned about the risks and potential for failure." },
        { id: "rwcs_itc_3", question: "How do you currently evaluate and choose new technologies to invest in?", aligningAnswer: "It's often driven by the vendor who shouts the loudest, rather than a structured evaluation based on business value." },
        { id: "rwcs_itc_4", question: "How do you balance the budget between 'keeping the lights on' and investing in innovation?", aligningAnswer: "The vast majority of our budget and time goes to just maintaining what we have." },
    ],
    keyBenefits: [
        "Develop a clear, actionable IT strategy and roadmap aligned with business goals.",
        "Mitigate risk and ensure success for major technology projects.",
        "Gain an unbiased, expert perspective on technology and vendor selection.",
        "Optimise your IT budget and governance processes.",
        "Bridge the gap between your IT capabilities and business needs."
    ]
  },
};

export const initialPainPointsState: PainPointsAppState = {
  activeMode: PainPointMode.WATERFALL,
  currentWaterfallStep: WaterfallStep.SELECT_L1_PAIN,
  selectedL1PainId: null,
  selectedL2PainId: null,
  
  availableL3QuestionIds: [], // This might be deprecated or can be derived
  selectedL3QuestionId: null, 
  answeredL3QuestionIds: [], 

  selectedL3AnswerId: null, 
  
  showNotAlignedMessage: false, 
  
  currentL3AlignmentDetails: null, 
  accumulatedL2Solutions: [], 

  waterfallConversationLog: [], 
  showConversationView: false, 
  selectedProductForCheatSheet: ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.length > 0 ? ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB[0].id : null, 
};