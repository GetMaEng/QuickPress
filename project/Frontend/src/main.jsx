import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; //import these modules
import "./index.css";
import App from "./App.jsx";
import './index.css'
// Import pages
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import GamePlayPage from "./pages/GamePlayPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BeforePlayPage from "./pages/BeforePlayPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TopScorePage from "./pages/TopScorePage.jsx";

const router = createBrowserRouter([
  {
    path: "/", // Home route
    element: <App />, // Render the App component
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/gameplay",
    element: <GamePlayPage/>
  },
  {
    path: "/profile", 
    element: <ProfilePage />,
  },
  {
    path: "/readyScreen",
    element: <BeforePlayPage/>
  },
  {
    path: "/home",
    element: <HomePage/>
  },
  {
    path: "/topScores",
    element: <TopScorePage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
