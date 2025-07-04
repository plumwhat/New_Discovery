import { QualificationQuestion, AllModuleQualificationQuestions, ModuleQualificationQuestions, QualificationStatus } from '../types';

export const initialQualificationSectionState = {
  answers: {},
  score: 0,
  status: QualificationStatus.NOT_STARTED,
};

// Base template for emails that will have a health check link
const BASE_EMAIL_TEMPLATE_BODY_WITH_LINK = `Health Check Summary for: {customerCompany}
Module: {moduleName}
Date: {dateCompleted}

{qualitativeContent}
{quantitativeContent}
------------------------------------------
Based on your answers we would invite you to complete a Health Check to enable us to better understand your environment.
Link to Health Check:`;

// Base template for emails that should NOT have a health check link
const BASE_EMAIL_TEMPLATE_BODY_NO_LINK = `Health Check Summary for: {customerCompany}
Module: {moduleName}
Date: {dateCompleted}

{qualitativeContent}
{quantitativeContent}
------------------------------------------
`;

export const QUALIFICATION_EMAIL_TEMPLATES_BY_MODULE: Record<string, string> = {
  // A specific property for the no-link version for clarity in the service.
  default: BASE_EMAIL_TEMPLATE_BODY_NO_LINK,
  
  // Specific modules with their URLs
  cashApplication: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/0i1XpJ6z0v`,
  orderManagement: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/HQiRQwN1uE`,
  procurement: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/3xnUFeA8cz`, // Assuming Procedure Management maps to Procurement
  expenseManagement: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/XFQuWxC73u`,
  creditManagement: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/xGuZnxpDrS`,
  collectionManagement: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/tJqqBJsbd5`,
  claimsDeductions: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/bU6VndfDt6`,
  accountsPayable: `${BASE_EMAIL_TEMPLATE_BODY_WITH_LINK} https://forms.office.com/r/gxfsRwtPzn450`,
};

const DEFAULT_QUALIFICATION_QUESTIONS: ModuleQualificationQuestions = {
  qualitative: [
    { id: "default_qual_1", text: "Strategic Alignment: How well does automating [Module Name] align with the company's strategic objectives?", options: [{id: "dq1o1", label: "Poorly (0)", value: 0}, {id: "dq1o2", label: "Somewhat (5)", value: 5}, {id: "dq1o3", label: "Well (10)", value: 10}, {id: "dq1o4", label: "Perfectly (15)", value: 15}] },
    { id: "default_qual_2", text: "Change Readiness: How prepared is the organisation for process changes related to [Module Name] automation?", options: [{id: "dq2o1", label: "Not Ready (0)", value: 0}, {id: "dq2o2", label: "Hesitant (5)", value: 5}, {id: "dq2o3", label: "Moderately Ready (10)", value: 10}, {id: "dq2o4", label: "Very Ready (15)", value: 15}] },
    { id: "default_qual_3", text: "Stakeholder Buy-in: What is the level of commitment from key stakeholders for improving [Module Name] processes?", options: [{id: "dq3o1", label: "Low (0)", value: 0}, {id: "dq3o2", label: "Medium (5)", value: 5}, {id: "dq3o3", label: "High (10)", value: 10}, {id: "dq3o4", label: "Full Commitment (15)", value: 15}] },
    { id: "default_qual_4", text: "Risk Appetite: How comfortable is the company with adopting new technologies for [Module Name]?", options: [{id: "dq4o1", label: "Risk Averse (0)", value: 0}, {id: "dq4o2", label: "Cautious (5)", value: 5}, {id: "dq4o3", label: "Open (10)", value: 10}, {id: "dq4o4", label: "Eager (15)", value: 15}] },
  ],
  quantitative: [
    { id: "default_quant_1", text: "Volume of Transactions/Tasks for [Module Name]: What is the estimated daily/monthly volume?", options: [{id: "dqt1o1", label: "Low (<100/day) (0)", value: 0}, {id: "dqt1o2", label: "Medium (100-500/day) (5)", value: 5}, {id: "dqt1o3", label: "High (500-2000/day) (10)", value: 10}, {id: "dqt1o4", label: "Very High (>2000/day) (15)", value: 15}] },
    { id: "default_quant_2", text: "Current Process Time for [Module Name]: How long does the current manual process take per unit?", options: [{id: "dqt2o1", label: ">1hr (0)", value: 0}, {id: "dqt2o2", label: "30-60min (5)", value: 5}, {id: "dqt2o3", label: "15-30min (10)", value: 10}, {id: "dqt2o4", label: "<15min (but repetitive) (15)", value: 15}] },
    { id: "default_quant_3", text: "Error Rate in [Module Name]: What is the current error rate in the manual process?", options: [{id: "dqt3o1", label: "<1% (0)", value: 0}, {id: "dqt3o2", label: "1-5% (5)", value: 5}, {id: "dqt3o3", label: "5-10% (10)", value: 10}, {id: "dqt3o4", label: ">10% (15)", value: 15}] },
    { id: "default_quant_4", text: "Number of FTEs Involved in [Module Name]: How many Full-Time Equivalents are involved in this process?", options: [{id: "dqt4o1", label: "<1 (0)", value: 0}, {id: "dqt4o2", label: "1-2 (5)", value: 5}, {id: "dqt4o3", label: "3-5 (10)", value: 10}, {id: "dqt4o4", label: ">5 (15)", value: 15}] },
  ],
};

