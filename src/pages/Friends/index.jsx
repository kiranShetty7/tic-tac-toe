import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import FindFriends from "./FindFriends";
import GameInvitations from "./GameInvitations";
import Footer from "../../components/Footer";

const Friends = () => {
  const navigate = useNavigate();

  // Mock data for friends
  const friendsList = [
    { id: 1, name: "Alex Johnson", status: "Online", avatar: "👤" },
    { id: 2, name: "Sarah Smith", status: "Last seen 5m ago", avatar: "👤" },
  ];

  // Mock data for game invitations
  const invitations = [
    { id: 1, game: "Chess", from: "Mike", avatar: "👤" },
    { id: 2, game: "Checkers", from: "Emma", avatar: "👤" },
  ];

  const handleSignOut = () => navigate("/");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-8">
        <FindFriends friendsList={friendsList} />
        <GameInvitations invitations={invitations} />
      </main>

      <Footer />
    </div>
  );
};

export default Friends;
