import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/Landingpage/index.jsx';
import GameMode from './pages/GameMode/index.jsx';
import Toss from './pages/Toss/index.jsx';
import SymbolChoice from './pages/SymbolChoice/index.jsx';
import Friends from './pages/Friends/index.jsx';
import Leaderboard from './pages/Leaderboard/index.jsx';
import GameBoard from './components/GameBoard';
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/mode",
    element: <GameMode />,
  },
  {
    path: "/toss",
    element: <Toss />,
  },
  {
    path: "/symbol-choice",
    element: <SymbolChoice />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/game",
    element: <GameBoard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
