import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock4, Pencil, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const MealHistory = () => {
  const [meals, setMeals] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.userid) {
      setUser(storedUser);
      fetchMeals(storedUser.userid);
    }
  }, []);

  const fetchMeals = async (userid) => {
    try {
      const res = await axios.get(`http://localhost:8053/api/meals/user/${userid}`);
      setMeals(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      toast.error("Failed to fetch meals.");
    }
  };

  const handleDelete = async (meal) => {
    const confirmed = window.confirm("Are you sure you want to delete this meal?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8053/api/meals/delete/${meal.mid}`);
      setMeals(meals.filter(m => m.mid !== meal.mid));
      toast.success("Meal deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete meal.");
    }
  };

  const handleEdit = async (meal) => {
    const updatedName = prompt("Update meal name:", meal.mealName);
    const updatedCalories = prompt("Update calories:", meal.calories);
    const updatedProteins = prompt("Update proteins:", meal.protiens);
    const updatedCarbs = prompt("Update carbs:", meal.carbs);
    const updatedFats = prompt("Update fats:", meal.fats);

    if ([updatedName, updatedCalories, updatedProteins, updatedCarbs, updatedFats].includes(null)) return;

    const user = JSON.parse(localStorage.getItem("user"));

    const updatedMeal = {
      ...meal,
      mealName: updatedName,
      calories: updatedCalories,
      protiens: updatedProteins,
      carbs: updatedCarbs,
      fats: updatedFats,
      user,
    };

    try {
      const res = await axios.put(`http://localhost:8053/api/meals/update/${meal.mid}`, updatedMeal);
      setMeals(prev => prev.map(m => m.mid === meal.mid ? res.data : m));
      toast.success("Meal updated successfully.");
    } catch (err) {
      console.error("Edit failed:", err);
      toast.error("Failed to update meal.");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow backdrop-blur-md rounded-xl border border-white/10 p-4  transition-all">
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
      <h2 className="text-lg text-black dark:text-white font-semibold mb-4">Meal History</h2>
      <div className="space-y-4 max-h-[188px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-white/10">
        {meals.length === 0 ? (
          <p className="text-gray-700 dark:text-white/90">No meal logs found.</p>
        ) : (
          meals.map((meal) => (
  <div
    key={meal.mid}
    className="flex justify-between items-start bg-white/5 p-4 rounded-lg border border-white/10 hover:shadow-lg transition "
  >
    <div className="flex-1 space-y-1">
      <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-white font-medium">
        <Clock4 className="w-4 h-4 text-gray-700 dark:text-white" />
        {formatDate(meal.timestamp)} • {formatTime(meal.timestamp)}
      </div>
      <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
        {meal.mealName}
      </div>
      <div className="flex flex-wrap gap-2 mt-1 text-sm">
        <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-md">
           Calories: <span className="font-medium">{meal.calories} kcal</span>
        </span>
        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md">
           Protein: <span className="font-medium">{meal.protiens}g</span>
        </span>
        <span className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-md">
           Carbs: <span className="font-medium">{meal.carbs}g</span>
        </span>
        <span className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 px-2 py-1 rounded-md">
           Fats: <span className="font-medium">{meal.fats}g</span>
        </span>
      </div>
    </div>
    <div className="flex gap-2 mt-1">
      <button
        onClick={() => handleEdit(meal)}
        className="text-black dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(meal)}
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

export default MealHistory;
