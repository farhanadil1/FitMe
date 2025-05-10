import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlreadyRegisteredModal from './AlreadyRegisteredModal'; 
import {createUsers} from '../components/services/UsersService'; 

const Signup = ({ show, onClose, switchToLogin }) => {
  const [name, setName] = useState('');
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);
  const [errortxt, setErrortxt] = useState('');

  const navigate = useNavigate();

  if (!show) return null;


  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (!name || !emailid || !password) {
      toast.error('All fields are required!');
      return;
    }
  
    setLoading(true);
    const user = { name, emailid, password };
  
    try {
      const response = await createUsers(user);
  
      if (response.status === 200) {
        toast.success('Sign up successful! Please log in.');
        onClose();         // Close signup modal
        switchToLogin();   // Open login modal
      } else {
        setErrortxt('Something went wrong, please try again!');
      }
    } catch (err) {
      console.error('Signup error:', err);
  
      if (err.response && err.response.status === 403) {
        // Duplicate email error
        setErrortxt('User with this email already exists. Please log in.');
        setShowAlreadyRegisteredModal(true); 
      } else {
        setErrortxt('Unable to reach server or unknown error occurred.');
        setShowAlreadyRegisteredModal(true);
      }
    }
  
    setLoading(false);

  
  
   
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
            <label className="block text-sm mb-1 font-medium">User Name</label>
            <input
              type="text"
              placeholder="username e.g, farhanadil"
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
              value={emailid}
              onChange={(e) => setEmailid(e.target.value)}
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
