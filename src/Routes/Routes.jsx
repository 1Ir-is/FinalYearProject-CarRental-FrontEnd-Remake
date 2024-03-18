import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AboutPage from "../Pages/AboutPage/About";
import CarListing from "../Pages/CarListing/CarListing";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "cars", element: <CarListing /> },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
