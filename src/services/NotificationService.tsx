import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";

export const getNotification = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/notification/my`,
      {
        withCredentials: true,
      }
    );
    return data.data;
  } catch (error) {
    handleError(error);
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/notification/${notificationId}`,
      { isRead: true },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    handleError(error);
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/notification/readall`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    handleError(error);
  }
};
