import { useState, useEffect } from "react";
import StrikeThrough from "../StrikeThrough";
const GameBoard = () => {
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
    <div style={{ position: "relative", padding: "1rem" }}>
      {/* <div className="w-1 h-50 border border-red-500"></div> */}
      {pattern > 0 && <StrikeThrough pattern={pattern} />}
      <div class="grid grid-cols-3 grid-rows-3 gap-2">
        {squares.map((item) => (
          <>
            <div
              key={item?.id}
              class="flex items-center justify-center w-16 h-16 border border-gray-400 text-2xl font-bold"
              onClick={() => handleSquareClick(item?.id)}
              style={{ position: "relative" }}
            >
              {item.value}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
