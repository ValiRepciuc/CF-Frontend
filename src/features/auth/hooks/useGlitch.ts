import { useEffect, useState } from "react";

export const useGlitch = () => {
  const [displayText, setDisplayText] = useState("CodeFest");
  const [fontFamily, setFontFamily] = useState("Nura");
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const generateRandomText = (length: number) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+±";
      return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };

    const interval = setInterval(() => {
      setGlitching(true);
      setFontFamily("Nura");

      const glitchInterval = setInterval(() => {
        setDisplayText(generateRandomText(8));
      }, 100);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitching(false);
        setDisplayText("CodeFest");
        setFontFamily("Nura");
      }, 1000);
    }, Math.floor(Math.random() * 10000) + 3000);

    return () => clearInterval(interval);
  }, []);

  return { displayText, fontFamily, glitching };
};
