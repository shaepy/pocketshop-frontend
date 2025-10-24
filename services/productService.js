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

//POST Add product

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}`, formData);

    if (!response.data) {
      throw new Error("Error creating product", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//PATCH quantity when order is created 
export const setNewQuantity = async (productId,formData) => {
  try {
    const response = await axios.patch(`${BASEURL}${productId}/`, formData);

    if (!response.data) {
      throw new Error("Error creating product", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};
