import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getTestCase = async (challengeId: string) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/test-case/challenge/${challengeId}/public`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
