
export const ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transforming Order Management with Esker</title>
    <!-- TailwindCSS is assumed to be loaded globally by the main app, or via a CDN link in index.html -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8;
        }
        .flow-step {
            position: relative;
            z-index: 1;
        }
        .flow-arrow::after {
            content: '→';
            font-size: 2.5rem;
            line-height: 1;
            color: #d1d5db; /* light gray arrow */
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translate(50%, -50%);
            z-index: 0;
        }
        /* Responsive flow arrow */
        @media (max-width: 767px) { 
            .flow-arrow::after {
                content: '↓';
                top: 100%;
                left: 50%;
                transform: translate(-50%, 50%);
            }
        }
    </style>
</head>
<body class="text-gray-800">

    <div class="container mx-auto p-4 sm:p-6 md:p-12">

        <header class="text-center mb-12 md:mb-20">
            <h1 class="text-4xl md:text-6xl font-extrabold text-[#003f5c] mb-4">The End of Manual Order Management</h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">See how Esker's AI-driven automation transforms the entire order-to-cash cycle, turning operational bottlenecks into strategic advantages.</p>
        </header>

        <section id="challenges" class="mb-16 md:mb-24">
            <h2 class="text-3xl font-bold text-center mb-10 text-[#003f5c]">The Breaking Point of Traditional Processes</h2>
            <div class="max-w-6xl mx-auto introductory-text mb-12">
                <p class="text-center text-lg text-gray-700">Many organizations are held back by outdated, manual order processing. These legacy workflows create significant inefficiencies that ripple through the business, impacting everything from operational costs to customer relationships. The reliance on manual data entry and fragmented communication channels is not just inefficient—it's unsustainable in a competitive market.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-5xl mb-4 text-[#ff7c43]">⌨️</div>
                    <h3 class="text-xl font-bold mb-2 text-[#003f5c]">High Manual Workload</h3>
                    <p class="text-gray-600">CSRs are bogged down by repetitive data entry from emails, faxes, and portals, preventing them from focusing on high-value customer interactions.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-5xl mb-4 text-[#d45087]">⚠️</div>
                    <h3 class="text-xl font-bold mb-2 text-[#003f5c]">Costly Errors</h3>
                    <p class="text-gray-600">Manual entry inevitably leads to mistakes in shipments and billing, causing customer disputes and revenue loss.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-5xl mb-4 text-[#a05195]">🚫</div>
                    <h3 class="text-xl font-bold mb-2 text-[#003f5c]">Lack of Visibility</h3>
                    <p class="text-gray-600">Orders from disparate channels create a fragmented view, making it impossible to track order flow and identify issues in real time.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-5xl mb-4 text-[#665191]">⏳</div>
                    <h3 class="text-xl font-bold mb-2 text-[#003f5c]">Inefficient Exception Handling</h3>
                    <p class="text-gray-600">Resolving orders with missing or incorrect information involves slow, manual coordination across multiple departments.</p>
                </div>
            </div>
        </section>

        <section id="solution" class="mb-16 md:mb-24">
            <h2 class="text-3xl font-bold text-center mb-10 text-[#003f5c]">Esker's AI-Powered Revolution</h2>
            <div class="max-w-6xl mx-auto introductory-text mb-12">
                 <p class="text-center text-lg text-gray-700">Esker addresses these challenges with a single, unified cloud platform that automates the entire process. By leveraging AI, the solution intelligently captures, routes, and archives every order, regardless of its source or format. This creates a seamless, touchless workflow that boosts efficiency and empowers your team.</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div class="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-4">
                    <div class="flow-step text-center flex flex-col items-center w-full md:w-1/4 flow-arrow">
                        <div class="bg-[#003f5c] text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-4">📥</div>
                        <h3 class="text-xl font-bold text-[#003f5c]">1. Order Reception</h3>
                        <p class="text-gray-600 mt-2">All orders from any channel (Email, EDI, Fax, Portal) are centralized on one platform.</p>
                    </div>
                    <div class="flow-step text-center flex flex-col items-center w-full md:w-1/4 flow-arrow">
                        <div class="bg-[#665191] text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-4">🤖</div>
                        <h3 class="text-xl font-bold text-[#665191]">2. AI Data Capture</h3>
                        <p class="text-gray-600 mt-2">AI and machine learning extract and verify order data, eliminating manual entry.</p>
                    </div>
                    <div class="flow-step text-center flex flex-col items-center w-full md:w-1/4 flow-arrow">
                        <div class="bg-[#d45087] text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-4">⚙️</div>
                        <h3 class="text-xl font-bold text-[#d45087]">3. Automated Workflow</h3>
                        <p class="text-gray-600 mt-2">Orders are automatically validated, with exceptions routed for quick resolution.</p>
                    </div>
                    <div class="flow-step text-center flex flex-col items-center w-full md:w-1/4">
                        <div class="bg-[#ff7c43] text-white rounded-full w-20 h-20 flex items-center justify-center text-4xl mb-4">💾</div>
                        <h3 class="text-xl font-bold text-[#ff7c43]">4. ERP Integration</h3>
                        <p class="text-gray-600 mt-2">Verified data is posted seamlessly to your ERP system (SAP, Oracle, etc.).</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="roi" class="mb-16 md:mb-24">
            <h2 class="text-3xl font-bold text-center mb-10 text-[#003f5c]">The Transformation in Numbers: Proven ROI</h2>
            <div class="max-w-6xl mx-auto introductory-text mb-12">
                <p class="text-center text-lg text-gray-700">The shift to automation delivers dramatic, measurable results. Esker's customers across various industries report significant improvements in speed, accuracy, and overall efficiency, directly impacting the bottom line and freeing up valuable human resources for more strategic work.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-2 text-[#2f4b7c]">Processing Time Reduction</h3>
                    <p class="text-gray-600 mb-4">Husqvarna automated its process, leading to a massive drop in the time required to handle each order.</p>
                    <p class="text-7xl font-extrabold text-[#2f4b7c]">75%</p>
                    <p class="text-xl font-medium text-gray-500">Less Time Spent</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-2 text-[#665191]">Order Processing Speed</h3>
                    <p class="text-gray-600 mb-4">MSA saw a significant increase in processing capacity with the same staff after implementing Esker.</p>
                    <p class="text-7xl font-extrabold text-[#665191]">50%+</p>
                    <p class="text-xl font-medium text-gray-500">Boost in Throughput</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                    <h3 class="text-xl font-bold mb-2 text-[#a05195] text-center">Revolutionizing Repeat Orders</h3>
                    <p class="text-gray-600 text-center mb-4">For NVIDIA, the time taken to process a repeat order was reduced from a multi-minute task to mere seconds.</p>
                    <div class="flex justify-center items-center gap-8 mt-8">
                        <div class="text-center">
                            <p class="text-lg text-gray-500">Before Esker</p>
                            <p class="text-6xl font-extrabold text-gray-400">5 <span class="text-3xl">min</span></p>
                        </div>
                        <div class="text-6xl font-bold text-[#a05195]">→</div>
                         <div class="text-center">
                            <p class="text-lg text-[#a05195]">With Esker</p>
                            <p class="text-6xl font-extrabold text-[#a05195]">5 <span class="text-3xl">sec</span></p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-2 text-[#d45087]">Touchless Processing Rate</h3>
                    <p class="text-gray-600 mb-4">One user reports that the vast majority of orders now flow through the system with zero manual intervention.</p>
                    <p class="text-7xl font-extrabold text-[#d45087]">90%</p>
                     <p class="text-xl font-medium text-gray-500">of Orders Automated</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-2 text-[#f95d6a]">Manual Error Rate</h3>
                    <p class="text-gray-600 mb-4">Automation causes a steep decline in data entry errors, improving accuracy to nearly 100%.</p>
                    <p class="text-7xl font-extrabold text-[#f95d6a]">&lt;1%</p>
                    <p class="text-xl font-medium text-gray-500">Error Rate</p>
                </div>
            </div>
        </section>

        <section id="validation" class="mb-16 md:mb-24">
            <h2 class="text-3xl font-bold text-center mb-10 text-[#003f5c]">Industry Validation & Expert Endorsements</h2>
            <div class="max-w-6xl mx-auto introductory-text mb-12">
                 <p class="text-center text-lg text-gray-700">Esker's leadership is consistently recognized by top industry analysts and trusted by major consulting firms. This validation provides confidence that Esker is not just a technology vendor, but a strategic partner for digital transformation.</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                    <h3 class="text-2xl font-bold mb-4 text-[#2f4b7c]">Gartner Recognition</h3>
                    <p class="text-gray-600 mb-6">Gartner's analysis places Esker as a significant player in the global automation landscape, highlighting its strong vision and execution capabilities.</p>
                    <ul class="space-y-4">
                        <li class="flex items-start">
                            <span class="text-2xl text-[#ffa600] mr-4">🏆</span>
                            <div>
                                <h4 class="font-bold text-[#003f5c]">Challenger</h4>
                                <p class="text-gray-600">2025 Magic Quadrant™ for Source-to-Pay Suites</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                             <span class="text-2xl text-[#ffa600] mr-4">🏆</span>
                             <div>
                                <h4 class="font-bold text-[#003f5c]">Leader</h4>
                                <p class="text-gray-600">2025 Magic Quadrant™ for Accounts Payable Applications</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-2xl font-bold mb-2 text-[#665191]">Gartner Peer Insights</h3>
                     <p class="text-lg text-gray-500 mb-3">As of June 2025 (104 Ratings)</p>
                    <div class="text-7xl font-extrabold text-[#665191]">4.8<span class="text-4xl">/5</span></div>
                    <div class="text-3xl text-yellow-400 mt-2">★★★★★</div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-2xl font-bold mb-4 text-[#a05195]">Forrester Alignment</h3>
                    <p class="text-gray-600">Forrester notes a market trend toward augmenting existing systems with modern, modular solutions. Esker's flexible, cloud-based platform directly aligns with this forward-thinking strategy, avoiding disruptive "rip-and-replace" projects.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                     <h3 class="text-2xl font-bold mb-4 text-[#d45087]">Strategic Alliance with EY</h3>
                     <p class="text-gray-600">The collaboration between Esker and EY, a "Big Four" consulting firm, combines Esker's leading AI technology with EY's deep industry and implementation expertise. This partnership helps clients navigate digital transformation and complex regulatory environments, providing a powerful endorsement of Esker's capabilities.</p>
                </div>
            </div>
        </section>

        <footer class="text-center pt-10 border-t border-gray-200">
            <h2 class="text-3xl font-bold text-center mb-4 text-[#003f5c]">Build a Future-Proof Order Management Process</h2>
            <p class="text-lg text-gray-600 max-w-4xl mx-auto">By embracing AI-powered automation with Esker, businesses can move beyond simply managing orders to creating a highly efficient, resilient, and customer-centric operation that drives strategic growth.</p>
        </footer>

    </div>
    <script>
        // This script block is a placeholder.
        // Chart.js is not used in this "Big Number" version of the infographic.
        window.initializeOrderManagementCharts = function() {
            console.log('Esker Order Management Infographic: Initializing (Big Number version - no charts).');
        };
    </script>
</body>
</html>
`;
