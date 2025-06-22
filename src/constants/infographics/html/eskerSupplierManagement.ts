
export const ESKER_SUPPLIER_MANAGEMENT_INFOGRAPHIC_HTML = `
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
