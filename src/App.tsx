import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { UserProvider, useAuth } from "./Context/useAuth";
import TalkJs from './Components/ChatBox/TalkJs'; // Import TalkJs here
import { Button, Modal } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { GoogleOAuthProvider } from "@react-oauth/google";


// Define a function to check if the current location is ForbiddenPage
import { Location } from 'history';
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
        {/* Render TalkJs and other components */}
        <div style={{ position: 'relative' , backgroundColor: 'white'}}>
          <MessageOutlined
            onClick={toggleTalkJs}
            style={{ position: 'fixed', bottom: '100px', right: '20px', fontSize: '35px', color: '#1890ff', cursor: 'pointer' }}
          />
          <Modal
            title="Chat"
            open={isTalkJsVisible}
            onCancel={toggleTalkJs}
            footer={null}
            width={400}
            style={{ top: 20 }}
          >
            <TalkJs />
          </Modal>
        </div>
        <ToastContainer />
        {/* Render Footer only if it's not ForbiddenPage */}
        {!isForbidden && <Footer />}
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
