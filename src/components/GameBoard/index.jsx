import { useState, useEffect } from "react";
import StrikeThrough from "../StrikeThrough";
import { useNavigate } from "react-router-dom";

const GameBoard = () => {
  const navigate = useNavigate();
  const [squares, setSquares] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
    { id: 7, value: "" },
    { id: 8, value: "" },
    { id: 9, value: "" },
  ]);
  const [pattern, setPattern] = useState(-1);
  const [player, setPlayer] = useState("X");
  const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const matchPatterns = (playerValues) => {
    for (let i = 0; i < winPatterns.length; i++) {
      const pattern = winPatterns[i];
      const patternMatch = pattern.every((item) => playerValues.includes(item));
      if (patternMatch) {
        console.log(i);
        setPattern(i);
        return true;
      }
    }
    return false;
  };

  const checkWinner = (latestData) => {
    let xValues = [],
      oValues = [];
    latestData.forEach((square) => {
      if (square.value === "X") xValues.push(square.id);
      else if (square.value === "O") oValues.push(square.id);
    });

    console.log(xValues, "xValues");
    console.log(oValues, "oValues");

    const isXwinner = matchPatterns(xValues);
    const isOwinner = !isXwinner && matchPatterns(oValues);
    console.log(isXwinner, "X");
    console.log(isOwinner, "O");
  };

  const handleSquareClick = (id) => {
    if (!squares[id - 1].value) {
      const updatedData = squares.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            value: player,
          };
        } else return item;
      });

      checkWinner(updatedData);

      setSquares(() => updatedData);
      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">TicTacToe</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Play Tic Tac Toe Online</h1>
        <p className="text-gray-600 mb-8">Challenge your friends or play against AI in the classic game of X's and O's</p>

        {/* Game Board */}
        <div className="relative">
          {pattern > 0 && <StrikeThrough pattern={pattern} />}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            {squares.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleSquareClick(item?.id)}
                className="w-24 h-24 bg-white border border-gray-200 rounded-lg text-4xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                {item.value}
              </button>
            ))}
          </div>
        </div>

        {/* Game Status */}
        <div className="mt-8 text-xl font-semibold">
          Current Player: {player}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-600 text-sm">
        © 2023 TicTacToe. All rights reserved.
      </footer>
    </div>
  );
};

export default GameBoard;
