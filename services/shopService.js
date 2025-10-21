// For /api/shops
import axios from "axios";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/shops/`;

// GET all shops
export const index = async () => {
  try {
    const response = await axios.get(`${BASEURL}`);
    console.log("from shopApi.index:", response.data);

    if (!response.data) {
      throw new Error("Error fetching all shops", response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET a shop
export const show = async (shopId) => {
  try {
    const response = await axios.get(`${BASEURL}${shopId}`);
    console.log("from shopApi.show:", response.data);

    if (!response.data) {
      throw new Error("Error fetching a shop", response.data.error);
    }

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
