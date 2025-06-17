

import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat, RequirementBlock, TabMetadata, ModuleSolutionContent } from '../types';
import { SCORECARD_QUESTIONS, QUALIFICATION_QUESTIONS_QUALITATIVE, QUALIFICATION_QUESTIONS_QUANTITATIVE, TAB_METADATA, ALL_MODULES, MODULE_SPECIFIC_SOLUTION_CONTENT, RESELLER_COMPANY_NAME } from '../constants'; 

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
    if (format === ExportFormat.MD) return `${'#'.repeat(level)} ${title}\n\n`;
    return `${title.toUpperCase()}\n${'-'.repeat(title.length)}\n\n`;
};

const formatFieldTextMd = (label: string, value: string | number | undefined | null, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT, indent: string = ""): string => {
    const valStr = (value !== undefined && value !== null && value !== "") ? value.toString() : 'Not answered';
    if (format === ExportFormat.MD) return `${indent}**${label}:** ${valStr}\n`;
    return `${indent}${label}: ${valStr}\n`;
};

const formatDiscoveryAnswersTextMd = (answers: DiscoveryAnswer[], type: string, format: ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
    let content = format === ExportFormat.MD ? `**${type} Questions:**\n` : `${type.toUpperCase()} QUESTIONS:\n`;
    if (answers.length === 0) {
        content += "  No questions or answers for this section.\n";
    } else {
        answers.forEach(item => {
            const qText = `${item.questionText}${item.isCustom ? ' (Custom)' : ''}`;
            const aText = item.answer || 'Not answered';
            if (format === ExportFormat.MD) {
                content += `  - **Q:** ${qText}\n    **A:** ${aText}\n`;
            } else {
                content += `  Q: ${qText}\n    A: ${aText}\n`;
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
  .custom-question { font-style: italic; }
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
    let content = `<h3 class="subsection-title">${escapeHtml(type)} Questions</h3>\n`;
    if (answers.length === 0) {
        content += "<p class=\"note\">No questions or answers for this section.</p>\n";
    } else {
        content += "<dl>\n";
        answers.forEach(item => {
            const qText = escapeHtml(item.questionText) + (item.isCustom ? ' <em class="custom-question">(Custom)</em>' : '');
            const aText = item.answer ? nl2br(escapeHtml(item.answer)) : '<span class="note">Not answered</span>';
            content += `<div class="discovery-item"><dt>${qText}</dt><dd>${aText}</dd></div>\n`;
        });
        content += "</dl>\n";
    }
    return content;
};

const formatRoiResultsHtml = (results: RoiResults | null, moduleRoiData?: any, moduleName?: string): string => {
    if (!results) return "<p class=\"note\">ROI Calculation not performed or no results.</p>\n";
    
    let content = formatSectionTitleHtml(`ROI Calculation Results for ${moduleName || 'Selected Module'}`, 3);

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
const formatSolutionBuilderContent = (appState: AppState, format: ExportFormat.HTML | ExportFormat.MD | ExportFormat.TXT | ExportFormat.AI_PROMPT): string => {
    const { solutionBuilder, roiCalculator, customerCompany, customerName, dateCompleted } = appState;
    const { selectedCoreModuleId, requirementBlocks } = solutionBuilder;

    const coreModule = getModuleById(selectedCoreModuleId);
    const coreModuleName = coreModule?.name || "N/A";
    
    const moduleContentDef = MODULE_SPECIFIC_SOLUTION_CONTENT[selectedCoreModuleId || 'default'] || MODULE_SPECIFIC_SOLUTION_CONTENT.default;
    const partnerDisplayName = moduleContentDef.technologyPartnerName;
    
    const executiveSummaryText = moduleContentDef.executiveSummaryBoilerplate(partnerDisplayName);
    const solutionOverviewTextOrHtml = moduleContentDef.solutionOverviewDetails(partnerDisplayName, coreModuleName);
    const coreElementsList = moduleContentDef.coreElements(partnerDisplayName, coreModuleName);

    const roiData: RoiResults | null = (selectedCoreModuleId && roiCalculator[selectedCoreModuleId]?.results) 
                                      ? roiCalculator[selectedCoreModuleId]!.results 
                                      : null;
    let content = "";

    if (format === ExportFormat.HTML) {
        content += `<div class="solution-proposal-section"> ${formatSectionTitleHtml(`Solution Proposal for ${coreModuleName}`, 1, true)}</div>`;
        content += formatFieldHtml("Customer Company", customerCompany || "N/A");
        content += formatFieldHtml("Customer Contact", customerName || "N/A");
        content += formatFieldHtml("Date Prepared", dateCompleted);

        content += `<section class="solution-proposal-section"> <h2 class="section-title">Executive Summary</h2>`;
        content += `<p>This document outlines a proposed solution for <strong>${escapeHtml(customerCompany) || 'the client'}</strong> to address challenges and opportunities within <strong>${coreModuleName}</strong> processes. Leveraging industry-leading technologies such as Esker for finance automation, M-Files for intelligent information management, and Nintex for advanced workflow capabilities, this solution aims to deliver significant operational efficiencies, enhanced control, and a strong return on investment.</p>`;
        content += `<div class="executive-summary-boilerplate">${executiveSummaryText}</div>`; // Expecting HTML
        if (roiData) {
            content += `<p class="mt-2">The financial projections for the <strong>${coreModuleName}</strong> module indicate a potential <strong>Total Annual Gross Savings of ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}</strong>, an <strong>Overall ROI of ${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}</strong> over ${roiData.solutionLifespanYears} years, and a <strong>Payback Period of approximately ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}</strong>.</p>`;
        }
        content += `</section>`;

        content += `<section class="solution-proposal-section"> <h2 class="section-title">Overview of the Proposed Solution</h2>`;
        content += solutionOverviewTextOrHtml; // Expecting HTML
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
                content += `</div>`; // Closing requirement-blocks-container
            }
            content += `</section>`;
        }


        if (roiData) {
            content += `<section class="solution-proposal-section"> <h2 class="section-title">Expected Business Outcomes & ROI Highlights for ${coreModuleName}</h2>`;
            content += `<p>The implementation of the proposed ${coreModuleName} solution, leveraging ${partnerDisplayName}, is projected to yield significant financial and operational benefits:</p>
                        <ul class="list-disc pl-6">
                            <li><strong>Total Annual Gross Savings:</strong> ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}</li>
                            <li><strong>Total Net Benefit (${roiData.solutionLifespanYears} years):</strong> ${formatCurrencyForExport(roiData.totalNetBenefitOverLifespan)}</li>
                            <li><strong>Overall ROI (${roiData.solutionLifespanYears} years):</strong> ${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}</li>
                            <li><strong>Payback Period:</strong> ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} Months` : (roiData.totalNetBenefitOverLifespan <=0 && roiData.totalInvestmentOverLifespan > 0 ? 'Payback not achieved within lifespan' : (roiData.totalInvestmentOverLifespan === 0 && roiData.totalAnnualGrossSavings > 0 ? 'Instant' :(roiData.totalInvestmentOverLifespan === 0 && roiData.totalAnnualGrossSavings === 0 ? 'N/A' : `Exceeds ${roiData.solutionLifespanYears*12} Months`)))}</li>
                            <li><strong>Upfront Investment:</strong> ${formatCurrencyForExport(roiData.upfrontInvestment)}</li>
                            <li><strong>Annual Recurring Software Cost:</strong> ${formatCurrencyForExport(roiData.annualRecurringSoftwareCost)}</li>
                        </ul>
                        <p class="note mt-2">Note: These figures are estimates based on the data provided for the ${coreModuleName} module. A detailed breakdown of savings calculations is available in the ROI Calculator tab and related exports.</p>
            </section>`;
        } else if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
            content += `<p class="mt-4 note"><i>Quantitative ROI analysis for the <strong>${coreModuleName}</strong> module can be performed in the 'ROI Calculator' tab to complement this solution outline.</i></p>`;
        }
    } else { // MD or TXT or AI_PROMPT
        content += formatSectionTitleTextMd(`Solution Proposal for ${coreModuleName}`, 1, format);
        content += formatFieldTextMd("Customer Company", customerCompany || "N/A", format);
        content += formatFieldTextMd("Customer Contact", customerName || "N/A", format);
        content += formatFieldTextMd("Date Prepared", dateCompleted, format);
        content += "\n";
        
        content += formatSectionTitleTextMd("Executive Summary", 2, format);
        let execSummaryBase = `This document outlines a proposed solution for ${customerCompany || 'the client'} to address challenges and opportunities within ${coreModuleName} processes. Leveraging industry-leading technologies such as Esker for finance automation, M-Files for intelligent information management, and Nintex for advanced workflow capabilities, this solution aims to deliver significant operational efficiencies, enhanced control, and a strong return on investment.\n`;
        content += execSummaryBase + stripHtml(executiveSummaryText) + "\n";
        if (roiData) {
          content += `The financial projections for the ${coreModuleName} module indicate a potential Total Annual Gross Savings of ${formatCurrencyForExport(roiData.totalAnnualGrossSavings)}, an Overall ROI of ${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'} over ${roiData.solutionLifespanYears} years, and a Payback Period of approximately ${isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} months` : 'N/A'}.\n\n`;
        }
    
        content += formatSectionTitleTextMd("Overview of the Proposed Solution", 2, format);
        content += stripHtml(solutionOverviewTextOrHtml) + "\n\n";
        
        if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
            content += formatSectionTitleTextMd("Detailed Customer Solution & Requirements", 2, format);
            content += format === ExportFormat.MD ? `**Core Module: ${coreModuleName}**\n` : `CORE MODULE: ${coreModuleName}\n`;
            if (coreElementsList.length > 0) {
                coreElementsList.forEach(element => {
                    content += format === ExportFormat.MD ? `- ${element}\n` : `  - ${element}\n`;
                });
                content += "\n";
            }
            if (requirementBlocks.length > 0) {
                content += format === ExportFormat.MD ? `**Specific Requirements & Solutions:**\n` : `SPECIFIC REQUIREMENTS & SOLUTIONS:\n`;
                requirementBlocks.forEach((block, index) => {
                  content += format === ExportFormat.MD 
                    ? `\n**Requirement Block ${index + 1} (Priority: ${index + 1})**\n  * **Requirement:** ${block.requirement}\n  * **Solution:** ${block.solution}\n`
                    : `\nRequirement Block ${index + 1} (Priority: ${index + 1})\n  - Requirement: ${block.requirement}\n  - Solution: ${block.solution}\n`;
                });
                content += "\n";
            }
        }
    
        if (roiData) {
            content += formatSectionTitleTextMd(`Expected Business Outcomes & ROI Highlights for ${coreModuleName}`, 2, format);
            content += formatFieldTextMd("Total Annual Gross Savings", formatCurrencyForExport(roiData.totalAnnualGrossSavings), format, "  ");
            content += formatFieldTextMd(`Total Net Benefit (${roiData.solutionLifespanYears} years)`, formatCurrencyForExport(roiData.totalNetBenefitOverLifespan), format, "  ");
            content += formatFieldTextMd(`Overall ROI (${roiData.solutionLifespanYears} years)`, `${isFinite(roiData.overallRoiPercentage) ? roiData.overallRoiPercentage.toFixed(1) + '%' : 'N/A'}`, format, "  ");
            content += formatFieldTextMd("Payback Period", isFinite(roiData.paybackPeriodMonths) ? `${roiData.paybackPeriodMonths.toFixed(1)} Months` : 'N/A', format, "  ");
            content += "\n";
        } else if (requirementBlocks.length > 0 || coreElementsList.length > 0) {
             content += `Quantitative ROI analysis for the ${coreModuleName} module can be performed in the 'ROI Calculator' tab to complement this solution outline.\n\n`;
        }
    }
    return content;
};

// New function for dedicated solution document export
export const generateSolutionDocumentContent = (state: AppState, format: ExportFormat.HTML | ExportFormat.MD): string => {
  let content = formatSolutionBuilderContent(state, format); 
  
  if (format === ExportFormat.HTML) {
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Solution Proposal: ${escapeHtml(getModuleById(state.solutionBuilder.selectedCoreModuleId)?.name || 'Solution')}</title>\n${htmlStyles}\n</head>\n<body>\n<div class="container">\n${content}\n</div>\n</body>\n</html>`;
  }
  return content;
};


export const generateExportContent = (state: AppState): string => {
  const { 
    selectedRole, selectedModuleId, exportFormat, 
    customerCompany, customerName, dateCompleted 
  } = state; 
  const generalModuleName = selectedModuleId ? getModuleById(selectedModuleId)?.name : "N/A";
  let content = "";

  const addDivider = () => {
    if (exportFormat === ExportFormat.MD) content += "\n---\n\n";
    else if (exportFormat === ExportFormat.TXT || exportFormat === ExportFormat.AI_PROMPT) content += "\n--------------------------------------------------\n\n";
    else if (exportFormat === ExportFormat.HTML) content += "<hr class=\"section-divider print-hidden\" />\n\n";
  };

  if (exportFormat === ExportFormat.HTML) {
    content += `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Process Automation Report: ${escapeHtml(generalModuleName || 'Overall')}</title>\n${htmlStyles}\n</head>\n<body>\n<div class="container">\n`;
    content += formatSectionTitleHtml(`Process Automation - Report for ${escapeHtml(customerCompany) || 'Client'}`, 1, true);
    content += formatFieldHtml("Customer Company", customerCompany || "N/A");
    content += formatFieldHtml("Customer Contact", customerName || "N/A");
    content += formatFieldHtml("Date Prepared", dateCompleted);
    content += formatFieldHtml("Role", selectedRole);
    content += formatFieldHtml("Automation Type", state.selectedAutomationType);
    content += formatFieldHtml("Currently Selected Module (for other tabs)", generalModuleName);
  } else {
    content += formatSectionTitleTextMd(`Process Automation - Report for ${customerCompany || 'Client'}`, 1, exportFormat);
    content += formatFieldTextMd("Customer Company", customerCompany || "N/A", exportFormat);
    content += formatFieldTextMd("Customer Contact", customerName || "N/A", exportFormat);
    content += formatFieldTextMd("Date Prepared", dateCompleted, exportFormat);
    content += formatFieldTextMd("Role", selectedRole, exportFormat);
    content += formatFieldTextMd("Automation Type", state.selectedAutomationType, exportFormat);
    content += formatFieldTextMd("Currently Selected Module (for other tabs)", generalModuleName, exportFormat);
  }
  addDivider();

  const visibleTabsMetadata = TAB_METADATA.filter(tab => tab.roles.includes(selectedRole) && tab.id !== TabId.HOME);

  visibleTabsMetadata.forEach(tabInfo => {
    if (tabInfo.id === TabId.SOLUTION_BUILDER) {
        // For the main export, solution builder section is still included as before
        content += formatSolutionBuilderContent(state, exportFormat);
    } else {
        content += exportFormat === ExportFormat.HTML ? formatSectionTitleHtml(tabInfo.label, 2) : formatSectionTitleTextMd(tabInfo.label, 2, exportFormat);
        
        switch (tabInfo.id) {
          case TabId.OPPORTUNITY_SCORECARD:
            SCORECARD_QUESTIONS.forEach(q => {
              const answer = state.opportunityScorecard.answers[q.id] || "";
              let answerText = "Not answered";
              if (answer === "yes") answerText = "Yes (20 pts)";
              else if (answer === "no") answerText = "No (0 pts)";
              else if (answer === "unsure") answerText = "Unsure (0 pts)";
              content += exportFormat === ExportFormat.HTML ? formatFieldHtml(q.text, answerText) : formatFieldTextMd(q.text, answerText, exportFormat);
            });
            content += exportFormat === ExportFormat.HTML ? formatFieldHtml("Total Score", `${state.opportunityScorecard.totalScore} / 100`) : formatFieldTextMd("Total Score", `${state.opportunityScorecard.totalScore} / 100`, exportFormat);
            break;

          case TabId.QUALIFICATION:
            if (exportFormat === ExportFormat.HTML) {
                content += "<h3 class=\"subsection-title\">Qualitative Assessment</h3>\n";
                QUALIFICATION_QUESTIONS_QUALITATIVE.forEach(q => {
                    const answerValue = state.qualification.qualitative.answers[q.id];
                    const selectedOption = q.options.find(opt => opt.value === answerValue);
                    content += formatFieldHtml(q.text, selectedOption ? selectedOption.label : "Not answered");
                });
                content += formatFieldHtml("Score", state.qualification.qualitative.score);
                content += formatFieldHtml("Status", `<span class="status status-${state.qualification.qualitative.status.toUpperCase().replace(/\s/g, '_')}">${state.qualification.qualitative.status}</span>`);
                
                content += "<h3 class=\"subsection-title\">Quantitative Assessment</h3>\n";
                QUALIFICATION_QUESTIONS_QUANTITATIVE.forEach(q => {
                    const answerValue = state.qualification.quantitative.answers[q.id];
                    const selectedOption = q.options.find(opt => opt.value === answerValue);
                    content += formatFieldHtml(q.text, selectedOption ? selectedOption.label : "Not answered");
                });
                content += formatFieldHtml("Score", state.qualification.quantitative.score);
                content += formatFieldHtml("Status", `<span class="status status-${state.qualification.quantitative.status.toUpperCase().replace(/\s/g, '_')}">${state.qualification.quantitative.status}</span>`);

                content += "<h3 class=\"subsection-title\">Admin Settings (Thresholds)</h3>\n";
                content += formatFieldHtml("Qualified if Score >", state.qualification.adminSettings.thresholds.qualified);
                content += formatFieldHtml("Clarification Required if Score >", state.qualification.adminSettings.thresholds.clarification);
            } else { // MD or TXT or AI_PROMPT
                content += formatSectionTitleTextMd("Qualitative Assessment", 3, exportFormat);
                QUALIFICATION_QUESTIONS_QUALITATIVE.forEach(q => {
                  const answerValue = state.qualification.qualitative.answers[q.id];
                  const selectedOption = q.options.find(opt => opt.value === answerValue);
                  content += formatFieldTextMd(q.text, selectedOption ? selectedOption.label : "Not answered", exportFormat, "  ");
                });
                content += formatFieldTextMd("Score", state.qualification.qualitative.score, exportFormat, "  ");
                content += formatFieldTextMd("Status", state.qualification.qualitative.status, exportFormat, "  ");
                content += "\n";

                content += formatSectionTitleTextMd("Quantitative Assessment", 3, exportFormat);
                QUALIFICATION_QUESTIONS_QUANTITATIVE.forEach(q => {
                  const answerValue = state.qualification.quantitative.answers[q.id];
                  const selectedOption = q.options.find(opt => opt.value === answerValue);
                  content += formatFieldTextMd(q.text, selectedOption ? selectedOption.label : "Not answered", exportFormat, "  ");
                });
                content += formatFieldTextMd("Score", state.qualification.quantitative.score, exportFormat, "  ");
                content += formatFieldTextMd("Status", state.qualification.quantitative.status, exportFormat, "  ");
                content += "\n";
                
                content += formatSectionTitleTextMd("Admin Settings (Thresholds)", 3, exportFormat);
                content += formatFieldTextMd("Qualified if Score >", state.qualification.adminSettings.thresholds.qualified, exportFormat, "  ");
                content += formatFieldTextMd("Clarification Required if Score >", state.qualification.adminSettings.thresholds.clarification, exportFormat, "  ");
            }
            break;

          case TabId.DISCOVERY_QUESTIONS:
            if (selectedModuleId && state.discoveryQuestions[selectedModuleId]) {
              const moduleDiscovery = state.discoveryQuestions[selectedModuleId];
              content += exportFormat === ExportFormat.HTML 
                ? formatDiscoveryAnswersHtml(moduleDiscovery.qualitative, "Qualitative") + formatDiscoveryAnswersHtml(moduleDiscovery.quantitative, "Quantitative")
                : formatDiscoveryAnswersTextMd(moduleDiscovery.qualitative, "Qualitative", exportFormat) + formatDiscoveryAnswersTextMd(moduleDiscovery.quantitative, "Quantitative", exportFormat);
            } else {
              content += exportFormat === ExportFormat.HTML ? "<p class=\"note\">No module selected for Discovery or no data available for this section of the report.</p>\n" : "No module selected for Discovery or no data available for this section of the report.\n";
            }
            break;

          case TabId.ROI_CALCULATOR:
            if (selectedModuleId && state.roiCalculator[selectedModuleId]) {
              const moduleRoi = state.roiCalculator[selectedModuleId];
              const roiModuleName = getModuleById(selectedModuleId)?.name || "Selected Module";
              content += exportFormat === ExportFormat.HTML 
                ? formatRoiResultsHtml(moduleRoi.results, moduleRoi, roiModuleName)
                : formatRoiResultsTextMd(moduleRoi.results, exportFormat, moduleRoi);
            } else {
              content += exportFormat === ExportFormat.HTML ? "<p class=\"note\">No module selected for ROI or no data available for this section of the report.</p>\n" : "No module selected for ROI or no data available for this section of the report.\n";
            }
            break;
        }
    }
    addDivider();
  });

  if (exportFormat === ExportFormat.AI_PROMPT) {
    const solutionBuilderModuleName = getModuleById(state.solutionBuilder.selectedCoreModuleId)?.name || "the specified area";
    let aiPromptHeader = `
# AI Analysis Prompt (Australian English)

## Instructions for AI:
Please analyze the following data related to a process automation opportunity for ${customerCompany || 'the client'} (contact: ${customerName || 'N/A'}) concerning their ${solutionBuilderModuleName} process. This report was prepared on ${dateCompleted}.
The solution leverages technologies like Esker, M-Files, and Nintex.
Use Australian English spelling (e.g., "analyse", "colour", "centre").
Provide a strategic summary that includes:
1.  **Executive Overview:** Briefly restate the client's main challenge for ${solutionBuilderModuleName} and the core proposed solution.
2.  **Key Challenges & Requirements:** Identify the primary pain points and specific requirements highlighted by the data (especially from Discovery and Solution Builder).
3.  **Proposed Solution Details:** Summarize the core module selected in Solution Builder (${solutionBuilderModuleName}) and key features/benefits (especially if it's Esker Order Management/AP, M-Files Document Management, or Nintex Workflow/Process Mapping, using the provided details). How do the requirement blocks map to this?
4.  **Potential Financial & Business Impact:** Summarize quantifiable benefits (e.g., cost savings, ROI, payback period from ROI Calculator for ${selectedModuleId ? generalModuleName : solutionBuilderModuleName}) and qualitative benefits (e.g., efficiency, accuracy, compliance from Discovery/Qualification).
5.  **Overall Suitability & Strategic Fit:** Briefly assess the opportunity's suitability for automation based on scorecard/qualification. How does the proposed solution align with typical business goals for ${solutionBuilderModuleName}?
6.  **Recommendations for Next Steps:** Suggest 2-3 logical next steps for the reseller to take with the client.

## Captured Data:
`;
    
    let cleanedContent = content
      .replace(/<style>[\s\S]*?<\/style>/gi, '') 
      .replace(/<br\s*\/?>/gi, '\n') 
      .replace(/<p.*?>/gi, '\n').replace(/<\/p>/gi, '\n')
      .replace(/<h[1-6].*?>(.*?)<\/h[1-6]>/gi, '\n\n**$1**\n')
      .replace(/<li.*?>/gi, '\n- ').replace(/<\/li>/gi, '')
      .replace(/<ul.*?>|<\/ul>|<dl.*?>|<\/dl>|<dt.*?>|<\/dt>|<dd.*?>|<\/dd>/gi, '\n')
      .replace(/<[^>]+>/g, ' ') 
      .replace(/#{1,6}\s/g, '') 
      .replace(/\*\*(.*?)\*\*/g, '$1') 
      .replace(/```[\s\S]*?```/g, '') 
      .replace(/---/g, '') 
      .replace(/\s{2,}/g, ' ') 
      .replace(/^\s*[\r\n]/gm, ''); 

    content = aiPromptHeader + cleanedContent;
  }


  if (exportFormat === ExportFormat.HTML && !content.trim().endsWith("</html>")) { // Ensure HTML structure is complete only for general export if not already done by solution builder part
    content += "\n</div>\n</body>\n</html>";
  }

  return content;
};

export const triggerDownload = (content: string, filename: string, format: ExportFormat) => {
  let mimeType = "text/plain;charset=utf-8";
  if (format === ExportFormat.MD) mimeType = "text/markdown;charset=utf-8";
  else if (format === ExportFormat.HTML) mimeType = "text/html;charset=utf-8";


  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
