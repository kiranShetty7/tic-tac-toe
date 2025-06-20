import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./pages/Landingpage/index.jsx";
import GameMode from "./pages/GameMode/index.jsx";
import TossAndSymbolSelection from "./pages/TossAndSymbolSelection/index.jsx";
import Friends from "./pages/Friends/index.jsx";
import Leaderboard from "./pages/Leaderboard/index.jsx";
import GameBoard from "./components/GameBoard";
import "./App.css";

// Lazy load the remote auth app
const RemoteAuth = lazy(() => import("authApp/auth"));

function AuthWrapper() {
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate("/mode");
  };

  return (
    <Suspense fallback={<div>Loading Auth Module...</div>}>
      <RemoteAuth onLoginSuccess={onLoginSuccess} />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthWrapper />,
  },
  {
    path: "/mode",
    element: <GameMode />,
  },
  {
    path: "/toss",
    element: <TossAndSymbolSelection />,
  },
  // {
  //   path: "/symbol-choice",
  //   element: <SymbolChoice />,
  // },
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
