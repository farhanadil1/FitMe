import React, { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FiBarChart2 } from 'react-icons/fi';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ProgressAnalytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputData, setInputData] = useState({
    weight: [70, 69.5, 69, 68.8],
    reps: [30, 40, 10, 20],
    calories: [300, 450, 500, 400, 600, 550],
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e, index, type) => {
    const updated = [...inputData[type]];
    updated[index] = parseFloat(e.target.value) || 0;
    setInputData({ ...inputData, [type]: updated });
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } },
  };

  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Weight (kg)',
      data: inputData.weight,
      borderColor: '#10b981',
      backgroundColor: '#10b98133',
      tension: 0.4,
    }],
  };

  const repsData = {
    labels: ['Push-ups', 'Squats', 'Pull-ups', 'Lunges'],
    datasets: [{
      label: 'Reps',
      data: inputData.reps,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f633',
      tension: 0.4,
    }],
  };

  const caloriesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Calories Burned',
      data: inputData.calories,
      borderColor: '#f97316',
      backgroundColor: '#f9731633',
      tension: 0.4,
    }],
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Progress Analytics</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          <FiBarChart2 />
          Visualize Progress
        </button>
      </div>

      {/* Horizontal scrollable charts */}
      <div className="flex gap-6 overflow-x-auto pb-2 w-full">
        {/* Weight Chart */}
        <div className="min-w-[300px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-shrink-0">
          <h3 className="font-semibold mb-2">Weight Progress</h3>
          <Line data={weightData} options={chartOptions} />
        </div>

        {/* Reps Chart */}
        <div className="min-w-[300px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-shrink-0">
          <h3 className="font-semibold mb-2">Reps Progress</h3>
          <Line data={repsData} options={chartOptions} />
        </div>

        {/* Calories Chart */}
        <div className="min-w-[300px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex-shrink-0">
          <h3 className="font-semibold mb-2">Calories Burned</h3>
          <Line data={caloriesData} options={chartOptions} />
        </div>
      </div>

      {/* Input Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Enter Progress Data</h3>

            {/* Weight Inputs */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Weight (kg)</label>
              <div className="grid grid-cols-2 gap-2">
                {inputData.weight.map((value, i) => (
                  <input
                    key={i}
                    type="number"
                    value={value}
                    placeholder={`Week ${i + 1} weight`}
                    onChange={(e) => handleChange(e, i, 'weight')}
                    className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
                  />
                ))}
              </div>
            </div>

            {/* Reps Inputs */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Reps</label>
              <div className="grid grid-cols-2 gap-2">
                {['Push-ups', 'Squats', 'Pull-ups', 'Lunges'].map((label, i) => (
                  <input
                    key={i}
                    type="number"
                    value={inputData.reps[i]}
                    placeholder={`Reps: ${label}`}
                    onChange={(e) => handleChange(e, i, 'reps')}
                    className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
                  />
                ))}
              </div>
            </div>

            {/* Calories Inputs */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Calories Burned</label>
              <div className="grid grid-cols-3 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <input
                    key={i}
                    type="number"
                    value={inputData.calories[i]}
                    placeholder={`Calories: ${day}`}
                    onChange={(e) => handleChange(e, i, 'calories')}
                    className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Save & Visualize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressAnalytics;
