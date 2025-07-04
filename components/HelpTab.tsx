
import React from 'react';
import { TabProps, Role, TabId, ServiceType } from '../types'; 
import { TAB_METADATA, TAB_PURPOSES } from '../constants/tabConstants'; 
import { LightBulbIcon, ListBulletIcon, InformationCircleIcon, ArrowDownTrayIcon } from './common/Icons';

const HelpTab: React.FC<TabProps> = React.memo(({ appState }) => {
  const tabIdValue = TabId.HELP;
  const getTabsForRole = (role: Role) => {
    return TAB_METADATA
      .filter(tab => tab.roles.includes(role) && tab.id !== TabId.HOME && tab.id !== TabId.HELP) 
      .map(tab => tab.label)
      .join(', ');
  };

  const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode; className?: string, id?: string }> = ({ title, icon, className, id }) => (
    <div className={`flex items-center mb-3 ${className}`}>
      {icon && <span className="mr-2 text-[#01916D]">{icon}</span>}
      <h3 id={id} className="text-xl font-semibold text-[#01916D]">{title}</h3>
    </div>
  );

  return (
    <section 
      className="p-6 bg-white shadow rounded-lg space-y-8"
      role="region"
      aria-labelledby={`${tabIdValue}-heading`}
    >
      <div>
        <h2 id={`${tabIdValue}-heading`} className="text-2xl font-semibold text-gray-800 mb-4">Help & Guidance</h2>
        <p className="text-gray-700 leading-relaxed">
          This section provides comprehensive guidance on using the Engagement Platform. It covers getting started, understanding each tab's functionality, role-based access, and data export options.
        </p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <SectionHeader title="Getting Started" icon={<LightBulbIcon className="w-6 h-6" />} id={`${tabIdValue}-getting-started`} />
        <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
          <li>
            <strong>Select Your Role:</strong> Use the "Your Role" dropdown in the top section to choose your current role (e.g., Presales, Sales, Customer Success Manager (CSM), Sales Admin/Development (SAD)). This tailors the visible tabs and features to your specific workflow.
          </li>
          <li>
            <strong>Customer Information:</strong> Fill in "Customer Company," "Customer Contact Name," and "Date Completed" to contextualise your session.
          </li>
          <li>
            <strong>Choose Service Type & Module:</strong> Select the primary "Service Type" ({Object.values(ServiceType).join('/')}) and then the specific "Module" (e.g., Accounts Payable, Document Management, Managed IT Support) you are focusing on. This is crucial for tabs like Discovery Questions, ROI Calculator, and Solution Builder, as they present module-specific content.
          </li>
          <li>
            <strong>Navigate Through Tabs:</strong> Click on the tabs at the top of the main content area to move between different sections of the tool. Each tab serves a distinct purpose in the engagement process.
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
        <SectionHeader title="Understanding the Tabs (Detailed)" icon={<ListBulletIcon className="w-6 h-6" />} id={`${tabIdValue}-understanding-tabs`} />
        <ul className="space-y-4 text-gray-700">
          {TAB_METADATA.map(tab => (
            <li key={tab.id}>
              <strong className="text-gray-800">{tab.label}:</strong> {tab.purpose || TAB_PURPOSES[tab.id] || "Details to be updated."}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <SectionHeader title="Tab Availability by Role" icon={<InformationCircleIcon className="w-6 h-6" />} id={`${tabIdValue}-tab-availability`} />
        <p className="mb-2 text-gray-700">The tabs you see are based on the role selected in the "Controls Section". Here's a general guide:</p>
        <ul className="space-y-2 text-gray-700">
            <li><strong>Sales:</strong> {getTabsForRole(Role.SALES)}</li>
            <li><strong>Presales:</strong> {getTabsForRole(Role.PRESALES)}</li>
            <li><strong>Customer Success Manager (CSM):</strong> {getTabsForRole(Role.CSM)}</li>
            <li><strong>Sales Admin/Development (SAD):</strong> {getTabsForRole(Role.SAD)}</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">The 'Home' and 'Help' tabs are available to all roles.</p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <SectionHeader title="How to Export Data" icon={<ArrowDownTrayIcon className="w-6 h-6" />} id={`${tabIdValue}-export-data`} />
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

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <SectionHeader title="Admin Panel" icon={<InformationCircleIcon className="w-6 h-6" />} id={`${tabIdValue}-admin-panel`} />
        <p className="text-gray-700 leading-relaxed">
          An Admin Panel is available (typically accessed via a settings icon in the header) for authorised users. This panel allows for the customisation of various hardcoded elements within the application, such as:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700 pl-4 mt-2">
            <li>Application titles and branding elements.</li>
            <li>Questions used in the Opportunity Scorecard and Qualification tabs.</li>
            <li>Input fields and calculation constants for the ROI Calculator.</li>
            <li>Templates for Discovery Questions.</li>
            <li>The structure and content for the Pain Point Hierarchy and Reverse Waterfall Cheat Sheets.</li>
            <li>Boilerplate content for the Solution Builder.</li>
        </ul>
        <p className="mt-2 text-gray-700">Changes made in the Admin Panel are saved to your browser's local storage and will override the application's default settings. This allows for dynamic customisation of the tool's content to better suit specific needs or ongoing campaigns without requiring code changes.</p>
      </div>

    </section>
  );
});

export default HelpTab;
