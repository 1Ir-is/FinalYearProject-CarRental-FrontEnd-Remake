import { Outlet } from "react-router";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";
import Footer from "./Components/Footer/Footer";
import TalkJs from './Components/ChatBox/TalkJs'; // Import TalkJs here
import { Button, Modal } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [isTalkJsVisible, setIsTalkJsVisible] = useState<boolean>(false);

  const toggleTalkJs = () => {
    setIsTalkJsVisible(prevState => !prevState);
  };
  return (
    <GoogleOAuthProvider clientId="638694555637-qubfimig6enoofibrod54okt690pa4kl.apps.googleusercontent.com">
    <UserProvider>
        <Navbar />
        <Outlet />
      {/* =============== talkjs section =========== */}
      <div style={{ position: 'relative' , backgroundColor: 'white'}}>
        {/* Your existing code */}
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
        <Footer />
    </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
