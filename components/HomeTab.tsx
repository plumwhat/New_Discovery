

import React from 'react';
import { TabProps, TabId, Role } from '../types';
import { TAB_METADATA, TAB_PURPOSES } from '../constants'; // TAB_METADATA has purpose
import { HomeIcon } from './common/Icons';

const HomeTab: React.FC<TabProps> = ({ appState }) => {
  const { selectedRole } = appState;

  const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode; className?: string }> = ({ title, icon, className }) => (
    <div className={`flex items-center mb-3 ${className}`}>
      {icon && <span className="mr-2 text-blue-500">{icon}</span>}
      <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
    </div>
  );

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
          <HomeIcon className="w-8 h-8 mr-2 text-blue-600" />
          Welcome to the Process Automation: Engagement Platform
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool is designed to assist Sales, Presales, SDRs, and SADs in performing discovery, qualification, ROI calculation, and solution building for process automation opportunities.
          Below is an overview of each tab available in the application. Your currently selected role is: <strong>{selectedRole}</strong>.
        </p>
         <p className="mt-2 text-sm text-gray-600">
            For detailed instructions on how to use each tab and the tool in general, please visit the <strong className="text-blue-600">Help</strong> tab.
        </p>
      </div>

      <div className="space-y-6">
        <SectionHeader title="Application Tabs Overview" />
        {TAB_METADATA.map((tab) => (
          <div key={tab.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-2">
              {tab.icon && React.createElement(tab.icon, { className: "w-6 h-6 mr-2 text-blue-500" })}
              <h4 className="text-lg font-semibold text-gray-800">{tab.label}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong className="text-gray-700">Purpose:</strong> {tab.purpose || "General purpose."}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-700">Accessible by Roles:</strong> {tab.roles.join(', ')}
            </p>
             {!tab.roles.includes(selectedRole) && (
                <p className="mt-1 text-xs text-orange-600 bg-orange-50 p-1 rounded">
                    Note: This tab is not visible with your current role ({selectedRole}).
                </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTab;