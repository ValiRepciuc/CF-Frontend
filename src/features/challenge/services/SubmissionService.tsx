import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const postSubmission = async (
  challengeId: string,
  languageId: string,
  code: string
) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/submission/${challengeId}/${languageId}`,
      {
        challengeId,
        languageId,
        submittedCode: code,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserSubmission = async (challengeId: string) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/submission/userSubmissions/${challengeId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
