import React from 'react';
import WorkoutSummaryCard from './WorkoutSummaryCard';
import WorkoutDatePicker from './WorkoutDatePicker';
import WorkoutLogger from './WorkoutLogger';
import WorkoutHistoryTimeline from './WorkoutHistoryTimeline';
import PersonalRecords from './PersonalRecords';
import ExerciseGallery from './ExerciseGallery';
import FloatingActionButton from './FloatingActionButton';
import SmartSuggestion from './SmartSuggestion';
import MotivationalToast from './MotivationalToast';
import { FiImage, FiMessageSquare, FiGithub, FiTwitter, FiHeart } from 'react-icons/fi';


const WorkoutPage = () => {
  
  return (
    <div className="min-h-screen  bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4 md:px-12 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
           Workout Dashboard
        </h1>
        <div className="text-sm md:text-base opacity-80 italic">
          "Push past your limits, embrace the grind, and let sweat be your witness."
        </div>
      </header>

      <WorkoutSummaryCard />

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div >
          <WorkoutDatePicker />
          <SmartSuggestion />
          <WorkoutLogger />
        </div>

        <div className="space-y-6">
          <div >
            <ExerciseGallery />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div >
          <WorkoutHistoryTimeline />
        </div>
        <div>
          <PersonalRecords />
        </div>
      </div>

      <FloatingActionButton />
      <MotivationalToast />
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

export default WorkoutPage;