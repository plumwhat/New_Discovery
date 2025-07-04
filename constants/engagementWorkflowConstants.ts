import { EngagementStepType } from '../types';

export const ENGAGEMENT_OBJECTIVES: Record<EngagementStepType, string[]> = {
  [EngagementStepType.PLAN_AND_PREPARE]: [
    "Develop Account Hypothesis & Initial POV",
    "Identify Key Stakeholders, Influencers & Detractors",
    "Define Initial Value Proposition",
    "Establish Multi-Threaded Outreach Strategy",
  ],
  [EngagementStepType.OPEN_AND_CONNECT]: [
    "Establish Credibility & Build Rapport",
    "Secure Initial Discovery Meeting with a Champion",
    "Understand Customer's Initial Perspective & Stated Needs",
    "Validate Key Stakeholder Roles & Influence",
  ],
  [EngagementStepType.DISCOVER_AND_DIAGNOSE]: [
    "Uncover Underlying Business Pains & Critical Needs",
    "Quantify Financial & Operational Impact of Pains",
    "Understand Decision-Making Process, Criteria & Timeline",
    "Identify Political Landscape & Cultivate Coaches",
  ],
  [EngagementStepType.CRAFT_AND_VALIDATE_SOLUTION]: [
    "Co-create a 'To-Be' Vision with the Customer",
    "Map Solution Capabilities to Diagnosed Needs",
    "Gain Preliminary Buy-in from Key Stakeholders",
    "Document Technical, Business & Success Requirements",
  ],
  [EngagementStepType.PROPOSE_AND_PROVE_VALUE]: [
    "Deliver a Tailored, Value-Based Demonstration",
    "Present a Compelling Business Case & ROI Analysis",
    "Proactively Address all Stakeholder Objections",
    "Submit Formal Proposal Document",
  ],
  [EngagementStepType.GAIN_COMMITMENT_AND_CLOSE]: [
    "Finalize Technical, Commercial & Legal Terms",
    "Secure Verbal and Written Commitment from Power Sponsor",
    "Navigate Procurement & Legal Review Processes",
    "Gain Final Signature on Agreement",
  ],
  [EngagementStepType.IMPLEMENT_AND_EXPAND]: [
    "Ensure a Smooth Handover to Implementation/CSM Team",
    "Track and Confirm Initial Value Realization (First 90 Days)",
    "Establish Cadence for Strategic Business Reviews (QBRs)",
    "Identify & Qualify Upsell/Cross-sell Opportunities",
  ],
};

export const ENGAGEMENT_SALES_ACTIONS: Record<EngagementStepType, string[]> = {
  [EngagementStepType.PLAN_AND_PREPARE]: [
    "Conduct research on company (10-K, news), industry, and stakeholders",
    "Build an Account & Opportunity Map in CRM",
    "Prepare initial outreach email & call templates",
    "Define key discovery questions using the 'Pain Points' tab",
  ],
  [EngagementStepType.OPEN_AND_CONNECT]: [
    "Execute multi-channel outreach (email, phone, LinkedIn)",
    "Leverage mutual connections for warm introductions",
    "Log all activities meticulously in CRM",
    "Send a post-meeting summary email with agreed next steps",
  ],
  [EngagementStepType.DISCOVER_AND_DIAGNOSE]: [
    "Conduct structured discovery meetings with multiple stakeholders",
    "Use the 'Discovery Questions' tab to guide conversations",
    "Quantify pains using the 'ROI Calculator' tab with customer data",
    "Build and maintain a 'Political Map' of the opportunity",
  ],
  [EngagementStepType.CRAFT_AND_VALIDATE_SOLUTION]: [
    "Use the 'Solution Builder' tab to outline the proposal",
    "Conduct workshops with customer SMEs to refine the solution scope",
    "Present preliminary solution design to champion for feedback",
    "Develop a mutual action plan (MAP) with the customer",
  ],
  [EngagementStepType.PROPOSE_AND_PROVE_VALUE]: [
    "Configure and rehearse a tailored solution demonstration",
    "Finalize ROI analysis and executive presentation deck",
    "Schedule and conduct value presentation with all decision-makers",
    "Deliver formal proposal document to the champion",
  ],
  [EngagementStepType.GAIN_COMMITMENT_AND_CLOSE]: [
    "Lead negotiations on pricing and terms with the economic buyer",
    "Provide security/compliance documentation to procurement",
    "Facilitate calls between customer's legal team and ours",
    "Prepare contract for electronic signature and delivery",
  ],
  [EngagementStepType.IMPLEMENT_AND_EXPAND]: [
    "Schedule and lead internal sales-to-delivery handover meeting",
    "Schedule and co-lead customer project kickoff meeting",
    "Set up the first Quarterly Business Review (QBR) in the calendar",
    "Update CRM to 'Closed-Won' and monitor account for new opportunities",
  ],
};