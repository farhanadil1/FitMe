import React from 'react';

const weeklyGoals = [
  {
    label: 'Calories',
    value: 7200,
    target: 10000,
    color: 'emerald',
  },
  {
    label: 'Workouts',
    value: 5,
    target: 7,
    color: 'sky',
  },
  {
    label: 'Hours',
    value: 4.5,
    target: 7,
    color: 'amber',
  },
];

const getProgress = (value, target) => Math.min((value / target) * 100, 100).toFixed(0);

const WeeklyGoalProgress = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {weeklyGoals.map((goal, idx) => {
        const percent = getProgress(goal.value, goal.target);
        return (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-md transition text-center"
          >
            <svg className="mx-auto w-24 h-24 transform -rotate-90">
              <circle
                className="text-gray-200 dark:text-white/10"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="36"
                cx="48"
                cy="48"
              />
              <circle
                className={`text-${goal.color}-500`}
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="36"
                cx="48"
                cy="48"
                strokeDasharray="226.2"
                strokeDashoffset={226.2 - (226.2 * percent) / 100}
              />
            </svg>
            <div className="mt-4">
              <h3 className="text-sm text-gray-600 dark:text-white/70">{goal.label}</h3>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {goal.value} / {goal.target}
              </p>
              <p className={`text-sm font-medium text-${goal.color}-500`}>{percent}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyGoalProgress;
