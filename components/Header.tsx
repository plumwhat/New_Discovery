
import React from 'react';
import { APP_TITLE, APP_SUBTITLE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-6 shadow-md">
      <h1 className="text-3xl font-bold">{APP_TITLE}</h1>
      <p className="text-lg opacity-90">{APP_SUBTITLE}</p>
    </header>
  );
};

export default Header;
