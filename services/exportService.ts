

import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat, RequirementBlock, TabMetadata, PainPointLevel1Pain, EditableReverseWaterfallCheatSheets, QualificationQuestion, EditableDiscoveryQuestionsTemplates, EditableModuleSolutionContentMap, DiscoveryQuestion, ConversationExchange, ConversationStepId, AutomationType, CustomerConversationState, PainPointMode } from '../types';
import { 
    SCORECARD_QUESTIONS, 
    QUALIFICATION_QUESTIONS_QUALITATIVE,
    QUALIFICATION_QUESTIONS_QUANTITATIVE,
    DISCOVERY_QUESTIONS_TEMPLATES, 
    TAB_METADATA, 
    ALL_MODULES, 
    MODULE_SPECIFIC_SOLUTION_CONTENT, 
    RESELLER_COMPANY_NAME,  
    PAIN_POINT_HIERARCHY, 
    REVERSE_WATERFALL_CHEAT_SHEETS,
    FINANCE_MODULES,
    BUSINESS_MODULES
} from '../constants'; 

const getModuleById = (id: string | null): Module | undefined => {
    if (!id) return undefined;
    return ALL_MODULES.find(m => m.id === id);
}

const formatCurrencyForExport = (value?: number): string => {
    if (value === undefined || value === null) return 'N/A';
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

const escapeHtml = (unsafe: string): string => {
    if (typeof unsafe !== 'string') return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

const nl2br = (str: string): string => {
    if (typeof str !== 'string') return '';
    const tempToken = '___TEMP_BR_TOKEN___';
    str = str.replace(/<br\s*\/?>/gi, tempToken);
    str = str.replace(/\r\n|\n\r|\r|\n/g, '<br />'); // Ensure all newline types are caught
    str = str.replace(new RegExp(tempToken, 'g'), '<br />');
    return str;
};

const stripHtml = (html: string): string => {
    if (typeof html !== 'string') return '';
    // First, convert <p> and <br> to newlines for basic structure in text.
    let text = html.replace(/<p.*?>/gi, '\n').replace(/<\/p>/gi, '\n');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    // Replace <li> with a newline and a dash for list items.
    text = text.replace(/<li>/gi, '\n- ').replace(/<\/li>/gi, '');
    // Replace <h4> with **text** for emphasis, then strip other tags.
    text = text.replace(/<h[1-6].*?>(.*?)<\/h[1-6]>/gi, '\n\n**$1**\n');
    // Strip all other HTML tags.
    text = text.replace(/<[^>]+>/g, '');
    // Clean up: remove leading/trailing whitespace, multiple newlines.
    text = text.replace(/&nbsp;/gi, ' ');
    text = text.replace(/\n\s*\n/g, '\n\n'); // Reduce multiple newlines to two
    return text.trim();
};


// --- TXT/MD Formatting Helpers ---
const formatSectionTitleTextMd = (title: string, level: number = 2, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
    switch (format) {
        case ExportFormat.MD:
            return `${'#'.repeat(level)} ${title}\n\n`;
        case ExportFormat.TXT:
        case ExportFormat.AI_PROMPT:
            return `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`;
        default:
            // This default case should ideally not be reached if `format` is strictly one of the allowed types.
            // TypeScript's exhaustiveness check might not work perfectly here due to the union type.
            const _exhaustiveCheck: never = format;
            console.warn(`Unhandled format in formatSectionTitleTextMd: ${_exhaustiveCheck}`);
            return `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`; 
    }
};

const formatFieldTextMd = (label: string, value: string | number | undefined | null, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT, indent: string = ""): string => {
    const valStr = (value !== undefined && value !== null && value !== "") ? value.toString() : 'Not answered';
    if (format === ExportFormat.MD) return `${indent}**${label}:** ${valStr}\n`;
    return `${indent}${label}: ${valStr}\n`;
};

const formatDiscoveryAnswersTextMd = (answers: DiscoveryAnswer[], type: string, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
    let content = format === ExportFormat.MD ? `**${type} Insights:**\n` : `${type.toUpperCase()} INSIGHTS:\n`;
    if (answers.length === 0) {
        content += "  No questions, answers, or notes for this section.\n";
    } else {
        answers.forEach(item => {
            if (item.isCustom) { // Custom Note
                const noteText = item.answer || 'Empty note';
                if (format === ExportFormat.MD) {
                    content += `  - **Note:** ${noteText}\n`;
                } else {
                    content += `  Note: ${noteText}\n`;
                }
            } else { // Standard Question
                const qText = item.questionText;
                const aText = item.answer || 'Not answered';
                if (format === ExportFormat.MD) {
                    content += `  - **Q:** ${qText}\n    **A:** ${aText}\n`;
                } else {
                    content += `  Q: ${qText}\n    A: ${aText}\n`;
                }
            }
        });
    }
    return content + "\n";
};

const formatRoiResultsTextMd = (results: RoiResults | null, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT, moduleRoiData?: any): string => {
    if (!results) return "ROI Calculation not performed or no results.\n\n";
    
    let content = formatSectionTitleTextMd("ROI Calculation Results", 3, format);

    if (moduleRoiData) {
        content += formatFieldTextMd("Average Annual Employee Salary", formatCurrencyForExport(moduleRoiData.annualSalary), format);
        content += formatFieldTextMd("Annual Software Cost", formatCurrencyForExport(moduleRoiData.annualSoftwareCost), format);
        content += formatFieldTextMd("Upfront Professional Services Cost", formatCurrencyForExport(moduleRoiData.upfrontProfServicesCost), format);
        content += formatFieldTextMd("Solution Lifespan (Years)", `${moduleRoiData.solutionLifespanYears}`, format);
        content += "\n";
    }

    content += formatFieldTextMd("Total Annual Gross Savings", formatCurrencyForExport(results.totalAnnualGrossSavings), format);
    content += formatFieldTextMd("Total Investment Over Lifespan", formatCurrencyForExport(results.totalInvestmentOverLifespan), format);
    content += formatFieldTextMd("Overall ROI Percentage", `${isFinite(results.overallRoiPercentage) ? results.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}`, format);
    content += formatFieldTextMd("Payback Period", `${isFinite(results.paybackPeriodMonths) ? results.paybackPeriodMonths.toFixed(1) + ' Months' : 'N/A'}`, format);
    
    content += format === ExportFormat.MD ? "\n**Savings Calculation Workings:**\n" : "\nSAVINGS CALCULATION WORKINGS:\n";
    results.savingsCalculationWorkings.forEach(item => {
        content += format === ExportFormat.MD 
            ? `  - **${item.category}:** ${formatCurrencyForExport(item.result)}\n    (Formula: ${item.formula})\n`
            : `  - ${item.category}: ${formatCurrencyForExport(item.result)}\n    (Formula: ${item.formula})\n`;
    });
    
    content += format === ExportFormat.MD 
        ? `\n**Annual Breakdown (Lifespan: ${results.solutionLifespanYears} Years):**\n`
        : `\nANNUAL BREAKDOWN (Lifespan: ${results.solutionLifespanYears} Years):\n`;

    if (format === ExportFormat.MD) {
        content += "| Year | Gross Savings | Software Cost | Investment | Net Cash Flow (Year) | Cumulative Net Cash Flow |\n";
        content += "|------|---------------|---------------|------------|----------------------|--------------------------|\n";
        results.annualBreakdown.forEach(item => {
            content += `| ${item.year} | ${formatCurrencyForExport(item.grossSavings)} | ${formatCurrencyForExport(item.softwareCost)} | ${formatCurrencyForExport(item.investment)} | ${formatCurrencyForExport(item.netCashFlow)} | ${formatCurrencyForExport(item.cumulativeNetCashFlow)} |\n`;
        });
    } else {
        results.annualBreakdown.forEach(item => {
            content += `Year ${item.year}: Gross Savings ${formatCurrencyForExport(item.grossSavings)}, Software Cost ${formatCurrencyForExport(item.softwareCost)}, Investment ${formatCurrencyForExport(item.investment)}, Net CF ${formatCurrencyForExport(item.netCashFlow)}, Cum. Net CF ${formatCurrencyForExport(item.cumulativeNetCashFlow)}\n`;
        });
    }
    return content + "\n";
};

// --- HTML Formatting Helpers ---
const htmlStyles = `
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8f9fa; color: #333; }
  .container { max-width: 900px; margin: 0 auto; padding: 25px; background-color: #fff; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 2px 15px rgba(0,0,0,0.07); }
  h1, h2, h3, h4 { color: #005a9e; margin-top: 1.5em; margin-bottom: 0.6em; }
  h1.main-title { font-size: 2.2em; border-bottom: 3px solid #005a9e; padding-bottom: 0.3em; text-align: center; }
  h2.section-title { font-size: 1.8em; border-bottom: 2px solid #0078D4; padding-bottom: 0.2em; margin-top: 2em; }
  h3.subsection-title { font-size: 1.4em; color: #0078D4; }
  p, .field { margin-bottom: 0.8em; }
  .field { display: flex; flex-wrap: wrap; margin-bottom: 0.5em; }
  .field-label { font-weight: bold; color: #495057; min-width: 180px; padding-right:10px; }
  .field-value { color: #212529; }
  ul, dl { margin-bottom: 1em; padding-left: 20px; }
  li, dt, dd { margin-bottom: 0.4em; }
  dt { font-weight: bold; }
  dd { margin-left: 0; } /* Adjusted for requirement block styling */
  table { width: 100%; border-collapse: collapse; margin-bottom: 1.5em; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  th, td { border: 1px solid #ced4da; padding: 10px 12px; text-align: left; vertical-align: top; }
  th { background-color: #e9ecef; font-weight: 600; color: #005a9e; }
  tr:nth-child(even) td { background-color: #f8f9fa; }
  .section-divider { border-top: 2px dashed #0078D4; margin: 2.5em 0; }
  .currency { font-weight: bold; }
  .status { padding: 0.2em 0.5em; border-radius: 4px; font-weight: bold; }
  .status-QUALIFIED { background-color: #d4edda; color: #155724; }
  .status-CLARIFICATION_REQUIRED { background-color: #fff3cd; color: #856404; }
  .status-NOT_SUITABLE { background-color: #f8d7da; color: #721c24; }
  .status-NOT_STARTED { background-color: #e2e3e5; color: #383d41; }
  .note { font-size: 0.9em; color: #6c757d; font-style: italic; }
  .discovery-item { margin-bottom: 1em; padding: 0.8em; border: 1px solid #eee; border-radius: 4px; background-color: #fdfdfd;}
  .discovery-item dt { margin-bottom: 0.3em; }
  .custom-note-item { margin-bottom: 1em; padding: 0.8em; border: 1px solid #e0e0e0; border-left: 4px solid #757575; border-radius: 4px; background-color: #f9f9f9;}
  .custom-note-item .note-label { font-weight: bold; color: #555; display: block; margin-bottom: 0.3em; }
  .custom-note-item .note-content { color: #333; }
  .solution-proposal-section { margin-bottom: 2em; }
  .solution-proposal-section h2, .solution-proposal-section h3 { margin-top: 0.5em;}
  .print-hidden { display: initial; } 
  .core-module-elements { margin-top: 0.5em; margin-bottom: 1em; padding-left: 20px; }
  .core-module-elements li { margin-bottom: 0.3em; }
  .requirement-block-export {
    margin-bottom: 1em;
    padding: 0.8em 1em;
    border: 1px solid #cce7ff; /* Light blue border */
    border-radius: 6px;
    background-color: #f0f8ff; /* AliceBlue */
  }
  .requirement-block-export h4 {
    font-size: 1.1em;
    color: #005a9e; /* Darker blue */
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  .requirement-block-export p {
    font-size: 0.95em;
    margin-bottom: 0.3em;
    margin-left: 10px;
  }
  .requirement-block-export p strong {
    color: #333;
  }
  .conversation-exchange { border: 1px solid #e0e0e0; padding: 10px 15px; margin-bottom: 15px; background-color: #f9f9f9; border-radius: 6px;}
  .conversation-exchange .step-id { font-size: 0.85em; color: #666; margin-bottom: 8px; border-bottom: 1px dashed #ccc; padding-bottom: 5px; }
  .conversation-exchange .prompt-label { font-weight: bold; color: #005a9e; }
  .conversation-exchange .prompt-text, .conversation-exchange .answer-text { margin-top: 3px; color: #333; white-space: pre-wrap; display: block; }
  .conversation-exchange .answer-label { font-weight: bold; color: #28a745; margin-top: 5px;}
  .conversation-exchange .module-prompt-group { margin-top:10px; padding-left:15px; border-left: 3px solid #a2cffe; }
  .conversation-exchange .module-prompt-item { margin-bottom: 10px; padding: 8px; background-color: #eff6ff; border-radius: 4px; }
  .conversation-exchange .automation-focus { font-size: 0.9em; font-style: italic; color: #555; margin-top: 5px; }


  @media print {
    body { margin: 0; padding: 0; background-color: #fff; font-size: 10pt; }
    .container { max-width: 100%; margin: 0; padding: 15px; border: none; box-shadow: none; }
    .print-hidden { display: none !important; }
    h1.main-title { font-size: 1.8em; }
    h2.section-title { font-size: 1.5em; }
    h3.subsection-title { font-size: 1.2em; }
    table { font-size: 9pt; }
    th, td { padding: 6px 8px; }
    .requirement-block-export { border-color: #ccc; background-color: #f9f9f9; }
    .conversation-exchange { background-color: #f8f8f8; }
  }
</style>
`;

const formatSectionTitleHtml = (title: string, level: number = 2, mainTitle: boolean = false): string => `<h${level} class="${mainTitle ? 'main-title' : (level === 2 ? 'section-title' : 'subsection-title')}">${escapeHtml(title)}</h${level}>\n`;
const formatFieldHtml = (label: string, value: string | number | undefined | null, isCurrency: boolean = false): string => {
    let valStr = (value !== undefined && value !== null && value !== "") ? escapeHtml(value.toString()) : '<span class="note">Not answered</span>';
    if (isCurrency && typeof value === 'number') valStr = `<span class="currency">${formatCurrencyForExport(value)}</span>`;
    else if (isCurrency && typeof value === 'string' && value.startsWith('$')) valStr = `<span class="currency">${escapeHtml(value)}</span>`;
    
    return `<div class="field"><span class="field-label">${escapeHtml(label)}:</span> <span class="field-value">${valStr}</span></div>\n`;
};


const formatDiscoveryAnswersHtml = (answers: DiscoveryAnswer[], type: string): string => {
    let content = `<h3 class="subsection-title">${escapeHtml(type)} Insights</h3>\n`;
    if (answers.length === 0) {
        content += "<p class=\"note\">No questions, answers, or notes for this section.</p>\n";
    } else {
        content += "<dl>\n";
        answers.forEach(item => {
            if (item.isCustom) { // Custom Note
                const noteText = item.answer ? nl2br(escapeHtml(item.answer)) : '<span class="note">Empty note</span>';
                content += `<div class="custom-note-item"><span class="note-label">Custom Note:</span><div class="note-content">${noteText}</div></div>\n`;
            } else { // Standard Question
                const qText = escapeHtml(item.questionText);
                const aText = item.answer ? nl2br(escapeHtml(item.answer)) : '<span class="note">Not answered</span>';
                content += `<div class="discovery-item"><dt>${qText}</dt><dd>${aText}</dd></div>\n`;
            }
        });
        content += "</dl>\n";
    }
    return content;
};

const formatRoiResultsHtml = (results: RoiResults | null, moduleRoiData?: any, moduleName?: string): string => {
    if (!results) return "<p class=\"note\">ROI Calculation not performed or no results.</p>\n";
    
    let content = formatSectionTitleHtml(`ROI Calculation Results for ${escapeHtml(moduleName || 'Selected Module')}`, 3);

    if (moduleRoiData) {
        content += formatFieldHtml("Average Annual Employee Salary", moduleRoiData.annualSalary, true);
        content += formatFieldHtml("Annual Software Cost", moduleRoiData.annualSoftwareCost, true);
        content += formatFieldHtml("Upfront Professional Services Cost", moduleRoiData.upfrontProfServicesCost, true);
        content += formatFieldHtml("Solution Lifespan (Years)", moduleRoiData.solutionLifespanYears);
    }

    content += formatFieldHtml("Total Annual Gross Savings", results.totalAnnualGrossSavings, true);
    content += formatFieldHtml("Total Investment Over Lifespan", results.totalInvestmentOverLifespan, true);
    content += formatFieldHtml("Overall ROI Percentage", `${isFinite(results.overallRoiPercentage) ? results.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}`);
    content += formatFieldHtml("Payback Period", `${isFinite(results.paybackPeriodMonths) ? results.paybackPeriodMonths.toFixed(1) + ' Months' : 'N/A'}`);
    
    content += "<h4 class=\"subsection-title\">Savings Calculation Workings:</h4>\n<ul>\n";
    results.savingsCalculationWorkings.forEach(item => {
        content += `<li><strong>${escapeHtml(item.category)}:</strong> <span class="currency">${formatCurrencyForExport(item.result)}</span><br /><small class="note">Formula: ${escapeHtml(item.formula)}</small></li>\n`;
    });
    content += "</ul>\n";
    
    content += `<h4 class=\"subsection-title\">Annual Breakdown (Lifespan: ${results.solutionLifespanYears} Years):</h4>\n`;
    content += "<table><thead><tr><th>Year</th><th>Gross Savings</th><th>Software Cost</th><th>Investment</th><th>Net Cash Flow (Year)</th><th>Cumulative Net Cash Flow</th></tr></thead><tbody>\n";
    results.annualBreakdown.forEach(item => {
        content += `<tr>
            <td>${item.year}</td>
            <td><span class="currency">${formatCurrencyForExport(item.grossSavings)}</span></td>
            <td><span class="currency">${formatCurrencyForExport(item.softwareCost)}</span></td>
            <td><span class="currency">${formatCurrencyForExport(item.investment)}</span></td>
            <td><span class="currency" style="color:${item.netCashFlow >= 0 ? 'green' : 'red'};">${formatCurrencyForExport(item.netCashFlow)}</span></td>
            <td><span class="currency" style="color:${item.cumulativeNetCashFlow >= 0 ? 'green' : 'red'};">${formatCurrencyForExport(item.cumulativeNetCashFlow)}</span></td>
        </tr>\n`;
    });
    content += "</tbody></table>\n";
    return content;
};

// Generic function to format solution builder content for either HTML or MD/TXT
const formatSolutionBuilderContent = (
    appState: AppState, 
    format: ExportFormat
): string => {
    const { solutionBuilder, roiCalculator, customerCompany, customerName, dateCompleted } = appState;
    const { selectedCoreModuleId, requirementBlocks } = solutionBuilder;

    const coreModule = getModuleById(selectedCoreModuleId);
    const coreModuleName = coreModule?.name || "N/A";
    
    const moduleContentDef = MODULE_SPECIFIC_SOLUTION_CONTENT[selectedCoreModuleId || 'default'] || MODULE_SPECIFIC_SOLUTION_CONTENT.default;
    const partnerDisplayName = moduleContentDef.technologyPartnerName;
    
    const executiveSummaryText = moduleContentDef.executiveSummaryBoilerplate
        .replace(/{partnerName}/g, partnerDisplayName)
        .replace(/{moduleName}/g, coreModuleName);
    const solutionOverviewTextOrHtml = moduleContentDef.solutionOverviewDetails
        .replace(/{partnerName}/g, partnerDisplayName)
        .replace(/{moduleName}/g, coreModuleName);
    const coreElementsList = moduleContentDef.coreElements.map(template => 
        template.replace(/{partnerName}/g, partnerDisplayName).replace(/{moduleName}/g, coreModuleName)
    );

    const roiData: RoiResults | null = (selectedCoreModuleId && roiCalculator[selectedCoreModuleId]?.results) 
                                      ? roiCalculator[selectedCoreModuleId]!.results 
                                      : null;
    let content = "";

    switch (format) {
        case ExportFormat.HTML:
            content += `<div class="solution-proposal-section"> ${formatSectionTitleHtml(`Solution Proposal for ${escapeHtml(coreModuleName)}`, 1, true)}</div>`;
            content += formatFieldHtml("Customer Company", customerCompany || "N/A");
            content += formatFieldHtml("Customer Contact", customerName || "N/A");
            content += formatFieldHtml("Date Prepared", dateCompleted);

            content += `<section class="solution-proposal-section"> <h2 class="section-title">Executive Summary</h2>`;
            content += `<p>This document outlines a proposed solution for <strong>${escapeHtml(customerCompany) || 'the client'}</strong> to address challenges and opportunities within <strong>${escapeHtml(coreModuleName)}</strong> processes. Leveraging industry-leading technologies such as Esker for finance automation, M-Files for intelligent information management, and Nintex for advanced workflow capabilities, this solution aims to deliver significant operational efficiencies, enhanced control, and a strong return on investment.</p>`;
            content += `<div class="executive-summary-boilerplate">${executiveSummaryText}</div>`; 
            if (roiData) {
                content += `<p class="mt-2">The financial projections for the <strong>${escapeHtml(coreModuleName)}</strong> module indicate a potential <strong>Total Annual Gross Savings of ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}</strong>, an <strong>Overall ROI of ${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}</strong> over ${roiData.solutionLifespanYears} years, and a <strong>Payback Period of approximately ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}</strong>.</p>`;
            }
            content += `</section>`;

            content += `<section class="solution-proposal-section"> <h2 class="section-title">Overview of the Proposed Solution</h2>`;
            content += solutionOverviewTextOrHtml; 
            content += `</section>`;

            if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
                content += `<section class="solution-proposal-section"> <h2 class="section-title">Detailed Customer Solution & Requirements</h2>`;
                content += `<h3 class="subsection-title">Core Module: ${escapeHtml(coreModuleName)}</h3>`;
                if (coreElementsList.length > 0) {
                    content += `<ul class="core-module-elements">`;
                    coreElementsList.forEach(element => {
                        content += `<li>${escapeHtml(element)}</li>`;
                    });
                    content += `</ul>`;
                } else {
                    content += `<p class="note">Core functionalities for this module are tailored based on specific requirements.</p>`;
                }
                
                if (requirementBlocks.length > 0) {
                    content += `<h3 class="subsection-title" style="margin-top: 1.2em;">Specific Requirements & Solutions:</h3> <div class="requirement-blocks-container">\n`;
                    requirementBlocks.forEach((block, index) => {
                        content += `<div class="requirement-block-export">
                            <h4>Requirement Block ${index + 1} <span style="font-weight:normal; font-size:0.9em;">(Priority: ${index + 1})</span></h4>
                            <p><strong>Requirement:</strong> ${nl2br(escapeHtml(block.requirement))}</p>
                            <p><strong>Proposed Solution:</strong> ${nl2br(escapeHtml(block.solution))}</p>
                        </div>\n`;
                    });
                    content += `</div>`; 
                }
                content += `</section>`;
            }

            if (roiData) {
                content += `<section class="solution-proposal-section"> <h2 class="section-title">Expected Business Outcomes & ROI Highlights for ${escapeHtml(coreModuleName)}</h2>`;
                content += `<p>The implementation of the proposed ${escapeHtml(coreModuleName)} solution, leveraging ${escapeHtml(partnerDisplayName)}, is projected to yield significant financial and operational benefits:</p>
                            <ul class="list-disc pl-6">
                                <li><strong>Total Annual Gross Savings:</strong> ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}</li>
                                <li><strong>Total Net Benefit (${roiData.solutionLifespanYears} years):</strong> ${formatCurrencyForExport(roiData.totalNetBenefitOverLifespan)}</li>
                                <li><strong>Overall ROI (${roiData.solutionLifespanYears} years):</strong> ${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}</li>
                                <li><strong>Payback Period:</strong> ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} Months` : (roiData.totalNetBenefitOverLifespan <=0 && roiData.totalInvestmentOverLifespan > 0 ? 'Payback not achieved within lifespan' : (roiData.totalInvestmentOverLifespan === 0 && roiData.totalAnnualGrossSavings > 0 ? 'Instant' :(roiData.totalInvestmentOverLifespan === 0 && roiData.totalAnnualGrossSavings === 0 ? 'N/A' : `Exceeds ${roiData.solutionLifespanYears*12} Months`)))}</li>
                                <li><strong>Upfront Investment:</strong> ${formatCurrencyForExport(roiData.upfrontInvestment)}</li>
                                <li><strong>Annual Recurring Software Cost:</strong> ${formatCurrencyForExport(roiData.annualRecurringSoftwareCost)}</li>
                            </ul>
                            <p class="note mt-2">Note: These figures are estimates based on the data provided for the ${escapeHtml(coreModuleName)} module. A detailed breakdown of savings calculations is available in the ROI Calculator tab and related exports.</p>
                </section>`;
            } else if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
                content += `<p class="mt-4 note"><i>Quantitative ROI analysis for the <strong>${escapeHtml(coreModuleName)}</strong> module can be performed in the 'ROI Calculator' tab to complement this solution outline.</i></p>`;
            }
            break;

        case ExportFormat.MD:
        case ExportFormat.TXT:
        case ExportFormat.AI_PROMPT:
            const currentNonHtmlFormat = format; 
            content += formatSectionTitleTextMd(`Solution Proposal for ${coreModuleName}`, 1, currentNonHtmlFormat);
            content += formatFieldTextMd("Customer Company", customerCompany || "N/A", currentNonHtmlFormat);
            content += formatFieldTextMd("Customer Contact", customerName || "N/A", currentNonHtmlFormat);
            content += formatFieldTextMd("Date Prepared", dateCompleted, currentNonHtmlFormat);
            content += "\n";
            
            content += formatSectionTitleTextMd("Executive Summary", 2, currentNonHtmlFormat);
            let execSummaryBase = `This document outlines a proposed solution for ${customerCompany || 'the client'} to address challenges and opportunities within ${coreModuleName} processes. Leveraging industry-leading technologies such as Esker for finance automation, M-Files for intelligent information management, and Nintex for advanced workflow capabilities, this solution aims to deliver significant operational efficiencies, enhanced control, and a strong return on investment.\n`;
            content += execSummaryBase + stripHtml(executiveSummaryText) + "\n";
            if (roiData) {
              content += `The financial projections for the ${coreModuleName} module indicate a potential Total Annual Gross Savings of ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}, an Overall ROI of ${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'} over ${roiData.solutionLifespanYears} years, and a Payback Period of approximately ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}.\n\n`;
            }
        
            content += formatSectionTitleTextMd("Overview of the Proposed Solution", 2, currentNonHtmlFormat);
            content += stripHtml(solutionOverviewTextOrHtml) + "\n\n";
            
            if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
                content += formatSectionTitleTextMd("Detailed Customer Solution & Requirements", 2, currentNonHtmlFormat);
                content += currentNonHtmlFormat === ExportFormat.MD ? `**Core Module: ${coreModuleName}**\n` : `CORE MODULE: ${coreModuleName}\n`;
                if (coreElementsList.length > 0) {
                    coreElementsList.forEach(element => {
                        content += currentNonHtmlFormat === ExportFormat.MD ? `- ${element}\n` : `  - ${element}\n`;
                    });
                    content += "\n";
                }
                if (requirementBlocks.length > 0) {
                    content += currentNonHtmlFormat === ExportFormat.MD ? `**Specific Requirements & Solutions:**\n` : `SPECIFIC REQUIREMENTS & SOLUTIONS:\n`;
                    requirementBlocks.forEach((block, index) => {
                      content += currentNonHtmlFormat === ExportFormat.MD 
                        ? `\n**Requirement Block ${index + 1} (Priority: ${index + 1})**\n  * **Requirement:** ${block.requirement}\n  * **Solution:** ${block.solution}\n`
                        : `\nRequirement Block ${index + 1} (Priority: ${index + 1})\n  - Requirement: ${block.requirement}\n  - Solution: ${block.solution}\n`;
                    });
                    content += "\n";
                }
            }
        
            if (roiData) {
                content += formatSectionTitleTextMd(`Expected Business Outcomes & ROI Highlights for ${coreModuleName}`, 2, currentNonHtmlFormat);
                content += formatFieldTextMd("Total Annual Gross Savings", formatCurrencyForExport(roiData.totalAnnualGrossSavings), currentNonHtmlFormat, "  ");
                content += formatFieldTextMd(`Total Net Benefit (${roiData.solutionLifespanYears} years)`, formatCurrencyForExport(roiData.totalNetBenefitOverLifespan), currentNonHtmlFormat, "  ");
                content += formatFieldTextMd(`Overall ROI (${roiData.solutionLifespanYears} years)`, `${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}`, currentNonHtmlFormat, "  ");
                content += formatFieldTextMd("Payback Period", isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} Months` : 'N/A', currentNonHtmlFormat, "  ");
                content += "\n";
            } else if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
                 content += `Quantitative ROI analysis for the ${coreModuleName} module can be performed in the 'ROI Calculator' tab to complement this solution outline.\n\n`;
            }
            break;
        default: {
            const _exhaustiveCheck: never = format;
            console.error(`Unhandled export format in formatSolutionBuilderContent: ${_exhaustiveCheck}`);
            throw new Error(`Unhandled export format: ${_exhaustiveCheck}`);
          }
    }
    return content;
};

// New function for dedicated solution document export
export const generateSolutionDocumentContent = (
    state: AppState, 
    format: ExportFormat.HTML | ExportFormat.MD
): string => {
  let content = formatSolutionBuilderContent(state, format); 
  
  if (format === ExportFormat.HTML) {
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Solution Proposal: ${escapeHtml(getModuleById(state.solutionBuilder.selectedCoreModuleId)?.name || 'Solution')}</title>\n${htmlStyles}\n</head>\n<body>\n<div class="container">\n${content}\n</div>\n</body>\n</html>`;
  }
  return content;
};

