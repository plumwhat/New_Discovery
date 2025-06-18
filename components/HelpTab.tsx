

import React from 'react';
import { TabProps, Role, TabId } from '../types'; 
import { TAB_METADATA } from '../constants'; 
import { LightBulbIcon, ListBulletIcon, InformationCircleIcon, ArrowDownTrayIcon } from './common/Icons';

const HelpTab: React.FC<TabProps> = ({ appState }) => {
  const getTabsForRole = (role: Role) => {
    return TAB_METADATA
      .filter(tab => tab.roles.includes(role) && tab.id !== TabId.HOME && tab.id !== TabId.HELP) // Exclude Home and Help itself from this list
      .map(tab => tab.label)
      .join(', ');
  };

  const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode; className?: string }> = ({ title, icon, className }) => (
    <div className={`flex items-center mb-3 ${className}`}>
      {icon && <span className="mr-2 text-blue-500">{icon}</span>}
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
    </div>
  );

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Help & Guidance</h2>
        <p className="text-gray-700 leading-relaxed">
          This section provides comprehensive guidance on using the Process Automation Discovery & ROI Tool. It covers getting started, understanding each tab's functionality, role-based access, and data export options.
        </p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <SectionHeader title="Getting Started" icon={<LightBulbIcon className="w-6 h-6" />} />
        <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
          <li>
            <strong>Select Your Role:</strong> Use the "Your Role" dropdown in the top section to choose your current role (e.g., Presales, Sales). This tailors the visible tabs and features to your specific workflow.
          </li>
          <li>
            <strong>Customer Information:</strong> Fill in "Customer Company," "Customer Contact Name," and "Date Completed" to contextualise your session.
          </li>
          <li>
            <strong>Choose Automation Type & Module:</strong> Select the primary "Automation Type" (Finance or Business) and then the specific "Module" (e.g., Accounts Payable, Document Management) you are focusing on. This is crucial for tabs like Discovery Questions, ROI Calculator, and Solution Builder, as they present module-specific content.
          </li>
          <li>
            <strong>Navigate Through Tabs:</strong> Click on the tabs at the top of the main content area to move between different sections of the tool. Each tab serves a distinct purpose in the discovery and qualification process.
          </li>
          <li>
            <strong>Input Data:</strong> Enter information as prompted within each tab. Your data is saved automatically in your browser's local storage as you go.
          </li>
          <li>
            <strong>Export Your Data:</strong> When ready, use the "Actions & Export" section (usually at the bottom) to download your compiled data in various formats.
          </li>
        </ol>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <SectionHeader title="Understanding the Tabs (Detailed)" icon={<ListBulletIcon className="w-6 h-6" />} />
        <ul className="space-y-4 text-gray-700">
          <li>
            <strong className="text-gray-800">Home:</strong> Provides a high-level overview of the tool and a summary of each tab's purpose and role accessibility.
          </li>
          <li>
            <strong className="text-gray-800">Customer Conversations:</strong> A guided, multi-step script to help Sales, SDR, and SAD roles conduct initial customer conversations. It aims to identify needs, suggest high-level automation areas (Finance/Business), qualify leads, and record key discussion points for handoff to specialists. Includes prompts and answer fields.
          </li>
          <li>
            <strong className="text-gray-800">Pain Points:</strong> A versatile discovery tool.
            <ul className="list-disc pl-5 mt-1 text-sm">
                <li><strong>Waterfall Mode:</strong> Interactively drills down from a customer's high-level business pain, through specific process issues, to conversational L3 questions. Answers help map identified pains to potential product solutions.
                </li>
                <li><strong>Reverse Waterfall Mode:</strong> Allows selection of a product module to generate a "Sales Cheat Sheet." This sheet provides key discovery questions and typical aligning answers, useful for pre-call preparation or training.</li>
            </ul>
          </li>
          <li>
            <strong className="text-gray-800">Opportunity Scorecard:</strong> For Sales roles to quickly assess the initial viability of an opportunity. Uses a simple Yes/No/Unsure format for key questions (e.g., executive sponsor, budget) to generate a score out of 100.
          </li>
          <li>
            <strong className="text-gray-800">Qualification:</strong> Provides a more in-depth assessment with qualitative (e.g., strategic alignment, change readiness) and quantitative (e.g., transaction volumes, FTEs involved) questions. Each answer contributes to a score, determining if an opportunity is Qualified, needs Clarification, or is Not Suitable.
          </li>
          <li>
            <strong className="text-gray-800">Discovery Questions:</strong> Offers a list of detailed, module-specific questions for the selected module. These are categorised into qualitative (process understanding, bottlenecks) and quantitative (metrics, volumes) sections to guide thorough discovery. Users can input answers and add custom notes.
          </li>
          <li>
            <strong className="text-gray-800">ROI Calculator:</strong> For Sales and Presales to estimate the potential Return on Investment. Users input module-specific metrics (e.g., number of invoices, processing times, error rates) along with general costs (salary, software cost). The tool calculates annual gross savings, total net benefit, payback period, and provides an annual financial breakdown.
          </li>
          <li>
            <strong className="text-gray-800">Solution Builder:</strong> Primarily for Presales roles to construct a solution document. Users select a core module and add "Requirement Blocks," detailing specific customer requirements and how the proposed software solution addresses them. This can then be viewed as a proposal document and exported.
          </li>
          <li>
            <strong className="text-gray-800">Help (This Tab):</strong> You are here! This tab provides detailed guidance on using all aspects of the tool.
          </li>
        </ul>
      </div>
      
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <SectionHeader title="Tab Availability by Role" icon={<InformationCircleIcon className="w-6 h-6" />} />
        <p className="mb-2 text-gray-700">The tabs you see are based on the role selected in the "Controls Section". Here's a general guide:</p>
        <ul className="space-y-2 text-gray-700">
            <li><strong>Sales:</strong> {getTabsForRole(Role.SALES)}</li>
            <li><strong>Presales:</strong> {getTabsForRole(Role.PRESALES)}</li>
            <li><strong>SDR (Sales Development Rep):</strong> {getTabsForRole(Role.SDR)}</li>
            <li><strong>SAD (Sales Admin/Development):</strong> {getTabsForRole(Role.SAD)}</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">The 'Home' and 'Help' tabs are available to all roles.</p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <SectionHeader title="How to Export Data" icon={<ArrowDownTrayIcon className="w-6 h-6" />} />
        <p className="text-gray-700 mb-2">
          The 'Actions & Export' section at the bottom of the page allows you to download all relevant data from your session.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
          <li>
            <strong>Select Export Format:</strong> Choose your preferred format:
            <ul className="list-disc pl-5 mt-1 text-sm">
                <li><strong>Text File (.txt):</strong> Plain text, good for simple notes or copying into other documents.</li>
                <li><strong>Markdown (.md):</strong> Structured text with basic formatting, suitable for platforms like GitHub or some note-taking apps.</li>
                <li><strong>AI Prompt (.txt):</strong> Data formatted as a comprehensive prompt, useful for inputting into generative AI models for summarisation or further analysis.</li>
                <li><strong>HTML File (.html):</strong> A structured HTML document, viewable in any web browser. Best for a visually organised report, sharing, or printing.</li>
            </ul>
          </li>
          <li>
            <strong>Click 'Export Data':</strong> This compiles data from all tabs relevant to your selected role and module.
          </li>
          <li>
            <strong>Download File:</strong> Your browser will download the file. The filename typically includes the customer company, module name, and date.
          </li>
        </ol>
        <p className="mt-3 text-gray-700">
          <strong className="text-gray-800">Specific Exports:</strong> Some tabs, like "Solution Builder" and "Customer Conversations," may offer dedicated export buttons for their specific content in a tailored format (e.g., a solution proposal document).
        </p>
        <p className="mt-3 text-gray-700">
          <strong className="text-gray-800">Clearing Data:</strong> You can also clear data for the current tab or reset the entire form using the buttons in the 'Actions & Export' section. These actions are irreversible, so use with caution.
        </p>
      </div>
    </div>
  );
};

export default HelpTab;