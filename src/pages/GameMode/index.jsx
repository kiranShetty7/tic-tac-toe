import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const GameMode = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">TicTacToe</span>
        </div>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-12">Choose Your Game Mode</h1>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button
            onClick={() => navigate("/toss")}
            className="w-full flex items-center justify-center gap-2 px-6 py-4"
          >
            <span className="text-xl">🤖</span>
            Play with AI
          </Button>

          <Button
            onClick={() => navigate("/friends")}
            className="w-full flex items-center justify-center gap-2 px-6 py-4"
          >
            <span className="text-xl">👥</span>
            Play Online
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default GameMode;
