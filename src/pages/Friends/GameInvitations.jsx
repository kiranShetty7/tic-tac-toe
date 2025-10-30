import React from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress, Alert } from "@mui/material";
import Button from "../../components/Button";
import { GET_RECEIVED_INVITES } from "../../graphql/queries";

const GameInvitations = ({ sentInvites }) => {
  const userId = localStorage.getItem("userId") || "";

  const {
    data: receivedData,
    loading: receivedLoading,
    error: receivedError,
  } = useQuery(GET_RECEIVED_INVITES, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  if (receivedLoading) {
    return (
      <div className="flex-1 min-h-[400px]">
        <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>
        <div className="flex items-center justify-center py-10">
          <CircularProgress />
          <span className="ml-3 text-gray-600">Loading invitations...</span>
        </div>
      </div>
    );
  }

  if (receivedError) {
    return (
      <div className="flex-1 min-h-[400px]">
        <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>
        <Alert severity="error">
          Failed to fetch invites: {receivedError?.message}
        </Alert>
      </div>
    );
  }

  const receivedInvites = receivedData?.getReceivedInvites?.invites || [];
  return (
    <div className="flex-1 min-h-[400px] flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>

      {/* Received Invites Section */}
      <div className="flex flex-col bg-white rounded-lg border border-gray-100 mb-6">
        <h3 className="text-xl font-semibold p-4 border-b border-gray-100">
          Received Invites
        </h3>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          {receivedInvites.length > 0 ? (
            receivedInvites.map((invite) => (
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
              No received invitations.
            </div>
          )}
        </div>
      </div>

      {/* Sent Invites Section */}
      <div className="flex flex-col bg-white rounded-lg border border-gray-100">
        <h3 className="text-xl font-semibold p-4 border-b border-gray-100">
          Sent Invites
        </h3>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
          {sentInvites?.length > 0 ? (
            sentInvites?.map((invite) => (
              <div
                key={invite._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200"
              >
                <div>
                  <h3 className="font-medium">
                    To: {invite.to.name || invite.to.email}
                  </h3>
                  {invite.to.name && (
                    <p className="text-sm text-gray-500">{invite.to.email}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outlined" className="text-sm" color="error">
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-100">
              No sent invitations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameInvitations;
