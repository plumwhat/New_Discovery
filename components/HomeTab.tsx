
import React from 'react';
import { TabProps, Role, TabId } from '../types'; // Ensure TabId is imported
import { TAB_METADATA } from '../constants'; // Use TAB_METADATA
import { LightBulbIcon, ListBulletIcon, InformationCircleIcon, ArrowDownTrayIcon } from './common/Icons';

const HomeTab: React.FC<TabProps> = ({ appState }) => {
  const getTabsForRole = (role: Role) => {
    // Use TAB_METADATA which doesn't contain component functions directly
    return TAB_METADATA
      .filter(tab => tab.roles.includes(role) && tab.id !== TabId.HOME)
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the Process Automation Discovery & ROI Tool</h2>
        <p className="text-gray-700 leading-relaxed">
          This tool is designed to assist presales consultants, sales professionals, and SDRs/SADs in effectively conducting discovery, qualifying opportunities, and assessing the potential return on investment for various process automation solutions. It standardizes the data collection process and provides clear outputs for decision-making and proposal building.
        </p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <SectionHeader title="Getting Started" icon={<LightBulbIcon className="w-6 h-6" />} />
        <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
          <li>
            <strong>Select Your Role:</strong> Choose your current role (Presales, Sales, SDR/SAD) from the dropdown at the top. This tailors the available tabs and features to your needs.
          </li>
          <li>
            <strong>Choose Automation Type & Module:</strong> Select the type of automation (e.g., Finance Automation, Business Automation) and then the specific process module (e.g., Accounts Payable, Document Management) you are evaluating. This is particularly important for Discovery Questions, ROI Calculator and the Solution Builder.
          </li>
          <li>
            <strong>Navigate Through Tabs:</strong> Work through the available tabs (listed below) to input data, answer questions, and see calculated results.
          </li>
          <li>
            <strong>Export Your Data:</strong> Once you've completed your assessment, use the 'Actions & Export' section at the bottom of the page to export your findings in various formats.
          </li>
        </ol>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <SectionHeader title="Understanding the Tabs" icon={<ListBulletIcon className="w-6 h-6" />} />
        <ul className="space-y-4 text-gray-700">
          <li>
            <strong className="text-gray-800">Home (This Tab):</strong> Provides an overview of the tool, guidance on how to use it, and general information about its features.
          </li>
          <li>
            <strong className="text-gray-800">Opportunity Scorecard:</strong> (Available for Sales) Quickly assess the high-level viability of an opportunity based on key criteria. Generates a score out of 100 to give an initial indication.
          </li>
          <li>
            <strong className="text-gray-800">Qualification:</strong> (Available for Sales, Presales, SDR/SAD) Delve deeper into qualitative and quantitative aspects of the opportunity. This section helps determine if an opportunity is qualified, requires further clarification, or is not suitable for automation at this time. Includes customizable scoring thresholds via Admin Settings.
          </li>
          <li>
            <strong className="text-gray-800">Discovery Questions:</strong> (Available for Presales, SDR/SAD) Access a comprehensive list of module-specific questions for the selected module, categorized into qualitative and quantitative sections. These questions are designed to guide detailed discovery conversations with prospects. You can also add your own custom questions.
          </li>
          <li>
            <strong className="text-gray-800">ROI Calculator:</strong> (Available for Sales, Presales) Input key metrics related to the chosen process module to calculate potential Return on Investment. The calculator estimates annual gross savings, total net benefit over the solution's lifespan, payback period, and provides an annual financial breakdown.
          </li>
          <li>
            <strong className="text-gray-800">Solution Builder:</strong> (Available for Presales) Visually construct a customer's solution by selecting a core module and adding requirement blocks. Each block details a requirement and how the software addresses it. Generate a document summary of the built solution.
          </li>
        </ul>
      </div>
      
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
        <SectionHeader title="Tab Availability by Role" icon={<InformationCircleIcon className="w-6 h-6" />} />
        <ul className="space-y-2 text-gray-700">
            <li><strong>Sales:</strong> {getTabsForRole(Role.SALES)}</li>
            <li><strong>Presales:</strong> {getTabsForRole(Role.PRESALES)}</li>
            <li><strong>SDR/SAD:</strong> {getTabsForRole(Role.SDR_SAD)}</li>
        </ul>
        <p className="mt-2 text-sm text-gray-500">The 'Home' tab is available to all roles.</p>
      </div>

      <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
        <SectionHeader title="How to Export Data" icon={<ArrowDownTrayIcon className="w-6 h-6" />} />
        <p className="text-gray-700 mb-2">
          In the 'Actions & Export' section located at the bottom of the page:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-2">
          <li>
            <strong>Select Your Desired Format:</strong> Choose from Text File (.txt), Markdown (.md), AI Prompt (.txt), or HTML File (.html).
          </li>
          <li>
            <strong>Click the 'Export Data' Button:</strong> This will compile all the data you've entered and the results generated throughout the application.
          </li>
          <li>
            <strong>Download Your File:</strong> Your browser will automatically download the file. The filename will typically include the module name and the date.
          </li>
        </ol>
        <p className="mt-3 text-gray-700">
          <strong className="text-gray-800">HTML Export:</strong> This format provides a structured HTML document, viewable in any web browser. It's suitable for easy sharing, printing, or archiving a more visually organized report.
        </p>
        <p className="mt-3 text-gray-700">
          <strong className="text-gray-800">AI Prompt Export:</strong> This format structures the data as a prompt for AI analysis, particularly useful for generating summaries or insights using generative AI models.
        </p>
      </div>
    </div>
  );
};

export default HomeTab;
