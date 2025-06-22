
const ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        .infographic-body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* Light neutral background */
            color: #333; 
        }
        .infographic-container { 
            margin-left: auto;
            margin-right: auto;
            padding: 1rem; 
        }
        @media (min-width: 640px) { .infographic-container { padding: 1.5rem; } } 
        @media (min-width: 768px) { .infographic-container { padding: 3rem; } } 

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
            font-size: 2.5rem; 
            line-height: 1;
            color: #d1d5db; /* light gray arrow */
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translate(50%, -50%);
            z-index: 0;
        }
        @media (max-width: 767px) { 
            .infographic-flow-arrow::after {
                content: '↓';
                top: 100%;
                left: 50%;
                transform: translate(-50%, 50%);
            }
        }
        .infographic-text-brand { color: #01916D; } 
        .infographic-text-brand-dark { color: #017a59; }
        .infographic-bg-brand-light { background-color: #E6F4F1; } 
        .infographic-border-brand-light { border-color: #B3DDD4; }

        .infographic-text-accent1 { color: #ff7c43; } 
        .infographic-text-accent2 { color: #d45087; }
        .infographic-text-accent3 { color: #a05195; }
        .infographic-text-accent4 { color: #665191; }
        .infographic-metric-box {
            background-color: white;
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); /* shadow-lg */
            padding: 1.5rem; /* p-6 */
            text-align: center;
        }
        .infographic-metric-box h3 {
            font-size: 1.125rem; /* text-lg */
            font-weight: 700; /* font-bold */
            margin-bottom: 0.25rem; /* mb-1 */
            color: #017a59; /* infographic-text-brand-dark */
        }
        .infographic-metric-box .metric-value {
            font-size: 2.25rem; /* text-4xl */
            font-weight: 800; /* font-extrabold */
            color: #01916D; /* infographic-text-brand */
        }
        .infographic-metric-box .metric-desc {
            font-size: 0.75rem; /* text-xs */
            color: #6b7280; /* text-gray-500 */
            margin-top: 0.25rem; /* mt-1 */
        }
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-center infographic-text-brand-dark">Processing Time Reduction</h3> 
                    <p class="text-xs text-gray-500 text-center mb-3">Husqvarna's 75% time reduction is visualized by comparing the relative effort of manual vs. automated processes.</p>
                    <div class="infographic-chart-container"><canvas id="husqvarnaChartOM"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-center infographic-text-brand-dark">Order Processing Speed</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">MSA saw a 50%+ boost in throughput, demonstrating a significant increase in processing capacity with the same staff.</p>
                    <div class="infographic-chart-container"><canvas id="msaChartOM"></canvas></div>
                </div>
                 <div class="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                    <h3 class="text-lg font-bold mb-1 text-center infographic-text-brand-dark">Revolutionizing Repeat Orders</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">For NVIDIA, the time taken to process a repeat order was reduced from a multi-minute task to mere seconds.</p>
                    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
                        <div class="text-center">
                            <p class="text-md text-gray-500">Before Esker</p>
                            <p class="text-4xl sm:text-5xl font-extrabold text-gray-400">5 <span class="text-2xl sm:text-3xl align-baseline">min</span></p>
                        </div>
                        <div class="text-4xl sm:text-5xl font-bold infographic-text-brand">→</div>
                         <div class="text-center">
                            <p class="text-md infographic-text-brand">With Esker</p>
                            <p class="text-4xl sm:text-5xl font-extrabold infographic-text-brand">5 <span class="text-2xl sm:text-3xl align-baseline">sec</span></p>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-center infographic-text-brand-dark">Touchless Processing Rate</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">One user reports that 90% of their orders now flow through the system with zero manual intervention.</p>
                     <div class="infographic-chart-container"><canvas id="touchlessChartOM"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 text-center infographic-text-brand-dark">Manual Error Rate</h3>
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
        requestAnimationFrame(() => {
            if (typeof Chart === 'undefined') {
                console.warn('OM Infographic: Chart.js is not loaded. Charts cannot be initialized.');
                return;
            }
            console.log('OM Infographic: Initializing Order Management Charts. Chart type:', typeof Chart);
            const FONT_COLOR = '#333333'; 
            const GRID_COLOR = '#e5e7eb'; 
            const BRAND_COLOR = '#01916D';
            const BRAND_DARK_COLOR = '#017a59';
            const ACCENT_COLORS = ['#ff7c43', '#d45087', '#a05195', '#665191', '#f95d6a', '#ffa600'];

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
                        if (!item || !item.chart || !item.chart.data || !item.chart.data.labels) return '';
                        let label = item.chart.data.labels[item.dataIndex];
                        return Array.isArray(label) ? label.join(' ') : label;
                    }
                }}}
            };
            
            const chartsToInitialize = [
                { id: 'husqvarnaChartOM', type: 'bar', data: { labels: [wrapLabel('Manual Process Time'), wrapLabel('Esker Automated Time')], datasets: [{ label: 'Relative Time Spent', data: [100, 25], backgroundColor: [ACCENT_COLORS[0], BRAND_COLOR], borderWidth: 0 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { color: FONT_COLOR }, grid: { color: GRID_COLOR }}, y: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } },
                { id: 'msaChartOM', type: 'bar', data: { labels: ['Before Esker', 'After Esker'], datasets: [{ label: 'Relative Throughput', data: [100, 150], backgroundColor: [ACCENT_COLORS[3], BRAND_COLOR], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { color: FONT_COLOR }, grid: { color: GRID_COLOR } }, x: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } },
                { id: 'touchlessChartOM', type: 'doughnut', data: { labels: ['Touchless', 'Manual'], datasets: [{ data: [90, 10], backgroundColor: [BRAND_COLOR, GRID_COLOR], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { ...defaultTooltipCallback.plugins, legend: { display: false }, tooltip: { enabled: true } } }, plugins: [{ id: 'centerTextOM', afterDraw: (chart) => { const { ctx, chartArea: { width, height } } = chart; ctx.save(); ctx.font = \`bold \${width / 5}px Inter\`; ctx.fillStyle = BRAND_COLOR; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('90%', width / 2, height / 2); ctx.restore(); } }] },
                { id: 'errorRateChartOM', type: 'line', data: { labels: ['Manual Processing', 'Esker Automation'], datasets: [{ label: 'Manual Error Rate (%)', data: [15, 0.9], fill: true, backgroundColor: 'rgba(1, 122, 89, 0.2)', borderColor: BRAND_DARK_COLOR, tension: 0.2, pointBackgroundColor: BRAND_DARK_COLOR, pointRadius: 5 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 20, ticks: { color: FONT_COLOR, callback: function(value) { return value + '%' } }, grid: { color: GRID_COLOR } }, x: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } }
            ];

            chartsToInitialize.forEach(chartConfig => {
                const canvas = document.getElementById(chartConfig.id);
                if (canvas && canvas instanceof HTMLCanvasElement) {
                    const existingChart = Chart.getChart(canvas);
                    if (existingChart) {
                        existingChart.destroy(); 
                    }
                    try {
                        new Chart(canvas, {
                            type: chartConfig.type,
                            data: chartConfig.data,
                            options: chartConfig.options,
                            plugins: chartConfig.plugins || []
                        });
                         console.log('OM Infographic: Chart initialized successfully for ID:', chartConfig.id);
                    } catch (e) {
                        console.error("OM Infographic: Chart.js error for chart " + chartConfig.id + ":", e);
                    }
                } else {
                     console.warn("OM Infographic: Canvas element not found for chart ID:", chartConfig.id);
                }
            });
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
        
        .infographic-text-brand { color: #01916D; } 
        .infographic-text-brand-dark { color: #017a59; }
        .infographic-bg-brand-light { background-color: #E6F4F1; }
        .infographic-border-brand-light { border-color: #B3DDD4; }
        
        .infographic-text-accent1 { color: #ff7c43; } 
        .infographic-text-accent2 { color: #d45087; }
        .infographic-text-accent3 { color: #a05195; } 
        .infographic-text-accent4 { color: #665191; } 
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
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
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-10 infographic-text-brand">AP Transformation: Measurable ROI with Esker</h2>
             <div class="max-w-5xl mx-auto mb-12"><p class="text-center text-gray-700">Automating AP with Esker yields substantial cost savings, efficiency gains, and strategic benefits that directly contribute to financial health and operational excellence.</p></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 infographic-text-brand-dark text-center">Reduced Cost Per Invoice</h3> 
                    <p class="text-xs text-gray-500 text-center mb-3">Significant drop in processing costs by minimizing manual touchpoints.</p>
                    <div class="infographic-chart-container"><canvas id="apCostChart"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 infographic-text-brand-dark text-center">Early Payment Discount Capture</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">Faster processing unlocks more discount opportunities, turning AP into a value generator.</p>
                    <div class="infographic-chart-container"><canvas id="apDiscountChart"></canvas></div>
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
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 infographic-text-brand-dark text-center">Increased Touchless Processing</h3>
                    <p class="text-xs text-gray-500 text-center mb-3">A high percentage of invoices can flow through the system without manual intervention.</p>
                     <div class="infographic-chart-container"><canvas id="apTouchlessChart"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-lg font-bold mb-1 infographic-text-brand-dark text-center">Improved Days Payable Outstanding (DPO)</h3>
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
        console.log('AP Infographic: Initializing AP Charts. Chart type:', typeof Chart);

        const FONT_COLOR = '#333333'; 
        const GRID_COLOR = '#e5e7eb'; 
        const BRAND_COLOR = '#01916D';
        const BRAND_DARK_COLOR = '#017a59';
        const ACCENT_COLORS = ['#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];

        const defaultTooltipCallback = { plugins: { tooltip: { callbacks: { title: (items) => items[0].label }}}};

        const chartsToInitAP = [
            { id: 'apCostChart', type: 'bar', data: { labels: ['Manual AP', 'Esker AP'], datasets: [{ label: 'Cost Per Invoice ($)', data: [15, 3.5], backgroundColor: [ACCENT_COLORS[5], BRAND_COLOR], borderWidth: 0 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, ticks: { color: FONT_COLOR, callback: val => '$'+val }, grid: { color: GRID_COLOR }}, y: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } },
            { id: 'apDiscountChart', type: 'doughnut', data: { labels: ['Discounts Captured', 'Discounts Missed'], datasets: [{ data: [85, 15], backgroundColor: [BRAND_COLOR, GRID_COLOR], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { ...defaultTooltipCallback.plugins, legend: { position: 'bottom' }, tooltip: { enabled: true } } }, plugins: [{ id: 'apDiscountCenterText', afterDraw: (c) => { const {ctx,chartArea:{width,height}} = c; ctx.save(); ctx.font=\`bold \${width/6}px Inter\`; ctx.fillStyle=BRAND_COLOR; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('85%',width/2,height/2); ctx.restore(); } }] },
            { id: 'apTouchlessChart', type: 'doughnut', data: { labels: ['Touchless Invoices', 'Manual Intervention'], datasets: [{ data: [70, 30], backgroundColor: [BRAND_DARK_COLOR, GRID_COLOR], borderWidth: 0, hoverOffset: 4 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { ...defaultTooltipCallback.plugins, legend: { position: 'bottom' }, tooltip: { enabled: true } } }, plugins: [{ id: 'apTouchlessCenterText', afterDraw: (c) => { const {ctx,chartArea:{width,height}} = c; ctx.save(); ctx.font=\`bold \${width/6}px Inter\`; ctx.fillStyle=BRAND_DARK_COLOR; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('70%',width/2,height/2); ctx.restore(); } }] },
            { id: 'apDpoChart', type: 'line', data: { labels: ['Q1 (Manual)', 'Q2', 'Q3 (Esker)', 'Q4'], datasets: [{ label: 'DPO (Days)', data: [55, 53, 42, 40], borderColor: BRAND_COLOR, backgroundColor: 'rgba(1, 122, 89, 0.1)', fill: true, tension: 0.3, pointRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false, ticks: { color: FONT_COLOR }, grid: { color: GRID_COLOR } }, x: { ticks: { color: FONT_COLOR }, grid: { display: false } } }, plugins: { ...defaultTooltipCallback.plugins, legend: { display: false } } } }
        ];

        chartsToInitAP.forEach(config => {
            const canvas = document.getElementById(config.id);
            if (canvas && canvas instanceof HTMLCanvasElement) {
                const existingChart = Chart.getChart(canvas);
                if (existingChart) existingChart.destroy();
                try { 
                    new Chart(canvas, { type: config.type, data: config.data, options: config.options, plugins: config.plugins || [] }); 
                } catch (e) { console.error("AP Infographic: Chart.js error for chart " + config.id + ":", e); }
            } else {
                console.warn("AP Infographic: Canvas element not found for chart ID:", config.id);
            }
        });
      });
    };
</script>
</div>
</html>
`;

// --- Standardized M-Files Document Management Infographic ---
const MFILES_DOCUMENT_MANAGEMENT_INFOGRAPHIC_HTML = `
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
        .infographic-text-mfiles-primary { color: #FFC20E; } /* M-Files Yellow */
        .infographic-text-mfiles-secondary { color: #003DA5; } /* M-Files Blue */
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-16">
            <img src="https://www.m-files.com/wp-content/uploads/2023/02/M-Files_logo_BlueYellow.svg" alt="M-Files Logo" class="h-10 mx-auto mb-4">
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Unlock Your Information Potential with M-Files</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Transform how your organization manages documents and information, breaking down silos and boosting productivity with M-Files' metadata-driven approach.</p>
        </header>

        <section id="infographic-challenges-dm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The Chaos of Traditional Document Management</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-mfiles-secondary">📁</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Information Silos</h3><p class="text-sm text-gray-600">Documents scattered across systems, hindering access and collaboration.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-mfiles-secondary">🔄</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Version Control Issues</h3><p class="text-sm text-gray-600">Working on outdated versions leads to errors and rework.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-mfiles-secondary">🛡️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Compliance & Security Risks</h3><p class="text-sm text-gray-600">Inconsistent access controls and poor audit trails create vulnerabilities.</p></div>
            </div>
        </section>

        <section id="infographic-solution-dm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The M-Files Solution: What vs. Where</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">M-Files manages information based on <strong class="infographic-text-mfiles-primary">what</strong> it is, not where it's stored. By using metadata, M-Files connects documents to people, projects, and processes.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                <div><div class="text-2xl mb-2 infographic-text-mfiles-secondary">🔗</div><h4 class="font-semibold text-gray-700">Connect & Federate</h4><p class="text-xs text-gray-600">Access data in existing systems without migration.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-mfiles-secondary">🎯</div><h4 class="font-semibold text-gray-700">Contextualize with Metadata</h4><p class="text-xs text-gray-600">Tag documents for intelligent organization.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-mfiles-secondary">⚙️</div><h4 class="font-semibold text-gray-700">Automate & Secure</h4><p class="text-xs text-gray-600">Automate workflows and enforce permissions.</p></div>
            </div>
        </section>

        <section id="infographic-roi-dm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Quantifiable Business Impact</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>Productivity Gain</h3><div class="metric-value">20-30%</div><p class="metric-desc">Time saved searching for information.</p></div>
                <div class="infographic-metric-box"><h3>Compliance Improvement</h3><div class="metric-value">50%</div><p class="metric-desc">Reduction in compliance-related effort.</p></div>
                <div class="infographic-metric-box"><h3>Reduced Errors</h3><div class="metric-value">Up to 75%</div><p class="metric-desc">Fewer errors from using wrong document versions.</p></div>
            </div>
        </section>

        <section id="infographic-validation-dm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Industry Recognition</h2>
             <div class="max-w-3xl mx-auto text-center">
                <p class="text-gray-700 mb-4">M-Files is consistently recognized as a Leader by top industry analyst firms for its innovative approach to information management.</p>
                <div class="flex justify-center space-x-8 mt-4"><span class="text-gray-500 font-semibold">Gartner Leader</span> <span class="text-gray-500 font-semibold">Forrester Leader</span></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Manage information intelligently. Find, use, and protect what matters most with M-Files.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeDocumentManagementCharts = function() {
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn('M-Files Infographic: Chart.js is not loaded.'); return; }
        console.log('M-Files Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;

// --- Standardized Nintex Workflow Management Infographic ---
const NINTEX_WORKFLOW_MANAGEMENT_INFOGRAPHIC_HTML = `
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
        .infographic-text-nintex-primary { color: #EC1C24; } /* Nintex Red */
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-16">
            <img src="https://www.nintex.com/wp-content/themes/nintex/assets/images/logo.svg" alt="Nintex Logo" class="h-10 mx-auto mb-4">
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Automate, Orchestrate, Optimize with Nintex</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Empower your teams to manage, automate, and optimize business processes with the intuitive and powerful Nintex Process Platform.</p>
        </header>

        <section id="infographic-challenges-wm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The Drag of Manual Workflows</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-nintex-primary">🏃‍♂️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Slow Cycle Times</h3><p class="text-sm text-gray-600">Manual handoffs and chasing approvals lead to significant delays.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-nintex-primary">⚠️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Inconsistent Execution</h3><p class="text-sm text-gray-600">Lack of standardization results in errors and variable quality.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-nintex-primary">📉</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Poor Visibility</h3><p class="text-sm text-gray-600">Difficult to track process status and identify bottlenecks.</p></div>
            </div>
        </section>

        <section id="infographic-solution-wm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The Nintex Process Platform Advantage</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">Nintex provides a comprehensive platform to map, automate, and optimize your business processes, connecting people, systems, and data.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                 <div><div class="text-2xl mb-2 infographic-text-nintex-primary">🎨</div><h4 class="font-semibold text-gray-700">Visual Workflow Design</h4><p class="text-xs text-gray-600">Drag-and-drop to design and deploy automated workflows.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-nintex-primary">📋</div><h4 class="font-semibold text-gray-700">Digital Forms</h4><p class="text-xs text-gray-600">Create sophisticated forms to capture data accurately.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-nintex-primary">🤖</div><h4 class="font-semibold text-gray-700">RPA & DocGen</h4><p class="text-xs text-gray-600">Automate tasks with bots and generate documents.</p></div>
            </div>
        </section>

        <section id="infographic-roi-wm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Transformative Results</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>Cycle Time Reduction</h3><div class="metric-value">50-75%</div><p class="metric-desc">Decrease in process completion times.</p></div>
                <div class="infographic-metric-box"><h3>Productivity Boost</h3><div class="metric-value">20-40%</div><p class="metric-desc">Employee time reclaimed for high-value work.</p></div>
                <div class="infographic-metric-box"><h3>ROI Achieved</h3><div class="metric-value">&lt; 6 Months</div><p class="metric-desc">Typical payback period for Nintex deployments.</p></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Streamline operations and achieve process excellence with Nintex.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeWorkflowManagementCharts = function() {
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn('Nintex WM Infographic: Chart.js is not loaded.'); return; }
        console.log('Nintex WM Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;

// --- Standardized Nintex Process Mapping Infographic ---
const NINTEX_PROCESS_MAPPING_INFOGRAPHIC_HTML = `
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
        .infographic-text-nintex-primary { color: #EC1C24; }
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-16">
            <img src="https://www.nintex.com/wp-content/themes/nintex/assets/images/logo.svg" alt="Nintex Logo" class="h-10 mx-auto mb-4">
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Visualize, Understand, Improve with Nintex Process Mapping</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Empower your organization to collaboratively map, manage, and optimize business processes with Nintex Process Manager.</p>
        </header>

        <section id="infographic-challenges-pm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The Hidden Costs of Undocumented Processes</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-nintex-primary">❓</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Lack of Clarity</h3><p class="text-sm text-gray-600">"Tribal knowledge" and inconsistent documentation lead to confusion.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-nintex-primary">🐌</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Inefficiency</h3><p class="text-sm text-gray-600">Hidden bottlenecks and redundancies go unnoticed, wasting resources.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-nintex-primary">🚧</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Resistance to Change</h3><p class="text-sm text-gray-600">Difficult to improve processes that aren't clearly understood.</p></div>
            </div>
        </section>

        <section id="infographic-solution-pm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Nintex Process Manager: Your Central Process Hub</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">Nintex Process Manager provides a collaborative, easy-to-use platform for documenting, sharing, and improving business processes.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                <div><div class="text-2xl mb-2 infographic-text-nintex-primary">🗺️</div><h4 class="font-semibold text-gray-700">Easy Process Mapping</h4><p class="text-xs text-gray-600">Simple tools for anyone to map processes.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-nintex-primary">🤝</div><h4 class="font-semibold text-gray-700">Collaboration</h4><p class="text-xs text-gray-600">Central hub for teams to share feedback.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-nintex-primary">📊</div><h4 class="font-semibold text-gray-700">Standardization</h4><p class="text-xs text-gray-600">Promote consistency and best practices.</p></div>
            </div>
        </section>

        <section id="infographic-roi-pm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Benefits of Clear Process Understanding</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>Faster Onboarding</h3><div class="metric-value">Up to 40%</div><p class="metric-desc">Reduction in new employee ramp-up time.</p></div>
                <div class="infographic-metric-box"><h3>Efficiency Gains</h3><div class="metric-value">15-25%</div><p class="metric-desc">Improvement in process throughput.</p></div>
                <div class="infographic-metric-box"><h3>Reduced Errors</h3><div class="metric-value">Up to 30%</div><p class="metric-desc">By standardizing processes.</p></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Unlock process excellence. Start by understanding your processes with Nintex.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeProcessMappingCharts = function() {
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn('Nintex PM Infographic: Chart.js is not loaded.'); return; }
        console.log('Nintex PM Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;

// --- Standardized Esker Supplier Management Infographic ---
const ESKER_SUPPLIER_MANAGEMENT_INFOGRAPHIC_HTML = `
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
        .infographic-text-esker-secondary { color: #00AEEF; } /* Esker Blue */
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-16">
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Strengthen Supplier Relationships with Esker</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Automate supplier onboarding, communication, and information management to build a more collaborative and resilient supply chain.</p>
        </header>

        <section id="infographic-challenges-sm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The Burden of Manual Supplier Management</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-esker-secondary">⏳</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Slow Onboarding</h3><p class="text-sm text-gray-600">Manual data collection delays new supplier activation.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-esker-secondary">💾</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Data Inaccuracies</h3><p class="text-sm text-gray-600">Outdated supplier information leads to payment errors.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-esker-secondary">📞</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Poor Communication</h3><p class="text-sm text-gray-600">Suppliers lack visibility, increasing AP workload.</p></div>
            </div>
        </section>

        <section id="infographic-solution-sm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Esker's Supplier Management Solution</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">Esker provides a secure, self-service supplier portal integrated with AP automation to streamline the entire supplier lifecycle.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                <div><div class="text-2xl mb-2 infographic-text-esker-secondary">📝</div><h4 class="font-semibold text-gray-700">Self-Service Onboarding</h4><p class="text-xs text-gray-600">Suppliers submit and update their information directly.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-esker-secondary">📊</div><h4 class="font-semibold text-gray-700">Centralized Information</h4><p class="text-xs text-gray-600">Single source of truth for all supplier data.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-esker-secondary">💬</div><h4 class="font-semibold text-gray-700">Automated Communication</h4><p class="text-xs text-gray-600">Automate notifications and status updates.</p></div>
            </div>
        </section>

        <section id="infographic-roi-sm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Tangible Benefits & ROI</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>Onboarding Time</h3><div class="metric-value">50-70% ↓</div><p class="metric-desc">Reduction in time to onboard new suppliers.</p></div>
                <div class="infographic-metric-box"><h3>Supplier Inquiries</h3><div class="metric-value">Up to 40% ↓</div><p class="metric-desc">Fewer status calls to AP staff.</p></div>
                <div class="infographic-metric-box"><h3>Data Accuracy</h3><div class="metric-value">99%+</div><p class="metric-desc">Improved supplier master data quality.</p></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Build stronger, more efficient supplier partnerships with Esker.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeSupplierManagementCharts = function() {
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn('Esker SM Infographic: Chart.js is not loaded.'); return; }
        console.log('Esker SM Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;

// --- Standardized Esker Collection Management Infographic ---
const ESKER_COLLECTION_MANAGEMENT_INFOGRAPHIC_HTML = `
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
        .infographic-text-esker-secondary { color: #00AEEF; }
        .infographic-metric-box { background-color: white; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); padding: 1.5rem; text-align: center; }
        .infographic-metric-box h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem; color: #017a59; }
        .infographic-metric-box .metric-value { font-size: 2.25rem; font-weight: 800; color: #01916D; }
        .infographic-metric-box .metric-desc { font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem; }
    </style>
</head>
<div class="infographic-body">
    <div class="infographic-container">
        <header class="text-center mb-12 md:mb-16">
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Accelerate Cash Flow with Esker Collections Management</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Automate your dunning process, prioritize collection activities, and reduce Days Sales Outstanding (DSO) with an intelligent solution.</p>
        </header>

        <section id="infographic-challenges-cm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">The Hurdles of Manual Collections</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-esker-secondary">📆</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">High DSO</h3><p class="text-sm text-gray-600">Delayed payments tie up working capital and strain financial health.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-esker-secondary">⚙️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Inefficient Processes</h3><p class="text-sm text-gray-600">Manual task prioritization and follow-ups consume collector time.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3 infographic-text-esker-secondary">📉</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Poor Visibility</h3><p class="text-sm text-gray-600">Lack of insight into customer payment behavior and risk profiles.</p></div>
            </div>
        </section>

        <section id="infographic-solution-cm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Esker's Intelligent Collections Solution</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">Esker automates collection workflows, provides predictive analytics, and facilitates customer communication for faster payments.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                <div><div class="text-2xl mb-2 infographic-text-esker-secondary">🎯</div><h4 class="font-semibold text-gray-700">Prioritized Worklists</h4><p class="text-xs text-gray-600">AI-driven prioritization of collection tasks.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-esker-secondary">📧</div><h4 class="font-semibold text-gray-700">Automated Dunning</h4><p class="text-xs text-gray-600">Automate reminders and communications.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-esker-secondary">📈</div><h4 class="font-semibold text-gray-700">Analytics & Reporting</h4><p class="text-xs text-gray-600">Real-time visibility into AR aging and cash flow.</p></div>
            </div>
        </section>

        <section id="infographic-roi-cm" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Key Performance Improvements</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>DSO Reduction</h3><div class="metric-value">10-20%</div><p class="metric-desc">Decrease in Days Sales Outstanding.</p></div>
                <div class="infographic-metric-box"><h3>Collector Productivity</h3><div class="metric-value">25-50% ↑</div><p class="metric-desc">Increase in accounts managed per collector.</p></div>
                <div class="infographic-metric-box"><h3>Bad Debt Reduction</h3><div class="metric-value">Up to 15%</div><p class="metric-desc">Lower provisions for bad debt.</p></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Optimize your collections and improve cash flow with Esker.</p>
        </footer>
    </div>
</div>
<script>
    window.initializeCollectionManagementCharts = function() {
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn('Esker CM Infographic: Chart.js is not loaded.'); return; }
        console.log('Esker CM Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;

// Generic Template for all other modules
const generateGenericInfographicHtml = (moduleName: string, technologyPartner: string): string => `
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
            <h1 class="text-3xl md:text-4xl font-extrabold infographic-text-brand mb-3">Transforming ${moduleName} with ${technologyPartner}</h1>
            <p class="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">Discover how ${technologyPartner}'s solutions for ${moduleName} can streamline operations, reduce costs, and enhance efficiency.</p>
        </header>

        <section id="infographic-challenges-${moduleName.toLowerCase().replace(/\s+/g, '-')}" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Common ${moduleName} Challenges</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3">⚙️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Manual Processes</h3><p class="text-sm text-gray-600">High reliance on manual data entry and repetitive tasks leading to inefficiencies in ${moduleName.toLowerCase()}.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3">⚠️</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Error Rates</h3><p class="text-sm text-gray-600">Increased risk of errors due to manual handling, impacting data accuracy for ${moduleName.toLowerCase()}.</p></div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center"><div class="text-3xl mb-3">📉</div><h3 class="text-lg font-semibold mb-2 infographic-text-brand-dark">Lack of Visibility</h3><p class="text-sm text-gray-600">Poor insight into ${moduleName.toLowerCase()} process status and performance metrics.</p></div>
            </div>
        </section>

        <section id="infographic-solution-${moduleName.toLowerCase().replace(/\s+/g, '-')}" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">${technologyPartner}'s Solution for ${moduleName}</h2>
            <p class="text-center text-gray-700 max-w-3xl mx-auto mb-6">${technologyPartner} provides an intelligent platform to automate and optimize your ${moduleName.toLowerCase()} workflows, delivering enhanced control and efficiency.</p>
            <div class="bg-white rounded-lg shadow-lg p-8 grid md:grid-cols-3 gap-6 text-center items-start">
                <div><div class="text-2xl mb-2 infographic-text-brand">💡</div><h4 class="font-semibold text-gray-700">Intelligent Automation</h4><p class="text-xs text-gray-600">Leverage AI and machine learning for ${moduleName.toLowerCase()}.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-brand">📊</div><h4 class="font-semibold text-gray-700">Enhanced Analytics</h4><p class="text-xs text-gray-600">Gain actionable insights into ${moduleName.toLowerCase()} performance.</p></div>
                <div><div class="text-2xl mb-2 infographic-text-brand">🔗</div><h4 class="font-semibold text-gray-700">Seamless Integration</h4><p class="text-xs text-gray-600">Connect with your existing ERP and business systems for ${moduleName.toLowerCase()}.</p></div>
            </div>
        </section>

        <section id="infographic-roi-${moduleName.toLowerCase().replace(/\s+/g, '-')}" class="mb-12 md:mb-16">
            <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 infographic-text-brand">Key Metric Improvements for ${moduleName}</h2>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="infographic-metric-box"><h3>Processing Time</h3><div class="metric-value">Up to 50% ↓</div><p class="metric-desc">Reduction in task completion time for ${moduleName.toLowerCase()}.</p></div>
                <div class="infographic-metric-box"><h3>Operational Costs</h3><div class="metric-value">Up to 30% ↓</div><p class="metric-desc">Decrease in costs associated with ${moduleName.toLowerCase()}.</p></div>
                <div class="infographic-metric-box"><h3>Data Accuracy</h3><div class="metric-value">95%+</div><p class="metric-desc">Improvement in data accuracy for ${moduleName.toLowerCase()}.</p></div>
            </div>
        </section>

        <footer class="text-center pt-8 border-t infographic-border-brand-light">
            <p class="text-md text-gray-600">Optimize your ${moduleName.toLowerCase()} processes with ${technologyPartner}.</p>
        </footer>
    </div>
</div>
<script>
    window.initialize${moduleName.replace(/\s+/g, '')}Charts = function() {
      requestAnimationFrame(() => {
        if (typeof Chart === 'undefined') { console.warn('${moduleName} Infographic: Chart.js is not loaded.'); return; }
        console.log('${moduleName} Infographic: Initializing Charts. (No complex charts in this version, text stats used)');
        // Placeholder for any JS initialization if charts were added.
      });
    };
</script>
</div>
</html>
`;


export const getDefaultPlaceholderInfographicHtml = (moduleName: string, technologyPartner: string): string => {
    return generateGenericInfographicHtml(moduleName, technologyPartner);
};

export const MODULE_INFOGRAPHICS_HTML_BASE: Record<string, string> = {
    orderManagement: ESKER_ORDER_MANAGEMENT_INFOGRAPHIC_HTML,
    accountsPayable: ESKER_ACCOUNTS_PAYABLE_INFOGRAPHIC_HTML,
    documentManagement: MFILES_DOCUMENT_MANAGEMENT_INFOGRAPHIC_HTML,
    workflowManagement: NINTEX_WORKFLOW_MANAGEMENT_INFOGRAPHIC_HTML,
    processMapping: NINTEX_PROCESS_MAPPING_INFOGRAPHIC_HTML,
    supplierManagement: ESKER_SUPPLIER_MANAGEMENT_INFOGRAPHIC_HTML,
    collectionManagement: ESKER_COLLECTION_MANAGEMENT_INFOGRAPHIC_HTML,
    // Add other finance & business explicit infographics here if they exist
};

import { ALL_MODULES } from '../constants/moduleConstants';

export const MODULE_INFOGRAPHICS_HTML: Record<string, string> = { ...MODULE_INFOGRAPHICS_HTML_BASE };

ALL_MODULES.forEach(module => {
    if (!MODULE_INFOGRAPHICS_HTML[module.id]) {
        MODULE_INFOGRAPHICS_HTML[module.id] = getDefaultPlaceholderInfographicHtml(module.name, module.technologyPartner || "Leading Technology");
    }
});
