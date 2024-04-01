import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";

import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AboutPage from "../Pages/AboutPage/About";
import CarListing from "../Pages/CarListing/CarListing";
import CarDetails from "../UI/CarDetails/CarDetails";
import Blog from "../Pages/BlogPage/BlogPage";
import BlogDetails from "../UI/BlogDetails/BlogDetails";
import Contact from "../Pages/ContactPage/ContactPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import OwnerPage from "../Pages/OwnerPage/OwnerPage";

import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "cars", element: <CarListing /> },
      { path: "cars/:slug", element: <CarDetails /> },
      { path: "blogs", element: <Blog /> },
      { path: "blogs/:slug", element: <BlogDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "register-owner", element: <OwnerPage /> },
      {
        path: "register-owner",
        element: (
          <ProtectedRoute>
            <OwnerPage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
