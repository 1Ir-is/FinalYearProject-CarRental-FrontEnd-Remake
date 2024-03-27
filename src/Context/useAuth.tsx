import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { UserProfile, UserProfileToken } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { editUserAPI } from "../Services/UserService";
import { toast } from "react-toastify";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, name: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  editUser: (formData: FormData) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>; // Add setUser function
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

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

  const registerUser = async (
    email: string,
    name: string,
    password: string
  ) => {
    await registerAPI(email, name, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj: UserProfile = {
            userId: res?.data.userId, // Add userId property
            name: res?.data.name,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Register Success!");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

// Inside your login component or wherever you handle the login logic
const loginUser = async (email: string, password: string) => {
  await loginAPI(email, password)
    .then((res) => {
      if (res) {
        localStorage.setItem("token", res?.data.token);
        const userObj: UserProfile = {
          userId: res?.data.userId,
          name: res?.data.name,
          email: res?.data.email,
          address: res?.data.address, // Include the address
          phone: res?.data.phone, // Include the phone number
          // Other user properties...
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res?.data.token!);
        setUser(userObj!); // Set the user object in the context
        toast.success("Login Success!");
        navigate("/home");
      }
    })
    .catch((e) => toast.warning("Server error occurred"));
};
  
  

  const editUser = async (formData: FormData) => {
    try {
      const res = await editUserAPI(formData);
      if (res) {
        // Update local user state with the edited information
        const editedUserData: UserProfile = {
          userId: user?.userId,
          name: formData.get('name') as string,
          email: user?.email,
          phone: formData.get('phone') as string, // Update phone
          address: formData.get('address') as string, // Update address
          // Include other properties as necessary
        };
        
        setUser(editedUserData);
        
        // Update user information in local storage
        const updatedUser = {
          ...user,
          name: formData.get('name') as string,
          phone: formData.get('phone') as string, // Update phone
          address: formData.get('address') as string, // Update address
          // Update other properties as necessary
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log("User information updated successfully!", user);
  
        // Handle success
        toast.success("User information updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      // Handle error
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
    navigate("/");
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
        setUser, // Include setUser in the context value
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
