import { useState, useEffect } from "react";
import { getLeaderboard } from "../../challenge/services/LeaderboardService";
import {
  startLeaderboardConnection,
  stopLeaderboardConnection,
} from "../../../services/LeaderboardHubService";

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
  isCurrentUser?: boolean;
}

export const useLeaderboardComplete = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [firstTen, setFirstTen] = useState<LeaderboardEntry[]>([]);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const currentUser = localStorage.getItem("user");
  const currentUsername = currentUser ? JSON.parse(currentUser).userName : null;

  const updateLeaderboard = (data: any[]) => {
    const leaderboardList: LeaderboardEntry[] = data
      .slice(0, 100)
      .map((entry: any, index: number) => ({
        id: entry.id,
        username: entry.username,
        score: entry.score,
        rank: index + 1,
        isCurrentUser: entry.username === currentUsername,
      }));

    const firstTenLeaderboard = leaderboardList.slice(0, 10);
    setLeaderboard(leaderboardList);
    setFirstTen(firstTenLeaderboard);

    const userCurrent = leaderboardList.find((entry) => entry.isCurrentUser);
    setUserEntry(userCurrent || null);
  };

  useEffect(() => {
    const fetchAndConnect = async () => {
      try {
        const data = await getLeaderboard();
        updateLeaderboard(data);
        await startLeaderboardConnection(updateLeaderboard);
      } catch (err) {
        console.error("Failed to fetch or connect to hub:", err);
      }
    };

    fetchAndConnect();

    return () => {
      stopLeaderboardConnection();
    };
  }, []);

  return { leaderboard, firstTen, userEntry };
};
