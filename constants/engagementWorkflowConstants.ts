import { EngagementStepType } from '../types';

export const ENGAGEMENT_OBJECTIVES: Record<EngagementStepType, string[]> = {
  [EngagementStepType.INITIAL_ENGAGEMENT]: [
    "Qualify Lead (BANT)",
    "Understand High-Level Pain Points",
    "Establish Initial Contact & Rapport",
    "Schedule First Customer Meeting",
  ],
  [EngagementStepType.HEALTH_CHECK]: [
    "Assess Current Process State",
    "Benchmark Against Industry Standards",
    "Identify Quick Wins & Obvious Gaps",
    "Gather Data for Business Case",
  ],
  [EngagementStepType.CUSTOMER_MEETING]: [
    "Confirm Understanding of Challenges",
    "Introduce High-Level Value Proposition",
    "Build Relationships with Key Stakeholders",
    "Define & Agree on Next Steps",
  ],
  [EngagementStepType.QUALIFICATION]: [
    "Validate Budget & Financial Viability",
    "Identify & Confirm Decision-Makers (Authority)",
    "Deepen Understanding of Need & Urgency",
    "Establish Agreed-Upon Timeline",
    "Assess Technical Fit & Environment",
  ],
  [EngagementStepType.DISCOVERY_MEETING]: [
    "Deep-Dive into Specific Processes",
    "Map Pain Points to Solution Capabilities",
    "Identify Key Metrics for Success (KPIs)",
    "Uncover Political Landscape & Influencers",
  ],
  [EngagementStepType.PROCESS_MAPS]: [
    "Visualize Current State 'As-Is' Process",
    "Design & Agree on Future State 'To-Be' Process",
    "Gain Consensus on Process Changes",
    "Document Scope for Implementation",
  ],
  [EngagementStepType.DEMONSTRATION]: [
    "Showcase Solution for Specific Pain Points",
    "Prove Technical Viability & 'Art of the Possible'",
    "Create a 'Wow' Moment for Users & Stakeholders",
    "Address Technical & Functional Questions",
  ],
  [EngagementStepType.ROI_SOLUTION_PRESENTATION]: [
    "Present Final Business Case & ROI Analysis",
    "Align Solution with Executive-Level Goals",
    "Secure Final Approval & Commitment",
    "Outline Implementation Plan & Next Steps",
  ],
};

export const ENGAGEMENT_SALES_ACTIONS: Record<EngagementStepType, string[]> = {
  [EngagementStepType.INITIAL_ENGAGEMENT]: [
    "Research prospect on LinkedIn/Company Website",
    "Prepare initial outreach email/call script",
    "Send introductory email with value proposition",
    "Make initial qualifying call to champion",
  ],
  [EngagementStepType.HEALTH_CHECK]: [
    "Send pre-call questionnaire to gather data",
    "Analyze customer's existing process documentation",
    "Prepare agenda for health check call",
    "Conduct benchmark analysis against industry data",
  ],
  [EngagementStepType.CUSTOMER_MEETING]: [
    "Prepare meeting agenda and presentation deck",
    "Confirm meeting attendees and roles",
    "Document meeting minutes and action items",
    "Send follow-up email summarizing discussion & next steps",
  ],
  [EngagementStepType.QUALIFICATION]: [
    "Identify and engage with the economic buyer",
    "Discuss budget allocation and approval process",
    "Confirm project timeline with project sponsor",
    "Assess technical infrastructure for solution fit with IT",
  ],
  [EngagementStepType.DISCOVERY_MEETING]: [
    "Prepare detailed, role-based discovery questions",
    "Schedule session with process owners/SMEs",
    "Document current state process flow ('As-Is')",
    "Identify and quantify key pain points and metrics",
  ],
  [EngagementStepType.PROCESS_MAPS]: [
    "Create 'As-Is' process map based on discovery notes",
    "Lead workshop to validate 'As-Is' map with stakeholders",
    "Collaborate on designing the 'To-Be' process",
    "Get stakeholder sign-off on future state map",
  ],
  [EngagementStepType.DEMONSTRATION]: [
    "Prepare tailored demo script focusing on key pains",
    "Configure demo environment with customer-specific data",
    "Conduct internal pre-demo dry run",
    "Follow up with demo recording and Q&A summary",
  ],
  [EngagementStepType.ROI_SOLUTION_PRESENTATION]: [
    "Finalize ROI calculations and business case document",
    "Prepare executive-level presentation deck",
    "Schedule presentation with all decision-makers",
    "Deliver formal proposal and outline procurement steps",
  ],
};