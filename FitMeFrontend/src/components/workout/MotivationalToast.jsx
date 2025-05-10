import React, { useEffect, useState } from 'react';

const quotes = [
  'No pain, no gain! 💥',
  'You are stronger than you think!',
  'One more rep. One step closer. 🏁',
  'Crush your limits today! 🔥'
];

const MotivationalToast = () => {
  const [show, setShow] = useState(false);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      setShow(true);
      setTimeout(() => setShow(false), 5000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return show ? (
    <div className="fixed bottom-6 left-6 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg animate-slide-in">
      {quote}
    </div>
  ) : null;
};

export default MotivationalToast;