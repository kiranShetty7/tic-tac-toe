import React from "react";
import Button from "../../components/Button";

const GameInvitations = ({ invitations }) => (
  <div className="flex-1">
    <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>
    <div className="space-y-4">
      {invitations.map((invitation) => (
        <div
          key={invitation.id}
          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{invitation.avatar}</span>
            <div>
              <h3 className="font-medium">{invitation.name}</h3>
              <p className="text-sm text-gray-500">{invitation.timeAgo}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="text-sm">Accept</Button>
            <Button variant="outlined" className="text-sm">
              Decline
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GameInvitations;
