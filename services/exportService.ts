
import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat, QualificationQuestion } from '../types';
import { SCORECARD_QUESTIONS, QUALIFICATION_QUESTIONS_MODULE_TEMPLATES, TABS, ALL_MODULES } from '../constants'; // Removed QUALIFICATION_QUESTIONS_QUALITATIVE & QUANTITATIVE

const getModuleById = (id: string): Module | undefined => ALL_MODULES.find(m => m.id === id);

const formatSectionTitle = (title: string, level: number = 2): string => `${'#'.repeat(level)} ${title}\n\n`;
const formatField = (label: string, value: string | number | undefined | null, indent: string = ""): string => 
    `${indent}${label}: ${value !== undefined && value !== null && value !== "" ? value : 'Not answered'}\n`;

const formatDiscoveryAnswers = (answers: DiscoveryAnswer[], type: string): string => {
    let content = `**${type} Questions:**\n`;
    if (answers.length === 0) {
        content += "  No questions or answers for this section.\n";
    } else {
        answers.forEach(item => {
            content += `  - Q: ${item.questionText} ${item.isCustom ? '(Custom)' : ''}\n`;
            content += `    A: ${item.answer || 'Not answered'}\n`;
        });
    }
    return content + "\n";
};

const formatRoiResults = (results: RoiResults | null): string => {
    if (!results) return "ROI Calculation not performed or no results.\n\n";
    let content = formatSectionTitle("ROI Calculation Results", 3);
    content += formatField("Total Annual Gross Savings", `$${results.totalAnnualGrossSavings.toLocaleString()}`);
    content += formatField("Total Investment Over Lifespan", `$${results.totalInvestmentOverLifespan.toLocaleString()}`);
    content += formatField("Overall ROI Percentage", `${results.overallRoiPercentage.toFixed(1)}%`);
    content += formatField("Payback Period", `${isFinite(results.paybackPeriodMonths) ? results.paybackPeriodMonths.toFixed(1) + ' Months' : 'N/A'}`);
    content += "\n**Savings Calculation Workings:**\n";
    results.savingsCalculationWorkings.forEach(item => {
        content += `  - ${item.category}: $${item.result.toLocaleString()}\n    (Formula: ${item.formula})\n`;
    });
    content += `\n**Annual Breakdown (Lifespan: ${results.solutionLifespanYears} Years):**\n`;
    content += "| Year | Gross Savings | Software Cost | Investment | Net Cash Flow (Year) | Cumulative Net Cash Flow |\n";
    content += "|------|---------------|---------------|------------|----------------------|--------------------------|\n";
    results.annualBreakdown.forEach(item => {
        content += `| ${item.year} | $${item.grossSavings.toLocaleString()} | $${item.softwareCost.toLocaleString()} | $${item.investment.toLocaleString()} | $${item.netCashFlow.toLocaleString()} | $${item.cumulativeNetCashFlow.toLocaleString()} |\n`;
    });
    return content + "\n";
};


const formatQualificationSectionForExport = (
    sectionTitle: string,
    sectionData: AppState['qualification']['moduleData'][string]['qualitative'], // type for one section
    questionsForSection: QualificationQuestion[]
): string => {
    let content = `**${sectionTitle}:**\n`;
    questionsForSection.forEach(q => {
        const answerValue = sectionData.answers[q.id];
        const selectedOption = q.options.find(opt => opt.value === answerValue);
        content += formatField(q.text, selectedOption ? `${selectedOption.label} (Rating: ${selectedOption.value})` : "Not answered");
    });
    content += formatField("Average Score", sectionData.averageScore.toFixed(2));
    content += formatField("Status", sectionData.status);
    content += "\n";
    return content;
};


