import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ForbiddenPage from './Pages/ForbiddenPage/ForbiddenPage'; // Import ForbiddenPage
import NotFoundPage from './Pages/NotFound/NotFoundPage';

function App() {
  const location = useLocation();
  const isForbiddenPage = location.pathname === '/access-denied'; // Check if current location is ForbiddenPage
  const isNotFoundPage = location.pathname === '/404'; // Check if current location is NotFoundPage
  return (
    <GoogleOAuthProvider clientId="638694555637-qubfimig6enoofibrod54okt690pa4kl.apps.googleusercontent.com">
      <UserProvider>
        {!isForbiddenPage && !isNotFoundPage && <Navbar />} {/* Render Navbar if not ForbiddenPage or NotFoundPage */}
        {!isNotFoundPage ? <Outlet /> : <NotFoundPage />} {/* Render Outlet if not NotFoundPage, otherwise render NotFoundPage */}
        <ToastContainer />
        {!isForbiddenPage && !isNotFoundPage && <Footer />} {/* Render Footer if not ForbiddenPage or NotFoundPage */}
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
