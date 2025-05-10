import React from 'react';
import Achievements from './Achievements';
import GoalProgress from './GoalProgress';
import ProgressChart from './ProgressChart';
import WeeklyGoalProgress from './WeeklyGoalProgress';
import StreakTracker from './StreakTracker';
import { FiImage, FiMessageSquare, FiGithub, FiTwitter, FiHeart } from 'react-icons/fi';


const ProgressPage = () => {
  return (
    <div className="p-6 space-y-6  dark:bg-gray-900 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Progress Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Achievements />
        <GoalProgress />
        <StreakTracker />
      </div>


      <div className="space-y-6- grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <ProgressChart />
        <WeeklyGoalProgress />
      </div>
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-center gap-4 mb-2">
                      <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition">
                        <FiGithub className="inline-block text-xl" />
                      </a>
                      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition">
                        <FiTwitter className="inline-block text-xl" />
                      </a>
                    </div>
                    <p>
                      Made with <FiHeart className="inline-block text-red-500 mx-1" /> by farhanadil FitMe 
                    </p>
                    <p className="text-xs mt-1">&copy; {new Date().getFullYear()} FitMe. All rights reserved.</p>
                  </footer>

      

      
    </div>
  );
};

export default ProgressPage;
