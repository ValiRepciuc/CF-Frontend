import { useState, useEffect } from "react";
import {
  postSubmission,
  getUserSubmission,
} from "../services/SubmissionService";

export interface Submission {
  output: string;
  status: string;
}

export const useSubmission = (
  challengeId: string,
  languageId: string,
  code: string
) => {
  const [submissionOutput, setSubmissionOutput] = useState<Submission | null>(
    null
  );
  const [loadingSubmission, setLoadingSubmission] = useState(false);

  const runSubmission = async () => {
    try {
      setLoadingSubmission(true);
      const response = await postSubmission(challengeId, languageId, code);
      console.log("Response from submission:", response);
      const submission: Submission = {
        output: response.output,
        status: response.status,
      };

      setSubmissionOutput(submission);
    } catch (error) {
      console.error("Error fetching submission:", error);
    } finally {
      setLoadingSubmission(false);
    }
  };

  return { submissionOutput, loadingSubmission, runSubmission };
};

export interface UserSubmission {
  userId: string;
  challengeId: string;
  status: string;
}
export const useUserSubmission = (challengeId: string) => {
  const [userSubmission, setUserSubmission] = useState<UserSubmission | null>(
    null
  );
  const [hasPassed, setHasPassed] = useState<boolean>(false);

  useEffect(() => {
    const getSubmission = async () => {
      try {
        const response = await getUserSubmission(challengeId);
        console.log("Response from user submission:", response);
        if (Array.isArray(response)) {
          const passedSubmission = response.find(
            (s: any) => s.status?.toLowerCase() === "passed"
          );

          if (passedSubmission) {
            setUserSubmission(passedSubmission);
            setHasPassed(true);
          } else {
            setUserSubmission(null);
            setHasPassed(false);
          }
        }
      } catch (error) {
        console.error("Error fetching user submission:", error);
      }
    };

    if (challengeId) getSubmission();
  }, [challengeId]);
  return { userSubmission, hasPassed };
};
