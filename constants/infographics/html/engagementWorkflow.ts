
export const ENGAGEMENT_WORKFLOW_INFOGRAPHIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Dynamic Sales Journey</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        html {
            scroll-behavior: smooth;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
        }
        .flow-connector {
            position: relative;
            text-align: center;
            padding: 2rem 0;
        }
        .flow-connector::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 3px;
            background-color: #d1d5db;
            z-index: -1;
        }
        .flow-connector.decision {
             padding-top: 4rem;
             padding-bottom: 6rem;
        }
        .flow-connector.decision::after {
            background-color: #fbbf24; /* Amber for decision points */
        }
        .arrow-down {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 15px solid #d1d5db;
            margin: 0 auto;
        }
        .decision .arrow-down {
            border-top-color: #fbbf24;
        }
        .decision-diamond-container {
            position: relative;
            width: 120px;
            height: 120px;
            flex-shrink: 0;
        }
        .decision-diamond {
            width: 100%;
            height: 100%;
            background-color: #fef3c7;
            border: 3px solid #fbbf24;
            transform: rotate(45deg);
            z-index: 2;
            transition: transform 0.3s ease-in-out;
        }
        .decision-diamond-text {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            color: #92400e;
            text-align: center;
            line-height: 1.25;
            padding: 0 15px;
            z-index: 3;
        }
        .stage-card {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition: all 0.5s ease-in-out;
            overflow: hidden;
        }
        .path-title, .path-description {
            transition: opacity 0.3s ease-in-out;
        }
        .path-title {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            text-align: center;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: white;
            padding: 1rem 0.5rem;
            width: 100%;
        }
        .easy-customer-bg { background-color: #22c55e; }
        .difficult-customer-bg { background-color: #ef4444; }
        .current-customer-bg { background-color: #3b82f6; }
        
        /* Interactive Logic Styles */
        .locked > :not(.arrow-down) {
            opacity: 0.4;
            pointer-events: none;
            transform: scale(0.98);
        }
        .highlight {
            animation: highlight-pulse 1.5s ease-in-out;
        }
        @keyframes highlight-pulse {
            0% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
            50% { transform: scale(1.03); box-shadow: 0 0 25px 5px rgba(59, 130, 246, 0.4); }
            100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        }
        .decision-branch {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
        }
        .line-connector {
            height: 3px;
            background-color: #fbbf24;
            flex-grow: 1;
        }
        .decision-btn {
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            border: 2px solid;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            flex-shrink: 0;
        }
        .decision-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }
        .decision-btn.yes { background-color: #dcfce7; color: #166534; border-color: #22c55e; }
        .decision-btn.no { background-color: #fee2e2; color: #991b1b; border-color: #ef4444; }
        
        .decision-taken .decision-btn {
             cursor: not-allowed;
        }
        .decision-taken .unselected {
            opacity: 0.4;
            transform: scale(0.95);
        }
        .decision-taken .selected {
            transform: scale(1.05);
            box-shadow: 0 0 15px 2px rgba(59, 130, 246, 0.5);
        }
        
        .dimmed { opacity: 0.3; }
        .filter-btn { transition: all 0.2s ease-in-out; }
        .filter-btn:hover { transform: translateY(-2px); }
        .active-filter {
             box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.1);
             transform: translateY(1px);
        }

    </style>
</head>
<body class="bg-gray-100 text-gray-800">

    <div class="container mx-auto p-4 md:p-8">
        <header class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900">The Dynamic Sales Journey</h1>
            <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Click a customer type to filter the view, then use the decision buttons to navigate.</p>
        </header>

        <!-- Interactive Filters -->
        <div id="filters" class="flex justify-center flex-wrap gap-3 mb-12 p-4 bg-white rounded-xl shadow-md">
            <button data-filter="all" class="filter-btn active-filter bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg shadow">View All</button>
            <button data-filter="easy" class="filter-btn bg-green-500 text-white font-semibold py-2 px-5 rounded-lg shadow">Easy Customer</button>
            <button data-filter="difficult" class="filter-btn bg-red-500 text-white font-semibold py-2 px-5 rounded-lg shadow">Difficult Customer</button>
            <button data-filter="current" class="filter-btn bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg shadow">Current Customer</button>
            <button id="start-over-btn" class="filter-btn bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg shadow">Start Over</button>
        </div>

        <!-- STAGE 1: Initial Engagement -->
        <div id="stage-1" class="flow-connector">
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto z-10 relative">
                 <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                             <div class="bg-indigo-100 text-indigo-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.433 13.649l-2.147-6.15a1.76 1.76 0 013.417-.592V19.24" /></svg></div>
                            <div>
                                <h2 class="text-2xl font-bold">1. Initial Engagement</h2>
                                <p class="text-gray-500">First contact to spark interest and establish credibility.</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> Direct outreach with a clear value proposition.</div>
                            <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> Use insights or research about their business to earn credibility.</div>
                            <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> Often skipped or replaced by a scheduled Business Review.</div>
                        </div>
                    </div>
                     <div class="md:w-1/3 flex">
                         <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                         <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                         <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>

        <!-- STAGE 2: Health Check -->
        <div id="stage-2" class="flow-connector locked">
             <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-blue-100 text-blue-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                            <div>
                                <h2 class="text-2xl font-bold">2. Health Check</h2>
                                <p class="text-gray-500">Assessing the current situation before deeper engagement.</p>
                            </div>
                        </div>
                         <div class="space-y-4">
                            <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> Quick confirmation of initial assumptions. Validate their stated needs.</div>
                            <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> Pre-meeting research on company performance, trends, and challenges.</div>
                            <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> This is the primary starting point. A formal Quarterly Business Review (QBR).</div>
                        </div>
                    </div>
                    <div class="md:w-1/3 flex">
                         <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                         <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                         <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>
        
        <!-- DECISION POINT 1 -->
        <div id="decision-1" class="flow-connector decision locked">
            <div class="arrow-down"></div>
            <div class="relative flex justify-center py-8">
                <div class="decision-branch">
                     <button class="decision-btn no" data-action="backward" data-target="#stage-2">No (Nurture)</button>
                     <div class="line-connector"></div>
                     <div class="decision-diamond-container"><div class="decision-diamond"></div><div class="decision-diamond-text">Proceed to Meeting?</div></div>
                     <div class="line-connector"></div>
                     <button class="decision-btn yes" data-action="forward" data-unlock="#stage-3">Yes (Schedule)</button>
                </div>
            </div>
        </div>
        
        <!-- STAGE 3: Customer Meeting -->
        <div id="stage-3" class="flow-connector locked">
             <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                 <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-green-100 text-green-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>
                            <div><h2 class="text-2xl font-bold">3. Customer Meeting</h2>
                                <p class="text-gray-500">The initial face-to-face or virtual discussion.</p>
                            </div>
                        </div>
                         <div class="space-y-4">
                            <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> Openly discusses needs and goals. Agenda is clear and followed.</div>
                            <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> May be guarded. Focus on rapport and listening more than speaking.</div>
                            <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> Structured review of past performance and future goals.</div>
                        </div>
                    </div>
                     <div class="md:w-1/3 flex">
                         <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                         <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                         <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>

        <!-- STAGE 4: Qualification -->
        <div id="stage-4" class="flow-connector locked">
            <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                <div class="flex flex-col md:flex-row">
                   <div class="p-6 md:w-2/3">
                       <div class="flex items-center gap-4 mb-4">
                           <div class="bg-red-100 text-red-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m-1.414-4L10 6.586 8.586 8 6 5.414 4.586 4 2 6.586M15 12l-3-3m0 0l-3 3m3-3v12" /></svg></div>
                           <div><h2 class="text-2xl font-bold">4. Qualification</h2>
                               <p class="text-gray-500">Validating if they are a genuine opportunity (BANT, MEDDIC).</p>
                           </div>
                       </div>
                        <div class="space-y-4">
                            <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> Straightforward as they volunteer info (Budget, Authority, Need, Timeline).</div>
                            <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> Delicate process of asking probing questions to find the "Pain."</div>
                            <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> Re-qualification for expansion. Is there a new budget? New authority?</div>
                        </div>
                   </div>
                    <div class="md:w-1/3 flex">
                        <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                        <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                        <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                    </div>
               </div>
           </div>
       </div>

        <!-- DECISION POINT 2 -->
        <div id="decision-2" class="flow-connector decision locked">
            <div class="arrow-down"></div>
            <div class="relative flex justify-center py-8">
                <div class="decision-branch">
                     <button class="decision-btn no" data-action="backward" data-target="#stage-3">No (Disqualify)</button>
                     <div class="line-connector"></div>
                     <div class="decision-diamond-container"><div class="decision-diamond"></div><div class="decision-diamond-text">Qualified Opportunity?</div></div>
                     <div class="line-connector"></div>
                     <button class="decision-btn yes" data-action="forward" data-unlock="#stage-5">Yes (Deep Dive)</button>
                </div>
            </div>
        </div>
        
        <!-- STAGE 5: Discovery Meeting -->
        <div id="stage-5" class="flow-connector locked">
            <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-yellow-100 text-yellow-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l-2.5 2.5M10 10l2.5 2.5" /></svg></div>
                            <div><h2 class="text-2xl font-bold">5. Discovery Meeting</h2><p class="text-gray-500">Deeply understanding the customer's world, pain, and processes.</p></div>
                        </div>
                        <div class="space-y-4">
                             <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> Collaboratively map their process. Co-create the solution vision.</div>
                             <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> Use discovery to build trust. Uncover latent pains.</div>
                             <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> Discovery is focused on "white space." Map future-state processes.</div>
                        </div>
                    </div>
                    <div class="md:w-1/3 flex">
                        <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                        <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                        <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>

        <!-- STAGE 6: Process Maps -->
        <div id="stage-6" class="flow-connector locked">
            <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-teal-100 text-teal-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
                            <div><h2 class="text-2xl font-bold">6. Process Maps</h2><p class="text-gray-500">Visually representing the customer's current and future state.</p></div>
                        </div>
                         <div class="space-y-4">
                             <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> A simple, clear visual that confirms the shared understanding.</div>
                             <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> A detailed map that proves you've listened and understand their complexity.</div>
                             <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> "Before" and "After" maps showing the value of the new solution.</div>
                        </div>
                    </div>
                    <div class="md:w-1/3 flex">
                        <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                        <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                        <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>

        <!-- DECISION POINT 3 -->
        <div id="decision-3" class="flow-connector decision locked">
            <div class="arrow-down"></div>
            <div class="relative flex justify-center py-8">
                <div class="decision-branch">
                     <button class="decision-btn no" data-action="backward" data-target="#stage-5">No (Re-Qualify)</button>
                     <div class="line-connector"></div>
                     <div class="decision-diamond-container"><div class="decision-diamond"></div><div class="decision-diamond-text">Solution Fit Confirmed?</div></div>
                     <div class="line-connector"></div>
                     <button class="decision-btn yes" data-action="forward" data-unlock="#stage-7">Yes (Tailor Demo)</button>
                </div>
            </div>
        </div>
        
        <!-- STAGE 7: Demonstration -->
        <div id="stage-7" class="flow-connector locked">
            <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-purple-100 text-purple-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                            <div><h2 class="text-2xl font-bold">7. Demonstration</h2><p class="text-gray-500">Showing the product as a solution to their specific problems.</p></div>
                        </div>
                         <div class="space-y-4">
                             <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> A relevant demo focusing on their key requirements.</div>
                             <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> A highly customized "day in the life" demo.</div>
                             <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> Demo new modules and features and integration points.</div>
                        </div>
                    </div>
                     <div class="md:w-1/3 flex">
                         <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                         <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                         <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>
        
        <!-- STAGE 8: ROI and Solution Presentation -->
        <div id="stage-8" class="flow-connector locked">
             <div class="arrow-down"></div>
            <div class="stage-card bg-white rounded-xl max-w-4xl mx-auto mt-8 z-10 relative">
                <div class="flex flex-col md:flex-row">
                    <div class="p-6 md:w-2/3">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="bg-pink-100 text-pink-600 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>
                            <div><h2 class="text-2xl font-bold">8. ROI & Solution Presentation</h2><p class="text-gray-500">Presenting the business case and financial justification.</p></div>
                        </div>
                        <div class="space-y-4">
                             <div class="path-description" data-type="easy"><strong class="text-green-600">Easy Customer:</strong> A clear, simple ROI calculation. Focus on total value.</div>
                             <div class="path-description" data-type="difficult"><strong class="text-red-600">Difficult Customer:</strong> A conservative, detailed, and defensible ROI model.</div>
                             <div class="path-description" data-type="current"><strong class="text-blue-600">Current Customer:</strong> ROI based on incremental gains and enhanced value.</div>
                        </div>
                    </div>
                    <div class="md:w-1/3 flex">
                        <div class="w-1/3 easy-customer-bg flex items-center justify-center" data-type="easy"><div class="path-title">Easy</div></div>
                        <div class="w-1/3 difficult-customer-bg flex items-center justify-center" data-type="difficult"><div class="path-title">Difficult</div></div>
                        <div class="w-1/3 current-customer-bg flex items-center justify-center" data-type="current"><div class="path-title">Current</div></div>
                     </div>
                </div>
            </div>
        </div>

        <!-- FINAL STAGE: Closing -->
        <div id="stage-final" class="flow-connector locked">
            <div class="arrow-down"></div>
             <div class="text-center mt-8 z-10 relative">
                <h3 class="text-3xl font-bold text-gray-800">Final Stage: Proposal & Close</h3>
                <p class="text-gray-600 mt-2">Formalizing the agreement and navigating procurement.</p>
             </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const allStagesAndDecisions = document.querySelectorAll('.flow-connector');
        
        function initializeJourney() {
            allStagesAndDecisions.forEach((el, index) => {
                if (index > 0) el.classList.add('locked');
                else el.classList.remove('locked');
                el.classList.remove('decision-taken');
                const decisionButtons = el.querySelectorAll('.decision-btn');
                if (decisionButtons) {
                    decisionButtons.forEach((btn) => {
                        btn.classList.remove('selected', 'unselected');
                    });
                }
            });
            const journeySequence = Array.from(allStagesAndDecisions).map(el => '#' + el.id);
            cascadeUnlock(journeySequence.indexOf('#stage-1'), journeySequence.indexOf('#decision-1'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function unlockAndHighlight(selector, scroll = true) {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.remove('locked');
                const card = element.querySelector('.stage-card, .decision-diamond-container');
                if (card) {
                    card.classList.add('highlight');
                    if (scroll) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        if (card) card.classList.remove('highlight');
                    }, 1500);
                }
            }
        }

        function cascadeUnlock(startIndex, endIndex) {
             const journeySequence = Array.from(allStagesAndDecisions).map(el => '#' + el.id);
             for (let i = startIndex; i <= endIndex; i++) {
                 setTimeout(() => {
                    unlockAndHighlight(journeySequence[i], i === startIndex);
                 }, (i - startIndex) * 400);
             }
        }
        
        initializeJourney();
        
        const startOverBtn = document.getElementById('start-over-btn');
        if (startOverBtn) {
            startOverBtn.addEventListener('click', initializeJourney);
        }

        document.querySelectorAll('.decision-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetButton = e.currentTarget;
                if (!(targetButton instanceof HTMLElement)) return;

                const parentDecision = targetButton.closest('.decision');
                if (!parentDecision || parentDecision.classList.contains('decision-taken')) return;

                const action = targetButton.dataset.action;
                const unlockSelector = targetButton.dataset.unlock;
                const targetSelector = targetButton.dataset.target;
                const journeySequence = Array.from(allStagesAndDecisions).map(el => '#' + el.id);

                if (action === 'forward' && unlockSelector) {
                    parentDecision.classList.add('decision-taken');
                    targetButton.classList.add('selected');
                    const otherButton = parentDecision.querySelector('.decision-btn:not(.selected)');
                    if(otherButton) otherButton.classList.add('unselected');

                    const startIndex = journeySequence.indexOf(unlockSelector);
                    if (startIndex === -1) return;

                    let endIndex = startIndex;
                    for (let i = startIndex + 1; i < journeySequence.length; i++) {
                        const stageEl = document.querySelector(journeySequence[i]);
                        if (stageEl && stageEl.classList.contains('decision')) {
                            endIndex = i;
                            break;
                        }
                        endIndex = i;
                    }
                    cascadeUnlock(startIndex, endIndex);

                } else if (action === 'backward' && targetSelector) {
                    const targetElement = document.querySelector(targetSelector);
                     if(targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        const card = targetElement.querySelector('.stage-card');
                        if(card) {
                             card.classList.add('highlight');
                             setTimeout(() => {
                                 if(card) card.classList.remove('highlight');
                             }, 1500);
                        }
                     }
                     const diamond = parentDecision.querySelector('.decision-diamond-container');
                     if (diamond) {
                         diamond.classList.add('highlight');
                         setTimeout(() => {
                            if(diamond) diamond.classList.remove('highlight');
                         }, 1500);
                     }
                }
            });
        });

        const filterContainer = document.getElementById('filters');
        if (filterContainer) {
            filterContainer.addEventListener('click', (e) => {
                const target = e.target;
                if (target instanceof HTMLButtonElement && target.id !== 'start-over-btn') {
                    const filter = target.dataset.filter;
                    const activeBtn = filterContainer.querySelector('.active-filter');
                    if(activeBtn) activeBtn.classList.remove('active-filter');
                    target.classList.add('active-filter');
                    
                    const applyFilter = (elements) => {
                        elements.forEach(el => {
                            if (el instanceof HTMLElement) {
                                const type = el.dataset.type;
                                el.classList.toggle('dimmed', !(filter === 'all' || filter === type));
                            }
                        });
                    };
                    applyFilter(document.querySelectorAll('.path-description'));
                    applyFilter(document.querySelectorAll('.easy-customer-bg, .difficult-customer-bg, .current-customer-bg'));
                }
            });
        }
    });
    </script>
</body>
</html>
`
