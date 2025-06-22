
export const MFILES_DOCUMENT_MANAGEMENT_INFOGRAPHIC_HTML = `
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
