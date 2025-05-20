import { useEffect, useState } from "react";
import { getChallenges } from "../services/ChallengesService";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  date: string;
}

export const useChallenges = (eventId: string) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentChallenges, setCurrentChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const rawList = await getChallenges(eventId);

        const challengeList: Challenge[] = rawList
          .map((challenge: any) => ({
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            date: challenge.date,
          }))
          .sort((a: Challenge, b: Challenge) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });

        setChallenges(challengeList);

        const now = new Date();

        const current = challengeList.filter((challenge: Challenge) => {
          const start = new Date(challenge.date);
          return start <= now;
        });

        setCurrentChallenges(current);
      } catch (error) {
        console.error("Eroare la provocari:", error);
      }
    };
    fetchChallenges();
  }, []);
  return { challenges, currentChallenges };
};
