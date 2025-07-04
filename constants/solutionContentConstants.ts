

import { EditableModuleSolutionContentMap, ModuleSolutionContent } from '../types';
import { ALL_MODULES } from './moduleConstants';

export const MODULE_SPECIFIC_SOLUTION_CONTENT: EditableModuleSolutionContentMap = {
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
  customerInquiryManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This solution for {moduleName} aims to centralise and automate the handling of customer inquiries, transforming your customer service from a reactive function to a proactive, value-adding operation. By leveraging {partnerName} technology, we can reduce response times, improve answer consistency, and enhance overall customer satisfaction.`,
    solutionOverviewDetails: `
        <p>Our {moduleName} solution, powered by {partnerName}, provides a centralised platform for managing all incoming customer questions, regardless of channel. It uses AI to understand and categorise inquiries, routing them to the right person or even automating the response for common questions.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Intelligent Triage:</strong> AI automatically analyses and categorises incoming inquiries (e.g., order status, invoice copy request) and routes them to the appropriate queue or individual.</li>
            <li><strong>Automated Responses:</strong> For frequent, simple requests, the system can automatically generate and send a response by retrieving information from integrated systems (like your ERP), freeing up your team.</li>
            <li><strong>Unified Agent Interface:</strong> Customer service agents get a complete view of the customer's history and all related documents, enabling them to resolve complex inquiries faster and more accurately.</li>
            <li><strong>Performance Analytics:</strong> Dashboards provide insights into inquiry volume, types, resolution times, and team performance, highlighting areas for improvement.</li>
        </ul>`,
    coreElements: [
        "AI-powered analysis and triage of incoming customer inquiries.",
        "Automated responses for common, repetitive questions.",
        "Unified dashboard with 360-degree view of customer interactions.",
        "Seamless access to ERP data and documents for quick resolution.",
        "Analytics on inquiry types, volume, and resolution times."
    ]
  },
  cashApplication: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This solution for {moduleName} is designed to automate the complex process of matching customer payments to open invoices. By leveraging {partnerName}'s AI capabilities, we aim to significantly increase your auto-match rates, reduce unapplied cash, and provide a clearer, more timely view of your cash position.`,
    solutionOverviewDetails: `
        <p>The {moduleName} solution, using {partnerName} technology, automates the end-to-end process of applying cash receipts. It intelligently captures remittance information from any source, matches it to payments and open receivables, and manages exceptions, drastically reducing manual effort.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Multi-format Remittance Capture:</strong> AI-driven data capture extracts remittance details from emails, PDFs, EDI, bank files, and customer portals.</li>
            <li><strong>Intelligent Payment Matching:</strong> Advanced algorithms automatically match payments to single or multiple invoices, even with discrepancies like short-pays or deductions.</li>
            <li><strong>Deduction Management:</strong> The solution automatically identifies and codes deductions, routing them via workflow for faster investigation and resolution.</li>
            <li><strong>Real-time Visibility:</strong> Dashboards provide a clear view of auto-match rates, unapplied cash, and team productivity, enabling better cash flow forecasting.</li>
        </ul>`,
    coreElements: [
        "AI-driven data capture for all remittance formats.",
        "Automated matching of payments to open invoices.",
        "Workflow-driven exception and deduction management.",
        "Real-time dashboards for cash position and team performance.",
        "Integration with collections and credit modules for a holistic AR view."
    ]
  },
  collectionManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `The proposed {moduleName} solution, powered by {partnerName}, will transform your collections process from reactive to proactive and data-driven. The objective is to reduce Days Sales Outstanding (DSO), minimise bad debt, and improve collector efficiency while preserving customer relationships.`,
    solutionOverviewDetails: `
        <p>Our {moduleName} solution provides collectors with a comprehensive and automated toolset. It prioritises collection activities, automates communications, and provides all necessary information in a single interface to make collections more strategic and effective.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Prioritised Worklists:</strong> The system automatically generates daily worklists for collectors based on configurable strategies (e.g., invoice age, amount, customer risk score).</li>
            <li><strong>Automated Communications:</strong> Schedule and automate dunning notices and payment reminders via email, freeing up collectors to focus on high-value interactions.</li>
            <li><strong>Centralised Information:</strong> Collectors have instant access to invoice copies, payment history, contact details, and a log of all past interactions.</li>
            <li><strong>Promise-to-Pay Tracking:</strong> Easily log, track, and follow up on customer payment promises to ensure commitments are met.</li>
            <li><strong>Performance Analytics:</strong> Dashboards track key metrics like DSO, Collection Effectiveness Index (CEI), and collector performance.</li>
        </ul>`,
    coreElements: [
        "Automated, prioritised collector worklists.",
        "Template-based, automated dunning and reminder letters.",
        "Centralised view of customer accounts and communication history.",
        "Promise-to-pay tracking and follow-up management.",
        "Dashboards for DSO, CEI, and collections performance."
    ]
  },
  creditManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This solution for {moduleName}, featuring {partnerName} technology, is designed to streamline and automate your credit risk processes. It enables faster, more consistent credit decisions, reduces credit risk, and supports sales by minimising delays in customer onboarding.`,
    solutionOverviewDetails: `
        <p>The {moduleName} solution automates the entire credit lifecycle, from the initial credit request to risk monitoring and periodic reviews. It provides a secure, auditable, and efficient framework for managing customer credit.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Online Credit Applications:</strong> Secure, electronic credit applications that customers can complete easily, eliminating paper and manual data entry.</li>
            <li><strong>Automated Risk Assessment:</strong> Integration with third-party credit agencies and configurable scoring rules to automate risk assessment and suggest credit limits.</li>
            <li><strong>Workflow-driven Approvals:</strong> Route credit requests for approval based on your business rules, ensuring policy compliance and providing a full audit trail.</li>
            <li><strong>Proactive Credit Monitoring:</strong> The system can monitor customer accounts and trigger alerts or reviews based on payment behaviour or changes in credit scores.</li>
            <li><strong>Centralised Repository:</strong> All credit-related documents and communications are stored centrally for easy access and auditability.</li>
        </ul>`,
    coreElements: [
        "Secure, electronic customer credit applications.",
        "Automated credit scoring with integration to credit bureaus.",
        "Workflow-driven approval routing for credit limit requests.",
        "Proactive monitoring of customer credit risk.",
        "Central repository for all credit-related documentation."
    ]
  },
  claimsDeductions: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `The proposed {moduleName} solution, utilising {partnerName} technology, aims to resolve customer deductions and claims faster and more accurately. The goal is to reduce revenue leakage from invalid claims, improve operational efficiency, and gain insights into the root causes of disputes.`,
    solutionOverviewDetails: `
        <p>Our {moduleName} solution provides a structured, automated approach to managing the entire dispute resolution lifecycle. It helps you capture, route, investigate, and resolve customer deductions with greater speed and visibility.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Automated Deduction Capture:</strong> The system automatically captures deduction information from remittance advices and customer communications.</li>
            <li><strong>Intelligent Root-Cause Coding:</strong> Deductions are automatically coded based on reason (e.g., shortage, pricing, promotion), enabling better analysis.</li>
            <li><strong>Collaborative Workflow:</strong> Deductions are routed to the appropriate internal stakeholders (e.g., sales, logistics, finance) with all necessary documentation for faster investigation.</li>
            <li><strong>Documentation Management:</strong> All supporting documents (proof of delivery, invoices, etc.) are automatically gathered and linked to the case.</li>
            <li><strong>Analytics & Reporting:</strong> Dashboards provide insights into deduction trends, root causes, and resolution times, helping to prevent future claims.</li>
        </ul>`,
    coreElements: [
        "Automated capture and coding of customer deductions.",
        "Workflow to route disputes to the correct departments.",
        "Centralisation of all supporting documentation for each case.",
        "Promise-to-pay and follow-up tracking on approved repayments.",
        "Root-cause analysis dashboards to identify and reduce recurring issues."
    ]
  },
  expenseManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This solution for {moduleName} aims to simplify and automate the entire travel and expense reporting process for your employees, managers, and finance team. Using {partnerName}'s mobile-first technology, we will reduce manual effort, improve policy compliance, and provide greater visibility into T&E spend.`,
    solutionOverviewDetails: `
        <p>Our {moduleName} solution leverages AI and mobile technology to make expense reporting effortless. Employees can capture receipts on the go, managers can approve from anywhere, and the finance team gets a streamlined, auditable process integrated with your financial systems.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Mobile Receipt Capture:</strong> Employees can snap photos of receipts with their smartphones; AI automatically extracts the data, creating an expense line item.</li>
            <li><strong>Automated Policy Enforcement:</strong> Your company's T&E policy is built into the system to automatically flag out-of-policy expenses for review.</li>
            <li><strong>Simplified Reporting:</strong> The system makes it easy to add expenses to reports, reconcile corporate card transactions, and submit for approval with a few clicks.</li>
            <li><strong>Mobile & Email Approvals:</strong> Managers can review and approve expense reports directly from their mobile device or email inbox, eliminating bottlenecks.</li>
            <li><strong>Spend Analytics:</strong> Gain real-time visibility into T&E spend by category, department, or project with powerful dashboards.</li>
        </ul>`,
    coreElements: [
        "Mobile receipt capture with AI-powered data extraction.",
        "Automated T&E policy enforcement and compliance checks.",
        "Seamless corporate credit card transaction reconciliation.",
        "Mobile and email-based approval workflows.",
        "Real-time dashboards for T&E spend analysis."
    ]
  },
  invoiceDelivery: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This {moduleName} solution, powered by {partnerName}, will automate the delivery of your customer invoices across any channel they prefer. The goal is to reduce manual effort, lower delivery costs, accelerate payments by reducing DSO, and improve customer satisfaction.`,
    solutionOverviewDetails: `
        <p>Our {moduleName} solution is a fully managed, multi-channel platform that automates the entire outbound invoicing process. It takes invoice data from your ERP and delivers it in the customer's preferred format, whether electronic or paper, ensuring compliance and providing full visibility.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Multi-Channel Delivery:</strong> Deliver invoices via any channel: email with PDF, a secure online portal, EDI, or even automated mail-out services for paper, all from one platform.</li>
            <li><strong>Customer Self-Service Portal:</strong> Provide customers with a portal to view, download, and pay invoices online, significantly reducing inquiries to your AR team.</li>
            <li><strong>Compliance & Archiving:</strong> The solution ensures invoices meet e-invoicing regulations in different countries and provides a secure, long-term archive.</li>
            <li><strong>Real-Time Status Tracking:</strong> Gain visibility into when an invoice has been sent, delivered, and viewed by the customer.</li>
        </ul>`,
    coreElements: [
        "Automated, multi-channel invoice delivery (portal, email, EDI, mail).",
        "Customer self-service portal for invoice access and payment.",
        "Guaranteed compliance with global e-invoicing standards.",
        "Real-time tracking of invoice delivery and viewing status.",
        "Secure, long-term digital invoice archiving."
    ]
  },
  supplierManagement: {
    technologyPartnerName: "Esker",
    executiveSummaryBoilerplate: `This {moduleName} solution, using {partnerName} technology, will automate and centralise your supplier onboarding and data management processes. The aim is to reduce supplier risk, improve compliance, and build a single, reliable source of truth for all supplier information.`,
    solutionOverviewDetails: `
        <p>Our {moduleName} solution provides a collaborative platform to manage the end-to-end supplier lifecycle. It simplifies onboarding, ensures data accuracy and compliance, and provides a foundation for stronger supplier relationships.</p>
        <h4>Key Capabilities & Benefits:</h4>
        <ul>
            <li><strong>Supplier Self-Service Portal:</strong> Empower suppliers to onboard themselves and maintain their own information (e.g., contact details, banking info, certifications) through a secure portal.</li>
            <li><strong>Automated Validation & Workflow:</strong> Workflows route new supplier information for internal validation and approval, while the system can automatically check for duplicate entries or compliance issues.</li>
            <li><strong>Centralised Supplier Repository:</strong> Create a single, accurate, and up-to-date master file for all supplier data and related documents.</li>
            <li><strong>Risk & Performance Management:</strong> Track supplier compliance documents (e.g., insurance certificates) and monitor performance scorecards.</li>
        </ul>`,
    coreElements: [
        "Supplier self-service portal for onboarding and data maintenance.",
        "Workflow-driven internal validation and approval processes.",
        "Automated duplicate checks and data validation rules.",
        "Central repository for all supplier data and documents.",
        "Tracking of compliance documents and expiration dates."
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
  managedITSupport: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `The proposed Managed IT Support service by {partnerName} is designed to provide comprehensive, proactive IT support for your organization. This solution aims to enhance IT system reliability, improve end-user productivity, optimise IT operational costs, and allow your internal IT resources to focus on strategic initiatives.`,
    solutionOverviewDetails: `
      <p>Our <strong>Managed IT Support</strong> service, delivered by <strong>{partnerName}</strong>, offers a holistic approach to managing your IT environment. We focus on proactive maintenance, rapid issue resolution, and strategic IT guidance to ensure your technology infrastructure optimally supports your business objectives.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>Proactive Monitoring & Maintenance:</strong> Continuous monitoring of critical systems (servers, networks, endpoints) to identify and address potential issues before they impact users. Regular patching and updates to maintain security and performance.</li>
        <li><strong>Responsive Helpdesk Support:</strong> Multi-channel support (phone, email, portal) for end-users, with defined SLAs for response and resolution times. Access to a skilled team of IT professionals.</li>
        <li><strong>Endpoint Management & Security:</strong> Comprehensive management of desktops, laptops, and mobile devices, including security patching, antivirus management, and remote support capabilities.</li>
        <li><strong>Network Management:</strong> Monitoring and management of network infrastructure (routers, switches, firewalls) to ensure connectivity and security.</li>
        <li><strong>Server Management & Administration:</strong> Proactive management of physical and virtual servers, including performance tuning, backup and recovery, and security hardening.</li>
        <li><strong>IT Asset Management:</strong> Tracking and management of IT hardware and software assets, providing insights for lifecycle planning and cost optimisation.</li>
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
  cloudSolutions: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `This proposal for {moduleName}, delivered by {partnerName}, outlines a strategic approach to leveraging the cloud to enhance your business agility, scalability, and cost-efficiency. Our services cover the full cloud lifecycle, from strategy and migration to optimisation and management.`,
    solutionOverviewDetails: `
      <p>Our <strong>{moduleName}</strong> offering provides expert guidance and hands-on services to help you successfully navigate your cloud journey. We focus on building secure, scalable, and cost-effective cloud environments tailored to your specific business needs.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>Cloud Strategy & Readiness Assessment:</strong> We help you develop a clear cloud adoption strategy, assess your application portfolio for cloud readiness, and create a detailed migration roadmap.</li>
        <li><strong>Cloud Migration Services:</strong> Our team manages the end-to-end migration of your applications and data to leading public cloud platforms (e.g., AWS, Azure), minimising downtime and risk.</li>
        <li><strong>Cloud Infrastructure Management:</strong> We provide ongoing management of your cloud infrastructure, including provisioning, monitoring, security, and performance tuning.</li>
        <li><strong>FinOps & Cost Optimisation:</strong> We implement cost management best practices (FinOps) to ensure you get the most value from your cloud spend, eliminating waste and providing predictable costs.</li>
        <li><strong>Cloud Security & Compliance:</strong> We design and implement robust security controls and governance policies to protect your data and ensure compliance in the cloud.</li>
        <li><strong>Cloud-Native Development Support:</strong> We can assist your development teams in leveraging cloud-native services (e.g., containers, serverless) to build modern, scalable applications.</li>
      </ul>`,
    coreElements: [
        "Cloud readiness assessment and strategic roadmap development.",
        "End-to-end migration services for applications and data.",
        "24/7 management and monitoring of cloud infrastructure.",
        "FinOps services for cloud cost management and optimisation.",
        "Cloud security posture management and compliance automation."
    ]
  },
  networkServices: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `This proposal for Managed {moduleName} from {partnerName} addresses the need for a modern, secure, and high-performance network to support your cloud-first business applications and hybrid workforce. We aim to enhance network reliability, improve user experience, and reduce administrative overhead.`,
    solutionOverviewDetails: `
      <p>Our Managed <strong>{moduleName}</strong> provide a comprehensive solution for designing, implementing, and managing your organisation's local and wide-area networks. We focus on next-generation technologies like SD-WAN to deliver a more agile and cost-effective network.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>SD-WAN (Software-Defined WAN):</strong> We deploy and manage SD-WAN solutions to optimise traffic routing to cloud applications, improve performance, and reduce dependency on expensive MPLS circuits.</li>
        <li><strong>Network Design & Implementation:</strong> Our experts design and deploy network solutions tailored to your specific needs, from multi-site connectivity to campus Wi-Fi.</li>
        <li><strong>Network Monitoring & Management:</strong> We provide 24/7 monitoring of your network devices to proactively identify and resolve issues, ensuring maximum uptime.</li>
        <li><strong>Network Security:</strong> We integrate security into the network fabric, including managed firewalls, intrusion prevention, and secure remote access solutions (SASE).</li>
        <li><strong>Performance Optimisation:</strong> We continually analyse network performance and make adjustments to ensure optimal application delivery and user experience.</li>
      </ul>`,
    coreElements: [
        "SD-WAN design, deployment, and management.",
        "24/7 proactive network monitoring and fault management.",
        "Managed firewall and unified threat management (UTM) services.",
        "Secure remote access solutions for a hybrid workforce.",
        "Performance reporting and capacity planning."
    ]
  },
  modernWorkplaceITS: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `This solution for a {moduleName}, delivered by {partnerName}, focuses on maximising your investment in collaboration platforms like Microsoft 365. We aim to improve employee productivity, streamline collaboration, and enhance security for your hybrid workforce.`,
    solutionOverviewDetails: `
      <p>Our <strong>{moduleName}</strong> services help you unlock the full potential of your collaboration tools. We provide expert services for deployment, management, security, and adoption of platforms like Microsoft 365.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>Microsoft 365 & Teams Optimisation:</strong> We help you configure and optimise M365 services, including Teams for voice and video, SharePoint for content management, and OneDrive for file storage.</li>
        <li><strong>Endpoint Management:</strong> We deploy and manage modern endpoint management solutions to securely manage desktops, laptops, and mobile devices from a single console.</li>
        <li><strong>Identity & Access Management:</strong> We strengthen security by implementing modern identity solutions, including multi-factor authentication (MFA) and single sign-on (SSO).</li>
        <li><strong>User Adoption & Training:</strong> We provide training and change management support to ensure your employees are effectively using the tools available to them.</li>
        <li><strong>Security & Compliance:</strong> We configure and manage the advanced security and compliance features within your collaboration suite to protect your data.</li>
      </ul>`,
    coreElements: [
        "Microsoft 365 and Teams deployment and optimisation.",
        "Modern endpoint management and security.",
        "Identity and access management with MFA and SSO.",
        "User adoption and change management programs.",
        "Data governance and security configuration."
    ]
  },
  itConsulting: {
    technologyPartnerName: "Fujifilm Business Innovation",
    executiveSummaryBoilerplate: `This proposal for {moduleName} from {partnerName} provides strategic, expert-led guidance to help you align your technology strategy with your business objectives. We act as your trusted advisor to navigate complex technology decisions and drive successful outcomes for your major IT initiatives.`,
    solutionOverviewDetails: `
      <p>Our <strong>{moduleName}</strong> services offer access to experienced, independent technology experts who can provide a range of strategic services. We help you build a clear technology roadmap, govern your IT investments, and manage complex projects effectively.</p>
      <h4>Key Service Components & Benefits:</h4>
      <ul>
        <li><strong>IT Strategy & Roadmap Development:</strong> We work with your leadership team to develop a comprehensive IT strategy and a prioritised, multi-year technology roadmap that supports business growth.</li>
        <li><strong>IT Governance & Risk Management:</strong> We help you establish frameworks for IT governance, risk management, and compliance to ensure your technology investments are well-managed and secure.</li>
        <li><strong>Digital Transformation Guidance:</strong> We provide expert advice on leveraging emerging technologies (e.g., AI, IoT, cloud) to transform your business processes and create competitive advantage.</li>
        <li><strong>Major Project Oversight:</strong> We offer independent project management and oversight for large, complex IT projects like ERP implementations or major cloud migrations, ensuring they stay on track and deliver value.</li>
        <li><strong>Technology Selection & Vendor Management:</strong> We provide an unbiased approach to help you evaluate and select the right technologies and vendors to meet your needs.</li>
      </ul>`,
    coreElements: [
        "IT strategy and multi-year roadmap development.",
        "IT governance, risk, and compliance framework design.",
        "Guidance on digital transformation and emerging technologies.",
        "Independent program and project management for major initiatives.",
        "Unbiased technology and vendor selection services."
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
