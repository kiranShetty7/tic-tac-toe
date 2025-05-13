import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Play Tic Tac Toe Online</h1>
      <p className="text-gray-600 mb-8">Challenge your friends or play against AI in the classic game of X's and O's</p>

      {/* Game Preview */}
      <div className="grid grid-cols-3 gap-2 w-fit mx-auto my-8">
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">X</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">O</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">X</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">O</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">X</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold"></div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">O</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">X</div>
        <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex items-center justify-center text-3xl font-bold">O</div>
      </div>

      {/* Play Button */}
      <Link 
        to="/mode" 
        className="inline-block bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors my-8"
      >
        Play Now →
      </Link>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="p-6 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">Multiplayer</h3>
          <p className="text-gray-600 text-sm">Play with friends online</p>
        </div>

        <div className="p-6 text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-2">AI Opponent</h3>
          <p className="text-gray-600 text-sm">Challenge our smart AI</p>
        </div>

        <div className="p-6 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
          <p className="text-gray-600 text-sm">Compete for top ranks</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </div>
    </div>
  );
};

export default LandingPage; 