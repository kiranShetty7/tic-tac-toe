import { useState, useEffect } from "react";
import StrikeThrough from "../StrikeThrough";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { randomizedSelectionFromArray } from "../../helper";

const GameBoard = () => {
  const navigate = useNavigate();
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [strikePattern, setStrikePattern] = useState(-1);
  const [player, setPlayer] = useState("X");
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

  const getEmptyPositions = (array) =>
    array
      .map((square, index) => (square === "" ? index : ""))
      .filter((item) => item !== "");

  const getWinInfo = (player) => {
    for (let i = 0; i < winPatterns.length; i++) {
      const pattern = winPatterns[i];
      const [a, b, c] = pattern;
      const patternPositionOnGameboard = [squares[a], squares[b], squares[c]];

      const filteredPlayerPosition = patternPositionOnGameboard.filter(
        (position) => position === player
      );

      const emptyPosition = getEmptyPositions(patternPositionOnGameboard);

      if (filteredPlayerPosition.length === 2 && emptyPosition.length === 1) {
        setStrikePattern(i);
        return {
          winningMove: pattern[emptyPosition[0]],
          pattern: i,
        };
      }
    }

    return {
      winningMove: -1,
      pattern: -1,
    };
  };

  const makeFirstMove = () => {
    const initialMoves = [0, 2, 4, 6, 8];
    const emptyPositions = getEmptyPositions(squares);
    const availableMoves = initialMoves.filter((move) =>
      emptyPositions.includes(move)
    );

    const index = randomizedSelectionFromArray(availableMoves.length);
    const aiMove = availableMoves[index];
    return aiMove;
  };

  const getBestMove = () => {
    const winData = getWinInfo("O");
    const { winningMove, pattern } = winData;
    if (winningMove >= 0) {
      setStrikePattern(pattern);
      return winningMove;
    }

    const blockData = getWinInfo("X");
    const { winningMove: blockingMove } = blockData;
    if (blockingMove >= 0) return blockingMove;

    if (winningMove < 0 && blockingMove < 0) {
      const existingAIPosition = squares.findIndex((square) => square === "O");
      for (let pattern of winPatterns) {
        const emptyPositions = pattern
          .map((item) => (squares[item] === "" ? item : ""))
          .filter((item) => item !== "");
        if (
          pattern.includes(existingAIPosition) &&
          emptyPositions?.length >= 1
        ) {
          const randomizedIndex = randomizedSelectionFromArray(
            emptyPositions?.length
          );
          return emptyPositions[randomizedIndex];
        }
      }
    }
  };

  const makeAiMove = () => {
    const aiMoveCount = squares.filter((square) => square === "O").length;
    let aiMove;
    ``;
    if (aiMoveCount === 0) aiMove = makeFirstMove();
    if (aiMoveCount > 0) {
      aiMove = getBestMove();
    }
    handleSquareClick(aiMove);
  };

  useEffect(() => {
    if (player === "O") {
      setTimeout(() => {
        makeAiMove();
      }, 1500);
    }
  }, [player]);

  const handleSquareClick = (index) => {
    if (!squares[index] || player === "O")
      setSquares((square) =>
        square.map((value, squareIndex) => {
          if (squareIndex === index) return player;
          return value;
        })
      );
    setPlayer(() => (player === "X" ? "O" : "X"));
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
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Play Tic Tac Toe Online</h1>
        <p className="text-gray-600 mb-8">
          Challenge your friends or play against AI in the classic game of X's
          and O's
        </p>

        {/* Game Board */}
        <div className="relative">
          {/* {strikePattern > 0 && <StrikeThrough pattern={strikePattern} />} */}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            {squares.map((value, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSquareClick(index);
                }}
                className="w-24 h-24 bg-white border border-gray-200 rounded-lg text-4xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                {value}
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
