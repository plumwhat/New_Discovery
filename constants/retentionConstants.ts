
import { ServiceType } from '../types';

interface RetentionAction {
  id: string;
  text: string;
}

interface RetentionStage {
  id: '12m' | '6m' | '3m';
  title: string;
  timeframe: string;
  objective: string;
  strategy: {
    default: string; // Finance & Business Automation
    its?: string; // IT Services specific
  };
  actions: {
    default: RetentionAction[];
    its: RetentionAction[];
  };
}

export const RETENTION_PLAYBOOK_STAGES: RetentionStage[] = [
  {
    id: '12m',
    title: 'Stage 1: The Foundation',
    timeframe: '12+ Months to Renewal',
    objective: 'Solidify the business relationship, confirm delivered value, and align on a forward-looking joint success plan.',
    strategy: {
      default: 'Shift engagement from post-implementation support to a strategic partnership focused on continuous value realization and future business process optimization.',
      its: 'Transition from a service provider to a strategic technology partner, focusing on infrastructure stability, security posture, and aligning IT strategy with future business goals.'
    },
    actions: {
      default: [
        { id: '12m-action-1', text: 'Conduct a Strategic Business Review (SBR) focusing on the value and ROI achieved to date.' },
        { id: '12m-action-2', text: 'Present an initial "Value Realization Report" using data from the ROI Calculator.' },
        { id: '12m-action-3', text: 'Re-engage with the original executive sponsor to reaffirm their vision and success.' },
        { id: "12m-action-4", text: 'Collaborate with the customer to create a 12-month "Joint Success Plan" or roadmap.' },
        { id: '12m-action-5', text: 'Assess user adoption rates and identify opportunities for further training or workflow enhancement.' },
        { id: '12m-action-6', text: 'Begin discovery for "white space" opportunities to expand into new departments or processes.' },
      ],
      its: [
        { id: '12m-action-its-1', text: 'Conduct a Strategic Technology Review (STR) focusing on service stability, security, and performance against SLAs.' },
        { id: '12m-action-its-2', text: 'Present a "Service Health & Security Posture Report" detailing uptime, threats mitigated, and ticket trends.' },
        { id: '12m-action-its-3', text: 'Re-engage with the key IT and business leaders to align on technology strategy.' },
        { id: "12m-action-its-4", text: 'Collaborate with the customer on an IT roadmap for the next 12-18 months (e.g., cloud migration, security upgrades).' },
        { id: '12m-action-its-5', text: 'Review user satisfaction (CSAT) scores and feedback to identify service improvement areas.' },
        { id: '12m-action-its-6', text: 'Discuss emerging technology trends (e.g., AI, new security threats) and their potential impact on the customer.' },
      ]
    }
  },
  {
    id: '6m',
    title: 'Stage 2: The Validation',
    timeframe: '6-9 Months to Renewal',
    objective: 'Quantify the solution\'s value comprehensively and build a proactive, undeniable business case for renewal.',
    strategy: {
      default: 'Formalize the ROI and value proposition, making the renewal a logical conclusion. Shift conversation from "if" to "how" we continue our partnership.',
      its: 'Demonstrate the tangible value of the service partnership through risk mitigation and operational excellence. Solidify the business case based on stability and security.'
    },
    actions: {
      default: [
        { id: '6m-action-1', text: 'Deliver a detailed, formal Value Realization presentation to key stakeholders.' },
        { id: '6m-action-2', text: 'Confirm the official renewal process, timeline, and decision-makers within the customer\'s organization.' },
        { id: '6m-action-3', text: 'Identify and build relationships with any new influencers or budget holders.' },
        { id: '6m-action-4', text: 'Run a new "Health Check" (from the Engagement Workflow) to uncover new pain points and upsell opportunities.' },
        { id: '6m-action-5', text: 'Present a preliminary renewal proposal and budgetary quote to the champion for feedback.' },
        { id: '6m-action-6', text: 'Proactively address and close any outstanding support issues or enhancement requests.' },
      ],
      its: [
        { id: '6m-action-its-1', text: 'Present a comprehensive Service Value & Risk Mitigation report to IT and business leadership.' },
        { id: '6m-action-its-2', text: 'Confirm the renewal process and identify the key approvers in finance and management.' },
        { id: '6m-action-its-3',text: 'Socialize the success of the partnership with departments benefiting from IT stability.' },
        { id: '6m-action-its-4', text: 'Conduct a cybersecurity posture review or infrastructure health check as a value-add.' },
        { id: '6m-action-its-5', text: 'Provide a preliminary renewal quote including options for service upgrades (e.g., enhanced security, new backup solutions).' },
        { id: '6m-action-its-6', text: 'Ensure all service reporting is up-to-date and clearly demonstrates SLA achievement.' },
      ]
    }
  },
  {
    id: '3m',
    title: 'Stage 3: The Execution',
    timeframe: '0-3 Months to Renewal',
    objective: 'Drive the renewal process to a successful close by managing procurement and legal stages efficiently.',
    strategy: {
      default: 'Maintain momentum by demonstrating future value and making the procurement process as seamless as possible for the customer.',
      its: 'Ensure a smooth administrative process while reinforcing the critical nature of the service to prevent any last-minute budget cuts or competitor intrusions.'
    },
    actions: {
      default: [
        { id: '3m-action-1', text: 'Deliver the formal, final renewal proposal and contract documents.' },
        { id: '3m-action-2', text: 'Schedule and conduct a final review meeting with the executive sponsor and decision-maker.' },
        { id: '3m-action-3', text: 'Engage proactively with the customer\'s legal and procurement departments to address any queries.' },
        { id: '3m-action-4', text: 'Finalize negotiations on terms, pricing, and any included upsells.' },
        { id: '3m-action-5', text: 'Present the updated "Joint Success Plan" for the upcoming contract term.' },
        { id: '3m-action-6', text: 'Once signed, schedule a formal kickoff meeting for the new term to maintain engagement.' },
      ],
      its: [
        { id: '3m-action-its-1', text: 'Deliver the final service renewal agreement and Statement of Work (SOW).' },
        { id: '3m-action-its-2', text: 'Meet with the primary stakeholder to walk through the renewal documents and confirm alignment.' },
        { id: '3m-action-its-3', text: 'Provide any required documentation (security policies, compliance reports) to their procurement/legal teams.' },
        { id: '3m-action-its-4', text: 'Confirm service levels, pricing, and any planned technology refreshes for the new term.' },
        { id: '3m-action-its-5', text: 'Showcase the updated IT roadmap that the renewal enables.' },
        { id: '3m-action-its-6', text: 'Upon signature, confirm the service continuation and schedule the next strategic review.' },
      ]
    }
  }
];
