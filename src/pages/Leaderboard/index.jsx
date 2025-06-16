import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [timeFrame, setTimeFrame] = useState('all-time'); // 'weekly' or 'all-time'

  // Mock data for leaderboard
  const leaderboardData = [
    { id: 1, name: 'Alex Masters', avatar: '👤', gamesWon: 156, winRate: '87%', totalGames: 180 },
    { id: 2, name: 'Sarah Johnson', avatar: '👤', gamesWon: 142, winRate: '82%', totalGames: 173 },
    { id: 3, name: 'Mike Chen', avatar: '👤', gamesWon: 138, winRate: '79%', totalGames: 175 },
    { id: 4, name: 'Emma Wilson', avatar: '👤', gamesWon: 125, winRate: '75%', totalGames: 167 },
    { id: 24, name: 'You', avatar: '👤', gamesWon: 45, winRate: '52%', totalGames: 86 },
  ];

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
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Title and Time Frame Toggle */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeFrame('weekly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  timeFrame === 'weekly'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeFrame('all-time')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  timeFrame === 'all-time'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All Time
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 rounded-t-lg font-medium text-sm text-gray-600">
            <div className="col-span-1">#</div>
            <div className="col-span-2">Player</div>
            <div className="text-right">Games Won</div>
            <div className="text-right">Win Rate</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {leaderboardData.map((player) => (
              <div 
                key={player.id}
                className="grid grid-cols-5 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-1 text-gray-600">{player.id}</div>
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-2xl">{player.avatar}</span>
                  <span className={`font-medium ${player.name === 'You' ? 'text-blue-600' : ''}`}>
                    {player.name}
                  </span>
                </div>
                <div className="text-right font-medium">{player.gamesWon}</div>
                <div className="text-right text-gray-600">{player.winRate}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default Leaderboard; 