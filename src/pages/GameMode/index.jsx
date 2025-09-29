import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GameMode = () => {
  const navigate = useNavigate();
  const userName = "Player 1"; // Replace with actual user name from state/auth

  const handleSignOut = () => navigate("/");
  const handleProfile = () => alert("Profile details coming soon!");
  const handleFindFriends = () => navigate(ROUTES.FRIENDS);
  const handleInvitations = () => alert("Game invitations coming soon!");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        userName={userName}
        onSignOut={handleSignOut}
        onProfile={handleProfile}
        onFindFriends={handleFindFriends}
        onInvitations={handleInvitations}
      />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-12">Choose Your Game Mode</h1>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button
            onClick={() => navigate(ROUTES.TOSS)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4"
          >
            <span className="text-xl">🤖</span>
            Play with AI
          </Button>

          <Button
            onClick={() => navigate(ROUTES.FRIENDS)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4"
          >
            <span className="text-xl">👥</span>
            Play Online
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameMode;
