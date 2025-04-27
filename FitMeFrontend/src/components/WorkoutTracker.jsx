import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FiEdit } from 'react-icons/fi';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const WorkoutTracker = () => {
    const [workoutPlan, setWorkoutPlan] = useState([
      { day: 'Monday', workout: 'Chest + Triceps' },
      { day: 'Tuesday', workout: 'Back + Biceps' },
      { day: 'Wednesday', workout: 'Legs' },
      { day: 'Thursday', workout: 'Shoulders + Abs' },
      { day: 'Friday', workout: 'Arms' },
      { day: 'Saturday', workout: 'Calesthenics' },
    ]);
  
    const progressData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Weight Lifted (kg)',
          data: [100, 120, 135, 150],
          fill: false,
          borderColor: 'rgb(34 197 94)',
          tension: 0.3,
        },
      ],
    };
  
    const [exerciseLogs, setExerciseLogs] = useState([
      { time: '7:00 AM', exercise: 'Push-ups', reps: 20, sets: 3 },
      { time: '7:20 AM', exercise: 'Pull-ips', reps: 15, sets: 2 },
      { time: '7:40 AM', exercise: 'Dumbell Press', reps: '14', sets: 3 },
      { time: '7:40 AM', exercise: 'Peck-deck Fly', reps: '14', sets: 2 },
      { time: '7:40 AM', exercise: 'Cable Fly', reps: '16', sets: 2 },
    ]);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({});
  
    const openModal = (type, index = null) => {
      setModalType(type);
      setEditIndex(index);
      if (type === 'exercise') {
        setFormData({ ...exerciseLogs[index] });
      } else {
        setFormData([...workoutPlan]);
      }
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setEditIndex(null);
      setFormData({});
    };
  
    const handleChange = (e, index) => {
      if (modalType === 'workout') {
        const updated = [...formData];
        updated[index][e.target.name] = e.target.value;
        setFormData(updated);
      } else {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    };
  
    const handleSave = () => {
      if (modalType === 'exercise') {
        const updatedLogs = [...exerciseLogs];
        updatedLogs[editIndex] = formData;
        setExerciseLogs(updatedLogs);
      } else {
        setWorkoutPlan(formData);
      }
      closeModal();
    };
  
    return (
      <div className="p-6 text-gray-800 dark:text-gray-100">
        {/* Weekly Workout Plan */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Weekly Workout Plan</h2>
            <button
              onClick={() => openModal('workout')}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
            >
              <FiEdit /> Edit Plan
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workoutPlan.map((item, index) => (
              <div key={index} className="bg-emerald-100 dark:bg-emerald-900/40 p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">{item.day}</h4>
                <p>{item.workout}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Progress Chart and Logs */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Progress Chart</h2>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full">
              <Line data={progressData} options={{ maintainAspectRatio: false }} height={250} />
            </div>
          </div>
  
          {/* Logs */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Today’s Exercise Log</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-emerald-200 dark:bg-emerald-700 text-left text-sm uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Exercise</th>
                    <th className="px-4 py-2">Reps</th>
                    <th className="px-4 py-2">Sets</th>
                    <th className="px-4 py-2">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {exerciseLogs.map((log, index) => (
                    <tr key={index} className="border-b border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-2">{log.time}</td>
                      <td className="px-4 py-2">{log.exercise}</td>
                      <td className="px-4 py-2">{log.reps}</td>
                      <td className="px-4 py-2">{log.sets}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => openModal('exercise', index)}
                          className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400"
                        >
                          <FiEdit />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
              <h3 className="text-lg font-semibold mb-4">
                Edit {modalType === 'exercise' ? 'Exercise Log' : 'Workout Plan'}
              </h3>
              <div className="space-y-3">
                {modalType === 'exercise' ? (
                  <>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="Time"
                      className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                    />
                    <input
                      type="text"
                      name="exercise"
                      value={formData.exercise}
                      onChange={handleChange}
                      placeholder="Exercise"
                      className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                    />
                    <input
                      type="text"
                      name="reps"
                      value={formData.reps}
                      onChange={handleChange}
                      placeholder="Reps"
                      className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                    />
                    <input
                      type="text"
                      name="sets"
                      value={formData.sets}
                      onChange={handleChange}
                      placeholder="Sets"
                      className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                    />
                  </>
                ) : (
                  <>
                    {formData.map((dayItem, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          name="day"
                          value={dayItem.day}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="Day"
                          className="w-1/3 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                        />
                        <input
                          type="text"
                          name="workout"
                          value={dayItem.workout}
                          onChange={(e) => handleChange(e, index)}
                          placeholder="Workout"
                          className="w-2/3 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-90"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default WorkoutTracker;