import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <ImSpinner2 className="animate-spin text-emerald-500 text-4xl" />
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">Loading your FitMe experience...</p>
      </div>
    </div>
  );
};

export default PageLoader;
