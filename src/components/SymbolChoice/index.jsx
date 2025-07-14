import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { decisionMaker } from "../../helper";

const SymbolChoice = ({ isUserTossWinner }) => {
  const navigate = useNavigate();
  const [userSymbol, setUserSymbol] = useState("X");

  useEffect(() => {
    if (!isUserTossWinner) {
      setUserSymbol(decisionMaker() ? "X" : "O");
    }
  }, []);

  const handleUserSymbol = (symbol) => {
    setUserSymbol(symbol);
    startGame();
  };

  const startGame = () => {
    navigate("/game");
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      {isUserTossWinner ? (
        <>
          <h1 className="text-4xl font-bold mb-4">
            Congratulations! You won the toss!
          </h1>
          <p className="text-gray-600 mb-12">
            Choose your symbol to start the game
          </p>
          <div className="flex gap-8">
            {/* X Button */}
            <Button
              onClick={() => handleUserSymbol("X")}
              className="w-24 h-24 text-5xl font-bold bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center"
            >
              X
            </Button>
            {/* O Button */}
            <Button
              onClick={() => handleUserSymbol("O")}
              className="w-24 h-24 text-5xl font-bold bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center"
            >
              O
            </Button>
          </div>
          <p className="text-gray-600 mt-8 text-sm">
            Your opponent will automatically get the other symbol
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Sorry! You lost the toss.
          </h1>
          <p className="text-gray-600 mb-12 text-center">
            The AI has chosen{" "}
            <span className="font-bold text-black">
              {userSymbol === "X" ? "O" : "X"}
            </span>{" "}
            for its game.
            <br />
            You will play as{" "}
            <span className="font-bold text-black">{userSymbol}</span>.
          </p>
          <Button onClick={startGame}>Start Game</Button>
        </div>
      )}
    </main>
  );
};

export default SymbolChoice;
