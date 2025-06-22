
export const NINTEX_WORKFLOW_MANAGEMENT_INFOGRAPHIC_HTML = `
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
