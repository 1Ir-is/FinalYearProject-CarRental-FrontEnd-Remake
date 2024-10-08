import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, loginAPIGoogle, registerAPI } from "../Services/AuthService";
import { editUserAPI } from "../Services/UserService";
import { toast } from "react-toastify";
import React from "react";
import { message } from "antd";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, name: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  loginUserGoogle: (email: string) => void;
  editUser: (formData: FormData) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  startLogoutTimer: () => void;
  resetLogoutTimer: () => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const cacheUserData = (token: string, userData: UserProfile) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  };

  const registerUser = async (
    email: string,
    name: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, name, password);
      if (res) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        message.success("Register Success!");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user. Please try again.");
    }
  };

  

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          cacheUserData(res.data.token, res.data);
          const userObj: UserProfile = {
            userId: res?.data.userId,
            name: res?.data.name,
            email: res?.data.email,
            address: res?.data.address,
            phone: res?.data.phone,
            role: res?.data.role,
            avatar: res?.data.avatar,
            trustPoint: res?.data.trustPoint 
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          message.success("Login Success!");
          navigate("/home");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };
  
  const loginUserGoogle = async (email: string) => {
    try {   
      const res = await loginAPIGoogle(email);
      if (res) {
        cacheUserData(res.data.token, res.data);
        const userObj: UserProfile = {
          userId: res?.data.userId,
          name: res?.data.name,
          email: res?.data.email,
          address: res?.data.address,
          phone: res?.data.phone,
          role: res?.data.role,
          avatar: res?.data.avatar,
          trustPoint: res?.data.trustPoint // Include the trustPoint property
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!);
        message.success("Login with Google Success!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
      message.error("Failed to login with Google. Please try again.");
    }
  };

  const editUser = async (formData: FormData) => {
    try {
      const res = await editUserAPI(formData);
      if (res) {
        const editedUserData: UserProfile = {
          userId: user?.userId,
          name: formData.get("name") as string,
          email: user?.email,
          phone: formData.get("phone") as string,
          address: formData.get("address") as string,
          role: user?.role,
          avatar: user?.avatar,
          trustPoint: user?.trustPoint // Preserve the trustPoint property
        };

        setUser(editedUserData);

        const updatedUser = {
          ...user,
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          address: formData.get("address") as string,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("User information updated successfully!", user);

        toast.success("User information updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    clearTimeout(logoutTimer!);
    navigate("/");
  };

  const startLogoutTimer = () => {
    const timer = setTimeout(logout, 30 * 60 * 1000); // 30 minutes
    setLogoutTimer(timer);
  };

  const resetLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      startLogoutTimer();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        registerUser,
        loginUser,
        editUser,
        logout,
        isLoggedIn,
        setUser,
        loginUserGoogle,
        startLogoutTimer,
        resetLogoutTimer,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
