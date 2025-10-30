import StrikeThrough from "../StrikeThrough";
import Footer from "../Footer";

const GameBoard = ({
  handleSquareClick,
  squares,
  matchResults,
  lockGameBoard,
}) => {
  console.log(lockGameBoard, "lockGameBoard");
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
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
                  onClick={() => !lockGameBoard && handleSquareClick(index)}
                  className="w-24 h-24 bg-white border border-gray-200 rounded-lg text-4xl font-bold flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GameBoard;
