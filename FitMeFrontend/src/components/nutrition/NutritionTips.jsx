import React from 'react';

const tips = [
  "Drink water before meals.",
  "Include fiber-rich foods.",
  "Avoid processed sugar.",
  "Eat plenty of vegetables.",
  "Balance protein and carbs.",
];

const NutritionTips = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Daily Nutrition Tips</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionTips;
