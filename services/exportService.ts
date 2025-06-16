
import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat, QualificationQuestion, RoiInput } from '../types';
import { SCORECARD_QUESTIONS, QUALIFICATION_QUESTIONS_MODULE_TEMPLATES, TABS, ALL_MODULES, ROI_INPUT_TEMPLATES } from '../constants';

const getModuleById = (id: string): Module | undefined => ALL_MODULES.find(m => m.id === id);

const escapeHtml = (unsafe: string): string => {
    if (typeof unsafe !== 'string') {
        return String(unsafe); // Convert non-strings to strings
    }
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
};

const formatSectionTitle = (title: string, level: number = 2, format: ExportFormat): string => {
    if (format === ExportFormat.HTML) {
        return `<h${level}>${escapeHtml(title)}</h${level}>\n`;
    }
    return `${'#'.repeat(level)} ${title}\n\n`;
};

const formatField = (label: string, value: string | number | undefined | null, format: ExportFormat, indent: string = ""): string => {
    const valStr = (value !== undefined && value !== null && value !== "") ? String(value) : 'Not answered';
    if (format === ExportFormat.HTML) {
        return `<p class="field">${indent}<strong>${escapeHtml(label)}:</strong> ${escapeHtml(valStr)}</p>\n`;
    }
    return `${indent}${label}: ${valStr}\n`;
};

const formatDiscoveryAnswers = (answers: DiscoveryAnswer[], type: string, format: ExportFormat): string => {
    let content = "";
    if (format === ExportFormat.HTML) {
        content += `<h3>${escapeHtml(type)} Questions:</h3>\n<ul>\n`;
        if (answers.length === 0) {
            content += "<li>No questions or answers for this section.</li>\n";
        } else {
            answers.forEach(item => {
                content += `<li><strong>Q:</strong> ${escapeHtml(item.questionText)} ${item.isCustom ? '<em>(Custom)</em>' : ''}<br/>\n`;
                content += `&nbsp;&nbsp;<strong>A:</strong> ${escapeHtml(item.answer || 'Not answered')}</li>\n`;
            });
        }
        content += "</ul>\n";
    } else {
        content += `**${type} Questions:**\n`;
        if (answers.length === 0) {
            content += "  No questions or answers for this section.\n";
        } else {
            answers.forEach(item => {
                content += `  - Q: ${item.questionText} ${item.isCustom ? '(Custom)' : ''}\n`;
                content += `    A: ${item.answer || 'Not answered'}\n`;
            });
        }
        content += "\n";
    }
    return content;
};

