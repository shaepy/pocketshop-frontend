// for orderService
import axios from "./axiosConfig";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/orders/`;

// GET/VIEW BUYER ORDERS
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${BASEURL}buyer/`);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

// CREATE/POST ORDER
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASEURL}`, orderData);
    console.log("createOrder returned:", response.data);

    if (!response.data) {
      throw new Error("Error creating order", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};
