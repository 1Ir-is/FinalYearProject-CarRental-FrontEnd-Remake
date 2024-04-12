import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7228/api/";

export const loginAPI = async (email: string, password: string) => {
  try {
  
    const data = await axios.post<UserProfileToken>(api + "Auth/login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginAPIGoogle = async (googleEmail: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "Auth/login-with-google", null, {
      params: {
        googleEmail: googleEmail
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  name: string, 
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "Auth/register", {
      email: email,
      name: name, 
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const editUserAPI = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const data = await axios.post<UserProfileToken>(api + "User/edit-info", formData, config);
    return data;
  } catch (error) {
    handleError(error);
  }
};


