import { getUserAchievements } from "../services/UserAchievement";
import { useEffect, useState } from "react";

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  criteria: string;
}

export const useUserAchievements = () => {
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserAchievements = async () => {
      try {
        const response = await getUserAchievements();
        const formattedAchievements = response.map((achievement: any) => ({
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          iconUrl: achievement.iconUrl,
          criteria: achievement.criteria,
        }));
        setAchievements(formattedAchievements);
      } catch (error) {
        console.error("Error fetching user achievements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAchievements();
  }, []);

  return { achievements, loading };
};
