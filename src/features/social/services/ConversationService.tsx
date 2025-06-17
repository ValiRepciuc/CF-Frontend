import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getUserConversations = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/conversation`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getConversationById = async (conversationId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/conversation/${conversationId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getOrCreateConversation = async (userId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/conversation/with/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