const formatCustomerConversationExchangesHtml = (exchanges: ConversationExchange[]): string => {
  let content = '';
  exchanges.forEach(exchange => {
    content += `<div class="conversation-exchange">`;
    content += `<div class="step-id"><strong>Step:</strong> ${escapeHtml(exchange.stepId)}</div>`;
    if (exchange.type === 'script') {
      content += `<div class="prompt-label">Script:</div><div class="prompt-text">${nl2br(escapeHtml(exchange.prompt))}</div>`;
    } else if (exchange.type === 'question') {
      content += `<div class="prompt-label">Question:</div><div class="prompt-text">${nl2br(escapeHtml(exchange.prompt))}</div>`;
      content += `<div class="answer-label">Answer:</div><div class="answer-text">${exchange.answer ? nl2br(escapeHtml(exchange.answer)) : '<span class="note">Not answered</span>'}</div>`;
    } else if (exchange.type === 'note') {
        content += `<div class="prompt-label">Note (${escapeHtml(exchange.prompt || 'General')}):</div>`;
        content += `<div class="answer-text">${exchange.answer ? nl2br(escapeHtml(exchange.answer)) : '<span class="note">No details</span>'}</div>`;
    } else if (exchange.type === 'module_question_group') {
        content += `<div class="prompt-label">Exploring ${escapeHtml(exchange.prompt)} Modules:</div>`;
        if (exchange.modulePrompts && exchange.modulePrompts.length > 0) {
            content += `<div class="module-prompt-group">`;
            exchange.modulePrompts.forEach(mp => {
                content += `<div class="module-prompt-item">`;
                content += `<div><strong>Module:</strong> ${escapeHtml(mp.moduleName)}</div>`;
                content += `<div><strong>Prompt:</strong> ${nl2br(escapeHtml(mp.promptQuestion))}</div>`;
                content += `<div class="answer-label">Answer:</div><div class="answer-text">${mp.answer ? nl2br(escapeHtml(mp.answer)) : '<span class="note">Not answered</span>'}</div>`;
                content += `</div>`;
            });
            content += `</div>`;
        } else {
            content += `<div class="answer-text"><span class="note">No specific module questions explored or answered.</span></div>`;
        }
    }
    if (exchange.automationFocus) {
      content += `<div class="automation-focus">(Automation Focus: ${escapeHtml(exchange.automationFocus)})</div>`;
    }
    content += `</div>`;
  });
  return content;
};

