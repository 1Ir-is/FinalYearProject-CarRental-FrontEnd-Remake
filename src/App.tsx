import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from './Context/useAuth';
import { Location } from 'history';

import TalkJs from './Components/ChatBox/TalkJs'; 

import ToggleMessage  from "./assets/all-images/icons8-chat.gif";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

const isForbiddenPage = (location: Location) => {
  return location.pathname === "/access-denied";
};

function App() {
  
  const location = useLocation(); // Get the current location
  const isForbidden = isForbiddenPage(location); // Check if it's ForbiddenPage

  const [isTalkJsVisible, setIsTalkJsVisible] = useState<boolean>(false);

  const toggleTalkJs = () => {
    setIsTalkJsVisible(prevState => !prevState);
  };

  return (
    <GoogleOAuthProvider clientId="638694555637-qubfimig6enoofibrod54okt690pa4kl.apps.googleusercontent.com">
      <UserProvider>
        {/* Render Navbar only if it's not ForbiddenPage */}
        {!isForbidden && <Navbar />}
        <Outlet />
      
        <ToastContainer />
        {/* Render Footer only if it's not ForbiddenPage */}
        {!isForbidden && <Footer />}
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
