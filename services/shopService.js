// For /api/shops
import axios from "./axiosConfig";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/shops/`;

// GET all shops
export const getShops = async () => {
  try {
    const response = await axios.get(`${BASEURL}`);

    if (!response.data) {
      throw new Error("Error fetching all shops", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// GET any shop
export const getShop = async (shopId) => {
  try {
    const response = await axios.get(`${BASEURL}${shopId}`);

    if (!response.data) {
      throw new Error("Error fetching a shop", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// CREATE a shop (POST)
export const createShop = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}`, formData);

    if (!response.data) {
      throw new Error("Error creating the shop", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// GET an owner's shop (requested by the user/owner only)
export const getUserShop = async () => {
  try {
    const response = await axios.get(`${BASEURL}owner/`);

    if (!response.data) {
      throw new Error("Error fetching user's shop", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// UPDATE/PUT owner's shop (requested by the user/owner only)
export const updateShop = async (formData) => {
  try {
    const response = await axios.put(`${BASEURL}owner/`, formData);

    if (!response.data) {
      throw new Error("Error fetching user's shop", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// DELETE owner's shop (requested by the user/owner only)
export const deleteShop = async () => {
  try {
    const response = await axios.delete(`${BASEURL}owner/`);

    if (response.status != 204) {
      throw new Error("Error deleting user's shop", response.data.error);
    }

    return { success: response.status, message: "Successfully deleted." };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
