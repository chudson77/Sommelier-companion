
import React from 'react';
import { WineIcon } from './icons/WineIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-black/20 backdrop-blur-sm p-4 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-center">
        <WineIcon className="w-8 h-8 mr-3 text-indigo-400" />
        <h1 className="text-2xl font-bold tracking-wider text-gray-100">
          AI Wine Sommelier
        </h1>
      </div>
    </header>
  );
};

export default Header;