const DEFAULT_ITS_QUALIFICATION_QUESTIONS: ModuleQualificationQuestions = {
  qualitative: [
    { id: "its_qual_1", text: "Strategic Importance: How critical is the reliability, security, and performance of your IT systems to your core business operations and overall strategy?", options: [{id: "itsq1o1", label: "Support Function (0)", value: 0}, {id: "itsq1o2", label: "Important Enabler (5)", value: 5}, {id: "itsq1o3", label: "Business Critical (10)", value: 10}, {id: "itsq1o4", label: "Foundation of Business (15)", value: 15}] },
    { id: "its_qual_2", text: "Current Satisfaction: What is your organisation's current satisfaction level with its IT support, cybersecurity posture, and overall IT service delivery?", options: [{id: "itsq2o1", label: "Very Dissatisfied (15)", value: 15}, {id: "itsq2o2", label: "Somewhat Dissatisfied (10)", value: 10}, {id: "itsq2o3", label: "Neutral (5)", value: 5}, {id: "itsq2o4", label: "Satisfied (0)", value: 0}] },
    { id: "its_qual_3", text: "Executive Urgency: What is the level of executive sponsorship and perceived urgency for improving IT services or security posture?", options: [{id: "itsq3o1", label: "Low/None (0)", value: 0}, {id: "itsq3o2", label: "Moderate Interest (5)", value: 5}, {id: "itsq3o3", label: "High Priority (10)", value: 10}, {id: "itsq3o4", label: "Top Executive Mandate (15)", value: 15}] },
    { id: "its_qual_4", text: "Change Preparedness: How prepared is the organisation for potential changes in IT service delivery models, security practices, or user interaction with IT?", options: [{id: "itsq4o1", label: "Resistant/Low (0)", value: 0}, {id: "itsq4o2", label: "Cautious/Medium (5)", value: 5}, {id: "itsq4o3", label: "Open/High (10)", value: 10}, {id: "itsq4o4", label: "Eager/Very High (15)", value: 15}] },
  ],
  quantitative: [
    { id: "its_quant_1", text: "User Base: Approximately how many employees/users are reliant on IT systems for their daily work?", options: [{id: "itsqt1o1", label: "<50 (0)", value: 0}, {id: "itsqt1o2", label: "50-200 (5)", value: 5}, {id: "itsqt1o3", label: "201-500 (10)", value: 10}, {id: "itsqt1o4", label: ">500 (15)", value: 15}] },
    { id: "its_quant_2", text: "IT Operational Budget: What is your current annual IT operational budget (excluding major capital projects) or specific spend on areas of IT pain?", options: [{id: "itsqt2o1", label: "Limited/Unclear (0)", value: 0}, {id: "itsqt2o2", label: "Defined, but constrained (5)", value: 5}, {id: "itsqt2o3", label: "Adequate for current needs (10)", value: 10}, {id: "itsqt2o4", label: "Significant/Open to investment for value (15)", value: 15}] },
    { id: "its_quant_3", text: "Impact of Issues: Can you estimate the frequency or financial/operational impact of IT-related disruptions (e.g., downtime, slow performance)?", options: [{id: "itsqt3o1", label: "Low/Infrequent (0)", value: 0}, {id: "itsqt3o2", label: "Occasional/Minor (5)", value: 5}, {id: "itsqt3o3", label: "Frequent/Moderate (10)", value: 10}, {id: "itsqt3o4", label: "Constant/Significant (15)", value: 15}] },
    { id: "its_quant_4", text: "Internal IT Resources: How many internal IT staff are dedicated to managing and supporting this service area?", options: [{id: "itsqt4o1", label: "None / Shared Responsibility (15)", value: 15}, {id: "itsqt4o2", label: "1-2 FTEs (Strained) (10)", value: 10}, {id: "itsqt4o3", label: "Adequate Team (5)", value: 5}, {id: "itsqt4o4", label: "Large / Specialized Team (0)", value: 0}] },
  ],
};

