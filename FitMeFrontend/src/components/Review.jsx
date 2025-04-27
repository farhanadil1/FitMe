import React from 'react';

const reviews = [
  {
    name: "Ananya Sharma",
    text: "FitMe helped me stay consistent! The meal plans are 🔥 and workouts are so effective.",
    rating: 5,
  },
  {
    name: "Kevin Brown",
    text: "I love the community feature! Feels like Instagram + fitness tracker in one app!",
    rating: 4,
  },
  {
    name: "Sophie Lee",
    text: "Started my journey 2 months ago with FitMe and I’m already seeing results! 💪",
    rating: 5,
  },
];

const Reviews = () => (
  <div className="py-12 px-6 max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600 dark:text-emerald-400">What Users Are Saying</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border dark:border-gray-700">
          <h4 className="font-semibold text-lg mb-2">{review.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
          <div className="mt-3 text-yellow-400">
            {'⭐'.repeat(review.rating)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Reviews;
