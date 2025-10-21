// For /api/auth
import axios from "axios";
import keysToSnakeTopLevel from "../utilities/convertToSnake";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/`;

// Register new account: /api/auth/register
export const signUp = async (formData) => {
  try {
    const payload = keysToSnakeTopLevel(formData);
    const response = await axios.post(`${BASEURL}register/`, payload);
    console.log("from authService.signUp:", response.data);

    if (!response.data) {
      throw new Error("Error creating new user", response.data.error);
    }

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("response.data.user:", response.data.user);
      return response.data.user;
    }
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

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("response.data.user:", response.data.user);
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