const formatRoiResults = (moduleId: string, moduleRoiData: AppState['roiCalculator'][string], format: ExportFormat): string => {
    if (!moduleRoiData.results) return format === ExportFormat.HTML ? "<p>ROI Calculation not performed or no results.</p>\n" : "ROI Calculation not performed or no results.\n\n";
    
    const results = moduleRoiData.results;
    let content = formatSectionTitle("ROI Calculation Results", 3, format);

    // Key Inputs and Assumptions
    content += formatSectionTitle("Key Inputs & Assumptions", 4, format);
    content += formatField("Average Annual Employee Salary", `$${parseGlobalRoiInput(moduleRoiData.annualSalary).toLocaleString()}`, format);
    content += formatField("Annual Software Cost", `$${parseGlobalRoiInput(moduleRoiData.annualSoftwareCost).toLocaleString()}`, format);
    content += formatField("Upfront Professional Services Cost", `$${parseGlobalRoiInput(moduleRoiData.upfrontProfServicesCost).toLocaleString()}`, format);
    content += formatField("Solution Lifespan (Years)", `${parseGlobalRoiInput(moduleRoiData.solutionLifespanYears)}`, format);
    
    if (format === ExportFormat.HTML) content += "<h4>Module-Specific Inputs:</h4><ul>";
    else content += "\n**Module-Specific Inputs:**\n";

    const moduleInputTemplates = ROI_INPUT_TEMPLATES[moduleId] || ROI_INPUT_TEMPLATES.default;
    moduleInputTemplates.forEach((inputTemplate: RoiInput) => {
        const value = moduleRoiData.inputs[inputTemplate.id];
        if (format === ExportFormat.HTML) {
            content += `<li><strong>${escapeHtml(inputTemplate.label)}:</strong> ${escapeHtml(String(value))} ${inputTemplate.unit ? `(${escapeHtml(inputTemplate.unit)})` : ''}</li>`;
        } else {
            content += formatField(inputTemplate.label, `${value} ${inputTemplate.unit || ''}`, format, "  ");
        }
    });
    if (format === ExportFormat.HTML) content += "</ul>";
    else content += "\n";

    content += formatSectionTitle("Calculation Factors Used", 4, format);
    content += formatField("Automation Time Saving Percentage", `${(moduleRoiData.calculationFactors.timeSavingPercentage * 100).toFixed(0)}%`, format);
    content += formatField("Automation Error Reduction Percentage", `${(moduleRoiData.calculationFactors.errorReductionPercentage * 100).toFixed(0)}%`, format);
    
    if (format === ExportFormat.HTML) content += "<hr/>";

    // Summary Cards for HTML
    if (format === ExportFormat.HTML) {
        content += `
            <div class="roi-summary-card"><strong>Total Annual Gross Savings:</strong> ${escapeHtml(formatCurrency(results.totalAnnualGrossSavings))}</div>
            <div class="roi-summary-card"><strong>Total Net Benefit (${results.solutionLifespanYears} yrs):</strong> ${escapeHtml(formatCurrency(results.totalNetBenefitOverLifespan))}</div>
            <div class="roi-summary-card"><strong>Total Investment (${results.solutionLifespanYears} yrs):</strong> ${escapeHtml(formatCurrency(results.totalInvestmentOverLifespan))}</div>
            <div class="roi-summary-card"><strong>Overall ROI (${results.solutionLifespanYears} yrs):</strong> ${isFinite(results.overallRoiPercentage) ? `${results.overallRoiPercentage.toFixed(1)}%` : (results.totalNetBenefitOverLifespan > 0 ? "Infinite" : "N/A")}</div>
            <div class="roi-summary-card"><strong>Payback Period:</strong> ${results.paybackPeriodMonths === 0 ? "Immediate" : isFinite(results.paybackPeriodMonths) && results.paybackPeriodMonths > 0 ? `${results.paybackPeriodMonths.toFixed(1)} Months` : (results.totalNetBenefitOverLifespan <=0 ? 'N/A (No Payback)' : `> ${results.solutionLifespanYears*12} Months`)}</div>
        `;
    } else {
        content += formatField("Total Annual Gross Savings", `$${results.totalAnnualGrossSavings.toLocaleString()}`, format);
        content += formatField("Total Investment Over Lifespan", `$${results.totalInvestmentOverLifespan.toLocaleString()}`, format);
        content += formatField("Overall ROI Percentage", `${results.overallRoiPercentage.toFixed(1)}%`, format);
        content += formatField("Payback Period", `${isFinite(results.paybackPeriodMonths) ? results.paybackPeriodMonths.toFixed(1) + ' Months' : 'N/A'}`, format);
    }
    
    content += formatSectionTitle("Savings Calculation Workings", 4, format);
    if (format === ExportFormat.HTML) content += "<ul>";
    results.savingsCalculationWorkings.forEach(item => {
        if (format === ExportFormat.HTML) {
            content += `<li><strong>${escapeHtml(item.category)}:</strong> ${escapeHtml(formatCurrency(item.result))}<br/>&nbsp;&nbsp;<em>Formula:</em> ${escapeHtml(item.formula)}<br/>&nbsp;&nbsp;<em>Inputs Used:</em><ul>`;
            Object.entries(item.inputsUsed).forEach(([key, value]) => {
                 content += `<li>${escapeHtml(key)}: ${escapeHtml(String(value))}</li>`;
            });
            content += `</ul></li>`;
        } else {
            content += `  - ${item.category}: $${item.result.toLocaleString()}\n    (Formula: ${item.formula})\n    Inputs Used:\n`;
            Object.entries(item.inputsUsed).forEach(([key, value]) => {
                content += `      - ${key}: ${value}\n`;
            });
        }
    });
    if (format === ExportFormat.HTML) content += "</ul>";

    content += formatSectionTitle(`Annual Breakdown (Lifespan: ${results.solutionLifespanYears} Years)`, 4, format);
    if (format === ExportFormat.HTML) {
        content += `
            <table>
                <thead>
                    <tr>
                        <th>Year</th><th>Gross Savings</th><th>Software Cost</th><th>Investment</th><th>Net Cash Flow (Year)</th><th>Cumulative Net Cash Flow</th>
                    </tr>
                </thead>
                <tbody>
        `;
        results.annualBreakdown.forEach(item => {
            content += `
                    <tr>
                        <td>${item.year}</td>
                        <td>${escapeHtml(formatCurrency(item.grossSavings))}</td>
                        <td>${escapeHtml(formatCurrency(item.softwareCost))}</td>
                        <td>${escapeHtml(formatCurrency(item.investment))}</td>
                        <td>${escapeHtml(formatCurrency(item.netCashFlow))}</td>
                        <td>${escapeHtml(formatCurrency(item.cumulativeNetCashFlow))}</td>
                    </tr>
            `;
        });
        content += "</tbody></table>\n";
    } else {
        content += "| Year | Gross Savings | Software Cost | Investment | Net Cash Flow (Year) | Cumulative Net Cash Flow |\n";
        content += "|------|---------------|---------------|------------|----------------------|--------------------------|\n";
        results.annualBreakdown.forEach(item => {
            content += `| ${item.year} | $${item.grossSavings.toLocaleString()} | $${item.softwareCost.toLocaleString()} | $${item.investment.toLocaleString()} | $${item.netCashFlow.toLocaleString()} | $${item.cumulativeNetCashFlow.toLocaleString()} |\n`;
        });
    }
    return content + (format === ExportFormat.HTML ? "" : "\n");
};