export const DEFAULT_QUALIFICATION_THRESHOLDS = {
  qualified: 35,
  clarification: 20,
};

export const QUALIFICATION_QUESTIONS_BY_MODULE: AllModuleQualificationQuestions = {
  // Finance Modules
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_1", text: "How strategically important is improving AP efficiency to your finance leadership?", options: [{id: "ap_qual_1_o1", label: "Low priority", value: 0}, {id: "ap_qual_1_o2", label: "Nice to have", value: 5}, {id: "ap_qual_1_o3", label: "High priority", value: 10}, {id: "ap_qual_1_o4", label: "Critical initiative", value: 15}] },
      { id: "ap_qual_2", text: "How open is the AP team to adopting new technologies to replace manual tasks?", options: [{id: "ap_qual_2_o1", label: "Resistant", value: 0}, {id: "ap_qual_2_o2", label: "Cautious", value: 5}, {id: "ap_qual_2_o3", label: "Open", value: 10}, {id: "ap_qual_2_o4", label: "Eager for change", value: 15}] },
      { id: "ap_qual_3", text: "What level of executive sponsorship exists for an AP automation project?", options: [{id: "ap_qual_3_o1", label: "None", value: 0}, {id: "ap_qual_3_o2", label: "Department manager level", value: 5}, {id: "ap_qual_3_o3", label: "VP/Director level", value: 10}, {id: "ap_qual_3_o4", label: "C-level sponsor", value: 15}] },
      { id: "ap_qual_4", text: "How significant is the pain caused by supplier inquiries about invoice/payment status?", options: [{id: "ap_qual_4_o1", label: "Insignificant", value: 0}, {id: "ap_qual_4_o2", label: "Minor annoyance", value: 5}, {id: "ap_qual_4_o3", label: "Significant distraction", value: 10}, {id: "ap_qual_4_o4", label: "Major operational issue", value: 15}] },
    ],
    quantitative: [
      { id: "ap_quant_1", text: "What is your monthly invoice volume?", options: [{id: "ap_quant_1_o1", label: "< 500", value: 0}, {id: "ap_quant_1_o2", label: "500 - 2,000", value: 5}, {id: "ap_quant_1_o3", label: "2,000 - 10,000", value: 10}, {id: "ap_quant_1_o4", label: "> 10,000", value: 15}] },
      { id: "ap_quant_2", text: "How many FTEs are dedicated to the Accounts Payable process?", options: [{id: "ap_quant_2_o1", label: "< 1", value: 0}, {id: "ap_quant_2_o2", label: "1 - 3", value: 5}, {id: "ap_quant_2_o3", label: "4 - 7", value: 10}, {id: "ap_quant_2_o4", label: "> 7", value: 15}] },
      { id: "ap_quant_3", text: "What is your estimated cost per invoice processed?", options: [{id: "ap_quant_3_o1", label: "< $5", value: 0}, {id: "ap_quant_3_o2", label: "$5 - $10", value: 5}, {id: "ap_quant_3_o3", label: "$10 - $20", value: 10}, {id: "ap_quant_3_o4", label: "> $20", value: 15}] },
      { id: "ap_quant_4", text: "What percentage of early payment discounts are you currently unable to capture?", options: [{id: "ap_quant_4_o1", label: "< 10%", value: 0}, {id: "ap_quant_4_o2", label: "10% - 30%", value: 5}, {id: "ap_quant_4_o3", label: "30% - 60%", value: 10}, {id: "ap_quant_4_o4", label: "> 60%", value: 15}] },
    ]
  },
  documentManagement: {
    qualitative: [
      { id: "dm_qual_1", text: "How important is improving document accessibility and collaboration for remote/hybrid workers?", options: [{id: "dm_qual_1_o1", label: "Not important", value: 0}, {id: "dm_qual_1_o2", label: "Slightly important", value: 5}, {id: "dm_qual_1_o3", label: "Very important", value: 10}, {id: "dm_qual_1_o4", label: "Business critical", value: 15}] },
      { id: "dm_qual_2", text: "What is the level of concern regarding compliance and security risks with the current document storage methods?", options: [{id: "dm_qual_2_o1", label: "Low concern", value: 0}, {id: "dm_qual_2_o2", label: "Some concern", value: 5}, {id: "dm_qual_2_o3", label: "High concern", value: 10}, {id: "dm_qual_2_o4", label: "Major risk identified", value: 15}] },
      { id: "dm_qual_3", text: "How much executive buy-in is there for a project to modernise document management?", options: [{id: "dm_qual_3_o1", label: "None", value: 0}, {id: "dm_qual_3_o2", label: "Departmental interest", value: 5}, {id: "dm_qual_3_o3", label: "IT leadership support", value: 10}, {id: "dm_qual_3_o4", label: "C-level sponsorship", value: 15}] },
      { id: "dm_qual_4", text: "How painful is the process of finding the 'single source of truth' for a critical document or project?", options: [{id: "dm_qual_4_o1", label: "Not painful", value: 0}, {id: "dm_qual_4_o2", label: "Occasionally frustrating", value: 5}, {id: "dm_qual_4_o3", label: "Frequently painful", value: 10}, {id: "dm_qual_4_o4", label: "A constant struggle", value: 15}] },
    ],
    quantitative: [
      { id: "dm_quant_1", text: "How many different systems/locations are used to store critical documents (e.g., network drives, email, SharePoint, local PCs)?", options: [{id: "dm_quant_1_o1", label: "1-2", value: 0}, {id: "dm_quant_1_o2", label: "3-4", value: 5}, {id: "dm_quant_1_o3", label: "5-7", value: 10}, {id: "dm_quant_1_o4", label: "> 7", value: 15}] },
      { id: "dm_quant_2", text: "How many employees regularly need to access or collaborate on these documents?", options: [{id: "dm_quant_2_o1", label: "< 25", value: 0}, {id: "dm_quant_2_o2", label: "25-100", value: 5}, {id: "dm_quant_2_o3", label: "101-500", value: 10}, {id: "dm_quant_2_o4", label: "> 500", value: 15}] },
      { id: "dm_quant_3", text: "What is the estimated time an employee spends per week searching for information?", options: [{id: "dm_quant_3_o1", label: "< 1 hour", value: 0}, {id: "dm_quant_3_o2", label: "1-3 hours", value: 5}, {id: "dm_quant_3_o3", label: "3-5 hours", value: 10}, {id: "dm_quant_3_o4", label: "> 5 hours", value: 15}] },
      { id: "dm_quant_4", text: "How frequently are audit or compliance requests difficult to fulfill due to documentation issues?", options: [{id: "dm_quant_4_o1", label: "Never", value: 0}, {id: "dm_quant_4_o2", label: "Rarely", value: 5}, {id: "dm_quant_4_o3", label: "Sometimes", value: 10}, {id: "dm_quant_4_o4", label: "Frequently", value: 15}] },
    ]
  },
  // Add other specific modules here if needed, otherwise they use default.
  // ...
  // Fallbacks
  default: DEFAULT_QUALIFICATION_QUESTIONS,
  defaultITS: DEFAULT_ITS_QUALIFICATION_QUESTIONS,
};
