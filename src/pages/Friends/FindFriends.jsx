import React from "react";
import Button from "../../components/Button";

const FindFriends = ({ friendsList }) => (
  <div className="flex-1">
    <h2 className="text-2xl font-bold mb-6">Find Friends</h2>
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search friends by username..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
    <div className="space-y-4">
      {friendsList.map((friend) => (
        <div
          key={friend.id}
          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{friend.avatar}</span>
            <div>
              <h3 className="font-medium">{friend.name}</h3>
              <p className="text-sm text-gray-500">{friend.status}</p>
            </div>
          </div>
          <Button className="text-sm">Invite</Button>
        </div>
      ))}
    </div>
  </div>
);

export default FindFriends;
