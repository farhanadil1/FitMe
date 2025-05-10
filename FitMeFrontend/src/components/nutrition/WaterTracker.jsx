import React, { useState } from 'react';

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(() => Number(localStorage.getItem('water')) || 0);

  const updateGlasses = (amount) => {
    const newVal = Math.max(0, Math.min(glasses + amount, 8));
    setGlasses(newVal);
    localStorage.setItem('water', newVal);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow w-full max-w-md mx-auto transition-all">
      <h2 className="text-lg font-semibold text-gray-800 mb-6 dark:text-white gap-2">
       
        Daily Water Intake
      </h2>

      {/* Display counter */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {glasses} / 8 glasses
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Stay hydrated throughout the day!</p>
      </div>

      {/* Water Glasses */}
      <div className="grid grid-cols-8 gap-3 justify-items-center mb-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-14 rounded-md transition-all duration-300 shadow-sm
              ${i < glasses
                ? 'bg-emerald-500 dark:bg-teal-400'
                : 'bg-gray-200 dark:bg-gray-600'}
              hover:scale-105`}
            title={`Glass ${i + 1}`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6">
        <button
          onClick={() => updateGlasses(-1)}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-md transform hover:scale-105 transition-all duration-200"
          title="Remove a glass"
        >
          −
        </button>
        <button
          onClick={() => updateGlasses(1)}
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-md transform hover:scale-105 transition-all duration-200"
          title="Add a glass"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
