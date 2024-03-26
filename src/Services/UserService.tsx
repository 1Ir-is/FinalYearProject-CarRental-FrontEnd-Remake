import axios from 'axios';
import { handleError } from '../Helpers/ErrorHandler';
import { UserProfileToken } from '../Models/User';

const api = 'https://localhost:7228/api/';

export const editUserAPI = async (formData: FormData) => {
  try {
    const data = await axios.post<UserProfileToken>(api + 'User/edit-info', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
