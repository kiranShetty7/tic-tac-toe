import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CircularProgress, Alert, Snackbar } from "@mui/material";
import Button from "../../components/Button";
import { GET_RECEIVED_INVITES } from "../../graphql/queries";
import { ACCEPT_INVITE, REJECT_INVITE } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const GameInvitations = ({ sentInvites, sentInvitesLoading }) => {
  const userId = localStorage.getItem("userId") || "";
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data: receivedData,
    loading: receivedLoading,
    error: receivedError,
    refetch: refetchReceivedInvites,
  } = useQuery(GET_RECEIVED_INVITES, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const [acceptInvite, { loading: acceptLoading }] = useMutation(
    ACCEPT_INVITE,
    {
      onError: (error) => {
        setSnackbar({
          open: true,
          message: error.message || "Failed to accept invite",
          severity: "error",
        });
      },
    }
  );

  const [rejectInvite, { loading: rejectLoading }] = useMutation(
    REJECT_INVITE,
    {
      onCompleted: (data) => {
        const { success, message } = data.rejectInvite;
        if (success) {
          setSnackbar({
            open: true,
            message: "Invite rejected successfully",
            severity: "success",
          });
          refetchReceivedInvites();
        } else {
          setSnackbar({
            open: true,
            message: message || "Failed to reject invite",
            severity: "error",
          });
        }
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: error.message || "Failed to reject invite",
          severity: "error",
        });
      },
    }
  );

  const handleAcceptInvite = (invite) => {
    if (!invite.gameId) {
      setSnackbar({
        open: true,
        message: "This invite doesn't have a game ID",
        severity: "error",
      });
      return;
    }

    acceptInvite({
      variables: { inviteId: invite._id },
      onCompleted: (data) => {
        const { success, message } = data.acceptInvite;
        if (success) {
          setSnackbar({
            open: true,
            message: "Invite accepted successfully",
            severity: "success",
          });
          refetchReceivedInvites();
          navigate(ROUTES.TOSS_WITH_ID.replace(":gameId", invite.gameId));
        } else {
          setSnackbar({
            open: true,
            message: message || "Failed to accept invite",
            severity: "error",
          });
        }
      },
    });
  };

  const handleRejectInvite = (inviteId) => {
    rejectInvite({ variables: { inviteId } });
  };

  const receivedInvites = receivedData?.getReceivedInvites?.invites || [];

  return (
    <>
      <div className="flex-1 min-h-[400px] flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Game Invitations</h2>

        {/* Received Invites Section */}
        <div className="flex flex-col bg-white rounded-lg border border-gray-100 mb-6">
          <h3 className="text-xl font-semibold p-4 border-b border-gray-100">
            Received Invites
          </h3>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
            {receivedLoading ? (
              <div className="flex items-center justify-center py-8">
                <CircularProgress size={24} />
                <span className="ml-3 text-gray-600">
                  Loading received invites...
                </span>
              </div>
            ) : receivedError ? (
              <Alert severity="error">
                Failed to fetch received invites: {receivedError?.message}
              </Alert>
            ) : receivedInvites.length > 0 ? (
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
                      <p className="text-sm text-gray-500">
                        {invite.from.email}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="text-sm"
                      onClick={() => handleAcceptInvite(invite)}
                      disabled={acceptLoading || rejectLoading}
                    >
                      {acceptLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Accept"
                      )}
                    </Button>
                    <Button
                      variant="outlined"
                      className="text-sm"
                      onClick={() => handleRejectInvite(invite._id)}
                      disabled={acceptLoading || rejectLoading}
                    >
                      {rejectLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Decline"
                      )}
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
            {sentInvitesLoading ? (
              <div className="flex items-center justify-center py-8">
                <CircularProgress size={24} />
                <span className="ml-3 text-gray-600">
                  Loading sent invites...
                </span>
              </div>
            ) : sentInvites?.length > 0 ? (
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
                    <Button
                      variant="outlined"
                      className="text-sm"
                      color="error"
                      disbled={true}
                    >
                      Join
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default GameInvitations;
