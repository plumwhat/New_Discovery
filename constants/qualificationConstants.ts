
import { QualificationQuestion, AllModuleQualificationQuestions, ModuleQualificationQuestions, QualificationStatus } from '../types';

export const initialQualificationSectionState = {
  answers: {},
  score: 0,
  status: QualificationStatus.NOT_STARTED,
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
    { id: "its_qual_2", text: "Current Satisfaction: What is your organization's current satisfaction level with its IT support, cybersecurity posture, and overall IT service delivery?", options: [{id: "itsq2o1", label: "Very Dissatisfied (15)", value: 15}, {id: "itsq2o2", label: "Somewhat Dissatisfied (10)", value: 10}, {id: "itsq2o3", label: "Neutral (5)", value: 5}, {id: "itsq2o4", label: "Satisfied (0)", value: 0}] },
    { id: "its_qual_3", text: "Executive Urgency: What is the level of executive sponsorship and perceived urgency for improving IT services or security posture?", options: [{id: "itsq3o1", label: "Low/None (0)", value: 0}, {id: "itsq3o2", label: "Moderate Interest (5)", value: 5}, {id: "itsq3o3", label: "High Priority (10)", value: 10}, {id: "itsq3o4", label: "Top Executive Mandate (15)", value: 15}] },
    { id: "its_qual_4", text: "Change Preparedness: How prepared is the organization for potential changes in IT service delivery models, security practices, or user interaction with IT?", options: [{id: "itsq4o1", label: "Resistant/Low (0)", value: 0}, {id: "itsq4o2", label: "Cautious/Medium (5)", value: 5}, {id: "itsq4o3", label: "Open/High (10)", value: 10}, {id: "itsq4o4", label: "Eager/Very High (15)", value: 15}] },
  ],
  quantitative: [
    { id: "its_quant_1", text: "User Base: Approximately how many employees/users are reliant on IT systems for their daily work?", options: [{id: "itsqt1o1", label: "<50 (0)", value: 0}, {id: "itsqt1o2", label: "50-200 (5)", value: 5}, {id: "itsqt1o3", label: "201-500 (10)", value: 10}, {id: "itsqt1o4", label: ">500 (15)", value: 15}] },
    { id: "its_quant_2", text: "IT Operational Budget: What is your current annual IT operational budget (excluding major capital projects) or specific spend on areas of IT pain?", options: [{id: "itsqt2o1", label: "Limited/Unclear (0)", value: 0}, {id: "itsqt2o2", label: "Defined, but constrained (5)", value: 5}, {id: "itsqt2o3", label: "Adequate for current needs (10)", value: 10}, {id: "itsqt2o4", label: "Significant/Open to investment for value (15)", value: 15}] },
    { id: "its_quant_3", text: "Impact of Issues: Can you estimate the frequency or financial/operational impact of IT downtime or security incidents in the last 12 months?", options: [{id: "itsqt3o1", label: "Minimal/Rare (0)", value: 0}, {id: "itsqt3o2", label: "Occasional, minor impact (5)", value: 5}, {id: "itsqt3o3", label: "Frequent, moderate impact (10)", value: 10}, {id: "itsqt3o4", label: "Constant, significant impact (15)", value: 15}] },
    { id: "its_quant_4", text: "Internal IT Staff Allocation: What proportion of your internal IT staff time is spent on reactive support/security vs. strategic IT initiatives?", options: [{id: "itsqt4o1", label: "Mostly Strategic (0)", value: 0}, {id: "itsqt4o2", label: "Balanced (5)", value: 5}, {id: "itsqt4o3", label: "Mostly Reactive (10)", value: 10}, {id: "itsqt4o4", label: "Entirely Reactive (15)", value: 15}] },
  ],
};


