import React from 'react';
import heroImage from '../assets/Heroimg.jpg';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-[80vh] w-full flex items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Fitness Hero"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Content */}
        <div className="max-w-xl space-y-6 text-left animate-slideInLeft">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-400 leading-tight">
            Transform Your Body, <br /> Transform Your Life 💪
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Track workouts, log meals, get expert tips, and stay motivated with your FitMe community.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#workouts">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105">
                Get Started
              </button>
            </a>
            <a href="#nutrition">
              <button className="px-6 py-3 border border-emerald-400 text-emerald-300 hover:bg-white hover:text-emerald-600 rounded-xl font-semibold transition-transform transform hover:scale-105">
                Learn More
              </button>
            </a>
          </div>
        </div>

        </div>
    </section>
  );
};

export default HeroSection;
