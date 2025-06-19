import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getUserAchievements = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user-achivement`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
