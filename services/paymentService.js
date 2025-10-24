import axios from "./axiosConfig";
import keysToSnakeTopLevel from "../utilities/convertToSnake";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/payments`;

export const createPayment = async (formData) => {
  try {
    const payload = keysToSnakeTopLevel(formData);
    const response = await axios.post(`${BASEURL}/checkout/`, payload);
    console.log("response is:", response);

    if (!response.data) {
      throw new Error("Error validating payment", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};
