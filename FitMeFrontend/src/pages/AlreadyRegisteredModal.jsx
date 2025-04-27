import React from 'react';

const AlreadyRegisteredModal = ({ onClose, switchToLogin }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 animate-fade-in-up z-50">
        <h2 className="text-xl font-bold mb-4 text-center text-red-500">
          Email Already Registered
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          A user with this email already exists. Please try logging in instead.
        </p>
        <button
          onClick={switchToLogin} 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default AlreadyRegisteredModal;
