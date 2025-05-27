import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/leaderboard`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
