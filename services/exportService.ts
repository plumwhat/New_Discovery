

import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat, RequirementBlock, TabMetadata, PainPointLevel1Pain, EditableReverseWaterfallCheatSheets, QualificationQuestion, EditableDiscoveryQuestionsTemplates, EditableModuleSolutionContentMap, DiscoveryQuestion, ConversationExchange, ConversationStepId, ServiceType, CustomerConversationState, PainPointMode, QualificationQuestionOption, ModuleQualificationQuestions, EngagementWorkflowStep, EngagementWorkflowState, EngagementAction } from '../types'; // Renamed AutomationType to ServiceType
import { SCORECARD_QUESTIONS } from '../constants/scorecardConstants';
import { QUALIFICATION_QUESTIONS_BY_MODULE, DEFAULT_QUALIFICATION_THRESHOLDS } from '../constants/qualificationConstants';
import { DISCOVERY_QUESTIONS_TEMPLATES } from '../constants/discoveryConstants';
import { TAB_METADATA } from '../constants/tabConstants';
import { ALL_MODULES, FINANCE_MODULES, BUSINESS_MODULES, ITS_MODULES } from '../constants/moduleConstants'; // Added ITS_MODULES
import { MODULE_SPECIFIC_SOLUTION_CONTENT } from '../constants/solutionContentConstants';
import { RESELLER_COMPANY_NAME } from '../constants/appConfigConstants';
import { PAIN_POINT_HIERARCHY, REVERSE_WATERFALL_CHEAT_SHEETS, initialPainPointsState } from '../constants/painPointConstants';
import { initialCustomerConversationState } from '../constants/initialStateConstants';
import { ROI_INPUT_TEMPLATES } from '../constants/roiConstants';
import { formatCurrency, getPaybackPeriodDisplay } from '../utils/formattingUtils'; 
import { escapeHtml, nl2br, stripHtml } from '../utils/textUtils'; 

/**
 * Retrieves a module object by its ID.
 * @param id - The ID of the module to retrieve.
 * @returns The module object if found, otherwise undefined.
 */
const getModuleById = (id: string | null): Module | undefined => {
    if (!id) return undefined;
    return ALL_MODULES.find(m => m.id === id);
}

/**
 * Formats a numerical value as currency for export.
 * @param value - The numerical value to format.
 * @returns The formatted currency string, or 'N/A' if value is undefined/null.
 */
const formatCurrencyForExport = (value?: number): string => {
    return formatCurrency(value, 'N/A');
};


/**
 * Formats a section title for text-based exports (TXT, MD, AI_PROMPT).
 * @param title - The title string.
 * @param level - The heading level (e.g., 2 for H2).
 * @param format - The export format.
 * @returns The formatted title string.
 */
const formatSectionTitleTextMd = (title: string, level: number = 2, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
    switch (format) {
        case ExportFormat.MD:
            return `${'#'.repeat(level)} ${title}\n\n`;
        case ExportFormat.TXT:
        case ExportFormat.AI_PROMPT:
            return `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`;
        default:
            console.warn(`Unhandled format in formatSectionTitleTextMd: ${format}`);
            return `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`; 
    }
};

/**
 * Formats a field (label-value pair) for text-based exports.
 * @param label - The field label.
 * @param value - The field value.
 * @param format - The export format.
 * @param indent - Optional indentation string.
 * @returns The formatted field string.
 */
const formatFieldTextMd = (label: string, value: string | number | undefined | null, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT, indent: string = ""): string => {
    const valStr = (value !== undefined && value !== null && value !== "") ? value.toString() : 'Not answered';
    if (format === ExportFormat.MD) return `${indent}**${label}:** ${valStr}\n`;
    return `${indent}${label}: ${valStr}\n`;
};

/**
 * Formats discovery questions and answers for text-based exports.
 * @param answers - Array of discovery answers.
 * @param type - The type of discovery insights (e.g., "Qualitative").
 * @param format - The export format.
 * @returns The formatted discovery insights string.
 */
