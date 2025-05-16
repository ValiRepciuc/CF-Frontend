import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getLeaderboard = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/leaderboard`
    );
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
