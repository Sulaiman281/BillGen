
import React from 'react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  const { profile } = useAppContext();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-blue-600 dark:bg-gray-900 dark:border-blue-500">
      <div className="flex items-center">
        {/* Placeholder for potential mobile menu button */}
      </div>
      <div className="flex items-center">
        <span className="text-gray-700 dark:text-gray-200 font-semibold">{profile.name}</span>
      </div>
    </header>
  );
};

export default Header;
