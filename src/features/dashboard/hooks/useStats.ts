import { useEffect, useState } from "react";
import { getTotalEvents, getTotalSubmissions } from "../services/StatsService";

export const useStats = () => {
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [submissionsCount, setSubmissionsCount] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsData = await getTotalEvents();
        setEventsCount(eventsData.length);

        const submissionsData = await getTotalSubmissions();
        setSubmissionsCount(submissionsData.length);
      } catch (error) {
        console.error("Eroare la stats:", error);
      }
    };

    fetchStats();
  }, []);

  return { eventsCount, submissionsCount };
};
