import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
let onLeaderboardUpdatedCallback: ((leaderboard: any) => void) | null = null;

export const startLeaderboardConnection = async (
  onLeaderboardUpdated: (leaderboard: any) => void
) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5120/leaderboardHub")
    .withAutomaticReconnect()
    .build();

  onLeaderboardUpdatedCallback = onLeaderboardUpdated;

  connection.on("LeaderboardUpdated", (data) => {
    console.log("[SignalR] LeaderboardUpdated received:", data);
    if (onLeaderboardUpdatedCallback) {
      onLeaderboardUpdatedCallback(data);
    }
  });

  try {
    await connection.start();
    console.log("Connected to SignalR leaderboardHub");
  } catch (err) {
    console.error("SignalR Connection Error:", err);
  }
};

export const stopLeaderboardConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
  }
};
