import React from "react";
import Header from "../../components/Header";
import GameInvitations from "../Friends/GameInvitations";
import Footer from "../../components/Footer";

const invitations = [
  { id: 1, name: "Emma Davis", timeAgo: "2 minutes ago", avatar: "👤" },
  { id: 2, name: "James Wilson", timeAgo: "5 minutes ago", avatar: "👤" },
];

const Invitations = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        userName="Player"
        onSignOut={() => navigate("/")}
        onLeaderboard={() => navigate("/leaderboard")}
        onFindFriends={() => navigate("/friends")}
        onInvitations={() => navigate("/invitations")}
        onProfile={() => {}}
      />
      <main className="flex-1 flex flex-col p-8">
        <GameInvitations invitations={invitations} />
      </main>
      <Footer />
    </div>
  );
};

export default Invitations;
