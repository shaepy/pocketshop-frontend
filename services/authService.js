// For /api/auth
import axios from "axios";
import keysToSnakeTopLevel from "../utilities/convertToSnake";
import { getUser } from "./userService";
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

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    return await signIn(loginData);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Login to account: /api/auth/login
export const signIn = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}login/`, formData);
    const data = response.data;
    console.log("from authService.signIn:", data);

    if (!data) {
      throw new Error("Error logging user in", response.data.error);
    }

    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      // fetch user
      const user = await getUser(data.userId);
      return user;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// USER CONTEXT QUERIES, DONT NEED TO DO IT IN THE LOGIN
// TODO-ST
