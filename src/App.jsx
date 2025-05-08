import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <>
      {" "}
      <div class="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <Header />
        <GameBoard />
      </div>
    </>
  );
}

export default App;
