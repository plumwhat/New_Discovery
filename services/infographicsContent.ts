

const ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Note: Title is dynamic in the actual export -->
    <!-- <title>Transforming Order Management with Esker</title> -->
    <!-- Tailwind and Chart.js CDN links are included for self-contained export. App's main HTML already has Tailwind. -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        /* Styles are scoped by Tailwind or specific to this infographic block */
        .infographic-body { /* Changed from body to a class to avoid conflicts */
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* Light blue-gray background */
            color: #333; /* Default text color */
        }
        .infographic-container { /* Changed from .container to avoid conflicts */
            margin-left: auto;
            margin-right: auto;
            padding: 1rem; /* p-4 */
        }
        @media (min-width: 640px) { .infographic-container { padding: 1.5rem; } } /* sm:p-6 */
        @media (min-width: 768px) { .infographic-container { padding: 3rem; } } /* md:p-12 */

        .infographic-chart-container {
            position: relative;
            width: 100%;
            max-width: 450px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 350px;
        }
        @media (min-width: 768px) {
            .infographic-chart-container {
                height: 350px;
                max-height: 400px;
            }
        }
        .infographic-flow-step {
            position: relative;
            z-index: 1;
        }
        .infographic-flow-arrow::after {
            content: '→';
            font-size: 2.5rem; /* text-4xl */
            line-height: 1;
            color: #d1d5db; /* gray-300 */
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translate(50%, -50%);
            z-index: 0;
        }
        @media (max-width: 767px) { /* md breakpoint */
            .infographic-flow-arrow::after {
                content: '↓';
                top: 100%;
                left: 50%;
                transform: translate(-50%, 50%);
            }
        }
        /* Color Palette: "Brilliant Blues" & Accents */
        .infographic-text-brand { color: #003f5c; }
        .infographic-text-accent1 { color: #ff7c43; }
        .infographic-text-accent2 { color: #d45087; }
        .infographic-text-accent3 { color: #a05195; }
        .infographic-text-accent4 { color: #665191; }
        .infographic-bg-brand-light { background-color: #e6f0f3; } /* Lighter shade of #003f5c */
    </style>
</head>
<div class="infographic-body"> <!-- Changed body to div with class -->

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
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand">High Manual Workload</h3>
                    <p class="text-sm text-gray-600">CSRs are bogged down by repetitive data entry from emails, faxes, and portals, preventing them from focusing on high-value customer interactions.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent2">⚠️</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand">Costly Errors</h3>
                    <p class="text-sm text-gray-600">Manual entry inevitably leads to mistakes in shipments and billing, causing customer disputes and revenue loss.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent3">🚫</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand">Lack of Visibility</h3>
                    <p class="text-sm text-gray-600">Orders from disparate channels create a fragmented view, making it impossible to track order flow and identify issues in real time.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent4">⏳</div>
                    <h3 class="text-lg font-bold mb-2 infographic-text-brand">Inefficient Exception Handling</h3>
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
                        <div class="bg-[#003f5c] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">📥</div>
                        <h3 class="text-lg font-bold infographic-text-brand">1. Order Reception</h3>
                        <p class="text-sm text-gray-600 mt-1">All orders from any channel (Email, EDI, Fax, Portal) are centralized on one platform.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4 infographic-flow-arrow">
                        <div class="bg-[#665191] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">🤖</div>
                        <h3 class="text-lg font-bold text-[#665191]">2. AI Data Capture</h3>
                        <p class="text-sm text-gray-600 mt-1">AI and machine learning extract and verify order data, eliminating manual entry.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4 infographic-flow-arrow">
                        <div class="bg-[#d45087] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">⚙️</div>
                        <h3 class="text-lg font-bold text-[#d45087]">3. Automated Workflow</h3>
                        <p class="text-sm text-gray-600 mt-1">Orders are automatically validated, with exceptions routed for quick resolution.</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/4">
                        <div class="bg-[#ff7c43] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">💾</div>
                        <h3 class="text-lg font-bold text-[#ff7c43]">4. ERP Integration</h3>
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#2f4b7c] text-center">Processing Time Reduction</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Husqvarna's 75% time reduction is visualized by comparing the relative effort of manual vs. automated processes.</p>
                    <div class="infographic-chart-container"><canvas id="husqvarnaChartOM"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#665191] text-center">Order Processing Speed</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">MSA saw a 50%+ boost in throughput, demonstrating a significant increase in processing capacity with the same staff.</p>
                    <div class="infographic-chart-container"><canvas id="msaChartOM"></canvas></div>
                </div>
                 <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                    <h3 class="text-lg font-bold mb-1 text-[#a05195] text-center">Revolutionizing Repeat Orders</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">For NVIDIA, the time taken to process a repeat order was reduced from a multi-minute task to mere seconds.</p>
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
                        <div class="text-center">
                            <p class="text-md text-gray-500">Before Esker</p>
                            <p class="text-4xl sm:text-5xl font-extrabold text-gray-400">5 <span class="text-2xl sm:text-3xl align-baseline">min</span></p>
                        </div>
                        <div class="text-4xl sm:text-5xl font-bold text-[#a05195]">→</div>
                         <div class="text-center">
                            <p class="text-md text-[#a05195]">With Esker</p>
                            <p class="text-4xl sm:text-5xl font-extrabold text-[#a05195]">5 <span class="text-2xl sm:text-3xl align-baseline">sec</span></p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#d45087] text-center">Touchless Processing Rate</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">One user reports that 90% of their orders now flow through the system with zero manual intervention.</p>
                     <div class="infographic-chart-container"><canvas id="touchlessChartOM"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#f95d6a] text-center">Manual Error Rate</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Automation causes a steep decline in data entry errors, improving accuracy to nearly 100%.</p>
                    <div class="infographic-chart-container"><canvas id="errorRateChartOM"></canvas></div>
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
                    <h3 class="text-xl font-bold mb-3 text-[#2f4b7c]">Gartner Recognition</h3>
                    <p class="text-sm text-gray-600 mb-4">Gartner's analysis places Esker as a significant player in the global automation landscape, highlighting its strong vision and execution capabilities.</p>
                    <ul class="space-y-3">
                        <li class="flex items-start">
                            <span class="text-xl text-[#ffa600] mr-3">🏆</span>
                            <div>
                                <h4 class="font-semibold text-sm infographic-text-brand">Challenger</h4>
                                <p class="text-xs text-gray-500">Magic Quadrant™ for Source-to-Pay Suites (Recent Year)</p>
                            </div>
                        </li>
                        <li class="flex items-start">
                             <span class="text-xl text-[#ffa600] mr-3">🏆</span>
                             <div>
                                <h4 class="font-semibold text-sm infographic-text-brand">Leader</h4>
                                <p class="text-xs text-gray-500">Magic Quadrant™ for Accounts Payable Applications (Recent Year)</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-1 text-[#665191]">Gartner Peer Insights</h3>
                     <p class="text-xs text-gray-500 mb-2">(Representative Data)</p>
                    <div class="text-5xl sm:text-6xl font-extrabold text-[#665191]">4.8<span class="text-2xl sm:text-3xl">/5</span></div>
                    <div class="text-2xl text-yellow-400 mt-1">★★★★★</div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold mb-3 text-[#a05195]">Forrester Alignment</h3>
                    <p class="text-sm text-gray-600">Forrester notes a market trend toward augmenting existing systems with modern, modular solutions. Esker's flexible, cloud-based platform directly aligns with this forward-thinking strategy, avoiding disruptive "rip-and-replace" projects.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                     <h3 class="text-xl font-bold mb-3 text-[#d45087]">Strategic Alliance with EY</h3>
                     <p class="text-sm text-gray-600">The collaboration between Esker and EY, a "Big Four" consulting firm, combines Esker's leading AI technology with EY's deep industry and implementation expertise. This partnership helps clients navigate digital transformation and complex regulatory environments, providing a powerful endorsement of Esker's capabilities.</p>
                </div>
            </div>
        </section>

        <footer class="text-center pt-8 md:pt-10 border-t border-gray-200">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 infographic-text-brand">Build a Future-Proof Order Management Process</h2>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">By embracing AI-powered automation with Esker, businesses can move beyond simply managing orders to creating a highly efficient, resilient, and customer-centric operation that drives strategic growth.</p>
        </footer>
    </div>
</div>
<script>
    // This IIFE is designed to be callable globally if needed, e.g. window.initializeOrderManagementCharts()
    window.initializeOrderManagementCharts = function() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js is not loaded. OM Charts cannot be initialized.');
            return;
        }
        const FONT_COLOR = '#0a0a0a';
        const GRID_COLOR = '#e5e7eb';
        const PALETTE = {
            blue1: '#003f5c', blue2: '#2f4b7c', purple1: '#665191', purple2: '#a05195',
            pink1: '#d45087', pink2: '#f95d6a', orange1: '#ff7c43', orange2: '#ffa600',
        };
        
        const wrapLabel = (str, maxLen = 16) => {
            if (typeof str !== 'string' || str.length <= maxLen) return str;
            const words = str.split(' ');
            const lines = [];
            let currentLine = '';
            for (const word of words) {
                if ((currentLine + ' ' + word).length > maxLen && currentLine.length > 0) {
                    lines.push(currentLine); currentLine = word;
                } else { currentLine = currentLine.length > 0 ? currentLine + ' ' + word : word; }
            }
            lines.push(currentLine);
            return lines;
        };

        const defaultTooltipCallback = {
            plugins: { tooltip: { callbacks: {
                title: function(tooltipItems) {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    return Array.isArray(label) ? label.join(' ') : label;
                }
            }}}
        };
        
        const chartsToInitialize = [
            { id: 'husqvarnaChartOM', type: 'bar', data: { labels: [wrapLabel('Manual Process Time'), wrapLabel('Esker Automated Time')], datasets: [{ label: 'Relative Time Spent', data: [100, 25], backgroundColor: [PALETTE.blue2, PALETTE.orange2], borderWidth: 0 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { color: FONT_COLOR }, grid: { color: GRID_COLOR }}, y: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } },
            { id: 'msaChartOM', type: 'bar', data: { labels: ['Before Esker', 'After Esker'], datasets: [{ label: 'Relative Throughput', data: [100, 150], backgroundColor: [PALETTE.purple1, PALETTE.pink1], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: FONT_COLOR }, grid: { color: GRID_COLOR } }, x: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } },
            { id: 'touchlessChartOM', type: 'doughnut', data: { labels: ['Touchless', 'Manual'], datasets: [{ data: [90, 10], backgroundColor: [PALETTE.pink1, '#e5e7eb'], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { ...defaultTooltipCallback.plugins, legend: { display: false }, tooltip: { enabled: true } } }, plugins: [{ id: 'centerTextOM', afterDraw: (chart) => { const { ctx, chartArea: { width, height } } = chart; ctx.save(); ctx.font = \`bold \${width / 5}px Inter\`; ctx.fillStyle = chart.data.datasets[0].backgroundColor[0]; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('90%', width / 2, height / 2); ctx.restore(); } }] },
            { id: 'errorRateChartOM', type: 'line', data: { labels: ['Manual Processing', 'Esker Automation'], datasets: [{ label: 'Manual Error Rate (%)', data: [15, 0.9], fill: true, backgroundColor: 'rgba(249, 93, 106, 0.2)', borderColor: PALETTE.pink2, tension: 0.2, pointBackgroundColor: PALETTE.pink2, pointRadius: 5 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 20, ticks: { color: FONT_COLOR, callback: function(value) { return value + '%' } }, grid: { color: GRID_COLOR } }, x: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } }
        ];

        chartsToInitialize.forEach(chartConfig => {
            const canvas = document.getElementById(chartConfig.id);
            if (canvas && canvas instanceof HTMLCanvasElement) {
                const existingChart = Chart.getChart(canvas);
                if (existingChart) {
                    existingChart.destroy(); // Destroy existing chart before creating a new one
                }
                try {
                    new Chart(canvas, {
                        type: chartConfig.type,
                        data: chartConfig.data,
                        options: chartConfig.options,
                        plugins: chartConfig.plugins || []
                    });
                } catch (e) {
                    console.error("Chart.js error for " + chartConfig.id + ":", e);
                }
            } else {
                // console.warn("Canvas element not found for chart ID:", chartConfig.id);
            }
        });
    };
</script>
</html>
`;

const ESKER_ACCOUNTS_PAYABLE_INFOGRAPHIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        .infographic-body { font-family: 'Inter', sans-serif; background-color: #f0f4f8; color: #333; }
        .infographic-container { margin-left: auto; margin-right: auto; padding: 1rem; }
        @media (min-width: 640px) { .infographic-container { padding: 1.5rem; } }
        @media (min-width: 768px) { .infographic-container { padding: 3rem; } }
        .infographic-chart-container { position: relative; width: 100%; max-width: 450px; margin-left: auto; margin-right: auto; height: 300px; max-height:350px; }
        @media (min-width: 768px) { .infographic-chart-container { height: 350px; max-height:400px; } }
        .infographic-flow-step { position: relative; z-index: 1; }
        .infographic-flow-arrow::after { content: '→'; font-size: 2.5rem; line-height: 1; color: #d1d5db; position: absolute; top: 50%; left: 100%; transform: translate(50%, -50%); z-index: 0; }
        @media (max-width: 767px) { .infographic-flow-arrow::after { content: '↓'; top: 100%; left: 50%; transform: translate(-50%, 50%); } }
        .infographic-text-brand { color: #003f5c; } .infographic-text-accent1 { color: #ff7c43; } .infographic-text-accent2 { color: #d45087; }
        .infographic-text-accent3 { color: #a05195; } .infographic-text-accent4 { color: #665191; } .infographic-text-accent5 { color: #2f4b7c; }
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
                    <div class="text-4xl mb-3 infographic-text-accent1">📄</div><h3 class="text-lg font-bold mb-2 infographic-text-brand">Paper Overload & Manual Entry</h3><p class="text-sm text-gray-600">Manual handling of paper and PDF invoices is slow, error-prone, and costly, taking up valuable AP staff time.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent2">💸</div><h3 class="text-lg font-bold mb-2 infographic-text-brand">Missed Early Payment Discounts</h3><p class="text-sm text-gray-600">Slow processing and lack of visibility lead to lost discount opportunities, impacting the bottom line directly.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                    <div class="text-4xl mb-3 infographic-text-accent3">⏳</div><h3 class="text-lg font-bold mb-2 infographic-text-brand">Lengthy Approval Bottlenecks</h3><p class="text-sm text-gray-600">Manual routing for invoice approvals causes significant delays, payment issues, and frustration for both AP and approvers.</p>
                </div>
                 <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 md:col-span-1 lg:col-span-1">
                    <div class="text-4xl mb-3 infographic-text-accent4">❓</div><h3 class="text-lg font-bold mb-2 infographic-text-brand">Lack of Visibility & Control</h3><p class="text-sm text-gray-600">No real-time insight into invoice statuses, accruals, and cash flow hinders strategic financial decisions and forecasting.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 md:col-span-1 lg:col-span-1">
                    <div class="text-4xl mb-3 text-red-500">🚨</div><h3 class="text-lg font-bold mb-2 infographic-text-brand">Risk of Errors & Fraud</h3><p class="text-sm text-gray-600">Manual processes increase the risk of duplicate payments, data entry errors, and potential fraudulent activities.</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 md:col-span-2 lg:col-span-1">
                    <div class="text-4xl mb-3 infographic-text-accent5">🤝</div><h3 class="text-lg font-bold mb-2 infographic-text-brand">Strained Supplier Relationships</h3><p class="text-sm text-gray-600">Late payments and burdensome inquiry processes can damage vital supplier relationships and affect negotiations.</p>
                </div>
            </div>
        </section>

        <section id="infographic-solution-ap" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">Esker's AI-Powered AP Automation Workflow</h2>
            <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Esker automates every phase of the AP invoice lifecycle with AI-driven capabilities, ensuring accuracy, speed, and control from receipt to payment.</p></div>
            <div class="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div class="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-3">
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5 infographic-flow-arrow">
                        <div class="bg-[#003f5c] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">📬</div>
                        <h3 class="text-md font-bold infographic-text-brand">1. Invoice Reception</h3>
                        <p class="text-xs text-gray-600 mt-1">Centralized capture from any channel (email, portal, EDI, paper).</p>
                    </div>
                    <div class="infographic-flow-step text-center flex flex-col items-center w-full md:w-1/5 infographic-flow-arrow">
                        <div class="bg-[#2f4b7c] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl md:text-4xl mb-3">🧠</div>
                        <h3 class="text-md font-bold text-[#2f4b7c]">2. AI Data Capture</h3>
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
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">AP Transformation: Measurable ROI with Esker</h2>
             <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Automating AP with Esker yields substantial cost savings, efficiency gains, and strategic benefits that directly contribute to financial health and operational excellence.</p></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#003f5c] text-center">Reduced Cost Per Invoice</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Significant drop in processing costs by minimizing manual touchpoints.</p>
                    <div class="infographic-chart-container"><canvas id="apCostChart"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#665191] text-center">Early Payment Discount Capture</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Faster processing unlocks more discount opportunities, turning AP into a value generator.</p>
                    <div class="infographic-chart-container"><canvas id="apDiscountChart"></canvas></div>
                </div>
                 <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                    <h3 class="text-lg font-bold mb-1 text-[#a05195] text-center">Faster Invoice Processing Cycle Time</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Drastically reduce the time from invoice receipt to approval and payment posting.</p>
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
                        <div class="text-center">
                            <p class="text-md text-gray-500">Typical Manual Process</p>
                            <p class="text-4xl sm:text-5xl font-extrabold text-gray-400">15-20 <span class="text-2xl sm:text-3xl align-baseline">days</span></p>
                        </div>
                        <div class="text-4xl sm:text-5xl font-bold text-[#a05195]">→</div>
                         <div class="text-center">
                            <p class="text-md text-[#a05195]">With Esker AP Automation</p>
                            <p class="text-4xl sm:text-5xl font-extrabold text-[#a05195]">3-5 <span class="text-2xl sm:text-3xl align-baseline">days</span></p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#d45087] text-center">Increased Touchless Processing</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">A high percentage of invoices can flow through the system without manual intervention.</p>
                     <div class="infographic-chart-container"><canvas id="apTouchlessChart"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-[#f95d6a] text-center">Improved Days Payable Outstanding (DPO)</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Optimize payment timing to improve working capital and supplier relations.</p>
                    <div class="infographic-chart-container"><canvas id="apDpoChart"></canvas></div>
                </div>
            </div>
        </section>

        <section id="infographic-validation-ap" class="mb-16 md:mb-24">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">Recognized Leader in AP Automation</h2>
             <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Esker's AP automation solution is consistently recognized by industry analysts for its comprehensive capabilities, innovation, and customer satisfaction.</p></div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                    <h3 class="text-xl font-bold mb-3 text-[#2f4b7c]">Gartner Magic Quadrant Leader</h3>
                    <p class="text-sm text-gray-600 mb-4">Esker is positioned as a Leader in the Gartner® Magic Quadrant™ for Accounts Payable Invoice Automation (APIA) solutions, reflecting its strong market presence and comprehensive product offering.</p>
                     <p class="text-xs text-gray-500 italic">Source: Gartner (representative statement, check latest reports for specifics)</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
                    <h3 class="text-xl font-bold mb-1 text-[#665191]">High User Satisfaction</h3>
                     <p class="text-xs text-gray-500 mb-2">(Gartner Peer Insights - Representative)</p>
                    <div class="text-5xl sm:text-6xl font-extrabold text-[#665191]">4.7<span class="text-2xl sm:text-3xl">/5</span></div>
                    <div class="text-2xl text-yellow-400 mt-1">★★★★★</div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 lg:col-span-3">
                    <h3 class="text-xl font-bold mb-3 text-[#a05195]">Comprehensive Procure-to-Pay Suite</h3>
                    <p class="text-sm text-gray-600">Beyond AP, Esker offers a full suite of procure-to-pay solutions, including Sourcing, Contract Management, Procurement, and Supplier Management, enabling end-to-end process optimization and visibility.</p>
                </div>
            </div>
        </section>

        <footer class="text-center pt-8 md:pt-10 border-t border-gray-200">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 infographic-text-brand">Achieve World-Class AP Performance with Esker</h2>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Transform your Accounts Payable from a manual, reactive cost center into an efficient, strategic asset that drives financial health and strengthens supplier partnerships.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeAPCharts = function() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js is not loaded. AP Charts cannot be initialized.');
            return;
        }
        const FONT_COLOR = '#0a0a0a';
        const GRID_COLOR = '#e5e7eb';
        const PALETTE = {
            brand: '#003f5c', acc1: '#2f4b7c', acc2: '#665191', acc3: '#a05195',
            acc4: '#d45087', acc5: '#f95d6a', acc6: '#ff7c43', acc7: '#ffa600',
        };

        const defaultTooltipCallback = { plugins: { tooltip: { callbacks: { title: (items) => items[0].label }}}};

        const chartsToInitAP = [
            { id: 'apCostChart', type: 'bar', data: { labels: ['Manual AP', 'Esker AP'], datasets: [{ label: 'Cost Per Invoice ($)', data: [15, 3.5], backgroundColor: [PALETTE.acc5, PALETTE.brand], borderWidth: 0 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { color: FONT_COLOR, callback: val => '$'+val }, grid: { color: GRID_COLOR }}, y: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } },
            { id: 'apDiscountChart', type: 'doughnut', data: { labels: ['Discounts Captured', 'Discounts Missed'], datasets: [{ data: [85, 15], backgroundColor: [PALETTE.acc2, '#e0e0e0'], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { ...defaultTooltipCallback.plugins, legend: { position: 'bottom' }, tooltip: { enabled: true } } }, plugins: [{ id: 'apDiscountCenterText', afterDraw: (c) => { const {ctx,chartArea:{width,height}} = c; ctx.save(); ctx.font=\`bold \${width/6}px Inter\`; ctx.fillStyle=PALETTE.acc2; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('85%',width/2,height/2); ctx.restore(); }}] },
            { id: 'apTouchlessChart', type: 'doughnut', data: { labels: ['Touchless Invoices', 'Manual Intervention'], datasets: [{ data: [70, 30], backgroundColor: [PALETTE.acc4, '#e0e0e0'], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { ...defaultTooltipCallback.plugins, legend: { position: 'bottom' }, tooltip: { enabled: true } } }, plugins: [{ id: 'apTouchlessCenterText', afterDraw: (c) => { const {ctx,chartArea:{width,height}} = c; ctx.save(); ctx.font=\`bold \${width/6}px Inter\`; ctx.fillStyle=PALETTE.acc4; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('70%',width/2,height/2); ctx.restore(); }}] },
            { id: 'apDpoChart', type: 'line', data: { labels: ['Q1 (Manual)', 'Q2', 'Q3 (Esker)', 'Q4'], datasets: [{ label: 'DPO (Days)', data: [55, 53, 42, 40], borderColor: PALETTE.acc1, backgroundColor: 'rgba(47,75,124,0.1)', fill: true, tension: 0.3, pointRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false, ticks: { color: FONT_COLOR }, grid: { color: GRID_COLOR } }, x: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } }
        ];

        chartsToInitAP.forEach(config => {
            const canvas = document.getElementById(config.id);
            if (canvas && canvas instanceof HTMLCanvasElement) {
                const existingChart = Chart.getChart(canvas);
                if (existingChart) existingChart.destroy();
                try { new Chart(canvas, { type: config.type, data: config.data, options: config.options, plugins: config.plugins || [] }); }
                catch (e) { console.error("Chart.js error for AP chart " + config.id + ":", e); }
            }
        });
    };
</script>
</div>
</html>
`;

export const getDefaultPlaceholderInfographicHtml = (moduleName: string, technologyPartner: string): string => `
<div class="infographic-body" style="font-family: 'Inter', sans-serif; background-color: #f0f4f8; color: #333; padding: 2rem;">
    <div class="infographic-container" style="max-width: 800px; margin: auto; background-color: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <header style="text-align: center; margin-bottom: 2rem;">
            <h1 style="font-size: 2rem; font-weight: 800; color: #003f5c; margin-bottom: 0.5rem;">${moduleName} Automation with ${technologyPartner}</h1>
            <p style="font-size: 1rem; color: #555;">This is a placeholder for the ${moduleName} infographic. Detailed content, visuals, and ROI data will be populated here based on specific research for this module.</p>
        </header>

        <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #003f5c; margin-bottom: 1rem; border-bottom: 2px solid #0078D4; padding-bottom: 0.5rem;">Typical Challenges in ${moduleName}</h2>
            <ul style="list-style-type: disc; padding-left: 1.5rem; color: #444;">
                <li>TODO: Research and list 3-4 common pain points for ${moduleName}.</li>
                <li>Example: Manual data entry leading to errors and delays.</li>
                <li>Example: Lack of real-time visibility into ${moduleName.toLowerCase()} processes.</li>
                <li>Example: Difficulty in ensuring compliance and auditability.</li>
            </ul>
        </section>

        <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #003f5c; margin-bottom: 1rem; border-bottom: 2px solid #0078D4; padding-bottom: 0.5rem;">Our Proposed Solution using ${technologyPartner}</h2>
            <p style="color: #444;">TODO: Describe the high-level solution flow for ${moduleName} using ${technologyPartner}. This section should detail the key steps automated by the solution.</p>
            <ol style="list-style-type: decimal; padding-left: 1.5rem; color: #444; margin-top: 0.5rem;">
                 <li>Step 1: Example - Automated Data Capture & Input.</li>
                 <li>Step 2: Example - Intelligent Validation & Routing.</li>
                 <li>Step 3: Example - Seamless Integration & Reporting.</li>
            </ol>
        </section>

        <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #003f5c; margin-bottom: 1rem; border-bottom: 2px solid #0078D4; padding-bottom: 0.5rem;">Expected ROI & Benefits</h2>
             <p style="color: #444;">TODO: Outline potential ROI metrics and benefits. This section would ideally include placeholder charts (Chart.js) or key figures based on typical customer results for ${moduleName} with ${technologyPartner}.</p>
            <ul style="list-style-type: disc; padding-left: 1.5rem; color: #444; margin-top: 0.5rem;">
                <li>Example: XX% reduction in processing time.</li>
                <li>Example: YY% decrease in operational costs.</li>
                <li>Example: ZZ% improvement in accuracy/compliance.</li>
                <li>Placeholder for chart: <code style="background-color: #eee; padding: 0.2rem 0.4rem; border-radius: 3px;">&lt;canvas id="${moduleName.toLowerCase().replace(/\s+/g, '-')}-roi-chart"&gt;&lt;/canvas&gt;</code></li>
            </ul>
        </section>

        <section>
            <h2 style="font-size: 1.5rem; font-weight: 700; color: #003f5c; margin-bottom: 1rem; border-bottom: 2px solid #0078D4; padding-bottom: 0.5rem;">Industry Validation & Endorsements for ${technologyPartner}</h2>
            <p style="color: #444;">TODO: Add any relevant analyst reports (e.g., Gartner, Forrester) or customer testimonials that validate ${technologyPartner}'s capabilities in the area of ${moduleName}.</p>
        </section>

        <footer style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ddd;">
            <p style="font-size: 0.9rem; color: #555;">Empowering your ${moduleName} processes with intelligent automation from ${technologyPartner}.</p>
        </footer>
    </div>
</div>
`;


export const MODULE_INFOGRAPHICS_HTML_BASE: Record<string, string> = {
    orderManagement: ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML,
    accountsPayable: ESKER_ACCOUNTS_PAYABLE_INFOGRAPHIC_HTML,
    // Add other pre-defined infographics here
};
