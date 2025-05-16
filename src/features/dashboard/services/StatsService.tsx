import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getTotalUsers = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalSubmissions = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/submission`
    );
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const getTotalEvents = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/event`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
