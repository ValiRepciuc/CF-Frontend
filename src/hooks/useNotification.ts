import { useState, useEffect } from "react";
import { getNotification } from "../services/NotificationService";

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotification();
        const notificationList: Notification[] = response.map(
          (language: any) => ({
            id: language.id,
            message: language.message,
            isRead: language.isRead || false,
          })
        );
        setNotification(notificationList);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };
    fetchNotification();
  }, []);

  return { notification };
};
