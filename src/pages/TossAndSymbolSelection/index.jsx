import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toss from "../../components/Toss";
import SymbolChoice from "../../components/SymbolChoice";
import Button from "../../components/Button";

const TossAndSymbolSelection = () => {
  const navigate = useNavigate();
  const [tossMode, setTossMode] = useState(true);
  const [isUserTossWinner, setIsUserTossWinner] = useState(false);

  const toggleTossMode = (state) => {
    setTossMode(state);
  };

  const setTossWinner = (state) => {
    setIsUserTossWinner(state);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">TicTacToe</span>
        </div>
        <Button onClick={() => navigate("/")}>Sign Out</Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {tossMode ? (
          <Toss
            toggleTossMode={toggleTossMode}
            setIsUserTossWinner={setIsUserTossWinner}
          />
        ) : (
          <SymbolChoice
            isUserTossWinner={isUserTossWinner}
            toggleTossMode={toggleTossMode}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default TossAndSymbolSelection;
