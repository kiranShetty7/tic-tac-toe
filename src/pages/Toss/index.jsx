import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Toss = () => {
  const navigate = useNavigate();
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCoinClick = (choice) => {
    setIsFlipping(true);
    // Simulate coin flip
    setTimeout(() => {
      setIsFlipping(false);
      navigate('/symbol-choice');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">TicTacToe</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-4">Time for the Toss!</h1>
        <p className="text-gray-600 mb-12">Choose Heads or Tails</p>

        <div className="flex gap-8">
          {/* Heads Button */}
          <button
            onClick={() => handleCoinClick('heads')}
            disabled={isFlipping}
            className={`w-24 h-24 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center gap-2 ${
              isFlipping ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <svg 
              className="w-10 h-10" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-sm font-medium">Heads</span>
          </button>

          {/* Tails Button */}
          <button
            onClick={() => handleCoinClick('tails')}
            disabled={isFlipping}
            className={`w-24 h-24 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center gap-2 ${
              isFlipping ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <svg 
              className="w-10 h-10" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-medium">Tails</span>
          </button>
        </div>

        {isFlipping && (
          <p className="mt-8 text-xl font-semibold animate-pulse">
            Flipping...
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default Toss; 