
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
  // New ITS Category
  {
    id: "L1_ITS_OPERATIONAL_EFFICIENCY",
    text: "IT Operational Challenges & Inefficiencies",
    level2Pains: [
      {
        id: "L2_ITS_HIGH_OPEX",
        text: "High or unpredictable IT operational expenditure (OpEx).",
        level3Questions: [
          {
            id: "L3_ITS_OPEX_Q1",
            text: "Which areas of your IT operational spending feel excessive or difficult to control (e.g., support, maintenance, licensing)?",
            answerOptions: [
              { id: "L3_ITS_OPEX_Q1_A1", text: "Managing our on-premise servers and associated licensing is very costly.", leadsToSolutionMapping: { painIdentified: "High costs of on-premise server management.", suggestedSolutionsProductIds: ["cloudSolutions", "managedITSupport"] }},
              { id: "L3_ITS_OPEX_Q1_A2", text: "Our IT support costs (internal staff or external vendors) are too high for the value received.", leadsToSolutionMapping: { painIdentified: "High IT support costs relative to value.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_ITS_OPEX_Q1_A3", text: "Software licensing and subscription management is complex and expensive.", leadsToSolutionMapping: { painIdentified: "Complex and expensive software licensing/subscriptions.", suggestedSolutionsProductIds: ["managedITSupport", "itConsulting"] }},
              { id: "L3_ITS_OPEX_Q1_A4", text: "We have a good handle on our IT OpEx.", isNotAligned: true },
            ]
          },
          {
            id: "L3_ITS_OPEX_Q2",
            text: "Are you facing challenges with scaling your IT resources (up or down) in response to business needs, leading to overspending or capacity issues?",
            answerOptions: [
              { id: "L3_ITS_OPEX_Q2_A1", text: "Yes, scaling our on-premise infrastructure is slow and expensive.", leadsToSolutionMapping: { painIdentified: "Difficulty scaling on-premise IT infrastructure cost-effectively.", suggestedSolutionsProductIds: ["cloudSolutions"] }},
              { id: "L3_ITS_OPEX_Q2_A2", text: "We often over-provision resources to avoid performance issues, which is wasteful.", leadsToSolutionMapping: { painIdentified: "Over-provisioning of IT resources leading to waste.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_ITS_OPEX_Q2_A3", text: "Our cloud spend is higher than expected and hard to predict/optimize.", leadsToSolutionMapping: { painIdentified: "Unpredictable or unoptimized cloud spending.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_ITS_OPEX_Q2_A4", text: "Our IT resources scale efficiently with business demands.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_SYSTEM_PERFORMANCE",
        text: "Frequent IT system downtime or poor performance impacting operations.",
        level3Questions: [
          {
            id: "L3_ITS_PERF_Q1",
            text: "How often do your key business applications or IT systems experience unplanned downtime or significant performance degradation?",
            answerOptions: [
              { id: "L3_ITS_PERF_Q1_A1", text: "It happens frequently, causing major disruptions to our work.", leadsToSolutionMapping: { painIdentified: "Frequent system downtime disrupting business operations.", suggestedSolutionsProductIds: ["managedITSupport", "networkServices", "cloudSolutions"] }},
              { id: "L3_ITS_PERF_Q1_A2", text: "Certain critical systems are unreliable, especially during peak times.", leadsToSolutionMapping: { painIdentified: "Unreliable critical systems, especially under load.", suggestedSolutionsProductIds: ["managedITSupport", "itConsulting"] }},
              { id: "L3_ITS_PERF_Q1_A3", text: "Our network performance is often slow, impacting access to cloud applications or shared resources.", leadsToSolutionMapping: { painIdentified: "Slow network performance impacting application access.", suggestedSolutionsProductIds: ["networkServices", "managedITSupport"] }},
              { id: "L3_ITS_PERF_Q1_A4", text: "Our systems are generally stable and perform well.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_INEFFICIENT_SUPPORT",
        text: "Inefficient IT support processes leading to delays and user frustration.",
        level3Questions: [
           {
            id: "L3_ITS_SUPPORT_Q1",
            text: "How would you describe the efficiency of your current IT support ticket resolution process?",
            answerOptions: [
              { id: "L3_ITS_SUPPORT_Q1_A1", text: "It's slow, and tickets often remain open for too long.", leadsToSolutionMapping: { painIdentified: "Slow IT support ticket resolution times.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_ITS_SUPPORT_Q1_A2", text: "Users have to follow up multiple times to get their issues resolved.", leadsToSolutionMapping: { painIdentified: "Users needing multiple follow-ups for IT support.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_ITS_SUPPORT_Q1_A3", text: "We lack clear SLAs or a system to track support performance effectively.", leadsToSolutionMapping: { painIdentified: "Lack of SLAs and performance tracking for IT support.", suggestedSolutionsProductIds: ["managedITSupport", "itConsulting"] }},
              { id: "L3_ITS_SUPPORT_Q1_A4", text: "Our IT support is efficient and well-regarded by users.", isNotAligned: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "L1_ITS_SECURITY_COMPLIANCE",
    text: "Cybersecurity Threats & Regulatory Compliance Concerns",
    level2Pains: [
      {
        id: "L2_ITS_DATA_BREACH_FEAR",
        text: "Concerns about data breaches, ransomware, or other cyber threats.",
        level3Questions: [
          {
            id: "L3_ITS_BREACH_Q1",
            text: "What are your primary concerns regarding protecting company data and systems from cyber threats like ransomware or data breaches?",
            answerOptions: [
              { id: "L3_ITS_BREACH_Q1_A1", text: "We feel vulnerable and unsure if our current defenses are adequate.", leadsToSolutionMapping: { painIdentified: "Inadequate current cybersecurity defenses.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_ITS_BREACH_Q1_A2", text: "Keeping up with the evolving threat landscape is a major challenge for our team.", leadsToSolutionMapping: { painIdentified: "Difficulty keeping pace with evolving cyber threats.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_ITS_BREACH_Q1_A3", text: "We've had minor incidents or close calls that worry us.", leadsToSolutionMapping: { painIdentified: "Past security incidents or near-misses causing concern.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
              { id: "L3_ITS_BREACH_Q1_A4", text: "We are confident in our current security posture.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_COMPLIANCE_BURDEN",
        text: "Struggling to meet IT compliance requirements (e.g., Essential Eight, industry standards).",
        level3Questions: [
          {
            id: "L3_ITS_COMPLIANCE_Q1",
            text: "Are there specific IT compliance standards or regulations your organization must adhere to that are proving challenging?",
            answerOptions: [
              { id: "L3_ITS_COMPLIANCE_Q1_A1", text: "Yes, meeting [specific standard, e.g., Essential Eight] requirements is resource-intensive.", leadsToSolutionMapping: { painIdentified: "Resource-intensive compliance requirements.", suggestedSolutionsProductIds: ["cybersecurityServices", "itConsulting"] }},
              { id: "L3_ITS_COMPLIANCE_Q1_A2", text: "We lack the internal expertise to effectively implement and maintain compliance.", leadsToSolutionMapping: { painIdentified: "Lack of internal expertise for IT compliance.", suggestedSolutionsProductIds: ["cybersecurityServices", "itConsulting"] }},
              { id: "L3_ITS_COMPLIANCE_Q1_A3", text: "Audit preparations are a major burden and source of stress.", leadsToSolutionMapping: { painIdentified: "Burdensome audit preparations for IT compliance.", suggestedSolutionsProductIds: ["cybersecurityServices", "documentManagement"] }},
              { id: "L3_ITS_COMPLIANCE_Q1_A4", text: "We are well-prepared and confident in our compliance status.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_SECURITY_MONITORING",
        text: "Inadequate security monitoring and incident response capabilities.",
        level3Questions: [
            {
                id: "L3_ITS_MONITOR_Q1",
                text: "How confident are you in your ability to detect and respond to a security incident in a timely manner (e.g., within hours)?",
                answerOptions: [
                    { id: "L3_ITS_MONITOR_Q1_A1", text: "Not very confident. We lack 24/7 monitoring or a dedicated security team.", leadsToSolutionMapping: { painIdentified: "Lack of 24/7 security monitoring and dedicated response team.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
                    { id: "L3_ITS_MONITOR_Q1_A2", text: "We have tools, but struggle to analyze alerts effectively or respond quickly enough.", leadsToSolutionMapping: { painIdentified: "Ineffective alert analysis and slow incident response.", suggestedSolutionsProductIds: ["cybersecurityServices"] }},
                    { id: "L3_ITS_MONITOR_Q1_A3", text: "Our incident response plan is not well-defined or regularly tested.", leadsToSolutionMapping: { painIdentified: "Undefined or untested incident response plan.", suggestedSolutionsProductIds: ["cybersecurityServices", "itConsulting"] }},
                    { id: "L3_ITS_MONITOR_Q1_A4", text: "We have a robust SOC and a well-rehearsed incident response plan.", isNotAligned: true },
                ]
            }
        ]
      },
      {
        id: "L2_ITS_REMOTE_WORK_SECURITY",
        text: "Concerns about securing remote workforce and protecting endpoints.",
        level3Questions: [
            {
                id: "L3_ITS_REMOTE_SEC_Q1",
                text: "With the increase in remote work, what are your main challenges in ensuring the security of endpoints (laptops, mobile devices) and data accessed outside the office?",
                answerOptions: [
                    { id: "L3_ITS_REMOTE_SEC_Q1_A1", text: "Ensuring all remote devices are patched and have up-to-date security software is difficult.", leadsToSolutionMapping: { painIdentified: "Difficulty managing security for remote endpoints.", suggestedSolutionsProductIds: ["cybersecurityServices", "modernWorkplaceITS", "managedITSupport"] }},
                    { id: "L3_ITS_REMOTE_SEC_Q1_A2", text: "We worry about data leakage or unauthorized access from less secure home networks.", leadsToSolutionMapping: { painIdentified: "Data leakage/unauthorized access risks from remote work.", suggestedSolutionsProductIds: ["cybersecurityServices", "modernWorkplaceITS"] }},
                    { id: "L3_ITS_REMOTE_SEC_Q1_A3", text: "Providing secure remote access to company resources is complex.", leadsToSolutionMapping: { painIdentified: "Complexity in providing secure remote access.", suggestedSolutionsProductIds: ["networkServices", "cybersecurityServices", "modernWorkplaceITS"] }},
                    { id: "L3_ITS_REMOTE_SEC_Q1_A4", text: "We have strong policies and tools for secure remote work.", isNotAligned: true },
                ]
            }
        ]
      }
    ]
  },
  {
    id: "L1_ITS_WORKFORCE_ENABLEMENT",
    text: "Workforce Productivity & Technology Enablement Gaps",
    level2Pains: [
      {
        id: "L2_ITS_SLOW_IT_SUPPORT",
        text: "Slow or ineffective IT support impacting employee productivity.",
        level3Questions: [
          {
            id: "L3_ITS_SLOWSUPPORT_Q1",
            text: "How does the current IT support performance affect your employees' ability to do their jobs efficiently?",
            answerOptions: [
              { id: "L3_ITS_SLOWSUPPORT_Q1_A1", text: "Employees lose significant time waiting for IT issues to be resolved.", leadsToSolutionMapping: { painIdentified: "Lost employee productivity due to slow IT support.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_ITS_SLOWSUPPORT_Q1_A2", text: "Recurring IT problems are not being permanently fixed, causing ongoing frustration.", leadsToSolutionMapping: { painIdentified: "Recurring IT issues impacting user productivity.", suggestedSolutionsProductIds: ["managedITSupport", "itConsulting"] }},
              { id: "L3_ITS_SLOWSUPPORT_Q1_A3", text: "Access to IT support is difficult or involves long wait times.", leadsToSolutionMapping: { painIdentified: "Difficult access or long wait times for IT support.", suggestedSolutionsProductIds: ["managedITSupport"] }},
              { id: "L3_ITS_SLOWSUPPORT_Q1_A4", text: "Our IT support is quick, effective, and user-friendly.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_COLLAB_TOOLS",
        text: "Challenges with collaboration tools and remote work enablement.",
        level3Questions: [
          {
            id: "L3_ITS_COLLAB_Q1",
            text: "How well are your current collaboration tools (e.g., video conferencing, file sharing, messaging) meeting the needs of your hybrid/remote workforce?",
            answerOptions: [
              { id: "L3_ITS_COLLAB_Q1_A1", text: "Our tools are disjointed, and users struggle to collaborate effectively across different platforms.", leadsToSolutionMapping: { painIdentified: "Disjointed collaboration tools hindering effective teamwork.", suggestedSolutionsProductIds: ["modernWorkplaceITS", "itConsulting"] }},
              { id: "L3_ITS_COLLAB_Q1_A2", text: "Remote workers face challenges accessing company resources or participating fully in meetings.", leadsToSolutionMapping: { painIdentified: "Challenges for remote workers in accessing resources/collaboration.", suggestedSolutionsProductIds: ["modernWorkplaceITS", "networkServices"] }},
              { id: "L3_ITS_COLLAB_Q1_A3", text: "User adoption of some collaboration tools is low, despite investment.", leadsToSolutionMapping: { painIdentified: "Low user adoption of existing collaboration tools.", suggestedSolutionsProductIds: ["modernWorkplaceITS", "itConsulting"] }}, // IT Consulting for change management
              { id: "L3_ITS_COLLAB_Q1_A4", text: "Our collaboration suite is integrated and well-adopted by users.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_NETWORK_USER_IMPACT",
        text: "Network performance issues affecting application access and user experience.",
        level3Questions: [
            {
                id: "L3_ITS_NETWORK_USER_Q1",
                text: "Do users frequently complain about slow application response times, dropped connections, or difficulty accessing shared files, potentially due to network issues?",
                answerOptions: [
                    { id: "L3_ITS_NETWORK_USER_Q1_A1", text: "Yes, slow network and application performance is a constant source of frustration.", leadsToSolutionMapping: { painIdentified: "Slow network/application performance frustrating users.", suggestedSolutionsProductIds: ["networkServices", "managedITSupport"] }},
                    { id: "L3_ITS_NETWORK_USER_Q1_A2", text: "Access to cloud services or SaaS applications is often unreliable.", leadsToSolutionMapping: { painIdentified: "Unreliable access to cloud/SaaS applications.", suggestedSolutionsProductIds: ["networkServices", "cloudSolutions"] }},
                    { id: "L3_ITS_NETWORK_USER_Q1_A3", text: "Our Wi-Fi coverage or capacity seems insufficient for current needs.", leadsToSolutionMapping: { painIdentified: "Insufficient Wi-Fi coverage or capacity.", suggestedSolutionsProductIds: ["networkServices"] }},
                    { id: "L3_ITS_NETWORK_USER_Q1_A4", text: "Network performance is generally good and meets user expectations.", isNotAligned: true },
                ]
            }
        ]
      }
    ]
  },
  {
    id: "L1_ITS_TECHNOLOGY_STRATEGY",
    text: "Misaligned IT Strategy & Technology Modernization Challenges",
    level2Pains: [
      {
        id: "L2_ITS_NO_ROADMAP",
        text: "Lack of a clear IT strategy or technology roadmap to support business goals.",
        level3Questions: [
          {
            id: "L3_ITS_ROADMAP_Q1",
            text: "How confident are you that your current IT strategy effectively supports your organization's long-term business objectives?",
            answerOptions: [
              { id: "L3_ITS_ROADMAP_Q1_A1", text: "We lack a formal IT strategy or it's outdated and not aligned with current business goals.", leadsToSolutionMapping: { painIdentified: "Lack of formal or aligned IT strategy.", suggestedSolutionsProductIds: ["itConsulting"] }},
              { id: "L3_ITS_ROADMAP_Q1_A2", text: "Our IT investments feel reactive rather than strategically planned.", leadsToSolutionMapping: { painIdentified: "Reactive IT investments instead of strategic planning.", suggestedSolutionsProductIds: ["itConsulting"] }},
              { id: "L3_ITS_ROADMAP_Q1_A3", text: "We struggle to translate business needs into a concrete technology roadmap.", leadsToSolutionMapping: { painIdentified: "Difficulty translating business needs to IT roadmap.", suggestedSolutionsProductIds: ["itConsulting"] }},
              { id: "L3_ITS_ROADMAP_Q1_A4", text: "We have a clear, regularly updated IT strategy and roadmap.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_TECH_DEBT",
        text: "Accumulating technical debt or reliance on legacy systems hindering innovation.",
        level3Questions: [
          {
            id: "L3_ITS_TECHDEBT_Q1",
            text: "Are outdated or legacy IT systems creating limitations, increasing maintenance costs, or preventing adoption of new technologies?",
            answerOptions: [
              { id: "L3_ITS_TECHDEBT_Q1_A1", text: "Yes, our legacy systems are difficult and expensive to maintain, and hinder agility.", leadsToSolutionMapping: { painIdentified: "Legacy systems causing high maintenance and low agility.", suggestedSolutionsProductIds: ["itConsulting", "cloudSolutions", "managedITSupport"] }},
              { id: "L3_ITS_TECHDEBT_Q1_A2", text: "Integrating new solutions with our older systems is a major challenge.", leadsToSolutionMapping: { painIdentified: "Integration challenges with legacy IT systems.", suggestedSolutionsProductIds: ["itConsulting", "cloudSolutions"] }},
              { id: "L3_ITS_TECHDEBT_Q1_A3", text: "We know we need to modernize, but aren't sure where to start or the best approach.", leadsToSolutionMapping: { painIdentified: "Uncertainty about IT modernization strategy.", suggestedSolutionsProductIds: ["itConsulting", "cloudSolutions"] }},
              { id: "L3_ITS_TECHDEBT_Q1_A4", text: "Our technology stack is modern and well-maintained.", isNotAligned: true },
            ]
          }
        ]
      },
       {
        id: "L2_ITS_CLOUD_STRATEGY",
        text: "Uncertainty about cloud adoption or optimization strategy.",
        level3Questions: [
          {
            id: "L3_ITS_CLOUD_Q1",
            text: "What is your organization's current strategy regarding cloud services (e.g., migration, optimization, multi-cloud management)?",
            answerOptions: [
              { id: "L3_ITS_CLOUD_Q1_A1", text: "We're considering moving to the cloud but unsure about the best approach or which workloads to migrate.", leadsToSolutionMapping: { painIdentified: "Uncertainty about cloud migration strategy.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_ITS_CLOUD_Q1_A2", text: "We're already in the cloud, but our costs are higher than expected, or performance isn't optimal.", leadsToSolutionMapping: { painIdentified: "Suboptimal cloud cost or performance.", suggestedSolutionsProductIds: ["cloudSolutions", "itConsulting"] }},
              { id: "L3_ITS_CLOUD_Q1_A3", text: "Managing multiple cloud providers or hybrid environments is becoming complex.", leadsToSolutionMapping: { painIdentified: "Complexity in managing multi-cloud or hybrid environments.", suggestedSolutionsProductIds: ["cloudSolutions", "managedITSupport"] }},
              { id: "L3_ITS_CLOUD_Q1_A4", text: "Our cloud strategy is clear, well-executed, and delivering expected value.", isNotAligned: true },
            ]
          }
        ]
      },
      {
        id: "L2_ITS_DIGITAL_TRANSFORMATION",
        text: "Struggles with broader digital transformation initiatives.",
        level3Questions: [
            {
                id: "L3_ITS_DX_Q1",
                text: "Is your organization currently undertaking or planning any significant digital transformation initiatives (e.g., adopting new business models, digitizing core operations, enhancing customer experience through technology)?",
                answerOptions: [
                    { id: "L3_ITS_DX_Q1_A1", text: "Yes, but we're facing challenges with planning, execution, or technology selection.", leadsToSolutionMapping: { painIdentified: "Challenges in planning/executing digital transformation.", suggestedSolutionsProductIds: ["itConsulting", "modernWorkplaceITS", "cloudSolutions"] }},
                    { id: "L3_ITS_DX_Q1_A2", text: "We lack the internal resources or expertise to drive these initiatives effectively.", leadsToSolutionMapping: { painIdentified: "Lack of internal resources/expertise for digital transformation.", suggestedSolutionsProductIds: ["itConsulting", "managedITSupport"] }},
                    { id: "L3_ITS_DX_Q1_A3", text: "Our current IT infrastructure is not agile enough to support our digital transformation goals.", leadsToSolutionMapping: { painIdentified: "IT infrastructure hindering digital transformation agility.", suggestedSolutionsProductIds: ["itConsulting", "cloudSolutions", "networkServices"] }},
                    { id: "L3_ITS_DX_Q1_A4", text: "Our digital transformation initiatives are on track and well-supported by IT.", isNotAligned: true },
                ]
            }
        ]
      }
    ]
  }
];

export const REVERSE_WATERFALL_CHEAT_SHEETS: EditableReverseWaterfallCheatSheets = {
  // Esker
  "accountsPayable": {
    objective: "Use these questions and aligning answers to validate if the customer is experiencing significant pains addressable by Esker Accounts Payable.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "It takes too long to process and pay supplier invoices (Accounts Payable).",
    keyDiscoveryPoints: [
      { id: "ap_kp1", question: "Could you describe how a supplier invoice gets from its arrival to the point where it's approved and paid?", aligningAnswer: "It's heavily paper-based, manual data entry, and physical routing for approvals." },
      { id: "ap_kp2", question: "How much visibility does your team have into the status of an invoice at any given time?", aligningAnswer: "Very little. We often have to manually search or ask around to find an invoice's status." },
      { id: "ap_kp3", question: "How are exceptions (e.g., price or quantity mismatches, missing POs) typically handled in your AP process?", aligningAnswer: "It's a lengthy back-and-forth email chain involving multiple departments." },
      { id: "ap_kp4", question: "What challenges do you face with month-end closing related to accounts payable?", aligningAnswer: "Accruing for unprocessed invoices is a major manual effort and often inaccurate." },
      { id: "ap_kp5", question: "What's your process for capturing early payment discounts from suppliers?", aligningAnswer: "We miss most discount opportunities due to slow invoice processing." },
    ],
    keyBenefits: [
        "Reduced Invoice Processing Costs (up to 80%)",
        "Improved On-Time Payments & Discount Capture",
        "Enhanced Visibility & Financial Control",
        "Increased AP Staff Productivity & Reduced Manual Entry",
        "Strengthened Supplier Relationships",
        "Reduced Risk of Errors & Fraudulent Payments"
    ]
  },
  "orderManagement": {
    objective: "Use these questions and aligning answers to uncover challenges addressable by Esker Order Management.",
    highLevelPain: "Inefficient Operations & Manual Processes",
    specificProcessPain: "We struggle to process customer orders quickly and accurately.",
    keyDiscoveryPoints: [
      { id: "om_kp1", question: "How do customer orders typically arrive today (e.g., email, PDF, EDI)?", aligningAnswer: "Mostly via email as PDFs, requiring manual data entry into our system." },
      { id: "om_kp2", question: "What percentage of your orders require some form of manual correction or clarification before processing?", aligningAnswer: "A significant percentage (e.g., >20%) need corrections, causing major delays." },
      { id: "om_kp3", question: "How much visibility do you and your customers have into an order's status once it's submitted?", aligningAnswer: "Very little. Customers call us frequently for updates, and we have to check multiple places." },
      { id: "om_kp4", question: "How are order confirmations and shipping notifications handled?", aligningAnswer: "These are largely manual processes, sometimes forgotten or sent late." },
      { id: "om_kp5", question: "What's the impact on your business when orders are delayed or contain errors?", aligningAnswer: "Increased customer complaints, rush shipping costs, and sometimes lost sales." },
      { id: "om_kp6", question: "How do you handle order prioritisation or expedite requests?", aligningAnswer: "It's an informal, often chaotic process relying on who shouts loudest." },
    ],
    keyBenefits: [
        "Faster Order Processing Cycles (reduce by 50% or more)",
        "Reduced Order Entry Errors & Rework Costs",
        "Improved Customer Satisfaction & Loyalty",
        "Increased Sales/CSR Team Productivity",
        "Enhanced Order Status Visibility (Internal & External)",
        "Streamlined Handling of Order Exceptions"
    ]
  },
  "customerInquiryManagement": {
    objective: "Identify inefficiencies in customer inquiry handling addressable by Esker Customer Inquiry Management.",
    highLevelPain: "Poor Supplier or Customer Relationships",
    specificProcessPain: "Customers are frustrated with order errors, delays, or slow responses to inquiries.",
    keyDiscoveryPoints: [
        { id: "cim_kp1", question: "How quickly and accurately are you able to respond to customer inquiries about orders, invoices, or products?", aligningAnswer: "Response times are slow, and often customers need to follow up multiple times." },
        { id: "cim_kp2", question: "What are the most common types of customer inquiries your team handles?", aligningAnswer: "A lot are about order status, shipment tracking, or invoice copies." },
        { id: "cim_kp3", question: "How does your customer service team track and manage incoming inquiries from various channels (email, phone, portal)?", aligningAnswer: "We use a shared email inbox, but it's hard to prioritise or ensure follow-up." },
        { id: "cim_kp4", question: "What tools or information sources does your customer service team primarily use to resolve inquiries?", aligningAnswer: "They have to log into multiple systems (ERP, shipping, CRM) to find answers." },
        { id: "cim_kp5", question: "How do you measure customer satisfaction with your inquiry handling and problem resolution?", aligningAnswer: "We don't have a formal way to measure it, mostly rely on anecdotal feedback." },
    ],
    keyBenefits: [
        "Faster Inquiry Resolution Times (AHT reduction)",
        "Improved First Contact Resolution (FCR) Rates",
        "Increased Customer Satisfaction (CSAT scores)",
        "Reduced CSR Workload & Operational Costs",
        "Consistent & Accurate Responses Across Channels",
        "Enhanced Visibility into Inquiry Trends & KPIs"
    ]
  },
  "cashApplication": {
    objective: "Uncover difficulties in applying customer payments addressable by Esker Cash Application.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
        { id: "ca_kp1", question: "Can you walk me through your current process for applying cash once a customer payment is received?", aligningAnswer: "It's highly manual, matching payments to invoices is slow and error-prone." },
        { id: "ca_kp2", question: "How do you currently handle remittances that don't match the invoice amount, like short payments or deductions?", aligningAnswer: "It's a very manual investigation process to identify and resolve them." }, // Also points to Claims & Deductions
        { id: "ca_kp3", question: "How easy is it for your finance team to get a clear, real-time picture of outstanding receivables and aging?", aligningAnswer: "Reporting is manual, time-consuming (e.g., spreadsheet-based), and often outdated." } // Also points to Collection Management
    ],
    keyBenefits: [
        "Accelerated Cash Flow & Reduced DSO",
        "Increased Auto-Match Rates for Payments (up to 90%+) ",
        "Reduced Manual Effort in Reconciliation",
        "Improved Accuracy in Cash Posting & Fewer Errors",
        "Better Visibility into Unapplied Cash & Exceptions",
        "Reduced Bank Fees Associated with Manual Processing"
    ]
  },
  "collectionManagement": {
    objective: "Determine challenges in managing overdue accounts addressable by Esker Collection Management.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
        { id: "cm_kp1", question: "When you have overdue accounts, what does your collections process typically involve?", aligningAnswer: "It's ad-hoc, mainly reactive emails and calls when accounts become very overdue." },
        { id: "cm_kp2", question: "How easy is it for your finance team to get a clear, real-time picture of outstanding receivables and aging?", aligningAnswer: "Reporting is manual, time-consuming (e.g., spreadsheet-based), and often outdated." }
    ],
    keyBenefits: [
        "Reduced Days Sales Outstanding (DSO)",
        "Improved Collector Productivity & Efficiency",
        "Lower Bad Debt Write-offs & Provisioning",
        "Proactive & Prioritized Collections Strategy",
        "Enhanced Cash Flow Forecasting Accuracy",
        "Improved Customer Communication & Relationships"
    ]
  },
  "creditManagement": {
    objective: "Identify bottlenecks and risks in customer credit processes addressable by Esker Credit Management.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).", // Or a more specific L2 like "Challenges in assessing creditworthiness"
    keyDiscoveryPoints: [
        { id: "crm_kp1", question: "How does your team manage situations where a customer is on credit hold but needs to place an urgent order?", aligningAnswer: "It's a chaotic, manual scramble to get credit release approved, often delaying orders." }
    ],
    keyBenefits: [
        "Faster Credit Decisioning & New Customer Onboarding",
        "Reduced Credit Risk Exposure & Potential Bad Debt",
        "Streamlined Credit Review & Limit Management",
        "Improved Sales Cycle Time (Less Credit-Related Delays)",
        "Consistent Application of Credit Policies",
        "Proactive Monitoring of Customer Creditworthiness"
    ]
  },
  "claimsDeductions": {
    objective: "Explore issues related to managing customer claims/deductions addressable by Esker Claims & Deductions.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).",
    keyDiscoveryPoints: [
        { id: "cd_kp1", question: "How do you currently handle remittances that don't match the invoice amount, like short payments or deductions?", aligningAnswer: "It's a very manual investigation process to identify and resolve them." }
    ],
    keyBenefits: [
        "Faster Claims & Deductions Resolution Cycles",
        "Reduced Invalid Deduction Write-offs & Revenue Leakage",
        "Improved Accuracy in Dispute Management",
        "Enhanced Visibility into Claim Status & Root Causes",
        "Reduced Administrative Costs for Claims Processing",
        "Improved Customer/Supplier Satisfaction & Relationships"
    ]
  },
   "expenseManagement": {
    objective: "Uncover inefficiencies in expense reporting addressable by Esker Expense Management.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Difficulty managing and controlling company spend (Procurement & Expenses).",
    keyDiscoveryPoints: [
        { id: "em_kp1", question: "How are employee expense reports currently submitted and processed?", aligningAnswer: "Employees submit paper receipts attached to spreadsheets, it's very manual." },
        { id: "em_kp2", question: "How much visibility do you have into overall company spend before it occurs (i.e., committed spend)?", aligningAnswer: "Very little. We mostly see spend after invoices arrive or expenses are claimed." }
    ],
    keyBenefits: [
        "Reduced Expense Report Processing Costs & Time",
        "Improved T&E Policy Compliance & Enforcement",
        "Faster Employee Reimbursements & Increased Satisfaction",
        "Enhanced Visibility & Control over T&E Spend",
        "Reduced Risk of Fraudulent or Out-of-Policy Claims",
        "Streamlined Audit Processes for Expenses"
    ]
  },
   "procurement": {
    objective: "Identify challenges in purchase requisition and approval processes addressable by Esker Procurement.",
    highLevelPain: "Issues with Cash Flow & Financial Health",
    specificProcessPain: "Difficulty managing and controlling company spend (Procurement & Expenses).",
    keyDiscoveryPoints: [
        { id: "proc_kp1", question: "How does your team currently request and approve purchases?", aligningAnswer: "It's an informal email/verbal process, hard to track and often bypasses policy." },
        { id: "proc_kp2", question: "How much visibility do you have into overall company spend before it occurs (i.e., committed spend)?", aligningAnswer: "Very little. We mostly see spend after invoices arrive or expenses are claimed." },
        { id: "proc_kp3", question: "What challenges, if any, do you face with supplier onboarding and managing supplier information for procurement?", aligningAnswer: "Onboarding new suppliers is a slow, paper-heavy process." },
        { id: "proc_kp4", question: "How does your current procurement process support preferred supplier agreements or negotiated pricing?", aligningAnswer: "It's hard to ensure employees use preferred suppliers or get correct pricing." }
    ],
    keyBenefits: [
        "Increased Spend Under Management & Contract Compliance",
        "Reduced Maverick Spend & Off-Contract Purchases",
        "Improved Procurement Cycle Times (Requisition-to-Order)",
        "Enhanced Supplier Collaboration & Performance Tracking",
        "Better Budget Control & Real-Time Spend Visibility",
        "Strengthened Procurement Policy Adherence"
    ]
  },
  "invoiceDelivery": {
    objective: "Understand issues related to sending customer invoices and related communications addressable by Esker Invoice Delivery.",
    highLevelPain: "Poor Supplier or Customer Relationships", // Can also be Cash Flow
    specificProcessPain: "Delays in getting paid by our customers (Accounts Receivable).", // Or "Customers complain about invoice issues"
    keyDiscoveryPoints: [
        { id: "id_kp1", question: "What's the most common reason customer payments are delayed or disputed, aside from inability to pay?", aligningAnswer: "Customers claim they never received the invoice or received it late." },
        { id: "id_kp2", question: "Do your customers have a way to view their invoices, payment history, or raise disputes online without contacting your team?", aligningAnswer: "No, all inquiries come through phone or email, which is a big workload." }
    ],
    keyBenefits: [
        "Reduced Invoice Delivery Costs (Postage, Paper, Labor)",
        "Faster Invoice Delivery & Reduced DSO",
        "Improved Customer Satisfaction with E-Invoicing Options",
        "Guaranteed Invoice Receipt Tracking & Audit Trails",
        "Reduced Inbound 'Invoice Not Received' Calls",
        "Support for Various Electronic Invoice Formats (EDI, PDF)"
    ]
  },
  "supplierManagement": {
    objective: "Explore difficulties in supplier onboarding, communication, and information management addressable by Esker Supplier Management.",
    highLevelPain: "Poor Supplier or Customer Relationships", // Can also be Ops or Finance
    specificProcessPain: "Our suppliers complain about late payments or lack of visibility into invoice status.",
    keyDiscoveryPoints: [
        { id: "sm_kp1", question: "How easy is it for suppliers to get updates on the status of their invoices?", aligningAnswer: "They frequently have to call or email our AP team, which is inefficient for everyone." },
        { id: "sm_kp2", question: "What is your process for onboarding new suppliers and collecting necessary documentation (e.g., banking details, tax forms)?", aligningAnswer: "It's a manual, often lengthy process involving emails and paper forms." },
        { id: "sm_kp3", question: "How do you communicate important updates or changes (e.g., policy changes, contact information) to your supplier base?", aligningAnswer: "Primarily through mass emails, but we're not sure everyone receives or reads them." },
        { id: "sm_kp4", question: "What feedback have you received from suppliers regarding your payment processes or communication?", aligningAnswer: "Suppliers complain about payment delays and the difficulty in getting status updates." },
        { id: "sm_kp5", question: "How do you manage supplier risk, such as financial stability, compliance, or performance issues?", aligningAnswer: "Risk assessment is informal and not consistently applied across all suppliers." }
    ],
    keyBenefits: [
        "Faster & More Efficient Supplier Onboarding",
        "Improved Supplier Data Accuracy & Completeness",
        "Reduced Supplier Risk (Compliance, Financial, Operational)",
        "Enhanced Supplier Collaboration & Communication via Portal",
        "Reduced AP Inquiries from Suppliers Regarding Status",
        "Streamlined Supplier Master Data Maintenance"
    ]
  },
  // M-Files
  "documentManagement": {
    objective: "Use these questions and aligning answers to identify critical issues with document management addressable by M-Files.",
    highLevelPain: "Lack of Visibility, Control & Compliance Risk",
    specificProcessPain: "We can never find the right document when we need it, and it's impacting compliance.",
    keyDiscoveryPoints: [
      { id: "dm_kp1", question: "Where are your most critical business documents (like contracts, HR files, or project plans) stored today?", aligningAnswer: "They are scattered across shared drives, email inboxes, and local hard drives." },
      { id: "dm_kp2", question: "Tell me about a time you struggled to find a specific version of a document. What was the impact?", aligningAnswer: "Yes, it happens often. We've wasted time or used outdated information as a result." },
      { id: "dm_kp3", question: "How do you control who has access to sensitive information or confidential documents?", aligningAnswer: "Access controls are basic (e.g., shared drive permissions) and hard to manage granularly." },
      { id: "dm_kp4", question: "How do you collaborate on documents when multiple people need to provide input or approve them?", aligningAnswer: "Mostly by emailing attachments back and forth, which creates version chaos." },
      { id: "dm_kp5", question: "What are your main concerns regarding document retention policies and audit trails?", aligningAnswer: "We struggle to consistently apply retention policies across all our documents." }
    ],
    keyBenefits: [
        "Faster Document Retrieval & Reduced Search Time",
        "Improved Version Control & Elimination of Outdated Docs",
        "Enhanced Security, Access Control & Permissions Management",
        "Improved Regulatory Compliance & Auditability",
        "Increased Staff Productivity & Efficiency",
        "Streamlined Collaboration & Document-Centric Workflows"
    ]
  },
  // Nintex
  "processMapping": {
    objective: "Use these questions and aligning answers to see if the customer needs better process understanding, addressable by Nintex Process Mapping.",
    highLevelPain: "Inefficient Operations & Manual Processes",
    specificProcessPain: "Our internal workflows and processes are confusing and inconsistent.",
    keyDiscoveryPoints: [
      { id: "pm_kp1", question: "How do you currently document and share your standard operating procedures across the team?", aligningAnswer: "Documentation is outdated, hard to find, or non-existent for many processes." },
      { id: "pm_kp2", question: "When a process needs to be updated, what's involved in making that happen and communicating it effectively?", aligningAnswer: "It's a slow and cumbersome process to update documentation and ensure everyone is aware." },
      { id: "pm_kp3", question: "How do you identify bottlenecks or areas for improvement in your day-to-day workflows?", aligningAnswer: "It's mostly based on gut feel or when something goes significantly wrong." },
      { id: "pm_kp4", question: "Can you give an example of a business process that you feel takes more steps or handoffs than it should?", aligningAnswer: "We know some processes are inefficient, but haven't formally mapped them out." } // This question can also lead to Workflow.
    ],
    keyBenefits: [
        "Clear Understanding of Current As-Is Processes",
        "Easy Identification of Bottlenecks & Inefficiencies",
        "Improved Process Standardization & Consistency",
        "Solid Foundation for Effective Automation Initiatives",
        "Enhanced Employee Onboarding & Training Effectiveness",
        "Better Collaboration & Communication on Process Improvement"
    ]
  },
  "workflowManagement": {
    objective: "Identify opportunities to automate manual tasks and streamline processes with Nintex Workflow Management.",
    highLevelPain: "Inefficient Operations & Manual Processes",
    specificProcessPain: "Our internal workflows and processes are confusing and inconsistent.",
    keyDiscoveryPoints: [
        { id: "wm_kp1", question: "How do you currently document and share your standard operating procedures across the team?", aligningAnswer: "We have SOPs, but they are static documents not easily updated or integrated into daily work." }, // This answer points to both Mapping and Workflow
        { id: "wm_kp2", question: "How do you identify bottlenecks or areas for improvement in your day-to-day workflows?", aligningAnswer: "We lack the data or tools to objectively analyse process performance." },
        { id: "wm_kp3", question: "Can you give an example of a business process that you feel takes more steps or handoffs than it should?", aligningAnswer: "Yes, [User describes a complex manual process, e.g., employee onboarding]." },
        { id: "wm_kp4", question: "How are tasks that require input or action from multiple people or departments currently managed and tracked?", aligningAnswer: "Mostly through email chains or shared spreadsheets, it's hard to see progress." }
    ],
    keyBenefits: [
        "Increased Process Efficiency & Reduced Cycle Times",
        "Reduced Manual Task Handoffs & Human Error",
        "Improved Process Visibility, Tracking & Accountability",
        "Enhanced Consistency & Standardization of Operations",
        "Increased Staff Productivity (Focus on Value-Added Work)",
        "Faster Response Times to Business Needs & Changes"
    ]
  },
  // Fujifilm ITS Placeholders
  "managedITSupport": {
    objective: "Assess need for comprehensive IT support services (Fujifilm).",
    highLevelPain: "IT Operational Challenges & Inefficiencies",
    specificProcessPain: "Our current IT support is slow, reactive, or too costly.",
    keyDiscoveryPoints: [
        { id: "ms_kp1", question: "How would you describe your current IT support model and its effectiveness?", aligningAnswer: "Primarily reactive, we struggle to keep up with user issues and system maintenance." },
        { id: "ms_kp2", question: "What are the most frequent IT complaints from your users?", aligningAnswer: "Slow response times, recurring problems, and systems being down." }
    ],
    keyBenefits: [ "Improved IT support response and resolution times", "Reduced IT operational burden and predictable costs", "Access to specialized IT skills and proactive maintenance", "Enhanced system reliability and security posture" ]
  },
  "cybersecurityServices": {
    objective: "Explore needs for enhanced cybersecurity measures (Fujifilm).",
    highLevelPain: "Cybersecurity Threats & Regulatory Compliance Concerns",
    specificProcessPain: "We're concerned about our vulnerability to cyber threats and meeting compliance.",
    keyDiscoveryPoints: [
        { id: "cs_kp1", question: "What are your main concerns regarding cybersecurity and data protection?", aligningAnswer: "We worry about ransomware, data breaches, and our ability to detect threats." },
        { id: "cs_kp2", question: "How do you currently manage security monitoring and incident response?", aligningAnswer: "It's limited, and we don't have 24/7 coverage or a dedicated security team." }
    ],
    keyBenefits: [ "Enhanced protection against evolving cyber threats", "Improved compliance posture (e.g., Essential Eight)", "Reduced risk and impact of security incidents", "Access to expert security monitoring and incident response" ]
  },
  "cloudSolutions": {
    objective: "Identify opportunities for cloud migration, optimization, or management (Fujifilm).",
    highLevelPain: "Misaligned IT Strategy & Technology Modernization Challenges", // Could also be OpEx
    specificProcessPain: "Our current infrastructure is inflexible, costly, or we need help with cloud strategy.",
    keyDiscoveryPoints: [
        { id: "cls_kp1", question: "What is your current approach to cloud services (e.g., on-prem, hybrid, multi-cloud)?", aligningAnswer: "We're mostly on-premise and finding it hard to scale or manage costs effectively." },
        { id: "cls_kp2", question: "Are you looking to migrate workloads to the cloud or optimize your existing cloud spend/performance?", aligningAnswer: "Yes, we need help planning a cloud migration or our current cloud costs are too high." }
    ],
    keyBenefits: [ "Increased IT agility and scalability with cloud infrastructure", "Optimized cloud spend and resource utilization", "Expert guidance on cloud strategy, migration, and management", "Enhanced data security and disaster recovery in the cloud" ]
  },
  "networkServices": {
    objective: "Determine need for network assessment, management, or optimization (Fujifilm).",
    highLevelPain: "IT Operational Challenges & Inefficiencies", // Or Workforce Enablement if user-facing
    specificProcessPain: "Users complain about slow network performance or unreliable connectivity.",
    keyDiscoveryPoints: [
        { id: "ns_kp1", question: "How would you rate your current network performance and reliability?", aligningAnswer: "It's often slow, especially for cloud apps, and we have occasional outages." },
        { id: "ns_kp2", question: "Are you planning any network upgrades or expansions (e.g., new sites, increased bandwidth needs)?", aligningAnswer: "Yes, but we lack the internal expertise to design and implement it effectively." }
    ],
    keyBenefits: [ "Improved network performance, reliability, and security", "Optimized network design for cloud and modern applications", "Proactive network monitoring and management", "Support for evolving business connectivity needs" ]
  },
  "modernWorkplaceITS": {
    objective: "Explore requirements for enhancing collaboration, remote work, and end-user device management (Fujifilm).",
    highLevelPain: "Workforce Productivity & Technology Enablement Gaps",
    specificProcessPain: "Our employees struggle with current collaboration tools or secure remote access.",
    keyDiscoveryPoints: [
        { id: "mw_kp1", question: "How effectively are your employees able to collaborate, especially when working remotely?", aligningAnswer: "Our tools are disjointed, and remote work presents security and access challenges." },
        { id: "mw_kp2", question: "What are your goals for improving the end-user computing experience and device management?", aligningAnswer: "We want to provide a seamless, secure experience on any device, anywhere." }
    ],
    keyBenefits: [ "Enhanced employee collaboration and productivity tools", "Secure and efficient remote work capabilities", "Streamlined end-user device management and support", "Improved user experience with modern workplace technologies" ]
  },
  "itConsulting": {
    objective: "Identify needs for strategic IT advice, roadmap development, or project guidance (Fujifilm).",
    highLevelPain: "Misaligned IT Strategy & Technology Modernization Challenges",
    specificProcessPain: "We lack a clear IT roadmap or struggle with strategic technology decisions.",
    keyDiscoveryPoints: [
        { id: "itc_kp1", question: "How well does your current IT strategy align with your overall business objectives?", aligningAnswer: "We feel our IT is more reactive than strategic, and it's not fully supporting business growth." },
        { id: "itc_kp2", question: "Are there specific IT projects or technology challenges where you require external expertise or guidance?", aligningAnswer: "Yes, we're considering [a major IT initiative] but need help with planning and execution." }
    ],
    keyBenefits: [ "Clear and actionable IT strategy aligned with business goals", "Expert guidance on technology selection and implementation", "Roadmap for IT modernization and digital transformation", "Objective advice to optimize IT investments and mitigate risks" ]
  }
};

// Ensure all product modules have a fallback in REVERSE_WATERFALL_CHEAT_SHEETS if not explicitly defined
ALL_PRODUCT_MODULES_FOR_PAIN_POINTS_TAB.forEach(module => {
    if (!REVERSE_WATERFALL_CHEAT_SHEETS[module.id]) {
        REVERSE_WATERFALL_CHEAT_SHEETS[module.id] = {
            objective: `Use these questions to validate if the customer is experiencing significant pains addressable by ${module.technologyPartner ? module.technologyPartner + ' ' : ''}${module.name}.`,
            highLevelPain: "Generic Business Challenge",
            specificProcessPain: `Inefficiencies in ${module.name}`,
            keyDiscoveryPoints: [
                { id: `gen_${module.id}_kp1`, question: `Can you describe your current process for ${module.name}?`, aligningAnswer: "It's highly manual and causes significant delays or errors." },
                { id: `gen_${module.id}_kp2`, question: `What are the biggest challenges you face with ${module.name}?`, aligningAnswer: "Lack of visibility and control, leading to compliance issues or poor performance." }
            ],
            keyBenefits: [
                `Increased Efficiency in ${module.name}`,
                `Reduced Manual Effort for ${module.name} Tasks`,
                `Improved Accuracy for ${module.name} Processes`,
                `Enhanced Visibility and Control over ${module.name}`,
                `Better Compliance for ${module.name} Activities`,
                `Overall Cost Reduction in ${module.name} Operations`
            ]
        };
    }
});

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
