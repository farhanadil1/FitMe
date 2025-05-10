import React from 'react';
import { Plus } from 'lucide-react';

const FloatingActionButton = () => {
  const handleClick = () => {
    alert('🚧 Feature coming soon: Add new session or quick log.');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-gradient-to-tr from-green-500 to-emerald-600 p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform animate-pulse"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default FloatingActionButton;
