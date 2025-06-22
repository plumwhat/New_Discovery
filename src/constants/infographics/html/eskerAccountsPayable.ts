
export const ESKER_ACCOUNTS_PAYABLE_INFOGRAPHIC_HTML = `
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
        
        .infographic-benefit-block {
            background-color: white;
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); /* shadow-lg */
            padding: 1.5rem; /* p-6 */
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 220px; /* Ensure consistent height */
        }
        .infographic-benefit-block .icon {
            font-size: 2.5rem; /* text-4xl */
            margin-bottom: 0.75rem; /* mb-3 */
        }
        .infographic-benefit-block h3 {
            font-size: 1.125rem; /* text-lg */
            font-weight: 700; /* font-bold */
            margin-bottom: 0.5rem; /* mb-2 */
        }
        .infographic-benefit-block p {
            font-size: 0.875rem; /* text-sm */
            color: #4b5563; /* text-gray-600 */
            line-height: 1.5;
        }

        .infographic-flow-step { position: relative; z-index: 1; }
        .infographic-flow-arrow::after { content: '→'; font-size: 2.5rem; line-height: 1; color: #d1d5db; position: absolute; top: 50%; left: 100%; transform: translate(50%, -50%); z-index: 0; }
        @media (max-width: 767px) { .infographic-flow-arrow::after { content: '↓'; top: 100%; left: 50%; transform: translate(-50%, 50%); } }
        
        .infographic-text-brand { color: #01916D; } 
        .infographic-text-brand-dark { color: #017a59; }
        .infographic-bg-brand-light { background-color: #E6F4F1; }
        .infographic-border-brand-light { border-color: #B3DDD4; }
        
        .infographic-text-accent1 { color: #ff7c43; } 
        .infographic-text-accent2 { color: #d45087; }
        .infographic-text-accent3 { color: #a05195; } 
        .infographic-text-accent4 { color: #665191; } 
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-20">
            <h1 class="text-3xl md:text-5xl font-extrabold infographic-text-brand mb-4">Reimagine Accounts Payable with Esker</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Discover how Esker's AI-driven automation streamlines the entire procure-to-pay cycle, transforming AP into a strategic, value-driven department.</p>
        </header>

        <section id="infographic-challenges-ap" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">The Pitfalls of Manual AP Processing</h2>
            <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Traditional AP departments grapple with paper-based invoices, tedious manual data entry, lengthy approval cycles, and a constant battle to avoid late payment penalties. These inefficiencies strain supplier relationships and obscure financial visibility.</p></div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent1">📄</div><h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Paper Overload & Manual Entry</h3><p class="text-sm text-gray-600">Manual handling of paper and PDF invoices is slow, error-prone, and costly, taking up valuable AP staff time.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent2">💸</div><h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Missed Early Payment Discounts</h3><p class="text-sm text-gray-600">Slow processing and lack of visibility lead to lost discount opportunities, impacting the bottom line directly.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent3">⏳</div><h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Lengthy Approval Bottlenecks</h3><p class="text-sm text-gray-600">Manual routing for invoice approvals causes significant delays, payment issues, and frustration for both AP and approvers.</p>
                </div>
                 <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 md:col-span-1 lg:col-span-1">
                    <div class="text-4xl mb-3 infographic-text-accent4">❓</div><h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Lack of Visibility & Control</h3><p class="text-sm text-gray-600">No real-time insight into invoice statuses, accruals, and cash flow hinders strategic financial decisions and forecasting.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 md:col-span-1 lg:col-span-1">
                    <div class="text-4xl mb-3 text-red-500">🚨</div><h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Risk of Errors & Fraud</h3><p class="text-sm text-gray-600">Manual processes increase the risk of duplicate payments, data entry errors, and potential fraudulent activities.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1">
                    <div class="text-4xl mb-3 text-green-600">🤝</div><h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Strained Supplier Relationships</h3><p class="text-sm text-gray-600">Late payments and burdensome inquiry processes can damage vital supplier relationships and affect negotiations.</p>
                </div>
            </div>
        </section>

        <section id="infographic-solution-ap" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">Esker's AI-Powered AP Automation Workflow</h2>
            <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Esker automates every phase of the AP invoice lifecycle with AI-driven capabilities, ensuring accuracy, speed, and control from receipt to payment.</p></div>
            <div class="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div class="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-3">
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5 infographic-flow-arrow">
                        <div class="bg-[#01916D] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">📬</div>
                        <h3 class="text-md font-bold infographic-text-brand-dark">1. Invoice Reception</h3>
                        <p class="text-xs text-gray-600 mt-1">Centralized capture from any channel (email, portal, EDI, paper).</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5 infographic-flow-arrow">
                        <div class="bg-[#017a59] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">🧠</div>
                        <h3 class="text-md font-bold text-[#017a59]">2. AI Data Capture</h3>
                        <p class="text-xs text-gray-600 mt-1">Intelligent data extraction (header/line-item) and validation.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5 infographic-flow-arrow">
                        <div class="bg-[#665191] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">🔗</div>
                        <h3 class="text-md font-bold text-[#665191]">3. PO Matching</h3>
                        <p class="text-xs text-gray-600 mt-1">Automated 2 & 3-way matching against POs and goods receipts.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5 infographic-flow-arrow">
                        <div class="bg-[#a05195] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">⚙️</div>
                        <h3 class="text-md font-bold text-[#a05195]">4. Workflow & Approval</h3>
                        <p class="text-xs text-gray-600 mt-1">Exception routing, GL coding assistance, mobile approvals.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5">
                        <div class="bg-[#d45087] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">💳</div>
                        <h3 class="text-md font-bold text-[#d45087]">5. ERP & Payment</h3>
                        <p class="text-xs text-gray-600 mt-1">Seamless ERP posting, payment scheduling, and status visibility.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="infographic-roi-ap" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">AP Transformation: Key Benefits with Esker</h2>
             <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Automating AP with Esker yields substantial cost savings, efficiency gains, and strategic benefits that directly contribute to financial health and operational excellence.</p></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="infographic-benefit-block">
                    <div class="icon infographic-text-brand">🛡️</div>
                    <h3 class="infographic-text-brand-dark">Enhanced Compliance</h3>
                    <p>Automated workflows and validation enforce policies, ensuring audit-ready processes and minimizing fraud risk.</p>
                </div>
                <div class="infographic-benefit-block">
                    <div class="icon infographic-text-brand">💪</div>
                    <h3 class="infographic-text-brand-dark">Strategic AP Function</h3>
                    <p>AP staff shift from manual data entry to value-added activities like analysis and vendor management.</p>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                    <h3 class="text-lg font-bold mb-1 infographic-text-brand-dark text-center">Faster Invoice Processing Cycle Time</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Drastically reduce the time from invoice receipt to approval and payment posting.</p>
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
                        <div class="text-center">
                            <p class="text-md text-gray-500">Typical Manual Process</p>
                            <p class="text-4xl sm:text-5xl font-extrabold text-gray-400">15-20 <span class="text-2xl sm:text-3xl align-baseline">days</span></p>
                        </div>
                        <div class="text-4xl sm:text-5xl font-bold infographic-text-brand">→</div>
                         <div class="text-center">
                            <p class="text-md infographic-text-brand">With Esker AP Automation</p>
                            <p class="text-4xl sm:text-5xl font-extrabold infographic-text-brand">3-5 <span class="text-2xl sm:text-3xl align-baseline">days</span></p>
                        </div>
                    </div>
                </div>

                <div class="infographic-benefit-block">
                    <div class="icon infographic-text-brand">🤝</div>
                    <h3 class="infographic-text-brand-dark">Better Supplier Relations</h3>
                    <p>Self-service supplier portal provides invoice status, dynamic discounting options, and enhances communication.</p>
                </div>
                <div class="infographic-benefit-block">
                     <div class="icon infographic-text-brand">📊</div>
                    <h3 class="infographic-text-brand-dark">Data-Driven Decisions</h3>
                    <p>Clear dashboards on spend, accruals, and cash flow enable proactive financial management and strategy.</p>
                </div>
            </div>
        </section>

        <section id="infographic-validation-ap" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">Recognized Leader in AP Automation</h2>
             <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Esker's AP automation solution is consistently recognized by industry analysts for its comprehensive capabilities, innovation, and customer satisfaction.</p></div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                    <h3 class="text-xl font-bold mb-3 infographic-text-brand-dark">Gartner Magic Quadrant Leader</h3> 
                    <p class="text-sm text-gray-600 mb-4">Esker is positioned as a Leader in the Gartner® Magic Quadrant™ for Accounts Payable Invoice Automation (APIA) solutions, reflecting its strong market presence and comprehensive product offering.</p>
                     <p class="text-xs text-gray-500 italic">Source: Gartner (representative statement, check latest reports for specifics)</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-1 infographic-text-brand-dark">High User Satisfaction</h3>
                     <p class="text-xs text-gray-500 mb-2">(Gartner Peer Insights - Representative)</p>
                    <div class="text-5xl sm:text-6xl font-extrabold infographic-text-brand-dark">4.7<span class="text-2xl sm:text-3xl">/5</span></div>
                    <div class="text-2xl text-yellow-400 mt-1">★★★★★</div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-3">
                    <h3 class="text-xl font-bold mb-3 infographic-text-brand-dark">Comprehensive Procure-to-Pay Suite</h3>
                    <p class="text-sm text-gray-600">Beyond AP, Esker offers a full suite of procure-to-pay solutions, including Sourcing, Contract Management, Procurement, and Supplier Management, enabling end-to-end process optimization and visibility.</p>
                </div>
            </div>
        </section>

        <footer class="text-center pt-8 md:pt-10 border-t infographic-border-brand-light">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 infographic-text-brand">Achieve World-Class AP Performance with Esker</h2>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Transform your Accounts Payable from a manual, reactive cost center into an efficient, strategic asset that drives financial health and strengthens supplier partnerships.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeAccountsPayableCharts = function() { 
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') {
            console.warn('AP Infographic: Chart.js is not loaded. Charts cannot be initialized.');
            return;
        }
        console.log('AP Infographic: Chart initialization skipped as graphs are removed.');

        const chartsToInitAP = []; // Empty array as charts are removed

        chartsToInitAP.forEach(config => {
            // This loop will not run if chartsToInitAP is empty
        });
      });
    };
</script>
</div>
</html>
`;
