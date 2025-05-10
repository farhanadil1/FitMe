import React from 'react';

const goals = [
  {
    label: 'Weight Goal',
    current: 68,
    target: 60,
    unit: 'kg',
  },
  {
    label: 'Workout Sessions',
    current: 18,
    target: 30,
    unit: 'sessions',
  },
  {
    label: 'Calories Burned',
    current: 12000,
    target: 20000,
    unit: 'kcal',
  },
];

const GoalProgress = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Goal Progress</h2>
      {goals.map((goal, index) => {
        const percentage = Math.min((goal.current / goal.target) * 100, 100);
        return (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-white/80">
              <span>{goal.label}</span>
              <span>
                {goal.current} / {goal.target} {goal.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-emerald-500 transition-all"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoalProgress;
