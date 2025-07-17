import { useState, useEffect } from "react";
import StrikeThrough from "../StrikeThrough";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { randomizedSelectionFromArray } from "../../helper";

const GameBoard = () => {
  const navigate = useNavigate();
  const aiSymbol = "O";
  const user = aiSymbol === "X" ? "O" : "X";
  const didAiWinToss = false;
  const [squares, setSquares] = useState(Array(9).fill("X"));
  const [matchResults, setMatchResults] = useState({
    winner: "",
    isDraw: false,
    pattern: -1,
  });
  const [currentPlayer, setCurrentPlayer] = useState(
    didAiWinToss ? aiSymbol : user
  );
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

  const getEmptyPositions = (array) =>
    array
      .map((square, index) => (square === "" ? index : ""))
      .filter((item) => item !== "");

  const getWinInfo = (player) => {
    for (let i = 0; i < winPatterns.length; i++) {
      const pattern = winPatterns[i];
      const [a, b, c] = pattern;
      const patternPositionOnGameboard = [squares[a], squares[b], squares[c]];

      const filteredcurrentPlayerPosition = patternPositionOnGameboard.filter(
        (position) => position === player
      );

      const emptyPosition = getEmptyPositions(patternPositionOnGameboard);

      if (
        filteredcurrentPlayerPosition.length === 2 &&
        emptyPosition.length === 1
      )
        return pattern[emptyPosition[0]];
    }
    return -1;
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
    const winningMove = getWinInfo(aiSymbol);
    if (winningMove >= 0) return winningMove;

    const blockingMove = getWinInfo(user);
    if (blockingMove >= 0) return blockingMove;

    if (winningMove < 0 && blockingMove < 0) {
      const existingAIPosition = squares.findIndex(
        (square) => square === aiSymbol
      );
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
    const aiMoveCount = squares.filter((square) => square === aiSymbol).length;
    let aiMove;
    ``;
    if (aiMoveCount === 0) aiMove = makeFirstMove();
    if (aiMoveCount > 0) {
      aiMove = getBestMove();
    }
    handleSquareClick(aiMove);
  };

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
    if (
      (!matchDetails.winner || !matchDetails?.isDraw) &&
      currentPlayer === aiSymbol
    ) {
      setTimeout(() => {
        makeAiMove();
      }, 1500);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (matchResults.winner || matchResults.isDraw)
      setTimeout(() => {
        setPlayAgainLayover(true);
      }, 3000);
  }, [matchResults]);

  const handleSquareClick = (index) => {
    if (!squares[index])
      setSquares((square) =>
        square.map((value, squareIndex) => {
          if (squareIndex === index) return currentPlayer;
          return value;
        })
      );
    setCurrentPlayer(() => (currentPlayer === "X" ? "O" : "X"));
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
              <Button onClick={() => navigate("/toss")}>Yes</Button>
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
            {matchResults.winner && (
              <StrikeThrough pattern={matchResults.pattern} />
            )}
            <div className="grid grid-cols-3 gap-2 bg-gray-50 p-4 rounded-lg shadow-sm">
              {squares.map((value, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (currentPlayer !== aiSymbol && !matchResults.winner)
                      handleSquareClick(index);
                  }}
                  className="w-24 h-24 bg-white border border-gray-200 rounded-lg text-4xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          {console.log(matchResults)}
          {console.log(!matchResults?.winner)}
          {/* Game Status */}
          {!matchResults?.winner && !matchResults.isDraw ? (
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
          )}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-gray-600 text-sm">
          © 2023 TicTacToe. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default GameBoard;
