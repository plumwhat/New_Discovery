
import { AppState, Role, TabId, ScorecardAnswer, QualificationStatus, DiscoveryAnswer, RoiResults, Module, ExportFormat } from '../types';
import { SCORECARD_QUESTIONS, QUALIFICATION_QUESTIONS_QUALITATIVE, QUALIFICATION_QUESTIONS_QUANTITATIVE, TABS, ALL_MODULES } from '../constants';

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
    content += "\n**Annual Breakdown (Lifespan: ${results.solutionLifespanYears} Years):**\n";
    content += "| Year | Gross Savings | Software Cost | Investment | Net Cash Flow (Year) | Cumulative Net Cash Flow |\n";
    content += "|------|---------------|---------------|------------|----------------------|--------------------------|\n";
    results.annualBreakdown.forEach(item => {
        content += `| ${item.year} | $${item.grossSavings.toLocaleString()} | $${item.softwareCost.toLocaleString()} | $${item.investment.toLocaleString()} | $${item.netCashFlow.toLocaleString()} | $${item.cumulativeNetCashFlow.toLocaleString()} |\n`;
    });
    return content + "\n";
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
        content += "**Qualitative Assessment:**\n";
        QUALIFICATION_QUESTIONS_QUALITATIVE.forEach(q => {
          const answerValue = state.qualification.qualitative.answers[q.id];
          const selectedOption = q.options.find(opt => opt.value === answerValue);
          content += formatField(q.text, selectedOption ? selectedOption.label : "Not answered");
        });
        content += formatField("Score", state.qualification.qualitative.score);
        content += formatField("Status", state.qualification.qualitative.status);
        content += "\n";

        content += "**Quantitative Assessment:**\n";
        QUALIFICATION_QUESTIONS_QUANTITATIVE.forEach(q => {
          const answerValue = state.qualification.quantitative.answers[q.id];
          const selectedOption = q.options.find(opt => opt.value === answerValue);
          content += formatField(q.text, selectedOption ? selectedOption.label : "Not answered");
        });
        content += formatField("Score", state.qualification.quantitative.score);
        content += formatField("Status", state.qualification.quantitative.status);
        content += "\n";
        
        content += "**Admin Settings (Thresholds):**\n";
        content += formatField("Qualified if Score >", state.qualification.adminSettings.thresholds.qualified);
        content += formatField("Clarification Required if Score >", state.qualification.adminSettings.thresholds.clarification);
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
          content += formatField("Average Annual Employee Salary", `$${moduleRoi.annualSalary.toLocaleString()}`);
          content += formatField("Annual Software Cost", `$${moduleRoi.annualSoftwareCost.toLocaleString()}`);
          content += formatField("Upfront Professional Services Cost", `$${moduleRoi.upfrontProfServicesCost.toLocaleString()}`);
          content += formatField("Solution Lifespan (Years)", `${moduleRoi.solutionLifespanYears}`);
          // Add other inputs here if needed for export
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
Please analyze the following data related to a process automation opportunity.
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
