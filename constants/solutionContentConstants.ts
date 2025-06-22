
import { EditableModuleSolutionContentMap, ModuleSolutionContent } from '../types';
import { ALL_MODULES } from './moduleConstants';

export const MODULE_SPECIFIC_SOLUTION_CONTENT: EditableModuleSolutionContentMap = {
  managedITSupport: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `The proposed Managed IT Support service by {partnerName} is designed to provide comprehensive, proactive IT support for your organization. This solution aims to enhance IT system reliability, improve end-user productivity, optimize IT operational costs, and allow your internal IT resources to focus on strategic initiatives.`,
    solutionOverviewDetails: `
      <p>Our <strong>Managed IT Support</strong> service, delivered by <strong>{partnerName}</strong>, offers a holistic approach to managing your IT environment. We focus on proactive maintenance, rapid issue resolution, and strategic IT guidance to ensure your technology infrastructure optimally supports your business objectives.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>Proactive Monitoring & Maintenance:</strong> Continuous monitoring of critical systems (servers, networks, endpoints) to identify and address potential issues before they impact users. Regular patching and updates to maintain security and performance.</li>
        <li><strong>Responsive Helpdesk Support:</strong> Multi-channel support (phone, email, portal) for end-users, with defined SLAs for response and resolution times. Access to a skilled team of IT professionals.</li>
        <li><strong>Endpoint Management & Security:</strong> Comprehensive management of desktops, laptops, and mobile devices, including security patching, antivirus management, and remote support capabilities.</li>
        <li><strong>Network Management:</strong> Monitoring and management of network infrastructure (routers, switches, firewalls) to ensure connectivity and security.</li>
        <li><strong>Server Management & Administration:</strong> Proactive management of physical and virtual servers, including performance tuning, backup and recovery, and security hardening.</li>
        <li><strong>IT Asset Management:</strong> Tracking and management of IT hardware and software assets, providing insights for lifecycle planning and cost optimization.</li>
        <li><strong>Vendor Management:</strong> Coordination with third-party IT vendors (ISPs, software providers) on your behalf to streamline issue resolution.</li>
        <li><strong>Strategic IT Guidance:</strong> Regular reviews and recommendations from our experts to align your IT strategy with your business goals, helping you leverage technology for growth and efficiency.</li>
      </ul>
      <p>By partnering with {partnerName} for {moduleName}, you can expect reduced IT downtime, improved user satisfaction, predictable IT costs, and access to a broader range of IT expertise.</p>
    `,
    coreElements: [
        `24/7 Proactive IT System Monitoring and Alerting.`,
        `Unlimited Remote and On-site (as agreed) Helpdesk Support.`,
        `Comprehensive Endpoint Security and Management.`,
        `Regular System Maintenance, Patching, and Updates.`,
        `Strategic IT Consulting and Performance Reporting.`
    ]
  },
  cybersecurityServices: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `This Cybersecurity Services proposal from {partnerName} outlines a robust security strategy to protect your organization's critical assets from evolving cyber threats. Our services aim to enhance your security posture, ensure regulatory compliance, and minimize the risk and impact of security incidents.`,
    solutionOverviewDetails: `
      <p><strong>{partnerName}'s Cybersecurity Services</strong> for <strong>{moduleName}</strong> provide a multi-layered defense strategy, combining advanced technology, expert analysis, and proactive measures to safeguard your digital environment.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>Managed Detection & Response (MDR) / Security Operations Center (SOC):</strong> 24/7 security monitoring, threat detection, and rapid incident response capabilities delivered by our expert SOC team.</li>
        <li><strong>Vulnerability Management & Penetration Testing:</strong> Regular assessments to identify and remediate security weaknesses in your systems and applications before attackers can exploit them.</li>
        <li><strong>Endpoint Detection & Response (EDR/XDR):</strong> Advanced threat protection for endpoints, providing visibility into malicious activity and enabling swift containment and remediation.</li>
        <li><strong>Network Security Management:</strong> Management and optimization of firewalls, intrusion detection/prevention systems (IDS/IPS), and other network security controls.</li>
        <li><strong>Email Security & Phishing Protection:</strong> Advanced filtering and threat intelligence to protect against phishing, malware, and other email-borne attacks.</li>
        <li><strong>Security Awareness Training:</strong> Educating your employees to recognize and respond appropriately to cyber threats, strengthening your human firewall.</li>
        <li><strong>Compliance & Governance Support:</strong> Assistance in meeting industry-specific and general data protection regulations (e.g., Essential Eight, GDPR) through security best practices and reporting.</li>
        <li><strong>Data Loss Prevention (DLP):</strong> Implementing strategies and tools to prevent sensitive data from leaving your secure environment.</li>
      </ul>
      <p>With {partnerName}'s {moduleName}, you gain access to specialized cybersecurity expertise and advanced tools, allowing you to focus on your core business while we protect your digital assets.</p>
    `,
    coreElements: [
        `24/7 Security Monitoring and Incident Response (SOC/MDR).`,
        `Advanced Endpoint Detection and Response (EDR/XDR).`,
        `Regular Vulnerability Assessments and Penetration Testing.`,
        `Comprehensive Email Security and Anti-Phishing Solutions.`,
        `Employee Security Awareness Training Programs.`
    ]
  },
  orderManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `The proposed Order Management automation solution, leveraging {partnerName}, is designed to streamline and optimise the critical order-to-cash cycle. By addressing inefficiencies in current order processing, this solution aims to significantly enhance operational throughput, reduce errors, and improve overall customer satisfaction.`,
    solutionOverviewDetails: `
      <p>Our proposed solution for <strong>{moduleName}</strong>, centred around <strong>{partnerName}'s AI-powered Order Management</strong> technology, offers a comprehensive approach to automating and optimising your entire order-to-cash process. This platform is designed to handle a high volume and variety of sales orders, regardless of their format (EDI, email, PDF, portal, fax) or channel.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intelligent Order Capture & Data Extraction:</strong> {partnerName} AI automatically captures orders from any source and accurately extracts relevant data using machine learning, significantly reducing manual data entry and associated errors. This accelerates the initial stages of order processing.</li>
        <li><strong>Automated Order Validation & Enrichment:</strong> The system intelligently validates orders against your business rules and ERP data (e.g., pricing, availability, customer details). Missing information can be automatically flagged or enriched, minimising exceptions and delays.</li>
        <li><strong>Streamlined Workflow & Exception Handling:</strong> Customisable workflows route orders for approval, manage exceptions, and provide full visibility into the order lifecycle. This ensures orders are processed efficiently and blockages are quickly resolved.</li>
        <li><strong>Seamless ERP Integration:</strong> {partnerName} provides deep, bidirectional integration with leading ERP systems, ensuring data consistency and eliminating the need for duplicate data entry. This creates a unified process from order receipt to fulfilment and invoicing.</li>
        <li><strong>Enhanced Visibility & Analytics:</strong> Real-time dashboards and comprehensive reporting provide insights into order statuses, processing times, team performance, and potential bottlenecks, enabling continuous process improvement.</li>
        <li><strong>Improved Customer & Staff Experience:</strong> By automating tedious manual tasks, your team can focus on value-added activities and customer service. Customers benefit from faster order confirmation, fewer errors, and proactive communication.</li>
      </ul>
      <p>This solution leverages technologies from {partnerName} for core process automation, ensuring a robust and scalable platform for your business needs.</p>
    `,
    coreElements: [
        `AI-powered order data capture from any format (email, EDI, PDF, portal).`,
        `Automated order validation and enrichment against ERP data.`,
        `Prioritised task management and exception handling workflows.`,
        `Real-time order status visibility for customers and internal teams.`,
        `Seamless ERP integration for end-to-end process flow.`
    ]
  },
  accountsPayable: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This Accounts Payable automation initiative, powered by {partnerName}, targets the reduction of manual effort and the improvement of financial controls within your AP department. The goal is to transform AP from a cost centre into a strategic function through enhanced efficiency and visibility.`,
    solutionOverviewDetails: `
      <p>The proposed Accounts Payable solution for <strong>{moduleName}</strong>, built upon <strong>{partnerName}'s Procure-to-Pay suite</strong>, automates the end-to-end invoice lifecycle. It addresses common AP challenges such as manual data entry, lengthy approval cycles, and lack of visibility.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Automated Invoice Capture & Data Entry:</strong> {partnerName} accurately captures invoices from any format (paper, PDF, EDI) and extracts data using AI, eliminating most manual keying.</li>
        <li><strong>Intelligent GL Coding & PO Matching:</strong> The system can suggest or automate GL coding and performs 2-way or 3-way matching against purchase orders and receipts.</li>
        <li><strong>Configurable Approval Workflows:</strong> Invoices are routed electronically based on your business rules, accelerating approvals and improving compliance.</li>
        <li><strong>Supplier Portal & Communication:</strong> A self-service portal for suppliers enhances communication and reduces inquiries to your AP team.</li>
        <li><strong>Mobile Accessibility & Analytics:</strong> Approve invoices and monitor performance on-the-go with mobile apps and gain insights through comprehensive dashboards.</li>
      </ul>
      <p>By implementing this solution, you can expect significant reductions in processing costs, improved DPO (Days Payable Outstanding), enhanced supplier relationships, and stronger financial controls.</p>
    `,
    coreElements: [
        `AI-driven invoice data capture and validation (OCR, machine learning).`,
        `Automated 2-way and 3-way Purchase Order matching.`,
        `Configurable electronic approval workflows with delegation and escalation.`,
        `Supplier portal for invoice status inquiries and dynamic discounting options.`,
        `Comprehensive accrual reporting and performance analytics dashboards.`
    ]
  },
  documentManagement: {
    technologyPartnerName: "M-Files",
    executiveSummaryBoilerplate: `The proposed Document Management solution, featuring {partnerName}, aims to revolutionise how your organisation manages and utilises critical business information. It focuses on breaking down data silos, ensuring compliance, and improving collaboration through intelligent information management.`,
    solutionOverviewDetails: `
      <p>Our solution for <strong>{moduleName}</strong> leverages the <strong>{partnerName} intelligent information management platform</strong>. {partnerName} organises and manages documents based on *what* they are, rather than *where* they're stored, connecting them with relevant business processes and data across systems.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Metadata-driven Architecture:</strong> {partnerName} uses metadata to classify, secure, and retrieve documents, enabling dynamic views and personalised access.</li>
        <li><strong>Repository Neutrality:</strong> Connect to and manage information across various existing repositories (e.g., network folders, SharePoint, ERPs) without requiring data migration.</li>
        <li><strong>Automated Workflows & Version Control:</strong> Streamline document-centric processes with built-in workflow capabilities and robust version history.</li>
        <li><strong>Compliance & Governance:</strong> Enforce access controls, retention policies, and audit trails to meet regulatory requirements.</li>
        <li><strong>Enhanced Collaboration & Search:</strong> Quickly find relevant information regardless of its location and collaborate securely on documents.</li>
      </ul>
      <p>With {partnerName}, you can transform your {moduleName} into a strategic asset, ensuring the right information is in the right hands at the right time.</p>
    `,
    coreElements: [
        `Metadata-driven architecture for dynamic content organisation.`,
        `Connectors to existing repositories (network folders, SharePoint, etc.) without data migration.`,
        `Automated version control, audit trails, and document lifecycle management.`,
        `Configurable workflows for document review, approval, and other processes.`,
        `Advanced search capabilities and role-based permissions for security.`
    ]
  },
  workflowManagement: {
    technologyPartnerName: "Nintex",
    executiveSummaryBoilerplate: `This Workflow Management solution, utilising the {partnerName} Process Platform, is designed to automate and optimise your core business processes. The objective is to increase operational agility, reduce manual interventions, and enhance overall process efficiency.`,
    solutionOverviewDetails: `
      <p>The proposed solution for <strong>{moduleName}</strong> is powered by the <strong>{partnerName} Process Platform</strong>, a leading solution for process automation and orchestration. {partnerName} allows for the rapid design, deployment, and management of workflows across your organisation.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Intuitive Visual Workflow Design:</strong> Easily design and modify workflows using a drag-and-drop interface, requiring minimal to no code.</li>
        <li><strong>Broad Connectivity:</strong> Integrate workflows with a wide range of enterprise systems, cloud services, and content repositories.</li>
        <li><strong>Advanced Workflow Features:</strong> Implement complex logic, parallel approvals, task escalations, and automated actions.</li>
        <li><strong>Process Analytics & Optimisation:</strong> Gain insights into workflow performance to identify bottlenecks and areas for improvement.</li>
        <li><strong>Robotic Process Automation (RPA):</strong> {partnerName} often includes RPA capabilities to automate repetitive, rules-based tasks within your workflows.</li>
      </ul>
      <p>By leveraging {partnerName} for {moduleName}, you can drive significant improvements in productivity, consistency, and compliance across your business operations.</p>
    `,
    coreElements: [
        `Intuitive, drag-and-drop visual workflow designer.`,
        `Extensive connectors for integrating with enterprise systems and cloud services.`,
        `Customisable forms for data capture and user interaction within processes.`,
        `Process analytics and reporting for monitoring performance and identifying bottlenecks.`,
        `Support for complex logic, parallel tasks, and escalations.`
    ]
  },
  processMapping: {
    technologyPartnerName: "Nintex",
     executiveSummaryBoilerplate: `The Process Mapping initiative, supported by {partnerName}'s capabilities, aims to provide clear visibility into your current business processes. This foundational step is crucial for identifying inefficiencies, standardising operations, and planning effective automation strategies.`,
    solutionOverviewDetails: `
      <p>For <strong>{moduleName}</strong>, we propose utilising tools and methodologies often found within the <strong>{partnerName} Process Platform</strong>, such as {partnerName} Process Manager (formerly Promapp®). These tools facilitate collaborative process mapping and documentation.</p>
      <h4>Key Capabilities & Benefits:</h4>
      <ul>
        <li><strong>Collaborative Process Documentation:</strong> Engage teams to easily capture, map, and maintain business processes in a central, accessible repository.</li>
        <li><strong>Standardised Process Visualisation:</strong> Create clear, consistent process maps that are easy for all stakeholders to understand.</li>
        <li><strong>Process Improvement & Feedback:</strong> Enable continuous improvement by allowing users to provide feedback and suggestions directly on process maps.</li>
        <li><strong>Risk & Compliance Management:</strong> Link processes to risks and controls, aiding in compliance efforts.</li>
        <li><strong>Foundation for Automation:</strong> Well-documented processes are essential for successful workflow automation and RPA initiatives.</li>
      </ul>
      <p>Effective {moduleName} using {partnerName} tools provides the clarity needed to optimise operations and drive digital transformation.</p>
    `,
    coreElements: [
        `Collaborative, web-based platform for process mapping and documentation.`,
        `Standardised notation and visualisation for clear process understanding.`,
        `Version control and change management for process documentation.`,
        `Mechanisms for process feedback, improvement suggestions, and ownership.`,
        `Ability to link processes to risks, compliance requirements, and systems.`
    ]
  },
  default: {
    technologyPartnerName: "leading automation technologies",
    executiveSummaryBoilerplate: `This automation solution for {moduleName}, utilising {partnerName}, is designed to address key challenges within this process area, aiming to enhance efficiency, reduce manual effort, and improve overall operational performance.`,
    solutionOverviewDetails: `
      <p>The proposed solution for <strong>{moduleName}</strong> will leverage best-in-class automation technologies, such as {partnerName}, to streamline your current processes. While specific features will be tailored to your unique requirements, the general approach involves:</p>
      <ul>
        <li>Automating repetitive data entry and validation tasks.</li>
        <li>Implementing intelligent workflows for approvals and exception handling.</li>
        <li>Providing enhanced visibility and control over the process.</li>
        <li>Integrating with existing systems to ensure data consistency.</li>
      </ul>
      <p>Further details and specific capabilities can be discussed and customised based on a deeper understanding of your requirements for {moduleName}.</p>
    `,
    coreElements: [
        `Automates key tasks within the {moduleName} process.`,
        `Designed to reduce manual effort and improve accuracy for {moduleName}.`,
        `Offers workflows to streamline operations related to {moduleName}.`,
        `Aims to provide better visibility and control over {moduleName} activities.`,
        `Integrates with relevant systems to ensure data consistency for {moduleName}.`
    ]
  }
};

