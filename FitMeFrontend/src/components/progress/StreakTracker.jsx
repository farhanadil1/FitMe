import React, { useEffect, useState } from 'react';
import { FaFireAlt } from 'react-icons/fa';

const StreakTracker = () => {
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('streak')) || 0);
  const [lastUpdated, setLastUpdated] = useState(() => localStorage.getItem('lastStreakDate') || null);

  useEffect(() => {
    const today = new Date().toLocaleDateString();

    if (lastUpdated !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toLocaleDateString();

      if (lastUpdated === yesterdayStr) {
        setStreak(prev => {
          const newStreak = prev + 1;
          localStorage.setItem('streak', newStreak);
          return newStreak;
        });
      } else {
        setStreak(1);
        localStorage.setItem('streak', 1);
      }

      setLastUpdated(today);
      localStorage.setItem('lastStreakDate', today);
    }
  }, [lastUpdated]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center gap-4">
      <FaFireAlt className="text-4xl text-orange-500 drop-shadow-sm" />
      <div>
        <h3 className="text-md font-semibold text-gray-700 dark:text-white/80">Current Streak</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{streak} days</p>
        <p className="text-sm text-gray-500 dark:text-white/60">Keep going! Don’t break the chain.</p>
      </div>
    </div>
  );
};

export default StreakTracker;
