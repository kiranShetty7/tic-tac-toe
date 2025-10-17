import React from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress, Alert } from "@mui/material";
import Button from "../../components/Button";
import { GET_RECEIVED_INVITES } from "../../graphql/queries";

const GameInvitations = () => {
  const userId = "685252bae23c4becf7119096";

  const { data, loading, error } = useQuery(GET_RECEIVED_INVITES, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <CircularProgress />
        <span className="ml-3 text-gray-600">Loading invitations...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error">Failed to fetch invites: {error.message}</Alert>
    );
  }

  const invites = data?.getReceivedInvites?.invites || [];

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>
      <div className="space-y-4">
        {invites.length > 0 ? (
          invites.map((invite) => (
            <div
              key={invite._id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200"
            >
              <div>
                <h3 className="font-medium">
                  From: {invite.from.name || invite.from.email}
                </h3>
                {invite.from.name && (
                  <p className="text-sm text-gray-500">{invite.from.email}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button className="text-sm">Accept</Button>
                <Button variant="outlined" className="text-sm">
                  Decline
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-100">
            No game invitations yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInvitations;
