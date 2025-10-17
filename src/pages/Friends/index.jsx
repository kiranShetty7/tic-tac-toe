import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import FindFriends from "./FindFriends";
import GameInvitations from "./GameInvitations";
import Footer from "../../components/Footer";

const Friends = () => {
  const navigate = useNavigate();
  const handleSignOut = () => navigate("/");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-8">
        <FindFriends />
        <GameInvitations />
      </main>

      <Footer />
    </div>
  );
};

export default Friends;
