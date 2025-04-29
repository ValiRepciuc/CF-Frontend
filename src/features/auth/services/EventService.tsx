import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getCurrentEvent = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/event`);
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