export const QUALIFICATION_QUESTIONS_BY_MODULE: AllModuleQualificationQuestions = {
  default: DEFAULT_QUALIFICATION_QUESTIONS,
  defaultITS: DEFAULT_ITS_QUALIFICATION_QUESTIONS,
  accountsPayable: {
    qualitative: [
      { id: "ap_qual_strat_align", text: "How strategically critical is optimizing the Accounts Payable process to your company's current financial objectives?", options: [{id: "apo1", label: "Low Priority (0)", value: 0}, {id: "apo2", label: "Moderately Important (5)", value: 5}, {id: "apo3", label: "Highly Important (10)", value: 10}, {id: "apo4", label: "Mission Critical (15)", value: 15}] },
      { id: "ap_qual_team_capacity", text: "How would you describe your AP team's current workload and capacity to handle invoice volumes efficiently?", options: [{id: "apo5", label: "Underutilized (0)", value: 0}, {id: "apo6", label: "Manageable (5)", value: 5}, {id: "apo7", label: "Stretched Thin (10)", value: 10}, {id: "apo8", label: "Overwhelmed (15)", value: 15}] },
      { id: "ap_qual_supplier_rel", text: "What is the current impact of your AP process (e.g., payment timeliness, dispute resolution) on supplier relationships?", options: [{id: "apo9", label: "Positive (0)", value: 0}, {id: "apo10", label: "Neutral (5)", value: 5}, {id: "apo11", label: "Slightly Negative (10)", value: 10}, {id: "apo12", label: "Significantly Strained (15)", value: 15}] },
      { id: "ap_qual_it_readiness", text: "How prepared is your current IT infrastructure (ERP, financial systems) for integration with a modern AP automation solution?", options: [{id: "apo13", label: "Fully Prepared/APIs (15)", value: 15}, {id: "apo14", label: "Requires Some Effort (10)", value: 10}, {id: "apo15", label: "Significant Legacy Challenges (5)", value: 5}, {id: "apo16", label: "Unsure/Not Ready (0)", value: 0}] },
    ],
    quantitative: [
      { id: "ap_quant_invoice_vol", text: "What is your approximate monthly volume of supplier invoices?", options: [{id: "apqo1", label: "<500 (0)", value: 0}, {id: "apqo2", label: "500 - 2,000 (5)", value: 5}, {id: "apqo3", label: "2,001 - 10,000 (10)", value: 10}, {id: "apqo4", label: ">10,000 (15)", value: 15}] },
      { id: "ap_quant_cost_per_inv", text: "What is your estimated current average cost to process a single supplier invoice manually?", options: [{id: "apqo5", label: "<$5 (0)", value: 0}, {id: "apqo6", label: "$5 - $9.99 (5)", value: 5}, {id: "apqo7", label: "$10 - $20 (10)", value: 10}, {id: "apqo8", label: ">$20 (15)", value: 15}] },
      { id: "ap_quant_exception_rate", text: "Approximately what percentage of your invoices typically require manual exception handling (e.g., discrepancies, missing POs)?", options: [{id: "apqo9", label: "<5% (0)", value: 0}, {id: "apqo10", label: "5% - 14.99% (5)", value: 5}, {id: "apqo11", label: "15% - 25% (10)", value: 10}, {id: "apqo12", label: ">25% (15)", value: 15}] },
      { id: "ap_quant_discount_capture", text: "What percentage of available early payment discounts are you currently capturing?", options: [{id: "apqo13", label: ">60% (0)", value: 0}, {id: "apqo14", label: "31% - 60% (5)", value: 5}, {id: "apqo15", label: "10% - 30% (10)", value: 10}, {id: "apqo16", label: "<10% (15)", value: 15}] },
    ],
  },
  documentManagement: {
    qualitative: [
      { id: "dm_qual_info_access", text: "How significant are the challenges related to finding and accessing correct document versions for your team's daily operations?", options: [{id: "dmo1", label: "Minor Inconvenience (0)", value: 0}, {id: "dmo2", label: "Moderate Impact (5)", value: 5}, {id: "dmo3", label: "Significant Bottleneck (10)", value: 10}, {id: "dmo4", label: "Critical Issue (15)", value: 15}]},
      { id: "dm_qual_compliance_risk", text: "What is the perceived level of risk associated with your current document management practices regarding compliance and audit readiness?", options: [{id: "dmo5", label: "Low Risk (0)", value: 0}, {id: "dmo6", label: "Some Concerns (5)", value: 5}, {id: "dmo7", label: "Moderate Risk (10)", value: 10}, {id: "dmo8", label: "High Risk/Non-Compliant (15)", value: 15}]},
      { id: "dm_qual_collaboration", text: "How effectively do current tools support collaboration and version control for documents shared across teams or projects?", options: [{id: "dmo9", label: "Very Effectively (0)", value: 0}, {id: "dmo10", label: "Adequately (5)", value: 5}, {id: "dmo11", label: "Inefficiently (10)", value: 10}, {id: "dmo12", label: "Very Poorly (15)", value: 15}]},
      { id: "dm_qual_change_mgmt", text: "How receptive are employees to adopting new systems for managing documents, and what's the anticipated change management effort?", options: [{id: "dmo13", label: "Highly Receptive/Low Effort (15)", value: 15}, {id: "dmo14", label: "Moderately Receptive/Manageable Effort (10)", value: 10}, {id: "dmo15", label: "Resistant/Significant Effort (5)", value: 5}, {id: "dmo16", label: "Very Resistant/High Effort (0)", value: 0}]}
    ],
    quantitative: [
      { id: "dm_quant_time_searching", text: "On average, how many hours per week does an employee spend searching for documents or information?", options: [{id: "dmqo1", label: "<1 hour (0)", value: 0}, {id: "dmqo2", label: "1-3 hours (5)", value: 5}, {id: "dmqo3", label: "3-5 hours (10)", value: 10}, {id: "dmqo4", label: ">5 hours (15)", value: 15}]},
      { id: "dm_quant_repo_count", text: "How many primary repositories (e.g., shared drives, SharePoint sites, local storage) are currently used for critical business documents?", options: [{id: "dmqo5", label: "1-2 (0)", value: 0}, {id: "dmqo6", label: "3-5 (5)", value: 5}, {id: "dmqo7", label: "6-10 (10)", value: 10}, {id: "dmqo8", label: ">10 (15)", value: 15}]},
      { id: "dm_quant_version_errors", text: "How frequently do issues arise from using incorrect document versions?", options: [{id: "dmqo9", label: "Rarely/Never (0)", value: 0}, {id: "dmqo10", label: "Occasionally (Monthly) (5)", value: 5}, {id: "dmqo11", label: "Frequently (Weekly) (10)", value: 10}, {id: "dmqo12", label: "Constantly (Daily) (15)", value: 15}]},
      { id: "dm_quant_storage_volume", text: "What is the approximate volume of digital documents (e.g., in GB/TB or estimated number of files) that need better management?", options: [{id: "dmqo13", label: "Small (<100GB) (0)", value: 0}, {id: "dmqo14", label: "Medium (100GB-1TB) (5)", value: 5}, {id: "dmqo15", label: "Large (1TB-5TB) (10)", value: 10}, {id: "dmqo16", label: "Very Large (>5TB) (15)", value: 15}]}
    ]
  }
  // Add other module-specific questions here as researched
};

export const DEFAULT_QUALIFICATION_THRESHOLDS = {
  qualified: 40, // Example: Sum of 4 questions, if avg > 10
  clarification: 20, // Example: Sum of 4 questions, if avg > 5
};
