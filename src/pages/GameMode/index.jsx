import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameMode = () => {
  const navigate = useNavigate();

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
        <h1 className="text-4xl font-bold mb-12">Choose Your Game Mode</h1>
        
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => navigate('/toss')}
            className="w-full px-6 py-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">🤖</span>
            Play with AI
          </button>
          
          <button
            onClick={() => navigate('/toss')}
            className="w-full px-6 py-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-xl">👥</span>
            Play Online
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default GameMode; 