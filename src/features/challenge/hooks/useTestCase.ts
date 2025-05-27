import { useState, useEffect } from "react";
import { getTestCase } from "../services/TestCaseService";

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export const useTestCases = (challengeId: string) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await getTestCase(challengeId);
        const testCasesList: TestCase[] = response.map((tc: any) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        }));
        setTestCases(testCasesList);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchTestCases();
  }, []);

  return { testCases };
};
