import { useState, useEffect } from "react";

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

  const [player, setPlayer] = useState("X");
  const validWinPatterns = [1, 2, 3, 4];
  const checkWinner = (player) => {
    const sortedOrder = squares.filter((item) => item.value === player);
    let count = 0;
    let difference = sortedOrder[1]?.id - sortedOrder[0]?.id;
    for (
      let i = sortedOrder[0]?.id;
      i <= sortedOrder[sortedOrder.length - 1]?.id;
      i = i + difference
    ) {
      if (i !== sortedOrder[count]?.id) {
        return {
          winner: false,
          pattern: 0,
        };
      }
      count = count + 1;
    }

    return {
      winner: sortedOrder.length >= 3 && validWinPatterns.includes(difference),
      pattern: difference,
    };
  };
  useEffect(() => {
    const isXWinner = checkWinner("X");
    const isYWinner = !isXWinner?.winner && checkWinner("O");

    console.log(isXWinner, "X");
    console.log(isYWinner, "O");
  }, [squares]);

  const handleSquareClick = (id) => {
    setSquares((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.value) return { ...item, value: player };
        return item;
      })
    );
    setPlayer((prev) => (prev === "X" ? "O" : "X"));
  };
  return (
    <>
      <div class="grid grid-cols-3 grid-rows-3 gap-2">
        {squares.map((item) => (
          <>
            <div
              key={item?.id}
              class="flex items-center justify-center w-16 h-16 border border-gray-400 text-2xl font-bold"
              onClick={() => handleSquareClick(item?.id)}
            >
              {item.value}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
