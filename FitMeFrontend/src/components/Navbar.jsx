import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX, FiUser } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Navbar = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false); // New state for dropdown
  const location = useLocation();

  // Handle theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const enabled = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setIsDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Scroll spy effect
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'workouts', 'nutrition', 'progress'];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'home' },
    { name: 'Workouts', path: '/workouts' , sectionId: 'workouts' },
    { name: 'Nutrition', path: '/nutrition', sectionId: 'nutrition' },
    { name: 'Progress', path: '/progress', sectionId: 'progress' },
    { name: 'Community', path: '/community' },
    { name: 'Level Up', path: '/levelup' },
  ];

  // Handle sign-out and clear access token
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    // You can also redirect user after logout if needed
    window.location.reload();
  };

  return (
    <header className="w-full px-6 py-3 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0">
        <img src={logo} alt="FitMe Logo" className="md:h-10 mt-2 h-6 w-auto object-contain" />
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-gray-600 dark:text-gray-300"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
        {navLinks.map(({ name, path, sectionId }) => {
          const isActive =
            location.pathname === '/' && sectionId
              ? activeSection === sectionId
              : location.pathname === path;

          return (
            <Link
              key={name}
              to={path}
              className={`relative pb-1 hover:text-emerald-500 transition ${isActive ? 'text-emerald-500' : ''}`}
            >
              {name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-emerald-500 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <button onClick={toggleTheme} className="text-xl text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition">
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>

        {localStorage.getItem('accessToken') ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on click
            >
              <FiUser className="text-xl" />
              <span className="text-sm">User</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="px-4 py-1 text-sm border border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-500 hover:text-white transition"
          >
            Sign in
          </button>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col items-center gap-4 bg-white dark:bg-gray-900 py-4 md:hidden z-40 shadow-md">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-emerald-500 transition ${location.pathname === path ? 'text-emerald-500 font-medium' : ''}`}
            >
              {name}
            </Link>
          ))}
          <button onClick={toggleTheme} className="text-xl text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition">
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          {localStorage.getItem('accessToken') ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown on click
              >
                <FiUser className="text-xl" />
                <span className="text-sm">User</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-1 text-sm border border-emerald-500 text-emerald-500 rounded-md hover:bg-emerald-500 hover:text-white transition"
            >
              Sign in
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
