import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const postMessage = async (conversationId: string, content: string) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/message/conversation/${conversationId}`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
