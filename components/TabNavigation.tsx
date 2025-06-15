
import React from 'react';
import { AppState, TabId, TabDefinition } from '../types';

interface TabNavigationProps {
  tabs: TabDefinition[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-6 border-b border-gray-300">
      <nav className="-mb-px flex space-x-4" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm focus:outline-none
              ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50' // Active tab style
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
