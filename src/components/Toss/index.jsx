import React, { useState } from "react";
import { decisionMaker } from "../../helper";

const Toss = ({ toggleTossMode, setIsUserTossWinner }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCoinClick = (choice) => {
    setIsFlipping(true);
    // considering even as heads and odd as tails
    const isHeads = decisionMaker();
    const isUserWinner = isHeads && choice === "heads";
    setIsUserTossWinner(isUserWinner);
    setTimeout(() => {
      setIsFlipping(false);
    }, 1500);
    toggleTossMode(false);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Time for the Toss!</h1>
      <p className="text-gray-600 mb-12">Choose Heads or Tails</p>

      <div className="flex gap-8">
        {/* Heads Button */}
        <button
          onClick={() => handleCoinClick("heads")}
          disabled={isFlipping}
          className={`w-24 h-24 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center gap-2 ${
            isFlipping ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span className="text-sm font-medium">Heads</span>
        </button>

        {/* Tails Button */}
        <button
          onClick={() => handleCoinClick("tails")}
          disabled={isFlipping}
          className={`w-24 h-24 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center gap-2 ${
            isFlipping ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          <svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm font-medium">Tails</span>
        </button>
      </div>

      {isFlipping && (
        <p className="mt-8 text-xl font-semibold animate-pulse">Flipping...</p>
      )}
    </main>
  );
};

export default Toss;
