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
import PlayerGameBoard from "./pages/playerGameBoard/index.jsx";
import NotFound from "./pages/NotFound/index.jsx"; // Import the NotFound component
import Profile from "./pages/Profile/index.jsx";
import { ROUTES } from "./constants/routes";
import "./App.css";

// Lazy load the remote auth app
const RemoteAuth = lazy(() => import("authApp/auth"));

function AuthWrapper() {
  const navigate = useNavigate();

  const onLoginSuccess = () => {
    navigate(ROUTES.MODE);
  };

  return (
    <Suspense fallback={<div>Loading Auth Module...</div>}>
      <RemoteAuth onLoginSuccess={onLoginSuccess} />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
  },
  {
    path: ROUTES.AUTH,
    element: <AuthWrapper />,
  },
  {
    path: ROUTES.MODE,
    element: <GameMode />,
  },
  {
    path: ROUTES.TOSS,
    element: <TossAndSymbolSelection />,
  },
  {
    path: ROUTES.FRIENDS,
    element: <Friends />,
  },
  {
    path: ROUTES.LEADERBOARD,
    element: <Leaderboard />,
  },
  {
    path: ROUTES.GAME,
    element: <PlayerGameBoard />,
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
