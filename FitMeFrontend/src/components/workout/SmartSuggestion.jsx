import React from 'react';
import { Lightbulb } from 'lucide-react';

const SmartSuggestion = () => {
  const suggestions = [
    'Add drop sets for your final set',
    'Increase reps by 10% from last session',
    'Try supersetting biceps and triceps',
    'Focus on form over weight today'
  ];
  const tip = suggestions[Math.floor(Math.random() * suggestions.length)];

  return (
    <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-4 rounded-xl mt-4 flex items-center gap-3 shadow-md">
      <Lightbulb className="text-yellow-300 w-6 h-6 animate-pulse" />
      <p className="text-white font-medium">💡 {tip}</p>
    </div>
  );
};

export default SmartSuggestion;