const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};


const formatQualificationSectionForExport = (
    sectionTitle: string,
    sectionData: AppState['qualification']['moduleData'][string]['qualitative'], // type for one section
    questionsForSection: QualificationQuestion[],
    format: ExportFormat
): string => {
    let content = format === ExportFormat.HTML ? `<h3>${escapeHtml(sectionTitle)}:</h3>\n<ul>\n` : `**${sectionTitle}:**\n`;
    questionsForSection.forEach(q => {
        const answerValue = sectionData.answers[q.id];
        const selectedOption = q.options.find(opt => opt.value === answerValue);
        const answerText = selectedOption ? `${selectedOption.label} (Rating: ${selectedOption.value})` : "Not answered";
        if (format === ExportFormat.HTML) {
            content += `<li><strong>${escapeHtml(q.text)}:</strong> ${escapeHtml(answerText)}</li>\n`;
        } else {
            content += formatField(q.text, answerText, format);
        }
    });
    if (format === ExportFormat.HTML) {
        content += `<li><strong>Average Score:</strong> ${sectionData.averageScore.toFixed(2)}</li>\n`;
        content += `<li><strong>Status:</strong> ${escapeHtml(sectionData.status)}</li>\n</ul>\n`;
    } else {
        content += formatField("Average Score", sectionData.averageScore.toFixed(2), format);
        content += formatField("Status", sectionData.status, format);
        content += "\n";
    }
    return content;
};


