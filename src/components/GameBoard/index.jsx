import { useState, useEffect } from "react";
import StrikeThrough from "../StrikeThrough";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { randomizedSelectionFromArray } from "../../helper";

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
  const [gameModeDetails, setGameModeDetails] = useState({
    noOfMoves: {
      X: 1,
      O: 1,
    },
  });
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

  useEffect(() => {
    if (player === "O") {
      setTimeout(() => {
        makeSystemMove();
      }, 1100);
    }
  }, [player]);

  const matchPatterns = (playerValues) => {
    for (let i = 0; i < winPatterns.length; i++) {
      const pattern = winPatterns[i];
      const patternMatch = pattern.every((item) => playerValues.includes(item));
      if (patternMatch) {
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

    const isXwinner = matchPatterns(xValues);
    const isOwinner = !isXwinner && matchPatterns(oValues);
  };

  const makeSystemMove = () => {
    const systemsMove = decideNextMove();
    handleSquareClick(systemsMove);
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
      setGameModeDetails((prev) => ({
        ...prev,
        noOfMoves: {
          ...prev.noOfMoves,
          [player]: prev.noOfMoves[player] + 1,
        },
      }));
      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const getUnavailableSquares = () =>
    squares
      .filter((square) => square.value)
      .map((filteredSquare) => filteredSquare.id);

  const getAvailableOptions = (totalArray, unavailableOptions) =>
    totalArray?.filter((item) => !unavailableOptions.includes(item));

  const getSystemSquares = () =>
    squares.filter((square) => square.value === "O");

  const getPlayerSquares = () =>
    squares.filter((square) => square.value === "X");

  const makeFirstMove = () => {
    const firstMoveOptions = [1, 3, 5, 7, 9];
    const unAvailableOptions = getUnavailableSquares();
    const availableOptions = getAvailableOptions(
      firstMoveOptions,
      unAvailableOptions
    );

    const firstMoveIndex = randomizedSelectionFromArray(
      availableOptions.length
    );

    const move = availableOptions[firstMoveIndex];

    return move;
  };

  const findWinningPosition = () => {
    const existingSystemPositions = getSystemSquares();
    const existingPlayerPositions = getPlayerSquares();

    const matchingWinPatterns = winPatterns.filter((winPattern) => {
      const systemHasAll = existingSystemPositions.every((index) =>
        winPattern.includes(index?.id)
      );

      const playerDoesNotHaveAny = existingPlayerPositions.every(
        (index) => !winPattern.includes(index?.id)
      );

      return systemHasAll && playerDoesNotHaveAny;
    });

    //select one of the pattern to be formed out of the many patterns selected
    const randomWinPattern =
      matchingWinPatterns[
        randomizedSelectionFromArray(matchingWinPatterns?.length)
      ];

    const validPositions = getAvailableOptions(
      randomWinPattern,
      getUnavailableSquares()
    );

    return (
      validPositions?.[randomizedSelectionFromArray(validPositions?.length)] ||
      0
    );
  };

  const preventPlayerFromWinning = () => {
    const existingSystemPositions = getSystemSquares();
    const existingPlayerPositions = getPlayerSquares();

    const matchingWinPatterns = winPatterns.filter((winPattern) => {
      const systemHasAll = existingPlayerPositions.every((index) =>
        winPattern.includes(index?.id)
      );

      const playerDoesNotHaveAny = existingSystemPositions.every(
        (index) => !winPattern.includes(index?.id)
      );
      return systemHasAll && playerDoesNotHaveAny;
    });

    const randomizedWinPattern =
      matchingWinPatterns[
        randomizedSelectionFromArray(matchingWinPatterns?.length)
      ];

    const validPositions = randomizedWinPattern?.filter(
      (position) =>
        !existingSystemPositions?.some((square) => square.id === position)
    );
    console.log("valid positions", validPositions);
    console.log(
      validPositions?.[randomizedSelectionFromArray(validPositions?.length)]
    );

    const unAvailableOptions = squares
      .filter((square) => square.value)
      .map((filteredSquare) => filteredSquare.id);
    console.log("unavailable options", unAvailableOptions);
    const removedUnavailbleFirstMoveOptions =
      validPositions?.filter((item) => !unAvailableOptions.includes(item)) || 0;
    console.log(removedUnavailbleFirstMoveOptions, "final");
    return removedUnavailbleFirstMoveOptions[0] || 0;
  };

  const drawTheMatch = () => {
    const availablePositions = squares.filter((square) => !square.value);
    const moveIndex = randomizedSelectionFromArray(availablePositions?.length);
    const move = availablePositions[moveIndex]?.id;
    return move;
  };

  const evaluateBestMove = () => {
    const blockPosition = preventPlayerFromWinning();
    if (blockPosition) return blockPosition;
    else {
      const winningPosition = findWinningPosition();
      if (winningPosition) return winningPosition;
      else return drawTheMatch();
    }
  };

  const decideNextMove = () => {
    console.log("decisionk");
    const moves = gameModeDetails?.noOfMoves["O"];
    console.log(moves);
    switch (moves) {
      case 1:
        return makeFirstMove();
      case 2:
        return evaluateBestMove();
      default:
        return evaluateBestMove();
    }
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
          {pattern > 0 && <StrikeThrough pattern={pattern} />}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            {squares.map((item) => (
              <button
                key={item?.id}
                onClick={() => {
                  handleSquareClick(item?.id);
                }}
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
