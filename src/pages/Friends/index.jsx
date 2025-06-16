import React from 'react';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const navigate = useNavigate();

  // Mock data for friends and invitations
  const friendsList = [
    { id: 1, name: 'Alex Johnson', status: 'Online', avatar: '👤' },
    { id: 2, name: 'Sarah Smith', status: 'Last seen 5m ago', avatar: '👤' }
  ];

  const invitations = [
    { id: 1, name: 'Emma Davis', timeAgo: '2 minutes ago', avatar: '👤' },
    { id: 2, name: 'James Wilson', timeAgo: '5 minutes ago', avatar: '👤' }
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
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-8">
        {/* Find Friends Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Find Friends</h2>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends by username..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Friends List */}
          <div className="space-y-4">
            {friendsList.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{friend.avatar}</span>
                  <div>
                    <h3 className="font-medium">{friend.name}</h3>
                    <p className="text-sm text-gray-500">{friend.status}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
                  Invite
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Game Invitations Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>
          <div className="space-y-4">
            {invitations.map(invitation => (
              <div key={invitation.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{invitation.avatar}</span>
                  <div>
                    <h3 className="font-medium">{invitation.name}</h3>
                    <p className="text-sm text-gray-500">{invitation.timeAgo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
                    Accept
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    Decline
                  </button>
                </div>
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

export default Friends; 