import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";
import { UserProfileToken } from "../../../types/User";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${import.meta.env.VITE_API_BASE_URL}/account/login`,
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(
      `${import.meta.env.VITE_API_BASE_URL}/account/register`,
      {
        email: email,
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};
