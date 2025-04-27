import React from 'react';

const LevelUpNotification = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono relative overflow-hidden">
      <div className="relative w-[90%] max-w-2xl p-8 border-2 rounded-lg border-cyan-400 bg-opacity-5 backdrop-blur-md shadow-[0_0_25px_#00f2ff] animate-pulse-glow-glass">

        {/* Top Blue Glow */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-1 w-1/2 bg-cyan-400 blur-lg opacity-60" />

        {/* Glow Border Corners (optional) */}
        <div className="absolute inset-0 pointer-events-none border border-cyan-400 rounded-lg" />

        <div className="text-center space-y-6 z-10 relative">
          <div className="flex items-center justify-center gap-2 text-cyan-300 text-xl font-bold border border-cyan-300 px-4 py-2 w-fit mx-auto rounded shadow-[0_0_10px_#00f2ff]">
            <span className="text-2xl">⚠️</span>
            <span>NOTIFICATION</span>
          </div>

          <div className="text-blue-300 text-lg drop-shadow-[0_0_6px_#00f2ff]">
            [The Secret Quest: <br />
            <span className="text-xl font-bold text-blue-400">"Courage of the Weak."]</span>
          </div>

          <div className="flex justify-center mt-6">
            <div className="w-10 h-10 rounded border-2 border-green-400 flex items-center justify-center text-2xl text-green-400 shadow-[0_0_12px_#00ffcc]">
              ✓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelUpNotification;
