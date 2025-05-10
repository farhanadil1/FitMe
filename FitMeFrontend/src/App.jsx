import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import CommunityFeed from './components/CommunityFeed';
import RoutesComponent from './components/workout/RoutesComponent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NutritionPage from './components/nutrition/NutritionPage';
import ProgressPage from './components/progress/ProgressPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginInitially, setShowLoginInitially] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const openLogin = () => {
    setShowLoginInitially(true);
    setShowAuthModal(true);
  };
  const openSignup = () => {
    setShowLoginInitially(false);
    setShowAuthModal(true);
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
          <Navbar
            isDarkMode={darkMode}
            toggleTheme={toggleTheme}
            onLoginClick={openLogin}
            onSignupClick={openSignup}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<CommunityFeed />} />
            <Route path="/workouts" element={<RoutesComponent />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<div>404 Not Found</div>} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          {showAuthModal && (
            <AuthModal
              showLoginInitially={showLoginInitially}
              onClose={() => setShowAuthModal(false)}
            />
          )}

          <ToastContainer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
