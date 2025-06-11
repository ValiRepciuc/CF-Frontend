import { useState, useEffect } from "react";
import {
  getNotification,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/NotificationService";
import {
  startNotificationHub,
  stopNotificationConnection,
} from "../services/NotificationHubService";
import { toast } from "react-toastify";

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const useNotification = () => {
  const [notification, setNotification] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await getNotification();
        const notificationList: Notification[] = response
          .map(
            (n: any): Notification => ({
              id: n.id,
              message: n.message,
              isRead: n.isRead ?? false,
              createdAt: new Date(n.createdAt),
            })
          )
          .sort(
            (a: Notification, b: Notification) =>
              b.createdAt.getTime() - a.createdAt.getTime()
          );
        setNotification(notificationList);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();

    startNotificationHub((newNotifRaw: Notification) => {
      const newNotif: Notification = {
        ...newNotifRaw,
        createdAt: new Date(newNotifRaw.createdAt),
      };

      console.log("[LIVE] Notificare live primită:", newNotif);

      setNotification((prev) => {
        const exists = prev.find((n) => n.id === newNotif.id);
        if (exists) return [...prev];

        toast.info(`🔔 ${newNotif.message}`, {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        return [newNotif, ...prev].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      });
    });

    return () => {
      stopNotificationConnection();
    };
  }, []);

  return { notification, setNotification };
};

const useMarkNotificationAsRead = () => {
  const markAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return { markAsRead, markAllAsRead };
};

export { useNotification, useMarkNotificationAsRead };
