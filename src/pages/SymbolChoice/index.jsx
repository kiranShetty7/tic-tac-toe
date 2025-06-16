import React from 'react';
import { useNavigate } from 'react-router-dom';

const SymbolChoice = () => {
  const navigate = useNavigate();

  const handleSymbolChoice = (symbol) => {
    // Here we can later add logic to store the chosen symbol
    navigate('/game');
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
        <h1 className="text-4xl font-bold mb-4">Congratulations! You won the toss!</h1>
        <p className="text-gray-600 mb-12">Choose your symbol to start the game</p>

        <div className="flex gap-8">
          {/* X Button */}
          <button
            onClick={() => handleSymbolChoice('X')}
            className="w-24 h-24 bg-gray-900 text-white rounded-lg flex items-center justify-center text-5xl font-bold hover:bg-gray-800 transition-colors"
          >
            X
          </button>

          {/* O Button */}
          <button
            onClick={() => handleSymbolChoice('O')}
            className="w-24 h-24 bg-gray-900 text-white rounded-lg flex items-center justify-center text-5xl font-bold hover:bg-gray-800 transition-colors"
          >
            O
          </button>
        </div>

        <p className="text-gray-600 mt-8 text-sm">
          Your opponent will automatically get the other symbol
        </p>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default SymbolChoice; 