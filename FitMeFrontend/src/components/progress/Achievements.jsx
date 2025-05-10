import React from 'react';

const achievements = [
  { title: 'First Workout', description: 'Completed your first workout session', earned: true },
  { title: '10 Workouts', description: 'Completed 10 workout sessions', earned: true },
  { title: 'Consistency Master', description: 'Worked out 30 days in a row', earned: false },
  { title: 'Strong Start', description: 'Burned 5000 calories in a month', earned: true },
];

const Achievements = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Achievements</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md ${achievement.earned ? 'bg-emerald-100 dark:bg-emerald-800' : 'bg-gray-200 dark:bg-white/10'}`}
          >
            <div className="text-center">
              <div
                className={`w-12 h-12 rounded-full mx-auto mb-2 ${achievement.earned ? 'bg-emerald-500 text-white' : 'bg-gray-400 text-gray-700'}`}
              >
                <span className="flex justify-center items-center w-full h-full text-2xl">
                  {achievement.earned ? '✔️' : '❌'}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-800 dark:text-white">{achievement.title}</h4>
              <p className="text-xs text-gray-600 dark:text-white/60">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
