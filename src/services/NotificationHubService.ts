import * as signalR from "@microsoft/signalr";
import type { Notification } from "../hooks/useNotification"; // import tipul corect

let connection: signalR.HubConnection | null = null;
let onNotificationUpdatedCallback:
  | ((notification: Notification) => void)
  | null = null;

export const startNotificationHub = async (
  onNotificationUpdated: (notification: Notification) => void
) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5120/notificationHub")
    .withAutomaticReconnect()
    .build();

  onNotificationUpdatedCallback = onNotificationUpdated;

  connection.on("ReceiveNotification", (data) => {
    console.log("[SignalR] NotificationUpdated received:", data);

    const parsedNotification: Notification = {
      id: data.id,
      message: data.message,
      isRead: data.isRead ?? false,
      createdAt: new Date(data.createdAt), // 👈 conversie importantă
    };

    if (onNotificationUpdatedCallback) {
      onNotificationUpdatedCallback(parsedNotification);
    }
  });

  try {
    await connection.start();
    console.log("Connected to SignalR notificationHub");
  } catch (err) {
    console.error("SignalR Connection Error:", err);
  }
};

export const stopNotificationConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
  }
};