export const generateExportContent = (state: AppState): string => {
  const { selectedRole, selectedModuleId, exportFormat } = state;
  const moduleName = selectedModuleId ? getModuleById(selectedModuleId)?.name : "N/A";
  let content = "";

  const addDivider = () => {
    if (exportFormat === ExportFormat.MD) content += "\n---\n\n";
    else content += "\n--------------------------------------------------\n\n";
  };

  // Header
  content += formatSectionTitle(`Process Automation Report: ${moduleName}`, 1);
  content += formatField("Role", selectedRole);
  content += formatField("Automation Type", state.selectedAutomationType);
  content += formatField("Selected Module", moduleName);
  addDivider();

  const visibleTabs = TABS.filter(tab => tab.roles.includes(selectedRole));

  visibleTabs.forEach(tabInfo => {
    content += formatSectionTitle(tabInfo.label, 2);
    switch (tabInfo.id) {
      case TabId.OPPORTUNITY_SCORECARD:
        SCORECARD_QUESTIONS.forEach(q => {
          const answer = state.opportunityScorecard.answers[q.id] || "";
          let answerText = "Not answered";
          if (answer === "yes") answerText = "Yes (20 pts)";
          else if (answer === "no") answerText = "No (0 pts)";
          else if (answer === "unsure") answerText = "Unsure (0 pts)";
          content += formatField(q.text, answerText);
        });
        content += formatField("Total Score", `${state.opportunityScorecard.totalScore} / 100`);
        break;

      case TabId.QUALIFICATION:
        if (selectedModuleId && state.qualification.moduleData[selectedModuleId]) {
            const currentModuleQualData = state.qualification.moduleData[selectedModuleId];
            const questionTemplatesForModule = QUALIFICATION_QUESTIONS_MODULE_TEMPLATES[selectedModuleId] || QUALIFICATION_QUESTIONS_MODULE_TEMPLATES.default;
            
            content += formatQualificationSectionForExport("Qualitative Assessment", currentModuleQualData.qualitative, questionTemplatesForModule.qualitative);
            content += formatQualificationSectionForExport("Quantitative Assessment", currentModuleQualData.quantitative, questionTemplatesForModule.quantitative);

            content += "**Admin Settings (Thresholds):**\n";
            content += formatField("Qualified if Average Score >", state.qualification.adminSettings.thresholds.qualifiedMinAverage.toFixed(1));
            content += formatField("Requires Clarification if Average Score >=", state.qualification.adminSettings.thresholds.clarificationMinAverage.toFixed(1));
        } else {
             content += "No module selected or no qualification data available for this module.\n";
        }
        break;

      case TabId.DISCOVERY_QUESTIONS:
        if (selectedModuleId && state.discoveryQuestions[selectedModuleId]) {
          const moduleDiscovery = state.discoveryQuestions[selectedModuleId];
          content += formatDiscoveryAnswers(moduleDiscovery.qualitative, "Qualitative");
          content += formatDiscoveryAnswers(moduleDiscovery.quantitative, "Quantitative");
        } else {
          content += "No module selected or no discovery data available.\n";
        }
        break;

      case TabId.ROI_CALCULATOR:
        if (selectedModuleId && state.roiCalculator[selectedModuleId]) {
          const moduleRoi = state.roiCalculator[selectedModuleId];
          content += formatField("Average Annual Employee Salary", `$${parseGlobalRoiInput(moduleRoi.annualSalary).toLocaleString()}`);
          content += formatField("Annual Software Cost", `$${parseGlobalRoiInput(moduleRoi.annualSoftwareCost).toLocaleString()}`);
          content += formatField("Upfront Professional Services Cost", `$${parseGlobalRoiInput(moduleRoi.upfrontProfServicesCost).toLocaleString()}`);
          content += formatField("Solution Lifespan (Years)", `${parseGlobalRoiInput(moduleRoi.solutionLifespanYears)}`);
          
          content += `\n**Calculation Factors Used:**\n`;
          content += formatField("Automation Time Saving Percentage", `${(moduleRoi.calculationFactors.timeSavingPercentage * 100).toFixed(0)}%`);
          content += formatField("Automation Error Reduction Percentage", `${(moduleRoi.calculationFactors.errorReductionPercentage * 100).toFixed(0)}%`);
          content += `\n`;

          content += formatRoiResults(moduleRoi.results);
        } else {
          content += "No module selected or no ROI data available.\n";
        }
        break;
    }
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

  return content;
};
// Helper function (already exists in RoiCalculatorTab, can be shared or redefined)
const parseGlobalRoiInput = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value) || 0;
    return 0;
};


export const triggerDownload = (content: string, filename: string, format: ExportFormat) => {
  let mimeType = "text/plain";
  if (format === ExportFormat.MD) mimeType = "text/markdown";

  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
