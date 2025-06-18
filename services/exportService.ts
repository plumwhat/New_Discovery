

import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat, RequirementBlock, TabMetadata, PainPointLevel1Pain, EditableReverseWaterfallCheatSheets, QualificationQuestion, EditableDiscoveryQuestionsTemplates, EditableModuleSolutionContentMap, DiscoveryQuestion, ConversationExchange, ConversationStepId, AutomationType, CustomerConversationState, PainPointMode, QualificationQuestionOption, ModuleQualificationQuestions } from '../types';
import { 
    SCORECARD_QUESTIONS, 
    QUALIFICATION_QUESTIONS_BY_MODULE, // Corrected import
    DISCOVERY_QUESTIONS_TEMPLATES, 
    TAB_METADATA, 
    ALL_MODULES, 
    MODULE_SPECIFIC_SOLUTION_CONTENT, 
    RESELLER_COMPANY_NAME,  
    PAIN_POINT_HIERARCHY, 
    REVERSE_WATERFALL_CHEAT_SHEETS,
    FINANCE_MODULES,
    BUSINESS_MODULES,
    MODULE_INFOGRAPHICS_HTML,
    DEFAULT_QUALIFICATION_THRESHOLDS,
    ROI_INPUT_TEMPLATES,
    initialPainPointsState,
    initialCustomerConversationState
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
        // No default needed as ExportFormat union type ensures exhaustiveness if strictNullChecks is on.
        // If not, a default can be added:
        default:
            // const _exhaustiveCheck: never = format; // This line causes an error if format is not exhaustive
            console.warn(`Unhandled format in formatSectionTitleTextMd: ${format}`);
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

  /* Infographic specific styles if not already covered by Tailwind in the infographic HTML itself */
  .infographic-section-export { margin-top: 2em; margin-bottom: 2em; padding: 1em; border: 1px dashed #0078D4; border-radius: 8px; background-color: #f0f8ff; }
  .infographic-section-export .infographic-body { background-color: transparent !important; /* Override if infographic has its own body bg */ }


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
    .infographic-section-export { border: none; padding: 0; margin-top: 1em; margin-bottom: 1em; background-color: #fff; }
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

// Renamed from formatSolutionBuilderContent and completed
export const generateSolutionDocumentContent = (
    appState: AppState,
    format: ExportFormat.HTML | ExportFormat.MD // Specific for solution doc
): string => {
    const { solutionBuilder, roiCalculator, customerCompany, customerName, dateCompleted, selectedModuleId: appSelectedModuleId } = appState;
    const { selectedCoreModuleId, requirementBlocks } = solutionBuilder;

    const coreModule = getModuleById(selectedCoreModuleId);
    const coreModuleName = coreModule?.name || "N/A";

    const moduleContentDef = MODULE_SPECIFIC_SOLUTION_CONTENT[selectedCoreModuleId || 'default'] || MODULE_SPECIFIC_SOLUTION_CONTENT.default;
    const partnerDisplayName = moduleContentDef.technologyPartnerName;

    const executiveSummaryText = moduleContentDef.executiveSummaryBoilerplate
        .replace(/{partnerName}/g, partnerDisplayName)
        .replace(/{moduleName}/g, coreModuleName);
    const solutionOverviewTextContent = moduleContentDef.solutionOverviewDetails
        .replace(/{partnerName}/g, partnerDisplayName)
        .replace(/{moduleName}/g, coreModuleName);
    const coreElementsList = moduleContentDef.coreElements.map((template: string) =>
        template.replace(/{partnerName}/g, partnerDisplayName).replace(/{moduleName}/g, coreModuleName)
    );

    const roiData: RoiResults | null = (selectedCoreModuleId && roiCalculator[selectedCoreModuleId]?.results)
                                        ? roiCalculator[selectedCoreModuleId]!.results
                                        : null;
    const moduleRoiDataForExport = selectedCoreModuleId ? roiCalculator[selectedCoreModuleId] : undefined;

    let content = "";

    if (format === ExportFormat.HTML) {
        content += `<html><head><title>Solution Proposal for ${escapeHtml(coreModuleName)}</title>${htmlStyles}</head><body><div class="container">\n`;
        content += formatSectionTitleHtml(`Solution Proposal for ${coreModuleName}`, 1, true);
        content += `<div class="field"><span class="field-label">Prepared for:</span> <span class="field-value">${escapeHtml(customerCompany || "Valued Client")}</span></div>`;
        content += `<div class="field"><span class="field-label">Date:</span> <span class="field-value">${escapeHtml(dateCompleted)}</span></div>`;
        content += `<div class="field"><span class="field-label">Prepared by:</span> <span class="field-value">${escapeHtml(RESELLER_COMPANY_NAME)}</span></div>\n`;
        
        content += formatSectionTitleHtml("Executive Summary", 2);
        // Assuming executiveSummaryText from constants might contain HTML, so nl2br and direct injection
        content += `<div class="prose">${nl2br(executiveSummaryText)}</div>`; 
        if (roiData) {
          content += `<p class="mt-2 text-sm">Key financial projections include: Total Annual Gross Savings of <span class="currency">${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}</span>, Overall ROI of <span class="font-bold">${roiData.overallRoiPercentage.toFixed(1)}%</span> over ${roiData.solutionLifespanYears} years, and a Payback Period of approximately <span class="font-bold">${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}</span>.</p>`;
        }


        content += formatSectionTitleHtml("Overview of the Proposed Solution", 2);
        // Assuming solutionOverviewTextContent from constants *is* HTML.
        content += `<div class="prose solution-overview-details">${solutionOverviewTextContent}</div>`; 

        if (selectedCoreModuleId && MODULE_INFOGRAPHICS_HTML[selectedCoreModuleId]) {
            content += `<div class="infographic-section-export">`;
            content += formatSectionTitleHtml(`Module Insights: ${coreModuleName}`, 3);
            let infographicHtml = MODULE_INFOGRAPHICS_HTML[selectedCoreModuleId];
            // Remove script tags when embedding, as they might not execute correctly or are for standalone viewing.
            infographicHtml = infographicHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "<!-- Chart scripts removed for embedded view. View original HTML for interactive charts. -->");
            content += infographicHtml;
            content += `</div>`;
        }

        content += formatSectionTitleHtml("Detailed Customer Solution & Requirements", 2);
        content += `<h3>Core Module: ${escapeHtml(coreModuleName)}</h3>`;
        if (coreElementsList.length > 0) {
            content += "<ul class=\"core-module-elements list-disc pl-5\">";
            coreElementsList.forEach(el => content += `<li>${escapeHtml(el)}</li>`);
            content += "</ul>";
        }

        if (requirementBlocks.length > 0) {
            content += "<h4>Specific Requirements & Solutions:</h4>";
            requirementBlocks.forEach((block, index) => {
                content += `<div class="requirement-block-export"><h4>Requirement Block ${index + 1}</h4>`;
                content += `<p><strong>Requirement:</strong> ${nl2br(escapeHtml(block.requirement))}</p>`;
                content += `<p><strong>Solution:</strong> ${nl2br(escapeHtml(block.solution))}</p></div>`;
            });
        }

        if (roiData) {
            content += formatSectionTitleHtml(`Expected Business Outcomes & ROI Highlights for ${coreModuleName}`, 2);
            content += formatRoiResultsHtml(roiData, moduleRoiDataForExport, coreModuleName);
        }
        content += `<p class="mt-6 text-xs text-gray-500 text-center">Document generated by Process Automation Engagement Platform for ${RESELLER_COMPANY_NAME}.</p>`;
        content += "</div></body></html>";
    } else { // MD Format (TXT is not typical for this specific document)
        content += formatSectionTitleTextMd(`Solution Proposal for ${coreModuleName}`, 1, ExportFormat.MD);
        content += formatFieldTextMd("Prepared for", customerCompany || "Valued Client", ExportFormat.MD);
        content += formatFieldTextMd("Date", dateCompleted, ExportFormat.MD);
        content += formatFieldTextMd("Prepared by", RESELLER_COMPANY_NAME, ExportFormat.MD);
        content += "\n";

        content += formatSectionTitleTextMd("Executive Summary", 2, ExportFormat.MD);
        content += stripHtml(executiveSummaryText) + "\n\n";
         if (roiData) {
          content += `Key financial projections include: Total Annual Gross Savings of ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}, Overall ROI of ${roiData.overallRoiPercentage.toFixed(1)}% over ${roiData.solutionLifespanYears} years, and a Payback Period of approximately ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}.\n\n`;
        }

        content += formatSectionTitleTextMd("Overview of the Proposed Solution", 2, ExportFormat.MD);
        content += stripHtml(solutionOverviewTextContent) + "\n\n";
        // Infographics are typically not well represented in Markdown. Could add a note.
        if (selectedCoreModuleId && MODULE_INFOGRAPHICS_HTML[selectedCoreModuleId]) {
            content += `(Note: A visual infographic for ${coreModuleName} is available in the HTML export or within the application.)\n\n`;
        }


        content += formatSectionTitleTextMd("Detailed Customer Solution & Requirements", 2, ExportFormat.MD);
        content += `**Core Module:** ${coreModuleName}\n`;
        if (coreElementsList.length > 0) {
            coreElementsList.forEach(el => content += `  - ${stripHtml(el)}\n`);
            content += "\n";
        }

        if (requirementBlocks.length > 0) {
            content += "**Specific Requirements & Solutions:**\n";
            requirementBlocks.forEach((block, index) => {
                content += `  **Requirement Block ${index + 1}:**\n`;
                content += `    - Requirement: ${stripHtml(block.requirement)}\n`;
                content += `    - Solution: ${stripHtml(block.solution)}\n`;
            });
            content += "\n";
        }

        if (roiData) {
            content += formatSectionTitleTextMd(`Expected Business Outcomes & ROI Highlights for ${coreModuleName}`, 2, ExportFormat.MD);
            content += formatRoiResultsTextMd(roiData, ExportFormat.MD, moduleRoiDataForExport);
        }
        content += `\n\n---\n*Document generated by Process Automation Engagement Platform for ${RESELLER_COMPANY_NAME}.*`;
    }
    return content;
};


export const triggerDownload = (content: string, filename: string, formatOrMimeType: ExportFormat | 'html' | 'md' | 'txt' | string): void => {
    let mimeType = 'text/plain';
    if (formatOrMimeType === ExportFormat.HTML || formatOrMimeType === 'html') {
        mimeType = 'text/html';
    } else if (formatOrMimeType === ExportFormat.MD || formatOrMimeType === 'md') {
        mimeType = 'text/markdown';
    } else if (typeof formatOrMimeType === 'string' && formatOrMimeType.includes('/')) {
        mimeType = formatOrMimeType; // Assume it's a full MIME type if it contains '/'
    }
    // TXT, AI_PROMPT and other ExportFormat enums not explicitly handled will default to text/plain

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};

export const generateExportContent = (appState: AppState): string => {
    const {
        customerCompany, customerName, dateCompleted, selectedRole,
        selectedAutomationType, selectedModuleId, activeTab,
        opportunityScorecard, qualification, discoveryQuestions,
        roiCalculator, solutionBuilder, painPoints, customerConversations,
        exportFormat
    } = appState;

    const currentModule = getModuleById(selectedModuleId);
    const moduleName = currentModule?.name || "N/A";
    const automationType = selectedAutomationType || "N/A";
    const isHtml = exportFormat === ExportFormat.HTML;
    
    const currentTextMdFormat: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT = 
        exportFormat === ExportFormat.AI_PROMPT ? ExportFormat.AI_PROMPT : 
        (exportFormat === ExportFormat.MD ? ExportFormat.MD : ExportFormat.TXT);

    let content = isHtml ? `<html><head><title>Export Report - ${escapeHtml(customerCompany || "Client")}</title>${htmlStyles}</head><body><div class="container">\n` : "";
    
    if (isHtml) {
        content += formatSectionTitleHtml("Process Automation Engagement Report", 1, true);
        content += formatSectionTitleHtml("Engagement Details", 2, false);
    } else {
        content += formatSectionTitleTextMd("PROCESS AUTOMATION ENGAGEMENT REPORT", 1, currentTextMdFormat);
        content += formatSectionTitleTextMd("Engagement Details", 2, currentTextMdFormat);
    }
    
    if (isHtml) {
        content += formatFieldHtml("Customer Company", customerCompany, false);
        content += formatFieldHtml("Customer Contact Name", customerName, false);
        content += formatFieldHtml("Date Completed", dateCompleted, false);
        content += formatFieldHtml("Role", selectedRole, false);
        content += formatFieldHtml("Selected Automation Type", automationType, false);
        content += formatFieldHtml("Selected Module (Primary Focus)", moduleName, false);
    } else {
        content += formatFieldTextMd("Customer Company", customerCompany, currentTextMdFormat);
        content += formatFieldTextMd("Customer Contact Name", customerName, currentTextMdFormat);
        content += formatFieldTextMd("Date Completed", dateCompleted, currentTextMdFormat);
        content += formatFieldTextMd("Role", selectedRole, currentTextMdFormat);
        content += formatFieldTextMd("Selected Automation Type", automationType, currentTextMdFormat);
        content += formatFieldTextMd("Selected Module (Primary Focus)", moduleName, currentTextMdFormat);
    }
    content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";

    // Customer Conversations
    if (Object.keys(customerConversations.exchanges).length > 0 || customerConversations.generalNotes) {
        if (isHtml) {
            content += formatSectionTitleHtml("Customer Conversation Log", 2, false);
        } else {
            content += formatSectionTitleTextMd("Customer Conversation Log", 2, currentTextMdFormat);
        }
        content += generateCustomerConversationExportContent(customerConversations, customerCompany, dateCompleted, exportFormat);
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }
    
    // Pain Points
    if (painPoints.waterfallConversationLog.length > 0 || (painPoints.activeMode === PainPointMode.REVERSE_WATERFALL && painPoints.selectedProductForCheatSheet)) {
        if (isHtml) {
            content += formatSectionTitleHtml("Pain Point Discovery", 2, false);
        } else {
            content += formatSectionTitleTextMd("Pain Point Discovery", 2, currentTextMdFormat);
        }
        content += isHtml ? `<h4>Mode: ${escapeHtml(painPoints.activeMode)}</h4>` : `**Mode:** ${painPoints.activeMode}\n`;

        if (painPoints.activeMode === PainPointMode.WATERFALL && painPoints.waterfallConversationLog.length > 0) {
            content += isHtml ? "<h5>Waterfall Log:</h5><ul>" : "**Waterfall Log:**\n";
            painPoints.waterfallConversationLog.forEach(log => {
                const logText = `Type: ${log.type}, Text: ${log.text}${log.details ? `, Details: ${log.details}` : ''}`;
                content += isHtml ? `<li>${escapeHtml(logText)}</li>` : `- ${logText}\n`;
            });
            content += isHtml ? "</ul>" : "";
        } else if (painPoints.activeMode === PainPointMode.REVERSE_WATERFALL && painPoints.selectedProductForCheatSheet) {
            const cheatSheet = REVERSE_WATERFALL_CHEAT_SHEETS[painPoints.selectedProductForCheatSheet];
            const product = ALL_MODULES.find(m => m.id === painPoints.selectedProductForCheatSheet);
            content += isHtml ? `<h5>Cheat Sheet for: ${escapeHtml(product?.name || '')}</h5>` : `**Cheat Sheet for: ${product?.name || ''}**\n`;
            if (cheatSheet) {
                content += isHtml ? `<p><em>Objective: ${escapeHtml(cheatSheet.objective)}</em></p><ul>` : `*Objective: ${cheatSheet.objective}*\n`;
                cheatSheet.keyDiscoveryPoints.forEach(p => {
                    const pointText = `Q: ${p.question} -> Aligning A: ${p.aligningAnswer}`;
                    content += isHtml ? `<li>${escapeHtml(pointText)}</li>` : `- ${pointText}\n`;
                });
                content += isHtml ? "</ul>" : "";
            }
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }

    // Opportunity Scorecard
    if (Object.keys(opportunityScorecard.answers).length > 0) {
        if (isHtml) {
            content += formatSectionTitleHtml("Opportunity Scorecard", 2, false);
        } else {
            content += formatSectionTitleTextMd("Opportunity Scorecard", 2, currentTextMdFormat);
        }
        SCORECARD_QUESTIONS.forEach(q => {
            const answer = opportunityScorecard.answers[q.id] || "Not answered";
            if (isHtml) {
                content += formatFieldHtml(q.text, answer, false);
            } else {
                content += formatFieldTextMd(q.text, answer, currentTextMdFormat);
            }
        });
        if (isHtml) {
            content += formatFieldHtml("Total Score", `${opportunityScorecard.totalScore} / 100`, false);
        } else {
            content += formatFieldTextMd("Total Score", `${opportunityScorecard.totalScore} / 100`, currentTextMdFormat);
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }

    // Qualification
    const { qualitative, quantitative } = qualification;
    const moduleQualQuestions: ModuleQualificationQuestions = selectedModuleId && QUALIFICATION_QUESTIONS_BY_MODULE[selectedModuleId]
        ? QUALIFICATION_QUESTIONS_BY_MODULE[selectedModuleId]
        : QUALIFICATION_QUESTIONS_BY_MODULE.default;

    if (Object.keys(qualitative.answers).length > 0 || Object.keys(quantitative.answers).length > 0) {
        if (isHtml) {
            content += formatSectionTitleHtml("Qualification Assessment", 2, false);
            content += formatSectionTitleHtml("Qualitative Assessment", 3, false);
        } else {
            content += formatSectionTitleTextMd("Qualification Assessment", 2, currentTextMdFormat);
            content += formatSectionTitleTextMd("Qualitative Assessment", 3, currentTextMdFormat);
        }
        
        moduleQualQuestions.qualitative.forEach(q => {
            const questionText = moduleName !== "N/A" ? q.text.replace(/\[Module Name\]/g, moduleName) : q.text;
            const answerValue = qualitative.answers[q.id];
            const answerOpt = q.options.find(opt => opt.value === answerValue);
            if (isHtml) {
                content += formatFieldHtml(questionText, answerOpt ? answerOpt.label : "Not answered", false);
            } else {
                content += formatFieldTextMd(questionText, answerOpt ? answerOpt.label : "Not answered", currentTextMdFormat);
            }
        });
        if (isHtml) {
            content += formatFieldHtml("Qualitative Score", `${qualitative.score} (Status: ${qualitative.status})`, false);
        } else {
            content += formatFieldTextMd("Qualitative Score", `${qualitative.score} (Status: ${qualitative.status})`, currentTextMdFormat);
        }
        content += "\n";

        if (isHtml) {
            content += formatSectionTitleHtml("Quantitative Assessment", 3, false);
        } else {
            content += formatSectionTitleTextMd("Quantitative Assessment", 3, currentTextMdFormat);
        }
        moduleQualQuestions.quantitative.forEach(q => {
            const questionText = moduleName !== "N/A" ? q.text.replace(/\[Module Name\]/g, moduleName) : q.text;
            const answerValue = quantitative.answers[q.id];
            const answerOpt = q.options.find(opt => opt.value === answerValue);
            if (isHtml) {
                content += formatFieldHtml(questionText, answerOpt ? answerOpt.label : "Not answered", false);
            } else {
                content += formatFieldTextMd(questionText, answerOpt ? answerOpt.label : "Not answered", currentTextMdFormat);
            }
        });
        if (isHtml) {
            content += formatFieldHtml("Quantitative Score", `${quantitative.score} (Status: ${quantitative.status})`, false);
        } else {
            content += formatFieldTextMd("Quantitative Score", `${quantitative.score} (Status: ${quantitative.status})`, currentTextMdFormat);
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }

    // Discovery Questions (for selected module)
    if (selectedModuleId && discoveryQuestions[selectedModuleId]) {
        const moduleDiscovery = discoveryQuestions[selectedModuleId];
        const currentModuleName = getModuleById(selectedModuleId)?.name || "Selected Module";
        if (isHtml) {
            content += formatSectionTitleHtml(`Discovery Insights for ${currentModuleName}`, 2, false);
            content += formatDiscoveryAnswersHtml(moduleDiscovery.qualitative, "Qualitative");
            content += formatDiscoveryAnswersHtml(moduleDiscovery.quantitative, "Quantitative");
        } else {
            content += formatSectionTitleTextMd(`Discovery Insights for ${currentModuleName}`, 2, currentTextMdFormat);
            content += formatDiscoveryAnswersTextMd(moduleDiscovery.qualitative, "Qualitative", currentTextMdFormat);
            content += formatDiscoveryAnswersTextMd(moduleDiscovery.quantitative, "Quantitative", currentTextMdFormat);
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }
    
    // ROI Calculator (for selected module)
    if (selectedModuleId && roiCalculator[selectedModuleId] && roiCalculator[selectedModuleId].results) {
        const moduleROIs = roiCalculator[selectedModuleId];
        const currentModuleName = getModuleById(selectedModuleId)?.name || "Selected Module";
        if (isHtml) {
            content += formatSectionTitleHtml(`ROI Calculation for ${currentModuleName}`, 2, false);
            content += formatRoiResultsHtml(moduleROIs.results, moduleROIs, currentModuleName);
        } else {
            content += formatSectionTitleTextMd(`ROI Calculation for ${currentModuleName}`, 2, currentTextMdFormat);
            content += formatRoiResultsTextMd(moduleROIs.results, currentTextMdFormat, moduleROIs);
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }

    // Solution Builder
    if (solutionBuilder.selectedCoreModuleId) {
         if (isHtml) {
            content += formatSectionTitleHtml("Solution Proposal Outline", 2, false);
         } else {
            content += formatSectionTitleTextMd("Solution Proposal Outline", 2, currentTextMdFormat);
         }
         // Use the specific solution document generator for this part if format matches
         if (exportFormat === ExportFormat.HTML || exportFormat === ExportFormat.MD) {
             // Embed a simplified version or a summary
             const solutionDocContent = generateSolutionDocumentContent(appState, exportFormat);
             if (isHtml) {
                // For main HTML export, embed the solution doc content directly but simplify it slightly.
                // Or, just provide a link/note if it's too complex to embed cleanly.
                // Here, we embed it.
                content += solutionDocContent.replace(/<html><head>.*?<\/head><body><div class="container">/s, '<div class="solution-proposal-section">')
                                          .replace(/<\/div><\/body><\/html>/s, '</div>');
             } else {
                 content += solutionDocContent; // MD version should be fine as is
             }
         } else { // TXT or AI_PROMPT
             const textSolutionContent = generateSolutionDocumentContent(appState, ExportFormat.MD); // Use MD as base for stripping
             content += stripHtml(textSolutionContent) + "\n\n";
         }
         content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }


    if (exportFormat === ExportFormat.AI_PROMPT) {
        let aiPrompt = "Analyze the following customer engagement data for a process automation opportunity:\n\n";
        aiPrompt += stripHtml(content); // Use a stripped version if HTML was generated
        aiPrompt += "\n\nProvide a summary of the key findings, potential solutions, and recommended next steps. Focus on identifying the strongest automation opportunities and tailor the response for a " + selectedRole + ".";
        content = aiPrompt;
    }

    if (isHtml) content += "</div></body></html>";
    return content;
};


export const generateCustomerConversationExportContent = (
    customerConversations: CustomerConversationState,
    customerCompany: string,
    dateCompleted: string,
    format: ExportFormat = ExportFormat.HTML // Default to HTML if not specified by main export
): string => {
    const { exchanges, currentAutomationFocus, followUpDetails, generalNotes } = customerConversations;

    const isHtml = format === ExportFormat.HTML;
    const currentTextMdFormat: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT = 
        format === ExportFormat.AI_PROMPT ? ExportFormat.AI_PROMPT : 
        (format === ExportFormat.MD ? ExportFormat.MD : ExportFormat.TXT);

    let content = "";

    const title = `Customer Conversation Log - ${customerCompany || "Client"} - ${dateCompleted}`;

    if (isHtml) {
        content += `<html><head><title>${escapeHtml(title)}</title>${htmlStyles}</head><body><div class="container">\n`;
        content += `<h1 class="main-title">${escapeHtml(title)}</h1>\n`;
        content += `<div class="field"><span class="field-label">Overall Automation Focus:</span> <span class="field-value">${escapeHtml(currentAutomationFocus || "Not Determined")}</span></div>\n`;
    } else {
        content += `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`;
        content += `Overall Automation Focus: ${currentAutomationFocus || "Not Determined"}\n\n`;
    }

    exchanges.forEach(ex => {
        if (isHtml) {
            content += `<div class="conversation-exchange">`;
            content += `<p class="step-id"><strong>Step:</strong> ${escapeHtml(ex.stepId)} | <strong>Type:</strong> ${escapeHtml(ex.type)}</p>`;
            content += `<p><span class="prompt-label">${ex.type === 'note' ? 'Note Topic' : 'Prompt/Script'}:</span> <span class="prompt-text">${nl2br(escapeHtml(ex.prompt))}</span></p>`;
            
            if (ex.type === 'question' || (ex.type === 'note' && ex.answer)) {
                content += `<p><span class="answer-label">Answer/Details:</span> <span class="answer-text">${nl2br(escapeHtml(ex.answer))}</span></p>`;
            }
            if (ex.automationFocus) {
                content += `<p class="automation-focus"><em>Automation Focus Inferred: ${escapeHtml(ex.automationFocus)}</em></p>`;
            }
            if (ex.type === 'module_question_group' && ex.modulePrompts) {
                content += `<div class="module-prompt-group">`;
                ex.modulePrompts.forEach(mp => {
                    content += `<div class="module-prompt-item">
                        <p><strong>Module:</strong> ${escapeHtml(mp.moduleName)}</p>
                        <p><strong>Q:</strong> ${nl2br(escapeHtml(mp.promptQuestion))}</p>
                        <p><strong>A:</strong> ${nl2br(escapeHtml(mp.answer) || '<span class="note">No answer recorded</span>')}</p>
                    </div>`;
                });
                content += `</div>`;
            }
             content += `</div>\n`;
        } else { // MD or TXT
            content += `Step: ${ex.stepId} | Type: ${ex.type}\n`;
            content += `${ex.type === 'note' ? 'Note Topic' : 'Prompt/Script'}: ${ex.prompt}\n`;
            if (ex.type === 'question' || (ex.type === 'note' && ex.answer)) {
                content += `Answer/Details: ${ex.answer}\n`;
            }
            if (ex.automationFocus) {
                content += `Automation Focus Inferred: ${ex.automationFocus}\n`;
            }
             if (ex.type === 'module_question_group' && ex.modulePrompts) {
                ex.modulePrompts.forEach(mp => {
                    content += `  Module: ${mp.moduleName}\n`;
                    content += `    Q: ${mp.promptQuestion}\n`;
                    content += `    A: ${mp.answer || 'No answer recorded'}\n`;
                });
            }
            content += `\n---\n`;
        }
    });

    if (followUpDetails.interestConfirmed !== null) {
        const fuText = `Interest Confirmed: ${followUpDetails.interestConfirmed ? 'Yes' : 'No'}\n` +
                       `Contact: ${followUpDetails.contactName} (${followUpDetails.contactEmail})\n` +
                       `Meeting: ${followUpDetails.meetingDate} at ${followUpDetails.meetingTime}\n` +
                       `Specialist: ${followUpDetails.specialistNeeded || 'N/A'}\n` +
                       `Notes: ${followUpDetails.notes || 'None'}`;
        if (isHtml) {
            content += `<h3 class="subsection-title">Follow-Up Details</h3><div class="conversation-exchange"><p>${nl2br(escapeHtml(fuText))}</p></div>\n`;
        } else {
            content += `Follow-Up Details:\n${fuText}\n\n---\n`;
        }
    }

    if (generalNotes) {
         if (isHtml) {
            content += `<h3 class="subsection-title">General Conversation Notes</h3><div class="conversation-exchange"><p>${nl2br(escapeHtml(generalNotes))}</p></div>\n`;
        } else {
            content += `General Conversation Notes:\n${generalNotes}\n\n---\n`;
        }
    }

    if (isHtml) {
        content += "</div></body></html>";
    }
    return content;
};
