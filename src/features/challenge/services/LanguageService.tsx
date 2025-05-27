import axios from "axios";
import { handleError } from "../../../helpers/ErrorHandler";

export const getLanguage = async () => {
  try {
    const data = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/language`
    );
    return data.data;
  } catch (error) {
    handleError(error);
  }
};
