
import React from 'react';
import { TabProps, Role } from '../types';
import { TABS, ROLES } from '../constants';

const HomeTab: React.FC<TabProps> = () => {

  const getTabsForRole = (role: Role) => {
    return TABS
      .filter(tab => tab.roles.includes(role))
      .map(tab => tab.label)
      // Ensure "Home" tab is not listed under itself for this display
      .filter(label => label !== "Home"); 
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <h2 className="text-2xl font-bold text-blue-700">Welcome to the Process Automation Discovery &amp; ROI Tool!</h2>
      
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Getting Started: Follow These Steps</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Select Your Role:</strong> Use the dropdown at the top to choose your current role (Sales, Presales, or SDR/SAD). This will tailor the available features and relevant information.</li>
          <li><strong>Select Automation Type:</strong> Choose whether you're focusing on "Finance Automation" or "Business Automation" to filter the list of process modules.</li>
          <li><strong>Select Module:</strong> Based on the automation type, pick the specific process module you're evaluating (e.g., Accounts Payable, Document Management). The content in Qualification, Discovery, and ROI tabs will update accordingly.</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding the Tabs</h3>
        <p className="text-gray-600 mb-6">This tool is designed to guide you through the presales process, from initial qualification to detailed discovery and ROI estimation. Each tab serves a specific purpose:</p>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-blue-600">Home</h4>
            <p className="text-gray-700">You are here! This tab provides an overview of the tool's functionality, how to get started, and explanations for each section.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-600">Opportunity Scorecard</h4>
            <p className="text-gray-700">This is used by Sales to determine a score for the opportunity. It helps quickly assess the initial viability based on key criteria like executive sponsorship, defined pain points, budget, and timeline.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-600">Qualification</h4>
            <p className="text-gray-700">This tab is used to determine, based on a predefined set of Qualitative and Quantitative questions, if this is a good opportunity to move forward with. Each question has drop-down answers with associated ratings. Once you have answered the questions for each section, you will need to click on the 'Check Status' button. This will calculate an average score and show the opportunity's rating: Qualified, Requires Clarification, or Do Not Proceed.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-600">Discovery Questions</h4>
            <p className="text-gray-700">This section presents a structured set of questions, based on the selected module, to ask an opportunity to gather detailed information about their current processes, challenges, and quantitative metrics. It also allows you to add your own custom questions and record answers for any additional information you need to capture during the discovery phase.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-600">ROI Calculator</h4>
            <p className="text-gray-700">The ROI Calculator allows you to enter global assumptions (like average salary) and module-specific metrics (like number of invoices or error rates). Based on these inputs, along with the cost of the software and the expected lifespan of the solution, it determines a potential Return on Investment. Details can be updated, and you will need to click the 'Calculate ROI' button to perform the calculation and see the estimated savings, payback period, and a breakdown of how the savings are calculated.</p>
          </div>
        </div>
      </section>

      <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Tab Availability by Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ROLES.map(role => (
                <div key={role} className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <h4 className="font-semibold text-gray-700 text-lg mb-2">{role}:</h4>
                  <ul className="list-disc list-inside pl-5 space-y-1 text-sm text-gray-600">
                    {getTabsForRole(role).map(tabLabel => (
                      <li key={`${role}-${tabLabel}`}>{tabLabel}</li>
                    ))}
                     <li>Home (This Tab)</li>
                  </ul>
                </div>
              ))}
          </div>
      </section>

      <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Exporting Your Data</h3>
          <p className="text-gray-700 mb-2">Once you've gathered information across the various tabs, you can export all relevant data using the 'Export' section found at the bottom of the page. The available formats are:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li><strong>Text File (.txt):</strong> A plain text dump of all collected data for the selected module and global settings. Good for quick sharing or archiving.</li>
              <li><strong>Markdown (.md):</strong> Exports data in Markdown format. This is useful as it keeps basic formatting (headings, lists) and can be easily used in documentation, wikis, or any markdown editor.</li>
              <li><strong>AI Prompt (.txt):</strong> This generates a specially formatted text file that includes all the captured data along with a set of instructions. You can copy and paste this entire content into a large language model (like Gemini) to request a summary, identify key insights, or generate follow-up questions based on the information gathered.</li>
              <li><strong>HTML File (.html):</strong> Exports the data as a structured HTML document. This format is viewable in any web browser and preserves a good level of formatting, making it suitable for sharing as a self-contained report.</li>
          </ul>
      </section>
    </div>
  );
};

export default HomeTab;
