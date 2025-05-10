import React, { useState, useEffect } from 'react';
import { FaFireAlt, FaClock, FaDumbbell, FaEdit, FaCheck } from 'react-icons/fa';

const WorkoutSummaryCard = () => {
  const defaultSummary = {
    calories: 620,
    duration: '1h 15m',
    exercises: 8,
  };

  const [summary, setSummary] = useState(defaultSummary);
  const [editMode, setEditMode] = useState({
    calories: false,
    duration: false,
    exercises: false,
  });
  const [tempValues, setTempValues] = useState(defaultSummary);

  // Load from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('workoutSummary');
    if (stored) {
      setSummary(JSON.parse(stored));
    }
  }, []);

  const handleEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
    setTempValues((prev) => ({ ...prev, [field]: summary[field] }));
  };

  const handleSave = (field) => {
    const updated = { ...summary, [field]: tempValues[field] };
    setSummary(updated);
    setEditMode((prev) => ({ ...prev, [field]: false }));
    localStorage.setItem('workoutSummary', JSON.stringify(updated));
  };

  const renderCard = (icon, label, value, field) => (
    <div className="relative bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition-transform dark:from-emerald-800 dark:to-teal-700">
      {icon}
      <div className="flex-1">
        <h3 className="text-sm text-white/80 dark:text-white/60">{label}</h3>
        {editMode[field] ? (
          <input
            className="text-xl font-semibold bg-white/10 rounded px-2 py-1 text-white w-full dark:bg-gray-700"
            value={tempValues[field]}
            onChange={(e) =>
              setTempValues((prev) => ({ ...prev, [field]: e.target.value }))
            }
          />
        ) : (
          <p className="text-xl font-semibold text-white dark:text-white">{value}</p>
        )}
      </div>
      {editMode[field] ? (
        <button onClick={() => handleSave(field)} className="text-white hover:text-green-300">
          <FaCheck />
        </button>
      ) : (
        <button onClick={() => handleEdit(field)} className="text-white hover:text-yellow-300">
          <FaEdit />
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {renderCard(<FaFireAlt className="text-3xl text-white drop-shadow" />, 'Calories Burned', `${summary.calories} kcal`, 'calories')}
      {renderCard(<FaClock className="text-3xl text-white drop-shadow" />, 'Workout Duration', summary.duration, 'duration')}
      {renderCard(<FaDumbbell className="text-3xl text-white drop-shadow" />, 'Exercises Completed', summary.exercises, 'exercises')}
    </div>
  );
};

export default WorkoutSummaryCard;
