import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getChallenges = async (eventId: string) => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/challenge/by-event/${eventId}`
    );
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
