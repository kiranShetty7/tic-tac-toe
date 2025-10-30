import React, { useState, useEffect } from "react";
import StrikeThrough from "../../components/StrikeThrough";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { randomizedSelectionFromArray } from "../../helper";
import { ROUTES } from "../../constants/routes";
import Footer from "../../components/Footer";
import GameBoard from "../../components/GameBoard";
import Header from "../../components/Header";

const AiGameBoard = () => {
  const navigate = useNavigate();
  const aiSymbol = "O";
  const user = aiSymbol === "X" ? "O" : "X";
  const didAiWinToss = true;
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [lockGameBoard, setLockGameBoard] = useState(false);
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
      setLockGameBoard(true);
      setTimeout(() => {
        makeAiMove();
      }, 1500);
    } else setLockGameBoard(false);
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
        <Footer />
      </div>
    </>
  );
};

export default AiGameBoard;
