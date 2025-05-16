import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/LeaderboardService";

interface LeaderboardItem {
  id: string;
  username: string;
  score: number;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [firstPlace, setFirstPlace] = useState<LeaderboardItem | null>(null);
  const [secondPlace, setSecondPlace] = useState<LeaderboardItem | null>(null);
  const [thirdPlace, setThirdPlace] = useState<LeaderboardItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardList = await getLeaderboard();
        setLeaderboard(leaderboardList);

        setFirstPlace(leaderboardList[0] || null);
        setSecondPlace(leaderboardList[1] || null);
        setThirdPlace(leaderboardList[2] || null);
      } catch (error) {
        console.error("Eroare la leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { firstPlace, secondPlace, thirdPlace, isLoading, leaderboard };
};
