import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import FindFriends from "./FindFriends";
import GameInvitations from "./GameInvitations";
import Footer from "../../components/Footer";
import { GET_SENT_INVITES } from "../../graphql/queries";

const Friends = () => {
  const navigate = useNavigate();
  const handleSignOut = () => navigate("/");

  const userId = localStorage.getItem("userId") || "";

  const { data: sentInvitesData, loading } = useQuery(GET_SENT_INVITES, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const sentInvites = sentInvitesData?.getSentInvites?.invites || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-8">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <FindFriends sentInvites={sentInvites} />
            <GameInvitations sentInvites={sentInvites} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Friends;
