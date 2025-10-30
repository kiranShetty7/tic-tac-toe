import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { randomizedSelectionFromArray } from "../../helper";
import { ROUTES } from "../../constants/routes";
import Footer from "../../components/Footer";
import GameBoard from "../../components/GameBoard";
import Header from "../../components/Header";

const PlayerGameBoard = () => {
  const navigate = useNavigate();
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [lockGameBoard, setLockGameBoard] = useState(false);
  const [matchResults, setMatchResults] = useState({
    winner: "",
    isDraw: false,
    pattern: -1,
  });
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [playAgainLayover, setPlayAgainLayover] = useState(false);
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getMatchDetails = () => {
    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (squares[a] === squares[b] && squares[b] === squares[c]) {
        return {
          winner: squares[a],
          isDraw: false,
          pattern: i,
        };
      }
    }
    const allSquaresFilled = squares.every((square) => square !== "");

    if (allSquaresFilled)
      return {
        winner: "",
        isDraw: true,
        pattern: -1,
      };

    return {
      winner: "",
      isDraw: false,
      pattern: -1,
    };
  };

  useEffect(() => {
    const matchDetails = getMatchDetails();
    setMatchResults(matchDetails);
  }, [currentPlayer]);

  useEffect(() => {
    if (matchResults.winner || matchResults.isDraw)
      setTimeout(() => {
        setPlayAgainLayover(true);
      }, 3000);
  }, [matchResults]);

  const handleSquareClick = (index) => {
    if (!matchResults.winner && !squares[index]) {
      setSquares((square) =>
        square.map((value, squareIndex) => {
          if (squareIndex === index) return currentPlayer;
          return value;
        })
      );
      setCurrentPlayer(() => (currentPlayer === "X" ? "O" : "X"));
    }
  };

  return (
    <>
      {playAgainLayover && (
        <div className="absolute inset-0 z-[100] bg-black/10 backdrop-blur-xs flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl flex flex-col items-center gap-6 max-w-sm w-full">
            <div className="text-2xl font-bold text-center text-gray-800">
              Play again?
            </div>
            <div className="flex gap-4">
              <Button onClick={() => navigate(ROUTES.TOSS)}>Yes</Button>
              <Button
                onClick={() => setPlayAgainLayover(false)}
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <GameBoard
          handleSquareClick={handleSquareClick}
          squares={squares}
          matchResults={matchResults}
          lockGameBoard={lockGameBoard}
        />
        {/* {!matchResults?.winner && !matchResults.isDraw ? (
          <div className="mt-8 text-xl font-semibold">
            {currentPlayer === aiSymbol
              ? "Ai is making a move...."
              : "Your turn"}
          </div>
        ) : (
          <div className="mt-8 text-4xl font-bold mb-4">
            {matchResults?.winner
              ? aiSymbol === matchResults?.winner
                ? "AI Wins!! 🤖🏆"
                : "You Win!! 🎉🔥"
              : "It's a Draw! 🤝"}
          </div>
        )} */}
        <Footer />
      </div>
    </>
  );
};

export default PlayerGameBoard;
