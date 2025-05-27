import { useState, useEffect } from "react";
import { getLeaderboard } from "../services/LeaderboardService";

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const [userPosition, setUserPosition] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard();
        const leaderboardList: LeaderboardEntry[] = response.map(
          (leaderboard: any) => ({
            id: leaderboard.id,
            username: leaderboard.username,
            score: leaderboard.score,
          })
        );

        setLeaderboard(leaderboardList);

        const currentUser = localStorage.getItem("user");
        const currentUsername = currentUser
          ? JSON.parse(currentUser).userName
          : null;

        const index = leaderboardList.findIndex(
          (entry) => entry.username === currentUsername
        );

        if (index !== -1) {
          setUserEntry(leaderboardList[index]);
          setUserPosition(index + 1);
        } else {
          setUserEntry(null);
          setUserPosition(null);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, userEntry, userPosition };
};
