import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getFriendships = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/friendship/friends`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getFriendshipRequests = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/friendship/requests`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const sendFriendshipRequest = async (username: string) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/friendship/add-by-username/${username}`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptFriendshipRequest = async (requestId: string) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/friendship/${requestId}/accept`,
      {
        isAccepted: true,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
