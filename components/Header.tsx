

import React from 'react';
import { getAppTitle, getAppSubtitle } from '../services/configService';
import { Cog6ToothIcon, ArrowPathIcon } from './common/Icons'; // Added ArrowPathIcon
import Button from './common/Button';

interface HeaderProps {
  toggleAdminPanel: () => void;
  onResetAllData: () => void; // Added prop for reset
}

const Header: React.FC<HeaderProps> = ({ toggleAdminPanel, onResetAllData }) => {
  const appTitle = getAppTitle();
  const appSubtitle = getAppSubtitle();

  return (
    <header className="bg-[#01916D] text-white p-6 shadow-md print-hidden">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold">{appTitle}</h1>
          <p className="text-lg opacity-90">{appSubtitle}</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={onResetAllData}
            variant="ghost"
            size="sm"
            className="!text-white hover:!bg-[#017a59]"
            aria-label="Reset All Application Data"
            title="Reset All Application Data"
          >
            <ArrowPathIcon className="w-6 h-6" />
          </Button>
          <Button 
            onClick={toggleAdminPanel}
            variant="ghost"
            size="sm"
            className="!text-white hover:!bg-[#017a59]"
            aria-label="Open Admin Settings"
            title="Admin Settings"
          >
            <Cog6ToothIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;