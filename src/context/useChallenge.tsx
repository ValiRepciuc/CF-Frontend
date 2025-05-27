import { createContext, useState, ReactNode, useContext } from "react";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface ChallengeContextType {
  challenges: Challenge[];
  setChallenges: (challenge: Challenge[]) => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

export const ChallengeProvider = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  return (
    <ChallengeContext.Provider value={{ challenges, setChallenges }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallengeContext = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error(
      "useChallengeContext must be used within a ChallengeProvider"
    );
  }
  return context;
};
