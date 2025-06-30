import { PainPointLevel1Pain, EditableReverseWaterfallCheatSheets, PainPointMode, PainPointsAppState, WaterfallStep, ModuleSolutionContent, ReverseWaterfallCheatSheetKeyPoint } from '../types';
import { ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB, ALL_MODULES } from './moduleConstants'; // Ensure ALL_MODULES is available if needed by logic here

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
              { id: "L3_A3_Q4_A2", text: "We lack a central, up-to-date repository of supplier information and compliance documents.", leadsToSolutionMapping: { painIdentified: "Decentralised and outdated supplier information.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_A3_Q4_A3", text: "Assessing supplier risk and performance is an ad-hoc, manual effort.", leadsToSolutionMapping: { painIdentified: "Manual and inconsistent supplier risk/performance management.", suggestedSolutionsProductIds: ["supplierManagement"] }},
              { id: "L3_A3_Q4_A4", text: "We have an efficient supplier portal and management system.", isNotAligned: true },
            ]
          }
        ],
      }
    ]
  },
  {
    id: "L1_B",
    text: "Operational Inefficiency & Manual Processes",
    level2Pains: [
      {
        id: "L2_B1",
        text: "Our teams are bogged down with repetitive, manual tasks.",
        level3Questions: [
          {
            id: "L3_B1_Q1",
            text: "Which department or process is most affected by this manual workload?",
            answerOptions: [
              { id: "L3_B1_Q1_A1", text: "Accounts Payable (Invoice Processing)", leadsToSolutionMapping: { painIdentified: "High manual workload in Accounts Payable.", suggestedSolutionsProductIds: ["accountsPayable"] } },
              { id: "L3_B1_Q1_A2", text: "Sales / Customer Service (Order Entry)", leadsToSolutionMapping: { painIdentified: "High manual workload in Sales Order Processing.", suggestedSolutionsProductIds: ["orderManagement"] } },
              { id: "L3_B1_Q1_A3", text: "Document Handling & Filing (General/Legal/HR)", leadsToSolutionMapping: { painIdentified: "High manual workload in general document management.", suggestedSolutionsProductIds: ["documentManagement", "workflowManagement"] } },
              { id: "L3_B1_Q1_A4", text: "It's a widespread issue across multiple departments.", leadsToSolutionMapping: { painIdentified: "Widespread manual process inefficiencies across the business.", suggestedSolutionsProductIds: ["workflowManagement", "processMapping"] } }
            ]
          },
          {
            id: "L3_B1_Q2",
            text: "How do you currently manage workflows and approvals for key business processes?",
            answerOptions: [
              { id: "L3_B1_Q2_A1", text: "Mainly through email chains and verbal follow-ups.", leadsToSolutionMapping: { painIdentified: "Inefficient, untrackable workflows based on email/verbal communication.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_B1_Q2_A2", text: "We use spreadsheets or basic checklists to track progress.", leadsToSolutionMapping: { painIdentified: "Manual workflow tracking using spreadsheets.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_B1_Q2_A3", text: "Our ERP has some workflow capabilities, but they are rigid and hard to adapt.", leadsToSolutionMapping: { painIdentified: "Rigid, inflexible ERP workflows hindering efficiency.", suggestedSolutionsProductIds: ["workflowManagement"] }},
              { id: "L3_B1_Q2_A4", text: "We have a dedicated workflow automation platform.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B1_Q3",
            text: "How are your business processes currently documented, if at all?",
            answerOptions: [
              { id: "L3_B1_Q3_A1", text: "They are not formally documented; it's mostly 'tribal knowledge'.", leadsToSolutionMapping: { painIdentified: "Lack of formal process documentation ('tribal knowledge').", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_B1_Q3_A2", text: "We have outdated documents in various formats (Word, Visio) stored on shared drives.", leadsToSolutionMapping: { painIdentified: "Outdated and decentralised process documentation.", suggestedSolutionsProductIds: ["processMapping", "documentManagement"] }},
              { id: "L3_B1_Q3_A3", text: "We try to document them, but it's hard to keep them current and get everyone to follow them.", leadsToSolutionMapping: { painIdentified: "Difficulty maintaining current and standardised process maps.", suggestedSolutionsProductIds: ["processMapping"] }},
              { id: "L3_B1_Q3_A4", text: "We use a central, collaborative process mapping tool.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_B2",
        text: "Difficulty finding and managing company documents and records.",
        level3Questions: [
          {
            id: "L3_B2_Q1",
            text: "Where are your most critical business documents currently stored?",
            answerOptions: [
              { id: "L3_B2_Q1_A1", text: "Across various network drives, local computers, and email inboxes.", leadsToSolutionMapping: { painIdentified: "Scattered, siloed document storage hindering access and control.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_B2_Q1_A2", text: "Mainly in a shared drive, but the folder structure is chaotic and inconsistent.", leadsToSolutionMapping: { painIdentified: "Chaotic and inconsistent folder structures in shared drives.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_B2_Q1_A3", text: "We use a system like SharePoint, but struggle with adoption and finding things.", leadsToSolutionMapping: { painIdentified: "Poor adoption and searchability in existing DMS (e.g., SharePoint).", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_B2_Q1_A4", text: "We have a well-organized, central document management system.", isNotAligned: true },
            ]
          },
          {
            id: "L3_B2_Q2",
            text: "How do you handle version control to ensure everyone is working on the correct document?",
            answerOptions: [
              { id: "L3_B2_Q2_A1", text: "We don't, which often leads to confusion and rework.", leadsToSolutionMapping: { painIdentified: "Lack of version control causing confusion and rework.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_B2_Q2_A2", text: "We use manual naming conventions like 'v1', 'v2', 'final', which is error-prone.", leadsToSolutionMapping: { painIdentified: "Error-prone manual versioning of documents.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_B2_Q2_A3", text: "Our current system has check-in/check-out, but it's cumbersome.", leadsToSolutionMapping: { painIdentified: "Cumbersome check-in/check-out process in existing system.", suggestedSolutionsProductIds: ["documentManagement"] }},
              { id: "L3_B2_Q2_A4", text: "Our system handles versioning automatically and reliably.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_C",
    text: "Concerns about IT system stability, security, and support.",
    level2Pains: [
      {
        id: "L2_C1",
        text: "Our internal IT team is overwhelmed with daily support tasks.",
        level3Questions: [
          {
            id: "L3_C1_Q1",
            text: "What percentage of your IT team's time is spent on reactive 'fire-fighting' versus proactive, strategic projects?",
            answerOptions: [
              { id: "L3_C1_Q1_A1", text: "Almost entirely reactive (80%+).", leadsToSolutionMapping: { painIdentified: "IT team is stuck in reactive support mode.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_C1_Q1_A2", text: "More reactive than proactive (60-80%).", leadsToSolutionMapping: { painIdentified: "IT team lacks time for strategic work due to support load.", suggestedSolutionsProductIds: ["managedITSupport", "itConsulting"] }},
              { id: "L3_C1_Q1_A3", text: "It's about a 50/50 split.", isNotAligned: true },
              { id: "L3_C1_Q1_A4", text: "Mostly proactive and strategic.", isNotAligned: true },
            ]
          },
          {
            id: "L3_C1_Q2",
            text: "How do you handle IT support requests when your team is unavailable (e.g., after hours, holidays)?",
            answerOptions: [
              { id: "L3_C1_Q2_A1", text: "We don't have formal after-hours support, which is a risk.", leadsToSolutionMapping: { painIdentified: "Lack of after-hours IT support creates business risk.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_C1_Q2_A2", text: "Team members are on-call, but it leads to burnout and inconsistent response.", leadsToSolutionMapping: { painIdentified: "On-call IT support model causing staff burnout.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_C1_Q2_A3", text: "We have a basic third-party service, but they lack knowledge of our specific systems.", isNotAligned: true }, // Can still be a pain point for a better service.
              { id: "L3_C1_Q2_A4", text: "We have a fully managed 24/7 support agreement.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_C2",
        text: "We are worried about our cybersecurity posture and potential threats.",
        level3Questions: [
          {
            id: "L3_C2_Q1",
            text: "How do you currently monitor your IT environment for security threats?",
            answerOptions: [
              { id: "L3_C2_Q1_A1", text: "We rely on basic antivirus and firewall logs, but don't actively monitor them.", leadsToSolutionMapping: { painIdentified: "Reactive security monitoring, relying on basic tools.", suggestedSolutionsProductIds: ["cybersecurityServices", "managedITSupport"] }},
              { id: "L3_C2_Q1_A2", text: "We lack the in-house expertise to manage advanced security tools effectively.", leadsToSolutionMapping: { painIdentified: "Internal skills gap for managing security tools.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_C2_Q1_A3", text: "We get too many alerts and struggle to identify the real threats.", leadsToSolutionMapping: { painIdentified: "Alert fatigue from security tools, difficulty identifying real threats.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_C2_Q1_A4", text: "We have a dedicated SOC/MDR service that handles this for us.", isNotAligned: true },
            ]
          },
          {
            id: "L3_C2_Q2",
            text: "How confident are you in your ability to recover from a major security incident like ransomware?",
            answerOptions: [
              { id: "L3_C2_Q2_A1", text: "Not confident. Our backup and recovery plans are untested or inadequate.", leadsToSolutionMapping: { painIdentified: "Inadequate or untested disaster recovery/backup plans.", suggestedSolutionsProductIds: ["cybersecurityServices", "cloudSolutions", "managedITSupport"] }},
              { id: "L3_C2_Q2_A2", text: "We have backups, but we're unsure how quickly we could restore operations.", leadsToSolutionMapping: { painIdentified: "Uncertainty over recovery time objective (RTO) for backups.", suggestedSolutionsProductIds: ["cybersecurityServices", "cloudSolutions"] }},
              { id: "L3_C2_Q2_A3", text: "We have a plan, but it has not been tested recently.", isNotAligned: true }, // A pain point, but less severe
              { id: "L3_C2_Q2_A4", text: "We have a robust, regularly tested incident response and recovery plan.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_C3",
        text: "Our IT infrastructure feels outdated and is struggling to keep up with business needs.",
        level3Questions: [
          {
            id: "L3_C3_Q1",
            text: "What are the primary drivers for considering an infrastructure update (e.g., performance, reliability, security, remote work support)?",
            answerOptions: [
              { id: "L3_C3_Q1_A1", text: "Our on-premise servers are aging and require significant capital to replace.", leadsToSolutionMapping: { painIdentified: "High capital expenditure needed for aging on-premise hardware.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_C3_Q1_A2", text: "We need better support for a hybrid/remote workforce with secure access.", leadsToSolutionMapping: { painIdentified: "Need for better remote/hybrid work support and security.", suggestedSolutionsProductIds: ["modernWorkplaceITS", "cloudSolutions", "networkServices"] }},
              { id: "L3_C3_Q1_A3", text: "Our network performance is a constant source of complaints and bottlenecks.", leadsToSolutionMapping: { painIdentified: "Poor network performance causing user complaints.", suggestedSolutionsProductIds: ["networkServices", "managedITSupport"] }},
              { id: "L3_C3_Q1_A4", text: "We're unsure which path to take (cloud, hybrid, on-prem refresh) and need expert guidance.", leadsToSolutionMapping: { painIdentified: "Lack of clear IT strategy for infrastructure modernisation.", suggestedSolutionsProductIds: ["itConsulting"] }},
            ]
          },
          {
            id: "L3_C3_Q2",
            text: "How are you currently leveraging cloud services?",
            answerOptions: [
              { id: "L3_C3_Q2_A1", text: "We are not using the cloud much, if at all, and are concerned about the complexity.", leadsToSolutionMapping: { painIdentified: "Hesitancy to adopt cloud due to perceived complexity.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_C3_Q2_A2", text: "We use some SaaS apps (like M365), but our core infrastructure is on-premise.", leadsToSolutionMapping: { painIdentified: "Limited cloud adoption, primarily SaaS apps.", suggestedSolutionsProductIds: ["cloudSolutions", "modernWorkplaceITS"] }},
              { id: "L3_C3_Q2_A3", text: "We have some workloads in the cloud, but costs are getting hard to manage and visibility is poor.", leadsToSolutionMapping: { painIdentified: "Cloud cost management and visibility challenges.", suggestedSolutionsProductIds: ["cloudSolutions", "managedITSupport"] }},
              { id: "L3_C3_Q2_A4", text: "We have a well-defined and managed hybrid/multi-cloud strategy.", isNotAligned: true },
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
    highLevelPain: "Issues with Cash Flow & Financial Health",
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
  documentManagement: {
    objective: "Identify challenges with document access, version control, and security to position a central DMS.",
    highLevelPain: "Operational Inefficiency & Manual Processes",
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
  managedITSupport: {
    objective: "Uncover strains on the internal IT team and business impact of IT issues to position Managed Services.",
    highLevelPain: "Concerns about IT system stability, security, and support.",
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
    highLevelPain: "Concerns about IT system stability, security, and support.",
    specificProcessPain: "We are worried about our cybersecurity posture and potential threats.",
    keyDiscoveryPoints: [
      { id: "rwcs_cs_1", question: "How do you currently monitor your network for suspicious activity, especially after hours?", aligningAnswer: "We rely on our firewall logs, but we don't have anyone actively watching them 24/7." },
      { id: "rwcs_cs_2", question: "Do your employees receive regular, effective training on how to spot phishing emails?", aligningAnswer: "Not formally, or it's very basic. It's a major concern for us." },
      { id: "rwcs_cs_3", question: "How confident are you that you could detect and respond to a ransomware attack before it spreads?", aligningAnswer: "Not very confident. We feel like we'd be playing catch-up." },
      { id: "rwcs_cs_4", question: "Are you required to meet any specific compliance standards (e.g., Essential Eight, GDPR), and how do you prove compliance?", aligningAnswer: "Yes, and preparing for audits is a very difficult, manual process." },
    ],
    keyBenefits: [
        "Gain 24/7 threat monitoring and response from a dedicated Security Operations Center (SOC).",
        "Reduce the risk of data breaches and ransomware with advanced endpoint protection (EDR/XDR).",
        "Strengthen your 'human firewall' with effective security awareness training.",
        "Identify and remediate vulnerabilities before they can be exploited.",
        "Simplify compliance and audit preparation with expert guidance and reporting."
    ]
  },
  // Add other default cheat sheets here if needed
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