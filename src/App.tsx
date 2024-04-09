import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";
import { PostProvider } from "./Context/usePost"; // Import PostProvider
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <UserProvider>
      <PostProvider> {/* Wrap with PostProvider */}
        <Navbar />
        <Outlet />
        <ToastContainer />
        <Footer />
      </PostProvider>
    </UserProvider>
  );
}

export default App;
