import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MealLogger = () => {
  const [meals, setMeals] = useState([
    { name: 'Oatmeal with Berries', calories: 250 },
    { name: 'Grilled Chicken Salad', calories: 400 },
  ]);
  const [mealInput, setMealInput] = useState({ name: '', calories: '' });
  const [goal, setGoal] = useState('maintain');
  const [showModal, setShowModal] = useState(false);

  const handleMealChange = (e) => {
    setMealInput({ ...mealInput, [e.target.name]: e.target.value });
  };

  const handleAddMeal = () => {
    if (mealInput.name && mealInput.calories) {
      setMeals([...meals, { name: mealInput.name, calories: parseInt(mealInput.calories) }]);
      setMealInput({ name: '', calories: '' });
    }
  };

  const calorieData = {
    labels: meals.map((meal) => meal.name),
    datasets: [
      {
        label: 'Calories',
        data: meals.map((meal) => meal.calories),
        backgroundColor: '#10b981',
      },
    ],
  };

  const nutritionTips = {
    gain: [
      'Increase protein intake (chicken, eggs, legumes)',
      'Eat every 2-3 hours',
      'Add healthy fats like nuts and avocados',
    ],
    loss: [
      'Focus on high-volume, low-calorie foods',
      'Avoid sugary drinks and processed foods',
      'Include more fiber and lean protein',
    ],
    maintain: [
      'Keep a balanced macronutrient diet',
      'Stay consistent with meal portions',
      'Monitor weight weekly for adjustments',
    ],
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Nutrition Guidance</h2>
        <div className="flex items-center gap-3">
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm"
          >
            <option value="gain">Gain</option>
            <option value="loss">Loss</option>
            <option value="maintain">Maintain</option>
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-full text-sm shadow-md flex items-center gap-1"
          >
            💡 Tips
          </button>
        </div>
      </div>

      {/* Meal Logger & Calorie Chart */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Meal Logger */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Meal Logger</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Meal Name"
              value={mealInput.name}
              onChange={handleMealChange}
              className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
            />
            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={mealInput.calories}
              onChange={handleMealChange}
              className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700"
            />
            <button
              onClick={handleAddMeal}
              className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
              Add Meal
            </button>
          </div>

          {/* Meal List */}
          <ul className="mt-4 space-y-2 text-sm">
            {meals.map((meal, idx) => (
              <li key={idx} className="flex justify-between items-center border-b pb-1">
                <span>{meal.name}</span>
                <span>{meal.calories} kcal</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Calorie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Calorie Tracking</h3>
          <Bar data={calorieData} />
        </div>
      </div>

      {/* Tips Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <h3 className="text-xl font-bold mb-4 text-center text-emerald-600 dark:text-emerald-400">
              Tips for {goal === 'gain' ? 'Gaining' : goal === 'loss' ? 'Losing' : 'Maintaining'} Weight
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              {nutritionTips[goal].map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealLogger;
