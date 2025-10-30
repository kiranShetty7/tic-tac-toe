import React, { useState } from "react";
import { TextField, CircularProgress, Alert, Snackbar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "../../components/Button";
import ErrorBoundary from "../../components/ErrorBoundary";
import debounce from "lodash/debounce";
import { useMutation, useQuery } from "@apollo/client";
import apolloClient from "../../apollo";
import { GET_USERS_BY_EMAIL } from "../../graphql/queries";
import { SEND_INVITE } from "../../graphql/mutations";

const FindFriends = ({ sentInvites, refetchSentInvites }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const currentUserId = localStorage.getItem("userId") || "";

  const updateUserInviteState = (userId, isInvited) => {
    setSearchResults((prev) =>
      prev.map((user) => (user._id === userId ? { ...user, isInvited } : user))
    );
  };

  const [sendInvite, { loading: sendingInvite }] = useMutation(SEND_INVITE, {
    onCompleted: (data, { variables }) => {
      const { success, message } = data.sendInvite;
      if (success) {
        const invitedUserId = variables.input.toUserId;
        updateUserInviteState(invitedUserId, true);
        refetchSentInvites();
      } else {
        setSnackbar({
          open: true,
          message: message || "Failed to send game invite",
          severity: "error",
        });
      }
    },
    onError: (error) => {
      const failedUserId = error.operation?.variables?.input?.toUserId;
      if (failedUserId) {
        updateUserInviteState(failedUserId, false);
      }
      setSnackbar({
        open: true,
        message: "Failed to send game invite",
        severity: "error",
      });
    },
  });

  // ✅ Search users by email and mark already-invited ones
  const searchUsers = async (searchText) => {
    setInputValue(searchText);

    if (!searchText) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const result = await apolloClient.query({
        query: GET_USERS_BY_EMAIL,
        variables: {
          email: searchText,
          userId: currentUserId,
        },
        fetchPolicy: "network-only",
      });

      if (result.data?.getUsers?.success) {
        const invitedUserIds = sentInvites.map((invite) => invite.to._id) || [];

        // Filter out already invited users and map remaining ones
        setSearchResults(
          (result.data.getUsers.data || [])
            .filter((user) => !invitedUserIds.includes(user._id))
            .map((user) => ({
              ...user,
              isInvited: false,
              isLoading: false,
            }))
        );
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = React.useMemo(
    () => debounce((value) => searchUsers(value), 300),
    [sentInvites]
  );

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInvite = async (user) => {
    if (user.isInvited || user.isLoading) return;

    // Set loading state for this user
    setSearchResults((prev) =>
      prev.map((u) => (u._id === user._id ? { ...u, isLoading: true } : u))
    );

    try {
      await sendInvite({
        variables: {
          input: {
            fromUserId: currentUserId,
            toUserId: user._id,
          },
        },
      });
    } finally {
      // Clear loading state
      setSearchResults((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, isLoading: false } : u))
      );
    }
  };

  return (
    <>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-6">Find Friends</h2>
        <div className="space-y-4">
          <TextField
            fullWidth
            label="Search users by email"
            variant="outlined"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              debouncedSearch(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black",
              },
            }}
            InputProps={{
              endAdornment: loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null,
            }}
          />
          <div className="relative">
            {loading && searchResults.length === 0 && (
              <div className="flex items-center justify-center py-8 bg-white rounded-lg border border-gray-100">
                <CircularProgress size={32} />
                <span className="ml-3 text-gray-600">
                  Searching for users...
                </span>
              </div>
            )}
            {!loading && searchResults.length === 0 && !inputValue && (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-100">
                Start typing to search for users
              </div>
            )}
            {!loading && searchResults.length === 0 && inputValue && (
              <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-gray-100">
                No such users
              </div>
            )}
            <div className="space-y-2">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-gray-200 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {user.isInvited ? (
                    <div className="flex items-center gap-2 px-4 py-2 text-green-600">
                      <CheckCircleIcon />
                      <span className="text-sm">Invited</span>
                    </div>
                  ) : (
                    <Button
                      variant="solid"
                      className="text-sm min-w-[80px]"
                      onClick={() => handleInvite(user)}
                      disabled={user.isLoading}
                    >
                      {user.isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Invite"
                      )}
                    </Button>
                  )}
                </div>
              ))}
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
      </div>
    </>
  );
};

export default FindFriends;
