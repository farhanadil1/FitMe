import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalorieChart = () => {
  const [consumed, setConsumed] = useState(0);
  const [goal, setGoal] = useState(2000);
  const [isEditing, setIsEditing] = useState(false);
  const [inputGoal, setInputGoal] = useState(goal);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.userid) {
      axios.get(`http://localhost:8053/api/meals/totalCalories/${user.userid}`)
        .then((res) => setConsumed(res.data))
        .catch((err) => console.error("Failed to fetch total calories:", err));
    }
  }, []);

  const percentage = Math.min((consumed / goal) * 100, 100).toFixed(0);

  const handleSave = () => {
    const parsed = parseInt(inputGoal);
    if (!isNaN(parsed) && parsed > 0) {
      setGoal(parsed);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-black dark:text-white">Daily Calorie Progress</h2>
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={inputGoal}
              onChange={(e) => setInputGoal(e.target.value)}
              className="w-20 rounded px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
            />
            <button
              onClick={handleSave}
              className="text-emerald-600 text-sm font-medium"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-teal-500 hover:underline"
          >
            Edit Goal
          </button>
        )}
      </div>

      <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full text-white text-sm text-center leading-6 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {consumed} / {goal} kcal consumed
      </p>
    </div>
  );
};

export default CalorieChart;
