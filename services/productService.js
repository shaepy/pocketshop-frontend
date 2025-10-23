import axios from "./axiosConfig";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/products/`;

//GET all products ( unauth )
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASEURL}`);

    if (!response.data) {
      throw new Error("Error fetching all products", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//GET a product by id
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${BASEURL}${productId}`);

    if (!response.data) {
      throw new Error("Error fetching Product by ID", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

