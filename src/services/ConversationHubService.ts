import * as signalR from "@microsoft/signalr";

let conn: signalR.HubConnection | null = null;

export const startChatConnection = async (baseUrl: string) => {
  if (conn) return conn;

  conn = new signalR.HubConnectionBuilder()
    .withUrl(`${baseUrl}/chatHub`, { withCredentials: true })
    .withAutomaticReconnect()
    .build();

  conn.onreconnecting((err) => console.warn("Reconnecting...", err));
  conn.onreconnected(() => console.log("Reconnected."));
  conn.onclose((err) => {
    conn = null;
  });

  await conn.start();
  return conn;
};

export const stopChatConnection = async () => {
  if (conn) {
    await conn.stop();
    conn = null;
  }
};
