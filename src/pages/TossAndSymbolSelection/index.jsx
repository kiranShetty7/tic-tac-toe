import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toss from "../../components/Toss";
import SymbolChoice from "../../components/SymbolChoice";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

  const handleSignOut = () => navigate("/");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSignOut={handleSignOut} />
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
      <Footer />
    </div>
  );
};

export default TossAndSymbolSelection;
