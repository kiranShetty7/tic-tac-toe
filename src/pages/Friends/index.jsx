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

  const {
    data: sentInvitesData,
    loading,
    refetch: refetchSentInvites,
  } = useQuery(GET_SENT_INVITES, {
    variables: { userId },
    fetchPolicy: "network-only",
  });

  const sentInvites = sentInvitesData?.getSentInvites?.invites || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-8">
        <FindFriends
          sentInvites={sentInvites}
          refetchSentInvites={refetchSentInvites}
          loading={loading}
        />
        <GameInvitations
          sentInvites={sentInvites}
          sentInvitesLoading={loading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Friends;
