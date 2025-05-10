import React from 'react';
import { CalendarDays } from 'lucide-react';

const WorkoutDatePicker = ({ selectedDate, onChange }) => {
  // Ensure that selectedDate is not undefined or null
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    if (onChange) {
      onChange(e.target.value); // Pass the selected date back to the parent component
    }
  };

  return (
    <div className="backdrop-blur-md bg-white shadow dark:bg-gray-800 p-4 rounded-xl border border-white/10">
      <label className="flex items-center gap-2 text-gray-800 dark:text-white text-sm font-medium">
        <CalendarDays className="w-5 h-5 text-emerald-300" />
        Select Workout Date:
      </label>
      <input
        type="date"
        className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
        max={today}
        value={selectedDate || today} // Fallback to today if no date is selected
        onChange={handleDateChange} // Using the handleDateChange function
      />
    </div>
  );
};

export default WorkoutDatePicker;
