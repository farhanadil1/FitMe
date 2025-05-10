import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../../components/AuthModal';
import { toast } from 'react-toastify';


const MealLogger = () => {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [meals, setMeals] = useState([]);
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
  
  const getCurrentDateTime = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const addMeal = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    toast.error("User not logged in");
    setShowAuthModal(true);
    return;
  }

  if (mealName.trim() && calories && protein && carbs && fat) {
    const newMeal = {
      mealName: mealName,
      calories: calories,
      protiens: protein,
      carbs: carbs,
      fats: fat,
      user: {
        userid: user.userid,
      },
    };

    try {
      const response = await fetch("http://localhost:8053/api/meals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMeal),
      });

      if (!response.ok) throw new Error("Failed to add meal");

      const savedMeal = await response.json();
      setMeals([...meals, savedMeal]);
      toast.success("Meal added successfully!");

      // Reset input fields
      window.location.reload();
      setMealName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFat('');
     
    } catch (error) {
      toast.error("Error adding meal: " + error.message);
    }
  } else {
    toast.warn("Please fill out all fields");
  }
};

  const closeAuthModal = () => {
    setShowAuthModal(false);
    window.location.reload();
  };

  return (
    <>{showAuthModal && (
        <AuthModal
          showLoginInitially={true} // Show login tab initially
          onClose={closeAuthModal} // Close modal and redirect
        />
      )}
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Log Your Meals</h2>

      {/* Meal Name Input */}
      <div className="flex flex-wrap gap-2 mb-2">
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="e.g. Grilled chicken & rice"
          className="flex-1 min-w-[150px] px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Nutritional Information Inputs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories"
          className="flex-1 min-w-[100px] px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein (g)"
          className="flex-1 min-w-[100px] px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          placeholder="Carbs (g)"
          className="flex-1 min-w-[100px] px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          placeholder="Fat (g)"
          className="flex-1 min-w-[100px] px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Add Meal Button */}
      <button
        onClick={addMeal}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
      >
        Add Meal
      </button>
    </div>
    </>
  );
};

export default MealLogger;
