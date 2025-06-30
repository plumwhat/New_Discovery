
export const ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transforming Order Management with Esker</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        .infographic-body { font-family: 'Inter', sans-serif; background-color: #f0f4f8; color: #333; }
        .infographic-container { margin: auto; padding: 1rem; }
        @media (min-width: 640px) { .infographic-container { padding: 1.5rem; } }
        @media (min-width: 768px) { .infographic-container { padding: 3rem; } }
        .infographic-flow-step { position: relative; z-index: 1; }
        .infographic-flow-arrow::after { content: '→'; font-size: 2.5rem; line-height: 1; color: #d1d5db; position: absolute; top: 50%; left: 100%; transform: translate(50%, -50%); z-index: 0; }
        @media (max-width: 767px) { .infographic-flow-arrow::after { content: '↓'; top: 100%; left: 50%; transform: translate(-50%, 50%); } }
        .infographic-text-brand { color: #01916D; }
        .infographic-text-brand-dark { color: #017a59; }
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 200px; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.875rem; color: #4b5563; }
        .infographic-text-accent1 { color: #ff7c43; } 
        .infographic-text-accent2 { color: #d45087; }
        .infographic-text-accent3 { color: #a05195; }
        .infographic-text-accent4 { color: #665191; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-20">
            <h1 class="text-3xl md:text-5xl font-extrabold infographic-text-brand mb-4">The End of Manual Order Management</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">See how Esker's AI-driven automation transforms the entire order-to-cash cycle, turning operational bottlenecks into strategic advantages.</p>
        </header>

        <section id="infographic-challenges-om" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">The Breaking Point of Traditional Processes</h2>
            <div class="max-w-5xl mx-auto mb-12">
                <p class="text-center text-gray-700">Many organizations are held back by outdated, manual order processing. These legacy workflows create significant inefficiencies that ripple through the business, impacting everything from operational costs to customer relationships. The reliance on manual data entry and fragmented communication channels is not just inefficient—it's unsustainable in a competitive market.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent1">⌨️</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">High Manual Workload</h3>
                    <p class="text-sm text-gray-600">CSRs are bogged down by repetitive data entry from emails, faxes, and portals, preventing them from focusing on high-value customer interactions.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent2">⚠️</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Costly Errors</h3>
                    <p class="text-sm text-gray-600">Manual entry inevitably leads to mistakes in shipments and billing, causing customer disputes and revenue loss.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent3">🚫</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Lack of Visibility</h3>
                    <p class="text-sm text-gray-600">Orders from disparate channels create a fragmented view, making it impossible to track order flow and identify issues in real time.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent4">⏳</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand-dark">Inefficient Exception Handling</h3>
                    <p class="text-sm text-gray-600">Resolving orders with missing or incorrect information involves slow, manual coordination across multiple departments.</p>
                </div>
            </div>
        </section>

         <section id="infographic-solution-om" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">Esker's AI-Powered Revolution for Order Management</h2>
            <div class="max-w-5xl mx-auto mb-12">
                 <p class="text-center text-gray-700">Esker addresses these challenges with a single, unified cloud platform that automates the entire process. By leveraging AI, the solution intelligently captures, routes, and archives every order, regardless of its source or format. This creates a seamless, touchless workflow that boosts efficiency and empowers your team.</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div class="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4 infographic-flow-arrow">
                        <div class="bg-[#01916D] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">📥</div> 
                        <h3 class="text-lg font-bold infographic-text-brand-dark">1. Order Reception</h3>
                        <p class="text-sm text-gray-600 mt-1">All orders from any channel (Email, EDI, Fax, Portal) are centralized on one platform.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4 infographic-flow-arrow">
                        <div class="bg-[#017a59] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">🤖</div>
                        <h3 class="text-lg font-bold text-[#017a59]">2. AI Data Capture</h3>
                        <p class="text-sm text-gray-600 mt-1">AI and machine learning extract and verify order data, eliminating manual entry.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4 infographic-flow-arrow">
                        <div class="bg-[#665191] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">⚙️</div>
                        <h3 class="text-lg font-bold text-[#665191]">3. Automated Workflow</h3>
                        <p class="text-sm text-gray-600 mt-1">Orders are automatically validated, with exceptions routed for quick resolution.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4">
                        <div class="bg-[#d45087] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">💾</div>
                        <h3 class="text-lg font-bold text-[#d45087]">4. ERP Integration</h3>
                        <p class="text-sm text-gray-600 mt-1">Verified data is posted seamlessly to your ERP system (SAP, Oracle, etc.).</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="infographic-roi-om" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">The Transformation in Numbers: Proven ROI</h2>
            <div class="max-w-5xl mx-auto mb-12">
                <p class="text-center text-gray-700">The shift to automation delivers dramatic, measurable results. Esker's customers across various industries report significant improvements in speed, accuracy, and overall efficiency, directly impacting the bottom line and freeing up valuable human resources for more strategic work.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div class="infographic-metric-box">
                    <h3>Processing Time Reduction</h3>
                    <div class="metric-value">75%</div>
                    <p class="metric-desc">Less time spent handling each order, freeing up CSRs (Husqvarna).</p>
                </div>
                <div class="infographic-metric-box">
                    <h3>Order Processing Speed</h3>
                    <div class="metric-value">50%+</div>
                    <p class="metric-desc">Increase in processing capacity with the same staff (MSA).</p>
                </div>
                <div class="infographic-metric-box">
                    <h3>Touchless Processing Rate</h3>
                    <div class="metric-value">90%</div>
                    <p class="metric-desc">of orders flow through with zero manual intervention (Typical Customer).</p>
                </div>
                <div class="infographic-metric-box">
                    <h3>Manual Error Rate</h3>
                    <div class="metric-value">&lt;1%</div>
                    <p class="metric-desc">Significant decline in data entry errors, improving accuracy.</p>
                </div>
            </div>
        </section>

        <section id="infographic-validation-om" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">Industry Validation & Expert Endorsements</h2>
            <div class="max-w-5xl mx-auto mb-12">
                 <p class="text-center text-gray-700">Esker's leadership is consistently recognized by top industry analysts and trusted by major consulting firms. This validation provides confidence that Esker is not just a technology vendor, but a strategic partner for digital transformation.</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                    <h3 class="text-xl font-bold mb-3 infographic-text-brand-dark">Gartner Recognition</h3> 
                    <p class="text-sm text-gray-600 mb-4">Gartner's analysis places Esker as a significant player in the global automation landscape, highlighting its strong vision and execution capabilities.</p>
                    <ul class="space-y-3">
                        <li class="flex items-start">
                            <span class="text-xl text-yellow-500 mr-3">🏆</span>
                            <div>
                                <h4 class="font-semibold text-sm infographic-text-brand">Challenger</h4>
                                <p class="text-xs text-gray-500">Magic Quadrant™ for Source-to-Pay Suites (Recent Year)</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                             <span class="text-xl text-yellow-500 mr-3">🏆</span>
                             <div>
                                <h4 class="font-semibold text-sm infographic-text-brand">Leader</h4>
                                <p class="text-xs text-gray-500">Magic Quadrant™ for Accounts Payable Applications (Recent Year)</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-1 infographic-text-brand-dark">Gartner Peer Insights</h3>
                     <p class="text-xs text-gray-500 mb-2">(Representative Data)</p>
                    <div class="text-5xl sm:text-6xl font-extrabold infographic-text-brand-dark">4.8<span class="text-2xl sm:text-3xl">/5</span></div>
                    <div class="text-2xl text-yellow-400 mt-1">★★★★★</div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold mb-3 infographic-text-brand-dark">Forrester Alignment</h3>
                    <p class="text-sm text-gray-600">Forrester notes a market trend toward augmenting existing systems with modern, modular solutions. Esker's flexible, cloud-based platform directly aligns with this forward-thinking strategy, avoiding disruptive "rip-and-replace" projects.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                     <h3 class="text-xl font-bold mb-3 infographic-text-brand-dark">Strategic Alliance with EY</h3>
                     <p class="text-sm text-gray-600">The collaboration between Esker and EY, a "Big Four" consulting firm, combines Esker's leading AI technology with EY's deep industry and implementation expertise. This partnership helps clients navigate digital transformation and complex regulatory environments, providing a powerful endorsement of Esker's capabilities.</p>
                </div>
            </div>
        </section>

        <footer class="text-center pt-8 md:pt-10 border-t infographic-border-brand-light">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 infographic-text-brand">Build a Future-Proof Order Management Process</h2>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">By embracing AI-powered automation with Esker, businesses can move beyond simply managing orders to creating a highly efficient, resilient, and customer-centric operation that drives strategic growth.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeOrderManagementCharts = function() {
        console.log('Esker Order Management Infographic: Big Number version - no charts to initialize.');
    };
</script>
</html>
`;
