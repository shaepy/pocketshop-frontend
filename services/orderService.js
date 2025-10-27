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

// api/orders/shop/products/
// GET ORDERS FOR PRODUCTS (BY USER SHOP) -- Only returns products that have existing orders
export const getOrdersByProduct = async () => {
  try {
    const response = await axios.get(`${BASEURL}shop/products/`);
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

// UPDATE/PUT ORDER
export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${BASEURL}${orderId}/`, orderData);
    console.log("updatedOrder response:", response.data);

    if (!response.data) {
      throw new Error(`Error updating order: ${response.data.error}`);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};
