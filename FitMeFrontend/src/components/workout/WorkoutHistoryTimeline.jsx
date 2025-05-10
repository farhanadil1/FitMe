import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock4, Pencil, Trash2 } from 'lucide-react';

const WorkoutHistoryTimeline = () => {
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userid) {
      setUser(storedUser);
      axios.get(`http://localhost:8053/api/workout/user/${storedUser.userid}`)
        .then(res => setLogs(res.data))
        .catch(err => console.error("Failed to fetch logs:", err));
    }
  }, []);

  const handleDelete = async (log) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!isConfirmed) {
      return;
    }

    console.log("Workout Log: ", log);  // Log the entire log object
    try {
      console.log("Deleting workout ID:", log.id);
      await axios.delete(`http://localhost:8053/api/workout/delete/${log.id}`);
      setLogs(logs.filter(l => l.id !== log.id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = async (log) => {
    const updatedReps = prompt("Update reps:", log.reps);
    const updatedSets = prompt("Update sets:", log.sets);
    const updatedWeight = prompt("Update weight:", log.weight);

    if (updatedReps === null || updatedSets === null || updatedWeight === null) return;

    const updatedWorkout = {
      ...log,
      reps: updatedReps,
      sets: updatedSets,
      weight: updatedWeight,
      user,
    };

    try {
      const res = await axios.put("http://localhost:8053/api/workout/edit", updatedWorkout);

      setLogs(prevLogs =>
        prevLogs.map(l => l.id === log.id ? res.data : l)
      );
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
  <div className="bg-white dark:bg-gray-800 shadow backdrop-blur-md rounded-xl border border-white/10 p-4">
    <h2 className="text-lg text-black dark:text-white font-semibold mb-4">Workout History</h2>
    <div className="space-y-4 max-h-[302px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-white/10">
      {logs.length === 0 ? (
        <p className="text-gray-700 dark:text-white/90">No workout logs found.</p>
      ) : (
        logs.map((log) => (
          <div
            key={log.workoutid}
            className="flex justify-between items-start bg-white/5 p-4 rounded-lg border border-white/10 hover:shadow-lg transition"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-white font-medium">
                <Clock4 className="w-4 h-4 text-gray-700 dark:text-white" />
                {formatDate(log.date)}
              </div>
              <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                {log.exercise}
              </div>
              <div className="flex flex-wrap gap-2 mt-1 text-sm">
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md">
                  Sets: <span className="font-medium">{log.sets}</span>
                </span>
                <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-md">
                  Reps: <span className="font-medium">{log.reps}</span>
                </span>
                <span className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-md">
                  Weight: <span className="font-medium">{log.weight}kg</span>
                </span>
              </div>
              {log.notes && (
                <p className="text-xs text-gray-700 dark:text-white/70 italic mt-1">
                  Note: {log.notes}
                </p>
              )}
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => handleEdit(log)}
                className="text-black dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(log)}
                className="text-black dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

};

export default WorkoutHistoryTimeline;
