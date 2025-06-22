
import { ALL_MODULES } from './moduleConstants';
import { ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/eskerOrderManagement';
import { ESKER_ACCOUNTS_PAYABLE_INFOGRAPHIC_HTML } from './infographics/html/eskerAccountsPayable';
import { MFILES_DOCUMENT_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/mfilesDocumentManagement';
import { NINTEX_WORKFLOW_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/nintexWorkflowManagement';
import { NINTEX_PROCESS_MAPPING_INFOGRAPHIC_HTML } from './infographics/html/nintexProcessMapping';
import { ESKER_SUPPLIER_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/eskerSupplierManagement';
import { ESKER_COLLECTION_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/eskerCollectionManagement';

// Import new infographic HTML constants
import { ESKER_CUSTOMER_INQUIRY_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/customerInquiryManagement';
import { ESKER_CASH_APPLICATION_INFOGRAPHIC_HTML } from './infographics/html/cashApplication';
import { ESKER_CREDIT_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/creditManagement';
import { ESKER_CLAIMS_DEDUCTIONS_INFOGRAPHIC_HTML } from './infographics/html/claimsDeductions';
import { ESKER_EXPENSE_MANAGEMENT_INFOGRAPHIC_HTML } from './infographics/html/expenseManagement';
import { ESKER_PROCUREMENT_INFOGRAPHIC_HTML } from './infographics/html/procurement';
import { ESKER_INVOICE_DELIVERY_INFOGRAPHIC_HTML } from './infographics/html/invoiceDelivery';
import { FUJIFILM_MANAGED_IT_SUPPORT_INFOGRAPHIC_HTML } from './infographics/html/managedITSupport';
import { FUJIFILM_CYBERSECURITY_SERVICES_INFOGRAPHIC_HTML } from './infographics/html/cybersecurityServices';
import { FUJIFILM_CLOUD_SOLUTIONS_INFOGRAPHIC_HTML } from './infographics/html/cloudSolutions';
import { FUJIFILM_NETWORK_SERVICES_INFOGRAPHIC_HTML } from './infographics/html/networkServices';
import { FUJIFILM_MODERN_WORKPLACE_ITS_INFOGRAPHIC_HTML } from './infographics/html/modernWorkplaceITS';
import { FUJIFILM_IT_CONSULTING_INFOGRAPHIC_HTML } from './infographics/html/itConsulting';


// Generic Template for all other modules
const generateGenericInfographicHtml = (tsModuleName: string, technologyPartner: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        .infographic-body { font-family: 'Inter', sans-serif; background-color: #f0f4f8; color: #333; }
        .infographic-container { margin-left: auto; margin-right: auto; padding: 1rem; }
        @media (min-width: 640px) { .infographic-container { padding: 1.5rem; } }
        @media (min-width: 768px) { .infographic-container { padding: 3rem; } }
        .infographic-text-brand { color: #01916D; } 
        .infographic-text-brand-dark { color: #017a59; }
        .infographic-bg-brand-light { background-color: #E6F4F1; }
        .infographic-border-brand-light { border-color: #B3DDD4; }
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-16">
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Transforming ${tsModuleName} with ${technologyPartner}</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Discover how ${technologyPartner}'s solutions for ${tsModuleName} can streamline operations, reduce costs, and enhance efficiency.</p>
        </header>

        <section id="infographic-challenges-${tsModuleName.toLowerCase().replace(/\s+/g, '-')}" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Common ${tsModuleName} Challenges</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3">⚙️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Manual Processes</h3><p class="text-sm text-gray-600">High reliance on manual data entry and repetitive tasks leading to inefficiencies in ${tsModuleName.toLowerCase()}.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3">⚠️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Error Rates</h3><p class="text-sm text-gray-600">Increased risk of errors due to manual handling, impacting data accuracy for ${tsModuleName.toLowerCase()}.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3">📉</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Lack of Visibility</h3><p class="text-sm text-gray-600">Poor insight into ${tsModuleName.toLowerCase()} process status and performance metrics.</p></div>
            </div>
        </section>

        <section id="infographic-solution-${tsModuleName.toLowerCase().replace(/\s+/g, '-')}" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">${technologyPartner}'s Solution for ${tsModuleName}</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">${technologyPartner} provides an intelligent platform to automate and optimize your ${tsModuleName.toLowerCase()} workflows, delivering enhanced control and efficiency.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                <div><div class="text-2xl mb-2 infographic-text-brand">💡</div><h4 class="font-semibold text-gray-700">Intelligent Automation</h4><p class="text-xs text-gray-600">Leverage AI and machine learning for ${tsModuleName.toLowerCase()}.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-brand">📊</div><h4 class="font-semibold text-gray-700">Enhanced Analytics</h4><p class="text-xs text-gray-600">Gain actionable insights into ${tsModuleName.toLowerCase()} performance.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-brand">🔗</div><h4 class="font-semibold text-gray-700">Seamless Integration</h4><p class="text-xs text-gray-600">Connect with your existing ERP and business systems for ${tsModuleName.toLowerCase()}.</p></div>
            </div>
        </section>

        <section id="infographic-roi-${tsModuleName.toLowerCase().replace(/\s+/g, '-')}" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Key Metric Improvements for ${tsModuleName}</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>Processing Time</h3><div class="metric-value">Up to 50% ↓</div><p class="metric-desc">Reduction in task completion time for ${tsModuleName.toLowerCase()}.</p></div>
                <div class="infographic-metric-box"><h3>Operational Costs</h3><div class="metric-value">Up to 30% ↓</div><p class="metric-desc">Decrease in costs associated with ${tsModuleName.toLowerCase()}.</p></div>
                <div class="infographic-metric-box"><h3>Data Accuracy</h3><div class="metric-value">95%+</div><p class="metric-desc">Improvement in data accuracy for ${tsModuleName.toLowerCase()}.</p></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Optimize your ${tsModuleName.toLowerCase()} processes with ${technologyPartner}.</p>
        </footer>
    </div>
</div>
<script>
    window.initialize${tsModuleName.replace(/\s+/g, '')}Charts = function() {
      var currentModuleNameForLog = '${tsModuleName.replace(/'/g, "\\'")}'; // Define moduleName as a JS variable, escaping single quotes
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn(currentModuleNameForLog + ' Infographic: Chart.js is not loaded.'); return; }
        console.log(currentModuleNameForLog + ' Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;

const MODULE_INFOGRAPHICS_HTML_BASE: Record<string, string> = {
    orderManagement: ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML,
    accountsPayable: ESKER_ACCOUNTS_PAYABLE_INFOGRAPHIC_HTML,
    documentManagement: MFILES_DOCUMENT_MANAGEMENT_INFOGRAPHIC_HTML,
    workflowManagement: NINTEX_WORKFLOW_MANAGEMENT_INFOGRAPHIC_HTML,
    processMapping: NINTEX_PROCESS_MAPPING_INFOGRAPHIC_HTML,
    supplierManagement: ESKER_SUPPLIER_MANAGEMENT_INFOGRAPHIC_HTML,
    collectionManagement: ESKER_COLLECTION_MANAGEMENT_INFOGRAPHIC_HTML,
    // Newly added modules
    customerInquiryManagement: ESKER_CUSTOMER_INQUIRY_MANAGEMENT_INFOGRAPHIC_HTML,
    cashApplication: ESKER_CASH_APPLICATION_INFOGRAPHIC_HTML,
    creditManagement: ESKER_CREDIT_MANAGEMENT_INFOGRAPHIC_HTML,
    claimsDeductions: ESKER_CLAIMS_DEDUCTIONS_INFOGRAPHIC_HTML,
    expenseManagement: ESKER_EXPENSE_MANAGEMENT_INFOGRAPHIC_HTML,
    procurement: ESKER_PROCUREMENT_INFOGRAPHIC_HTML,
    invoiceDelivery: ESKER_INVOICE_DELIVERY_INFOGRAPHIC_HTML,
    managedITSupport: FUJIFILM_MANAGED_IT_SUPPORT_INFOGRAPHIC_HTML,
    cybersecurityServices: FUJIFILM_CYBERSECURITY_SERVICES_INFOGRAPHIC_HTML,
    cloudSolutions: FUJIFILM_CLOUD_SOLUTIONS_INFOGRAPHIC_HTML,
    networkServices: FUJIFILM_NETWORK_SERVICES_INFOGRAPHIC_HTML,
    modernWorkplaceITS: FUJIFILM_MODERN_WORKPLACE_ITS_INFOGRAPHIC_HTML,
    itConsulting: FUJIFILM_IT_CONSULTING_INFOGRAPHIC_HTML,
};


// Construct the final MODULE_INFOGRAPHICS_HTML here
export const MODULE_INFOGRAPHICS_HTML: Record<string, string> = { ...MODULE_INFOGRAPHICS_HTML_BASE };
ALL_MODULES.forEach(module => {
    if (!MODULE_INFOGRAPHICS_HTML[module.id]) {
        // This fallback uses the updated generateGenericInfographicHtml
        MODULE_INFOGRAPHICS_HTML[module.id] = generateGenericInfographicHtml(module.name, module.technologyPartner || "Leading Technology");
    }
});