export const generateExportContent = (state: AppState): string => {
  const { selectedRole, selectedModuleId, exportFormat } = state;
  const moduleName = selectedModuleId ? getModuleById(selectedModuleId)?.name : "N/A";
  let content = "";

  if (exportFormat === ExportFormat.HTML) {
    content += `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Process Automation Report: ${escapeHtml(moduleName || "Report")}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; color: #333; }
        h1 { font-size: 28px; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 20px; }
        h2 { font-size: 22px; color: #3498db; margin-top: 30px; border-bottom: 1px solid #bdc3c7; padding-bottom: 8px; }
        h3 { font-size: 18px; color: #2980b9; margin-top: 25px; }
        h4 { font-size: 16px; color: #34495e; margin-top: 20px; }
        p, li { margin-bottom: 8px; }
        strong { color: #2c3e50; }
        ul { margin-left: 0px; padding-left: 20px; list-style-type: disc; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); }
        th, td { border: 1px solid #bdc3c7; padding: 10px; text-align: left; }
        th { background-color: #ecf0f1; color: #2c3e50; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        hr { border: 0; height: 1px; background: #bdc3c7; margin: 30px 0; }
        .section { margin-bottom: 30px; padding: 15px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .field { margin-bottom: 5px; }
        .field strong { display: inline-block; min-width: 180px; }
        .roi-summary-card { background-color: #e7f3fe; border: 1px solid #c5dff8; color: #217dbb; padding: 15px; margin-bottom:10px; border-radius: 5px; }
        .roi-summary-card strong { font-size: 1.1em; color: #1c6aa6;}
    </style>
</head>
<body>
`;
  }

  const addDivider = () => {
    if (exportFormat === ExportFormat.MD) content += "\n---\n\n";
    else if (exportFormat === ExportFormat.TXT || exportFormat === ExportFormat.AI_PROMPT) content += "\n--------------------------------------------------\n\n";
    else if (exportFormat === ExportFormat.HTML) content += "<hr/>\n";
  };

  content += formatSectionTitle(`Process Automation Report: ${moduleName}`, 1, exportFormat);
  content += formatField("Role", selectedRole, exportFormat);
  content += formatField("Automation Type", state.selectedAutomationType, exportFormat);
  content += formatField("Selected Module", moduleName, exportFormat);
  addDivider();

  const visibleTabs = TABS.filter(tab => tab.roles.includes(selectedRole));

  visibleTabs.forEach(tabInfo => {
    if (exportFormat === ExportFormat.HTML) content += `<div class="section">\n`;
    content += formatSectionTitle(tabInfo.label, 2, exportFormat);
    switch (tabInfo.id) {
      case TabId.OPPORTUNITY_SCORECARD:
        if (exportFormat === ExportFormat.HTML) content += "<ul>";
        SCORECARD_QUESTIONS.forEach(q => {
          const answer = state.opportunityScorecard.answers[q.id] || "";
          let answerText = "Not answered";
          if (answer === "yes") answerText = "Yes (20 pts)";
          else if (answer === "no") answerText = "No (0 pts)";
          else if (answer === "unsure") answerText = "Unsure (0 pts)";
          if (exportFormat === ExportFormat.HTML) content += `<li><strong>${escapeHtml(q.text)}:</strong> ${escapeHtml(answerText)}</li>\n`;
          else content += formatField(q.text, answerText, exportFormat);
        });
        if (exportFormat === ExportFormat.HTML) {
            content += `<li><strong>Total Score:</strong> ${state.opportunityScorecard.totalScore} / 100</li></ul>\n`;
        } else {
            content += formatField("Total Score", `${state.opportunityScorecard.totalScore} / 100`, exportFormat);
        }
        break;

      case TabId.QUALIFICATION:
        if (selectedModuleId && state.qualification.moduleData[selectedModuleId]) {
            const currentModuleQualData = state.qualification.moduleData[selectedModuleId];
            const questionTemplatesForModule = QUALIFICATION_QUESTIONS_MODULE_TEMPLATES[selectedModuleId] || QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.default;
            
            content += formatQualificationSectionForExport("Qualitative Assessment", currentModuleQualData.qualitative, questionTemplatesForModule.qualitative, exportFormat);
            content += formatQualificationSectionForExport("Quantitative Assessment", currentModuleQualData.quantitative, questionTemplatesForModule.quantitative, exportFormat);

            if(exportFormat === ExportFormat.HTML) content += "<h3>Admin Settings (Thresholds):</h3><ul>";
            else content += "**Admin Settings (Thresholds):**\n";
            
            const qualMinText = `Qualified if Average Score > ${state.qualification.adminSettings.thresholds.qualifiedMinAverage.toFixed(1)}`;
            const clarMinText = `Requires Clarification if Average Score >= ${state.qualification.adminSettings.thresholds.clarificationMinAverage.toFixed(1)}`;

            if (exportFormat === ExportFormat.HTML) {
                content += `<li>${escapeHtml(qualMinText)}</li><li>${escapeHtml(clarMinText)}</li></ul>\n`;
            } else {
                content += formatField("Qualified Min Avg.", `> ${state.qualification.adminSettings.thresholds.qualifiedMinAverage.toFixed(1)}`, exportFormat);
                content += formatField("Clarification Min Avg.", `>= ${state.qualification.adminSettings.thresholds.clarificationMinAverage.toFixed(1)}`, exportFormat);
            }
        } else {
             content += exportFormat === ExportFormat.HTML ? "<p>No module selected or no qualification data available for this module.</p>\n" :"No module selected or no qualification data available for this module.\n";
        }
        break;

      case TabId.DISCOVERY_QUESTIONS:
        if (selectedModuleId && state.discoveryQuestions[selectedModuleId]) {
          const moduleDiscovery = state.discoveryQuestions[selectedModuleId];
          content += formatDiscoveryAnswers(moduleDiscovery.qualitative, "Qualitative", exportFormat);
          content += formatDiscoveryAnswers(moduleDiscovery.quantitative, "Quantitative", exportFormat);
        } else {
          content += exportFormat === ExportFormat.HTML ? "<p>No module selected or no discovery data available.</p>\n" : "No module selected or no discovery data available.\n";
        }
        break;

      case TabId.ROI_CALCULATOR:
        if (selectedModuleId && state.roiCalculator[selectedModuleId]) {
          content += formatRoiResults(selectedModuleId, state.roiCalculator[selectedModuleId], exportFormat);
        } else {
          content += exportFormat === ExportFormat.HTML ? "<p>No module selected or no ROI data available.</p>\n" : "No module selected or no ROI data available.\n";
        }
        break;
    }
    if (exportFormat === ExportFormat.HTML) content += `</div>\n`;
    addDivider();
  });

  if (exportFormat === ExportFormat.AI_PROMPT) {
    const aiPromptHeader = `
# AI Analysis Prompt (Australian English)

## Instructions for AI:
Please analyse the following data related to a process automation opportunity.
Use Australian English spelling (e.g., "analyse", "colour", "centre").
Avoid mentioning specific brand names or product names unless they are part of the customer's direct input.
Provide a strategic summary that includes:
1.  **Key Challenges:** Identify the primary pain points and operational inefficiencies highlighted by the data.
2.  **Potential Financial Benefits:** Summarize the quantifiable benefits (e.g., cost savings, efficiency gains) indicated by the ROI calculations or quantitative discovery.
3.  **Strategic Recommendations:** Based on the information, suggest 2-3 high-level strategic recommendations for an automation solution. Focus on business outcomes.
4.  **Overall Suitability:** Briefly assess the overall suitability of this opportunity for automation based on the qualification and scorecard data.

## Captured Data:
`;
    content = aiPromptHeader + content;
  }
  
  if (exportFormat === ExportFormat.HTML) {
    content += "\n</body>\n</html>";
  }

  return content;
};

// Helper function
const parseGlobalRoiInput = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
};


export const triggerDownload = (content: string, filename: string, format: ExportFormat) => {
  let mimeType = "text/plain";
  let effectiveFilename = filename;

  if (format === ExportFormat.MD) {
      mimeType = "text/markdown";
      if (!filename.endsWith('.md')) effectiveFilename += '.md';
  } else if (format === ExportFormat.HTML) {
      mimeType = "text/html";
      if (!filename.endsWith('.html')) effectiveFilename += '.html';
  } else { // TXT or AI_PROMPT
      if (!filename.endsWith('.txt')) effectiveFilename += '.txt';
  }


  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = effectiveFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};