// Ensure all modules have an entry in MODULE_SPECIFIC_SOLUTION_CONTENT using EditableModuleSolutionContent structure
ALL_MODULES.forEach(module => {
    if (!MODULE_SPECIFIC_SOLUTION_CONTENT[module.id]) {
        const partnerNameString = module.technologyPartner && module.technologyPartner !== "Generic"
            ? module.technologyPartner
            : "leading automation technologies";

        MODULE_SPECIFIC_SOLUTION_CONTENT[module.id] = {
            technologyPartnerName: partnerNameString as EditableModuleSolutionContentMap[string]['technologyPartnerName'],
            executiveSummaryBoilerplate: `This automation solution for {moduleName}, utilising {partnerName}, is designed to address key challenges within this process area, aiming to enhance efficiency, reduce manual effort, and improve overall operational performance.`,
            solutionOverviewDetails: `
              <p>The proposed solution for <strong>{moduleName}</strong> will leverage best-in-class automation technologies, such as {partnerName}, to streamline your current processes. While specific features will be tailored to your unique requirements, the general approach involves:</p>
              <ul>
                <li>Automating repetitive data entry and validation tasks.</li>
                <li>Implementing intelligent workflows for approvals and exception handling.</li>
                <li>Providing enhanced visibility and control over the process.</li>
                <li>Integrating with existing systems to ensure data consistency.</li>
              </ul>
              <p>Further details and specific capabilities can be discussed and customised based on a deeper understanding of your requirements for {moduleName}.</p>
            `,
            coreElements: [
              `Automates key tasks within the {moduleName} process.`,
              `Designed to reduce manual effort and improve accuracy for {moduleName}.`,
              `Offers workflows to streamline operations related to {moduleName}.`,
              `Aims to provide better visibility and control over {moduleName} activities.`,
              `Integrates with relevant systems to ensure data consistency for {moduleName}.`
            ]
        };
    }
});