const formatCustomerConversationExchangesTextMd = (exchanges: ConversationExchange[], format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
  let content = "";
  exchanges.forEach(exchange => {
    content += formatFieldTextMd("Step", exchange.stepId, format, "  ");
    if (exchange.type === 'script') {
      content += formatFieldTextMd("Script", exchange.prompt, format, "    ");
    } else if (exchange.type === 'question') {
      content += formatFieldTextMd("Question", exchange.prompt, format, "    ");
      content += formatFieldTextMd("Answer", exchange.answer || "Not answered", format, "    ");
    } else if (exchange.type === 'note') {
        content += formatFieldTextMd(`Note on ${exchange.prompt || 'General'}`, exchange.answer || "No details", format, "    ");
    } else if (exchange.type === 'module_question_group') {
        content += formatFieldTextMd(`Exploring ${exchange.prompt} Modules`, "", format, "    ");
        if (exchange.modulePrompts && exchange.modulePrompts.length > 0) {
            exchange.modulePrompts.forEach(mp => {
                content += formatFieldTextMd("Module", mp.moduleName, format, "      ");
                content += formatFieldTextMd("Prompt", mp.promptQuestion, format, "      ");
                content += formatFieldTextMd("Answer", mp.answer || "Not answered", format, "      ");
            });
        } else {
            content += "      No specific module questions explored or answered.\n";
        }
    }
    if (exchange.automationFocus) {
      content += formatFieldTextMd("Automation Focus", exchange.automationFocus, format, "    ");
    }
    content += "\n";
  });
  return content;
};

