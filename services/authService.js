// For /api/auth
import axios from "axios";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/`;

// helper: camelCase -> snake_case
const toSnake = (str) => str.replace(/([A-Z])/g, "_$1").toLowerCase();

// convert top-level keys only
const keysToSnakeTopLevel = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [toSnake(k), v]));

// Register new account: /api/auth/register
export const signUp = async (formData) => {
  try {
    const payload = keysToSnakeTopLevel(formData);
    const response = await axios.post(`${BASEURL}register/`, payload);
    console.log("from authService.signUp:", response.data);

    if (!response.data) {
      throw new Error("Error creating new user", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Login to account: /api/auth/login
export const signIn = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}login/`, formData);
    console.log("from authService.signIn:", response.data);

    if (!response.data) {
      throw new Error("Error logging user in", response.data.error);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
