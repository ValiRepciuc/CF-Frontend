import { useState, useEffect } from "react";
import { getLanguage } from "../services/LanguageService";

export interface Language {
  id: string;
  name: string;
}

export const useLanguage = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getLanguage();
        const languageList: Language[] = response.map((language: any) => ({
          id: language.id,
          name: language.name,
        }));
        setLanguages(languageList);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  return { languages };
};