export const triggerDownload = (content: string, filename: string, format: ExportFormat | 'html' | 'md') => {
  let mimeType = 'text/plain';
  if (format === ExportFormat.HTML || format === 'html') { 
    mimeType = 'text/html';
  } else if (format === ExportFormat.MD || format === 'md') { 
    mimeType = 'text/markdown';
  } else if (format === ExportFormat.AI_PROMPT) { 
    mimeType = 'text/plain';
  }
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

export const generateCustomerConversationExportContent = (
    conversationState: CustomerConversationState,
    customerCompany: string,
    dateCompleted: string
): string => {
    const { exchanges, followUpDetails, generalNotes, currentAutomationFocus } = conversationState;
    let content = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Customer Conversation Log: ${escapeHtml(customerCompany)}</title>\n${htmlStyles}\n</head>\n<body>\n<div class="container">\n`;
    content += formatSectionTitleHtml(`Customer Conversation Log: ${escapeHtml(customerCompany)}`, 1, true);
    content += formatFieldHtml("Date", dateCompleted);
    content += formatFieldHtml("Overall Identified Automation Focus", currentAutomationFocus || "Not specifically determined");
    content += `<hr class="section-divider" />\n\n`;

    content += formatSectionTitleHtml("Conversation Flow", 2);
    content += formatCustomerConversationExchangesHtml(exchanges);
    content += `<hr class="section-divider" />\n\n`;

    content += formatSectionTitleHtml("Follow-up Details", 2);
    content += formatFieldHtml("Interest Confirmed for Follow-up", followUpDetails.interestConfirmed === null ? "N/A" : (followUpDetails.interestConfirmed ? "Yes" : "No"));
    content += formatFieldHtml("Follow-up Contact Name", followUpDetails.contactName);
    content += formatFieldHtml("Follow-up Contact Email", followUpDetails.contactEmail);
    content += formatFieldHtml("Proposed Meeting Date", followUpDetails.meetingDate);
    content += formatFieldHtml("Proposed Meeting Time", followUpDetails.meetingTime);
    content += formatFieldHtml("Specialist Needed For", followUpDetails.specialistNeeded || "N/A");
    content += `<div><span class="field-label">Follow-up Notes:</span> <div class="field-value" style="margin-top:5px; padding:8px; background-color:#f0f0f0; border-radius:4px; white-space: pre-wrap;">${followUpDetails.notes ? nl2br(escapeHtml(followUpDetails.notes)) : '<span class="note">None</span>'}</div></div>`;
    content += `<hr class="section-divider" />\n\n`;
    
    content += formatSectionTitleHtml("Overall Conversation Notes", 2);
    content += `<div style="padding:10px; background-color:#f0f0f0; border-radius:4px; white-space: pre-wrap;">${generalNotes ? nl2br(escapeHtml(generalNotes)) : '<span class="note">No general notes recorded.</span>'}</div>`;
    
    content += "\n</div>\n</body>\n</html>";
    return content;
};


export const generateExportContent = (state: AppState): string => {
  const { 
    selectedRole, selectedModuleId, exportFormat, 
    customerCompany, customerName, dateCompleted 
  } = state; 
  const generalModuleName = selectedModuleId ? getModuleById(selectedModuleId)?.name : "N/A";
  let content = "";

  const qualQualQuestions = QUALIFICATION_QUESTIONS_QUALITATIVE;
  const qualQuantQuestions = QUALIFICATION_QUESTIONS_QUANTITATIVE;
  const discoveryTemplates = DISCOVERY_QUESTIONS_TEMPLATES;

  const addDivider = () => {
    switch (exportFormat) {
        case ExportFormat.MD:
            content += "\n---\n\n";
            break;
        case ExportFormat.TXT:
        case ExportFormat.AI_PROMPT:
            content += "\n--------------------------------------------------\n\n";
            break;
        case ExportFormat.HTML:
            content += "<hr class=\"section-divider print-hidden\" />\n\n";
            break;
        default: {
            const _exhaustiveCheck: never = exportFormat;
            console.error(`FATAL: Unhandled export format in addDivider: ${_exhaustiveCheck}`);
            throw new Error(`FATAL: Unhandled export format: ${_exhaustiveCheck}`);
          }
    }
  };

  if (exportFormat === ExportFormat.HTML) {
    content += `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Process Automation Report: ${escapeHtml(generalModuleName || 'Overall')}</title>\n${htmlStyles}\n</head>\n<body>\n<div class="container">\n`;
    content += formatSectionTitleHtml(`Process Automation - Report for ${escapeHtml(customerCompany) || 'Client'}`, 1, true);
    content += formatFieldHtml("Customer Company", customerCompany || "N/A");
    content += formatFieldHtml("Customer Contact", customerName || "N/A");
    content += formatFieldHtml("Date Prepared", dateCompleted);
    content += formatFieldHtml("Role", selectedRole);
    content += formatFieldHtml("Automation Type (Overall App State)", state.selectedAutomationType);
    content += formatFieldHtml("Currently Selected Module (for other tabs)", generalModuleName);
  } else {
    const nonHtmlFormat = exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT;
    content += formatSectionTitleTextMd(`Process Automation - Report for ${customerCompany || 'Client'}`, 1, nonHtmlFormat);
    content += formatFieldTextMd("Customer Company", customerCompany || "N/A", nonHtmlFormat);
    content += formatFieldTextMd("Customer Contact", customerName || "N/A", nonHtmlFormat);
    content += formatFieldTextMd("Date Prepared", dateCompleted, nonHtmlFormat);
    content += formatFieldTextMd("Role", selectedRole, nonHtmlFormat);
    content += formatFieldTextMd("Automation Type (Overall App State)", state.selectedAutomationType, nonHtmlFormat);
    content += formatFieldTextMd("Currently Selected Module (for other tabs)", generalModuleName, nonHtmlFormat);
  }
  addDivider();

  const visibleTabsMetadata = TAB_METADATA.filter(tab => tab.roles.includes(selectedRole) && tab.id !== TabId.HOME && tab.id !== TabId.HELP);

  visibleTabsMetadata.forEach(tabInfo => {
    if (tabInfo.id === TabId.SOLUTION_BUILDER) {
        content += formatSolutionBuilderContent(state, exportFormat);
    } else {
        if (exportFormat === ExportFormat.HTML) {
            content += formatSectionTitleHtml(tabInfo.label, 2);
        } else {
            const nonHtmlFormat = exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT;
            content += formatSectionTitleTextMd(tabInfo.label, 2, nonHtmlFormat);
        }
        
        switch (tabInfo.id) {
          case TabId.CUSTOMER_CONVERSATIONS:
            const { exchanges, currentAutomationFocus, followUpDetails, generalNotes } = state.customerConversations;
            if (exportFormat === ExportFormat.HTML) {
                content += formatCustomerConversationExchangesHtml(exchanges);
                content += `<h3 class="subsection-title">Follow-up Details</h3>`;
                content += formatFieldHtml("Interest Confirmed for Follow-up", followUpDetails.interestConfirmed === null ? "N/A" : (followUpDetails.interestConfirmed ? "Yes" : "No"));
                content += formatFieldHtml("Follow-up Contact Name", followUpDetails.contactName);
                content += formatFieldHtml("Follow-up Contact Email", followUpDetails.contactEmail);
                content += formatFieldHtml("Meeting Date", followUpDetails.meetingDate);
                content += formatFieldHtml("Meeting Time", followUpDetails.meetingTime);
                content += formatFieldHtml("Specialist Needed For", followUpDetails.specialistNeeded || "N/A");
                content += `<div><span class="field-label">Follow-up Notes:</span> <div class="field-value" style="margin-top:5px; padding:8px; background-color:#f0f0f0; border-radius:4px; white-space: pre-wrap;">${followUpDetails.notes ? nl2br(escapeHtml(followUpDetails.notes)) : '<span class="note">None</span>'}</div></div>`;
                content += `<h3 class="subsection-title" style="margin-top:1.5em;">Overall Conversation Notes</h3>`;
                content += `<div style="padding:10px; background-color:#f0f0f0; border-radius:4px; white-space: pre-wrap;">${generalNotes ? nl2br(escapeHtml(generalNotes)) : '<span class="note">No general notes recorded.</span>'}</div>`;
            } else {
                const nonHtmlFormat = exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT;
                content += formatCustomerConversationExchangesTextMd(exchanges, nonHtmlFormat);
                content += formatSectionTitleTextMd("Follow-up Details", 3, nonHtmlFormat);
                content += formatFieldTextMd("Interest Confirmed for Follow-up", followUpDetails.interestConfirmed === null ? "N/A" : (followUpDetails.interestConfirmed ? "Yes" : "No"), nonHtmlFormat, "  ");
                content += formatFieldTextMd("Follow-up Contact Name", followUpDetails.contactName, nonHtmlFormat, "  ");
                content += formatFieldTextMd("Follow-up Contact Email", followUpDetails.contactEmail, nonHtmlFormat, "  ");
                content += formatFieldTextMd("Meeting Date", followUpDetails.meetingDate, nonHtmlFormat, "  ");
                content += formatFieldTextMd("Meeting Time", followUpDetails.meetingTime, nonHtmlFormat, "  ");
                content += formatFieldTextMd("Specialist Needed For", followUpDetails.specialistNeeded || "N/A", nonHtmlFormat, "  ");
                content += formatFieldTextMd("Follow-up Notes", followUpDetails.notes || "None", nonHtmlFormat, "  ");
                content += formatSectionTitleTextMd("Overall Conversation Notes", 3, nonHtmlFormat);
                content += `${generalNotes ? generalNotes : 'No general notes recorded.'}\n`;
            }
            break;

          case TabId.OPPORTUNITY_SCORECARD:
            SCORECARD_QUESTIONS.forEach(q => { 
              const answer = state.opportunityScorecard.answers[q.id] || "";
              let answerText = "Not answered";
              if (answer === "yes") answerText = "Yes (20 pts)";
              else if (answer === "no") answerText = "No (0 pts)";
              else if (answer === "unsure") answerText = "Unsure (0 pts)";
              content += exportFormat === ExportFormat.HTML ? formatFieldHtml(q.text, answerText) : formatFieldTextMd(q.text, answerText, exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT);
            });
            content += exportFormat === ExportFormat.HTML ? formatFieldHtml("Total Score", `${state.opportunityScorecard.totalScore} / 100`) : formatFieldTextMd("Total Score", `${state.opportunityScorecard.totalScore} / 100`, exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT);
            break;

          case TabId.QUALIFICATION:
            const nonHtmlFormatQual = exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT;
            if (exportFormat === ExportFormat.HTML) {
                content += "<h3 class=\"subsection-title\">Qualitative Assessment</h3>\n";
                qualQualQuestions.forEach(q => { 
                    const answerValue = state.qualification.qualitative.answers[q.id];
                    const selectedOption = q.options.find(opt => opt.value === answerValue);
                    content += formatFieldHtml(q.text, selectedOption ? selectedOption.label : "Not answered");
                });
                content += formatFieldHtml("Score", state.qualification.qualitative.score);
                content += formatFieldHtml("Status", `<span class="status status-${state.qualification.qualitative.status.toUpperCase().replace(/\s/g, '_')}">${state.qualification.qualitative.status}</span>`);
                
                content += "<h3 class=\"subsection-title\">Quantitative Assessment</h3>\n";
                qualQuantQuestions.forEach(q => { 
                    const answerValue = state.qualification.quantitative.answers[q.id];
                    const selectedOption = q.options.find(opt => opt.value === answerValue);
                    content += formatFieldHtml(q.text, selectedOption ? selectedOption.label : "Not answered");
                });
                content += formatFieldHtml("Score", state.qualification.quantitative.score);
                content += formatFieldHtml("Status", `<span class="status status-${state.qualification.quantitative.status.toUpperCase().replace(/\s/g, '_')}">${state.qualification.quantitative.status}</span>`);

                content += "<h3 class=\"subsection-title\">Admin Settings (Thresholds)</h3>\n";
                content += formatFieldHtml("Qualified if Score >", state.qualification.adminSettings.thresholds.qualified);
                content += formatFieldHtml("Clarification Required if Score >", state.qualification.adminSettings.thresholds.clarification);
            } else { 
                content += formatSectionTitleTextMd("Qualitative Assessment", 3, nonHtmlFormatQual);
                qualQualQuestions.forEach(q => { 
                  const answerValue = state.qualification.qualitative.answers[q.id];
                  const selectedOption = q.options.find(opt => opt.value === answerValue);
                  content += formatFieldTextMd(q.text, selectedOption ? selectedOption.label : "Not answered", nonHtmlFormatQual, "  ");
                });
                content += formatFieldTextMd("Score", state.qualification.qualitative.score, nonHtmlFormatQual, "  ");
                content += formatFieldTextMd("Status", state.qualification.qualitative.status, nonHtmlFormatQual, "  ");
                content += "\n";

                content += formatSectionTitleTextMd("Quantitative Assessment", 3, nonHtmlFormatQual);
                qualQuantQuestions.forEach(q => { 
                  const answerValue = state.qualification.quantitative.answers[q.id];
                  const selectedOption = q.options.find(opt => opt.value === answerValue);
                  content += formatFieldTextMd(q.text, selectedOption ? selectedOption.label : "Not answered", nonHtmlFormatQual, "  ");
                });
                content += formatFieldTextMd("Score", state.qualification.quantitative.score, nonHtmlFormatQual, "  ");
                content += formatFieldTextMd("Status", state.qualification.quantitative.status, nonHtmlFormatQual, "  ");
                content += "\n";
                
                content += formatSectionTitleTextMd("Admin Settings (Thresholds)", 3, nonHtmlFormatQual);
                content += formatFieldTextMd("Qualified if Score >", state.qualification.adminSettings.thresholds.qualified, nonHtmlFormatQual, "  ");
                content += formatFieldTextMd("Clarification Required if Score >", state.qualification.adminSettings.thresholds.clarification, nonHtmlFormatQual, "  ");
            }
            break;

          case TabId.DISCOVERY_QUESTIONS:
            if (selectedModuleId && state.discoveryQuestions[selectedModuleId]) {
              const moduleDiscovery = state.discoveryQuestions[selectedModuleId];
              content += exportFormat === ExportFormat.HTML 
                ? formatDiscoveryAnswersHtml(moduleDiscovery.qualitative, "Qualitative") + formatDiscoveryAnswersHtml(moduleDiscovery.quantitative, "Quantitative")
                : formatDiscoveryAnswersTextMd(moduleDiscovery.qualitative, "Qualitative", exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT) + formatDiscoveryAnswersTextMd(moduleDiscovery.quantitative, "Quantitative", exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT);
            } else {
              content += exportFormat === ExportFormat.HTML ? "<p class=\"note\">No module selected for Discovery or no data available for this section of the report.</p>\n" : "No module selected for Discovery or no data available for this section of the report.\n";
            }
            break;

          case TabId.ROI_CALCULATOR:
            if (selectedModuleId && state.roiCalculator[selectedModuleId]) {
              const moduleRoiData = state.roiCalculator[selectedModuleId];
              content += exportFormat === ExportFormat.HTML 
                ? formatRoiResultsHtml(moduleRoiData.results, moduleRoiData, generalModuleName) 
                : formatRoiResultsTextMd(moduleRoiData.results, exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT, moduleRoiData);
            } else {
              content += exportFormat === ExportFormat.HTML ? "<p class=\"note\">No module selected for ROI or no data available for this section of the report.</p>\n" : "No module selected for ROI or no data available for this section of the report.\n";
            }
            break;
        case TabId.PAIN_POINTS:
            if (exportFormat === ExportFormat.HTML) {
                content += `<h3 class="subsection-title">Pain Point Discovery Mode: ${state.painPoints.activeMode}</h3>`;
                if (state.painPoints.activeMode === PainPointMode.WATERFALL) {
                    content += "<h4>Waterfall Conversation Log:</h4>";
                    if (state.painPoints.waterfallConversationLog.length > 0) {
                        content += "<ul>";
                        state.painPoints.waterfallConversationLog.forEach(log => {
                            content += `<li><strong>${log.type}:</strong> ${escapeHtml(log.text)} ${log.details ? `<em>(${escapeHtml(log.details)})</em>` : ''}</li>`;
                        });
                        content += "</ul>";
                    } else {
                        content += "<p class=\"note\">No waterfall conversation logged.</p>";
                    }
                } else if (state.painPoints.activeMode === PainPointMode.REVERSE_WATERFALL && state.painPoints.selectedProductForCheatSheet) {
                    const cheatSheet = REVERSE_WATERFALL_CHEAT_SHEETS[state.painPoints.selectedProductForCheatSheet];
                    const productName = ALL_MODULES.find(m => m.id === state.painPoints.selectedProductForCheatSheet)?.name || "Selected Product";
                    content += `<h4>Reverse Waterfall Cheat Sheet for: ${escapeHtml(productName)}</h4>`;
                    if (cheatSheet) {
                        content += `<p><strong>Objective:</strong> ${escapeHtml(cheatSheet.objective)}</p>`;
                        content += `<p><strong>High-Level Pain:</strong> ${escapeHtml(cheatSheet.highLevelPain)}</p>`;
                        content += `<p><strong>Specific Process Pain:</strong> ${escapeHtml(cheatSheet.specificProcessPain)}</p>`;
                        content += "<h5>Key Discovery Points:</h5><ul>";
                        cheatSheet.keyDiscoveryPoints.forEach(kd => {
                            content += `<li><strong>Q:</strong> ${escapeHtml(kd.question)} <br/>&nbsp;&nbsp;&nbsp;<em>Aligning A: ${escapeHtml(kd.aligningAnswer)}</em></li>`;
                        });
                        content += "</ul>";
                    } else {
                        content += "<p class=\"note\">Cheat sheet not available for selected product.</p>";
                    }
                }
            } else { // MD/TXT/AI_PROMPT
                const nonHtmlPpFormat = exportFormat as ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT;
                content += formatSectionTitleTextMd(`Pain Point Discovery Mode: ${state.painPoints.activeMode}`, 3, nonHtmlPpFormat);
                if (state.painPoints.activeMode === PainPointMode.WATERFALL) {
                    content += nonHtmlPpFormat === ExportFormat.MD ? "#### Waterfall Conversation Log:\n" : "WATERFALL CONVERSATION LOG:\n";
                    if (state.painPoints.waterfallConversationLog.length > 0) {
                        state.painPoints.waterfallConversationLog.forEach(log => {
                            content += `${nonHtmlPpFormat === ExportFormat.MD ? `- **${log.type}:**` : `  ${log.type}:`} ${log.text} ${log.details ? `(${log.details})` : ''}\n`;
                        });
                    } else {
                        content += "  No waterfall conversation logged.\n";
                    }
                } else if (state.painPoints.activeMode === PainPointMode.REVERSE_WATERFALL && state.painPoints.selectedProductForCheatSheet) {
                    const cheatSheet = REVERSE_WATERFALL_CHEAT_SHEETS[state.painPoints.selectedProductForCheatSheet];
                    const productName = ALL_MODULES.find(m => m.id === state.painPoints.selectedProductForCheatSheet)?.name || "Selected Product";
                    content += `${nonHtmlPpFormat === ExportFormat.MD ? '####' : ''} Reverse Waterfall Cheat Sheet for: ${productName}\n`;
                     if (cheatSheet) {
                        content += `${nonHtmlPpFormat === ExportFormat.MD ? '**Objective:**' : 'Objective:'} ${cheatSheet.objective}\n`;
                        content += `${nonHtmlPpFormat === ExportFormat.MD ? '**High-Level Pain:**' : 'High-Level Pain:'} ${cheatSheet.highLevelPain}\n`;
                        content += `${nonHtmlPpFormat === ExportFormat.MD ? '**Specific Process Pain:**' : 'Specific Process Pain:'} ${cheatSheet.specificProcessPain}\n`;
                        content += `${nonHtmlPpFormat === ExportFormat.MD ? '##### Key Discovery Points:\n' : 'Key Discovery Points:\n'}`;
                        cheatSheet.keyDiscoveryPoints.forEach(kd => {
                            content += `${nonHtmlPpFormat === ExportFormat.MD ? '  - **Q:**' : '  Q:'} ${kd.question}\n`;
                            content += `${nonHtmlPpFormat === ExportFormat.MD ? '    *Aligning A:*' : '    Aligning A:'} ${kd.aligningAnswer}\n`;
                        });
                    } else {
                        content += "  Cheat sheet not available for selected product.\n";
                    }
                }
            }
            content += "\n";
            break;
          default: {
            // This default should ideally not be reached if all TabIds in visibleTabsMetadata are handled.
            const _exhaustiveCheck: never = tabInfo.id;
            console.error(`Unhandled TabId in generateExportContent loop: ${_exhaustiveCheck}`);
            // Optionally, add a placeholder to content:
            // content += `Data for tab '${tabInfo.label}' not implemented in export.\n`;
            break;
          }
        }
    }
    if (tabInfo.id !== TabId.SOLUTION_BUILDER) { 
        addDivider();
    }
  });

  if (exportFormat === ExportFormat.HTML) {
    content += "\n</div>\n</body>\n</html>";
  } else if (exportFormat === ExportFormat.AI_PROMPT) {
    content += "\n\n==== END OF DATA ====\nReview the above data and provide a summary or answer questions based on it.";
  }
  return content;
};