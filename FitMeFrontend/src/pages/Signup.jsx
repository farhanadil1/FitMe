import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import axios from 'axios';
import AlreadyRegisteredModal from './AlreadyRegisteredModal'; 

const Signup = ({ show, onClose, switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);

  if (!show) return null;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8053/api/auth/register', {
        fullName: name,
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Signup successful!');
        setLoading(false);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        setShowAlreadyRegisteredModal(true); // Open the AlreadyRegisteredModal
      } else {
        toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-30" onClick={onClose}></div>

      <div className="relative z-50 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 animate-fade-in">
        <h2 className="text-2xl font-bold mb-5 text-center">
          Sign Up for <span className="text-emerald-500">FitMe</span>
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full p-2 pr-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin text-lg" /> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button
            onClick={switchToLogin}
            className="text-emerald-500 hover:underline"
          >
            Login
          </button>
        </div>

        <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:underline w-full">
          Cancel
        </button>
        {showAlreadyRegisteredModal && (
  <AlreadyRegisteredModal
    onClose={() => setShowAlreadyRegisteredModal(false)}
    switchToLogin={() => {
      onClose();    
      switchToLogin();
    }}
  />
)}

        
      </div>
    </div>
  );
};

export default Signup;
