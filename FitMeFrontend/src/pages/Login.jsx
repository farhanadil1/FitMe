import React, { useState, useContext } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userLogin } from '../components/services/UsersService';



const Login = ({ show, onClose, switchToSignup }) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const { login } = useContext(AuthContext);

if (!show) return null;

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please enter both email and password");
    return;
  }

  setLoading(true);

  try {
    const response = await userLogin(email, password);

    if (response.status === 200) {
      const user = response.data;
      window.location.reload();

      if (!user) {
        toast.error("Invalid username or password");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        login(user); // context login
        toast.success("Login successful!");
        onClose();
        navigate("/", { replace: true });
      }
    } else {
      toast.error("Invalid username or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Something went wrong. Please try again.");
  }

  setLoading(false);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-30"
        onClick={onClose}
      ></div> 

      {/* Login Box */}
      <div className="relative z-50 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
        <h2 className="text-2xl font-bold mb-5 text-center">
          Login to <span className="text-emerald-500">FitMe</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-base mb-1 font-medium">Email Address</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full text-base p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-base mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full text-base p-3 pr-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ImSpinner2 className="animate-spin text-lg" /> : 'Login'}
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-4 text-base text-center space-y-2">
          <button
            onClick={() => toast.info('Forgot password feature coming soon!')}
            className="text-emerald-500 hover:underline"
          >
            Forgot password?
          </button>
          <div className="text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <button
              onClick={switchToSignup}
              className="text-emerald-500 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => {
          onClose();
          window.location.href=('/');
          }}
           className="mt-4 text-base text-gray-400 hover:underline w-full"
          >
  Cancel
</button>
      </div>
    </div>
  );
};

export default Login;