const formatDiscoveryAnswersTextMd = (answers: DiscoveryAnswer[], type: string, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
    let content = format === ExportFormat.MD ? `**${type} Insights:**\n` : `${type.toUpperCase()} INSIGHTS:\n`;
    if (answers.length === 0) {
        content += "  No questions, answers, or notes for this section.\n";
    } else {
        answers.forEach(item => {
            if (item.isCustom) { 
                const noteText = item.answer || 'Empty note';
                if (format === ExportFormat.MD) {
                    content += `  - **Note:** ${noteText}\n`;
                } else {
                    content += `  Note: ${noteText}\n`;
                }
            } else { 
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

/**
 * Formats ROI calculation results for text-based exports.
 * @param results - The ROI results object.
 * @param format - The export format.
 * @param moduleRoiData - Optional module-specific ROI input data.
 * @returns The formatted ROI results string.
 */
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
    content += formatFieldTextMd("Monthly Cost of Delay", formatCurrencyForExport(results.monthlyCostOfDelay), format);
    
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

const htmlStyles = `
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8f9fa; color: #333; }
  .container { max-width: 900px; margin: 0 auto; padding: 25px; background-color: #fff; border: 1px solid #dee2e6; border-radius: 8px; box-shadow: 0 2px 15px rgba(0,0,0,0.07); }
  h1, h2, h3, h4 { color: #017a59; margin-top: 1.5em; margin-bottom: 0.6em; } 
  h1.main-title { font-size: 2.2em; border-bottom: 3px solid #017a59; padding-bottom: 0.3em; text-align: center; } 
  h2.section-title { font-size: 1.8em; border-bottom: 2px solid #01916D; padding-bottom: 0.2em; margin-top: 2em; } 
  h3.subsection-title { font-size: 1.4em; color: #01916D; } 
  p, .field { margin-bottom: 0.8em; }
  .field { display: flex; flex-wrap: wrap; margin-bottom: 0.5em; }
  .field-label { font-weight: bold; color: #495057; min-width: 180px; padding-right:10px; }
  .field-value { color: #212529; }
  ul, dl, ol { margin-bottom: 1em; padding-left: 20px; }
  li, dt, dd { margin-bottom: 0.4em; }
  dt { font-weight: bold; }
  dd { margin-left: 0; } 
  table { width: 100%; border-collapse: collapse; margin-bottom: 1.5em; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  th, td { border: 1px solid #ced4da; padding: 10px 12px; text-align: left; vertical-align: top; }
  th { background-color: #e9ecef; font-weight: 600; color: #017a59; } 
  tr:nth-child(even) td { background-color: #f8f9fa; }
  .section-divider { border-top: 2px dashed #01916D; margin: 2.5em 0; } 
  .currency { font-weight: bold; }
  .status { padding: 0.2em 0.5em; border-radius: 4px; font-weight: bold; text-transform: capitalize; }
  .status-QUALIFIED, .status-COMPLETED { background-color: #d4edda; color: #155724; }
  .status-CLARIFICATION_REQUIRED { background-color: #fff3cd; color: #856404; }
  .status-NOT_SUITABLE, .status-SKIPPED { background-color: #f8d7da; color: #721c24; }
  .status-NOT_STARTED, .status-PENDING { background-color: #e2e3e5; color: #383d41; }
  .status-IN-PROGRESS { background-color: #cce5ff; color: #004085; }
  .note { font-size: 0.9em; color: #6c757d; font-style: italic; }
  .note ul { margin-top: 4px; margin-bottom: 4px; padding-left: 18px; }
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
  .requirement-block-export { margin-bottom: 1em; padding: 0.8em 1em; border: 1px solid #B3DDD4; border-radius: 6px; background-color: #E6F4F1; } 
  .requirement-block-export h4 { font-size: 1.1em; color: #017a59; margin-top: 0; margin-bottom: 0.5em; } 
  .requirement-block-export p { font-size: 0.95em; margin-bottom: 0.3em; margin-left: 10px; }
  .requirement-block-export p strong { color: #333; }
  .conversation-exchange { border: 1px solid #e0e0e0; padding: 10px 15px; margin-bottom: 15px; background-color: #f9f9f9; border-radius: 6px;}
  .conversation-exchange .section-id { font-size: 1.1em; font-weight:bold; color: #017a59; margin-bottom: 8px; border-bottom: 1px dashed #ccc; padding-bottom: 5px; } 
  .conversation-exchange .exchange-item { margin-bottom: 8px; padding-left: 10px; }
  .conversation-exchange .prompt-label { font-weight: bold; color: #333; }
  .conversation-exchange .prompt-text, .conversation-exchange .answer-text { margin-top: 3px; color: #333; white-space: pre-wrap; display: block; padding-left: 15px; }
  .conversation-exchange .answer-label { font-weight: bold; color: #28a745; margin-top: 5px;}
  .conversation-exchange .module-prompt-group { margin-top:10px; padding-left:15px; border-left: 3px solid #80C7B8; } 
  .conversation-exchange .module-prompt-item { margin-bottom: 10px; padding: 8px; background-color: #E6F4F1; border-radius: 4px; } 
  .conversation-exchange .automation-focus { font-size: 0.9em; font-style: italic; color: #555; margin-top: 5px; }
  .infographic-section-export { margin-top: 2em; margin-bottom: 2em; padding: 1em; border: 1px dashed #01916D; border-radius: 8px; background-color: #E6F4F1; } 
  .infographic-section-export .infographic-body { background-color: transparent !important; }

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
    if (isCurrency && (typeof value === 'number' || (typeof value === 'string' && value.startsWith('$')))) {
         valStr = `<span class="currency">${formatCurrencyForExport(typeof value === 'number' ? value : parseFloat(value.replace('$', '').replace(/,/g, '')))}</span>`;
    }
    
    return `<div class="field"><span class="field-label">${escapeHtml(label)}:</span> <span class="field-value">${valStr}</span></div>\n`;
};

/**
 * Formats discovery questions and answers for HTML export.
 * @param answers - Array of discovery answers.
 * @param type - The type of discovery insights (e.g., "Qualitative").
 * @returns The formatted HTML string for discovery insights.
 */
const formatDiscoveryAnswersHtml = (answers: DiscoveryAnswer[], type: string): string => {
    let content = `<h3 class="subsection-title">${escapeHtml(type)} Insights</h3>\n`;
    if (answers.length === 0) {
        content += "<p class=\"note\">No questions, answers, or notes for this section.</p>\n";
    } else {
        content += "<dl>\n";
        answers.forEach(item => {
            if (item.isCustom) { 
                const noteText = item.answer ? nl2br(escapeHtml(item.answer)) : '<span class="note">Empty note</span>';
                content += `<div class="custom-note-item"><span class="note-label">Custom Note:</span><div class="note-content">${noteText}</div></div>\n`;
            } else { 
                const qText = escapeHtml(item.questionText);
                const aText = item.answer ? nl2br(escapeHtml(item.answer)) : '<span class="note">Not answered</span>';
                content += `<div class="discovery-item"><dt>${qText}</dt><dd>${aText}</dd></div>\n`;
            }
        });
        content += "</dl>\n";
    }
    return content;
};

/**
 * Formats ROI calculation results for HTML export.
 * @param results - The ROI results object.
 * @param moduleRoiData - Optional module-specific ROI input data.
 * @param moduleName - Optional name of the module.
 * @returns The formatted HTML string for ROI results.
 */
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
    content += formatFieldHtml("Monthly Cost of Delay", results.monthlyCostOfDelay, true);

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

/**
 * Generates the content for a solution proposal document.
 * @param appState - The current application state.
 * @param format - The desired export format (HTML or MD).
 * @returns The generated solution document content as a string.
 */
export const generateSolutionDocumentContent = (
    appState: AppState,
    format: ExportFormat.HTML | ExportFormat.MD 
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
        content += formatSectionTitleHtml(`Solution Proposal for ${escapeHtml(coreModuleName)}`, 1, true);
        content += `<div class="field"><span class="field-label">Prepared for:</span> <span class="field-value">${escapeHtml(customerCompany || "Valued Client")}</span></div>`;
        content += `<div class="field"><span class="field-label">Date:</span> <span class="field-value">${escapeHtml(dateCompleted)}</span></div>`;
        content += `<div class="field"><span class="field-label">Prepared by:</span> <span class="field-value">${escapeHtml(RESELLER_COMPANY_NAME)}</span></div>\n`;
        
        content += formatSectionTitleHtml("Executive Summary", 2);
        content += `<div class="prose">${nl2br(executiveSummaryText)}</div>`; 
        if (roiData) {
          content += `<p class="mt-2 text-sm">Key financial projections include: Total Annual Gross Savings of <span class="currency">${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}</span>, Overall ROI of <span class="font-bold">${roiData.overallRoiPercentage.toFixed(1)}%</span> over ${roiData.solutionLifespanYears} years, a Payback Period of approximately <span class="font-bold">${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}</span>, and a Monthly Cost of Delay of <span class="currency">${formatCurrencyForExport(roiData.monthlyCostOfDelay)}</span>.</p>`;
        }


        content += formatSectionTitleHtml("Overview of the Proposed Solution", 2);
        content += `<div class="prose solution-overview-details">${solutionOverviewTextContent}</div>`; 

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
        content += `<p class="mt-6 text-xs text-grey-500 text-center">Document generated by Engagement Platform for ${RESELLER_COMPANY_NAME}.</p>`; 
        content += "</div></body></html>";
    } else { 
        content += formatSectionTitleTextMd(`Solution Proposal for ${coreModuleName}`, 1, ExportFormat.MD);
        content += formatFieldTextMd("Prepared for", customerCompany || "Valued Client", ExportFormat.MD);
        content += formatFieldTextMd("Date", dateCompleted, ExportFormat.MD);
        content += formatFieldTextMd("Prepared by", RESELLER_COMPANY_NAME, ExportFormat.MD);
        content += "\n";

        content += formatSectionTitleTextMd("Executive Summary", 2, ExportFormat.MD);
        content += stripHtml(executiveSummaryText) + "\n\n";
         if (roiData) {
          content += `Key financial projections include: Total Annual Gross Savings of ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}, Overall ROI of ${roiData.overallRoiPercentage.toFixed(1)}% over ${roiData.solutionLifespanYears} years, a Payback Period of approximately ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}, and a Monthly Cost of Delay of ${formatCurrencyForExport(roiData.monthlyCostOfDelay)}.\n\n`;
        }

        content += formatSectionTitleTextMd("Overview of the Proposed Solution", 2, ExportFormat.MD);
        content += stripHtml(solutionOverviewTextContent) + "\n\n";

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
        content += `\n\n---\n*Document generated by Engagement Platform for ${RESELLER_COMPANY_NAME}.*`;
    }
    return content;
};

/**
 * Triggers a file download in the browser.
 * @param content - The content of the file.
 * @param filename - The desired filename for the download.
 * @param formatOrMimeType - The export format or a specific MIME type string.
 */
export const triggerDownload = (content: string, filename: string, formatOrMimeType: ExportFormat | 'html' | 'md' | 'txt' | string): void => {
    let mimeType = 'text/plain';
    if (formatOrMimeType === ExportFormat.HTML || formatOrMimeType === 'html') {
        mimeType = 'text/html';
    } else if (formatOrMimeType === ExportFormat.MD || formatOrMimeType === 'md') {
        mimeType = 'text/markdown';
    } else if (typeof formatOrMimeType === 'string' && formatOrMimeType.includes('/')) {
        mimeType = formatOrMimeType; 
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

const formatEngagementWorkflow = (steps: EngagementWorkflowStep[], isHtml: boolean): string => {
    if (!steps || steps.length === 0) return "";
    let content = "";
    if (isHtml) {
        content += formatSectionTitleHtml("Proposed Engagement Workflow", 2);
        content += "<ol>";
        steps.forEach(step => {
            content += `<li style="margin-bottom: 1em;"><strong>${escapeHtml(step.stepType)}</strong> (Status: ${escapeHtml(step.status)})`;
            if (step.objectives && step.objectives.length > 0) {
                content += `<div class="note" style="margin-left: 15px;"><strong>Objectives:</strong><ul>${step.objectives.map(o => `<li>${o.completed ? '✅ ' : '🔲 '}${escapeHtml(o.text)}</li>`).join('')}</ul></div>`;
            }
            if (step.salesActions && step.salesActions.length > 0) {
                content += `<div class="note" style="color: #005A9C; margin-left: 15px;"><strong>Sales Actions:</strong><ul>${step.salesActions.map(a => `<li>${a.completed ? '✅ ' : '🔲 '}${escapeHtml(a.text)}</li>`).join('')}</ul></div>`;
            }
            content += `</li>`;
        });
        content += "</ol>";
    } else {
        content += formatSectionTitleTextMd("Proposed Engagement Workflow", 2, ExportFormat.MD);
        steps.forEach((step, index) => {
            content += `${index + 1}. **${step.stepType}** (Status: ${step.status})\n`;
            if (step.objectives && step.objectives.length > 0) {
                content += `   - **Objectives:**\n${step.objectives.map(o => `     - [${o.completed ? 'x' : ' '}] ${o.text}`).join('\n')}\n`;
            }
            if (step.salesActions && step.salesActions.length > 0) {
                content += `   - **Sales Actions:**\n${step.salesActions.map(a => `     - [${a.completed ? 'x' : ' '}] ${a.text}`).join('\n')}\n`;
            }
        });
    }
    return content;
}

export const generateEngagementWorkflowHtml = (workflow: EngagementWorkflowState, customerCompany: string): string => {
    let content = `<html><head><title>Engagement Workflow for ${escapeHtml(customerCompany)}</title>${htmlStyles}</head><body><div class="container">`;
    content += formatSectionTitleHtml(`Proposed Engagement Workflow for ${escapeHtml(customerCompany)}`, 1, true);

    if (!workflow.steps || workflow.steps.length === 0) {
        content += "<p>No workflow steps have been defined.</p>";
    } else {
        workflow.steps.forEach((step, index) => {
            const statusClass = `status-${step.status.replace('-', '_').toUpperCase()}`;
            content += `<div class="requirement-block-export" style="margin-bottom: 1.5em; padding: 1em 1.5em;">`;
            content += `<h3 class="subsection-title" style="margin-top:0; margin-bottom: 0.7em; text-transform: capitalize;">Step ${index + 1}: ${escapeHtml(step.stepType)} <span class="status ${statusClass}" style="font-size: 0.8em; vertical-align: middle; margin-left: 10px;">${escapeHtml(step.status.replace('-', ' '))}</span></h3>`;

            if (step.objectives && step.objectives.length > 0) {
                content += '<h4>Objectives:</h4><ul>';
                step.objectives.forEach(o => { content += `<li>${o.completed ? '✅ ' : '🔲 '}${escapeHtml(o.text)}</li>`; });
                content += '</ul>';
            }

            if (step.salesActions && step.salesActions.length > 0) {
                content += '<h4>Sales Actions:</h4><ul>';
                step.salesActions.forEach(a => { content += `<li>${a.completed ? '✅ ' : '🔲 '}${escapeHtml(a.text)}</li>`; });
                content += '</ul>';
            }
             if (step.objectives.length === 0 && step.salesActions.length === 0) {
                 content += '<p class="note">No specific objectives or actions defined for this step.</p>';
             }
            content += `</div>`;
        });
    }

    content += "</div></body></html>";
    return content;
};


/**
 * Generates the main export content for the application.
 * @param appState - The current application state.
 * @returns The generated export content as a string.
 */
export const generateExportContent = (appState: AppState): string => {
    const {
        customerCompany, customerName, dateCompleted, selectedRole,
        selectedServiceType, selectedModuleId, activeTab, // Renamed selectedAutomationType
        opportunityScorecard, qualification, discoveryQuestions,
        roiCalculator, solutionBuilder, painPoints, customerConversations,
        engagementWorkflow, // Added new state
        exportFormat
    } = appState;

    const currentModule = getModuleById(selectedModuleId);
    const moduleName = currentModule?.name || "N/A";
    const serviceType = selectedServiceType || "N/A"; // Renamed automationType
    const isHtml = exportFormat === ExportFormat.HTML;
    
    const currentTextMdFormat: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT = 
        exportFormat === ExportFormat.AI_PROMPT ? ExportFormat.AI_PROMPT : 
        (exportFormat === ExportFormat.MD ? ExportFormat.MD : ExportFormat.TXT);

    let content = isHtml ? `<html><head><title>Export Report - ${escapeHtml(customerCompany || "Client")}</title>${htmlStyles}</head><body><div class="container">\n` : "";
    
    if (isHtml) {
        content += formatSectionTitleHtml("Engagement Platform Report", 1, true);
        content += formatSectionTitleHtml("Engagement Details", 2, false);
    } else {
        content += formatSectionTitleTextMd("ENGAGEMENT PLATFORM REPORT", 1, currentTextMdFormat);
        content += formatSectionTitleTextMd("Engagement Details", 2, currentTextMdFormat);
    }
    
    if (isHtml) {
        content += formatFieldHtml("Customer Company", customerCompany, false);
        content += formatFieldHtml("Customer Contact Name", customerName, false);
        content += formatFieldHtml("Date Completed", dateCompleted, false);
        content += formatFieldHtml("Role", selectedRole, false);
        content += formatFieldHtml("Selected Service", serviceType, false); 
        content += formatFieldHtml("Selected Module (Primary Focus)", moduleName, false);
    } else {
        content += formatFieldTextMd("Customer Company", customerCompany, currentTextMdFormat);
        content += formatFieldTextMd("Customer Contact Name", customerName, currentTextMdFormat);
        content += formatFieldTextMd("Date Completed", dateCompleted, currentTextMdFormat);
        content += formatFieldTextMd("Role", selectedRole, currentTextMdFormat);
        content += formatFieldTextMd("Selected Service", serviceType, currentTextMdFormat); 
        content += formatFieldTextMd("Selected Module (Primary Focus)", moduleName, currentTextMdFormat);
    }
    content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";

    if (customerConversations.exchanges.length > 0 || customerConversations.generalNotes || customerConversations.followUpDetails.contactName) {
        if (isHtml) {
            content += formatSectionTitleHtml("Customer Conversation Log", 2, false);
        } else {
            content += formatSectionTitleTextMd("Customer Conversation Log", 2, currentTextMdFormat);
        }
        const conversationContent = generateCustomerConversationExportContent(customerConversations, customerCompany, dateCompleted, exportFormat);
        if (isHtml) {
            content += conversationContent.replace(/<html><head>.*?<\/head><body><div class="container">/s, '').replace(/<\/div><\/body><\/html>/s, '');
        } else {
            content += conversationContent;
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }
    
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

    // New Engagement Workflow Export
    if (engagementWorkflow && engagementWorkflow.steps.length > 0) {
        content += formatEngagementWorkflow(engagementWorkflow.steps, isHtml);
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }

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
            content += formatFieldHtml("Qualitative Score", `${qualitative.score} (Status: <span class="status status-${qualitative.status.replace(/\s+/g, '_').toUpperCase()}">${qualitative.status}</span>)`, false);
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
            content += formatFieldHtml("Quantitative Score", `${quantitative.score} (Status: <span class="status status-${quantitative.status.replace(/\s+/g, '_').toUpperCase()}">${quantitative.status}</span>)`, false);
        } else {
            content += formatFieldTextMd("Quantitative Score", `${quantitative.score} (Status: ${quantitative.status})`, currentTextMdFormat);
        }
        content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }

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

    if (solutionBuilder.selectedCoreModuleId) {
         if (isHtml) {
            content += formatSectionTitleHtml("Solution Proposal Outline", 2, false);
         } else {
            content += formatSectionTitleTextMd("Solution Proposal Outline", 2, currentTextMdFormat);
         }
         if (exportFormat === ExportFormat.HTML || exportFormat === ExportFormat.MD) {
             const solutionDocContent = generateSolutionDocumentContent(appState, exportFormat);
             if (isHtml) {
                content += solutionDocContent.replace(/<html><head>.*?<\/head><body><div class="container">/s, '<div class="solution-proposal-section">')
                                          .replace(/<\/div><\/body><\/html>/s, '</div>');
             } else {
                 content += solutionDocContent; 
             }
         } else { 
             const textSolutionContent = generateSolutionDocumentContent(appState, ExportFormat.MD); 
             content += stripHtml(textSolutionContent) + "\n\n";
         }
         content += isHtml ? "<hr class=\"section-divider\" />\n" : "\n---\n\n";
    }


    if (exportFormat === ExportFormat.AI_PROMPT) {
        let aiPrompt = `Analyse the following customer engagement data for a ${serviceType} opportunity related to the ${moduleName} module:\n\n`; 
        aiPrompt += stripHtml(content); 
        aiPrompt += "\n\nProvide a summary of the key findings, potential solutions, and recommended next steps. Focus on identifying the strongest opportunities and tailor the response for a " + selectedRole + ".";
        content = aiPrompt;
    }

    if (isHtml) content += "</div></body></html>";
    return content;
};

/**
 * Generates the export content specifically for customer conversations.
 * @param customerConversations - The customer conversation state.
 * @param customerCompany - The name of the customer's company.
 * @param dateCompleted - The date the conversation was completed.
 * @param format - The desired export format (HTML, MD, TXT, AI_PROMPT).
 * @returns The generated customer conversation content as a string.
 */
export const generateCustomerConversationExportContent = (
    customerConversations: CustomerConversationState,
    customerCompany: string,
    dateCompleted: string,
    format: ExportFormat = ExportFormat.HTML 
): string => {
    const { exchanges, currentServiceFocus, followUpDetails, generalNotes, explorationInput } = customerConversations; // Renamed currentAutomationFocus

    const isHtml = format === ExportFormat.HTML;
    
    let content = "";

    const title = `Customer Conversation Log - ${customerCompany || "Client"} - ${dateCompleted}`;

    if (isHtml) {
        content += `<html><head><title>${escapeHtml(title)}</title>${htmlStyles}</head><body><div class="container">\n`;
        content += `<h1 class="main-title">${escapeHtml(title)}</h1>\n`;
        content += `<div class="field"><span class="field-label">Identified Service Focus:</span> <span class="field-value">${escapeHtml(currentServiceFocus || "Not Determined")}</span></div>\n`; 
        if (explorationInput) {
          content += `<div class="field"><span class="field-label">Keywords for Focus:</span> <span class="field-value">${escapeHtml(explorationInput)}</span></div>\n`;
        }
    } else {
        content += `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`;
        content += `Identified Service Focus: ${currentServiceFocus || "Not Determined"}\n`; 
        if (explorationInput) {
          content += `Keywords for Focus: ${explorationInput}\n`;
        }
        content += `\n`;
    }

    let lastSectionId: ConversationStepId | null = null;

    exchanges.forEach(ex => {
        if (isHtml) {
            if (ex.sectionId !== lastSectionId) {
                if (lastSectionId !== null) content += `</div>\n`; 
                content += `<div class="conversation-exchange">`;
                content += `<h3 class="section-id">Section: ${escapeHtml(ex.sectionId)}</h3>`;
                lastSectionId = ex.sectionId;
            }
            content += `<div class="exchange-item">`;
            if (ex.type === 'script_presented' && ex.promptText) {
                content += `<p><span class="prompt-label">Script:</span> <span class="prompt-text">${nl2br(escapeHtml(ex.promptText))}</span></p>`;
            } else if (ex.type === 'question_answered' && ex.promptText) {
                content += `<p><span class="prompt-label">Q:</span> <span class="prompt-text">${nl2br(escapeHtml(ex.promptText))}</span></p>`;
                content += `<p><span class="answer-label">A:</span> <span class="answer-text">${nl2br(escapeHtml(ex.answerText || 'No answer recorded'))}</span></p>`;
            } else if (ex.type === 'module_question_answered' && ex.moduleKey) {
                const module = ALL_MODULES.find(m => m.id === ex.moduleKey);
                content += `<p><span class="prompt-label">Module (${module?.name || ex.moduleKey}):</span> <span class="prompt-text">${nl2br(escapeHtml(ex.promptText || ''))}</span></p>`;
                content += `<p><span class="answer-label">A:</span> <span class="answer-text">${nl2br(escapeHtml(ex.answerText || 'No answer recorded'))}</span></p>`;
            } else if (ex.type === 'note_taken' && ex.promptText) {
                 content += `<p><span class="prompt-label">Note (${ex.promptText}):</span> <span class="answer-text">${nl2br(escapeHtml(ex.answerText || 'Empty note'))}</span></p>`;
            } else if (ex.type === 'focus_determined') {
                content += `<p class="automation-focus"><em>Service Focus Determined: ${escapeHtml(ex.answerText || 'N/A')}</em></p>`; 
            }
            content += `</div>`;
        } else { 
            if (ex.sectionId !== lastSectionId) {
                content += `\n## Section: ${ex.sectionId}\n\n`;
                lastSectionId = ex.sectionId;
            }
            if (ex.type === 'script_presented' && ex.promptText) {
                content += `Script: ${ex.promptText}\n`;
            } else if (ex.type === 'question_answered' && ex.promptText) {
                content += `Q: ${ex.promptText}\nA: ${ex.answerText || 'No answer recorded'}\n`;
            } else if (ex.type === 'module_question_answered' && ex.moduleKey) {
                const module = ALL_MODULES.find(m => m.id === ex.moduleKey);
                content += `Module (${module?.name || ex.moduleKey}) Q: ${ex.promptText || ''}\nA: ${ex.answerText || 'No answer recorded'}\n`;
            } else if (ex.type === 'note_taken' && ex.promptText) {
                 content += `Note (${ex.promptText}): ${ex.answerText || 'Empty note'}\n`;
            } else if (ex.type === 'focus_determined') {
                content += `Service Focus Determined: ${ex.answerText || 'N/A'}\n`; 
            }
            content += `\n`;
        }
    });
    if (isHtml && lastSectionId !== null) content += `</div>\n`; 

    if (followUpDetails.interestConfirmed !== null) {
        const fuText = `Interest Confirmed: ${followUpDetails.interestConfirmed ? 'Yes' : 'No'}\n` +
                       (followUpDetails.contactName ? `Contact: ${followUpDetails.contactName} (${followUpDetails.contactEmail || 'N/A'})\n` : '') +
                       (followUpDetails.meetingDate ? `Meeting: ${followUpDetails.meetingDate} at ${followUpDetails.meetingTime || 'N/A'}\n` : '') +
                       (followUpDetails.specialistNeeded ? `Specialist for ${followUpDetails.specialistNeeded}: Needed\n` : '') + 
                       (followUpDetails.notes ? `Follow-up Notes: ${followUpDetails.notes}\n` : '');
        if (isHtml) {
            content += `<h3 class="subsection-title">Follow-Up Details</h3><div class="conversation-exchange"><p>${nl2br(escapeHtml(fuText))}</p></div>\n`;
        } else {
            content += `\n## Follow-Up Details:\n${fuText}\n`;
        }
    }

    if (generalNotes) {
         if (isHtml) {
            content += `<h3 class="subsection-title">General Conversation Notes</h3><div class="conversation-exchange"><p>${nl2br(escapeHtml(generalNotes))}</p></div>\n`;
        } else {
            content += `\n## General Conversation Notes:\n${generalNotes}\n`;
        }
    }

    if (isHtml) {
        content += "</div></body></html>";
    }
    return content;
};
