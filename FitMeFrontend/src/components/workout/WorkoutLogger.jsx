import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../services/WorkoutsService'; 
import AuthModal from '../../components/AuthModal';
import { toast } from 'react-toastify';

const WorkoutLogger = () => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth modal state
  const navigate = useNavigate();

  useEffect(() => {
const user = JSON.parse(localStorage.getItem("user"));
    console.log("User:", user);  // Check if the 'user' object is valid
console.log("User ID:", user ? user.userid : "User is null");
    if (!user) {
      setShowAuthModal(true); // Show the modal if user is not logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
   const workoutData = {
  exercise,
  sets,
  reps,
  weight,
  notes,
  date: new Date().toISOString().slice(0, 10),
  user: {  
    userid: user.userid,
  }
};

    console.log(workoutData);

    try {
      await createWorkout(workoutData); // Save workout data
      setExercise('');
      setSets('');
      setReps('');
      setWeight('');
      setNotes('');
      
      toast.success('Workout logged successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('Failed to log workout.');
    }
  };


  const closeAuthModal = () => {
    setShowAuthModal(false);
    window.location.reload();
  };

  return (
    <>
    {showAuthModal && (
        <AuthModal
          showLoginInitially={true} // Show login tab initially
          onClose={closeAuthModal} // Close modal and redirect
        />
      )}
    <form onSubmit={handleSubmit} className="bg-white backdrop-blur-md p-6 rounded-xl border border-white/10 shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <h2 className="text-lg text-black font-semibold mb-4 dark:text-white">Log Workout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="bg-gray-100 dark:bg-white/5 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-500"
          placeholder="Exercise Name"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
        <input
          className="bg-gray-100 dark:bg-white/5 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-500"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          className="bg-gray-100 dark:bg-white/5 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-500"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          className="bg-gray-100 dark:bg-white/5 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-500"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <textarea
          className="bg-gray-100 dark:bg-white/5 text-black p-2 rounded-lg focus:outline-none col-span-1 md:col-span-2 focus:ring-2 focus:ring-emerald-400 dark:bg-gray-700 dark:text-white dark:focus:ring-emerald-500"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white px-6 py-2 rounded-lg hover:scale-105 transition dark:from-emerald-600 dark:to-teal-500"
      >
        Save Log
      </button>
    </form>
    </>
  );
};

export default WorkoutLogger;
