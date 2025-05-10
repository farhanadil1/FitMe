import React, { useEffect, useState } from 'react';
import { Medal, Pencil, Save, X } from 'lucide-react';
import axios from 'axios';

const PersonalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRecord, setEditedRecord] = useState({ weight: '', reps: '' });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const defaultRecords = [
      { exercise: 'Bench Press', weight: 100, reps: 8 },
      { exercise: 'Squat', weight: 120, reps: 6 },
      { exercise: 'Deadlift', weight: 140, reps: 5 },
      { exercise: 'Pull-ups', weight: 0, reps: 20 },
      { exercise: 'Shoulder Press', weight: 60, reps: 10 },
      { exercise: 'Lats Pulldown', weight: 80, reps: 10 },
    ];
  
    const fetchRecords = async () => {
      try {
        const res = await axios.get('/api/records'); // Mock endpoint
        const data = res.data;
  
        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          // fallback if API returns invalid format
          setRecords(defaultRecords);
        }
      } catch (err) {
        console.error(err);
        setRecords(defaultRecords); // fallback on error
        setError('Failed to load records. Showing default.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecords();
  }, []);
  
  

  const openModal = (index) => {
    setEditingIndex(index);
    setEditedRecord(records[index]);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingIndex(null);
    setEditedRecord({ weight: '', reps: '' });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setEditedRecord({ ...editedRecord, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    const updated = [...records];
    updated[editingIndex] = editedRecord;
    setRecords(updated);
    closeModal();
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg shadow">
     

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Medal className="text-emerald-500" /> Personal Records
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {records.map((record, index) => (
            <div
              key={index}
              className="bg-emerald-100 dark:bg-emerald-900/40 p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                {record.exercise}
              </h4>
              <p>Weight: <span className="font-semibold">{record.weight} kg</span></p>
              <p>Reps: <span className="font-semibold">{record.reps}</span></p>
              <button
                onClick={() => openModal(index)}
                className="mt-2 self-start text-emerald-600 hover:text-emerald-800 dark:text-emerald-400"
              >
                <Pencil size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">Edit Personal Record</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="exercise"
                value={editedRecord.exercise}
                onChange={handleChange}
                placeholder="Exercise"
                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
              />
              <input
                type="number"
                name="weight"
                value={editedRecord.weight}
                onChange={handleChange}
                placeholder="Weight (kg)"
                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
              />
              <input
                type="number"
                name="reps"
                value={editedRecord.reps}
                onChange={handleChange}
                placeholder="Reps"
                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
              />
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:opacity-90"
              >
                <X size={18} className="inline-block" /> Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              >
                <Save size={18} className="inline-block mr-1" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalRecords;
