
import React from 'react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';
// Removed Button and Cog6ToothIcon imports as Admin toggle is removed.
// Removed AppState import.

interface HeaderProps {
  // No props needed now as admin toggle is removed
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-blue-600 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold">{APP_TITLE}</h1>
          <p className="text-lg opacity-90">{APP_SUBTITLE}</p>
        </div>
        {/* Admin toggle button removed */}
      </div>
    </header>
  );
};

export default Header;