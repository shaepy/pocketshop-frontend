import axios from "./axiosConfig";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/carts/`;

//Get Users Cart
export const getCart = async () => {
  try {
    const response = await axios.get(`${BASEURL}`);

    if (!response.data) {
      throw new Error("Cound't get users Cart", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error getting cart ", error.message);
    throw new Error(error.message);
  }
};

//POST add cart item
export const addProductToCart = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}new/`, formData);

    if (!response.data) {
      throw new Error("Coundn't add product to cart", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//Patch quantity in cart
export const patchQuantityInCart = async (updatedItem) => {
  try {
    const response = await axios.patch(`${BASEURL}`, updatedItem);

    if (!response.data) {
      throw new Error("Coundn't update item in cart", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//Delete Item from Cart
export const deleteItemFromCart = async (cartItemId) => {
  try {
    const response = await axios.delete(`${BASEURL}`, {
      data: cartItemId,
    });

    if (!response.data) {
      throw new Error("Cound't remove item from cart", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//Clear cart content after payment and via a x button
export const clearCart = async () => {
  try {
    const response = await axios.delete(`${BASEURL}clear/`);;

    if (!response.data) {
      throw new Error("Cound't clear cart", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error);
  }
};