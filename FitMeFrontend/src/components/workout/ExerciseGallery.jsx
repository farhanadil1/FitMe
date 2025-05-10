import React from 'react';
import BP from '../../assets/benchpress.webp';
import DL from '../../assets/deadlift.gif';
import SQ from '../../assets/squat.gif';
import PU from '../../assets/pullup.gif';
import SP from '../../assets/press.gif'
import BC from '../../assets/curls.gif';
import DP from '../../assets/dips.gif';
import PL from '../../assets/plank.gif';
import { image } from 'framer-motion/client';

const defaultExercises = [
  {
    title: 'Bench Press',
    image: BP,
    tip: 'Keep your back flat and grip firm.',
  },
  {
    title: 'Deadlift',
    image: DL,
    tip: 'Engage your core and lift with your legs.',
  },
  {
    title: 'Squat',
    image:SQ,
    tip: 'Keep knees aligned with toes and chest up.',
  },
  {
    title: 'Pull-Up',
    image: PU,
    tip: 'Avoid swinging, pull chest to bar.',
  },
  {
    title: 'Shoulder Press',
    image: SP,
    tip: 'Push straight overhead, don’t arch back.',
  },
  {
    title: 'Bicep Curl',
    image: BC,
    tip: 'Keep elbows stable, full range of motion.',
  },
  {
    title: 'Tricep Dips',
    image: DP,
    tip: 'Lower slowly, elbows tight.',
  },
  {
    title: 'Plank',
    image: PL,
    tip: 'Keep spine neutral, engage core.',
  },
];

const ExerciseGallery = ({ exercises = defaultExercises }) => {
  return (
    <div className="bg-white shadow dark:bg-gray-800 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 p-4 transition">
      <h2 className="text-lg text-black dark:text-white font-semibold mb-4">
        Exercise Gallery
      </h2>

      {exercises.length === 0 ? (
        <div className="text-gray-500 dark:text-white/60 italic text-center py-8">
          No exercises available. Please add some to get started.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {exercises.map((ex, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-white/5 rounded-xl overflow-hidden shadow-md hover:scale-[1.03] transition-transform"
            >
              <img
                src={ex.image}
                alt={ex.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-800 dark:text-white mb-1">
                  {ex.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-white/60">
                  {ex.tip}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExerciseGallery;
